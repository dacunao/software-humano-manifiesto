// Catálogo de pasos de calidad. Cada paso dice a qué estándar reconocido adhiere, cuándo aplica según el perfil
// del producto y, si se puede, cómo se detecta en el repositorio. El control (control.ts) revisa lo publicado.
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { execFileSync } from "node:child_process";

export type Perfil = {
  nombre: string;
  carpeta: string; // carpeta del proyecto (puede empezar con ~)
  produccion?: string; // https://dominio
  vista_previa?: string;
  paginas: string[]; // rutas a medir, p. ej. ["/", "/privacidad"]
  stack: string;
  www: boolean; // si existe www que debe llevar a la raíz
  indexable: boolean;
  formulario: boolean;
  turnstile: boolean;
  turnstile_clave_en?: string; // ruta JSON que entrega la clave pública (si no, se busca data-sitekey en las páginas)
  base_de_datos: boolean;
  datos_personales: boolean;
  idiomas: number;
  panel_privado: boolean;
  pagos: boolean;
  confirmados?: string[]; // pasos manuales que el dueño ya confirmó
};

export type Estado = "hecho" | "falta" | "revisar";
export type Paso = {
  id: string; // corto y estable: con él se confirma un paso manual
  revisa?: "control"; // lo verifica `control` sobre lo publicado: no se confirma a mano
  etapa: "Antes de construir" | "Antes de publicar" | "Al publicar" | "Después de publicar";
  texto: string;
  norma: string;
  aplica: (p: Perfil) => boolean;
  detectar?: (repo: string, p: Perfil) => Estado;
};

const siempre = () => true;
const git = (repo: string, ...args: string[]) => {
  try { return execFileSync("git", ["-C", repo, ...args], { stdio: ["ignore", "pipe", "ignore"] }).toString().trim(); } catch { return null; }
};
const leer = (f: string) => (existsSync(f) ? readFileSync(f, "utf8") : "");
const hay = (repo: string, ...nombres: string[]) => nombres.some((n) => existsSync(join(repo, n)));
const wrangler = (repo: string) => leer(join(repo, "wrangler.jsonc")) || leer(join(repo, "wrangler.json")) || leer(join(repo, "wrangler.toml"));
const scripts = (repo: string): Record<string, string> => { try { return JSON.parse(leer(join(repo, "package.json"))).scripts ?? {}; } catch { return {}; } };
const raizGit = (repo: string) => git(repo, "rev-parse", "--show-toplevel") ?? repo;

