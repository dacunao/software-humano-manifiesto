// Control de calidad sobre un sitio publicado (producción o vista previa). Solo lee: no envía formularios ni pasa por Turnstile.
// Cada falla o aviso dice por qué ocurre, qué hacer y cuándo. Velocidad, accesibilidad y visitas reales vienen de Google
// (PageSpeed Insights y CrUX, en español) con la clave compartida de Software Humano.
import { existsSync, readFileSync } from "node:fs";
import { homedir } from "node:os";
import type { Perfil } from "./pasos";

export type Resultado = {
  ok: boolean | null; // null = aviso o sin datos (no detiene)
  texto: string;
  norma: string;
  porque?: string;
  hacer?: string;
  cuando?: string;
};

const CLAVE = `${homedir()}/.config/software-humano/pagespeed-api-key`;
const clave = () => (existsSync(CLAVE) ? readFileSync(CLAVE, "utf8").trim() : "");
const ir = (url: string, init: RequestInit = {}) => fetch(url, { redirect: "manual", ...init, headers: { "User-Agent": "control-de-calidad-software-humano", ...(init.headers ?? {}) } });
const CLAVES_PRUEBA = /\b[123]x0{10,}[A-Za-z]{0,2}\b/;
const seg = (ms: number) => `${(ms / 1000).toFixed(1).replace(".", ",")} s`;
const kb = (b: number) => `${Math.round(b / 1024)} KB`;
const archivo = (u: string) => decodeURIComponent(u.split("?")[0].split("/").pop() || u);
const limpiar = (t = "") => t.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/`/g, "").split(/(?<=\.)\s/)[0];
const ANTES = "Antes de la próxima publicación.";

// Lo que significa cada parte del tiempo hasta mostrar lo principal, y qué hacer si es la que más pesa.
const PARTES: Record<string, { que: string; hacer: string }> = {
  timeToFirstByte: { que: "el servidor tarda en responder", hacer: "Servir la página ya construida (estática) o con caché en Cloudflare, en vez de armarla en cada visita." },
  resourceLoadDelay: { que: "el navegador descubre tarde la imagen principal", hacer: "Quitarle loading=\"lazy\" a esa imagen y agregarle fetchpriority=\"high\", o precargarla con <link rel=\"preload\">." },
  resourceLoadDuration: { que: "la imagen principal pesa demasiado", hacer: "Reducirla al tamaño en que se muestra y servirla en WebP o AVIF." },
  elementRenderDelay: { que: "algo impide dibujarlo aunque ya llegó", hacer: "" },
};

async function pagespeed(url: string, k: string) {
  const q = new URLSearchParams({ url, strategy: "mobile", locale: "es", key: k });
  for (const c of ["performance", "accessibility", "seo"]) q.append("category", c);
  const d: any = await (await fetch(`https://www.googleapis.com/pagespeedonline/v5/runPagespeed?${q}`)).json();
  if (d.error) throw new Error(d.error.message ?? "error de PageSpeed");
  return d.lighthouseResult;
}

// Explica una medición de velocidad a partir de los diagnósticos de Lighthouse.
function explicarVelocidad(lh: any): { porque: string; hacer: string } {
  const a = lh.audits;
  const desglose = a["lcp-breakdown-insight"]?.details?.items ?? [];
  const partes: { subpart: string; duration: number }[] = desglose.find((x: any) => x.type === "table")?.items ?? [];
  const nodo = desglose.find((x: any) => x.type === "node");
  const esImagen = /^<img|background/i.test(nodo?.snippet ?? "");
  const principal = nodo ? `${esImagen ? "una imagen" : "un texto"} («${(nodo.nodeLabel ?? "").slice(0, 60)}…»)` : "el elemento más grande de la primera pantalla";
  const mayor = [...partes].sort((x, y) => y.duration - x.duration)[0];
  const ttfb = partes.find((p) => p.subpart === "timeToFirstByte")?.duration;
  const bloqueos: any[] = a["render-blocking-insight"]?.details?.items ?? [];
  const imagenes: any[] = a["image-delivery-insight"]?.details?.items ?? [];

  let porque = `Lo principal de la página es ${principal}.`;
  if (ttfb !== undefined) porque += ` El servidor responde en ${Math.round(ttfb)} ms`;
  let hacer = "";
  if (mayor) {
    const p = PARTES[mayor.subpart];
    porque += `${ttfb !== undefined ? ";" : ""} lo que más demora es que ${p?.que ?? mayor.subpart}`;
    if (mayor.subpart === "elementRenderDelay" && bloqueos.length) {
      const top = bloqueos.slice(0, 2).map((b) => `${archivo(b.url)} (${kb(b.totalBytes)})`).join(" y ");
      porque += `: ${bloqueos.length === 1 ? "la hoja" : "los archivos"} ${top} bloquea${bloqueos.length === 1 ? "" : "n"} la página hasta terminar de bajar`;
      hacer = "Dejar en la página solo el CSS de la primera pantalla y cargar el resto después, o achicar esa hoja quitando lo que esta página no usa.";
    } else if (mayor.subpart === "elementRenderDelay") {
      hacer = "Revisar si la tipografía o un JavaScript están retrasando el dibujo del contenido.";
    } else hacer = p?.hacer ?? "";
    porque += ".";
  }
  const extra = imagenes.filter((i) => i.wastedBytes > 20 * 1024).slice(0, 2).map((i) => `${archivo(i.url)} pesa ${kb(i.wastedBytes)} más de lo necesario`);
  if (extra.length) hacer += ` También: ${extra.join("; ")} (servirla al tamaño en que se muestra).`;
  return { porque, hacer: hacer.trim() || "Abrir el informe de PageSpeed de esta página para ver el detalle." };
}

