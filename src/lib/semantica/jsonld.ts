import type { Sitio } from '../contenido/esquemas';

/** JSON-LD generado desde el mismo contenido que la página (RQ-08, contracts/datos-estructurados.md). */
export type NodoLD = Record<string, unknown>;

export function persona(sitio: Sitio): NodoLD {
  const p: NodoLD = { '@type': 'Person', name: sitio.author.name };
  if (sitio.author.url) p['url'] = sitio.author.url;
  return p;
}

export function sitioWeb(sitio: Sitio, url: string, idioma: string): NodoLD {
  return { '@type': 'WebSite', name: sitio.name, url, inLanguage: idioma, author: persona(sitio) };
}

export function paginaWeb(nombre: string, url: string, idioma: string, descripcion: string): NodoLD {
  return { '@type': 'WebPage', name: nombre, url, inLanguage: idioma, description: descripcion };
}

export function grafo(nodos: NodoLD[]): string {
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': nodos });
}
