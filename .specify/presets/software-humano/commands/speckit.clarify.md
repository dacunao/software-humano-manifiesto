{CORE_TEMPLATE}

---

## Lo que el manifiesto exige en esta operación

Cada fila es una cita literal del núcleo. No hay redacción propia: si una fila no puede responderse mirando un artefacto, eso es el hallazgo.

| Dónde lo dice el manifiesto | Qué exige | Dónde se comprueba |
|---|---|---|
| `SH-FUND` | El fundamento de producto es el contenido autorizado que establece qué debe construirse, por qué debe existir, qué resultados debe producir, qué condiciones debe respetar y cómo podrá determinarse su cumplimiento. No es un nuevo tipo de documento ni una plantilla obligatoria. Puede encontrarse en una Job Story, un Jobs to Be Done, una épica, una capacidad, un requisito, una regla de negocio, un recorrido, un criterio de aceptación o una combinación coherente de estos elementos. | El fundamento de producto |
| `STOP01` | No existe un fundamento de producto identificable o la solución parece preceder al problema. | El fundamento de producto |
| `SH-FUND` | Fuente y autoridad · ¿De dónde proviene y quién puede modificarlo? · Origen trazable y autoridad reconocida | El fundamento de producto |
| `SH-FUND` | Razón · ¿Qué situación, necesidad, problema u oportunidad aborda? · Justificación comprensible sin depender de la solución | El fundamento de producto |
| `SH-FUND` | Resultado · ¿Qué cambio o progreso debe producir? · Resultado reconocible para las personas o para el producto | El fundamento de producto |
| `SH-FUND` | Condiciones y límites · ¿Qué reglas, restricciones y exclusiones deben respetarse? · Límites suficientes para evitar decisiones silenciosas | El fundamento de producto |
| `SH-FUND` | Evidencia · ¿Cómo sabremos que se cumplió? · Criterios, observaciones o pruebas proporcionales al riesgo | El fundamento de producto |
| `CR02` | Identifica las fuentes autorizadas, explica el fundamento de producto y confirma el alcance completo. Reconoce la estructura utilizada por la definición; cuando contenga Job Stories, conserva su circunstancia, motivación y resultado. Separa evidencia de supuestos e identifica cualquier ambigüedad que pueda cambiar materialmente la solución. | Ficha de Job Story cuando aplique · Mapa del fundamento |
| `O01` | Fuentes autorizadas y fundamento de producto que justifican el desarrollo. | Mapa del fundamento |
| `STOP04` | Una ambigüedad material está siendo resuelta por el agente sin autorización. | Mapa del fundamento |
| `CR03` | Da cuenta de todos los elementos obligatorios y establece sus dependencias, bloqueantes, orden, integración y pruebas. No selecciones, omitas ni postergues partes del alcance por iniciativa propia. Si las restricciones impiden cubrirlo, solicita una decisión a la autoridad de producto. | Cobertura |
| `STOP02` | El plan no da cuenta de todo el alcance obligatorio definido por producto. | Cobertura |
| `STOP03` | Se pretende omitir, modificar o postergar una parte sin una decisión autorizada. | Cobertura |
| `SH-FUND` | Toda omisión, modificación o postergación debe ser explícita, trazable y aprobada por la autoridad de producto. | Cobertura |
| `SH-FUND` | Si las restricciones de tiempo, recursos o tecnología impiden cubrir el alcance, el plan debe hacer visible la incompatibilidad y solicitar una decisión. | Cobertura |
| `SH-FUND` | Una estrategia incremental, por fases o por releases puede utilizarse cuando el proyecto la adopta; no es una obligación del núcleo. | Cobertura |
| `SH-FUND` | La completitud se determina reconciliando la implementación y la evidencia contra la definición de producto completa y sus excepciones aprobadas. | Cobertura |
| `SH-FUND` | Definición de producto · Qué debe construirse y bajo qué condiciones · Todo elemento obligatorio tiene cobertura o una excepción aprobada | Cobertura |
| `SH-FUND` | Jobs to Be Done · Qué progreso general merece atención cuando esta forma resulta aplicable · El resultado sigue siendo relevante para la persona | Cobertura |
| `SH-FUND` | Job Story · Qué circunstancia concreta debe atenderse cuando la fuente utiliza esta forma · La historia está validada y no prescribe una solución no autorizada | Cobertura |
| `SH-FUND` | Diseño e implementación · Qué comportamiento responde al fundamento · Cada elemento tiene una razón trazable | Cobertura |
| `SH-FUND` | Aceptación · Qué evidencia autoriza declarar completo el desarrollo · Resultados, reglas y criterios se cumplen bajo las condiciones definidas | Cobertura |
| `SH-FUND` | Jobs to Be Done · El progreso amplio que la persona busca conseguir · Organizar el producto alrededor de funcionalidades | Ficha de Job Story cuando aplique |
| `SH-FUND` | Job Story · La circunstancia, la motivación y el resultado que activan una necesidad concreta · Diseñar desde roles genéricos o pedidos literales | Ficha de Job Story cuando aplique |
| `SH-FUND` | Respuesta del producto · El comportamiento del sistema elegido para resolver la historia · Confundir el problema con la primera solución imaginada | Ficha de Job Story cuando aplique |
| `SH-FUND` | Evidencia de aceptación · La observación que demuestra progreso en esa circunstancia · Aceptar una entrega porque funciona técnicamente | Ficha de Job Story cuando aplique |
| `SH-FUND` | Conducta actual · ¿Qué hace hoy la persona? · Pasos, alternativa o abandono observados | Ficha de Job Story cuando aplique |
| `SH-FUND` | Obstáculo o ansiedad · ¿Qué frena o vuelve riesgoso el avance? · Duda, costo, temor, esfuerzo o dependencia relevante | Ficha de Job Story cuando aplique |
| `SH-FUND` | Evidencia causal · ¿Qué respalda la relación entre circunstancia y motivación? · Observación, entrevista, dato de uso o supuesto declarado | Ficha de Job Story cuando aplique |
| `SH-FUND` | Evidencia de éxito · ¿Qué demostraría que hubo progreso? · Conducta o resultado observable dentro de la circunstancia | Ficha de Job Story cuando aplique |
| `SH-FUND` | La circunstancia describe un desencadenante concreto y no una categoría de usuario. | Ficha de Job Story cuando aplique |
| `SH-FUND` | La motivación expresa progreso o comprensión y no una funcionalidad solicitada. | Ficha de Job Story cuando aplique |
| `SH-FUND` | El resultado puede reconocerse sin confundirlo con completar el flujo del producto. | Ficha de Job Story cuando aplique |
| `SH-FUND` | La historia está respaldada por evidencia o identifica con claridad el supuesto pendiente. | Ficha de Job Story cuando aplique |
| `SH-FUND` | La formulación permite comparar varias respuestas, incluida la opción de no construir. | Ficha de Job Story cuando aplique |
| `SH-FUND` | El alcance es suficiente para cambiar una decisión, pero no intenta contener el trabajo completo del usuario. | Ficha de Job Story cuando aplique |
| `D02` | Definir estados, decisiones, restricciones y criterios de aceptación con el nivel necesario para el riesgo. · No convertir un prompt vago en una implementación extensa y luego usar el código para descubrir el problema. | Modelo de estados |
| `O04` | Evidencia disponible, supuestos y criterios de resultado. | Plan de aceptación |
| `O09` | Riesgos, incertidumbres, pendientes, excepciones y decisiones que aún requieren juicio humano. | todos los objetos |
| `SH-STOP` | Regla de detención antes de generar | todos los objetos |

