// Revisión con navegadores reales (Chrome, Safari/WebKit y Firefox): recorre las páginas, usa menús y navegación interna
// y registra cada bloqueo de la política de seguridad (CSP) de la propia página. Solo lee: no hace clic en botones de envío,
// no escribe en formularios y no pasa por el desafío de Turnstile (solo deja que cargue al llegar al formulario).
// Sin ruido en producción: bloquea los scripts de medición (la prueba nunca cuenta como visita) y en producción no llega al
// formulario, para no cargar el desafío real de Turnstile (eso se prueba en la vista previa, con la clave de prueba).
// Los bloqueos que ocurren dentro de recuadros de terceros (por ejemplo, el de Turnstile) son de su política, no de la tuya:
// se cuentan aparte y no fallan.

export type Bloqueo = { navegador: string; ruta: string; directiva: string; bloqueado: string };

const MEDICION = /cloudflareinsights\.com|google-analytics\.com|googletagmanager\.com|plausible\.io|clarity\.ms|hotjar\.com/;

export async function revisarCsp(base: string, rutas: string[], conFormulario: boolean) {
  let pw: typeof import("playwright-core");
  try { pw = await import("playwright-core"); } catch { return null; }
  const propio = new URL(base).origin;
  const propios: Bloqueo[] = [];
  let ajenos = 0;
  const casos = [
    { nombre: "Chrome", tipo: pw.chromium, ancho: 390 }, { nombre: "Safari (WebKit)", tipo: pw.webkit, ancho: 390 }, { nombre: "Firefox", tipo: pw.firefox, ancho: 1280 },
  ];
  for (const c of casos) {
    let nav;
    try { nav = await c.tipo.launch(); } catch { continue; } // navegador no instalado: se omite
    const ctx = await nav.newContext({ viewport: { width: c.ancho, height: 900 } });
    await ctx.route((u) => MEDICION.test(u.host), (r) => r.abort());
    await ctx.addInitScript(() => {
      (window as any).__bloqueos = [];
      document.addEventListener("securitypolicyviolation", (e) =>
        (window as any).__bloqueos.push({ origen: location.origin, directiva: e.violatedDirective, bloqueado: e.blockedURI || "en línea" }));
    });
    const p = await ctx.newPage();
    p.setDefaultTimeout(5000);
    const recoger = async (ruta: string) => {
      for (const f of p.frames()) {
        const lista: any[] = await Promise.race([
          f.evaluate(() => (window as any).__bloqueos?.splice(0) ?? []).catch(() => []),
          new Promise<any[]>((ok) => setTimeout(() => ok([]), 500)),
        ]);
        for (const b of lista) b.origen === propio ? propios.push({ navegador: `${c.nombre} ${c.ancho}px`, ruta, directiva: b.directiva, bloqueado: b.bloqueado }) : ajenos++;
      }
    };
    for (const [n, ruta] of rutas.entries()) {
      try {
        // Documento listo y hasta 5 s más para el resto (WebKit a veces no avisa el fin de la carga y esperaría 30 s)
        await p.goto(`${base}${ruta}`, { waitUntil: "domcontentloaded", timeout: 20000 });
        await p.waitForLoadState("load", { timeout: 5000 }).catch(() => {});
        await p.waitForTimeout(300);
        // Menús y paneles que se abren y cierran (nunca botones de envío ni nada dentro de un formulario)
        const botones = p.locator("header button[aria-expanded], nav button[aria-expanded], button[aria-controls]:not(form button), button[aria-pressed]:not(form button)");
        // Los menús son los mismos en todas las páginas: se prueban solo en la primera
        for (let i = 0; i < (n === 0 ? Math.min(await botones.count(), 4) : 0); i++) {
          const b = botones.nth(i);
          if (await b.isVisible().catch(() => false)) { await b.click({ timeout: 1000 }).catch(() => {}); await p.waitForTimeout(150); await p.keyboard.press("Escape").catch(() => {}); }
        }
        // Llegar al formulario que usa Turnstile (visible), para que cargue su control; nunca se envía
        const conTurnstile = p.locator("form:has([data-sitekey]), form:has(#turnstile), form:has(.turnstile), form[data-suscripcion]").first();
        if (conFormulario && (await conTurnstile.count()) && (await conTurnstile.isVisible().catch(() => false))) {
          await conTurnstile.scrollIntoViewIfNeeded({ timeout: 3000 }).catch(() => {}); await p.waitForTimeout(3000);
        }
        await p.mouse.wheel(0, 5000); await p.waitForTimeout(300);
        await recoger(ruta);
      } catch { /* una página que no carga ya la marca el control por su código de estado */ }
    }
    // Navegación interna sin recargar (enrutadores como el de Astro inyectan scripts al cambiar de página)
    try {
      await p.goto(`${base}/`, { waitUntil: "domcontentloaded" });
      await p.waitForLoadState("load", { timeout: 5000 }).catch(() => {});
      const enlace = p.locator(`header a[href^="/"]:not([href="/"]), nav a[href^="/"]:not([href="/"])`).first();
      if (await enlace.count()) { await enlace.click({ timeout: 3000 }).catch(() => {}); await p.waitForTimeout(1000); await recoger("(navegación interna)"); }
    } catch {}
    await nav.close();
  }
  return { propios, ajenos, navegadores: [...new Set(casos.map((c) => c.nombre))] };
}

// Se corre en su propio proceso (lo llama control.ts): dentro del proceso del control, WebKit no termina de cargar las páginas.
//   bun navegador.ts <dirección> <rutas en JSON> <con formulario: 1|0>  →  imprime el resultado en JSON
if (import.meta.main) {
  const [base, rutas, form] = process.argv.slice(2);
  console.log(JSON.stringify(await revisarCsp(base, JSON.parse(rutas), form === "1")));
  process.exit(0);
}
