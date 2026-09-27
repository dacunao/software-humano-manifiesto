import type { Locale } from '../contenido/esquemas';

export type { Locale };

/** Conjunto cerrado de tres idiomas (data-model.md · Idioma). */
export const IDIOMAS: Record<Locale, { path: string; label: string; hreflang: string }> = {
  en: { path: '', label: 'English', hreflang: 'en' },
  es: { path: 'es', label: 'Español', hreflang: 'es' },
  'pt-BR': { path: 'pt-br', label: 'Português (Brasil)', hreflang: 'pt-BR' },
};

/** Orden de presentación en el selector. */
export const ORDEN_IDIOMAS: readonly Locale[] = ['en', 'es', 'pt-BR'];
export const IDIOMA_PREDETERMINADO: Locale = 'en';
