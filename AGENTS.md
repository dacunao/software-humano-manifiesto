# Instrucciones persistentes para agentes

Este archivo es la **fuente única** de las reglas que gobiernan el trabajo de cualquier agente en este repositorio. Es neutral respecto del agente: sirve para Claude Code, Codex, Cursor, Gemini, Copilot o cualquier otro que lea instrucciones persistentes del proyecto.

Si tu agente carga un archivo distinto —`CLAUDE.md`, por ejemplo—, ese archivo debe **referenciar** este, no duplicarlo. Dos copias de instrucciones rectoras divergen; el anexo lo prohíbe expresamente.

## Mandato

Este repositorio aplica el **Núcleo del manifiesto para el desarrollo de software humano con inteligencia artificial v2.1** mediante la adaptación Software Humano para SpecKit, y preserva íntegramente el fundamento de producto autorizado.

No conviertas estas instrucciones en una metodología adicional. Usa el flujo nativo de SpecKit y los artefactos que ya define el núcleo.

## Lectura obligatoria antes de actuar

Lee completos y en este orden:

1. `docs/method/Manifiesto_Software_Humano_IA_Nucleo_v2.1.md`
2. El fundamento de producto autorizado de este proyecto — ver **Completar por proyecto**
3. `docs/method/Anexo_Aplicacion_SpecKit_v2.0.md`
4. `docs/method/GUIA_DE_IMPLEMENTACION_SPECKIT.md`
5. `instructions/00_REQUISITOS_DE_INSTALACION.md`
6. Los artefactos vigentes de `.specify/`, una vez que existan

No basta con buscar palabras o leer resúmenes. Los identificadores permiten navegar y citar; no sustituyen el pasaje completo.

## Autoridad

- El **núcleo** gobierna principios, doctrina, flujo, artefactos, contrato del agente, detenciones, verificación y gobernanza.
- El **fundamento de producto** gobierna visión, alcance completo, requisitos, no objetivos, decisiones aprobadas y aceptación.
- El **anexo** gobierna la correspondencia entre el núcleo y SpecKit.
- El **preset** gobierna la materialización técnica de esa correspondencia.
- **SpecKit** conserva su comportamiento nativo donde el preset no interviene.

El núcleo y el fundamento no compiten: el núcleo gobierna el método y los criterios; el fundamento gobierna el producto.

No alteres silenciosamente una fuente para acomodarla a otra. Si detectas incompatibilidad, cita ambas disposiciones, explica el impacto y detén la decisión afectada.

## Reglas de trabajo

1. Comprende la definición completa antes de proponer **cualquier cosa**: componentes, código, arquitectura, una dirección de diseño, una alternativa o un enfoque. Consulta la doctrina que gobierna esa decisión **antes de formular la propuesta**, no después de que alguien la cuestione.
2. Conserva todos los identificadores del fundamento de producto sin renumerarlos ni reagruparlos.
3. No asignes prioridad, MVP, releases, independencia ni incrementalidad salvo autorización expresa del fundamento.
4. Ordena el trabajo por dependencias, bloqueantes, integración y riesgo sin reducir alcance.
5. Distingue hechos, evidencia, supuestos, inferencias, recomendaciones y decisiones humanas.
6. Utiliza la solución más simple que satisfaga lo aprobado; no agregues modos, paneles, configuraciones, abstracciones ni documentos sin fundamento.
7. Trata experiencia, accesibilidad, rendimiento, confianza, continuidad y control como parte de la funcionalidad.
8. No confundas código correcto, build exitoso o pruebas verdes con aceptación del producto.
9. No te atribuyas revisión humana, excepción aprobada ni autoridad para modificar el fundamento.
10. Mantén trazabilidad bidireccional entre fuente, especificación, plan, tareas, código y evidencia.
11. **Antes de abrir una decisión a la persona, comprueba que las fuentes rectoras no la resuelvan ya.** Debes poder nombrar qué fuente consultaste. Una pregunta cuya respuesta ya está escrita no es deferencia: traslada a la persona un trabajo que te corresponde y gasta la atención que `P06` protege.

