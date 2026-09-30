import { describe, expect, test } from 'bun:test';
import { validarContenido } from '../../../src/lib/validacion/reglas';
import { canonDePrueba, contenidoValido } from '../../fixtures/contenido';

const reglas = (c = contenidoValido(), version = '2.0.0') =>
  validarContenido(c, canonDePrueba(), version).map((h) => h.regla);

describe('reglas RV-02 a RV-10', () => {
  test('el contenido válido no produce hallazgos', () => expect(reglas()).toEqual([]));

  test('RV-02 · identificadores duplicados', () => {
    const c = contenidoValido();
    c.principios[1]!.entries['tension']!.id = 'p01-tension';
    expect(reglas(c)).toContain('RV-02');
  });

  test('RV-03 · relación hacia una entidad inexistente', () => {
    const c = contenidoValido();
    c.principios[0]!.jobStories = ['JS-99'];
    expect(reglas(c)).toContain('RV-03');
    const d = contenidoValido();
    d.superficies[0]!.sections[0]!.blocks.push({ kind: 'canon', nodos: ['no-existe'] });
    expect(reglas(d)).toContain('RV-03');
  });

  test('RV-04 · faltan principios o están fuera de orden', () => {
    const c = contenidoValido();
    c.principios.pop();
    expect(reglas(c)).toContain('RV-04');
    const d = contenidoValido();
    [d.principios[0], d.principios[1]] = [d.principios[1]!, d.principios[0]!];
    expect(reglas(d)).toContain('RV-04');
  });

  test('RV-05 · un principio sin parte del contrato del PRD §17', () => {
    const c = contenidoValido();
    delete c.principios[2]!.entries['contraejemplo'];
    expect(reglas(c)).toContain('RV-05');
  });

  test('RV-06 · explicación sin origen declarado', () => {
    const c = contenidoValido();
    delete c.principios[0]!.entries['significado']!.derivedFrom;
    expect(reglas(c)).toContain('RV-06');
  });

  test('RV-07 · nodo canónico sin entrada de traducción', () => {
    const c = contenidoValido();
    delete c.traducciones[1]!.entries['p05'];
    expect(reglas(c)).toContain('RV-07');
  });

  test('RV-08 · texto sin uno de los tres idiomas', () => {
    const c = contenidoValido();
    delete c.cadenas['nav.inicio']!['pt-BR'];
    expect(reglas(c)).toContain('RV-08');
  });

  test('RV-09 · la versión declarada no coincide con la instalada', () => {
    expect(reglas(contenidoValido(), '2.1.0')).toContain('RV-09');
  });

  test('RV-10 · repositorio con el preset sin publicar', () => {
    const c = contenidoValido();
    c.estado.repository = 'https://example.com';
    expect(reglas(c)).toContain('RV-10');
  });
});
