import { expect, test } from '@playwright/test';

// Panel «En esta sección» e índice del manifiesto (RQ-06 enmendado, RQ-15, T138).
test.describe('lectura · índice y panel «En esta sección»', () => {
  for (const [ruta, seccion, esperado] of [
    ['/es/manifiesto/fundamento-de-producto#sh-fund', 'sh-fund', 'Cuándo el fundamento es identificable'],
    ['/es/manifiesto/gobernanza#evolucion', 'evolucion', 'Control de cambios de las versiones 2.0 y 2.1'],
    ['/es/manifiesto/verificar#sh-ap', 'sh-ap', 'Una advertencia sobre la simplicidad'],
  ] as const) {
    test(`el panel sigue la lectura en ${ruta.split('#')[0]}`, async ({ page }, info) => {
      test.skip(info.project.name !== 'js', 'solo escritorio con JavaScript');
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto(ruta);
      const panel = page.locator('.en-esta-seccion');
      await expect(panel.locator(`[data-seccion="${seccion}"]`)).toBeVisible();
      await expect(panel).toContainText(esperado);
      await expect(page.locator(`.indice-lateral a[href="#${seccion}"]`)).toHaveAttribute('aria-current', 'location');
    });
  }

  test('el índice agrupa las divisiones por ruta y marca la actual', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/es/manifiesto/verificar');
    const indice = page.locator('.indice-lateral');
    for (const r of ['Comprender', 'Decidir', 'Construir', 'Verificar', 'Llevarlo a la práctica']) await expect(indice).toContainText(r);
    await expect(indice.locator('a[aria-current="page"]')).toHaveAttribute('href', '/es/manifiesto/verificar');
  });

  test('sin JavaScript el panel no aparece y el índice funciona', async ({ page }, info) => {
    test.skip(info.project.name !== 'sin-js', 'solo sin JavaScript');
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/es/manifiesto/fundamento-de-producto');
    await expect(page.locator('.en-esta-seccion')).toBeHidden();
    await expect(page.locator('.indice-lateral a[href="#sh-fund"]')).toBeVisible();
  });

  test('en móvil el índice va plegado y el título está en la primera pantalla (T138)', async ({ page }, info) => {
    test.skip(info.project.name !== 'movil', 'solo móvil');
    await page.goto('/es/manifiesto/construir-con-ia');
    const plegable = page.locator('[data-indice-plegable]');
    await expect(plegable).not.toHaveAttribute('open', '');
    const alto = page.viewportSize()!.height;
    const titulo = await page.locator('main h1').boundingBox();
    expect(titulo!.y).toBeLessThan(alto * 0.8);
    // Las tablas del núcleo no desbordan (T140).
    const desbordan = await page.locator('main table').evaluateAll((ts) => ts.filter((t) => t.scrollWidth > t.clientWidth + 2).length);
    expect(desbordan).toBe(0);
  });
});
