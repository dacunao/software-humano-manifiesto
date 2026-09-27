import { expect, test } from '@playwright/test';

// JS-02 · Descubrir la tesis (spec.md).
test.describe('JS-02 · Descubrir la tesis', () => {
  test('escenario 1 · la tesis y el texto canónico breve son visibles y distinguibles', async ({ page }) => {
    await page.goto('/es');
    const acto3 = page.locator('section#acto-3');
    await expect(acto3.locator(':scope > .bloque-editorial').first()).toBeVisible();
    const cita = acto3.locator(':scope > figure.cita-canonica');
    await expect(cita).toBeVisible();
    await expect(cita.locator('figcaption')).toHaveText('Texto canónico');
    await expect(cita).toContainText('El propósito del software es ampliar lo que una persona puede hacer.');
  });

  test('escenario 2 · un enlace lleva directo al pasaje original', async ({ page }) => {
    await page.goto('/es');
    await page.locator('section#acto-3 > figure.cita-canonica .fuente a').click();
    await expect(page).toHaveURL(/\/es\/manifiesto#texto-canonico-03$/);
    await expect(page.locator('#texto-canonico-03')).toBeInViewport();
  });
});
