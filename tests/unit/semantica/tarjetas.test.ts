import { describe, expect, test } from 'bun:test';
import { existsSync } from 'node:fs';
import { paginasHtml } from '../../../src/lib/validacion/html';

// T162 · tarjetas sociales completas y en su idioma en las 66 páginas (PRD §25.2, AC-11, AC-15). Requiere `bun run build`.
const OG: Record<string, string> = { en: 'en_US', es: 'es_LA', 'pt-BR': 'pt_BR' };
const meta = (html: string, clave: string) =>
  [...html.matchAll(new RegExp(`<meta (?:property|name)="${clave.replace(/[:.]/g, '\\$&')}" content="([^"]*)"`, 'g'))].map((m) => m[1]!);

describe('tarjetas sociales', () => {
  test.if(existsSync('dist'))('cada página tiene sus metadatos sociales completos y en su idioma', () => {
    const paginas = paginasHtml('dist').filter((p) => !p.archivo.endsWith('404.html'));
    expect(paginas).toHaveLength(66);
    for (const p of paginas) {
      const lang = /<html lang="([^"]+)"/.exec(p.html)![1]!;
      const donde = p.archivo;
      for (const clave of ['og:site_name', 'og:title', 'og:description', 'og:type', 'og:url', 'og:image', 'og:image:alt', 'og:image:width', 'og:image:height', 'og:image:type', 'twitter:card', 'twitter:title', 'twitter:description', 'twitter:image', 'twitter:image:alt'])
        expect(meta(p.html, clave), `${donde} ${clave}`).toHaveLength(1);
      expect(meta(p.html, 'og:site_name')[0]).toBe('Manifiesto');
      expect(meta(p.html, 'og:locale'), donde).toEqual([OG[lang]!]);
      expect(meta(p.html, 'og:locale:alternate').sort(), donde).toEqual(Object.entries(OG).filter(([l]) => l !== lang).map(([, v]) => v).sort());
      expect(meta(p.html, 'twitter:card')[0]).toBe('summary_large_image');
      const imagen = new URL(meta(p.html, 'og:image')[0]!).pathname;
      expect(imagen).toBe(`/social/${lang === 'pt-BR' ? 'pt-br' : lang}.png`);
      expect(existsSync(`dist${imagen}`), imagen).toBe(true);
      const tipo = meta(p.html, 'og:type')[0];
      if (tipo === 'article') expect(meta(p.html, 'article:modified_time'), donde).toHaveLength(1);
    }
  });
});
