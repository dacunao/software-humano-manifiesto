# Anexo de aplicación del Núcleo del manifiesto de Software Humano a SpecKit · versión 2.0

**Núcleo que aplica:** Manifiesto para el desarrollo de software humano con inteligencia artificial, versión 2.1
**Autoridad:** Damián Acuña
**Estado del anexo v1.2:** vigente para las instalaciones del preset 1.2.0. Este anexo no lo reemplaza retroactivamente.

---

## 1 · Qué hace este anexo

Convierte el núcleo v2.1 en una adaptación instalable sobre SpecKit. No lo mejora, no lo amplía y no lo interpreta. Toda ampliación metodológica queda fuera de su autoridad.

**La regla que gobierna cualquier incorporación se conserva sin cambios desde la v1.0:**

> Si una disposición de la adaptación no puede trazarse al núcleo v2.1 o a una necesidad técnica inevitable de SpecKit, no pertenece a la adaptación.

La versión 2.0 agrega una segunda regla, y es la que la distingue:

> **Ninguna disposición de la adaptación reformula el núcleo. Lo cita.**

---

## 2 · Por qué existe una versión 2.0

La versión 1.2 se materializó en el preset 1.2.0, que se instaló y se ejecutó en un piloto real. La revisión posterior encontró diez defectos, documentados en `docs/proposals/008`.

**Nueve de los diez no fueron errores de criterio.** Fueron transcripciones y contratos rotos:

| Clase | Casos | Causa |
|---|---|---|
| El núcleo citado de memoria | `SH-SCORE` invertido de criterio de salida a criterio de entrada · una regla inventada y atribuida al núcleo · `P02` debilitado de «y» a «o» · los estados de `V09` rotulados `P08` con pérdida de «recuperación» · `CR04` citado como `CR03` | La adaptación **reformulaba** el núcleo dentro de cada comprobación, y la reformulación podía derivar sin que nada lo detectara |
| Cobertura incompleta | Seis identificadores del mapa mínimo sin citar | Nada comprobaba el mapa contra los comandos |
| Contratos nativos rotos | `handoffs` borrados en los cinco comandos que los declaran · tres tokens `__SPECKIT_COMMAND_*__` perdidos · secciones que los comandos nativos buscan por nombre, renombradas o ausentes | Sustitución total de plantillas y de frontmatter, sin comprobar qué se perdía |

Ninguna capa de la versión 1.2 podía detectar uno solo de esos defectos. **Ese es el problema que resuelve esta versión**, y la respuesta no es más cuidado: es que la adaptación deje de tener un lugar donde equivocarse y un build que lo compruebe.

---

## 3 · La decisión doctrinal: el núcleo como fuente, no como carga de ejecución

### 3.1 · Lo que cambia

La versión 1.2 instalaba el núcleo completo como constitución operativa, y las ocho operaciones lo cargaban entero. Medido: **24.280 tokens, el 66% del costo de cada operación**, del cual un **19%** —propósito del documento, ejemplo aplicado, texto canónico, influencias y notas— no lo utiliza ninguna operación.

La versión 2.0 establece que:

1. **El núcleo v2.1 completo viaja en el paquete**, canónico, íntegro, versionado y con su licencia. Es la fuente y conserva toda la autoridad.
2. **La constitución operativa es su proyección compilada**: cada disposición del núcleo, con su identificador, su texto normativo **citado literalmente** y la ubicación donde se verifica.
3. **Ninguna disposición desaparece.** Las setenta y seis están presentes. Lo que no se transporta a cada operación es el aparato que explica por qué existen.

### 3.2 · Por qué esto no es el resumen que la versión 1.2 prohibía

La v1.2 prohibió *«un resumen, una selección de principios ni una referencia que el agente pueda omitir»*. La preocupación era correcta: un resumen es como muere una doctrina.

Lo que esta versión autoriza es distinto en tres puntos verificables:

