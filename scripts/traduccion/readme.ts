/**
 * T231 · Verificación en cuatro capas del README del repositorio (RQ-19), con el español como
 * referencia. Tradujo Claude: la capa 3 y la comparación de la capa 4 las hace un revisor de otra
 * familia (`revisor`). Las salidas de modelo son observaciones por confirmar, no veredictos (V12).
 * Uso: bun run scripts/traduccion/readme.ts
 */
import { readFileSync, writeFileSync } from 'node:fs';
import type { Texto } from './relevancia';
import { revisar as terminologia } from './terminologia';
import { arrancar, esperarServidor, PROPIOS, revisar as gramatica } from './gramatica';
import { ESQUEMA as ESQUEMA_MQM } from './mqm';
import { ESQUEMA as ESQUEMA_CONTRASTE } from './contraste';
import { CAPAS, IDIOMAS, deepl, indicacion, revisor } from './servicios';

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
  return out.slice(1);
}

const es = bloques('.github/README.es.md');
const en = bloques('.github/README.md');
const pt = bloques('.github/README.pt-BR.md');
if (en.length !== es.length || pt.length !== es.length) throw new Error(`Bloques desalineados: es ${es.length}, en ${en.length}, pt ${pt.length}`);
const lista: Texto[] = es.map((x, i) => ({ clave: `readme::${i + 1}`, origen: 'copy', nivel: 1, es: x, en: en[i], pt: pt[i] }));

const informe: Record<string, unknown> = { segmentos: lista.length };

// Capa 1 · terminología
informe['capa1'] = terminologia(lista);

// Capa 2 · LanguageTool local
const servidor = arrancar();
try {
  await esperarServidor();
  const c2: unknown[] = [];
  for (const x of lista)
    for (const idioma of ['en', 'pt'] as const)
      for (const m of (await gramatica(x[idioma]!, idioma)).matches) {
        const fragmento = m.context.text.slice(m.context.offset, m.context.offset + m.context.length);
        if (PROPIOS.some((p) => fragmento.includes(p)) && m.rule.category.id === 'TYPOS') continue;
        c2.push({ clave: x.clave, idioma, regla: m.rule.id, mensaje: m.message, fragmento: m.context.text, sugerencias: m.replacements.slice(0, 3).map((r) => r.value) });
      }
  informe['capa2'] = c2;
} finally {
  servidor.kill();
}

// Capas 3 y 4 · revisor de otra familia y contraste con DeepL
for (const idioma of ['en', 'pt'] as const) {
  const pares = lista.map((x) => ({ clave: x.clave, es: x.es, tr: x[idioma]! }));
  const r3 = await revisor<{ clave: string; errores: unknown[] }[]>(indicacion('./indicacion-mqm.md', idioma), JSON.stringify(pares), ESQUEMA_MQM);
  informe[`capa3-${idioma}`] = { modelo: r3.modelo, resultados: r3.datos.filter((x) => x.errores.length) };
  await Bun.sleep(7000);
  const contraste = await deepl(lista.map((x) => x.es), IDIOMAS[idioma].deepl);
  const r4 = await revisor<{ clave: string; clase: string; explicacion: string }[]>(
    indicacion('./indicacion-contraste.md', idioma),
    JSON.stringify(lista.map((x, i) => ({ clave: x.clave, es: x.es, nuestra: x[idioma], contraste: contraste[i] }))),
    ESQUEMA_CONTRASTE,
  );
  informe[`capa4-${idioma}`] = { modelo: r4.modelo, resultados: r4.datos.filter((x) => x.clase !== 'equivalente').map((x) => ({ ...x, contraste: contraste[Number(x.clave.split('::')[1]) - 1] })) };
  await Bun.sleep(7000);
}

writeFileSync(`${CAPAS}/readme-cuatro-capas.json`, JSON.stringify(informe, null, 1) + '\n');
console.log(`${lista.length} segmentos · capa 1: ${(informe['capa1'] as unknown[]).length} · capa 2: ${(informe['capa2'] as unknown[]).length}`);
for (const k of ['capa3-en', 'capa3-pt', 'capa4-en', 'capa4-pt']) {
  const v = informe[k] as { modelo: string; resultados: unknown[] };
  console.log(`${k}: ${v.resultados.length} con observaciones (${v.modelo})`);
}
