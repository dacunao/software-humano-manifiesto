**NÚCLEO DEL MARCO DE PRODUCTO Y DESARROLLO**

# Núcleo del manifiesto para el desarrollo de software humano con inteligencia artificial

Principios, fundamento de producto, Job Stories y pruebas de decisión para construir productos centrados en el progreso situado de las personas

Construimos herramientas para ampliar las capacidades de las personas, no para exhibir las capacidades del software.

**Versión 2.1**

Septiembre de 2026

<a id="sh-index"></a>

## ÍNDICE OPERATIVO PARA AGENTES · `SH-INDEX`

Esta capa de navegación permite que personas, agentes y adaptadores citen obligaciones del núcleo de manera estable. Los identificadores no agregan doctrina, prioridad, etapas, artefactos ni criterios: solo señalan contenido ya aprobado. Una referencia por identificador nunca sustituye la lectura del pasaje citado ni modifica la autoridad del texto.

| **Familia** | **Identificadores** | **Contenido** |
|---|---|---|
| Navegación | `SH-INDEX` | Índice operativo y regla de uso de identificadores |
| Principios | `P01`–`P10` | Diez compromisos que gobiernan las decisiones |
| Fundamento | `SH-FUND` | Definición de producto, autoridad, alcance y Job Stories de referencia |
| Directivas para IA | `D01`–`D06` | Doctrina para equipos y agentes |
| Flujo | `F01`–`F08` | Ocho pasos desde el fundamento hasta la verificación |
| Artefactos | `A01`–`A08` | Ocho respuestas documentales ajustadas al contexto |
| Detención | `SH-STOP`, `STOP01`–`STOP07` | Condiciones que impiden avanzar o aceptar |
| Contrato del agente | `CR01`–`CR08` | Instrucciones reutilizables para desarrollar |
| Entrega del agente | `O01`–`O09` | Contenido esperado de los resultados en lenguaje natural |
| Verificación | `V01`–`V12` | Dimensiones de evidencia para aceptar una solución |
| Controles transversales | `SH-SCORE`, `SH-AP`, `SH-GOV`, `SH-DONE`, `SH-POCKET` | Decisión, anti patrones, gobernanza, terminado y guía breve |

Los adaptadores pueden indicar qué identificadores requieren atención en una operación concreta. Esa selección orienta la carga y no autoriza a ignorar otra disposición del núcleo que resulte aplicable por el contexto, el riesgo o una contradicción.

## PROPÓSITO DEL DOCUMENTO

### El problema que este manifiesto busca resolver

¿Cómo construimos software que amplifique la capacidad de las personas para conseguir lo que buscan, sin transferirles la complejidad de la tecnología?

El software gana capacidad con rapidez. La inteligencia artificial acelera todavía más ese proceso: hoy resulta barato generar pantallas, opciones, automatizaciones y capas de abstracción. Esa abundancia no garantiza un mejor producto. También permite convertir una decisión débil en mucho código correcto y una idea innecesaria en una funcionalidad terminada.

Este manifiesto establece una doctrina para decidir qué merece ser construido, cómo debe sentirse al usarlo y qué evidencia debe existir antes de aceptar una implementación. Su unidad de medida no es la cantidad de funcionalidades entregadas. Es el progreso que una persona puede lograr con claridad, confianza y control.

La versión 2.1 conserva la concreción alcanzada mediante Jobs to Be Done y Job Stories, y amplía la capacidad del marco para trabajar con definiciones de producto de distinta extensión y profundidad. Una Job Story sigue ofreciendo una forma especialmente útil de describir la circunstancia que activa una necesidad, la motivación que impulsa a actuar y el resultado buscado. Sin embargo, el fundamento de un desarrollo también puede estar expresado mediante épicas, capacidades, requisitos, reglas, recorridos, criterios u otras estructuras coherentes. La forma de la entrada no debe obligar a deformar la intención del producto.

#### La conclusión central

La función establece lo que el software permite hacer. La experiencia determina cuánto de esa capacidad puede aprovechar realmente una persona.

La experiencia no es una capa estética que se agrega después de resolver la funcionalidad. Forma parte de ella. Si una solución produce el resultado correcto, pero exige que el usuario descifre la interfaz, recuerde reglas innecesarias o tema equivocarse, la solución sigue incompleta.

#### Alcance y lectores

El marco sirve para productos donde la experiencia de uso influye directamente en el resultado: aplicaciones web y móviles, herramientas internas, sistemas de aprendizaje, servicios digitales, productos con agentes y soluciones asistidas por IA. Está dirigido a product managers, diseñadores, desarrolladores y agentes de código que participan en decisiones de producto.

No prescribe un estilo visual, una tecnología, una estructura de PRD, una estrategia de entrega ni un framework de ingeniería. Tampoco elimina la complejidad real del dominio. Define cómo impedir que la estructura interna del sistema se convierta, por comodidad del equipo, en trabajo adicional para la persona que lo usa.

Este documento contiene el núcleo del manifiesto. Su traducción a métodos de desarrollo basados en especificaciones y a frameworks particulares debe realizarse mediante anexos o adaptadores separados. Ninguna implementación puede reducir sus principios, alterar el alcance definido por producto ni atribuir al agente una autoridad que el núcleo reserva a las personas.

#### Cómo usar este documento

El documento ofrece dos profundidades de lectura. La primera permite comprender la postura en pocos minutos. La segunda convierte esa postura en decisiones verificables durante el desarrollo.

| **Ruta**   | **Contenido**                                                                           | **Uso recomendado**                             |
|------------|-----------------------------------------------------------------------------------------|-------------------------------------------------|
| Comprender | Tesis y texto canónico del manifiesto                                                   | Alinear al equipo antes de definir una solución |
| Decidir    | Diez principios, fundamento de producto y Job Stories con reglas y preguntas de control | Resolver alternativas de producto y UX          |
| Construir  | Doctrina específica para desarrollo con IA                                              | Guiar a agentes de código y revisores humanos   |
| Verificar  | Pruebas de aceptación, scorecard y anti patrones                                        | Evaluar prototipos, implementaciones y entregas |

#### La arquitectura del marco

Cada principio se traduce en niveles operativos. Ningún nivel sustituye a otro. El fundamento de producto conserva la definición autorizada de lo que debe construirse y por qué. Jobs to Be Done puede orientar el progreso general y la Job Story ofrece la forma de referencia de este manifiesto para volver ese progreso concreto, situado y verificable.

| **Nivel**               | **Pregunta que responde**                                  | **Resultado**                                     |
|-------------------------|------------------------------------------------------------|---------------------------------------------------|
| Principio               | Qué creemos                                                | Un criterio estable para orientar decisiones      |
| Fundamento de producto  | Qué debe construirse, por qué y bajo qué condiciones       | Una base autorizada, trazable y verificable       |
| Job Story de referencia | Cuándo surge una necesidad y qué progreso busca la persona | Una forma concreta para diseñar y verificar       |
| Regla                   | Qué exige al diseñar o implementar                         | Una conducta observable del producto y del equipo |
| Prueba                  | Cómo sabemos si lo cumplimos                               | Evidencia que permite aceptar, revisar o rechazar |

#### Límite entre núcleo e implementación

El núcleo define principios, autoridades, condiciones de trazabilidad, criterios de aceptación y límites para equipos y agentes. Un anexo general puede traducir estas obligaciones a un método de desarrollo basado en especificaciones. Los adaptadores de frameworks particulares deben resolver comandos, plantillas, flujos, persistencia y compatibilidad sin modificar el núcleo. Un cambio de framework no constituye por sí mismo una nueva versión del manifiesto.

## TEXTO CANÓNICO

### Manifiesto para el desarrollo de software humano

El propósito del software es ampliar lo que una persona puede hacer.

Las personas no llegan a nuestros productos para utilizar funcionalidades. Llegan porque quieren comprender, decidir, crear, aprender, comunicarse, resolver o avanzar. Ese progreso es nuestro verdadero producto.

El progreso no ocurre en abstracto. Se activa cuando una circunstancia crea una necesidad, una tensión o una decisión. Antes de diseñar una respuesta describimos esa circunstancia, la motivación que produce y el resultado que la persona busca. La solución viene después.

La definición de producto gobierna qué debe construirse. Puede expresarse con una sola historia o mediante un PRD extenso compuesto por historias, capacidades, reglas, estados, recorridos y criterios. El desarrollo debe comprender esa estructura, conservar su significado y dar cuenta de su alcance completo. Descomponer, ordenar o ejecutar en paralelo el trabajo no autoriza a omitirlo ni a redefinirlo.

Por eso la experiencia forma parte de la función. Un sistema que permite completar una tarea, pero obliga a interpretar la interfaz, recordar convenciones, atravesar estructuras innecesarias o preguntarse qué ocurrirá después, transfiere al usuario un problema que el producto debería resolver.

