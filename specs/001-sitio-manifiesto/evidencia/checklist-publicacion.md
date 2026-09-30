# Checklist antes de publicar · SEO, AEO, GEO, medición y rendimiento

**Fecha:** 2026-09-30 · **Pedido de:** Damián Acuña · **Base:** auditoría de la construcción (69 páginas) contra PRD §24–§25, `FR-016`, `FR-018`, `AC-08`, `AC-11` y las guías de Google para buscadores.

Marcas:
- ✅ cumplido, con su evidencia;
- ⚠️ brecha que se corrige en el código;
- 👤 acción de Damián o paso posterior al despliegue.

El marcado y el rendimiento no garantizan posicionamiento ni aparecer en una respuesta generativa (PRD §25.3). Mejoran la posibilidad de que un buscador o un agente encuentre, entienda y cite bien el sitio.

## 1 · Identidad del sitio

| | Criterio | Estado |
|---|---|---|
| ✅ | Favicon | `favicon.ico` (16 y 32 px), `favicon.svg` (escala a cualquier tamaño; Google pide múltiplos de 48 px y el SVG lo cubre) y `apple-touch-icon.png` (180 px) |
| ✅ | Imagen para redes sociales | Una por idioma, 1200 × 630, con texto alternativo (`og:image`, `twitter:card`) |
| ✅ | Color del navegador | `theme-color` en claro y oscuro |

## 2 · SEO técnico

| | Criterio | Estado |
|---|---|---|
| ✅ | HTML renderizado en el servidor, sin depender de JavaScript | Sitio estático; prueba «sin JavaScript» en verde |
| ✅ | Una URL canónica por página e idioma | `rel=canonical` en las 66 páginas indexables |
| ✅ | `hreflang` recíproco con `x-default` | En todas las páginas y en el sitemap (264 alternativas); prueba unitaria |
| ✅ | `lang` en cada página | En todas |
| ✅ | Un solo `h1` y jerarquía coherente | 69 de 69; la tabla «En esta página» exige cada h2, h3 y h4 |
| ✅ | Descripciones específicas | 69 únicas, entre 50 y 165 caracteres |
| ✅ | Sitemap y robots | `sitemap.xml` con 66 URL; `robots.txt` permite todo y declara el sitemap |
| ✅ | Página de error sin indexar | Las tres 404 con `noindex` |
| ✅ | Enlaces internos sin destino roto | RV-11 detiene la construcción |
| ✅ | HTTPS y cabeceras de seguridad | HSTS, CSP, `nosniff`, `Referrer-Policy` y `Permissions-Policy` en `_headers` |
| ✅ | Títulos específicos en las portadas (PRD §25.2) | «Manifiesto · Human software development with AI» y sus versiones en español y portugués, aprobados por Damián el 2026-09-30 (T244) |
| ✅ | Fecha de modificación en el sitemap (`lastmod`) | La misma que muestra cada página; una prueba exige que coincidan (T245) |
| ✅ | Caché larga de archivos con huella | Un año e inmutable para `/_astro/*`; 30 días para las fuentes (T246) |
| ✅ | Títulos largos | Solo P09 en `es` y `pt-BR` supera 65 caracteres; Google lo recorta sin penalizar |

## 3 · Datos estructurados (JSON-LD)

| | Criterio | Estado |
|---|---|---|
| ✅ | `WebSite`, `WebPage`, `Person`, `Organization` | En todas las páginas, desde el mismo contenido visible |
| ✅ | `CreativeWork` del manifiesto con traducciones | `workTranslation` y `translationOfWork` |
| ✅ | `DefinedTermSet` y `DefinedTerm` de los diez principios | Con `P01`–`P10` |
| ✅ | `SoftwareSourceCode` de la adaptación | Desde el 2026-09-30, con el repositorio enlazado en la página (RV-12) |
| ✅ | Nada describe contenido inexistente | RV-12 detiene la construcción |
| 👤 | Validación con las herramientas de Google (T106) | Rich Results Test y Schema Markup Validator sobre la vista previa |
| 👤 | URL del autor (`sameAs`) | Pendiente desde T107: una página tuya, como LinkedIn, refuerza la autoría (E-E-A-T) |

