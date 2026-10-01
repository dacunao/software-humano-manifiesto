# Software Humano — Especificación visual compartida

**Versión:** 1.0.1 (2026-10-01). Reemplaza a la 1.0, que se conserva sin cambios como registro.  
**Ámbito:** `softwarehumano.com` y `manifiesto.softwarehumano.com`  
**Objetivo:** servir como fuente de verdad para el agente de IA que implementa ambos sitios.
**Cambios de la 1.0.1** (aprobados por Damián Acuña el 2026-10-01): en §8, el selector del modo oscuro pasa de `[data-theme="dark"]` a `[data-tema="oscuro"]`, que es lo que implementan los dos sitios (estándar común, B4 y B5). Nada más cambia. Lo propio de un sitio va en su anexo declarado, por ejemplo el flywheel del sitio comercial (estándar común, §3).

---

## 1. Decisión de diseño

Software Humano tendrá **un solo sistema visual** para sus dos sitios.

- `softwarehumano.com` presenta la marca, su propósito y el tipo de productos que construye.
- `manifiesto.softwarehumano.com` desarrolla las ideas, los principios y el criterio que orientan esos productos.
- Ambos sitios deben sentirse como partes de una misma entidad. No deben parecer marcas hermanas ni proyectos independientes.

La identidad debe transmitir claridad, criterio, confianza y movimiento. Debe facilitar la lectura y la acción sin convertir la tecnología en espectáculo.

## 2. Reglas no negociables

1. Usar **Noto Sans como única familia tipográfica** en títulos, párrafos, navegación, botones, citas, paneles, formularios y modales.
2. Eliminar la tipografía serif que aparece actualmente en titulares y encabezados del sitio del Manifiesto.
3. Mantener el fondo cálido y editorial del modo claro, pero normalizarlo con la paleta definida en este documento.
4. Reemplazar el azul genérico actual por el índigo oficial de Software Humano.
5. Usar los cuatro colores del ciclo únicamente cuando comuniquen su significado. No repartirlos como decoración.
6. No usar gradientes, brillos, sombras profundas, texturas tecnológicas ni animaciones ornamentales.
7. Cumplir WCAG 2.2 AA para contraste, foco visible, navegación por teclado y tamaño de objetivos interactivos.
8. Mantener una experiencia equivalente en modo claro y oscuro.

---

## 3. Qué conservar y qué corregir del diseño actual

### Conservar

- La arquitectura editorial con encabezado persistente, tabla de contenidos lateral y área principal de lectura.
- La revelación progresiva de contenido mediante secciones expandibles.
- El panel diferenciado para el texto canónico.
- La búsqueda en modal con foco visible.
- La existencia de modos claro y oscuro.
- La amplitud de los márgenes y la sensación de calma.
- La jerarquía entre contenido introductorio, contenido canónico y material de apoyo.

### Corregir

| Situación actual | Acción requerida |
| --- | --- |
| Titulares y encabezados en serif | Sustituirlos por Noto Sans. Construir la jerarquía mediante tamaño, peso y espacio. |
| Azul de interfaz sin relación clara con la marca | Usar Índigo `#3F51C6` como color interactivo principal. |
| Navegación lateral densa y con pesos similares | Reducir contraste de opciones inactivas y destacar solo grupo, página activa y posición actual. |
| Página activa representada como una caja blanca similar a un campo | Usar fondo suave, borde izquierdo de 3 px y texto semibold. No debe parecer un input. |
| Negro verdoso en modo oscuro | Usar una escala oscura derivada de Tinta `#18212C`. |
| Colores de acento usados como texto pequeño | Reservarlos para fondos, bordes, indicadores e ilustraciones, salvo combinaciones accesibles expresamente definidas. |
| Grandes titulares con apariencia editorial dependiente de otra fuente | Recrear el carácter editorial con Noto Sans, peso 500, interletraje negativo y altura de línea compacta. |

---

## 4. Paleta oficial

### 4.1 Colores de identidad y ciclo

