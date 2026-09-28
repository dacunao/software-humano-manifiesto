# Propuesta · Cómo dividir el núcleo en el sitio

**Estado:** **alternativa B aprobada** por Damián Acuña el 2026-09-28, con dos observaciones: Influencias y notas se presenta destilada en Acerca de, y la Declaración final cierra la Guía de bolsillo. Incorporada al PRD v1.2.
**Fecha:** 2026-09-28
**Pedido de Damián Acuña:** un análisis de pros y contras de las alternativas más efectivas para dividir el contenido, con una recomendación. Condiciones:
1. Se decide por los principios del manifiesto y las necesidades de quienes navegarán el sitio, **sin sesgo por las definiciones del PRD**.
2. La división **no puede romper la lógica ni la estructura del núcleo**.
3. No hay contenido duplicado.
4. El núcleo completo no se despliega como página: se ofrece como descarga en Markdown, en el idioma seleccionado.

**Antecedentes:** [análisis de patrones de KiwiDesk](analisis-patrones-kiwidesk-2026-09-28.md). Esta propuesta reemplaza su versión anterior del mismo día.

---

## 1. La estructura del núcleo

Son 24 secciones de primer nivel, en este orden, con su extensión en palabras:

| # | Sección | Palabras | Contiene, entre otros |
|---|---|---:|---|
| 1 | Índice operativo · `SH-INDEX` | 255 | Familias de identificadores |
| 2 | Propósito del documento | 814 | El problema, la conclusión central, alcance y lectores, cómo usar el documento (cuatro rutas), arquitectura del marco, límite entre núcleo e implementación |
| 3 | Texto canónico | 398 | El manifiesto propiamente dicho |
| 4 | Principios de diseño | 262 | Los diez compromisos, en tabla |
| 5–14 | Principio 1 a 10 · `P01`–`P10` | 175–368 cada uno | Qué observa, qué exige, Job Story, reglas y prueba |
| 15 | Fundamento de producto · `SH-FUND` | 1.351 | Cuándo es identificable, alcance, Job Stories, trazabilidad |
| 16 | Doctrina para desarrollo con IA | 580 | `D01`–`D06` |
| 17 | Flujo de trabajo | 769 | `F01`–`F08`, `A01`–`A08`, `SH-STOP` |
| 18 | Contrato reutilizable | 520 | `CR01`–`CR08`, `O01`–`O09` |
| 19 | Verificación | 711 | `V01`–`V12`, `SH-SCORE`, preguntas de revisión |
| 20 | Antipatrones · `SH-AP` | 461 | Señales de alejamiento |
| 21 | Ejemplo aplicado | 579 | Un caso completo, del pedido a la evidencia |
| 22 | Gobernanza · `SH-GOV` | 908 | Responsabilidades, puntos de control, evolución, control de cambios, `SH-DONE` |
| 23 | Guía de bolsillo · `SH-POCKET` | 280 | Catorce preguntas, `STOP01`–`STOP07`, tres frases |
| 24 | Influencias y notas | 312 | Origen, fuentes, **declaración final** |

**Observación clave: el orden del núcleo ya es una progresión de lectura.** Va de qué es y para quién (2), a qué afirma (3), cómo decidir (4–15), cómo construir (16–18), cómo verificar (19–20), un caso completo (21), cómo sostenerlo (22), un resumen para llevar (23) y de dónde viene (24). Es el recorrido de simple a profundo que pide `P04`. El propio núcleo nombra sus rutas en ese mismo orden: Comprender, Decidir, Construir, Verificar.

**Qué rompe la estructura:** partir una sección en varias páginas, cambiar su orden o sacar una subsección de su sección. La organización actual (v1.1) hace las tres cosas:
- Propósito está repartido en cuatro páginas.
- Gobernanza está en tres, y `SH-DONE` quedó en Verificación.
- El ejemplo aplicado y la guía de bolsillo se asignaron a rutas donde no encajan del todo.
- Nadie puede leer el núcleo en su orden dentro del sitio.

## 2. Lo que necesitan quienes navegan

