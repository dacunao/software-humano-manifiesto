import { expect, test } from '@playwright/test';

// Navegación estándar (decisión del 2026-09-29, T201–T204): izquierda, las páginas; derecha, «En esta página».
test.describe('lectura · páginas a la izquierda, «En esta página» a la derecha', () => {
  for (const [ruta, seccion, esperado] of [
    ['/es/manifiesto/fundamento-de-producto#sh-fund', 'sh-fund', 'Cuándo el fundamento es identificable'],
    ['/es/manifiesto/gobernanza#evolucion', 'evolucion', 'Control de cambios de las versiones 2.0 y 2.1'],
    ['/es/manifiesto/verificar#sh-ap', 'sh-ap', 'Una advertencia sobre la simplicidad'],
  ] as const) {
    test(`«En esta página» muestra todas las secciones y marca la actual en ${ruta.split('#')[0]}`, async ({ page }, info) => {
      test.skip(info.project.name !== 'js', 'solo escritorio con JavaScript');
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto(ruta);
      const derecha = page.locator('.lienzo > .en-esta-pagina');
      await expect(derecha).toBeVisible();
      await expect(derecha).toContainText(esperado);
      await expect(derecha.locator(`a[href="#${seccion}"]`)).toHaveAttribute('aria-current', 'location');
      // Todas las secciones de la página, no solo la actual.
      const secciones = await page.locator('main section.seccion[id]').evaluateAll((s) => s.map((x) => x.id));
      for (const id of secciones) await expect(derecha.locator(`li.nivel-2 > a[href="#${id}"]`)).toHaveCount(1);
      // La izquierda no repite las secciones: solo páginas.
      await expect(page.locator('.indice-lateral a[href^="#"]')).toHaveCount(0);
    });
  }

  test('una sección sin subtítulos también queda marcada', async ({ page }, info) => {
    test.skip(info.project.name !== 'js', 'solo escritorio con JavaScript');
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/es/manifiesto#alcance');
    await expect(page.locator('.lienzo > .en-esta-pagina a[href="#alcance"]')).toHaveAttribute('aria-current', 'location');
  });

  test('Acerca de no tiene columna izquierda y sus secciones van a la derecha', async ({ page }, info) => {
    test.skip(info.project.name !== 'js', 'solo escritorio');
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/es/acerca');
    await expect(page.locator('.indice-lateral')).toHaveCount(0);
    await expect(page.locator('.lienzo > .en-esta-pagina a[href="#licencias"]')).toBeVisible();
  });

  test('el menú «Manifiesto» abre el Mapa del manifiesto', async ({ page }) => {
    await page.goto('/es/acerca');
    await expect(page.locator('.navegacion-global a', { hasText: 'Manifiesto' })).toHaveAttribute('href', '/es/manifiesto/mapa');
    await page.goto('/es/manifiesto/mapa');
    await expect(page.locator('.navegacion-global a', { hasText: 'Manifiesto' })).toHaveAttribute('aria-current', 'page');
  });

  test('el índice agrupa las divisiones por ruta y marca la actual', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/es/manifiesto/verificar');
    const indice = page.locator('.indice-lateral');
    for (const r of ['Comprender', 'Decidir', 'Construir', 'Verificar', 'Llevarlo a la práctica']) await expect(indice).toContainText(r);
    await expect(indice.locator('a[aria-current="page"]')).toHaveAttribute('href', '/es/manifiesto/verificar');
  });

  test('sin JavaScript las dos columnas se leen completas', async ({ page }, info) => {
    test.skip(info.project.name !== 'sin-js', 'solo sin JavaScript');
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/es/manifiesto/fundamento-de-producto');
    await expect(page.locator('.lienzo > .en-esta-pagina a[href="#sh-fund"]')).toBeVisible();
    await expect(page.locator('.indice-lateral a[href="/es/manifiesto/verificar"]')).toBeVisible();
  });

  test('en móvil, «Contenido» trae las páginas y «En esta página»', async ({ page }, info) => {
    test.skip(info.project.name !== 'movil', 'solo móvil');
    await page.goto('/es/manifiesto');
    await page.locator('.indice-plegable > summary').click();
    await expect(page.locator('.indice-plegable .indice-lateral a[href="/es/manifiesto/mapa"]')).toBeVisible();
    await expect(page.locator('.indice-plegable .en-esta-pagina-movil a[href="#alcance"]')).toBeVisible();
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

test('T243 · al final de la página, «En esta página» marca la última sección', async ({ page, javaScriptEnabled }, info) => {
  test.skip(!javaScriptEnabled || info.project.name !== 'js', 'escritorio con JavaScript');
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/es/acerca');
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await expect(page.locator('nav.en-esta-pagina a[href="#contacto"]')).toHaveAttribute('aria-current', 'location');
  await expect(page.locator('nav.en-esta-pagina a[aria-current="location"]')).toHaveCount(1);
});

test('T242 · el pie separa la fecha y Procedencia con espacios', async ({ page }) => {
  await page.goto('/es/acerca');
  await expect(page.locator('footer .procedencia').first()).toContainText(/\d · Procedencia/);
});
