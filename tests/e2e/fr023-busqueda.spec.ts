import { expect, test } from '@playwright/test';

// FR-023 · búsqueda (PRD v1.2, RQ-16): un resultado por pasaje, en su casa; sin JavaScript no hay botón.
test.describe('FR-023 · búsqueda', () => {
  test('buscar «CR03» da un resultado que lleva a su casa', async ({ page, javaScriptEnabled }) => {
    test.skip(!javaScriptEnabled, 'la búsqueda es una mejora progresiva');
    await page.goto('/es/manifiesto');
    await page.getByRole('button', { name: 'Buscar' }).click();
    const dialogo = page.getByRole('dialog', { name: 'Buscar en el sitio' });
    await expect(dialogo).toBeVisible();
    await expect(dialogo.getByRole('searchbox')).toBeFocused();
    await dialogo.getByRole('searchbox').fill('CR03');
    const enlaces = dialogo.locator('.busqueda-resultados a');
    await expect(enlaces).toHaveCount(1);
    await expect(enlaces.first()).toHaveAttribute('href', '/es/manifiesto/construir-con-ia#cr03');
    await enlaces.first().click();
    await expect(page).toHaveURL(/\/es\/manifiesto\/construir-con-ia#cr03$/);
  });

  test('sin resultados lo dice; Escape cierra y el foco vuelve al botón', async ({ page, javaScriptEnabled }) => {
    test.skip(!javaScriptEnabled, 'la búsqueda es una mejora progresiva');
    await page.goto('/pt-br/manifesto');
    const boton = page.getByRole('button', { name: 'Buscar' });
    await boton.click();
    const dialogo = page.getByRole('dialog');
    await dialogo.getByRole('searchbox').fill('zzzqqq');
    await expect(dialogo.getByRole('status')).toContainText('Nada corresponde');
    await page.keyboard.press('Escape');
    await expect(dialogo).toBeHidden();
    await expect(boton).toBeFocused();
  });

  test('si el índice no carga, lo explica y la navegación sigue', async ({ page, javaScriptEnabled }) => {
    test.skip(!javaScriptEnabled, 'la búsqueda es una mejora progresiva');
    await page.route('**/buscar/*.json', (r) => r.abort());
    await page.goto('/es');
    await page.getByRole('button', { name: 'Buscar' }).click();
    await expect(page.getByRole('dialog').getByRole('status')).toContainText('No se pudo cargar');
  });

  test('sin JavaScript no hay botón de búsqueda; nada se pide a terceros', async ({ page, javaScriptEnabled }) => {
    const externas: string[] = [];
    page.on('request', (r) => { if (!r.url().startsWith('http://localhost:4321')) externas.push(r.url()); });
    await page.goto('/es/manifiesto/verificar');
    if (!javaScriptEnabled) await expect(page.locator('[data-abrir-busqueda]')).toBeHidden();
    expect(externas).toEqual([]);
  });
});
