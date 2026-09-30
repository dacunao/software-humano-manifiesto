import { readFileSync } from 'node:fs';
import { expect, test } from '@playwright/test';

// T227 · Huella de construcción (decisión del 2026-09-29): el pie dice con qué se hizo el sitio, con las
// versiones de los datos del proyecto, y no las repite en otro lugar del pie.
const speckit = (JSON.parse(readFileSync('.specify/init-options.json', 'utf8')) as { speckit_version: string }).speckit_version;
const preset = readFileSync('src/content/estado-adaptacion.yaml', 'utf8').match(/^version: (.+)$/m)![1]!;

for (const [url, speckitHref, inicio] of [
  ['/', '/speckit', 'Built with the Manifiesto (core v2.1)'],
  ['/es/principios', '/es/speckit', 'Hecho con el Manifiesto (núcleo v2.1)'],
  ['/pt-br/sobre', '/pt-br/speckit', 'Feito com o Manifiesto (núcleo v2.1)'],
] as const) {
  test(`huella de construcción en el pie · ${url}`, async ({ page }) => {
    await page.goto(url);
    const linea = page.locator('footer .hecho-con');
    await expect(linea).toContainText(inicio);
    await expect(linea).toContainText(`SpecKit ${speckit}`);
    await expect(linea.locator(`a[href="${speckitHref}"]`)).toContainText(preset);
    await expect(page.locator('footer .procedencia').first()).not.toContainText('v2.1');
    await expect(page.locator('footer .procedencia').first()).not.toContainText(preset);
    await expect(linea).not.toContainText(/sin publicar|not yet published|não publicada/);
  });
}
