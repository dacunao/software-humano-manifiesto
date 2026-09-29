/**
 * T186 · Capa 4: traducción de contraste con DeepL (RQ-19). Cubre el nivel 1 completo y, de los
 * niveles 2 y 3, lo que marquen las capas 1 a 3. El modelo de la capa 3 compara el significado
 * con una indicación fija; su clasificación es salida de modelo (V12).
 * Uso: bun run scripts/traduccion/contraste.ts [--seco]
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { textos } from './relevancia';
import { CAPAS, Cache, IDIOMAS, deepl, gemini, indicacion, lotes } from './servicios';

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
  for (const f of ['capa-1-terminologia.json', 'capa-2-gramatica.json', 'capa-3-mqm.json']) {
    const ruta = `${CAPAS}/${f}`;
    if (!existsSync(ruta)) continue;
    for (const h of JSON.parse(readFileSync(ruta, 'utf8')) as { clave: string; idioma: string }[]) if (h.idioma === idioma) s.add(h.clave);
  }
  return s;
}

if (import.meta.main) {
  const seco = process.argv.includes('--seco');
  const salida: (Comparacion & { idioma: 'en' | 'pt'; nivel: number; contraste: string; origen: 'modelo' })[] = [];
  let caracteres = 0;
  for (const idioma of ['en', 'pt'] as const) {
    const m = marcadas(idioma);
    const sel = textos().filter((x) => x[idioma] && (x.nivel === 1 || m.has(x.clave)));
    const chars = sel.reduce((n, x) => n + x.es.length, 0);
    caracteres += chars;
    if (seco) { console.log(`${idioma}: ${sel.length} segmentos, ${chars} caracteres de DeepL`); continue; }
    const cacheT = new Cache<string>(`${CAPAS}/capa-4-cache-deepl-${idioma}.json`);
    const pendientes = sel.filter((x) => cacheT.get(x.clave) === undefined);
    for (const g of lotes(pendientes, (x) => x.es.length, 50_000)) {
      const tr = await deepl(g.map((x) => x.es), IDIOMAS[idioma].deepl);
      g.forEach((x, i) => cacheT.set(x.clave, tr[i]!));
    }
    const cacheC = new Cache<Comparacion[]>(`${CAPAS}/capa-4-cache-comparacion-${idioma}.json`);
    const sistema = indicacion('./indicacion-contraste.md', idioma);
    for (const g of lotes(sel, (x) => x.es.length * 3, 9000)) {
      const id = g.map((x) => x.clave).join('|');
      let r = cacheC.get(id);
      if (!r) {
        r = await gemini<Comparacion[]>(sistema, JSON.stringify(g.map((x) => ({ clave: x.clave, es: x.es, nuestra: x[idioma], contraste: cacheT.get(x.clave) }))), ESQUEMA);
        cacheC.set(id, r);
        await Bun.sleep(7000);
      }
      for (const c of r) {
        const t = g.find((y) => y.clave === c.clave);
        if (t && c.clase !== 'equivalente') salida.push({ ...c, idioma, nivel: t.nivel, contraste: cacheT.get(c.clave)!, origen: 'modelo' });
      }
    }
  }
  console.log(`DeepL: ${caracteres} caracteres en total (el plan Developer da 1.000.000 una sola vez)`);
  if (!seco) {
    writeFileSync(`${CAPAS}/capa-4-contraste.json`, JSON.stringify(salida, null, 1) + '\n');
    console.log(`Capa 4: ${salida.filter((x) => x.clase === 'cambio-de-sentido').length} cambios de sentido y ${salida.filter((x) => x.clase === 'matiz').length} matices`);
  }
}
