import type { Canon, NodoCanonico } from './canon/lector';

/**
 * Casa de cada pasaje del núcleo (PRD v1.2 §18.1–§18.3, RQ-15): la única página donde se lee
 * completo. Cada sección del núcleo va entera a una división, en su orden; ninguna se parte.
 * `principio`: la página del principio, que la vista arma completa (casa por construcción).
 * `descarga`: no se muestra completo en el sitio; solo en el archivo del núcleo (Influencias y notas).
 */
export const DIVISIONES = ['mapa', 'manifiesto', 'principios', 'fundamento', 'construir', 'verificar', 'ejemplo', 'gobernanza', 'bolsillo'] as const;
export type IdDivision = (typeof DIVISIONES)[number];
export type Casa = IdDivision | 'principio' | 'descarga';

const POR_SECCION: Record<string, Casa> = {
  portada: 'mapa',
  'indice-operativo-para-agentes': 'mapa',
  'proposito-del-documento': 'manifiesto',
  'texto-canonico': 'manifiesto',
  'principios-de-diseno': 'principios',
  'fundamento-de-producto-y-forma-de-referencia': 'fundamento',
  'doctrina-para-desarrollo-con-ia': 'construir',
  'flujo-de-trabajo': 'construir',
  'contrato-reutilizable': 'construir',
  verificacion: 'verificar',
  antipatrones: 'verificar',
  'ejemplo-aplicado': 'ejemplo',
  gobernanza: 'gobernanza',
  'guia-de-bolsillo': 'bolsillo',
  'influencias-y-notas': 'descarga',
};

/** La Declaración final cierra la Guía de bolsillo (decisión de la autoridad, 2026-09-28). */
export const DECLARACION_FINAL = ['influencias-y-notas-12', 'influencias-y-notas-13'] as const;

const cache = new WeakMap<Canon, Map<string, Casa>>();

export function casas(canon: Canon): Map<string, Casa> {
  const previo = cache.get(canon);
  if (previo) return previo;
  const m = new Map<string, Casa>();
  for (const n of canon.nodos) {
    const casa: Casa | undefined = /^principio-\d+$/.test(n.section)
      ? 'principio'
      : (DECLARACION_FINAL as readonly string[]).includes(n.id) ? 'bolsillo' : POR_SECCION[n.section];
    if (!casa) throw new Error(`Sección del núcleo sin casa asignada: ${n.section}`);
    m.set(n.id, casa);
    for (const a of n.anclas) m.set(a, casa);
  }
  cache.set(canon, m);
  return m;
}

/** Nodos de un bloque canon, en orden canónico (lista explícita o rango desde/hasta). */
export function nodosDelBloque(canon: Canon, b: { nodos?: string[] | undefined; desde?: string | undefined; hasta?: string | undefined }): NodoCanonico[] {
  const porId = (id: string) => canon.nodos.findIndex((n) => n.id === id || n.anclas.includes(id));
  if (b.nodos) return b.nodos.map((id) => canon.nodos[porId(id)]).filter((n): n is NodoCanonico => !!n);
  const i = porId(b.desde ?? '');
  const j = porId(b.hasta ?? '');
  return i < 0 || j < i ? [] : canon.nodos.slice(i, j + 1);
}

export const palabras = (t: string) => t.split(/\s+/).filter(Boolean).length;
