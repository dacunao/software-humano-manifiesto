# Feature Specification: Sitio del Manifiesto de Software Humano

**Feature Branch**: `001-sitio-manifiesto`

**Created**: 2026-09-27

**Status**: Draft

**Input**: Fundamento de producto completo: `docs/product/PRD_Sitio_Manifiesto_Software_Humano_v1.6.md` (v1.6, SHA-256 `74c03b93…`) y la especificación visual `docs/design/Software_Humano_Especificacion_Visual_v1.0.md`, más las decisiones de la autoridad de producto registradas en `AGENTS.md` el 2026-09-27 y el 2026-09-28.

**Actualización v1.1** (2026-09-27): la arquitectura de información sigue las cuatro rutas de lectura del núcleo (PRD §18.1), cada pasaje tiene una sola casa (PRD §18.3), el texto íntegro es una página de consulta con descarga (`FR-003`), el fundamento pasa a Principios (`FR-007`) y se agrega Verificación (`FR-022`). Las secciones afectadas están marcadas «v1.1».

**Actualización v1.2** (2026-09-28): el manifiesto se lee en nueve divisiones temáticas de secciones consecutivas del núcleo, completas y en su orden (PRD §18.1); ningún pasaje se lee completo fuera de su división, sin excepciones (§18.3); el núcleo completo se ofrece solo como descarga en el idioma seleccionado (`FR-003`); Influencias y notas se destila en Acerca de y la Declaración final cierra la Guía de bolsillo; se agrega la búsqueda (`FR-023`). Las secciones afectadas están marcadas «v1.2».

**Actualización v1.3** (2026-09-28): el sitio se llama «Manifiesto» en los tres idiomas y vive en `manifiesto.softwarehumano.com`. Su autor es Damián Acuña y su editor, Software Humano, la agencia que publica la doctrina y cuyo sitio es `softwarehumano.com`. El pie y Acerca de enlazan a la agencia; Acerca de explica las licencias por tipo de material; los pasajes del núcleo viven solo aquí y este sitio no presenta oferta comercial (PRD §18.4, §29). Las secciones afectadas están marcadas «v1.3».

**Actualización del 2026-09-29** (decisiones de la autoridad de producto, registradas en `AGENTS.md`; el PRD v1.6 no cambia):
- **Inglés estadounidense.** El inglés usa ortografía estadounidense.
- **Aprobación de los idiomas.** Damián Acuña aprueba `en` y `pt-BR` en lugar del servicio profesional, tras la verificación en cuatro capas (RQ-19).
- **Acerca del Manifiesto.** La página sigue el copy v1.1 de Damián: la nota de origen en primera persona equilibrada; las citas del núcleo con enlace a su casa; al final, las fuentes, la autoría y edición, la procedencia (`FR-012`), la independencia y las licencias.
- **Navegación estándar en todo el sitio** (RQ-20).
- **Hallazgos del recorrido contra los principios.** Se aplicaron R1–R11 (`evidencia/recorrido-con-los-principios-2026-09-29.md`).
- **Huella de construcción en el pie.** Todas las páginas dicen con qué versiones del Manifiesto, de la adaptación y de SpecKit se hizo el sitio (`FR-012`, PRD §4).

**Actualización v1.4** (2026-09-28): logotipo SVG de Software Humano con «Manifiesto» (ícono y nombre en pantallas anchas, solo el ícono en teléfonos); entrada «GitHub» del menú, solo cuando el repositorio de la adaptación sea público; selector de idioma compacto EN · ES · PT con nombres completos accesibles; tema claro u oscuro, que por defecto sigue al sistema (PRD §21.2, §18.2, §21.7, `FR-020`). Las secciones afectadas están marcadas «v1.4».

**Actualización v1.5** (2026-09-28): el aspecto sigue el sistema visual compartido de Software Humano (Noto Sans como única familia, paleta oficial, escala oscura derivada de la Tinta, reglas de componentes y criterios de aceptación de la especificación §10). Las expandibles conservan el control nativo; el panel oscuro canónico se usa en declaraciones y citas; en teléfonos, el índice se abre con «Contenido» (PRD §21.2, §21.7 v1.5).

> **Cómo leer esta especificación.** El PRD es la fuente y conserva la autoridad. Esta especificación **no la reemplaza ni la resume**: organiza su alcance completo para planificar, conserva sus identificadores (`JS-01`–`JS-09`, `FR-001`–`FR-022`, `AC-01`–`AC-16`, `P01`–`P10`) y remite a la sección del PRD donde está el texto íntegro. Ante cualquier diferencia de redacción, vale el PRD.

## User Scenarios & Testing *(mandatory)*

Las nueve Job Stories del PRD (§15) forman el alcance completo de la versión 1.0. **No se asignan prioridades, MVP ni independencia de entrega**: el PRD declara que su orden «permite construir una narrativa; no expresa prioridad ni autoriza a omitir historias», y ninguna fuente autoriza una estrategia incremental (`SH-FUND`, `AGENTS.md` regla 3). Por eso las marcas de prioridad y de «prueba independiente» de la plantilla nativa se reemplazan por la razón de cada historia y por cómo se verifica.

La redacción de cada historia es textual del PRD. Los escenarios de aceptación son **derivados**: traducen la evidencia de cumplimiento y los requisitos vinculados (PRD §33) a situaciones comprobables.

### User Story 1 - `JS-01` Comprender el problema

**Cuando** observo que la IA permite construir más software y más rápido, pero sospecho que eso no necesariamente produce mejores productos, **quiero** comprender qué riesgo humano y de producto aparece detrás de esa velocidad, **para poder** distinguir progreso real de producción técnica.

**Por qué existe**: objetivo 1 del PRD (§12) y tesis del producto (§10). Requisitos: `FR-001`, `FR-005`, `FR-017`. Principios: `P01`, `P02`, `P06`.

**Cómo se verifica**: la persona puede explicar por qué «más capacidad para construir» no equivale a «más capacidad para progresar» (evidencia del PRD). Aceptación: `AC-01`.

**Acceptance Scenarios**:

1. **Given** una persona sin contexto previo que llega a Inicio, **When** recorre los actos 1 y 2 del recorrido narrativo sin abrir detalles, **Then** puede explicar con sus palabras por qué la capacidad de generar software con IA aumenta la necesidad de criterio.
2. **Given** el acto 2, **When** la persona compara una respuesta centrada en el sistema con otra centrada en la persona, **Then** cada una está identificada como ejemplo y no como doctrina (`FR-017`).