| Token | Color | Significado | Uso principal |
| --- | --- | --- | --- |
| `--sh-indigo` | `#3F51C6` | Comprender / Prisma | Acción primaria, enlaces, foco, inicio del ciclo y claridad. |
| `--sh-turquoise` | `#269C91` | Decidir | Indicadores de decisión, transición y criterio. |
| `--sh-coral` | `#F26B4A` | Ejecutar / Catalizador | Acción dentro del ciclo, progreso y ejecución. |
| `--sh-amber` | `#F2B544` | Aprender | Aprendizaje, advertencias y retroalimentación. |
| `--sh-ink` | `#18212C` | Identidad | Texto principal, logotipo tipográfico y superficies de alta autoridad. |

El ciclo se representa siempre en este orden:

**Comprender → Decidir → Ejecutar → Aprender → volver a Comprender.**

“Volver a comprender” no es una quinta etapa. Es el retorno al inicio del ciclo y debe reutilizar el índigo.

### 4.2 Neutros — modo claro

| Token | Valor | Uso |
| --- | --- | --- |
| `--sh-canvas` | `#F7F6F2` | Fondo general cálido. |
| `--sh-surface` | `#FFFFFF` | Modales, paneles elevados y campos. |
| `--sh-text` | `#18212C` | Texto principal. |
| `--sh-text-muted` | `#52606D` | Texto secundario, metadatos y ayudas. |
| `--sh-subtle` | `#EEF1F4` | Fondos discretos y estados hover. |
| `--sh-border` | `#D9DEE3` | Divisores y bordes. |

### 4.3 Neutros — modo oscuro

| Token | Valor | Uso |
| --- | --- | --- |
| `--sh-canvas` | `#101820` | Fondo general. |
| `--sh-surface` | `#18212C` | Navegación, paneles y modal. |
| `--sh-surface-raised` | `#202C38` | Elementos elevados y texto canónico. |
| `--sh-text` | `#F7F6F2` | Texto principal. |
| `--sh-text-muted` | `#B7C0C8` | Texto secundario. |
| `--sh-border` | `#33404C` | Divisores y contornos. |
| `--sh-interactive` | `#AAB4FF` | Enlaces y foco sobre superficies oscuras. |

### 4.4 Tintes de apoyo

Usar estos fondos para comunicar significado sin saturar la página:

| Etapa | Fondo suave | Combinación |
| --- | --- | --- |
| Comprender | `#EEF0FB` | Texto Tinta + borde Índigo. |
| Decidir | `#E8F5F3` | Texto Tinta + borde Turquesa. |
| Ejecutar | `#FFF0EC` | Texto Tinta + borde Coral. |
| Aprender | `#FFF7E3` | Texto Tinta + borde Ámbar. |

### 4.5 Proporción de uso

- **75 %:** fondos Papel y Blanco.
- **20 %:** Tinta, grises y bordes.
- **5 %:** colores del ciclo.

Esta proporción es una orientación visual, no una fórmula de cálculo. Si una pantalla parece multicolor, hay demasiado acento.

### 4.6 Combinaciones accesibles

- Índigo como fondo: usar texto blanco.
- Turquesa, Coral o Ámbar como fondo: usar texto Tinta.
- Sobre modo oscuro, usar `#AAB4FF` para enlaces y anillos de foco; el índigo original no alcanza contraste suficiente como texto pequeño.
- No usar blanco sobre Ámbar.
- No usar blanco como texto pequeño sobre Turquesa o Coral.
- No usar Turquesa, Coral o Ámbar para párrafos sobre Papel o Blanco.
- Nunca comunicar un estado únicamente mediante color: agregar texto, icono o cambio de forma.

---

## 5. Sistema tipográfico

### 5.1 Familia

Usar exclusivamente:

```css
font-family: "Noto Sans", system-ui, -apple-system, BlinkMacSystemFont,
  "Segoe UI", sans-serif;
```

Priorizar archivos WOFF2 autoalojados para reducir dependencias y mejorar rendimiento. Cargar solo los estilos necesarios:

- `400`: lectura y párrafos.
- `500`: titulares grandes, navegación y controles.
- `600`: encabezados, etiquetas activas y énfasis.
- `400 italic`: solo si existen citas o fragmentos que realmente requieran cursiva.

No usar 700, 800 o 900 como recurso habitual. La voz visual debe ser firme, no estridente.

```css
@font-face {
  font-family: "Noto Sans";
  src: url("/fonts/NotoSans-Variable.woff2") format("woff2-variations");
  font-style: normal;
  font-weight: 100 900;
  font-display: swap;
}
```

