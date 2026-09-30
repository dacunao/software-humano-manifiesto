import { z } from 'astro/zod';

/**
 * Esquemas del contenido (data-model.md). Se validan con un lector propio en lugar de las
 * colecciones de Astro para poder probar las reglas con `bun test` (RQ-07, ajuste del 2026-09-27).
 */

export const LOCALES = ['es', 'en', 'pt-BR'] as const;
export type Locale = (typeof LOCALES)[number];

/** Estado editorial por idioma (PRD §27.1). `pendiente`: existe la entrada, falta el texto. */
export const EstadoEditorial = z.enum(['pendiente', 'borrador', 'aprobado']);

const firmaCoherente = (
  v: { state: string; text?: string | undefined; approvedBy?: string | undefined; approvedAt?: string | undefined },
  ctx: z.RefinementCtx,
  aprobado: string,
) => {
  if (v.state !== 'pendiente' && !v.text?.trim()) ctx.addIssue({ code: 'custom', message: `estado «${v.state}» sin texto` });
  if (v.state === aprobado && (!v.approvedBy || !v.approvedAt))
    ctx.addIssue({ code: 'custom', message: 'aprobado sin approvedBy y approvedAt' });
  if (v.state !== aprobado && (v.approvedBy || v.approvedAt))
    ctx.addIssue({ code: 'custom', message: 'approvedBy o approvedAt en una entrada no aprobada' });
};

export const TextoLocalizado = z
  .object({
    text: z.string().optional(),
    state: EstadoEditorial,
    approvedBy: z.string().optional(),
    approvedAt: z.string().optional(),
  })
  .strict()
  .superRefine((v, ctx) => firmaCoherente(v, ctx, 'aprobado'));
export type TextoLocalizado = z.infer<typeof TextoLocalizado>;

/** Texto en los tres idiomas. Las claves ausentes las reporta RV-08, no el esquema. */
export const Localizado = z
  .object({ es: TextoLocalizado.optional(), en: TextoLocalizado.optional(), 'pt-BR': TextoLocalizado.optional() })
  .strict();
export type Localizado = z.infer<typeof Localizado>;

export const TipoEntrada = z.enum(['explanation', 'example', 'counterexample', 'decision-test', 'inference', 'surface-text']);
export type TipoEntrada = z.infer<typeof TipoEntrada>;

export const Entrada = z
  .object({ id: z.string().min(1), type: TipoEntrada, derivedFrom: z.string().optional(), text: Localizado })
  .strict();
export type Entrada = z.infer<typeof Entrada>;

export const Bloque = z.discriminatedUnion('kind', [
  z.object({ kind: z.literal('entrada'), entrada: Entrada }).strict(),
  // Pasajes del núcleo: una lista de nodos o un rango en orden canónico. `breve`: cita fuera de su casa (§18.3, RV-13).
  z.object({
    kind: z.literal('canon'),
    nodos: z.array(z.string()).min(1).optional(),
    desde: z.string().optional(),
    hasta: z.string().optional(),
    breve: z.boolean().optional(),
  }).strict().refine((b) => !!b.nodos !== !!(b.desde && b.hasta), { message: 'canon: usar nodos o desde/hasta, no ambos' }),
  z.object({ kind: z.literal('principios') }).strict(),
  z.object({ kind: z.literal('estado-adaptacion') }).strict(),
  /** Enlace al editor (PRD v1.3 §18.4): solo se muestra si su sitio está en línea. */
  z.object({ kind: z.literal('editor') }).strict(),
  z.object({ kind: z.literal('comparacion'), sistema: Entrada, persona: Entrada }).strict(),
]);
export type Bloque = z.infer<typeof Bloque>;

export const SeccionSuperficie = z
  .object({
    id: z.string().min(1),
    title: Localizado,
    question: Localizado.optional(),
    /** Contenido de profundidad: se muestra dentro de un <details> (P04). */
    depth: z.array(Bloque).default([]),
    blocks: z.array(Bloque),
  })
  .strict();
export type SeccionSuperficie = z.infer<typeof SeccionSuperficie>;

