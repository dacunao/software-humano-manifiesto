{CORE_TEMPLATE}

---

## Lo que el manifiesto exige en esta operación

Cada fila es una cita literal del núcleo. No hay redacción propia: si una fila no puede responderse mirando un artefacto, eso es el hallazgo.

| Dónde lo dice el manifiesto | Qué exige | Dónde se comprueba |
|---|---|---|
| `STOP01` | No existe un fundamento de producto identificable o la solución parece preceder al problema. | El fundamento de producto |
| `O01` | Fuentes autorizadas y fundamento de producto que justifican el desarrollo. | Mapa del fundamento |
| `STOP04` | Una ambigüedad material está siendo resuelta por el agente sin autorización. | Mapa del fundamento |
| `V01` | Todos los elementos obligatorios de la definición de producto tienen implementación y evidencia o una excepción explícita y aprobada. | Cobertura · Plan de aceptación |
| `A02` | ¿Cómo se dará cuenta de todo el alcance? · Elementos obligatorios; relaciones; dependencias; implementación; pruebas; estado; excepciones | Cobertura |
| `O02` | Inventario de alcance y cobertura de historias, capacidades, reglas, estados y criterios aplicables. | Cobertura |
| `O06` | Archivos o componentes modificados y límites del cambio. | Cobertura |
| `STOP02` | El plan no da cuenta de todo el alcance obligatorio definido por producto. | Cobertura |
| `STOP03` | Se pretende omitir, modificar o postergar una parte sin una decisión autorizada. | Cobertura |
| `SH-AP` | El plan selecciona alcance · Se implementan algunas historias o reglas y se posterga el resto sin una decisión de producto. · Restablecer la cobertura completa o registrar una modificación explícita y aprobada. | Cobertura |
| `SH-AP` | La descomposición parece exclusión · Una fase técnica se presenta como si redefiniera lo que el PRD exige. · Separar orden de ejecución, estado de avance y alcance comprometido. | Cobertura |
| `O03` | Jobs to Be Done y Job Stories cuando formen parte de la definición o aporten una vista derivada útil. | Ficha de Job Story cuando aplique |
| `V02` | Las personas alcanzan los resultados definidos y pueden reconocerlos; cuando existen Job Stories, esto se comprueba en sus circunstancias. | Ficha de Job Story cuando aplique · Progreso |
| `V03` | La evidencia relaciona la situación, la necesidad y el resultado sin depender de un pedido de funcionalidad; cuando aplica, conserva circunstancia y motivación. | Causalidad · Ficha de Job Story cuando aplique |
| `SH-AP` | La Job Story es una feature disfrazada · La motivación dice usar un dashboard, recibir alertas o pulsar un botón. · Reformular el avance que necesita la persona sin anticipar la respuesta. | Ficha de Job Story cuando aplique |
| `SH-AP` | La circunstancia fue inventada · El equipo redacta una historia plausible sin observar conducta, tensión o contexto real. · Marcarla como hipótesis y obtener evidencia antes de ampliar la implementación. | Ficha de Job Story cuando aplique |
| `O07` | Estados y casos extremos cubiertos. | Contrato de experiencia · Estados · Modelo de estados |
| `V04` | Puede explicar dónde está, qué puede hacer y qué ocurrirá después sin ayuda externa. | Comprensión · Contrato de experiencia |
| `V06` | El principiante encuentra una ruta clara y el usuario avanzado conserva capacidad suficiente. | Contrato de experiencia · Profundidad |
| `V09` | Carga, vacío, error, éxito, interrupción y retorno mantienen contexto y orientación. | Estados · Modelo de estados |
| `SH-AP` | El happy path define el producto · Errores, vacíos e interrupciones quedan para después. · Modelar estados antes de implementar y aceptarlos explícitamente. | Modelo de estados |
| `V05` | No enfrenta decisiones, conceptos o datos que el sistema pueda resolver de forma segura. | Carga |
| `SH-AP` | Más opciones se confunden con más valor · Cada excepción se convierte en un control visible. · Resolver por contexto y revelar excepciones cuando aparezcan. | Carga |
| `SH-AP` | La estética maquilla la fricción · La pantalla luce bien, pero exige decisiones innecesarias. · Evaluar el recorrido completo y el esfuerzo real. | Carga |
| `SH-AP` | El agente agrega por si acaso · Aparecen modos, preferencias y abstracciones no pedidas. · Definir exclusiones y exigir justificación por capacidad. | Carga |
| `A07` | ¿Qué evidencia autoriza declarar completo el desarrollo? · Resultados; reglas; Job Stories cuando apliquen; accesibilidad; rendimiento; estados extremos; métricas | Accesibilidad · Plan de aceptación |
| `F08` | Construir, integrar y verificar · Implementar el plan, mantener trazabilidad y reconciliar resultados contra el alcance completo. · Código, pruebas y evidencia de cobertura; pendientes y excepciones explícitos. | Plan de aceptación |
| `CR08` | Reconcilia la implementación contra la definición completa de producto. Verifica resultados, reglas, criterios y, cuando correspondan, las Job Stories en sus circunstancias. Comprueba también accesibilidad, rendimiento percibido, errores, persistencia del trabajo y control del usuario. Entrega evidencia, pendientes y excepciones aprobadas. | Plan de aceptación |
| `O08` | Pruebas ejecutadas y evidencia de resultado. | Plan de aceptación |
| `O04` | Evidencia disponible, supuestos y criterios de resultado. | Plan de aceptación |
| `STOP07` | El equipo solo puede demostrar que el código funciona, no que el usuario progresa. | Plan de aceptación · Progreso |
| `O05` | Alternativa elegida y razón de descarte de opciones más complejas. | Registro de decisiones |
| `STOP05` | La interfaz expone una complejidad interna que el sistema podría absorber. | Comprensión |
| `SH-AP` | La interfaz replica la base de datos · El usuario debe elegir tipos, estados o relaciones internas. · Traducir la estructura a objetivos y decisiones humanas. | Comprensión |
| `SH-AP` | El tutorial compensa una interfaz oscura · La tarea básica requiere explicación previa. · Revisar lenguaje, jerarquía, convenciones y feedback. | Comprensión |
| `V07` | El sistema anticipa consecuencias, confirma resultados y ofrece recuperación proporcional. | Confianza |
| `V08` | La persona puede revisar, corregir, rechazar o revertir según el impacto de la acción. | Control |
| `SH-AP` | La confirmación sustituye la reversibilidad · Se pregunta varias veces, pero no existe deshacer. · Diseñar recuperación y usar confirmaciones solo según riesgo. | Control |
| `V10` | El flujo funciona con teclado, foco visible, etiquetas comprensibles, contraste y tecnologías de asistencia aplicables. | Accesibilidad |
| `V11` | Las acciones críticas cumplen el presupuesto de respuesta o muestran progreso honesto. | Rendimiento |
| `SH-AP` | La velocidad técnica oculta la espera · La operación tarda sin feedback o bloquea todo el flujo. · Responder de inmediato, mostrar progreso y preservar continuidad. | Rendimiento |
| `V12` | Las salidas variables declaran incertidumbre; las reglas críticas son verificables; las acciones sensibles requieren autorización. | IA |
| `STOP06` | Una acción sensible carece de determinismo, trazabilidad o recuperación. | IA |
| `SH-AP` | La IA llena vacíos conceptuales · Un prompt ambiguo produce una implementación grande. · Detener, aclarar supuestos materiales y preservar el alcance autorizado. | IA |
| `SH-AP` | La respuesta fluida parece verdadera · El usuario no distingue hecho, inferencia y propuesta. · Mostrar fuente, incertidumbre, límites y ruta de verificación. | IA |
| `O09` | Riesgos, incertidumbres, pendientes, excepciones y decisiones que aún requieren juicio humano. | todos los objetos |
| `SH-DONE` | Definición de terminado | todos los objetos |
| `SH-SCORE` | Scorecard de decisión | todos los objetos |

