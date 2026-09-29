/**
 * Seguimiento de lectura (navegación estándar, decisión del 2026-09-29). Mejora progresiva: sin este
 * script, las dos columnas y el texto siguen completos.
 * - «En esta página»: marca la sección y el subtítulo en pantalla, en la columna derecha y en la copia
 *   de «Contenido».
 * - Pantallas angostas: «Contenido» va plegado y su título dice en qué sección se está (T138).
 */
const plegable = document.querySelector<HTMLDetailsElement>('[data-indice-plegable]');
const menuMovil = document.querySelector<HTMLDetailsElement>('[data-menu-movil]');
const rotuloActual = document.querySelector<HTMLElement>('[data-seccion-actual]');
const enlaces = [...document.querySelectorAll<HTMLAnchorElement>('[data-en-pagina] a[href^="#"]')];
const nivel = (a: HTMLAnchorElement) => Number(a.closest('li')?.className.match(/nivel-(\d)/)?.[1] ?? 2);
const destino = (a: HTMLAnchorElement) => decodeURIComponent(a.getAttribute('href')!.slice(1));

/** Encabezados en el orden del documento, con su nivel en la tabla. */
const marcas = [...new Map(enlaces.map((a) => [destino(a), nivel(a)])).entries()]
  .map(([id, n]) => ({ id, n, el: document.getElementById(id) }))
  .filter((m): m is { id: string; n: number; el: HTMLElement } => !!m.el)
  .sort((a, b) => (a.el.compareDocumentPosition(b.el) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1));

const ancho = window.matchMedia('(min-width: 62rem)');
function ajustarPlegable(): void {
  // En pantallas anchas las columnas están siempre desplegadas; en angostas, «Contenido» empieza plegado.
  if (plegable) plegable.open = ancho.matches;
  if (menuMovil) menuMovil.open = window.matchMedia('(min-width: 48.01rem)').matches;
}

function actualizar(): void {
  const limite = window.innerHeight * 0.3;
  let seccion: string | undefined;
  let sub: string | undefined;
  for (const m of marcas) {
    if (m.el.getBoundingClientRect().top > limite) break;
    if (m.n === 2) { seccion = m.id; sub = undefined; } else sub = m.id;
  }
  let titulo = '';
  for (const a of enlaces) {
    const id = destino(a);
    if (id === seccion || id === sub) a.setAttribute('aria-current', 'location');
    else a.removeAttribute('aria-current');
    if (id === seccion) titulo = a.textContent?.trim() ?? '';
  }
  if (rotuloActual) rotuloActual.textContent = titulo ? ` · ${titulo}` : '';
}

ajustarPlegable();
ancho.addEventListener('change', ajustarPlegable);
window.matchMedia('(min-width: 48.01rem)').addEventListener('change', ajustarPlegable);
if (marcas.length) {
  let pendiente = false;
  window.addEventListener('scroll', () => {
    if (pendiente) return;
    pendiente = true;
    requestAnimationFrame(() => { pendiente = false; actualizar(); });
  }, { passive: true });
  window.addEventListener('hashchange', actualizar);
  actualizar();
}
export {};