Sin tomar las definiciones del PRD, las necesidades que se desprenden del propio manifiesto y de sus lectores declarados (sección 2: product managers, diseñadores, desarrolladores y agentes de código) son:

- **N1 · Saber de qué se trata y si es para mí**, en minutos (primera profundidad de lectura del núcleo).
- **N2 · Entender un tema completo** sin armarlo desde varias páginas (`P05`: la interfaz no se vuelve otra tarea).
- **N3 · Leer todo, en orden,** cuando se quiere estudiar el manifiesto (segunda profundidad).
- **N4 · Encontrar y citar un pasaje o identificador** exacto, con una dirección estable (`SH-INDEX`, `P07`).
- **N5 · Orientarse**: saber dónde se está y qué viene después (`P09`, `V04`).
- **N6 · Llevarse el contenido** (`P10`): la descarga.
- **N7 · No gastar atención** en navegación, repeticiones ni en decidir cuál de dos copias leer (`P06`).

## 3. Alternativas

### A · Una página por cada sección (24 por idioma)

| Pros | Contras |
|---|---|
| Máxima fidelidad: cada sección, entera y en su orden | Los temas quedan partidos: doctrina, flujo y contrato son un mismo tema (construir con IA) en tres páginas; verificación y antipatrones, en dos (`P05`, N2) |
| Cada identificador tiene una página obvia (N4) | Obliga a navegar la anatomía del documento, que es su estructura interna (`P03`) |
| Anterior / Siguiente recorre el núcleo en orden (N3) | Índice de 24 entradas (`P06`) y páginas muy cortas (175 palabras) junto a muy largas (1.351) |

### B · Divisiones temáticas contiguas, en el orden del núcleo (recomendada)

Se agrupan secciones **consecutivas** que comparten un tema. Ninguna sección se parte y ninguna cambia de orden.

| División | Secciones | Palabras | Tema común |
|---|---|---:|---|
| 0 · Mapa del manifiesto | 1 | 255 | Cómo está organizado y cómo citarlo |
| 1 · El manifiesto | 2–3 | 1.212 | Qué problema aborda, para quién es y qué afirma |
| 2 · Principios | 4, más una página por principio (5–14) | 262 + 10 páginas | Los diez criterios para decidir |
| 3 · Fundamento de producto | 15 | 1.351 | Qué debe estar definido antes de construir |
| 4 · Construir con IA | 16–18 | 1.869 | Doctrina, flujo, detención y contrato del agente |
| 5 · Verificar | 19–20 | 1.172 | Cómo aceptar una solución y cómo reconocer que se aleja |
| 6 · Ejemplo aplicado | 21 | 579 | El método completo en un caso |
| 7 · Gobernanza | 22 | 908 | Cómo sostenerlo en el tiempo, incluida la definición de terminado |
| 8 · Guía de bolsillo | 23 | 280 | Lo esencial para llevar, incluidas las siete razones para detenerse |
| 9 · Influencias y notas | 24 | 312 | Origen, fuentes y declaración final |

| Pros | Contras |
|---|---|
| **Respeta la estructura:** cada sección entera y en su orden | Diez divisiones más diez páginas de principio: el índice es más largo que hoy (se atenúa agrupándolo por ruta, ver §4) |
| **Cada división tiene un tema** que se entiende sin conocer el documento (N2, `P03`) | Algunas divisiones son cortas (Guía, 280; Influencias, 312) |
| **Se lee todo en orden** con Anterior / Siguiente, sin una página del núcleo completo (N3) | La definición de terminado queda en Gobernanza, donde la puso el núcleo, aunque alguien podría buscarla en Verificar. Se resuelve con un enlace, no con una copia |
| **Cero duplicados:** cada pasaje vive en un solo lugar, y también en la búsqueda (N7, `P05`, `P06`) | La primera división carga partes densas del propósito (arquitectura del marco, límite con la implementación). Se atenúa con la explicación editorial arriba (`P04`) |
| Las dudas del análisis anterior se resuelven solas: alcance y lectores queda en la primera división (N1); el fundamento tiene su propia división, sin forzarlo a Decidir o a Construir; la guía de bolsillo es una puerta de entrada breve | Deshace parte de lo construido en la v1.1: las páginas de Aplicación y Verificación, y el menú con siete superficies |
| Las anclas de los identificadores quedan en su división (N4) | Que sea coherente para las personas sigue siendo hipótesis hasta observarlas |

