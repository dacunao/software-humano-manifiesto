#!/usr/bin/env bun
// Calidad de los sitios de Software Humano. Se corre a voluntad; nada corre solo.
//   bun calidad.ts camino <perfil>            el camino para ese producto: solo lo que falta o hay que revisar
//   bun calidad.ts camino <perfil> --nuevo    hace las preguntas y crea el perfil
//   bun calidad.ts confirmar <perfil> <id>…   marca como cumplidos pasos manuales (no vuelven a aparecer)
//   bun calidad.ts control <perfil|todos>     revisa lo publicado; --vista-previa, --rapido (sin Google), --todo (muestra también lo que cumple)
import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import { PASOS, type Perfil, type Estado } from "./pasos";
import { controlar } from "./control";

const DIR = join(import.meta.dir, "perfiles");
const CMD = `bun ${import.meta.path.replace(homedir(), "~")}`;
const [orden, nombre, ...resto] = process.argv.slice(2);
const op = (f: string) => resto.includes(f) || process.argv.includes(f);
const expandir = (c: string) => c.replace(/^~/, homedir());
const leerPerfil = (n: string): Perfil => JSON.parse(readFileSync(join(DIR, `${n}.json`), "utf8"));
const perfiles = () => readdirSync(DIR).filter((f) => f.endsWith(".json")).map((f) => f.slice(0, -5));

function preguntar(): Perfil {
  const t = (q: string, d = "") => (prompt(`${q}${d ? ` [${d}]` : ""}:`) ?? "").trim() || d;
  const sn = (q: string, d = "n") => /^s/i.test(t(`${q} (s/n)`, d));
  const formulario = sn("¿Tiene formulario o alguna acción que envíe datos?");
  return {
    nombre: t("Nombre del producto"),
    carpeta: t("Carpeta del proyecto", process.cwd().replace(homedir(), "~")),
    produccion: t("Dirección de producción (vacío si aún no existe)") || undefined,
    vista_previa: t("Dirección de la vista previa (vacío si aún no existe)") || undefined,
    paginas: t("Páginas a medir, separadas por coma", "/").split(",").map((s) => s.trim()),
    stack: t("Stack (texto libre)"),
    indexable: sn("¿Debe aparecer en buscadores?", "s"),
    www: sn("¿Existe www que deba llevar a la raíz?", "s"),
    formulario,
    turnstile: formulario && sn("¿Usa Turnstile contra robots?", "s"),
    base_de_datos: sn("¿Guarda datos en una base de datos?"),
    datos_personales: sn("¿Recoge datos personales (correo, nombre, teléfono)?"),
    idiomas: Number(t("¿Cuántos idiomas?", "1")),
    panel_privado: sn("¿Tiene panel privado o cuentas de usuario?"),
    pagos: sn("¿Recibe pagos?"),
  };
}

const JSON_ = op("--json");
const salida: unknown[] = [];

function camino(p: Perfil) {
  const repo = expandir(p.carpeta), conf = new Set(p.confirmados ?? []);
  const aplican = PASOS.filter((s) => s.aplica(p));
  const estado = (s: (typeof PASOS)[number]): Estado => {
    const d = s.detectar && existsSync(repo) ? s.detectar(repo, p) : "revisar";
    return d === "revisar" && conf.has(s.id) ? "hecho" : d;
  };
  const manuales = aplican.filter((s) => !s.revisa && !s.cadaPublicacion);
  const recordatorios = aplican.filter((s) => s.cadaPublicacion);
  const pendientes = manuales.filter((s) => estado(s) !== "hecho");
  const delControl = aplican.filter((s) => s.revisa === "control");
  if (JSON_) {
    salida.push({ perfil: nombre, producto: p.nombre, aplican: aplican.length, cumplidos: manuales.length - pendientes.length,
      pendientes: pendientes.map((s) => ({ id: s.id, etapa: s.etapa, estado: estado(s), texto: s.texto, norma: s.norma })),
      en_cada_publicacion: recordatorios.map((s) => s.id), lo_revisa_el_control: delControl.map((s) => s.id) });
    return;
  }
  console.log(`\n${p.nombre} · ${aplican.length} pasos aplican · ${manuales.length - pendientes.length} cumplidos · ${pendientes.length} pendientes\n`);
  let etapa = "";
  for (const s of op("--todo") ? manuales : pendientes) {
    if (s.etapa !== etapa) { etapa = s.etapa; console.log(etapa); }
    const e = estado(s);
    console.log(`  ${e === "hecho" ? "✅" : e === "falta" ? "❌" : "◻️ "} ${s.texto}  (${s.norma})${e === "revisar" ? `  [${s.id}]` : ""}`);
  }
  if (recordatorios.length) console.log(`\nEn cada publicación: ${recordatorios.map((s) => s.texto.split(" (")[0].toLowerCase()).join("; ")}.`);
  console.log(`\nLo revisa el control en lo publicado: ${[...new Set(delControl.flatMap((s) => s.norma.split(" (")[0].split(" · ")))].join(", ")}.`);
  console.log(`  ${CMD} control ${nombre}`);
  if (pendientes.some((s) => estado(s) === "revisar")) console.log(`Cuando cumplas un ◻️ , confírmalo una vez: ${CMD} confirmar ${nombre} <id> [<id>…]\n`);
}