- **No hay reformulación.** El texto de la constitución compilada es el texto del núcleo, carácter por carácter. Un resumen reescribe; esto cita.
- **La selección es mecánica y no es de juicio.** Se hace por nombre de encabezado —el contenido normativo de cada principio—, no por decisión de quién compila. Está generada por `tools/method/extraer-identificadores.py` y es reproducible.
- **Ninguna disposición puede omitirse.** El recuento por familia se comprueba en el build. Faltar una detiene la construcción del paquete.

### 3.3 · El riesgo que esta decisión introduce, y quién lo cubre

**Una obligación puede vivir fuera del bloque normativo de su disposición.** Si el deber está redactado en «Qué significa» y no en «Reglas de diseño», la selección mecánica lo pierde.

Este riesgo no se cubre con una comprobación automática. Se cubre con **una revisión humana, una sola vez por disposición**, que aprueba la cita elegida. Esa aprobación queda registrada con la huella del texto aprobado, y cualquier cambio posterior en la cita o en su fuente exige aprobarla de nuevo.

Es el único punto de esta adaptación donde se requiere juicio humano irreemplazable, y está acotado a un acto único y verificable.

---

## 4 · Arquitectura: cuatro mecanismos nativos

La versión 1.2 usó solo presets y pospuso los demás mecanismos con esta condición, que conserva su vigencia:

> No se crea una extensión, un workflow ni un bundle **mientras no exista una necesidad técnica demostrada que el preset no pueda resolver**.

**La condición está cumplida, por dos vías independientes y verificadas:**

1. La guía oficial de personalización establece que un preset *«cannot add entirely new capabilities»*. Una comprobación de conformidad es una capacidad nueva.
2. El motor de workflows de SpecKit provee `ShellStep` —*«Run a local shell command (non-agent)»*— y `GateStep`, con `on_reject: abort` y código de salida distinto de cero. **Es el único mecanismo de SpecKit que el agente no ejecuta y no puede omitir.** La versión 1.2 lo descartó sin evaluarlo.

### 4.1 · Reparto de capas

| Capa | Mecanismo | Qué lleva | Fundamento |
|---|---|---|---|
| Doctrina en los artefactos | **preset** | Plantillas y composición de los ocho comandos | *«Enforce organizational or regulatory standards in existing templates»* |
| Comprobación de conformidad | **extension** | El script de conformidad, sus comandos y su configuración por proyecto | *«Add a new command, capability, or process»* |
| Cumplimiento | **workflow** | Pasos `shell` de conformidad, `gate` de autoridad humana y `while` de clarificación | *«Automate a multi-step process»*; único lugar con coerción real |
| Distribución | **bundle** | Fija las versiones de las tres capas anteriores | *«Provision a complete role-based setup in one operation»* |

Ninguna capa agrega etapas, artefactos ni controles metodológicos al núcleo. Las cuatro materializan lo que el núcleo ya exige.

---

## 5 · Formato del control compilado

**Esta sección es el corazón de la versión 2.0.** Fija la forma en que una obligación del núcleo se convierte en una comprobación ejecutable.

### 5.1 · La unidad compilada es el objeto, no el identificador

El índice operativo del núcleo declara que sus identificadores **no agregan doctrina**: son una capa de navegación que señala contenido ya aprobado. Son direcciones, no deberes.

Y el núcleo enuncia el mismo deber varias veces, desde disposiciones distintos, para reforzarlo: un paso del flujo, un artefacto donde vive, una instrucción del contrato, un contenido de informe, una condición de detención. **Compilar por identificador produce tres o cuatro comprobaciones que dicen lo mismo**, y el agente las cuenta como protecciones distintas.

Por eso la unidad compilada es **el objeto sujeto a obligación**, y un objeto entra solo si el manifiesto lo nombra. El núcleo nombra cosas en tres lugares: sus artefactos, sus dimensiones de verificación y el fundamento de producto. **Las obligaciones se adhieren a cosas que el manifiesto ya nombra; no crean cosas nuevas.**

El inventario vive en `docs/method/inventario-de-objetos.md`, generado desde el mapa de identificadores.

### 5.2 · La forma

Cada objeto declara un control, y ese control declara esto y nada más:

