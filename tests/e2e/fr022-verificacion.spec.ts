import { expect, test } from '@playwright/test';

// FR-022 · Verificación (PRD v1.1): la ruta Verificar tiene su propia superficie.
test.describe('FR-022 · Verificación', () => {
  test('presenta dimensiones, scorecard, revisión, antipatrones, terminado y guía de bolsillo', async ({ page }) => {
    await page.goto('/es/verificacion');
    for (const id of ['dimensiones', 'scorecard', 'revision', 'antipatrones', 'terminado', 'bolsillo'])
      await expect(page.locator(`section#${id} h2`), id).toBeVisible();
    for (const id of ['v01', 'v12', 'stop01', 'stop07']) await expect(page.locator(`#${id}`), id).toHaveCount(1);
    await expect(page.locator('section#terminado')).toContainText('Un desarrollo está completo cuando');
  });

  test('es alcanzable desde el menú en los tres idiomas', async ({ page }) => {
    for (const [inicio, destino] of [['/', '/verification'], ['/es', '/es/verificacion'], ['/pt-br', '/pt-br/verificacao']] as const) {
      await page.goto(inicio);
      await expect(page.locator(`.navegacion-global a[href="${destino}"]`)).toHaveCount(1);
    }
  });
});
