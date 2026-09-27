import { expect, test } from '@playwright/test';

// JS-01 · Comprender el problema (spec.md). El contenido se redacta primero en español.
test.describe('JS-01 · Comprender el problema', () => {
  test('escenario 1 · los actos 1 y 2 se leen sin abrir detalles', async ({ page }) => {
    await page.goto('/es');
    const acto1 = page.locator('section#acto-1');
    const acto2 = page.locator('section#acto-2');
    await expect(acto1.getByRole('heading', { level: 2 })).toBeVisible();
    await expect(acto1.locator('.pregunta')).toContainText('qué pasa a limitar la calidad');
    await expect(acto2.getByRole('heading', { level: 2 })).toBeVisible();
    // La explicación de cada acto es visible sin abrir ningún <details>.
    await expect(acto1.locator(':scope > .bloque-editorial').first()).toBeVisible();
    await expect(acto2.locator(':scope > .bloque-editorial').first()).toBeVisible();
    const orden = await page.locator('section.seccion').evaluateAll((s) => s.map((e) => e.id));
    expect(orden.indexOf('acto-1')).toBeLessThan(orden.indexOf('acto-2'));
  });

  test('escenario 2 · la comparación está identificada como ejemplo, no como doctrina', async ({ page }) => {
    await page.goto('/es');
    const lados = page.locator('section#acto-2 .comparacion .bloque-editorial');
    await expect(lados).toHaveCount(2);
    await expect(lados.nth(0)).toHaveAttribute('data-tipo', 'counterexample');
    await expect(lados.nth(0).locator('.rotulo-contenido')).toHaveText('Contraejemplo');
    await expect(lados.nth(1)).toHaveAttribute('data-tipo', 'example');
    await expect(lados.nth(1).locator('.rotulo-contenido')).toHaveText('Ejemplo');
  });
});
