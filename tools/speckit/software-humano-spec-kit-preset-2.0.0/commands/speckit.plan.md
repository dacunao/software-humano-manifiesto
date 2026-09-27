{CORE_TEMPLATE}

---

## Lo que el manifiesto exige en esta operación

Cada fila es una cita literal del núcleo. No hay redacción propia: si una fila no puede responderse mirando un artefacto, eso es el hallazgo.

| Dónde lo dice el manifiesto | Qué exige | Dónde se comprueba |
|---|---|---|
| `F03` | Planificar la implementación · Resolver dependencias, bloqueantes, orden, paralelismo, integración y pruebas sin modificar el alcance. · Plan coherente que da cuenta de toda la definición aprobada. | Cobertura |
| `CR03` | Da cuenta de todos los elementos obligatorios y establece sus dependencias, bloqueantes, orden, integración y pruebas. No selecciones, omitas ni postergues partes del alcance por iniciativa propia. Si las restricciones impiden cubrirlo, solicita una decisión a la autoridad de producto. | Cobertura |
| `CR05` | No expongas estructuras internas. Usa lenguaje del usuario, convenciones conocidas, jerarquía clara, profundidad progresiva, valores predeterminados editables y feedback inmediato. | Comprensión · Contrato de experiencia · Profundidad |
| `A05` | ¿Qué puede ocurrir y qué transiciones son válidas? · Estados; eventos; reglas; errores; permisos; persistencia | Estados · Modelo de estados · Rendimiento |
| `P08` | Diseñar y verificar estados normales, vacíos, de carga, error, éxito y recuperación. | Modelo de estados |
| `F06` | Modelar reglas y riesgos · Separar lógica determinista, comportamiento generativo, permisos y acciones irreversibles. · Mapa de decisiones y límites. | IA · Modelo de estados |
| `P06` | Exigir que cada elemento visible y cada decisión solicitada respondan a una circunstancia, motivación o resultado verificable. | Carga |
| `P06` | Jerarquizar por relevancia para el estado actual, no por igualdad entre features. | Carga |
| `P06` | Reducir interrupciones y reservar señales intensas para asuntos que realmente requieren atención. | Carga |
| `P03` | Resolver dependencias, valores predeterminados y secuencias cuando exista suficiente contexto. | Carga |
| `P03` | Exponer una excepción solo a quienes realmente deben decidirla. | Carga |
| `D03` | Preferir la solución que exige menos conceptos, decisiones y memoria al usuario cuando ambas logran el mismo resultado. · Menos código no es la medida; menos carga innecesaria sí. | Carga · Registro de decisiones |
| `A06` | ¿Qué carga estamos agregando? · Conceptos nuevos; decisiones; pasos; excepciones; opciones visibles | Carga |
| `A07` | ¿Qué evidencia autoriza declarar completo el desarrollo? · Resultados; reglas; Job Stories cuando apliquen; accesibilidad; rendimiento; estados extremos; métricas | Accesibilidad · Plan de aceptación |
| `P08` | Revisar el producto a escala real y con contenido realista antes de aprobarlo. | Plan de aceptación |
| `A08` | ¿Por qué elegimos esta alternativa? · Alternativas; tradeoffs; supuestos; decisión; fecha; evidencia pendiente | Registro de decisiones |
| `F07` | Explorar y prototipar · Comparar alternativas y probar comprensión, jerarquía y recuperación antes de optimizar código. · Razón de la alternativa elegida y evidencia del recorrido. | Registro de decisiones |
| `CR04` | Presenta la alternativa recomendada, una alternativa más simple y la opción de no construir cuando la decisión aún pertenezca a producto. Explica cómo responde cada una al fundamento, qué carga introduce y qué tradeoffs exige. | Registro de decisiones |
| `O05` | Alternativa elegida y razón de descarte de opciones más complejas. | Registro de decisiones |
| `P08` | Mantener lenguaje, jerarquía y comportamiento consistentes en todo el flujo. | Comprensión |
| `P03` | Traducir conceptos internos al lenguaje y al modelo mental de la persona. | Comprensión |
| `P04` | Mostrar primero la ruta principal y revelar opciones avanzadas cuando el contexto las vuelva relevantes. | Profundidad |
| `P04` | Conservar atajos y precisión para usuarios expertos sin imponerlos al principiante. | Profundidad |
| `P04` | Usar buenos valores predeterminados, siempre editables cuando la decisión importa. | Profundidad |
| `P07` | Mostrar qué está ocurriendo, qué cambiará y cuándo una acción será irreversible. | Confianza |
| `P07` | Diferenciar con claridad recomendaciones, decisiones automáticas y resultados confirmados. | Confianza |
| `P10` | Pedir confirmación proporcional al impacto, no para cada gesto ni después de una acción irreversible. | Confianza |
| `CR06` | Reserva las reglas críticas para lógica verificable. Declara incertidumbre. No ejecutes acciones de alto impacto sin autorización proporcional. Mantén trazabilidad, revisión y reversibilidad. | Confianza · Control · IA |
| `P10` | Permitir revisar, editar, exportar y revertir cuando el dominio lo permita. | Control |
| `P10` | Explicar el uso de datos y separar autorización, recomendación y ejecución. | Control |
| `P07` | Permitir deshacer, corregir o volver a un estado seguro cuando sea razonable. | Control |
| `P09` | Guardar trabajo, contexto y estado con una frecuencia proporcional al costo de perderlos. | Estados |
| `P09` | Definir presupuestos de respuesta para las interacciones críticas. | Rendimiento |
| `P09` | Mostrar progreso honesto y permitir continuar cuando una operación pueda demorarse. | Rendimiento |
| `D04` | Implementar reglas críticas, permisos, cálculos, estados y validaciones como lógica verificable. · No delegar certeza, cumplimiento o seguridad al comportamiento variable de un modelo. | IA |
| `O09` | Riesgos, incertidumbres, pendientes, excepciones y decisiones que aún requieren juicio humano. | todos los objetos |

