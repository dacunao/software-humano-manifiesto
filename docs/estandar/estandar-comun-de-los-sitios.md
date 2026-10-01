# Estándar común de los sitios de Software Humano

**Estado:** aprobado por Damián Acuña el 2026-10-01. Rige para todos los sitios.
**Gobierno:** la sesión del sitio del Manifiesto, que es la implementación de referencia, lo mantiene y lo acuerda con las sesiones de los otros proyectos. **Damián aprueba** cada cambio.
**Insumo:** la propuesta de la sesión del sitio de la agencia (B1–B15, 2026-10-01), contrastada con la implementación de referencia.
**Fecha:** 2026-10-01.

Las rutas se refieren al repositorio de referencia, `https://github.com/dacunao/software-humano-manifiesto`.

---

## 1 · Reglas

1. **El sitio del Manifiesto es la implementación de referencia.** Un sitio nuevo copia cada elemento común tal como está ahí, y solo adapta lo que su contexto exige: rutas, textos y páginas.
2. **Hay un set común, obligatorio para todos.** Es la sección 2. No se varía por sitio.
3. **Cada proyecto puede tener un anexo propio, opcional y declarado,** para necesidades que el set común no cubre (sección 3). El anexo:
   - se declara en el `AGENTS.md` del proyecto y en la sección 3 de este documento;
   - dice qué agrega y, si algo del set común no le aplica o lo precisa, qué y por qué;
   - rige solo en ese proyecto.
4. **Una mejora al set común** se propone a Damián. Si la aprueba, se aplica primero en la referencia, después en los demás sitios, y se registra en la sección 5. Ningún sitio la adelanta por su cuenta.
5. **Un defecto del set común se corrige en todos los sitios,** no solo en el que lo encontró.
6. **Si otro sitio necesita una pieza de un anexo, la copia tal cual y la pieza pasa al set común.** Así no hay dos búsquedas ni dos índices distintos.
7. **Este documento vive solo aquí.** Los demás proyectos lo enlazan; no lo copian.

---

## 2 · Set común

