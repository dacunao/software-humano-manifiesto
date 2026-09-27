# Mapa de cobertura · manifiesto → método

**Generado por** `tools/method/generar-mapa-de-cobertura.py`. **No se edita a mano.**

Es el artefacto `A02` del núcleo aplicado al propio paquete: *«¿cómo se dará cuenta de todo el alcance?»*. El alcance es el manifiesto; la cobertura, lo que la compilación refleja.

## Totales

| Estado | Enunciados | |
|---|---:|---|
| **compilado** | 210 | su texto literal está en la compilación · 70% |
| **fuera** | 40 | queda fuera del método, con razón decidida · 13% |
| **editorial** | 50 | no puede cambiar una decisión de construcción · 16% |
| **pendiente** | 0 | debería estar y no está · 0% |
| | **300** | enunciados comprobables del manifiesto |

**Cobertura de lo que debe compilarse: 210 de 210 (100%).** Lo editorial y lo declarado fuera no cuentan en el denominador: no faltan, fueron decididos.


---

## Fuera · 40

| Dirección | Texto del manifiesto | Razón |
|---|---|---|
| `CONTRATO REUTILIZABLE § Instrucciones para un agente de desarrollo` | El siguiente contrato puede incorporarse a las instrucciones de un repositorio, a un PRD o al prompt de un agente de código. Debe acompañarse con el contexto específico del producto y no sus | Su destino es el paquete, no un control: el contrato se incorpora en la plantilla de `AGENTS.md`. |
| `CONTRATO REUTILIZABLE § Prompt breve para iniciar una tarea` | Antes de escribir código, identifica la definición de producto autorizada, explica su fundamento y confirma el alcance completo. Reconoce todas las historias, capacidades, reglas y criterios | Su destino es el paquete: es el prompt de `START_WITH_AI_AGENT.md`. |
| `PRINCIPIOS DE DISEÑO § Diez compromisos que gobiernan las decisiones` | Los principios no describen aspiraciones decorativas. Cada uno debe ser capaz de cambiar una decisión, detener una implementación o exigir evidencia adicional. Si una frase no tiene consecue | Gobierna la adaptación y no el producto. El anexo lo cita como criterio para admitir un control. |
| `SH-GOV · Control de cambios de las versiones 2.0 y 2.1` | Unidad de diseño · La Job Story concreta el progreso dentro de un Jobs to Be Done. · El progreso del usuario sigue siendo la medida principal. | Historia de versiones del manifiesto. No cambia una decisión de construcción. |
| `SH-GOV · Control de cambios de las versiones 2.0 y 2.1` | Arquitectura · Se incorpora un nivel entre principio y regla. · Principios, reglas y pruebas conservan su función. | Historia de versiones del manifiesto. No cambia una decisión de construcción. |
| `SH-GOV · Control de cambios de las versiones 2.0 y 2.1` | Flujo y artefactos · Se exige circunstancia, motivación, resultado y evidencia antes de diseñar. · Se mantiene la documentación mínima que cambia decisiones. | Historia de versiones del manifiesto. No cambia una decisión de construcción. |
| `SH-GOV · Control de cambios de las versiones 2.0 y 2.1` | Desarrollo con IA · El agente debe reformular y respetar la Job Story. · Continúan los límites, el determinismo y la revisión humana. | Historia de versiones del manifiesto. No cambia una decisión de construcción. |
| `SH-GOV · Control de cambios de las versiones 2.0 y 2.1` | Aceptación · El resultado se prueba bajo la circunstancia descrita. · Accesibilidad, rendimiento, estados y control siguen siendo obligatorios. | Historia de versiones del manifiesto. No cambia una decisión de construcción. |
| `SH-GOV · Control de cambios de las versiones 2.0 y 2.1` | Ejemplo y gobernanza · Se añade trazabilidad causal y validación de historias. · El tutor de cálculo y los puntos de control conservan su propósito. | Historia de versiones del manifiesto. No cambia una decisión de construcción. |
| `SH-GOV · Control de cambios de las versiones 2.0 y 2.1` | Fundamento · Se define una base autorizada, trazable y verificable que puede adoptar distintas formas. · El progreso humano continúa como medida principal. | Historia de versiones del manifiesto. No cambia una decisión de construcción. |
| `SH-GOV · Control de cambios de las versiones 2.0 y 2.1` | Job Stories · Se declaran forma de referencia, no estructura universal obligatoria. · Se conservan su forma canónica, evidencia, pruebas y ejemplos. | Historia de versiones del manifiesto. No cambia una decisión de construcción. |
| `SH-GOV · Control de cambios de las versiones 2.0 y 2.1` | Alcance · Se exige cobertura completa y se prohíben omisiones o postergaciones no autorizadas. · Producto sigue definiendo alcance y no objetivos. | Historia de versiones del manifiesto. No cambia una decisión de construcción. |
| `SH-GOV · Control de cambios de las versiones 2.0 y 2.1` | Planificación · Se separa descomposición, secuencia y paralelismo de cualquier decisión de alcance. · Continúan la claridad previa, las reglas, los riesgos y la aceptación. | Historia de versiones del manifiesto. No cambia una decisión de construcción. |
| `SH-GOV · Control de cambios de las versiones 2.0 y 2.1` | Estrategia de entrega · La incrementalidad deja de ser un supuesto del núcleo. · Cada proyecto puede adoptar fases o releases cuando corresponda. | Historia de versiones del manifiesto. No cambia una decisión de construcción. |
| `SH-GOV · Control de cambios de las versiones 2.0 y 2.1` | Implementación SDD · Se reserva para anexos y adaptadores independientes. · El núcleo conserva principios y garantías que toda implementación debe respetar. | Historia de versiones del manifiesto. No cambia una decisión de construcción. |
| `SH-INDEX · ÍNDICE OPERATIVO PARA AGENTES` | Navegación · `SH-INDEX` · Índice operativo y regla de uso de identificadores | Capa de navegación. El propio núcleo dice que sus identificadores «no agregan doctrina, prioridad, etapas, artefactos ni criterios: solo señalan contenido ya aprobado». |
| `SH-INDEX · ÍNDICE OPERATIVO PARA AGENTES` | Principios · `P01`–`P10` · Diez compromisos que gobiernan las decisiones | Capa de navegación. El propio núcleo dice que sus identificadores «no agregan doctrina, prioridad, etapas, artefactos ni criterios: solo señalan contenido ya aprobado». |
| `SH-INDEX · ÍNDICE OPERATIVO PARA AGENTES` | Fundamento · `SH-FUND` · Definición de producto, autoridad, alcance y Job Stories de referencia | Capa de navegación. El propio núcleo dice que sus identificadores «no agregan doctrina, prioridad, etapas, artefactos ni criterios: solo señalan contenido ya aprobado». |
| `SH-INDEX · ÍNDICE OPERATIVO PARA AGENTES` | Directivas para IA · `D01`–`D06` · Doctrina para equipos y agentes | Capa de navegación. El propio núcleo dice que sus identificadores «no agregan doctrina, prioridad, etapas, artefactos ni criterios: solo señalan contenido ya aprobado». |
| `SH-INDEX · ÍNDICE OPERATIVO PARA AGENTES` | Flujo · `F01`–`F08` · Ocho pasos desde el fundamento hasta la verificación | Capa de navegación. El propio núcleo dice que sus identificadores «no agregan doctrina, prioridad, etapas, artefactos ni criterios: solo señalan contenido ya aprobado». |
| `SH-INDEX · ÍNDICE OPERATIVO PARA AGENTES` | Artefactos · `A01`–`A08` · Ocho respuestas documentales ajustadas al contexto | Capa de navegación. El propio núcleo dice que sus identificadores «no agregan doctrina, prioridad, etapas, artefactos ni criterios: solo señalan contenido ya aprobado». |
| `SH-INDEX · ÍNDICE OPERATIVO PARA AGENTES` | Detención · `SH-STOP`, `STOP01`–`STOP07` · Condiciones que impiden avanzar o aceptar | Capa de navegación. El propio núcleo dice que sus identificadores «no agregan doctrina, prioridad, etapas, artefactos ni criterios: solo señalan contenido ya aprobado». |
| `SH-INDEX · ÍNDICE OPERATIVO PARA AGENTES` | Contrato del agente · `CR01`–`CR08` · Instrucciones reutilizables para desarrollar | Capa de navegación. El propio núcleo dice que sus identificadores «no agregan doctrina, prioridad, etapas, artefactos ni criterios: solo señalan contenido ya aprobado». |
| `SH-INDEX · ÍNDICE OPERATIVO PARA AGENTES` | Entrega del agente · `O01`–`O09` · Contenido esperado de los resultados en lenguaje natural | Capa de navegación. El propio núcleo dice que sus identificadores «no agregan doctrina, prioridad, etapas, artefactos ni criterios: solo señalan contenido ya aprobado». |
| `SH-INDEX · ÍNDICE OPERATIVO PARA AGENTES` | Verificación · `V01`–`V12` · Dimensiones de evidencia para aceptar una solución | Capa de navegación. El propio núcleo dice que sus identificadores «no agregan doctrina, prioridad, etapas, artefactos ni criterios: solo señalan contenido ya aprobado». |
| `SH-INDEX · ÍNDICE OPERATIVO PARA AGENTES` | Controles transversales · `SH-SCORE`, `SH-AP`, `SH-GOV`, `SH-DONE`, `SH-POCKET` · Decisión, anti patrones, gobernanza, terminado y guía breve | Capa de navegación. El propio núcleo dice que sus identificadores «no agregan doctrina, prioridad, etapas, artefactos ni criterios: solo señalan contenido ya aprobado». |
| `SH-POCKET · Catorce preguntas antes de aceptar una decisión` | ¿Cuál es la fuente autorizada y qué alcance establece? | Preguntas dirigidas a una persona. Su destino es el documento de quien decide, no los comandos. |
| `SH-POCKET · Catorce preguntas antes de aceptar una decisión` | ¿La planificación da cuenta de todos los elementos obligatorios? | Preguntas dirigidas a una persona. Su destino es el documento de quien decide, no los comandos. |
| `SH-POCKET · Catorce preguntas antes de aceptar una decisión` | ¿Qué circunstancia concreta activa la necesidad? | Preguntas dirigidas a una persona. Su destino es el documento de quien decide, no los comandos. |
| `SH-POCKET · Catorce preguntas antes de aceptar una decisión` | ¿Qué motivación o tensión impulsa a la persona a actuar? | Preguntas dirigidas a una persona. Su destino es el documento de quien decide, no los comandos. |
| `SH-POCKET · Catorce preguntas antes de aceptar una decisión` | ¿Qué resultado permitiría reconocer el progreso? | Preguntas dirigidas a una persona. Su destino es el documento de quien decide, no los comandos. |
| `SH-POCKET · Catorce preguntas antes de aceptar una decisión` | ¿Qué conducta o evidencia demuestra que la historia ocurre? | Preguntas dirigidas a una persona. Su destino es el documento de quien decide, no los comandos. |
| `SH-POCKET · Catorce preguntas antes de aceptar una decisión` | Cuando existe una Job Story, ¿describe el problema sin prescribir la solución? | Preguntas dirigidas a una persona. Su destino es el documento de quien decide, no los comandos. |
| `SH-POCKET · Catorce preguntas antes de aceptar una decisión` | ¿Qué complejidad absorbe el sistema y cuál todavía traslada? | Preguntas dirigidas a una persona. Su destino es el documento de quien decide, no los comandos. |
| `SH-POCKET · Catorce preguntas antes de aceptar una decisión` | ¿Qué debe ver la persona ahora y qué puede esperar? | Preguntas dirigidas a una persona. Su destino es el documento de quien decide, no los comandos. |
| `SH-POCKET · Catorce preguntas antes de aceptar una decisión` | ¿Qué ocurrirá si se equivoca, interrumpe o regresa después? | Preguntas dirigidas a una persona. Su destino es el documento de quien decide, no los comandos. |
| `SH-POCKET · Catorce preguntas antes de aceptar una decisión` | ¿Conserva control sobre la decisión, los datos y el resultado? | Preguntas dirigidas a una persona. Su destino es el documento de quien decide, no los comandos. |
| `SH-POCKET · Catorce preguntas antes de aceptar una decisión` | ¿Qué parte necesita determinismo y qué parte admite generación? | Preguntas dirigidas a una persona. Su destino es el documento de quien decide, no los comandos. |
| `SH-POCKET · Catorce preguntas antes de aceptar una decisión` | ¿Cuál es la alternativa más simple que cumple el fundamento de producto? | Preguntas dirigidas a una persona. Su destino es el documento de quien decide, no los comandos. |
| `SH-POCKET · Catorce preguntas antes de aceptar una decisión` | ¿Qué evidencia nos permitiría decir que está terminado? | Preguntas dirigidas a una persona. Su destino es el documento de quien decide, no los comandos. |

