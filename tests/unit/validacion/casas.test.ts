import { describe, expect, test } from 'bun:test';
import { leerCanon } from '../../../src/lib/canon/lector';
import { casas } from '../../../src/lib/casas';
import { validarContenido, versionInstalada } from '../../../src/lib/validacion/reglas';
import { contenido } from '../../../src/lib/sitio';
import { canonDePrueba, contenidoValido } from '../../fixtures/contenido';

describe('una sola casa por pasaje (PRD v1.1 §18.3, RV-13)', () => {
  test('cada nodo del núcleo tiene una casa', () => {
    const canon = leerCanon();
    const m = casas(canon);
    for (const n of canon.nodos) expect(m.get(n.id), n.id).toBeDefined();
    expect(m.get('p03')).toBe('principio');
    expect(m.get('cr03')).toBe('aplicacion');
    expect(m.get('v01')).toBe('verificacion');
    expect(m.get('sh-fund')).toBe('principios');
    expect(m.get('texto-canonico-03')).toBe('manifiesto');
    expect(m.get('sh-index')).toBe('texto-integro');
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
