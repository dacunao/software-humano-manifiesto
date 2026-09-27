import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Sitio estático. Inglés sin prefijo; español en /es/ y portugués de Brasil en /pt-br/
// (FR-019). Sin redirección por idioma del navegador (FR-020): las rutas localizadas
// son páginas propias según specs/001-sitio-manifiesto/contracts/rutas.md.
export default defineConfig({
  output: 'static',
  site: 'https://softwarehumano.com',
  trailingSlash: 'never',
  build: { format: 'file' },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es', { path: 'pt-br', codes: ['pt-BR'] }],
    routing: { prefixDefaultLocale: false, redirectToDefaultLocale: false },
  },
  vite: { plugins: [tailwindcss()] },
});
