import { paginasHtml, rutaPublica, textoVisible } from './html';

/**
 * RQ-13 · Proporción de palabras del contenido principal visibles sin abrir ningún <details>.
 * Es evidencia para el juicio de la autoridad sobre AC-05, no un umbral.
 */
export interface Visibilidad {
  ruta: string;
  total: number;
  visibles: number;
  proporcion: number;
}

const palabras = (t: string) => (t ? t.split(' ').filter(Boolean).length : 0);

export function informeVisibilidad(dir: string): Visibilidad[] {
  return paginasHtml(dir)
    .filter((p) => !p.archivo.endsWith('404.html'))
    .map((p) => {
      const main = /<main[\s\S]*?<\/main>/.exec(p.html)?.[0] ?? '';
      const oculto = main.replace(/<details[\s\S]*?<\/details>/g, (d) => d.replace(/<summary[\s\S]*?<\/summary>/, ''));
      const total = palabras(textoVisible(`<body>${main}`));
      const soloDetalles = palabras(textoVisible(`<body>${[...oculto.matchAll(/<details[\s\S]*?<\/details>/g)].map((m) => m[0]).join(' ')}`));
      const visibles = total - soloDetalles;
      return { ruta: rutaPublica(p.archivo), total, visibles, proporcion: total ? visibles / total : 1 };
    });
}
