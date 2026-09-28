import { describe, expect, test } from 'bun:test';
import { alternas, ordenDeLectura, paginasDeContenido, resolverRuta, ruta, rutaEquivalente, todasLasRutas, vecinas } from '../../../src/lib/i18n/rutas';

describe('contrato de rutas', () => {
  test('tabla de contracts/rutas.md', () => {
    const casos: [Parameters<typeof ruta>[0], string, string, string][] = [
      [{ tipo: 'inicio' }, '/', '/es', '/pt-br'],
      [{ tipo: 'manifiesto' }, '/manifesto', '/es/manifiesto', '/pt-br/manifesto'],
      [{ tipo: 'principios' }, '/principles', '/es/principios', '/pt-br/principios'],
      [{ tipo: 'principio', principio: 'p03' }, '/principles/p03', '/es/principios/p03', '/pt-br/principios/p03'],
      [{ tipo: 'mapa' }, '/manifesto/map', '/es/manifiesto/mapa', '/pt-br/manifesto/mapa'],
      [{ tipo: 'fundamento' }, '/manifesto/product-foundation', '/es/manifiesto/fundamento-de-producto', '/pt-br/manifesto/fundamento-de-produto'],
      [{ tipo: 'construir' }, '/manifesto/building-with-ai', '/es/manifiesto/construir-con-ia', '/pt-br/manifesto/construir-com-ia'],
      [{ tipo: 'verificar' }, '/manifesto/verify', '/es/manifiesto/verificar', '/pt-br/manifesto/verificar'],
      [{ tipo: 'ejemplo' }, '/manifesto/applied-example', '/es/manifiesto/ejemplo-aplicado', '/pt-br/manifesto/exemplo-aplicado'],
      [{ tipo: 'gobernanza' }, '/manifesto/governance', '/es/manifiesto/gobernanza', '/pt-br/manifesto/governanca'],
      [{ tipo: 'bolsillo' }, '/manifesto/pocket-guide', '/es/manifiesto/guia-de-bolsillo', '/pt-br/manifesto/guia-de-bolso'],
      [{ tipo: 'speckit' }, '/speckit', '/es/speckit', '/pt-br/speckit'],
      [{ tipo: 'acerca' }, '/about', '/es/acerca', '/pt-br/sobre'],
      [{ tipo: '404' }, '/404', '/es/404', '/pt-br/404'],
    ];
    for (const [p, en, es, pt] of casos) {
      expect(ruta(p, 'en')).toBe(en);
      expect(ruta(p, 'es')).toBe(es);
      expect(ruta(p, 'pt-BR')).toBe(pt);
    }
  });

  test('66 páginas de contenido, todas distintas (PRD v1.2)', () => {
    const rutas = todasLasRutas().map((r) => r.ruta);
    expect(paginasDeContenido()).toHaveLength(22);
    expect(rutas).toHaveLength(66);
    expect(new Set(rutas).size).toBe(66);
  });

  test('el orden de lectura recorre el núcleo: Mapa → … → P01 … P10 → … → Guía de bolsillo (RQ-15)', () => {
    const orden = ordenDeLectura().map((p) => p.principio ?? p.tipo);
    expect(orden).toEqual(['mapa', 'manifiesto', 'principios', 'p01', 'p02', 'p03', 'p04', 'p05', 'p06', 'p07', 'p08', 'p09', 'p10', 'fundamento', 'construir', 'verificar', 'ejemplo', 'gobernanza', 'bolsillo']);
    expect(vecinas({ tipo: 'mapa' }).anterior).toBeUndefined();
    expect(vecinas({ tipo: 'principio', principio: 'p10' }).siguiente).toEqual({ tipo: 'fundamento' });
    expect(vecinas({ tipo: 'bolsillo' }).siguiente).toBeUndefined();
    expect(vecinas({ tipo: 'speckit' })).toEqual({});
  });

  test('cada ruta resuelve a su página y tiene equivalente en los tres idiomas', () => {
    for (const { pagina, locale, ruta: r } of todasLasRutas()) {
      expect(resolverRuta(r)).toEqual({ pagina, locale });
      for (const destino of ['en', 'es', 'pt-BR'] as const) {
        expect(rutaEquivalente(r, destino)).toBe(ruta(pagina, destino));
      }
    }
    for (const r of ['/404', '/es/404', '/pt-br/404']) expect(resolverRuta(r)?.pagina.tipo).toBe('404');
  });

  test('el cambio de idioma conserva el ancla', () => {
    expect(rutaEquivalente('/es/manifiesto#cr03', 'pt-BR')).toBe('/pt-br/manifesto#cr03');
  });

  test('hreflang recíprocos con x-default hacia inglés', () => {
    for (const p of paginasDeContenido()) {
      const a = alternas(p);
      expect(a.map((x) => x.hreflang)).toEqual(['en', 'es', 'pt-BR', 'x-default']);
      expect(a.find((x) => x.hreflang === 'x-default')?.ruta).toBe(ruta(p, 'en'));
      for (const x of a.slice(0, 3)) expect(alternas(resolverRuta(x.ruta)!.pagina)).toEqual(a);
    }
  });
});