/** Superficies del PRD v1.2 §18.1: Inicio, las nueve divisiones del manifiesto (RQ-15), SpecKit y Acerca de. */
export const ID_SUPERFICIES = ['inicio', 'mapa', 'manifiesto', 'principios', 'fundamento', 'construir', 'verificar', 'ejemplo', 'gobernanza', 'bolsillo', 'speckit', 'acerca'] as const;
export type IdSuperficie = (typeof ID_SUPERFICIES)[number];

export const Superficie = z
  .object({
    id: z.enum(ID_SUPERFICIES),
    title: Localizado,
    description: Localizado,
    /** Titular de portada: editorial, a prueba (decisión del 2026-09-27). Solo Inicio lo usa. */
    hero: z.object({ title: Localizado, text: Localizado }).strict().optional(),
    fr: z.array(z.string()),
    sections: z.array(SeccionSuperficie),
  })
  .strict();
export type Superficie = z.infer<typeof Superficie>;

export const CLAVES_PRINCIPIO = ['tension', 'significado', 'consecuencia', 'ejemplo', 'contraejemplo', 'prueba'] as const;

export const Principio = z
  .object({
    id: z.string().regex(/^P(0[1-9]|10)$/),
    canonicalNode: z.string(),
    chapter: z.string().optional(),
    jobStories: z.array(z.string()),
    requirements: z.array(z.string()),
    entries: z.record(z.string(), Entrada),
  })
  .strict();
export type Principio = z.infer<typeof Principio>;

export const Sitio = z
  .object({
    name: z.string(),
    domain: z.string(),
    author: z.object({ type: z.literal('Person'), name: z.string(), url: z.string().nullable() }).strict(),
    /** Editor del sitio (PRD v1.3 §18.4). `enLinea`: su sitio responde; sin eso no se enlaza. */
    publisher: z.object({ type: z.literal('Organization'), name: z.string(), url: z.string(), enLinea: z.boolean() }).strict(),
    licenses: z.object({ content: z.string(), code: z.string() }).strict(),
    contact: z.object({ email: z.string().nullable(), issues: z.string().nullable(), issuesSitio: z.string().nullable() }).strict(),
    core: z.object({ version: z.string(), date: z.string() }).strict(),
    analytics: z.object({ cloudflareToken: z.string().nullable() }).strict(),
  })
  .strict();
export type Sitio = z.infer<typeof Sitio>;

export const EstadoAdaptacion = z
  .object({
    version: z.string(),
    verifiedAt: z.string(),
    published: z.boolean(),
    limitations: Localizado,
    /** Solo cuando está publicada (RV-10, PRD §29.10). */
    repository: z.url().optional(),
    release: z
      .object({
        /** Versión del paquete publicado y del preset que contiene; `version` sigue siendo la instalada aquí. */
        version: z.string(),
        preset: z.string(),
        publishedAt: z.string(),
        page: z.url(),
        download: z.url(),
        sha256: z.string().regex(/^[0-9a-f]{64}$/),
      })
      .strict()
      .optional(),
  })
  .strict();
export type EstadoAdaptacion = z.infer<typeof EstadoAdaptacion>;

export const EstadoTraduccion = z.enum(['pendiente', 'borrador', 'en revisión', 'aprobada', 'potencialmente obsoleta']);

export const TraduccionNodo = z
  .object({
    sourceHash: z.string().length(64),
    state: EstadoTraduccion,
    text: z.string().optional(),
    approvedBy: z.string().optional(),
    approvedAt: z.string().optional(),
  })
  .strict()
  .superRefine((v, ctx) => firmaCoherente(v, ctx, 'aprobada'));
export type TraduccionNodo = z.infer<typeof TraduccionNodo>;

export const TraduccionesCanon = z
  .object({ locale: z.enum(['en', 'pt-BR']), entries: z.record(z.string(), TraduccionNodo) })
  .strict();
export type TraduccionesCanon = z.infer<typeof TraduccionesCanon>;

export const Cadenas = z.record(z.string(), Localizado);
export type Cadenas = z.infer<typeof Cadenas>;

const Firma = z.object({ by: z.string(), at: z.string() }).strict().nullable();
export const Revisiones = z
  .object({
    linguistica: z.object({ en: Firma, 'pt-BR': Firma }).strict(),
    neutralidad: z.object({ es: Firma }).strict(),
  })
  .strict();
export type Revisiones = z.infer<typeof Revisiones>;
