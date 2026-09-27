# Inventario de objetos del manifiesto

**Generado por** `tools/method/generar-inventario.py` desde el mapa de identificadores del núcleo v2.1. **No se edita a mano.**

## Qué es esto y qué garantiza

Un objeto entra aquí **solo si el manifiesto lo nombra**. El núcleo nombra cosas
en tres lugares: sus ocho artefactos, sus doce dimensiones de verificación y el
fundamento de producto. Las demás familias no nombran cosas —los principios
nombran compromisos, el flujo nombra pasos, el contrato nombra momentos, la
entrega nombra contenidos de informe y las detenciones nombran condiciones—:
**se adhieren** a un objeto que el manifiesto sí nombra.

| Qué hay aquí | Quién lo pone | Se revisa |
|---|---|---|
| El nombre de cada objeto | El núcleo | No hace falta |
| El texto literal de cada disposición | Extracción mecánica del núcleo | No hace falta |
| **Qué disposiciones corresponden a cada objeto** | **Esta propuesta** | **Sí. Es lo único que hay que revisar** |

**Cómo revisar cada objeto:** leer las frases de su tabla y responder una sola
pregunta — *¿hablan todas de esta misma cosa?* Si alguna no corresponde, o si
falta una que debería estar, eso es el hallazgo.


**19 objetos.**

---


## SH-FUND · El fundamento de producto

| Qué aporta | Disposición del núcleo | Texto literal |
|---|---|---|
| Qué es | `SH-FUND` FUNDAMENTO DE PRODUCTO Y FORMA DE REFERENCIA | El fundamento de producto es el contenido autorizado que establece qué debe construirse, por qué debe existir, qué resultados debe producir, qué condiciones debe respetar y cómo podrá determinarse su cumplimiento. No es un nuevo tipo de documento ni una plantilla obligatoria. Puede encontrarse en una Job Story, un Jobs to Be Done, una épica, una capacidad, un requisito, una regla de negocio, un recorrido, un criterio de aceptación o una combinación coherente de estos elementos. |
| Qué compromiso lo gobierna | `P01` regla 1 · El progreso del usuario es la unidad de diseño | Identificar el fundamento de producto y la fuente autorizada que establece el alcance antes de diseñar una respuesta. |
| Qué exige antes de implementar | `D01` Fundamento antes que implementación | Comprender la definición de producto, su autoridad, su alcance y la evidencia que la respalda antes de proponer componentes o código. Cuando existan Job Stories, conservar su circunstancia, motivación y resultado. · No comenzar a construir si una ambigüedad material puede alterar la solución, el alcance o una regla. |
| Cuándo detenerse | `STOP01` | No existe un fundamento de producto identificable o la solución parece preceder al problema. |
| Cómo lo comprueba el núcleo | `SH-FUND § Cuándo el fundamento es identificable` | Fuente y autoridad · ¿De dónde proviene y quién puede modificarlo? · Origen trazable y autoridad reconocida |
| Cómo lo comprueba el núcleo | `SH-FUND § Cuándo el fundamento es identificable` | Razón · ¿Qué situación, necesidad, problema u oportunidad aborda? · Justificación comprensible sin depender de la solución |
| Cómo lo comprueba el núcleo | `SH-FUND § Cuándo el fundamento es identificable` | Resultado · ¿Qué cambio o progreso debe producir? · Resultado reconocible para las personas o para el producto |
| Cómo lo comprueba el núcleo | `SH-FUND § Cuándo el fundamento es identificable` | Condiciones y límites · ¿Qué reglas, restricciones y exclusiones deben respetarse? · Límites suficientes para evitar decisiones silenciosas |
| Cómo lo comprueba el núcleo | `SH-FUND § Cuándo el fundamento es identificable` | Evidencia · ¿Cómo sabremos que se cumplió? · Criterios, observaciones o pruebas proporcionales al riesgo |


## A01 · Mapa del fundamento

| Qué aporta | Disposición del núcleo | Texto literal |
|---|---|---|
| Qué es | `A01` Mapa del fundamento | ¿Qué debe construirse, por qué y con qué autoridad? · Fuentes; alcance; resultados; reglas; límites; evidencia; no objetivos |
| Qué es | `FLUJO DE TRABAJO § Artefactos ajustados al contexto` | Cada artefacto existe para responder una pregunta, no para satisfacer una plantilla. Puede ser una sección del PRD, una vista derivada, una tabla, una prueba o un documento separado. Si la información ya existe, debe referenciarse y no duplicarse. La profundidad depende de la extensión, complejidad, incertidumbre y riesgo; si un artefacto no cambia una decisión ni ayuda a verificarla, debe simplificarse o eliminarse. |
| Qué paso del flujo lo produce | `F01` Comprender el fundamento | Comprender el fundamento · Reconocer las fuentes, la autoridad, el alcance, la estructura utilizada y los resultados esperados. · Mapa fiel de la definición de producto, sin reformularla por conveniencia técnica. |
| Qué debe hacer el agente | `CR02` Antes de programar | Identifica las fuentes autorizadas, explica el fundamento de producto y confirma el alcance completo. Reconoce la estructura utilizada por la definición; cuando contenga Job Stories, conserva su circunstancia, motivación y resultado. Separa evidencia de supuestos e identifica cualquier ambigüedad que pueda cambiar materialmente la solución. |
| Qué debe informar | `O01` | Fuentes autorizadas y fundamento de producto que justifican el desarrollo. |
| Cuándo detenerse | `STOP04` | Una ambigüedad material está siendo resuelta por el agente sin autorización. |


## A02 · V01 · Cobertura

