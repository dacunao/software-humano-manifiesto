# Análisis · Patrones de la documentación de KiwiDesk

**Estado:** análisis y propuesta, **sin aprobar**. No se implementó nada.
**Fecha:** 2026-09-28
**Pedido de origen (Damián Acuña):** identificar otras áreas de oportunidad a partir del sitio que compartió como referencia —barra de búsqueda, cajas de texto o de código— con un análisis exhaustivo de los patrones de <https://kiwidesk.kiwicanopy.com/docs/>, trabajando dentro de los flujos del método.
**Criterio:** cada patrón se contrasta primero con el PRD v1.1 y las decisiones registradas (`AGENTS.md`, reglas 1 y 11). Un patrón bueno en otro sitio no es fundamento para este.

---

## 1. Qué es el sitio de referencia

Documentación de una aplicación para macOS, construida con **Starlight**, el tema de documentación de Astro (Astro 7.3). Es el mismo motor que usa este sitio, así que casi todo lo que se ve es técnicamente alcanzable. La pregunta no es si se puede, sino si tiene fundamento.

Escala medida el 2026-09-28: 15 páginas. La referencia de Lua tiene unas 26.000 palabras, 26 h2, 213 h3 y 212 bloques de código. Las decisiones de diseño tienen unas 122.000 palabras y 79 h3. Nuestro sitio tiene 18 páginas por idioma. El texto íntegro es la página más larga y ocupa unos 72.000 píxeles de alto en móvil.

## 2. Inventario de patrones

| # | Patrón | Cómo funciona allí |
|---|---|---|
| K1 | **Búsqueda** en la cabecera | Botón «Search» con atajo ⌘K. Abre un diálogo modal. Usa Pagefind: un índice estático generado al construir, sin servidor ni terceros. Carga unos 27 KB de script **solo al abrir el diálogo**. Agrupa los resultados por página, con subresultados que llevan al encabezado exacto y resaltan el término buscado |
| K2 | **Bloques de código** | Resaltado de sintaxis (lua, jsonc, sh), marco de «ventana de terminal» para comandos y botón de copiar en cada bloque, con aviso «Copied!». En móvil, el botón de copiar está siempre visible |
| K3 | **Estructura fija por entrada** | Cada ajuste de la referencia sigue la forma «Expects → Does → Example». Se reconoce la entrada sin leerla entera |
| K4 | **Cajas de aviso** | Bloques con borde para advertencias («Wedged daemon…») y una caja de estado «Unreleased — not in the current release» en cada ajuste aún no publicado |
| K5 | **Enlace de ancla en cada encabezado** | Un ícono de enlace junto a cada h2 y h3 lleva al ancla de esa sección. Funciona sin JavaScript |
| K6 | **Índice derecho «On this page»** | Muestra **todos** los h2 y h3 de la página (240 entradas en la referencia de Lua) y resalta el que está en pantalla |
| K7 | **Móvil: cabecera de una línea** | Marca, lupa y botón de menú. La barra fija «On this page ›» muestra la sección actual y despliega el índice. El texto empieza en la primera pantalla |
| K8 | **Anterior / Siguiente** | Al pie de cada página, enlaces a la página anterior y a la siguiente del recorrido |
| K9 | **Selector de tema** | Auto, claro u oscuro |
| K10 | **Barra lateral por grupos** | Grupos plegables («Start Here», «Reference», «Recipes», «Contributing») como navegación principal |
| K11 | **Enlace para saltar al contenido** | «Skip to content» |
| K12 | **404 en varios idiomas** | Una página con el mensaje en inglés, alemán y japonés |

## 3. Qué tiene hoy este sitio, medido el 2026-09-28

- **Móvil, texto íntegro:** la cabecera ocupa unos 290 px (el menú en tres líneas más el selector de idioma) y el índice, unos 830 px. **El texto empieza a unos 1.120 px**, casi una pantalla y media más abajo. El panel «En esta sección» no se muestra en pantallas angostas.
- **Tablas en móvil:** 12 de las 22 tablas del texto íntegro son más anchas que la pantalla y se desplazan horizontalmente. El núcleo tiene 189 filas de tabla en total.
- **Copiar enlace:** existe en el texto íntegro (cada pasaje copia la dirección de su casa) y en las páginas de principio. **No existe en las casas**: Manifiesto, Principios, Aplicación, Verificación, SpecKit y Acerca de. Allí las anclas existen, pero no hay cómo copiarlas sin conocerlas.
- **Anterior / Siguiente:** solo entre las páginas de principio.
- **Enlace para saltar al contenido** y **confirmación accesible al copiar** (`role="status"`): ya existen.
- **Bloques de código:** el núcleo no tiene ninguno. Tiene unos 100 identificadores en línea (`P03`, `CR05`…), que ya se muestran como código.

## 4. Clasificación según el fundamento

### A · Con fundamento en el PRD v1.1: entran por el flujo sin cambiar el PRD

