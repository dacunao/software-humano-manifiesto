import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

// FR-023 · búsqueda (RQ-16 enmendado: motor Pagefind, índice desde nuestros registros, interfaz propia).
test.describe('FR-023 · búsqueda', () => {
  test.skip(({ javaScriptEnabled }) => !javaScriptEnabled, 'la búsqueda es una mejora progresiva');

  const buscar = async (page: import('@playwright/test').Page, ruta: string, nombreBoton: string, q: string) => {
    await page.goto(ruta);
    await page.getByRole('button', { name: nombreBoton }).click();
    const dialogo = page.getByRole('dialog');
    await expect(dialogo).toBeVisible();
    await expect(dialogo.getByRole('searchbox')).toBeFocused();
    await dialogo.getByRole('searchbox').fill(q);
    return dialogo;
  };

  test('«CR03» lleva a su casa, como subresultado de la página, y el término queda resaltado', async ({ page }) => {
    const dialogo = await buscar(page, '/es/manifiesto', 'Buscar', 'CR03');
    const sub = dialogo.locator('.busqueda-resultados a.subresultado', { hasText: 'CR03' }).first();
    await expect(sub).toHaveAttribute('href', /^\/es\/manifiesto\/construir-con-ia\?resaltar=cr03#cr03$/i);
    await expect(dialogo.locator('.resultado-pagina').first()).toContainText('Construir con IA');
    await sub.click();
    await expect(page).toHaveURL(/\/es\/manifiesto\/construir-con-ia\?resaltar=cr03#cr03$/i);
    await expect(page.locator('main mark.pagefind-highlight').first()).toBeVisible();
  });

  test('las raíces de palabras: «decisiones» encuentra «decisión»', async ({ page }) => {
    const dialogo = await buscar(page, '/es/manifiesto', 'Buscar', 'decisiones');
    await expect(dialogo.locator('.busqueda-resultados mark', { hasText: /^decisión$/i }).first()).toBeVisible();
  });

  test('un resultado por página y sección, sin títulos repetidos, y solo en el idioma vigente', async ({ page }) => {
    const dialogo = await buscar(page, '/about', 'Search', 'manifesto');
    await expect(dialogo.locator('.resultado-pagina').first()).toBeVisible();
    const pares = await dialogo.locator('.resultado-pagina').evaluateAll((ss) => ss.flatMap((s) => {
      const pagina = s.querySelector('.resultado-titulo')?.textContent;
      return [...s.querySelectorAll('.resultado-titulo')].map((t) => `${pagina}|${t.textContent}`);
    }));
    expect(new Set(pares).size).toBe(pares.length);
    // «botella» solo aparece en una explicación en español aún sin traducir: el índice inglés no la tiene.
    await dialogo.getByRole('searchbox').fill('botella');
    await expect(dialogo.getByRole('status')).toContainText('Nothing matches');
  });

  test('el índice español sí contiene esa explicación (control de la prueba anterior)', async ({ page }) => {
    const dialogo = await buscar(page, '/es/manifiesto', 'Buscar', 'botella');
    await expect(dialogo.locator('.resultado-pagina').first()).toContainText('Construir con IA');
  });

  test('sin resultados lo dice; Escape cierra y el foco vuelve al botón', async ({ page }) => {
    const dialogo = await buscar(page, '/pt-br/manifesto', 'Buscar', 'zzzqqq');
    await expect(dialogo.getByRole('status')).toContainText('Nada corresponde');
    await page.keyboard.press('Escape');
    await expect(dialogo).toBeHidden();
    await expect(page.getByRole('button', { name: 'Buscar' })).toBeFocused();
  });

  test('si el índice no carga, lo explica y la navegación sigue', async ({ page }) => {
    await page.route('**/pagefind/**', (r) => r.abort());
    await page.goto('/es');
    await page.getByRole('button', { name: 'Buscar' }).click();
    await expect(page.getByRole('dialog').getByRole('status')).toContainText('No se pudo cargar');
  });

  test('el diálogo abierto, con resultados, no tiene violaciones WCAG A/AA', async ({ page }) => {
    const dialogo = await buscar(page, '/es/manifiesto', 'Buscar', 'atención');
    await expect(dialogo.locator('.busqueda-resultados a').first()).toBeVisible();
    const r = await new AxeBuilder({ page }).include('dialog.busqueda').withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
    expect(r.violations.map((v) => `${v.id}: ${v.nodes.length}`)).toEqual([]);
  });
});

test('sin JavaScript no hay botón de búsqueda; nada se pide a terceros', async ({ page, javaScriptEnabled }) => {
  const externas: string[] = [];
  page.on('request', (r) => { if (!r.url().startsWith('http://localhost:4321')) externas.push(r.url()); });
  await page.goto('/es/manifiesto/verificar');
  if (!javaScriptEnabled) await expect(page.locator('[data-abrir-busqueda]')).toBeHidden();
  expect(externas).toEqual([]);
});

test.describe('FR-023 · búsqueda con teclado y «Limpiar» (T219)', () => {
  test('↓ recorre los resultados, ↑ vuelve a la caja y «Limpiar» vacía todo', async ({ page, javaScriptEnabled }, info) => {
    test.skip(!javaScriptEnabled || info.project.name === 'movil', 'escritorio con JavaScript');
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/es');
    await page.locator('[data-abrir-busqueda]').click();
    const caja = page.locator('dialog.busqueda input');
    await caja.fill('atención');
    const primero = page.locator('dialog.busqueda .busqueda-resultados a').first();
    await expect(primero).toBeVisible();
    await expect(page.locator('dialog.busqueda .busqueda-teclas')).toBeVisible();
    await page.keyboard.press('ArrowDown');
    await expect(primero).toBeFocused();
    await page.keyboard.press('ArrowUp');
    await expect(caja).toBeFocused();
    await page.locator('[data-limpiar-busqueda]').click();
    await expect(caja).toHaveValue('');
    await expect(caja).toBeFocused();
    await page.waitForTimeout(400);
    await expect(page.locator('dialog.busqueda .busqueda-resultados a')).toHaveCount(0);
    await expect(page.locator('[data-limpiar-busqueda]')).toBeHidden();
  });

  test('en el teléfono no se muestran las indicaciones de teclado', async ({ page, javaScriptEnabled }, info) => {
    test.skip(!javaScriptEnabled || info.project.name !== 'movil', 'solo teléfono');
    await page.goto('/es');
    await page.locator('[data-abrir-busqueda]').click();
    await expect(page.locator('dialog.busqueda .busqueda-teclas')).toBeHidden();
  });
});