```yaml
- objeto: Estados
  identificadores: [P08, A05, V09, O07]
  cita:
    de: P08
    texto: "Diseñar y verificar estados normales, vacíos, de carga, error, éxito y recuperación."
  evidencia: "plan.md#modelo-de-estados · una fila por componente y por recorrido"
  operaciones: [plan, implement]
```

| Campo | Qué es | Cómo se verifica |
|---|---|---|
| `objeto` | Una cosa que el núcleo nombra | Aparece en el inventario generado |
| `identificadores` | **Todos** las disposiciones del núcleo que hablan de ese objeto | Cada uno existe en el mapa de identificadores |
| `cita.de` | Dónde está el texto que enuncia la obligación | Es uno de los `identificadores`, o una dirección de sección |
| `cita.texto` | **El texto del núcleo, literal** | Aparece carácter por carácter en esa dirección |
| `evidencia` | Artefacto y sección donde se responde | El artefacto y la sección existen |
| `operaciones` | Comandos que activan el control | Coherente con el mapa mínimo de la sección 6 |

`identificadores` es una lista porque el reforzamiento es del núcleo y no debe perderse: quien lea el control debe poder ver todos las disposiciones desde los que el manifiesto sostiene ese deber.

### 5.3 · Direcciones por sección

Cuatro pasajes normativos del núcleo no tienen identificador. Dos resultaron cubiertos por disposiciones identificadas; los otros dos se citan por **la dirección que el propio documento ya tiene**: el nombre de su sección.

```yaml
  cita:
    de: "FLUJO DE TRABAJO § Artefactos ajustados al contexto"
    texto: "Cada artefacto existe para responder una pregunta, no para satisfacer una plantilla."
```

**No se inventa una dirección ni se agrega un identificador al núcleo**: se usa su estructura de encabezados, que el mapa de identificadores ya conoce. La cita sigue siendo literal y verificada.

**Contrapartida declarada.** Una dirección por encabezado es menos estable que un identificador: si el núcleo se reorganiza, se rompe. La comprobación de conformidad lo detecta, porque la cita literal deja de encontrarse. Eso es lo que debe ocurrir.

### 5.4 · Lo que está prohibido

**No existe un campo de redacción propia.** La adaptación no reformula, no resume, no parafrasea y no «traduce a lenguaje accionable» el texto del núcleo dentro de una comprobación.

Esta prohibición no es estilística. Elimina por construcción tres defectos de transcripción observados: **no hay dónde escribir «o» donde el núcleo dice «y», ni «entrada» donde el núcleo dice «salida», porque no hay texto propio que escribir.**

**Una paráfrasis no es una compilación.** Compilar es citar y decir dónde se responde; nada más. El contraejemplo, tomado de un error real cometido al explicar esta misma regla:

| | |
|---|---|
| Núcleo | «**Diseñar y verificar** estados **normales, vacíos, de carga, error, éxito y recuperación**.» |
| Paráfrasis, inadmisible | «cada componente declara sus estados» |
| Compilación, admisible | `cita`: el texto del núcleo, literal · `evidencia`: «plan.md#modelo-de-estados · una fila por componente y por recorrido» |

La paráfrasis perdió la enumeración —el agente elige qué estados—, ablandó «diseñar y verificar» a «declarar» y agregó «componente», que ahí no está.

**La razón es el determinismo.** Una cita literal es la misma cadena en cada ejecución y se verifica carácter por carácter contra la fuente. Una paráfrasis es un texto nuevo: dos agentes pueden leerla distinto, y ninguna comprobación puede contrastarla con el núcleo. Es el mecanismo por el que «y» se volvió «o» y «criterio de salida» se volvió «puntuación de entrada».

#### El vocabulario

**El vocabulario que nombra doctrina sale del manifiesto.** Si el manifiesto ya nombra una cosa, la adaptación usa ese nombre. Ponerle otro no es sinónimo: crea un concepto que el manifiesto no tiene y que nadie puede contrastar con él.