### 5.2 Escala recomendada

| Rol | Tamaño | Peso | Altura de línea | Interletraje |
| --- | --- | --- | --- | --- |
| Display de portada | `clamp(3rem, 7vw, 6.5rem)` | 500 | `0.98` | `-0.045em` |
| H1 de artículo | `clamp(2.5rem, 5vw, 5rem)` | 600 | `1.03` | `-0.035em` |
| H2 | `clamp(2rem, 3.5vw, 3.25rem)` | 600 | `1.12` | `-0.025em` |
| H3 | `clamp(1.4rem, 2vw, 2rem)` | 600 | `1.2` | `-0.015em` |
| Introducción | `clamp(1.2rem, 1.8vw, 1.5rem)` | 400 | `1.55` | normal |
| Cuerpo | `1.125rem` escritorio / `1.0625rem` móvil | 400 | `1.65` | normal |
| UI y navegación | `0.9375rem` | 500 | `1.4` | normal |
| Etiqueta | `0.75rem` | 600 | `1.4` | `0.08em` |

Reglas:

- Limitar los párrafos a `68ch`.
- Limitar el texto introductorio a `54ch`.
- Usar mayúsculas solo en etiquetas breves: `P01`, `PRINCIPIOS`, `TEXTO CANÓNICO`.
- No justificar párrafos.
- No centrar texto de lectura extensa.
- Evitar líneas huérfanas en titulares mediante `text-wrap: balance`.
- Aplicar `text-wrap: pretty` a párrafos cuando sea compatible.

---

## 6. Uso semántico del color

Los colores del ciclo no son cuatro alternativas estéticas. Cada uno tiene una función.

### Manifiesto

- Usar Índigo como color interactivo general: enlaces, foco y acción primaria.
- Usar Tinta para paneles de texto canónico y contenidos de autoridad.
- Usar Ámbar para advertencias y notas de cautela.
- Usar Turquesa, Coral y Ámbar solo cuando el contenido trate explícitamente de decidir, ejecutar o aprender.
- No asignar un color del ciclo a una sección por conveniencia visual.

### Sitio comercial

- Usar los cuatro colores en el flywheel del ciclo y en la explicación conceptual de Prismas y Catalizadores.
- Prisma se identifica prioritariamente con Índigo.
- Catalizador se identifica prioritariamente con Coral.
- Decidir usa Turquesa como transición entre comprensión y acción.
- Aprender usa Ámbar y devuelve visualmente al Índigo de Comprender.
- El único CTA principal de la etapa actual, **Leer el Manifiesto**, debe usar Índigo.

---

## 7. Reglas de componentes

### 7.1 Encabezado global

- Fondo igual al canvas, con borde inferior de 1 px.
- Altura mínima: `64px` en escritorio y `56px` en móvil.
- Marca alineada a la izquierda; navegación y utilidades a la derecha.
- Texto Noto Sans 500.
- El cambio de tema, idioma y búsqueda deben tener nombre accesible y objetivo mínimo de `44 × 44 px`.
- Evitar sombras. El borde y el espacio deben separar el encabezado del contenido.

### 7.2 Navegación lateral del Manifiesto

- Ancho recomendado: `256px`.
- Grupo: etiqueta en 12 px, semibold, mayúsculas y espaciado amplio.
- Elemento inactivo: texto secundario, fondo transparente.
- Hover: fondo `--sh-subtle`.
- Elemento activo: texto Tinta en 600, fondo suave Índigo y borde izquierdo Índigo de 3 px.
- No usar una caja blanca completa para la selección.
- En móvil, convertirla en un botón **Contenido** que despliegue un panel. No mantener una columna lateral comprimida.

Ejemplo:

```css
.toc-link[aria-current="page"] {
  color: var(--sh-text);
  background: var(--sh-indigo-soft);
  border-inline-start: 3px solid var(--sh-indigo);
  font-weight: 600;
}
```

### 7.3 Botones

- Primario claro: fondo Índigo, texto blanco.
- Primario oscuro: fondo `#AAB4FF`, texto Tinta.
- Secundario: fondo transparente, borde y texto del color principal de texto.
- Radio: `8px`; no usar cápsulas salvo en etiquetas.
- Altura mínima: `44px`.
- El texto debe describir la acción: **Leer el Manifiesto**, no **Saber más**.

