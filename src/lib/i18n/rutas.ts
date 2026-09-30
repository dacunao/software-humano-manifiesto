import type { IdSuperficie } from '../contenido/esquemas';
import { IDIOMAS, ORDEN_IDIOMAS, type Locale } from './idiomas';

/** Contrato público de rutas (specs/001-sitio-manifiesto/contracts/rutas.md). */
export type TipoPagina = IdSuperficie | 'principio' | '404';

export interface Pagina {
  tipo: TipoPagina;
  /** `p01`…`p10`, solo para tipo 'principio'. */
  principio?: string;
}

const SLUGS: Record<Exclude<TipoPagina, 'principio'>, Record<Locale, string>> = {
  inicio: { en: '', es: '', 'pt-BR': '' },
  mapa: { en: 'manifesto/map', es: 'manifiesto/mapa', 'pt-BR': 'manifesto/mapa' },
  manifiesto: { en: 'manifesto', es: 'manifiesto', 'pt-BR': 'manifesto' },
  principios: { en: 'principles', es: 'principios', 'pt-BR': 'principios' },
  fundamento: { en: 'manifesto/product-foundation', es: 'manifiesto/fundamento-de-producto', 'pt-BR': 'manifesto/fundamento-de-produto' },
  construir: { en: 'manifesto/building-with-ai', es: 'manifiesto/construir-con-ia', 'pt-BR': 'manifesto/construir-com-ia' },
  verificar: { en: 'manifesto/verify', es: 'manifiesto/verificar', 'pt-BR': 'manifesto/verificar' },
  ejemplo: { en: 'manifesto/worked-example', es: 'manifiesto/ejemplo-aplicado', 'pt-BR': 'manifesto/exemplo-aplicado' },
  gobernanza: { en: 'manifesto/governance', es: 'manifiesto/gobernanza', 'pt-BR': 'manifesto/governanca' },
  bolsillo: { en: 'manifesto/pocket-guide', es: 'manifiesto/guia-de-bolsillo', 'pt-BR': 'manifesto/guia-de-bolso' },
  speckit: { en: 'speckit', es: 'speckit', 'pt-BR': 'speckit' },
  acerca: { en: 'about', es: 'acerca', 'pt-BR': 'sobre' },
  '404': { en: '404', es: '404', 'pt-BR': '404' },
};

export const PRINCIPIOS = Array.from({ length: 10 }, (_, i) => `p${String(i + 1).padStart(2, '0')}`);
export const SUPERFICIES: readonly IdSuperficie[] = ['inicio', 'mapa', 'manifiesto', 'principios', 'fundamento', 'construir', 'verificar', 'ejemplo', 'gobernanza', 'bolsillo', 'speckit', 'acerca'];

export function ruta(pagina: Pagina, locale: Locale): string {
  const prefijo = IDIOMAS[locale].path;
  const partes =
    pagina.tipo === 'principio'
      ? [prefijo, SLUGS.principios[locale], pagina.principio]
      : [prefijo, SLUGS[pagina.tipo][locale]];
  const r = `/${partes.filter(Boolean).join('/')}`;
  return r;
}

/** Las 22 páginas de contenido por idioma, 66 en total (PRD v1.2), sin las 404. */
export function paginasDeContenido(): Pagina[] {
  return [
    ...SUPERFICIES.map((tipo) => ({ tipo })),
    ...PRINCIPIOS.map((principio) => ({ tipo: 'principio' as const, principio })),
  ];
}

/**
 * Orden de lectura del núcleo en el sitio (RQ-15): recorrerlo con «Siguiente» reproduce el núcleo.
 * Mapa → El manifiesto → Principios → P01 … P10 → Fundamento → Construir → Verificar → Ejemplo → Gobernanza → Guía de bolsillo.
 */
export function ordenDeLectura(): Pagina[] {
  return [
    { tipo: 'mapa' }, { tipo: 'manifiesto' }, { tipo: 'principios' },
    ...PRINCIPIOS.map((principio) => ({ tipo: 'principio' as const, principio })),
    { tipo: 'fundamento' }, { tipo: 'construir' }, { tipo: 'verificar' }, { tipo: 'ejemplo' }, { tipo: 'gobernanza' }, { tipo: 'bolsillo' },
  ];
}

/** Página anterior y siguiente en el orden de lectura, si la página pertenece a él. */
export function vecinas(p: Pagina): { anterior?: Pagina; siguiente?: Pagina } {
  const orden = ordenDeLectura();
  const i = orden.findIndex((x) => x.tipo === p.tipo && x.principio === p.principio);
  if (i < 0) return {};
  const r: { anterior?: Pagina; siguiente?: Pagina } = {};
  if (orden[i - 1]) r.anterior = orden[i - 1]!;
  if (orden[i + 1]) r.siguiente = orden[i + 1]!;
  return r;
}

export function todasLasRutas(): { pagina: Pagina; locale: Locale; ruta: string }[] {
  return paginasDeContenido().flatMap((pagina) => ORDEN_IDIOMAS.map((locale) => ({ pagina, locale, ruta: ruta(pagina, locale) })));
}

/** Resuelve una ruta pública a su página e idioma, o undefined si no pertenece al contrato. */
export function resolverRuta(r: string): { pagina: Pagina; locale: Locale } | undefined {
  const limpia = r.split('#')[0]!.split('?')[0]!.replace(/\.html$/, '').replace(/\/+$/, '') || '/';
  for (const pagina of [...paginasDeContenido(), { tipo: '404' as const }])
    for (const locale of ORDEN_IDIOMAS) if (ruta(pagina, locale) === limpia) return { pagina, locale };
  return undefined;
}

/** Ruta del mismo concepto en otro idioma, conservando el ancla (FR-020). */
export function rutaEquivalente(r: string, destino: Locale): string {
  const [base, ancla] = r.split('#');
  const actual = resolverRuta(base ?? '/');
  const equivalente = actual ? ruta(actual.pagina, destino) : ruta({ tipo: 'inicio' }, destino);
  return ancla ? `${equivalente}#${ancla}` : equivalente;
}

/** Alternas `hreflang` recíprocas más x-default → inglés (contracts/rutas.md). */
export function alternas(pagina: Pagina): { hreflang: string; ruta: string }[] {
  return [
    ...ORDEN_IDIOMAS.map((l) => ({ hreflang: IDIOMAS[l].hreflang, ruta: ruta(pagina, l) })),
    { hreflang: 'x-default', ruta: ruta(pagina, 'en') },
  ];
}