---

### User Story 2 - `JS-02` Descubrir la tesis

**Cuando** reconozco que muchas interfaces me obligan a administrar la herramienta en vez de resolver mi necesidad, **quiero** encontrar una afirmación clara que reoriente el diseño, **para poder** evaluar el software desde el progreso de la persona.

**Por qué existe**: objetivo 1 del PRD y tesis del producto (§10). Requisitos: `FR-001`, `FR-003`. Principios: `P01`, `P02`.

**Cómo se verifica**: la persona puede formular la tesis del manifiesto con sus propias palabras. Aceptación: `AC-02`.

**Acceptance Scenarios**:

1. **Given** una persona que llega al acto 3, **When** lee la tesis y el texto canónico breve, **Then** puede explicar sin asistencia que el progreso humano y la experiencia forman parte del producto.
2. **Given** la tesis presentada en el recorrido, **When** la persona quiere leer el texto original, **Then** llega al pasaje canónico correspondiente sin pasos intermedios.

---

### User Story 3 - `JS-03` Comprender cada principio

**Cuando** una decisión de producto parece razonable pero no sé qué efecto tendrá sobre la experiencia, **quiero** comprender qué observa, exige y permite probar cada principio, **para poder** utilizarlo como criterio y no solo como inspiración.

**Por qué existe**: objetivo 2 del PRD. Requisitos: `FR-004`–`FR-006`. Principios: `P01`–`P10`.

**Cómo se verifica**: la persona relaciona una situación con el principio aplicable y explica por qué. Aceptación: `AC-03`, `AC-04`.

**Acceptance Scenarios**:

1. **Given** cualquiera de los diez principios, **When** la persona abre su superficie propia, **Then** encuentra declaración, tensión, significado, consecuencia, ejemplo, contraejemplo, prueba de decisión y fuente (PRD §17).
2. **Given** un escenario de producto descrito en el sitio, **When** la persona lo relaciona con un principio, **Then** el principio ofrece preguntas utilizables en una revisión real (`FR-006`).
3. **Given** la colección de principios, **When** la persona la recorre, **Then** los diez aparecen en su orden canónico, con su identificador y su nombre canónico.

---

### User Story 4 - `JS-04` Experimentar la diferencia

**Cuando** un concepto abstracto no basta para cambiar mi manera de diseñar, **quiero** comparar respuestas centradas en el sistema y respuestas centradas en la persona, **para poder** reconocer la diferencia en decisiones concretas.

**Por qué existe**: objetivos 3 y 7 del PRD. Requisitos: `FR-005`, `FR-013`, `FR-015`. Principios: `P02`–`P08`.

**Cómo se verifica**: la persona identifica qué complejidad, carga o pérdida de control introduce una alternativa.

**Acceptance Scenarios**:

1. **Given** una comparación entre dos respuestas, **When** la persona la recorre, **Then** puede nombrar la carga que introduce la respuesta centrada en el sistema.
2. **Given** una comparación interactiva, **When** JavaScript falla o el movimiento está reducido, **Then** existe una alternativa textual equivalente y no se pierde información (`FR-013`, `FR-015`, PRD §21.3).

---

### User Story 5 - `JS-05` Consultar y citar la fuente

**Cuando** necesito estudiar, discutir o utilizar el manifiesto en un proyecto, **quiero** acceder al texto canónico, su versión y anclas estables, **para poder** verificar el significado y citarlo sin depender de un resumen.

**Por qué existe**: objetivos 4 y 9 del PRD. Requisitos: `FR-003`, `FR-011`, `FR-012`, `FR-016`, `FR-023` (v1.2). Principios: `P07`, `P08`, `P10`.

**Cómo se verifica**: cualquier principio o sección canónica se alcanza directamente y posee una URL o ancla estable. Aceptación: `AC-03`, `AC-11`.

**Acceptance Scenarios**:

1. **Given** una URL profunda a una sección canónica, **When** la persona la abre, **Then** llega a esa sección con la versión del núcleo visible.
2. **Given** el manifiesto (v1.2), **When** la persona recorre sus divisiones con anterior y siguiente, **Then** lee el núcleo v2.1 en su orden, con identificadores y anclas estables, y desde cualquier página puede descargarlo completo en el idioma seleccionado; en español, idéntico a la fuente.
3. **Given** un pasaje citado, **When** la persona lo copia o lo comparte, **Then** la cita conserva procedencia y no atribuye explicación editorial al texto canónico (`FR-011`).
4. **Given** un término o identificador, **When** la persona lo busca (v1.2), **Then** los resultados llevan a la sección exacta, cada pasaje una sola vez (`FR-023`).

---

### User Story 6 - `JS-06` Pasar de doctrina a práctica

**Cuando** estoy de acuerdo con los principios pero no sé cómo incorporarlos al desarrollo cotidiano, **quiero** comprender el flujo, los artefactos, el contrato del agente y la verificación, **para poder** convertir el manifiesto en decisiones y evidencia.

**Por qué existe**: objetivo 5 del PRD. Requisitos: `FR-007`, `FR-022` (v1.2). Principios: `P01`, `P03`, `P07`, `P10`.

**Cómo se verifica**: la persona explica al menos un punto donde el manifiesto puede cambiar o detener el desarrollo.

**Acceptance Scenarios**:

1. **Given** las divisiones del manifiesto (v1.2), **When** la persona recorre Construir con IA, Verificar, Ejemplo aplicado y Gobernanza, **Then** encuentra la doctrina para IA, el flujo, los artefactos, la regla de detención, el contrato del agente, la verificación, los antipatrones, el ejemplo aplicado, las responsabilidades, los puntos de control y la definición de terminado, cada tema en su división y en el orden del núcleo.
2. **Given** una condición de detención explicada, **When** la persona la lee, **Then** puede identificar una decisión que el manifiesto detendría.

---

### User Story 7 - `JS-07` Comprender la implementación en SpecKit

**Cuando** utilizo o evalúo desarrollo guiado por especificaciones con agentes, **quiero** ver cómo la constitución y el preset adaptan SpecKit sin sustituirlo, **para poder** entender qué permanece nativo y qué cambia por el manifiesto.

