/**
 * T083 · Fusiona lotes de traducción del núcleo en src/content/traducciones-canon/.
 * Uso: bun run scripts/fusionar-traducciones.ts lote.yaml [lote2.yaml …]
 * Cada lote: `id: { en: markdown, pt: markdown }`. Todo entra como `borrador` (lo aprueba una persona).
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { parse, stringify } from 'yaml';
import { leerCanon } from '../src/lib/canon/lector';
import { DIR_CONTENIDO } from '../src/lib/contenido/cargar';
import type { TraduccionesCanon } from '../src/lib/contenido/esquemas';

const nodos = new Map(leerCanon().nodos.map((n) => [n.id, n]));
const archivos = { en: join(DIR_CONTENIDO, 'traducciones-canon/en.yaml'), pt: join(DIR_CONTENIDO, 'traducciones-canon/pt-br.yaml') };
const datos = {
  en: parse(readFileSync(archivos.en, 'utf8')) as TraduccionesCanon,
  pt: parse(readFileSync(archivos.pt, 'utf8')) as TraduccionesCanon,
};

let n = 0;
for (const lote of process.argv.slice(2)) {
  const t = parse(readFileSync(lote, 'utf8')) as Record<string, { en: string; pt: string }>;
  for (const [id, { en, pt }] of Object.entries(t)) {
    const nodo = nodos.get(id);
    if (!nodo) throw new Error(`${lote}: nodo inexistente ${id}`);
    for (const [clave, texto] of [['en', en], ['pt', pt]] as const) {
      if (!texto?.trim()) throw new Error(`${lote}: ${id} sin texto ${clave}`);
      // Los identificadores entre acentos graves deben sobrevivir a la traducción.
      const ids = nodo.source.match(/`[^`]+`/g) ?? [];
      for (const c of ids) if (!texto.includes(c)) throw new Error(`${lote}: ${id} (${clave}) perdió ${c}`);
      datos[clave].entries[id] = { sourceHash: nodo.hash, state: 'borrador', text: texto.trim() };
    }
    n += 1;
  }
}
for (const clave of ['en', 'pt'] as const) {
  const locale = datos[clave].locale;
  writeFileSync(archivos[clave], `# Traducción del núcleo v2.1 al ${locale}, nodo a nodo (RQ-02). Una entrada por nodo canónico.\n` + stringify(datos[clave], { lineWidth: 0, aliasDuplicateObjects: false }));
}
const hechos = Object.values(datos.en.entries).filter((e) => e.state !== 'pendiente').length;
console.log(`${n} nodos fusionados · en: ${hechos}/${nodos.size} con texto`);
