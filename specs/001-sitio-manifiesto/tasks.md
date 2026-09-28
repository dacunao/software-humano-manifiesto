---

description: "Tareas del sitio del Manifiesto de Software Humano"
---

# Tasks: Sitio del Manifiesto de Software Humano

**Input**: Design documents from `specs/001-sitio-manifiesto/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/, quickstart.md

**Tests**: se incluyen. El PRD exige «pruebas automatizadas en recorridos críticos» (§24.5) y que terminen sin errores (§32).

**Organization**: agrupadas por Job Story (`US1` = `JS-01` … `US9` = `JS-09`) para la trazabilidad. **La numeración de fases es orden de ejecución por dependencias, no prioridad**: no hay MVP ni entrega parcial (PRD §15, `AGENTS.md` regla 3). El sitio no se publica hasta completar todas las fases y la aceptación humana.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: se puede ejecutar en paralelo (archivos distintos, sin dependencias pendientes)
- **[Story]**: Job Story a la que sirve la tarea
- **STOP**: puerta humana. El agente prepara, presenta y **espera**; no decide ni aprueba por la persona (`AGENTS.md` regla 9)

## Path Conventions

Proyecto único según [plan.md](plan.md): `src/`, `public/`, `tests/` y `scripts/` en la raíz. **No se modifican** `LICENSE`, `LICENSE-CODE`, `LICENSE-CONTENT` ni `README.md`: pertenecen al paquete del método y están protegidos por `SHA256SUMS`.

**Regla para todo contenido**: todo texto que redacte un agente nace con `state: borrador`. Solo Damián Acuña puede pasarlo a `aprobado` y firmar `approvedBy`.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: base técnica (bloque 1 del plan).

- [X] T001 Crear `package.json` con `"packageManager": "bun@1.3.14"` y los scripts `dev`, `build` (`astro check && astro build`), `check` (`astro check`), `test` (`bun test tests/unit`), `test:e2e` (`playwright test`), `check:publish` (`bun run scripts/check-publish.ts`) y `lhci`; crear `.bun-version` con `1.3.14`
- [X] T002 Instalar con `bun add` las dependencias del plan (astro, @astrojs/check, typescript, tailwindcss, @tailwindcss/vite, daisyui, yaml; de desarrollo @playwright/test, @axe-core/playwright, @lhci/cli) y versionar `bun.lock`; no generar archivos de bloqueo de npm, yarn ni pnpm
- [X] T003 Configurar `astro.config.mts`: `output: 'static'`, `site: 'https://softwarehumano.com'`, i18n con `defaultLocale: 'en'`, `locales: ['en', 'es', { path: 'pt-br', codes: ['pt-BR'] }]` y `routing: { prefixDefaultLocale: false, redirectToDefaultLocale: false }`; sin redirección por idioma del navegador (`FR-020`)
- [X] T004 [P] Crear `tsconfig.json` que extienda `astro/tsconfigs/strictest`; el script `build` debe fallar ante cualquier error de tipos (`AC-16`)
- [X] T005 [P] Crear `src/styles/tokens.css` con tokens mínimos de color, tipografía y espaciado, encabezado por el comentario «PROVISIONAL: pendiente de dirección visual (RQ-10)», y `src/styles/global.css` con Tailwind y un tema de daisyUI que consuma esos tokens; incluir `@media (prefers-reduced-motion: reduce)` que anule animaciones y transiciones (`FR-013`)
- [X] T006 [P] Crear `playwright.config.ts` con los proyectos `js`, `sin-js` (`javaScriptEnabled: false`), `movimiento-reducido` (`reducedMotion: 'reduce'`) y `movil` (ancho 375), sirviendo `dist/`
- [X] T007 [P] Crear `lighthouserc.json` con aserciones LCP ≤ 2500 ms, TBT ≤ 200 ms como aproximación de laboratorio a INP y CLS ≤ 0,1 (`AC-08`), sobre una página por superficie en `en`, `es` y `pt-br`; registrar en la evidencia que TBT es una aproximación y que el INP real se verifica con CrUX tras el lanzamiento
- [X] T008 [P] Crear `public/_headers` (CSP con `script-src 'self' https://static.cloudflareinsights.com`, `Strict-Transport-Security`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin` y `Permissions-Policy` restrictiva), `public/_redirects` vacío y versionado, y `public/robots.txt` explícito que declare el sitemap (PRD §24.3, [contracts/rutas.md](contracts/rutas.md))
- [X] T009 [P] Crear `.gitignore` con `node_modules/`, `dist/`, `.astro/`, `.lighthouseci/`, `test-results/` y `playwright-report/`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: fuente canónica, modelo de contenido, validación, rutas y armazón común (bloques 2 y 3 y parte del 4).

**⚠️ CRITICAL**: ninguna fase de historia empieza antes de completar esta.

### Fuente canónica

- [X] T010 [P] Escribir `tests/unit/canon/lector.test.ts`, que compruebe: (a) los 18 anclajes existentes (`sh-index`, `p01`–`p10`, `sh-fund`, `sh-stop`, `sh-score`, `sh-ap`, `sh-gov`, `sh-done`, `sh-pocket`) son ids de nodo; (b) `D01`–`D06`, `F01`–`F08`, `A01`–`A08`, `STOP01`–`STOP07`, `CR01`–`CR08`, `O01`–`O09` y `V01`–`V12` generan anclas en minúsculas; (c) los ids son deterministas entre dos lecturas; (d) una huella distinta produce el error `RV-01`; (e) la concatenación del `source` de todos los nodos reproduce el archivo, con los espacios normalizados
- [X] T011 Implementar `src/lib/canon/lector.ts`, que lea `docs/method/Manifiesto_Software_Humano_IA_Nucleo_v2.1.md` y devuelva `CanonicalNode[]` con `id`, `kind` (encabezado, párrafo, lista, tabla o cita), `section`, `hash` y `source`, según [data-model.md](data-model.md); **nunca reescribe ni parafrasea** el texto
- [X] T012 Implementar `src/lib/canon/huella.ts` con la huella fijada `9beef610c0b1e81ebc8bb56d3c1a07aa1e1bb75e330ba4cddc1eebdc60fa68dc` y el error `RV-01`: «La fuente canónica cambió. Registra la versión y describe los cambios antes de actualizar (PRD §27.2)»
- [X] T013 Crear `src/components/NodoCanonico.astro` y `src/components/CitaCanonica.astro`: muestran un nodo con su ancla y lo marcan semánticamente como cita canónica, con el atributo `lang` correcto (`FR-017`)