| Oportunidad | Patrón | Fundamento | Qué se haría |
|---|---|---|---|
| **A1 · Primera pantalla en móvil** | K7 | PRD §21.4 («jerarquía equivalente en móvil»), `P04`, `P06`, §21.3 («los acordeones o capas progresivas deben conservar títulos explícitos y estados accesibles») | En pantallas angostas, índice plegado en un `<details>` nativo («Índice» o «En esta página»), con el texto en la primera pantalla. Sin JavaScript sigue funcionando (`FR-015`). Revisar también la altura de la cabecera |
| **A2 · Sección actual en móvil** | K7 | §21.4, `V04` («dónde está») | Con JavaScript, el rótulo del índice plegado muestra la sección en pantalla, usando el mismo script de seguimiento que ya existe. Sin JavaScript, solo el rótulo fijo |
| **A3 · Copiar enlace en las casas** | K5 | `FR-011` («URLs estables para principios y secciones»), `JS-08`, `JS-05` | Un enlace visible junto a cada encabezado de sección y de pasaje canónico en su casa (funciona sin JavaScript), y el mismo «copiar enlace» con confirmación que ya usa el texto íntegro |
| **A4 · Tablas en pantallas angostas** | — (KiwiDesk las desplaza, que es justo lo que el PRD pide evitar) | §21.4: «no se reducirán diagramas hasta volverlos ilegibles; deberán reestructurarse», «no exigir gestos complejos» | Que las tablas del núcleo se reorganicen en filas apiladas con su rótulo de columna, solo con CSS. El orden de lectura sin estilos no cambia |
| **A5 · Anterior / Siguiente entre las cuatro rutas** | K8 | «Cómo usar este documento» del núcleo (orden Comprender → Decidir → Construir → Verificar), `FR-002` («regresar sin perder orientación»), `V04` («qué ocurrirá después») | Al pie de Manifiesto, Principios, Aplicación y Verificación, la ruta anterior y la siguiente, como ya hacen las páginas de principio |

### B · Sin fundamento en el PRD: requieren una decisión tuya

| Oportunidad | Patrón | Qué dicen las fuentes | Recomendación |
|---|---|---|---|
| **B1 · Búsqueda en el sitio** | K1 | Ni la navegación global (§18.2) ni los requisitos la piden. El texto íntegro (§18.1) existe para «leer, **buscar** y citar», y es una sola página justamente para que la búsqueda del navegador funcione (`FR-003` v1.1, RQ-06 enmendado). §24.1 exige que el JavaScript «se justifique por interacción necesaria». Técnicamente cumpliría `FR-015` (mejora progresiva) y `FR-018` (sin terceros ni datos). **Agregarla sería una capacidad nueva** (`AGENTS.md`, condiciones de detención) | **No agregarla ahora. Observarla en la ronda temprana.** La tarea 5 de la guía (`JS-05`, encontrar las razones para detener y copiar su enlace) ya pone a prueba esa necesidad. Si las personas buscan un buscador y no encuentran el pasaje, esa es la evidencia para decidir un PRD v1.2. Sin esa evidencia, sería agregar «por si acaso» (`SH-AP`). Nuestro sitio tiene 18 páginas por idioma; KiwiDesk justifica la búsqueda con más de 150.000 palabras de referencia técnica |
| **B2 · Tema oscuro** | K9 | RQ-05 decidió que no haya panel de ajustes; solo el selector de idioma. La dirección visual aprobada (síntesis A + B) define tokens claros | Un selector reabre RQ-05. Seguir la preferencia del sistema operativo sin control visible (`P03`, resolver por contexto) exigiría una paleta oscura dentro de la dirección visual y otra verificación de contraste (`AC-07`). **Dejarlo fuera de la versión 1.0**, salvo que lo decidas como parte de la dirección visual |

### C · No aplica o contradice lo aprobado

| Patrón | Por qué no |
|---|---|
| K2 · Bloques de código con botón de copiar | El núcleo no tiene bloques de código. El único lugar donde tendrían sentido, los comandos de instalación en SpecKit, está vedado mientras el preset no esté publicado: `FR-010`, decisión §29.6 «solo estado, sin captura» y regla `RV-10`. **Se reevalúa cuando se decida PRD §29.10** |
| K3 · Estructura fija por entrada | Ya existe: el contrato de cada principio (PRD §17) es la misma idea. Aquí confirma el enfoque |
| K4 · Caja «Unreleased» | Ya existe como estado de la adaptación («no publicada»), modelado como dato |
| K6 · Índice derecho con todos los encabezados | Se descartó a propósito el 2026-09-27: mostrar solo la sección en pantalla evita repetir el índice izquierdo (`P06`, RQ-06 enmendado). Con 240 entradas, KiwiDesk muestra el costo de la otra opción |
| K10 · Barra lateral como navegación principal | Contradice la decisión del 2026-09-27: arriba «dónde», al lado «qué hay» |
| K11 · Enlace para saltar al contenido | Ya existe |
| K12 · 404 en varios idiomas | Ya hay una 404 por idioma. Una sola 404 con tres idiomas mezclaría idiomas en una página (PRD §19.4) |

### Cajas de texto: lo que falta saber

Las cajas de KiwiDesk (K3 y K4) sirven para que se reconozca de un vistazo qué tipo de contenido es. Aquí eso ya es un requisito: `FR-017` y `P07` exigen distinguir texto canónico, explicación, ejemplo, inferencia y estado. El sitio ya tiene rótulos y una caja distinta para la cita canónica. No hace falta un patrón nuevo, sino **evidencia de que se distinguen**. La tarea 5 de la guía de la ronda temprana pregunta justamente eso («¿distingue texto canónico de explicación?»). Si la ronda muestra confusión, se corrige como hallazgo (T087).

## 5. Cómo seguiría, dentro del método

1. **Las oportunidades A1–A5** son brechas contra requisitos que ya existen (§21.4, `FR-011`, `FR-002`). La operación que corresponde es `converge`: agrega las tareas al final de `tasks.md` con su fundamento. Después, `analyze` y la conformidad, y `implement` solo con tu autorización. Sin atajos, a diferencia de T123–T126 (registro del piloto, C4).
2. **B1 y B2** no se implementan. Si decides que entren, el camino es un PRD v1.2 decidido por ti, y después especificación, plan, tareas y análisis, como con la v1.1.
3. **Para la ronda temprana (T086)**, conviene agregar dos observaciones a la guía, sin cambiar las tareas: en la tarea 5, «¿buscó un buscador?», y en todas, «¿en móvil llegó al texto o se perdió en el índice?».
