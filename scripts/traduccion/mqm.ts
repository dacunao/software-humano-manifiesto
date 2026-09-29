/**
 * T185 · Capa 3: anotación de errores estilo MQM por un modelo de otra familia (RQ-19).
 * Recorre todo, empezando por el nivel 1, en lotes. Las anotaciones son salida de modelo:
 * observaciones por confirmar, no veredictos (V12).
 * Uso: bun run scripts/traduccion/mqm.ts [--seco]
 */
import { writeFileSync } from 'node:fs';
import { textos, type Texto } from './relevancia';
import { CAPAS, Cache, gemini, indicacion, lotes, modeloGemini } from './servicios';

interface Error { tipo: string; gravedad: 'critica' | 'mayor' | 'menor'; fragmento_es: string; fragmento_tr: string; explicacion: string }
interface Resultado { clave: string; errores: Error[] }

const ESQUEMA = {
  type: 'ARRAY',
  items: {
    type: 'OBJECT',
    properties: {
      clave: { type: 'STRING' },
      errores: {
        type: 'ARRAY',
        items: {
          type: 'OBJECT',
          properties: {
            tipo: { type: 'STRING', enum: ['omision', 'adicion', 'cambio-de-sentido', 'terminologia', 'fluidez', 'variedad'] },
            gravedad: { type: 'STRING', enum: ['critica', 'mayor', 'menor'] },
            fragmento_es: { type: 'STRING' },
            fragmento_tr: { type: 'STRING' },
            explicacion: { type: 'STRING' },
          },
          required: ['tipo', 'gravedad', 'fragmento_es', 'fragmento_tr', 'explicacion'],
        },
      },
    },
    required: ['clave', 'errores'],
  },
};

/** Unos 6.000 caracteres por lote: suficiente contexto sin respuestas truncadas. */
const MAX_LOTE = 6000;
/** Pausa entre llamadas para no superar el límite por minuto de la capa gratuita. */
const PAUSA_MS = 7000;

if (import.meta.main) {
  const seco = process.argv.includes('--seco');
  const todos = textos().sort((a, b) => a.nivel - b.nivel);
  const salida: (Resultado & { idioma: 'en' | 'pt'; nivel: Texto['nivel']; origen: 'modelo'; modelo: string })[] = [];
  for (const idioma of ['en', 'pt'] as const) {
    const con = todos.filter((x) => x[idioma]);
    const grupos = lotes(con, (x) => x.es.length + x[idioma]!.length, MAX_LOTE);
    if (seco) { console.log(`${idioma}: ${con.length} segmentos en ${grupos.length} llamadas`); continue; }
    const modelo = await modeloGemini();
    const cache = new Cache<Resultado[]>(`${CAPAS}/capa-3-cache-${idioma}.json`);
    const sistema = indicacion('./indicacion-mqm.md', idioma);
    for (const [i, g] of grupos.entries()) {
      const id = g.map((x) => x.clave).join('|');
      let r = cache.get(id);
      if (!r) {
        const usuario = JSON.stringify(g.map((x) => ({ clave: x.clave, es: x.es, tr: x[idioma] })));
        r = await gemini<Resultado[]>(sistema, usuario, ESQUEMA);
        cache.set(id, r);
        await Bun.sleep(PAUSA_MS);
      }
      for (const x of r) {
        const t = g.find((y) => y.clave === x.clave);
        if (t && x.errores.length) salida.push({ ...x, idioma, nivel: t.nivel, origen: 'modelo', modelo });
      }
      process.stdout.write(`\r${idioma}: lote ${i + 1}/${grupos.length}`);
    }
    console.log();
  }
  if (!seco) {
    writeFileSync(`${CAPAS}/capa-3-mqm.json`, JSON.stringify(salida, null, 1) + '\n');
    const n = (g: string) => salida.flatMap((x) => x.errores).filter((e) => e.gravedad === g).length;
    console.log(`Capa 3: ${salida.length} segmentos con observaciones · críticas ${n('critica')} · mayores ${n('mayor')} · menores ${n('menor')}`);
  }
}
