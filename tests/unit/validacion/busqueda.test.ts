import { describe, expect, test } from 'bun:test';
import { leerCanon } from '../../../src/lib/canon/lector';
import { construirIndice, validarIndice } from '../../../src/lib/busqueda';
import { contenido } from '../../../src/lib/sitio';

// FR-023, RQ-16, RV-14 · un resultado por pasaje, siempre en su casa.
describe('índice de búsqueda', () => {
  const canon = leerCanon();

  test('el contenido real cumple RV-14 en los tres idiomas', () => {
    for (const l of ['en', 'es', 'pt-BR'] as const) expect(validarIndice(contenido, canon, l)).toEqual([]);
  });

  test('CR03 tiene un solo resultado y lleva a su casa', () => {
    const r = construirIndice(contenido, canon, 'es').filter((e) => e.c === 'CR03');
    expect(r.map((e) => e.u)).toEqual(['/es/manifiesto/construir-con-ia#cr03']);
  });

  test('las filas con identificador de una tabla son entradas propias', () => {
    const r = construirIndice(contenido, canon, 'es').find((e) => e.c === 'D03');
    expect(r?.u).toBe('/es/manifiesto/construir-con-ia#d03');
    expect(r?.t.length).toBeGreaterThan(10);
  });

  test('Influencias y notas no aparece, salvo la Declaración final en la Guía de bolsillo', () => {
    const r = construirIndice(contenido, canon, 'es');
    expect(r.some((e) => e.n?.startsWith('influencias-y-notas-0'))).toBe(false);
    expect(r.find((e) => e.n === 'influencias-y-notas-13')?.u).toBe('/es/manifiesto/guia-de-bolsillo#influencias-y-notas-13');
  });

  test('un pasaje repetido en otra página detiene la construcción', () => {
    const copia = structuredClone({ ...contenido, origen: undefined }) as unknown as typeof contenido;
    copia.origen = contenido.origen;
    copia.superficies.find((s) => s.id === 'speckit')!.sections[0]!.blocks.push({ kind: 'canon', nodos: ['cr03'] });
    expect(validarIndice(copia, canon, 'es').map((x) => x.entidad)).toContain('cr03');
  });
});

describe('índice de búsqueda · listas con identificadores', () => {
  test('cada razón para detenerse tiene su entrada', () => {
    const r = construirIndice(contenido, leerCanon(), 'es').filter((e) => e.c?.startsWith('STOP0'));
    expect(r.map((e) => e.c)).toEqual(['STOP01', 'STOP02', 'STOP03', 'STOP04', 'STOP05', 'STOP06', 'STOP07']);
    expect(new Set(r.map((e) => e.u.split('#')[0]))).toEqual(new Set(['/es/manifiesto/guia-de-bolsillo']));
  });
});

describe('índice de búsqueda · solo el idioma vigente (RQ-16 enmendado, PRD §19.4)', () => {
  test('el índice en inglés no guarda textos que solo existen en español', () => {
    const canon = leerCanon();
    const en = construirIndice(contenido, canon, 'en');
    // Una explicación editorial todavía sin traducir no aparece en el índice inglés.
    const pendiente = contenido.superficies.flatMap((s) => s.sections.flatMap((sec) => sec.blocks))
      .find((b) => b.kind === 'entrada' && b.entrada.text.es?.text && !b.entrada.text.en?.text);
    expect(pendiente).toBeDefined();
    if (pendiente?.kind === 'entrada') expect(en.some((e) => e.t.includes(pendiente.entrada.text.es!.text!.slice(0, 40)))).toBe(false);
    // Ningún título de sección en español en el índice inglés.
    expect(en.some((e) => e.s === 'Cómo cambia el manifiesto')).toBe(false);
  });
});
