import { existsSync, readFileSync } from 'node:fs';
import { expect, test } from '@playwright/test';
import { PAGINAS } from './paginas';

// T090 · bordes de spec.md (FR-014, FR-018, AC-12, PRD §24.2, §24.3, §21.4).
test.describe('bordes', () => {
  for (const [ruta, lang, inicio] of [['/404', 'en', '/'], ['/es/404', 'es', '/es'], ['/pt-br/404', 'pt-BR', '/pt-br']] as const)
    test(`404 en su idioma: ${ruta}`, async ({ page }) => {
      await page.goto(ruta);
      await expect(page.locator('html')).toHaveAttribute('lang', lang);
      await expect(page.locator(`main a[href="${inicio}"]`).first()).toBeVisible();
    });

  test('una URL inexistente responde 404', async ({ request }) => {
    expect((await request.get('/no-existe')).status()).toBe(404);
  });

  test('cada redirección de _redirects es válida y lleva a una página que existe', () => {
    // Cloudflare Pages la aplica; aquí se verifica el archivo. Sin URLs publicadas aún, puede no tener líneas.
    const lineas = readFileSync('public/_redirects', 'utf8').split('\n').map((l) => l.trim()).filter((l) => l && !l.startsWith('#'));
    for (const l of lineas) {
      const [origen, destino, codigo] = l.split(/\s+/);
      expect(origen).toMatch(/^\//);
      expect(['301', '308']).toContain(codigo);
      const archivo = destino === '/' ? 'dist/index.html' : `dist${destino!.split('#')[0]}.html`;
      expect(existsSync(archivo), `${l} → ${archivo}`).toBe(true);
    }
  });

  for (const ruta of PAGINAS)
    test(`reflow a 320 px sin desplazamiento horizontal en ${ruta}`, async ({ page }, info) => {
      test.skip(info.project.name !== 'js', 'una sola vez por página');
      await page.setViewportSize({ width: 320, height: 640 });
      await page.goto(ruta);
      const ancho = await page.evaluate(() => document.documentElement.scrollWidth);
      expect(ancho).toBeLessThanOrEqual(320);
    });

  test('zoom al 200 % (1280 px → 640 px) sin desplazamiento horizontal', async ({ page }, info) => {
    test.skip(info.project.name !== 'js', 'escritorio');
    await page.setViewportSize({ width: 640, height: 400 });
    for (const ruta of ['/es', '/es/manifiesto', '/es/principios/p06', '/es/manifiesto/verificar']) {
      await page.goto(ruta);
      expect(await page.evaluate(() => document.documentElement.scrollWidth), ruta).toBeLessThanOrEqual(640);
    }
  });

  test('con las tipografías bloqueadas se lee igual', async ({ page }) => {
    await page.route(/\.woff2$/, (r) => r.abort());
    await page.goto('/es/manifiesto');
    await expect(page.locator('main h1')).toBeVisible();
    expect((await page.locator('main').innerText()).length).toBeGreaterThan(500);
  });

  test('con la analítica bloqueada nada cambia y la lectura no pide datos personales', async ({ page }) => {
    const errores: string[] = [];
    page.on('pageerror', (e) => errores.push(e.message));
    await page.route(/cloudflareinsights\.com/, (r) => r.abort());
    for (const ruta of PAGINAS) {
      await page.goto(ruta);
      const campos = await page.locator('form, input:not([type="search"]), textarea, select').count();
      expect(campos, ruta).toBe(0);
    }
    expect(errores).toEqual([]);
  });

  test('una URL profunda restituye la sección, visible bajo la cabecera', async ({ page }) => {
    await page.goto('/es/manifiesto/construir-con-ia');
    const id = await page.locator('main section.seccion[id]').nth(2).getAttribute('id');
    await page.goto(`/es/manifiesto/construir-con-ia#${id}`);
    const seccion = page.locator(`[id="${id}"]`);
    await expect(seccion).toBeInViewport();
    const cabecera = await page.locator('.barra-superior').evaluate((e) => e.getBoundingClientRect().bottom);
    const titulo = await seccion.locator('h2').first().evaluate((e) => e.getBoundingClientRect().top);
    expect(titulo).toBeGreaterThanOrEqual(cabecera);
  });

  test('sin cookies; en almacenamiento local solo las preferencias de idioma y tema', async ({ page, context, javaScriptEnabled }) => {
    test.skip(!javaScriptEnabled, 'sin JavaScript no se guarda nada');
    await page.goto('/es');
    const menu = page.locator('.menu-movil > summary');
    if (await menu.isVisible()) await menu.click();
    await page.locator('[data-selector-idioma] a[hreflang="en"]').first().click({ timeout: 5000 });
    await page.goto('/es/manifiesto');
    const tema = page.getByRole('button', { name: 'Tema oscuro' });
    if (!(await tema.isVisible())) await menu.click();
    await tema.click({ timeout: 5000 });
    for (const ruta of ['/es/principios/p01', '/es/manifiesto/verificar']) await page.goto(ruta);
    expect(await context.cookies()).toEqual([]);
    const claves = await page.evaluate(() => Object.keys(localStorage));
    for (const c of claves) expect(['sh-idioma', 'sh-tema']).toContain(c);
    expect(await page.evaluate(() => Object.keys(sessionStorage))).toEqual([]);
  });
});
