# Implementation Plan: Sitio del Manifiesto de Software Humano

**Branch**: `001-sitio-manifiesto` | **Date**: 2026-09-27 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `specs/001-sitio-manifiesto/spec.md`

**Note**: This template is filled in by the `/speckit-plan` command; its definition describes the execution workflow.

## Summary

Un sitio estático, público y trilingüe que publica el Manifiesto de Software Humano en siete superficies organizadas por las cuatro rutas de lectura del núcleo, una página de texto íntegro y diez páginas de principio: 54 páginas en total (PRD v1.1). Cada pasaje del núcleo tiene una sola casa, verificada por `RV-13`. El texto canónico en español se lee de su archivo fuente; todo lo demás sale de YAML validado, que detiene la construcción ante cualquier inconsistencia. El sitio funciona sin JavaScript; solo hay dos scripts, para la preferencia de idioma y para copiar o compartir. El estado de la adaptación SpecKit es un dato comparado automáticamente con lo instalado.

El plan cubre **todo** el alcance de la especificación. El orden de abajo responde a dependencias y riesgo, **no a prioridad**: ningún bloque es opcional ni posterior a una entrega parcial.

### Cobertura y orden por dependencias

| Bloque | Qué resuelve | Alcance que cubre | Depende de | Puerta humana |
|---|---|---|---|---|
| 1 · Base técnica | Proyecto, tipos estrictos, pruebas, rutas vacías en tres idiomas, cabeceras y redirecciones | `AC-16`, `FR-019` (estructura), PRD §24.3, §24.5 | — | — |
| 2 · Fuente canónica | Lector del núcleo, nodos, anclas derivadas, huella fijada, comparación automática | `FR-003`, `AC-03`, `JS-05`, `RV-01` | 1 | — |
| 3 · Modelo de contenido | Esquemas, validaciones `RV-02`–`RV-12`, estado de la adaptación, comprobación previa a la publicación | `FR-021`, `FR-009`, `FR-010`, `AC-15`, PRD §19, §27 | 1, 2 | — |
| 4 · Superficies y navegación | Seis superficies, siete actos, diez principios con su contrato, navegación global, 404, selector de idioma, copiar y compartir | `FR-001`, `FR-002`, `FR-004`, `FR-005`, `FR-006`, `FR-007`, `FR-008`, `FR-011`, `FR-012`, `FR-014`, `FR-020`, `JS-01`–`JS-09`, PRD §16–§18 | 2, 3 | — |
| 5 · Contenido en borrador | Redacción de explicaciones, ejemplos, contraejemplos, pruebas y textos de superficie en español, con voz impersonal; borradores `en` y `pt-BR`; todo en `borrador` | `FR-005`–`FR-007`, `FR-017`, PRD §21.6 | 3, 4 | Aprobación de contenido |
| 6 · Semántica y descubrimiento | Metadatos, `hreflang`, sitemap, robots, JSON-LD | `FR-016`, `FR-019`, `AC-11`, `AC-15`, PRD §25 | 3, 4 | — |
| 7 · Calidad transversal | Sin JavaScript, movimiento reducido, WCAG 2.2 AA, presupuestos de rendimiento, enlaces, privacidad y medición | `FR-013`, `FR-015`, `FR-018`, `AC-05`, `AC-06`, `AC-07`, `AC-08`, `AC-12`, PRD §21.3–§21.5, §24 | 4 | — |
| 8 · Dirección visual | Aplicar sobre tokens la dirección elegida, conservando lo que el traspaso manda heredar de A, B y C | PRD §21.2, `P06`, `P08` | 4, 7 | **Elección de dirección** (bloquea este bloque) |
| 9 · Idiomas y revisión | Traducción del núcleo nodo a nodo, revisión profesional de `en` y `pt-BR`, neutralidad del español | `AC-13`, `AC-14`, `RV-07`, `RV-08` | 5 | **Revisiones lingüísticas** |
| 10 · Validación con personas y aceptación | Pruebas moderadas de comprensión, lector de pantalla, recorrido completo, aceptación | `AC-01`, `AC-02`, `AC-07`, PRD §26.4, §32 | 5, 8, 9 | **Aceptación antes de publicar** |

**Al terminar el bloque 5 se hace una primera ronda de comprensión en español con el contenido en borrador**, antes de los bloques 7, 8 y 9 (decisión de Damián Acuña, 2026-09-27; `F07`). Los bloques 2, 3 y 6 pueden avanzar en paralelo con la espera de la dirección visual; el bloque 8 no puede empezar sin ella. `AC-10` (desarrollo gobernado) atraviesa todos los bloques y se verifica con `analyze` y `converge`.

## Technical Context

