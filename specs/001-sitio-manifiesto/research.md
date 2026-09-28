# Research · Sitio del Manifiesto de Software Humano

**Fase 0 de `/speckit-plan`** · 2026-09-27 · Fuente: [spec.md](spec.md) y PRD v1.0.

Cada decisión técnica se adopta dentro de la autoridad que da el PRD §2.3: es reversible y no altera alcance, contenido, experiencia, seguridad, derechos ni posicionamiento. Las dos que rozan la experiencia (RQ-04 y RQ-05) las confirmó Damián Acuña el 2026-09-27 y figuran en el registro de decisiones de [plan.md](plan.md).

Los identificadores `RQ-` son propios de este proyecto. No continúan los del piloto anterior.

---

## RQ-01 · Cómo obtiene el sitio el texto canónico

- **Decision**: la construcción lee `docs/method/Manifiesto_Software_Humano_IA_Nucleo_v2.1.md` y lo descompone en **nodos canónicos**, cada uno con un identificador estable. Los 18 anclajes del archivo (`sh-index`, `p01`–`p10`, `sh-fund`, `sh-stop`, `sh-score`, `sh-ap`, `sh-gov`, `sh-done`, `sh-pocket`) se conservan como anclas públicas. Los identificadores que el núcleo solo escribe en tablas (`D01`–`D06`, `F01`–`F08`, `A01`–`A08`, `CR01`–`CR08`, `O01`–`O09`, `V01`–`V12`, `STOP01`–`STOP07`) reciben un ancla derivada en minúsculas (`#d01`). El resto de los nodos reciben un identificador derivado de su sección y su posición. La construcción **fija la huella SHA-256 del archivo** (`9beef610…`) y se detiene si cambia.
- **Rationale**: decisión de la autoridad del 2026-09-27; PRD §19.1 (fuente = núcleo), `AC-03` por construcción, §27.2 (una versión nueva no sobrescribe en silencio). Las anclas derivadas cumplen `JS-05` («cualquier sección canónica se alcanza directamente»).
- **Alternatives considered**: copiar el texto al YAML (descartada por la autoridad: dos copias divergen); anclas solo en los 18 anclajes existentes (descartada: `D01` o `CR03` no serían citables directamente).

## RQ-02 · Traducciones del texto canónico

- **Decision**: las versiones `en` y `pt-BR` del núcleo viven en YAML, **una entrada por nodo canónico**, con el mismo identificador. Cada entrada guarda la huella del nodo original que tradujo, su estado de revisión y quién la aprobó. Si un nodo original cambia de huella, su traducción queda marcada «potencialmente obsoleta».
- **Rationale**: `FR-021` (contenido en YAML), PRD §19.4 («toda entrada traducible comparte el mismo `id`»), §27.4 (identificar traducciones obsoletas), `AC-13` (paridad verificable nodo a nodo).
- **Alternatives considered**: un archivo Markdown traducido completo por idioma (descartada: la paridad solo se podría verificar a mano y no hay forma de saber qué nodo quedó obsoleto).
- **Riesgo visible**: son unas 10.500 palabras por idioma, con revisión profesional pagada (puerta humana). Es el mayor costo externo del proyecto y condiciona la fecha de publicación, no el alcance.

## RQ-03 · Rutas e idiomas

- **Decision**: configuración de internacionalización de Astro con `en` como idioma predeterminado sin prefijo, `es` en `/es/` y `pt-BR` servido en `/pt-br/`. Misma topología en los tres idiomas, con **nombres de ruta localizados** (`/principles/p01`, `/es/principios/p01`, `/pt-br/principios/p01`). El identificador `pNN` va en la ruta y no cambia aunque cambie el nombre del principio. El detalle está en [contracts/rutas.md](contracts/rutas.md).
- **Rationale**: `FR-019`, PRD §24.6 («misma topología de páginas»), §21.7 (la interfaz no mezcla idiomas: una ruta en inglés dentro de `/es/` lo haría), `FR-011` (URLs estables independientes de la redacción).
- **Alternatives considered**: los mismos nombres de ruta en inglés para todos los idiomas (más simple, pero mezcla idiomas en la dirección); rutas con el nombre del principio (inestables si el nombre traducido cambia).