No rechazamos la complejidad. Muchos problemas importantes son complejos. Rechazamos que la complejidad de construirlos tenga que convertirse automáticamente en complejidad para quien usa la herramienta.

Buscamos software sencillo al comenzar y profundo cuando se necesita. Software que revele capacidades en contexto, explique sin interrumpir, anticipe sin controlar y permita recuperarse sin miedo.

Cada elemento debe justificar la atención que consume. Cada interacción debe ayudar a comprender dónde estamos, qué podemos hacer y qué ocurrirá después. Cada detalle debe contribuir a una experiencia coherente, rápida y confiable.

La inteligencia artificial debe absorber complejidad, no multiplicarla. Puede proponer, resumir y automatizar, pero permanece subordinada a la intención de la persona. Las reglas críticas, los permisos, los compromisos y los estados que requieren certeza no dependen de una interpretación probabilística.

Ahora que construir es más fácil, nuestra responsabilidad aumenta. Antes de agregar una capacidad preguntamos qué progreso habilita, qué carga introduce, qué riesgo crea y si merece existir.

Nuestro objetivo es que la sofisticación permanezca detrás de la experiencia y que, delante de ella, la persona conserve su propósito, su atención y su control.

El mejor software no consigue que el usuario admire el software. Consigue que se sorprenda de lo que ahora es capaz de hacer.

## PRINCIPIOS DE DISEÑO

### Diez compromisos que gobiernan las decisiones

Los principios no describen aspiraciones decorativas. Cada uno debe ser capaz de cambiar una decisión, detener una implementación o exigir evidencia adicional. Si una frase no tiene consecuencias prácticas, no cumple una función dentro del marco.

| **N** | **Principio**                                          | **Consecuencia principal**                                                                               |
|-------|--------------------------------------------------------|----------------------------------------------------------------------------------------------------------|
| 1     | El progreso del usuario es la unidad de diseño         | Vincula cada decisión con su fundamento de producto y usa Job Stories cuando expresan mejor la situación |
| 2     | La experiencia también es funcionalidad                | Incluye esfuerzo, emoción y fricción en la definición de calidad                                         |
| 3     | La complejidad pertenece al sistema                    | Evita trasladar el modelo interno al usuario                                                             |
| 4     | Simple al comenzar y profundo al necesitarlo           | Revela poder en contexto sin limitar al usuario experto                                                  |
| 5     | La interfaz no debe convertirse en otra tarea          | Reduce aprendizaje incidental y convenciones propias                                                     |
| 6     | La atención es un recurso del producto                 | Justifica cada elemento y cada decisión solicitada                                                       |
| 7     | La confianza se diseña                                 | Hace visibles estado, consecuencias, control y recuperación                                              |
| 8     | La calidad vive en la acumulación de detalles          | Trata microdecisiones y estados extremos como parte del producto                                         |
| 9     | El tiempo y la continuidad forman parte de la interfaz | Integra rendimiento, disponibilidad y preservación del trabajo                                           |
| 10    | La persona conserva control y propiedad                | Subordina asistencia y automatización a la intención humana                                              |

<a id="p01"></a>

## PRINCIPIO 1 · `P01`

### El progreso del usuario es la unidad de diseño

No diseñes lo que el usuario puede hacer. Diseña el progreso que necesita conseguir.

#### Qué significa

Una funcionalidad solo tiene sentido si ayuda a una persona a pasar de una situación actual a un resultado deseado. El fundamento de producto establece la razón autorizada del desarrollo. Jobs to Be Done puede definir el progreso en un nivel amplio y la Job Story lo vuelve operativo al describir cuándo surge la necesidad, qué motiva a la persona y qué resultado busca, sin anticipar la solución.

#### Por qué importa

Cuando el trabajo se organiza alrededor de features o perfiles genéricos, el equipo puede entregar mucho y resolver poco. Una Job Story obliga a explicar la causalidad: la circunstancia que activa la necesidad, la tensión que impulsa a actuar y la situación mejor que permitiría reconocer el progreso. Cuando el producto utiliza otra forma, esa misma causalidad debe conservarse en la medida en que resulte aplicable.

#### Reglas de diseño

- Identificar el fundamento de producto y la fuente autorizada que establece el alcance antes de diseñar una respuesta.

- Cuando el fundamento se exprese mediante Job Stories, ubicarlas dentro del progreso o propósito de nivel superior que corresponda.

- Formular cada Job Story como circunstancia, motivación y resultado, sin nombrar una pantalla, un componente ni una funcionalidad.

- Respaldar las decisiones con conducta observada, obstáculo o ansiedad actual y evidencia que permita aceptar el resultado.

#### Pruebas de decisión

- ¿Puede señalarse la fuente autorizada que justifica esta decisión y su relación con el alcance completo?

- Cuando existe una Job Story, ¿la circunstancia es específica y observable o solo describe un rol?

- ¿La motivación y el resultado están respaldados por evidencia o fueron supuestos por el equipo?

- ¿La formulación admite varias soluciones posibles? Si ya prescribe una interfaz sin que ello sea una decisión de producto, debe revisarse.

**Señal de incumplimiento.** Como estudiante quiero recibir pistas para resolver derivadas parece una historia útil, pero comienza por un rol y prescribe una función. No explica cuándo surge el bloqueo, qué necesita comprender la persona ni cómo reconocer que recuperó el avance.

<a id="p02"></a>

## PRINCIPIO 2 · `P02`

### La experiencia también es funcionalidad

Si funciona pero desgasta, todavía no funciona bien.

#### Qué significa

El producto no se define únicamente por la exactitud de su salida. También importa cuánto esfuerzo, incertidumbre y atención exige para obtenerla. La sensación de fluidez o frustración modifica la capacidad real de la persona para completar su trabajo.

#### Por qué importa

Dos productos pueden entregar el mismo resultado y generar desempeños distintos. Una experiencia pesada provoca abandono, errores, dependencia de soporte y pérdida de confianza. Ese costo es funcional, aunque no aparezca en la especificación técnica.

#### Reglas de diseño

- Incluir esfuerzo, claridad y confianza dentro de los criterios de aceptación.

- Probar el flujo completo, no solo cada pantalla o endpoint de forma aislada.

- Considerar el estado emocional y cognitivo que acompaña la situación definida por el producto y, cuando exista, por la Job Story.

#### Pruebas de decisión

- ¿La persona puede concentrarse en su objetivo o debe administrar la herramienta?

- ¿Qué momentos provocan duda, tensión o interrupción?

- ¿Una tarea correcta deja al usuario con energía para continuar?

**Señal de incumplimiento.** Un formulario técnicamente válido que borra datos tras un error convierte la corrección en castigo. La validación funciona; la experiencia, no.

<a id="p03"></a>

## PRINCIPIO 3 · `P03`

### La complejidad pertenece al sistema

Que sea complejo construirlo no significa que deba ser complejo usarlo.

#### Qué significa

El dominio puede exigir reglas, integraciones y excepciones. El equipo debe absorber esa complejidad y presentarla como decisiones comprensibles. Las tablas, estados y servicios internos no deberían dictar el lenguaje ni la navegación del usuario.

#### Por qué importa

Cuando la interfaz replica la arquitectura, la persona debe aprender cómo fue construido el producto antes de obtener valor. Esa transferencia suele parecer inevitable solo porque resulta conveniente para el equipo.

#### Reglas de diseño

- Traducir conceptos internos al lenguaje y al modelo mental de la persona.

- Resolver dependencias, valores predeterminados y secuencias cuando exista suficiente contexto.

- Exponer una excepción solo a quienes realmente deben decidirla.

#### Pruebas de decisión

- ¿Este paso existe por una necesidad del usuario o por la estructura del sistema?

- ¿Estamos mostrando una entidad técnica que podría traducirse o inferirse?

- ¿La persona necesita comprender esta regla para tomar una buena decisión?

**Señal de incumplimiento.** Pedir que el usuario elija primero un tipo de registro interno, sin que esa distinción tenga significado para él, expone el esquema de datos como si fuera una necesidad humana.

<a id="p04"></a>

## PRINCIPIO 4 · `P04`

### Simple al comenzar y profundo al necesitarlo

No elimines el poder. Elimina la obligación de enfrentarse a él antes de necesitarlo.

#### Qué significa

La simplicidad no consiste en reducir la capacidad del producto. Consiste en adaptar lo visible al momento, al nivel de experiencia y a la decisión actual. La profundidad aparece de forma progresiva y permanece disponible.

#### Por qué importa

Un producto minimalista puede resultar fácil el primer día y limitante el décimo. Un producto que muestra toda su potencia desde el inicio puede ser inabordable. La revelación progresiva evita ambos extremos.

#### Reglas de diseño

- Mostrar primero la ruta principal y revelar opciones avanzadas cuando el contexto las vuelva relevantes.

- Conservar atajos y precisión para usuarios expertos sin imponerlos al principiante.

