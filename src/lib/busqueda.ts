import type { Canon, NodoCanonico } from './canon/lector';
import type { Contenido } from './contenido/cargar';
import type { Localizado, Locale } from './contenido/esquemas';
import { casas, nodosDelBloque } from './casas';
import { ruta } from './i18n/rutas';

/**
 * Índice de búsqueda (FR-023, RQ-16): uno por idioma, generado en la construcción desde el
 * modelo de contenido. Cada pasaje del núcleo entra una sola vez, con la dirección de su casa;
 * las citas breves y los actos de Inicio quedan fuera por construcción (PRD v1.2 §18.3).
 */
export interface EntradaIndice {
  /** Dirección con ancla. */
  u: string;
  /** Página. */
  p: string;
  /** Sección de la página. */
  s: string;
  /** Identificador del núcleo, si lo hay (`CR03`, `SH-FUND`…). */
  c?: string;
  /** Texto plano. */
  t: string;
  /** Nodo canónico de origen, para `RV-14`. No se publica. */
  n?: string;
}

const IDENTIFICADOR = /^(p\d\d|d\d\d|f\d\d|a\d\d|o\d\d|v\d\d|cr\d\d|stop\d\d|sh-[a-z]+)$/;

const plano = (md: string) =>
  md
    .replace(/<[^>]+>/g, ' ')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[*_`>]/g, '')
    .replace(/^\s*\|?[-:| ]+\|?\s*$/gm, ' ')
    .replace(/\|/g, ' ')
    .replace(/\\(.)/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();

/**
 * RQ-16 enmendado (PRD §19.4): el índice de un idioma solo guarda textos escritos en ese idioma.
 * Lo que la página muestra en el original por falta de traducción no entra.
 */
function textoDe(l: Localizado | undefined, locale: Locale): string {
  return l?.[locale]?.text || '';
}

function markdownDe(c: Contenido, n: NodoCanonico, locale: Locale): string {
  if (locale === 'es') return n.source;
  return c.traducciones.find((x) => x.locale === locale)?.entries[n.id]?.text || '';
}

/** El pasaje tiene texto en ese idioma (original o traducción). */
export const tieneTexto = (c: Contenido, n: NodoCanonico, locale: Locale) => !!markdownDe(c, n, locale);

/** Entradas de un nodo: una por fila o elemento con identificador (tablas y listas), o una por nodo. */
function entradasDeNodo(c: Contenido, n: NodoCanonico, locale: Locale, base: string, p: string, s: string): EntradaIndice[] {
  const md = markdownDe(c, n, locale);
  if (!md) return [];
  const ids = n.anclas.filter((a) => a !== n.id && IDENTIFICADOR.test(a));
  if (ids.length > 1 || (n.kind === 'tabla' && ids.length)) {
    const filas = md.split('\n');
    return ids.map((a) => {
      const fila = filas.find((f) => f.toLowerCase().includes(a)) ?? '';
      return { u: `${base}#${a}`, p, s, c: a.toUpperCase(), t: plano(fila), n: n.id };
    });
  }
  const codigo = [n.id, ...n.anclas].find((a) => IDENTIFICADOR.test(a));
  return [{ u: `${base}#${n.id}`, p, s, ...(codigo ? { c: codigo.toUpperCase() } : {}), t: plano(md), n: n.id }];
}