**El vocabulario que nombra la maquinaria de la adaptación es inevitable**, porque el manifiesto no habla de SpecKit ni de archivos: *composición*, *preset*, *plantilla*, *compilar*. Se admite con una condición: **se declara como maquinaria y nunca se presenta como doctrina.**

Lo que no se admite es un tercer caso, y es el que hay que vigilar: **un concepto inventado para ordenar el manifiesto.** No nombra doctrina, porque el manifiesto no lo tiene, y no nombra maquinaria, porque no describe nada técnico. Ordenar el manifiesto no le corresponde a la adaptación.

| Caso | Ejemplo | ¿Admisible? |
|---|---|---|
| Nombra doctrina, con la palabra del manifiesto | «mapa de cobertura», «modelo de estados» | **Sí** |
| Nombra maquinaria, declarada como tal | «composición `wrap`», «mapa de identificadores» | **Sí** |
| Concepto inventado para ordenar el manifiesto | llamar «ángulo» a las disposiciones que hablan de una misma cosa | **No** |

El caso admisible que más cuesta es el primero al revés: darle nombre propio a algo que el manifiesto ya nombró. Ocurrió con «libro mayor» para lo que el núcleo llama **mapa de cobertura**, y con «nivel de conformidad» para lo que la definición de terminado ya resolvía con *excepción explícita y aprobada*.

**Cuando el núcleo enuncia lo mismo dos veces con palabras distintas**, es reforzamiento y no contradicción, salvo que las dos versiones cambien lo que hay que hacer. En ese caso la formulación citable es la del **cuerpo normativo** de la disposición, no la de una tabla de síntesis.

### 5.5 · La excepción, y su gobierno

Un objeto cuyo texto literal no baste para ser operativo puede requerir un enunciado derivado. En ese caso:

1. El enunciado derivado se declara en un campo `derivada`, junto a la `cita` de la que procede.
2. **No se distribuye sin aprobación humana explícita**, registrada con la huella de la cita y de la derivación.
3. El build rechaza toda derivación sin aprobación vigente.

La derivación es la excepción y debe poder contarse. Si la mayoría de los objetos requieren derivarse, la compilación está mal planteada y vuelve a revisión.

### 5.6 · Cómo reporta un control

El núcleo define **dos estados admisibles** en su definición de terminado: «una implementación y una evidencia verificable, **o una excepción explícita y aprobada**». No se agregan otros.

| Estado | ¿Detiene? |
|---|---|
| Tiene implementación y evidencia verificable | No |
| Tiene excepción explícita y aprobada | No |
| Ninguna de las dos | **Sí** |

**El método no rechaza lo incompleto. Rechaza lo que falta sin que nadie lo sepa.** Con eso, un repositorio que nació antes del manifiesto adopta el método declarando excepciones aprobadas, y la operación de convergencia las transforma en evidencia. No hacen falta niveles de conformidad.

### 5.7 · Por qué la evidencia con su ubicación es obligatoria

Una comprobación que no dice **dónde** se responde no es una comprobación: es una afirmación. La versión 1.2 decía «Modelo de estados», que es una categoría y no una ubicación.

Las implementaciones maduras del ecosistema resuelven esto apuntando a artefactos concretos, y es el elemento que a la versión 1.2 le faltaba por completo.

---

## 6 · Mapa mínimo por operación

El núcleo completo conserva autoridad en todo momento. Este mapa organiza la atención; no recorta el manifiesto ni impide consultar cualquier otra disposición aplicable.

### Mapa mínimo por operación