const primeros: string[] = [];
async function control(n: string) {
  const p = leerPerfil(n), modo = op("--vista-previa") ? "vista-previa" : "produccion";
  const R = await controlar(p, modo, op("--rapido"));
  const fallas = R.filter((r) => r.ok === false), avisos = R.filter((r) => r.ok === null), bien = R.filter((r) => r.ok === true);
  if (JSON_) {
    salida.push({ perfil: n, sitio: p.nombre, modo, direccion: modo === "produccion" ? p.produccion : p.vista_previa, cumplen: bien.length, total: bien.length + fallas.length,
      fallas: fallas.map(({ ok, ...r }) => r), avisos: avisos.map(({ ok, ...r }) => r) });
    return fallas.length;
  }
  console.log(`\n${p.nombre} (${modo === "produccion" ? p.produccion : p.vista_previa}) · ${bien.length} de ${bien.length + fallas.length} cumplen`);
  for (const r of [...fallas, ...avisos, ...(op("--todo") ? bien : [])]) {
    console.log(`  ${r.ok === false ? "❌" : r.ok === null ? "⚠️ " : "✅"} ${r.texto}  (${r.norma})`);
    if (r.ok !== true) {
      if (r.porque) console.log(`     Por qué: ${r.porque}`);
      if (r.hacer) console.log(`     Qué hacer: ${r.hacer}`);
      if (r.cuando) console.log(`     Cuándo: ${r.cuando}`);
    }
  }
  if (fallas[0]) primeros.push(`${p.nombre}: ${fallas[0].hacer ?? fallas[0].texto}`);
  return fallas.length;
}

if (orden === "camino" && nombre) {
  const f = join(DIR, `${nombre}.json`);
  if (op("--nuevo") || !existsSync(f)) { const p = preguntar(); writeFileSync(f, JSON.stringify(p, null, 2) + "\n"); console.log(`Perfil guardado en perfiles/${nombre}.json`); camino(p); }
  else camino(leerPerfil(nombre));
  if (JSON_) console.log(JSON.stringify(salida, null, 2));
} else if (orden === "confirmar" && nombre) {
  const p = leerPerfil(nombre), validos = new Set(PASOS.map((s) => s.id));
  const nuevos = resto.filter((x) => !x.startsWith("--"));
  const malos = nuevos.filter((x) => !validos.has(x));
  if (malos.length) { console.log(`No existen: ${malos.join(", ")}`); process.exit(1); }
  p.confirmados = [...new Set([...(p.confirmados ?? []), ...nuevos])];
  writeFileSync(join(DIR, `${nombre}.json`), JSON.stringify(p, null, 2) + "\n");
  camino(p);
} else if (orden === "control" && nombre) {
  const lista = nombre === "todos" ? perfiles() : [nombre];
  let fallas = 0;
  for (const n of lista) fallas += await control(n);
  if (JSON_) console.log(JSON.stringify(salida, null, 2));
  else console.log(primeros.length ? `\nPor dónde partir:\n${primeros.map((x) => `  • ${x}`).join("\n")}\n` : "\nNada que corregir ahora.\n");
  process.exit(fallas ? 1 : 0);
} else {
  console.log(`Uso:\n  ${CMD} camino <perfil> [--nuevo] [--todo]\n  ${CMD} confirmar <perfil> <id> [<id>…]\n  ${CMD} control <perfil|todos> [--vista-previa] [--rapido] [--todo]\nPerfiles: ${perfiles().join(", ") || "ninguno"}`);
}
