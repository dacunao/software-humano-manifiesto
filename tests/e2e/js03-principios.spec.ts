import { expect, test } from '@playwright/test';

const PRINCIPIOS = Array.from({ length: 10 }, (_, i) => `p${String(i + 1).padStart(2, '0')}`);
const SECCIONES = ['declaracion', 'tension', 'significado', 'consecuencia', 'ejemplo', 'contraejemplo', 'prueba', 'fuente'];

// JS-03 · Comprender cada principio (spec.md).
test.describe('JS-03 · Comprender cada principio', () => {
  test('escenario 1 · cada principio muestra las ocho partes del contrato del PRD §17', async ({ page }) => {
    for (const pid of PRINCIPIOS) {
      await page.goto(`/es/principios/${pid}`);
      for (const s of SECCIONES) await expect(page.locator(`#${s}`), `${pid} #${s}`).toBeVisible();
      await expect(page.locator('h1 code')).toHaveText(pid.toUpperCase());
    }
  });

  test('escenario 2 · la prueba de decisión ofrece preguntas utilizables, citadas del núcleo', async ({ page }) => {
    await page.goto('/es/principios/p06');
    const cita = page.locator('#prueba figure.cita-canonica');
    await expect(cita.locator('figcaption')).toHaveText('Texto canónico');
    expect(await cita.locator('li').count()).toBeGreaterThanOrEqual(3);
    await expect(cita.locator('li').first()).toContainText('?');
  });

  test('escenario 3 · la colección muestra los diez en orden canónico con su nombre', async ({ page }) => {
    await page.goto('/es/principios');
    const codigos = await page.locator('ol.lista-principios li code').allTextContents();
    expect(codigos).toEqual(PRINCIPIOS.map((p) => p.toUpperCase()));
    await expect(page.locator('ol.lista-principios li').first()).toContainText('El progreso del usuario es la unidad de diseño');
  });
});
