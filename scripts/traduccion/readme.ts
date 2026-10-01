/**
 * Verificación en cuatro capas de textos en Markdown (RQ-19), por archivos y con roles fijos
 * (decisión de Damián Acuña, 2026-10-01): **ChatGPT (OpenAI) traduce, Claude revisa** y DeepL da el
 * contraste independiente. El servicio no llama a ningún modelo; las salidas de modelo son
 * observaciones por confirmar, no veredictos (V12).
 *
 * Se ejecuta desde la raíz de este repositorio (Bun lee las claves de `.env.local`):
 *
 *   1. Traducir: la indicación fija para llevar el español a ChatGPT.
 *      bun run scripts/traduccion/readme.ts --modo=traducir --es=<es.md> --dir=<paquete>
 *   2. Preparar: capas 1 y 2 locales, contraste de DeepL y los paquetes del revisor.
 *      bun run scripts/traduccion/readme.ts --modo=preparar --es=<es.md> --en=<en.md> --pt=<pt.md> \
 *        --dir=<paquete> --tradujo=openai --reviso=anthropic
 *   3. Recibir: valida las respuestas del revisor y escribe el informe.
 *      bun run scripts/traduccion/readme.ts --modo=recibir --dir=<paquete> --salida=<informe.json>
 *
 * Los tres archivos deben tener los mismos bloques, separados por línea en blanco y en el mismo
 * orden. Una barra de idioma en la primera línea («**Español** · [English](…)») se omite.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import type { Texto } from './relevancia';
import { revisar as terminologia } from './terminologia';
import { arrancar, esperarServidor, PROPIOS, revisar as gramatica } from './gramatica';
import { ESQUEMA as ESQUEMA_MQM } from './mqm';
import { ESQUEMA as ESQUEMA_CONTRASTE } from './contraste';
import { IDIOMAS, deepl, indicacion } from './servicios';

type Idioma = 'en' | 'pt';
const IDIOMAS_DESTINO: Idioma[] = ['en', 'pt'];
/** Familias de modelos: el revisor nunca es de la misma familia que el traductor (hallazgo C6). */
const FAMILIAS: Record<string, string> = { openai: 'ChatGPT (OpenAI)', anthropic: 'Claude (Anthropic)', google: 'Gemini (Google)', mistral: 'Mistral' };

const opcion = (n: string) => process.argv.find((a) => a.startsWith(`--${n}=`))?.slice(n.length + 3);
function requerida(n: string): string {
  const v = opcion(n);
  if (!v) throw new Error(`Falta --${n}=…`);
  return v;
}

const BARRA = /^\*\*[^*\n]+\*\*\s*·/;
/** Bloques separados por línea en blanco; un bloque de código cuenta como uno. Sin la barra de idioma. */
function bloques(ruta: string): string[] {
  const out: string[] = [];
  let actual: string[] = [];
  let enCodigo = false;
  for (const l of readFileSync(ruta, 'utf8').split('\n')) {
    if (l.startsWith('```')) enCodigo = !enCodigo;
    if (!enCodigo && l.trim() === '') { if (actual.length) out.push(actual.join('\n')); actual = []; }
    else actual.push(l);
  }
  if (actual.length) out.push(actual.join('\n'));
  return out[0] && BARRA.test(out[0]) ? out.slice(1) : out;
}

function aviso(destinos: string): void {
  console.log(`Aviso: este paso envía el texto a ${destinos}. El servicio no sabe si es público; si no lo es, enviarlo es decisión de la autoridad de producto.`);
}

function paquete(instrucciones: string, esquema: object, datos: unknown[], respuesta: string): string {
  return `${instrucciones}\n\n## Response schema\n\n\`\`\`json\n${JSON.stringify(esquema, null, 1)}\n\`\`\`\n\n## Segments\n\n\`\`\`json\n${JSON.stringify(datos, null, 1)}\n\`\`\`\n\nSave the response as \`${respuesta}\`.\n`;
}

