import { describe, expect, test } from 'bun:test';
import { leerCanon } from '../../../src/lib/canon/lector';
import { casas } from '../../../src/lib/casas';
import { validarContenido, versionInstalada } from '../../../src/lib/validacion/reglas';
import { contenido } from '../../../src/lib/sitio';
import { canonDePrueba, contenidoValido } from '../../fixtures/contenido';

describe('una sola casa por pasaje, sin excepciones (PRD v1.2 §18.3, RV-13)', () => {
  test('cada nodo del núcleo tiene una casa', () => {
    const canon = leerCanon();
    const m = casas(canon);
    for (const n of canon.nodos) expect(m.get(n.id), n.id).toBeDefined();
    expect(m.get('p03')).toBe('principio');
    expect(m.get('cr03')).toBe('construir');
    expect(m.get('v01')).toBe('verificar');
    expect(m.get('sh-fund')).toBe('fundamento');
    expect(m.get('texto-canonico-03')).toBe('manifiesto');
    expect(m.get('sh-index')).toBe('mapa');
    expect(m.get('portada-04')).toBe('mapa');
    expect(m.get('sh-done')).toBe('gobernanza');
    expect(m.get('influencias-y-notas-03')).toBe('descarga');
    expect(m.get('influencias-y-notas-13')).toBe('bolsillo');
  });

  test('cada sección del núcleo va entera a una sola casa, salvo la Declaración final (RQ-15)', () => {
    const canon = leerCanon();
    const m = casas(canon);
    const porSeccion = new Map<string, Set<string>>();
    for (const n of canon.nodos) if (!['influencias-y-notas-12', 'influencias-y-notas-13'].includes(n.id))
      porSeccion.set(n.section, (porSeccion.get(n.section) ?? new Set()).add(m.get(n.id)!));
    for (const [sec, cs] of porSeccion) expect([...cs], sec).toHaveLength(1);
  });

  test('un pasaje completo fuera de su casa detiene la construcción', () => {
    const c = contenidoValido();
    c.superficies[0]!.sections[0]!.blocks.push({ kind: 'canon', nodos: ['d01'] });
    expect(validarContenido(c, canonDePrueba(), '2.0.0').map((h) => h.regla)).toContain('RV-13');
  });

  test('una cita breve de más de 60 palabras detiene la construcción', () => {
    const canon = canonDePrueba();
    canon.nodos.find((n) => n.id === 'tabla-01')!.source = Array(61).fill('palabra').join(' ');
    expect(validarContenido(contenidoValido(), canon, '2.0.0').map((h) => h.regla)).toContain('RV-13');
  });

  test('el contenido real cumple RV-13', () => {
    const h = validarContenido(contenido, leerCanon(), versionInstalada()).filter((x) => x.regla === 'RV-13');
    expect(h.map((x) => `${x.archivo} · ${x.entidad} · ${x.mensaje}`)).toEqual([]);
  });
});
