# Evidencia técnica

**Fecha:** 2026-09-28 · **Tareas:** T088–T092 y T097 · **Origen:** hallazgo H2 de la revisión con el manifiesto, aceptado por Damián Acuña.
**Alcance:** 66 páginas de contenido y 3 páginas 404, con el sistema visual aprobado (T171) aplicado.

Esta evidencia es técnica. **No es aceptación del producto** (`AGENTS.md`, regla 8): falta la revisión con lector de pantalla (T105), la revisión de idiomas y la aceptación humana.

## Ejecución (T092, `O08`)

| Paso | Resultado |
|---|---|
| `bun run build` | 69 páginas; 0 errores de tipos; `RV-01`–`RV-14` en verde; índice de búsqueda: 59 páginas en 3 idiomas |
| `bun test tests/unit` | 54 pruebas, 0 fallos |
| `bunx playwright test` | 747 aprobadas, 0 fallos (las omitidas son combinaciones que no aplican a un proyecto, por ejemplo axe sin JavaScript) |
| `bunx lhci autorun` | 14 páginas × 3 ejecuciones; todos los presupuestos cumplidos |

## Sin JavaScript y sin estilos (T088, `FR-015`, PRD §21.4)

Las 66 páginas, con JavaScript desactivado, muestran su texto, la navegación principal y anclas que llevan a un destino existente. Sin hojas de estilo, el orden es: saltar al contenido, cabecera, contenido y pie, y el primer título es un h1.

**Defecto encontrado y corregido.** En 18 páginas de división (6 por idioma), algunos títulos citados del núcleo saltaban niveles; por ejemplo, en Verificar se pasaba de h2 a h5 en «Una advertencia sobre la simplicidad». Quien navega por títulos con un lector de pantalla perdía la jerarquía (WCAG 1.3.1). Causa: el nivel se calculaba como el del núcleo más uno fijo, sin mirar dónde quedaba la cita. Ahora `CitaCanonica` calcula el nivel según el contexto y nunca salta un nivel al descender.

## Accesibilidad automática (T089, `AC-07`, parte automática)

- axe (WCAG 2.0, 2.1 y 2.2, niveles A y AA): **0 violaciones** en las 69 páginas, en escritorio y en móvil.
- Contraste en tema claro y oscuro: 0 violaciones en 4 páginas representativas.
- Teclado: «Ir al contenido» es lo primero que se enfoca; al recorrer Construir con IA, el foco siempre es visible (contorno ≥ 2 px) y la cabecera fija no lo tapa (WCAG 2.4.11). La búsqueda se abre y se cierra con el teclado, y el foco vuelve al botón.
- Objetivos interactivos de al menos 44 × 44 px en las 66 páginas, en escritorio y en móvil.

## Bordes (T090)

| Borde | Resultado |
|---|---|
| 404 por idioma | Cada página 404 declara su idioma y enlaza al inicio de ese idioma; una URL inexistente responde 404. Que `/es/…` sirva la 404 en español depende de Cloudflare Pages (usa la 404 más cercana en la ruta) y se comprueba al publicar |
| Redirecciones | `public/_redirects` se valida (formato y destino existente). Hoy no tiene líneas: todavía no hay URLs publicadas que redirigir |
| Reflow a 320 px | Sin desplazamiento horizontal en las 66 páginas |
| Zoom al 200 % | Sin desplazamiento horizontal en 4 páginas representativas |
| Tipografía bloqueada | La página se lee con la tipografía del sistema |
| Analítica bloqueada | Sin errores; ninguna de las 66 páginas pide datos personales (`FR-018`, `AC-12`) |
| URL profunda | Restituye la sección y su título queda bajo la cabecera fija (`FR-014`) |
| Almacenamiento | Sin cookies ni `sessionStorage`; en `localStorage`, solo `sh-idioma` y `sh-tema` (PRD §24.3 y la preferencia de tema de la v1.4) |

## Rendimiento (T091, `AC-08`)

Presupuestos de `lighthouserc.json`: LCP ≤ 2,5 s, TBT ≤ 200 ms, CLS ≤ 0,1, JavaScript ≤ 10 KB, tipografías ≤ 100 KB y CSS ≤ 50 KB por página. La lista de páginas medidas se actualizó a las rutas de las divisiones (antes incluía rutas que ya no existen). Mediana de tres ejecuciones, en laboratorio:

| Página | LCP | TBT | CLS | JS | Tipografía | CSS | Rendimiento |
|---|--:|--:|--:|--:|--:|--:|--:|
| `/` | 1,65 s | 0 ms | 0,000 | 5,8 KB | 35,3 KB | 16,0 KB | 99 |
| `/manifesto` | 1,66 s | 0 ms | 0,006 | 6,7 KB | 35,3 KB | 16,0 KB | 99 |
| `/manifesto/building-with-ai` | 1,66 s | 0 ms | 0,031 | 6,7 KB | 35,3 KB | 16,0 KB | 99 |
| `/principles` | 1,65 s | 0 ms | 0,008 | 6,7 KB | 35,3 KB | 16,0 KB | 99 |
| `/principles/p06` | 1,66 s | 0 ms | 0,006 | 6,7 KB | 35,3 KB | 16,0 KB | 99 |
| `/speckit` | 1,66 s | 0 ms | 0,003 | 5,8 KB | 35,3 KB | 16,0 KB | 99 |
| `/about` | 1,65 s | 0 ms | 0,007 | 5,8 KB | 35,3 KB | 16,0 KB | 99 |
| `/es` | 1,66 s | 0 ms | 0,000 | 5,8 KB | 35,3 KB | 16,0 KB | 99 |
| `/es/manifiesto` | 1,65 s | 0 ms | 0,023 | 6,7 KB | 35,3 KB | 16,0 KB | 99 |
| `/es/manifiesto/verificar` | 1,66 s | 0 ms | 0,005 | 6,7 KB | 35,3 KB | 16,0 KB | 99 |
| `/es/principios/p01` | 1,65 s | 0 ms | 0,026 | 6,7 KB | 35,3 KB | 16,0 KB | 99 |
| `/pt-br` | 1,66 s | 0 ms | 0,001 | 5,8 KB | 35,3 KB | 16,0 KB | 99 |
| `/pt-br/manifesto` | 1,66 s | 0 ms | 0,029 | 6,7 KB | 35,3 KB | 16,0 KB | 99 |
| `/pt-br/principios/p01` | 1,66 s | 0 ms | 0,020 | 6,7 KB | 35,3 KB | 16,0 KB | 99 |