- Usar buenos valores predeterminados, siempre editables cuando la decisión importa.

#### Pruebas de decisión

- ¿Qué necesita ver la persona exactamente en este estado?

- ¿La simplificación elimina ruido o elimina capacidad necesaria?

- ¿Un usuario experto puede avanzar con rapidez sin que el principiante cargue con esa profundidad?

**Señal de incumplimiento.** Ocultar todas las opciones puede producir una primera impresión limpia y un callejón sin salida cuando aparece un caso menos común.

<a id="p05"></a>

## PRINCIPIO 5 · `P05`

### La interfaz no debe convertirse en otra tarea

La persona vino a hacer su trabajo, no a aprender el nuestro.

#### Qué significa

Una interfaz debe apoyarse en expectativas conocidas, jerarquía comprensible y feedback inmediato. Cada convención propia que el usuario debe memorizar consume capacidad que debería emplear en el problema real.

#### Por qué importa

La carga de aprendizaje se vuelve especialmente dañina en productos educativos, de salud, financieros o de uso infrecuente. La persona ya enfrenta suficiente complejidad en el contenido o en la decisión.

#### Reglas de diseño

- Preferir convenciones conocidas cuando resuelvan bien el problema.

- Explicar en contexto sin exigir tutoriales previos para acciones básicas.

- Hacer evidente la acción principal, el estado actual y el siguiente paso posible.

#### Pruebas de decisión

- ¿La persona entiende qué significan los elementos sin una leyenda externa?

- ¿Necesita recordar algo de una pantalla anterior para actuar correctamente?

- ¿La interfaz agrega una capa de aprendizaje ajena a la situación o al resultado que debe resolver?

**Señal de incumplimiento.** Una secuencia numerada sin significado visible obliga a aprender la navegación al mismo tiempo que el contenido. Los números organizan para el equipo, pero no orientan al usuario.

<a id="p06"></a>

## PRINCIPIO 6 · `P06`

### La atención es un recurso del producto

Cada cosa que mostramos compite con aquello que la persona vino a hacer.

#### Qué significa

La atención es finita. Menús, alertas, animaciones, elecciones y textos demandan parte de ella. El diseño debe administrar ese presupuesto con la misma disciplina que el rendimiento o el costo.

#### Por qué importa

Una interfaz puede no tener errores y aun así fracasar por saturación. La carga acumulada deteriora comprensión, aumenta decisiones accidentales y hace que tareas simples se sientan pesadas.

#### Reglas de diseño

- Exigir que cada elemento visible y cada decisión solicitada respondan a una circunstancia, motivación o resultado verificable.

- Jerarquizar por relevancia para el estado actual, no por igualdad entre features.

- Reducir interrupciones y reservar señales intensas para asuntos que realmente requieren atención.

#### Pruebas de decisión

- ¿Qué compite visual o mentalmente con la acción principal?

- ¿Puede eliminarse un elemento sin perder información necesaria o control?

- ¿La interfaz diferencia lo urgente, lo importante y lo opcional?

**Señal de incumplimiento.** Presentar cinco acciones con igual peso visual obliga al usuario a establecer una prioridad que el producto ya debería conocer por contexto.

<a id="p07"></a>

## PRINCIPIO 7 · `P07`

### La confianza se diseña

Una buena herramienta explica lo suficiente para que la persona actúe sin miedo.

#### Qué significa

La confianza surge cuando el producto muestra su estado, anticipa consecuencias, confirma resultados y ofrece recuperación. No depende de promesas generales, sino de una conducta predecible.

#### Por qué importa

La incertidumbre frena la acción. Con IA, la confianza requiere además distinguir hechos, inferencias, propuestas y acciones ejecutadas. Una respuesta fluida no puede ocultar sus límites.

#### Reglas de diseño

- Mostrar qué está ocurriendo, qué cambiará y cuándo una acción será irreversible.

- Permitir deshacer, corregir o volver a un estado seguro cuando sea razonable.

- Diferenciar con claridad recomendaciones, decisiones automáticas y resultados confirmados.

#### Pruebas de decisión

- ¿La persona sabe qué ocurrirá antes de confirmar?

- ¿Puede verificar qué hizo el sistema y por qué?

- ¿Existe una ruta de recuperación proporcional al riesgo?

**Señal de incumplimiento.** Un agente que informa "listo" sin mostrar qué cambió obliga a confiar en su tono, no en evidencia.

<a id="p08"></a>

## PRINCIPIO 8 · `P08`

### La calidad vive en la acumulación de detalles

La calidad rara vez depende de una gran decisión. Se reconoce en muchas decisiones pequeñas que coinciden.

#### Qué significa

Tipografía, espaciado, textos, foco, estados vacíos, errores, transiciones y microinteracciones forman una sola experiencia. Ningún detalle compensa por sí mismo una mala solución, pero su acumulación puede reforzar o erosionar la confianza.

#### Por qué importa

Los usuarios no separan interfaz, ingeniería y contenido. Experimentan un producto completo. Una inconsistencia pequeña puede ser tolerable; cien inconsistencias convierten el uso en fricción constante.

#### Reglas de diseño

- Diseñar y verificar estados normales, vacíos, de carga, error, éxito y recuperación.

- Mantener lenguaje, jerarquía y comportamiento consistentes en todo el flujo.

- Revisar el producto a escala real y con contenido realista antes de aprobarlo.

#### Pruebas de decisión

- ¿Los detalles refuerzan la misma lógica o contradicen expectativas?

- ¿Qué ocurre en los estados menos frecuentes?

- ¿El producto se siente deliberadamente construido o ensamblado por partes?

**Señal de incumplimiento.** Un botón cambia de nombre entre pasos, un error aparece lejos del campo y el foco se pierde tras guardar. Cada defecto es menor; juntos rompen la continuidad.

<a id="p09"></a>

## PRINCIPIO 9 · `P09`

### El tiempo y la continuidad forman parte de la interfaz

La persona experimenta la espera antes de conocer nuestra arquitectura.

#### Qué significa

Latencia, disponibilidad, sincronización y preservación del trabajo son propiedades de la experiencia. El usuario no distingue entre infraestructura e interfaz cuando una respuesta tarda, una acción se duplica o un avance se pierde.

#### Por qué importa

La lentitud modifica conductas: genera clics repetidos, dudas, abandono y errores. La pérdida de continuidad obliga a reconstruir contexto y destruye confianza con rapidez.

#### Reglas de diseño

- Definir presupuestos de respuesta para las interacciones críticas.

- Mostrar progreso honesto y permitir continuar cuando una operación pueda demorarse.

- Guardar trabajo, contexto y estado con una frecuencia proporcional al costo de perderlos.

#### Pruebas de decisión

- ¿La interfaz responde de inmediato aunque el proceso final continúe?

- ¿Qué pierde la persona si la conexión falla ahora?

- ¿El producto evita acciones duplicadas y estados ambiguos?

**Señal de incumplimiento.** Un botón sin feedback durante tres segundos invita a pulsarlo otra vez. La duplicación resultante parece error del usuario, pero nace del sistema.

<a id="p10"></a>

## PRINCIPIO 10 · `P10`

### La persona conserva control y propiedad

Ayudar no significa decidir por la persona ni apropiarse de su trabajo.

#### Qué significa

El software puede anticipar, recomendar y automatizar. Debe hacerlo sin ocultar decisiones, encerrar información ni impedir alternativas. En sistemas con IA, el control incluye comprender qué información se usó y qué acción se ejecutó.

#### Por qué importa

La automatización sin agencia humana puede acelerar el camino equivocado. La propiedad y la portabilidad reducen dependencia, fortalecen confianza y permiten que la persona combine herramientas según sus necesidades.

#### Reglas de diseño

- Pedir confirmación proporcional al impacto, no para cada gesto ni después de una acción irreversible.

- Permitir revisar, editar, exportar y revertir cuando el dominio lo permita.

- Explicar el uso de datos y separar autorización, recomendación y ejecución.

#### Pruebas de decisión

- ¿La persona puede rechazar la propuesta sin perder su avance?

- ¿Entiende qué datos se utilizaron y con qué propósito?

- ¿Puede recuperar o llevarse su contenido en un formato útil?

**Señal de incumplimiento.** Una IA que reescribe y publica sin vista previa convierte asistencia en apropiación del proceso.

<a id="sh-fund"></a>

## FUNDAMENTO DE PRODUCTO Y FORMA DE REFERENCIA · `SH-FUND`

### Del fundamento de producto a una solución verificable

El fundamento de producto es el contenido autorizado que establece qué debe construirse, por qué debe existir, qué resultados debe producir, qué condiciones debe respetar y cómo podrá determinarse su cumplimiento. No es un nuevo tipo de documento ni una plantilla obligatoria. Puede encontrarse en una Job Story, un Jobs to Be Done, una épica, una capacidad, un requisito, una regla de negocio, un recorrido, un criterio de aceptación o una combinación coherente de estos elementos.

