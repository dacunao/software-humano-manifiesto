# Recorrido del sitio contra sus propios principios

**Fecha:** 2026-09-29 · **Pedido de:** Damián Acuña · **Método:** recorrido como persona, en el navegador:
- portada en inglés;
- el menú «Manifesto» y todo el recorrido con «Next», del Mapa a la Guía de bolsillo;
- una página de principio;
- búsqueda, cambio de idioma, SpecKit, página de error y teléfono.

Objetivo: que la navegación no sea un contraejemplo de lo que el manifiesto plantea.

## Hallazgos

| # | Principio | Hallazgo | Evidencia | Propuesta |
|---|---|---|---|---|
| R1 | `P05`, PRD §19.4 | Mezcla de idiomas | En las 20 páginas de principio en inglés y portugués, la fuente dice «section **PRINCIPIO 6** · P06» | Usar el título de la sección en el idioma de la página |
| R2 | `P07`, `P08` (el ejemplo aplicado pide «mantener siempre una ruta») | El recorrido termina en un callejón | Tras la Declaración final, la Guía de bolsillo solo ofrece «Previous: Governance» | Un cierre con los pasos siguientes: volver al Mapa, descargar el núcleo o ver cómo aplicarlo (SpecKit) |
| R3 | `P03`, `P05`, `STOP05` | Lo primero que ve quien entra al manifiesto es un índice técnico | El menú abre el Mapa; tras la portada viene el «Identifier index» (familias `SH-INDEX`, `D01`–`D06`…) antes de «The nine divisions» | Poner «Las nueve divisiones» justo después de la portada. Es una sección que agrega la vista y no altera el orden del núcleo |
| R4 | `P06` | Un rótulo largo y repetido | «TRANSLATION OF THE CANONICAL TEXT. THE SPANISH ORIGINAL RETAINS AUTHORITY.» aparece en cada cita, entre 6 y 10 veces por página en inglés y portugués | Rótulo breve en cada cita («Canonical text · translation») y el aviso de autoridad una sola vez por página. Se mantiene la distinción de `FR-017` |
| R5 | `P05`, WCAG 2.4.4 | Enlaces iguales con destinos distintos | 10 enlaces «Read the complete passage» en la portada y 3 en SpecKit; con lector de pantalla, la lista de enlaces es indistinguible | Nombrar el destino: «Read it in The manifesto» |
| R6 | `P06` | La misma idea, tres veces | El estado de SpecKit dice «independent adaptation», «not endorsed by GitHub» y otra vez «independent adaptation, not affiliated with or endorsed by GitHub». Pasa en SpecKit y en la portada | Dejarlo una sola vez |
| R7 | `P05`, `P06` | Dos entradas al mismo lugar, y una inconsistente | «Núcleo v2.1» en la cabecera y el menú «Manifiesto» llevan ahora los dos al Mapa. La página de error enlaza «Manifesto» a la división 1, no al Mapa | Que «Núcleo v2.1» sea solo un dato, sin enlace, y que la página de error enlace al Mapa |
| R8 | `P07` | En el teléfono, el estado no es real | En la portada, la barra «Contenido» dice «· Construir software es cada vez más fácil» antes de llegar a esa sección | Mostrar la sección solo cuando se llega a ella |
| R9 | `P05` | Marca interna visible en la búsqueda | Los subresultados muestran «# Tension» | Quitar el «#» |
| R10 | `P08` | Alineación | En el menú del teléfono, «Núcleo v2.1» queda desalineado respecto de las otras entradas | Alinear |

**Ya evaluado, sin acción:** «Enlace a esta sección» y «Copiar enlace» juntos en cada sección (H7 del 2026-09-28); «Ruta de lectura · Comprender» como vocabulario interno (H6, a observar).

## Lo que la navegación sí demuestra

- **`P04`:** el recorrido es continuo y sin saltos, del Mapa a la Guía de bolsillo, con anterior y siguiente en cada página.
- **`P05`:** la columna izquierda muestra dónde se está y la derecha, qué hay en la página; la estructura es la misma en todo el sitio.
- **`P07` y `P10`:** cambiar de idioma lleva a la misma página y la misma posición, y recuerda la elección sin pedir nada.
- **`FR-023`:** la búsqueda funciona por idioma, con secciones y el término resaltado.
- **`P04`:** la profundidad está en «Go deeper», que se abre solo si se quiere.
- **`P07`:** la página de error dice qué pasó y ofrece por dónde seguir.
- **`P10`:** el sitio no tiene formularios ni pide datos; el tema se puede revertir.
- **Teléfono:** se lee completo, con «Contenido» y «Menú».