### Modelo de contenido y validación

- [X] T014 Definir los esquemas (implementados en `src/lib/contenido/esquemas.ts`; ver ajustes de research.md) con las colecciones `sitio`, `estadoAdaptacion`, `superficies`, `principios`, `traduccionesCanon` e `interfaz`, y estas restricciones literales de [data-model.md](data-model.md):
  - estado editorial ∈ {`borrador`, `aprobado`};
  - estado de traducción ∈ {`pendiente`, `borrador`, `en revisión`, `aprobada`, `potencialmente obsoleta`};
  - `approvedBy` y `approvedAt` obligatorios cuando el estado es aprobado;
  - `type` ∈ {`explanation`, `example`, `counterexample`, `decision-test`, `inference`, `surface-text`};
  - `derivedFrom` obligatorio para `explanation`, `example`, `counterexample` e `inference`
- [X] T015 [P] Crear `src/content/sitio.yaml` con nombre «Software Humano», dominio `softwarehumano.com`, autor `Person` Damián Acuña, licencias CC BY 4.0 (contenido) y MIT (código), y contacto `email: null` e `issues: null`, porque ambos están pendientes de la autoridad
- [X] T016 [P] Crear `src/content/estado-adaptacion.yaml` con `version: 2.0.0`, `verifiedAt: 2026-09-27`, `published: false` y `limitations` en borrador, **sin** `url` ni `sha256`
- [X] T017 Generar `src/content/traducciones-canon/en.yaml` y `src/content/traducciones-canon/pt-br.yaml` con una entrada `state: pendiente` y su `sourceHash` por cada nodo canónico (a partir de T011), para que `RV-07` se cumpla desde el inicio; T083 las completa
- [X] T018 [P] Escribir `tests/unit/validacion/reglas.test.ts`, con un caso que falle por cada regla `RV-02`–`RV-10`, usando datos de prueba en `tests/fixtures/contenido/`
- [X] T019 Implementar `src/lib/validacion/reglas.ts` con `RV-02`–`RV-10`, redactadas como en data-model.md (`RV-07` y `RV-08` exigen que exista una entrada por nodo o texto e idioma; `pendiente` es válido y la aprobación la exige T023); cada error nombra la regla, el archivo y la entidad. `RV-09` lee la versión desde `.specify/presets/.registry`, en `presets["software-humano"].version`
- [X] T020 Implementar `src/lib/validacion/salida.ts` con `RV-11` (enlaces internos rotos) y `RV-12` (el JSON-LD solo describe entidades presentes en el HTML) sobre `dist/`, con su prueba en `tests/unit/validacion/salida.test.ts`
- [X] T021 Implementar `src/lib/validacion/visibilidad.ts`: informa, por superficie, la proporción de palabras visibles sin abrir ningún `<details>` (RQ-13). Es informe, **no umbral**
- [X] T022 Crear `src/integrations/validacion.ts` y registrarla en `astro.config.mts`: al iniciar la construcción ejecuta `RV-01`–`RV-10`; al terminar, `RV-11`, `RV-12` y el informe de RQ-13. Cualquier fallo detiene la construcción
- [X] T023 Implementar `src/lib/validacion/publicacion.ts` y `scripts/check-publish.ts`. Exige:
  - todas las entradas publicables aprobadas en su idioma;
  - ninguna traducción `potencialmente obsoleta`;
  - `sitio.contact.email` presente;
  - un registro de revisión lingüística aprobada para `en` y `pt-BR`, y de neutralidad para `es`.

  Falla con la lista de lo que falta y no interviene en la construcción

### Rutas, idioma y armazón

- [X] T024 [P] Escribir `tests/unit/i18n/rutas.test.ts`: cubre la tabla completa de [contracts/rutas.md](contracts/rutas.md), las equivalencias entre las 48 páginas y las tres 404, y `hreflang` recíprocos con `x-default` apuntando a `en`
- [X] T025 Implementar `src/lib/i18n/idiomas.ts` (conjunto cerrado `en`, `es`, `pt-BR`, con sus rutas y nombres) y `src/lib/i18n/rutas.ts` (nombres de ruta de contracts/rutas.md, `rutaEquivalente(ruta, idioma)` y `alternas(ruta)`)
- [X] T026 Crear `src/content/interfaz/*.yaml` con las cadenas de interfaz: navegación, selector («English», «Español», «Português (Brasil)»), 404, confirmaciones de copiar y compartir, e idioma activo. Redactar en `es`, con borradores `en` y `pt-BR`, todo `state: borrador`
- [X] T027 Crear `src/layouts/Base.astro` con:
  - `lang`, URL canónica, `hreflang` (de T025), título y descripción localizados, y Open Graph;
  - enlace para saltar al contenido y landmarks;
  - navegación global;
  - pie con la versión vigente del núcleo y la licencia del contenido;
  - el script de Cloudflare Web Analytics, solo si existe su token de producción (pendiente) y sin cookies (`FR-018`)
