/**
 * T181 · Nivel de relevancia de cada texto traducible (RQ-19). Regla determinista: reparte la
 * atención de la verificación de traducciones, no el alcance. Todo pasa por las capas 1 a 3;
 * la capa 4 cubre el nivel 1 y lo que las otras marquen.
 *
 * Nivel 1: lo que obliga, define o se ve primero. Nivel 2: explicaciones. Nivel 3: ejemplos,
 * fuentes, notas, influencias y control de cambios.
 */
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from 'yaml';
import { leerCanon, type NodoCanonico } from '../../src/lib/canon/lector';
import { DIR_CONTENIDO } from '../../src/lib/contenido/cargar';

export type Nivel = 1 | 2 | 3;

export interface Texto {
  /** `canon::<nodo>` o `<archivo>::<ruta/separada/por/barras>`. */
  clave: string;
  origen: 'nucleo' | 'copy';
  nivel: Nivel;
  es: string;
  en?: string | undefined;
  pt?: string | undefined;
}

/** Secciones del núcleo completas en nivel 1 (RQ-19). */
const NUCLEO_NIVEL_1 = ['portada', 'texto-canonico', 'principios-de-diseno', 'sh-fund', 'fundamento-de-producto-y-forma-de-referencia', 'sh-stop', 'verificacion', 'sh-score', 'sh-done', 'sh-pocket', 'guia-de-bolsillo'];
const NUCLEO_NIVEL_3 = ['ejemplo-aplicado', 'influencias-y-notas'];
/** Identificadores normativos que llevan un nodo al nivel 1 en cualquier sección. */
const NORMATIVO = /`(D0[1-6]|F0[1-8]|CR0[1-8]|O0[1-9]|V(0[1-9]|1[0-2])|STOP0[1-7])`/;

const seccion = (id: string) => id.replace(/-\d+$/, '');

export function nivelDelNodo(n: NodoCanonico, enControlDeCambios: boolean): Nivel {
  const s = seccion(n.id);
  if (/^(p\d\d|cr0\d|o0\d)$/.test(n.id)) return 1;
  const principio = /^principio-\d+-(\d+)$/.exec(n.id);
  if (principio) {
    const i = Number(principio[1]);
    if (i === 12) return 3; // señal de incumplimiento: un ejemplo
    return i >= 4 && i <= 7 ? 2 : 1; // qué significa y por qué importa; el resto es nombre, frase, reglas y pruebas
  }
  if (NUCLEO_NIVEL_1.includes(s)) return 1;
  if (NUCLEO_NIVEL_3.includes(s) || enControlDeCambios) return 3;
  return NORMATIVO.test(n.source) ? 1 : 2;
}

export function nivelDelCopy(archivo: string, ruta: string[], id: string | undefined): Nivel {
  if (archivo.startsWith('interfaz/')) return 1;
  if (archivo.startsWith('principios/')) {
    const entrada = ruta[1];
    return entrada === 'ejemplo' || entrada === 'contraejemplo' ? 3 : 2;
  }
  // Superficies: portada, títulos, descripciones y preguntas se ven primero.
  const ultimo = ruta.filter((p) => !/^\d+$/.test(p));
  if (ruta[0] === 'hero' || ['title', 'description', 'question'].includes(ultimo[ultimo.length - 1]!) && ultimo.length <= 2) return 1;
  if (ultimo.includes('sistema') || ultimo.includes('persona')) return 3; // comparaciones de ejemplo
  if (id === 'acerca-influencias') return 3;
  return 2;
}

type Loc = Record<string, { state?: string; text?: string } | undefined>;

/** Todos los textos del núcleo y del copy con texto en español, con su nivel y sus traducciones. */
export function textos(): Texto[] {
  const out: Texto[] = [];
  const canon = leerCanon();
  const tr = (f: string) => (parse(readFileSync(join(DIR_CONTENIDO, 'traducciones-canon', f), 'utf8')) as { entries: Record<string, { text?: string }> }).entries;
  const en = tr('en.yaml');
  const pt = tr('pt-br.yaml');
  let control = false;
  for (const n of canon.nodos) {
    // El control de cambios va desde su encabezado hasta el siguiente encabezado.
    if (n.kind === 'encabezado') control = /Control de cambios/.test(n.source);
    out.push({ clave: `canon::${n.id}`, origen: 'nucleo', nivel: nivelDelNodo(n, control), es: n.source, en: en[n.id]?.text, pt: pt[n.id]?.text });
  }
  const archivos = [
    ...readdirSync(join(DIR_CONTENIDO, 'superficies')).map((f) => `superficies/${f}`),
    ...readdirSync(join(DIR_CONTENIDO, 'principios')).map((f) => `principios/${f}`),
    'interfaz/cadenas.yaml',
  ];
  for (const archivo of archivos) {
    const recorrer = (v: unknown, ruta: string[], id: string | undefined) => {
      if (!v || typeof v !== 'object') return;
      const o = v as Record<string, unknown>;
      const propio = typeof o['id'] === 'string' ? (o['id'] as string) : id;
      if ('es' in o && ('en' in o || 'pt-BR' in o)) {
        const l = o as Loc;
        if (l['es']?.text) out.push({ clave: `${archivo}::${ruta.join('/')}`, origen: 'copy', nivel: nivelDelCopy(archivo, ruta, propio), es: l['es'].text, en: l['en']?.text, pt: l['pt-BR']?.text });
        return;
      }
      for (const [k, h] of Object.entries(o)) recorrer(h, [...ruta, k], propio);
    };
    recorrer(parse(readFileSync(join(DIR_CONTENIDO, archivo), 'utf8')), [], undefined);
  }
  return out;
}

if (import.meta.main) {
  const t = textos();
  const cuenta: Record<string, { n: number; caracteres: number }> = {};
  for (const x of t) {
    const k = `${x.origen} · nivel ${x.nivel}`;
    cuenta[k] ??= { n: 0, caracteres: 0 };
    cuenta[k].n += 1;
    cuenta[k].caracteres += x.es.length;
  }
  console.table(cuenta);
}
