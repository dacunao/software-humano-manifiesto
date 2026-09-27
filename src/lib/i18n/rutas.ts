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
  manifiesto: { en: 'manifesto', es: 'manifiesto', 'pt-BR': 'manifesto' },
  principios: { en: 'principles', es: 'principios', 'pt-BR': 'principios' },
  aplicacion: { en: 'practice', es: 'aplicacion', 'pt-BR': 'aplicacao' },
  speckit: { en: 'speckit', es: 'speckit', 'pt-BR': 'speckit' },
  acerca: { en: 'about', es: 'acerca', 'pt-BR': 'sobre' },
  '404': { en: '404', es: '404', 'pt-BR': '404' },
};

export const PRINCIPIOS = Array.from({ length: 10 }, (_, i) => `p${String(i + 1).padStart(2, '0')}`);
export const SUPERFICIES: readonly IdSuperficie[] = ['inicio', 'manifiesto', 'principios', 'aplicacion', 'speckit', 'acerca'];

export function ruta(pagina: Pagina, locale: Locale): string {
  const prefijo = IDIOMAS[locale].path;
  const partes =
    pagina.tipo === 'principio'
      ? [prefijo, SLUGS.principios[locale], pagina.principio]
      : [prefijo, SLUGS[pagina.tipo][locale]];
  const r = `/${partes.filter(Boolean).join('/')}`;
  return r;
}

/** Las 48 páginas de contenido, sin las 404. */
export function paginasDeContenido(): Pagina[] {
  return [
    ...SUPERFICIES.map((tipo) => ({ tipo })),
    ...PRINCIPIOS.map((principio) => ({ tipo: 'principio' as const, principio })),
  ];
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
