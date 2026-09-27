# Software Humano · bundle

Instala el método que aplica el **Manifiesto para el desarrollo de software humano con inteligencia artificial** al ciclo SDD nativo de SpecKit.

## Qué instala

| Componente | Qué hace |
|---|---|
| **Preset** `software-humano` | Compone los ocho comandos con lo que el manifiesto exige en cada operación, y agrega a las plantillas nativas los artefactos que el manifiesto define. Cada exigencia es **cita literal** del manifiesto |
| **Extensión** `conformidad` | Comprueba que los artefactos del proyecto tengan lo que el manifiesto exige, y que toda ausencia esté declarada como **excepción aprobada** |
| **Workflow** `software-humano` | Ejecuta el ciclo con las compuertas que el propio manifiesto especifica, y la comprobación de conformidad en los momentos que nombra |

## Qué espera de ti

**Una sola entrada: el fundamento de producto autorizado**, en la forma que ya tenga. Puede ser un documento de requisitos, una o varias Job Stories, épicas, capacidades, reglas de negocio, recorridos o criterios de aceptación. El manifiesto es explícito: *«no es un nuevo tipo de documento ni una plantilla obligatoria»*.

No conviertas tu definición a otro formato para que «encaje».

## Qué no hace

**No rechaza lo incompleto. Rechaza lo que falta sin que nadie lo sepa.**

La definición de terminado del manifiesto admite dos estados: implementación con evidencia verificable, **o excepción explícita y aprobada**. Un repositorio que nació antes del manifiesto entra declarando lo que todavía no cumple, con su razón y quién la aprueba, en `.specify/extensions/conformidad/conformidad-config.yml`.

**No sustituye el comportamiento nativo de SpecKit.** Los comandos conservan su descripción, sus `handoffs` y sus scripts; las plantillas conservan sus secciones y sus tokens. El método agrega, no reemplaza.

## Dos modos

- **Comandos sueltos.** El agente invoca `speckit.*` desde lenguaje natural. Aplica la doctrina en los artefactos.
- **Workflow.** Una persona o una integración continua lo ejecuta, y añade las compuertas y la comprobación de conformidad, que el agente no ejecuta y no puede saltarse.

El workflow es el camino recomendado, **no un requisito**.

## Límite que conviene conocer

La conformidad comprueba que las secciones existan y tengan contenido. **No comprueba que lo escrito sea bueno.** Esa distancia la cierran `analyze` y una persona — y, para el resultado, las pruebas con personas que el manifiesto exige antes de aceptar.

## Licencia

MIT para el método. El texto del manifiesto conserva su propia licencia.
