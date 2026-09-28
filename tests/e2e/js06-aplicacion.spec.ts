import { expect, test } from '@playwright/test';

// JS-06 · Pasar de doctrina a práctica (spec.md).
test.describe('JS-06 · Pasar de doctrina a práctica', () => {
  test('escenario 1 · Aplicación explica los siete temas de FR-007', async ({ page }) => {
    await page.goto('/es/aplicacion');
    for (const id of ['fundamento', 'job-stories', 'flujo', 'artefactos', 'contrato', 'detenciones', 'terminado'])
      await expect(page.locator(`section#${id} h2`), id).toBeVisible();
    // El detalle canónico (F01–F08, A01–A08, CR01–CR08) está a un paso, con anclas propias.
    for (const id of ['f01', 'a08', 'cr05']) await expect(page.locator(`#${id}`), id).toHaveCount(1);
  });

  test('escenario 2 · las razones para detener una implementación están a la vista', async ({ page }) => {
    await page.goto('/es/aplicacion');
    const razones = page.locator('section#detenciones > figure.cita-canonica');
    await expect(razones).toBeVisible();
    await expect(razones).toContainText('STOP01');
    await expect(razones).toContainText('STOP07');
  });
});