| Qué aporta | Disposición del núcleo | Texto literal |
|---|---|---|
| Qué es | `V01` Cobertura | Todos los elementos obligatorios de la definición de producto tienen implementación y evidencia o una excepción explícita y aprobada. |
| Qué paso del flujo lo produce | `F02` Establecer cobertura | Establecer cobertura · Inventariar historias, capacidades, reglas, estados, recorridos, criterios y relaciones aplicables. · Cobertura completa y vacíos o contradicciones visibles. |
| Qué paso del flujo lo produce | `F03` Planificar la implementación | Planificar la implementación · Resolver dependencias, bloqueantes, orden, paralelismo, integración y pruebas sin modificar el alcance. · Plan coherente que da cuenta de toda la definición aprobada. |
| Dónde vive | `A02` Mapa de cobertura | ¿Cómo se dará cuenta de todo el alcance? · Elementos obligatorios; relaciones; dependencias; implementación; pruebas; estado; excepciones |
| Qué debe hacer el agente | `CR03` Al planificar | Da cuenta de todos los elementos obligatorios y establece sus dependencias, bloqueantes, orden, integración y pruebas. No selecciones, omitas ni postergues partes del alcance por iniciativa propia. Si las restricciones impiden cubrirlo, solicita una decisión a la autoridad de producto. |
| Qué debe hacer el agente | `CR07` Al implementar | Respeta el alcance acordado y conserva trazabilidad con su fundamento. No agregues features, modos, configuraciones ni abstracciones no solicitadas. Cubre estados vacíos, carga, error, éxito y recuperación e integra las partes relacionadas. |
| Qué debe informar | `O02` | Inventario de alcance y cobertura de historias, capacidades, reglas, estados y criterios aplicables. |
| Qué debe informar | `O06` | Archivos o componentes modificados y límites del cambio. |
| Cuándo detenerse | `STOP02` | El plan no da cuenta de todo el alcance obligatorio definido por producto. |
| Cuándo detenerse | `STOP03` | Se pretende omitir, modificar o postergar una parte sin una decisión autorizada. |
| Cómo lo comprueba el núcleo | `SH-AP § Señales de que el producto se aleja del manifiesto` | El plan selecciona alcance · Se implementan algunas historias o reglas y se posterga el resto sin una decisión de producto. · Restablecer la cobertura completa o registrar una modificación explícita y aprobada. |
| Cómo lo comprueba el núcleo | `SH-AP § Señales de que el producto se aleja del manifiesto` | La descomposición parece exclusión · Una fase técnica se presenta como si redefiniera lo que el PRD exige. · Separar orden de ejecución, estado de avance y alcance comprometido. |
| Cómo lo comprueba el núcleo | `SH-FUND § Alcance completo y autoridad de producto` | Toda omisión, modificación o postergación debe ser explícita, trazable y aprobada por la autoridad de producto. |
| Cómo lo comprueba el núcleo | `SH-FUND § Alcance completo y autoridad de producto` | Si las restricciones de tiempo, recursos o tecnología impiden cubrir el alcance, el plan debe hacer visible la incompatibilidad y solicitar una decisión. |
| Cómo lo comprueba el núcleo | `SH-FUND § Alcance completo y autoridad de producto` | Una estrategia incremental, por fases o por releases puede utilizarse cuando el proyecto la adopta; no es una obligación del núcleo. |
| Cómo lo comprueba el núcleo | `SH-FUND § Alcance completo y autoridad de producto` | La completitud se determina reconciliando la implementación y la evidencia contra la definición de producto completa y sus excepciones aprobadas. |
| Cómo lo comprueba el núcleo | `SH-FUND § Cadena de trazabilidad` | Definición de producto · Qué debe construirse y bajo qué condiciones · Todo elemento obligatorio tiene cobertura o una excepción aprobada |
| Cómo lo comprueba el núcleo | `SH-FUND § Cadena de trazabilidad` | Jobs to Be Done · Qué progreso general merece atención cuando esta forma resulta aplicable · El resultado sigue siendo relevante para la persona |
| Cómo lo comprueba el núcleo | `SH-FUND § Cadena de trazabilidad` | Job Story · Qué circunstancia concreta debe atenderse cuando la fuente utiliza esta forma · La historia está validada y no prescribe una solución no autorizada |
| Cómo lo comprueba el núcleo | `SH-FUND § Cadena de trazabilidad` | Diseño e implementación · Qué comportamiento responde al fundamento · Cada elemento tiene una razón trazable |
| Cómo lo comprueba el núcleo | `SH-FUND § Cadena de trazabilidad` | Aceptación · Qué evidencia autoriza declarar completo el desarrollo · Resultados, reglas y criterios se cumplen bajo las condiciones definidas |


## A03 · Ficha de Job Story cuando aplique

