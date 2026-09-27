import { afterAll, describe, expect, test } from 'bun:test';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { validarSalida } from '../../../src/lib/validacion/salida';
import { informeVisibilidad } from '../../../src/lib/validacion/visibilidad';

const dir = mkdtempSync(join(tmpdir(), 'salida-'));
afterAll(() => rmSync(dir, { recursive: true, force: true }));
const pagina = (archivo: string, cuerpo: string, ld?: object) => {
  const ruta = join(dir, archivo);
  mkdirSync(join(ruta, '..'), { recursive: true });
  const script = ld ? `<script type="application/ld+json">${JSON.stringify(ld)}</script>` : '';
  writeFileSync(ruta, `<html><head>${script}</head><body><main>${cuerpo}</main></body></html>`);
};

describe('RV-11, RV-12 y RQ-13 sobre la salida construida', () => {
  test('enlaces y anclas válidos no producen hallazgos', () => {
    pagina('index.html', '<a href="/manifesto#p01">m</a>');
    pagina('manifesto.html', '<h2 id="p01">P01</h2>');
    expect(validarSalida(dir)).toEqual([]);
  });

  test('RV-11 · destino o ancla inexistentes', () => {
    pagina('roto.html', '<a href="/no-existe">x</a><a href="/manifesto#zz">y</a>');
    expect(validarSalida(dir).filter((h) => h.regla === 'RV-11')).toHaveLength(2);
    rmSync(join(dir, 'roto.html'));
  });

  test('RV-12 · JSON-LD que nombra algo invisible o código fuente sin publicar', () => {
    pagina('ld.html', '<p>P01 El progreso</p>', { '@graph': [{ '@type': 'DefinedTerm', termCode: 'P02', name: 'Otro' }, { '@type': 'SoftwareSourceCode' }] });
    expect(validarSalida(dir).filter((h) => h.regla === 'RV-12').length).toBe(3);
    rmSync(join(dir, 'ld.html'));
  });

  test('RQ-13 · cuenta lo visible sin abrir <details>', () => {
    pagina('vis.html', '<p>uno dos tres</p><details><summary>ver</summary><p>cuatro cinco seis</p></details>');
    const v = informeVisibilidad(dir).find((x) => x.ruta === '/vis');
    expect(v?.total).toBe(7);
    expect(v?.visibles).toBe(4);
  });
});
