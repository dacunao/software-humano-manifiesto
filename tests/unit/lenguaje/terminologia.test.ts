import { describe, expect, test } from 'bun:test';
import { glosario, revisar } from '../../../scripts/traduccion/terminologia';

// T182 · Capa 1 (RQ-19): la terminología del núcleo aprobado se respeta en todo el núcleo y el copy.
describe('terminología de las traducciones (capa 1)', () => {
  test('el glosario tiene los diez principios y reglas para cada idioma', () => {
    const ids = glosario.terminos.map((t) => t.id);
    for (let i = 1; i <= 10; i++) expect(ids).toContain(`P${String(i).padStart(2, '0')}`);
    expect(glosario.prohibidos.en.length).toBeGreaterThan(0);
    expect(glosario.prohibidos.pt.length).toBeGreaterThan(0);
  });

  test('ninguna traducción usa una variante prohibida ni omite un término fijado', () => {
    expect(revisar().map((h) => `${h.clave} (${h.idioma}) ${h.regla}: ${h.detalle}`)).toEqual([]);
  });

  test('detecta una variante prohibida y un término faltante', () => {
    const h = revisar([{ clave: 'x', origen: 'copy', nivel: 1, es: 'La confianza y la trazabilidad', en: 'Confidence and traceability', pt: 'A confiança e o registo' }]);
    expect(h.map((x) => `${x.idioma}:${x.regla}`).sort()).toEqual(['en:confianza', 'en:confidence', 'pt:registo', 'pt:trazabilidad']);
  });
});
