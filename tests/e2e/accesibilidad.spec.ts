import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { PAGINAS, PAGINAS_404 } from './paginas';

// T089 · AC-07, parte automática (PRD §21.5). La revisión con lector de pantalla es T105, humana.
const ETIQUETAS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

test.describe('accesibilidad automática', () => {
  test.skip(({ javaScriptEnabled }) => !javaScriptEnabled, 'axe corre con JavaScript');

  for (const ruta of [...PAGINAS, ...PAGINAS_404])
    test(`axe AA sin violaciones en ${ruta}`, async ({ page }, info) => {
      test.skip(info.project.name === 'movimiento-reducido', 'mismo DOM que js');
      await page.goto(ruta);
      const r = await new AxeBuilder({ page }).withTags(ETIQUETAS).analyze();
      expect(r.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`)).toEqual([]);
    });

  for (const esquema of ['light', 'dark'] as const)
    test(`contraste en el tema ${esquema === 'light' ? 'claro' : 'oscuro'}`, async ({ page }) => {
      await page.emulateMedia({ colorScheme: esquema });
      for (const ruta of ['/es', '/es/manifiesto', '/es/principios/p06', '/es/manifiesto/verificar']) {
        await page.goto(ruta);
        const r = await new AxeBuilder({ page }).withRules(['color-contrast']).analyze();
        expect(r.violations.flatMap((v) => v.nodes.map((n) => `${ruta} ${n.target.join(' ')}`))).toEqual([]);
      }
    });

  test('con teclado: saltar al contenido y recorrer la página con el foco visible y no tapado', async ({ page }, info) => {
    test.skip(info.project.name !== 'js', 'recorrido de escritorio');
    await page.goto('/es/manifiesto/construir-con-ia');
    await page.keyboard.press('Tab');
    await expect(page.locator('a.saltar')).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/#contenido$/);

    const alto = await page.locator('.barra-superior').evaluate((e) => e.getBoundingClientRect().bottom);
    const problemas: string[] = [];
    for (let i = 0; i < 40; i++) {
      await page.keyboard.press('Tab');
      const f = await page.evaluate(() => {
        const e = document.activeElement as HTMLElement | null;
        if (!e || e === document.body || e.classList.contains('saltar')) return null;
        const r = e.getBoundingClientRect();
        const s = getComputedStyle(e);
        return {
          nombre: `${e.tagName} ${e.textContent?.trim().slice(0, 30)}`,
          top: r.top, bottom: r.bottom,
          contorno: s.outlineStyle !== 'none' && parseFloat(s.outlineWidth) >= 2,
          enCabecera: !!e.closest('.barra-superior'),
        };
      });
      if (!f) break; // volvió al inicio de la página
      if (!f.contorno) problemas.push(`sin foco visible: ${f.nombre}`);
      // WCAG 2.4.11: la cabecera fija no tapa por completo el elemento enfocado.
      if (!f.enCabecera && f.bottom <= alto) problemas.push(`tapado por la cabecera: ${f.nombre}`);
    }
    expect(problemas).toEqual([]);
  });

  test('con teclado: la búsqueda abre, recibe el foco y se cierra con Escape', async ({ page }, info) => {
    test.skip(info.project.name !== 'js', 'recorrido de escritorio');
    await page.goto('/es');
    const boton = page.locator('[data-abrir-busqueda]').first();
    await boton.focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('dialog.busqueda input')).toBeFocused();
    await page.keyboard.press('Escape');
    await expect(page.locator('dialog.busqueda')).not.toBeVisible();
    await expect(boton).toBeFocused();
  });

  for (const ruta of PAGINAS)
    test(`objetivos de al menos 44 × 44 px en ${ruta}`, async ({ page }, info) => {
      test.skip(info.project.name === 'movimiento-reducido', 'mismo DOM que js');
      await page.goto(ruta);
      const chicos = await page.evaluate(() => [...document.querySelectorAll<HTMLElement>(
        'button:not([hidden]), .navegacion-global > ul a, .selector-idioma a, .indice-lateral a, .anterior-siguiente a, details > summary',
      )].filter((e) => {
        const r = e.getBoundingClientRect();
        return r.width > 0 && r.height > 0 && (r.width < 44 || r.height < 44);
      }).map((e) => `${e.tagName} ${e.textContent?.trim().slice(0, 30)} ${e.getBoundingClientRect().width.toFixed(0)}×${e.getBoundingClientRect().height.toFixed(0)}`));
      expect(chicos).toEqual([]);
    });
});
