import { expect, test } from '@playwright/test';

// JS-09 · Comprender en mi idioma y conservar mi elección (spec.md, contracts/rutas.md).
test.describe('JS-09 · Idioma', () => {
  test('escenario 1 · primera visita a / con navegador en portugués: inglés, sin redirección', async ({ browser }) => {
    const ctx = await browser.newContext({ locale: 'pt-BR' });
    const page = await ctx.newPage();
    await page.goto('/');
    await expect(page).toHaveURL(/\/$/);
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await ctx.close();
  });

  test('escenario 2 · cambiar de idioma lleva al mismo principio y el idioma activo es perceptible', async ({ page }) => {
    await page.goto('/principles/p03');
    await page.locator('[data-selector-idioma]').getByRole('link', { name: 'Español' }).click();
    await expect(page).toHaveURL(/\/es\/principios\/p03$/);
    await expect(page.locator('html')).toHaveAttribute('lang', 'es');
    // Selector compacto (PRD v1.4 §21.7): código visible y nombre completo accesible.
    const activo = page.locator('[data-selector-idioma] a[aria-current="true"]');
    await expect(activo).toHaveText('ES');
    await expect(activo).toHaveAccessibleName('Español');
  });

  test('escenario 3 · una URL localizada explícita prevalece sobre la preferencia guardada', async ({ page }, info) => {
    test.skip(info.project.name === 'sin-js', 'la preferencia requiere JavaScript');
    await page.goto('/principles/p01');
    await page.locator('[data-selector-idioma]').getByRole('link', { name: 'Español' }).click();
    await page.goto('/pt-br/principios/p05');
    await expect(page).toHaveURL(/\/pt-br\/principios\/p05$/);
    await page.goto('/principles/p05');
    await expect(page).toHaveURL(/\/principles\/p05$/);
  });

  test('escenario 4 · la preferencia orienta la raíz y se puede olvidar sin cuenta', async ({ page }, info) => {
    test.skip(info.project.name === 'sin-js', 'la preferencia requiere JavaScript');
    await page.goto('/es');
    await page.evaluate(() => localStorage.setItem('sh-idioma', 'es'));
    await page.goto('about:blank');
    await page.goto('/');
    await expect(page).toHaveURL(/\/es$/);
    const selector = page.locator('[data-selector-idioma]');
    await selector.getByRole('button', { name: 'Olvidar mi elección de idioma' }).click();
    await expect(selector.getByRole('status')).toContainText('inglés');
    await page.goto('about:blank');
    await page.goto('/');
    await expect(page).toHaveURL(/\/$/);
  });

  test('sin JavaScript la raíz muestra inglés aunque haya preferencia', async ({ page }, info) => {
    test.skip(info.project.name !== 'sin-js', 'solo sin JavaScript');
    await page.goto('/');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  });

  test('con el almacenamiento bloqueado el sitio funciona', async ({ page }, info) => {
    test.skip(info.project.name === 'sin-js', 'requiere JavaScript');
    await page.addInitScript(() => {
      Object.defineProperty(window, 'localStorage', { get() { throw new DOMException('bloqueado', 'SecurityError'); } });
    });
    const errores: string[] = [];
    page.on('pageerror', (e) => errores.push(e.message));
    await page.goto('/');
    await page.locator('[data-selector-idioma]').getByRole('link', { name: 'Português (Brasil)' }).click();
    await expect(page).toHaveURL(/\/pt-br$/);
    expect(errores).toEqual([]);
  });
});
