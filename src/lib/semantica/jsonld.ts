import type { Sitio } from '../contenido/esquemas';

/** JSON-LD generado desde el mismo contenido que la página (RQ-08, contracts/datos-estructurados.md). */
export type NodoLD = Record<string, unknown>;

/**
 * Estándar común a los sitios de Software Humano (decisión de Damián Acuña, 2026-10-01): el autor y el
 * editor llevan el mismo `@id` en todas las páginas, idiomas y sitios, para que se lean como una sola
 * entidad, y el perfil externo del autor va en `sameAs`.
 */
const ID_AUTOR = 'https://softwarehumano.com/#autor';
const ID_EDITOR = 'https://softwarehumano.com/#organizacion';

export function persona(sitio: Sitio): NodoLD {
  const p: NodoLD = { '@type': 'Person', '@id': ID_AUTOR, name: sitio.author.name };
  if (sitio.author.url) p['sameAs'] = [sitio.author.url];
  return p;
}

/** Editor del sitio (PRD v1.3 §25.2): la organización Software Humano, con su símbolo como logotipo (T161). */
export function editor(sitio: Sitio): NodoLD {
  const o: NodoLD = { '@type': 'Organization', '@id': ID_EDITOR, name: sitio.publisher.name, url: sitio.publisher.url, logo: `https://${sitio.domain}/apple-touch-icon.png` };
  // Estándar común B8: cada sitio declara su propio contacto, con su propósito; nunca un correo suelto.
  if (sitio.contact.email) o['contactPoint'] = [{ '@type': 'ContactPoint', email: sitio.contact.email, contactType: sitio.contact.purpose ?? sitio.name }];
  return o;
}

export function sitioWeb(sitio: Sitio, url: string, idioma: string): NodoLD {
  return { '@type': 'WebSite', name: sitio.name, url, inLanguage: idioma, author: persona(sitio), publisher: editor(sitio) };
}

/** WebPage con su fecha de actualización (FR-012), autor y editor, que el pie muestra en cada página (T161). */
export function paginaWeb(nombre: string, url: string, idioma: string, descripcion: string, o?: { sitio: Sitio; modificada?: string | undefined }): NodoLD {
  const n: NodoLD = { '@type': 'WebPage', name: nombre, url, inLanguage: idioma, description: descripcion };
  if (o) {
    if (o.modificada) n['dateModified'] = o.modificada;
    n['author'] = persona(o.sitio);
    n['publisher'] = editor(o.sitio);
  }
  return n;
}

export function grafo(nodos: NodoLD[]): string {
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': nodos });
}

/** La adaptación publicada (PRD §25.2): solo con publicación real y el mismo dato que muestra la página SpecKit. */
export function codigoAdaptacion(o: { sitio: Sitio; nombre: string; repositorio: string; version: string; idioma: string }): NodoLD {
  return {
    '@type': 'SoftwareSourceCode',
    name: o.nombre,
    codeRepository: o.repositorio,
    version: o.version,
    license: 'https://opensource.org/license/mit',
    inLanguage: o.idioma,
    author: persona(o.sitio),
    publisher: editor(o.sitio),
  };
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
