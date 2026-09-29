/**
 * T186 · Capa 4: traducción de contraste con DeepL (RQ-19). Cubre el nivel 1 completo y, de los
 * niveles 2 y 3, lo que marquen las capas 1 a 3. El modelo de la capa 3 compara el significado
 * con una indicación fija; su clasificación es salida de modelo (V12).
 * Uso: bun run scripts/traduccion/contraste.ts [--seco]
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { textos } from './relevancia';
import { CAPAS, Cache, IDIOMAS, deepl, indicacion, lotes, revisor } from './servicios';

interface Comparacion { clave: string; clase: 'equivalente' | 'matiz' | 'cambio-de-sentido'; explicacion: string }
const ESQUEMA = {
  type: 'ARRAY',
  items: {
    type: 'OBJECT',
    properties: {
      clave: { type: 'STRING' },
      clase: { type: 'STRING', enum: ['equivalente', 'matiz', 'cambio-de-sentido'] },
      explicacion: { type: 'STRING' },
    },
    required: ['clave', 'clase', 'explicacion'],
  },
};

/** Claves marcadas por las capas 1 a 3, por idioma. */
function marcadas(idioma: 'en' | 'pt'): Set<string> {
  const s = new Set<string>();
  for (const f of ['capa-1-terminologia.json', 'capa-2-gramatica.json', 'capa-3-mqm.json', 'capa-3-claude-nucleo-en.json', 'capa-3-claude-nucleo-pt.json']) {
    const ruta = `${CAPAS}/${f}`;
    if (!existsSync(ruta)) continue;
    for (const h of JSON.parse(readFileSync(ruta, 'utf8')) as { clave: string; idioma: string }[]) if (h.idioma === idioma) s.add(h.clave);
  }
  return s;
}

if (import.meta.main) {
  const seco = process.argv.includes('--seco');
  // --origen=nucleo: solo el núcleo. --sin-comparar: solo la traducción de DeepL; la comparación la hace
  // un revisor independiente de ambas traducciones (Claude para el núcleo, que tradujo OpenAI).
  const origen = process.argv.find((a) => a.startsWith('--origen='))?.split('=')[1];
  const sinComparar = process.argv.includes('--sin-comparar');
  const salida: (Comparacion & { idioma: 'en' | 'pt'; nivel: number; contraste: string; origen: 'modelo'; modelo: string })[] = [];
  let caracteres = 0;
  for (const idioma of ['en', 'pt'] as const) {
    const m = marcadas(idioma);
    const sel = textos().filter((x) => x[idioma] && (!origen || x.origen === origen) && (x.nivel === 1 || m.has(x.clave)));
    const chars = sel.reduce((n, x) => n + x.es.length, 0);
    caracteres += chars;
    if (seco) { console.log(`${idioma}: ${sel.length} segmentos, ${chars} caracteres de DeepL`); continue; }
    const cacheT = new Cache<string>(`${CAPAS}/capa-4-cache-deepl-${idioma}.json`);
    const pendientes = sel.filter((x) => cacheT.get(x.clave) === undefined);
    for (const g of lotes(pendientes, (x) => x.es.length, 50_000)) {
      const tr = await deepl(g.map((x) => x.es), IDIOMAS[idioma].deepl);
      g.forEach((x, i) => cacheT.set(x.clave, tr[i]!));
    }
    if (sinComparar) {
      writeFileSync(`${CAPAS}/capa-4-pares-${idioma}.json`, JSON.stringify(sel.map((x) => ({ clave: x.clave, nivel: x.nivel, es: x.es, nuestra: x[idioma], contraste: cacheT.get(x.clave) })), null, 1) + '\n');
      continue;
    }
    const cacheC = new Cache<{ modelo: string; resultados: Comparacion[] }>(`${CAPAS}/capa-4-cache-comparacion-${idioma}.json`);
    const sistema = indicacion('./indicacion-contraste.md', idioma);
    for (const g of lotes(sel, (x) => x.es.length * 3, 9000)) {
      const id = g.map((x) => x.clave).join('|');
      let lote = cacheC.get(id);
      if (!lote) {
        const r = await revisor<Comparacion[]>(sistema, JSON.stringify(g.map((x) => ({ clave: x.clave, es: x.es, nuestra: x[idioma], contraste: cacheT.get(x.clave) }))), ESQUEMA);
        lote = { modelo: r.modelo, resultados: r.datos };
        cacheC.set(id, lote);
        await Bun.sleep(7000);
      }
      for (const c of lote.resultados) {
        const t = g.find((y) => y.clave === c.clave);
        if (t && c.clase !== 'equivalente') salida.push({ ...c, idioma, nivel: t.nivel, contraste: cacheT.get(c.clave)!, origen: 'modelo', modelo: lote.modelo });
      }
    }
  }
  console.log(`DeepL: ${caracteres} caracteres en total (el plan Developer da 1.000.000 una sola vez)`);
  if (!seco && !sinComparar) {
    writeFileSync(`${CAPAS}/capa-4-contraste.json`, JSON.stringify(salida, null, 1) + '\n');
    console.log(`Capa 4: ${salida.filter((x) => x.clase === 'cambio-de-sentido').length} cambios de sentido y ${salida.filter((x) => x.clase === 'matiz').length} matices`);
  }
}
