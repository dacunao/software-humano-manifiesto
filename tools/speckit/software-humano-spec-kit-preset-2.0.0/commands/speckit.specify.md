{CORE_TEMPLATE}

---

## Lo que el manifiesto exige en esta operación

Cada fila es una cita literal del núcleo. No hay redacción propia: si una fila no puede responderse mirando un artefacto, eso es el hallazgo.

| Dónde lo dice el manifiesto | Qué exige | Dónde se comprueba |
|---|---|---|
| `SH-FUND` | El fundamento de producto es el contenido autorizado que establece qué debe construirse, por qué debe existir, qué resultados debe producir, qué condiciones debe respetar y cómo podrá determinarse su cumplimiento. No es un nuevo tipo de documento ni una plantilla obligatoria. Puede encontrarse en una Job Story, un Jobs to Be Done, una épica, una capacidad, un requisito, una regla de negocio, un recorrido, un criterio de aceptación o una combinación coherente de estos elementos. | El fundamento de producto |
| `P01` | Identificar el fundamento de producto y la fuente autorizada que establece el alcance antes de diseñar una respuesta. | El fundamento de producto |
| `D01` | Comprender la definición de producto, su autoridad, su alcance y la evidencia que la respalda antes de proponer componentes o código. Cuando existan Job Stories, conservar su circunstancia, motivación y resultado. · No comenzar a construir si una ambigüedad material puede alterar la solución, el alcance o una regla. | El fundamento de producto |
| `SH-FUND` | Fuente y autoridad · ¿De dónde proviene y quién puede modificarlo? · Origen trazable y autoridad reconocida | El fundamento de producto |
| `SH-FUND` | Razón · ¿Qué situación, necesidad, problema u oportunidad aborda? · Justificación comprensible sin depender de la solución | El fundamento de producto |
| `SH-FUND` | Resultado · ¿Qué cambio o progreso debe producir? · Resultado reconocible para las personas o para el producto | El fundamento de producto |
| `SH-FUND` | Condiciones y límites · ¿Qué reglas, restricciones y exclusiones deben respetarse? · Límites suficientes para evitar decisiones silenciosas | El fundamento de producto |
| `SH-FUND` | Evidencia · ¿Cómo sabremos que se cumplió? · Criterios, observaciones o pruebas proporcionales al riesgo | El fundamento de producto |
| `A01` | ¿Qué debe construirse, por qué y con qué autoridad? · Fuentes; alcance; resultados; reglas; límites; evidencia; no objetivos | Mapa del fundamento |
| `F01` | Comprender el fundamento · Reconocer las fuentes, la autoridad, el alcance, la estructura utilizada y los resultados esperados. · Mapa fiel de la definición de producto, sin reformularla por conveniencia técnica. | Mapa del fundamento |
| `CR02` | Identifica las fuentes autorizadas, explica el fundamento de producto y confirma el alcance completo. Reconoce la estructura utilizada por la definición; cuando contenga Job Stories, conserva su circunstancia, motivación y resultado. Separa evidencia de supuestos e identifica cualquier ambigüedad que pueda cambiar materialmente la solución. | Ficha de Job Story cuando aplique · Mapa del fundamento |
| `O01` | Fuentes autorizadas y fundamento de producto que justifican el desarrollo. | Mapa del fundamento |
| `F02` | Establecer cobertura · Inventariar historias, capacidades, reglas, estados, recorridos, criterios y relaciones aplicables. · Cobertura completa y vacíos o contradicciones visibles. | Cobertura |
| `A02` | ¿Cómo se dará cuenta de todo el alcance? · Elementos obligatorios; relaciones; dependencias; implementación; pruebas; estado; excepciones | Cobertura |
| `CR03` | Da cuenta de todos los elementos obligatorios y establece sus dependencias, bloqueantes, orden, integración y pruebas. No selecciones, omitas ni postergues partes del alcance por iniciativa propia. Si las restricciones impiden cubrirlo, solicita una decisión a la autoridad de producto. | Cobertura |
| `O02` | Inventario de alcance y cobertura de historias, capacidades, reglas, estados y criterios aplicables. | Cobertura |
| `SH-FUND` | Toda omisión, modificación o postergación debe ser explícita, trazable y aprobada por la autoridad de producto. | Cobertura |
| `SH-FUND` | Si las restricciones de tiempo, recursos o tecnología impiden cubrir el alcance, el plan debe hacer visible la incompatibilidad y solicitar una decisión. | Cobertura |
| `SH-FUND` | Una estrategia incremental, por fases o por releases puede utilizarse cuando el proyecto la adopta; no es una obligación del núcleo. | Cobertura |
| `SH-FUND` | La completitud se determina reconciliando la implementación y la evidencia contra la definición de producto completa y sus excepciones aprobadas. | Cobertura |
| `SH-FUND` | Definición de producto · Qué debe construirse y bajo qué condiciones · Todo elemento obligatorio tiene cobertura o una excepción aprobada | Cobertura |
| `SH-FUND` | Jobs to Be Done · Qué progreso general merece atención cuando esta forma resulta aplicable · El resultado sigue siendo relevante para la persona | Cobertura |
| `SH-FUND` | Job Story · Qué circunstancia concreta debe atenderse cuando la fuente utiliza esta forma · La historia está validada y no prescribe una solución no autorizada | Cobertura |
| `SH-FUND` | Diseño e implementación · Qué comportamiento responde al fundamento · Cada elemento tiene una razón trazable | Cobertura |
| `SH-FUND` | Aceptación · Qué evidencia autoriza declarar completo el desarrollo · Resultados, reglas y criterios se cumplen bajo las condiciones definidas | Cobertura |
| `A03` | ¿Cuándo surge la necesidad y qué cambio busca la persona? · Circunstancia; motivación; resultado; conducta actual; ansiedad; evidencia; supuestos | Causalidad · Ficha de Job Story cuando aplique · Progreso |
| `P01` | Formular cada Job Story como circunstancia, motivación y resultado, sin nombrar una pantalla, un componente ni una funcionalidad. | Ficha de Job Story cuando aplique |
| `P02` | Considerar el estado emocional y cognitivo que acompaña la situación definida por el producto y, cuando exista, por la Job Story. | Ficha de Job Story cuando aplique |
| `F04` | Concretar el progreso · Usar las Job Stories existentes o formular una vista derivada cuando aporte claridad y esté identificada como tal. · Circunstancias, motivaciones y resultados preservados cuando corresponda. | Ficha de Job Story cuando aplique · Progreso |
| `O03` | Jobs to Be Done y Job Stories cuando formen parte de la definición o aporten una vista derivada útil. | Ficha de Job Story cuando aplique |
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
| `A04` | ¿Qué debe comprender y poder hacer la persona? · Ruta principal; lenguaje; decisiones; feedback; control; recuperación | Comprensión · Contrato de experiencia · Profundidad |
| `P05` | Hacer evidente la acción principal, el estado actual y el siguiente paso posible. | Contrato de experiencia |
| `F05` | Establecer el contrato de experiencia · Describir qué debe comprender, decidir y sentir la persona en los momentos críticos. · Ruta principal, estados y promesa de interacción. | Contrato de experiencia |
| `CR05` | No expongas estructuras internas. Usa lenguaje del usuario, convenciones conocidas, jerarquía clara, profundidad progresiva, valores predeterminados editables y feedback inmediato. | Comprensión · Contrato de experiencia · Profundidad |
| `D02` | Definir estados, decisiones, restricciones y criterios de aceptación con el nivel necesario para el riesgo. · No convertir un prompt vago en una implementación extensa y luego usar el código para descubrir el problema. | Modelo de estados |
| `P06` | Exigir que cada elemento visible y cada decisión solicitada respondan a una circunstancia, motivación o resultado verificable. | Carga |
| `P06` | Jerarquizar por relevancia para el estado actual, no por igualdad entre features. | Carga |
| `P06` | Reducir interrupciones y reservar señales intensas para asuntos que realmente requieren atención. | Carga |
| `P02` | Incluir esfuerzo, claridad y confianza dentro de los criterios de aceptación. | Plan de aceptación |
| `P02` | Probar el flujo completo, no solo cada pantalla o endpoint de forma aislada. | Plan de aceptación |
| `O04` | Evidencia disponible, supuestos y criterios de resultado. | Plan de aceptación |
| `CR04` | Presenta la alternativa recomendada, una alternativa más simple y la opción de no construir cuando la decisión aún pertenezca a producto. Explica cómo responde cada una al fundamento, qué carga introduce y qué tradeoffs exige. | Registro de decisiones |
| `CR01` | Construye la solución más simple que permita al usuario lograr el resultado definido, conservando claridad, control y capacidad de recuperación. | Registro de decisiones |
| `O05` | Alternativa elegida y razón de descarte de opciones más complejas. | Registro de decisiones |
| `P01` | Cuando el fundamento se exprese mediante Job Stories, ubicarlas dentro del progreso o propósito de nivel superior que corresponda. | Progreso |
| `P01` | Respaldar las decisiones con conducta observada, obstáculo o ansiedad actual y evidencia que permita aceptar el resultado. | Causalidad |
| `P05` | Preferir convenciones conocidas cuando resuelvan bien el problema. | Comprensión |
| `P05` | Explicar en contexto sin exigir tutoriales previos para acciones básicas. | Comprensión |
| `P07` | Mostrar qué está ocurriendo, qué cambiará y cuándo una acción será irreversible. | Confianza |
| `P07` | Diferenciar con claridad recomendaciones, decisiones automáticas y resultados confirmados. | Confianza |
| `P10` | Pedir confirmación proporcional al impacto, no para cada gesto ni después de una acción irreversible. | Confianza |
| `P10` | Permitir revisar, editar, exportar y revertir cuando el dominio lo permita. | Control |
| `P10` | Explicar el uso de datos y separar autorización, recomendación y ejecución. | Control |
| `P07` | Permitir deshacer, corregir o volver a un estado seguro cuando sea razonable. | Control |
| `O09` | Riesgos, incertidumbres, pendientes, excepciones y decisiones que aún requieren juicio humano. | todos los objetos |
| `SH-STOP` | Regla de detención antes de generar | todos los objetos |

