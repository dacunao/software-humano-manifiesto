import type { APIRoute } from 'astro';
import { construirIndice, publicable } from '../../lib/busqueda';
import type { Locale } from '../../lib/contenido/esquemas';
import { canon, contenido } from '../../lib/sitio';

/** Índice de búsqueda por idioma (FR-023, RQ-16). Solo se descarga cuando alguien abre la búsqueda. */
const LOCALES: Record<string, Locale> = { en: 'en', es: 'es', 'pt-br': 'pt-BR' };

export function getStaticPaths() {
  return Object.keys(LOCALES).map((l) => ({ params: { archivo: `indice-${l}.json` } }));
}

export const GET: APIRoute = ({ params }) => {
  const l = /^indice-(en|es|pt-br)\.json$/.exec(params['archivo'] ?? '')?.[1] ?? 'en';
  const cuerpo = JSON.stringify(publicable(construirIndice(contenido, canon, LOCALES[l]!)));
  return new Response(cuerpo, { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
};
