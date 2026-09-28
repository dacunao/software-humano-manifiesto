import { expect, test } from '@playwright/test';

// Texto íntegro en tres columnas (decisión del 2026-09-27): el panel derecho sigue la lectura.
test.describe('texto íntegro · panel «En esta sección»', () => {
  test('muestra los h3 y h4 de la sección en pantalla y la marca en el índice', async ({ page }, info) => {
    test.skip(info.project.name !== 'js', 'solo escritorio con JavaScript');
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/es/manifiesto/texto-integro#sh-fund');
    const panel = page.locator('.en-esta-seccion');
    await expect(panel).toBeVisible();
    await expect(panel.locator('[data-seccion="sh-fund"]')).toBeVisible();
    await expect(panel).toContainText('Cuándo el fundamento es identificable');
    await expect(page.locator('.indice-manifiesto a[href="#sh-fund"]')).toHaveAttribute('aria-current', 'location');
  });

  for (const [ruta, seccion, esperado] of [
    ['/es/principios#fundamento', 'fundamento', 'Cuándo el fundamento es identificable'],
    ['/es/aplicacion#ejemplo', 'ejemplo', 'Diagnóstico desde el manifiesto'],
    ['/es/verificacion#antipatrones', 'antipatrones', 'Una advertencia sobre la simplicidad'],
  ] as const) {
    test(`el mismo esquema en ${ruta.split('#')[0]}`, async ({ page }, info) => {
      test.skip(info.project.name !== 'js', 'solo escritorio con JavaScript');
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto(ruta);
      const panel = page.locator('.en-esta-seccion');
      await expect(panel.locator(`[data-seccion="${seccion}"]`)).toBeVisible();
      await expect(panel).toContainText(esperado);
      await expect(page.locator(`.indice-lateral a[href="#${seccion}"]`)).toHaveAttribute('aria-current', 'location');
    });
  }

  test('sin JavaScript el panel no aparece y el índice izquierdo funciona', async ({ page }, info) => {
    test.skip(info.project.name !== 'sin-js', 'solo sin JavaScript');
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/es/manifiesto/texto-integro');
    await expect(page.locator('.en-esta-seccion')).toBeHidden();
    await expect(page.locator('.indice-manifiesto a[href="#sh-fund"]')).toBeVisible();
  });
});
