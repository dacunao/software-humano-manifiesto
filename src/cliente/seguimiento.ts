/**
 * Seguimiento de lectura (RQ-06 enmendado, PRD v1.2 §21.4). Mejora progresiva: sin este script
 * el índice y el texto siguen completos.
 * - Panel «En esta sección»: muestra los h3 y h4 de la sección en pantalla.
 * - Índice lateral: marca la sección en pantalla.
 * - Pantallas angostas: el índice va plegado y su título dice en qué sección se está (T138).
 */
const panel = document.querySelector<HTMLElement>('[data-seguimiento]');
const grupos = panel ? [...panel.querySelectorAll<HTMLElement>('[data-seccion]')] : [];
const plegable = document.querySelector<HTMLDetailsElement>('[data-indice-plegable]');
const menuMovil = document.querySelector<HTMLDetailsElement>('[data-menu-movil]');
const rotuloActual = document.querySelector<HTMLElement>('[data-seccion-actual]');
const enlacesIndice = [...document.querySelectorAll<HTMLAnchorElement>('.indice-lateral a[href^="#"]')];
// Marcadores de sección: los del panel más los enlaces del índice lateral de esta página.
const anclas = new Set([...grupos.map((g) => g.dataset['seccion'] ?? ''), ...enlacesIndice.map((a) => a.getAttribute('href')!.slice(1))]);
const encabezados = [...anclas]
  .map((id) => document.getElementById(id))
  .filter((e): e is HTMLElement => !!e)
  .sort((a, b) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1));

const ancho = window.matchMedia('(min-width: 62rem)');
function ajustarPlegable(): void {
  // En pantallas anchas el índice está siempre desplegado; en angostas empieza plegado.
  if (plegable) plegable.open = ancho.matches;
  if (menuMovil) menuMovil.open = window.matchMedia('(min-width: 48.01rem)').matches;
}

function actualizar(): void {
  const limite = window.innerHeight * 0.3;
  let actual = encabezados[0]?.id;
  for (const h of encabezados) if (h.getBoundingClientRect().top <= limite) actual = h.id;
  if (panel) {
    let visible = false;
    for (const g of grupos) {
      g.hidden = g.dataset['seccion'] !== actual;
      visible ||= !g.hidden;
    }
    panel.classList.toggle('sin-titulos', !visible);
  }
  let titulo = '';
  for (const a of enlacesIndice) {
    if (a.getAttribute('href') === `#${actual}`) {
      a.setAttribute('aria-current', 'location');
      titulo = a.textContent?.trim() ?? '';
    } else a.removeAttribute('aria-current');
  }
  if (rotuloActual) rotuloActual.textContent = titulo ? ` · ${titulo}` : '';
}

ajustarPlegable();
ancho.addEventListener('change', ajustarPlegable);
window.matchMedia('(min-width: 48.01rem)').addEventListener('change', ajustarPlegable);
if (panel && encabezados.length) panel.hidden = false;
if (encabezados.length) {
  let pendiente = false;
  window.addEventListener('scroll', () => {
    if (pendiente) return;
    pendiente = true;
    requestAnimationFrame(() => { pendiente = false; actualizar(); });
  }, { passive: true });
  window.addEventListener('hashchange', actualizar);
  actualizar();
}