#### Cuándo el fundamento es identificable

Un fundamento de producto es identificable cuando el desarrollo puede establecer, sin inventar decisiones de producto, los siguientes elementos. Pueden estar distribuidos en una o varias partes de la definición recibida y no necesitan utilizar estos nombres ni este orden.

| **Elemento**          | **Pregunta de control**                                    | **Condición mínima**                                        |
|-----------------------|------------------------------------------------------------|-------------------------------------------------------------|
| Fuente y autoridad    | ¿De dónde proviene y quién puede modificarlo?              | Origen trazable y autoridad reconocida                      |
| Razón                 | ¿Qué situación, necesidad, problema u oportunidad aborda?  | Justificación comprensible sin depender de la solución      |
| Resultado             | ¿Qué cambio o progreso debe producir?                      | Resultado reconocible para las personas o para el producto  |
| Condiciones y límites | ¿Qué reglas, restricciones y exclusiones deben respetarse? | Límites suficientes para evitar decisiones silenciosas      |
| Evidencia             | ¿Cómo sabremos que se cumplió?                             | Criterios, observaciones o pruebas proporcionales al riesgo |

La ausencia de una sección o campo específico en el PRD no constituye por sí misma un defecto. El método debe comprender la estructura que el producto utiliza. Si falta una definición capaz de cambiar materialmente la solución, el agente debe exponer el vacío y acudir a la autoridad correspondiente; no debe completarlo mediante una inferencia silenciosa.

#### Alcance completo y autoridad de producto

Cuando una definición de producto aprobada contiene múltiples historias, capacidades, reglas o especificaciones, todas forman parte del alcance salvo que la propia definición o una decisión autorizada establezca lo contrario. El plan de desarrollo debe comprender el conjunto, resolver sus relaciones y dependencias y asegurar su cobertura. Puede descomponer, ordenar, agrupar o ejecutar en paralelo el trabajo; esa descomposición no modifica el alcance.

El plan organiza cómo se implementa el alcance. No decide silenciosamente qué parte del alcance merece existir.

- Toda omisión, modificación o postergación debe ser explícita, trazable y aprobada por la autoridad de producto.

- Si las restricciones de tiempo, recursos o tecnología impiden cubrir el alcance, el plan debe hacer visible la incompatibilidad y solicitar una decisión.

- Una estrategia incremental, por fases o por releases puede utilizarse cuando el proyecto la adopta; no es una obligación del núcleo.

- La completitud se determina reconciliando la implementación y la evidencia contra la definición de producto completa y sus excepciones aprobadas.

#### Job Stories como forma de referencia

Este manifiesto utiliza Job Stories como forma de referencia para mostrar cómo un fundamento de producto puede trasladarse al diseño, la implementación y la verificación. Las Job Stories hacen explícitas la circunstancia, la motivación y el resultado esperado, por lo que ofrecen una representación especialmente útil para razonar sobre el progreso humano.

Su utilización en las explicaciones, reglas, ejemplos y pruebas no obliga a que toda definición de producto venga expresada mediante Job Stories ni autoriza a transformar automáticamente un PRD a esa estructura. Cuando la definición utilice otra forma, el método debe preservar su significado, sus relaciones y su autoridad. Una Job Story derivada puede proponerse como vista de trabajo cuando agrega claridad, pero no reemplaza la fuente ni adquiere autoridad por haber sido generada.

#### De Jobs to Be Done a Job Stories

Jobs to Be Done y Job Stories cumplen funciones distintas. Jobs to Be Done mantiene la dirección del producto: el progreso general por el cual una persona incorpora una solución a su vida o a su trabajo. La Job Story desciende a una situación concreta que puede orientar una decisión de diseño, una implementación y una prueba.

Cuando se utiliza esta forma, cada Job Story debe conservar una relación explícita con el trabajo, propósito o resultado de nivel superior que corresponda. Esa relación impide que una historia aislada pierda la dirección del producto.

#### Relación entre los niveles

| **Nivel**               | **Define**                                                                        | **Evita**                                               |
|-------------------------|-----------------------------------------------------------------------------------|---------------------------------------------------------|
| Jobs to Be Done         | El progreso amplio que la persona busca conseguir                                 | Organizar el producto alrededor de funcionalidades      |
| Job Story               | La circunstancia, la motivación y el resultado que activan una necesidad concreta | Diseñar desde roles genéricos o pedidos literales       |
| Respuesta del producto  | El comportamiento del sistema elegido para resolver la historia                   | Confundir el problema con la primera solución imaginada |
| Evidencia de aceptación | La observación que demuestra progreso en esa circunstancia                        | Aceptar una entrega porque funciona técnicamente        |

#### Forma canónica de una Job Story

Cuando ocurre una circunstancia observable, necesito conseguir un avance sin prescribir la solución, para poder alcanzar un resultado reconocible.

**Cuando.** Describe el hecho, cambio o tensión que activa la necesidad. Debe poder observarse o reconocerse sin depender de una persona ficticia.

**Necesito.** Expresa la motivación, comprensión o decisión requerida. No nombra una pantalla, un botón, un agente ni una funcionalidad.

**Para poder.** Define la situación mejor que la persona busca alcanzar y que luego deberá verificarse.

#### Evidencia mínima que acompaña la historia

La frase orienta la conversación, pero no reemplaza la investigación. Una historia lista para guiar desarrollo debe registrar solo la evidencia necesaria para sostener sus decisiones.

| **Elemento**         | **Pregunta**                                                | **Contenido mínimo**                                       |
|----------------------|-------------------------------------------------------------|------------------------------------------------------------|
| Conducta actual      | ¿Qué hace hoy la persona?                                   | Pasos, alternativa o abandono observados                   |
| Obstáculo o ansiedad | ¿Qué frena o vuelve riesgoso el avance?                     | Duda, costo, temor, esfuerzo o dependencia relevante       |
| Evidencia causal     | ¿Qué respalda la relación entre circunstancia y motivación? | Observación, entrevista, dato de uso o supuesto declarado  |
| Evidencia de éxito   | ¿Qué demostraría que hubo progreso?                         | Conducta o resultado observable dentro de la circunstancia |

#### Cuándo el rol sigue importando

Job Stories evita usar el rol como explicación automática. No elimina diferencias reales entre personas. El rol, la experiencia, la edad, los permisos o una restricción física deben incorporarse cuando cambian causalmente la circunstancia, el riesgo o la solución válida. Si no cambian la decisión, no deben gobernar la historia.

#### Pruebas de calidad antes de diseñar

- La circunstancia describe un desencadenante concreto y no una categoría de usuario.

- La motivación expresa progreso o comprensión y no una funcionalidad solicitada.

- El resultado puede reconocerse sin confundirlo con completar el flujo del producto.

- La historia está respaldada por evidencia o identifica con claridad el supuesto pendiente.

- La formulación permite comparar varias respuestas, incluida la opción de no construir.

- El alcance es suficiente para cambiar una decisión, pero no intenta contener el trabajo completo del usuario.

#### Cadena de trazabilidad

El desarrollo debe poder recorrerse en ambas direcciones: desde cada decisión implementada hasta el fundamento de producto que la justifica, y desde la definición completa del producto hasta la evidencia que demuestra su cobertura. Cuando el fundamento se expresa mediante Job Stories, la trazabilidad debe conservar la circunstancia, la motivación y el resultado de cada historia aplicable.

| **Origen**              | **Decisión**                                                                  | **Verificación**                                                         |
|-------------------------|-------------------------------------------------------------------------------|--------------------------------------------------------------------------|
| Definición de producto  | Qué debe construirse y bajo qué condiciones                                   | Todo elemento obligatorio tiene cobertura o una excepción aprobada       |
| Jobs to Be Done         | Qué progreso general merece atención cuando esta forma resulta aplicable      | El resultado sigue siendo relevante para la persona                      |
| Job Story               | Qué circunstancia concreta debe atenderse cuando la fuente utiliza esta forma | La historia está validada y no prescribe una solución no autorizada      |
| Diseño e implementación | Qué comportamiento responde al fundamento                                     | Cada elemento tiene una razón trazable                                   |
| Aceptación              | Qué evidencia autoriza declarar completo el desarrollo                        | Resultados, reglas y criterios se cumplen bajo las condiciones definidas |

## DOCTRINA PARA DESARROLLO CON IA

### Cuando construir cuesta menos la decisión importa más

Los agentes de código reducen el costo de transformar instrucciones en software. Esa ventaja cambia el cuello de botella. El problema ya no es solo si una capacidad puede construirse, sino si merece existir, si resuelve el problema correcto y si conserva la comprensión del usuario.

La IA debe absorber complejidad, no producirla.