| Operación | Referencias mínimas del núcleo | Foco de la operación |
|---|---|---|
| `constitution` | Núcleo completo e índice `SH-INDEX` | Instalar o verificar la proyección compilada sin reinterpretarla. |
| `specify` | `SH-FUND`, `P01`, `P02`, `P05`–`P07`, `P10`, `D01`, `D02`, `F01`, `F02`, `F04`, `F05`, `A01`–`A04`, `CR01`–`CR05`, `SH-STOP`, `O01`–`O05`, `O09` | Comprender fuente y alcance, conservar el progreso y producir una especificación verificable. |
| `clarify` | `SH-FUND`, `D02`, `SH-STOP`, `STOP01`–`STOP04`, `CR02`, `CR03`, `O01`, `O04`, `O09` | Distinguir supuestos reversibles de decisiones que requieren autoridad humana. |
| `plan` | `P03`, `P04`, `P06`–`P10`, `D03`, `D04`, `F03`, `F06`, `F07`, `A05`–`A08`, `CR03`–`CR06`, `O05`, `O09` | Resolver estrategia, dependencias, riesgos, reglas y complejidad sin modificar alcance. |
| `tasks` | `F02`, `F03`, `F08`, `A02`, `A07`, `CR03`, `CR07`, `O02`, `O07`–`O09` | Convertir todo el alcance planificado en trabajo trazable y verificable. |
| `checklist` | Identificadores de la pregunta de calidad que motive su uso | Mantener el checklist nativo de requisitos sin confundir revisión con completitud. |
| `analyze` | `F02`, `F08`, `A02`, `A07`, `SH-STOP`, `V01`–`V12`, `SH-SCORE`, `SH-AP`, `SH-GOV`, `SH-DONE` | Detectar inconsistencias, omisiones, desvíos doctrinales y falta de evidencia sin modificar archivos. |
| `implement` | `P03`, `P07`–`P10`, `D04`–`D06`, `F08`, `A02`, `A05`, `A07`, `CR06`, `CR07`, `O06`–`O09` | Ejecutar dentro de la autoridad, cubrir estados y conservar trazabilidad y control. |
| `converge` | `F08`, `A02`, `A07`, `CR08`, `O01`–`O09`, `V01`–`V12`, `SH-SCORE`, `SH-AP`, `SH-DONE`, `STOP01`–`STOP07` | Reconciliar el resultado completo y separar cierre técnico de aceptación humana. |

Estas referencias son un mínimo, no una lista excluyente. El riesgo, el contenido del fundamento o una dependencia entre decisiones pueden exigir leer otras partes del núcleo.

**Este mapa se comprueba mecánicamente.** Un comando que no active alguna de sus referencias mínimas detiene la construcción del paquete.

---

## 7 · Conservación de lo nativo

La adaptación es un complemento de SpecKit, no un sustituto. Todo lo que el core provee y la adaptación no necesita cambiar, se conserva intacto **y se comprueba que se conservó**.

### 7.1 · Metadatos de comando

Los comandos adaptados conservan metadatos, entrada del usuario, resolución de plantillas, comprobaciones previas, hooks, **handoffs**, instrucciones secuenciales y reporte final.

**`handoffs` requiere atención explícita.** SpecKit arrastra por su cuenta `scripts`, `agent_scripts` y `argument-hint` al componer con `wrap`, pero **no arrastra `handoffs`**: el wrap sustituye el frontmatter completo. Una composición que no los declare los borra en silencio, y con ellos el encadenamiento nativo entre comandos. Se comprueba en el build.

### 7.2 · Descripciones de comando

La descripción de un comando es la superficie por la que un agente reconoce cuándo invocarlo. **Debe nombrar la operación y su artefacto**, siguiendo la forma nativa —verbo, artefacto, entrada—, y no la garantía que la adaptación ofrece.

Una descripción que enuncia una garantía no contiene ninguna situación que el agente pueda reconocer, y el comando deja de invocarse.

### 7.3 · Plantillas: adición antes que sustitución

**La adaptación prefiere el addendum a la sustitución.** Una plantilla nativa reemplazada pierde, sin señal visible:

- los tokens `__SPECKIT_COMMAND_*__`, que SpecKit sustituye por la invocación real del agente activo;
- los marcadores `NEEDS CLARIFICATION` que los comandos localizan;
- las secciones que los comandos nativos buscan **por su nombre**, como `Constitution Check`, `Success Criteria` y `Edge Cases`.

La sustitución total queda reservada a la plantilla de constitución, cuyo contenido es por definición propio, y a incompatibilidades que la adición no pueda resolver. Cada sustitución debe declarar qué contrato nativo asume y cómo lo preserva.

