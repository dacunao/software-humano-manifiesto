import { expect, test } from '@playwright/test';

// JS-04 · Experimentar la diferencia (spec.md). Se ejecuta en los proyectos js, sin-js y movimiento-reducido.
test.describe('JS-04 · Experimentar la diferencia', () => {
  test('escenario 1 · la comparación permite nombrar la carga que introduce cada respuesta', async ({ page }) => {
    await page.goto('/es');
    const acto5 = page.locator('section#acto-5');
    await expect(acto5.locator(':scope > .bloque-editorial[data-tipo="example"]')).toHaveCount(3);
    const lados = acto5.locator('.comparacion .bloque-editorial');
    await expect(lados.nth(0)).toHaveAttribute('data-tipo', 'counterexample');
    await expect(lados.nth(1)).toHaveAttribute('data-tipo', 'example');
    for (const i of [0, 1]) await expect(lados.nth(i)).toBeVisible();
  });

  test('escenario 2 · sin JavaScript o con movimiento reducido no se pierde información', async ({ page }) => {
    await page.goto('/es');
    const acto5 = page.locator('section#acto-5');
    await expect(acto5.locator('.comparacion')).toContainText('Sin el principio');
    await expect(acto5.locator('.comparacion')).toContainText('Con el principio');
    // Ninguna animación en curso bloquea la lectura.
    const animaciones = await page.evaluate(() => document.getAnimations().filter((a) => a.playState === 'running').length);
    expect(animaciones).toBe(0);
  });
});