**Language/Version**: TypeScript en modo estricto; versión estable vigente al implementar, fijada en el archivo de bloqueo.

**Primary Dependencies**: Astro (generación estática, internacionalización y colecciones de contenido), Tailwind CSS con daisyUI bajo tokens propios, un lector de Markdown para el núcleo (el que ya trae Astro) y un lector de YAML. Sin framework de interfaz en el cliente (RQ-06).

**Storage**: archivos versionados en el repositorio (YAML y el Markdown del núcleo). En el navegador, solo la preferencia de idioma en almacenamiento local.

**Testing**: `bun test` (unitarias), Playwright con axe (extremo a extremo y accesibilidad automática), Lighthouse CI (rendimiento de laboratorio) y comprobación de enlaces sobre la salida construida.

**Target Platform**: Cloudflare Pages, sitio estático; navegadores modernos con soporte vigente (PRD §24.4).

**Project Type**: sitio web estático, contenido como software.

**Performance Goals**: p75 LCP ≤ 2,5 s, INP ≤ 200 ms y CLS ≤ 0,1 (PRD §24.1). Presupuestos explícitos por página: JavaScript de cliente ≤ 10 KB comprimido, tipografías ≤ 100 KB en woff2 con un máximo de dos familias, CSS ≤ 50 KB comprimido. Se ajustan solo con registro en la evidencia técnica. En laboratorio, INP se aproxima con TBT; el INP real se verifica con CrUX tras el lanzamiento.

**Constraints**:
- función esencial sin JavaScript;
- un único script de terceros (analítica sin cookies);
- sin cuenta ni captura de datos;
- sin enlaces sin destino;
- la construcción se detiene ante contenido inválido o una fuente canónica cambiada.

**Scale/Scope**: 54 páginas de contenido más tres 404 (PRD v1.1). El núcleo tiene unas 10.500 palabras por idioma, con diez principios y seis entradas editoriales cada uno (declaración y fuente se leen del núcleo), en tres idiomas.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Disposición del núcleo | Qué exige | Resultado antes de la fase 0 | Después de la fase 1 |
|---|---|---|---|
| `SH-FUND`, `CR03`, `F03` | Alcance completo, sin omitir ni postergar | Pasa: diez bloques cubren las nueve historias, los veintiún requisitos, los dieciséis criterios y las secciones sin identificador | Pasa |
| `AGENTS.md` regla 3 | Sin prioridad, MVP ni incrementalidad | Pasa: el orden es por dependencias | Pasa |
| `D01`, `SH-STOP` | Sin ambigüedad material abierta | Pasa: la especificación no tiene marcadores; queda abierta la PRD §29.10, que no bloquea | Pasa |
| `D03`, `CR01`, `CR07` | Solución más simple; sin modos, paneles ni abstracciones sin fundamento | Pasa: sin panel de ajustes (RQ-05), sin framework en el cliente (RQ-06), sin modos de construcción (RQ-07) | Pasa |
| `D04`, `CR06` | Reglas críticas deterministas | Pasa: sitio determinista; `RV-01`–`RV-12` detienen la construcción | Pasa |
| `P07`, `FR-017` | Distinguir cita, explicación, ejemplo y estado | Pasa: tipos de entrada y `derivedFrom` obligatorio (`RV-06`) | Pasa |
| `P09`, `FR-015` | Tiempo y continuidad | Pasa: HTML utilizable antes de JavaScript; URL profunda restituye la sección | Pasa |
| `P10`, `FR-018` | Control y datos | Pasa: preferencia local y reversible; sin captura | Pasa |
| `AGENTS.md` regla 9 | El agente no se atribuye aprobaciones | Pasa: todo lo redactado por un agente nace en `borrador`; solo personas aprueban | Pasa |
| Decisiones del 2026-09-27 | Voz impersonal, solo estado, versión como dato, canónico leído | Pasa: RQ-01, RQ-09, `FR-010` y bloque 5 | Pasa |

Sin violaciones. **Complexity Tracking** queda vacío.

## Project Structure

### Documentation (this feature)

```text
specs/001-sitio-manifiesto/
├── plan.md              # Este archivo
├── research.md          # Fase 0: decisiones RQ-01 a RQ-13
├── data-model.md        # Fase 1: entidades, RV-01 a RV-12, estados
├── quickstart.md        # Fase 1: guía de validación
├── contracts/
│   ├── rutas.md                 # Rutas, anclas, idioma, encabezados
│   └── datos-estructurados.md   # JSON-LD por página
├── checklists/requirements.md
├── evidencia/           # Evidencia técnica, revisión lingüística y pruebas de comprensión
└── tasks.md             # Fase 2 (/speckit-tasks; aún no existe)
```

### Source Code (repository root)

