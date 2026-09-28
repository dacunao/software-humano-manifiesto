import { describe, expect, test } from 'bun:test';
import { existsSync } from 'node:fs';
import { paginasHtml, rutaPublica } from '../../../src/lib/validacion/html';

// FR-019 · hreflang recíprocos y códigos BCP 47 en las 66 páginas construidas (PRD v1.2; dominio de la v1.3). Requiere `bun run build`.
describe('hreflang en la salida', () => {
  test.if(existsSync('dist'))('reciprocidad, BCP 47 y lang coherente', () => {
    const paginas = paginasHtml('dist').filter((p) => !p.archivo.endsWith('404.html'));
    expect(paginas).toHaveLength(66);
    const alternas = new Map<string, string>();
    for (const p of paginas) {
      const links = [...p.html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="https:\/\/manifiesto\.softwarehumano\.com([^"]*)"/g)].map((m) => `${m[1]}=${m[2]}`);
      expect(links.map((l) => l.split('=')[0])).toEqual(['en', 'es', 'pt-BR', 'x-default']);
      const lang = /<html lang="([^"]+)"/.exec(p.html)?.[1];
      expect(links).toContain(`${lang}=${rutaPublica(p.archivo)}`);
      alternas.set(rutaPublica(p.archivo), links.join('|'));
    }
    // Cada página declara el mismo conjunto que sus alternas: reciprocidad.
    for (const [ruta, conjunto] of alternas) {
      for (const par of conjunto.split('|')) expect(alternas.get(par.split('=')[1]!), `${ruta} → ${par}`).toBe(conjunto);
    }
  });
});