Límite de esta evidencia: es laboratorio con red simulada. TBT aproxima INP; el INP y el LCP reales se verifican con CrUX y Search Console tras el lanzamiento (PRD §24.3).

## Profundidad progresiva (informe RQ-13, sin umbral)

Proporción de palabras visibles sin abrir ningún desplegable, en español (los otros idiomas siguen el mismo patrón). **Es un dato para el juicio de la autoridad sobre `AC-05`, no un criterio** (RQ-13).

| Página | Palabras | Visibles sin abrir |
|---|--:|--:|
| Inicio, Acerca de, SpecKit y las nueve divisiones | 356–2005 | 100 % |
| Principios (índice) | 333 | 48 % |
| P01–P10 | 357–613 | 65–75 % |

Las divisiones muestran todo su texto; la profundidad está en las páginas de principio, donde los pasajes largos del núcleo quedan plegados. El piloto anterior tenía 3 % visible.

## Lo que esta evidencia no cubre

- Lector de pantalla y revisión manual de accesibilidad: T105, humana.
- Rendimiento con personas reales: CrUX tras el lanzamiento.
- Idiomas: las páginas `en` y `pt-BR` todavía mezclan español hasta completar T084 y sus revisiones (T098–T102).

## Actualización del 2026-09-29 (T197)

Con el contenido aprobado en los tres idiomas y la nueva Acerca del Manifiesto: construcción con 69 páginas y `RV-01`–`RV-14` en verde; índice de búsqueda con 63 páginas; 64 pruebas unitarias y 759 de extremo a extremo aprobadas, incluidas la de neutralidad del español (T098) y la de Acerca de (T198). Lighthouse sobre las mismas 14 páginas, todos los presupuestos cumplidos: LCP entre 1.65 s y 1.66 s, CLS máximo 0.083, JavaScript máximo 6.7 KB y puntaje de rendimiento entre 97 y 99.

## Actualización del 2026-09-29 (T224)

Después de la navegación estándar (fase 31), el recorrido contra los principios (fase 32) y el cambio de la ruta inglesa a `/manifesto/worked-example` (T220): construcción con 69 páginas y `RV-01`–`RV-14` en verde; índice de búsqueda con 63 páginas; 65 pruebas unitarias y 797 de extremo a extremo aprobadas (959 omitidas a propósito por proyecto: teléfono, sin JavaScript o movimiento reducido). Lighthouse sobre las mismas 14 páginas, tres corridas cada una, con todos los presupuestos cumplidos: LCP entre 1.50 s y 1.66 s, CLS máximo 0.084, JavaScript máximo 7.2 KB y rendimiento entre 97 y 100. Las páginas `en` y `pt-BR` ya no mezclan español: el contenido está aprobado en los tres idiomas.

## Despliegue en Cloudflare (T249–T251, 2026-09-30)

Plataforma: Cloudflare Workers con archivos estáticos, por subida directa (decisiones de Damián Acuña, 2026-09-30). Configuración en `wrangler.jsonc`: `dist/` como archivos estáticos, `html_handling: drop-trailing-slash`, `not_found_handling: 404-page`, sin dirección `workers.dev` pública (`workers_dev: false`) y con direcciones por versión (`preview_urls: true`). Wrangler fijado en 4.144.0 (`bunx wrangler@4.144.0`).

**Comprobado en la vista previa** `https://vista-previa-manifiesto.dacunao.workers.dev`:
- las rutas de las superficies y los principios en los tres idiomas responden 200; `/about/` y `/about.html` redirigen a `/about` (307);
- una ruta inexistente responde 404 con la página del idioma que corresponde (`/es/…` → `lang="es"`);
- llegan todas las cabeceras de `public/_headers`: CSP, HSTS, `nosniff`, `Referrer-Policy`, `Permissions-Policy`; `/_astro/*` con caché de un año e inmutable; `llms.txt` como texto UTF-8;
- Cloudflare agrega `X-Robots-Tag: noindex` en la vista previa: no se indexa.

**Procedimiento:**

```bash
bun run build && bun test tests/unit && bunx playwright test && bun run check:publish
# Vista previa (no toca producción):
bunx wrangler@4.144.0 versions upload --preview-alias vista-previa --message "<commit>"
# Publicar una versión revisada (solo con la aceptación de Damián, T111):
bunx wrangler@4.144.0 versions deploy <id-de-versión>@100% --message "<commit>"
# Volver a la versión anterior:
bunx wrangler@4.144.0 rollback <id-de-versión-anterior> --message "<motivo>"
bunx wrangler@4.144.0 deployments list
```

**Vuelta atrás probada** mientras el proyecto no tenía ruta pública: se desplegó la versión `81fcc623` al 100 % y se volvió a `6e6ea055` con `rollback`; `deployments list` confirma la versión activa. Cada operación tarda menos de un segundo.
