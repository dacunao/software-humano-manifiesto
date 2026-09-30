import type { APIRoute } from 'astro';
import { alternas, paginasDeContenido, ruta } from '../lib/i18n/rutas';
import { ORDEN_IDIOMAS } from '../lib/i18n/idiomas';
import { archivosDePagina, fechaActualizacion, URL_SITIO } from '../lib/sitio';

/** Las 66 páginas de contenido con sus alternas por idioma; sin las 404 (FR-016). */
export const GET: APIRoute = () => {
  const urls = paginasDeContenido().flatMap((p) =>
    ORDEN_IDIOMAS.map((l) => {
      const alt = alternas(p)
        .map((a) => `    <xhtml:link rel="alternate" hreflang="${a.hreflang}" href="${URL_SITIO}${a.ruta}"/>`)
        .join('\n');
      return `  <url>\n    <loc>${URL_SITIO}${ruta(p, l)}</loc>\n    <lastmod>${fechaActualizacion(archivosDePagina(p))}</lastmod>\n${alt}\n  </url>`;
    }),
  );
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
