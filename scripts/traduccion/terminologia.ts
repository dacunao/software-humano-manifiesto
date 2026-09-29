/**
 * T182 · Capa 1: terminología (RQ-19). Compara cada traducción con el glosario del núcleo aprobado.
 * Es determinista. Uso: bun run scripts/traduccion/terminologia.ts  (escribe el informe de la capa).
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { parse } from 'yaml';
import { textos, type Texto } from './relevancia';

interface Termino { id: string; es: string; en: string; pt: string }
interface Prohibido { id: string; patron: string; motivo: string; salvoSiEs?: string }
interface Glosario { terminos: Termino[]; prohibidos: { en: Prohibido[]; pt: Prohibido[] } }

export interface Hallazgo {
  clave: string;
  nivel: Texto['nivel'];
  idioma: 'en' | 'pt';
  tipo: 'prohibido' | 'falta-termino';
  regla: string;
  detalle: string;
}

export const glosario = parse(readFileSync(new URL('./glosario.yaml', import.meta.url), 'utf8')) as Glosario;
const re = (p: string) => new RegExp(p, 'iu');
/** Quita código, enlaces y URL: los identificadores y direcciones no son terminología. */
const limpio = (t: string) => t.replace(/`[^`]*`/g, ' ').replace(/\]\([^)]*\)/g, ']').replace(/https?:\/\/\S+/g, ' ');

export function revisar(lista: Texto[] = textos()): Hallazgo[] {
  const out: Hallazgo[] = [];
  for (const x of lista) {
    const es = limpio(x.es);
    for (const idioma of ['en', 'pt'] as const) {
      const tr = x[idioma];
      if (!tr) continue;
      const t = limpio(tr);
      for (const p of glosario.prohibidos[idioma]) {
        const m = re(p.patron).exec(t);
        if (m && !(p.salvoSiEs && re(p.salvoSiEs).test(es)))
          out.push({ clave: x.clave, nivel: x.nivel, idioma, tipo: 'prohibido', regla: p.id, detalle: `«${m[0]}»: ${p.motivo}` });
      }
      for (const g of glosario.terminos)
        if (re(g.es).test(es) && !re(g[idioma]).test(t))
          out.push({ clave: x.clave, nivel: x.nivel, idioma, tipo: 'falta-termino', regla: g.id, detalle: `el español usa «${re(g.es).exec(es)![0]}»; se esperaba /${g[idioma]}/` });
    }
  }
  return out;
}

if (import.meta.main) {
  const h = revisar();
  const destino = 'specs/001-sitio-manifiesto/evidencia/revision-linguistica/capas/capa-1-terminologia.json';
  writeFileSync(destino, JSON.stringify(h, null, 1) + '\n');
  const resumen: Record<string, number> = {};
  for (const x of h) resumen[`${x.idioma} · ${x.tipo} · nivel ${x.nivel}`] = (resumen[`${x.idioma} · ${x.tipo} · nivel ${x.nivel}`] ?? 0) + 1;
  console.table(resumen);
  console.log(`${h.length} hallazgos en ${destino}`);
}