### 7.4 Enlaces

- Modo claro: Índigo.
- Modo oscuro: `#AAB4FF`.
- En contenido corrido, usar subrayado además del color.
- En navegación, el contexto y el estado activo pueden sustituir el subrayado.

### 7.5 Panel de texto canónico

- Modo claro: fondo Tinta, texto Papel.
- Modo oscuro: fondo elevado `#202C38`, texto Papel y borde `#33404C`.
- Radio máximo: `12px`.
- Padding: `clamp(1.5rem, 4vw, 3rem)`.
- No añadir sombra pesada ni efectos de vidrio.
- La etiqueta **Texto canónico** debe ser visible pero secundaria.

### 7.6 Secciones expandibles

- Usar un botón real con `aria-expanded` y `aria-controls`.
- Mantener visible el título aunque la sección esté cerrada.
- Icono chevron simple; rotación máxima de `160 ms`.
- El contenido debe aparecer en el flujo, no en un modal.
- Respetar `prefers-reduced-motion`.

### 7.7 Búsqueda

- Mantener el patrón de modal observado en las capturas.
- Cambiar el título del modal a Noto Sans 600.
- Ancho máximo: `720px`; margen lateral mínimo: `16px`.
- Input de búsqueda con altura mínima de `48px`.
- Foco: anillo de 3 px Índigo en claro y `#AAB4FF` en oscuro, con offset de 2 px.
- Resultados con título, fragmento breve y ubicación; no mostrar párrafos completos.
- `Esc` cierra el modal y devuelve el foco al control que lo abrió.

### 7.8 Avisos

- Fondo claro: Ámbar suave `#FFF7E3`.
- Texto: Tinta.
- Borde izquierdo: 4 px Ámbar.
- Incluir icono y título; no depender del color.
- En modo oscuro, usar fondo `rgb(242 181 68 / 14%)`, texto Papel y borde Ámbar.

### 7.9 Flywheel del ciclo

- Mostrar cuatro segmentos, no cinco.
- Mantener el orden horario: Comprender, Decidir, Ejecutar, Aprender.
- La salida de Aprender debe regresar visualmente a Comprender.
- Las etiquetas de producto pueden acompañar la etapa, pero no reemplazarla:
  - Comprender — Prisma.
  - Decidir.
  - Ejecutar — Catalizador.
  - Aprender.
- El centro debe permanecer vacío y protegido, coherente con el símbolo de marca.
- No insertar la palabra “persona” como un paso del ciclo. La persona es el centro y la razón del sistema, no una etapa.

---

## 8. Tokens CSS de referencia

