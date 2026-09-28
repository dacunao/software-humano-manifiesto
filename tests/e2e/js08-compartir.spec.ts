import { expect, test } from '@playwright/test';

// JS-08 · Compartir una idea precisa (spec.md).
test.describe('JS-08 · Compartir una idea precisa', () => {
  test('escenario 1 · el enlace recibido abre el principio con contexto y acceso al texto completo', async ({ page }) => {
    await page.goto('/es/principios/p03');
    await expect(page.locator('h1')).toContainText('P03');
    await expect(page.locator('#declaracion figure.cita-canonica')).toBeVisible();
    await expect(page.locator('#fuente a')).toHaveAttribute('href', '/es/manifiesto/texto-integro#p03');
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

  test('escenario 3 · sin JavaScript el enlace de la sección está visible y es estable', async ({ page }) => {
    await page.goto('/es/manifiesto/texto-integro');
    const enlace = page.locator('.compartir').first().getByRole('link', { name: 'Enlace a esta sección' });
    await expect(enlace).toBeVisible();
    await expect(enlace).toHaveAttribute('href', /^\/es\/[a-z/-]+(#[a-z0-9-]+)?$/);
  });
});