export async function controlar(p: Perfil, modo: "produccion" | "vista-previa", rapido: boolean): Promise<Resultado[]> {
  const base = (modo === "produccion" ? p.produccion : p.vista_previa)?.replace(/\/$/, "");
  if (!base) return [{ ok: false, texto: `El perfil no tiene dirección de ${modo === "produccion" ? "producción" : "vista previa"}`, norma: "—", hacer: "Agregarla al perfil." }];
  const prod = modo === "produccion";
  const R: Resultado[] = [];
  const anotar = (ok: boolean | null, texto: string, norma: string, guia: Omit<Resultado, "ok" | "texto" | "norma"> = {}) => R.push({ ok, texto, norma, ...guia });

  let portada: Response;
  try { portada = await ir(`${base}/`); } catch {
    anotar(false, `${base} no responde`, "Disponibilidad", { porque: "El dominio no contesta: puede ser DNS, certificado o el Worker caído.", hacer: "Abrir el sitio en el navegador y revisar el panel de Cloudflare.", cuando: "Ahora." });
    return R;
  }
  const html = await portada.text();
  const h = portada.headers;
  anotar(portada.status === 200, `La portada responde ${portada.status}`, "Disponibilidad", { porque: "La portada no entrega la página.", hacer: "Revisar la última publicación; si es reciente, volver atrás.", cuando: "Ahora." });

  if (prod) {
    const dominio = new URL(base).host;
    const http = await ir(`http://${dominio}/`).catch(() => null);
    anotar(!!http && [301, 308].includes(http.status) && (http.headers.get("location") ?? "").startsWith("https://"), "http lleva a https con redirección permanente", "HSTS (RFC 6797)",
      { porque: "Quien escribe la dirección sin https queda en una conexión sin cifrar.", hacer: "Activar «Always Use HTTPS» en la zona de Cloudflare.", cuando: ANTES });
    if (p.www) {
      const w = await ir(`https://www.${dominio}/`).catch(() => null);
      anotar(!!w && [301, 308].includes(w.status) && (w.headers.get("location") ?? "").includes(`//${dominio}`), "www lleva a la raíz con redirección permanente", "Google Search Essentials",
        { porque: "Dos direcciones con el mismo contenido dividen la reputación en buscadores.", hacer: "Redirigir www a la raíz con 301 (regla de Cloudflare o Worker de redirección).", cuando: ANTES });
    }
    anotar(/max-age=\d{6,}/.test(h.get("strict-transport-security") ?? ""), "HSTS activo", "OWASP Secure Headers",
      { porque: "Sin HSTS, el navegador podría aceptar una versión sin cifrar en una red insegura.", hacer: "Agregar la cabecera Strict-Transport-Security (max-age de un año) en _headers o en el Worker.", cuando: ANTES });
  }
  const csp = h.get("content-security-policy") ?? "";
  anotar(!!csp, "Política de seguridad de contenido (CSP)", "OWASP Secure Headers",
    { porque: "Sin CSP, si alguien logra insertar código en la página, el navegador lo ejecuta sin restricciones.", hacer: "Agregar una cabecera Content-Security-Policy que permita solo tu dominio y los servicios que usas.", cuando: ANTES });
  if (csp && /'unsafe-inline'/.test(csp))
    anotar(null, "La política de seguridad permite código en línea ('unsafe-inline')", "OWASP Secure Headers", {
      porque: "Si alguien lograra insertar código en la página, el navegador lo ejecutaría: la CSP pierde buena parte de su protección.",
      hacer: "Mover los scripts y estilos escritos dentro del HTML a archivos aparte (o autorizarlos uno a uno con su huella) y quitar 'unsafe-inline'.",
      cuando: p.formulario ? "Pronto: el sitio tiene formulario." : "Cuando se toquen las plantillas; riesgo bajo en un sitio sin formulario.",
    });
  anotar(h.get("x-content-type-options") === "nosniff" && !!h.get("referrer-policy"), "Cabeceras nosniff y Referrer-Policy", "OWASP Secure Headers",
    { porque: "Faltan protecciones básicas contra archivos mal interpretados y fuga de direcciones.", hacer: "Agregar X-Content-Type-Options: nosniff y Referrer-Policy: strict-origin-when-cross-origin.", cuando: ANTES });
  anotar(!!h.get("permissions-policy"), "Cabecera Permissions-Policy", "OWASP Secure Headers",
    { porque: "Nada impide que un script use cámara, micrófono o ubicación.", hacer: "Agregar Permissions-Policy que apague lo que el sitio no usa.", cuando: ANTES });

  const noindex = /<meta[^>]+name="robots"[^>]+noindex/i.test(html) || /noindex/i.test(h.get("x-robots-tag") ?? "");
  if (prod && p.indexable) anotar(!noindex, "Se puede indexar (sin noindex)", "Google Search Essentials",
    { porque: "La página le pide a los buscadores que no la muestren.", hacer: "Construir en modo producción (sin la etiqueta noindex) y volver a publicar.", cuando: "Ahora." });
  if (!prod) anotar(noindex, "La vista previa no se indexa (noindex)", "Google Search Essentials",
    { porque: "La vista previa podría aparecer en Google y competir con el sitio real.", hacer: "Agregar <meta name=\"robots\" content=\"noindex\"> o la cabecera X-Robots-Tag en la vista previa.", cuando: "Ahora." });
  if (prod && p.indexable) {
    const robots = await ir(`${base}/robots.txt`);
    anotar(robots.status === 200, "robots.txt responde", "RFC 9309", { porque: "Los buscadores no encuentran sus instrucciones.", hacer: "Publicar /robots.txt con la línea Sitemap.", cuando: ANTES });
    const sm = await ir(`${base}/sitemap.xml`), smTxt = sm.status === 200 ? await sm.text() : "";
    anotar(sm.status === 200 && smTxt.includes(`<loc>${base}/`), "sitemap.xml responde y lista el dominio", "Sitemaps.org",
      { porque: "Los buscadores no reciben la lista de páginas, o la lista apunta a otro dominio.", hacer: "Generar /sitemap.xml con las páginas del dominio de producción.", cuando: ANTES });
  }
  const nada = await ir(`${base}/esta-pagina-no-existe-${Date.now()}`);
  anotar(nada.status === 404, `Una página inexistente responde ${nada.status}`, "HTTP: semántica de estado",
    { porque: "Responder 200 a una página que no existe crea páginas fantasma en los buscadores.", hacer: "Configurar la página 404 para que responda con código 404.", cuando: ANTES });

  for (const ruta of p.paginas.filter((r) => r !== "/")) {
    const r = await ir(`${base}${ruta}`);
    anotar(r.status === 200, `${ruta} responde ${r.status}`, "Disponibilidad", { porque: "Una página declarada en el perfil no entrega su contenido.", hacer: "Revisar la ruta en la última publicación, o quitarla del perfil si ya no existe.", cuando: "Ahora." });
  }

  if (p.turnstile) {
    let claveServida = "";
    if (p.turnstile_clave_en) { try { claveServida = JSON.stringify(await (await ir(`${base}${p.turnstile_clave_en}`)).json()); } catch {} }
    else for (const ruta of p.paginas) { const m = (await (await ir(`${base}${ruta}`)).text()).match(/data-sitekey="([^"]+)"/); if (m) { claveServida = m[1]; break; } }
    if (!claveServida) anotar(null, "No encontré la clave pública de Turnstile para revisarla", "OWASP Top 10 A05", { hacer: "Declarar en el perfil dónde se entrega (turnstile_clave_en) o en qué página está el formulario." });
    else if (prod) anotar(!CLAVES_PRUEBA.test(claveServida), "La clave de Turnstile en producción no es de prueba", "OWASP Top 10 A05",
      { porque: "Con la clave de prueba el formulario no protege contra robots, o rechaza a las personas.", hacer: "Configurar la clave real en producción y quitar del código cualquier clave por defecto.", cuando: "Ahora." });
    else if (CLAVES_PRUEBA.test(claveServida)) anotar(true, "La vista previa usa clave de prueba de Turnstile", "Twelve-Factor X");
    else anotar(null, "La vista previa usa una clave real de Turnstile", "Twelve-Factor X", { porque: "Las pruebas en la vista previa gastarían verificaciones reales.", hacer: "Usar la clave de prueba de Cloudflare en la vista previa." });
  }

  if (rapido) return R;
  const k = clave();
  if (!k) { anotar(null, "Sin clave de PageSpeed: no medí velocidad, accesibilidad ni visitas reales", "—", { hacer: `Guardar la clave en ${CLAVE.replace(homedir(), "~")}.` }); return R; }

  await Promise.all(p.paginas.map(async (ruta) => {
    try {
      const corridas = await Promise.all([0, 1, 2].map(() => pagespeed(`${base}${ruta}`, k)));
      const lcpDe = (lh: any) => lh.audits["largest-contentful-paint"].numericValue;
      const orden = [...corridas].sort((x, y) => lcpDe(x) - lcpDe(y));
      const med = orden[1], a = med.audits;
      const lcp = lcpDe(med), tbt = a["total-blocking-time"].numericValue, cls = a["cumulative-layout-shift"].numericValue;
      const ok = lcp <= 2500 && tbt <= 200 && cls <= 0.1;
      const variacion = lcpDe(orden[2]) - lcpDe(orden[0]) > 1000 ? ` (varió entre ${seg(lcpDe(orden[0]))} y ${seg(lcpDe(orden[2]))})` : "";
      if (ok) anotar(true, `${ruta} muestra lo principal en ${seg(lcp)} en un teléfono`, "Core Web Vitals (laboratorio)");
      else {
        const motivos = [lcp > 2500 && `tarda ${seg(lcp)} en mostrar lo principal (límite 2,5 s)${variacion}`, tbt > 200 && `queda bloqueada ${Math.round(tbt)} ms (límite 200 ms)`, cls > 0.1 && `se mueve al cargar (CLS ${cls.toFixed(2)}, límite 0,1)`].filter(Boolean).join("; ");
        anotar(false, `${ruta} en un teléfono ${motivos}`, "Core Web Vitals (laboratorio)", { ...explicarVelocidad(med), cuando: ANTES });
      }
      const fallasAcc = med.categories.accessibility.auditRefs.filter((x: any) => x.weight > 0 && a[x.id]?.score !== null && a[x.id]?.score < 1).map((x: any) => a[x.id]);
      if (!fallasAcc.length) anotar(true, `${ruta} sin infracciones de accesibilidad automáticas`, "WCAG 2.2 AA");
      else anotar(false, `${ruta}: ${fallasAcc.length} problema(s) de accesibilidad`, "WCAG 2.2 AA", {
        porque: fallasAcc.slice(0, 3).map((f: any) => `${f.title} (${f.details?.items?.length ?? 1} elemento${(f.details?.items?.length ?? 1) === 1 ? "" : "s"})`).join("; ") + ".",
        hacer: fallasAcc.slice(0, 3).map((f: any) => limpiar(f.description)).join(" "),
        cuando: ANTES,
      });
      if (prod && p.indexable) {
        const fallasSeo = med.categories.seo.auditRefs.filter((x: any) => x.weight > 0 && a[x.id]?.score !== null && a[x.id]?.score < 1).map((x: any) => a[x.id]);
        if (fallasSeo.length) anotar(false, `${ruta}: ${fallasSeo.length} problema(s) para buscadores`, "Google Search Essentials",
          { porque: fallasSeo.map((f: any) => f.title).join("; ") + ".", hacer: fallasSeo.map((f: any) => limpiar(f.description)).join(" "), cuando: ANTES });
      }
    } catch (e) { anotar(null, `${ruta}: PageSpeed no respondió`, "—", { porque: (e as Error).message.slice(0, 100), hacer: "Volver a correr el control en unos minutos." }); }
  }));

  if (prod) {
    const d: any = await (await fetch(`https://chromeuxreport.googleapis.com/v1/records:queryRecord?key=${k}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ origin: base, formFactor: "PHONE" }) })).json();
    if (d.error) anotar(null, "Visitas reales: Google aún no tiene datos suficientes", "Core Web Vitals (campo)",
      { porque: "Google publica estos datos cuando un sitio junta suficientes visitas en 28 días.", hacer: "Nada por ahora. Vuelve a correr el control en un mes.", cuando: "En un mes." });
    else {
      const m = d.record.metrics, p75 = (n: string) => Number(m[n]?.percentiles?.p75);
      const lcp = p75("largest_contentful_paint"), inp = p75("interaction_to_next_paint"), cls = p75("cumulative_layout_shift");
      anotar(lcp <= 2500 && inp <= 200 && cls <= 0.1, `Visitas reales en teléfono (p75): LCP ${seg(lcp)}, INP ${inp} ms, CLS ${cls}`, "Core Web Vitals (campo)",
        { porque: "Así lo viven tus visitantes reales, no una simulación.", hacer: "Corregir primero lo que el control marca en rojo en velocidad; esta cifra mejora sola en las semanas siguientes.", cuando: ANTES });
    }
  }
  return R;
}
