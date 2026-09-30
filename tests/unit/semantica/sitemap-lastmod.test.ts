import { readFileSync } from 'node:fs';
import { expect, test } from 'bun:test';
import { paginasHtml, rutaPublica, jsonld } from '../../../src/lib/validacion/html';

// T245 · el lastmod del sitemap es la misma fecha de actualización que declara cada página.
test('lastmod del sitemap = dateModified de cada página', () => {
  const sitemap = readFileSync('dist/sitemap.xml', 'utf8');
  const lastmod = new Map([...sitemap.matchAll(/<loc>https:\/\/[^/]+([^<]*)<\/loc>\s*<lastmod>([^<]+)<\/lastmod>/g)].map((m) => [m[1] || '/', m[2]]));
  expect(lastmod.size).toBe(66);
  for (const p of paginasHtml('dist')) {
    const r = rutaPublica(p.archivo);
    if (!lastmod.has(r)) continue;
    const nodos = jsonld(p.html).flatMap((b) => ((b as { '@graph'?: Record<string, unknown>[] })['@graph'] ?? [b]) as Record<string, unknown>[]);
    const pagina = nodos.find((n) => n['@type'] === 'WebPage');
    expect(`${r} ${pagina?.['dateModified']}`).toBe(`${r} ${lastmod.get(r)}`);
  }
});