**Por qué existe**: objetivos 6 y 8 del PRD. Requisitos: `FR-008`–`FR-010`. Principios: `P03`, `P07`, `P10`.

**Cómo se verifica**: la persona distingue núcleo, anexo, preset y SpecKit, y no interpreta la adaptación como oficial. Aceptación: `AC-09`.

**Acceptance Scenarios**:

1. **Given** la superficie «SpecKit», **When** la persona la recorre, **Then** distingue núcleo, constitución, anexo, preset y SpecKit nativo.
2. **Given** que el preset no está publicado, **When** la persona busca cómo obtenerlo, **Then** ve el estado y la disponibilidad futura, sin botón, formulario ni enlace sin destino (`FR-010`, decisión PRD §29.6).
3. **Given** el estado mostrado, **When** se compara con la adaptación realmente instalada y verificada, **Then** versión, fecha y limitaciones coinciden (decisión sobre versiones del método, 2026-09-27).

---

### User Story 8 - `JS-08` Compartir una idea precisa

**Cuando** quiero conversar con otra persona sobre un principio o una decisión, **quiero** compartir una sección autocontenida con contexto suficiente, **para poder** iniciar la conversación sin enviar un documento completo ni perder rigor.

**Por qué existe**: objetivo 9 del PRD. Requisitos: `FR-011`, `FR-017`. Principios: `P05`, `P07`, `P10`.

**Cómo se verifica**: el enlace compartido abre el principio o sección correcta, conserva contexto y ofrece acceso al texto completo.

**Acceptance Scenarios**:

1. **Given** una persona que recibe el enlace a un principio, **When** lo abre, **Then** llega a ese principio con contexto suficiente y acceso al texto completo.
2. **Given** la acción de copiar o compartir, **When** se completa, **Then** hay una confirmación clara y no se captura ningún dato (PRD §17 `P10`).

---

### User Story 9 - `JS-09` Comprender en mi idioma y conservar mi elección

**Cuando** accedo al manifiesto desde un contexto lingüístico distinto o prefiero leerlo en otro idioma, **quiero** elegir entre inglés general, español neutro latinoamericano y portugués de Brasil y mantener esa preferencia durante mi recorrido, **para poder** comprender, navegar y compartir el contenido sin perder contexto ni quedar atrapado en una versión incorrecta.

**Por qué existe**: objetivo 10 del PRD. Requisitos: `FR-019`–`FR-021`. Principios: `P02`, `P04`, `P05`, `P07`, `P10`.

**Cómo se verifica**: sin preferencia previa, la persona recibe inglés en una ruta sin prefijo; luego puede cambiar de idioma desde cualquier superficie, llegar a la sección equivalente, conservar su elección de manera local y reconocer qué versión lingüística está leyendo. Aceptación: `AC-13`, `AC-14`.

**Acceptance Scenarios**:

1. **Given** una primera visita a `/` con un navegador en portugués, **When** la página carga, **Then** se muestra en inglés, sin redirección automática.
2. **Given** una persona en un principio en inglés, **When** elige «Español», **Then** llega al mismo principio en `/es/` y el idioma activo es perceptible, también para tecnologías de asistencia.
3. **Given** una preferencia guardada en español, **When** la persona abre una URL compartida de `/pt-br/`, **Then** ve portugués: la URL explícita prevalece.
4. **Given** una preferencia guardada, **When** la persona elige otro idioma (v1.6), **Then** la preferencia cambia a ese idioma, sin cuenta ni registro.

---

### Edge Cases

- **Búsqueda sin resultados o sin índice** (v1.2): si nada coincide, se dice y se sugiere revisar las palabras; si el índice no se puede descargar, se explica y la navegación sigue disponible (`FR-023`, `V09`).
- **JavaScript deshabilitado o fallido**: el texto, la navegación primaria, las URLs profundas y el contenido canónico siguen disponibles; solo se pierden mejoras interactivas, que tienen alternativa textual (`FR-015`).
- **Movimiento reducido**: con `prefers-reduced-motion`, la experiencia está completa sin movimiento no esencial (`FR-013`).
- **Almacenamiento local no disponible o borrado**: el sitio funciona con el idioma de la URL; la preferencia simplemente no se conserva (`FR-020`, PRD §21.7: «prescindible»).
- **Navegador en otro idioma, primera visita**: la raíz sirve inglés, sin redirección (`FR-020`).
- **Preferencia guardada frente a URL localizada explícita**: gana la URL (`FR-019`).
- **Cambio de idioma sin equivalente exacto**: si una sección no tiene equivalente, la persona llega a la superficie equivalente. Por la paridad exigida (`AC-13`), esto no debería ocurrir en contenido publicado (supuesto; ver Assumptions).
- **Traducción incompleta o no aprobada**: la página no se publica en ese idioma, ni con fragmentos no aprobados de otro (PRD §19.4).
- **URL antigua tras un cambio de estructura**: existe redirección a la nueva (PRD §24.2).
- **URL inexistente**: página 404 útil y orientadora, en el idioma de la ruta (PRD §24.2).
- **Enlace interno roto**: se detecta antes de liberar y bloquea la liberación (PRD §24.2).
- **Fuentes tipográficas o recursos secundarios que fallan**: no impiden leer (PRD §24.1).
- **Cambios en la fuente canónica**: si el archivo del núcleo cambia, la construcción del sitio se detiene en lugar de publicar un texto distinto (decisión del 2026-09-27; PRD §27.2).
- **Contenido estructurado inválido**: identificadores duplicados, relaciones rotas, campos obligatorios ausentes o traducciones requeridas incompletas detienen la construcción (PRD §19.3).
- **El preset se publica**: se actualiza el dato de estado y recién entonces aparecen el enlace real, las instrucciones y el marcado de código fuente, tras validación (`FR-010`, PRD §25.2).
- **Pantalla pequeña, zoom o reflow**: jerarquía equivalente, sin orientación horizontal ni gestos complejos; los diagramas se reestructuran en vez de reducirse hasta volverse ilegibles (PRD §21.4).
- **Solo teclado o lector de pantalla**: los recorridos principales se completan; lo revelado por hover también está disponible por foco o toque (PRD §21.3, §21.5).
- **Analítica bloqueada o sin consentimiento**: el contenido no se bloquea ni se degrada (`FR-018`).

## Requirements *(mandatory)*

### Functional Requirements

Identificadores y contenido del PRD §20, sin renumerar. Texto completo en la sección citada.