- [X] T028 Crear `src/components/NavegacionGlobal.astro` con los destinos del PRD §18.2: inicio, manifiesto, principios, aplicación, SpecKit con su estado, versión vigente y selector de idioma. Funciona sin JavaScript, tiene una sola acción principal por contexto y no muestra símbolos de ancla al pasar el cursor
- [X] T029 Crear `src/components/BloqueEditorial.astro`: muestra el tipo de entrada (explicación, ejemplo, contraejemplo, prueba de decisión, inferencia o propuesta, estado técnico confirmado) de forma visible y semántica, y enlaza su `derivedFrom` (`FR-017`)
- [X] T030 Crear las vistas `src/views/{Inicio,Manifiesto,Principios,Principio,Aplicacion,Speckit,Acerca,NoEncontrada}.astro` y las rutas de `src/pages/` según contracts/rutas.md (`en` sin prefijo, `es/` y `pt-br/`), con `getStaticPaths` para `p01`–`p10`
- [X] T031 Crear `src/pages/404.astro`, `src/pages/es/404.astro` y `src/pages/pt-br/404.astro`: orientadoras, en el idioma de la ruta, con salidas a inicio, manifiesto y principios (PRD §24.2)
- [X] T032 Implementar `src/lib/semantica/jsonld.ts` con `WebSite`, `WebPage` y `Person` generados desde `sitio.yaml`, inyectados en `Base.astro`, y su prueba en `tests/unit/semantica/jsonld.test.ts`
- [X] T033 Crear `src/pages/sitemap.xml.ts` con las 48 páginas de contenido y sus alternas por idioma, sin las 404 (`FR-016`)

**Checkpoint**: la construcción valida la fuente canónica y el contenido, las 48 rutas existen en tres idiomas y el armazón funciona sin JavaScript.

---

## Phase 3: User Story 1 - `JS-01` Comprender el problema

**Goal**: los actos 1 y 2 de Inicio permiten entender por qué más capacidad para construir no equivale a más progreso.

**Verificación**: escenarios de `JS-01` en spec.md; `AC-01` en las pruebas con personas (fases 12 y 16).

- [X] T034 [P] [US1] Escribir `tests/e2e/js01-problema.spec.ts` con los escenarios 1 y 2 de `JS-01`
- [X] T035 [US1] Redactar en `src/content/superficies/inicio.yaml` los actos 1 y 2 (PRD §16) en `es`, con voz impersonal y `state: borrador`. Usar como insumo `docs/design/copy-hero-borrador-2026-09-27.md`, reescribiéndolo en voz impersonal y corrigiendo cada hallazgo de su tabla de contraste; sin botón hacia una instalación
- [X] T036 [US1] Redactar en `src/content/superficies/inicio.yaml` la comparación del acto 2 como una entrada `example` y otra `counterexample`, con `derivedFrom` a `p02` y `p03`
- [X] T037 [P] [US1] Crear `src/components/Acto.astro` y `src/components/Comparacion.astro`: estáticos y accesibles, con orden de lectura correcto sin CSS y cada lado etiquetado como ejemplo (`FR-017`, PRD §21.4)
- [X] T038 [US1] Mostrar los actos 1 y 2 en `src/views/Inicio.astro`, con una idea dominante por acto y profundidad en `<details>`/`<summary>` con títulos explícitos (PRD §21.1, §21.3)

---

## Phase 4: User Story 2 - `JS-02` Descubrir la tesis

**Goal**: el acto 3 presenta la tesis y el texto canónico breve, con acceso directo al pasaje original.

**Verificación**: escenarios de `JS-02`; `AC-02` en las fases 12 y 16.

- [X] T039 [P] [US2] Escribir `tests/e2e/js02-tesis.spec.ts` con los escenarios 1 y 2 de `JS-02`
- [X] T040 [US2] Redactar el acto 3 en `src/content/superficies/inicio.yaml` (`es`, borrador): la tesis, más el texto canónico breve **referenciado por sus nodos** de la sección «TEXTO CANÓNICO» del núcleo, no copiado, con enlace a su ancla en Manifiesto
- [X] T041 [US2] Mostrar el acto 3 en `src/views/Inicio.astro` usando `CitaCanonica.astro`

---

## Phase 5: User Story 3 - `JS-03` Comprender cada principio

**Goal**: diez páginas de principio con el contrato completo del PRD §17 y la colección en orden canónico.

**Verificación**: escenarios de `JS-03`; `AC-03` y `AC-04`.

- [X] T042 [P] [US3] Escribir `tests/e2e/js03-principios.spec.ts` con los escenarios 1 a 3 de `JS-03`
- [X] T043 [P] [US3] Escribir `tests/unit/principios.test.ts`: el nombre y la frase de cada principio se leen del núcleo y coinciden con él (`AC-03`), y se cumplen `RV-04` y `RV-05`
- [X] T044 [P] [US3] Redactar `src/content/principios/p01.yaml` en `es`, `state: borrador`, con tensión, significado, consecuencia, ejemplo, contraejemplo y prueba de decisión, derivados de la sección `#p01` del núcleo y de PRD §17 (expresión en el sitio e incumplimiento a evitar); `derivedFrom: p01`, y relaciones `jobStories` y `requirements` según PRD §33
- [X] T045 [P] [US3] Igual que T044 para `src/content/principios/p02.yaml` (`#p02`)
- [X] T046 [P] [US3] Igual que T044 para `src/content/principios/p03.yaml` (`#p03`)
- [X] T047 [P] [US3] Igual que T044 para `src/content/principios/p04.yaml` (`#p04`)
- [X] T048 [P] [US3] Igual que T044 para `src/content/principios/p05.yaml` (`#p05`)
- [X] T049 [P] [US3] Igual que T044 para `src/content/principios/p06.yaml` (`#p06`)
- [X] T050 [P] [US3] Igual que T044 para `src/content/principios/p07.yaml` (`#p07`); incluir que el preset no se presenta como oficial
- [X] T051 [P] [US3] Igual que T044 para `src/content/principios/p08.yaml` (`#p08`)
- [X] T052 [P] [US3] Igual que T044 para `src/content/principios/p09.yaml` (`#p09`)
- [X] T053 [P] [US3] Igual que T044 para `src/content/principios/p10.yaml` (`#p10`)
- [X] T054 [US3] Implementar `src/views/Principio.astro` con el contrato del PRD §17 en orden:
  1. declaración (nombre y frase canónicos leídos del núcleo);
  2. tensión, significado y consecuencia;
  3. ejemplo y contraejemplo;
  4. prueba de decisión;
  5. fuente, con enlace a `manifesto#pNN` en el idioma de la ruta.

  Con navegación al anterior y al siguiente en orden canónico
