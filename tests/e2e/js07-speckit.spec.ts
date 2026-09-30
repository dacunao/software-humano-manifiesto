import { expect, test } from '@playwright/test';
import { readFileSync } from 'node:fs';

const instalada = (JSON.parse(readFileSync('.specify/presets/.registry', 'utf8')) as { presets: Record<string, { version: string }> })
  .presets['software-humano']!.version;
const REPO = 'https://github.com/dacunao/software-humano-speckit';
const campo = (k: string) => readFileSync('src/content/estado-adaptacion.yaml', 'utf8').match(new RegExp(`^  ${k}: (.+)$`, 'm'))![1]!;

// JS-07 · Comprender la implementación en SpecKit (spec.md).
test.describe('JS-07 · Comprender la implementación en SpecKit', () => {
  test('escenario 1 · distingue núcleo, constitución, anexo, preset y SpecKit nativo', async ({ page }) => {
    await page.goto('/es/speckit');
    const capas = page.locator('section#capas');
    for (const t of ['núcleo del manifiesto', 'constitución operativa', 'anexo de aplicación', 'preset', 'SpecKit nativo'])
      await expect(capas).toContainText(new RegExp(t, 'i'));
  });

  test('escenario 2 · publicada (2026-09-30): enlaces al repositorio, sin formulario ni instrucciones copiadas', async ({ page }) => {
    for (const ruta of ['/es/speckit', '/es', '/speckit']) {
      await page.goto(ruta);
      await expect(page.locator('form')).toHaveCount(0);
      await expect(page.locator('main button:not([data-copiar])')).toHaveCount(0);
      // Las descargas propias siguen siendo solo las del núcleo (FR-003 v1.2); la del preset está en GitHub.
      for (const href of await page.locator('a[download], a[href*="descarga"]').evaluateAll((as) => as.map((a) => a.getAttribute('href'))))
        expect(href).toMatch(/^\/descargas\/nucleo-v2\.1-(es|en|pt-br)\.md$/);
      const ld = (await page.locator('script[type="application/ld+json"]').allTextContents()).join('');
      if (ruta.endsWith('speckit')) {
        expect(ld).toContain('"@type":"SoftwareSourceCode"');
        expect(ld).toContain(`"codeRepository":"${REPO}"`);
      } else expect(ld).not.toContain('SoftwareSourceCode');
    }
  });

  test('escenario 3 · el estado publicado coincide con lo instalado y verificado', async ({ page }) => {
    await page.goto('/es/speckit');
    const estado = page.locator('section#estado .estado-adaptacion');
    await expect(estado).toHaveAttribute('data-version', instalada);
    await expect(estado).toContainText(`versión ${instalada}`);
    await expect(estado).not.toContainText('no está publicada');
    await expect(estado).toContainText(`está publicada: versión ${campo('version')}, con el preset ${campo('preset')}, que funciona igual que el ${instalada}`);
    await expect(estado.locator(`a[href="${campo('page')}"]`)).toBeVisible();
    await expect(estado.locator(`a[href="${REPO}"]`)).toBeVisible();
    await expect(estado.locator('code.huella')).toHaveText(campo('sha256'));
    await expect(estado).toContainText('No es una integración oficial');
  });
});
