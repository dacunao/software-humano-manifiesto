/** Tipos del índice lateral (T095, PRD v1.2 §18.2). */
export interface ItemIndice {
  href: string;
  texto: string;
  codigo?: string | undefined;
  actual?: boolean;
  lang?: string | undefined;
  /** Entrada dentro de otra: una sección de la página actual o un principio dentro de Principios. */
  sub?: boolean;
}
export interface GrupoIndice {
  titulo: string;
  items: ItemIndice[];
}
