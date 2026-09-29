import { describe, expect, test } from 'bun:test';
import { textos } from '../../../scripts/traduccion/relevancia';

// T181 · RQ-19: cada texto traducible tiene un nivel, asignado por regla.
describe('relevancia de los textos traducibles (RQ-19)', () => {
  const t = textos();
  const nivel = (clave: string) => t.find((x) => x.clave === clave)?.nivel;

  test('los 341 nodos del núcleo y todo el copy con texto en español tienen nivel', () => {
    expect(t.filter((x) => x.origen === 'nucleo')).toHaveLength(341);
    expect(t.filter((x) => x.origen === 'copy').length).toBeGreaterThan(0);
    expect(t.every((x) => [1, 2, 3].includes(x.nivel))).toBe(true);
    expect(new Set(t.map((x) => x.clave)).size).toBe(t.length);
  });

  test('lo que obliga o define va al nivel 1', () => {
    for (const c of ['canon::texto-canonico-01', 'canon::principio-6-09', 'canon::principio-6-11', 'canon::cr05', 'canon::o09', 'canon::sh-done', 'canon::guia-de-bolsillo-18'])
      expect(nivel(c), c).toBe(1);
    // Las tablas con identificadores normativos, en cualquier sección.
    const directivas = t.find((x) => x.origen === 'nucleo' && x.es.includes('`D04`'));
    expect(directivas?.nivel).toBe(1);
    expect(nivel('interfaz/cadenas.yaml::nav.saltar')).toBe(1);
    expect(nivel('superficies/inicio.yaml::hero/title')).toBe(1);
  });

  test('explicaciones al nivel 2; ejemplos, influencias y control de cambios al 3', () => {
    expect(nivel('canon::principio-6-05')).toBe(2);
    expect(nivel('principios/p06.yaml::entries/significado/text')).toBe(2);
    for (const c of ['canon::principio-6-12', 'canon::ejemplo-aplicado-05', 'canon::influencias-y-notas-03', 'canon::gobernanza-12', 'principios/p06.yaml::entries/ejemplo/text'])
      expect(nivel(c), c).toBe(3);
  });
});
