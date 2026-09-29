import { describe, expect, test } from 'bun:test';
import { grafo, obraManifiesto, paginaWeb, persona, sitioWeb } from '../../../src/lib/semantica/jsonld';
import { contenidoValido } from '../../fixtures/contenido';

describe('JSON-LD base', () => {
  const sitio = contenidoValido().sitio;
  test('Person sin url mientras no esté aprobada', () => {
    expect(persona(sitio)).toEqual({ '@type': 'Person', name: 'Damián Acuña' });
  });
  test('WebSite «Manifiesto» con autor persona y editor organización (PRD v1.3 §25.2)', () => {
    const g = JSON.parse(grafo([sitioWeb(sitio, 'https://manifiesto.softwarehumano.com/', 'en'), paginaWeb('T', 'u', 'es', 'd')]));
    expect(g['@context']).toBe('https://schema.org');
    expect(g['@graph'][0].name).toBe('Manifiesto');
    expect(g['@graph'][0].author.name).toBe('Damián Acuña');
    expect(g['@graph'][0].publisher).toEqual({ '@type': 'Organization', name: 'Software Humano', url: 'https://softwarehumano.com', logo: 'https://manifiesto.softwarehumano.com/apple-touch-icon.png' });
    expect(g['@graph'][1].inLanguage).toBe('es');
  });
  test('CreativeWork con el mismo autor y editor', () => {
    const o = obraManifiesto({ sitio, nombre: 'M', url: 'u', idioma: 'es', fecha: '2026-09', original: 'u', traducciones: [] });
    expect((o['author'] as { name: string }).name).toBe('Damián Acuña');
    expect((o['publisher'] as { name: string }).name).toBe('Software Humano');
  });
  test('WebPage con fecha de actualización, autor y editor con logotipo (T161, FR-012)', () => {
    const w = paginaWeb('T', 'u', 'es', 'd', { sitio, modificada: '2026-09-29' });
    expect(w['dateModified']).toBe('2026-09-29');
    expect((w['author'] as { name: string }).name).toBe('Damián Acuña');
    expect(w['publisher']).toEqual({ '@type': 'Organization', name: 'Software Humano', url: 'https://softwarehumano.com', logo: 'https://manifiesto.softwarehumano.com/apple-touch-icon.png' });
    expect(paginaWeb('T', 'u', 'es', 'd')['author']).toBeUndefined();
  });
});
