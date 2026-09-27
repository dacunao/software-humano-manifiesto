import { describe, expect, test } from 'bun:test';
import { alternas, paginasDeContenido, resolverRuta, ruta, rutaEquivalente, todasLasRutas } from '../../../src/lib/i18n/rutas';

describe('contrato de rutas', () => {
  test('tabla de contracts/rutas.md', () => {
    const casos: [Parameters<typeof ruta>[0], string, string, string][] = [
      [{ tipo: 'inicio' }, '/', '/es', '/pt-br'],
      [{ tipo: 'manifiesto' }, '/manifesto', '/es/manifiesto', '/pt-br/manifesto'],
      [{ tipo: 'principios' }, '/principles', '/es/principios', '/pt-br/principios'],
      [{ tipo: 'principio', principio: 'p03' }, '/principles/p03', '/es/principios/p03', '/pt-br/principios/p03'],
      [{ tipo: 'aplicacion' }, '/practice', '/es/aplicacion', '/pt-br/aplicacao'],
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

  test('48 páginas de contenido, todas distintas', () => {
    const rutas = todasLasRutas().map((r) => r.ruta);
    expect(paginasDeContenido()).toHaveLength(16);
    expect(rutas).toHaveLength(48);
    expect(new Set(rutas).size).toBe(48);
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