| Qué aporta | Disposición del núcleo | Texto literal |
|---|---|---|
| Qué es | `A03` Ficha de Job Story cuando aplique | ¿Cuándo surge la necesidad y qué cambio busca la persona? · Circunstancia; motivación; resultado; conducta actual; ansiedad; evidencia; supuestos |
| Qué compromiso lo gobierna | `P01` regla 3 · El progreso del usuario es la unidad de diseño | Formular cada Job Story como circunstancia, motivación y resultado, sin nombrar una pantalla, un componente ni una funcionalidad. |
| Qué compromiso lo gobierna | `P02` regla 3 · La experiencia también es funcionalidad | Considerar el estado emocional y cognitivo que acompaña la situación definida por el producto y, cuando exista, por la Job Story. |
| Qué paso del flujo lo produce | `F04` Concretar el progreso | Concretar el progreso · Usar las Job Stories existentes o formular una vista derivada cuando aporte claridad y esté identificada como tal. · Circunstancias, motivaciones y resultados preservados cuando corresponda. |
| Qué debe hacer el agente | `CR02` Antes de programar | Identifica las fuentes autorizadas, explica el fundamento de producto y confirma el alcance completo. Reconoce la estructura utilizada por la definición; cuando contenga Job Stories, conserva su circunstancia, motivación y resultado. Separa evidencia de supuestos e identifica cualquier ambigüedad que pueda cambiar materialmente la solución. |
| Qué debe informar | `O03` | Jobs to Be Done y Job Stories cuando formen parte de la definición o aporten una vista derivada útil. |
| Qué evidencia exige | `V02` Progreso | Las personas alcanzan los resultados definidos y pueden reconocerlos; cuando existen Job Stories, esto se comprueba en sus circunstancias. |
| Qué evidencia exige | `V03` Causalidad | La evidencia relaciona la situación, la necesidad y el resultado sin depender de un pedido de funcionalidad; cuando aplica, conserva circunstancia y motivación. |
| Cómo lo comprueba el núcleo | `SH-AP § Señales de que el producto se aleja del manifiesto` | La Job Story es una feature disfrazada · La motivación dice usar un dashboard, recibir alertas o pulsar un botón. · Reformular el avance que necesita la persona sin anticipar la respuesta. |
| Cómo lo comprueba el núcleo | `SH-AP § Señales de que el producto se aleja del manifiesto` | La circunstancia fue inventada · El equipo redacta una historia plausible sin observar conducta, tensión o contexto real. · Marcarla como hipótesis y obtener evidencia antes de ampliar la implementación. |
| Cómo lo comprueba el núcleo | `SH-FUND § Relación entre los niveles` | Jobs to Be Done · El progreso amplio que la persona busca conseguir · Organizar el producto alrededor de funcionalidades |
| Cómo lo comprueba el núcleo | `SH-FUND § Relación entre los niveles` | Job Story · La circunstancia, la motivación y el resultado que activan una necesidad concreta · Diseñar desde roles genéricos o pedidos literales |
| Cómo lo comprueba el núcleo | `SH-FUND § Relación entre los niveles` | Respuesta del producto · El comportamiento del sistema elegido para resolver la historia · Confundir el problema con la primera solución imaginada |
| Cómo lo comprueba el núcleo | `SH-FUND § Relación entre los niveles` | Evidencia de aceptación · La observación que demuestra progreso en esa circunstancia · Aceptar una entrega porque funciona técnicamente |
| Cómo lo comprueba el núcleo | `SH-FUND § Evidencia mínima que acompaña la historia` | Conducta actual · ¿Qué hace hoy la persona? · Pasos, alternativa o abandono observados |
| Cómo lo comprueba el núcleo | `SH-FUND § Evidencia mínima que acompaña la historia` | Obstáculo o ansiedad · ¿Qué frena o vuelve riesgoso el avance? · Duda, costo, temor, esfuerzo o dependencia relevante |
| Cómo lo comprueba el núcleo | `SH-FUND § Evidencia mínima que acompaña la historia` | Evidencia causal · ¿Qué respalda la relación entre circunstancia y motivación? · Observación, entrevista, dato de uso o supuesto declarado |
| Cómo lo comprueba el núcleo | `SH-FUND § Evidencia mínima que acompaña la historia` | Evidencia de éxito · ¿Qué demostraría que hubo progreso? · Conducta o resultado observable dentro de la circunstancia |
| Cómo lo comprueba el núcleo | `SH-FUND § Pruebas de calidad antes de diseñar` | La circunstancia describe un desencadenante concreto y no una categoría de usuario. |
| Cómo lo comprueba el núcleo | `SH-FUND § Pruebas de calidad antes de diseñar` | La motivación expresa progreso o comprensión y no una funcionalidad solicitada. |
| Cómo lo comprueba el núcleo | `SH-FUND § Pruebas de calidad antes de diseñar` | El resultado puede reconocerse sin confundirlo con completar el flujo del producto. |
| Cómo lo comprueba el núcleo | `SH-FUND § Pruebas de calidad antes de diseñar` | La historia está respaldada por evidencia o identifica con claridad el supuesto pendiente. |
| Cómo lo comprueba el núcleo | `SH-FUND § Pruebas de calidad antes de diseñar` | La formulación permite comparar varias respuestas, incluida la opción de no construir. |
| Cómo lo comprueba el núcleo | `SH-FUND § Pruebas de calidad antes de diseñar` | El alcance es suficiente para cambiar una decisión, pero no intenta contener el trabajo completo del usuario. |


## A04 · Contrato de experiencia

| Qué aporta | Disposición del núcleo | Texto literal |
|---|---|---|
| Qué es | `A04` Contrato de experiencia | ¿Qué debe comprender y poder hacer la persona? · Ruta principal; lenguaje; decisiones; feedback; control; recuperación |
| Qué compromiso lo gobierna | `P05` regla 3 · La interfaz no debe convertirse en otra tarea | Hacer evidente la acción principal, el estado actual y el siguiente paso posible. |
| Qué paso del flujo lo produce | `F05` Establecer el contrato de experiencia | Establecer el contrato de experiencia · Describir qué debe comprender, decidir y sentir la persona en los momentos críticos. · Ruta principal, estados y promesa de interacción. |
| Qué debe hacer el agente | `CR05` Al diseñar | No expongas estructuras internas. Usa lenguaje del usuario, convenciones conocidas, jerarquía clara, profundidad progresiva, valores predeterminados editables y feedback inmediato. |
| Qué debe informar | `O07` | Estados y casos extremos cubiertos. |
| Qué evidencia exige | `V04` Comprensión | Puede explicar dónde está, qué puede hacer y qué ocurrirá después sin ayuda externa. |
| Qué evidencia exige | `V06` Profundidad | El principiante encuentra una ruta clara y el usuario avanzado conserva capacidad suficiente. |


## A05 · Modelo de estados