Un agente puede implementar con gran velocidad una especificación débil, reproducir patrones convencionales que no encajan con el contexto y agregar opciones plausibles que nadie pidió. Por eso el desarrollo asistido por IA necesita una capa explícita de intención, límites y verificación.

#### Seis directivas para equipos y agentes

| **Directiva**                                  | **Exigencia**                                                                                                                                                                                                         | **Límite**                                                                                                   |
|------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------|
| `D01` Fundamento antes que implementación            | Comprender la definición de producto, su autoridad, su alcance y la evidencia que la respalda antes de proponer componentes o código. Cuando existan Job Stories, conservar su circunstancia, motivación y resultado. | No comenzar a construir si una ambigüedad material puede alterar la solución, el alcance o una regla.        |
| `D02` Especificación suficiente antes que generación | Definir estados, decisiones, restricciones y criterios de aceptación con el nivel necesario para el riesgo.                                                                                                           | No convertir un prompt vago en una implementación extensa y luego usar el código para descubrir el problema. |
| `D03` Simplicidad deliberada                         | Preferir la solución que exige menos conceptos, decisiones y memoria al usuario cuando ambas logran el mismo resultado.                                                                                               | Menos código no es la medida; menos carga innecesaria sí.                                                    |
| `D04` Determinismo donde importa                     | Implementar reglas críticas, permisos, cálculos, estados y validaciones como lógica verificable.                                                                                                                      | No delegar certeza, cumplimiento o seguridad al comportamiento variable de un modelo.                        |
| `D05` Verificación antes que aceptación              | Evaluar el flujo, los estados extremos, accesibilidad, rendimiento y resultado real.                                                                                                                                  | Código generado y pruebas unitarias aprobadas no equivalen a producto terminado.                             |
| `D06` IA subordinada al usuario                      | Usar IA para proponer, explicar y ejecutar bajo límites claros, manteniendo revisión y reversibilidad proporcionales al impacto.                                                                                      | La fluidez de una respuesta nunca sustituye evidencia ni autorización.                                       |

#### La segunda pregunta rectora

Ahora que podemos construir casi cualquier cosa con mayor facilidad, ¿qué merece ser construido y qué debemos dejar deliberadamente fuera?

Esta pregunta introduce una obligación que antes podía quedar oculta por el costo técnico. Debe plantearse durante la definición de producto y al evaluar alternativas, no utilizarse durante la implementación para recortar unilateralmente un alcance aprobado. Cada capacidad debe justificar su existencia contra una alternativa más simple, incluida la alternativa de no construirla; una vez autorizada, cualquier exclusión requiere una decisión trazable de producto.

#### Determinismo y generación

La elección no es entre un producto determinista o un producto con IA. Un sistema confiable combina ambos según la naturaleza de cada decisión.

| **Tipo de comportamiento**                                           | **Tratamiento preferido**                 | **Ejemplos**                                                |
|----------------------------------------------------------------------|-------------------------------------------|-------------------------------------------------------------|
| Debe producir siempre el mismo resultado ante las mismas condiciones | Regla determinista y prueba automatizada  | Permisos, precios, límites, cálculos, transición de estados |
| Admite varias respuestas útiles y requiere interpretación            | IA con contexto, límites y evaluación     | Explicar, resumir, proponer alternativas, clasificar texto  |
| Puede afectar dinero, reputación, seguridad o derechos               | IA propone; regla o persona autoriza      | Publicar, comprar, borrar, enviar, cambiar acceso           |
| La incertidumbre es parte de la salida                               | IA declara supuestos y nivel de confianza | Recomendaciones, estimaciones, información incompleta       |

## FLUJO DE TRABAJO

### Del propósito a una solución verificable

El flujo evita que la generación de código se convierta en el primer acto de diseño. No pretende crear una fase documental pesada ni imponer una estructura al PRD. Busca comprender el fundamento recibido, producir la claridad necesaria para planificar y mantener cobertura hasta la aceptación.

| **Paso** | **Decisión**                          | **Trabajo**                                                                                                        | **Evidencia mínima**                                                               |
|----------|---------------------------------------|--------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------|
| `F01`    | Comprender el fundamento              | Reconocer las fuentes, la autoridad, el alcance, la estructura utilizada y los resultados esperados.               | Mapa fiel de la definición de producto, sin reformularla por conveniencia técnica. |
| `F02`    | Establecer cobertura                  | Inventariar historias, capacidades, reglas, estados, recorridos, criterios y relaciones aplicables.                | Cobertura completa y vacíos o contradicciones visibles.                            |
| `F03`    | Planificar la implementación          | Resolver dependencias, bloqueantes, orden, paralelismo, integración y pruebas sin modificar el alcance.            | Plan coherente que da cuenta de toda la definición aprobada.                       |
| `F04`    | Concretar el progreso                 | Usar las Job Stories existentes o formular una vista derivada cuando aporte claridad y esté identificada como tal. | Circunstancias, motivaciones y resultados preservados cuando corresponda.          |
| `F05`    | Establecer el contrato de experiencia | Describir qué debe comprender, decidir y sentir la persona en los momentos críticos.                               | Ruta principal, estados y promesa de interacción.                                  |
| `F06`    | Modelar reglas y riesgos              | Separar lógica determinista, comportamiento generativo, permisos y acciones irreversibles.                         | Mapa de decisiones y límites.                                                      |
| `F07`    | Explorar y prototipar                 | Comparar alternativas y probar comprensión, jerarquía y recuperación antes de optimizar código.                    | Razón de la alternativa elegida y evidencia del recorrido.                         |
| `F08`    | Construir, integrar y verificar       | Implementar el plan, mantener trazabilidad y reconciliar resultados contra el alcance completo.                    | Código, pruebas y evidencia de cobertura; pendientes y excepciones explícitos.     |

#### Artefactos ajustados al contexto

Cada artefacto existe para responder una pregunta, no para satisfacer una plantilla. Puede ser una sección del PRD, una vista derivada, una tabla, una prueba o un documento separado. Si la información ya existe, debe referenciarse y no duplicarse. La profundidad depende de la extensión, complejidad, incertidumbre y riesgo; si un artefacto no cambia una decisión ni ayuda a verificarla, debe simplificarse o eliminarse.

| **Artefacto**                     | **Pregunta**                                              | **Contenido mínimo**                                                                                    |
|-----------------------------------|-----------------------------------------------------------|---------------------------------------------------------------------------------------------------------|
| `A01` Mapa del fundamento               | ¿Qué debe construirse, por qué y con qué autoridad?       | Fuentes; alcance; resultados; reglas; límites; evidencia; no objetivos                                  |
| `A02` Mapa de cobertura                 | ¿Cómo se dará cuenta de todo el alcance?                  | Elementos obligatorios; relaciones; dependencias; implementación; pruebas; estado; excepciones          |
| `A03` Ficha de Job Story cuando aplique | ¿Cuándo surge la necesidad y qué cambio busca la persona? | Circunstancia; motivación; resultado; conducta actual; ansiedad; evidencia; supuestos                   |
| `A04` Contrato de experiencia           | ¿Qué debe comprender y poder hacer la persona?            | Ruta principal; lenguaje; decisiones; feedback; control; recuperación                                   |
| `A05` Modelo de estados                 | ¿Qué puede ocurrir y qué transiciones son válidas?        | Estados; eventos; reglas; errores; permisos; persistencia                                               |
| `A06` Presupuesto de complejidad        | ¿Qué carga estamos agregando?                             | Conceptos nuevos; decisiones; pasos; excepciones; opciones visibles                                     |
| `A07` Plan de aceptación                | ¿Qué evidencia autoriza declarar completo el desarrollo?  | Resultados; reglas; Job Stories cuando apliquen; accesibilidad; rendimiento; estados extremos; métricas |
| `A08` Registro de decisiones            | ¿Por qué elegimos esta alternativa?                       | Alternativas; tradeoffs; supuestos; decisión; fecha; evidencia pendiente                                |

<a id="sh-stop"></a>

#### Regla de detención antes de generar · `SH-STOP`

El agente no debería comenzar una implementación si no puede responder con precisión las siguientes preguntas en el nivel requerido por el riesgo y la complejidad:

- ¿Cuál es la definición de producto autorizada y qué alcance establece?

- ¿Qué elementos del fundamento justifican el desarrollo y qué evidencia los respalda?

- ¿La planificación da cuenta de todas las historias, capacidades, reglas, estados y criterios obligatorios?

- Cuando existen Job Stories, ¿la circunstancia, la motivación y el resultado están separados de la solución?

- ¿Cuál es la ruta principal y qué estados alternativos importan?

- ¿Qué decisiones debe tomar el usuario y cuáles puede resolver el sistema?

- ¿Qué comportamiento necesita certeza determinista?

- ¿Qué no forma parte del alcance y quién estableció esa exclusión?

- ¿Qué evidencia demostrará que el desarrollo está completo?

