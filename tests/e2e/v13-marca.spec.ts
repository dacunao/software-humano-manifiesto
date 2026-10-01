import { expect, test } from '@playwright/test';

// PRD v1.3 · el sitio dentro de la marca Software Humano (§18.4, §25.2, §29).
test.describe('PRD v1.3 · Manifiesto y Software Humano', () => {
  test('el nombre del sitio es «Manifiesto» en los tres idiomas', async ({ page }) => {
    for (const r of ['/manifesto/verify', '/es/manifiesto/verificar', '/pt-br/manifesto/verificar']) {
      await page.goto(r);
      await expect(page).toHaveTitle(/ · Manifiesto$/);
      await expect(page.locator('.marca a')).toHaveText('Manifiesto');
    }
  });

  test('el pie nombra al editor y solo enlaza su sitio cuando está en línea', async ({ page }) => {
    await page.goto('/es');
    await expect(page.locator('.editor-pie')).toContainText('Publicado por Software Humano');
    // softwarehumano.com no responde todavía (enLinea: false): sin enlace sin destino.
    await expect(page.locator('.editor-pie a')).toHaveCount(0);
    await expect(page.locator('.licencia-pie a')).toHaveAttribute('href', '/es/acerca#licencias');
  });

  test('Acerca de explica la relación y muestra las licencias por tipo de material', async ({ page }) => {
    await page.goto('/es/acerca');
    await expect(page.locator('section#software-humano')).toContainText('Lo publica y lo cuida');
    const tabla = page.locator('section#licencias table');
    await expect(tabla).toBeVisible();
    for (const t of ['Texto del núcleo', 'Código del sitio', 'Reservados']) await expect(tabla).toContainText(t);
  });

  test('los datos estructurados declaran autor persona y editor organización', async ({ page }) => {
    await page.goto('/');
    const ld = JSON.parse((await page.locator('script[type="application/ld+json"]').textContent())!);
    const sitio = ld['@graph'].find((n: { '@type': string }) => n['@type'] === 'WebSite');
    expect(sitio.name).toBe('Manifiesto');
    expect(sitio.url).toMatch(/^https:\/\/manifiesto\.softwarehumano\.com/);
    expect(sitio.author.name).toBe('Damián Acuña');
    expect(sitio.author['@id']).toBe('https://softwarehumano.com/#autor');
    expect(sitio.publisher).toEqual({ '@type': 'Organization', '@id': 'https://softwarehumano.com/#organizacion', name: 'Software Humano', url: 'https://softwarehumano.com', logo: 'https://manifiesto.softwarehumano.com/apple-touch-icon.png' });
  });

  test('en móvil, el índice se abre con «Contenido» (T167, especificación visual §7.2)', async ({ page }, info) => {
    test.skip(info.project.name !== 'movil', 'solo móvil');
    await page.goto('/es/manifiesto/verificar');
    await expect(page.locator('[data-indice-plegable] summary')).toContainText('Contenido');
  });
});
