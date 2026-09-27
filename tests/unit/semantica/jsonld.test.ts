import { describe, expect, test } from 'bun:test';
import { grafo, paginaWeb, persona, sitioWeb } from '../../../src/lib/semantica/jsonld';
import { contenidoValido } from '../../fixtures/contenido';

describe('JSON-LD base', () => {
  const sitio = contenidoValido().sitio;
  test('Person sin url mientras no esté aprobada', () => {
    expect(persona(sitio)).toEqual({ '@type': 'Person', name: 'Damián Acuña' });
  });
  test('WebSite con autor y WebPage con idioma', () => {
    const g = JSON.parse(grafo([sitioWeb(sitio, 'https://softwarehumano.com/', 'en'), paginaWeb('T', 'u', 'es', 'd')]));
    expect(g['@context']).toBe('https://schema.org');
    expect(g['@graph'][0].author.name).toBe('Damián Acuña');
    expect(g['@graph'][1].inLanguage).toBe('es');
  });
});