Si falta una respuesta que pueda cambiar de manera material la solución, el alcance, una regla o un derecho, el agente debe detenerse y solicitarla. Si la incertidumbre es menor, reversible y se encuentra dentro de su autoridad, puede declarar un supuesto y avanzar sin reducir silenciosamente la cobertura comprometida.

## CONTRATO REUTILIZABLE

### Instrucciones para un agente de desarrollo

El siguiente contrato puede incorporarse a las instrucciones de un repositorio, a un PRD o al prompt de un agente de código. Debe acompañarse con el contexto específico del producto y no sustituye la definición del problema.

**`CR01` Propósito.** Construye la solución más simple que permita al usuario lograr el resultado definido, conservando claridad, control y capacidad de recuperación.

**`CR02` Antes de programar.** Identifica las fuentes autorizadas, explica el fundamento de producto y confirma el alcance completo. Reconoce la estructura utilizada por la definición; cuando contenga Job Stories, conserva su circunstancia, motivación y resultado. Separa evidencia de supuestos e identifica cualquier ambigüedad que pueda cambiar materialmente la solución.

**`CR03` Al planificar.** Da cuenta de todos los elementos obligatorios y establece sus dependencias, bloqueantes, orden, integración y pruebas. No selecciones, omitas ni postergues partes del alcance por iniciativa propia. Si las restricciones impiden cubrirlo, solicita una decisión a la autoridad de producto.

**`CR04` Al proponer.** Presenta la alternativa recomendada, una alternativa más simple y la opción de no construir cuando la decisión aún pertenezca a producto. Explica cómo responde cada una al fundamento, qué carga introduce y qué tradeoffs exige.

**`CR05` Al diseñar.** No expongas estructuras internas. Usa lenguaje del usuario, convenciones conocidas, jerarquía clara, profundidad progresiva, valores predeterminados editables y feedback inmediato.

**`CR06` Al usar IA.** Reserva las reglas críticas para lógica verificable. Declara incertidumbre. No ejecutes acciones de alto impacto sin autorización proporcional. Mantén trazabilidad, revisión y reversibilidad.

**`CR07` Al implementar.** Respeta el alcance acordado y conserva trazabilidad con su fundamento. No agregues features, modos, configuraciones ni abstracciones no solicitadas. Cubre estados vacíos, carga, error, éxito y recuperación e integra las partes relacionadas.

**`CR08` Antes de declarar terminado.** Reconcilia la implementación contra la definición completa de producto. Verifica resultados, reglas, criterios y, cuando correspondan, las Job Stories en sus circunstancias. Comprueba también accesibilidad, rendimiento percibido, errores, persistencia del trabajo y control del usuario. Entrega evidencia, pendientes y excepciones aprobadas.

#### Formato de entrega esperado del agente

1\. `O01` Fuentes autorizadas y fundamento de producto que justifican el desarrollo.

2\. `O02` Inventario de alcance y cobertura de historias, capacidades, reglas, estados y criterios aplicables.

3\. `O03` Jobs to Be Done y Job Stories cuando formen parte de la definición o aporten una vista derivada útil.

4\. `O04` Evidencia disponible, supuestos y criterios de resultado.

5\. `O05` Alternativa elegida y razón de descarte de opciones más complejas.

6\. `O06` Archivos o componentes modificados y límites del cambio.

7\. `O07` Estados y casos extremos cubiertos.

8\. `O08` Pruebas ejecutadas y evidencia de resultado.

9\. `O09` Riesgos, incertidumbres, pendientes, excepciones y decisiones que aún requieren juicio humano.

#### Prompt breve para iniciar una tarea

Antes de escribir código, identifica la definición de producto autorizada, explica su fundamento y confirma el alcance completo. Reconoce todas las historias, capacidades, reglas y criterios aplicables; cuando existan Job Stories, conserva su circunstancia, motivación y resultado. Distingue evidencia de supuestos. Planifica dependencias y cobertura sin omitir ni postergar alcance por iniciativa propia. Implementa la solución más simple que cumpla lo aprobado y verifica resultados, integración, errores y recuperación.

## VERIFICACIÓN

### Pruebas para aceptar una solución

La aceptación debe producir evidencia. La impresión de que una pantalla se ve limpia o que el código compila no demuestra que el producto cumpla su propósito.

| **Dimensión** | **Evidencia de aceptación**                                                                                                                                      |
|---------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `V01` Cobertura     | Todos los elementos obligatorios de la definición de producto tienen implementación y evidencia o una excepción explícita y aprobada.                            |
| `V02` Progreso      | Las personas alcanzan los resultados definidos y pueden reconocerlos; cuando existen Job Stories, esto se comprueba en sus circunstancias.                       |
| `V03` Causalidad    | La evidencia relaciona la situación, la necesidad y el resultado sin depender de un pedido de funcionalidad; cuando aplica, conserva circunstancia y motivación. |
| `V04` Comprensión   | Puede explicar dónde está, qué puede hacer y qué ocurrirá después sin ayuda externa.                                                                             |
| `V05` Carga         | No enfrenta decisiones, conceptos o datos que el sistema pueda resolver de forma segura.                                                                         |
| `V06` Profundidad   | El principiante encuentra una ruta clara y el usuario avanzado conserva capacidad suficiente.                                                                    |
| `V07` Confianza     | El sistema anticipa consecuencias, confirma resultados y ofrece recuperación proporcional.                                                                       |
| `V08` Control       | La persona puede revisar, corregir, rechazar o revertir según el impacto de la acción.                                                                           |
| `V09` Estados       | Carga, vacío, error, éxito, interrupción y retorno mantienen contexto y orientación.                                                                             |
| `V10` Accesibilidad | El flujo funciona con teclado, foco visible, etiquetas comprensibles, contraste y tecnologías de asistencia aplicables.                                          |
| `V11` Rendimiento   | Las acciones críticas cumplen el presupuesto de respuesta o muestran progreso honesto.                                                                           |
| `V12` IA            | Las salidas variables declaran incertidumbre; las reglas críticas son verificables; las acciones sensibles requieren autorización.                               |

<a id="sh-score"></a>

#### Scorecard de decisión · `SH-SCORE`

Asigne 0 cuando no existe evidencia, 1 cuando el cumplimiento es parcial o depende de un supuesto no validado, y 2 cuando existe evidencia suficiente. El puntaje orienta la conversación; no reemplaza el juicio.

| **Criterio**           | **Puntaje** | **Pregunta de evidencia**                                                            |
|------------------------|-------------|--------------------------------------------------------------------------------------|
| Fundamento trazable    | 0 / 1 / 2   | Fuentes, autoridad, alcance, resultados y condiciones son identificables             |
| Cobertura del producto | 0 / 1 / 2   | Todo elemento obligatorio tiene implementación, prueba o excepción aprobada          |
| Job Stories aplicables | 0 / 1 / 2   | Cuando existen, circunstancia, motivación y resultado conservan evidencia suficiente |
| Progreso del usuario   | 0 / 1 / 2   | La implementación produce los resultados definidos por el producto                   |
| Carga cognitiva        | 0 / 1 / 2   | Reduce o justifica conceptos, decisiones y pasos                                     |
| Claridad de interfaz   | 0 / 1 / 2   | Estado, acción y consecuencia se comprenden                                          |
| Control y recuperación | 0 / 1 / 2   | Existe revisión, corrección o reversibilidad proporcional                            |
| Profundidad progresiva | 0 / 1 / 2   | La capacidad aparece cuando corresponde                                              |
| Confiabilidad y tiempo | 0 / 1 / 2   | Rendimiento, persistencia y feedback cumplen lo esperado                             |
| Uso responsable de IA  | 0 / 1 / 2   | Incertidumbre, límites y determinismo están resueltos                                |
| Calidad acumulativa    | 0 / 1 / 2   | Estados, lenguaje y microinteracciones son coherentes                                |

Criterio de salida recomendado. Ninguna dimensión crítica puede puntuar 0. Los criterios relacionados con seguridad, permisos, dinero, datos personales o acciones irreversibles deben puntuar 2 antes de liberar. Para el resto, el equipo debe definir su umbral según el riesgo y el alcance.

#### Preguntas para una revisión de producto

- ¿Qué fuente autorizada y qué fundamento de producto justifican esta decisión?

- ¿La implementación y sus pruebas dan cuenta del alcance completo?

- Cuando existen Jobs to Be Done o Job Stories, ¿cómo se relaciona esta decisión con ellos?

- ¿La formulación describe una necesidad o es una funcionalidad redactada con otra fórmula?

- ¿Qué carga cognitiva introduce y cuál elimina?

- ¿Estamos exponiendo una complejidad interna?

- ¿Puede eliminarse algún elemento sin reducir capacidad ni control?

- ¿La persona sabe qué ocurrirá antes de actuar?

- ¿Puede recuperarse con facilidad si se equivoca o si el sistema falla?

