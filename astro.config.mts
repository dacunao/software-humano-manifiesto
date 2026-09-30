import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import validacion from './src/integrations/validacion';

// Sitio estático. Inglés sin prefijo; español en /es/ y portugués de Brasil en /pt-br/
// (FR-019). Sin redirección por idioma del navegador (FR-020): las rutas localizadas
// son páginas propias según specs/001-sitio-manifiesto/contracts/rutas.md.
export default defineConfig({
  output: 'static',
  site: 'https://manifiesto.softwarehumano.com', // debe coincidir con src/content/sitio.yaml (T228)
  trailingSlash: 'never',
  build: { format: 'file' },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es', { path: 'pt-br', codes: ['pt-BR'] }],
    routing: { prefixDefaultLocale: false, redirectToDefaultLocale: false },
  },
  integrations: [validacion()],
  // Scripts siempre externos: la CSP (public/_headers) solo admite script-src 'self'.
  vite: { plugins: [tailwindcss()], build: { assetsInlineLimit: 0 } },
});
