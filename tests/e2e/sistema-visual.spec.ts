import { expect, test, type Page } from '@playwright/test';

// Criterios de aceptación de la especificación visual v1.0, §10 (PRD v1.5 §21.2, RQ-18, T170).
const PAGINAS = ['/es', '/es/manifiesto/construir-con-ia', '/es/principios/p06', '/es/acerca'];

const medir = (page: Page) => page.evaluate(() => {
  const visibles = [...document.querySelectorAll<HTMLElement>('body *')].filter((e) => {
    const r = e.getBoundingClientRect();
    return r.width > 0 && r.height > 0 && [...e.childNodes].some((n) => n.nodeType === 3 && n.textContent!.trim());
  });
  const familias = new Set(visibles.map((e) => getComputedStyle(e).fontFamily.split(',')[0]!.replace(/["']/g, '').trim()));
  const pesos = new Set(visibles.map((e) => Number(getComputedStyle(e).fontWeight)));
  const decorados = [...document.querySelectorAll<HTMLElement>('body *')].filter((e) => {
    const s = getComputedStyle(e);
    return s.backgroundImage.includes('gradient') || (s.boxShadow !== 'none' && !/inset/.test(s.boxShadow));
  }).map((e) => e.className || e.tagName);
  return { familias: [...familias], pesos: [...pesos], decorados };
});

test.describe('especificación visual §10', () => {
  test.skip(({ javaScriptEnabled }) => !javaScriptEnabled, 'se mide con JavaScript');

  for (const r of PAGINAS)
    test(`una sola familia, pesos ≤ 600, sin gradientes ni sombras en ${r}`, async ({ page }) => {
      await page.goto(r);
      await page.evaluate(() => document.fonts.ready);
      const m = await medir(page);
      expect(m.familias).toEqual(['Noto Sans']);
      expect(Math.max(...m.pesos)).toBeLessThanOrEqual(600);
      expect(m.decorados).toEqual([]);
      expect(await page.evaluate(() => document.fonts.check('16px "Noto Sans"'))).toBe(true);
    });

  test('Noto Sans autoalojada, en un solo archivo y con swap', async ({ page }) => {
    const pedidas: string[] = [];
    page.on('request', (q) => { if (/\.woff2$/.test(q.url())) pedidas.push(new URL(q.url()).pathname); });
    await page.goto('/es');
    await page.evaluate(() => document.fonts.ready);
    expect(pedidas).toEqual(['/fonts/NotoSans-latin-wght.woff2']);
    const swap = await page.evaluate(() => [...document.fonts].every((f) => f.display === 'swap'));
    expect(swap).toBe(true);
  });

  for (const [esquema, color] of [['light', 'rgb(63, 81, 198)'], ['dark', 'rgb(170, 180, 255)']] as const)
    test(`color interactivo y foco en el tema ${esquema === 'light' ? 'claro' : 'oscuro'}`, async ({ page }, info) => {
      test.skip(info.project.name === 'movil', 'la cabecera cambia en móvil; basta el escritorio');
      await page.emulateMedia({ colorScheme: esquema });
      await page.goto('/es/manifiesto');
      const enlace = page.locator('main .bloque-editorial a').first();
      await expect(enlace).toHaveCSS('color', color);
      await enlace.focus();
      await expect(enlace).toHaveCSS('outline-width', '3px');
      await expect(enlace).toHaveCSS('outline-color', color);
    });

  test('objetivos interactivos de al menos 44 × 44 px (los enlaces en línea quedan exentos, WCAG 2.5.8)', async ({ page }) => {
    await page.goto('/es/manifiesto/construir-con-ia');
    const chicos = await page.evaluate(() => [...document.querySelectorAll<HTMLElement>(
      'button:not([hidden]), .navegacion-global > ul a, .selector-idioma a, .indice-lateral a, .anterior-siguiente a, details > summary',
    )].filter((e) => {
      const r = e.getBoundingClientRect();
      return r.width > 0 && (r.height < 44 || r.width < 44);
    }).map((e) => `${e.tagName} ${e.textContent?.trim().slice(0, 30)} ${Math.round(e.getBoundingClientRect().width)}×${Math.round(e.getBoundingClientRect().height)}`));
    expect(chicos).toEqual([]);
  });

  test('los párrafos no superan 68ch', async ({ page }) => {
    await page.goto('/es/manifiesto/construir-con-ia');
    const excedidos = await page.evaluate(() => {
      const prueba = document.createElement('span');
      prueba.textContent = '0'.repeat(68);
      prueba.style.cssText = 'position:absolute;visibility:hidden;white-space:nowrap';
      document.querySelector('main')!.append(prueba);
      const limite = prueba.getBoundingClientRect().width;
      prueba.remove();
      return [...document.querySelectorAll('main p')].filter((p) => p.getBoundingClientRect().width > limite + 1).length;
    });
    expect(excedidos).toBe(0);
  });
});

test.describe('cabecera (especificación §7.1)', () => {
  test('en teléfono, 56 px con «Menú»; el menú y los idiomas se despliegan, también sin JavaScript', async ({ page }, info) => {
    test.skip(info.project.name !== 'movil', 'solo móvil');
    await page.goto('/es/manifiesto/construir-con-ia');
    const alto = await page.locator('.cabecera').evaluate((e) => e.getBoundingClientRect().height);
    expect(alto).toBeLessThanOrEqual(60);
    await expect(page.locator('.navegacion-global > ul a').first()).toBeHidden();
    await page.locator('.menu-movil > summary').click();
    await expect(page.locator('.navegacion-global > ul a')).toHaveCount(5);
    await expect(page.locator('.navegacion-global > ul a').first()).toBeVisible();
    await expect(page.locator('[data-selector-idioma] ul a')).toHaveText(['EN', 'ES', 'PT']);
  });

  test('en escritorio, el menú siempre visible y sin botón', async ({ page }, info) => {
    test.skip(info.project.name === 'movil', 'solo escritorio');
    await page.goto('/es');
    await expect(page.locator('.menu-movil > summary')).toBeHidden();
    await expect(page.locator('.navegacion-global > ul a').first()).toBeVisible();
    await expect(page.locator('[data-selector-idioma] ul a').first()).toBeVisible();
  });
});

test.describe('cabecera, marca e íconos (fase 26)', () => {
  test('la cabecera mide lo mismo en los tres idiomas, con y sin preferencia guardada (T179)', async ({ page }) => {
    const alturas: number[] = [];
    for (const conPreferencia of [false, true])
      for (const r of ['/principles/p03', '/es/principios/p03', '/pt-br/principios/p03']) {
        await page.goto(r);
        if (conPreferencia) { await page.evaluate(() => { try { localStorage.setItem('sh-idioma', 'es'); } catch {} }); await page.reload(); }
        alturas.push(Math.round(await page.locator('.cabecera').evaluate((e) => e.getBoundingClientRect().height)));
      }
    expect(new Set(alturas).size).toBe(1);
  });

  test('sin aviso de versión preliminar (T177)', async ({ page }) => {
    await page.goto('/es');
    await expect(page.getByText(/versión preliminar|preliminary version|versão preliminar/i)).toHaveCount(0);
  });

  test('marca: ícono y «Manifiesto», también en el teléfono desde 360 px, con el mismo nombre accesible (T153, T252)', async ({ page }) => {
    await page.goto('/es/manifiesto');
    const marca = page.locator('.marca a');
    await expect(marca).toHaveAccessibleName('Manifiesto');
    await expect(marca.locator('svg.marca-icono')).toBeVisible();
    const nombreVisible = await marca.locator('.marca-nombre').evaluate((e) => e.getBoundingClientRect().width > 2);
    expect(nombreVisible).toBe(true); // el proyecto «movil» mide 375 px; debajo de 360 lo cubre cabecera-telefono.spec.ts
  });

  test('íconos del sitio declarados y presentes (T160)', async ({ page, request }) => {
    await page.goto('/');
    for (const href of ['/favicon.ico', '/favicon.svg', '/apple-touch-icon.png']) {
      await expect(page.locator(`link[href="${href}"]`)).toHaveCount(1);
      expect((await request.get(href)).ok()).toBe(true);
    }
    await expect(page.locator('meta[name="theme-color"]')).toHaveCount(2);
  });
});

test.describe('cabecera fija (T180)', () => {
  test('al desplazarse, la barra sigue arriba y nada fijo queda debajo de ella', async ({ page }, info) => {
    await page.goto('/es/manifiesto/construir-con-ia');
    await page.evaluate(() => window.scrollTo(0, 2500));
    await page.waitForTimeout(200);
    const barra = await page.locator('.barra-superior').evaluate((e) => { const r = e.getBoundingClientRect(); return { top: r.top, bottom: r.bottom, ancho: r.width }; });
    expect(barra.top).toBe(0);
    expect(barra.ancho).toBe(page.viewportSize()!.width);
    const indice = await page.locator('.indice-plegable').evaluate((e) => e.getBoundingClientRect().top);
    expect(indice).toBeGreaterThanOrEqual(barra.bottom - 1);
    if (info.project.name === 'movil') await expect(page.locator('.menu-movil > summary')).toBeInViewport();
    else await expect(page.locator('[data-selector-idioma] ul a').first()).toBeInViewport();
  });

  test('un salto a un ancla no queda tapado por la barra', async ({ page }) => {
    await page.goto('/es/manifiesto/construir-con-ia#cr03');
    const barra = await page.locator('.barra-superior').evaluate((e) => e.getBoundingClientRect().bottom);
    const destino = await page.locator('#cr03').evaluate((e) => e.getBoundingClientRect().top);
    expect(destino).toBeGreaterThanOrEqual(barra);
  });
});