- ¿La IA está proponiendo, decidiendo o ejecutando? ¿Ese nivel está autorizado?

- ¿Qué haría que rechazáramos esta implementación aunque técnicamente funcione?

<a id="sh-ap"></a>

## ANTIPATRONES · `SH-AP`

### Señales de que el producto se aleja del manifiesto

| **Antipatrón**                              | **Cómo se manifiesta**                                                                         | **Respuesta**                                                                        |
|---------------------------------------------|------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------|
| La Job Story es una feature disfrazada      | La motivación dice usar un dashboard, recibir alertas o pulsar un botón.                       | Reformular el avance que necesita la persona sin anticipar la respuesta.             |
| La circunstancia fue inventada              | El equipo redacta una historia plausible sin observar conducta, tensión o contexto real.       | Marcarla como hipótesis y obtener evidencia antes de ampliar la implementación.      |
| La interfaz replica la base de datos        | El usuario debe elegir tipos, estados o relaciones internas.                                   | Traducir la estructura a objetivos y decisiones humanas.                             |
| Más opciones se confunden con más valor     | Cada excepción se convierte en un control visible.                                             | Resolver por contexto y revelar excepciones cuando aparezcan.                        |
| La IA llena vacíos conceptuales             | Un prompt ambiguo produce una implementación grande.                                           | Detener, aclarar supuestos materiales y preservar el alcance autorizado.             |
| El plan selecciona alcance                  | Se implementan algunas historias o reglas y se posterga el resto sin una decisión de producto. | Restablecer la cobertura completa o registrar una modificación explícita y aprobada. |
| La descomposición parece exclusión          | Una fase técnica se presenta como si redefiniera lo que el PRD exige.                          | Separar orden de ejecución, estado de avance y alcance comprometido.                 |
| El tutorial compensa una interfaz oscura    | La tarea básica requiere explicación previa.                                                   | Revisar lenguaje, jerarquía, convenciones y feedback.                                |
| La confirmación sustituye la reversibilidad | Se pregunta varias veces, pero no existe deshacer.                                             | Diseñar recuperación y usar confirmaciones solo según riesgo.                        |
| El happy path define el producto            | Errores, vacíos e interrupciones quedan para después.                                          | Modelar estados antes de implementar y aceptarlos explícitamente.                    |
| La respuesta fluida parece verdadera        | El usuario no distingue hecho, inferencia y propuesta.                                         | Mostrar fuente, incertidumbre, límites y ruta de verificación.                       |
| La velocidad técnica oculta la espera       | La operación tarda sin feedback o bloquea todo el flujo.                                       | Responder de inmediato, mostrar progreso y preservar continuidad.                    |
| La estética maquilla la fricción            | La pantalla luce bien, pero exige decisiones innecesarias.                                     | Evaluar el recorrido completo y el esfuerzo real.                                    |
| El agente agrega por si acaso               | Aparecen modos, preferencias y abstracciones no pedidas.                                       | Definir exclusiones y exigir justificación por capacidad.                            |

#### Una advertencia sobre la simplicidad

La simplicidad puede convertirse en una excusa para ocultar información, negar casos legítimos o limitar al usuario experto. El marco no premia interfaces vacías. Premia la relación correcta entre capacidad, momento y contexto.

La simplicidad valiosa no elimina lo necesario. Evita exigirlo antes de tiempo.

## EJEMPLO APLICADO

### Tutor de cálculo para una persona que todavía no entiende

Considere una aplicación que explica derivadas, propone un ejercicio, ofrece una pista y finalmente muestra la solución. El flujo parece completo. Sin embargo, si la persona falla después de leer la explicación y tampoco comprende la solución, llega a un callejón sin salida. La aplicación entregó contenido, pero no produjo progreso.

#### Del pedido de función a la circunstancia

**Formulación débil.** Como estudiante quiero recibir pistas para poder resolver derivadas. El rol es genérico, la pista ya prescribe la respuesta y el resultado no distingue comprensión de avance mecánico.

**Job Story principal.** *Cuando he leído una explicación y todavía no sé qué regla aplicar, necesito identificar el concepto previo que no comprendo, para poder retomar el ejercicio sin depender de que me muestren la solución.*

**Job Story de recuperación.** *Cuando veo la solución y sigo sin entender por qué se eligió el paso siguiente, necesito reconstruir una sola decisión con otra representación, para poder explicar la regla con mis propias palabras.*

Ambas historias pertenecen al mismo Jobs to Be Done de nivel superior: desarrollar comprensión suficiente para resolver un ejercicio equivalente con autonomía creciente. Sin embargo, describen bloqueos distintos y pueden exigir respuestas diferentes.

#### Diagnóstico desde el manifiesto

| **Principio** | **Problema observado**                                                           |
|---------------|----------------------------------------------------------------------------------|
| Progreso      | El sistema mide pasos consumidos, no comprensión alcanzada.                      |
| Experiencia   | La persona termina frustrada y sin una ruta de recuperación.                     |
| Complejidad   | La explicación conserva el modelo del experto en vez de reconstruir el concepto. |
| Interfaz      | Números o etapas sin significado agregan aprendizaje incidental.                 |
| Confianza     | La solución final se presenta como cierre, aunque la comprensión siga ausente.   |

#### Evidencia que completa la Job Story

| **Elemento**         | **Observación**                                                                                |
|----------------------|------------------------------------------------------------------------------------------------|
| Conducta actual      | La persona solicita una pista, luego la solución y aun así no puede decidir qué regla aplicar. |
| Obstáculo y ansiedad | No identifica el prerrequisito ausente y teme avanzar sin comprender.                          |
| Evidencia de éxito   | Puede escoger y explicar la regla en un ejercicio equivalente con menos ayuda.                 |

#### Rediseño del recorrido

1\. Detectar el tipo de bloqueo: concepto, notación, operación previa o interpretación del enunciado.

2\. Reformular con una representación distinta, no repetir la misma explicación con más palabras.

3\. Comprobar una microhabilidad anterior mediante una pregunta breve y diagnóstica.

4\. Ofrecer un ejemplo resuelto paso a paso con una decisión por vez y lenguaje del estudiante.

5\. Pedir que explique el razonamiento o complete un paso equivalente antes de avanzar.

6\. Mantener siempre una ruta para retroceder, cambiar de explicación o solicitar ayuda humana.

#### Qué permanece determinista y qué puede usar IA

| **Capa**        | **Responsabilidad**                                                                                                                                      |
|-----------------|----------------------------------------------------------------------------------------------------------------------------------------------------------|
| Determinista    | Secuencia de estados; validación matemática; dominio de prerrequisitos; registro de intentos; reglas de avance; prevención de callejones sin salida.     |
| Asistida por IA | Reformular una explicación; generar una analogía; clasificar el bloqueo; adaptar el tono; proponer un ejercicio equivalente dentro de límites validados. |
| Control humano  | Permitir al estudiante o tutor elegir otra vía, revisar el historial y corregir una inferencia equivocada del sistema.                                   |

#### Criterio de éxito

El objetivo no es que el estudiante llegue al final de la secuencia. Es que pueda resolver o explicar un ejercicio equivalente con menos ayuda. Esa diferencia cambia la interfaz, la lógica, la medición y el uso de IA.

<a id="sh-gov"></a>

## GOBERNANZA · `SH-GOV`

### Cómo convertir el manifiesto en una práctica habitual

El manifiesto pierde valor si se limita a una presentación inicial. Debe aparecer en los momentos donde el equipo toma decisiones: definición, diseño, generación, revisión y aprendizaje posterior al lanzamiento.

#### Responsabilidades

| **Responsable** | **Obligación principal**                                                                                                                                                        |
|-----------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Producto        | Establece la definición autorizada, el alcance, los resultados, las reglas, los no objetivos y la evidencia de éxito; valida Jobs to Be Done y Job Stories cuando se utilizan.  |
| Diseño          | Traduce el fundamento de producto a recorridos coherentes con el modelo mental de la persona y protege su atención; utiliza Job Stories cuando permiten concretar la situación. |
| Ingeniería      | Absorbe complejidad, garantiza estados, rendimiento, accesibilidad y recuperación.                                                                                              |
| Agente de IA    | Planifica e implementa dentro del fundamento y del contrato; declara supuestos, mantiene cobertura y no reduce ni amplía alcance por iniciativa propia.                         |
| Revisión humana | Evalúa causalidad, sentido, riesgo, experiencia completa y evidencia; no se limita a revisar código.                                                                            |

#### Puntos de control

