# Copy del hero de Inicio · borrador

**Estado:** borrador, **no aprobado** (PRD §27.1). Es un insumo de exploración, no contenido del sitio.
**Fecha:** 2026-09-27
**Origen:** sesión «Manifiesto Software Humano: gobernanza inicial», en conversación con Damián Acuña, que lo pidió como «una propuesta que luego evaluaremos». Esa sesión recomendó la opción A; **no hay decisión de la autoridad de producto**.
**Escrito contra:** el núcleo v2.1. **No contra el PRD del sitio**; el contraste con el PRD está al final.

> Las opciones A, B y C de este documento son **titulares**. No tienen relación con las direcciones visuales A, B y C del traspaso del piloto anterior, que tampoco están aprobadas.

---

## Titulares

### Opción A · El costo que se mudó

> ## Construir software se abarató.
> ## El costo no desapareció: se lo pasamos al usuario.
>
> Se paga en atención, en aprendizaje y en decisiones que nadie vino a tomar.
>
> El Manifiesto de Software Humano es una doctrina y un método para construir con IA sin transferirle a la persona la complejidad de la tecnología.

### Opción B · Funciona y aun así falla

> ## Tu producto funciona.
> ## La pregunta es cuánto le cuesta usarlo.
>
> Una interfaz puede no tener un solo error y aun así fracasar por saturación.
>
> Principios, artefactos y pruebas de decisión para construir productos centrados en el progreso de las personas — y un método que los pone delante de quien decide.

### Opción C · La restricción que perdimos

> ## Antes, construir era caro.
> ## Eso nos obligaba a elegir.
>
> Hoy agregar una opción más cuesta minutos, y ya nadie pregunta si vale la pena.
>
> El Manifiesto de Software Humano repone esa pregunta, y le da un lugar en el proceso donde no se puede saltar.

## Bloques que siguen al hero

Sirven con cualquiera de las tres opciones.

> **La complejidad pertenece al sistema** — Que sea complejo construirlo no significa que deba ser complejo usarlo. El equipo la absorbe; la persona no debería enterarse.
>
> **La atención es un recurso del producto** — Cada cosa que mostramos compite con aquello que la persona vino a hacer. Mostrar cinco acciones con el mismo peso la obliga a ordenar una prioridad que el producto ya conocía.
>
> **La persona vino a hacer su trabajo, no a aprender el nuestro** — Cada convención propia que hay que memorizar es trabajo que le trasladamos.

## Respuesta a la objeción «esto es minimalismo»

> **No se trata de mostrar menos.** Ocultar todo produce una primera impresión limpia y un callejón sin salida cuando aparece el caso raro. Se trata de absorber: resolver lo resoluble, traducir lo interno, y conservar la profundidad para quien la necesita.

Según su autora, los bloques y esta línea derivan de `P03`, `P05`, `P06` y de la señal de incumplimiento de `P04`. Los titulares son redacción propia.

---

## Reparos que ya planteó la sesión de origen

- **Idioma.** Las rutas sin prefijo sirven inglés (`FR-019`). Este copy es español para `/es/`. El inglés debe escribirse aparte, no traducirse.
- **Botón «Aplicarlo en tu proyecto».** Promete algo que no existe: el método no está publicado.

## Contraste con el PRD v1.0

Hecho el 2026-09-27 en la sesión que trabaja este repositorio.

| Hallazgo | Fuente | Afecta a |
|---|---|---|
| El copy usa primera persona del plural («se lo pasamos», «nos obligaba», «mostramos», «le trasladamos») y segunda persona («Tu producto»). Choca con la decisión «voz impersonal en el recorrido, con una nota de origen en primera persona» | PRD §29.4, decisión en `AGENTS.md` | Las tres opciones y los bloques |
| El botón «Aplicarlo en tu proyecto» contradice la decisión «solo estado, sin captura»: sin botón, formulario ni enlace sin destino | `FR-010`, PRD §29.6, decisión en `AGENTS.md` | Botón secundario |
| «La persona vino a hacer su trabajo, no a aprender el nuestro» aparece con el mismo formato que los nombres canónicos de `P03` y `P06`, pero no es el nombre de `P05` («La interfaz no debe convertirse en otra tarea»). Debe distinguirse cita canónica de explicación | `FR-017`, PRD §17 (`P07`) | Tercer bloque |
| Todo está en español; la raíz del sitio es inglés | `FR-019`, PRD §19.4 | Todo el copy |
| A y C encajan con los actos 1 y 2 del recorrido («Ahora podemos construir casi cualquier cosa», «Poder construir no significa deber construir»). B se dirige a quien construye, más que al problema | PRD §16, `FR-001` | Elección del titular |

No se elige titular antes de especificar y planificar el contenido de Inicio.