| # | Elemento | Qué fija | Referencia |
|---|---|---|---|
| B1 | **Selector de idioma** | EN · ES · PT con código corto visible, sin banderas. Nombre accesible «CÓDIGO, Nombre» (WCAG 2.5.3), con el nombre completo en `title`. `lang` y `hreflang` por enlace, `aria-current` en el activo. Lleva a la URL equivalente y conserva la posición en la página. Funciona sin JavaScript | `src/components/SelectorIdioma.astro` |
| B2 | **Preferencia de idioma** | Clave `sh-idioma` en el almacenamiento local, siempre dentro de `try/catch`. Solo `/` abierto desde fuera del sitio lleva al idioma guardado; una URL localizada explícita prevalece. Sin redirección por el idioma del navegador | `src/cliente/preferencia-idioma.ts` |
| B3 | **Rutas por idioma** | Inglés estadounidense en la raíz, español neutro latinoamericano en `/es`, portugués de Brasil en `/pt-br`, con `pt-BR` en los metadatos | `src/lib/i18n/` |
| B4 | **Tema claro u oscuro** | Atributo `data-tema` (`claro` u `oscuro`) en `<html>`; clave `sh-tema`. Sin elección rige el sistema. `public/tema.js` es el **primer script del `<head>`, como archivo aparte**: la política de seguridad no admite scripts en línea. El control va en la cabecera; «Usar el tema del sistema» aparece en el pie solo después de elegir un tema a mano | `public/tema.js`, `src/cliente/tema.ts`, `src/components/ControlTema.astro` |
| B5 | **Tokens de color y tema** | Los tokens oscuros se activan con `:root:not([data-tema='claro'])` dentro de `prefers-color-scheme: dark` y con `:root[data-tema='oscuro']`. Los valores son los de la especificación visual compartida | `src/styles/tokens.css` |
| B6 | **Metadatos de página** | `title` y `description` específicos por página e idioma; la portada con título descriptivo, no solo el nombre. `canonical`, `hreflang` recíprocos con `x-default`, `theme-color` claro y oscuro, favicons (`.ico` 16/32, `.svg`, `apple-touch-icon` 180 px), `<meta name="author">` | `src/layouts/Base.astro` |
| B7 | **Open Graph y Twitter** | `og:title`, `og:description`, `og:url`, `og:image` de 1200 × 630 con ancho, alto, tipo y texto alternativo; `og:locale` como `en_US`, `es_LA`, `pt_BR` más sus alternas; `twitter:card` `summary_large_image` | `src/layouts/Base.astro`, `public/social/` |
| B8 | **Datos estructurados (JSON-LD)** | `WebSite` solo en la portada; `WebPage` en todas, con `inLanguage`, `dateModified`, `author` y `publisher`. Autor: `Person` con `@id` `https://softwarehumano.com/#autor`, `name` «Damián Acuña» y su LinkedIn en `sameAs`. Editor: `Organization` con `@id` `https://softwarehumano.com/#organizacion`, `name`, `url`, `logo` y un `contactPoint` propio de cada sitio, con su correo y su propósito en `contactType` («Manifesto inquiries» en el Manifiesto); sin `email` suelto. Los mismos `@id` en todas las páginas, idiomas y sitios. Sin `Product`, `Service` ni `Offer`. Se genera desde el mismo contenido visible; la construcción se detiene si declara algo que la página no muestra. Excepción común: el autor se declara en todas las páginas aunque su nombre se vea solo en Acerca de | `src/lib/semantica/jsonld.ts`, `src/lib/validacion/salida.ts` (RV-12) |
| B9 | **`llms.txt`** | Encabezado con el **nombre del sitio** («Manifiesto»; «Software Humano» en la agencia), la descripción, una sección por idioma con sus páginas y descripciones, y la descarga o el recurso principal. El sitio hermano se enlaza en «Optional» una vez publicado. Generado desde el contenido aprobado, sin texto propio; una prueba exige que cada enlace exista | `src/pages/llms.txt.ts` |
| B10 | **`robots.txt` y sitemap** | No bloquea a ningún rastreador, tampoco a los de IA, y declara el sitemap. Sitemap con alternas por idioma y `lastmod` igual al `dateModified` de cada página. En Cloudflare, rastreadores de IA en «Allow» y Bot Preference Sync desactivado | `public/robots.txt`, `src/pages/sitemap.xml.ts` |
| B11 | **Cabeceras de seguridad y caché** | CSP restrictiva (solo `'self'`, `'wasm-unsafe-eval'` si hay búsqueda, y Cloudflare Web Analytics), HSTS, `nosniff`, `Referrer-Policy`, `Permissions-Policy`, `frame-ancestors 'none'`. Caché de un año e inmutable para los archivos con huella | `public/_headers` |
| B12 | **Medición** | Cloudflare Web Analytics como único script de terceros: sin cookies, instalación manual y un sitio propio por dominio. Las pruebas locales no lo cargan, y el presupuesto de JavaScript mide solo el código propio | `src/layouts/Base.astro`, `playwright.config.ts`, `lighthouserc.json` |
| B13 | **Pila, calidad y publicación** | Astro estático, TypeScript estricto, Tailwind con daisyUI sobre tokens propios, Bun. Presupuestos por página: LCP ≤ 2,5 s, CLS ≤ 0,1, JavaScript propio ≤ 10 KB, tipografías ≤ 100 KB, CSS ≤ 50 KB. WCAG 2.2 AA, con pruebas automáticas (axe). Cloudflare Workers con archivos estáticos y subida directa: construcción, pruebas y comprobación previa; vista previa; aceptación de Damián; publicación con vuelta atrás | `astro.config.mts`, `lighthouserc.json`, `wrangler.jsonc`, `specs/001-sitio-manifiesto/evidencia/tecnica.md` |
| B14 | **Verificación de traducción** | Cuatro capas, obligatorias para todo el contenido y antes de publicar un idioma, con el español como referencia. Roles fijos: **ChatGPT traduce, Claude revisa** las capas 3 y 4, **DeepL** da el contraste. El servicio corre por archivos desde el repositorio de referencia y se detiene si traductor y revisor son de la misma familia. Aprobación humana de los tres idiomas | `scripts/traduccion/readme.ts`, `specs/001-sitio-manifiesto/research.md` (RQ-19) |
| B16 | **Cabecera y menú** | La barra superior queda fija al desplazarse, en todos los anchos. En el teléfono, la cabecera mide 56 px: marca a la izquierda, búsqueda y tema como íconos de 44 × 44 px, y «Menú» plegable con `details` y `summary`, que funciona sin JavaScript. Al abrirlo, el panel flota sobre el contenido, a todo el ancho, justo debajo de la cabecera, sin empujar la página. En pantallas anchas, el menú está siempre visible | `src/layouts/Base.astro` (`.barra-superior`), `src/components/NavegacionGlobal.astro`, sección «Teléfonos» de `src/styles/global.css` |
| B15 | **Autoría y nombres** | Autor «Damián Acuña», igual en todos los sitios, con su página de autor en LinkedIn. «Software Humano» no se traduce; en portugués, «a Software Humano» | `src/content/sitio.yaml` |

**La especificación visual compartida**, `docs/design/Software_Humano_Especificacion_Visual_v1.0.1.md` (SHA-256 `b6175ff7708bcc0a9ccfaf86cb27ad4d22ad1edbdd6d35d59dfb2e1930d921e2`), es la fuente del aspecto visual de todos los sitios; hay una sola copia común. Este estándar no la repite; fija cómo se implementa.