## RQ-04 · Preferencia de idioma · **confirmada por la autoridad**

- **Decision**: la elección se guarda en el almacenamiento local del navegador al usar el selector. **Solo orienta la entrada por la raíz `/`**: si hay preferencia `es` o `pt-BR`, un script pequeño lleva de `/` a `/es/` o `/pt-br/`. Cualquier otra URL, incluidas las inglesas sin prefijo, se trata como explícita y nunca se sustituye. Sin JavaScript, `/` muestra inglés. Restablecer borra la preferencia.
- **Rationale**: `FR-019` («una URL localizada explícita siempre prevalecerá»), `FR-020` («la preferencia guardada podrá orientar la navegación posterior, pero no sobrescribir una URL elegida o compartida»), `AC-14`. Una URL inglesa compartida (`/principles/p03`) tiene que abrir en inglés para quien la recibe, tenga la preferencia que tenga.
- **Alternatives considered**: que la preferencia redirija cualquier ruta sin prefijo (descartada: rompe enlaces compartidos en inglés); que la preferencia no redirija nunca (más simple, pero entonces «conservar la elección» no tendría efecto más allá de la navegación interna, que ya conserva el idioma sola).

## RQ-05 · Superficie de ajustes · **confirmada por la autoridad**

- **Decision**: **no hay panel de ajustes aparte**. El selector de idioma, presente en todas las superficies, es la superficie de ajustes. No se agrega control propio de movimiento porque el sitio no tendrá movimiento no esencial: toda transición respeta `prefers-reduced-motion` (`FR-013`).
- **Rationale**: `FR-020` («agrupar únicamente preferencias reales… movimiento cuando corresponda»), `D03`, `AGENTS.md` regla 6. Con una sola preferencia real, un panel agregaría un concepto y un paso sin resolver nada.
- **Alternatives considered**: panel con idioma y movimiento (agrega carga; solo tiene sentido si hay movimiento no esencial, que el diseño evitará). **Condición de reapertura**: si la dirección visual elegida incluye movimiento no esencial, el control de movimiento se vuelve obligatorio (`AC-06`).

## RQ-06 · JavaScript en el cliente

- **Decision**: **sin framework de interfaz en el cliente.** Solo dos scripts, escritos en TypeScript y compilados: preferencia de idioma (RQ-04) y copiar o compartir con confirmación (`FR-011`, PRD §17 `P10`). La profundidad progresiva usa `<details>`/`<summary>` nativos y la comparación de `JS-04` es contenido estático accesible.
- **Rationale**: `FR-015`, PRD §24.1 («el JavaScript debe justificarse por interacción necesaria»), §24.6 (islas solo cuando se requieran), `P09`.
- **Alternatives considered**: componentes interactivos con un framework (peso y fragilidad sin una historia que lo pida); comparación interactiva con estado (mejora posible, pero `JS-04` se cumple sin ella y exigiría alternativa textual de todos modos).
- **Enmienda**: hoy son cinco scripts. El tercero, el seguimiento de lectura, se describe en «RQ-06 enmendado»; el cuarto, la búsqueda, en RQ-16 (v1.2); el quinto, el tema claro u oscuro, en RQ-17 (v1.4).

## RQ-07 · Modelo y validación del contenido

- **Decision**: colecciones de contenido de Astro sobre archivos YAML, con esquemas tipados. Una validación propia recorre las relaciones y **detiene la construcción** ante las reglas `RV-01`–`RV-12` de [data-model.md](data-model.md). La preparación para publicar es un comando aparte que además exige que todo lo publicable esté aprobado.
- **Rationale**: `FR-021`, PRD §19.3, `AC-15`. Separar «construye» de «se puede publicar» permite trabajar y probar con contenido real en borrador (PRD §21.1 punto 8) sin agregar un modo de construcción.
- **Alternatives considered**: CMS (el PRD lo descarta sin necesidad demostrada); dos modos de construcción, borrador y producción (agrega configuración; basta un comando de comprobación previa a la publicación).

## RQ-08 · Datos estructurados