---

## Editorial · 50

Secciones que el paquete distribuye como documentación y no como método.

| Dirección | Texto del manifiesto | Razón |
|---|---|---|
| `(preámbulo)` | Principios, fundamento de producto, Job Stories y pruebas de decisión para construir productos centrados en el progreso situado de las personas | Sección sin consecuencia sobre una decisión de construcción. |
| `(preámbulo)` | Construimos herramientas para ampliar las capacidades de las personas, no para exhibir las capacidades del software. | Sección sin consecuencia sobre una decisión de construcción. |
| `DOCTRINA PARA DESARROLLO CON IA § Cuando construir cuesta menos la decisión importa más` | Los agentes de código reducen el costo de transformar instrucciones en software. Esa ventaja cambia el cuello de botella. El problema ya no es solo si una capacidad puede construirse, sino s | Expone por qué la doctrina importa ahora. No cambia una decisión de construcción. |
| `DOCTRINA PARA DESARROLLO CON IA § Cuando construir cuesta menos la decisión importa más` | Un agente puede implementar con gran velocidad una especificación débil, reproducir patrones convencionales que no encajan con el contexto y agregar opciones plausibles que nadie pidió. Por  | Expone por qué la doctrina importa ahora. No cambia una decisión de construcción. |
| `EJEMPLO APLICADO § Criterio de éxito` | El objetivo no es que el estudiante llegue al final de la secuencia. Es que pueda resolver o explicar un ejercicio equivalente con menos ayuda. Esa diferencia cambia la interfaz, la lógica,  | Sección sin consecuencia sobre una decisión de construcción. |
| `EJEMPLO APLICADO § Del pedido de función a la circunstancia` | **Formulación débil.** Como estudiante quiero recibir pistas para poder resolver derivadas. El rol es genérico, la pista ya prescribe la respuesta y el resultado no distingue comprensión de  | Sección sin consecuencia sobre una decisión de construcción. |
| `EJEMPLO APLICADO § Del pedido de función a la circunstancia` | **Job Story principal.** *Cuando he leído una explicación y todavía no sé qué regla aplicar, necesito identificar el concepto previo que no comprendo, para poder retomar el ejercicio sin dep | Sección sin consecuencia sobre una decisión de construcción. |
| `EJEMPLO APLICADO § Del pedido de función a la circunstancia` | **Job Story de recuperación.** *Cuando veo la solución y sigo sin entender por qué se eligió el paso siguiente, necesito reconstruir una sola decisión con otra representación, para poder exp | Sección sin consecuencia sobre una decisión de construcción. |
| `EJEMPLO APLICADO § Del pedido de función a la circunstancia` | Ambas historias pertenecen al mismo Jobs to Be Done de nivel superior: desarrollar comprensión suficiente para resolver un ejercicio equivalente con autonomía creciente. Sin embargo, describ | Sección sin consecuencia sobre una decisión de construcción. |
| `EJEMPLO APLICADO § Rediseño del recorrido` | 1\. Detectar el tipo de bloqueo: concepto, notación, operación previa o interpretación del enunciado. | Sección sin consecuencia sobre una decisión de construcción. |
| `EJEMPLO APLICADO § Rediseño del recorrido` | 2\. Reformular con una representación distinta, no repetir la misma explicación con más palabras. | Sección sin consecuencia sobre una decisión de construcción. |
| `EJEMPLO APLICADO § Rediseño del recorrido` | 3\. Comprobar una microhabilidad anterior mediante una pregunta breve y diagnóstica. | Sección sin consecuencia sobre una decisión de construcción. |
| `EJEMPLO APLICADO § Rediseño del recorrido` | 4\. Ofrecer un ejemplo resuelto paso a paso con una decisión por vez y lenguaje del estudiante. | Sección sin consecuencia sobre una decisión de construcción. |
| `EJEMPLO APLICADO § Rediseño del recorrido` | 5\. Pedir que explique el razonamiento o complete un paso equivalente antes de avanzar. | Sección sin consecuencia sobre una decisión de construcción. |
| `EJEMPLO APLICADO § Rediseño del recorrido` | 6\. Mantener siempre una ruta para retroceder, cambiar de explicación o solicitar ayuda humana. | Sección sin consecuencia sobre una decisión de construcción. |
| `EJEMPLO APLICADO § Tutor de cálculo para una persona que todavía no entiende` | Considere una aplicación que explica derivadas, propone un ejercicio, ofrece una pista y finalmente muestra la solución. El flujo parece completo. Sin embargo, si la persona falla después de | Sección sin consecuencia sobre una decisión de construcción. |
| `FLUJO DE TRABAJO § Del propósito a una solución verificable` | El flujo evita que la generación de código se convierta en el primer acto de diseño. No pretende crear una fase documental pesada ni imponer una estructura al PRD. Busca comprender el fundam | Explica qué evita el flujo. Los pasos que lo componen sí están compilados. |
| `INFLUENCIAS Y NOTAS § Declaración final` | La tecnología puede ser extraordinariamente sofisticada detrás de la interfaz. Delante de ella debe permanecer una persona concentrada en aquello que quería conseguir. | Sección sin consecuencia sobre una decisión de construcción. |
| `INFLUENCIAS Y NOTAS § Fuentes consultadas` | Craft. [<u>Acerca de Craft</u>](https://www.craft.do/es/about). Historia del fundador y reflexiones sobre forma, función, fricción, complejidad adaptable y atención al detalle. | Sección sin consecuencia sobre una decisión de construcción. |
| `INFLUENCIAS Y NOTAS § Fuentes consultadas` | Balint Orosz. [<u>Introducing Craft 3</u>](https://www.craft.do/blog/welcome-to-craft3), 28 de noviembre de 2024. Adaptación al contexto, reducción de carga cognitiva, rendimiento y funciona | Sección sin consecuencia sobre una decisión de construcción. |
| `INFLUENCIAS Y NOTAS § Fuentes consultadas` | Balint Orosz. [<u>Your content is yours and that is more empowering than ever</u>](https://www.craft.do/blog/your-content-is-yours), 27 de noviembre de 2025. Control sobre el contenido, port | Sección sin consecuencia sobre una decisión de construcción. |
| `INFLUENCIAS Y NOTAS § Fuentes consultadas` | Alan Klement. [<u>Designing Features Using Job Stories</u>](https://www.intercom.com/blog/using-job-stories-design-features-ui-ux/), publicado por Intercom el 23 de diciembre de 2013. Aplica | Sección sin consecuencia sobre una decisión de construcción. |
| `INFLUENCIAS Y NOTAS § Origen de la perspectiva` | Este marco es una elaboración independiente inspirada en ideas públicas de Craft y en las conversaciones que dieron origen a este documento. No es un manifiesto oficial de Craft ni atribuye  | Sección sin consecuencia sobre una decisión de construcción. |
| `INFLUENCIAS Y NOTAS § Origen de la perspectiva` | De Craft se recogen cuatro influencias: la unión entre forma y función; el efecto que una herramienta produce en la energía y capacidad de quien la usa; la complejidad adaptable que aparece  | Sección sin consecuencia sobre una decisión de construcción. |
| `INFLUENCIAS Y NOTAS § Origen de la perspectiva` | De Jobs to Be Done se conserva el progreso como referencia superior. De Job Stories se adopta una forma concreta de trasladar ese progreso al diseño mediante circunstancias, motivaciones, re | Sección sin consecuencia sobre una decisión de construcción. |
| `INFLUENCIAS Y NOTAS § Origen de la perspectiva` | La versión 2.1 integra estas influencias dentro de un núcleo capaz de respetar definiciones de producto heterogéneas. Las Job Stories permanecen como forma de referencia y ejemplo aplicado;  | Sección sin consecuencia sobre una decisión de construcción. |
| `PROPÓSITO DEL DOCUMENTO § Alcance y lectores` | El marco sirve para productos donde la experiencia de uso influye directamente en el resultado: aplicaciones web y móviles, herramientas internas, sistemas de aprendizaje, servicios digitale | Sección sin consecuencia sobre una decisión de construcción. |
| `PROPÓSITO DEL DOCUMENTO § Alcance y lectores` | No prescribe un estilo visual, una tecnología, una estructura de PRD, una estrategia de entrega ni un framework de ingeniería. Tampoco elimina la complejidad real del dominio. Define cómo im | Sección sin consecuencia sobre una decisión de construcción. |
| `PROPÓSITO DEL DOCUMENTO § Alcance y lectores` | Este documento contiene el núcleo del manifiesto. Su traducción a métodos de desarrollo basados en especificaciones y a frameworks particulares debe realizarse mediante anexos o adaptadores  | Sección sin consecuencia sobre una decisión de construcción. |
| `PROPÓSITO DEL DOCUMENTO § Cómo usar este documento` | El documento ofrece dos profundidades de lectura. La primera permite comprender la postura en pocos minutos. La segunda convierte esa postura en decisiones verificables durante el desarrollo | Sección sin consecuencia sobre una decisión de construcción. |
| `PROPÓSITO DEL DOCUMENTO § El problema que este manifiesto busca resolver` | ¿Cómo construimos software que amplifique la capacidad de las personas para conseguir lo que buscan, sin transferirles la complejidad de la tecnología? | Sección sin consecuencia sobre una decisión de construcción. |
| `PROPÓSITO DEL DOCUMENTO § El problema que este manifiesto busca resolver` | El software gana capacidad con rapidez. La inteligencia artificial acelera todavía más ese proceso: hoy resulta barato generar pantallas, opciones, automatizaciones y capas de abstracción. E | Sección sin consecuencia sobre una decisión de construcción. |
| `PROPÓSITO DEL DOCUMENTO § El problema que este manifiesto busca resolver` | Este manifiesto establece una doctrina para decidir qué merece ser construido, cómo debe sentirse al usarlo y qué evidencia debe existir antes de aceptar una implementación. Su unidad de med | Sección sin consecuencia sobre una decisión de construcción. |
| `PROPÓSITO DEL DOCUMENTO § El problema que este manifiesto busca resolver` | La versión 2.1 conserva la concreción alcanzada mediante Jobs to Be Done y Job Stories, y amplía la capacidad del marco para trabajar con definiciones de producto de distinta extensión y pro | Sección sin consecuencia sobre una decisión de construcción. |
| `PROPÓSITO DEL DOCUMENTO § La arquitectura del marco` | Cada principio se traduce en niveles operativos. Ningún nivel sustituye a otro. El fundamento de producto conserva la definición autorizada de lo que debe construirse y por qué. Jobs to Be D | Sección sin consecuencia sobre una decisión de construcción. |
| `PROPÓSITO DEL DOCUMENTO § La conclusión central` | La función establece lo que el software permite hacer. La experiencia determina cuánto de esa capacidad puede aprovechar realmente una persona. | Sección sin consecuencia sobre una decisión de construcción. |
| `PROPÓSITO DEL DOCUMENTO § La conclusión central` | La experiencia no es una capa estética que se agrega después de resolver la funcionalidad. Forma parte de ella. Si una solución produce el resultado correcto, pero exige que el usuario desci | Sección sin consecuencia sobre una decisión de construcción. |
| `PROPÓSITO DEL DOCUMENTO § Límite entre núcleo e implementación` | El núcleo define principios, autoridades, condiciones de trazabilidad, criterios de aceptación y límites para equipos y agentes. Un anexo general puede traducir estas obligaciones a un métod | Sección sin consecuencia sobre una decisión de construcción. |
| `TEXTO CANÓNICO § Manifiesto para el desarrollo de software humano` | El propósito del software es ampliar lo que una persona puede hacer. | Sección sin consecuencia sobre una decisión de construcción. |
| `TEXTO CANÓNICO § Manifiesto para el desarrollo de software humano` | Las personas no llegan a nuestros productos para utilizar funcionalidades. Llegan porque quieren comprender, decidir, crear, aprender, comunicarse, resolver o avanzar. Ese progreso es nuestr | Sección sin consecuencia sobre una decisión de construcción. |
| `TEXTO CANÓNICO § Manifiesto para el desarrollo de software humano` | El progreso no ocurre en abstracto. Se activa cuando una circunstancia crea una necesidad, una tensión o una decisión. Antes de diseñar una respuesta describimos esa circunstancia, la motiva | Sección sin consecuencia sobre una decisión de construcción. |
| `TEXTO CANÓNICO § Manifiesto para el desarrollo de software humano` | La definición de producto gobierna qué debe construirse. Puede expresarse con una sola historia o mediante un PRD extenso compuesto por historias, capacidades, reglas, estados, recorridos y  | Sección sin consecuencia sobre una decisión de construcción. |
| `TEXTO CANÓNICO § Manifiesto para el desarrollo de software humano` | Por eso la experiencia forma parte de la función. Un sistema que permite completar una tarea, pero obliga a interpretar la interfaz, recordar convenciones, atravesar estructuras innecesarias | Sección sin consecuencia sobre una decisión de construcción. |
| `TEXTO CANÓNICO § Manifiesto para el desarrollo de software humano` | No rechazamos la complejidad. Muchos problemas importantes son complejos. Rechazamos que la complejidad de construirlos tenga que convertirse automáticamente en complejidad para quien usa la | Sección sin consecuencia sobre una decisión de construcción. |
| `TEXTO CANÓNICO § Manifiesto para el desarrollo de software humano` | Buscamos software sencillo al comenzar y profundo cuando se necesita. Software que revele capacidades en contexto, explique sin interrumpir, anticipe sin controlar y permita recuperarse sin  | Sección sin consecuencia sobre una decisión de construcción. |
| `TEXTO CANÓNICO § Manifiesto para el desarrollo de software humano` | Cada elemento debe justificar la atención que consume. Cada interacción debe ayudar a comprender dónde estamos, qué podemos hacer y qué ocurrirá después. Cada detalle debe contribuir a una e | Sección sin consecuencia sobre una decisión de construcción. |
| `TEXTO CANÓNICO § Manifiesto para el desarrollo de software humano` | La inteligencia artificial debe absorber complejidad, no multiplicarla. Puede proponer, resumir y automatizar, pero permanece subordinada a la intención de la persona. Las reglas críticas, l | Sección sin consecuencia sobre una decisión de construcción. |
| `TEXTO CANÓNICO § Manifiesto para el desarrollo de software humano` | Ahora que construir es más fácil, nuestra responsabilidad aumenta. Antes de agregar una capacidad preguntamos qué progreso habilita, qué carga introduce, qué riesgo crea y si merece existir. | Sección sin consecuencia sobre una decisión de construcción. |
| `TEXTO CANÓNICO § Manifiesto para el desarrollo de software humano` | Nuestro objetivo es que la sofisticación permanezca detrás de la experiencia y que, delante de ella, la persona conserve su propósito, su atención y su control. | Sección sin consecuencia sobre una decisión de construcción. |
| `TEXTO CANÓNICO § Manifiesto para el desarrollo de software humano` | El mejor software no consigue que el usuario admire el software. Consigue que se sorprenda de lo que ahora es capaz de hacer. | Sección sin consecuencia sobre una decisión de construcción. |

---

## Compilado · 210

| Dirección | Texto del manifiesto |
|---|---|
| `A01` | ¿Qué debe construirse, por qué y con qué autoridad? · Fuentes; alcance; resultados; reglas; límites; evidencia; no objetivos |
| `A02` | ¿Cómo se dará cuenta de todo el alcance? · Elementos obligatorios; relaciones; dependencias; implementación; pruebas; estado; excepciones |
| `A03` | ¿Cuándo surge la necesidad y qué cambio busca la persona? · Circunstancia; motivación; resultado; conducta actual; ansiedad; evidencia; supuestos |
| `A04` | ¿Qué debe comprender y poder hacer la persona? · Ruta principal; lenguaje; decisiones; feedback; control; recuperación |
| `A05` | ¿Qué puede ocurrir y qué transiciones son válidas? · Estados; eventos; reglas; errores; permisos; persistencia |
| `A06` | ¿Qué carga estamos agregando? · Conceptos nuevos; decisiones; pasos; excepciones; opciones visibles |
| `A07` | ¿Qué evidencia autoriza declarar completo el desarrollo? · Resultados; reglas; Job Stories cuando apliquen; accesibilidad; rendimiento; estados extremos; métricas |
| `A08` | ¿Por qué elegimos esta alternativa? · Alternativas; tradeoffs; supuestos; decisión; fecha; evidencia pendiente |
| `CR01` | Construye la solución más simple que permita al usuario lograr el resultado definido, conservando claridad, control y capacidad de recuperación. |
| `CR02` | Identifica las fuentes autorizadas, explica el fundamento de producto y confirma el alcance completo. Reconoce la estructura utilizada por la definición; cuando contenga Job Stories, conserv |
| `CR03` | Da cuenta de todos los elementos obligatorios y establece sus dependencias, bloqueantes, orden, integración y pruebas. No selecciones, omitas ni postergues partes del alcance por iniciativa  |
| `CR04` | Presenta la alternativa recomendada, una alternativa más simple y la opción de no construir cuando la decisión aún pertenezca a producto. Explica cómo responde cada una al fundamento, qué ca |
| `CR05` | No expongas estructuras internas. Usa lenguaje del usuario, convenciones conocidas, jerarquía clara, profundidad progresiva, valores predeterminados editables y feedback inmediato. |
| `CR06` | Reserva las reglas críticas para lógica verificable. Declara incertidumbre. No ejecutes acciones de alto impacto sin autorización proporcional. Mantén trazabilidad, revisión y reversibilidad |
| `CR07` | Respeta el alcance acordado y conserva trazabilidad con su fundamento. No agregues features, modos, configuraciones ni abstracciones no solicitadas. Cubre estados vacíos, carga, error, éxito |
| `CR08` | Reconcilia la implementación contra la definición completa de producto. Verifica resultados, reglas, criterios y, cuando correspondan, las Job Stories en sus circunstancias. Comprueba tambié |
| `DOCTRINA PARA DESARROLLO CON IA § Determinismo y generación` | La elección no es entre un producto determinista o un producto con IA. Un sistema confiable combina ambos según la naturaleza de cada decisión. |
| `DOCTRINA PARA DESARROLLO CON IA § La segunda pregunta rectora` | Ahora que podemos construir casi cualquier cosa con mayor facilidad, ¿qué merece ser construido y qué debemos dejar deliberadamente fuera? |
| `DOCTRINA PARA DESARROLLO CON IA § La segunda pregunta rectora` | Esta pregunta introduce una obligación que antes podía quedar oculta por el costo técnico. Debe plantearse durante la definición de producto y al evaluar alternativas, no utilizarse durante  |
| `F01` | Comprender el fundamento · Reconocer las fuentes, la autoridad, el alcance, la estructura utilizada y los resultados esperados. · Mapa fiel de la definición de producto, sin reformularla por |
| `F02` | Establecer cobertura · Inventariar historias, capacidades, reglas, estados, recorridos, criterios y relaciones aplicables. · Cobertura completa y vacíos o contradicciones visibles. |
| `F03` | Planificar la implementación · Resolver dependencias, bloqueantes, orden, paralelismo, integración y pruebas sin modificar el alcance. · Plan coherente que da cuenta de toda la definición ap |
| `F04` | Concretar el progreso · Usar las Job Stories existentes o formular una vista derivada cuando aporte claridad y esté identificada como tal. · Circunstancias, motivaciones y resultados preserv |
| `F05` | Establecer el contrato de experiencia · Describir qué debe comprender, decidir y sentir la persona en los momentos críticos. · Ruta principal, estados y promesa de interacción. |
| `F06` | Modelar reglas y riesgos · Separar lógica determinista, comportamiento generativo, permisos y acciones irreversibles. · Mapa de decisiones y límites. |
| `F07` | Explorar y prototipar · Comparar alternativas y probar comprensión, jerarquía y recuperación antes de optimizar código. · Razón de la alternativa elegida y evidencia del recorrido. |
| `F08` | Construir, integrar y verificar · Implementar el plan, mantener trazabilidad y reconciliar resultados contra el alcance completo. · Código, pruebas y evidencia de cobertura; pendientes y exc |
| `FLUJO DE TRABAJO § Artefactos ajustados al contexto` | Cada artefacto existe para responder una pregunta, no para satisfacer una plantilla. Puede ser una sección del PRD, una vista derivada, una tabla, una prueba o un documento separado. Si la i |
| `O01` | Fuentes autorizadas y fundamento de producto que justifican el desarrollo. |
| `O02` | Inventario de alcance y cobertura de historias, capacidades, reglas, estados y criterios aplicables. |
| `O03` | Jobs to Be Done y Job Stories cuando formen parte de la definición o aporten una vista derivada útil. |
| `O04` | Evidencia disponible, supuestos y criterios de resultado. |
| `O05` | Alternativa elegida y razón de descarte de opciones más complejas. |
| `O06` | Archivos o componentes modificados y límites del cambio. |
| `O07` | Estados y casos extremos cubiertos. |
| `O08` | Pruebas ejecutadas y evidencia de resultado. |
| `O09` | Riesgos, incertidumbres, pendientes, excepciones y decisiones que aún requieren juicio humano. |
| `P01 · Pruebas de decisión` | ¿Puede señalarse la fuente autorizada que justifica esta decisión y su relación con el alcance completo? |
| `P01 · Pruebas de decisión` | Cuando existe una Job Story, ¿la circunstancia es específica y observable o solo describe un rol? |
| `P01 · Pruebas de decisión` | ¿La motivación y el resultado están respaldados por evidencia o fueron supuestos por el equipo? |
| `P01 · Pruebas de decisión` | ¿La formulación admite varias soluciones posibles? Si ya prescribe una interfaz sin que ello sea una decisión de producto, debe revisarse. |
| `P01 · Reglas de diseño` | Identificar el fundamento de producto y la fuente autorizada que establece el alcance antes de diseñar una respuesta. |
| `P01 · Reglas de diseño` | Cuando el fundamento se exprese mediante Job Stories, ubicarlas dentro del progreso o propósito de nivel superior que corresponda. |
| `P01 · Reglas de diseño` | Formular cada Job Story como circunstancia, motivación y resultado, sin nombrar una pantalla, un componente ni una funcionalidad. |
| `P01 · Reglas de diseño` | Respaldar las decisiones con conducta observada, obstáculo o ansiedad actual y evidencia que permita aceptar el resultado. |
| `P02 · Pruebas de decisión` | ¿La persona puede concentrarse en su objetivo o debe administrar la herramienta? |
| `P02 · Pruebas de decisión` | ¿Qué momentos provocan duda, tensión o interrupción? |
| `P02 · Pruebas de decisión` | ¿Una tarea correcta deja al usuario con energía para continuar? |
| `P02 · Reglas de diseño` | Incluir esfuerzo, claridad y confianza dentro de los criterios de aceptación. |
| `P02 · Reglas de diseño` | Probar el flujo completo, no solo cada pantalla o endpoint de forma aislada. |
| `P02 · Reglas de diseño` | Considerar el estado emocional y cognitivo que acompaña la situación definida por el producto y, cuando exista, por la Job Story. |
| `P03 · Pruebas de decisión` | ¿Este paso existe por una necesidad del usuario o por la estructura del sistema? |
| `P03 · Pruebas de decisión` | ¿Estamos mostrando una entidad técnica que podría traducirse o inferirse? |
| `P03 · Pruebas de decisión` | ¿La persona necesita comprender esta regla para tomar una buena decisión? |
| `P03 · Reglas de diseño` | Traducir conceptos internos al lenguaje y al modelo mental de la persona. |
| `P03 · Reglas de diseño` | Resolver dependencias, valores predeterminados y secuencias cuando exista suficiente contexto. |
| `P03 · Reglas de diseño` | Exponer una excepción solo a quienes realmente deben decidirla. |
| `P04 · Pruebas de decisión` | ¿Qué necesita ver la persona exactamente en este estado? |
| `P04 · Pruebas de decisión` | ¿La simplificación elimina ruido o elimina capacidad necesaria? |
| `P04 · Pruebas de decisión` | ¿Un usuario experto puede avanzar con rapidez sin que el principiante cargue con esa profundidad? |
| `P04 · Reglas de diseño` | Mostrar primero la ruta principal y revelar opciones avanzadas cuando el contexto las vuelva relevantes. |
| `P04 · Reglas de diseño` | Conservar atajos y precisión para usuarios expertos sin imponerlos al principiante. |
| `P04 · Reglas de diseño` | Usar buenos valores predeterminados, siempre editables cuando la decisión importa. |
| `P05 · Pruebas de decisión` | ¿La persona entiende qué significan los elementos sin una leyenda externa? |
| `P05 · Pruebas de decisión` | ¿Necesita recordar algo de una pantalla anterior para actuar correctamente? |
| `P05 · Pruebas de decisión` | ¿La interfaz agrega una capa de aprendizaje ajena a la situación o al resultado que debe resolver? |
| `P05 · Reglas de diseño` | Preferir convenciones conocidas cuando resuelvan bien el problema. |
| `P05 · Reglas de diseño` | Explicar en contexto sin exigir tutoriales previos para acciones básicas. |
| `P05 · Reglas de diseño` | Hacer evidente la acción principal, el estado actual y el siguiente paso posible. |
| `P06 · Pruebas de decisión` | ¿Qué compite visual o mentalmente con la acción principal? |
| `P06 · Pruebas de decisión` | ¿Puede eliminarse un elemento sin perder información necesaria o control? |
| `P06 · Pruebas de decisión` | ¿La interfaz diferencia lo urgente, lo importante y lo opcional? |
| `P06 · Reglas de diseño` | Exigir que cada elemento visible y cada decisión solicitada respondan a una circunstancia, motivación o resultado verificable. |
| `P06 · Reglas de diseño` | Jerarquizar por relevancia para el estado actual, no por igualdad entre features. |
| `P06 · Reglas de diseño` | Reducir interrupciones y reservar señales intensas para asuntos que realmente requieren atención. |
| `P07 · Pruebas de decisión` | ¿La persona sabe qué ocurrirá antes de confirmar? |
| `P07 · Pruebas de decisión` | ¿Puede verificar qué hizo el sistema y por qué? |
| `P07 · Pruebas de decisión` | ¿Existe una ruta de recuperación proporcional al riesgo? |
| `P07 · Reglas de diseño` | Mostrar qué está ocurriendo, qué cambiará y cuándo una acción será irreversible. |
| `P07 · Reglas de diseño` | Permitir deshacer, corregir o volver a un estado seguro cuando sea razonable. |
| `P07 · Reglas de diseño` | Diferenciar con claridad recomendaciones, decisiones automáticas y resultados confirmados. |
| `P08 · Pruebas de decisión` | ¿Los detalles refuerzan la misma lógica o contradicen expectativas? |
| `P08 · Pruebas de decisión` | ¿Qué ocurre en los estados menos frecuentes? |
| `P08 · Pruebas de decisión` | ¿El producto se siente deliberadamente construido o ensamblado por partes? |
| `P08 · Reglas de diseño` | Diseñar y verificar estados normales, vacíos, de carga, error, éxito y recuperación. |
| `P08 · Reglas de diseño` | Mantener lenguaje, jerarquía y comportamiento consistentes en todo el flujo. |
| `P08 · Reglas de diseño` | Revisar el producto a escala real y con contenido realista antes de aprobarlo. |
| `P09 · Pruebas de decisión` | ¿La interfaz responde de inmediato aunque el proceso final continúe? |
| `P09 · Pruebas de decisión` | ¿Qué pierde la persona si la conexión falla ahora? |
| `P09 · Pruebas de decisión` | ¿El producto evita acciones duplicadas y estados ambiguos? |
| `P09 · Reglas de diseño` | Definir presupuestos de respuesta para las interacciones críticas. |
| `P09 · Reglas de diseño` | Mostrar progreso honesto y permitir continuar cuando una operación pueda demorarse. |
| `P09 · Reglas de diseño` | Guardar trabajo, contexto y estado con una frecuencia proporcional al costo de perderlos. |
| `P10 · Pruebas de decisión` | ¿La persona puede rechazar la propuesta sin perder su avance? |
| `P10 · Pruebas de decisión` | ¿Entiende qué datos se utilizaron y con qué propósito? |
| `P10 · Pruebas de decisión` | ¿Puede recuperar o llevarse su contenido en un formato útil? |
| `P10 · Reglas de diseño` | Pedir confirmación proporcional al impacto, no para cada gesto ni después de una acción irreversible. |
| `P10 · Reglas de diseño` | Permitir revisar, editar, exportar y revertir cuando el dominio lo permita. |
| `P10 · Reglas de diseño` | Explicar el uso de datos y separar autorización, recomendación y ejecución. |
| `SH-AP · Señales de que el producto se aleja del manifiesto` | La Job Story es una feature disfrazada · La motivación dice usar un dashboard, recibir alertas o pulsar un botón. · Reformular el avance que necesita la persona sin anticipar la respuesta. |
| `SH-AP · Señales de que el producto se aleja del manifiesto` | La circunstancia fue inventada · El equipo redacta una historia plausible sin observar conducta, tensión o contexto real. · Marcarla como hipótesis y obtener evidencia antes de ampliar la im |
| `SH-AP · Señales de que el producto se aleja del manifiesto` | La interfaz replica la base de datos · El usuario debe elegir tipos, estados o relaciones internas. · Traducir la estructura a objetivos y decisiones humanas. |
| `SH-AP · Señales de que el producto se aleja del manifiesto` | Más opciones se confunden con más valor · Cada excepción se convierte en un control visible. · Resolver por contexto y revelar excepciones cuando aparezcan. |
| `SH-AP · Señales de que el producto se aleja del manifiesto` | La IA llena vacíos conceptuales · Un prompt ambiguo produce una implementación grande. · Detener, aclarar supuestos materiales y preservar el alcance autorizado. |
| `SH-AP · Señales de que el producto se aleja del manifiesto` | El plan selecciona alcance · Se implementan algunas historias o reglas y se posterga el resto sin una decisión de producto. · Restablecer la cobertura completa o registrar una modificación e |
| `SH-AP · Señales de que el producto se aleja del manifiesto` | La descomposición parece exclusión · Una fase técnica se presenta como si redefiniera lo que el PRD exige. · Separar orden de ejecución, estado de avance y alcance comprometido. |
| `SH-AP · Señales de que el producto se aleja del manifiesto` | El tutorial compensa una interfaz oscura · La tarea básica requiere explicación previa. · Revisar lenguaje, jerarquía, convenciones y feedback. |
| `SH-AP · Señales de que el producto se aleja del manifiesto` | La confirmación sustituye la reversibilidad · Se pregunta varias veces, pero no existe deshacer. · Diseñar recuperación y usar confirmaciones solo según riesgo. |
| `SH-AP · Señales de que el producto se aleja del manifiesto` | El happy path define el producto · Errores, vacíos e interrupciones quedan para después. · Modelar estados antes de implementar y aceptarlos explícitamente. |
| `SH-AP · Señales de que el producto se aleja del manifiesto` | La respuesta fluida parece verdadera · El usuario no distingue hecho, inferencia y propuesta. · Mostrar fuente, incertidumbre, límites y ruta de verificación. |
| `SH-AP · Señales de que el producto se aleja del manifiesto` | La velocidad técnica oculta la espera · La operación tarda sin feedback o bloquea todo el flujo. · Responder de inmediato, mostrar progreso y preservar continuidad. |
| `SH-AP · Señales de que el producto se aleja del manifiesto` | La estética maquilla la fricción · La pantalla luce bien, pero exige decisiones innecesarias. · Evaluar el recorrido completo y el esfuerzo real. |
| `SH-AP · Señales de que el producto se aleja del manifiesto` | El agente agrega por si acaso · Aparecen modos, preferencias y abstracciones no pedidas. · Definir exclusiones y exigir justificación por capacidad. |
| `SH-FUND · Alcance completo y autoridad de producto` | Toda omisión, modificación o postergación debe ser explícita, trazable y aprobada por la autoridad de producto. |
| `SH-FUND · Alcance completo y autoridad de producto` | Si las restricciones de tiempo, recursos o tecnología impiden cubrir el alcance, el plan debe hacer visible la incompatibilidad y solicitar una decisión. |
| `SH-FUND · Alcance completo y autoridad de producto` | Una estrategia incremental, por fases o por releases puede utilizarse cuando el proyecto la adopta; no es una obligación del núcleo. |
| `SH-FUND · Alcance completo y autoridad de producto` | La completitud se determina reconciliando la implementación y la evidencia contra la definición de producto completa y sus excepciones aprobadas. |
| `SH-FUND · Cadena de trazabilidad` | Definición de producto · Qué debe construirse y bajo qué condiciones · Todo elemento obligatorio tiene cobertura o una excepción aprobada |
| `SH-FUND · Cadena de trazabilidad` | Jobs to Be Done · Qué progreso general merece atención cuando esta forma resulta aplicable · El resultado sigue siendo relevante para la persona |
| `SH-FUND · Cadena de trazabilidad` | Job Story · Qué circunstancia concreta debe atenderse cuando la fuente utiliza esta forma · La historia está validada y no prescribe una solución no autorizada |
| `SH-FUND · Cadena de trazabilidad` | Diseño e implementación · Qué comportamiento responde al fundamento · Cada elemento tiene una razón trazable |
| `SH-FUND · Cadena de trazabilidad` | Aceptación · Qué evidencia autoriza declarar completo el desarrollo · Resultados, reglas y criterios se cumplen bajo las condiciones definidas |
| `SH-FUND · Cuándo el fundamento es identificable` | Fuente y autoridad · ¿De dónde proviene y quién puede modificarlo? · Origen trazable y autoridad reconocida |
| `SH-FUND · Cuándo el fundamento es identificable` | Razón · ¿Qué situación, necesidad, problema u oportunidad aborda? · Justificación comprensible sin depender de la solución |
| `SH-FUND · Cuándo el fundamento es identificable` | Resultado · ¿Qué cambio o progreso debe producir? · Resultado reconocible para las personas o para el producto |
| `SH-FUND · Cuándo el fundamento es identificable` | Condiciones y límites · ¿Qué reglas, restricciones y exclusiones deben respetarse? · Límites suficientes para evitar decisiones silenciosas |
| `SH-FUND · Cuándo el fundamento es identificable` | Evidencia · ¿Cómo sabremos que se cumplió? · Criterios, observaciones o pruebas proporcionales al riesgo |
| `SH-FUND · Evidencia mínima que acompaña la historia` | Conducta actual · ¿Qué hace hoy la persona? · Pasos, alternativa o abandono observados |
| `SH-FUND · Evidencia mínima que acompaña la historia` | Obstáculo o ansiedad · ¿Qué frena o vuelve riesgoso el avance? · Duda, costo, temor, esfuerzo o dependencia relevante |
| `SH-FUND · Evidencia mínima que acompaña la historia` | Evidencia causal · ¿Qué respalda la relación entre circunstancia y motivación? · Observación, entrevista, dato de uso o supuesto declarado |
| `SH-FUND · Evidencia mínima que acompaña la historia` | Evidencia de éxito · ¿Qué demostraría que hubo progreso? · Conducta o resultado observable dentro de la circunstancia |
| `SH-FUND · Pruebas de calidad antes de diseñar` | La circunstancia describe un desencadenante concreto y no una categoría de usuario. |
| `SH-FUND · Pruebas de calidad antes de diseñar` | La motivación expresa progreso o comprensión y no una funcionalidad solicitada. |
| `SH-FUND · Pruebas de calidad antes de diseñar` | El resultado puede reconocerse sin confundirlo con completar el flujo del producto. |
| `SH-FUND · Pruebas de calidad antes de diseñar` | La historia está respaldada por evidencia o identifica con claridad el supuesto pendiente. |
| `SH-FUND · Pruebas de calidad antes de diseñar` | La formulación permite comparar varias respuestas, incluida la opción de no construir. |
| `SH-FUND · Pruebas de calidad antes de diseñar` | El alcance es suficiente para cambiar una decisión, pero no intenta contener el trabajo completo del usuario. |
| `SH-FUND · Relación entre los niveles` | Jobs to Be Done · El progreso amplio que la persona busca conseguir · Organizar el producto alrededor de funcionalidades |
| `SH-FUND · Relación entre los niveles` | Job Story · La circunstancia, la motivación y el resultado que activan una necesidad concreta · Diseñar desde roles genéricos o pedidos literales |
| `SH-FUND · Relación entre los niveles` | Respuesta del producto · El comportamiento del sistema elegido para resolver la historia · Confundir el problema con la primera solución imaginada |
| `SH-FUND · Relación entre los niveles` | Evidencia de aceptación · La observación que demuestra progreso en esa circunstancia · Aceptar una entrega porque funciona técnicamente |
| `SH-GOV · Puntos de control` | Antes de diseñar · Fuentes, autoridad, alcance, resultados, evidencia, supuestos y no objetivos están claros; las Job Stories se comprenden cuando existen. |
| `SH-GOV · Puntos de control` | Antes de generar código · El plan cubre la definición completa y establece dependencias, respuesta elegida, rutas, estados, reglas críticas, riesgos y aceptación. |
| `SH-GOV · Puntos de control` | Durante la construcción · La descomposición organiza el trabajo sin alterar el alcance; bloqueos, pendientes y excepciones permanecen visibles. |
| `SH-GOV · Puntos de control` | Antes de integrar · Cada cambio conserva trazabilidad con su fundamento, respeta alcance, cubre estados y pasa pruebas técnicas. |
| `SH-GOV · Puntos de control` | Antes de liberar · La implementación completa demuestra resultados, cobertura, comprensión, control y calidad de experiencia. |
| `SH-GOV · Puntos de control` | Después de liberar · Se observan resultado, fricción, abandono y errores; se revisan el fundamento, las historias y sus supuestos cuando corresponda. |
| `SH-GOV · Responsabilidades` | Producto · Establece la definición autorizada, el alcance, los resultados, las reglas, los no objetivos y la evidencia de éxito; valida Jobs to Be Done y Job Stories cuando se utilizan. |
| `SH-GOV · Responsabilidades` | Diseño · Traduce el fundamento de producto a recorridos coherentes con el modelo mental de la persona y protege su atención; utiliza Job Stories cuando permiten concretar la situación. |
| `SH-GOV · Responsabilidades` | Ingeniería · Absorbe complejidad, garantiza estados, rendimiento, accesibilidad y recuperación. |
| `SH-GOV · Responsabilidades` | Agente de IA · Planifica e implementa dentro del fundamento y del contrato; declara supuestos, mantiene cobertura y no reduce ni amplía alcance por iniciativa propia. |
| `SH-GOV · Responsabilidades` | Revisión humana · Evalúa causalidad, sentido, riesgo, experiencia completa y evidencia; no se limita a revisar código. |
| `SH-POCKET · Siete razones para detener una implementación` | `STOP01` No existe un fundamento de producto identificable o la solución parece preceder al problema. |
| `SH-POCKET · Siete razones para detener una implementación` | `STOP02` El plan no da cuenta de todo el alcance obligatorio definido por producto. |
| `SH-POCKET · Siete razones para detener una implementación` | `STOP03` Se pretende omitir, modificar o postergar una parte sin una decisión autorizada. |
| `SH-POCKET · Siete razones para detener una implementación` | `STOP04` Una ambigüedad material está siendo resuelta por el agente sin autorización. |
| `SH-POCKET · Siete razones para detener una implementación` | `STOP05` La interfaz expone una complejidad interna que el sistema podría absorber. |
| `SH-POCKET · Siete razones para detener una implementación` | `STOP06` Una acción sensible carece de determinismo, trazabilidad o recuperación. |
| `SH-POCKET · Siete razones para detener una implementación` | `STOP07` El equipo solo puede demostrar que el código funciona, no que el usuario progresa. |
| `SH-SCORE · Preguntas para una revisión de producto` | ¿Qué fuente autorizada y qué fundamento de producto justifican esta decisión? |
| `SH-SCORE · Preguntas para una revisión de producto` | ¿La implementación y sus pruebas dan cuenta del alcance completo? |
| `SH-SCORE · Preguntas para una revisión de producto` | Cuando existen Jobs to Be Done o Job Stories, ¿cómo se relaciona esta decisión con ellos? |
| `SH-SCORE · Preguntas para una revisión de producto` | ¿La formulación describe una necesidad o es una funcionalidad redactada con otra fórmula? |
| `SH-SCORE · Preguntas para una revisión de producto` | ¿Qué carga cognitiva introduce y cuál elimina? |
| `SH-SCORE · Preguntas para una revisión de producto` | ¿Estamos exponiendo una complejidad interna? |
| `SH-SCORE · Preguntas para una revisión de producto` | ¿Puede eliminarse algún elemento sin reducir capacidad ni control? |
| `SH-SCORE · Preguntas para una revisión de producto` | ¿La persona sabe qué ocurrirá antes de actuar? |
| `SH-SCORE · Preguntas para una revisión de producto` | ¿Puede recuperarse con facilidad si se equivoca o si el sistema falla? |
| `SH-SCORE · Preguntas para una revisión de producto` | ¿La IA está proponiendo, decidiendo o ejecutando? ¿Ese nivel está autorizado? |
| `SH-SCORE · Preguntas para una revisión de producto` | ¿Qué haría que rechazáramos esta implementación aunque técnicamente funcione? |
| `SH-SCORE · Scorecard de decisión` | Fundamento trazable · 0 / 1 / 2 · Fuentes, autoridad, alcance, resultados y condiciones son identificables |
| `SH-SCORE · Scorecard de decisión` | Cobertura del producto · 0 / 1 / 2 · Todo elemento obligatorio tiene implementación, prueba o excepción aprobada |
| `SH-SCORE · Scorecard de decisión` | Job Stories aplicables · 0 / 1 / 2 · Cuando existen, circunstancia, motivación y resultado conservan evidencia suficiente |
| `SH-SCORE · Scorecard de decisión` | Progreso del usuario · 0 / 1 / 2 · La implementación produce los resultados definidos por el producto |
| `SH-SCORE · Scorecard de decisión` | Carga cognitiva · 0 / 1 / 2 · Reduce o justifica conceptos, decisiones y pasos |
| `SH-SCORE · Scorecard de decisión` | Claridad de interfaz · 0 / 1 / 2 · Estado, acción y consecuencia se comprenden |
| `SH-SCORE · Scorecard de decisión` | Control y recuperación · 0 / 1 / 2 · Existe revisión, corrección o reversibilidad proporcional |
| `SH-SCORE · Scorecard de decisión` | Profundidad progresiva · 0 / 1 / 2 · La capacidad aparece cuando corresponde |
| `SH-SCORE · Scorecard de decisión` | Confiabilidad y tiempo · 0 / 1 / 2 · Rendimiento, persistencia y feedback cumplen lo esperado |
| `SH-SCORE · Scorecard de decisión` | Uso responsable de IA · 0 / 1 / 2 · Incertidumbre, límites y determinismo están resueltos |
| `SH-SCORE · Scorecard de decisión` | Calidad acumulativa · 0 / 1 / 2 · Estados, lenguaje y microinteracciones son coherentes |
| `SH-STOP · Regla de detención antes de generar` | ¿Cuál es la definición de producto autorizada y qué alcance establece? |
| `SH-STOP · Regla de detención antes de generar` | ¿Qué elementos del fundamento justifican el desarrollo y qué evidencia los respalda? |
| `SH-STOP · Regla de detención antes de generar` | ¿La planificación da cuenta de todas las historias, capacidades, reglas, estados y criterios obligatorios? |
| `SH-STOP · Regla de detención antes de generar` | Cuando existen Job Stories, ¿la circunstancia, la motivación y el resultado están separados de la solución? |
| `SH-STOP · Regla de detención antes de generar` | ¿Cuál es la ruta principal y qué estados alternativos importan? |
| `SH-STOP · Regla de detención antes de generar` | ¿Qué decisiones debe tomar el usuario y cuáles puede resolver el sistema? |
| `SH-STOP · Regla de detención antes de generar` | ¿Qué comportamiento necesita certeza determinista? |
| `SH-STOP · Regla de detención antes de generar` | ¿Qué no forma parte del alcance y quién estableció esa exclusión? |
| `SH-STOP · Regla de detención antes de generar` | ¿Qué evidencia demostrará que el desarrollo está completo? |
| `STOP01` | No existe un fundamento de producto identificable o la solución parece preceder al problema. |
| `STOP02` | El plan no da cuenta de todo el alcance obligatorio definido por producto. |
| `STOP03` | Se pretende omitir, modificar o postergar una parte sin una decisión autorizada. |
| `STOP04` | Una ambigüedad material está siendo resuelta por el agente sin autorización. |
| `STOP05` | La interfaz expone una complejidad interna que el sistema podría absorber. |
| `STOP06` | Una acción sensible carece de determinismo, trazabilidad o recuperación. |
| `STOP07` | El equipo solo puede demostrar que el código funciona, no que el usuario progresa. |
| `V01` | Todos los elementos obligatorios de la definición de producto tienen implementación y evidencia o una excepción explícita y aprobada. |
| `V02` | Las personas alcanzan los resultados definidos y pueden reconocerlos; cuando existen Job Stories, esto se comprueba en sus circunstancias. |
| `V03` | La evidencia relaciona la situación, la necesidad y el resultado sin depender de un pedido de funcionalidad; cuando aplica, conserva circunstancia y motivación. |
| `V04` | Puede explicar dónde está, qué puede hacer y qué ocurrirá después sin ayuda externa. |
| `V05` | No enfrenta decisiones, conceptos o datos que el sistema pueda resolver de forma segura. |
| `V06` | El principiante encuentra una ruta clara y el usuario avanzado conserva capacidad suficiente. |
| `V07` | El sistema anticipa consecuencias, confirma resultados y ofrece recuperación proporcional. |
| `V08` | La persona puede revisar, corregir, rechazar o revertir según el impacto de la acción. |
| `V09` | Carga, vacío, error, éxito, interrupción y retorno mantienen contexto y orientación. |
| `V10` | El flujo funciona con teclado, foco visible, etiquetas comprensibles, contraste y tecnologías de asistencia aplicables. |
| `V11` | Las acciones críticas cumplen el presupuesto de respuesta o muestran progreso honesto. |
| `V12` | Las salidas variables declaran incertidumbre; las reglas críticas son verificables; las acciones sensibles requieren autorización. |
| `VERIFICACIÓN § Pruebas para aceptar una solución` | La aceptación debe producir evidencia. La impresión de que una pantalla se ve limpia o que el código compila no demuestra que el producto cumpla su propósito. |
