import { execFileSync } from 'node:child_process';
import { leerCanon, type NodoCanonico } from './canon/lector';
import { cargarContenido } from './contenido/cargar';
import type { Localizado, Locale, Principio, Superficie, IdSuperficie } from './contenido/esquemas';

/** Acceso de solo lectura al contenido validado y al núcleo, para las vistas. */
export const contenido = cargarContenido();
export const canon = leerCanon();

export interface Texto {
  texto: string;
  /** Idioma real del texto mostrado (puede ser `es` si falta la traducción). */
  lang: Locale;
  /** La entrada del idioma pedido está pendiente y se muestra el original. */
  sustituido: boolean;
  aprobado: boolean;
}

export function texto(l: Localizado | undefined, locale: Locale): Texto {
  const propio = l?.[locale];
  if (propio?.text) return { texto: propio.text, lang: locale, sustituido: false, aprobado: propio.state === 'aprobado' };
  const original = l?.es;
  return { texto: original?.text ?? '', lang: 'es', sustituido: locale !== 'es', aprobado: false };
}

export function t(clave: string, locale: Locale, vars: Record<string, string> = {}): string {
  const base = texto(contenido.cadenas[clave], locale).texto;
  if (!base) throw new Error(`Cadena de interfaz inexistente: ${clave}`);
  return base.replace(/\{(\w+)\}/g, (_, k: string) => vars[k] ?? `{${k}}`);
}

export function superficie(id: IdSuperficie): Superficie {
  const s = contenido.superficies.find((x) => x.id === id);
  if (!s) throw new Error(`Superficie inexistente: ${id}`);
  return s;
}

export function principio(pid: string): Principio {
  const p = contenido.principios.find((x) => x.id.toLowerCase() === pid);
  if (!p) throw new Error(`Principio inexistente: ${pid}`);
  return p;
}

export function nodo(id: string): NodoCanonico {
  const n = canon.nodos.find((x) => x.id === id || x.anclas.includes(id));
  if (!n) throw new Error(`Nodo canónico inexistente: ${id}`);
  return n;
}

/** Markdown del nodo en el idioma pedido; si la traducción está pendiente, el original. */
export function markdownDe(n: NodoCanonico, locale: Locale): { markdown: string; lang: Locale; sustituido: boolean } {
  if (locale === 'es') return { markdown: n.source, lang: 'es', sustituido: false };
  const tr = contenido.traducciones.find((x) => x.locale === locale)?.entries[n.id];
  if (tr?.text) return { markdown: tr.text, lang: locale, sustituido: false };
  return { markdown: n.source, lang: 'es', sustituido: true };
}

/** Nombre y frase canónicos de un principio, leídos del núcleo (RV-04, AC-03). */
export function canonicoDePrincipio(pid: string): { nombre: NodoCanonico; frase: NodoCanonico } {
  const i = canon.nodos.findIndex((n) => n.id === pid);
  const nombre = canon.nodos.slice(i + 1).find((n) => n.kind === 'encabezado' && n.nivel === 3);
  const frase = nombre ? canon.nodos[canon.nodos.indexOf(nombre) + 1] : undefined;
  if (i < 0 || !nombre || !frase || frase.kind !== 'parrafo') throw new Error(`Principio sin nombre o frase canónicos: ${pid}`);
  return { nombre, frase };
}

/** Pasajes canónicos de un principio, localizados por su encabezado en el núcleo. */
export function partesCanonicas(pid: string): Record<'significa' | 'importa' | 'reglas' | 'pruebas' | 'senal', NodoCanonico> {
  const inicio = canon.nodos.findIndex((n) => n.id === pid);
  const seccion = canon.nodos[inicio]?.section;
  const nodos = canon.nodos.filter((n) => n.section === seccion);
  const tras = (titulo: string) => {
    const i = nodos.findIndex((n) => n.kind === 'encabezado' && n.titulo === titulo);
    const n = nodos[i + 1];
    if (i < 0 || !n) throw new Error(`${pid}: falta «${titulo}» en el núcleo`);
    return n;
  };
  const senal = nodos.find((n) => n.source.startsWith('**Señal de incumplimiento.**'));
  if (!senal) throw new Error(`${pid}: falta la señal de incumplimiento en el núcleo`);
  return { significa: tras('Qué significa'), importa: tras('Por qué importa'), reglas: tras('Reglas de diseño'), pruebas: tras('Pruebas de decisión'), senal };
}

/** Todos los textos localizados del contenido, para saber si queda algo sin aprobar. */
function todosLosLocalizados(): Localizado[] {
  const r: Localizado[] = [...Object.values(contenido.cadenas), contenido.estado.limitations];
  for (const s of contenido.superficies) {
    r.push(s.title, s.description);
    for (const sec of s.sections) {
      r.push(sec.title);
      if (sec.question) r.push(sec.question);
      for (const b of [...sec.blocks, ...sec.depth]) {
        if (b.kind === 'entrada') r.push(b.entrada.text);
        if (b.kind === 'comparacion') r.push(b.sistema.text, b.persona.text);
      }
    }
  }
  for (const p of contenido.principios) for (const e of Object.values(p.entries)) r.push(e.text);
  return r;
}

/** Hay contenido de ese idioma sin aprobar: el sitio lo declara (P07). */
export function hayBorrador(locale: Locale): boolean {
  if (todosLosLocalizados().some((l) => l[locale]?.state !== 'aprobado')) return true;
  if (locale === 'es') return false;
  const tr = contenido.traducciones.find((x) => x.locale === locale);
  return !tr || Object.values(tr.entries).some((e) => e.state !== 'aprobada');
}

const cacheFechas = new Map<string, string>();
/** FR-012 · fecha del último cambio de los archivos que forman la página, según git (U1). */
export function fechaActualizacion(archivos: string[]): string {
  const clave = archivos.join('|');
  const previa = cacheFechas.get(clave);
  if (previa) return previa;
  let fecha = '';
  try {
    fecha = execFileSync('git', ['log', '-1', '--format=%cs', '--', ...archivos], { encoding: 'utf8' }).trim();
  } catch {
    fecha = '';
  }
  if (!fecha) fecha = new Date().toISOString().slice(0, 10);
  cacheFechas.set(clave, fecha);
  return fecha;
}

export const URL_SITIO = `https://${contenido.sitio.domain}`;
