import { readdirSync } from 'node:fs';
import { join, relative } from 'node:path';

/** Rutas de todas las páginas construidas, leídas de `dist/` para que ninguna quede fuera (T088–T090). */
function recorrer(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? recorrer(join(dir, e.name)) : e.name.endsWith('.html') ? [join(dir, e.name)] : [],
  );
}

const rutas = recorrer('dist')
  .map((f) => '/' + relative('dist', f).replace(/\.html$/, ''))
  .map((r) => (r === '/index' ? '/' : r))
  .sort();

/** Las 66 páginas de contenido (PRD v1.2). */
export const PAGINAS = rutas.filter((r) => !r.endsWith('404'));
/** Las páginas 404, una por idioma. */
export const PAGINAS_404 = rutas.filter((r) => r.endsWith('404'));