- [X] T055 [US3] Implementar `src/views/Principios.astro`: `P01`–`P10` en orden canónico, con identificador, nombre canónico y enlace a su página; no reducirlos a tarjetas-lema (PRD §28)
- [X] T056 [US3] Redactar el acto 4 en `src/content/superficies/inicio.yaml` (borrador) y mostrarlo en `src/views/Inicio.astro`: los diez principios en orden canónico; agruparlos en capítulos solo si lo decide el diseño (PRD §16)
- [X] T057 [US3] Añadir a `src/lib/semantica/jsonld.ts` `DefinedTermSet` en Principios y `DefinedTerm` en cada principio, según [contracts/datos-estructurados.md](contracts/datos-estructurados.md)

---

## Phase 6: User Story 4 - `JS-04` Experimentar la diferencia

**Goal**: el acto 5 muestra, con ejemplos y contraejemplos, que un principio cambia, exige evidencia o detiene una decisión.

**Verificación**: escenarios de `JS-04`, con y sin JavaScript y con movimiento reducido.

- [X] T058 [P] [US4] Escribir `tests/e2e/js04-diferencia.spec.ts` con los escenarios 1 y 2 de `JS-04` en los proyectos `js`, `sin-js` y `movimiento-reducido`
- [X] T059 [US4] Redactar el acto 5 en `src/content/superficies/inicio.yaml` (`es`, borrador) con entradas `example` y `counterexample` que declaren su `derivedFrom`
- [X] T060 [US4] Mostrar el acto 5 en `src/views/Inicio.astro` con `Comparacion.astro` y una alternativa textual equivalente (PRD §21.3)

---

## Phase 7: User Story 5 - `JS-05` Consultar y citar la fuente

**Goal**: el manifiesto íntegro, citable por ancla, con versión, procedencia y la superficie Acerca de.

**Verificación**: escenarios de `JS-05`; `AC-03` y `AC-11`.

- [X] T061 [P] [US5] Escribir `tests/e2e/js05-fuente.spec.ts` con los escenarios 1 a 3 de `JS-05`; `/es/manifiesto#cr03` debe llevar a `CR03`
- [X] T062 [P] [US5] Escribir `tests/unit/canon/integridad.test.ts`: el texto mostrado en `/es/manifiesto` reproduce todos los nodos del núcleo, sin diferencias (`AC-03`)
- [X] T063 [US5] Implementar `src/views/Manifiesto.astro`: núcleo íntegro desde los nodos. En `es`, la fuente directa. En `en` y `pt-BR`, la traducción de cada nodo, identificada como traducción y con referencia al original (PRD §19.4). Versión y fecha visibles (`FR-012`)
- [X] T064 [US5] Crear `src/components/IndiceManifiesto.astro`: índice de secciones e identificadores con las anclas de contracts/rutas.md
- [X] T065 [US5] Redactar `src/content/superficies/acerca.yaml` (borrador) e implementar `src/views/Acerca.astro` con:
  - origen, autoría (Damián Acuña) y versiones;
  - procedencia del contenido y licencias (CC BY 4.0 y MIT);
  - relación independiente con influencias y herramientas;
  - **la nota de origen en primera persona**, que es la única excepción a la voz impersonal;
  - contacto, con el alias y el repositorio pendientes
- [X] T066 [US5] Añadir a `src/lib/semantica/jsonld.ts` el `CreativeWork` del Manifiesto, con `version`, `inLanguage`, `license` y `workTranslation`/`translationOfWork`, según contracts/datos-estructurados.md
- [X] T067 [US5] Crear `src/components/Procedencia.astro` con la versión del núcleo, la fecha de actualización (fecha del último cambio de contenido de la página según el historial de git, calculada en la construcción; ver data-model.md), la procedencia del contenido y el estado del preset (`FR-012`), y usarlo en `Base.astro`

---

## Phase 8: User Story 6 - `JS-06` Pasar de doctrina a práctica

**Goal**: la superficie Aplicación y el acto 6 explican cómo el manifiesto cambia o detiene el desarrollo.

**Verificación**: escenarios de `JS-06`.

- [X] T068 [P] [US6] Escribir `tests/e2e/js06-aplicacion.spec.ts` con los escenarios 1 y 2 de `JS-06`
- [X] T069 [US6] Redactar `src/content/superficies/aplicacion.yaml` (`es`, borrador) con fundamento, Job Stories como forma de referencia, flujo (`F01`–`F08`), artefactos (`A01`–`A08`), contrato (`CR01`–`CR08`), detenciones (`SH-STOP`) y terminado (`SH-DONE`). Con `derivedFrom` a sus anclas; técnico solo cuando mejore la comprensión (PRD §21.6)
- [X] T070 [US6] Implementar `src/views/Aplicacion.astro` y mostrar el acto 6 en `src/views/Inicio.astro`

---

## Phase 9: User Story 7 - `JS-07` Comprender la implementación en SpecKit

**Goal**: la superficie SpecKit y el acto 7 distinguen las capas y muestran el estado real, sin insinuar publicación.

**Verificación**: escenarios de `JS-07`; `AC-09`.

- [X] T071 [P] [US7] Escribir `tests/e2e/js07-speckit.spec.ts` con los escenarios 1 a 3 de `JS-07`: ningún enlace de descarga o instalación ni `SoftwareSourceCode`
- [X] T072 [P] [US7] Escribir `tests/unit/validacion/estado-adaptacion.test.ts`: `RV-09` falla si el YAML difiere del registro instalado; `RV-10` falla si hay `url` con `published: false`
- [X] T073 [US7] Redactar `src/content/superficies/speckit.yaml` (`es`, borrador): la relación núcleo → constitución → anexo → preset → SpecKit nativo (`FR-008`), qué conserva, qué adapta y sus límites, presentado después del método (PRD §28)
- [X] T074 [US7] Implementar `src/views/Speckit.astro`: estado leído de `estado-adaptacion.yaml` con los seis puntos de `FR-009` y la versión instalada; disponibilidad futura **sin botón, formulario ni enlace** (`FR-010`, decisión PRD §29.6)
- [X] T075 [US7] Redactar y mostrar el acto 7 en `src/content/superficies/inicio.yaml` y `src/views/Inicio.astro`: cierre con el estado real y las acciones disponibles (leer, explorar, aplicar conceptualmente, conocer el estado)

