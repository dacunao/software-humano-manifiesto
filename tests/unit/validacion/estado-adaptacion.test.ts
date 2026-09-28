import { describe, expect, test } from 'bun:test';
import { canon, contenido } from '../../../src/lib/sitio';
import { validarContenido, versionInstalada } from '../../../src/lib/validacion/reglas';
import { canonDePrueba, contenidoValido } from '../../fixtures/contenido';

describe('estado de la adaptación (RV-09, RV-10)', () => {
  test('el estado real coincide con el preset instalado', () => {
    expect(contenido.estado.version).toBe(versionInstalada());
    expect(validarContenido(contenido, canon, versionInstalada()).filter((h) => ['RV-09', 'RV-10'].includes(h.regla))).toEqual([]);
  });

  test('RV-09 falla si el dato difiere del registro instalado', () => {
    expect(validarContenido(contenidoValido(), canonDePrueba(), '9.9.9').map((h) => h.regla)).toContain('RV-09');
  });

  test('RV-10 falla con url o sha256 mientras published es false', () => {
    const c = contenidoValido();
    c.estado.sha256 = 'x';
    expect(validarContenido(c, canonDePrueba(), '2.0.0').map((h) => h.regla)).toContain('RV-10');
  });
});
