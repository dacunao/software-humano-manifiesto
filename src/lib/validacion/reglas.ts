import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import type { Canon } from '../canon/lector';
import type { Contenido } from '../contenido/cargar';
import { CLAVES_PRINCIPIO, LOCALES, type Entrada, type Localizado, type TipoEntrada } from '../contenido/esquemas';

export interface Hallazgo {
  regla: string;
  archivo: string;
  entidad: string;
  mensaje: string;
}

export const JOB_STORIES = Array.from({ length: 9 }, (_, i) => `JS-0${i + 1}`);
export const REQUISITOS = Array.from({ length: 21 }, (_, i) => `FR-${String(i + 1).padStart(3, '0')}`);

const TIPO_ESPERADO: Record<(typeof CLAVES_PRINCIPIO)[number], TipoEntrada> = {
  tension: 'explanation',
  significado: 'explanation',
  consecuencia: 'explanation',
  ejemplo: 'example',
  contraejemplo: 'counterexample',
  prueba: 'decision-test',
};
const EXIGEN_ORIGEN: readonly TipoEntrada[] = ['explanation', 'example', 'counterexample', 'inference'];

/** Versión del preset `software-humano` instalado (RQ-09). */
export function versionInstalada(raiz = process.cwd()): string {
  const registro = JSON.parse(readFileSync(resolve(raiz, '.specify/presets/.registry'), 'utf8')) as {
    presets: Record<string, { version: string }>;
  };
  const v = registro.presets['software-humano']?.version;
  if (!v) throw new Error('RV-09 · .specify/presets/.registry · no hay preset software-humano instalado');
  return v;
}