- **FR-001** Narrativa progresiva: el sistema MUST presentar el recorrido problema → consecuencias → tesis → principios → aplicación → SpecKit sin exigir conocimientos previos (PRD §20, §16).
- **FR-002** Navegación no lineal: el visitante MUST poder abandonar la secuencia, acceder directamente a cualquier superficie y regresar sin perder orientación. *Desde el 2026-09-29* (RQ-20):
  - la columna izquierda muestra solo las páginas de la parte del sitio en que se está;
  - «En esta página» muestra todas las secciones y subtítulos de la página, y marca dónde se está;
  - el menú «Manifiesto» abre el Mapa del manifiesto;
  - al terminar el recorrido se ofrecen los pasos siguientes: el Mapa, la descarga y SpecKit.
- **FR-003** Texto canónico íntegro (v1.2): el sistema MUST ofrecer el núcleo v2.1 completo como descarga en Markdown en el idioma seleccionado (en español, el archivo original; en inglés y portugués de Brasil, la traducción rotulada y con referencia al original). En el sitio, el núcleo se lee repartido en sus divisiones, en su orden, con identificadores y enlaces estables (PRD §18.1, §18.3).
- **FR-004** Explorador de principios: el sistema MUST permitir recorrer y abrir individualmente `P01`–`P10`, conservando orden, identidad y fuente.
- **FR-005** Ejemplos y contraejemplos: cada principio MUST incluir al menos una situación que permita reconocer su aplicación o incumplimiento, sin convertirla en regla nueva.
- **FR-006** Pruebas de decisión: cada principio MUST exponer preguntas que el visitante pueda usar en una revisión de producto.
- **FR-007** Aplicación operativa (v1.2): el sistema MUST explicar, en la división Construir con IA, la doctrina para IA, el flujo, los artefactos, la regla de detención y el contrato del agente. El fundamento de producto, el ejemplo aplicado y la gobernanza tienen cada uno su división.
- **FR-008** Presentación de SpecKit: el sistema MUST explicar la relación entre núcleo, constitución, anexo, preset y SpecKit nativo.
- **FR-009** Estado verificable de SpecKit: la superficie MUST indicar que la adaptación es independiente, usa presets nativos, no modifica el core, fue validada técnicamente en la versión que corresponda, no está publicada todavía y no es una integración oficial ni un respaldo de GitHub. **Versión publicada**: la realmente instalada y verificada, no la «1.0.0» literal del PRD (decisión de la autoridad de producto, 2026-09-27, registrada en `AGENTS.md`).
- **FR-010** Acciones según estado de publicación: mientras el preset no esté publicado, MUST NOT mostrarse una instalación pública operativa; se muestran estado, arquitectura y disponibilidad futura. **Sin botón, formulario ni captura de datos** (decisión PRD §29.6).
- **FR-011** Compartir y citar: el sistema MUST ofrecer URLs estables para principios y secciones; copiar o compartir usa contenido preciso y no atribuye una explicación editorial al texto canónico. *Desde el 2026-09-29*: con JavaScript se ofrece «Copiar enlace»; sin JavaScript, el enlace a la sección es el respaldo (T218).
- **FR-012** Versiones y procedencia: el visitante MUST poder identificar versión del núcleo, fecha de actualización, procedencia del contenido y estado del preset. *Desde el 2026-09-29*: el pie de todas las páginas reúne la versión del núcleo, la de la adaptación con su estado y la de SpecKit en una sola línea sobre cómo se hizo el sitio, leídas de los datos del proyecto.
- **FR-013** Preferencia de movimiento: el sitio MUST respetar `prefers-reduced-motion` y ofrecer una experiencia completa sin movimiento no esencial.
- **FR-014** Continuidad de lectura: el regreso a una URL profunda MUST restituir la sección correcta; toda preservación adicional de progreso es local, transparente y prescindible (`P09`).
- **FR-015** Función esencial sin JavaScript de cliente: texto, navegación primaria, URLs profundas y contenido canónico MUST seguir disponibles si JavaScript falla o está deshabilitado; las mejoras se incorporan por mejora progresiva (`P09`).
- **FR-016** Descubrimiento: el sitio MUST proporcionar títulos, descripciones, encabezados, enlaces internos, sitemap, URLs canónicas y datos estructurados basados en Schema.org.
- **FR-017** Transparencia de contenido derivado: el sistema MUST distinguir visual y semánticamente cita canónica, explicación, ejemplo, inferencia o propuesta y estado técnico confirmado. *Desde el 2026-09-29*: cada cita traducida lleva un rótulo breve («Texto canónico · traducción») y el aviso de autoridad del original aparece una vez por página (R4). Los enlaces a la casa de un pasaje nombran su destino (R5).
- **FR-018** Privacidad: la lectura MUST NOT requerir cuenta, registro ni datos personales; la medición minimiza datos, documenta su propósito y no bloquea contenido por falta de consentimiento.
- **FR-019** Experiencia multilingüe: todo el alcance público MUST estar en `en`, `es` y `pt-BR`, con URL propia, `lang`, metadatos localizados, `hreflang` recíprocos y correspondencia conceptual. Rutas sin prefijo en inglés; `/es/` y `/pt-br/`; una URL localizada explícita prevalece sobre cualquier preferencia. *Desde el 2026-09-29*: el inglés usa ortografía estadounidense; con JavaScript, el cambio de idioma conserva la posición, gracias al ancla del pasaje en pantalla, que es la misma en los tres idiomas (R11).
- **FR-020** Ajustes de idioma y experiencia: el visitante MUST poder cambiar de idioma desde cualquier superficie sin perder la sección equivalente; la elección se guarda localmente, se modifica y no exige cuenta; sin redirección por idioma del navegador en la primera visita. Los ajustes agrupan solo preferencias reales: idioma y, cuando corresponda, movimiento. Desde la v1.4, el tema claro u oscuro es la segunda preferencia real: por defecto sigue al sistema, se guarda localmente, es reversible y sin JavaScript sigue al sistema; los dos temas cumplen WCAG 2.2 AA. Desde la v1.6, la preferencia se modifica eligiendo otro idioma; no hay una acción para restablecerla.
- **FR-021** Contenido como software: el contenido MUST originarse en YAML versionado en GitHub y validarse en integración y construcción, de modo que cada cambio muestre qué cambió, quién lo aprobó, qué idiomas afecta y qué páginas o datos estructurados genera. **Excepción decidida**: el texto canónico en español se lee de su archivo fuente y no se copia al YAML (PRD §19.1; decisión del 2026-09-27).
- **FR-022** Verificación (v1.2): el sistema MUST presentar, en la división Verificar, las dimensiones de verificación, el scorecard, las preguntas de revisión y los antipatrones, para evaluar un prototipo, una implementación o una entrega; Verificar enlaza a la definición de terminado (Gobernanza) y a la Guía de bolsillo.
- **FR-023** Búsqueda (v1.2): el sistema MUST ofrecer una búsqueda por idioma en el contenido del sitio, cuyos resultados lleven a la sección exacta; sin servidor ni terceros, sin registrar lo buscado (`FR-018`), cargada solo al abrirse (§24.1), con el sitio completo sin JavaScript (`FR-015`) y cada pasaje una sola vez en los resultados (§18.3). *Desde el 2026-09-29*: botón «Limpiar» dentro de la caja; ↑ y ↓ recorren los resultados y Enter abre el elegido; las indicaciones de teclado aparecen al pie, solo con puntero fino (T219).

