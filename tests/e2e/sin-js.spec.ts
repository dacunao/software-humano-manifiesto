import { expect, test } from '@playwright/test';
import { PAGINAS } from './paginas';

// T088 · FR-015 y PRD §21.4: sin JavaScript se lee todo; sin estilos, el orden de lectura se mantiene.
test.describe('sin JavaScript, las 66 páginas', () => {
  test.skip(({ javaScriptEnabled }) => javaScriptEnabled, 'se mide con JavaScript desactivado');

  test('son 66', () => expect(PAGINAS).toHaveLength(66));

  for (const ruta of PAGINAS)
    test(`texto, navegación y anclas en ${ruta}`, async ({ page }) => {
      await page.goto(ruta);
      const main = page.locator('main#contenido');
      expect((await main.innerText()).trim().length).toBeGreaterThan(200);
      await expect(page.locator('nav.navegacion-global a').first()).toBeVisible();

      // Cada ancla interna apunta a un destino que existe.
      const rotas = await page.evaluate(() =>
        [...document.querySelectorAll<HTMLAnchorElement>('a[href*="#"]')]
          .filter((a) => a.pathname === location.pathname && a.hash.length > 1)
          .map((a) => decodeURIComponent(a.hash.slice(1)))
          .filter((id) => !document.getElementById(id)),
      );
      expect(rotas).toEqual([]);
    });

  for (const ruta of PAGINAS)
    test(`orden de lectura sin estilos en ${ruta}`, async ({ page }) => {
      await page.goto(ruta);
      await page.evaluate(() => document.querySelectorAll('link[rel="stylesheet"], style').forEach((e) => e.remove()));
      const orden = await page.evaluate(() => {
        const pos = (s: string) => {
          const e = document.querySelector(s);
          return e ? [...document.querySelectorAll('body *')].indexOf(e) : -1;
        };
        const niveles = [...document.querySelectorAll('main h1, main h2, main h3, main h4, main h5, main h6')]
          .map((h) => Number(h.tagName[1]));
        return { saltar: pos('a.saltar'), cabecera: pos('header'), main: pos('main'), pie: pos('footer'), niveles };
      });
      expect(orden.saltar).toBeLessThan(orden.cabecera);
      expect(orden.cabecera).toBeLessThan(orden.main);
      expect(orden.main).toBeLessThan(orden.pie);
      expect(orden.niveles[0]).toBe(1);
      // Ningún título salta un nivel al descender (h2 → h4).
      const saltos = orden.niveles.filter((n, i) => i > 0 && n > orden.niveles[i - 1]! + 1);
      expect(saltos).toEqual([]);
    });
});