- **Decision**: JSON-LD generado en la construcción desde las mismas entradas que el contenido visible, con los tipos del mapeo mínimo del PRD §25.2: `WebSite`, `WebPage`, `CreativeWork` para el manifiesto (con `inLanguage`, `translationOfWork`/`workTranslation`), `DefinedTermSet` y `DefinedTerm` para los principios, `BreadcrumbList` solo donde la navegación visible muestre jerarquía, y `Person` para Damián Acuña (decisión de autoría). **Sin `SoftwareSourceCode`** hasta que exista publicación real (PRD §29.10 abierta).
- **Rationale**: `FR-016`, PRD §25.2–§25.3, `AC-15`.
- **Alternatives considered**: marcado extenso con más tipos (el PRD prefiere pocas propiedades verdaderas).

## RQ-09 · Estado de la adaptación SpecKit como dato

- **Decision**: un archivo de estado declara versión, fecha, limitaciones y «no publicada». La construcción **compara la versión declarada con la del preset instalado** en `.specify/presets/.registry` (hoy `2.0.0`) y se detiene si difieren.
- **Rationale**: decisión de la autoridad del 2026-09-27 (versión como dato real), `FR-009`, `FR-010`, `FR-012`, `AC-09`. La comparación automática hace que el sitio no pueda publicar una versión que ya no es la real.
- **Alternatives considered**: mantener el dato solo a mano (se desfasa en silencio, que es justo el problema que originó la decisión).

## RQ-10 · Estilos y componentes

> **Reemplazada en lo visual por RQ-18 (PRD v1.5)**: los tokens son los de la especificación visual compartida.

- **Decision**: Tailwind CSS con daisyUI como base, bajo **tokens propios**; solo se emiten las clases usadas. Mientras la dirección visual no esté elegida (puerta humana), se trabaja con un conjunto provisional mínimo de tokens, declarado como tal. Tipografías autoalojadas, en subconjuntos y con presupuesto explícito, sin bloquear la lectura.
- **Rationale**: PRD §24.6 (daisyUI no define la identidad), §24.1 (presupuestos de fuentes), §21.2. La lección del traspaso: cuando se corrigió la estructura, se tiró lo que funcionaba de A y B. Separar tokens de estructura permite aplicar la dirección elegida sin rehacer la estructura.
- **Alternatives considered**: esperar la dirección visual para empezar (bloquearía trabajo que no depende de ella: fuente canónica, rutas, validación, semántica).

## RQ-11 · Pruebas y evidencia técnica

- **Decision**:
  - comprobación estricta de tipos en la construcción;
  - pruebas unitarias con `bun test` para el lector canónico, las validaciones y el generador de JSON-LD;
  - pruebas de extremo a extremo con Playwright, con JavaScript activo y desactivado, teclado, movimiento reducido, escenarios de idioma, URLs profundas y 404;
  - auditoría automática de accesibilidad con axe dentro de esas pruebas;
  - presupuestos de rendimiento de laboratorio con Lighthouse CI;
  - comprobación de enlaces internos sobre la salida construida.
- **Rationale**: `AC-07`, `AC-08`, `AC-15`, `AC-16`, PRD §24.5 y §26.4. Las pruebas automáticas **no** sustituyen la revisión con lector de pantalla ni las pruebas con personas (`AC-07`, `AC-01`, `AC-02`).
- **Alternatives considered**: solo revisión manual (no es repetible ni detiene regresiones).

## RQ-12 · Plataforma, cabeceras y medición

- **Decision**: sitio estático en Cloudflare Pages (decisión de la autoridad). Cabeceras de seguridad y redirecciones versionadas en el repositorio. Cloudflare Web Analytics es el único script de terceros; no usa cookies, así que no requiere banner de consentimiento ni bloquea contenido. Search Console y CrUX sin script.
- **Rationale**: `FR-018`, PRD §24.2–§24.3, decisiones de la autoridad sobre plataforma y medición.
- **Alternatives considered**: ninguna, porque están decididas.

## RQ-13 · Medir la profundidad progresiva

- **Decision**: la construcción informa, por superficie, **qué proporción del texto es visible sin abrir nada**. Es evidencia para el juicio de la autoridad sobre `AC-05`, **no un umbral**.
- **Rationale**: `P04` prohíbe los dos extremos: ocultarlo todo y mostrarlo todo. Según el traspaso, el defecto del piloto anterior (3 % visible) era invisible al leer la página y apareció al contar palabras. El PRD no fija un número, así que no se inventa uno.
- **Alternatives considered**: fijar un rango objetivo (sería un criterio de aceptación nuevo sin autoridad).