| Qué aporta | Disposición del núcleo | Texto literal |
|---|---|---|
| Qué es | `A05` Modelo de estados | ¿Qué puede ocurrir y qué transiciones son válidas? · Estados; eventos; reglas; errores; permisos; persistencia |
| Qué compromiso lo gobierna | `P08` regla 1 · La calidad vive en la acumulación de detalles | Diseñar y verificar estados normales, vacíos, de carga, error, éxito y recuperación. |
| Qué exige antes de implementar | `D02` Especificación suficiente antes que generación | Definir estados, decisiones, restricciones y criterios de aceptación con el nivel necesario para el riesgo. · No convertir un prompt vago en una implementación extensa y luego usar el código para descubrir el problema. |
| Qué paso del flujo lo produce | `F06` Modelar reglas y riesgos | Modelar reglas y riesgos · Separar lógica determinista, comportamiento generativo, permisos y acciones irreversibles. · Mapa de decisiones y límites. |
| Qué debe hacer el agente | `CR07` Al implementar | Respeta el alcance acordado y conserva trazabilidad con su fundamento. No agregues features, modos, configuraciones ni abstracciones no solicitadas. Cubre estados vacíos, carga, error, éxito y recuperación e integra las partes relacionadas. |
| Qué debe informar | `O07` | Estados y casos extremos cubiertos. |
| Qué evidencia exige | `V09` Estados | Carga, vacío, error, éxito, interrupción y retorno mantienen contexto y orientación. |
| Cómo lo comprueba el núcleo | `SH-AP § Señales de que el producto se aleja del manifiesto` | El happy path define el producto · Errores, vacíos e interrupciones quedan para después. · Modelar estados antes de implementar y aceptarlos explícitamente. |


## A06 · V05 · Carga

| Qué aporta | Disposición del núcleo | Texto literal |
|---|---|---|
| Qué es | `V05` Carga | No enfrenta decisiones, conceptos o datos que el sistema pueda resolver de forma segura. |
| Qué compromiso lo gobierna | `P06` regla 1 · La atención es un recurso del producto | Exigir que cada elemento visible y cada decisión solicitada respondan a una circunstancia, motivación o resultado verificable. |
| Qué compromiso lo gobierna | `P06` regla 2 · La atención es un recurso del producto | Jerarquizar por relevancia para el estado actual, no por igualdad entre features. |
| Qué compromiso lo gobierna | `P06` regla 3 · La atención es un recurso del producto | Reducir interrupciones y reservar señales intensas para asuntos que realmente requieren atención. |
| Qué compromiso lo gobierna | `P03` regla 2 · La complejidad pertenece al sistema | Resolver dependencias, valores predeterminados y secuencias cuando exista suficiente contexto. |
| Qué compromiso lo gobierna | `P03` regla 3 · La complejidad pertenece al sistema | Exponer una excepción solo a quienes realmente deben decidirla. |
| Qué exige antes de implementar | `D03` Simplicidad deliberada | Preferir la solución que exige menos conceptos, decisiones y memoria al usuario cuando ambas logran el mismo resultado. · Menos código no es la medida; menos carga innecesaria sí. |
| Dónde vive | `A06` Presupuesto de complejidad | ¿Qué carga estamos agregando? · Conceptos nuevos; decisiones; pasos; excepciones; opciones visibles |
| Qué debe hacer el agente | `CR07` Al implementar | Respeta el alcance acordado y conserva trazabilidad con su fundamento. No agregues features, modos, configuraciones ni abstracciones no solicitadas. Cubre estados vacíos, carga, error, éxito y recuperación e integra las partes relacionadas. |
| Cómo lo comprueba el núcleo | `SH-AP § Señales de que el producto se aleja del manifiesto` | Más opciones se confunden con más valor · Cada excepción se convierte en un control visible. · Resolver por contexto y revelar excepciones cuando aparezcan. |
| Cómo lo comprueba el núcleo | `SH-AP § Señales de que el producto se aleja del manifiesto` | La estética maquilla la fricción · La pantalla luce bien, pero exige decisiones innecesarias. · Evaluar el recorrido completo y el esfuerzo real. |
| Cómo lo comprueba el núcleo | `SH-AP § Señales de que el producto se aleja del manifiesto` | El agente agrega por si acaso · Aparecen modos, preferencias y abstracciones no pedidas. · Definir exclusiones y exigir justificación por capacidad. |


## A07 · Plan de aceptación

| Qué aporta | Disposición del núcleo | Texto literal |
|---|---|---|
| Qué es | `A07` Plan de aceptación | ¿Qué evidencia autoriza declarar completo el desarrollo? · Resultados; reglas; Job Stories cuando apliquen; accesibilidad; rendimiento; estados extremos; métricas |
| Qué compromiso lo gobierna | `P02` regla 1 · La experiencia también es funcionalidad | Incluir esfuerzo, claridad y confianza dentro de los criterios de aceptación. |
| Qué compromiso lo gobierna | `P02` regla 2 · La experiencia también es funcionalidad | Probar el flujo completo, no solo cada pantalla o endpoint de forma aislada. |
| Qué compromiso lo gobierna | `P08` regla 3 · La calidad vive en la acumulación de detalles | Revisar el producto a escala real y con contenido realista antes de aprobarlo. |
| Qué exige antes de implementar | `D05` Verificación antes que aceptación | Evaluar el flujo, los estados extremos, accesibilidad, rendimiento y resultado real. · Código generado y pruebas unitarias aprobadas no equivalen a producto terminado. |
| Qué exige antes de implementar | `VERIFICACIÓN § Pruebas para aceptar una solución` | La aceptación debe producir evidencia. La impresión de que una pantalla se ve limpia o que el código compila no demuestra que el producto cumpla su propósito. |
| Qué paso del flujo lo produce | `F08` Construir, integrar y verificar | Construir, integrar y verificar · Implementar el plan, mantener trazabilidad y reconciliar resultados contra el alcance completo. · Código, pruebas y evidencia de cobertura; pendientes y excepciones explícitos. |
| Qué debe hacer el agente | `CR08` Antes de declarar terminado | Reconcilia la implementación contra la definición completa de producto. Verifica resultados, reglas, criterios y, cuando correspondan, las Job Stories en sus circunstancias. Comprueba también accesibilidad, rendimiento percibido, errores, persistencia del trabajo y control del usuario. Entrega evidencia, pendientes y excepciones aprobadas. |
| Qué debe informar | `O08` | Pruebas ejecutadas y evidencia de resultado. |
| Qué debe informar | `O04` | Evidencia disponible, supuestos y criterios de resultado. |
| Qué evidencia exige | `V01` Cobertura | Todos los elementos obligatorios de la definición de producto tienen implementación y evidencia o una excepción explícita y aprobada. |
| Cuándo detenerse | `STOP07` | El equipo solo puede demostrar que el código funciona, no que el usuario progresa. |


