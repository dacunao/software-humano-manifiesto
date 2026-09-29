import { expect, test } from '@playwright/test';

// JS-08 · Compartir una idea precisa (spec.md).
test.describe('JS-08 · Compartir una idea precisa', () => {
  test('escenario 1 · el enlace recibido abre el principio con contexto y acceso al texto completo', async ({ page }) => {
    await page.goto('/es/principios/p03');
    await expect(page.locator('h1')).toContainText('P03');
    await expect(page.locator('#declaracion figure.cita-canonica')).toBeVisible();
    // La fuente es el núcleo completo, en la descarga del idioma (PRD v1.2 §18.1).
    await expect(page.locator('#fuente a')).toHaveAttribute('href', '/descargas/nucleo-v2.1-es.md');
  });

  test('escenario 2 · copiar confirma de forma clara y anunciable', async ({ page, context, browserName }, info) => {
    test.skip(info.project.name === 'sin-js', 'sin JavaScript no hay botón: lo cubre el escenario 3');
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.addInitScript(() => Object.defineProperty(navigator, 'share', { value: undefined }));
    await page.goto('/es/principios/p03');
    const caja = page.locator('#declaracion .compartir');
    await caja.getByRole('button', { name: 'Copiar enlace' }).click();
    await expect(caja.getByRole('status')).toHaveText('Enlace copiado');
    const copiado = await page.evaluate(() => navigator.clipboard.readText());
    expect(copiado).toMatch(/\/es\/principios\/p03$/);
    expect(browserName).toBe('chromium');
  });

  test('escenario 3 · sin JavaScript el enlace de la sección está visible y es estable', async ({ page, javaScriptEnabled }) => {
    test.skip(javaScriptEnabled, 'con JavaScript el respaldo se oculta (T218)');
    await page.goto('/es/manifiesto/construir-con-ia');
    const enlace = page.locator('.compartir').first().getByRole('link', { name: 'Enlace a esta sección' });
    await expect(enlace).toBeVisible();
    await expect(enlace).toHaveAttribute('href', /^\/es\/[a-z/-]+(#[a-z0-9-]+)?$/);
  });

  test('con JavaScript, cada sección muestra solo «Copiar enlace» (T218)', async ({ page, javaScriptEnabled }) => {
    test.skip(!javaScriptEnabled, 'solo con JavaScript');
    await page.goto('/es/manifiesto/mapa');
    const caja = page.locator('section#portada .compartir');
    await expect(caja.getByRole('button', { name: 'Copiar enlace' })).toBeVisible();
    await expect(caja.locator('a.enlace-seccion')).toBeHidden();
  });

  test('escenario 4 · cada sección de una división tiene su enlace, sin símbolos al pasar el cursor (T139)', async ({ page }) => {
    await page.goto('/es/manifiesto/verificar');
    const secciones = page.locator('main section.seccion[id]');
    const n = await secciones.count();
    expect(n).toBeGreaterThan(2);
    for (let i = 0; i < n; i++) {
      const id = await secciones.nth(i).getAttribute('id');
      if (id === 'recorrido') continue;
      await expect(secciones.nth(i).locator('.compartir a.enlace-seccion').first()).toHaveAttribute('href', `/es/manifiesto/verificar#${id}`);
    }
    await expect(page.locator('main h2 .sl-anchor-link, main h2 a[aria-hidden]')).toHaveCount(0);
  });
});
