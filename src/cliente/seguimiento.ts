/**
 * Panel «En esta sección» del texto íntegro (decisión del 2026-09-27, RQ-06 enmendado): muestra
 * los h3 y h4 de la sección en pantalla y marca esa sección en el índice izquierdo. Mejora
 * progresiva: sin este script el panel no aparece y el índice izquierdo sigue funcionando.
 */
const panel = document.querySelector<HTMLElement>('[data-seguimiento]');
const grupos = panel ? [...panel.querySelectorAll<HTMLElement>('[data-seccion]')] : [];
const encabezados = grupos
  .map((g) => document.getElementById(g.dataset['seccion'] ?? ''))
  .filter((e): e is HTMLElement => !!e);

function actualizar(): void {
  if (!panel) return;
  const limite = window.innerHeight * 0.3;
  let actual = encabezados[0]?.id;
  for (const h of encabezados) if (h.getBoundingClientRect().top <= limite) actual = h.id;
  for (const g of grupos) g.hidden = g.dataset['seccion'] !== actual;
  document.querySelectorAll<HTMLAnchorElement>('.indice-manifiesto a').forEach((a) => {
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
