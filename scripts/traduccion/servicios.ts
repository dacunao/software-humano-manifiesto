/**
 * Servicios externos de las capas 3 y 4 (RQ-19). Las claves las crea Damián Acuña y viven en
 * variables de entorno locales (`.env.local`, ignorado por git): GEMINI_API_KEY y DEEPL_API_KEY.
 * El texto que se envía es público (CC BY 4.0); ver RQ-19, «Datos enviados».
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { glosario } from './terminologia';

export const CAPAS = 'specs/001-sitio-manifiesto/evidencia/revision-linguistica/capas';

/** Caché en disco: una ejecución interrumpida (cupo diario, red) retoma sin repetir llamadas. */
export class Cache<T> {
  private datos: Record<string, T>;
  constructor(private archivo: string) {
    this.datos = existsSync(archivo) ? (JSON.parse(readFileSync(archivo, 'utf8')) as Record<string, T>) : {};
  }
  get(k: string): T | undefined { return this.datos[k]; }
  set(k: string, v: T) { this.datos[k] = v; writeFileSync(this.archivo, JSON.stringify(this.datos, null, 1) + '\n'); }
}

function clave(nombre: string): string {
  const v = process.env[nombre];
  if (!v) throw new Error(`Falta ${nombre}. Damián la crea y la deja en .env.local (T184); el agente no ingresa credenciales.`);
  return v;
}

export const IDIOMAS = {
  en: { nombre: 'American English', variedad: 'American English (US spelling: organize, behavior, center)', deepl: 'EN-US' },
  pt: { nombre: 'Brazilian Portuguese', variedad: 'Brazilian Portuguese (not European Portuguese)', deepl: 'PT-BR' },
} as const;

export function indicacion(archivo: string, idioma: 'en' | 'pt'): string {
  const lineas = glosario.terminos.map((t) => `- /${t.es}/ → /${t[idioma]}/`).join('\n');
  return readFileSync(new URL(archivo, import.meta.url), 'utf8')
    .replaceAll('{{IDIOMA}}', IDIOMAS[idioma].nombre)
    .replaceAll('{{VARIEDAD}}', IDIOMAS[idioma].variedad)
    .replaceAll('{{GLOSARIO}}', lineas);
}

const GEMINI = 'https://generativelanguage.googleapis.com/v1beta';
let modelos: string[] | undefined;
let actual = 0;

/** Los Flash estables de la lista oficial, del más reciente al más antiguo, o el que fije GEMINI_MODELO. */
async function candidatos(): Promise<string[]> {
  if (modelos) return modelos;
  if (process.env['GEMINI_MODELO']) return (modelos = [process.env['GEMINI_MODELO']]);
  const r = await fetch(`${GEMINI}/models?pageSize=200`, { headers: { 'x-goog-api-key': clave('GEMINI_API_KEY') } });
  if (!r.ok) throw new Error(`Gemini (modelos) respondió ${r.status}: ${await r.text()}`);
  const { models } = (await r.json()) as { models: { name: string; supportedGenerationMethods?: string[] }[] };
  const v = (id: string) => id.match(/[\d.]+/)![0].split('.').map(Number);
  modelos = models
    .map((m) => ({ id: m.name.replace('models/', ''), metodos: m.supportedGenerationMethods ?? [] }))
    .filter((m) => /^gemini-[\d.]+-flash$/.test(m.id) && m.metodos.includes('generateContent'))
    .map((m) => m.id)
    .sort((a, b) => (v(b)[0]! - v(a)[0]!) || ((v(b)[1] ?? 0) - (v(a)[1] ?? 0)));
  if (!modelos.length) throw new Error('No hay un modelo Flash estable disponible');
  return modelos;
}

/**
 * Llamada con salida JSON según un esquema y temperatura 0. Si un modelo está saturado (503) o
 * limitado (429), se reintenta y luego se pasa al siguiente de la lista; el resultado dice qué
 * modelo lo produjo.
 */
export async function gemini<T>(sistema: string, usuario: string, esquema: object): Promise<{ datos: T; modelo: string }> {
  const lista = await candidatos();
  const cuerpo = {
    systemInstruction: { parts: [{ text: sistema }] },
    contents: [{ role: 'user', parts: [{ text: usuario }] }],
    generationConfig: { temperature: 0, responseMimeType: 'application/json', responseSchema: esquema },
  };
  // Si todos los modelos están saturados, se espera cada vez más (hasta 5 minutos) durante un máximo de 3 horas.
  const limite = Date.now() + 3 * 60 * 60 * 1000;
  for (let vuelta = 0; Date.now() < limite; vuelta++) {
    for (; actual < lista.length; actual++) {
      const m = lista[actual]!;
      let r: Response;
      try {
        r = await fetch(`${GEMINI}/models/${m}:generateContent`, {
          method: 'POST',
          headers: { 'content-type': 'application/json', 'x-goog-api-key': clave('GEMINI_API_KEY') },
          body: JSON.stringify(cuerpo),
          signal: AbortSignal.timeout(180_000),
        });
      } catch { continue; } // sin respuesta en 3 minutos: se prueba el siguiente
      if (r.status === 429 || r.status >= 500) { await Bun.sleep(3_000); continue; }
      // Un modelo retirado para cuentas nuevas se descarta.
      if (r.status === 404) { lista.splice(actual, 1); actual--; continue; }
      if (!r.ok) throw new Error(`Gemini (${m}) respondió ${r.status}: ${await r.text()}`);
      const j = (await r.json()) as { candidates?: { content?: { parts?: { text?: string }[] } }[] };
      const texto = j.candidates?.[0]?.content?.parts?.map((p) => p.text ?? '').join('');
      if (!texto) throw new Error(`Gemini (${m}) no devolvió texto: ${JSON.stringify(j).slice(0, 300)}`);
      return { datos: JSON.parse(texto) as T, modelo: m };
    }
    actual = 0;
    const espera = Math.min(60_000 * 2 ** vuelta, 300_000);
    console.error(`\n${new Date().toLocaleTimeString('es-CL')} · todos los modelos saturados; nuevo intento en ${espera / 60_000} min`);
    await Bun.sleep(espera);
  }
  throw new Error('Gemini: todos los modelos saturados o limitados; vuelve a ejecutar más tarde (la caché conserva lo hecho)');
}