---

## Phase 10: User Story 8 - `JS-08` Compartir una idea precisa

**Goal**: compartir un principio o una sección con contexto, confirmación clara y sin captura de datos.

**Verificación**: escenarios de `JS-08`.

- [X] T076 [P] [US8] Escribir `tests/e2e/js08-compartir.spec.ts`: el enlace a un principio abre con contexto; copiar muestra una confirmación que se anuncia; sin JavaScript, el enlace sigue visible y copiable
- [X] T077 [US8] Implementar `src/cliente/compartir.ts` y `src/components/Compartir.astro`:
  - copia la URL y un título preciso, sin atribuir una explicación al texto canónico (`FR-011`);
  - usa el panel nativo de compartir si existe y, si no, el portapapeles;
  - confirma con `aria-live`;
  - no envía datos a ningún lado;
  - funciona como mejora progresiva
- [X] T078 [US8] Añadir `Compartir.astro` a `src/views/Principio.astro` y a cada sección de `src/views/Manifiesto.astro`, como acción explícita para copiar el enlace de la sección, sin `#` al pasar el cursor

---

## Phase 11: User Story 9 - `JS-09` Comprender en mi idioma y conservar mi elección

**Goal**: tres idiomas equivalentes; el cambio de idioma conserva la sección y la preferencia es local y reversible.

**Verificación**: escenarios de `JS-09`; `AC-13` y `AC-14`.

- [X] T079 [P] [US9] Escribir `tests/e2e/js09-idioma.spec.ts` con los cuatro escenarios de `JS-09` y la tabla «Idioma» de contracts/rutas.md, incluidos sin JavaScript y con almacenamiento bloqueado
- [X] T080 [P] [US9] Escribir `tests/unit/i18n/hreflang.test.ts` sobre `dist/`: reciprocidad y códigos BCP 47 en las 48 páginas
- [X] T081 [US9] Implementar `src/components/SelectorIdioma.astro`:
  - enlaces a `rutaEquivalente` conservando el ancla;
  - nombres «English», «Español» y «Português (Brasil)», sin banderas;
  - idioma activo con `aria-current` y `lang`;
  - acción para restablecer la preferencia
- [X] T082 [US9] Implementar `src/cliente/preferencia-idioma.ts`: guarda la elección (protegido ante almacenamiento no disponible), permite restablecerla y redirige **solo** desde `/` (RQ-04); nunca actúa en otras rutas
- [X] T083 [US9] Completar en `src/content/traducciones-canon/en.yaml` y `src/content/traducciones-canon/pt-br.yaml` (creados en T017) un borrador de traducción **nodo a nodo** para todos los nodos, con `sourceHash` y `state: borrador` (RQ-02)
- [ ] T084 [US9] **Se ejecuta después de la fase 12** (ajuste de orden del 2026-09-27: la ronda temprana en español puede cambiar el contenido y traducirlo antes obligaría a retraducir; el alcance no cambia). Traducir a `en` y `pt-BR`, en borrador, todas las superficies, principios e interfaz. El inglés se escribe como texto propio, no como calco (traspaso); sin mezclar idiomas (PRD §21.7)

---

## Phase 12: Primera ronda de comprensión · puerta humana

**Purpose**: obtener evidencia de las Job Stories antes de optimizar, diseñar y traducir (`F07`; decisión de Damián Acuña del 2026-09-27). La ronda final de la fase 16 se mantiene.

- [X] T085 Preparar `specs/001-sitio-manifiesto/evidencia/pruebas-comprension.md`: tareas derivadas de la evidencia de cumplimiento de `JS-01`–`JS-09`, participantes de las audiencias del PRD §14.1 y plantilla de notas por sesión, **sin umbral numérico** (decisión del 2026-09-27)
- [ ] T086 STOP · Damián conduce o supervisa unas pocas sesiones en español sobre el sitio con el contenido en borrador y los tokens provisionales; las notas quedan en `specs/001-sitio-manifiesto/evidencia/pruebas-comprension.md`
- [ ] T087 Incorporar los hallazgos al contenido `es` (sigue en `borrador`) y registrarlos en `docs/pilot/registro-del-piloto.md`. Si un hallazgo cambiaría el alcance, un requisito o una historia: STOP y presentarlo a Damián, sin cambiarlo

---

## Phase 13: Calidad transversal

**Purpose**: función sin JavaScript, accesibilidad, bordes, rendimiento y privacidad (bloque 7).

- [ ] T088 [P] Escribir `tests/e2e/sin-js.spec.ts`: las 54 páginas (PRD v1.1) con JavaScript desactivado muestran texto, navegación primaria y anclas (`FR-015`); además, con los estilos desactivados el orden de lectura es correcto en las 48 páginas (PRD §21.4)
- [ ] T089 [P] Escribir `tests/e2e/accesibilidad.spec.ts`: axe sin violaciones AA en las 54 páginas (PRD v1.1) y las 404; recorridos principales solo con teclado; foco visible y no oculto; objetivos de tamaño adecuado (`AC-07`, parte automática)
- [ ] T090 [P] Escribir `tests/e2e/bordes.spec.ts` con los bordes de spec.md:
  - 404 por idioma;
  - una URL antigua redirige (caso de prueba en `_redirects`);
  - reflow a 320 px y zoom al 200 % sin desplazamiento horizontal;
  - tipografías bloqueadas no impiden leer;
  - analítica bloqueada no afecta y la lectura no pide datos personales (`FR-018`, `AC-12`);
  - una URL profunda restituye la sección (`FR-014`);
  - no hay cookies y, en almacenamiento local, solo la preferencia de idioma (PRD §24.3)