#### Requisitos del PRD sin identificador propio

Son obligatorios con la misma fuerza que los anteriores. Se citan por sección del PRD, que es su identificador estable; el texto completo está allí y no se duplica.

- **PRD §16 · Recorrido narrativo**: siete actos; entrada directa a cualquier sección; sin scroll bloqueado. Los cuatro capítulos de presentación de `P01`–`P10` son opcionales («puede enmarcarlos») y no alteran la identidad de los principios.
- **PRD §17 · Contrato de cada principio**: superficie propia con declaración, tensión, significado, consecuencia, ejemplo, contraejemplo, prueba de decisión y fuente; más la expresión en el sitio y el incumplimiento que debe evitarse para cada `P01`–`P10`.
- **PRD §18.1 · Superficies y divisiones (v1.2)**: Inicio, Manifiesto, SpecKit y Acerca de. El manifiesto se lee en nueve divisiones de secciones consecutivas del núcleo: 0 Mapa del manifiesto (portada del núcleo y `SH-INDEX`, en ese orden), 1 El manifiesto (propósito y texto canónico), 2 Principios (con una página por principio), 3 Fundamento de producto, 4 Construir con IA, 5 Verificar, 6 Ejemplo aplicado, 7 Gobernanza, 8 Guía de bolsillo, cerrada por la Declaración final. Influencias y notas, destilada en Acerca de. Cada página con URL equivalente por idioma.
- **PRD §18.4 · Relación con Software Humano (v1.3)**: autor Damián Acuña, editor Software Humano; «Publicado por Software Humano · Conoce la empresa ↗» en el pie y una sección en Acerca de; el canon vive solo aquí y el sitio de la agencia lo cita en frases breves con enlace; sin productos, oferta ni llamados comerciales.
- **PRD §29 · Resoluciones (v1.3)**: nombre «Manifiesto» y dominio `manifiesto.softwarehumano.com`; licencias CC BY 4.0 para núcleo y contenido, MIT para código y método, marca reservada, tabla por tipo de material en Acerca de.
- **PRD §18.3 · Una sola casa por pasaje (v1.2)**: cada sección del núcleo se lee completa en una sola división; fuera de ella solo se enlaza o se cita en una frase breve. Sin excepciones: el núcleo completo solo se descarga.
- **PRD §18.2 · Navegación global (v1.2)** desde cualquier página: inicio, el manifiesto y sus divisiones con anterior y siguiente, principios, búsqueda, descarga del núcleo, SpecKit y su estado, versión vigente, cambio de idioma sin perder la sección y ajustes sin interrumpir la lectura. Menú principal: Inicio, Manifiesto, SpecKit y Acerca de; el índice del manifiesto sigue el orden del núcleo, agrupado por las rutas que el núcleo nombra. Sin llamados simultáneos con el mismo peso.
- **PRD §19.1–§19.2 · Tipos de contenido y entidad Principio** (ver Key Entities).
- **PRD §19.3 · Reglas de la fuente de contenido**: identificadores independientes del idioma, separación de tipos, esquema formal y detención de la construcción ante inconsistencias. Sin CMS salvo necesidad demostrada.
- **PRD §19.4 · Contrato de localización**, incluido que el canónico traducido se distingue del original y lo referencia.
- **PRD §21.1–§21.7 · UX/UI**: principios de experiencia, dirección visual (sin clichés de «producto de IA»), interacción narrativa, diseño responsivo, **WCAG 2.2 AA** con la lista de verificación de §21.5, lenguaje y español neutro latinoamericano (`tú`/`ustedes`; sin voseo, `vosotros` ni localismos), selector de idioma nativo con nombres reconocibles y sin banderas como única señal.
- **PRD §22.1 · Experiencia pública determinista**: sin función generativa para el visitante en la versión 1.0.
- **PRD §24.1–§24.5 · Requisitos no funcionales**: rendimiento, confiabilidad y continuidad, seguridad y privacidad, compatibilidad y mantenibilidad.
- **PRD §25.2–§25.4 · Descubrimiento**: requisitos, mapeo semántico mínimo (el marcado de código fuente solo existe con publicación real), validación semántica y multilingüe, y regla para agentes.
- **PRD §27 · Gobernanza editorial**: estados de contenido (canónico aprobado, explicación aprobada, ejemplo aprobado, borrador, estado técnico verificado, propuesta futura), cambios del manifiesto, de SpecKit y de traducciones.
- **Decisiones de la autoridad de producto** (`AGENTS.md`, 2026-09-27): nombre público «Software Humano» y dominio `softwarehumano.com`; autoría visible de Damián Acuña como persona; licencia CC BY 4.0 para texto y contenido editorial y MIT para el código; **voz impersonal en el recorrido, con una nota de origen en primera persona**; contacto por alias de correo y por Issues del repositorio; medición sin scripts salvo un único script de analítica de terceros.

#### Restricciones técnicas aprobadas por el fundamento

No son decisiones de esta especificación: el PRD las fija (§24.6) y solo se reemplazan por decisión explícita de producto con registro de incompatibilidad material. Se consignan aquí porque dos criterios de aceptación dependen de ellas (`AC-15`, `AC-16`); la especificación no agrega ninguna otra.

