/**
 * Preferencias de la persona (tema e idioma), compartidas entre los sitios de Software Humano
 * (estándar común B2 y B4; decisión de Damián Acuña, 2026-10-01). Se guardan en una cookie de
 * preferencia para todo `softwarehumano.com`, que los dos sitios leen, y en el almacenamiento local
 * como respaldo. Solo guardan lo que la persona eligió; no identifican a nadie. Si el navegador no
 * permite guardar, el sitio funciona igual. `public/tema.js` repite la lectura del tema antes de pintar.
 */
const DOMINIO = 'softwarehumano.com';
const UN_ANO = 60 * 60 * 24 * 365;

function atributos(): string {
  const h = location.hostname;
  const comun = h === DOMINIO || h.endsWith(`.${DOMINIO}`) ? `; Domain=${DOMINIO}` : '';
  return `; Path=/; SameSite=Lax${comun}${location.protocol === 'https:' ? '; Secure' : ''}`;
}

export function leerPreferencia(clave: string): string | null {
  try {
    const c = document.cookie.split('; ').find((x) => x.startsWith(`${clave}=`));
    if (c) return decodeURIComponent(c.slice(clave.length + 1));
  } catch { /* cookies bloqueadas */ }
  try { return localStorage.getItem(clave); } catch { return null; }
}

/** Guarda la elección, o la borra con `null` (por ejemplo, «Usar el tema del sistema»). */
export function guardarPreferencia(clave: string, valor: string | null): void {
  try {
    document.cookie = valor
      ? `${clave}=${encodeURIComponent(valor)}; Max-Age=${UN_ANO}${atributos()}`
      : `${clave}=; Max-Age=0${atributos()}`;
  } catch { /* cookies bloqueadas */ }
  try {
    if (valor) localStorage.setItem(clave, valor);
    else localStorage.removeItem(clave);
  } catch { /* almacenamiento bloqueado: la preferencia es prescindible */ }
}
