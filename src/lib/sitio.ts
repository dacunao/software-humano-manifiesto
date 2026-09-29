import { execFileSync } from 'node:child_process';
import { leerCanon, type NodoCanonico } from './canon/lector';
import { cargarContenido } from './contenido/cargar';
import { casas, nodosDelBloque } from './casas';
import { ruta } from './i18n/rutas';
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

/** Dónde se muestra cada nodo completo: superficie y sección (para la dirección de su casa). */
const mostrados = (() => {
  const m = new Map<string, { superficie: IdSuperficie; seccion: string }>();
  for (const s of contenido.superficies)
    for (const sec of s.sections)
      for (const b of [...sec.blocks, ...sec.depth])
        if (b.kind === 'canon' && !b.breve)
          for (const n of nodosDelBloque(canon, b)) for (const id of [n.id, ...n.anclas]) m.set(id, { superficie: s.id, seccion: sec.id });
  return m;
})();

/** Nodos que la página de un principio muestra con su ancla (frase y partes canónicas). */
function nodosDePrincipio(pid: string): Set<string> {
  const p = partesCanonicas(pid);
  return new Set([canonicoDePrincipio(pid).frase, ...Object.values(p)].flatMap((n) => [n.id, ...n.anclas]));
}

/**
 * Dirección de la casa de un pasaje (PRD v1.2 §18.3): la división donde se lee completo. Si el nodo
 * exacto no se muestra (un encabezado omitido), la sección de la casa que contiene su sección
 * canónica. Los pasajes con casa `descarga` (Influencias y notas) llevan al archivo del núcleo.
 */
export function rutaCasa(id: string, locale: Locale): string {
  const n = nodo(id);
  const casa = casas(canon).get(id);
  if (casa === 'principio') {
    const pid = canon.nodos.find((x) => x.section === n.section && /^p(0[1-9]|10)$/.test(x.id))?.id;
    if (!pid) return rutaDescarga(locale);
    const base = ruta({ tipo: 'principio', principio: pid }, locale);
    return nodosDePrincipio(pid).has(id) ? `${base}#${id}` : base;
  }
  if (!casa || casa === 'descarga') return rutaDescarga(locale);
  const exacto = mostrados.get(id);
  if (exacto?.superficie === casa) return `${ruta({ tipo: casa }, locale)}#${id}`;
  const hermano = canon.nodos.find((x) => x.section === n.section && mostrados.get(x.id)?.superficie === casa);
  const sec = hermano ? mostrados.get(hermano.id)?.seccion : undefined;
  return sec ? `${ruta({ tipo: casa }, locale)}#${sec}` : ruta({ tipo: casa }, locale);
}

/** Archivo del núcleo completo en el idioma de la página (FR-003 v1.2). */
export function rutaDescarga(locale: Locale): string {
  return `/descargas/nucleo-v2.1-${locale === 'pt-BR' ? 'pt-br' : locale}.md`;
}