- TypeScript estricto; Astro con generación estática; daisyUI sobre Tailwind CSS subordinado a tokens propios; YAML versionado como fuente de contenido; JSON-LD generado desde la misma fuente que el contenido visible.

### Key Entities *(include if feature involves data)*

- **Superficie**: Inicio, Manifiesto, SpecKit o Acerca de (PRD §18.1 v1.2). Tiene propósito, contenido principal y una URL equivalente por idioma.
- **División del manifiesto** (v1.2): grupo de secciones consecutivas del núcleo, completas y en su orden, con explicación editorial y canon completo; tiene posición, ruta del núcleo que la agrupa, anterior y siguiente.
- **Casa de un pasaje** (v1.2): la división donde una sección del núcleo se lee completa (PRD §18.3).
- **Principio** (`P01`–`P10`): id estable, nombre y frase canónicos, significado, tensión, reglas, pruebas de decisión, ejemplo, señal de incumplimiento, capítulo de presentación, enlace al texto completo, relaciones con Job Stories y requisitos, y versiones aprobadas en los tres idiomas (PRD §19.2).
- **Texto canónico**: el núcleo v2.1. En español se lee de su fuente; sus traducciones se distinguen del original y lo referencian. Nunca se parafrasea dentro de la superficie canónica.
- **Explicación editorial**: contenido derivado y revisado que referencia su principio o sección de origen.
- **Ejemplo y contraejemplo**: identificado como ejemplo, nunca como doctrina adicional.
- **Estado de implementación**: dato con fecha, versión y limitaciones de la adaptación SpecKit; alimenta `FR-009`, `FR-010` y `FR-012`.
- **Traducción aprobada**: entrada equivalente en otro idioma, que conserva identificador, significado, fuente, versión y estado de revisión.
- **Estado editorial**: canónico aprobado, explicación aprobada, ejemplo aprobado, borrador, estado técnico verificado o propuesta futura (PRD §27.1).
- **Metadatos**: versión, fecha, autoría, idioma, URL canónica, alternas y relaciones semánticas.
- **Preferencia de idioma**: elección local del visitante, reversible y prescindible; nunca prevalece sobre una URL localizada explícita.

## Success Criteria *(mandatory)*

### Measurable Outcomes

Criterios de aceptación del PRD §31, sin renumerar. Donde el PRD fija un umbral, se incluye; donde no lo fija, se indica qué falta.

- **AC-01** Comprensión del problema: una persona sin contexto previo puede explicar por qué la capacidad de generar software con IA aumenta la necesidad de criterio. Umbral: **sin número fijo**. La autoridad de producto decide la aceptación después de revisar las notas de las pruebas moderadas de comprensión con representantes de las audiencias principales (PRD §26.4). Decisión de Damián Acuña, 2026-09-27.
- **AC-02** Comprensión de la tesis: la persona puede explicar que el progreso humano y la experiencia forman parte del producto. Mismo umbral que `AC-01`.
- **AC-03** Integridad doctrinal: los diez principios, sus identificadores y el texto canónico coinciden con el núcleo v2.1; la comparación automática no encuentra diferencias.
- **AC-04** Aplicabilidad: los diez principios contienen una consecuencia y una prueba de decisión utilizable (10 de 10).
- **AC-05** Profundidad progresiva: la narrativa se comprende sin abrir todos los detalles y el contenido completo permanece accesible.
- **AC-06** Control: el visitante puede navegar, saltar, volver, compartir y reducir movimiento sin perder información.
- **AC-07** Accesibilidad: los recorridos principales cumplen WCAG 2.2 AA y pasan revisión humana con teclado y tecnología de asistencia.
- **AC-08** Rendimiento: en el percentil 75, el contenido principal aparece en 2,5 s o menos, la respuesta a interacciones tarda 200 ms o menos y el desplazamiento visual acumulado es 0,1 o menor, sin esperas artificiales (PRD §24.1).
- **AC-09** SpecKit preciso: la explicación distingue doctrina, anexo, preset y framework; declara independencia, estado y límites; el estado publicado coincide con lo instalado y verificado.
- **AC-10** Desarrollo gobernado: los artefactos de SpecKit conservan las nueve Job Stories y los veintitrés requisitos, sin prioridades, MVP ni exclusiones inventadas.
- **AC-11** Descubrimiento y cita: los diez principios tienen dirección estable, metadatos correctos y vínculo con la fuente canónica.
- **AC-12** Privacidad: el sitio se lee íntegramente sin registro ni entrega de información personal.
- **AC-13** Paridad multilingüe: todo el alcance público existe en los tres idiomas, sin fragmentos obligatorios pendientes ni mezclas accidentales; el español supera la revisión de neutralidad latinoamericana.
- **AC-14** Preferencia y continuidad de idioma: se cumplen los cuatro escenarios de `JS-09`.
- **AC-15** Contenido y semántica verificables: la construcción valida contenido, relaciones entre idiomas, enlaces y datos estructurados; el marcado describe solo contenido visible y las comprobaciones no reportan errores críticos.
- **AC-16** Integridad TypeScript: la comprobación estricta de tipos termina sin errores; cualquier excepción está justificada, acotada y aprobada.

Las señales cuantitativas del PRD §26.3 son **hipótesis de calibración**, no criterios de aceptación, y el producto no se optimiza para tiempo de permanencia ni páginas vistas.

## Assumptions

**Supuestos del propio PRD (§30)**, explícitos y reversibles: lanzamiento en tres idiomas con inglés predeterminado y el español original como autoridad doctrinal; rutas sin prefijo en inglés sin redirección; sitio público sin autenticación; YAML sin CMS; arquitectura técnica aprobada; sin función generativa para visitantes; SpecKit como implementación de referencia independiente y no publicada; el texto canónico v2.1 no cambia durante este ciclo.

**Supuestos de esta especificación** (inferencias dentro de la autoridad del agente, reversibles):

- **Ajuste de movimiento**: la superficie de ajustes incluye control de movimiento solo si el sitio tiene movimiento no esencial. Si no lo tiene, basta con respetar la preferencia del sistema (`FR-013`, `FR-020`: «cuando corresponda»). Lo resuelve el plan.
- **Preservación de lectura**: el mínimo obligatorio es que una URL profunda restituya la sección (`FR-014`). No se agrega preservación adicional de progreso salvo que el plan demuestre que una Job Story la necesita (`AGENTS.md` regla 6).
- **Cambio de idioma sin equivalente**: si no existe sección equivalente, se llega a la superficie equivalente. Con la paridad de `AC-13` no debería ocurrir en contenido publicado.
- **Capítulos de presentación**: el agrupamiento de los principios en cuatro capítulos (PRD §16) es opcional y lo decide el diseño.