type Item = Record<string, unknown>;
/** Un elemento por segmento, con la misma clave y en el mismo orden; los campos según su esquema. */
function validar(archivo: string, claves: string[], campos: (x: Item, donde: string) => void): Item[] {
  if (!existsSync(archivo)) throw new Error(`Falta la respuesta del revisor: ${archivo}`);
  const datos = JSON.parse(readFileSync(archivo, 'utf8')) as unknown;
  if (!Array.isArray(datos)) throw new Error(`${archivo}: se esperaba una lista`);
  if (datos.length !== claves.length) throw new Error(`${archivo}: ${datos.length} elementos para ${claves.length} segmentos`);
  datos.forEach((x: Item, i) => {
    if (x['clave'] !== claves[i]) throw new Error(`${archivo}: el elemento ${i + 1} es «${String(x['clave'])}» y se esperaba «${claves[i]}»`);
    campos(x, `${archivo} · ${claves[i]}`);
  });
  return datos as Item[];
}
const enumeracion = (esquema: object, ruta: string[]): string[] =>
  ruta.reduce<Record<string, unknown>>((o, k) => o[k] as Record<string, unknown>, esquema as Record<string, unknown>) as unknown as string[];
const TIPOS = enumeracion(ESQUEMA_MQM, ['items', 'properties', 'errores', 'items', 'properties', 'tipo', 'enum']);
const GRAVEDADES = enumeracion(ESQUEMA_MQM, ['items', 'properties', 'errores', 'items', 'properties', 'gravedad', 'enum']);
const CLASES = enumeracion(ESQUEMA_CONTRASTE, ['items', 'properties', 'clase', 'enum']);
function validarMqm(x: Item, donde: string): void {
  if (!Array.isArray(x['errores'])) throw new Error(`${donde}: falta «errores»`);
  for (const e of x['errores'] as Item[]) {
    if (!TIPOS.includes(String(e['tipo'])) || !GRAVEDADES.includes(String(e['gravedad']))) throw new Error(`${donde}: tipo o gravedad fuera del esquema`);
    for (const c of ['fragmento_es', 'fragmento_tr', 'explicacion']) if (typeof e[c] !== 'string') throw new Error(`${donde}: falta «${c}»`);
  }
}
function validarContraste(x: Item, donde: string): void {
  if (!CLASES.includes(String(x['clase']))) throw new Error(`${donde}: clase fuera del esquema`);
  if (typeof x['explicacion'] !== 'string') throw new Error(`${donde}: falta «explicacion»`);
}