---

## 8 · Dos modos de ejecución

El método funciona de dos maneras, y ambas son legítimas:

| Modo | Cómo se usa | Qué garantiza |
|---|---|---|
| **Comandos sueltos** | El agente invoca `speckit.*` desde lenguaje natural | Doctrina en los artefactos, trazabilidad y declaración de activación. **El agente puede omitir una comprobación.** |
| **Workflow** | Una persona o una integración continua ejecuta el workflow | Todo lo anterior, más los pasos `shell` de conformidad y los `gate` de autoridad, que el agente no ejecuta y no puede saltarse |

**El workflow es el camino recomendado, no un requisito.** Un método que solo funciona bajo workflow excluye a quien invoca comandos sueltos, y la adopción es el objetivo de esta adaptación.

### Las compuertas no las elige la adaptación

**`SH-GOV § Puntos de control` especifica seis momentos, cada uno con su decisión requerida.** Ninguna compuerta se diseña: se cita.

| Momento que nombra el manifiesto | Dónde cae en el flujo de SpecKit |
|---|---|
| Antes de diseñar | después de `specify` y `clarify`, antes de `plan` |
| Antes de generar código | después de `tasks` y `analyze`, antes de `implement` |
| Durante la construcción | dentro de `implement`, entre bloques |
| Antes de integrar | `analyze`, antes de incorporar el cambio |
| Antes de liberar | `converge`, antes de declarar terminado |
| Después de liberar | **fuera del flujo de SpecKit** |

La compilación literal, con la decisión requerida de cada momento, vive en `docs/method/compuertas-del-metodo.md`, generada. Lo único que aporta la adaptación es **dónde cae cada momento**, que es una necesidad técnica: el manifiesto no habla de SpecKit.

**Una brecha queda declarada.** El manifiesto exige, después de liberar, observar resultado, fricción, abandono y errores, y revisar el fundamento y sus supuestos cuando corresponda. **El flujo de SpecKit termina antes.** Es una brecha de la herramienta, no del método, y se declara en lugar de resolverse en silencio.

Hasta esta versión el anexo afirmaba que las compuertas mínimas eran dos. Las había elegido el agente.

---

## 9 · Conformidad obligatoria antes de distribuir

El paquete no se distribuye si alguna de estas comprobaciones falla. Se ejecutan en el ensamblado y detienen la construcción.

| # | Comprobación |
|---|---|
| 1 | El mapa de identificadores corresponde al núcleo vigente, carácter por carácter |
| 2 | Las setenta y seis disposiciones del núcleo están presentes, con el recuento por familia correcto |
| 3 | Toda `cita` aparece literalmente en la dirección que declara, sea un identificador o una sección |
| 4 | Todo identificador citado por un comando o por un control existe en el núcleo |
| 5 | Cada comando activa, como mínimo, las referencias que la sección 6 le asigna |
| 6 | Toda `evidencia` apunta a un artefacto y una sección que existen |
| 7 | Toda `derivada` tiene aprobación humana vigente para su huella actual |
| 8 | Ningún comando compuesto pierde metadatos que SpecKit no arrastre por su cuenta |
| 9 | Ninguna plantilla pierde tokens, marcadores ni secciones que los comandos nativos requieran |
| 10 | El manifiesto del preset cumple los campos que exige la guía oficial de publicación, incluido `repository` |
| 11 | El preset resuelve sus plantillas y registra sus comandos en una instalación de prueba |
| 12 | Las versiones fijadas por el bundle existen y son compatibles con el rango declarado |
| 13 | Todo término que un artefacto use como doctrina aparece en el núcleo, o está declarado como maquinaria de la adaptación |

---

## 10 · Límites de esta adaptación

Se declaran porque un método que oculta su alcance invita a confiar donde no debe.