```text
src/
├── content/                  # Fuente de contenido (FR-021)
│   ├── sitio.yaml
│   ├── estado-adaptacion.yaml
│   ├── superficies/          # inicio, manifiesto, principios, aplicacion, speckit, acerca
│   ├── principios/           # p01.yaml … p10.yaml, un archivo por principio con sus tres idiomas
│   ├── traducciones-canon/   # en.yaml, pt-br.yaml: una entrada por nodo canónico
│   └── interfaz/             # cadenas de interfaz por clave, con tres idiomas
├── content.config.ts         # Esquemas de las colecciones
├── lib/
│   ├── canon/                # Lector del núcleo, nodos, anclas, huella (RQ-01)
│   ├── validacion/           # RV-01 a RV-12 y comprobación previa a la publicación
│   ├── i18n/                 # Idiomas, rutas equivalentes, hreflang
│   └── semantica/            # Generador de JSON-LD (RQ-08)
├── layouts/
├── components/
├── integrations/             # Validación durante la construcción (RV-01 a RV-12)
├── views/                    # Una vista por superficie, compartida por los tres idiomas
├── pages/                    # Rutas por idioma según contracts/rutas.md
├── cliente/                  # Scripts del navegador: preferencia-idioma.ts, compartir.ts (RQ-06)
└── styles/                   # Tokens propios y tema de daisyUI

scripts/                      # Scripts de construcción: check-publish.ts

public/                       # _headers, _redirects, robots.txt, tipografías
tests/
├── unit/                     # canon, validación, semántica
├── e2e/                      # historias, bordes, accesibilidad, idioma
└── fixtures/                 # contenido de prueba para las reglas

.bun-version
```

**Structure Decision**: un único proyecto estático. El núcleo **no** se mueve de `docs/method/`: se lee desde ahí (RQ-01). La configuración de plataforma vive en `public/`. No hay backend.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

Sin violaciones que justificar.

---

## Lo que el manifiesto exige en este artefacto

Cada sección responde una pregunta del núcleo. Si una sección no cambia una decisión ni ayuda a verificarla, el propio núcleo dice que debe simplificarse o eliminarse: no se llena por rutina.

### Modelo de estados

Detalle y diagramas en [data-model.md](data-model.md).

| Estados | eventos | reglas | errores | permisos | persistencia |
|---|---|---|---|---|---|
| Contenido: `borrador` ↔ `aprobado`. Traducción: `pendiente` → `borrador` → `en revisión` → `aprobada` → `potencialmente obsoleta`. Adaptación: `no publicada` → `publicada`. Preferencia: `none` ↔ `saved(x)`. Página: con JavaScript o sin JavaScript; encontrada o 404 | Aprobación humana; edición; cambio de huella del nodo original; elección o restablecimiento de idioma; decisión de publicar el preset | `RV-01`–`RV-12`; la URL explícita prevalece sobre la preferencia; no hay página en un idioma con fragmentos no aprobados | La construcción se detiene con un mensaje que nombra regla, archivo y entidad; 404 orientadora; los recursos secundarios que fallan no impiden leer | Solo personas aprueban contenido, traducciones y publicación. El agente redacta en `borrador` | Contenido en el repositorio (historia completa, PRD §27.4). Preferencia solo en el navegador, prescindible |

### Presupuesto de complejidad

| Conceptos nuevos | decisiones | pasos | excepciones | opciones visibles |
|---|---|---|---|---|
| Para el visitante, ninguno propio: navegación convencional, selector de idioma con nombres reconocibles y detalles desplegables nativos. Los conceptos del manifiesto son el contenido, no carga de interfaz | El visitante decide solo qué leer, cuánto profundizar y en qué idioma. El sistema resuelve el idioma inicial, el orden canónico y el estado de la adaptación | Llegar a cualquier principio: uno desde la navegación global, o ninguno desde un enlace compartido | Sin JavaScript no se conserva la preferencia en `/`, y queda declarado | Una acción principal por contexto (PRD §18.2); sin panel de ajustes (RQ-05); sin botón de descarga mientras no haya publicación |

### Plan de aceptación

Las comprobaciones repetibles están en [quickstart.md](quickstart.md).

