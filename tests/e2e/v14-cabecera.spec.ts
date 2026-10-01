import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
/** En teléfonos, el idioma está dentro de «Menú» (especificación visual §7.1): se abre si hace falta. */
async function abrirMenu(page: import('@playwright/test').Page): Promise<void> {
  const menu = page.locator('.menu-movil > summary');
  if (await menu.isVisible()) {
    const abierto = await page.locator('.menu-movil').evaluate((d) => (d as HTMLDetailsElement).open);
    if (!abierto) await menu.click();
  }
}


const fondo = (page: import('@playwright/test').Page) => page.evaluate(() => getComputedStyle(document.body).backgroundColor);
const OSCURO = 'rgb(16, 24, 32)'; // --sh-canvas oscuro, #101820 (especificación visual §4.3)

// PRD v1.4 · cabecera y tema (§18.2, §21.7, FR-020, RQ-17).
test.describe('PRD v1.4 · tema claro u oscuro', () => {
  test('sin elección guardada sigue al sistema, también sin JavaScript', async ({ page, javaScriptEnabled }) => {
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.goto('/es');
    expect(await fondo(page)).toBe(OSCURO);
    await page.emulateMedia({ colorScheme: 'light' });
    expect(await fondo(page)).not.toBe(OSCURO);
    if (!javaScriptEnabled) await expect(page.locator('[data-control-tema]')).toBeHidden();
  });

  test('el control cambia el tema, la elección persiste y se puede volver al sistema', async ({ page, javaScriptEnabled }) => {
    test.skip(!javaScriptEnabled, 'el control es una mejora progresiva');
    await page.emulateMedia({ colorScheme: 'light' });
    await page.goto('/es/manifiesto');
    const control = page.getByRole('button', { name: 'Tema oscuro' });
    await expect(control).toHaveAttribute('aria-pressed', 'false');
    await control.click();
    await expect(control).toHaveAttribute('aria-pressed', 'true');
    expect(await fondo(page)).toBe(OSCURO);
    await page.reload();
    // Aplicado antes de pintar por public/tema.js: sin destello del tema del sistema.
    expect(await page.evaluate(() => document.documentElement.dataset['tema'])).toBe('oscuro');
    await page.getByRole('button', { name: 'Usar el tema del sistema' }).click();
    expect(await page.evaluate(() => document.documentElement.dataset['tema'] ?? null)).toBeNull();
    expect(await fondo(page)).not.toBe(OSCURO);
    await expect(page.getByRole('button', { name: 'Usar el tema del sistema' })).toBeHidden();
  });

  for (const esquema of ['light', 'dark'] as const)
    test(`contraste WCAG AA en el tema ${esquema === 'light' ? 'claro' : 'oscuro'} (T154)`, async ({ page }, info) => {
      test.skip(info.project.name !== 'js', 'una pasada basta');
      await page.emulateMedia({ colorScheme: esquema });
      for (const r of ['/es', '/es/manifiesto/construir-con-ia', '/es/acerca', '/es/principios/p06']) {
        await page.goto(r);
        const res = await new AxeBuilder({ page }).withRules(['color-contrast']).analyze();
        expect(res.violations.flatMap((v) => v.nodes.map((n) => `${r} ${n.target.join(' ')}`))).toEqual([]);
      }
    });
});

test.describe('PRD v1.4 · idiomas y GitHub', () => {
  test('selector compacto EN · ES · PT con nombres completos accesibles (T156)', async ({ page }) => {
    await page.goto('/es/manifiesto');
    await abrirMenu(page);
    const selector = page.locator('[data-selector-idioma] ul a');
    await expect(selector).toHaveText(['EN', 'ES', 'PT']);
    await expect(page.locator('[data-selector-idioma]').getByRole('link', { name: 'PT, Português (Brasil)' })).toHaveAttribute('title', 'Português (Brasil)');
    await expect(page.locator('[data-selector-idioma] a[aria-current="true"]')).toHaveText('ES');
  });

  test('«GitHub» lleva al repositorio público de la adaptación y SpecKit ya no dice «no publicada» (T157, T235)', async ({ page }) => {
    await page.goto('/es');
    await abrirMenu(page);
    await expect(page.locator('.navegacion-global').getByRole('link', { name: /GitHub/ })).toHaveAttribute('href', 'https://github.com/dacunao/software-humano-speckit');
    await expect(page.locator('.navegacion-global')).not.toContainText('no publicada');
  });
});

test('T267 · WCAG 2.5.3: el nombre accesible de cada idioma contiene su código visible', async ({ page }) => {
  await page.goto('/es');
  for (const a of await page.locator('[data-selector-idioma] ul a').all()) {
    const visible = (await a.innerText()).trim();
    expect(await a.getAttribute('aria-label')).toMatch(new RegExp(`^${visible},`));
  }
});

test.describe('T273 · preferencias compartidas entre los sitios', () => {
  test('elegir el tema y el idioma escribe la cookie de preferencia', async ({ page, context, javaScriptEnabled }) => {
    test.skip(!javaScriptEnabled, 'las preferencias son una mejora progresiva');
    await page.emulateMedia({ colorScheme: 'light' });
    await page.goto('/es');
    const menu = page.locator('.menu-movil > summary');
    await page.getByRole('button', { name: 'Tema oscuro' }).click();
    if (await menu.isVisible()) await menu.click();
    await page.locator('[data-selector-idioma]').getByRole('link', { name: 'PT, Português (Brasil)' }).click();
    await expect(page).toHaveURL(/\/pt-br/);
    const c = Object.fromEntries((await context.cookies()).map((x) => [x.name, x]));
    expect(c['sh-tema']?.value).toBe('oscuro');
    expect(c['sh-idioma']?.value).toBe('pt-BR');
    expect(c['sh-tema']?.sameSite).toBe('Lax');
    expect(c['sh-tema']?.expires).toBeGreaterThan(Date.now() / 1000 + 300 * 24 * 3600);
  });

  test('una preferencia que llega en la cookie desde el otro sitio se aplica', async ({ page, context, javaScriptEnabled }) => {
    test.skip(!javaScriptEnabled, 'las preferencias son una mejora progresiva');
    await page.emulateMedia({ colorScheme: 'light' });
    await context.addCookies([
      { name: 'sh-tema', value: 'oscuro', url: 'http://localhost:4321' },
      { name: 'sh-idioma', value: 'es', url: 'http://localhost:4321' },
    ]);
    await page.goto('/');
    await expect(page).toHaveURL(/\/es$/);
    expect(await page.evaluate(() => document.documentElement.dataset['tema'])).toBe('oscuro');
  });

  test('«Usar el tema del sistema» borra la cookie', async ({ page, context, javaScriptEnabled }) => {
    test.skip(!javaScriptEnabled, 'las preferencias son una mejora progresiva');
    await context.addCookies([{ name: 'sh-tema', value: 'oscuro', url: 'http://localhost:4321' }]);
    await page.goto('/es/manifiesto');
    await page.getByRole('button', { name: 'Usar el tema del sistema' }).click();
    expect((await context.cookies()).find((x) => x.name === 'sh-tema')).toBeUndefined();
  });
});