**Trazabilidad incompleta en la fuente.** La matriz del PRD §33 no vincula `FR-002`, `FR-014` ni `FR-018` con ninguna Job Story. Esta especificación los relaciona con `JS-03`/`JS-05` (`FR-002`), `JS-05`/`JS-08` (`FR-014`) y todas las historias vía `AC-12` (`FR-018`). **Es una vinculación derivada**, no del PRD; no cambia alcance.

**Decisiones abiertas y puertas humanas** (`AGENTS.md`):

- **Abierta**: PRD §29.10, publicación futura del preset (repositorio, licencia y soporte). No bloquea especificar, planificar ni implementar; bloquea publicar el preset y emitir su marcado de código fuente.
- **Puertas humanas, no trabajo pendiente**: elección de la dirección visual (ninguna de A, B ni C del traspaso está aprobada, y la elección bloquea el diseño posterior), aprobación de inglés y portugués de Brasil por Damián Acuña, que reemplaza la revisión profesional (decisión de la autoridad de producto, 2026-09-28), revisión de neutralidad del español y aceptación humana antes de publicar. Aprobar el fundamento no autoriza publicar (PRD §34).

**Insumos sin autoridad**: `docs/pilot/handoff-al-nuevo-proyecto.md` (lecciones y direcciones visuales exploradas) y `docs/design/copy-hero-borrador-2026-09-27.md` (copy del hero, sin aprobar). Se consultan al planificar; no gobiernan.

**Dependencias**: la fuente canónica `docs/method/Manifiesto_Software_Humano_IA_Nucleo_v2.1.md`; el estado real de la adaptación SpecKit instalada; la revisión lingüística externa pagada; la elección de dirección visual.

---

## Lo que el manifiesto exige en este artefacto

Cada sección responde una pregunta del núcleo. Si una sección no cambia una decisión ni ayuda a verificarla, el propio núcleo dice que debe simplificarse o eliminarse: no se llena por rutina.

### Mapa del fundamento

| Fuentes | alcance | resultados | reglas | límites | evidencia | no objetivos |
|---|---|---|---|---|---|---|
| PRD v1.2 (autoridad: Damián Acuña) · núcleo v2.1 (doctrina y texto publicado) · decisiones del 2026-09-27 y del 2026-09-28 en `AGENTS.md` | Sitio público en tres idiomas: cuatro superficies y nueve divisiones del manifiesto, nueve Job Stories, veintitrés requisitos, dieciséis criterios; todos obligatorios (PRD §15, §34) | Los diez objetivos del PRD §12 y el resultado para el visitante de §11.3 | Contrato de localización (§19.4), contrato de principio (§17), transparencia de contenido (`FR-017`), determinismo (§22.1), estado de la adaptación como dato | Sin cuenta ni captura de datos; sin función generativa; sin enlaces sin destino; texto canónico no parafraseado ni copiado; arquitectura técnica aprobada (§24.6) | `AC-01`–`AC-16`, plan de validación (§26.4), definición de terminado (§32) | PRD §13: enseñar SpecKit exhaustivamente, publicar el preset, afirmar respaldo de GitHub, comunidad, certificaciones, blog, personalización, chatbot demostrativo, score que reemplace revisión humana, que el framework dicte la experiencia, CMS innecesario |

### Mapa de cobertura

| Elementos obligatorios | relaciones | dependencias | implementación | pruebas | estado | excepciones |
|---|---|---|---|---|---|---|
| `JS-01` | `FR-001`, `FR-005`, `FR-017` · `AC-01` | Recorrido de Inicio (§16) | Por planificar | Prueba moderada de comprensión | Especificado | — |
| `JS-02` | `FR-001`, `FR-003` · `AC-02` | Acto 3; fuente canónica | Por planificar | Prueba moderada de comprensión | Especificado | — |
| `JS-03` | `FR-004`–`FR-006`, `FR-002`\* · `AC-03`, `AC-04` | Contrato de principio (§17); contenido de los diez principios | Por planificar | Comparación con el núcleo; asociación escenario-principio | Especificado | — |
| `JS-04` | `FR-005`, `FR-013`, `FR-015` · `AC-05`, `AC-06` | Ejemplos aprobados | Por planificar | Comparación accesible sin JS y con movimiento reducido | Especificado | — |
| `JS-05` | `FR-003`, `FR-011`, `FR-012`, `FR-016`, `FR-023`, `FR-002`\*, `FR-014`\* · `AC-03`, `AC-11` | Fuente canónica; anclas estables | Por planificar | URLs profundas; comparación automática del texto | Especificado | — |
| `JS-06` | `FR-007`, `FR-022` | Divisiones Construir con IA, Verificar, Ejemplo aplicado y Gobernanza | Por planificar | Identificación de una detención | Especificado | — |
| `JS-07` | `FR-008`–`FR-010` · `AC-09` | Dato de estado de la adaptación | Por planificar | Estado publicado frente a lo instalado | Especificado | Versión: dato real, no «1.0.0» (decisión 2026-09-27) |
| `JS-08` | `FR-011`, `FR-017`, `FR-014`\* | URLs estables | Por planificar | Enlace compartido abre la sección correcta | Especificado | — |
| `JS-09` | `FR-019`–`FR-021` · `AC-13`, `AC-14` | Traducciones aprobadas; revisión lingüística externa | Por planificar | Cuatro escenarios de `JS-09`; revisión lingüística | Especificado | — |
| `FR-022` (v1.2) | `JS-06` | Contenido canónico de verificación | Por planificar | División Verificar con sus temas y enlaces | Especificado | — |
| `FR-023` (v1.2) | `JS-05` | Índice de búsqueda generado del contenido visible | Por planificar | Búsqueda por idioma que lleva a la sección exacta | Especificado | — |
| `FR-018` | Todas las historias · `AC-12`\* | Decisión de medición | Por planificar | Lectura íntegra sin datos personales | Especificado | — |
| PRD §17, §18, §19, §21, §22.1, §24, §25, §27 | `AC-05`–`AC-08`, `AC-11`, `AC-13`, `AC-15`, `AC-16` | Arquitectura aprobada; dirección visual (puerta humana) | Por planificar | Auditorías de accesibilidad, rendimiento, enlaces y datos estructurados; comprobación de tipos | Especificado | — |
| `AC-10` | Todo el alcance | Este flujo SpecKit | En curso | `analyze` y `converge` sin brechas críticas | En curso | — |

