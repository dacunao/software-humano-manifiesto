import { expect, test } from '@playwright/test';

// JS-05 · Consultar y citar la fuente (spec.md, PRD v1.2: el núcleo por divisiones y la descarga).
test.describe('JS-05 · Consultar y citar la fuente', () => {
  test('escenario 1 · una URL profunda llega al pasaje en su casa, con la versión visible', async ({ page }) => {
    await page.goto('/es/manifiesto/construir-con-ia#cr03');
    await expect(page.locator('#cr03')).toBeInViewport();
    await page.goto('/es/manifiesto/mapa#sh-index');
    await expect(page.locator('#sh-index')).toBeInViewport();
    await expect(page.locator('.version-nucleo')).toContainText('2.1');
  });

  test('escenario 2 · con «Siguiente» se lee el núcleo en su orden, del Mapa a la Declaración final', async ({ page }) => {
    await page.goto('/es/manifiesto/mapa');
    await expect(page.locator('main')).toContainText('Núcleo del manifiesto para el desarrollo de software humano');
    const visitadas: string[] = [];
    for (let i = 0; i < 25; i++) {
      visitadas.push(new URL(page.url()).pathname);
      const siguiente = page.locator('.anterior-siguiente a[rel="next"]');
      if (!(await siguiente.count())) break;
      await siguiente.click();
    }
    expect(visitadas).toEqual([
      '/es/manifiesto/mapa', '/es/manifiesto', '/es/principios',
      ...Array.from({ length: 10 }, (_, i) => `/es/principios/p${String(i + 1).padStart(2, '0')}`),
      '/es/manifiesto/fundamento-de-producto', '/es/manifiesto/construir-con-ia', '/es/manifiesto/verificar',
      '/es/manifiesto/ejemplo-aplicado', '/es/manifiesto/gobernanza', '/es/manifiesto/guia-de-bolsillo',
    ]);
    await expect(page.locator('section#declaracion-final')).toContainText('Delante de ella debe permanecer una persona');
  });

  test('escenario 2 · la descarga del pie es la del idioma de la página; en español, el original', async ({ page, request }) => {
    for (const [r, f, lang] of [['/es/manifiesto/verificar', 'es', 'es'], ['/manifesto/verify', 'en', 'en'], ['/pt-br/principios/p06', 'pt-br', 'pt-BR']] as const) {
      await page.goto(r);
      const descarga = page.locator('.descarga-pie a').first();
      await expect(descarga).toHaveAttribute('href', `/descargas/nucleo-v2.1-${f}.md`);
      await expect(descarga).toHaveAttribute('hreflang', lang);
      if (f !== 'es') await expect(page.locator('.descarga-pie a[hreflang="es"]')).toHaveAttribute('href', '/descargas/nucleo-v2.1-es.md');
    }
    const res = await request.get('/descargas/nucleo-v2.1-es.md');
    expect(await res.text()).toContain('# Núcleo del manifiesto para el desarrollo de software humano');
    // El núcleo completo no se despliega como página (PRD v1.2 §18.1).
    expect((await request.get('/es/manifiesto/texto-integro')).status()).toBe(404);
  });

  test('escenario 3 · cada cita breve fuera de su casa lleva a la casa del pasaje', async ({ page }) => {
    await page.goto('/es');
    const enlaces = await page.locator('figure.cita-canonica .fuente a').evaluateAll((as) => as.map((a) => a.getAttribute('href')!));
    expect(enlaces.length).toBeGreaterThan(0);
    for (const href of enlaces) {
      expect(href).toMatch(/^\/es\/[a-z/0-9-]+(#[a-z0-9-]+)?$/);
      await page.goto(href);
      if (href.includes('#')) await expect(page.locator(`#${href.split('#')[1]}`)).toHaveCount(1);
    }
  });
});
