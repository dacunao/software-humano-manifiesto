import { expect, test } from '@playwright/test';

// JS-06 · Pasar de doctrina a práctica (spec.md, FR-007 v1.1).
test.describe('JS-06 · Pasar de doctrina a práctica', () => {
  test('escenario 1 · Aplicación reúne la ruta Construir con su texto canónico', async ({ page }) => {
    await page.goto('/es/aplicacion');
    for (const id of ['doctrina', 'flujo', 'artefactos', 'detenciones', 'contrato', 'practica', 'ejemplo'])
      await expect(page.locator(`section#${id} h2`), id).toBeVisible();
    for (const id of ['d01', 'f01', 'a08', 'cr05', 'o09']) await expect(page.locator(`#${id}`), id).toHaveCount(1);
    await expect(page.getByText('Ruta de lectura · Construir')).toBeVisible();
  });

  test('escenario 2 · una detención se identifica y lleva a las siete razones', async ({ page }) => {
    await page.goto('/es/aplicacion');
    await expect(page.locator('section#detenciones')).toContainText('no debería empezar a construir');
    await page.locator('section#detenciones a[href="/es/verificacion#bolsillo"]').click();
    const razones = page.locator('section#bolsillo');
    await expect(razones).toContainText('STOP01');
    await expect(razones).toContainText('STOP07');
  });
});
