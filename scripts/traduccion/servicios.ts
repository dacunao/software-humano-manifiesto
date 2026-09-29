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
  en: { nombre: 'British English', variedad: 'British English (the approved core uses -ise spellings)', deepl: 'EN-GB' },
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
let modelo: string | undefined;

/** El Flash estable más reciente de la lista oficial, o el que fije GEMINI_MODELO. */
export async function modeloGemini(): Promise<string> {
  if (modelo) return modelo;
  if (process.env['GEMINI_MODELO']) return (modelo = process.env['GEMINI_MODELO']);
  const r = await fetch(`${GEMINI}/models?pageSize=200`, { headers: { 'x-goog-api-key': clave('GEMINI_API_KEY') } });
  if (!r.ok) throw new Error(`Gemini (modelos) respondió ${r.status}: ${await r.text()}`);
  const { models } = (await r.json()) as { models: { name: string; supportedGenerationMethods?: string[] }[] };
  const flash = models
    .map((m) => ({ id: m.name.replace('models/', ''), metodos: m.supportedGenerationMethods ?? [] }))
    .filter((m) => /^gemini-[\d.]+-flash$/.test(m.id) && m.metodos.includes('generateContent'))
    .map((m) => m.id)
    .sort((a, b) => {
      const v = (id: string) => id.match(/[\d.]+/)![0].split('.').map(Number);
      const [x, y] = [v(a), v(b)];
      return (y[0]! - x[0]!) || ((y[1] ?? 0) - (x[1] ?? 0));
    });
  if (!flash[0]) throw new Error('No hay un modelo Flash estable disponible');
  return (modelo = flash[0]);
}

/** Llamada con salida JSON según un esquema, temperatura 0 y reintentos ante límites de uso. */
export async function gemini<T>(sistema: string, usuario: string, esquema: object): Promise<T> {
  const m = await modeloGemini();
  const cuerpo = {
    systemInstruction: { parts: [{ text: sistema }] },
    contents: [{ role: 'user', parts: [{ text: usuario }] }],
    generationConfig: { temperature: 0, responseMimeType: 'application/json', responseSchema: esquema },
  };
  for (let intento = 0; intento < 6; intento++) {
    const r = await fetch(`${GEMINI}/models/${m}:generateContent`, {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-goog-api-key': clave('GEMINI_API_KEY') },
      body: JSON.stringify(cuerpo),
    });
    if (r.status === 429 || r.status >= 500) { await Bun.sleep(15_000 * (intento + 1)); continue; }
    if (!r.ok) throw new Error(`Gemini respondió ${r.status}: ${await r.text()}`);
    const j = (await r.json()) as { candidates?: { content?: { parts?: { text?: string }[] } }[] };
    const texto = j.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!texto) throw new Error(`Gemini no devolvió texto: ${JSON.stringify(j).slice(0, 300)}`);
    return JSON.parse(texto) as T;
  }
  throw new Error('Gemini: límite de uso agotado tras varios reintentos; vuelve a ejecutar más tarde (la caché conserva lo hecho)');
}

/** Traducción de contraste. Las claves del plan gratuito terminan en «:fx» y usan su propio servidor. */
export async function deepl(textos: string[], destino: 'EN-GB' | 'PT-BR'): Promise<string[]> {
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