async function principal(): Promise<void> {
const modo = requerida('modo');
const dir = requerida('dir');
mkdirSync(dir, { recursive: true });

if (modo === 'traducir') {
  const es = readFileSync(requerida('es'), 'utf8');
  aviso('ChatGPT, cuando Damián lo pegue');
  for (const idioma of IDIOMAS_DESTINO) {
    const archivo = join(dir, `traducir-${idioma}.md`);
    writeFileSync(archivo, `${indicacion('./indicacion-traduccion.md', idioma)}\n\n---\n\n${es}`);
    console.log(`Indicación de traducción a ${IDIOMAS[idioma].nombre}: ${archivo}`);
  }
} else if (modo === 'preparar') {
  const tradujo = requerida('tradujo');
  const reviso = requerida('reviso');
  for (const f of [tradujo, reviso]) if (!FAMILIAS[f]) throw new Error(`Familia desconocida: ${f} (${Object.keys(FAMILIAS).join(', ')})`);
  if (tradujo === reviso) throw new Error(`El revisor no puede ser de la misma familia que el traductor (${FAMILIAS[tradujo]}): la revisión debe ser adversaria (C6)`);

  const es = bloques(requerida('es'));
  const tr = { en: bloques(requerida('en')), pt: bloques(requerida('pt')) };
  if (tr.en.length !== es.length || tr.pt.length !== es.length) throw new Error(`Bloques desalineados: es ${es.length}, en ${tr.en.length}, pt ${tr.pt.length}`);
  const lista: Texto[] = es.map((x, i) => ({ clave: `bloque::${i + 1}`, origen: 'copy', nivel: 1, es: x, en: tr.en[i], pt: tr.pt[i] }));

  // Capas 1 y 2, locales.
  const capa2: unknown[] = [];
  const servidor = arrancar();
  try {
    await esperarServidor();
    for (const x of lista)
      for (const idioma of IDIOMAS_DESTINO)
        for (const m of (await gramatica(x[idioma]!, idioma)).matches) {
          const fragmento = m.context.text.slice(m.context.offset, m.context.offset + m.context.length);
          if (PROPIOS.some((p) => fragmento.includes(p)) && m.rule.category.id === 'TYPOS') continue;
          capa2.push({ clave: x.clave, idioma, regla: m.rule.id, mensaje: m.message, fragmento: m.context.text, sugerencias: m.replacements.slice(0, 3).map((r) => r.value) });
        }
  } finally {
    servidor.kill();
  }

  // Capa 4: contraste de DeepL. Capas 3 y 4: paquetes para el revisor, sin llamar a ningún modelo.
  aviso('DeepL, y al revisor cuando se le entregue el paquete');
  const contraste: Record<Idioma, string[]> = { en: [], pt: [] };
  for (const idioma of IDIOMAS_DESTINO) {
    contraste[idioma] = await deepl(es, IDIOMAS[idioma].deepl);
    const pares = lista.map((x) => ({ clave: x.clave, es: x.es, tr: x[idioma] }));
    const trios = lista.map((x, i) => ({ clave: x.clave, es: x.es, nuestra: x[idioma], contraste: contraste[idioma][i] }));
    writeFileSync(join(dir, `capa3-${idioma}.md`), paquete(indicacion('./indicacion-mqm.md', idioma), ESQUEMA_MQM, pares, `revision-capa3-${idioma}.json`));
    writeFileSync(join(dir, `capa4-${idioma}.md`), paquete(indicacion('./indicacion-contraste.md', idioma), ESQUEMA_CONTRASTE, trios, `revision-capa4-${idioma}.json`));
  }
  writeFileSync(join(dir, 'preparacion.json'), JSON.stringify({ tradujo, reviso, claves: lista.map((x) => x.clave), capa1: terminologia(lista), capa2, contraste }, null, 1) + '\n');
  console.log(`${lista.length} segmentos · capa 1: ${terminologia(lista).length} · capa 2: ${capa2.length}`);
  console.log(`Paquetes para ${FAMILIAS[reviso]} en ${dir}: capa3-en.md, capa3-pt.md, capa4-en.md, capa4-pt.md`);
} else if (modo === 'recibir') {
  const prep = JSON.parse(readFileSync(join(dir, 'preparacion.json'), 'utf8')) as { tradujo: string; reviso: string; claves: string[]; capa1: unknown[]; capa2: unknown[]; contraste: Record<Idioma, string[]> };
  const informe: Record<string, unknown> = { segmentos: prep.claves.length, tradujo: FAMILIAS[prep.tradujo], reviso: FAMILIAS[prep.reviso], capa1: prep.capa1, capa2: prep.capa2 };
  for (const idioma of IDIOMAS_DESTINO) {
    const r3 = validar(join(dir, `revision-capa3-${idioma}.json`), prep.claves, validarMqm);
    const r4 = validar(join(dir, `revision-capa4-${idioma}.json`), prep.claves, validarContraste);
    informe[`capa3-${idioma}`] = { modelo: FAMILIAS[prep.reviso], resultados: r3.filter((x) => (x['errores'] as unknown[]).length) };
    informe[`capa4-${idioma}`] = { modelo: FAMILIAS[prep.reviso], resultados: r4.filter((x) => x['clase'] !== 'equivalente').map((x) => ({ ...x, contraste: prep.contraste[idioma][prep.claves.indexOf(String(x['clave']))] })) };
  }
  const salida = requerida('salida');
  writeFileSync(salida, JSON.stringify(informe, null, 1) + '\n');
  console.log(`Informe en ${salida} · tradujo ${informe['tradujo']}, revisó ${informe['reviso']}`);
  for (const k of ['capa3-en', 'capa3-pt', 'capa4-en', 'capa4-pt']) console.log(`${k}: ${(informe[k] as { resultados: unknown[] }).resultados.length} con observaciones por confirmar`);
} else throw new Error(`Modo desconocido: ${modo} (traducir, preparar, recibir)`);
}

await principal();
