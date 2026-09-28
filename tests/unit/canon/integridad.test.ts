import { describe, expect, test } from 'bun:test';
import { existsSync, readFileSync } from 'node:fs';
import { leerCanon, RUTA_CANON } from '../../../src/lib/canon/lector';
import { renderMarkdown } from '../../../src/lib/canon/render';
import { textoVisible } from '../../../src/lib/validacion/html';
import { casas } from '../../../src/lib/casas';
import { ordenDeLectura, ruta } from '../../../src/lib/i18n/rutas';

// AC-03 · recorridas en orden, las divisiones en español reproducen cada pasaje con contenido del
// núcleo, salvo los de casa `descarga` (PRD v1.2 §18.1, RQ-15). La descarga en español es el
// archivo original, byte a byte. Requiere `bun run build`.
const archivo = (r: string) => `dist${r}.html`;
const paginas = ordenDeLectura().map((p) => archivo(ruta(p, 'es')));
const normal = (t: string) => t.replace(/\s+/g, ' ').trim();
const construido = paginas.every(existsSync);

describe('integridad del manifiesto publicado', () => {
  test.if(construido)('cada pasaje con contenido aparece íntegro en su división', () => {
    const texto = normal(paginas.map((f) => textoVisible(readFileSync(f, 'utf8'))).join(' '));
    const canon = leerCanon();
    const m = casas(canon);
    const faltantes = canon.nodos.filter((n) => {
      if (n.kind === 'encabezado' || m.get(n.id) === 'descarga') return false;
      return !texto.includes(normal(textoVisible(`<body>${renderMarkdown(n.source)}`)));
    });
    expect(faltantes.map((n) => n.id)).toEqual([]);
  });

  test.if(existsSync('dist/descargas/nucleo-v2.1-es.md'))('la descarga en español es el archivo original', () => {
    expect(readFileSync('dist/descargas/nucleo-v2.1-es.md').equals(readFileSync(RUTA_CANON))).toBe(true);
  });
});
