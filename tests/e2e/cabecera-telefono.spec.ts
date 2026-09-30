import { expect, test } from '@playwright/test';

// T253 · Nombre en la cabecera del teléfono (decisión del 2026-09-30): desde 360 px se ve «Manifiesto»,
// sin superposición ni desborde; «Buscar» es una lupa con nombre accesible y 44 × 44 px.
for (const ancho of [320, 360, 375, 430]) {
  test(`cabecera del teléfono a ${ancho} px`, async ({ page, javaScriptEnabled }, info) => {
    test.skip(!javaScriptEnabled || info.project.name !== 'js', 'una vez, con JavaScript');
    await page.setViewportSize({ width: ancho, height: 800 });
    await page.goto('/es/manifiesto/construir-con-ia');
    const nombre = page.locator('.cabecera .marca-nombre');
    if (ancho >= 360) await expect(nombre).toBeVisible();
    else expect(await nombre.evaluate((e) => e.getBoundingClientRect().width)).toBeLessThanOrEqual(1);
    const buscar = page.getByRole('button', { name: 'Buscar' });
    await expect(buscar).toBeVisible();
    const b = (await buscar.boundingBox())!;
    expect(b.width).toBeGreaterThanOrEqual(44);
    expect(b.height).toBeGreaterThanOrEqual(44);
    const marca = (await page.locator('.cabecera .marca a').boundingBox())!;
    expect(marca.x + marca.width).toBeLessThanOrEqual(b.x - 4);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(ancho);
    const alto = await page.locator('.cabecera').evaluate((e) => e.getBoundingClientRect().height);
    expect(alto).toBeLessThanOrEqual(60);
  });
}
