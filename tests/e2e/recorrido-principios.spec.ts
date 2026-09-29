import { expect, test } from '@playwright/test';

// T217 · Hallazgos del recorrido contra los principios (2026-09-29): que la navegación no sea un contraejemplo.
test.describe('recorrido contra los principios', () => {
  test('R1 · la fuente del principio está en el idioma de la página', async ({ page }) => {
    await page.goto('/principles/p06');
    await expect(page.locator('section#fuente')).toContainText('PRINCIPLE 6 · P06');
    await expect(page.locator('section#fuente')).not.toContainText('PRINCIPIO');
  });

  test('R2 · el recorrido termina con pasos siguientes', async ({ page }) => {
    await page.goto('/es/manifiesto/guia-de-bolsillo');
    const fin = page.locator('.fin-recorrido');
    await expect(fin.locator('a[href="/es/manifiesto/mapa"]')).toBeVisible();
    await expect(fin.locator('a[href="/es/speckit"]')).toBeVisible();
    await expect(fin.locator('a[download]')).toBeVisible();
  });

  test('R3 · en el Mapa, las nueve divisiones van antes del índice de identificadores', async ({ page }) => {
    await page.goto('/es/manifiesto/mapa');
    const ids = await page.locator('main section.seccion[id]').evaluateAll((s) => s.map((x) => x.id));
    expect(ids.indexOf('recorrido')).toBeLessThan(ids.indexOf('sh-index'));
  });

  test('R4 y R5 · rótulo breve, aviso una vez y enlaces que nombran su destino', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('main')).not.toContainText('THE SPANISH ORIGINAL RETAINS AUTHORITY');
    await expect(page.locator('footer')).toContainText('which retains authority');
    await expect(page.locator('main a', { hasText: 'Read the complete passage' })).toHaveCount(0);
    await expect(page.locator('main a', { hasText: 'Read in The manifesto' }).first()).toBeVisible();
  });

  test('R6 · el estado de SpecKit no repite que es independiente', async ({ page }) => {
    await page.goto('/speckit');
    const texto = await page.locator('.estado-adaptacion').innerText();
    expect(texto.match(/independent adaptation/gi)).toHaveLength(1);
  });

  test('R7 · «Núcleo v2.1» es un dato y la página de error lleva al Mapa', async ({ page }) => {
    await page.goto('/es');
    await expect(page.locator('.navegacion-global .version a')).toHaveCount(0);
    await page.goto('/es/404');
    await expect(page.locator('main a[href="/es/manifiesto/mapa"]')).toBeVisible();
  });

  test('R8 · en el teléfono, «Contenido» no nombra una sección antes de llegar a ella', async ({ page, javaScriptEnabled }, info) => {
    test.skip(!javaScriptEnabled || info.project.name !== 'movil', 'solo teléfono con JavaScript');
    await page.goto('/es');
    await expect(page.locator('[data-seccion-actual]')).toHaveText('');
  });

  test('R9 · los subresultados de la búsqueda no muestran «#»', async ({ page, javaScriptEnabled }, info) => {
    test.skip(!javaScriptEnabled || info.project.name === 'movil', 'escritorio con JavaScript');
    await page.goto('/principles/p06');
    await page.locator('[data-abrir-busqueda]').click();
    await page.locator('dialog.busqueda input').fill('attention');
    await expect(page.locator('dialog.busqueda .busqueda-resultados a').first()).toBeVisible();
    const textos = await page.locator('dialog.busqueda .busqueda-resultados a').allInnerTexts();
    expect(textos.filter((x) => x.trim().startsWith('#'))).toEqual([]);
  });

  test('R11 · al cambiar de idioma se conserva la posición', async ({ page, javaScriptEnabled }, info) => {
    test.skip(!javaScriptEnabled || info.project.name !== 'js', 'escritorio con JavaScript');
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/manifesto/building-with-ai');
    await page.mouse.wheel(0, 6000);
    await page.waitForTimeout(400);
    await page.locator('[data-selector-idioma] a[hreflang="es"]').click();
    await expect(page).toHaveURL(/\/es\/manifiesto\/construir-con-ia#.+/);
    expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(1000);
  });
});
