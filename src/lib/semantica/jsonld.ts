import type { Sitio } from '../contenido/esquemas';

/** JSON-LD generado desde el mismo contenido que la página (RQ-08, contracts/datos-estructurados.md). */
export type NodoLD = Record<string, unknown>;

export function persona(sitio: Sitio): NodoLD {
  const p: NodoLD = { '@type': 'Person', name: sitio.author.name };
  if (sitio.author.url) p['url'] = sitio.author.url;
  return p;
}

/** Editor del sitio (PRD v1.3 §25.2): la organización Software Humano. */
export function editor(sitio: Sitio): NodoLD {
  return { '@type': 'Organization', name: sitio.publisher.name, url: sitio.publisher.url };
}

export function sitioWeb(sitio: Sitio, url: string, idioma: string): NodoLD {
  return { '@type': 'WebSite', name: sitio.name, url, inLanguage: idioma, author: persona(sitio), publisher: editor(sitio) };
}

export function paginaWeb(nombre: string, url: string, idioma: string, descripcion: string): NodoLD {
  return { '@type': 'WebPage', name: nombre, url, inLanguage: idioma, description: descripcion };
}

export function grafo(nodos: NodoLD[]): string {
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': nodos });
}

/** CreativeWork del manifiesto con sus relaciones de traducción (contracts/datos-estructurados.md). */
export function obraManifiesto(o: {
  sitio: Sitio; nombre: string; url: string; idioma: string; fecha: string; original: string; traducciones: string[];
}): NodoLD {
  const n: NodoLD = {
    '@type': 'CreativeWork',
    name: o.nombre,
    url: o.url,
    version: o.sitio.core.version,
    inLanguage: o.idioma,
    author: persona(o.sitio),
    publisher: editor(o.sitio),
    datePublished: o.fecha,
    license: 'https://creativecommons.org/licenses/by/4.0/',
  };
  if (o.idioma === 'es') n['workTranslation'] = o.traducciones.map((url) => ({ '@type': 'CreativeWork', url }));
  else n['translationOfWork'] = { '@type': 'CreativeWork', url: o.original };
  return n;
}