/** RV-02 a RV-10 (data-model.md). Devuelve todos los hallazgos; la integración detiene la construcción. */
export function validarContenido(c: Contenido, canon: Canon, version: string): Hallazgo[] {
  const h: Hallazgo[] = [];
  const archivo = (o: object) => c.origen.get(o) ?? 'src/content';
  const falla = (regla: string, o: object | string, entidad: string, mensaje: string) =>
    h.push({ regla, archivo: typeof o === 'string' ? o : archivo(o), entidad, mensaje });

  const anclas = new Set(canon.nodos.flatMap((n) => [n.id, ...n.anclas]));

  // Recorre todas las entradas y textos localizados con su dueño.
  const entradas: { e: Entrada; dueño: object }[] = [];
  const localizados: { l: Localizado; dueño: object | string; donde: string }[] = [];
  for (const s of c.superficies) {
    localizados.push({ l: s.title, dueño: s, donde: `${s.id}.title` }, { l: s.description, dueño: s, donde: `${s.id}.description` });
    if (s.hero) localizados.push({ l: s.hero.title, dueño: s, donde: `${s.id}.hero.title` }, { l: s.hero.text, dueño: s, donde: `${s.id}.hero.text` });
    for (const sec of s.sections) {
      localizados.push({ l: sec.title, dueño: s, donde: `${s.id}.${sec.id}.title` });
      if (sec.question) localizados.push({ l: sec.question, dueño: s, donde: `${s.id}.${sec.id}.question` });
      for (const b of [...sec.blocks, ...sec.depth]) {
        if (b.kind === 'entrada') entradas.push({ e: b.entrada, dueño: s });
        if (b.kind === 'comparacion') entradas.push({ e: b.sistema, dueño: s }, { e: b.persona, dueño: s });
        if (b.kind === 'canon')
          for (const n of b.nodos) if (!anclas.has(n)) falla('RV-03', s, `${s.id}.${sec.id}`, `nodo canónico inexistente «${n}»`);
      }
    }
  }
  for (const p of c.principios) for (const e of Object.values(p.entries)) entradas.push({ e, dueño: p });
  for (const { e, dueño } of entradas) localizados.push({ l: e.text, dueño, donde: e.id });
  for (const [clave, l] of Object.entries(c.cadenas)) localizados.push({ l, dueño: 'src/content/interfaz', donde: clave });
  localizados.push({ l: c.estado.limitations, dueño: 'src/content/estado-adaptacion.yaml', donde: 'limitations' });

  // RV-02 · identificadores duplicados
  const vistos = new Map<string, number>();
  for (const id of [
    ...entradas.map(({ e }) => e.id),
    ...c.principios.map((p) => p.id),
    ...c.superficies.map((s) => `superficie:${s.id}`),
    ...c.superficies.flatMap((s) => s.sections.map((sec) => `${s.id}:${sec.id}`)),
  ]) vistos.set(id, (vistos.get(id) ?? 0) + 1);
  for (const [id, n] of vistos) if (n > 1) falla('RV-02', 'src/content', id, `identificador repetido ${n} veces`);

  // RV-03 · relaciones
  for (const { e, dueño } of entradas)
    if (e.derivedFrom && !anclas.has(e.derivedFrom)) falla('RV-03', dueño, e.id, `derivedFrom inexistente «${e.derivedFrom}»`);
  for (const p of c.principios) {
    if (!anclas.has(p.canonicalNode)) falla('RV-03', p, p.id, `canonicalNode inexistente «${p.canonicalNode}»`);
    for (const js of p.jobStories) if (!JOB_STORIES.includes(js)) falla('RV-03', p, p.id, `Job Story inexistente «${js}»`);
    for (const fr of p.requirements) if (!REQUISITOS.includes(fr)) falla('RV-03', p, p.id, `requisito inexistente «${fr}»`);
  }
  for (const s of c.superficies)
    for (const fr of s.fr) if (!REQUISITOS.includes(fr)) falla('RV-03', s, s.id, `requisito inexistente «${fr}»`);

  // RV-04 · diez principios en orden, cada uno con su ancla canónica
  const esperados = Array.from({ length: 10 }, (_, i) => `P${String(i + 1).padStart(2, '0')}`);
  const ids = c.principios.map((p) => p.id);
  if (ids.join() !== esperados.join()) falla('RV-04', 'src/content/principios', 'P01–P10', `se esperaban ${esperados.join(', ')} y hay ${ids.join(', ') || 'ninguno'}`);
  for (const p of c.principios)
    if (p.canonicalNode !== p.id.toLowerCase()) falla('RV-04', p, p.id, `canonicalNode debe ser «${p.id.toLowerCase()}»`);

  // RV-05 · contrato del PRD §17
  for (const p of c.principios)
    for (const clave of CLAVES_PRINCIPIO) {
      const e = p.entries[clave];
      if (!e) falla('RV-05', p, p.id, `falta la entrada «${clave}»`);
      else if (e.type !== TIPO_ESPERADO[clave]) falla('RV-05', p, e.id, `«${clave}» debe ser de tipo ${TIPO_ESPERADO[clave]}`);
    }

  // RV-06 · origen declarado
  for (const { e, dueño } of entradas)
    if (EXIGEN_ORIGEN.includes(e.type) && !e.derivedFrom) falla('RV-06', dueño, e.id, `una entrada «${e.type}» debe declarar derivedFrom`);

  // RV-07 · una entrada de traducción por nodo e idioma
  for (const locale of ['en', 'pt-BR'] as const) {
    const t = c.traducciones.find((x) => x.locale === locale);
    if (!t) {
      falla('RV-07', 'src/content/traducciones-canon', locale, 'falta el archivo de traducción');
      continue;
    }
    for (const n of canon.nodos) if (!t.entries[n.id]) falla('RV-07', t, n.id, `sin entrada de traducción ${locale}`);
    for (const id of Object.keys(t.entries)) if (!canon.nodos.some((n) => n.id === id)) falla('RV-03', t, id, 'traducción de un nodo inexistente');
  }

  // RV-08 · los tres idiomas presentes
  for (const { l, dueño, donde } of localizados)
    for (const locale of LOCALES) if (!l[locale]) falla('RV-08', dueño, donde, `sin entrada en ${locale}`);

  // RV-09 y RV-10 · estado de la adaptación
  if (c.estado.version !== version)
    falla('RV-09', 'src/content/estado-adaptacion.yaml', 'version', `declara ${c.estado.version}, instalado ${version}`);
  if (!c.estado.published && (c.estado.url || c.estado.sha256))
    falla('RV-10', 'src/content/estado-adaptacion.yaml', 'url', 'url o sha256 con el preset sin publicar');

  return h;
}

export function formatear(h: Hallazgo): string {
  return `${h.regla} · ${h.archivo} · ${h.entidad} · ${h.mensaje}`;
}