## A08 · Registro de decisiones

| Qué aporta | Disposición del núcleo | Texto literal |
|---|---|---|
| Qué es | `A08` Registro de decisiones | ¿Por qué elegimos esta alternativa? · Alternativas; tradeoffs; supuestos; decisión; fecha; evidencia pendiente |
| Qué exige antes de implementar | `D03` Simplicidad deliberada | Preferir la solución que exige menos conceptos, decisiones y memoria al usuario cuando ambas logran el mismo resultado. · Menos código no es la medida; menos carga innecesaria sí. |
| Qué exige antes de implementar | `DOCTRINA PARA DESARROLLO CON IA § La segunda pregunta rectora` párrafo 1 | Ahora que podemos construir casi cualquier cosa con mayor facilidad, ¿qué merece ser construido y qué debemos dejar deliberadamente fuera? |
| Qué exige antes de implementar | `DOCTRINA PARA DESARROLLO CON IA § La segunda pregunta rectora` párrafo 2 | Esta pregunta introduce una obligación que antes podía quedar oculta por el costo técnico. Debe plantearse durante la definición de producto y al evaluar alternativas, no utilizarse durante la implementación para recortar unilateralmente un alcance aprobado. Cada capacidad debe justificar su existencia contra una alternativa más simple, incluida la alternativa de no construirla; una vez autorizada, cualquier exclusión requiere una decisión trazable de producto. |
| Qué paso del flujo lo produce | `F07` Explorar y prototipar | Explorar y prototipar · Comparar alternativas y probar comprensión, jerarquía y recuperación antes de optimizar código. · Razón de la alternativa elegida y evidencia del recorrido. |
| Qué debe hacer el agente | `CR04` Al proponer | Presenta la alternativa recomendada, una alternativa más simple y la opción de no construir cuando la decisión aún pertenezca a producto. Explica cómo responde cada una al fundamento, qué carga introduce y qué tradeoffs exige. |
| Qué debe hacer el agente | `CR01` Propósito | Construye la solución más simple que permita al usuario lograr el resultado definido, conservando claridad, control y capacidad de recuperación. |
| Qué debe informar | `O05` | Alternativa elegida y razón de descarte de opciones más complejas. |


## V02 · Progreso

| Qué aporta | Disposición del núcleo | Texto literal |
|---|---|---|
| Qué es | `V02` Progreso | Las personas alcanzan los resultados definidos y pueden reconocerlos; cuando existen Job Stories, esto se comprueba en sus circunstancias. |
| Qué compromiso lo gobierna | `P01` regla 2 · El progreso del usuario es la unidad de diseño | Cuando el fundamento se exprese mediante Job Stories, ubicarlas dentro del progreso o propósito de nivel superior que corresponda. |
| Qué paso del flujo lo produce | `F04` Concretar el progreso | Concretar el progreso · Usar las Job Stories existentes o formular una vista derivada cuando aporte claridad y esté identificada como tal. · Circunstancias, motivaciones y resultados preservados cuando corresponda. |
| Dónde vive | `A03` Ficha de Job Story cuando aplique | ¿Cuándo surge la necesidad y qué cambio busca la persona? · Circunstancia; motivación; resultado; conducta actual; ansiedad; evidencia; supuestos |
| Cuándo detenerse | `STOP07` | El equipo solo puede demostrar que el código funciona, no que el usuario progresa. |


## V03 · Causalidad

| Qué aporta | Disposición del núcleo | Texto literal |
|---|---|---|
| Qué es | `V03` Causalidad | La evidencia relaciona la situación, la necesidad y el resultado sin depender de un pedido de funcionalidad; cuando aplica, conserva circunstancia y motivación. |
| Qué compromiso lo gobierna | `P01` regla 4 · El progreso del usuario es la unidad de diseño | Respaldar las decisiones con conducta observada, obstáculo o ansiedad actual y evidencia que permita aceptar el resultado. |
| Dónde vive | `A03` Ficha de Job Story cuando aplique | ¿Cuándo surge la necesidad y qué cambio busca la persona? · Circunstancia; motivación; resultado; conducta actual; ansiedad; evidencia; supuestos |


## V04 · Comprensión

| Qué aporta | Disposición del núcleo | Texto literal |
|---|---|---|
| Qué es | `V04` Comprensión | Puede explicar dónde está, qué puede hacer y qué ocurrirá después sin ayuda externa. |
| Qué compromiso lo gobierna | `P05` regla 1 · La interfaz no debe convertirse en otra tarea | Preferir convenciones conocidas cuando resuelvan bien el problema. |
| Qué compromiso lo gobierna | `P05` regla 2 · La interfaz no debe convertirse en otra tarea | Explicar en contexto sin exigir tutoriales previos para acciones básicas. |
| Qué compromiso lo gobierna | `P08` regla 2 · La calidad vive en la acumulación de detalles | Mantener lenguaje, jerarquía y comportamiento consistentes en todo el flujo. |
| Qué compromiso lo gobierna | `P03` regla 1 · La complejidad pertenece al sistema | Traducir conceptos internos al lenguaje y al modelo mental de la persona. |
| Dónde vive | `A04` Contrato de experiencia | ¿Qué debe comprender y poder hacer la persona? · Ruta principal; lenguaje; decisiones; feedback; control; recuperación |
| Qué debe hacer el agente | `CR05` Al diseñar | No expongas estructuras internas. Usa lenguaje del usuario, convenciones conocidas, jerarquía clara, profundidad progresiva, valores predeterminados editables y feedback inmediato. |
| Cuándo detenerse | `STOP05` | La interfaz expone una complejidad interna que el sistema podría absorber. |
| Cómo lo comprueba el núcleo | `SH-AP § Señales de que el producto se aleja del manifiesto` | La interfaz replica la base de datos · El usuario debe elegir tipos, estados o relaciones internas. · Traducir la estructura a objetivos y decisiones humanas. |
| Cómo lo comprueba el núcleo | `SH-AP § Señales de que el producto se aleja del manifiesto` | El tutorial compensa una interfaz oscura · La tarea básica requiere explicación previa. · Revisar lenguaje, jerarquía, convenciones y feedback. |


