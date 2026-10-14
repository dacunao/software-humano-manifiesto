import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { expect, test } from 'bun:test';
import { contenido } from '../../../src/lib/sitio';

// T288 · La clave de IndexNow se publica en /<clave>.txt con la clave como único contenido (RQ-21).
test('el archivo de la clave de IndexNow existe y coincide con sitio.yaml', () => {
  const clave = contenido.sitio.indexnow.key;
  const ruta = `public/${clave}.txt`;
  expect(existsSync(ruta)).toBe(true);
  expect(readFileSync(ruta, 'utf8')).toBe(clave);
});

test('no hay archivos de clave sobrantes en public/', () => {
  const claves = readdirSync('public').filter((f) => /^[a-f0-9]{32}\.txt$/.test(f));
  expect(claves).toEqual([`${contenido.sitio.indexnow.key}.txt`]);
});
