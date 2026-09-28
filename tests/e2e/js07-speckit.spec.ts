import { expect, test } from '@playwright/test';
import { readFileSync } from 'node:fs';

const instalada = (JSON.parse(readFileSync('.specify/presets/.registry', 'utf8')) as { presets: Record<string, { version: string }> })
  .presets['software-humano']!.version;

// JS-07 · Comprender la implementación en SpecKit (spec.md).
test.describe('JS-07 · Comprender la implementación en SpecKit', () => {
  test('escenario 1 · distingue núcleo, constitución, anexo, preset y SpecKit nativo', async ({ page }) => {
    await page.goto('/es/speckit');
    const capas = page.locator('section#capas');
    for (const t of ['núcleo del manifiesto', 'constitución operativa', 'anexo de aplicación', 'preset', 'SpecKit nativo'])
      await expect(capas).toContainText(new RegExp(t, 'i'));
  });

  test('escenario 2 · sin botón, formulario ni enlace de descarga mientras no esté publicada', async ({ page }) => {
    for (const ruta of ['/es/speckit', '/es', '/speckit']) {
      await page.goto(ruta);
      await expect(page.locator('form')).toHaveCount(0);
      await expect(page.locator('main button')).toHaveCount(0);
      await expect(page.getByRole('link', { name: /descarg|instal|download|install|baixar/i })).toHaveCount(0);
      const ld = await page.locator('script[type="application/ld+json"]').allTextContents();
      expect(ld.join('')).not.toContain('SoftwareSourceCode');
    }
  });

  test('escenario 3 · el estado publicado coincide con lo instalado y verificado', async ({ page }) => {
    await page.goto('/es/speckit');
    const estado = page.locator('section#estado .estado-adaptacion');
    await expect(estado).toHaveAttribute('data-version', instalada);
    await expect(estado).toContainText(`versión ${instalada}`);
    await expect(estado).toContainText('no está publicada');
    await expect(estado).toContainText('No es una integración oficial');
  });
});