- [ ] T091 Autoalojar tipografías en subconjuntos con `font-display: swap` en `public/fonts/` (provisionales hasta la dirección visual) y fijar en `lighthouserc.json` los presupuestos de plan.md: JavaScript de cliente ≤ 10 KB comprimido por página, tipografías ≤ 100 KB en woff2 por página y como máximo dos familias, CSS ≤ 50 KB comprimido (PRD §24.1)
- [ ] T092 Ejecutar `bun run build`, `bun test`, `bunx playwright test` y `bunx lhci autorun`, y registrar resultados, fallos y el informe de visibilidad de RQ-13 en `specs/001-sitio-manifiesto/evidencia/tecnica.md` (`O08`)

---

## Phase 14: Dirección visual · puerta humana

**Purpose**: bloque 8. No empieza sin la elección de Damián.

- [X] T093 STOP · Presentar a Damián Acuña las direcciones A, B y C (enlaces en `docs/pilot/handoff-al-nuevo-proyecto.md`) sobre el sitio ya construido con contenido real, indicando lo que el traspaso manda conservar de cada una, y **esperar su elección**. Si la elegida incluye movimiento no esencial, reabrir RQ-05 y agregar el control de movimiento (`AC-06`)
- [X] T094 Aplicar la dirección elegida en `src/styles/tokens.css`, retirando la marca PROVISIONAL: jerarquía tipográfica y tratamiento de tarjetas (el mérito de A según el traspaso), sin los clichés del PRD §21.2
- [X] T095 STOP · Proponer a Damián la relación entre la tabla de contenidos lateral (el mérito de B, que debe llevar también a otras páginas) y la navegación superior; tras su aprobación, aplicarla en `src/components/NavegacionGlobal.astro` y `src/components/IndiceManifiesto.astro`
- [X] T096 Revisar en todas las vistas de `src/views/` que no compitan títulos con subtítulos redundantes ni aparezcan rótulos que expongan la estructura interna del documento (lecciones del traspaso)
- [ ] T097 Repetir T092 tras aplicar la dirección y actualizar `specs/001-sitio-manifiesto/evidencia/tecnica.md`

---

## Phase 15: Idiomas y revisión · puertas humanas

**Purpose**: bloque 9.

- [ ] T098 [P] Escribir `tests/unit/lenguaje/neutralidad.test.ts`, que detecte en el contenido `es` formas de voseo (`vos`, `sos`, `tenés`, `podés`) y de `vosotros`. Es una ayuda previa a la revisión humana, no la sustituye
- [ ] T099 Preparar en `specs/001-sitio-manifiesto/evidencia/revision-linguistica/` el paquete de revisión de `en` y `pt-BR`, con los textos por id y los nombres de ruta (RQ-03)
- [ ] T100 STOP · Damián contrata la revisión profesional de `en` y `pt-BR`; se registran revisor, fecha y resultado. El agente no marca nada como aprobado
- [ ] T101 Incorporar las correcciones del revisor en los YAML, manteniendo `state: borrador` hasta la aprobación de Damián
- [ ] T102 STOP · Damián revisa la neutralidad latinoamericana del español y aprueba el contenido `es`, `en` y `pt-BR` en los YAML (`approvedBy`)

---

## Phase 16: Validación con personas y aceptación · puertas humanas

**Purpose**: bloque 10.

- [ ] T103 Actualizar `specs/001-sitio-manifiesto/evidencia/pruebas-comprension.md` para la ronda final sobre el sitio completo, con la dirección visual aplicada y los tres idiomas
- [ ] T104 STOP · Damián conduce o supervisa las sesiones y juzga `AC-01` y `AC-02` con las notas
- [ ] T105 STOP · Revisión humana de los recorridos principales con lector de pantalla y teclado (`AC-07`)
- [ ] T106 Validar los datos estructurados con las herramientas de Google aplicables y registrar el resultado en `specs/001-sitio-manifiesto/evidencia/tecnica.md` (PRD §25.3)
- [ ] T107 STOP · Obtener de Damián los datos pendientes y completarlos en `src/content/sitio.yaml` y `src/layouts/Base.astro`:
  - alias de correo;
  - URL del repositorio público para Issues;
  - token de Cloudflare Web Analytics;
  - URL de autor para `Person`, si Damián la aprueba;
  - cómo se declaran las licencias del sitio en el repositorio sin modificar los `LICENSE*` del paquete
- [ ] T108 Ejecutar `bun run check:publish` hasta que pase
- [ ] T109 Ejecutar `/speckit-converge` y reconciliar contra la especificación completa (`AC-10`); sin brechas críticas
- [ ] T110 Configurar el proyecto de Cloudflare Pages con despliegues de vista previa y comprobar, sobre una vista previa, que un despliegue se puede revertir al anterior; registrar el procedimiento en `specs/001-sitio-manifiesto/evidencia/tecnica.md` (PRD §24.2)
- [ ] T111 STOP · Aceptación de Damián antes de publicar (PRD §34). Solo con su autorización explícita, desplegar en Cloudflare Pages

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (1)** → **Foundational (2)** → fases de historia **3 a 11** → **Primera ronda de comprensión (12)** → **Calidad transversal (13)** → **Dirección visual (14)** → **Idiomas (15)** → **Validación y aceptación (16)**.
- Las fases 3 a 11 dependen de la 2. Entre ellas, 4 y 6 amplían `Inicio.astro` después de la 3; 8 y 9 agregan los actos 6 y 7 a la misma vista; 10 usa las vistas de 5 y 7.
- La fase 12 depende de 3 a 11 **y de la conducción humana de las sesiones**. La traducción definitiva y la revisión profesional (fase 15) usan el contenido `es` ya corregido por la ronda temprana.
- La fase 14 depende de 13 y **de la elección humana** de la dirección visual. La 15 depende de 12. La 16 depende de 14 y 15.

