import type { Locale } from '../contenido/esquemas';

export type { Locale };

/** Conjunto cerrado de tres idiomas (data-model.md · Idioma). */
/** `codigo`: rótulo visible compacto (PRD v1.4 §21.7); `label`: nombre completo, accesible y en `title`. */
export const IDIOMAS: Record<Locale, { path: string; label: string; codigo: string; hreflang: string }> = {
  en: { path: '', label: 'English', codigo: 'EN', hreflang: 'en' },
  es: { path: 'es', label: 'Español', codigo: 'ES', hreflang: 'es' },
  'pt-BR': { path: 'pt-br', label: 'Português (Brasil)', codigo: 'PT', hreflang: 'pt-BR' },
};

/** Orden de presentación en el selector. */
export const ORDEN_IDIOMAS: readonly Locale[] = ['en', 'es', 'pt-BR'];
export const IDIOMA_PREDETERMINADO: Locale = 'en';
