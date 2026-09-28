import { expect, test } from '@playwright/test';

// JS-05 · Consultar y citar la fuente (spec.md, PRD v1.1: texto íntegro y una casa por pasaje).
test.describe('JS-05 · Consultar y citar la fuente', () => {
  test('escenario 1 · una URL profunda llega al pasaje en su casa y en el texto íntegro', async ({ page }) => {
    await page.goto('/es/aplicacion#cr03');
    await expect(page.locator('#cr03')).toBeInViewport();
    await page.goto('/es/manifiesto/texto-integro#cr03');
    await expect(page.locator('#cr03')).toBeInViewport();
    await expect(page.locator('.version-nucleo')).toContainText('2.1');
  });

  test('escenario 2 · el texto íntegro está completo, con índice, identificadores y descarga', async ({ page, request }) => {
    await page.goto('/es/manifiesto/texto-integro');
    await expect(page.locator('.indice-manifiesto li')).toHaveCount(24);
    for (const id of ['sh-index', 'p01', 'p10', 'sh-fund', 'd01', 'f08', 'a08', 'stop07', 'o09', 'v12', 'sh-pocket'])
      await expect(page.locator(`#${id}`), id).toHaveCount(1);
    await expect(page.locator('article.manifiesto')).toContainText('Núcleo del manifiesto para el desarrollo de software humano');
    await expect(page.locator('.descargas a')).toHaveCount(1);
    const descarga = page.locator('.descargas a[hreflang="es"]');
    await expect(descarga).toHaveAttribute('href', '/descargas/nucleo-v2.1-es.md');
    const r = await request.get('/descargas/nucleo-v2.1-es.md');
    expect(r.ok()).toBe(true);
    expect(await r.text()).toContain('# Núcleo del manifiesto para el desarrollo de software humano');
  });

  test('la descarga ofrecida es solo la del idioma seleccionado', async ({ page }) => {
    for (const [r, l, f] of [['/manifesto/full-text', 'en', 'en'], ['/pt-br/manifesto/texto-integral', 'pt-BR', 'pt-br']] as const) {
      await page.goto(r);
      await expect(page.locator('.descargas a')).toHaveCount(1);
      await expect(page.locator('.descargas a')).toHaveAttribute('hreflang', l);
      await expect(page.locator('.descargas a')).toHaveAttribute('href', `/descargas/nucleo-v2.1-${f}.md`);
    }
  });

  test('escenario 3 · cada cita breve fuera de su casa lleva a la casa del pasaje', async ({ page }) => {
    await page.goto('/es');
    const enlaces = await page.locator('figure.cita-canonica .fuente a').evaluateAll((as) => as.map((a) => a.getAttribute('href')!));
    expect(enlaces.length).toBeGreaterThan(0);
    for (const href of enlaces) {
      expect(href).toMatch(/^\/es\/[a-z/-]+#[a-z0-9-]+$/);
      await page.goto(href);
      await expect(page.locator(`#${href.split('#')[1]}`)).toHaveCount(1);
    }
  });
});