### User Story Dependencies

Ninguna historia es opcional ni independiente de las demás en entrega. Dependencias técnicas:

- `US1` → `US2` → `US4`: actos sucesivos de Inicio.
- `US3` antes que `US8`: compartir se agrega a la página de principio.
- `US5` antes que `US8`: compartir se agrega a las secciones del manifiesto.
- `US9` usa todo el contenido redactado en `US1`–`US8`.

### Within Each User Story

Primero la prueba (debe fallar), después el contenido en borrador, luego la vista y, al final, la integración con Inicio o la semántica.

### Parallel Opportunities

- Setup: T004–T009.
- Foundational: T010, T015, T016, T018 y T024 en paralelo; luego la validación y el armazón.
- US3: las diez redacciones de principio, T044–T053.
- Las pruebas de cada historia, marcadas [P], se escriben en paralelo con las de otras historias.
- Fase 13: T088–T090.

## Parallel Example: User Story 3

```bash
# Las diez redacciones de principio, en paralelo:
Task: "T044 Redactar src/content/principios/p01.yaml"
Task: "T045 Redactar src/content/principios/p02.yaml"
# … hasta T053 (p10.yaml)

# Pruebas de la historia, en paralelo con lo anterior:
Task: "T042 tests/e2e/js03-principios.spec.ts"
Task: "T043 tests/unit/principios.test.ts"
```

## Implementation Strategy

**Sin MVP ni entrega incremental.** El PRD no los autoriza. El orden de fases responde a dependencias, bloqueantes y riesgo, y el sitio se publica completo, en tres idiomas y tras la aceptación humana.

1. Fases 1 y 2: la construcción ya protege la fuente canónica y el contenido.
2. Fases 3 a 11: todo el alcance funcional, con contenido en borrador.
3. Fase 12: primera ronda de comprensión en español, antes de optimizar, diseñar y traducir.
4. Fase 13: evidencia técnica sobre el sitio completo.
5. Fases 14 a 16: puertas humanas en el orden que imponen sus dependencias.

La espera de la dirección visual (T093) no detiene las fases 2 a 13.

## Notes

- **Registro del piloto**: durante toda la ejecución, anotar en `docs/pilot/registro-del-piloto.md` (secciones A, B y C) cada caso del PRD §23.4 y lo que funcione.
- Hacer commit tras cada tarea o grupo lógico, solo cuando Damián lo autorice (`AGENTS.md`, regla de confirmación).
- Un STOP no es un pendiente del agente: es una decisión de la persona.

---

## Lo que el manifiesto exige en este artefacto

Cada sección responde una pregunta del núcleo. Si una sección no cambia una decisión ni ayuda a verificarla, el propio núcleo dice que debe simplificarse o eliminarse: no se llena por rutina.

### Mapa de cobertura

| Elementos obligatorios | relaciones | dependencias | implementación | pruebas | estado | excepciones |
|---|---|---|---|---|---|---|
| `FR-001` | `JS-01`, `JS-02` | Fase 2 | T035, T038, T040, T041, T056, T059, T070, T075 | T034, T039 | Planificado | — |
| `FR-002` | `JS-03`, `JS-05` | Fase 2 | T028, T030 | T088, T089 | Planificado | — |
| `FR-003` | `JS-02`, `JS-05` | T011 | T063, T064 | T062, T061 | Planificado | — |
| `FR-004` | `JS-03` | T014 | T054, T055 | T042, T043 | Planificado | — |
| `FR-005` | `JS-01`, `JS-03`, `JS-04` | T014 | T036, T044–T053, T059 | T042, T058 | Planificado | — |
| `FR-006` | `JS-03` | T014 | T044–T053, T054 | T042 | Planificado | — |
| `FR-007` | `JS-06` | T011 | T069, T070 | T068 | Planificado | — |
| `FR-008` | `JS-07` | — | T073 | T071 | Planificado | — |
| `FR-009` | `JS-07` | T016, T019 | T074 | T071, T072 | Planificado | Versión = instalada (decisión 2026-09-27) |
| `FR-010` | `JS-07` | T016 | T074 | T071, T072 | Planificado | Solo estado (decisión PRD §29.6) |
| `FR-011` | `JS-05`, `JS-08` | T025 | T077, T078 | T076 | Planificado | — |
| `FR-012` | `JS-05` | T016 | T063, T065, T067 | T061 | Planificado | — |
| `FR-013` | `JS-04` | — | T005 | T058 | Planificado | — |
| `FR-014` | `JS-05`, `JS-08` | T025 | T030, T064 | T090 | Planificado | — |
| `FR-015` | `JS-04` | — | T028, T037, T077, T082 | T088 | Planificado | — |
| `FR-016` | `JS-05` | T032 | T027, T033, T057, T066 | T020, T080 | Planificado | — |
| `FR-017` | `JS-01`, `JS-08` | T014 | T013, T029, T037 | T034 | Planificado | — |
| `FR-022` (v1.1) | `JS-06` | T112, T113 | T116 | T122 | Planificado | — |
| `FR-018` | Todas · `AC-12` | T008 | T027, T077 | T090 | Planificado | — |
| `FR-019` | `JS-09` | T003 | T025, T030, T017, T083, T084 | T024, T080 | Planificado | — |
| `FR-020` | `JS-09` | T025 | T081, T082 | T079 | Planificado | Preferencia solo en `/` (RQ-04) |
| `FR-021` | `JS-09` | T014 | T019, T017, T022, T023 | T018 | Planificado | Canónico leído, no copiado (decisión 2026-09-27) |
| PRD §16–§19, §21, §24, §25, §27 | `AC-05`–`AC-08`, `AC-11`, `AC-15` | Fases 2 y 13 | T005–T008, T021, T027–T033, T091, T094–T096, T110 | T088–T090, T092 | Planificado | — |
| Puertas humanas | `AC-01`, `AC-02`, `AC-07`, `AC-13` | Fases 12, 14, 15 y 16 | T086, T093, T095, T100, T102, T104, T105, T111 | — | Pendiente de persona | — |

