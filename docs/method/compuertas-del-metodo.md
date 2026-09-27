# Compuertas del método

**Generado por** `tools/method/compilar-compuertas.py` desde `SH-GOV § Puntos de control`. **No se edita a mano.**

El manifiesto especifica seis momentos con su decisión requerida. **Ninguna compuerta se diseña: se cita.**

| Qué pone la adaptación | Qué pone el manifiesto |
|---|---|
| Dónde cae cada momento en el flujo de SpecKit, y qué objetos se comprueban ahí | El momento y su decisión requerida, literal |

---


## Antes de diseñar

> **Decisión requerida.** Fuentes, autoridad, alcance, resultados, evidencia, supuestos y no objetivos están claros; las Job Stories se comprenden cuando existen.

*Cita de `SH-GOV § Puntos de control`, literal.*

**Dónde cae en SpecKit:** después de `specify` y `clarify`, antes de `plan`

**Objetos que se comprueban:** El fundamento de producto · Mapa del fundamento · Ficha de Job Story cuando aplique


## Antes de generar código

> **Decisión requerida.** El plan cubre la definición completa y establece dependencias, respuesta elegida, rutas, estados, reglas críticas, riesgos y aceptación.

*Cita de `SH-GOV § Puntos de control`, literal.*

**Dónde cae en SpecKit:** después de `tasks` y `analyze`, antes de `implement`

**Objetos que se comprueban:** Cobertura · Modelo de estados · IA · Registro de decisiones · Plan de aceptación


**El núcleo detalla esta compuerta.** `SH-STOP` se llama «Regla de detención antes de generar», y enumera lo que el agente debe poder responder con precisión, en el nivel que exijan el riesgo y la complejidad, antes de comenzar una implementación:

- ¿Cuál es la definición de producto autorizada y qué alcance establece?
- ¿Qué elementos del fundamento justifican el desarrollo y qué evidencia los respalda?
- ¿La planificación da cuenta de todas las historias, capacidades, reglas, estados y criterios obligatorios?
- Cuando existen Job Stories, ¿la circunstancia, la motivación y el resultado están separados de la solución?
- ¿Cuál es la ruta principal y qué estados alternativos importan?
- ¿Qué decisiones debe tomar el usuario y cuáles puede resolver el sistema?
- ¿Qué comportamiento necesita certeza determinista?
- ¿Qué no forma parte del alcance y quién estableció esa exclusión?
- ¿Qué evidencia demostrará que el desarrollo está completo?


## Durante la construcción

> **Decisión requerida.** La descomposición organiza el trabajo sin alterar el alcance; bloqueos, pendientes y excepciones permanecen visibles.

*Cita de `SH-GOV § Puntos de control`, literal.*

**Dónde cae en SpecKit:** dentro de `implement`, entre bloques

**Objetos que se comprueban:** Cobertura · Estados · Confianza · Control


## Antes de integrar

> **Decisión requerida.** Cada cambio conserva trazabilidad con su fundamento, respeta alcance, cubre estados y pasa pruebas técnicas.

*Cita de `SH-GOV § Puntos de control`, literal.*

**Dónde cae en SpecKit:** `analyze`, antes de incorporar el cambio

**Objetos que se comprueban:** Cobertura · Estados · Carga


## Antes de liberar

> **Decisión requerida.** La implementación completa demuestra resultados, cobertura, comprensión, control y calidad de experiencia.

*Cita de `SH-GOV § Puntos de control`, literal.*

**Dónde cae en SpecKit:** `converge`, antes de declarar terminado

**Objetos que se comprueban:** Plan de aceptación · Progreso · Comprensión · Control · las doce dimensiones


**El núcleo detalla esta compuerta.** El scorecard de decisión puntúa cada dimensión con 0 cuando no existe evidencia, 1 cuando el cumplimiento es parcial o depende de un supuesto no validado, y 2 cuando existe evidencia suficiente.

| Criterio | Pregunta de evidencia |
|---|---|
| Fundamento trazable | Fuentes, autoridad, alcance, resultados y condiciones son identificables |
| Cobertura del producto | Todo elemento obligatorio tiene implementación, prueba o excepción aprobada |
| Job Stories aplicables | Cuando existen, circunstancia, motivación y resultado conservan evidencia suficiente |
| Progreso del usuario | La implementación produce los resultados definidos por el producto |
| Carga cognitiva | Reduce o justifica conceptos, decisiones y pasos |
| Claridad de interfaz | Estado, acción y consecuencia se comprenden |
| Control y recuperación | Existe revisión, corrección o reversibilidad proporcional |
| Profundidad progresiva | La capacidad aparece cuando corresponde |
| Confiabilidad y tiempo | Rendimiento, persistencia y feedback cumplen lo esperado |
| Uso responsable de IA | Incertidumbre, límites y determinismo están resueltos |
| Calidad acumulativa | Estados, lenguaje y microinteracciones son coherentes |

> Criterio de salida recomendado. Ninguna dimensión crítica puede puntuar 0. Los criterios relacionados con seguridad, permisos, dinero, datos personales o acciones irreversibles deben puntuar 2 antes de liberar. Para el resto, el equipo debe definir su umbral según el riesgo y el alcance.


Y las preguntas que el núcleo enumera para una revisión de producto:

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


## Después de liberar

> **Decisión requerida.** Se observan resultado, fricción, abandono y errores; se revisan el fundamento, las historias y sus supuestos cuando corresponda.

*Cita de `SH-GOV § Puntos de control`, literal.*

**Dónde cae en SpecKit:** **fuera del flujo de SpecKit**: no hay operación nativa que lo cubra

**Objetos que se comprueban:** Progreso · Causalidad · Carga


---

## Quién responde por qué

Una compuerta necesita quién decida. El manifiesto lo asigna por rol, y la adaptación **no reasigna nada**: lo cita.

| Responsable | Obligación principal |
|---|---|
| Producto | Establece la definición autorizada, el alcance, los resultados, las reglas, los no objetivos y la evidencia de éxito; valida Jobs to Be Done y Job Stories cuando se utilizan. |
| Diseño | Traduce el fundamento de producto a recorridos coherentes con el modelo mental de la persona y protege su atención; utiliza Job Stories cuando permiten concretar la situación. |
| Ingeniería | Absorbe complejidad, garantiza estados, rendimiento, accesibilidad y recuperación. |
| Agente de IA | Planifica e implementa dentro del fundamento y del contrato; declara supuestos, mantiene cobertura y no reduce ni amplía alcance por iniciativa propia. |
| Revisión humana | Evalúa causalidad, sentido, riesgo, experiencia completa y evidencia; no se limita a revisar código. |

---

## Lo que esta compilación deja visto

**El último momento no tiene operación nativa.** El manifiesto exige observar resultado, fricción, abandono y errores después de liberar, y revisar el fundamento y sus supuestos cuando corresponda. El flujo de SpecKit termina antes. Es una brecha de la herramienta, no del método, y queda declarada en lugar de resolverse en silencio.

**La adaptación no elige cuántas compuertas hay.** Son seis porque el manifiesto escribe seis.

