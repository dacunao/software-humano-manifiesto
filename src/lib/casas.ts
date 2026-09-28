import type { Canon, NodoCanonico } from './canon/lector';

/**
 * Casa de cada pasaje del núcleo (PRD v1.1 §18.3, RQ-14): la única superficie donde se lee
 * completo. Tabla aprobada en docs/design/propuesta-arquitectura-rutas-del-manifiesto.md.
 * `principio`: la página del principio, que la vista arma completa (casa por construcción).
 * `texto-integro`: solo en el documento de consulta.
 */
export type Casa = 'manifiesto' | 'principios' | 'principio' | 'aplicacion' | 'verificacion' | 'speckit' | 'acerca' | 'texto-integro';

const POR_SECCION: Record<string, Casa> = {
  'indice-operativo-para-agentes': 'texto-integro',
  'texto-canonico': 'manifiesto',
  'principios-de-diseno': 'principios',
  'fundamento-de-producto-y-forma-de-referencia': 'principios',
  'doctrina-para-desarrollo-con-ia': 'aplicacion',
  'flujo-de-trabajo': 'aplicacion',
  'contrato-reutilizable': 'aplicacion',
  verificacion: 'verificacion',
  antipatrones: 'verificacion',
  'ejemplo-aplicado': 'aplicacion',
  'guia-de-bolsillo': 'verificacion',
  'influencias-y-notas': 'acerca',
};

/** Secciones mixtas, divididas por la posición del nodo dentro de la sección (1 = su título). */
const POR_POSICION: Record<string, (pos: number) => Casa> = {
  portada: (pos) => (pos === 4 ? 'manifiesto' : 'texto-integro'),
  'proposito-del-documento': (pos) =>
    pos <= 9 ? 'manifiesto' : pos <= 13 ? 'acerca' : pos <= 16 ? 'manifiesto' : pos <= 19 ? 'principios' : 'speckit',
  gobernanza: (pos) => (pos <= 7 ? 'aplicacion' : pos <= 14 ? 'acerca' : 'verificacion'),
};

const cache = new WeakMap<Canon, Map<string, Casa>>();

export function casas(canon: Canon): Map<string, Casa> {
  const previo = cache.get(canon);
  if (previo) return previo;
  const m = new Map<string, Casa>();
  const posicion = new Map<string, number>();
  for (const n of canon.nodos) {
    const pos = (posicion.get(n.section) ?? 0) + 1;
    posicion.set(n.section, pos);
    const casa = /^principio-\d+$/.test(n.section)
      ? 'principio'
      : POR_POSICION[n.section]?.(pos) ?? POR_SECCION[n.section];
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
