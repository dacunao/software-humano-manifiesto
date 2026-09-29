/**
 * T190 · Pasa el inglés a ortografía estadounidense (decisión de Damián Acuña, 2026-09-29).
 * Lista cerrada de equivalencias: solo cambia la ortografía, nunca el sentido. No toca código entre
 * acentos graves ni URL. Los nodos aprobados del núcleo que cambian vuelven a `borrador`.
 * Uso: bun run scripts/traduccion/ortografia-us.ts [--seco]
 */
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { parse, parseDocument, stringify, isMap, isScalar, type Document } from 'yaml';
import { DIR_CONTENIDO } from '../../src/lib/contenido/cargar';

/** Raíces con -ise/-isation británicas; ninguna es una palabra que termine en «-is» por sí misma. */
const RAICES_IZE = ['authori', 'recogni', 'organi', 'summari', 'memori', 'synchroni', 'prioriti', 'categori', 'customi', 'optimi', 'minimi', 'maximi', 'standardi', 'utili', 'emphasi', 'reali', 'speciali', 'visuali', 'characteri', 'finali', 'normali', 'apologi', 'criticis', 'legitimi', 'personali', 'stabili', 'formali', 'materiali', 'analy', 'paraly', 'cataly'];
const PALABRAS: [RegExp, string][] = [
  [/\bbehaviour/g, 'behavior'], [/\brigour/g, 'rigor'], [/\bvigour/g, 'vigor'], [/\bhumour/g, 'humor'], [/\bcolour/g, 'color'], [/\bfavour/g, 'favor'], [/\blabour/g, 'labor'], [/\bhonour/g, 'honor'], [/\bneighbour/g, 'neighbor'],
  [/\bcentred\b/g, 'centered'], [/\bcentres\b/g, 'centers'], [/\bcentre\b/g, 'center'], [/\bcentring\b/g, 'centering'], [/\bartefact/g, 'artifact'], [/\bjudgement/g, 'judgment'],
  [/\blicence(s)?\b/g, 'license$1'], [/\bcatalogue/g, 'catalog'], [/\bdialogue\b/g, 'dialog'], [/\bmodelling\b/g, 'modeling'], [/\bmodelled\b/g, 'modeled'],
  [/\blabelled\b/g, 'labeled'], [/\blabelling\b/g, 'labeling'], [/\btravelled\b/g, 'traveled'], [/\bcancelled\b/g, 'canceled'], [/\benrol(s|ment)?\b/g, 'enroll$1'],
  [/\bfulfil(s|ment)?\b/g, 'fulfill$1'], [/\bprogramme(s)?\b/g, 'program$1'], [/\bdefence\b/g, 'defense'], [/\boffence\b/g, 'offense'], [/\bgrey\b/g, 'gray'],
];

/** Aplica un reemplazo sin distinguir mayúsculas y conserva la inicial mayúscula del original. */
function reemplazar(s: string, re: RegExp, rep: string): string {
  return s.replace(new RegExp(re.source, 'gi'), (m, ...g) => {
    const r = rep.replace(/\$(\d)/g, (_x, n: string) => (g[Number(n) - 1] as string | undefined) ?? '');
    return m[0] === m[0]!.toUpperCase() ? r[0]!.toUpperCase() + r.slice(1) : r;
  });
}

export function aUS(t: string): string {
  // Se protegen el código y las URL; lo demás se convierte. Las raíces admiten prefijos (unauthorised).
  return t.split(/(`[^`]*`|\]\([^)]*\)|https?:\/\/\S+)/).map((p, i) => {
    if (i % 2 === 1) return p;
    let s = p;
    for (const r of RAICES_IZE) s = reemplazar(s, new RegExp(`(${r})s(e|es|ed|ing|ation|ations|able|er|ers)\\b`), '$1z$2');
    for (const [re, rep] of PALABRAS) s = reemplazar(s, re, rep);
    return s;
  }).join('');
}

if (import.meta.main) {
const seco = process.argv.includes('--seco');
const cambios: { clave: string; antes: string; despues: string }[] = [];

// Núcleo: nodo a nodo; los aprobados que cambian vuelven a borrador.
const rutaCanon = join(DIR_CONTENIDO, 'traducciones-canon/en.yaml');
const txt = readFileSync(rutaCanon, 'utf8');
const canon = parse(txt) as { entries: Record<string, { state: string; text?: string; approvedBy?: string; approvedAt?: string }> };
for (const [id, e] of Object.entries(canon.entries)) {
  if (!e.text) continue;
  const nuevo = aUS(e.text);
  if (nuevo === e.text) continue;
  cambios.push({ clave: `canon::${id}`, antes: e.text, despues: nuevo });
  e.text = nuevo;
  if (e.state === 'aprobada') { e.state = 'borrador'; delete e.approvedBy; delete e.approvedAt; }
}

// Copy: se conservan los comentarios del YAML.
const archivos = [
  ...readdirSync(join(DIR_CONTENIDO, 'superficies')).map((f) => `superficies/${f}`),
  ...readdirSync(join(DIR_CONTENIDO, 'principios')).map((f) => `principios/${f}`),
  'interfaz/cadenas.yaml',
];
const docs = new Map<string, Document>();
for (const a of archivos) {
  const doc = parseDocument(readFileSync(join(DIR_CONTENIDO, a), 'utf8'));
  let tocado = false;
  const recorrer = (n: unknown, ruta: string[]) => {
    if (!isMap(n)) { if (n && typeof n === 'object' && 'items' in n) (n as { items: unknown[] }).items.forEach((h, i) => recorrer(h, [...ruta, String(i)])); return; }
    const en = n.get('en', true);
    if (isMap(en) && n.has('es')) {
      const t = en.get('text', true);
      if (isScalar(t) && typeof t.value === 'string') {
        const nuevo = aUS(t.value);
        if (nuevo !== t.value) { cambios.push({ clave: `${a}::${ruta.join('/')}`, antes: t.value, despues: nuevo }); t.value = nuevo; tocado = true; }
      }
      return;
    }
    for (const it of n.items) recorrer(it.value, [...ruta, String(isScalar(it.key) ? it.key.value : it.key)]);
  };
  recorrer(doc.contents, []);
  if (tocado) docs.set(a, doc);
}

if (!seco) {
  writeFileSync(rutaCanon, txt.split('\n')[0] + '\n' + stringify(canon, { lineWidth: 0, aliasDuplicateObjects: false }));
  for (const [a, doc] of docs) writeFileSync(join(DIR_CONTENIDO, a), doc.toString({ lineWidth: 0 }));
}
const palabras = cambios.flatMap((c) => {
  const a = c.antes.split(/\s+/), d = c.despues.split(/\s+/);
  return a.map((w, i) => (w !== d[i] ? `${w} → ${d[i]}` : null)).filter(Boolean);
});
console.log(`${cambios.length} textos · ${palabras.length} palabras (${cambios.filter((c) => c.clave.startsWith('canon::')).length} del núcleo)`);
writeFileSync('specs/001-sitio-manifiesto/evidencia/revision-linguistica/capas/ortografia-us.json', JSON.stringify(palabras.reduce<Record<string, number>>((m, p) => ((m[p!] = (m[p!] ?? 0) + 1), m), {}), null, 1) + '\n');
}
