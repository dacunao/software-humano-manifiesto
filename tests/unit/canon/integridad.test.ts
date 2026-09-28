import { describe, expect, test } from 'bun:test';
import { existsSync, readFileSync } from 'node:fs';
import { leerCanon } from '../../../src/lib/canon/lector';
import { renderMarkdown } from '../../../src/lib/canon/render';
import { textoVisible } from '../../../src/lib/validacion/html';

// AC-03 · el texto publicado en el texto íntegro (/es/manifiesto/texto-integro) reproduce todos los nodos del núcleo. Requiere `bun run build`.
const salida = 'dist/es/manifiesto/texto-integro.html';
const normal = (t: string) => t.replace(/\s+/g, ' ').trim();

describe('integridad del manifiesto publicado', () => {
  test.if(existsSync(salida))('cada nodo canónico aparece íntegro en la página', () => {
    const pagina = normal(textoVisible(readFileSync(salida, 'utf8')));
    const faltantes = leerCanon().nodos.filter((n) => {
      const md = n.kind === 'encabezado' ? n.source.replace(/^#{1,6}\s+/, '') : n.source;
      return !pagina.includes(normal(textoVisible(`<body>${renderMarkdown(md)}`)));
    });
    expect(faltantes.map((n) => n.id)).toEqual([]);
  });
});