| **Momento**             | **Decisión requerida**                                                                                                                   |
|-------------------------|------------------------------------------------------------------------------------------------------------------------------------------|
| Antes de diseñar        | Fuentes, autoridad, alcance, resultados, evidencia, supuestos y no objetivos están claros; las Job Stories se comprenden cuando existen. |
| Antes de generar código | El plan cubre la definición completa y establece dependencias, respuesta elegida, rutas, estados, reglas críticas, riesgos y aceptación. |
| Durante la construcción | La descomposición organiza el trabajo sin alterar el alcance; bloqueos, pendientes y excepciones permanecen visibles.                    |
| Antes de integrar       | Cada cambio conserva trazabilidad con su fundamento, respeta alcance, cubre estados y pasa pruebas técnicas.                             |
| Antes de liberar        | La implementación completa demuestra resultados, cobertura, comprensión, control y calidad de experiencia.                               |
| Después de liberar      | Se observan resultado, fricción, abandono y errores; se revisan el fundamento, las historias y sus supuestos cuando corresponda.         |

#### Evolución del manifiesto

Los principios deben ser estables; las reglas y pruebas pueden evolucionar con nueva evidencia. Todo cambio debería registrar el problema observado, la decisión modificada y la razón. El marco no debe crecer por acumulación: una nueva regla solo se incorpora si resuelve un vacío que las existentes no cubren.

#### Control de cambios de las versiones 2.0 y 2.1

La versión 1.0 permanece como formulación fundacional. La versión 2.0 conserva su tesis y sus diez principios, pero reemplaza referencias operativas genéricas a Jobs to Be Done por una cadena más concreta y verificable.

| **Área**             | **Ajuste de la versión 2.0**                                                | **Contenido que permanece**                                               |
|----------------------|-----------------------------------------------------------------------------|---------------------------------------------------------------------------|
| Unidad de diseño     | La Job Story concreta el progreso dentro de un Jobs to Be Done.             | El progreso del usuario sigue siendo la medida principal.                 |
| Arquitectura         | Se incorpora un nivel entre principio y regla.                              | Principios, reglas y pruebas conservan su función.                        |
| Flujo y artefactos   | Se exige circunstancia, motivación, resultado y evidencia antes de diseñar. | Se mantiene la documentación mínima que cambia decisiones.                |
| Desarrollo con IA    | El agente debe reformular y respetar la Job Story.                          | Continúan los límites, el determinismo y la revisión humana.              |
| Aceptación           | El resultado se prueba bajo la circunstancia descrita.                      | Accesibilidad, rendimiento, estados y control siguen siendo obligatorios. |
| Ejemplo y gobernanza | Se añade trazabilidad causal y validación de historias.                     | El tutor de cálculo y los puntos de control conservan su propósito.       |

La versión 2.1 preserva la tesis, los diez principios, la doctrina para IA, las Job Stories y el ejemplo aplicado. Amplía el núcleo para admitir definiciones de producto de distinta forma, extensión y profundidad sin imponer una estructura aguas arriba ni suponer una estrategia incremental.

| **Área**              | **Ajuste de la versión 2.1**                                                              | **Contenido que permanece**                                                      |
|-----------------------|-------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------|
| Fundamento            | Se define una base autorizada, trazable y verificable que puede adoptar distintas formas. | El progreso humano continúa como medida principal.                               |
| Job Stories           | Se declaran forma de referencia, no estructura universal obligatoria.                     | Se conservan su forma canónica, evidencia, pruebas y ejemplos.                   |
| Alcance               | Se exige cobertura completa y se prohíben omisiones o postergaciones no autorizadas.      | Producto sigue definiendo alcance y no objetivos.                                |
| Planificación         | Se separa descomposición, secuencia y paralelismo de cualquier decisión de alcance.       | Continúan la claridad previa, las reglas, los riesgos y la aceptación.           |
| Estrategia de entrega | La incrementalidad deja de ser un supuesto del núcleo.                                    | Cada proyecto puede adoptar fases o releases cuando corresponda.                 |
| Implementación SDD    | Se reserva para anexos y adaptadores independientes.                                      | El núcleo conserva principios y garantías que toda implementación debe respetar. |

<a id="sh-done"></a>

#### Definición de terminado · `SH-DONE`

Un desarrollo está completo cuando todos los elementos obligatorios de la definición de producto tienen una implementación y una evidencia verificable, o una excepción explícita y aprobada; las personas alcanzan los resultados previstos bajo las condiciones definidas, y la conducta del sistema y la calidad de la experiencia han sido verificadas con rigor proporcional al riesgo.

Cuando el fundamento incluye Job Stories, la verificación debe demostrar el resultado en sus circunstancias. La completitud incluye código correcto, pero no termina allí. Exige cobertura del alcance, integración entre sus partes, estados críticos confiables, una experiencia que no obligue a aprender la arquitectura del producto, IA dentro de límites explícitos y claridad sobre lo que debe observarse después del lanzamiento.

<a id="sh-pocket"></a>

## GUÍA DE BOLSILLO · `SH-POCKET`

### Catorce preguntas antes de aceptar una decisión

1\. ¿Cuál es la fuente autorizada y qué alcance establece?

2\. ¿La planificación da cuenta de todos los elementos obligatorios?

3\. ¿Qué circunstancia concreta activa la necesidad?

4\. ¿Qué motivación o tensión impulsa a la persona a actuar?

5\. ¿Qué resultado permitiría reconocer el progreso?

6\. ¿Qué conducta o evidencia demuestra que la historia ocurre?

7\. Cuando existe una Job Story, ¿describe el problema sin prescribir la solución?

8\. ¿Qué complejidad absorbe el sistema y cuál todavía traslada?

9\. ¿Qué debe ver la persona ahora y qué puede esperar?

10\. ¿Qué ocurrirá si se equivoca, interrumpe o regresa después?

11\. ¿Conserva control sobre la decisión, los datos y el resultado?

12\. ¿Qué parte necesita determinismo y qué parte admite generación?

13\. ¿Cuál es la alternativa más simple que cumple el fundamento de producto?

14\. ¿Qué evidencia nos permitiría decir que está terminado?

#### Siete razones para detener una implementación

- `STOP01` No existe un fundamento de producto identificable o la solución parece preceder al problema.

- `STOP02` El plan no da cuenta de todo el alcance obligatorio definido por producto.

- `STOP03` Se pretende omitir, modificar o postergar una parte sin una decisión autorizada.

- `STOP04` Una ambigüedad material está siendo resuelta por el agente sin autorización.

- `STOP05` La interfaz expone una complejidad interna que el sistema podría absorber.

- `STOP06` Una acción sensible carece de determinismo, trazabilidad o recuperación.

- `STOP07` El equipo solo puede demostrar que el código funciona, no que el usuario progresa.

#### Tres frases que protegen el criterio

¿Qué circunstancia activa esta necesidad?

¿Qué progreso habilita?

¿Qué evidencia lo demuestra?

## INFLUENCIAS Y NOTAS

### Origen de la perspectiva

Este marco es una elaboración independiente inspirada en ideas públicas de Craft y en las conversaciones que dieron origen a este documento. No es un manifiesto oficial de Craft ni atribuye a su fundador las reglas operativas aquí propuestas.

De Craft se recogen cuatro influencias: la unión entre forma y función; el efecto que una herramienta produce en la energía y capacidad de quien la usa; la complejidad adaptable que aparece cuando se necesita; y el enfoque human first frente a sistemas que obligan a las personas a acomodarse a su estructura.

De Jobs to Be Done se conserva el progreso como referencia superior. De Job Stories se adopta una forma concreta de trasladar ese progreso al diseño mediante circunstancias, motivaciones, resultados, conducta actual, ansiedades y evidencia causal.

La versión 2.1 integra estas influencias dentro de un núcleo capaz de respetar definiciones de producto heterogéneas. Las Job Stories permanecen como forma de referencia y ejemplo aplicado; no sustituyen otras estructuras autorizadas ni permiten recortar su alcance.

#### Fuentes consultadas

Craft. [<u>Acerca de Craft</u>](https://www.craft.do/es/about). Historia del fundador y reflexiones sobre forma, función, fricción, complejidad adaptable y atención al detalle.

Balint Orosz. [<u>Introducing Craft 3</u>](https://www.craft.do/blog/welcome-to-craft3), 28 de noviembre de 2024. Adaptación al contexto, reducción de carga cognitiva, rendimiento y funcionamiento offline.

Balint Orosz. [<u>Your content is yours and that is more empowering than ever</u>](https://www.craft.do/blog/your-content-is-yours), 27 de noviembre de 2025. Control sobre el contenido, portabilidad, IA y el principio human first versus systems first.

Alan Klement. [<u>Designing Features Using Job Stories</u>](https://www.intercom.com/blog/using-job-stories-design-features-ui-ux/), publicado por Intercom el 23 de diciembre de 2013. Aplicación granular de Jobs to Be Done al diseño de funcionalidades, interfaz y experiencia mediante contexto, causalidad, motivaciones y ansiedades.

#### Declaración final

La tecnología puede ser extraordinariamente sofisticada detrás de la interfaz. Delante de ella debe permanecer una persona concentrada en aquello que quería conseguir.
