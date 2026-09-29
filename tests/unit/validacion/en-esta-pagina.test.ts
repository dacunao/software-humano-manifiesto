import { describe, expect, test } from 'bun:test';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, relative } from 'node:path';

// Navegación estándar (T202): cada título del contenido (h2, h3 y h4) figura en «En esta página».
// Se comprueba sobre la salida construida, que es lo que ve la persona.
const recorrer = (d: string): string[] => readdirSync(d, { withFileTypes: true })
  .flatMap((e) => (e.isDirectory() ? recorrer(join(d, e.name)) : e.name.endsWith('.html') ? [join(d, e.name)] : []));

describe('«En esta página» cubre todas las secciones', () => {
  test.skipIf(!existsSync('dist'))('en las 66 páginas, ningún h2, h3 ni h4 falta en la columna derecha', () => {
    const faltan: string[] = [];
    const paginas = recorrer('dist').filter((f) => !f.endsWith('404.html'));
    expect(paginas).toHaveLength(66);
    for (const f of paginas) {
      const html = readFileSync(f, 'utf8');
      const main = html.slice(html.indexOf('<main'), html.indexOf('</main>'));
      const tabla = html.match(/<nav class="en-esta-pagina"[\s\S]*?<\/nav>/)?.[0];
      if (!tabla) { faltan.push(`/${relative('dist', f)}: sin «En esta página»`); continue; }
      const anclas = new Set([...tabla.matchAll(/href="#([^"]+)"/g)].map((m) => m[1]));
      // h2, h3 y h4 del contenido; los de una cita breve de otra página no son títulos de esta (RV-13).
      const sinCitas = main.replace(/<figure class="cita-canonica destacada[\s\S]*?<\/figure>/g, '');
      for (const m of sinCitas.matchAll(/<h[234]([^>]*)>([\s\S]*?)<\/h[234]>/g)) {
        const id = m[1]!.match(/id="([^"]+)"/)?.[1];
        if (!id || (!anclas.has(id) && !anclas.has(id.replace(/-titulo$/, ''))))
          faltan.push(`/${relative('dist', f)}: «${m[2]!.replace(/<[^>]+>/g, '').trim()}»`);
      }
    }
    expect(faltan).toEqual([]);
  });
});
