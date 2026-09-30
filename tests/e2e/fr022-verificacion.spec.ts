import { expect, test } from '@playwright/test';

// FR-022 · Verificar (PRD v1.2): su división, con enlaces a la definición de terminado y a la guía de bolsillo.
test.describe('FR-022 · Verificar', () => {
  test('presenta dimensiones, scorecard, revisión y antipatrones, y enlaza a terminado y bolsillo', async ({ page }) => {
    await page.goto('/es/manifiesto/verificar');
    for (const id of ['dimensiones', 'sh-score', 'revision', 'sh-ap']) await expect(page.locator(`section#${id} h2`), id).toBeVisible();
    for (const id of ['v01', 'v12']) await expect(page.locator(`#${id}`), id).toHaveCount(1);
    const relacionados = page.locator('nav.relacionados');
    await expect(relacionados.locator('a[href="/es/manifiesto/gobernanza#sh-done"]')).toHaveCount(1);
    await expect(relacionados.locator('a[href="/es/manifiesto/guia-de-bolsillo"]')).toHaveCount(1);
    await page.goto('/es/manifiesto/gobernanza#sh-done');
    await expect(page.locator('section#sh-done')).toContainText('Un desarrollo está completo cuando');
  });

  test('el menú tiene cuatro entradas más GitHub y el índice del manifiesto lleva a Verificar en los tres idiomas', async ({ page }) => {
    for (const [inicio, destino] of [['/manifesto', '/manifesto/verify'], ['/es/manifiesto', '/es/manifiesto/verificar'], ['/pt-br/manifesto', '/pt-br/manifesto/verificar']] as const) {
      await page.goto(inicio);
      await expect(page.locator('.navegacion-global > ul > li')).toHaveCount(5);
      await expect(page.locator(`.indice-lateral a[href="${destino}"]`)).toHaveCount(1);
    }
  });
});
