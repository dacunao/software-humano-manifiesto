import { describe, expect, test } from 'bun:test';
import { readFileSync } from 'node:fs';
import { leerCanon, RUTA_CANON } from '../../../src/lib/canon/lector';
import { verificarHuella, ErrorHuellaCanon, HUELLA_CANON } from '../../../src/lib/canon/huella';

const ANCLAS_FUENTE = [
  'sh-index', 'p01', 'p02', 'p03', 'p04', 'p05', 'p06', 'p07', 'p08', 'p09', 'p10',
  'sh-fund', 'sh-stop', 'sh-score', 'sh-ap', 'sh-gov', 'sh-done', 'sh-pocket',
];

const rango = (prefijo: string, hasta: number) =>
  Array.from({ length: hasta }, (_, i) => `${prefijo}${String(i + 1).padStart(2, '0')}`);

const ANCLAS_DERIVADAS = [
  ...rango('d', 6), ...rango('f', 8), ...rango('a', 8), ...rango('stop', 7),
  ...rango('cr', 8), ...rango('o', 9), ...rango('v', 12),
];

describe('lector del núcleo canónico', () => {
  const canon = leerCanon();
  const anclas = new Set(canon.nodos.flatMap((n) => [n.id, ...n.anclas]));

  test('(a) conserva los 18 anclajes existentes como ids de nodo', () => {
    const ids = new Set(canon.nodos.map((n) => n.id));
    for (const a of ANCLAS_FUENTE) expect(ids.has(a)).toBe(true);
  });

  test('(b) deriva anclas en minúsculas para los identificadores en tabla, lista o párrafo', () => {
    for (const a of ANCLAS_DERIVADAS) expect(anclas.has(a)).toBe(true);
  });

  test('las anclas son únicas', () => {
    const todas = canon.nodos.flatMap((n) => [n.id, ...n.anclas.filter((a) => a !== n.id)]);
    expect(new Set(todas).size).toBe(todas.length);
  });

  test('(c) los ids son deterministas entre dos lecturas', () => {
    const otra = leerCanon();
    expect(otra.nodos.map((n) => `${n.id}:${n.hash}`)).toEqual(canon.nodos.map((n) => `${n.id}:${n.hash}`));
  });

  test('(d) una huella distinta produce el error RV-01', () => {
    expect(() => verificarHuella('texto alterado')).toThrow(ErrorHuellaCanon);
    expect(() => verificarHuella(readFileSync(RUTA_CANON, 'utf8'))).not.toThrow();
    expect(HUELLA_CANON).toHaveLength(64);
  });

  test('(e) los nodos reproducen el archivo, con los espacios normalizados', () => {
    const normalizar = (t: string) => t.replace(/<a id="[^"]+"><\/a>/g, '').replace(/\s+/g, ' ').trim();
    const reconstruido = canon.nodos.map((n) => n.source).join('\n\n');
    expect(normalizar(reconstruido)).toBe(normalizar(readFileSync(RUTA_CANON, 'utf8')));
  });

  test('cada nodo pertenece a una sección y tiene un tipo conocido', () => {
    for (const n of canon.nodos) {
      expect(n.section.length).toBeGreaterThan(0);
      expect(['encabezado', 'parrafo', 'lista', 'tabla', 'cita']).toContain(n.kind);
    }
  });
});
