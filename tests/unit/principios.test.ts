import { describe, expect, test } from 'bun:test';
import { PRINCIPIOS } from '../../src/lib/i18n/rutas';
import { canon, canonicoDePrincipio, contenido, partesCanonicas } from '../../src/lib/sitio';
import { validarContenido, versionInstalada } from '../../src/lib/validacion/reglas';

describe('principios frente al núcleo (AC-03, RV-04, RV-05)', () => {
  test('nombre y frase de cada principio se leen del núcleo y coinciden con la tabla de los diez compromisos', () => {
    const tabla = canon.nodos.find((n) => n.id === 'principios-de-diseno-04')!.source;
    for (const pid of PRINCIPIOS) {
      const { nombre, frase } = canonicoDePrincipio(pid);
      expect(nombre.section).toBe(canon.nodos.find((n) => n.id === pid)!.section);
      expect(tabla).toContain(nombre.titulo!);
      expect(frase.kind).toBe('parrafo');
    }
  });

  test('cada principio tiene en el núcleo significado, importancia, reglas, pruebas y señal', () => {
    for (const pid of PRINCIPIOS) {
      const p = partesCanonicas(pid);
      expect(p.reglas.kind).toBe('lista');
      expect(p.pruebas.kind).toBe('lista');
      expect(p.senal.source.startsWith('**Señal de incumplimiento.**')).toBe(true);
    }
  });

  test('el contenido real cumple RV-04 y RV-05', () => {
    const h = validarContenido(contenido, canon, versionInstalada()).filter((x) => ['RV-04', 'RV-05'].includes(x.regla));
    expect(h).toEqual([]);
  });
});
