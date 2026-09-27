# Dónde va tu fundamento de producto

Este paquete instala el **método**. El **producto** lo defines tú.

Coloca en este directorio el documento que gobierna qué debe construirse, y regístralo en la sección **Completar por proyecto** de `AGENTS.md`. Sin eso, el agente se detendrá antes de especificar, que es el comportamiento correcto.

Puedes borrar este archivo una vez colocado tu fundamento.

## Qué forma puede tener

El núcleo v2.1 (`SH-FUND`) es explícito: **el fundamento no tiene una estructura obligatoria.** Puede ser un PRD extenso, una o varias Job Stories, épicas, capacidades, requisitos, reglas de negocio, recorridos, criterios de aceptación, o una combinación coherente.

El preset está construido precisamente para aceptar esa heterogeneidad sin deformarla. **No conviertas tu documento a un formato distinto para que "encaje".** El método debe comprender la estructura que tu producto ya usa.

## Qué debe poder responderse

Un fundamento es identificable cuando el desarrollo puede establecer lo siguiente **sin inventar decisiones de producto**. Los elementos pueden estar distribuidos en varias partes y no necesitan usar estos nombres.

| Elemento | Pregunta de control | Condición mínima |
|---|---|---|
| Fuente y autoridad | ¿De dónde proviene y quién puede modificarlo? | Origen trazable y autoridad reconocida |
| Razón | ¿Qué situación, necesidad, problema u oportunidad aborda? | Justificación comprensible sin depender de la solución |
| Resultado | ¿Qué cambio o progreso debe producir? | Resultado reconocible para las personas o para el producto |
| Condiciones y límites | ¿Qué reglas, restricciones y exclusiones deben respetarse? | Límites suficientes para evitar decisiones silenciosas |
| Evidencia | ¿Cómo sabremos que se cumplió? | Criterios, observaciones o pruebas proporcionales al riesgo |

La ausencia de una sección concreta no es por sí misma un defecto. Pero si falta una definición capaz de cambiar materialmente la solución, el agente debe exponer el vacío y acudir a ti. No debe completarlo por inferencia.

## Qué ayuda mucho, si tu documento lo permite

Ninguno es obligatorio. Todos hacen el trabajo del agente más fiel y más verificable.

- **Identificadores estables.** Si numeras tus requisitos, criterios o historias (`FR-001`, `AC-01`, `JS-01`), el agente los conservará sin renumerar y podrás recorrer la trazabilidad en ambas direcciones, desde el fundamento hasta la evidencia y de vuelta.
- **No objetivos explícitos.** Lo que declaras fuera de alcance es tan operativo como lo que incluyes: le da al agente permiso para rechazar capacidades plausibles.
- **Decisiones técnicas ya aprobadas.** Si tu producto ya decidió lenguaje, framework o arquitectura, decláralo. El agente las preservará en lugar de reabrirlas.
- **Decisiones abiertas declaradas.** Si sabes que la licencia, la autoría o la analítica aún no están resueltas, escríbelo. El agente las mantendrá visibles como `NEEDS CLARIFICATION` en lugar de cerrarlas con un valor predeterminado.
- **Supuestos reversibles.** Distinguirlos de las decisiones firmes evita que el plan trate una hipótesis como un compromiso.
- **Criterios de aceptación que incluyan experiencia.** El núcleo trata accesibilidad, rendimiento, estados, confianza y control como parte de la funcionalidad, no como requisitos secundarios.

## Qué no debes hacer

- No conviertas tu fundamento en historias de usuario si no lo es.
- No asignes prioridad, MVP, fases ni releases salvo que sea una decisión real de producto. El núcleo no presupone una estrategia incremental.
- No dejes que el agente elija por ti una decisión que cambie alcance, reglas, derechos, seguridad o experiencia.

## Después de colocarlo

1. Registra su ruta, versión y autoridad de producto en **Completar por proyecto** de `AGENTS.md`.
2. Enumera allí las familias de identificadores que deben preservarse.
3. Declara las decisiones técnicas aprobadas y las decisiones abiertas conocidas.
4. Entrega al agente el prompt de `START_WITH_AI_AGENT.md`.