## V06 · Profundidad

| Qué aporta | Disposición del núcleo | Texto literal |
|---|---|---|
| Qué es | `V06` Profundidad | El principiante encuentra una ruta clara y el usuario avanzado conserva capacidad suficiente. |
| Qué compromiso lo gobierna | `P04` regla 1 · Simple al comenzar y profundo al necesitarlo | Mostrar primero la ruta principal y revelar opciones avanzadas cuando el contexto las vuelva relevantes. |
| Qué compromiso lo gobierna | `P04` regla 2 · Simple al comenzar y profundo al necesitarlo | Conservar atajos y precisión para usuarios expertos sin imponerlos al principiante. |
| Qué compromiso lo gobierna | `P04` regla 3 · Simple al comenzar y profundo al necesitarlo | Usar buenos valores predeterminados, siempre editables cuando la decisión importa. |
| Dónde vive | `A04` Contrato de experiencia | ¿Qué debe comprender y poder hacer la persona? · Ruta principal; lenguaje; decisiones; feedback; control; recuperación |
| Qué debe hacer el agente | `CR05` Al diseñar | No expongas estructuras internas. Usa lenguaje del usuario, convenciones conocidas, jerarquía clara, profundidad progresiva, valores predeterminados editables y feedback inmediato. |


## V07 · Confianza

| Qué aporta | Disposición del núcleo | Texto literal |
|---|---|---|
| Qué es | `V07` Confianza | El sistema anticipa consecuencias, confirma resultados y ofrece recuperación proporcional. |
| Qué compromiso lo gobierna | `P07` regla 1 · La confianza se diseña | Mostrar qué está ocurriendo, qué cambiará y cuándo una acción será irreversible. |
| Qué compromiso lo gobierna | `P07` regla 3 · La confianza se diseña | Diferenciar con claridad recomendaciones, decisiones automáticas y resultados confirmados. |
| Qué compromiso lo gobierna | `P10` regla 1 · La persona conserva control y propiedad | Pedir confirmación proporcional al impacto, no para cada gesto ni después de una acción irreversible. |
| Qué debe hacer el agente | `CR06` Al usar IA | Reserva las reglas críticas para lógica verificable. Declara incertidumbre. No ejecutes acciones de alto impacto sin autorización proporcional. Mantén trazabilidad, revisión y reversibilidad. |


## V08 · Control

| Qué aporta | Disposición del núcleo | Texto literal |
|---|---|---|
| Qué es | `V08` Control | La persona puede revisar, corregir, rechazar o revertir según el impacto de la acción. |
| Qué compromiso lo gobierna | `P10` regla 2 · La persona conserva control y propiedad | Permitir revisar, editar, exportar y revertir cuando el dominio lo permita. |
| Qué compromiso lo gobierna | `P10` regla 3 · La persona conserva control y propiedad | Explicar el uso de datos y separar autorización, recomendación y ejecución. |
| Qué compromiso lo gobierna | `P07` regla 2 · La confianza se diseña | Permitir deshacer, corregir o volver a un estado seguro cuando sea razonable. |
| Qué exige antes de implementar | `D06` IA subordinada al usuario | Usar IA para proponer, explicar y ejecutar bajo límites claros, manteniendo revisión y reversibilidad proporcionales al impacto. · La fluidez de una respuesta nunca sustituye evidencia ni autorización. |
| Qué debe hacer el agente | `CR06` Al usar IA | Reserva las reglas críticas para lógica verificable. Declara incertidumbre. No ejecutes acciones de alto impacto sin autorización proporcional. Mantén trazabilidad, revisión y reversibilidad. |
| Cómo lo comprueba el núcleo | `SH-AP § Señales de que el producto se aleja del manifiesto` | La confirmación sustituye la reversibilidad · Se pregunta varias veces, pero no existe deshacer. · Diseñar recuperación y usar confirmaciones solo según riesgo. |


## V09 · Estados

| Qué aporta | Disposición del núcleo | Texto literal |
|---|---|---|
| Qué es | `V09` Estados | Carga, vacío, error, éxito, interrupción y retorno mantienen contexto y orientación. |
| Qué compromiso lo gobierna | `P09` regla 3 · El tiempo y la continuidad forman parte de la interfaz | Guardar trabajo, contexto y estado con una frecuencia proporcional al costo de perderlos. |
| Dónde vive | `A05` Modelo de estados | ¿Qué puede ocurrir y qué transiciones son válidas? · Estados; eventos; reglas; errores; permisos; persistencia |
| Qué debe informar | `O07` | Estados y casos extremos cubiertos. |


## V10 · Accesibilidad

| Qué aporta | Disposición del núcleo | Texto literal |
|---|---|---|
| Qué es | `V10` Accesibilidad | El flujo funciona con teclado, foco visible, etiquetas comprensibles, contraste y tecnologías de asistencia aplicables. |
| Qué exige antes de implementar | `D05` Verificación antes que aceptación | Evaluar el flujo, los estados extremos, accesibilidad, rendimiento y resultado real. · Código generado y pruebas unitarias aprobadas no equivalen a producto terminado. |
| Dónde vive | `A07` Plan de aceptación | ¿Qué evidencia autoriza declarar completo el desarrollo? · Resultados; reglas; Job Stories cuando apliquen; accesibilidad; rendimiento; estados extremos; métricas |


## V11 · Rendimiento

| Qué aporta | Disposición del núcleo | Texto literal |
|---|---|---|
| Qué es | `V11` Rendimiento | Las acciones críticas cumplen el presupuesto de respuesta o muestran progreso honesto. |
| Qué compromiso lo gobierna | `P09` regla 1 · El tiempo y la continuidad forman parte de la interfaz | Definir presupuestos de respuesta para las interacciones críticas. |
| Qué compromiso lo gobierna | `P09` regla 2 · El tiempo y la continuidad forman parte de la interfaz | Mostrar progreso honesto y permitir continuar cuando una operación pueda demorarse. |
| Dónde vive | `A05` Modelo de estados | ¿Qué puede ocurrir y qué transiciones son válidas? · Estados; eventos; reglas; errores; permisos; persistencia |
| Cómo lo comprueba el núcleo | `SH-AP § Señales de que el producto se aleja del manifiesto` | La velocidad técnica oculta la espera · La operación tarda sin feedback o bloquea todo el flujo. · Responder de inmediato, mostrar progreso y preservar continuidad. |


