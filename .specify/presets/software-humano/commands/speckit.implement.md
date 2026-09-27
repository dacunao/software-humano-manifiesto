{CORE_TEMPLATE}

---

## Lo que el manifiesto exige en esta operación

Cada fila es una cita literal del núcleo. No hay redacción propia: si una fila no puede responderse mirando un artefacto, eso es el hallazgo.

| Dónde lo dice el manifiesto | Qué exige | Dónde se comprueba |
|---|---|---|
| `A02` | ¿Cómo se dará cuenta de todo el alcance? · Elementos obligatorios; relaciones; dependencias; implementación; pruebas; estado; excepciones | Cobertura |
| `CR07` | Respeta el alcance acordado y conserva trazabilidad con su fundamento. No agregues features, modos, configuraciones ni abstracciones no solicitadas. Cubre estados vacíos, carga, error, éxito y recuperación e integra las partes relacionadas. | Carga · Cobertura · Modelo de estados |
| `O06` | Archivos o componentes modificados y límites del cambio. | Cobertura |
| `O07` | Estados y casos extremos cubiertos. | Contrato de experiencia · Estados · Modelo de estados |
| `A05` | ¿Qué puede ocurrir y qué transiciones son válidas? · Estados; eventos; reglas; errores; permisos; persistencia | Estados · Modelo de estados · Rendimiento |
| `P08` | Diseñar y verificar estados normales, vacíos, de carga, error, éxito y recuperación. | Modelo de estados |
| `P03` | Resolver dependencias, valores predeterminados y secuencias cuando exista suficiente contexto. | Carga |
| `P03` | Exponer una excepción solo a quienes realmente deben decidirla. | Carga |
| `A07` | ¿Qué evidencia autoriza declarar completo el desarrollo? · Resultados; reglas; Job Stories cuando apliquen; accesibilidad; rendimiento; estados extremos; métricas | Accesibilidad · Plan de aceptación |
| `P08` | Revisar el producto a escala real y con contenido realista antes de aprobarlo. | Plan de aceptación |
| `D05` | Evaluar el flujo, los estados extremos, accesibilidad, rendimiento y resultado real. · Código generado y pruebas unitarias aprobadas no equivalen a producto terminado. | Accesibilidad · Plan de aceptación |
| `F08` | Construir, integrar y verificar · Implementar el plan, mantener trazabilidad y reconciliar resultados contra el alcance completo. · Código, pruebas y evidencia de cobertura; pendientes y excepciones explícitos. | Plan de aceptación |
| `O08` | Pruebas ejecutadas y evidencia de resultado. | Plan de aceptación |
| `P08` | Mantener lenguaje, jerarquía y comportamiento consistentes en todo el flujo. | Comprensión |
| `P03` | Traducir conceptos internos al lenguaje y al modelo mental de la persona. | Comprensión |
| `P07` | Mostrar qué está ocurriendo, qué cambiará y cuándo una acción será irreversible. | Confianza |
| `P07` | Diferenciar con claridad recomendaciones, decisiones automáticas y resultados confirmados. | Confianza |
| `P10` | Pedir confirmación proporcional al impacto, no para cada gesto ni después de una acción irreversible. | Confianza |
| `CR06` | Reserva las reglas críticas para lógica verificable. Declara incertidumbre. No ejecutes acciones de alto impacto sin autorización proporcional. Mantén trazabilidad, revisión y reversibilidad. | Confianza · Control · IA |
| `P10` | Permitir revisar, editar, exportar y revertir cuando el dominio lo permita. | Control |
| `P10` | Explicar el uso de datos y separar autorización, recomendación y ejecución. | Control |
| `P07` | Permitir deshacer, corregir o volver a un estado seguro cuando sea razonable. | Control |
| `D06` | Usar IA para proponer, explicar y ejecutar bajo límites claros, manteniendo revisión y reversibilidad proporcionales al impacto. · La fluidez de una respuesta nunca sustituye evidencia ni autorización. | Control · IA |
| `P09` | Guardar trabajo, contexto y estado con una frecuencia proporcional al costo de perderlos. | Estados |
| `P09` | Definir presupuestos de respuesta para las interacciones críticas. | Rendimiento |
| `P09` | Mostrar progreso honesto y permitir continuar cuando una operación pueda demorarse. | Rendimiento |
| `D04` | Implementar reglas críticas, permisos, cálculos, estados y validaciones como lógica verificable. · No delegar certeza, cumplimiento o seguridad al comportamiento variable de un modelo. | IA |
| `O09` | Riesgos, incertidumbres, pendientes, excepciones y decisiones que aún requieren juicio humano. | todos los objetos |

