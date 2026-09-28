import { describe, expect, test } from 'bun:test';
import { existsSync } from 'node:fs';
import { paginasHtml } from '../../../src/lib/validacion/html';

// PRD §24.3 · la CSP de public/_headers solo admite scripts propios y el de analítica decidido.
describe('coherencia con la política de seguridad de contenido', () => {
  test.if(existsSync('dist'))('ninguna página tiene scripts en línea ejecutables', () => {
    const conInline = paginasHtml('dist').filter((p) =>
      [...p.html.matchAll(/<script(?![^>]*\bsrc=)(?![^>]*application\/ld\+json)[^>]*>/g)].length > 0,
    );
    expect(conInline.map((p) => p.archivo)).toEqual([]);
  });

  test.if(existsSync('dist'))('los únicos scripts externos son propios o el de analítica', () => {
    const externos = paginasHtml('dist').flatMap((p) => [...p.html.matchAll(/<script[^>]*\bsrc="([^"]+)"/g)].map((m) => m[1]!));
    // /tema.js: script propio y síncrono que aplica el tema antes de pintar (RQ-17, PRD v1.4 §21.7).
    for (const src of externos) expect(src.startsWith('/_astro/') || src === '/tema.js' || src.startsWith('/pagefind/') || src.startsWith('https://static.cloudflareinsights.com/'), src).toBe(true);
  });
});
