/**
 * Preferencia de idioma (RQ-04, FR-020 v1.6): se guarda al elegir en el selector, se modifica
 * eligiendo otro idioma y solo orienta la entrada por la raíz `/` desde fuera del sitio. Cualquier otra URL es explícita
 * y nunca se sustituye (FR-019). Si el almacenamiento no está disponible, el sitio funciona igual.
 */
const CLAVE = 'sh-idioma';
const RUTA: Record<string, string> = { es: '/es', 'pt-BR': '/pt-br' };

function leer(): string | null {
  try {
    return localStorage.getItem(CLAVE);
  } catch {
    return null;
  }
}
function guardar(v: string | null): void {
  try {
    if (v) localStorage.setItem(CLAVE, v);
  } catch {
    /* almacenamiento bloqueado: la preferencia es prescindible */
  }
}

const preferencia = leer();
const desdeFuera = !document.referrer || new URL(document.referrer).origin !== location.origin;
const destino = preferencia ? RUTA[preferencia] : undefined;
if (location.pathname === '/' && destino && desdeFuera) location.replace(destino + location.hash);

document.querySelectorAll<HTMLElement>('[data-selector-idioma]').forEach((selector) => {
  selector.querySelectorAll<HTMLAnchorElement>('a[data-idioma]').forEach((a) => {
    a.addEventListener('click', () => guardar(a.dataset['idioma'] ?? null));
  });
});