## V12 · IA

| Qué aporta | Disposición del núcleo | Texto literal |
|---|---|---|
| Qué es | `V12` IA | Las salidas variables declaran incertidumbre; las reglas críticas son verificables; las acciones sensibles requieren autorización. |
| Qué exige antes de implementar | `D04` Determinismo donde importa | Implementar reglas críticas, permisos, cálculos, estados y validaciones como lógica verificable. · No delegar certeza, cumplimiento o seguridad al comportamiento variable de un modelo. |
| Qué exige antes de implementar | `D06` IA subordinada al usuario | Usar IA para proponer, explicar y ejecutar bajo límites claros, manteniendo revisión y reversibilidad proporcionales al impacto. · La fluidez de una respuesta nunca sustituye evidencia ni autorización. |
| Qué exige antes de implementar | `DOCTRINA PARA DESARROLLO CON IA § Determinismo y generación` | La elección no es entre un producto determinista o un producto con IA. Un sistema confiable combina ambos según la naturaleza de cada decisión. |
| Qué paso del flujo lo produce | `F06` Modelar reglas y riesgos | Modelar reglas y riesgos · Separar lógica determinista, comportamiento generativo, permisos y acciones irreversibles. · Mapa de decisiones y límites. |
| Qué debe hacer el agente | `CR06` Al usar IA | Reserva las reglas críticas para lógica verificable. Declara incertidumbre. No ejecutes acciones de alto impacto sin autorización proporcional. Mantén trazabilidad, revisión y reversibilidad. |
| Cuándo detenerse | `STOP06` | Una acción sensible carece de determinismo, trazabilidad o recuperación. |
| Cómo lo comprueba el núcleo | `SH-AP § Señales de que el producto se aleja del manifiesto` | La IA llena vacíos conceptuales · Un prompt ambiguo produce una implementación grande. · Detener, aclarar supuestos materiales y preservar el alcance autorizado. |
| Cómo lo comprueba el núcleo | `SH-AP § Señales de que el producto se aleja del manifiesto` | La respuesta fluida parece verdadera · El usuario no distingue hecho, inferencia y propuesta. · Mostrar fuente, incertidumbre, límites y ruta de verificación. |


---

## Las comprobaciones que el núcleo ya escribe

Cada principio trae su propia batería, bajo el encabezado «Pruebas de decisión». **No hay que redactarlas ni elegirlas**: el manifiesto las escribió. Se listan por principio, con los objetos donde cayeron sus reglas de diseño.


### `P01` El progreso del usuario es la unidad de diseño

*Sus reglas de diseño están en: Causalidad, El fundamento de producto, Ficha de Job Story cuando aplique, Progreso.*

- ¿Puede señalarse la fuente autorizada que justifica esta decisión y su relación con el alcance completo?
- Cuando existe una Job Story, ¿la circunstancia es específica y observable o solo describe un rol?
- ¿La motivación y el resultado están respaldados por evidencia o fueron supuestos por el equipo?
- ¿La formulación admite varias soluciones posibles? Si ya prescribe una interfaz sin que ello sea una decisión de producto, debe revisarse.


### `P02` La experiencia también es funcionalidad

*Sus reglas de diseño están en: Ficha de Job Story cuando aplique, Plan de aceptación.*

- ¿La persona puede concentrarse en su objetivo o debe administrar la herramienta?
- ¿Qué momentos provocan duda, tensión o interrupción?
- ¿Una tarea correcta deja al usuario con energía para continuar?


### `P03` La complejidad pertenece al sistema

*Sus reglas de diseño están en: Carga, Comprensión.*

- ¿Este paso existe por una necesidad del usuario o por la estructura del sistema?
- ¿Estamos mostrando una entidad técnica que podría traducirse o inferirse?
- ¿La persona necesita comprender esta regla para tomar una buena decisión?


### `P04` Simple al comenzar y profundo al necesitarlo

*Sus reglas de diseño están en: Profundidad.*

- ¿Qué necesita ver la persona exactamente en este estado?
- ¿La simplificación elimina ruido o elimina capacidad necesaria?
- ¿Un usuario experto puede avanzar con rapidez sin que el principiante cargue con esa profundidad?


### `P05` La interfaz no debe convertirse en otra tarea

*Sus reglas de diseño están en: Comprensión, Contrato de experiencia.*

- ¿La persona entiende qué significan los elementos sin una leyenda externa?
- ¿Necesita recordar algo de una pantalla anterior para actuar correctamente?
- ¿La interfaz agrega una capa de aprendizaje ajena a la situación o al resultado que debe resolver?


### `P06` La atención es un recurso del producto

*Sus reglas de diseño están en: Carga.*

- ¿Qué compite visual o mentalmente con la acción principal?
- ¿Puede eliminarse un elemento sin perder información necesaria o control?
- ¿La interfaz diferencia lo urgente, lo importante y lo opcional?


### `P07` La confianza se diseña

*Sus reglas de diseño están en: Confianza, Control.*

- ¿La persona sabe qué ocurrirá antes de confirmar?
- ¿Puede verificar qué hizo el sistema y por qué?
- ¿Existe una ruta de recuperación proporcional al riesgo?


### `P08` La calidad vive en la acumulación de detalles

*Sus reglas de diseño están en: Comprensión, Modelo de estados, Plan de aceptación.*

- ¿Los detalles refuerzan la misma lógica o contradicen expectativas?
- ¿Qué ocurre en los estados menos frecuentes?
- ¿El producto se siente deliberadamente construido o ensamblado por partes?


