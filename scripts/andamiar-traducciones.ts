/**
 * T017 · Asegura una entrada por nodo canónico en cada archivo de traducción (RV-07).
 * Idempotente: agrega `state: pendiente` a los nodos que falten y nunca toca las existentes.
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { parse, stringify } from 'yaml';
import { leerCanon } from '../src/lib/canon/lector';
import { DIR_CONTENIDO } from '../src/lib/contenido/cargar';
import type { TraduccionesCanon } from '../src/lib/contenido/esquemas';

const { nodos } = leerCanon();
for (const [archivo, locale] of [['en.yaml', 'en'], ['pt-br.yaml', 'pt-BR']] as const) {
  const ruta = join(DIR_CONTENIDO, 'traducciones-canon', archivo);
  const actual: TraduccionesCanon = existsSync(ruta)
    ? (parse(readFileSync(ruta, 'utf8')) as TraduccionesCanon)
    : { locale, entries: {} };
  const entries: TraduccionesCanon['entries'] = {};
  let agregadas = 0;
  for (const n of nodos) {
    const previa = actual.entries[n.id];
    if (previa) entries[n.id] = previa;
    else {
      entries[n.id] = { sourceHash: n.hash, state: 'pendiente' };
      agregadas += 1;
    }
  }
  const cabecera = `# Traducción del núcleo v2.1 al ${locale}, nodo a nodo (RQ-02). Una entrada por nodo canónico.\n`;
  writeFileSync(ruta, cabecera + stringify({ locale, entries }, { lineWidth: 0 }));
  console.log(`${archivo}: ${nodos.length} entradas (${agregadas} nuevas)`);
}