Las reglas 1 y 11 existen porque los comandos `speckit.*` solo gobiernan mientras uno de ellos corre. **Una propuesta hecha en conversación, una pregunta formulada en el chat o un informe presentado fuera de un artefacto no pasan por ninguno de ellos.** Este archivo es la única capa presente en ese territorio, y ahí ocurrieron los tres fallos de juicio del primer piloto real.

## Flujo SpecKit obligatorio

1. Comprueba el entorno con `instructions/00_REQUISITOS_DE_INSTALACION.md` y `tools/speckit/preflight.sh`.
2. Instala y verifica el preset siguiendo `instructions/01_INSTALAR_Y_VERIFICAR_SPECKIT.md`.
3. Materializa la constitución v2.1 completa.
4. Ejecuta `specify` usando el fundamento completo como fuente autorizada.
5. Ejecuta `clarify` en rondas focalizadas hasta resolver las decisiones materiales necesarias.
6. Ejecuta `plan` para todo el alcance; crea auxiliares solo cuando respondan una pregunta necesaria.
7. Ejecuta `tasks` con cobertura completa y evidencia trazable.
8. Ejecuta `analyze` sin modificar los artefactos examinados.
9. Presenta los resultados en lenguaje natural y espera revisión humana.
10. Ejecuta `implement` solo después de autorización explícita.
11. Ejecuta `converge` para cerrar brechas del alcance aprobado; no para agregar producto nuevo.

## Condiciones de detención

Detente cuando:

- una ambigüedad pueda cambiar alcance, reglas, derechos, seguridad, contenido o experiencia;
- una fuente autorizada contradiga otra;
- falte autoridad para una decisión irreversible o sensible;
- un requisito, principio, idioma o criterio de aceptación pierda cobertura;
- el plan o una tarea agregue una capacidad sin fundamento;
- exista riesgo de sobrescribir cambios humanos en `.specify/`, documentos rectores o código;
- la constitución no pueda verificarse completa;
- una acción requiera modificar el core de SpecKit o el preset para continuar;
- el resultado solo tenga evidencia técnica y se intente declarar aceptación humana.

Una detención útil indica: el hecho, la evidencia, el impacto, la decisión requerida y la acción que no ejecutaste.

## Archivos protegidos por autoridad

No modifiques sin instrucción humana explícita:

- `docs/method/Manifiesto_Software_Humano_IA_Nucleo_v2.1.md`
- `docs/method/Anexo_Aplicacion_SpecKit_v2.0.md`
- El fundamento de producto autorizado
- El directorio del preset en `tools/speckit/`
- `SHA256SUMS`

Si una implementación revela una mejora posible, regístrala como propuesta separada. No la incorpores retroactivamente a las fuentes.

## Notas de entorno que ahorran tiempo

Estas no son doctrina. Son fricciones reales observadas en instalaciones anteriores.

- **Scripts de SpecKit y PyYAML.** `.specify/scripts/bash/common.sh` usa el primer `python3` del `PATH`. Si no tiene PyYAML, toda resolución de plantillas falla. Antepón el shim del repositorio: `PATH="$PWD/tools/speckit/shim:$PATH"`. No modifiques `.specify/scripts/`: son copias generadas y una actualización las reescribiría.
- **Versión de SpecKit.** Si la instalación global está fuera del rango del preset, usa `tools/speckit/specify`, que fija una instancia aislada sin tocar otros proyectos.
- **Constancia de procedencia.** No modifiques `.specify/memory/.constitution-template.json`. Su desajuste tras materializar la constitución es deliberado: hace que el CLI trate la constitución como documento humano y no la sobrescriba.
- **Estado de la integración.** Tras instalar el preset, `integration status` reporta `warning` con 8 archivos modificados. Es el resultado esperado: son los ocho comandos que el preset compone. Verifica que sean exactamente esos ocho y que no incluyan `checklist` ni `taskstoissues`.

