import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { Lexer, type Token, type Tokens } from 'marked';
import { sha256, verificarHuella } from './huella';

/** Única fuente del texto canónico en español (RQ-01). Se lee; nunca se copia ni se reescribe. */
export const RUTA_CANON = resolve(process.cwd(), 'docs/method/Manifiesto_Software_Humano_IA_Nucleo_v2.1.md');

export type TipoNodo = 'encabezado' | 'parrafo' | 'lista' | 'tabla' | 'cita';

export interface NodoCanonico {
  /** Ancla del archivo, identificador derivado o sección y posición. Estable mientras la huella no cambie. */
  id: string;
  kind: TipoNodo;
  /** Clave de la sección de nivel 2 a la que pertenece. */
  section: string;
  /** Nivel del encabezado, solo para kind = 'encabezado'. */
  nivel?: number;
  /** Texto plano del encabezado, solo para kind = 'encabezado'. */
  titulo?: string;
  hash: string;
  /** Markdown original del bloque, sin modificar. */
  source: string;
  /** Anclas derivadas que el bloque define en sus filas o elementos (incluye id si es derivado). */
  anclas: string[];
}

export interface Seccion {
  clave: string;
  titulo: string;
  ancla: string;
}

export interface Canon {
  nodos: NodoCanonico[];
  secciones: Seccion[];
}

/** Familias con ancla derivada (contracts/rutas.md): se definen donde el bloque empieza con el identificador. */
const DEFINICION = /^(?:\d+\\?\.\s*)?(?:\*\*)?`(D0[1-6]|F0[1-8]|A0[1-8]|STOP0[1-7]|CR0[1-8]|O0[1-9]|V(?:0[1-9]|1[0-2]))`/;
const ANCLA_HTML = /^<a id="([a-z0-9-]+)"><\/a>\s*$/;

export function anclaDefinida(texto: string): string | undefined {
  const m = DEFINICION.exec(texto.trim());
  return m?.[1]?.toLowerCase();
}

export function claveSeccion(titulo: string): string {
  return titulo
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/`[^`]*`/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function texto(token: Token): string {
  return 'text' in token && typeof token.text === 'string' ? token.text : token.raw;
}

function anclasDelBloque(token: Token): string[] {
  if (token.type === 'table') {
    const t = token as Tokens.Table;
    return t.rows.map((fila) => anclaDefinida(fila[0]?.text ?? '')).filter((a): a is string => !!a);
  }
  if (token.type === 'list') {
    const l = token as Tokens.List;
    return l.items.map((i) => anclaDefinida(i.text)).filter((a): a is string => !!a);
  }
  if (token.type === 'paragraph') {
    const a = anclaDefinida(token.raw);
    return a ? [a] : [];
  }
  return [];
}

let cache: Canon | undefined;

export function leerCanon(): Canon {
  if (cache) return cache;
  const contenido = readFileSync(RUTA_CANON, 'utf8');
  verificarHuella(contenido);

  const tokens = new Lexer({ gfm: true }).lex(contenido);
  const nodos: NodoCanonico[] = [];
  const secciones: Seccion[] = [];
  let seccion = 'portada';
  let posicion = 0;
  let anclaPendiente: string | undefined;

  for (const token of tokens) {
    if (token.type === 'space' || token.type === 'hr') continue;
    // `marked` puede leer `<a id>` como HTML de bloque o como párrafo con HTML en línea.
    const ancla = ANCLA_HTML.exec(token.raw.trim());
    if (ancla && (token.type === 'html' || token.type === 'paragraph')) {
      anclaPendiente = ancla[1];
      continue;
    }

    const kind: TipoNodo | undefined =
      token.type === 'heading' ? 'encabezado'
      : token.type === 'paragraph' || token.type === 'html' ? 'parrafo'
      : token.type === 'list' ? 'lista'
      : token.type === 'table' ? 'tabla'
      : token.type === 'blockquote' ? 'cita'
      : undefined;
    if (!kind) throw new Error(`Bloque no reconocido en el núcleo: ${token.type}`);

    if (token.type === 'heading' && (token as Tokens.Heading).depth <= 2) {
      const h = token as Tokens.Heading;
      if (h.depth === 2) {
        seccion = claveSeccion(h.text);
        posicion = 0;
        secciones.push({ clave: seccion, titulo: h.text, ancla: anclaPendiente ?? `${seccion}-01` });
      }
    }

    posicion += 1;
    const anclas = anclasDelBloque(token);
    const derivada = kind === 'parrafo' ? anclas[0] : undefined;
    const id = anclaPendiente ?? derivada ?? `${seccion}-${String(posicion).padStart(2, '0')}`;
    anclaPendiente = undefined;

    const source = token.raw.replace(/\s+$/, '');
    const nodo: NodoCanonico = { id, kind, section: seccion, hash: sha256(source), source, anclas };
    if (token.type === 'heading') {
      nodo.nivel = (token as Tokens.Heading).depth;
      nodo.titulo = texto(token);
    }
    nodos.push(nodo);
  }

  cache = { nodos, secciones };
  return cache;
}