**La configuración de Cloudflare** tiene su baseline y su registro en `docs/estandar/cloudflare.md`.

---

## 3 · Anexos por proyecto

| Proyecto | Anexo | Qué agrega o precisa | Estado |
|---|---|---|---|
| `website-software-humano` (Manifiesto) | Piezas propias de un sitio de lectura larga | • **Búsqueda** Pagefind autoalojada, con teclado y «Limpiar»: `src/components/Busqueda.astro`, `src/cliente/busqueda.ts`<br>• **Navegación de lectura:** índice de páginas a la izquierda, «En esta página» a la derecha con seguimiento de la sección y «Contenido» plegable en el teléfono: `src/components/IndiceLateral.astro`, `src/components/EnEstaPagina.astro`, `src/cliente/seguimiento.ts`<br>• **Recorrido:** anterior y siguiente, y el cierre con los pasos que siguen: `src/components/AnteriorSiguiente.astro`<br>• **Copiar enlace a una sección:** `src/cliente/compartir.ts`<br>• **Texto canónico** leído del núcleo y no copiado, con sus citas y la descarga en tres idiomas: `src/lib/canon/`, `src/pages/descargas/`<br>• **Huella de construcción** en el pie y **estado de la adaptación:** `src/components/Procedencia.astro`, `src/components/EstadoAdaptacion.astro` | Declarado (2026-10-01) |
| `agencia-software-humano` | Anexo del sitio comercial a la especificación visual | El flywheel: tonos propios de las flechas (`--sh-ciclo-*`) con su contraste; Prisma abarca Aprender y Comprender y Catalizador abarca Decidir y Ejecutar, mostrados como arcos por fuera del círculo; reglas de interacción y un criterio de aceptación. **Precisa** la regla de §7.9 de la especificación común («Comprender — Prisma», «Ejecutar — Catalizador») para el sitio comercial | Declarado (2026-10-01). Vive en un archivo propio del repositorio de la agencia, que lo separa de su copia de la especificación; la copia común queda idéntica a la v1.0.1 |

---

## 4 · Lo que puede variar por sitio sin anexo

- Contenido, páginas y rutas propias.
- **El correo de contacto:** cada sitio tiene el suyo según su propósito (decisión de Damián, 2026-10-01), declarado como `contactPoint` (B8).
- La imagen social y los textos que dependen de ella.

---

## 5 · Registro de decisiones

| Fecha | Decisión de Damián Acuña |
|---|---|
| 2026-10-01 | Una sola forma de hacer cada cosa; el Manifiesto es la implementación de referencia |
| 2026-10-01 | JSON-LD de autor y editor con `@id` comunes y `sameAs`, la forma que propuso la agencia (B8). Aplicado en la referencia (commit `d44277b`) |
| 2026-10-01 | Nombre accesible del selector de idioma con el código visible (B1). Corregido en la referencia (commit `5d10a8f`) y en la agencia por su sesión |
| 2026-10-01 | El autor se declara en el JSON-LD de todas las páginas aunque solo se vea en Acerca de (B8) |
| 2026-10-01 | El correo de contacto es propio de cada sitio |
| 2026-10-01 | Un set común obligatorio y, por proyecto, un anexo opcional y declarado; el Manifiesto declara el suyo (búsqueda, navegación de lectura, recorrido, enlace a la sección, texto canónico, huella y estado de la adaptación). Una pieza de anexo que otro sitio necesite pasa al set común |
| 2026-10-01 | El estándar vive en el repositorio de referencia y lo gobierna su sesión |
| 2026-10-01 | Verificación de traducción con roles fijos: ChatGPT traduce, Claude revisa, DeepL contrasta (B14) |
| 2026-10-01 | Se aprueba este estándar con sus dos anexos |
| 2026-10-01 | Especificación visual v1.0.1: solo cambia el selector del modo oscuro a `data-tema`; una sola copia común; el flywheel va al anexo de la agencia |
| 2026-10-01 | Correo en el JSON-LD: la `Organization` no lleva un correo suelto; cada sitio declara el suyo como `contactPoint`, con su propósito (B8) |
| 2026-10-01 | Email Address Obfuscation apagado en la zona compartida (`docs/estandar/cloudflare.md`) |
| 2026-10-01 | B16 · Cabecera fija y menú flotante en el teléfono, como en el Manifiesto (observación de Damián sobre la agencia) |

---

## 6 · Pendiente

Nada pendiente de Damián al 2026-10-01. Pendiente de la sesión de la agencia: separar el anexo del sitio comercial de su copia de la especificación y dejar esa copia idéntica a la v1.0.1.
