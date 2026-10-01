/**
 * Preferencia de idioma (RQ-04, FR-020 v1.6): se guarda al elegir en el selector, se modifica
 * eligiendo otro idioma y solo orienta la entrada por la raíz `/` desde fuera del sitio. Cualquier otra URL es explícita
 * y nunca se sustituye (FR-019). Si el almacenamiento no está disponible, el sitio funciona igual.
 * Se comparte entre los sitios de Software Humano: llegar desde el otro sitio cuenta como llegar desde fuera.
 */
import { guardarPreferencia, leerPreferencia } from './preferencias';

const CLAVE = 'sh-idioma';
const RUTA: Record<string, string> = { es: '/es', 'pt-BR': '/pt-br' };

const leer = () => leerPreferencia(CLAVE);
const guardar = (v: string | null) => { if (v) guardarPreferencia(CLAVE, v); };

/** El último elemento con id del contenido que ya pasó por el tercio superior de la pantalla. */
function pasajeEnPantalla(): string | undefined {
  if (window.scrollY < 80) return undefined;
  const limite = window.innerHeight * 0.3;
  let id: string | undefined;
  for (const e of document.querySelectorAll<HTMLElement>('main [id]')) {
    if (e.getBoundingClientRect().top > limite) break;
    if (!e.id.endsWith('-titulo')) id = e.id;
  }
  return id;
}

const preferencia = leer();
const desdeFuera = !document.referrer || new URL(document.referrer).origin !== location.origin;
const destino = preferencia ? RUTA[preferencia] : undefined;
if (location.pathname === '/' && destino && desdeFuera) location.replace(destino + location.hash);

document.querySelectorAll<HTMLElement>('[data-selector-idioma]').forEach((selector) => {
  selector.querySelectorAll<HTMLAnchorElement>('a[data-idioma]').forEach((a) => {
    a.addEventListener('click', () => {
      guardar(a.dataset['idioma'] ?? null);
      // Conserva la posición (R11, P09): el pasaje en pantalla tiene el mismo id en los tres idiomas.
      const ancla = pasajeEnPantalla();
      if (ancla) a.href = `${a.href.split('#')[0]}#${encodeURIComponent(ancla)}`;
    });
  });
});
