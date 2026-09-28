import type { IdSuperficie, Locale } from './contenido/esquemas';
import type { GrupoIndice, ItemIndice } from './indice';
import type { IdDivision } from './casas';
import { PRINCIPIOS, ruta, type Pagina } from './i18n/rutas';
import { canonicoDePrincipio, markdownDe, superficie, t, texto } from './sitio';

/**
 * Índice del manifiesto (PRD v1.2 §18.2, RQ-15): las divisiones en el orden del núcleo, agrupadas
 * bajo las rutas que el núcleo nombra. Los nombres de ruta orientan; no reordenan.
 */
export const RUTAS_DE_LECTURA: { clave: string; divisiones: IdDivision[] }[] = [
  { clave: 'ruta.manifiesto', divisiones: ['mapa', 'manifiesto'] },
  { clave: 'ruta.principios', divisiones: ['principios', 'fundamento'] },
  { clave: 'ruta.aplicacion', divisiones: ['construir'] },
  { clave: 'ruta.verificacion', divisiones: ['verificar'] },
  { clave: 'ruta.practica', divisiones: ['ejemplo', 'gobernanza', 'bolsillo'] },
];

export const esDivision = (id: IdSuperficie | string): id is IdDivision => RUTAS_DE_LECTURA.some((r) => (r.divisiones as string[]).includes(id));

/** Clave de la ruta de lectura a la que pertenece una división. */
export const rutaDeDivision = (id: IdDivision) => RUTAS_DE_LECTURA.find((r) => r.divisiones.includes(id))!.clave;

const limpiar = (md: string) => md.replace(/^#{1,6}\s+/, '').replace(/`/g, '');

/** Nombre visible de una página del recorrido, para el índice y para anterior y siguiente. */
export function tituloDe(p: Pagina, locale: Locale): { texto: string; codigo?: string; lang?: string | undefined } {
  if (p.tipo === 'principio' && p.principio) {
    const md = markdownDe(canonicoDePrincipio(p.principio).nombre, locale);
    return { texto: limpiar(md.markdown), codigo: p.principio.toUpperCase(), lang: md.lang !== locale ? md.lang : undefined };
  }
  const x = texto(superficie(p.tipo as IdSuperficie).title, locale);
  return { texto: x.texto, lang: x.lang !== locale ? x.lang : undefined };
}

/**
 * Grupos del índice lateral para una página del manifiesto. La división actual se despliega con
 * sus secciones; los diez principios se muestran dentro de Principios cuando se está en ellos.
 */
export function indiceManifiesto(actual: Pagina, locale: Locale, propias: ItemIndice[] = []): GrupoIndice[] {
  const enPrincipios = actual.tipo === 'principios' || actual.tipo === 'principio';
  return RUTAS_DE_LECTURA.map((r) => ({
    titulo: t(r.clave, locale),
    items: r.divisiones.flatMap((d) => {
      const titulo = tituloDe({ tipo: d }, locale);
      const item: ItemIndice = { href: ruta({ tipo: d }, locale), texto: titulo.texto, lang: titulo.lang, actual: actual.tipo === d };
      const hijos: ItemIndice[] = [];
      if (actual.tipo === d) hijos.push(...propias.map((x) => ({ ...x, sub: true })));
      if (d === 'principios' && enPrincipios)
        hijos.push(...PRINCIPIOS.map((pid) => {
          const x = tituloDe({ tipo: 'principio', principio: pid }, locale);
          return { href: ruta({ tipo: 'principio', principio: pid }, locale), texto: x.texto, codigo: x.codigo, lang: x.lang, actual: actual.principio === pid, sub: true };
        }));
      return [item, ...hijos];
    }),
  }));
}
