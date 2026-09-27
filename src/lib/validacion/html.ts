import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

/** Utilidades mínimas sobre el HTML construido; sin dependencias ni DOM. */
export function paginasHtml(dir: string): { archivo: string; html: string }[] {
  const r: { archivo: string; html: string }[] = [];
  const recorrer = (d: string) => {
    for (const f of readdirSync(d)) {
      const p = join(d, f);
      if (statSync(p).isDirectory()) recorrer(p);
      else if (f.endsWith('.html')) r.push({ archivo: relative(dir, p), html: readFileSync(p, 'utf8') });
    }
  };
  recorrer(dir);
  return r.sort((a, b) => a.archivo.localeCompare(b.archivo));
}

/** Ruta pública de un archivo construido con build.format = 'file'. */
export function rutaPublica(archivo: string): string {
  const r = `/${archivo.replace(/\.html$/, '')}`.replace(/\/index$/, '');
  return r === '' || r === '/index' ? '/' : r;
}

export function ids(html: string): Set<string> {
  return new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]!));
}

export function enlaces(html: string): string[] {
  return [...html.matchAll(/<a\s[^>]*href="([^"]+)"/g)].map((m) => m[1]!.replace(/&amp;/g, '&'));
}

/** Texto visible del cuerpo: sin scripts, estilos ni etiquetas. */
export function textoVisible(html: string): string {
  const cuerpo = html.slice(html.indexOf('<body'));
  return decodificar(cuerpo.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<style[\s\S]*?<\/style>/g, ' ').replace(/<[^>]+>/g, ' '))
    .replace(/\s+/g, ' ')
    .trim();
}

export function decodificar(t: string): string {
  return t
    .replace(/&#x([0-9a-f]+);/gi, (_, h: string) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d: string) => String.fromCodePoint(Number(d)))
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&');
}

export function jsonld(html: string): unknown[] {
  return [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1]!) as unknown);
}