## Comunicación con la persona

- Explica resultados, decisiones, riesgos y evidencia en lenguaje natural.
- Cuando muestres código o comandos, acompáñalos con la consecuencia que producen.
- No ocultes pendientes bajo un estado exitoso.
- Distingue avance técnico, cobertura del alcance y aceptación humana.
- Antes de solicitar autorización para implementar, resume fuente, cobertura, decisiones, riesgos y evidencia esperada.

---

# Completar por proyecto

**Todo lo anterior es invariante y se aplica a cualquier proyecto que use este método. Lo que sigue es específico de este repositorio y debe completarse antes de ejecutar `specify`.**

> **Por eso este archivo queda fuera de `SHA256SUMS`.** Está diseñado para que cada proyecto lo edite, de modo que no es un archivo invariante del método. `SHA256SUMS` verifica el manifiesto, el anexo, el preset, las instrucciones y las herramientas: todo lo que **no** debe cambiar. Si la verificación de integridad falla, hay un problema real; completar esta sección nunca la rompe.

Si un campo está sin completar, el agente debe detenerse y solicitarlo. No lo infiera.

## Producto

- **Nombre del proyecto**: Sitio del Manifiesto de Software Humano (nombre público del sitio: «Manifiesto», igual en los tres idiomas, en `manifiesto.softwarehumano.com`; «Software Humano» es la marca de la agencia que lo publica, en `softwarehumano.com`)
- **Qué construye este repositorio**: el sitio web público, narrativo y documental del Manifiesto de Software Humano, en inglés general, español neutro latinoamericano y portugués de Brasil. Es además el primer proyecto real desarrollado con la adaptación Software Humano para SpecKit (PRD §12, objetivo 8).

## Fundamento de producto autorizado

- **Ruta**: `docs/product/PRD_Sitio_Manifiesto_Software_Humano_v1.6.md` (SHA-256 `74c03b933defe6c2d3cf9ba830991372e62f0eaf0788866856f7ffb30dce1f2e`)
- **Versión**: 1.6, fecha 2026-09-28, vigente. La preferencia de idioma se modifica eligiendo otro idioma, sin acción para restablecerla (ver «Cambios de la versión 1.6»). Las versiones 1.5 (`538a567c…`), 1.4 (`8ad88bdd…`), 1.3 (`ba39d39d…`), 1.2 (`a353a214…`), 1.1 (`bf964e19…`) y 1.0 (`e3ca0ac8…`) se conservan sin cambios como registro histórico y **no gobiernan**.
- **Autoridad de producto**: Damián Acuña

Solo esa autoridad puede aprobar cambios de alcance, resultados, exclusiones o estado de publicación. El agente puede proponer alternativas y señalar contradicciones; no puede aprobarlas.

**Lectura de consulta, sin autoridad.** `docs/pilot/handoff-al-nuevo-proyecto.md` es el traspaso del piloto anterior: qué salió mal antes y qué conviene conservar de las direcciones visuales exploradas (A, B y C, ninguna aprobada). Léelo antes de proponer. No da órdenes: si contradice el PRD o las decisiones registradas en esta sección, valen el PRD y las decisiones. Avisa la contradicción; no la concilies.

## Identificadores que deben preservarse

Sin renumerar ni reagrupar:

- `JS-01`–`JS-09` — Job Stories, con su circunstancia, motivación, resultado y evidencia de cumplimiento
- `FR-001`–`FR-023` — requisitos funcionales (`FR-022` se agregó en la v1.1; `FR-023`, en la v1.2)
- `AC-01`–`AC-16` — criterios de aceptación del producto
- `P01`–`P10` — principios del núcleo, que aquí son además **contenido publicado** del sitio