export const PASOS: Paso[] = [
  // ---------------------------------------------------------------- Antes de construir
  { id: "remoto", etapa: "Antes de construir", texto: "Código con copia fuera del equipo (remoto en GitHub)", norma: "OpenSSF: control de versiones", aplica: siempre,
    detectar: (r) => (git(r, "remote") ? "hecho" : "falta") },
  { id: "secretos", etapa: "Antes de construir", texto: "Secretos fuera del repositorio: .env* ignorado y ningún .env versionado", norma: "OWASP Secrets Management · Twelve-Factor III", aplica: siempre,
    detectar: (r) => {
      const ignora = /^\.env/m.test(leer(join(raizGit(r), ".gitignore")));
      const versionados = (git(r, "ls-files") ?? "").split("\n").some((f) => /(^|\/)\.env(\.|$)|\.dev\.vars/.test(f) && !/\.example$/.test(f));
      return ignora && !versionados ? "hecho" : "falta";
    } },
  { id: "versiones", etapa: "Antes de construir", texto: "Dependencias con versiones fijadas (archivo de bloqueo)", norma: "OpenSSF Scorecard: Pinned-Dependencies", aplica: siempre,
    detectar: (r) => (hay(r, "bun.lock", "bun.lockb", "package-lock.json", "pnpm-lock.yaml", "yarn.lock", "uv.lock", "poetry.lock") ? "hecho" : "falta") },
  { id: "vista-previa", etapa: "Antes de construir", texto: "Vista previa privada, sin indexar y sin heredar rutas, base ni claves de producción", norma: "Twelve-Factor X: paridad de entornos", aplica: siempre,
    detectar: (r, p) => {
      const w = wrangler(r);
      if (!w) return "revisar";
      if (p.base_de_datos) return /"preview"[\s\S]*"routes"\s*:\s*\[\s*\][\s\S]*d1_databases/.test(w) || /"preview"[\s\S]*d1_databases[\s\S]*"routes"\s*:\s*\[\s*\]/.test(w) ? "hecho" : "falta";
      return /preview/.test(w) ? "hecho" : "revisar";
    } },
  { id: "base-vista-previa", etapa: "Antes de construir", texto: "Base de datos propia para la vista previa", norma: "Twelve-Factor X", aplica: (p) => p.base_de_datos,
    detectar: (r) => ((wrangler(r).match(/database_id/g) ?? []).length >= 2 ? "hecho" : "falta") },
  { id: "privacidad", etapa: "Antes de construir", texto: "Política de privacidad que dice qué datos se guardan, para qué y por cuánto tiempo", norma: "Ley 21.719 · RGPD art. 13", aplica: (p) => p.datos_personales },
  { id: "pagos", etapa: "Antes de construir", texto: "Pagos con un proveedor certificado; la tarjeta nunca pasa por tu servidor", norma: "PCI DSS", aplica: (p) => p.pagos },

  // ---------------------------------------------------------------- Antes de publicar
  { id: "comprobar", etapa: "Antes de publicar", texto: "Un comando que construye y se detiene ante errores (tipos, enlaces, presupuestos)", norma: "Entrega continua: compuerta de calidad", aplica: siempre,
    detectar: (r) => { const s = scripts(r); return s.comprobar || s["check:publish"] || s.test ? "hecho" : "falta"; } },
  { id: "accesibilidad", revisa: "control", etapa: "Antes de publicar", texto: "Accesibilidad sin infracciones automáticas, en teléfono y escritorio, claro y oscuro", norma: "WCAG 2.2 AA", aplica: siempre },
  { id: "lector-de-pantalla", etapa: "Antes de publicar", texto: "Teclado y lector de pantalla revisados por una persona en cada plantilla nueva", norma: "WCAG 2.2 AA", aplica: siempre },
  { id: "velocidad", revisa: "control", etapa: "Antes de publicar", texto: "Velocidad en teléfono: LCP ≤ 2,5 s, TBT ≤ 200 ms, CLS ≤ 0,1 (mediana de 3 corridas)", norma: "Core Web Vitals", aplica: siempre },
  { id: "cabeceras", revisa: "control", etapa: "Antes de publicar", texto: "Cabeceras de seguridad: HSTS, CSP sin código en línea, nosniff, Referrer-Policy, Permissions-Policy", norma: "OWASP Secure Headers", aplica: siempre },
  { id: "formulario-vista-previa", etapa: "Antes de publicar", texto: "Formulario probado de punta a punta en la vista previa, con claves de prueba", norma: "OWASP ASVS V5: validación", aplica: (p) => p.formulario },
  { id: "claves-de-prueba", revisa: "control", etapa: "Antes de publicar", texto: "Ninguna clave de prueba en producción ni clave por defecto en el código", norma: "OWASP Top 10 A05: configuración", aplica: (p) => p.turnstile },
  { id: "sin-inyeccion", etapa: "Antes de publicar", texto: "Lo que escribe el visitante nunca se inserta como código (textContent o plantillas que escapan; nunca innerHTML con datos)", norma: "OWASP Top 10 A03: inyección", aplica: (p) => p.formulario || p.panel_privado },
  { id: "validacion-servidor", etapa: "Antes de publicar", texto: "El servidor valida todo lo que recibe (tipo, largo y formato) y rechaza el resto", norma: "OWASP ASVS V5", aplica: (p) => p.formulario },
  { id: "origen-y-limite", etapa: "Antes de publicar", texto: "Los formularios aceptan envíos solo desde tu dominio y limitan los intentos por IP", norma: "OWASP Top 10 A04 · ASVS V11", aplica: (p) => p.formulario },
  { id: "csp-estricta", revisa: "control", etapa: "Antes de publicar", texto: "Política de seguridad (CSP) sin código en línea ('unsafe-inline')", norma: "CSP Nivel 3 · OWASP Secure Headers", aplica: siempre },
  { id: "dependencias-seguras", etapa: "Antes de publicar", texto: "Dependencias sin vulnerabilidades conocidas (bun audit o npm audit)", norma: "OWASP Top 10 A06", aplica: siempre,
    detectar: (r) => {
      if (!hay(r, "bun.lock", "bun.lockb")) return "revisar";
      try { execFileSync("bun", ["audit"], { cwd: r, stdio: "ignore", timeout: 60000 }); return "hecho"; } catch { return "falta"; }
    } },
  { id: "registros-sin-datos", etapa: "Antes de publicar", texto: "Los registros del servidor no guardan datos personales (correos, IP)", norma: "Ley 21.719 · OWASP Logging", aplica: (p) => p.datos_personales },
  { id: "pruebas-sin-produccion", etapa: "Antes de publicar", texto: "Las pruebas nunca envían datos ni consumen límites de producción", norma: "OWASP Testing Guide", aplica: (p) => p.formulario },
  { id: "migraciones-aditivas", etapa: "Antes de publicar", texto: "Migraciones aditivas, compatibles con el código anterior", norma: "Expand/contract (cambio en paralelo)", aplica: (p) => p.base_de_datos,
    detectar: (r) => (hay(r, "migrations", "drizzle", "prisma/migrations") ? "revisar" : "falta") },
  { id: "panel", etapa: "Antes de publicar", texto: "Panel privado protegido por identidad y fuera de buscadores", norma: "OWASP Top 10 A01: control de acceso", aplica: (p) => p.panel_privado },
  { id: "idiomas", etapa: "Antes de publicar", texto: "Cada idioma con hreflang recíproco y traducción verificada", norma: "Google: sitios multilingües", aplica: (p) => p.idiomas > 1 },
  { id: "datos-estructurados", etapa: "Antes de publicar", texto: "Datos estructurados solo de lo que la página muestra, sin errores", norma: "schema.org · Google Search Essentials", aplica: (p) => p.indexable },
  { id: "aceptacion", etapa: "Antes de publicar", texto: "Revisas la vista previa en teléfono y escritorio, y la apruebas", norma: "Aceptación del dueño", aplica: siempre },

  // ---------------------------------------------------------------- Al publicar
  { id: "main", etapa: "Al publicar", texto: "Publicar desde main, sin cambios sin guardar y con el commit subido", norma: "Entrega continua: lo publicado está en la historia", aplica: siempre,
    detectar: (r) => {
      const rama = git(r, "branch", "--show-current"), sucio = git(r, "status", "--porcelain"), sinSubir = git(r, "log", "--oneline", "@{u}..");
      if (rama === null) return "revisar";
      return rama === "main" && !sucio && sinSubir === "" ? "hecho" : "falta";
    } },
  { id: "migracion-primero", etapa: "Al publicar", texto: "Migración de la base antes del código", norma: "Expand/contract", aplica: (p) => p.base_de_datos },
  { id: "volver-atras", etapa: "Al publicar", texto: "Volver atrás ensayado al menos una vez", norma: "DORA: tiempo de recuperación", aplica: siempre },
  { id: "registro", etapa: "Al publicar", texto: "Cada publicación anotada: commit, versión y versión anterior", norma: "Trazabilidad (DORA)", aplica: siempre,
    detectar: (r) => {
      const docs = join(raizGit(r), "docs");
      const enDocs = existsSync(docs) && readdirSync(docs, { recursive: true }).some((f) => /registro/i.test(String(f)));
      return enDocs || existsSync(join(r, "docs")) && readdirSync(join(r, "docs")).some((f) => /registro/i.test(f)) ? "hecho" : "falta";
    } },
  { id: "indexnow", etapa: "Al publicar", texto: "Avisar a los buscadores (IndexNow)", norma: "IndexNow", aplica: (p) => p.indexable },

  // ---------------------------------------------------------------- Después de publicar
  { id: "buscadores", etapa: "Después de publicar", texto: "Sitemap enviado a Google Search Console y Bing", norma: "Sitemaps.org · Google Search Essentials", aplica: (p) => p.indexable },
  { id: "visitas-reales", revisa: "control", etapa: "Después de publicar", texto: "Revisar visitas reales (CrUX) cuando haya tráfico: p75 LCP, INP y CLS", norma: "Core Web Vitals", aplica: siempre },
  { id: "formulario-produccion", etapa: "Después de publicar", texto: "Probar tú el formulario una vez en producción (nunca automatizado)", norma: "Turnstile: no eludir", aplica: (p) => p.turnstile },
];