```css
:root {
  color-scheme: light;

  --font-sans: "Noto Sans", system-ui, -apple-system, BlinkMacSystemFont,
    "Segoe UI", sans-serif;

  --sh-indigo: #3f51c6;
  --sh-turquoise: #269c91;
  --sh-coral: #f26b4a;
  --sh-amber: #f2b544;
  --sh-ink: #18212c;

  --sh-indigo-soft: #eef0fb;
  --sh-turquoise-soft: #e8f5f3;
  --sh-coral-soft: #fff0ec;
  --sh-amber-soft: #fff7e3;

  --sh-canvas: #f7f6f2;
  --sh-surface: #ffffff;
  --sh-surface-raised: #ffffff;
  --sh-text: #18212c;
  --sh-text-muted: #52606d;
  --sh-border: #d9dee3;
  --sh-subtle: #eef1f4;
  --sh-interactive: #3f51c6;
  --sh-focus: #3f51c6;

  --radius-sm: 8px;
  --radius-md: 12px;
  --content-reading: 68ch;
  --content-wide: 1200px;
}

[data-tema="oscuro"] {
  color-scheme: dark;

  --sh-canvas: #101820;
  --sh-surface: #18212c;
  --sh-surface-raised: #202c38;
  --sh-text: #f7f6f2;
  --sh-text-muted: #b7c0c8;
  --sh-border: #33404c;
  --sh-subtle: #202c38;
  --sh-interactive: #aab4ff;
  --sh-focus: #aab4ff;
}

body {
  margin: 0;
  color: var(--sh-text);
  background: var(--sh-canvas);
  font-family: var(--font-sans);
  font-size: 1.125rem;
  line-height: 1.65;
  text-rendering: optimizeLegibility;
}

:focus-visible {
  outline: 3px solid var(--sh-focus);
  outline-offset: 2px;
}

.display {
  max-width: 14ch;
  font-size: clamp(3rem, 7vw, 6.5rem);
  font-weight: 500;
  line-height: 0.98;
  letter-spacing: -0.045em;
  text-wrap: balance;
}

.prose {
  max-width: var(--content-reading);
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    scroll-behavior: auto !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 9. Comportamiento por sitio

### `softwarehumano.com`

- Debe ser liviano y directo.
- La portada explica qué es Software Humano en pocas secciones.
- El único CTA principal en esta etapa es **Leer el Manifiesto**.
- La página de productos presenta el ciclo y los conceptos Prisma y Catalizador sin simular que existen productos públicos disponibles.
- AskedAhead no se presenta hasta que esté listo para ser mostrado.
- No incluir assessment, catálogo de servicios ni CTA que lleve a una acción inexistente.

### `manifiesto.softwarehumano.com`

- Debe privilegiar lectura, orientación y profundidad progresiva.
- El contenido canónico tiene mayor peso que cualquier elemento decorativo.
- La navegación lateral, la búsqueda y los vínculos internos deben permitir llegar a una idea sin memorizar la estructura del documento.
- El sistema visual acompaña el texto; no compite con él.

---

## 10. Criterios de aceptación

La implementación se considera correcta cuando cumple todos estos puntos:

- [ ] No queda ninguna tipografía serif ni otra familia distinta de Noto Sans.
- [ ] Los pesos cargados se limitan a los necesarios y usan `font-display: swap`.
- [ ] El color interactivo del modo claro es `#3F51C6`.
- [ ] El modo oscuro usa `#AAB4FF` para enlaces y foco, no el índigo original como texto pequeño.
- [ ] Los cuatro colores del ciclo conservan su significado y no se usan de manera arbitraria.
- [ ] El ciclo tiene cuatro etapas en el orden correcto y Aprender vuelve a Comprender.
- [ ] El ancho de lectura no supera `68ch`.
- [ ] Todo objetivo interactivo mide al menos `44 × 44 px`.
- [ ] La navegación completa puede realizarse con teclado.
- [ ] El foco es visible en ambos temas.
- [ ] Los estados no dependen exclusivamente del color.
- [ ] La tabla de contenidos se convierte en panel o drawer en móvil.
- [ ] No hay gradientes, efectos de vidrio, sombras pesadas ni animación ornamental.
- [ ] No se publican CTAs hacia productos o servicios que aún no estén disponibles.
- [ ] El modo claro y el oscuro conservan la misma jerarquía de información.

---

## 11. Orden recomendado de implementación

1. Incorporar Noto Sans y eliminar todas las declaraciones de fuentes anteriores.
2. Crear los tokens de color, tipografía, radio y ancho de contenido.
3. Aplicar los tokens a `body`, encabezados, enlaces, foco y superficies.
4. Corregir encabezado, navegación lateral, botones, panel canónico y avisos.
5. Corregir modal de búsqueda y secciones expandibles.
6. Implementar y revisar el modo oscuro.
7. Implementar el flywheel con cuatro etapas y retorno al inicio.
8. Verificar responsive, teclado, contraste y reducción de movimiento.
9. Comparar visualmente ambos sitios para confirmar que pertenecen al mismo sistema.

## 12. Instrucción resumida para el agente implementador

> Implementa un único sistema visual para Software Humano y su Manifiesto. Usa Noto Sans en toda la experiencia. Conserva la arquitectura editorial existente, pero sustituye la tipografía serif, normaliza los colores con los tokens definidos y reduce el ruido de la navegación lateral. Usa Índigo para interacción y claridad; Turquesa, Coral y Ámbar solo cuando representen Decidir, Ejecutar y Aprender. Mantén fondos cálidos en claro y una escala oscura derivada de Tinta. La interfaz debe ser sobria, accesible y progresiva: primero orienta, luego permite profundizar. No agregues elementos decorativos, efectos tecnológicos ni CTAs sin destino real.