\* Vinculación derivada por esta especificación; el PRD §33 no la incluye.

### Ficha de Job Story cuando aplique

Circunstancia, motivación y resultado son textuales del PRD. **Ninguna historia tiene evidencia causal observada**: el PRD las establece por autoridad de producto, sin investigación registrada. Conducta actual y ansiedad son **inferencias** a partir del PRD §6 y deben validarse en las pruebas moderadas.

| Circunstancia | motivación | resultado | conducta actual | ansiedad | evidencia | supuestos |
|---|---|---|---|---|---|---|
| `JS-01` · Observo que la IA permite construir más y más rápido, pero sospecho que no produce mejores productos | Comprender el riesgo humano y de producto detrás de esa velocidad | Distinguir progreso real de producción técnica | Inferida: juzga por velocidad o cantidad de funciones (§6.2) | Inferida: parecer contrario a la IA o quedarse atrás (§7) | Causal: supuesto declarado. Éxito: explica por qué más capacidad no es más progreso | La audiencia comparte esa sospecha inicial |
| `JS-02` · Reconozco que muchas interfaces me obligan a administrar la herramienta | Encontrar una afirmación clara que reoriente el diseño | Evaluar el software desde el progreso de la persona | Inferida: tolera la fricción como costo normal (§6.3) | No documentada | Causal: supuesto declarado. Éxito: formula la tesis con sus palabras | — |
| `JS-03` · Una decisión parece razonable pero no sé qué efecto tendrá en la experiencia | Comprender qué observa, exige y permite probar cada principio | Usarlo como criterio, no como inspiración | Inferida: decide sin marco compartido (§6.2) | Inferida: que los principios sean lemas vacíos (§6.4) | Causal: supuesto declarado. Éxito: relaciona situación y principio | — |
| `JS-04` · Un concepto abstracto no basta para cambiar mi manera de diseñar | Comparar respuestas centradas en el sistema y en la persona | Reconocer la diferencia en decisiones concretas | No documentada | No documentada | Causal: supuesto declarado. Éxito: identifica la carga que introduce una alternativa | — |
| `JS-05` · Necesito estudiar, discutir o usar el manifiesto en un proyecto | Acceder al texto canónico, su versión y anclas estables | Verificar el significado y citarlo sin depender de un resumen | Inferida: depende de resúmenes (§6.4) | Inferida: citar mal o una versión equivocada | Causal: supuesto declarado. Éxito: alcanza directo cualquier sección con URL estable | — |
| `JS-06` · Estoy de acuerdo con los principios pero no sé incorporarlos al trabajo cotidiano | Comprender flujo, artefactos, contrato y verificación | Convertir el manifiesto en decisiones y evidencia | No documentada | Inferida: que exija una fase documental pesada | Causal: supuesto declarado. Éxito: explica un punto donde el manifiesto detiene el desarrollo | — |
| `JS-07` · Uso o evalúo desarrollo guiado por especificaciones con agentes | Ver cómo constitución y preset adaptan SpecKit sin sustituirlo | Entender qué permanece nativo y qué cambia | No documentada | Inferida: confundir la adaptación con algo oficial (§9) | Causal: supuesto declarado. Éxito: distingue núcleo, anexo, preset y SpecKit | La persona conoce SpecKit o SDD |
| `JS-08` · Quiero conversar con otra persona sobre un principio o una decisión | Compartir una sección autocontenida con contexto | Iniciar la conversación sin enviar el documento completo | Inferida: envía el documento entero o un resumen | Inferida: perder rigor al simplificar | Causal: supuesto declarado. Éxito: el enlace abre la sección correcta con contexto | — |
| `JS-09` · Accedo desde otro contexto lingüístico o prefiero otro idioma | Elegir entre tres idiomas y mantener la preferencia | Comprender, navegar y compartir sin quedar atrapado en otra versión | No documentada | Inferida: quedar atrapado en una versión incorrecta | Causal: supuesto declarado. Éxito: los cuatro escenarios de `JS-09` | Inglés amplía el alcance: es hipótesis y se mide (§26.3, §28) |

### Contrato de experiencia

| Ruta principal | lenguaje | decisiones | feedback | control | recuperación |
|---|---|---|---|---|---|
| Inicio recorre los siete actos: problema → consecuencias → tesis → principios → aplicación → SpecKit (`FR-001`). Desde cualquier punto se entra directo a cualquier superficie o división y se vuelve sin perder orientación (`FR-002`, §18.2); las divisiones se recorren en el orden del núcleo con anterior y siguiente (v1.2). | Claro, directo y preciso; humano sin infantilizar; técnico solo cuando mejora la comprensión; sin grandilocuencia sobre IA (§21.6). Voz impersonal en el recorrido, con una nota de origen en primera persona. Cita canónica siempre distinguible de la explicación (`FR-017`). En español: `tú`/`ustedes`, sin voseo, `vosotros` ni localismos. | **El visitante decide**: cuánto profundizar, a qué superficie ir, qué idioma leer y, si aplica, el movimiento. **El sistema resuelve**: idioma inicial (inglés en rutas sin prefijo), sin preguntar ni redirigir; orden canónico de los principios; estado de la adaptación. No se piden decisiones que el sitio puede resolver. | Idioma activo perceptible, también para tecnologías de asistencia (§21.7); confirmación clara al copiar o compartir (§17 `P10`); orientación persistente de dónde está la persona (§21.1); estados de enlace visibles (§17 `P08`). | Navegación libre, sin scroll secuestrado ni gestos ocultos (§21.3); movimiento reducible (`FR-013`); preferencia de idioma reversible y local (`FR-020`); contenido copiable y URLs estables; sin registro ni personalización obligatoria (§17 `P10`). | URL profunda restituye la sección (`FR-014`); 404 útil y redirecciones (§24.2); función esencial sin JavaScript (`FR-015`); preferencia restablecible; los recursos secundarios que fallan no impiden leer (§24.1). |