---

**NEEDS CLARIFICATION pendientes**: ninguno. Queda un dato que la autoridad debe aportar antes de publicar: **la dirección concreta del alias de correo** de contacto (decisión PRD §29.7). No bloquea planificar ni implementar; la comprobación previa a la publicación la exige.

---

## Ajustes de implementación · 2026-09-27

Decisiones técnicas reversibles tomadas al implementar la fase 2, dentro de PRD §2.3. No cambian alcance ni experiencia.

- **RQ-07 · Colecciones**: los esquemas se validan con un lector propio (`src/lib/contenido/`: YAML con `yaml` y Zod de `astro/zod`) en lugar de las colecciones de contenido de Astro. Así `RV-02`–`RV-10` se prueban con `bun test` sin levantar Astro. El comportamiento exigido no cambia: un esquema inválido detiene la construcción.
- **RQ-01 · Lector de Markdown**: Astro 7 reemplazó su procesador por uno interno en versión 0.4 sin API estable. Se usa `marked` 18 (GFM), cuyo lexer conserva el texto original de cada bloque; la prueba T010 (e) demuestra que los 341 nodos reproducen el archivo.
- **TypeScript 6**: `astro check` aún no admite TypeScript 7.
- **Rutas sin barra final**: todas, incluidas `/es` y `/pt-br` (contracts/rutas.md actualizado antes de publicar nada).
- **Esqueletos `pendiente`**: además de las traducciones (T017), superficies y principios nacen como esqueletos `pendiente` (`scripts/andamiar-contenido.ts`) para que `RV-04`, `RV-05` y `RV-08` se cumplan desde la fase 2; las fases 3 a 11 los redactan.
- **Aviso de borrador**: mientras un idioma tenga contenido sin aprobar, cada página lo declara en un aviso visible (`P07`). Desaparece solo cuando todo está aprobado.

---

## RQ-14 · Una sola casa por pasaje (PRD v1.1, §18.3)

> **Reemplazada en parte por RQ-15 (v1.2)**: la asignación por superficies y la página de texto íntegro dejan de regir; la regla `RV-13` se conserva, sin excepciones.

- **Decision**:
  - un módulo `src/lib/casas.ts` asigna a cada nodo canónico su casa: Manifiesto, Principios, una página de principio, Aplicación, Verificación, SpecKit, Acerca de o solo el texto íntegro. La asignación sigue la tabla de la propuesta aprobada y divide por subsección dos secciones mixtas: Propósito del documento y Gobernanza;
  - una regla nueva, `RV-13`, detiene la construcción si un nodo con contenido (no encabezado) falta en su casa, o si aparece completo en otra superficie;
  - fuera de su casa solo se admite una **cita breve**: un bloque marcado `breve` de 60 palabras como máximo, con su enlace;
  - en la casa, el texto canónico se muestra visible, después de la explicación editorial;
  - el texto íntegro es una página aparte, con la descarga del archivo original en español y de las traducciones generadas nodo a nodo.
- **Rationale**: PRD §18.3 y `FR-003` v1.1. Que la regla sea verificable evita que la unicidad dependa de la disciplina de quien edita (`D04`). Mostrar el canon visible en su casa evita que un enlace a `#cr03` caiga dentro de un `<details>` cerrado.
- **Alternatives considered**: el canon plegado en `<details>` dentro de su casa (los enlaces profundos no abren el pliegue sin JavaScript en todos los navegadores); controlar la unicidad solo a mano (se degrada en silencio).

## RQ-06 enmendado · tercer script: seguimiento de lectura (2026-09-27, ampliado el 2026-09-28)

