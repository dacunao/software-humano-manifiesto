import { expect, test } from '@playwright/test';

// T198 · Acerca del Manifiesto (copy v1.1 de Damián Acuña, 2026-09-29): FR-012, AC-13, RV-13.
const PAGINAS = [
  { ruta: '/es/acerca', antetitulo: 'Acerca del Manifiesto', titular: 'Una doctrina para decidir qué merece ser construido.', mapa: '/es/manifiesto/mapa', bolsillo: '/es/manifiesto/guia-de-bolsillo' },
  { ruta: '/about', antetitulo: 'About the Manifesto', titular: 'A doctrine for deciding what is worth building.', mapa: '/manifesto/map', bolsillo: '/manifesto/pocket-guide' },
  { ruta: '/pt-br/sobre', antetitulo: 'Sobre o Manifesto', titular: 'Uma doutrina para decidir o que merece ser construído.', mapa: '/pt-br/manifesto/mapa', bolsillo: '/pt-br/manifesto/guia-de-bolso' },
];

test.describe('Acerca del Manifiesto', () => {
  for (const p of PAGINAS)
    test(`antetítulo, titular, citas del núcleo con enlace y secciones obligatorias en ${p.ruta}`, async ({ page }) => {
      await page.goto(p.ruta);
      await expect(page.locator('main h1')).toHaveText(p.titular);
      await expect(page.locator('header.encabezado-superficie .rotulo-seccion')).toHaveText(p.antetitulo);
      await expect(page).toHaveTitle(new RegExp(`^${p.antetitulo} · Manifiesto$`));

      // Las tres citas (portada, aclaración sobre Craft y Declaración final) remiten a su casa: no se duplican (RV-13).
      const citas = page.locator('main figure.cita-canonica');
      await expect(citas).toHaveCount(3);
      await expect(citas.nth(0).locator('.fuente a')).toHaveAttribute('href', new RegExp(`^${p.mapa}#`));
      await expect(citas.nth(2).locator('.fuente a')).toHaveAttribute('href', new RegExp(`^${p.bolsillo}#`));

      // Nota de origen en primera persona, fuentes y lo que exige FR-012 y PRD §29.
      for (const id of ['por-que-existe', 'influencias', 'fuentes', 'software-humano', 'procedencia', 'licencias'])
        await expect(page.locator(`section#${id}`)).toBeVisible();
      await expect(page.locator('section#licencias table')).toBeVisible();
    });
});

test('T237 · Acerca de: Issues como canal técnico y el método enlazado en licencias', async ({ page }) => {
  await page.goto('/es/acerca');
  await expect(page.locator('#contacto a[href="https://github.com/dacunao/software-humano-speckit/issues"]')).toContainText('Consultas técnicas');
  await expect(page.locator('#licencias a[href="https://github.com/dacunao/software-humano-speckit"]')).toHaveText('Método para SpecKit');
  await expect(page.locator('main')).not.toContainText('cuando se publique');
});

test('T259 · Contacto ofrece los Issues del repositorio del sitio', async ({ page }) => {
  await page.goto('/es/acerca');
  await expect(page.locator('#contacto a[href="https://github.com/dacunao/software-humano-manifiesto/issues"]')).toContainText('Errores del sitio');
});

for (const ruta of ['/about', '/es/acerca', '/pt-br/sobre'])
  test(`T260 · el nombre del autor enlaza a su página, igual que el JSON-LD · ${ruta}`, async ({ page }) => {
    await page.goto(ruta);
    await expect(page.locator('#autoria a[rel~="author"]')).toHaveAttribute('href', 'https://www.linkedin.com/in/dacunao/');
    const ld = (await page.locator('script[type="application/ld+json"]').allTextContents()).join('');
    expect(ld).toContain('"url":"https://www.linkedin.com/in/dacunao/"');
  });
