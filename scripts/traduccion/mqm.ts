/**
 * T185 · Capa 3: anotación de errores estilo MQM por un modelo de otra familia (RQ-19).
 * Recorre todo, empezando por el nivel 1, en lotes. Las anotaciones son salida de modelo:
 * observaciones por confirmar, no veredictos (V12).
 * Uso: bun run scripts/traduccion/mqm.ts [--seco]
 */
import { writeFileSync } from 'node:fs';
import { textos, type Texto } from './relevancia';
import { CAPAS, Cache, indicacion, lotes, revisor } from './servicios';

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

/** Opciones: --idiomas=pt,en (orden) y --niveles=1 (muestra). La caché es por segmento: cambiar el orden no repite nada. */
function opcion(nombre: string): string[] | undefined {
  return process.argv.find((a) => a.startsWith(`--${nombre}=`))?.split('=')[1]?.split(',');
}

if (import.meta.main) {
  const seco = process.argv.includes('--seco');
  const idiomas = (opcion('idiomas') ?? ['en', 'pt']) as ('en' | 'pt')[];
  const niveles = (opcion('niveles') ?? ['1', '2', '3']).map(Number);
  const todos = textos().filter((x) => niveles.includes(x.nivel)).sort((a, b) => a.nivel - b.nivel);
  const salida: (Resultado & { idioma: 'en' | 'pt'; nivel: Texto['nivel']; origen: 'modelo'; modelo: string })[] = [];
  for (const idioma of idiomas) {
    const cache = new Cache<{ modelo: string; errores: Error[] }>(`${CAPAS}/capa-3-cache-${idioma}.json`);
    const con = todos.filter((x) => x[idioma]);
    const pendientes = con.filter((x) => !cache.get(x.clave));
    const grupos = lotes(pendientes, (x) => x.es.length + x[idioma]!.length, MAX_LOTE);
    if (seco) { console.log(`${idioma}: ${con.length} segmentos, ${pendientes.length} pendientes, ${grupos.length} llamadas`); continue; }
    const sistema = indicacion('./indicacion-mqm.md', idioma);
    for (const [i, g] of grupos.entries()) {
      const usuario = JSON.stringify(g.map((x) => ({ clave: x.clave, es: x.es, tr: x[idioma] })));
      const r = await revisor<Resultado[]>(sistema, usuario, ESQUEMA);
      for (const x of r.datos) if (g.some((y) => y.clave === x.clave)) cache.set(x.clave, { modelo: r.modelo, errores: x.errores });
      process.stdout.write(`\r${idioma}: lote ${i + 1}/${grupos.length}`);
      await Bun.sleep(PAUSA_MS);
    }
    console.log();
    for (const x of con) {
      const c = cache.get(x.clave);
      if (c?.errores.length) salida.push({ clave: x.clave, errores: c.errores, idioma, nivel: x.nivel, origen: 'modelo', modelo: c.modelo });
    }
  }
  if (!seco) {
    writeFileSync(`${CAPAS}/capa-3-mqm.json`, JSON.stringify(salida, null, 1) + '\n');
    const n = (g: string) => salida.flatMap((x) => x.errores).filter((e) => e.gravedad === g).length;
    console.log(`Capa 3: ${salida.length} segmentos con observaciones · críticas ${n('critica')} · mayores ${n('mayor')} · menores ${n('menor')}`);
  }
}