export function construirIndice(c: Contenido, canon: Canon, locale: Locale): EntradaIndice[] {
  const r: EntradaIndice[] = [];
  const cadena = (clave: string) => textoDe(c.cadenas[clave], locale);
  for (const sup of c.superficies) {
    if (sup.id === 'inicio') continue;
    const base = ruta({ tipo: sup.id }, locale);
    const p = textoDe(sup.title, locale);
    for (const sec of sup.sections) {
      // Si el título de la sección no está en este idioma, el resultado usa el nombre de la página.
      const s = textoDe(sec.title, locale) || p;
      const codigo = IDENTIFICADOR.test(sec.id) ? sec.id.toUpperCase() : undefined;
      r.push({ u: `${base}#${sec.id}`, p, s, ...(codigo ? { c: codigo } : {}), t: plano(textoDe(sec.question, locale)) });
      for (const b of [...sec.blocks, ...sec.depth]) {
        if (b.kind === 'entrada') r.push({ u: `${base}#${sec.id}`, p, s, t: plano(textoDe(b.entrada.text, locale)) });
        if (b.kind === 'canon' && !b.breve)
          for (const n of nodosDelBloque(canon, b)) if (n.kind !== 'encabezado') r.push(...entradasDeNodo(c, n, locale, base, p, s));
      }
    }
  }
  // Páginas de principio: su contrato editorial y sus pasajes canónicos (casa por construcción).
  const mapa = casas(canon);
  for (const pr of c.principios) {
    const pid = pr.id.toLowerCase();
    const base = ruta({ tipo: 'principio', principio: pid }, locale);
    const i = canon.nodos.findIndex((n) => n.id === pid);
    const seccion = canon.nodos[i]?.section;
    const nombre = canon.nodos.slice(i + 1).find((n) => n.kind === 'encabezado' && n.nivel === 3);
    const p = `${pr.id}${nombre && markdownDe(c, nombre, locale) ? ` · ${plano(markdownDe(c, nombre, locale))}` : ''}`;
    for (const [clave, e] of Object.entries(pr.entries))
      r.push({ u: `${base}#${clave}`, p, s: cadena(`principio.${clave}`) || clave, t: plano(textoDe(e.text, locale)) });
    for (const n of canon.nodos)
      if (n.section === seccion && n.kind !== 'encabezado' && mapa.get(n.id) === 'principio') r.push(...entradasDeNodo(c, n, locale, base, p, p));
  }
  return r.filter((e) => e.t || e.c);
}

/** Lo que se publica: sin el nodo de origen. */
export const publicable = (e: EntradaIndice[]) => e.map(({ n: _n, ...x }) => x);

/**
 * RV-14 · cada pasaje con contenido está en el índice, siempre con la dirección de su casa, y
 * ningún pasaje con casa `descarga` aparece (PRD v1.2 §18.3, RQ-16).
 */
export function validarIndice(c: Contenido, canon: Canon, locale: Locale): { entidad: string; mensaje: string }[] {
  const h: { entidad: string; mensaje: string }[] = [];
  const mapa = casas(canon);
  const paginas = new Map<string, Set<string>>();
  for (const e of construirIndice(c, canon, locale))
    if (e.n) paginas.set(e.n, (paginas.get(e.n) ?? new Set()).add(e.u.split('#')[0]!));
  for (const n of canon.nodos) {
    if (n.kind === 'encabezado') continue;
    const casa = mapa.get(n.id);
    const donde = paginas.get(n.id);
    if (casa === 'descarga') {
      if (donde) h.push({ entidad: n.id, mensaje: `${locale}: un pasaje que solo vive en la descarga aparece en el índice` });
      continue;
    }
    if (!donde) {
      if (tieneTexto(c, n, locale)) h.push({ entidad: n.id, mensaje: `${locale}: el pasaje falta en el índice` });
      continue;
    }
    if (donde.size > 1) h.push({ entidad: n.id, mensaje: `${locale}: el pasaje aparece en ${donde.size} páginas` });
    const esperada = casa === 'principio'
      ? ruta({ tipo: 'principio', principio: canon.nodos.find((x) => x.section === n.section && /^p(0[1-9]|10)$/.test(x.id))!.id }, locale)
      : casa ? ruta({ tipo: casa }, locale) : '';
    for (const pagina of donde) if (pagina !== esperada) h.push({ entidad: n.id, mensaje: `${locale}: el índice lleva a ${pagina} y su casa es ${esperada}` });
  }
  return h;
}
