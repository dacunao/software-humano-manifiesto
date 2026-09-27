# Anexo de aplicación del manifiesto de software humano a SpecKit

**Versión 1.2**  
**Documento rector:** Núcleo del manifiesto para el desarrollo de software humano con inteligencia artificial, versión 2.1  
**Ámbito técnico de referencia:** SpecKit 1.x y documentación oficial consultada en septiembre de 2026

## Propósito

Este anexo establece cómo aplicar el núcleo del manifiesto mediante SpecKit. No crea un método nuevo, no completa el manifiesto y no agrega principios, etapas, artefactos, autoridades ni criterios de aceptación. Su única función es asignar los elementos ya aprobados del núcleo a los mecanismos existentes de SpecKit.

La regla que gobierna todo el anexo es:

> Si una disposición de la adaptación no puede trazarse al núcleo v2.1 o a una necesidad técnica inevitable de SpecKit, no pertenece a la adaptación.

El núcleo conserva la autoridad sobre el método. La definición de producto autorizada conserva la autoridad sobre lo que debe construirse. SpecKit organiza la especificación, la planificación, la ejecución y la verificación sin alterar ninguna de esas dos autoridades.

## Filosofía de integración: complemento nativo

Esta adaptación complementa SpecKit; no sustituye su propósito, su motor ni su ciclo SDD. Utiliza el mecanismo oficial de presets para hacer que sus comandos y artefactos nativos operen bajo la doctrina del manifiesto.

La integración conserva:

- la secuencia y la función de `constitution`, `specify`, `clarify`, `plan`, `checklist`, `tasks`, `analyze`, `implement` y `converge`;
- los artefactos nativos `spec.md`, `plan.md`, `tasks.md` y los documentos técnicos aplicables;
- la resolución de plantillas y comandos, los scripts, los hooks, los handoffs y los reportes de ejecución;
- la integración con los agentes soportados y los mecanismos oficiales de instalación y actualización.

El preset compone las instrucciones y estructuras nativas cuyo valor predeterminado contradiga una obligación del núcleo. Solo cuando la composición no pueda resolver el conflicto de manera inequívoca, reemplaza la plantilla o el comando afectado. No elimina capacidades: vuelve condicionales los supuestos que SpecKit presenta por defecto como universales —prioridad, independencia, MVP, incrementalidad, inferencia de vacíos y opcionalidad de pruebas— para que se apliquen solo cuando el fundamento de producto o el riesgo los justifican.

Por tanto, la relación es:

> SpecKit nativo + preset Software Humano = SpecKit operando bajo la doctrina del manifiesto.

Si una adaptación pudiera implementarse conservando el comportamiento nativo, debe conservarlo. Si requiere sustituir el ciclo, introducir otra orquestación o reemplazar los artefactos centrales por equivalentes propios, excede la autoridad de este anexo.

## Alcance y límites

Este anexo define:

- cómo hacer que el núcleo permanezca disponible para los agentes de SpecKit;
- cómo recibir fundamentos de producto de distinta forma, extensión y profundidad;
- cómo aplicar los ocho pasos del flujo del núcleo usando operaciones nativas de SpecKit;
- dónde representar los ocho artefactos del núcleo sin crear archivos innecesarios;
- cómo conservar la autoridad de producto, la cobertura completa y las reglas de detención;
- cómo adaptar los supuestos nativos de SpecKit que no son universales en el manifiesto;
- cómo mantener la adaptación separada del núcleo y resistente a actualizaciones de SpecKit.

Este anexo no define:

- un flujo SDD adicional;
- una estructura obligatoria para el PRD;
- una estrategia incremental, de releases o de MVP;
- nuevos roles o aprobaciones;
- artefactos metodológicos distintos de los establecidos en el núcleo;
- la implementación concreta ni el contenido final de cada archivo del futuro paquete técnico;
- una modificación del código central de SpecKit.

## Relación entre los documentos

La arquitectura normativa contiene dos documentos:

1. **Núcleo v2.1.** Define el método y sus obligaciones.
2. **Anexo SpecKit v1.2.** Define la correspondencia técnica con SpecKit y su navegación operativa para agentes.

El anexo depende del núcleo y no lo sustituye. No debe utilizarse como un resumen suficiente del manifiesto. Ante una contradicción real o aparente, la implementación debe detenerse, señalar las disposiciones involucradas y solicitar una resolución humana; no debe reinterpretar el núcleo para acomodarlo al comportamiento predeterminado de SpecKit.

La definición de producto —un PRD, una Job Story u otra forma autorizada— no queda subordinada al anexo. Continúa gobernando el alcance y los resultados del producto. El núcleo gobierna la manera de comprender, diseñar, implementar y verificar ese alcance.

## Convenciones operativas para agentes

El núcleo v2.1 incorpora identificadores estables para que el preset y los agentes puedan citar disposiciones exactas sin resumirlas ni copiarlas. Este anexo utiliza esos identificadores como direcciones de lectura. No representan controles nuevos y no cambian la secuencia del método.

| Referencia | Significado |
|---|---|
| `P01`–`P10` | Principios del núcleo |
| `SH-FUND` | Fundamento de producto, autoridad, alcance y Job Stories de referencia |
| `D01`–`D06` | Directivas para desarrollo con IA |
| `F01`–`F08` | Flujo de trabajo del núcleo |
| `A01`–`A08` | Artefactos ajustados al contexto |
| `SH-STOP`, `STOP01`–`STOP07` | Regla y razones de detención |
| `CR01`–`CR08` | Contrato reutilizable del agente |
| `O01`–`O09` | Formato de entrega esperado en lenguaje natural |
| `V01`–`V12` | Dimensiones de verificación |
| `SH-SCORE`, `SH-AP`, `SH-GOV`, `SH-DONE`, `SH-POCKET` | Scorecard, anti patrones, gobernanza, definición de terminado y guía breve |

**Regla de resolución.** El identificador localiza el texto rector; el texto rector conserva la autoridad. Si un identificador no puede resolverse, apunta a un contenido distinto del esperado o entra en conflicto con este anexo, el agente debe cargar el pasaje completo, informar la incompatibilidad y detener cualquier decisión afectada.

## Base técnica de SpecKit utilizada

La adaptación se apoya solamente en comportamientos documentados oficialmente:

