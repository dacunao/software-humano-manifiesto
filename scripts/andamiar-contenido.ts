/**
 * Esqueletos `pendiente` de superficies y principios para que la construcción valide desde la
 * fase 2 (mismo criterio que T017). Idempotente: no toca archivos existentes.
 */
import { existsSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { stringify } from 'yaml';
import { DIR_CONTENIDO } from '../src/lib/contenido/cargar';

const pend = { es: { state: 'pendiente' }, en: { state: 'pendiente' }, 'pt-BR': { state: 'pendiente' } };
const loc = (es: string, en: string, pt: string) => ({
  es: { state: 'borrador', text: es }, en: { state: 'borrador', text: en }, 'pt-BR': { state: 'borrador', text: pt },
});

// PRD §33, leído en sentido inverso: qué Job Stories se apoyan en cada principio.
const JS_POR_PRINCIPIO: Record<string, string[]> = {};
const MATRIZ: Record<string, string[]> = {
  'JS-01': ['P01', 'P02', 'P06'], 'JS-02': ['P01', 'P02'],
  'JS-03': ['P01', 'P02', 'P03', 'P04', 'P05', 'P06', 'P07', 'P08', 'P09', 'P10'],
  'JS-04': ['P02', 'P03', 'P04', 'P05', 'P06', 'P07', 'P08'], 'JS-05': ['P07', 'P08', 'P10'],
  'JS-06': ['P01', 'P03', 'P07', 'P10'], 'JS-07': ['P03', 'P07', 'P10'], 'JS-08': ['P05', 'P07', 'P10'],
  'JS-09': ['P02', 'P04', 'P05', 'P07', 'P10'],
};
for (const [js, ps] of Object.entries(MATRIZ)) for (const p of ps) (JS_POR_PRINCIPIO[p] ??= []).push(js);

const TIPOS: Record<string, string> = {
  tension: 'explanation', significado: 'explanation', consecuencia: 'explanation',
  ejemplo: 'example', contraejemplo: 'counterexample', prueba: 'decision-test',
};

for (let i = 1; i <= 10; i++) {
  const id = `P${String(i).padStart(2, '0')}`;
  const a = id.toLowerCase();
  const ruta = join(DIR_CONTENIDO, 'principios', `${a}.yaml`);
  if (existsSync(ruta)) continue;
  const entries = Object.fromEntries(
    Object.entries(TIPOS).map(([k, type]) => [k, { id: `${a}-${k}`, type, derivedFrom: a, text: pend }]),
  );
  writeFileSync(ruta, `# ${id} · contrato del PRD §17. Nombre y frase canónicos se leen del núcleo (#${a}).\n` +
    stringify({ id, canonicalNode: a, jobStories: JS_POR_PRINCIPIO[id], requirements: ['FR-004', 'FR-005', 'FR-006'], entries }, { lineWidth: 0 }));
}

const SUPERFICIES: [string, string[], [string, string, string], [string, string, string]][] = [
  ['inicio', ['FR-001', 'FR-002'], ['Software Humano', 'Software Humano', 'Software Humano'],
    ['Por qué más capacidad para construir software no garantiza más progreso para las personas, y qué hacer al respecto.',
     'Why more capacity to build software does not guarantee more progress for people, and what to do about it.',
     'Por que mais capacidade de construir software não garante mais progresso para as pessoas, e o que fazer a respeito.']],
  ['manifiesto', ['FR-003', 'FR-012'], ['Manifiesto', 'Manifesto', 'Manifesto'],
    ['El núcleo del Manifiesto de Software Humano, íntegro, con sus identificadores y anclas estables.',
     'The core of the Human Software Manifesto in full, with its identifiers and stable anchors.',
     'O núcleo do Manifesto de Software Humano na íntegra, com seus identificadores e âncoras estáveis.']],
  ['principios', ['FR-004'], ['Principios', 'Principles', 'Princípios'],
    ['Los diez principios del manifiesto, en su orden canónico.',
     'The ten principles of the manifesto, in their canonical order.',
     'Os dez princípios do manifesto, em sua ordem canônica.']],
  ['aplicacion', ['FR-007'], ['Aplicación', 'In practice', 'Aplicação'],
    ['Cómo el manifiesto se vuelve práctica: fundamento, flujo, artefactos, contrato del agente, detenciones y terminado.',
     'How the manifesto becomes practice: product foundation, flow, artifacts, agent contract, stops and definition of done.',
     'Como o manifesto se torna prática: fundamento, fluxo, artefatos, contrato do agente, paradas e definição de pronto.']],
  ['speckit', ['FR-008', 'FR-009', 'FR-010'], ['SpecKit', 'SpecKit', 'SpecKit'],
    ['Una implementación de referencia independiente del manifiesto sobre SpecKit, su estado real y sus límites.',
     'An independent reference implementation of the manifesto on SpecKit, its actual status and its limits.',
     'Uma implementação de referência independente do manifesto sobre o SpecKit, seu status real e seus limites.']],
  ['acerca', ['FR-012'], ['Acerca de', 'About', 'Sobre'],
    ['Origen, autoría, versiones, procedencia y licencias del sitio.',
     'Origin, authorship, versions, provenance and licenses of the site.',
     'Origem, autoria, versões, procedência e licenças do site.']],
];
for (const [id, fr, t, d] of SUPERFICIES) {
  const ruta = join(DIR_CONTENIDO, 'superficies', `${id}.yaml`);
  if (existsSync(ruta)) continue;
  writeFileSync(ruta, `# Superficie «${id}» (PRD §18.1). Títulos y descripciones en borrador.\n` +
    stringify({ id, title: loc(...t), description: loc(...d), fr, sections: [] }, { lineWidth: 0 }));
}
console.log('andamiaje listo');
