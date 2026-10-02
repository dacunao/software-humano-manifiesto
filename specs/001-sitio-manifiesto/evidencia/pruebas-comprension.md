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

## Ronda final (T103, T104)

**Qué cambia respecto de la ronda temprana.** Se prueba el sitio publicado y completo, en los tres idiomas. Damián aprobó hacerla después de publicar (excepción del 2026-09-30). La guía anterior sigue valiendo; esto es lo que se ajusta.

**Para qué.** Damián juzga con estas notas:
- `AC-01`: una persona sin contexto previo puede explicar por qué la capacidad de generar software con IA aumenta la necesidad de criterio;
- `AC-02`: puede explicar que el progreso humano y la experiencia forman parte del producto;
- las nueve historias en sus circunstancias.

No hay umbral numérico.

### Preparación

- **Cuántas sesiones:** seis, dos por idioma. Cada persona usa el sitio en el idioma en que lee con más soltura. Que haya al menos tres audiencias distintas del PRD §14.1 en total. Nadie debe conocer el manifiesto.
- **Dónde:** el sitio publicado, `https://manifiesto.softwarehumano.com` (inglés), `/es` o `/pt-br`. Ya no hace falta construirlo en local.
- **Dispositivo:** al menos dos sesiones en teléfono y el resto en computador.
- **Navegador limpio:** una ventana privada por sesión, para que no herede el idioma ni el tema de la sesión anterior; ahora esas preferencias se guardan.
- **Duración:** unos 35 minutos.
- **Datos:** solo el perfil, el idioma y el dispositivo (`FR-018`). Si la sesión se graba, con permiso explícito y fuera de este repositorio.

### Ajustes a las tareas

Las nueve tareas se mantienen, en el mismo orden. Cambia esto:

| # | Ajuste |
|---|---|
| 5 `JS-05` | Se observa si usa «Copiar enlace» junto al título de la sección, y si el enlace copiado abre esa sección |
| 7 `JS-07` | La adaptación ya está publicada. Consigna: «Hay una sección sobre SpecKit. ¿Qué es eso que describe? ¿Es oficial? Si quisieras usarlo, ¿cómo lo harías?». Se observa si distingue manifiesto, adaptación y SpecKit, si entiende que no es oficial y si llega al repositorio o a la versión publicada |
| 9 `JS-09` | Consigna: «Baja hasta la mitad de una página, cambia el sitio a otro idioma y después vuelve al tuyo». Se observa si encuentra el selector, si reconoce el idioma y si conserva el lugar de lectura |

**Además, durante todas las tareas:**
- **Búsqueda:** ¿la encuentra? En el teléfono es una lupa.
- **Orientación:** ¿usa «En esta página» o el índice de la izquierda? ¿Sabe en qué parte del manifiesto está?
- **Fin del recorrido:** ¿qué hace al llegar a la Guía de bolsillo?
- **Teléfono:** ¿encuentra «Menú» y «Contenido»? ¿Le estorba la cabecera fija?
- **Tema:** si cambia a claro u oscuro, ¿le resulta natural?

### Consignas en inglés y portugués

Son material interno de la sesión; no se publica. Quien modera las lee tal cual.

| # | English | Português (Brasil) |
|---|---|---|
| 1 | "Look through the home page as far as you like. Then tell me, in your own words, what problem the site is raising." | "Percorra a página inicial até onde quiser. Depois me explique, com suas palavras, que problema o site levanta." |
| 2 | "If you had to tell a colleague the central idea, what would you say?" | "Se você tivesse que contar a ideia central a um colega, o que diria?" |
| 3 | "An app shows five buttons of the same size on its home screen. Would any of the principles say something about that? Which one, and why?" | "Um aplicativo mostra cinco botões do mesmo tamanho na tela inicial. Algum dos princípios diria algo sobre isso? Qual e por quê?" |
| 4 | "Look at the two answers compared on the home page. What difference do you see? What does the first one cost the person using it?" | "Veja as duas respostas comparadas na página inicial. Que diferença você vê? O que a primeira custa a quem a usa?" |
| 5 | "You want to quote, in a work document, the exact text of the reasons to stop an implementation. Find it and copy a link that goes straight there." | "Você quer citar, em um documento de trabalho, o texto exato dos motivos para interromper uma implementação. Encontre-o e copie um link que leve direto até lá." |
| 6 | "At what point would this method stop a development? Give me an example." | "Em que momento este método interromperia um desenvolvimento? Dê um exemplo." |
| 7 | "There is a section about SpecKit. What does it describe? Is it official? If you wanted to use it, how would you do it?" | "Há uma seção sobre o SpecKit. O que ela descreve? É oficial? Se você quisesse usá-lo, como faria?" |
| 8 | "You want to show someone else the principle about attention. What would you send them?" | "Você quer mostrar a outra pessoa o princípio sobre a atenção. O que enviaria?" |
| 9 | "Scroll halfway down a page, switch the site to another language, and then come back to yours." | "Desça até a metade de uma página, mude o site para outro idioma e depois volte ao seu." |
| Cierre | "What was hardest to understand?" · "What would you take from this to your work?" | "O que foi mais difícil de entender?" · "O que você levaria disto para o seu trabalho?" |

### Plantilla de notas (ronda final)

```text
Sesión: F-01 · Ronda: final · Fecha:
Idioma: en / es / pt-BR · Dispositivo: computador / teléfono · Navegador:
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

Búsqueda · Orientación · Fin del recorrido · Teléfono · Tema:
Lo más difícil de entender:
Lo que se llevaría:
Para Damián, AC-01 (¿explicó por qué más capacidad exige más criterio?) y AC-02 (¿explicó que la experiencia es parte del producto?):
Observaciones de quien modera (P02: ¿terminó con energía o con desgaste?):
```

### Después de las sesiones

- Las notas se pegan abajo, en «Notas de las sesiones», una por sesión.
- Esta sesión las ordena por historia y por hallazgo, separando lo observado de lo que interpreta (regla 5 de `AGENTS.md`), y se lo presenta a Damián.
- Damián juzga `AC-01` y `AC-02` (T104).
- Un hallazgo que cambiaría el alcance, un requisito o una historia no se corrige: se le presenta a Damián. Lo demás se registra como tarea antes de corregirlo, y pasa por `analyze`.

## Notas de las sesiones

_Vacío hasta que empiecen las sesiones de la ronda temprana._

### Revisión previa a la publicación (constancia de origen, 2026-09-28)

Damián Acuña declara que los comentarios que entregó durante el desarrollo provienen de personas que usan el sitio en su revisión previa a la publicación. No hay notas por sesión con la plantilla anterior; estas son las observaciones que llegaron por ese medio y lo que cambiaron:

| Observación | Cambio |
|---|---|
| El texto único del núcleo es una muralla y tiene contenidos duplicados | División del núcleo en nueve divisiones sin duplicados (PRD v1.2, RQ-15) |
| Falta una búsqueda como la de los sitios de documentación | Búsqueda por idioma (FR-023, RQ-16) |
| La cabecera cambia de altura según el idioma | Altura única en los tres idiomas |
| El aviso de versión preliminar y «Olvidar mi elección» no aportan | Se retiraron |
| El menú superior debería estar siempre presente | Cabecera fija (T180) |
| Aspecto visual | Sistema visual v1.0, aprobado (T171) |

Por decisión de Damián Acuña (2026-09-28), esta retroalimentación **cuenta como la ronda temprana** y cierra T086 y T087. La ronda final (T103, T104) se mantiene.