- **Decision**: el texto íntegro usa tres columnas. A la izquierda, el título y las 24 secciones del núcleo (h1 y h2). En el centro, el texto. A la derecha, «En esta sección»: los h3 y h4 de la sección en pantalla. Un tercer script de cliente (`src/cliente/seguimiento.ts`, menos de 1 KB) muestra el grupo de la sección actual y la marca en el índice izquierdo. Sin JavaScript, el panel derecho no aparece; en pantallas angostas tampoco.
- **Ampliación (2026-09-28)**: el mismo esquema se aplica a Principios, Aplicación y Verificación, las superficies largas de las rutas Decidir, Construir y Verificar. El panel derecho sale de un componente reutilizable (`src/components/EnEstaSeccion.astro`) y muestra los h3 y h4 canónicos de la sección en pantalla; el índice izquierdo es el índice lateral de cada superficie. Es el mismo script, no uno nuevo.
- **Rationale**: decisiones de Damián Acuña (2026-09-27 para el texto íntegro; 2026-09-28 para las otras tres superficies). El núcleo tiene 24 h2, 23 h3 (casi siempre un subtítulo único) y 80 h4, que son la navegación fina. Con los h3 y h4 de la sección actual, el panel derecho no repite el izquierdo (`P06`) y el texto sigue siendo una sola página (`FR-003` v1.1: lectura de corrido, búsqueda y una sola dirección).
- **Alternatives considered**: una página por sección (sin JavaScript, pero cambia `FR-003` y suma 72 páginas); paneles estáticos con h2 y h3 (la derecha duplicaría la izquierda y omitiría los h4).
- **Enmienda v1.2 (2026-09-28)**: desaparece la página de texto íntegro. El panel «En esta sección» y el script de seguimiento siguen en las divisiones largas del manifiesto (RQ-15).

## RQ-15 · El núcleo por divisiones (PRD v1.2, §18.1–§18.3)

Reemplaza la asignación de casas de RQ-14; la regla de una sola casa se conserva y se endurece.

- **Decision**:
  - `src/lib/casas.ts` asigna cada **sección** del núcleo, entera, a una división. Ninguna sección se parte. Desaparecen las asignaciones por subsección de Propósito y Gobernanza;
  - divisiones y orden: 0 Mapa del manifiesto (portada del núcleo y `SH-INDEX`, porque la portada precede al índice en el núcleo), 1 El manifiesto (Propósito y Texto canónico), 2 Principios (Principios de diseño; `P01`–`P10` en su página propia, como hoy), 3 Fundamento de producto, 4 Construir con IA (Doctrina, Flujo, Contrato), 5 Verificar (Verificación, Antipatrones), 6 Ejemplo aplicado, 7 Gobernanza, 8 Guía de bolsillo;
  - **Influencias y notas**: sus nodos tienen casa `descarga`, así que no se muestran completos en el sitio. Acerca de los presenta como explicación editorial derivada de ellos, más una cita `breve` textual de la aclaración sobre Craft, con enlace a la descarga. La **Declaración final** (su encabezado y su párrafo) tiene casa en la división 8 y se muestra después de la Guía de bolsillo (decisión de la autoridad);
  - `RV-13` sin excepciones: cada nodo con contenido aparece completo en su casa y en ninguna otra página; fuera de ella, solo en citas `breve`. Los nodos con casa `descarga` solo admiten `breve`;
  - **Anterior / Siguiente** en el orden del núcleo: 0 → 1 → 2 → `P01` … `P10` → 3 → 4 → 5 → 6 → 7 → 8. Recorrerlo reproduce el núcleo;
  - **índice lateral del manifiesto**: las divisiones en ese orden, agrupadas bajo Comprender (0, 1), Decidir (2, con los diez principios, y 3), Construir (4), Verificar (5) y Llevarlo a la práctica (6–8);
  - **rutas**: los principios conservan `/principles` y `/principles/pNN`, direcciones cortas para compartir (`JS-08`) y ya probadas; las demás divisiones viven bajo `/manifesto/…` ([contracts/rutas.md](contracts/rutas.md)). La división 1 ocupa `/manifesto`. Salen `/practice`, `/verification` y `/manifesto/full-text` con sus equivalentes; como nada se publicó, no hacen falta redirecciones;
  - **descarga**: el pie de cada página y el Mapa ofrecen solo la del idioma seleccionado. Los archivos no cambian (RQ-06 enmendado, T123);
  - las entradas editoriales en borrador de las páginas que desaparecen (Aplicación, Verificación, texto íntegro) se reparten entre las divisiones que heredan sus temas.
