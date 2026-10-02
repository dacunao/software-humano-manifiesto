# Guía · Revisión con teclado y lector de pantalla (T105, `AC-07`)

**Para:** Damián Acuña · **Tiempo:** unos 15 minutos · **Sitio:** el publicado, `https://manifiesto.softwarehumano.com/es`

Las pruebas automáticas ya comprueban WCAG 2.2 AA (axe, en todas las páginas). Lo que no pueden comprobar es si **una persona** entiende y recorre el sitio sin mouse. Para eso es esta revisión. `AC-07` pide que los recorridos principales «pasen revisión humana con teclado y tecnología de asistencia».

No hace falta saber de accesibilidad. Anota lo que te cueste, te confunda o no funcione, aunque no sepas por qué.

---

## Antes de empezar (2 minutos)

1. **Teclado:** usa **Chrome**. En Safari, Tab salta los enlaces salvo que lo actives en Ajustes → Avanzado.
2. **Lector de pantalla:** usa **Safari** con **VoiceOver**, la combinación que mejor funciona en Mac.
   - Encender o apagar: **⌘ + F5**.
   - **VO** son las teclas **Control + Opción**, que se mantienen apretadas.
   - Si habla demasiado rápido: **VO + ⌘ + flecha izquierda**.
3. Ten a mano la tabla de resultados del final.

---

## Parte 1 · Solo teclado, en Chrome (5 minutos)

No toques el mouse ni el trackpad.

| # | Qué haces | Qué debería pasar |
|---|---|---|
| K1 | Abre `/es` y aprieta **Tab** una vez | Aparece «Ir al contenido». Con **Enter**, el foco salta al contenido principal y el siguiente Tab ya no pasa por la cabecera |
| K2 | Sigue con **Tab** por la cabecera | Siempre ves **dónde está el foco** (un contorno visible). Pasas por el logotipo, el menú, la búsqueda, el tema y EN · ES · PT, en ese orden |
| K3 | Llega a **Buscar** y aprieta Enter. Escribe `autoridad` | Se abre la búsqueda con el cursor en el campo y aparecen resultados. **Tab** o las flechas recorren los resultados |
| K4 | Aprieta **Escape** | La búsqueda se cierra y el foco **vuelve al botón Buscar**, no al principio de la página |
| K5 | Entra a **Manifiesto** desde el menú y recorre con Tab el índice de la izquierda y «En esta página» de la derecha | Enter en una sección de «En esta página» lleva a esa sección |
| K6 | Al final de la página, llega a **Siguiente** y aprieta Enter | Pasa a la página siguiente del recorrido |
| K7 | En un principio (por ejemplo `/es/principios/p03`), llega a **Copiar enlace** junto a un título y aprieta Enter | Te avisa que se copió. Pega en una nota y comprueba que el enlace lleva a esa sección |
| K8 | Con Tab, llega al **control de tema** y aprieta Enter | Cambia entre claro y oscuro, y el foco sigue visible en los dos |
| K9 | Llega a **EN** y aprieta Enter | Pasas a la misma página en inglés, no a la portada |

---

## Parte 2 · VoiceOver, en Safari (8 minutos)

Enciende VoiceOver con **⌘ + F5** y abre `/es/manifiesto/mapa`.

| # | Qué haces | Qué debería pasar |
|---|---|---|
| L1 | Escucha lo primero que anuncia | Dice el título de la página, en español y con buena pronunciación (no con acento inglés) |
| L2 | Abre el **rotor** con **VO + U** y elige **Encabezados** con las flechas izquierda y derecha | La lista de títulos se entiende sola, como un índice, y los niveles no saltan |
| L3 | En el rotor, elige **Puntos de referencia** | Aparecen al menos el banner (cabecera), la navegación, el contenido principal y el pie |
| L4 | En el rotor, elige **Enlaces** | Cada enlace se entiende sin el texto que lo rodea. No hay «clic aquí» ni enlaces repetidos sin explicación |
| L5 | Vuelve a la página (Escape) y navega al selector de idioma con **VO + flecha derecha** | Anuncia algo como «ES, Español, actual» y cada idioma con su nombre completo |
| L6 | Activa **Buscar** (**VO + espacio**), escribe `principio` y espera | Anuncia cuántos resultados hay, sin que tengas que buscarlos |
| L7 | Abre `/es/principios/p01` y lee el texto con **VO + A** (leer todo) | Se distingue el **texto canónico** del manifiesto de la explicación del sitio |
| L8 | Abre `/en` (la portada en inglés) y escucha un párrafo | Cambia a la voz o pronunciación inglesa. Haz lo mismo con `/pt-br` |

Apaga VoiceOver con **⌘ + F5**.

---

## Resultados

Marca ✅ si funcionó, ⚠️ si funcionó con dificultad o ❌ si no funcionó. Las notas valen más que la marca.

| # | Resultado | Nota |
|---|---|---|
| K1 | | |
| K2 | | |
| K3 | | |
| K4 | | |
| K5 | | |
| K6 | | |
| K7 | | |
| K8 | | |
| K9 | | |
| L1 | | |
| L2 | | |
| L3 | | |
| L4 | | |
| L5 | | |
| L6 | | |
| L7 | | |
| L8 | | |

**Impresión general:** ¿pudiste recorrer el sitio sin mouse y entender dónde estabas? ___

**Fecha y equipo:** ___ (por ejemplo, 2026-10-03, macOS 26, Chrome y Safari)

---

## Después

Pásame la tabla, aunque sea con fotos o en frases sueltas.

- **Si todo sale ✅:** registro T105 como hecha, con tu revisión como evidencia de `AC-07`.
- **Si algo sale ⚠️ o ❌:** abro tareas para corregirlo, lo pruebo y te pido revisar solo esos puntos.

Esta guía cubre un computador. El teléfono, con el lector de pantalla del iPhone, puede ser una segunda pasada si quieres más evidencia, pero `AC-07` no la exige por separado.