El orden de las Job Stories permite construir una narrativa; **no expresa prioridad ni autoriza a omitir ninguna** (PRD §15).

## Decisiones técnicas aprobadas

Aprobadas por el PRD y por la autoridad de producto. Se preservan, no se reabren. Astro y daisyUI solo se reemplazan mediante decisión explícita de producto y registro técnico de incompatibilidad material (PRD §24.6, regla de sustitución).

- **TypeScript estricto**; el build falla ante errores de tipado; se evita `any` (PRD §24.6, `AC-16`).
- **Astro** con generación estática; islas solo para interacciones que lo requieran (PRD §24.6).
- **daisyUI sobre Tailwind CSS**, subordinado a tokens propios y a WCAG 2.2 AA (PRD §24.6).
- **YAML versionado en GitHub**, sin CMS, con esquema formal capaz de detener el build (PRD §19.3, `FR-021`).
- **JSON-LD con Schema.org** generado desde la misma fuente que el contenido visible (PRD §25.3).
- **Experiencia pública determinista**: sin función generativa para el visitante en la versión 1.0 (PRD §8.3, §22.1).
- **El texto canónico en español se lee durante el build de su fuente protegida (`docs/method/Manifiesto_Software_Humano_IA_Nucleo_v2.1.md`) y no se copia.** El YAML guarda solo metadatos, identificadores, relaciones y las traducciones. Si la fuente cambia, el build se detiene en lugar de publicar un texto distinto (PRD §19.1, §27.2, `AC-03`; decisión de la autoridad de producto, 2026-09-27).
- **Plataforma**: Cloudflare Pages (decisión de la autoridad de producto).
- **Medición**: Search Console y CrUX sin script, más Cloudflare Web Analytics como **único** script de terceros (decisión de la autoridad de producto; PRD §24.3, `FR-018`).

## Contrato lingüístico

- Inglés general (`en`), con **ortografía estadounidense** (decisión de la autoridad de producto, 2026-09-29), es el idioma predeterminado y ocupa las rutas **sin prefijo**, incluida `/`; sin redirección automática por idioma del navegador (`FR-019`, `FR-020`).
- Español neutro latinoamericano (`es`) en `/es/`; portugués de Brasil en `/pt-br/`, conservando `pt-BR` en metadatos (`FR-019`).
- Las tres versiones cubren el alcance público completo; no son resúmenes (PRD §19.4).
- El manifiesto original en español conserva la autoridad doctrinal; el canónico traducido se distingue del original y lo referencia (PRD §19.4).
- La versión española usa `tú` y `ustedes`; prohíbe voseo, `vosotros` y localismos nacionales (PRD §21.6).
- El cambio de idioma navega a una URL equivalente; una URL localizada explícita prevalece sobre la preferencia guardada (`FR-019`, `FR-020`).
- No se publica una página en un idioma si conserva fragmentos no aprobados de otro (PRD §19.4).
- **Aprobación lingüística**: la autoridad de producto aprueba los tres idiomas. Para inglés y portugués de Brasil, su aprobación reemplaza el servicio profesional pagado (decisión de la autoridad de producto, 2026-09-28): los pasajes del núcleo se aprobaron sobre la traducción revisada por un agente el 2026-09-21 y verificada contra el original (`specs/001-sitio-manifiesto/evidencia/revision-linguistica/`). Sin registro de revisión aprobada, ese idioma no se publica.

## Herramientas del proyecto

- **Gestor de paquetes y ejecutor**: `bun`, con la versión fijada en `.bun-version`. Usa `bun install --frozen-lockfile`, `bun run`, `bunx` y `bun test`. No introduzcas `npm`, `yarn` ni `pnpm`, ni generes sus archivos de bloqueo.
- **Otras restricciones de herramientas**: SpecKit se invoca con `tools/speckit/specify`. Antepón el shim de PyYAML al ejecutar los scripts de `.specify/scripts/bash/`.

## Protocolo de coordinación entre sesiones

