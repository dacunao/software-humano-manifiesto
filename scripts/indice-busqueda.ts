/**
 * Índice de búsqueda con Pagefind (FR-023, RQ-16 enmendado). Se ejecuta después de `astro build`.
 * No rastrea el HTML publicado: arma una página mínima por página e idioma desde `construirIndice`,
 * de modo que cada pasaje entra una vez, en su casa y solo en el idioma del índice (RV-14). Los
 * encabezados con ancla dan a Pagefind los subresultados por sección e identificador.
 */
import * as pagefind from 'pagefind';
import { leerCanon } from '../src/lib/canon/lector';
import { cargarContenido } from '../src/lib/contenido/cargar';
import { construirIndice, validarIndice, type EntradaIndice } from '../src/lib/busqueda';
import { IDIOMAS, ORDEN_IDIOMAS } from '../src/lib/i18n/idiomas';

const esc = (t: string) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const ancla = (u: string) => u.split('#')[1] ?? '';

function paginaMinima(lang: string, titulo: string, entradas: EntradaIndice[]): string {
  const grupos = new Map<string, EntradaIndice[]>();
  for (const e of entradas) grupos.set(e.s, [...(grupos.get(e.s) ?? []), e]);
  const usadas = new Set<string>();
  const id = (a: string) => (a && !usadas.has(a) ? (usadas.add(a), ` id="${esc(a)}"`) : '');
  let cuerpo = `<h1>${esc(titulo)}</h1>`;
  for (const [seccion, es] of grupos) {
    const primera = es[0]!;
    cuerpo += `<h2${primera.c ? '' : id(ancla(primera.u))}>${esc(seccion)}</h2>`;
    for (const e of es) cuerpo += e.c ? `<h3${id(ancla(e.u))}>${esc(e.c)}</h3><p>${esc(e.t)}</p>` : `<p>${esc(e.t)}</p>`;
  }
  return `<!doctype html><html lang="${lang}"><head><title>${esc(titulo)}</title></head><body>${cuerpo}</body></html>`;
}

const contenido = cargarContenido();
const canon = leerCanon();
const { index } = await pagefind.createIndex({});
if (!index) throw new Error('Pagefind no pudo crear el índice');
let paginas = 0;
for (const locale of ORDEN_IDIOMAS) {
  const fallas = validarIndice(contenido, canon, locale);
  if (fallas.length) throw new Error(`RV-14 · ${fallas.map((f) => `${f.entidad}: ${f.mensaje}`).join('; ')}`);
  const porPagina = new Map<string, EntradaIndice[]>();
  for (const e of construirIndice(contenido, canon, locale)) {
    const base = e.u.split('#')[0]!;
    porPagina.set(base, [...(porPagina.get(base) ?? []), e]);
  }
  for (const [url, entradas] of porPagina) {
    const { errors } = await index.addHTMLFile({ url, content: paginaMinima(IDIOMAS[locale].hreflang, entradas[0]!.p, entradas) });
    if (errors.length) throw new Error(`Pagefind · ${url}: ${errors.join('; ')}`);
    paginas++;
  }
}
const { errors } = await index.writeFiles({ outputPath: 'dist/pagefind' });
if (errors.length) throw new Error(`Pagefind · ${errors.join('; ')}`);
await pagefind.close();
console.log(`Pagefind: ${paginas} páginas indexadas en ${ORDEN_IDIOMAS.length} idiomas (RV-14 verde).`);