| Resultados | reglas | Job Stories cuando apliquen | accesibilidad | rendimiento | estados extremos | métricas |
|---|---|---|---|---|---|---|
| `AC-01` y `AC-02` por juicio de la autoridad sobre las notas de las pruebas moderadas; `AC-04` y `AC-05`, con la proporción visible medida (RQ-13) como evidencia | `RV-01`–`RV-12` en verde; comprobación previa a la publicación en verde; `AC-03`, `AC-09` y `AC-15` automáticos | Escenarios de aceptación de las nueve historias en pruebas de extremo a extremo, más su evidencia de cumplimiento en pruebas con personas | axe sin violaciones AA; revisión humana con teclado y lector de pantalla (`AC-07`) | Lighthouse CI con los umbrales de `AC-08`; CrUX tras el lanzamiento | Sin JavaScript, movimiento reducido, almacenamiento no disponible, 404, URL antigua, zoom y reflow, idioma sin equivalente | Señales del PRD §26.3 como hipótesis: Search Console, CrUX y Cloudflare Web Analytics, sin optimizar permanencia |

### Registro de decisiones

Todas del 2026-09-27. RQ-04 y RQ-05 rozan la experiencia y las confirmó Damián Acuña el mismo día.

| Alternativas | tradeoffs | supuestos | decisión | fecha | evidencia pendiente |
|---|---|---|---|---|---|
| RQ-04 · Preferencia de idioma: solo en `/` / en toda ruta sin prefijo / nunca | Toda ruta rompe enlaces ingleses compartidos; nunca vuelve inútil la preferencia | La mayoría entra por `/` o por un enlace compartido | **Solo en `/`** · confirmada por Damián Acuña | 2026-09-27 | Pruebas de `JS-09` con personas |
| RQ-05 · Ajustes: panel propio / solo selector de idioma | El panel agrega un concepto sin resolver nada | La dirección visual no tendrá movimiento no esencial | **Solo selector**; se reabre si hay movimiento no esencial · confirmada por Damián Acuña | 2026-09-27 | Dirección visual elegida |
| RQ-03 · Nombres de ruta: localizados / en inglés para todos | Localizados exigen revisión lingüística de las rutas; en inglés mezclan idiomas | — | **Localizados**, con `pNN` estable | 2026-09-27 | Revisión lingüística de las rutas |
| RQ-02 · Traducción del núcleo: nodo a nodo en YAML / Markdown completo | Nodo a nodo exige más estructura, pero hace verificables la paridad y la obsolescencia | — | **Nodo a nodo** | 2026-09-27 | — |
| RQ-06 · Interactividad: sin framework / con framework | Sin framework limita la interactividad; ninguna historia necesita más | — | **Sin framework**; dos scripts | 2026-09-27 | — |
| RQ-07 · Publicación: comando previo aparte / modos de construcción | El comando aparte no agrega configuración | — | **Comando previo aparte** | 2026-09-27 | — |
| Pruebas con personas: una ronda temprana en español con borradores y la ronda final / solo la final | La temprana cuesta sesiones extra; solo la final arriesga retraducir y rediseñar | Las Job Stories no tienen evidencia observada (spec.md) | **Ronda temprana y ronda final** (`F07`) · decidida por Damián Acuña | 2026-09-27 | Notas de la ronda temprana |
| Dirección visual: A / B / síntesis A + B / decidir después de la ronda | La síntesis conserva la jerarquía de A y la navegación de B sobre la estructura de C; elegir antes de la ronda adelanta ese paso | La ronda temprana se hace con la dirección ya aplicada | **Síntesis A + B**, sin animaciones de aparición ni filtros; solo fuentes del sistema · decidida por Damián Acuña | 2026-09-27 | Ronda temprana |
| Titular de portada: frase canónica / copy A / copy C | El copy C sigue el orden del PRD §16 (oportunidad antes que costo); no tiene autoridad canónica | — | **Copy C, a prueba** como primera alternativa · decidida por Damián Acuña | 2026-09-27 | Ronda temprana |
| Arquitectura por rutas del núcleo (PRD v1.1): superficies por ruta con una casa por pasaje / manifiesto íntegro como superficie principal | Menos repetición y rutas por necesidad; exige reorganizar contenido | — | **Rutas y una casa por pasaje; texto íntegro como consulta con descarga; fundamento en Principios; nombres conocidos con la ruta como subtítulo** · decidida por Damián Acuña | 2026-09-27 | Ronda temprana |
| RQ-10 · Estilos: tokens provisionales ahora / esperar la dirección visual | Esperar bloquea bloques que no dependen de ella | La dirección se aplica sobre tokens sin rehacer la estructura | **Tokens provisionales, declarados como tales** | 2026-09-27 | Elección de dirección visual |

**Pendientes que requieren juicio humano** (`O09`):
- elección de la dirección visual;
- revisiones lingüísticas;
- aprobación de todo el contenido redactado;
- dirección del alias de contacto;
- PRD §29.10 (publicación del preset);
- aceptación antes de publicar.

**Riesgo principal**: el costo y el plazo de traducir y revisar profesionalmente unas 10.500 palabras del núcleo en dos idiomas, más el contenido editorial. Afecta la fecha, no el alcance.