- **Nada de lo que ocurre en conversación pasa por control alguno.** Una propuesta hecha en el chat, una pregunta formulada fuera de un comando o un informe presentado de viva voz no llegan a ningún artefacto. Para ese territorio solo existen las instrucciones persistentes del proyecto, que son persuasión.
- **La conformidad comprueba forma, no calidad.** Que exista un criterio sobre esfuerzo o confianza es verificable; que la experiencia resultante sea clara o confiable, no.
- **`V01`–`V12` y las pruebas moderadas con personas no se automatizan.** Son la mitad del método que mide resultado humano, y ninguna capa de esta adaptación las sustituye.
- **Un agente revisando a otro agente no es un control.** Existe medición pública de que una revisión por modelo resultó no correlacionada con pruebas de aceptación ejecutables. La verificación de esta adaptación es determinista o es humana; no es generativa.
- **Una comprobación mal calibrada enseña a ignorarla.** Toda comprobación que produzca falsos positivos de forma sistemática debe corregirse o degradarse a aviso, nunca sostenerse como bloqueante.

---

## 11 · Qué conserva esta versión de la anterior

- La autoridad del núcleo y de la definición de producto, sin cambios.
- El flujo de ocho pasos y los ocho artefactos. **No se agregan etapas.**
- El mapa mínimo por operación y el vocabulario de salida `O01`–`O09`.
- La conservación del checklist nativo de requisitos, sin checklist propio del manifiesto.
- La prohibición de modificar el core de SpecKit.
- Los valores predeterminados que se vuelven condicionales: prioridad, MVP, independencia e incrementalidad siguen disponibles cuando el fundamento las autorice.
- Las rondas nativas de `clarify`, repetidas hasta resolver toda ambigüedad material.

---

## 12 · Fuentes oficiales de SpecKit

- [Repositorio oficial](https://github.com/github/spec-kit)
- [Proceso Agentic SDD](https://github.github.io/spec-kit/reference/agentic-sdd.html)
- [Guía de personalización](https://github.github.io/spec-kit/guides/customization.html)
- [Referencia de presets](https://github.github.io/spec-kit/reference/presets.html)
- [Referencia de extensiones](https://github.github.io/spec-kit/reference/extensions.html)
- [Referencia de workflows](https://github.github.io/spec-kit/reference/workflows.html)
- [Referencia de bundles](https://github.github.io/spec-kit/reference/bundles.html)
- [Guía oficial de publicación de presets](https://github.com/github/spec-kit/blob/main/presets/PUBLISHING.md)
- [Guía de actualización](https://github.github.io/spec-kit/upgrade.html)

---

## 13 · Control de cambios de la versión 2.0

| Área | Ajuste de la versión 2.0 | Contenido que permanece |
|---|---|---|
| Compilación | La unidad es el objeto que el núcleo nombra; prohíbe reformular y prohíbe inventar vocabulario; fija `identificadores` + `cita` literal + `evidencia` | La regla de trazabilidad al núcleo o a una necesidad técnica de SpecKit |
| Constitución | Proyección compilada del texto normativo, generada y verificada; el núcleo íntegro viaja en el paquete | Ninguna disposición puede omitirse; el núcleo conserva la autoridad |
| Mecanismos | Incorpora extensión, workflow y bundle, cumplida la condición que fijó la v1.2 | Solo mecanismos nativos; ninguna etapa metodológica nueva |
| Cumplimiento | Compuertas `gate` y pasos `shell` que el agente no ejecuta | La adaptación no otorga al agente autoridad que el núcleo reserva a las personas |
| Conservación | Doce comprobaciones obligatorias antes de distribuir | Comportamiento nativo de SpecKit donde la adaptación no interviene |
| Modos | Declara el modo de comandos sueltos junto al workflow | El flujo nativo y sus artefactos |
| Límites | Declara explícitamente lo que no cubre | Toda ampliación metodológica queda fuera de su autoridad |

---

## Declaración final

Este anexo no mejora ni expande el manifiesto. Hace que SpecKit lo aplique mediante sus mecanismos nativos, y hace que el incumplimiento se detecte solo.

Toda simplificación técnica es válida mientras conserve la sustancia aprobada. Toda ampliación metodológica queda fuera de su autoridad.