### Plan de aceptación

| Resultados | reglas | Job Stories cuando apliquen | accesibilidad | rendimiento | estados extremos | métricas |
|---|---|---|---|---|---|---|
| `AC-01`, `AC-02`: T085–T087 (ronda temprana) y T103–T104 (ronda final), juicio de Damián. `AC-04`, `AC-05`: T042, T043 e informe RQ-13 (T021, T092) | `RV-01`–`RV-12` (T012, T019, T020, T022) y la comprobación previa a la publicación (T023, T108); `AC-03`: T062; `AC-09`: T072; `AC-15`: T020, T022; `AC-16`: T004 | Una prueba de extremo a extremo por historia (T034, T039, T042, T058, T061, T068, T071, T076, T079) y pruebas con personas (T086, T104) | T089 automática y T105 humana (`AC-07`) | T007, T091, T092 y T097 (`AC-08`) | T088 y T090 (sin JavaScript, 404, redirección, reflow, tipografías, almacenamiento) | Hipótesis del PRD §26.3 tras el lanzamiento; no condicionan la aceptación |

### Nota sobre la plantilla nativa

**Sobre las fases y las prioridades de la plantilla nativa.** Sus rótulos `P1`, `P2`, `P3` y `MVP` solo se usan **cuando el fundamento de producto los haya definido o autorizado**. Si no los autoriza, la numeración de fases es orden de ejecución y nada más: no asigna prioridad, no declara un producto mínimo y no autoriza postergar alcance.

## Phase 17: Convergence

- [ ] T112 Agregar `verificacion` y `texto-integro` a `ID_SUPERFICIES` en `src/lib/contenido/esquemas.ts` y a `src/lib/i18n/rutas.ts` con las rutas de contracts/rutas.md (`/verification`, `/es/verificacion`, `/pt-br/verificacao`; `/manifesto/full-text`, `/es/manifiesto/texto-integro`, `/pt-br/manifesto/texto-integral`); actualizar `tests/unit/i18n/rutas.test.ts` a 54 páginas per PRD §18.1 v1.1 (missing)
- [ ] T113 Crear `src/lib/casas.ts` con la casa de cada nodo canónico según la tabla de docs/design/propuesta-arquitectura-rutas-del-manifiesto.md (Propósito y Gobernanza divididos por subsección) e implementar `RV-13` en `src/lib/validacion/reglas.ts`: cada nodo con contenido aparece completo en su casa y en ninguna otra superficie; fuera de ella solo en bloques `breve` de 60 palabras como máximo; agregar el campo `breve` al bloque `canon`, con su prueba en `tests/unit/validacion/casas.test.ts`. Las secciones `principio-N` tienen como casa su página de principio, que la vista arma completa: `casas.ts` las declara casa por construcción y `RV-13` las cuenta así per PRD §18.3, RQ-14 (missing)
- [ ] T114 Reescribir `src/content/superficies/manifiesto.yaml` y `src/views/Manifiesto.astro` como ruta Comprender: texto canónico, el problema, la conclusión central y el mapa de las cuatro rutas, con la explicación en borrador y el enlace al texto íntegro per FR-003 v1.1, §18.1 (contradicts)
- [ ] T115 Crear `src/views/TextoIntegro.astro`, sus tres rutas y `src/content/superficies/texto-integro.yaml`: núcleo íntegro con índice lateral, anclas y versión; generar en la construcción `/descargas/nucleo-v2.1-es.md` (el archivo original, idéntico byte a byte), `-en.md` y `-pt-br.md` (traducciones rotuladas) y enlazarlas; mover el `CreativeWork` a esta página; en el texto íntegro, `Compartir.astro` copia la dirección de la casa de cada pasaje, no la del texto íntegro per FR-003 v1.1, §18.3, §25.2 (missing)
- [ ] T116 Crear `src/content/superficies/verificacion.yaml` (explicaciones en borrador y canon completo de `verificacion`, `sh-ap`, `sh-done` y `sh-pocket`), `src/views/Verificacion.astro` y sus tres rutas per FR-022 (missing)
- [ ] T117 Reorganizar `src/content/superficies/aplicacion.yaml`: sale el fundamento (a Principios) y la definición de terminado (a Verificación); entran la doctrina para IA, las responsabilidades y los puntos de control, y el ejemplo aplicado, cada uno con su canon completo per FR-007 v1.1 (partial)
- [ ] T118 Agregar a `src/content/superficies/principios.yaml` el fundamento de producto, las Job Stories como forma de referencia y la arquitectura del marco, con canon completo, además de la colección per §18.1 v1.1 (missing)
- [ ] T119 Completar las casas de `src/content/superficies/acerca.yaml` (alcance y lectores; evolución y control de cambios) y `src/content/superficies/speckit.yaml` (límite entre núcleo e implementación) per §18.1 v1.1, §18.3 (partial)
- [ ] T120 Reemplazar en `src/content/superficies/inicio.yaml` los bloques canónicos completos de los actos 1 a 6 por citas `breve` o enlaces a su casa per §18.3 (contradicts)
- [ ] T121 Actualizar `src/components/NavegacionGlobal.astro` y `src/content/interfaz/cadenas.yaml`: agregar Verificación, mostrar la ruta del núcleo como subtítulo de cada superficie y enlazar el texto íntegro desde el pie per §18.1 v1.1 y la decisión de nombres del menú (missing)
- [ ] T122 Actualizar las pruebas: `tests/e2e/js05-fuente.spec.ts` (texto íntegro y descarga), `tests/e2e/js06-aplicacion.spec.ts` (temas v1.1), nuevo `tests/e2e/fr022-verificacion.spec.ts`, y el recuento de 54 páginas en `tests/unit/i18n/hreflang.test.ts` y el sitemap per JS-05, JS-06, FR-022, AC-10 (missing)
