/**
 * Panel «En esta sección» (texto íntegro, Principios y Aplicación) (decisión del 2026-09-27, RQ-06 enmendado): muestra
 * los h3 y h4 de la sección en pantalla y marca esa sección en el índice izquierdo. Mejora
 * progresiva: sin este script el panel no aparece y el índice izquierdo sigue funcionando.
 */
const panel = document.querySelector<HTMLElement>('[data-seguimiento]');
const grupos = panel ? [...panel.querySelectorAll<HTMLElement>('[data-seccion]')] : [];
// Marcadores de sección: los del panel más los enlaces del índice lateral de esta página.
const anclas = new Set([
  ...grupos.map((g) => g.dataset['seccion'] ?? ''),
  ...[...document.querySelectorAll<HTMLAnchorElement>('.indice-lateral a[href^="#"]')].map((a) => a.getAttribute('href')!.slice(1)),
]);
const encabezados = [...anclas]
  .map((id) => document.getElementById(id))
  .filter((e): e is HTMLElement => !!e)
  .sort((a, b) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1));

function actualizar(): void {
  if (!panel) return;
  const limite = window.innerHeight * 0.3;
  let actual = encabezados[0]?.id;
  for (const h of encabezados) if (h.getBoundingClientRect().top <= limite) actual = h.id;
  let visible = false;
  for (const g of grupos) {
    g.hidden = g.dataset['seccion'] !== actual;
    visible ||= !g.hidden;
  }
  panel.classList.toggle('sin-titulos', !visible);
  document.querySelectorAll<HTMLAnchorElement>('.indice-lateral a[href^="#"]').forEach((a) => {
    if (a.getAttribute('href') === `#${actual}`) a.setAttribute('aria-current', 'location');
    else a.removeAttribute('aria-current');
  });
}

if (panel && encabezados.length) {
  panel.hidden = false;
  let pendiente = false;
  window.addEventListener('scroll', () => {
    if (pendiente) return;
    pendiente = true;
    requestAnimationFrame(() => { pendiente = false; actualizar(); });
  }, { passive: true });
  window.addEventListener('hashchange', actualizar);
  actualizar();
}
