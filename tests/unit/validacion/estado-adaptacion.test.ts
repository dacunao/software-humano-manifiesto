import { describe, expect, test } from 'bun:test';
import { canon, contenido } from '../../../src/lib/sitio';
import { validarContenido, versionInstalada, versionSpeckit } from '../../../src/lib/validacion/reglas';
import { canonDePrueba, contenidoValido } from '../../fixtures/contenido';

describe('estado de la adaptación (RV-09, RV-10)', () => {
  test('el estado real coincide con el preset instalado', () => {
    expect(contenido.estado.version).toBe(versionInstalada());
    expect(validarContenido(contenido, canon, versionInstalada()).filter((h) => ['RV-09', 'RV-10'].includes(h.regla))).toEqual([]);
  });

  test('RV-09 falla si el dato difiere del registro instalado', () => {
    expect(validarContenido(contenidoValido(), canonDePrueba(), '9.9.9').map((h) => h.regla)).toContain('RV-09');
  });

  const REPO = 'https://github.com/x/y';
  const release = (v = '1.2.3') => ({ version: v, preset: '1.0.0', publishedAt: '2026-09-30', page: `${REPO}/releases/tag/v${v}`, download: `${REPO}/releases/download/v${v}/p.zip`, sha256: 'a'.repeat(64) });
  const rv10 = (c: ReturnType<typeof contenidoValido>) => validarContenido(c, canonDePrueba(), '2.0.0').filter((h) => h.regla === 'RV-10');

  test('RV-10 falla con repositorio o versión publicada mientras published es false', () => {
    const c = contenidoValido();
    c.estado.repository = REPO;
    expect(rv10(c)).toHaveLength(1);
  });

  test('RV-10 exige repositorio y versión publicada cuando published es true', () => {
    const c = contenidoValido();
    c.estado.published = true;
    expect(rv10(c)).toHaveLength(1);
    c.estado.repository = REPO;
    c.estado.release = release();
    expect(rv10(c)).toEqual([]);
  });

  test('RV-10 falla si el archivo no es de la versión declarada o está fuera del repositorio', () => {
    const c = contenidoValido();
    c.estado.published = true;
    c.estado.repository = REPO;
    c.estado.release = { ...release(), download: `${REPO}/releases/download/v9.9.9/p.zip` };
    expect(rv10(c)).toHaveLength(1);
    c.estado.release = { ...release(), page: 'https://github.com/otro/y/releases/tag/v1.2.3' };
    expect(rv10(c)).toHaveLength(1);
  });
});

describe('versión de SpecKit (T226)', () => {
  test('la registrada coincide con la fijada en tools/speckit/specify', () => {
    expect(versionSpeckit()).toMatch(/^\d+\.\d+\.\d+$/);
  });
  test('se detiene si no coinciden', () => {
    expect(() => versionSpeckit('/nonexistent')).toThrow();
  });
});
