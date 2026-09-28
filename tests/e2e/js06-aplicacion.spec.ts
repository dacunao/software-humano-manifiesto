import { expect, test } from '@playwright/test';

// JS-06 · Pasar de doctrina a práctica (spec.md, FR-007 y FR-022 v1.2): divisiones 4 a 7.
test.describe('JS-06 · Pasar de doctrina a práctica', () => {
  test('escenario 1 · cada tema en su división y en el orden del núcleo', async ({ page }) => {
    const casos: [string, string[], string[]][] = [
      ['/es/manifiesto/construir-con-ia', ['doctrina', 'flujo', 'artefactos', 'sh-stop', 'contrato'], ['d01', 'f01', 'a08', 'cr05', 'o09']],
      ['/es/manifiesto/verificar', ['dimensiones', 'sh-score', 'revision', 'sh-ap'], ['v01', 'v12']],
      ['/es/manifiesto/ejemplo-aplicado', ['ejemplo'], []],
      ['/es/manifiesto/gobernanza', ['sh-gov', 'evolucion', 'sh-done'], []],
    ];
    for (const [ruta, secciones, ids] of casos) {
      await page.goto(ruta);
      for (const id of secciones) await expect(page.locator(`section#${id} h2`), `${ruta} ${id}`).toBeVisible();
      for (const id of ids) await expect(page.locator(`#${id}`), id).toHaveCount(1);
    }
    await page.goto('/es/manifiesto/construir-con-ia');
    await expect(page.getByText('Ruta de lectura · Construir')).toBeVisible();
  });

  test('escenario 2 · una detención se identifica y lleva a las siete razones', async ({ page }) => {
    await page.goto('/es/manifiesto/construir-con-ia');
    await expect(page.locator('section#sh-stop')).toContainText('no debería empezar a construir');
    await page.locator('section#sh-stop a[href="/es/manifiesto/guia-de-bolsillo#sh-pocket"]').click();
    const razones = page.locator('section#sh-pocket');
    await expect(razones).toContainText('STOP01');
    await expect(razones).toContainText('STOP07');
  });
});
