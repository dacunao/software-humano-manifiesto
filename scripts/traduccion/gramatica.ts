/**
 * T183 · Capa 2: ortografía y gramática con LanguageTool local (RQ-19).
 * LanguageTool y su Java viven aislados en ~/.local/share/languagetool-software-humano (decisión de
 * Damián Acuña, 2026-09-29): no tocan Homebrew, el PATH ni otros proyectos. El servidor se abre solo
 * mientras dura la revisión. Uso: bun run scripts/traduccion/gramatica.ts
 */
import { readdirSync, writeFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { textos, type Texto } from './relevancia';

const DIR = join(homedir(), '.local/share/languagetool-software-humano');
const PUERTO = 8765;
const IDIOMA = { en: 'en-GB', pt: 'pt-BR' } as const; // británico, como el núcleo aprobado

/** Nombres propios e identificadores que no son errores de ortografía. */
const PROPIOS = ['Manifiesto', 'SpecKit', 'Pagefind', 'Craft', 'Damián', 'Acuña', 'Orosz', 'Balint', 'Klement', 'Intercom', 'GitHub', 'Markdown', 'YAML', 'MQM', 'PRD', 'UX', 'SDD', 'preset', 'presets', 'workflow', 'hreflang', 'Humano'];

export interface HallazgoGramatica {
  clave: string;
  nivel: Texto['nivel'];
  idioma: 'en' | 'pt';
  regla: string;
  categoria: string;
  mensaje: string;
  fragmento: string;
  sugerencias: string[];
}

/** Separa el Markdown en texto y marcado, para que LanguageTool solo lea la prosa. */
export function anotar(md: string): { text?: string; markup?: string; interpretAs?: string }[] {
  const partes: { text?: string; markup?: string; interpretAs?: string }[] = [];
  const marcado = /(`[^`]*`|\]\([^)]*\)|\*\*|\*|^\s*#{1,6}\s|^\s*[-*]\s|^\s*\d+\\?\.\s|^\|[-:| ]+\|$|\s*\|\s*|\[|<br>|<\/?u>|\{[a-z]+\}| {2,})/gm;
  let i = 0;
  for (const m of md.matchAll(marcado)) {
    if (m.index! > i) partes.push({ text: md.slice(i, m.index) });
    const t = m[0];
    // Un código o un marcador se lee como una palabra neutra; el resto, como un espacio o un punto.
    // Cada celda de tabla se lee como un párrafo aparte; el relleno de espacios de las tablas no cuenta.
    // Negritas, cursivas, corchetes y etiquetas desaparecen sin dejar espacio.
    const invisible = /^(\*\*|\*|\[|\]\(.*\)|<\/?u>)$/.test(t);
    partes.push({ markup: t, interpretAs: t.startsWith('`') ? 'X' : t.startsWith('{') ? '1' : t.includes('|') ? '\n\n' : invisible ? '' : ' ' });
    i = m.index! + t.length;
  }
  if (i < md.length) partes.push({ text: md.slice(i) });
  return partes;
}

async function revisar(texto: string, idioma: 'en' | 'pt') {
  const cuerpo = new URLSearchParams({ language: IDIOMA[idioma], data: JSON.stringify({ annotation: anotar(texto) }), level: 'default', disabledRules: 'OXFORD_SPELLING_Z_NOT_S' });
  const r = await fetch(`http://localhost:${PUERTO}/v2/check`, { method: 'POST', body: cuerpo });
  if (!r.ok) throw new Error(`LanguageTool respondió ${r.status}`);
  return (await r.json()) as { matches: { message: string; offset: number; length: number; replacements: { value: string }[]; rule: { id: string; category: { id: string } }; context: { text: string; offset: number; length: number } }[] };
}

async function esperarServidor() {
  for (let i = 0; i < 60; i++) {
    try {
      if ((await fetch(`http://localhost:${PUERTO}/v2/languages`)).ok) return;
    } catch { /* todavía arrancando */ }
    await Bun.sleep(1000);
  }
  throw new Error('LanguageTool no arrancó');
}

if (import.meta.main) {
  const java = join(DIR, readdirSync(DIR).find((d) => d.startsWith('jdk-17'))!, 'Contents/Home/bin/java');
  const lt = join(DIR, readdirSync(DIR).find((d) => d.startsWith('LanguageTool-'))!);
  const servidor = Bun.spawn([java, '-cp', join(lt, 'languagetool-server.jar'), 'org.languagetool.server.HTTPServer', '--port', String(PUERTO)], { stdout: 'ignore', stderr: 'ignore' });
  try {
    await esperarServidor();
    const out: HallazgoGramatica[] = [];
    for (const x of textos()) {
      for (const idioma of ['en', 'pt'] as const) {
        const t = x[idioma];
        if (!t) continue;
        for (const m of (await revisar(t, idioma)).matches) {
          const fragmento = m.context.text.slice(m.context.offset, m.context.offset + m.context.length);
          if (PROPIOS.some((p) => fragmento.includes(p)) && m.rule.category.id === 'TYPOS') continue;
          out.push({ clave: x.clave, nivel: x.nivel, idioma, regla: m.rule.id, categoria: m.rule.category.id, mensaje: m.message, fragmento: m.context.text, sugerencias: m.replacements.slice(0, 3).map((r) => r.value) });
        }
      }
    }
    const destino = 'specs/001-sitio-manifiesto/evidencia/revision-linguistica/capas/capa-2-gramatica.json';
    writeFileSync(destino, JSON.stringify(out, null, 1) + '\n');
    const resumen: Record<string, number> = {};
    for (const h of out) resumen[`${h.idioma} · ${h.categoria} · ${h.regla}`] = (resumen[`${h.idioma} · ${h.categoria} · ${h.regla}`] ?? 0) + 1;
    console.table(Object.fromEntries(Object.entries(resumen).sort((a, b) => b[1] - a[1])));
    console.log(`${out.length} hallazgos en ${destino}`);
  } finally {
    servidor.kill();
  }
}
