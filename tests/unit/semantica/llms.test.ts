import { existsSync, readFileSync } from 'node:fs';
import { expect, test } from 'bun:test';

// T248 · /llms.txt: cada enlace del sitio existe en la construcción y los tres idiomas están completos.
test('llms.txt enlaza solo páginas que existen, en los tres idiomas', () => {
  const txt = readFileSync('dist/llms.txt', 'utf8');
  for (const s of ['## English', '## Español', '## Português (Brasil)']) expect(txt).toContain(s);
  const propios = [...txt.matchAll(/\]\(https:\/\/manifiesto\.softwarehumano\.com([^)]*)\)/g)].map((m) => m[1] || '/');
  expect(propios.length).toBe(69); // 22 páginas y la descarga, por idioma
  for (const r of propios) {
    const archivo = r === '/' ? 'dist/index.html' : r.endsWith('.md') ? `dist${r}` : `dist${r}.html`;
    expect(`${r} ${existsSync(archivo)}`).toBe(`${r} true`);
  }
});