## 4 · AEO y GEO · respuestas y motores generativos

| | Criterio | Estado |
|---|---|---|
| ✅ | Texto citable con URL estable por sección | Anclas por sección; «Copiar enlace» |
| ✅ | Definiciones breves y explícitas | Cada principio con su enunciado y su identificador |
| ✅ | El texto canónico se distingue de la explicación | Rótulos «Texto canónico» (PRD §25.4) |
| ✅ | Versión, autoría y fecha visibles y en el marcado | Pie, Acerca de y JSON-LD |
| ✅ | El núcleo completo, descargable en Markdown en los tres idiomas | `/descargas/` |
| ✅ | Los rastreadores de IA pueden entrar | `robots.txt` no bloquea a nadie |
| 👤 | **Cloudflare puede bloquear rastreadores de IA por defecto** | Al configurar el dominio, revisar «AI Crawl Control» / «Block AI bots» y el robots.txt administrado. Si quedan activos, ChatGPT, Claude o Perplexity no podrán leer ni citar el sitio |
| 👤 | Bing Webmaster Tools | Alimenta la búsqueda de ChatGPT y Copilot. Se importa desde Search Console en minutos |
| ✅ | `llms.txt` | Agregado por decisión de Damián (2026-09-30, T248), generado desde el contenido aprobado. No es un estándar: Google no lo usa y no hay evidencia firme de su efecto; algunos agentes lo leen al consultar un sitio |

## 5 · Google

| | Criterio | Estado |
|---|---|---|
| 👤 | Search Console como propiedad de dominio | Verificación con un registro TXT en el DNS de Cloudflare, después de asignar el dominio |
| 👤 | Enviar el sitemap | `https://manifiesto.softwarehumano.com/sitemap.xml` |
| 👤 | Pedir la indexación de las portadas y del Mapa | Inspección de URL, en los tres idiomas |
| 👤 | Revisar «Páginas» y «Experiencia» a las dos o tres semanas | Indexación, Core Web Vitals reales (CrUX) |

## 6 · Medición

| | Criterio | Estado |
|---|---|---|
| ✅ | Un solo script de terceros, sin cookies | Cloudflare Web Analytics, ya permitido en la CSP |
| 👤 | Token de Cloudflare Web Analytics | `analytics.cloudflareToken` en `src/content/sitio.yaml` está vacío: sin él no se mide nada. Se obtiene al crear el sitio en Cloudflare |
| 👤 | Search Console y CrUX sin script | Ver §5 |

## 7 · Rendimiento

| | Criterio | Estado |
|---|---|---|
| ✅ | Presupuestos de Lighthouse (`AC-08`) | 14 páginas, tres corridas: LCP 1.50–1.66 s, CLS ≤ 0.084, JavaScript ≤ 7.2 KB, rendimiento 97–100 |
| ✅ | Fuentes autoalojadas en subconjunto, con `swap` | Noto Sans, ≤ 100 KB |
| ✅ | Sin imágenes pesadas en el contenido | Solo SVG y las imágenes sociales |
| 👤 | Core Web Vitals de campo | CrUX, con tráfico real, tras el lanzamiento |

## 8 · Comprobaciones sobre la vista previa de Cloudflare

| | Criterio |
|---|---|
| 👤 | Las rutas sin extensión (`/about`, `/es/acerca`) responden 200 sin redirecciones encadenadas |
| 👤 | Una URL inexistente responde 404 con la página del idioma que corresponde |
| 👤 | Las cabeceras de `_headers` llegan tal cual (CSP, HSTS) |
| 👤 | La vista previa `*.pages.dev` no se indexa (Cloudflare envía `X-Robots-Tag: noindex` en las vistas previas); el dominio final sí |
| 👤 | Validación de datos estructurados (T106) |

## 9 · Puertas humanas que siguen abiertas

- Ronda final con personas (T103–T104).
- Lector de pantalla (T105).
- Aceptación antes de publicar (T111, PRD §34).