- **Rationale**: PRD §18.1–§18.3 v1.2 y la propuesta aprobada: `P03`, `P05`, `P06`. Asignar secciones enteras hace verificable, con `RV-13`, que la división no rompe la estructura del núcleo (`D04`).
- **Alternatives considered**: los principios bajo `/manifesto/principles` (jerarquía más uniforme, pero direcciones más largas para compartir y cambio de rutas ya probadas); la portada en la división 1 (rompería el orden, porque el índice operativo va antes que el Propósito).

## RQ-16 · Búsqueda (PRD v1.2, `FR-023`)

- **Decision**: un **índice propio generado en la construcción** a partir del modelo de contenido, un archivo JSON por idioma. Tiene una entrada por nodo canónico **en su casa**, con la dirección y el ancla, más las entradas editoriales de cada página. Las citas `breve` y los actos de Inicio quedan fuera por construcción.
  - Un cuarto script de cliente (`src/cliente/busqueda.ts`) abre un `<dialog>` nativo desde un botón de la cabecera y descarga el índice la primera vez que se abre.
  - Normaliza mayúsculas y tildes, exige todos los términos y ordena así: coincidencia en el título, luego en el identificador, luego en el texto.
  - Agrupa los resultados por página, con un extracto y el término resaltado.
  - Sin JavaScript, el botón no aparece y el sitio sigue completo.
  - Una regla nueva, `RV-14`, detiene la construcción si un nodo canónico aparece más de una vez en el índice o apunta fuera de su casa.
- **Rationale**: `FR-023`, `FR-018` (sin terceros y sin registrar búsquedas), §24.1 (se carga solo al abrirse), `FR-015`. No agrega dependencias ni obliga a relajar la política de seguridad de contenido. La unicidad de resultados se garantiza por construcción y se comprueba (`D04`). Estimación: unas 15.000 palabras por idioma, unos 30 KB comprimidos, que solo se descargan al abrir la búsqueda.
- **Alternatives considered**:
  - Pagefind: maduro, con raíces léxicas por idioma, pero necesita WebAssembly (`'wasm-unsafe-eval'` en `script-src`). Además indexa el HTML renderizado, así que la unicidad dependería de marcar a mano lo que debe ignorar;
  - un servicio de búsqueda de terceros: incumple `FR-018`.

## RQ-16 enmendado · búsqueda en el idioma vigente (2026-09-28)

- **Decision**: cada texto del índice lleva su idioma real, no el de la página donde aparece. El índice de cada idioma guarda solo los textos escritos en ese idioma. Si el título de una sección no está traducido, el resultado usa el nombre de la página. Los resultados se agrupan **una vez por sección**, con el extracto que mejor coincide y el enlace a ese pasaje; los identificadores (`CR03`, `STOP02`) conservan su resultado propio.
- **Rationale**: PRD §19.4 (no mezclar idiomas) y `FR-019`; criterio propuesto por Damián Acuña: mostrar todo lo que coincide, filtrado por el idioma vigente. Se filtra al construir y no al buscar porque el resultado es el mismo y el visitante descarga solo su idioma (§24.1, `P09`). Un resultado por sección evita títulos repetidos (`P06`).
- **Alternatives considered**: un solo índice con los tres idiomas filtrado en el navegador (el triple de datos para el mismo resultado); mantener el original en español donde falta la traducción (mezcla idiomas, que fue el defecto observado).
- **Consecuencia declarada**: mientras los textos explicativos no estén traducidos (T084), la búsqueda en `en` y `pt-BR` encuentra sobre todo el texto del núcleo, que ya tiene traducción en borrador.

## RQ-17 · Cabecera y tema (PRD v1.4, 2026-09-28)

Reemplaza en parte RQ-05: además del idioma, el tema claro u oscuro es una preferencia real. Sigue sin haber un panel de ajustes.

