# Pruebas moderadas de comprensión

**Para qué sirven.** Son la primera evidencia observada de las nueve Job Stories. Hasta ahora, las historias se sostienen solo por la autoridad del PRD, sin observación (spec.md, Ficha de Job Story). Alimentan `AC-01` y `AC-02` y el juicio sobre `JS-01`–`JS-09`.

**Quién decide.** Damián Acuña, al revisar estas notas. No hay umbral numérico (decisión del 2026-09-27). Esta guía no aprueba nada; ordena la observación.

**Dos rondas** (decisión del 2026-09-27, `F07`):

| Ronda | Cuándo | Qué se prueba | Idioma |
|---|---|---|---|
| Temprana (T086) | Terminadas las fases 3 a 11, antes de optimizar, diseñar y traducir | El contenido y el recorrido, con textos en borrador y estilos provisionales | Español |
| Final (T104) | Con la dirección visual aplicada y los tres idiomas revisados | El sitio completo | Los tres |

---

## Antes de cada sesión

- **Participantes.** Personas de las audiencias principales del PRD §14.1: responsables de producto, diseño UX, ingeniería, fundadores y creadores de agentes. Conviene cubrir al menos tres audiencias distintas en cada ronda. Nadie debe conocer el manifiesto de antemano.
- **Qué se les dice.** «Vamos a mirar un sitio. No evaluamos a la persona, evaluamos el sitio. Piensa en voz alta; si algo no se entiende, eso es justo lo que buscamos.» No se explica de qué trata el manifiesto.
- **Datos.** Solo se registra el perfil (audiencia y experiencia con desarrollo guiado por especificaciones o con agentes de código). Sin nombres ni datos de contacto en este archivo (`FR-018`).
- **Cómo abrir el sitio.** Mientras no haya publicación, en la computadora de quien modera: `bun run build` y luego `bunx astro preview`, y abrir `http://localhost:4321/es`.
- **Quien modera no ayuda.** Si la persona se traba, se anota dónde y por qué; recién después de dos minutos se ofrece seguir con la tarea siguiente.

## Tareas

Cada tarea sale de la evidencia de cumplimiento de su historia (PRD §15). El orden sigue el recorrido, no expresa prioridad.

| # | Historia | Consigna (se lee tal cual) | Qué se observa |
|---|---|---|---|
| 1 | `JS-01` | «Recorre el inicio hasta donde te parezca. Después explícame, con tus palabras, qué problema plantea el sitio.» | ¿Explica por qué más capacidad para construir no equivale a más progreso? ¿Hasta qué acto llegó? ¿Abrió algún «Profundizar»? |
| 2 | `JS-02` | «Si tuvieras que contarle a un colega la idea central, ¿qué le dirías?» | ¿Formula la tesis con sus palabras (el progreso de la persona y la experiencia forman parte del producto)? |
| 3 | `JS-03` | «Una aplicación muestra cinco botones del mismo tamaño en su pantalla de inicio. ¿Alguno de los principios diría algo sobre eso? ¿Cuál y por qué?» | ¿Encuentra un principio aplicable (`P06`, también `P04` o `P05`) y justifica la relación? ¿Cómo lo buscó? |
| 4 | `JS-04` | «Mira las dos respuestas que se comparan en el inicio. ¿Qué diferencia ves? ¿Qué le cuesta a quien usa la primera?» | ¿Nombra la carga, la complejidad o la pérdida de control que introduce la respuesta centrada en el sistema? |
| 5 | `JS-05` | «Quieres citar, en un documento de trabajo, el texto exacto de las razones para detener una implementación. Encuéntralo y copia un enlace que lleve directo ahí.» | ¿Llega al pasaje canónico? ¿Distingue texto canónico de explicación? ¿El enlace copiado lleva al lugar correcto? |
| 6 | `JS-06` | «¿En qué momento este método detendría un desarrollo? Dame un ejemplo.» | ¿Explica al menos un punto de detención con sus palabras? |
| 7 | `JS-07` | «Hay una sección sobre SpecKit. ¿Qué es eso que describe? ¿Es oficial? ¿Se puede instalar hoy?» | ¿Distingue manifiesto, adaptación y SpecKit? ¿Entiende que no es oficial ni está publicada? ¿Buscó un botón de descarga? |
| 8 | `JS-08` | «Quieres mostrarle a otra persona el principio sobre la atención. ¿Qué le enviarías?» | ¿Encuentra el principio y un enlace estable? ¿El enlace abre la página correcta con contexto? |
| 9 | `JS-09` | «Cambia el sitio a portugués y después vuelve al español, sin perder la página en la que estás.» | ¿Encuentra el selector sin ayuda? ¿Reconoce en qué idioma está? En la ronda temprana, el portugués muestra textos del original: se anota si eso confunde. |

**Al final**, dos preguntas abiertas: «¿Qué fue lo más difícil de entender?» y «¿Qué te llevarías de esto a tu trabajo?».

**Además, durante todas las tareas** (PRD v1.2; evidencia pendiente de RQ-15 y RQ-16, T143). Se observa sin preguntarlo:

- **Búsqueda.** ¿La persona usa el botón «Buscar»? ¿Encuentra con él lo que busca, por ejemplo en la tarea 5? ¿O busca un buscador y no lo encuentra?
- **Móvil.** Si alguna sesión es en teléfono: ¿llega al texto o se pierde en el índice? ¿Encuentra «Contenido» y «Menú»? En la tarea 9, ¿encuentra el idioma dentro de «Menú» sin ayuda?
- **Divisiones.** Al buscar un tema, ¿la división donde lo encuentra le parece la esperable? Se anota dónde lo buscó primero y dónde estaba.

## Plantilla de notas por sesión

Copiar un bloque por sesión.

```text
Sesión: T-01 · Ronda: temprana · Fecha:
Perfil: audiencia (PRD §14.1) · experiencia con SDD o agentes: ninguna / algo / mucha
Moderó:

Tarea | Logró (sí / en parte / no) | Qué dijo (cita breve) | Dónde se trabó y por qué | Minutos
1 JS-01 |   |   |   |
2 JS-02 |   |   |   |
3 JS-03 |   |   |   |
4 JS-04 |   |   |   |
5 JS-05 |   |   |   |
6 JS-06 |   |   |   |
7 JS-07 |   |   |   |
8 JS-08 |   |   |   |
9 JS-09 |   |   |   |

Búsqueda (¿la usó?, ¿encontró?) · Móvil (¿llegó al texto?) · Divisiones (¿dónde buscó cada tema y dónde estaba?):
Lo más difícil de entender:
Lo que se llevaría:
Observaciones de quien modera (P02: ¿terminó con energía o con desgaste?):
```

## Qué pasa con los hallazgos

- Lo que se corrige en el contenido en español queda en `borrador` y se registra en `docs/pilot/registro-del-piloto.md` (T087).
- **Si un hallazgo cambiaría el alcance, un requisito o una historia, no se corrige: se le presenta a Damián** (`AGENTS.md`, condiciones de detención).
- La traducción de los textos editoriales (T084) se hace después de incorporar los hallazgos.

## Notas de las sesiones

_Vacío hasta que empiecen las sesiones de la ronda temprana._
