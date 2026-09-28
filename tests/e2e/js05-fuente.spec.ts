import { expect, test } from '@playwright/test';

// JS-05 · Consultar y citar la fuente (spec.md).
test.describe('JS-05 · Consultar y citar la fuente', () => {
  test('escenario 1 · una URL profunda llega a la sección con la versión visible', async ({ page }) => {
    await page.goto('/es/manifiesto#cr03');
    await expect(page.locator('#cr03')).toBeInViewport();
    await expect(page.locator('#cr03')).toContainText('CR03');
    await expect(page.locator('.version-nucleo')).toContainText('2.1');
  });

  test('escenario 2 · el núcleo está íntegro, con índice e identificadores', async ({ page }) => {
    await page.goto('/es/manifiesto');
    await expect(page.locator('.indice-manifiesto li')).toHaveCount(24);
    for (const id of ['sh-index', 'p01', 'p10', 'sh-fund', 'd01', 'f08', 'a08', 'stop07', 'o09', 'v12', 'sh-pocket'])
      await expect(page.locator(`#${id}`), id).toHaveCount(1);
    await expect(page.locator('article.manifiesto')).toContainText('Núcleo del manifiesto para el desarrollo de software humano');
  });

  test('escenario 3 · cada cita fuera del manifiesto conserva su procedencia', async ({ page }) => {
    await page.goto('/es');
    const citas = page.locator('figure.cita-canonica');
    const n = await citas.count();
    expect(n).toBeGreaterThan(0);
    for (let i = 0; i < n; i++) await expect(citas.nth(i).locator('.fuente a')).toHaveAttribute('href', /^\/es\/manifiesto#/);
  });
});
