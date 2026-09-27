import { readdirSync, readFileSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { parse } from 'yaml';
import type { z } from 'astro/zod';
import {
  Cadenas, EstadoAdaptacion, Principio, Revisiones, Sitio, Superficie, TraduccionesCanon,
} from './esquemas';

export const DIR_CONTENIDO = resolve(process.cwd(), 'src/content');

export interface Contenido {
  sitio: Sitio;
  estado: EstadoAdaptacion;
  superficies: Superficie[];
  principios: Principio[];
  traducciones: TraduccionesCanon[];
  cadenas: Cadenas;
  revisiones: Revisiones;
  /** Archivo de origen de cada entidad, para mensajes de error. */
  origen: Map<object, string>;
}

export class ErrorEsquema extends Error {
  constructor(archivo: string, detalle: string) {
    super(`esquema · ${archivo} · ${detalle}`);
    this.name = 'ErrorEsquema';
  }
}

function leer<T extends z.ZodType>(esquema: T, ruta: string, base: string): z.infer<T> {
  const datos: unknown = parse(readFileSync(ruta, 'utf8'));
  const r = esquema.safeParse(datos);
  if (!r.success) {
    const detalle = r.error.issues.map((i) => `${i.path.join('.') || '(raíz)'}: ${i.message}`).join('; ');
    throw new ErrorEsquema(relative(base, ruta), detalle);
  }
  return r.data;
}

const yamls = (dir: string) =>
  readdirSync(dir).filter((f) => f.endsWith('.yaml')).sort().map((f) => join(dir, f));

export function cargarContenido(dir = DIR_CONTENIDO): Contenido {
  const base = resolve(dir, '../..');
  const origen = new Map<object, string>();
  const con = <T extends object>(valor: T, ruta: string) => (origen.set(valor, relative(base, ruta)), valor);

  const superficies = yamls(join(dir, 'superficies')).map((r) => con(leer(Superficie, r, base), r));
  const principios = yamls(join(dir, 'principios')).map((r) => con(leer(Principio, r, base), r));
  const traducciones = yamls(join(dir, 'traducciones-canon')).map((r) => con(leer(TraduccionesCanon, r, base), r));
  const cadenas: Cadenas = {};
  for (const r of yamls(join(dir, 'interfaz'))) Object.assign(cadenas, leer(Cadenas, r, base));

  return {
    sitio: leer(Sitio, join(dir, 'sitio.yaml'), base),
    estado: leer(EstadoAdaptacion, join(dir, 'estado-adaptacion.yaml'), base),
    superficies,
    principios,
    traducciones,
    cadenas,
    revisiones: leer(Revisiones, join(dir, 'revisiones.yaml'), base),
    origen,
  };
}