### `P09` El tiempo y la continuidad forman parte de la interfaz

*Sus reglas de diseño están en: Estados, Rendimiento.*

- ¿La interfaz responde de inmediato aunque el proceso final continúe?
- ¿Qué pierde la persona si la conexión falla ahora?
- ¿El producto evita acciones duplicadas y estados ambiguos?


### `P10` La persona conserva control y propiedad

*Sus reglas de diseño están en: Confianza, Control.*

- ¿La persona puede rechazar la propuesta sin perder su avance?
- ¿Entiende qué datos se utilizaron y con qué propósito?
- ¿Puede recuperar o llevarse su contenido en un formato útil?


---

## Ocho disposiciones que no pertenecen a un objeto

No se adhieren a un objeto porque **se aplican a todos**. Declararlo es parte del inventario: dejarlo implícito sería tan malo como omitirlas.

| De dónde | Cuándo actúa | Qué dice el núcleo, literal |
|---|---|---|
| `SH-STOP` Regla de detención antes de generar | Antes de generar, sobre cualquier objeto | El agente no debería comenzar una implementación si no puede responder con precisión las siguientes preguntas en el nivel requerido por el riesgo y la complejidad: |
| `SH-SCORE` Scorecard de decisión | Al valorar el conjunto antes de liberar | Asigne 0 cuando no existe evidencia, 1 cuando el cumplimiento es parcial o depende de un supuesto no validado, y 2 cuando existe evidencia suficiente. El puntaje orienta la conversación; no reemplaza el juicio. |
| `SH-AP` ANTIPATRONES | Señales de que algún objeto se está incumpliendo | Señales de que el producto se aleja del manifiesto |
| `SH-GOV` GOBERNANZA | Quién decide sobre cualquier objeto | Cómo convertir el manifiesto en una práctica habitual |
| `SH-DONE` Definición de terminado | Cuándo el conjunto está terminado | Un desarrollo está completo cuando todos los elementos obligatorios de la definición de producto tienen una implementación y una evidencia verificable, o una excepción explícita y aprobada; las personas alcanzan los resultados previstos bajo las condiciones definidas, y la conducta del sistema y la  |
| `O09`  | Qué informar sobre cualquier objeto que quede abierto | Riesgos, incertidumbres, pendientes, excepciones y decisiones que aún requieren juicio humano. |
| `SH-POCKET` GUÍA DE BOLSILLO | Preguntas para una persona; no es ejecutable | Catorce preguntas antes de aceptar una decisión |
| `SH-INDEX` ÍNDICE OPERATIVO PARA AGENTES | Cómo se citan los identificadores; no es una obligación | Esta capa de navegación permite que personas, agentes y adaptadores citen obligaciones del núcleo de manera estable. Los identificadores no agregan doctrina, prioridad, etapas, artefactos ni criterios: solo señalan contenido ya aprobado. Una referencia por identificador nunca sustituye la lectura de |

---

## Nombradas dos veces por el núcleo

El núcleo nombra cuatro cosas dos veces. La regla que resolvió los cuatro casos:

> Un artefacto y una dimensión de verificación son el **mismo** objeto cuando la dimensión verifica exactamente lo que el artefacto registra. Son **dos** objetos cuando el artefacto registra más de lo que la dimensión verifica, o cuando la dimensión abarca más de un artefacto.


### `SH-FUND` FUNDAMENTO DE PRODUCTO Y FORMA DE REFERENCIA ↔ `A01` Mapa del fundamento → **dos objetos**

| De dónde | Qué dice el núcleo, literal |
|---|---|
| `SH-FUND` | El fundamento de producto es el contenido autorizado que establece qué debe construirse, por qué debe existir, qué resultados debe producir, qué condiciones debe respetar y cómo podrá determinarse su cumplimiento. No es un nuevo tipo de documento ni una plantilla obligatoria. Puede encontrarse en una Job Story, un Jobs |
| `A01` | ¿Qué debe construirse, por qué y con qué autoridad? · Fuentes; alcance; resultados; reglas; límites; evidencia; no objetivos |

El fundamento entra desde afuera; el mapa es lo que el método produce para reflejarlo. `F01` exige un «mapa fiel de la definición de producto, sin reformularla»: no se exige fidelidad de una cosa consigo misma.


### `A02` Mapa de cobertura ↔ `V01` Cobertura → **un objeto**

| De dónde | Qué dice el núcleo, literal |
|---|---|
| `A02` | ¿Cómo se dará cuenta de todo el alcance? · Elementos obligatorios; relaciones; dependencias; implementación; pruebas; estado; excepciones |
| `V01` | Todos los elementos obligatorios de la definición de producto tienen implementación y evidencia o una excepción explícita y aprobada. |

Mismo sujeto. El artefacto es dónde se registra; la dimensión es qué debe resultar cierto. **Fusionados.**


### `A05` Modelo de estados ↔ `V09` Estados → **dos objetos**

| De dónde | Qué dice el núcleo, literal |
|---|---|
| `A05` | ¿Qué puede ocurrir y qué transiciones son válidas? · Estados; eventos; reglas; errores; permisos; persistencia |
| `V09` | Carga, vacío, error, éxito, interrupción y retorno mantienen contexto y orientación. |

`A05` abarca seis contenidos, de los cuales los estados son uno. `V09` verifica una sola propiedad sobre situaciones que se reparten entre dos objetos. Ni uno contiene al otro ni coinciden.


### `A06` Presupuesto de complejidad ↔ `V05` Carga → **un objeto**

| De dónde | Qué dice el núcleo, literal |
|---|---|
| `A06` | ¿Qué carga estamos agregando? · Conceptos nuevos; decisiones; pasos; excepciones; opciones visibles |
| `V05` | No enfrenta decisiones, conceptos o datos que el sistema pueda resolver de forma segura. |

La pregunta del artefacto —«¿qué carga estamos agregando?»— es literalmente el nombre de la dimensión. **Fusionados.** La dimensión agrega un criterio que la tabla no contiene: si el sistema podía resolverlo de forma segura.

