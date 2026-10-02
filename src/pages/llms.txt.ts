import type { APIRoute } from 'astro';
import { IDIOMAS, ORDEN_IDIOMAS } from '../lib/i18n/idiomas';
import { ordenDeLectura, ruta, type Pagina } from '../lib/i18n/rutas';
import { tituloDe } from '../lib/manifiesto';
import { contenido, rutaDescarga, superficie, t, texto, URL_SITIO } from '../lib/sitio';
import type { IdSuperficie, Locale } from '../lib/contenido/esquemas';

/**
 * `/llms.txt` (propuesta llmstxt.org, T248): índice en Markdown para agentes de IA. Todo sale del
 * contenido aprobado; no tiene texto propio que mantener (PRD §25.4: enlaza la página exacta y
 * conserva versión y procedencia).
 */
const paginas = (): Pagina[] => [{ tipo: 'inicio' }, ...ordenDeLectura(), { tipo: 'speckit' }, { tipo: 'acerca' }];

function linea(p: Pagina, l: Locale): string {
  const url = `${URL_SITIO}${ruta(p, l)}`;
  if (p.tipo === 'inicio') return `- [${t('inicio.tituloPagina', l)}](${url}): ${texto(superficie('inicio').description, l).texto}`;
  const x = tituloDe(p, l);
  const nombre = x.codigo ? `${x.codigo} · ${x.texto}` : x.texto;
  if (p.tipo === 'principio') return `- [${nombre}](${url})`;
  return `- [${nombre}](${url}): ${texto(superficie(p.tipo as IdSuperficie).description, l).texto}`;
}

export const GET: APIRoute = () => {
  const e = contenido.estado;
  const partes = [
    `# ${contenido.sitio.name}`,
    `> ${texto(superficie('inicio').description, 'en').texto}`,
    t('contenido.avisoTraduccion', 'en'),
    ...ORDEN_IDIOMAS.map((l) =>
      [`## ${IDIOMAS[l].label}`, ...paginas().map((p) => linea(p, l)), `- [${t('integro.descargas', l)}](${URL_SITIO}${rutaDescarga(l)})`].join('\n'),
    ),
  ];
  // Optional: el repositorio de la adaptación y el sitio hermano, cuando responde (estándar común B9).
  const opcionales: string[] = [];
  if (e.published && e.repository) opcionales.push(`- [${t('estado.nombre', 'en')}](${e.repository})`);
  if (contenido.sitio.publisher.enLinea) opcionales.push(`- [${contenido.sitio.publisher.name}](${contenido.sitio.publisher.url}): ${t('pie.conocer', 'en')}`);
  if (opcionales.length) partes.push(`## Optional\n\n${opcionales.join('\n')}`);
  return new Response(partes.join('\n\n') + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