### C · Cuatro rutas de lectura (la organización actual, v1.1)

| Pros | Contras |
|---|---|
| Cuatro puertas claras: Comprender, Decidir, Construir, Verificar | **Rompe la estructura:** parte Propósito y Gobernanza y cambia el orden |
| Menos páginas | Las secciones finales no caben en ninguna ruta y se reparten de forma forzada |
| | No se puede leer el núcleo en orden dentro del sitio (N3) |

### D · Por audiencia (producto, diseño, ingeniería, agentes)

| Pros | Contras |
|---|---|
| Habla directo a cada lector | El núcleo no está escrito por audiencia: casi todo sirve a varias. Obliga a duplicar o a partir de forma arbitraria. **Rompe la estructura** |

**Descartadas por tus condiciones:** una sola página con el núcleo completo (punto 4) y cualquier combinación que repita pasajes (punto 3).

## 4. Recomendación: B

Es la única alternativa que cumple las cuatro condiciones y atiende las siete necesidades. Además, lo que el orden del núcleo ya hace bien, que es ir de lo simple a lo profundo, pasa a ser la navegación del sitio en lugar de reemplazarlo.

**Cómo se navegaría:**
- **Menú superior:** Inicio · Manifiesto · SpecKit · Acerca de, más la búsqueda y el idioma. «Manifiesto» abre la división 1.
- **Índice lateral del manifiesto,** en el orden del núcleo, agrupado bajo las rutas que el propio núcleo nombra:
  - Comprender: 0 y 1;
  - Decidir: 2 y 3;
  - Construir: 4;
  - Verificar: 5;
  - Llevarlo a la práctica: 6 a 9.
  
  Los nombres de ruta orientan; no reordenan nada.
- **Dentro de cada división:** primero la explicación editorial (`P04`), luego el texto canónico completo, con «En esta sección» a la derecha en las divisiones largas.
- **Al pie de cada división:** Anterior / Siguiente en el orden del núcleo.
- **Descarga:** en el pie de todas las páginas y en el Mapa, en Markdown y en el idioma seleccionado. En español, el archivo original idéntico byte a byte.
- **Inicio** conserva su recorrido narrativo, con citas breves que enlazan a la división donde vive cada pasaje.
- **SpecKit** y **Acerca de** hablan del sitio y de la adaptación. Enlazan al núcleo, pero no alojan secciones suyas.

## 5. Lo que se deshace y lo que se conserva

- **Se deshace:**
  - la asignación de casas por ruta (`casas.ts`), que se simplifica: cada sección tiene una sola división;
  - las páginas Aplicación y Verificación, que se reemplazan por las divisiones 4 a 9;
  - la página de texto íntegro;
  - el menú de siete superficies.
- **Se conserva:**
  - las diez páginas de principio;
  - la lectura del canon desde su fuente;
  - las traducciones nodo a nodo;
  - la regla de una sola ubicación por pasaje;
  - el panel «En esta sección»;
  - la búsqueda decidida;
  - las mejoras para móvil del análisis de KiwiDesk (índice plegado, sección actual, copiar enlace, tablas).

## 6. Consecuencias para el PRD y cómo seguiría

El análisis no se hizo desde el PRD, pero implementarlo exige cambiarlo: arquitectura de información (§18.1–§18.3), `FR-003`, `FR-007`, `FR-022`, la navegación global (§18.2), la búsqueda como `FR-023` y la matriz (§33). Solo la autoridad de producto puede decidir ese PRD v1.2.

Después: especificación y plan → `converge` → `analyze` y conformidad → presentación → `implement` solo con autorización. La ronda temprana de comprensión observa si las divisiones son coherentes para las personas.