/** El esquema de Gemini (tipos en mayúsculas) como JSON Schema estándar. */
function aJsonSchema(e: unknown): unknown {
  if (Array.isArray(e)) return e.map(aJsonSchema);
  if (e && typeof e === 'object')
    return Object.fromEntries(Object.entries(e).map(([k, v]) => [k, k === 'type' && typeof v === 'string' ? v.toLowerCase() : aJsonSchema(v)]));
  return e;
}

const MISTRAL = 'https://api.mistral.ai/v1/chat/completions';
const MODELO_MISTRAL = process.env['MISTRAL_MODELO'] ?? 'mistral-medium-latest'; // Large no está en el modo gratuito
let sinCupoMistral = false;

/** Mistral Large en su plan gratuito (Experiment). La respuesta se envuelve en un objeto, como exige su modo JSON. */
async function mistral<T>(sistema: string, usuario: string, esquema: object): Promise<{ datos: T; modelo: string } | undefined> {
  const k = process.env['MISTRAL_API_KEY'];
  if (!k || sinCupoMistral) return undefined;
  const cuerpo = {
    model: MODELO_MISTRAL,
    temperature: 0,
    messages: [{ role: 'system', content: sistema }, { role: 'user', content: usuario }],
    response_format: { type: 'json_schema', json_schema: { name: 'resultado', schema: { type: 'object', properties: { items: aJsonSchema(esquema) }, required: ['items'] } } },
  };
  for (let intento = 0; intento < 6; intento++) {
    let r: Response;
    try {
      r = await fetch(MISTRAL, { method: 'POST', headers: { 'content-type': 'application/json', authorization: `Bearer ${k}` }, body: JSON.stringify(cuerpo), signal: AbortSignal.timeout(180_000) });
    } catch { continue; }
    // Sin cupo asignado (modo gratuito con límite cero): se deja de intentar en esta ejecución.
    if (r.status === 429 && r.headers.get('x-ratelimit-limit-req-minute') === '0') { sinCupoMistral = true; return undefined; }
    if (r.status === 429 || r.status >= 500) { await Bun.sleep(5_000 * (intento + 1)); continue; }
    if (!r.ok) throw new Error(`Mistral respondió ${r.status}: ${await r.text()}`);
    const j = (await r.json()) as { model?: string; choices: { message: { content: string } }[] };
    return { datos: (JSON.parse(j.choices[0]!.message.content) as { items: T }).items, modelo: j.model ?? MODELO_MISTRAL };
  }
  return undefined; // saturado: se usa el respaldo
}

/** Revisor de otra familia (RQ-19): Mistral Large si hay clave; Gemini como respaldo. */
export async function revisor<T>(sistema: string, usuario: string, esquema: object): Promise<{ datos: T; modelo: string }> {
  return (await mistral<T>(sistema, usuario, esquema)) ?? gemini<T>(sistema, usuario, esquema);
}

/** Traducción de contraste. Las claves del plan gratuito terminan en «:fx» y usan su propio servidor. */
export async function deepl(textos: string[], destino: 'EN-US' | 'PT-BR'): Promise<string[]> {
  const k = clave('DEEPL_API_KEY');
  const host = k.endsWith(':fx') ? 'https://api-free.deepl.com' : 'https://api.deepl.com';
  const r = await fetch(`${host}/v2/translate`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', authorization: `DeepL-Auth-Key ${k}` },
    body: JSON.stringify({ text: textos, source_lang: 'ES', target_lang: destino, preserve_formatting: true }),
  });
  if (!r.ok) throw new Error(`DeepL respondió ${r.status}: ${await r.text()}`);
  return ((await r.json()) as { translations: { text: string }[] }).translations.map((t) => t.text);
}

/** Lotes de segmentos que no superan un tamaño, para respetar límites y contexto. */
export function lotes<T>(items: T[], tam: (x: T) => number, max: number): T[][] {
  const out: T[][] = [];
  let actual: T[] = [];
  let n = 0;
  for (const x of items) {
    if (actual.length && n + tam(x) > max) { out.push(actual); actual = []; n = 0; }
    actual.push(x);
    n += tam(x);
  }
  if (actual.length) out.push(actual);
  return out;
}