Una sola sesión trabaja este repositorio. La sesión del piloto anterior (`/Users/damianacuna/proyectos/sitio-software-humano`) terminó su traspaso el 2026-09-27; ese repositorio es una referencia **de solo lectura**. Ninguna sesión escribe en el repositorio de la otra, y toda consulta entre ellas pasa antes por la autoridad humana.

## Archivos protegidos adicionales

- `docs/design/Software_Humano_Especificacion_Visual_v1.0.md` (SHA-256 `721a409e8ef6fc60226d46729152274e4ad8e60ca6a914b5888ec7af684a0cad`): fuente autorizada del sistema visual, compartida con `softwarehumano.com` (PRD v1.5 §21.2). Autoridad: Damián Acuña.

El PRD ya está protegido por el método como fundamento autorizado.

## Registro del piloto

PRD §12 (objetivo 8) y §23.4 obligan a registrar cualquier caso donde el agente intente imponer historias o prioridades, se pierda una Job Story o un requisito, se genere un documento innecesario, una directiva del núcleo no sea visible para el agente, el plan confunda secuencia con alcance o la implementación cumpla técnicamente pero contradiga la experiencia. Se registra también lo que funciona.

Límite textual de PRD §23.4: «Esos hallazgos servirán para evaluar el preset; no autorizan a modificar el manifiesto o el paquete durante la ejecución sin una decisión separada.»

El registro vive en `docs/pilot/registro-del-piloto.md`, organizado en tres secciones: **A**, donde el preset hizo lo que debía; **B**, fricciones operativas; **C**, defectos y mejoras candidatas. El archivo se crea con el primer hallazgo, no antes.

## Decisiones abiertas conocidas

**Resueltas por la autoridad de producto** (PRD §29, confirmadas el 2026-09-27):

| PRD §29 | Decisión |
|---|---|
| 1 · Nombre y dominio | Sitio: «Manifiesto», valor único en los tres idiomas · `manifiesto.softwarehumano.com` (resolución del 2026-09-28, PRD v1.3). «Software Humano» es la marca de la agencia, en `softwarehumano.com` |
| 2 · Autoría visible | Autor: Damián Acuña, persona. Editor: Software Humano, organización (PRD v1.3 §18.4) |
| 3 · Identidad visual | **Sistema visual compartido de Software Humano v1.0**, definido por la autoridad (PRD v1.5 §21.2). Reemplaza los tokens de la síntesis A + B; se conservan la arquitectura editorial, el índice lateral, la profundidad progresiva y la calma de los márgenes |
| 4 · Protagonismo del autor | Voz impersonal en el recorrido, con una nota de origen en primera persona. *2026-09-29*: la nota de origen es la sección «Por qué existe» de Acerca de, adaptada del copy de Damián (`Copy_Pagina_Acerca_del_Manifiesto_ES_v1.1`) con una primera persona equilibrada, sin énfasis en el autor |
| 5 · Licencia | Texto del núcleo y contenido editorial: CC BY 4.0 · código y método: MIT · nombres «Software Humano» y «Manifiesto» y logotipo excluidos de ambas · tabla por tipo de material en Acerca de (PRD v1.3 §29) |
| 6 · Acción pública sin preset publicado | **Solo estado, sin captura.** El estado de la adaptación se modela como dato; se declara disponibilidad futura, sin botón, formulario ni enlace sin destino |
| 7 · Contacto | Alias de correo como `mailto:`, más Issues del repositorio para lo técnico. La dirección concreta no está definida |
| 8 · Analítica | Ver «Decisiones técnicas aprobadas» |
| 9 · Aprobación lingüística | Ver «Contrato lingüístico» |