- **Decision**:
  - **Logotipo**: el ícono de Software Humano y la palabra «Manifiesto», entregados por la autoridad como SVG, van en línea en la cabecera, con `currentColor`, para que funcionen en los dos temas sin archivos duplicados. En pantallas de 48rem o más se muestran ícono y nombre; en menos, solo el ícono. El enlace tiene el nombre accesible «Manifiesto» y lleva al inicio. No se carga ninguna tipografía web;
  - **GitHub**: la entrada del menú apunta a `estado-adaptacion.url` y se muestra solo cuando `published` es verdadero. Hoy no aparece: se conservan `FR-010` y `RV-10` y el plan sin enlaces sin destino. La publicación del repositorio sigue siendo la decisión abierta §29.10;
  - **Idiomas**: EN · ES · PT, con `lang`, `hreflang` y el nombre completo (English, Español, Português (Brasil)) como nombre accesible y en `title`;
  - **Tema**: tokens oscuros en `src/styles/tokens.css`, dentro de la dirección visual. Sin elección guardada, rige `prefers-color-scheme`, también sin JavaScript. Un script síncrono mínimo (`public/tema.js`, menos de 1 KB, permitido por `script-src 'self'`) aplica la elección guardada antes de pintar, para que no haya destello. El control de día y noche es un botón con `aria-pressed`, y permite volver a seguir al sistema. Axe verifica el contraste AA en los dos temas.
- **Rationale**: PRD §21.2, §18.2 y §21.7 v1.4; `FR-020` (preferencia local, transparente, reversible y prescindible); `P03` (resolver por contexto: el sistema ya sabe qué prefiere la persona); `P09` (sin tipografías web ni destellos).
- **Alternatives considered**: la tipografía cargada como fuente web (rompe el presupuesto de solo fuentes del sistema); dos archivos de logotipo por tema (duplica recursos); aplicar el tema con un script de módulo (se ejecuta tarde y produce un destello del tema equivocado).

## RQ-18 · Sistema visual compartido (PRD v1.5, 2026-09-28)

Reemplaza los tokens de RQ-10 y la dirección A + B en lo visual. Se conserva la arquitectura editorial.

- **Decision**:
  - **Fuente autorizada**: `docs/design/Software_Humano_Especificacion_Visual_v1.0.md`. Sus criterios de aceptación (§10) son pruebas del sitio;
  - **Tipografía**: Noto Sans (licencia OFL), autoalojada desde el paquete Fontsource, en WOFF2, con los pesos 400, 500 y 600 y el subconjunto latino, que cubre el español y el portugués. Se mide la versión estática por peso contra la variable y se elige la de menor peso total dentro del presupuesto de tipografías (≤ 100 KB). `font-display: swap`. Los identificadores (`P03`) y las etiquetas usan también Noto Sans, con cifras tabulares, porque la especificación no admite otra familia. Se retiran Georgia y la monoespaciada;
  - **Tokens**: los nombres y valores de la especificación §8 (`--sh-canvas`, `--sh-surface`, `--sh-text`, `--sh-text-muted`, `--sh-border`, `--sh-subtle`, `--sh-interactive`, `--sh-focus`, colores del ciclo y tintes). El atributo del tema sigue siendo `data-tema` (RQ-17), equivalente al `data-theme` de la especificación;
  - **Componentes**: cabecera de 64 px en escritorio y 56 px en móvil, con borde inferior; controles de 44 × 44 px; botones con radio de 8 px (sin cápsulas); índice de 256 px, con los inactivos en texto secundario y el activo con fondo índigo suave, borde izquierdo de 3 px y peso 600; «Contenido» en teléfonos; enlaces índigo subrayados en el texto corrido; aviso de borrador con ícono, título y borde ámbar; búsqueda de hasta 720 px de ancho, con campo de 48 px y foco de 3 px;
  - **Texto canónico**: panel Tinta en las declaraciones de los principios y en las citas breves; en los pasajes largos, borde índigo y etiqueta secundaria (interpretación de la autoridad);
  - **Expandibles**: `<details>` con chevron que gira en 160 ms, y sin giro con movimiento reducido (interpretación de la autoridad);
  - **Colores del ciclo**: no se asignan a las rutas del núcleo. El Ámbar se usa solo en avisos. El flywheel es del sitio de la agencia.
- **Rationale**: PRD §21.2 y §21.7 v1.5; `P06`, `P07`, `P08` y `P09`; `AC-07`.
- **Alternatives considered**: cargar Noto Sans desde Google Fonts (tercero, contra `FR-018`); conservar una monoespaciada para los identificadores (va contra la regla de una sola familia).
