import type { Canon } from '../../src/lib/canon/lector';
import type { Contenido } from '../../src/lib/contenido/cargar';
import type { Entrada, Localizado, Principio } from '../../src/lib/contenido/esquemas';

/** Datos de prueba mínimos y válidos; cada prueba rompe una regla a la vez. */
export const loc = (t = 'texto'): Localizado => ({
  es: { state: 'borrador', text: t },
  en: { state: 'borrador', text: t },
  'pt-BR': { state: 'borrador', text: t },
});

const entrada = (id: string, type: Entrada['type'], derivedFrom?: string): Entrada =>
  derivedFrom ? { id, type, derivedFrom, text: loc() } : { id, type, text: loc() };

export function principio(n: number): Principio {
  const id = `P${String(n).padStart(2, '0')}`;
  const a = id.toLowerCase();
  return {
    id,
    canonicalNode: a,
    jobStories: ['JS-03'],
    requirements: ['FR-004'],
    entries: {
      tension: entrada(`${a}-tension`, 'explanation', a),
      significado: entrada(`${a}-significado`, 'explanation', a),
      consecuencia: entrada(`${a}-consecuencia`, 'explanation', a),
      ejemplo: entrada(`${a}-ejemplo`, 'example', a),
      contraejemplo: entrada(`${a}-contraejemplo`, 'counterexample', a),
      prueba: entrada(`${a}-prueba`, 'decision-test', a),
    },
  };
}

export function canonDePrueba(): Canon {
  const nodos = [
    { id: 'portada-01', kind: 'parrafo' as const, section: 'portada', hash: 'a'.repeat(64), source: 'x', anclas: [] },
    ...Array.from({ length: 10 }, (_, i) => ({
      id: `p${String(i + 1).padStart(2, '0')}`, kind: 'encabezado' as const, section: `principio-${i + 1}`,
      hash: 'b'.repeat(64), source: '## P', anclas: [], nivel: 2, titulo: 'P',
    })),
    { id: 'tabla-01', kind: 'tabla' as const, section: 'doctrina-para-desarrollo-con-ia', hash: 'c'.repeat(64), source: '|x|', anclas: ['d01'] },
  ];
  return { nodos, secciones: [] };
}

export function contenidoValido(): Contenido {
  const canon = canonDePrueba();
  const entries = Object.fromEntries(canon.nodos.map((n) => [n.id, { sourceHash: n.hash, state: 'pendiente' as const }]));
  return {
    sitio: {
      name: 'Manifiesto', domain: 'manifiesto.softwarehumano.com',
      author: { type: 'Person', name: 'Damián Acuña', url: null },
      publisher: { type: 'Organization', name: 'Software Humano', url: 'https://softwarehumano.com', enLinea: false },
      licenses: { content: 'CC BY 4.0', code: 'MIT' },
      contact: { email: null, issues: null }, core: { version: '2.1', date: '2026-09' },
      analytics: { cloudflareToken: null },
    },
    estado: { version: '2.0.0', verifiedAt: '2026-09-27', published: false, limitations: loc() },
    superficies: [{
      id: 'inicio', title: loc(), description: loc(), fr: ['FR-001'],
      sections: [{ id: 'acto-1', title: loc(), depth: [], blocks: [
        { kind: 'entrada', entrada: entrada('inicio-1', 'explanation', 'portada-01') },
        { kind: 'canon', nodos: ['d01'], breve: true },
      ] }],
    }],
    principios: Array.from({ length: 10 }, (_, i) => principio(i + 1)),
    traducciones: [{ locale: 'en', entries }, { locale: 'pt-BR', entries: { ...entries } }],
    cadenas: { 'nav.inicio': loc() },
    revisiones: { linguistica: { en: null, 'pt-BR': null }, neutralidad: { es: null } },
    origen: new Map(),
  };
}