- SpecKit organiza su proceso principal alrededor de constitución, especificación, planificación, tareas, implementación y convergencia. Clarificación, checklist y análisis funcionan como controles que se utilizan cuando corresponden. La [referencia oficial del proceso](https://github.github.io/spec-kit/reference/agentic-sdd.html) describe esas operaciones y sus relaciones.
- La constitución contiene los principios rectores contra los cuales se evalúan las fases posteriores. En el funcionamiento vigente, `specify`, `plan` y `tasks` cargan la constitución, y `analyze` la trata como no negociable. Las [plantillas oficiales de comandos](https://github.com/github/spec-kit/tree/main/templates/commands) muestran esa carga en tiempo de ejecución.
- Los presets modifican plantillas, comandos y terminología sin cambiar las herramientas de SpecKit. La [guía oficial de personalización](https://github.github.io/spec-kit/guides/customization.html) los recomienda para adaptar el proceso a una metodología y para imponer estándares sobre plantillas existentes.
- Las extensiones agregan capacidades, comandos, integraciones o fases nuevas. Como este anexo no agrega capacidades ni fases, una extensión no es el mecanismo inicial adecuado.
- Los workflows automatizan secuencias y pueden introducir condiciones, ciclos y aprobaciones. El núcleo no exige una nueva secuencia automatizada; por ello, este anexo no define un workflow.
- Los bundles distribuyen componentes existentes como una unidad versionada. Solo tendrían sentido al empaquetar posteriormente una combinación real de componentes. No son necesarios para definir la adaptación.
- Las actualizaciones ordinarias de SpecKit preservan `.specify/memory/constitution.md`. Además, `plan`, `tasks` y `analyze` consultan la constitución vigente en cada ejecución, en lugar de depender de copias congeladas en las plantillas. Esto se encuentra documentado en la [guía oficial de actualización](https://github.github.io/spec-kit/upgrade.html).

## Decisión mínima de implementación

La aplicación se implementará con dos mecanismos y ningún otro por defecto:

1. **Constitución operativa:** una proyección estructuralmente nativa del núcleo completo v2.1 ocupará `.specify/memory/constitution.md` dentro de cada proyecto.
2. **Preset de aplicación:** un preset compondrá las plantillas y los comandos cuyos valores predeterminados sean incompatibles con el núcleo; solo los reemplazará si la composición no puede resolver el conflicto de manera inequívoca.

No se crea una extensión, un workflow ni un bundle mientras no exista una necesidad técnica demostrada que el preset no pueda resolver.

### Constitución operativa

La constitución de SpecKit debe contener el núcleo completo, no un resumen, una selección de principios ni una referencia que el agente pueda omitir. El paquete puede reorganizar técnicamente los encabezados para cumplir la estructura nativa de constitución, pero no puede eliminar, abreviar ni reformular obligaciones. El documento fuente aprobado permanece canónico y la proyección operativa debe conservar su contenido y versión.

La proyección debe respetar las convenciones vigentes de SpecKit:

- un título único de constitución;
- una sección `Core Principles` que contenga los diez principios como subsecciones identificables;
- secciones adicionales para fundamento, doctrina, flujo, contrato y verificación;
- una sección final `Governance`;
- versión semántica, fecha de ratificación y fecha de última modificación en formato ISO;
- ausencia de placeholders sin resolver y principios declarativos, comprobables y con razón explícita.

Esta decisión evita tres problemas:

- que el agente conozca solo el anexo;
- que una síntesis pierda obligaciones del núcleo;
- que los comandos nativos lean una constitución que no contiene realmente el documento rector.

El anexo no se incorpora a la constitución. Sus instrucciones se materializan mediante el preset. El comando de constitución conserva su ubicación, resolución de plantilla, validaciones y reporte de impacto nativos, pero no puede regenerar ni reinterpretar el manifiesto a partir de un prompt circunstancial. Una modificación doctrinal solo procede cuando existe una nueva versión aprobada del núcleo; los principios particulares de un proyecto pertenecen a su definición de producto.

### Preset de aplicación

El preset debe modificar únicamente los archivos necesarios para:

- aceptar como entrada una definición de producto heterogénea;
- preservar la fuente y la autoridad del alcance;
- representar la cobertura completa;
- volver condicionales los valores predeterminados de prioridad, independencia, MVP e incrementalidad;
- impedir que el agente complete ambigüedades materiales mediante convenciones genéricas;
- producir solo los artefactos que respondan una pregunta necesaria;
- mantener trazabilidad hasta la verificación.

Cuando el comportamiento nativo ya cumple el núcleo, se conserva sin cambios.

La materialización posterior deberá concentrarse en las siguientes superficies y no intervenir otras por anticipación:

| Superficie de SpecKit | Tratamiento requerido |
|---|---|
| Constitución y `constitution-template` | Instalar una proyección nativa del núcleo completo, conservar metadatos de gobernanza y evitar modificaciones doctrinales no aprobadas. |
| Comando `specify` y plantilla `spec-template` | Admitir fundamentos heterogéneos, conservar autoridad y cobertura, y retirar prioridades o MVP no autorizados. |
| Comando `clarify` | Conservar rondas nativas de hasta cinco preguntas y repetirlas hasta resolver toda ambigüedad material. |
| Comando `plan` y plantilla `plan-template` | Planificar cobertura completa y generar documentos auxiliares solo cuando correspondan. |
| Comando `tasks` y plantilla `tasks-template` | Ordenar por dependencias e integración sin convertir fases o historias en selección de alcance. |
| Comando `analyze` | Verificar constitución, cobertura, trazabilidad y exclusiones no autorizadas. |
| Comando `implement` | Mantener límites de autoridad, alcance completo y evidencia de avance. |
| Comando `converge` | Cerrar únicamente brechas del alcance aprobado y distinguir convergencia técnica de aceptación. |
| Checklist nativo de requisitos y comando `checklist` | Conservar el checklist de requisitos asociado a `specify`; mantener los checklists personalizados como controles opcionales y separados de la aceptación. |
| `taskstoissues` y otros componentes no relacionados | Mantenerlos fuera de la adaptación. |

## Contrato estructural con SpecKit

El anexo es la especificación de la adaptación; no es por sí mismo un artefacto que SpecKit cargue en tiempo de ejecución. El paquete técnico debe traducir sus disposiciones a las superficies nativas siguientes.

### Constitución

La constitución operativa utiliza la jerarquía, los metadatos y el ciclo de validación de SpecKit. Su contenido proviene exclusivamente del núcleo aprobado. El informe de impacto que produzca el comando de constitución es material temporal de revisión y no pasa a formar parte de la doctrina.

### Preset

El preset debe incluir un `preset.yml` válido, versión semántica propia, restricción explícita de compatibilidad con SpecKit y declaración exacta de las plantillas y comandos que proporciona. La versión del preset es independiente de la versión del núcleo y de la versión editorial de este anexo.

### Plantillas

Las plantillas deben mantener las prácticas nativas de SpecKit: encabezados previsibles, placeholders reemplazables, comentarios HTML para instrucciones de generación e identificadores trazables. Solo pueden modificar secciones necesarias para representar el fundamento heterogéneo, la cobertura completa, la experiencia, las dependencias y la evidencia exigidas por el núcleo.

### Comandos

Los comandos adaptados deben conservar metadatos, entrada del usuario, resolución de plantillas, comprobaciones previas, hooks, handoffs, instrucciones secuenciales y reporte final. Deben utilizar composición —`prepend`, `append` o `wrap`— cuando permita resolver el conflicto sin duplicar el comando completo. El reemplazo total queda reservado para incompatibilidades que no puedan neutralizarse de manera inequívoca mediante composición.

La adaptación debe conservar los tokens y contratos técnicos que SpecKit resuelve en tiempo de ejecución, incluidos `$ARGUMENTS`, `{SCRIPT}`, los nombres `__SPECKIT_COMMAND_*__`, las rutas de artefactos y las señales `NEEDS CLARIFICATION` cuando correspondan. Una instrucción doctrinal no puede romper estos contratos internos.

### Documentación del preset

El paquete debe incluir un `README.md` orientado a instalación y uso, un `CHANGELOG.md` y una licencia. El anexo puede distribuirse como documentación de diseño del preset, pero los agentes aplican el método mediante constitución, plantillas y comandos, no por la mera presencia del anexo.

## Estrategia de lectura y carga progresiva

El núcleo completo permanece instalado como constitución operativa y conserva autoridad en todo momento. Para mejorar el foco del agente, el preset debe señalar el alcance semántico mínimo que requiere cada operación. Esta indicación organiza la atención; no recorta el manifiesto ni impide consultar cualquier otra disposición aplicable.

La lectura funciona en tres niveles:

1. **Nivel permanente.** En toda operación se mantienen activas la autoridad del núcleo, la autoridad de la definición de producto, la prohibición de alterar alcance sin aprobación, la detención ante ambigüedad material y la prohibición de que el agente se otorgue aceptación humana.
2. **Nivel de operación.** Cada comando enfoca los identificadores indicados en el mapa siguiente y los pasajes del producto relacionados con su tarea.
3. **Nivel completo.** El agente revisa el núcleo íntegro cuando encuentra una contradicción, no puede determinar qué regla aplica, actúa sobre una decisión de alto riesgo, ejecuta una revisión transversal o evalúa conformidad final.

Si la implementación de SpecKit carga físicamente el archivo completo en una operación, el mapa continúa siendo útil como índice de atención y comprobación. No exige crear resúmenes, fragmentos ni copias parciales de la constitución.

### Mapa mínimo por operación

| Operación | Referencias mínimas del núcleo | Foco de la operación |
|---|---|---|
| `constitution` | Núcleo completo e índice `SH-INDEX` | Instalar o actualizar el texto aprobado sin reinterpretarlo. |
| `specify` | `SH-FUND`, `P01`, `P02`, `P05`–`P07`, `P10`, `D01`, `D02`, `F01`, `F02`, `F04`, `F05`, `A01`–`A04`, `CR01`–`CR05`, `SH-STOP`, `O01`–`O05`, `O09` | Comprender fuente y alcance, conservar el progreso y producir una especificación verificable. |
| `clarify` | `SH-FUND`, `D02`, `SH-STOP`, `STOP01`–`STOP04`, `CR02`, `CR03`, `O01`, `O04`, `O09` | Distinguir supuestos reversibles de decisiones que requieren autoridad humana. |
| `plan` | `P03`, `P04`, `P06`–`P10`, `D03`, `D04`, `F03`, `F06`, `F07`, `A05`–`A08`, `CR03`–`CR06`, `O05`, `O09` | Resolver estrategia, dependencias, riesgos, reglas y complejidad sin modificar alcance. |
| `tasks` | `F02`, `F03`, `F08`, `A02`, `A07`, `CR03`, `CR07`, `O02`, `O07`–`O09` | Convertir todo el alcance planificado en trabajo trazable y verificable. |
| `checklist` | Identificadores de la pregunta de calidad que motive su uso | Mantener el checklist nativo de requisitos y, cuando se solicite, examinar una necesidad concreta sin confundir revisión con completitud. |
| `analyze` | `F02`, `F08`, `A02`, `A07`, `SH-STOP`, `V01`–`V12`, `SH-SCORE`, `SH-AP`, `SH-GOV`, `SH-DONE` | Detectar inconsistencias, omisiones, desvíos doctrinales y falta de evidencia sin modificar archivos. |
| `implement` | `P03`, `P07`–`P10`, `D04`–`D06`, `F08`, `A02`, `A05`, `A07`, `CR06`, `CR07`, `O06`–`O09` | Ejecutar dentro de la autoridad, cubrir estados y conservar trazabilidad y control. |
| `converge` | `F08`, `A02`, `A07`, `CR08`, `O01`–`O09`, `V01`–`V12`, `SH-SCORE`, `SH-AP`, `SH-DONE`, `STOP01`–`STOP07` | Reconciliar el resultado completo y separar cierre técnico de aceptación humana. |

Estas referencias son un mínimo, no una lista excluyente. El riesgo, el contenido del PRD o una dependencia entre decisiones pueden exigir leer otras partes del núcleo.

## Entrada y autoridad de producto

La entrada de `specify` puede ser una Job Story, varias Job Stories, un PRD con épicas, capacidades, requisitos, reglas, estados y criterios, u otra definición autorizada. La adaptación no obliga a reformular esa entrada para que parezca una colección de historias de usuario.

Antes de generar `spec.md`, el agente debe identificar:

- la fuente o las fuentes autorizadas;
- quién tiene autoridad para modificar el alcance;
- los resultados esperados;
- los elementos obligatorios;
- las reglas, límites y no objetivos explícitos;
- la evidencia disponible;
- las contradicciones o ambigüedades materiales.

`spec.md` es una especificación operativa derivada. No reemplaza silenciosamente al PRD ni adquiere autoridad por haber sido generado por un agente. Debe conservar una referencia a la fuente y permitir recorrer el alcance en ambas direcciones.

Si la definición contiene Job Stories, deben conservarse su circunstancia, motivación y resultado. Si no las contiene, el agente no está obligado a inventarlas. Puede formular una vista derivada solo cuando aporte claridad, identifique explícitamente su carácter derivado y no altere el significado de la fuente.

## Correspondencia de los principios

Los diez principios no se convierten en diez controles ni en diez archivos. La constitución los mantiene vigentes y las operaciones de SpecKit los aplican en las decisiones donde corresponden.

| Principio del núcleo | Aplicación en SpecKit |
|---|---|
| `P01` El progreso del usuario es la unidad de diseño | `spec.md` vincula requisitos y criterios con el fundamento y conserva las Job Stories aplicables. |
| `P02` La experiencia también es funcionalidad | La especificación y la aceptación incluyen esfuerzo, claridad, confianza y recorrido completo. |
| `P03` La complejidad pertenece al sistema | El plan justifica estructuras necesarias y evita exponerlas como trabajo para el usuario. |
| `P04` Simple al comenzar y profundo al necesitarlo | El contrato de experiencia especifica revelación progresiva y capacidad suficiente cuando aplican. |
| `P05` La interfaz no debe convertirse en otra tarea | Los escenarios y criterios comprueban lenguaje, orientación y aprendizaje incidental. |
| `P06` La atención es un recurso del producto | Cada elemento propuesto debe mantener una relación trazable con el fundamento o eliminarse. |
| `P07` La confianza se diseña | Estados, consecuencias, feedback, control y recuperación forman parte de especificación y pruebas. |
| `P08` La calidad vive en la acumulación de detalles | Tareas y verificación incluyen estados normales, vacíos, carga, error, éxito y recuperación. |
| `P09` El tiempo y la continuidad forman parte de la interfaz | Criterios y plan cubren respuesta, progreso, persistencia y retorno cuando sean relevantes. |
| `P10` La persona conserva control y propiedad | Permisos, revisión, corrección, reversibilidad y uso de datos permanecen bajo autoridad humana proporcional. |

## Correspondencia de la doctrina para desarrollo con IA

| Directiva del núcleo | Aplicación en SpecKit |
|---|---|
| `D01` Fundamento antes que implementación | `specify` identifica fuente, autoridad y cobertura antes de que `plan` o `implement` actúen. |
| `D02` Especificación suficiente antes que generación | Las ambigüedades materiales detienen el avance y vuelven a `clarify` o a la autoridad de producto. |
| `D03` Simplicidad deliberada | `plan` registra la alternativa elegida y utiliza el seguimiento de complejidad sin premiar simplemente menos código. |
| `D04` Determinismo donde importa | Especificación, plan y tareas separan reglas verificables de comportamiento generativo. |
| `D05` Verificación antes que aceptación | `analyze`, pruebas y `converge` producen evidencia, pero la aceptación conserva juicio humano. |
| `D06` IA subordinada al usuario | `implement` respeta límites de autoridad, revisión y reversibilidad y no autoaprueba acciones sensibles. |

## Correspondencia del flujo del núcleo

Los ocho pasos del núcleo se aplican dentro de las operaciones existentes de SpecKit. La correspondencia no crea etapas adicionales.

| Paso del núcleo | Aplicación en SpecKit | Evidencia mínima |
|---|---|---|
| `F01` Comprender el fundamento | `specify` carga la constitución y la definición de producto autorizada antes de generar `spec.md`. | Fuente, autoridad, alcance, resultados, reglas, límites, evidencia y no objetivos identificables. |
| `F02` Establecer cobertura | `spec.md` registra los elementos obligatorios de la fuente y su correspondencia con requisitos y criterios. | Ningún elemento obligatorio queda sin destino o sin una excepción aprobada. |
| `F03` Planificar la implementación | `plan` y `tasks` resuelven dependencias, bloqueantes, orden, paralelismo, integración y pruebas. | El plan y las tareas dan cuenta de todo el alcance aprobado. |
| `F04` Concretar el progreso | `specify` conserva las Job Stories existentes o registra una vista derivada cuando corresponde. | Circunstancia, motivación y resultado permanecen separados de la solución. |
| `F05` Establecer el contrato de experiencia | `spec.md` expresa recorrido principal, decisiones, lenguaje, feedback, control, recuperación y criterios de resultado. | La experiencia esperada es verificable y no se reduce a pantallas o endpoints. |
| `F06` Modelar reglas y riesgos | `spec.md` y `plan.md` separan reglas deterministas, comportamiento generativo, permisos, estados y acciones irreversibles. | Decisiones y límites identificables; artefactos técnicos adicionales solo cuando aplican. |
| `F07` Explorar y prototipar | `plan` utiliza investigación, alternativas, prototipos o tareas de validación solo en la profundidad necesaria. | Razón de la alternativa elegida y evidencia proporcional al riesgo. |
| `F08` Construir, integrar y verificar | `implement` ejecuta el plan; `analyze` y `converge` comprueban consistencia y cobertura cuando corresponden; la revisión humana evalúa el resultado completo. | Código, pruebas, cobertura, pendientes y excepciones reconciliados con la definición autorizada. |

Las ejecuciones parciales de `implement` permitidas por SpecKit son divisiones operativas del trabajo. No autorizan a redefinir el alcance ni a declarar terminado el desarrollo antes de reconciliar la totalidad de la definición de producto.

## Correspondencia de los artefactos del núcleo

Los artefactos mantienen la función y el contenido mínimo definidos en el manifiesto. La adaptación no exige un archivo separado para cada uno.

| Artefacto del núcleo | Representación mínima en SpecKit | Regla de proporcionalidad |
|---|---|---|
| `A01` Mapa del fundamento | Sección identificable de `spec.md` con fuente, autoridad, alcance, resultados, reglas, límites, evidencia y no objetivos. | Si la información ya está completa en el PRD, se referencia y solo se registra la correspondencia necesaria. |
| `A02` Mapa de cobertura | Correspondencia dentro de `spec.md`, continuada por identificadores en `tasks.md` y comprobada durante análisis o convergencia. | No se crea una matriz separada salvo que la extensión del alcance impida verificarlo con claridad. |
| `A03` Ficha de Job Story cuando aplique | Sección de escenario en `spec.md` con circunstancia, motivación, resultado, conducta actual, ansiedad, evidencia y supuestos pertinentes. | No se genera cuando la forma no aplica ni se fuerza a toda entrada a convertirse en Job Stories. |
| `A04` Contrato de experiencia | Escenarios, recorrido, criterios, estados y recuperación dentro de `spec.md`. | Su profundidad depende del efecto de la experiencia sobre el resultado. |
| `A05` Modelo de estados | Sección de `spec.md` o `data-model.md` cuando los estados y transiciones son relevantes. | No se crea `data-model.md` para un producto que no necesita modelar datos o estados. |
| `A06` Presupuesto de complejidad | Sección de `plan.md`, utilizando la capacidad nativa de seguimiento de complejidad. | Solo registra conceptos, decisiones, pasos, excepciones u opciones que puedan introducir carga real. |
| `A07` Plan de aceptación | Criterios en `spec.md`, decisiones de prueba en `plan.md` y tareas verificables en `tasks.md`. | No se duplica en un documento adicional si esa distribución permite verificarlo. |
| `A08` Registro de decisiones | Decisiones y alternativas en `plan.md` o `research.md`. | `research.md` solo se crea cuando existen decisiones o incertidumbres que justifican conservar su razonamiento. |

Un archivo vacío, una plantilla completada por rutina o una copia de información ya autorizada constituye incumplimiento del núcleo, no evidencia de rigor.

## Aplicación del contrato reutilizable

El contrato `CR01`–`CR08` gobierna el comportamiento del agente a través de los comandos; no se copia como un nuevo checklist ni se convierte en otro archivo. El preset debe conservar estas obligaciones en las instrucciones de las operaciones correspondientes.

| Cláusula del núcleo | Operaciones donde debe quedar explícita | Evidencia observable |
|---|---|---|
| `CR01` Propósito | `specify`, `plan`, `implement` | La solución se relaciona con el resultado definido y evita complejidad sin fundamento. |
| `CR02` Antes de programar | `specify`, `clarify` | Fuente, autoridad, alcance, evidencia, supuestos y ambigüedades materiales son visibles. |
| `CR03` Al planificar | `plan`, `tasks` | Todo elemento obligatorio tiene destino; dependencias, bloqueantes, integración y pruebas son identificables. |
| `CR04` Al proponer | `specify`, `plan` cuando todavía existe una decisión de producto | Se comparan alternativa recomendada, alternativa más simple y no construir sin presentar una recomendación como aprobación. |
| `CR05` Al diseñar | `specify`, `plan` | El contrato de experiencia utiliza lenguaje humano, jerarquía, profundidad progresiva, feedback y control. |
| `CR06` Al usar IA | `plan`, `implement` | Reglas críticas, incertidumbre, autorización, revisión y reversibilidad reciben tratamiento explícito. |
| `CR07` Al implementar | `implement`, `tasks` | El cambio respeta el alcance, no agrega capacidades y cubre estados e integración. |
| `CR08` Antes de declarar terminado | `analyze`, `converge` | La implementación se reconcilia con la definición completa y entrega evidencia, pendientes y excepciones aprobadas. |

La aplicación distribuida del contrato es deliberada: la obligación acompaña el momento en que puede cambiar una decisión. No crea ocho puertas de aprobación.

## Entrega del agente en lenguaje natural

Los elementos `O01`–`O09` del núcleo forman el vocabulario común de salida. Cada comando debe informar los elementos que haya producido, modificado o comprobado y omitir únicamente los que objetivamente no correspondan a esa operación. La omisión no puede ocultar una incertidumbre, un pendiente o una decisión humana requerida.

| Operación | Contenido mínimo de su resultado escrito |
|---|---|
| `specify` / `clarify` | `O01`–`O04` y `O09`; además `O05` cuando se compararon alternativas. |
| `plan` / `tasks` | `O02`, `O04`, `O05`, `O07` y `O09`. |
| `implement` | `O02`, `O06`–`O09`, distinguiendo avance parcial de completitud. |
| `analyze` / `converge` | Los nueve elementos en la medida necesaria para explicar cobertura, evidencia, brechas, excepciones y juicio humano pendiente. |

El formato puede ser una respuesta, una sección del artefacto nativo o ambas. No exige generar un informe adicional.

## Comportamiento esperado de las operaciones de SpecKit

### `constitution`

Su función en esta adaptación es alojar el núcleo completo como constitución operativa. No debe utilizarse para pedir al agente que genere una versión resumida, mejorada o contextualizada del manifiesto. Los principios específicos de un producto no se agregan alterando el núcleo; pertenecen a su definición de producto y a sus especificaciones.

### `specify`

Debe:

- cargar la constitución antes de interpretar la entrada;
- aceptar como fuente un documento existente y no solamente una descripción breve;
- conservar la estructura y autoridad del fundamento recibido;
- registrar cobertura de todo el alcance autorizado;
- distinguir fuente, interpretación, vista derivada, evidencia y supuesto;
- mantener visibles ambigüedades materiales;
- producir requisitos y criterios trazables.

No debe:

- inventar prioridades;
- seleccionar una parte del PRD como si fuera el alcance completo;
- transformar automáticamente historias en unidades independientes;
- completar con un supuesto una decisión que pueda cambiar alcance, reglas, derechos, seguridad o experiencia;
- crear un checklist adicional propio del manifiesto por rutina; el checklist nativo de requisitos permanece bajo su ciclo normal.

### `clarify`

Se utiliza cuando una ambigüedad material impide especificar o planificar con seguridad. Una aclaración que cambie el alcance o una regla requiere respuesta de la autoridad correspondiente y debe quedar vinculada con la fuente. El agente no puede convertir su opción recomendada en una decisión aprobada.

Se conserva la práctica nativa de formular hasta cinco preguntas focalizadas por ejecución. Ese máximo organiza la interacción, no limita el número total de ambigüedades materiales que deben resolverse: `clarify` puede repetirse por áreas hasta que ninguna decisión material pendiente impida planificar con seguridad. Una conjetura no puede utilizarse para cerrar artificialmente una ronda.

### `plan`

Debe producir una estrategia técnica que cubra la especificación completa, resuelva dependencias y vuelva visibles los bloqueantes. La comprobación de constitución se deriva del núcleo vigente. Las fases técnicas describen orden de ejecución; no redefinen alcance ni crean compromisos de entrega incremental.

Los archivos `research.md`, `data-model.md`, `contracts/` y `quickstart.md` se generan únicamente cuando responden una pregunta real del desarrollo. No se crean como casilleros vacíos ni para satisfacer la estructura de ejemplo de SpecKit.

### `tasks`

Debe derivar tareas para todos los elementos obligatorios y ordenarlas según dependencias, bloqueantes, paralelismo e integración. Puede agruparlas por historia, capacidad, componente técnico u otra unidad que resulte coherente con la definición recibida.

Una etiqueta de fase o prioridad no autoriza a omitir o postergar alcance. La palabra MVP y la presunción de que cada historia debe implementarse y probarse de manera independiente se eliminan salvo que la fuente de producto establezca expresamente esas condiciones.

### `checklist`

El checklist nativo de requisitos que mantiene `specify` se conserva como mecanismo técnico para evaluar completitud, claridad y consistencia de `spec.md`; `clarify` puede reevaluarlo al resolver ambigüedades. No constituye un noveno artefacto del manifiesto ni evidencia de que la implementación esté terminada.

Los checklists personalizados generados por el comando `checklist` permanecen opcionales y bajo autoridad del revisor. Se utilizan cuando una pregunta de calidad necesita un control específico y no pueden autoaprobarse por el agente ni confundirse con tareas de implementación.

### `analyze`

Realiza una comprobación de consistencia sin modificar archivos. Debe considerar críticas las contradicciones con el núcleo y comprobar también:

- cobertura del fundamento autorizado;
- requisitos sin tareas;
- tareas sin fundamento;
- prioridades o exclusiones no autorizadas;
- pérdida de Job Stories aplicables;
- confusión entre secuencia técnica y alcance comprometido.

Las correcciones vuelven al artefacto que posee la decisión. `analyze` no reescribe el PRD, la especificación, el plan ni las tareas por iniciativa propia.

### `implement`

Ejecuta las tareas dentro de su autoridad. Puede trabajar por segmentos para administrar el contexto y verificar progresivamente, pero debe mantener visible el inventario completo. No agrega features, modos, configuraciones ni abstracciones no solicitadas. No se atribuye aprobación humana a partir de sus propias pruebas.

### `converge`

Compara la implementación con `spec.md`, `plan.md` y `tasks.md`, y debe poder recorrer desde esos artefactos hasta la fuente autorizada. Solo puede agregar tareas destinadas a cerrar una brecha del alcance aprobado. Una propuesta nueva o un cambio de producto se reporta para decisión humana y no se incorpora como trabajo pendiente autorizado.

La convergencia técnica no equivale por sí sola a aceptación de producto. El desarrollo se declara terminado únicamente bajo la definición de terminado del núcleo.

## Valores predeterminados que deben volverse condicionales

La aplicación fiel no elimina capacidades de SpecKit. Vuelve condicionales algunos valores predeterminados de sus plantillas y comandos porque el núcleo no permite aplicarlos como reglas universales.

| Valor predeterminado de SpecKit | Por qué no es universal | Tratamiento de la adaptación |
|---|---|---|
| La especificación se organiza como historias de usuario priorizadas P1, P2 y P3. | El fundamento puede usar Job Stories, capacidades, requisitos, reglas u otra estructura autorizada. | Conservar la estructura recibida. Utilizar historias y prioridades cuando producto las haya definido o autorizado. |
| La primera historia se identifica como MVP. | El núcleo no presupone una estrategia de producto incremental. | Mantener la capacidad de MVP, pero activarla únicamente cuando la definición de producto la establezca. |
| Cada historia debe poder implementarse y probarse de manera independiente. | Algunas especificaciones tienen dependencias legítimas y producen el resultado solo al integrarse. | Utilizar independencia cuando sea real; representar dependencias, integración y prueba conjunta cuando no lo sea. |
| Las tareas se agrupan por historias y se ordenan principalmente por su prioridad. | La secuencia técnica puede depender de bloqueantes, estados, componentes o integración. | Permitir agrupación por historia, capacidad, componente u otra unidad coherente; ordenar sin perder cobertura. |
| `specify` puede completar vacíos con defaults y restringe el número de marcadores de aclaración. | Un límite no puede ocultar una decisión material sobre alcance, reglas, derechos, seguridad o experiencia. | Usar defaults solo para decisiones menores y reversibles; derivar toda ambigüedad material a `clarify` o a la autoridad correspondiente. |
| Las pruebas de implementación se incluyen solo cuando se solicitan expresamente. | La evidencia necesaria depende de los criterios de aceptación y del riesgo, no de que el prompt use la palabra prueba. | Generar pruebas técnicas o evidencia equivalente cuando sean necesarias para demostrar aceptación, con rigor proporcional al riesgo. |
| `plan` genera un conjunto predeterminado de documentos auxiliares. | Un documento vacío o irrelevante agrega carga sin cambiar una decisión. | Conservar los formatos nativos y materializar cada documento cuando sea aplicable; no rellenar casilleros artificiales. |
| Una ejecución parcial de `implement` puede presentarse como una entrega funcional. | La división operativa no redefine el alcance ni demuestra completitud. | Informarla como estado de avance; declarar terminado solo después de reconciliar la definición completa. |

La prioridad, el MVP, la independencia, la agrupación por historias y la entrega incremental siguen disponibles. La adaptación modifica su condición de aplicación —de siempre a cuando corresponda— y no su existencia.

Los mecanismos nativos de constitución, clarificación por rondas, checklist de requisitos, análisis de consistencia, fases técnicas, hooks, handoffs y convergencia se conservan porque no contradicen el núcleo.

## Autoridad y reglas de detención

La adaptación debe aplicar sin modificaciones las preguntas y reglas de detención del núcleo. En términos operativos, un agente de SpecKit se detiene cuando:

- no identifica una fuente autorizada;
- no puede dar cuenta de todo el alcance obligatorio;
- encuentra una contradicción que puede cambiar la solución;
- una ambigüedad material afecta alcance, regla, derecho, seguridad o experiencia;
- se pretende omitir, modificar o postergar alcance sin aprobación;
- una acción sensible carece de determinismo, autorización o recuperación;
- solo puede demostrar funcionamiento técnico y no progreso del usuario.

El agente puede avanzar con un supuesto cuando sea menor, reversible, explícito y se encuentre dentro de su autoridad. El supuesto nunca reduce silenciosamente la cobertura.

## Verificación y aceptación

SpecKit aporta mecanismos de especificación, consistencia, ejecución y convergencia. La aceptación debe conservar todas las dimensiones establecidas en el núcleo:

- cobertura;
- progreso;
- causalidad;
- comprensión;
- carga;
- profundidad;
- confianza;
- control;
- estados;
- accesibilidad;
- rendimiento;
- uso responsable de IA.

Las pruebas técnicas demuestran que el sistema se comporta según determinadas condiciones. La conformidad de producto demuestra que la implementación cubre la definición autorizada. La revisión humana evalúa sentido, riesgo, experiencia completa y excepciones. Estas verificaciones pueden apoyarse en los mismos artefactos; no requieren tres informes separados.

El resultado de cada operación relevante debe expresarse también en lenguaje natural e indicar, según corresponda:

- qué fuente y qué alcance fueron utilizados;
- qué quedó cubierto;
- qué evidencia fue obtenida;
- qué supuestos permanecen;
- qué excepciones fueron aprobadas;
- qué decisiones requieren juicio humano.

## Activación de los controles transversales

Los controles del núcleo se aplican en los momentos donde pueden cambiar una decisión o impedir una aceptación. No se ejecutan como ceremonias independientes.

| Control del núcleo | Aplicación en SpecKit | Límite de autoridad del agente |
|---|---|---|
| `SH-AP` Anti patrones | `plan` e `implement` los usan como señales preventivas; `analyze` y `converge` comprueban si alguno aparece en el resultado. | Puede señalar el desvío y corregirlo si la corrección ya está autorizada; no redefine el producto. |
| `SH-SCORE` Scorecard | `converge` puede presentar una valoración provisional respaldada por evidencia; `analyze` puede mostrar dimensiones sin evidencia. | No fija por sí mismo el umbral del proyecto ni convierte un puntaje en aceptación. |
| `SH-GOV` Gobernanza y puntos de control | Los comandos respetan la autoridad asignada a producto, diseño, ingeniería, agente y revisión humana. | El agente informa qué decisión corresponde a una persona y no simula su aprobación. |
| `SH-DONE` Definición de terminado | `converge` reconcilia cobertura y evidencia contra ella; la revisión humana conserva la decisión final de aceptación. | Una ejecución exitosa, pruebas verdes o convergencia técnica no bastan para declarar completo el producto. |
| `SH-POCKET` Guía de bolsillo | Se utiliza como recordatorio en decisiones relevantes y revisiones humanas, no como formulario que deba completarse en cada comando. | No agrega catorce controles ni siete etapas al flujo. |
| `STOP01`–`STOP07` Razones de detención | Todo comando las aplica cuando el supuesto correspondiente se vuelve observable. | El agente puede detener y explicar; solo la autoridad competente puede resolver la decisión material. |

Este uso conserva la función de cada elemento sin duplicarlo en plantillas. Si una plantilla necesita una instrucción, debe referenciar el identificador y describir el comportamiento exigido; no copiar una versión abreviada que pueda divergir del núcleo.

## Persistencia y actualizaciones

La adaptación no modifica el código central de SpecKit. Utiliza su mecanismo de constitución y su sistema de presets.

La constitución operativa permanece bajo control de versión y conserva identificada la versión del núcleo. El preset mantiene su propia versión semántica y declara con qué versión del núcleo y rango de versiones de SpecKit fue verificado.

Las plantillas y comandos se integran mediante la pila de resolución oficial. El preset no escribe sobre el código fuente de SpecKit ni depende de cambios manuales que una actualización pueda borrar. Debe proporcionar solo los archivos necesarios y permitir que el core nativo resuelva el resto.

Ante una actualización de SpecKit se debe:

1. actualizar SpecKit mediante sus mecanismos oficiales;
2. conservar la constitución existente;
3. actualizar o reconciliar el preset;
4. revisar las diferencias de las plantillas o comandos nativos afectados;
5. comprobar que el comportamiento resultante continúa cumpliendo este anexo.

Un cambio de SpecKit no modifica el núcleo. Si una actualización vuelve imposible una correspondencia, se registra la incompatibilidad en la adaptación; no se recorta el manifiesto para recuperar compatibilidad.

## Criterios de conformidad de la adaptación

Una implementación de este anexo es conforme solo si puede demostrar que:

1. `.specify/memory/constitution.md` contiene una proyección estructuralmente nativa del núcleo completo y aprobado, con gobernanza, versión y fechas coherentes.
2. La definición de producto autorizada se identifica y conserva su autoridad.
3. `spec.md` cubre o referencia todos los elementos obligatorios de la entrada.
4. Las Job Stories se preservan cuando existen y no se imponen cuando no existen.
5. Las prioridades, MVP, fases o releases solo aparecen cuando producto los ha autorizado.
6. `plan.md` y `tasks.md` dan cuenta del alcance completo y de sus dependencias.
7. La ejecución parcial no se presenta como reducción ni completitud del alcance.
8. Los artefactos del núcleo se representan sin duplicación y con profundidad proporcional.
9. El agente se detiene ante ambigüedades materiales y decisiones fuera de su autoridad.
10. La verificación recorre desde la fuente de producto hasta la implementación y vuelve desde cada decisión implementada hasta su fundamento.
11. La aceptación incluye resultado humano y calidad de experiencia, no solo código y pruebas técnicas.
12. Ningún archivo, comando o regla de la adaptación agrega una obligación metodológica no contenida en el núcleo.
13. Las referencias operativas resuelven identificadores vigentes del núcleo y no sustituyen su texto.
14. Cada comando activa como mínimo el alcance semántico definido para su operación y escala a la lectura completa cuando corresponde.
15. El contrato `CR01`–`CR08`, la entrega `O01`–`O09` y los controles transversales se aplican en las operaciones indicadas sin crear etapas ni artefactos adicionales.
16. El preset declara un manifiesto válido, compatibilidad de versiones y únicamente los archivos que realmente adapta.
17. Las plantillas conservan placeholders, comentarios operativos, rutas e identificadores que utilizan los comandos nativos.
18. Los comandos adaptados preservan entrada, resolución, hooks, handoffs y reportes, y se componen con el core siempre que el conflicto no exija reemplazo total.
19. `clarify` conserva sus rondas focalizadas y el checklist nativo de requisitos mantiene su ciclo sin convertirse en evidencia de aceptación.

## Condición para materializar el paquete técnico

El futuro paquete técnico debe limitarse a convertir este anexo en archivos instalables. Como mínimo deberá materializar la constitución operativa, `preset.yml`, la documentación mínima del preset y las plantillas o comandos estrictamente necesarios. El preset deberá incorporar las referencias por operación, el contrato distribuido, el formato de salida y la activación de controles descritos aquí. No podrá agregar etapas, artefactos o controles durante esa materialización.

Antes de distribuirse, el paquete deberá superar la instalación local de desarrollo, la resolución de cada plantilla proporcionada, el registro de comandos en la integración activa y una comprobación de coherencia entre comandos y secciones de sus plantillas. Si durante esa construcción aparece una necesidad no resuelta aquí, debe volver a revisión; no se incorpora silenciosamente como una decisión técnica.

## Control de cambios de la versión 1.1

La versión 1.1 conserva las decisiones, correspondencias y límites de la versión 1.0. Agrega únicamente la capa operativa necesaria para que los agentes localicen y apliquen de forma consistente el contenido ya aprobado.

| Área | Ajuste de la versión 1.1 | Contenido que permanece |
|---|---|---|
| Navegación | Usa los identificadores estables del núcleo. | Autoridad y texto completo del núcleo. |
| Lectura | Define carga progresiva y foco mínimo por operación. | Constitución completa instalada y disponible. |
| Contrato | Vincula `CR01`–`CR08` con los comandos donde actúan. | Las ocho cláusulas originales, sin nuevas obligaciones. |
| Resultados | Vincula `O01`–`O09` con las salidas en lenguaje natural. | Formato de entrega del núcleo y artefactos nativos. |
| Controles | Explicita scorecard, anti patrones, gobernanza, terminado y guía breve. | Flujo de ocho pasos y ocho artefactos, sin etapas adicionales. |

## Control de cambios de la versión 1.2

La versión 1.2 conserva las correspondencias doctrinales, el flujo, los artefactos y los controles de la versión 1.1. Precisa la filosofía de integración y alinea la futura materialización con las convenciones nativas de SpecKit.

| Área | Ajuste de la versión 1.2 | Contenido que permanece |
|---|---|---|
| Filosofía | Define la adaptación como complemento nativo mediante preset, no como framework sustituto. | Autoridad del núcleo y del fundamento de producto. |
| Constitución | Exige una proyección del núcleo completo con jerarquía y metadatos nativos. | Contenido doctrinal íntegro y protegido. |
| Preset | Incorpora manifiesto, compatibilidad, composición y convenciones de comandos y plantillas. | Decisión de no modificar el core de SpecKit. |
| Defaults | Distingue capacidades conservadas de valores que deben volverse condicionales. | Prioridad, MVP, independencia e incrementalidad siguen disponibles cuando corresponden. |
| Clarificación | Conserva rondas nativas de hasta cinco preguntas sin ocultar ambigüedades pendientes. | Regla de detención ante decisiones materiales. |
| Checklists | Conserva el checklist nativo de requisitos y mantiene opcionales los personalizados. | Ningún checklist prueba por sí solo la completitud del producto. |
| Paquete | Añade criterios de validación estructural antes de distribuirlo. | Prohibición de introducir etapas o artefactos metodológicos nuevos. |

## Fuentes oficiales de SpecKit

- [Repositorio oficial de SpecKit](https://github.com/github/spec-kit)
- [Referencia del proceso Agentic SDD](https://github.github.io/spec-kit/reference/agentic-sdd.html)
- [Guía de personalización](https://github.github.io/spec-kit/guides/customization.html)
- [Referencia de presets](https://github.github.io/spec-kit/reference/presets.html)
- [Referencia de extensiones](https://github.github.io/spec-kit/reference/extensions.html)
- [Referencia de workflows](https://github.github.io/spec-kit/reference/workflows.html)
- [Referencia de bundles](https://github.github.io/spec-kit/reference/bundles.html)
- [Guía de actualización](https://github.github.io/spec-kit/upgrade.html)
- [Plantilla oficial de constitución](https://github.com/github/spec-kit/blob/main/templates/constitution-template.md)
- [Comando oficial de constitución](https://github.com/github/spec-kit/blob/main/templates/commands/constitution.md)
- [Guía oficial de publicación de presets](https://github.com/github/spec-kit/blob/main/presets/PUBLISHING.md)
- [Plantilla oficial de especificación](https://github.com/github/spec-kit/blob/main/templates/spec-template.md)
- [Plantilla oficial de plan](https://github.com/github/spec-kit/blob/main/templates/plan-template.md)
- [Plantilla oficial de tareas](https://github.com/github/spec-kit/blob/main/templates/tasks-template.md)
- [Comando oficial de especificación](https://github.com/github/spec-kit/blob/main/templates/commands/specify.md)
- [Comando oficial de planificación](https://github.com/github/spec-kit/blob/main/templates/commands/plan.md)
- [Comando oficial de tareas](https://github.com/github/spec-kit/blob/main/templates/commands/tasks.md)

## Declaración final

Este anexo no mejora ni expande el manifiesto. Hace que SpecKit lo aplique mediante sus mecanismos nativos. Toda simplificación técnica es válida mientras conserve la sustancia aprobada; toda ampliación metodológica queda fuera de su autoridad.