**Relación con Software Humano** (decisión de la autoridad de producto, 2026-09-28; PRD v1.3 §18.4): este sitio publica la doctrina; `softwarehumano.com` presenta la agencia. El enlace hacia la agencia va en el pie y en Acerca de. Los pasajes del núcleo viven solo en este sitio; el sitio de la agencia los cita en frases breves con enlace. Este sitio no presenta productos, oferta ni llamados comerciales. Los documentos de marca y el copy de la agencia son insumos y no gobiernan este sitio.

**Cabecera y tema** (decisiones de la autoridad de producto, 2026-09-28; PRD v1.4): logotipo como SVG, con ícono y «Manifiesto» en pantallas anchas y solo el ícono en teléfonos; el resto del sitio sigue con fuentes del sistema. Entrada «GitHub» en el menú, visible solo cuando el repositorio de la adaptación sea público. Idiomas como EN · ES · PT, con el nombre completo accesible. Tema claro u oscuro: por defecto, el del sistema. Reemplaza en parte RQ-05 (sin panel de ajustes): el control de tema es la segunda preferencia real, no un panel.

**Navegación estándar en todo el sitio** (decisión de la autoridad de producto, 2026-09-29; reemplaza la decisión del 2026-09-27 sobre «En esta sección»):
- la columna izquierda muestra solo las páginas de la parte del sitio en que se está, sin desplegar secciones; las páginas sin subpáginas (Inicio, SpecKit y Acerca de) no la tienen;
- la columna derecha, «En esta página», está siempre visible y muestra todas las secciones de la página con sus subtítulos, y marca dónde se está;
- el menú «Manifiesto» abre el Mapa del manifiesto, la primera página del recorrido.

**Búsqueda** (decisión de la autoridad de producto, 2026-09-28; RQ-16 enmendado): motor Pagefind autoalojado, con el índice generado desde nuestro contenido y la interfaz propia. Damián aprueba agregar `'wasm-unsafe-eval'` a la política de seguridad.

**Cabecera sin avisos ni restablecimiento** (decisiones de la autoridad de producto, 2026-09-28): se quita el aviso «Versión preliminar», porque la comprobación previa ya impide publicar borradores y no hay visitantes a quienes advertir; se elimina «Olvidar mi elección de idioma» (PRD v1.6).

**Nombres del menú** (decisión de la autoridad de producto, 2026-09-27; ajustada por la v1.2): las superficies y divisiones se nombran con sustantivos conocidos y la ruta de lectura del núcleo aparece como guía, no como nombre (`P05`). Desde la v1.2, el menú principal es Inicio, Manifiesto, SpecKit y Acerca de, y las rutas agrupan el índice del manifiesto.

**División del núcleo** (decisiones de la autoridad de producto, 2026-09-28): alternativa B de `docs/design/propuesta-nucleo-por-divisiones-2026-09-28.md`, divisiones temáticas de secciones consecutivas, completas y en su orden; sin contenido duplicado; el núcleo completo solo como descarga en el idioma seleccionado; Influencias y notas destilada en Acerca de, con la aclaración sobre Craft citada textual; la Declaración final cierra la Guía de bolsillo; búsqueda incluida.

**Versiones del método que el PRD menciona** (decisión de la autoridad de producto, 2026-09-27): las versiones del método en PRD §2.1, §23.2 y `FR-009` —anexo 1.2, preset 1.0.0— describen su estado al 2026-09-21. El sitio publica la versión **realmente instalada y verificada**, modelada como dato, igual que el resto del estado de la adaptación. El PRD no se enmienda.

**Sigue abierta; no se cierra con valores predeterminados:**

- **PRD §29.10 · Publicación futura del preset**: repositorio, licencia y soporte. No bloquea especificar, planificar ni implementar. Bloquea publicar el preset y emitir el marcado `SoftwareSourceCode` (PRD §25.2).

**Puertas humanas, que no son trabajo pendiente:** elección de la dirección visual (bloquea todo lo posterior), revisión profesional de inglés y portugués de Brasil, revisión de neutralidad del español y aceptación humana antes de publicar (PRD §34: aprobar el fundamento no autoriza publicar).
