# Guía para implementar el Manifiesto Software Humano sobre SpecKit

**Dirigida a un agente.** Lee esto antes de modificar el preset, la extensión, el workflow o el bundle. Cada regla trae la evidencia que la produjo, porque una regla sin su razón se ignora en cuanto estorba.

**Regla cero.** El manifiesto es la única fuente de verdad. SpecKit es la herramienta que lo aplica. Cuando dudes de una capacidad de SpecKit, **lee su código instalado**; cuando dudes de una obligación, **consulta el manifiesto**:

```bash
tools/method/consultar.py "<la pregunta>"
```

---

## 1 · Qué mecanismo usar

Elige por lo que SpecKit documenta, no por costumbre.

| Necesitas | Mecanismo | Porque su guía dice |
|---|---|---|
| Cambiar el contenido de una plantilla o un comando existente | **preset** | *«Enforce organizational or regulatory standards in existing templates»* |
| Agregar un comando, un script o un proceso nuevo | **extension** | *«Add a new command, capability, or process»*. Un preset **no puede** agregar capacidades |
| Que algo se ejecute fuera del agente y pueda detener el trabajo | **workflow** | Sus pasos `shell` corren por `subprocess`; `gate` aborta con código distinto de cero |
| Distribuir las tres piezas como una unidad versionada | **bundle** | *«Provision a complete role-based setup in one operation»* |

**Antes de elegir, lee las alternativas y di cuáles descartaste.** Si la respuesta es «no las miré», no es una propuesta. Dos veces costó una versión no hacerlo.

---

## 2 · Comandos del preset

### Regla · un comando del preset NO declara frontmatter

```markdown
{CORE_TEMPLATE}

---

## Lo que el manifiesto exige en esta operación
...
```

**Por qué.** La composición de SpecKit, en `presets/__init__.py`:

```python
fm, layer_body = _split_frontmatter(layer_content)
if strategy == "replace":
    top_frontmatter_text = fm
elif fm:
    top_frontmatter_text = fm
```

Una capa que declara frontmatter **reemplaza el del core**. Una capa que no lo declara **conserva el del core entero**.

**Qué se pierde si lo declaras:** `handoffs` —el encadenamiento nativo entre comandos, por ejemplo *Create Tasks → speckit.tasks*— y la descripción nativa. SpecKit arrastra por su cuenta `scripts`, `agent_scripts` y `argument-hint`, pero **no arrastra `handoffs`**.

**Verificación:** instala y mira el compuesto.

```bash
head -16 .specify/presets/<id>/.composed/speckit.plan.md
```
Debe mostrar `description`, `handoffs` y `scripts` nativos.

### Regla · la descripción queda en su forma nativa

La descripción es la superficie por la que un agente reconoce **cuándo** invocar un comando. La nativa nombra verbo, artefacto y entrada: *«Generate an actionable, dependency-ordered tasks.md … based on available design artifacts»*.

Una descripción que enuncia una garantía —*«deriva tareas para todo el alcance según dependencias»*— **no contiene ninguna situación que el agente pueda reconocer**, y el comando deja de invocarse. Ocurrió, y es la causa observada de que un piloto dejara de usar el método.

No la traduzcas ni la «mejores». Con la regla anterior, esto sale gratis.

### Regla · `{CORE_TEMPLATE}` va primero

El cuerpo del core son las instrucciones que el agente ejecuta; las exigencias del manifiesto son lo último que lee antes de actuar. Es el orden del preset de referencia de SpecKit.

---

## 3 · Plantillas del preset

### Regla · adición, no sustitución

```yaml
- type: "template"
  name: "spec-template"
  file: "templates/spec-addendum.md"
  strategy: "append"
```

**Por qué, medido.** Sustituyendo la plantilla de especificación se pierden:

| | Nativa | Sustituida | Con adición |
|---|---:|---:|---:|
| `## Success Criteria` | 1 | **0** | 1 |
| `### Edge Cases` | 1 | **0** | 1 |
| `NEEDS CLARIFICATION` | 2 | **1** | 2 |
| `__SPECKIT_COMMAND_*__` en plan | 7 | **0** | 7 |

`Success Criteria` y `Edge Cases` son las secciones que el comando `analyze` **busca por su nombre**. Los tokens `__SPECKIT_COMMAND_*__` son los que SpecKit sustituye por la invocación real del agente.

**Excepción única:** la plantilla de constitución se sustituye, porque su contenido es por definición propio.

### Trampa · `strategy` vale `replace` por omisión

Si no lo declaras, sustituyes. En la versión 1.2.0 las tres plantillas se sustituyeron **sin que nadie lo decidiera**.

**Declara siempre `strategy`, incluso cuando quieras el valor por defecto.**

### Trampa · `replaces:` no lo lee nadie

Buscado en todo el paquete: no aparece en ninguna ruta de código. El preset de referencia `lean` lo usa, así que es convención heredada, pero **es un campo inerte**. El mecanismo real es `name` + `strategy`.

---

## 4 · Extensiones

### Esquema mínimo verificado

```yaml
schema_version: "1.0"
extension:
  id: conformidad            # minúsculas y guiones
  name: "…"
  version: "1.0.0"           # semántico
  description: "…"
  category: "quality"        # texto libre
  effect: "read-only"        # solo "read-only" o "read-write"
  author: "…"
  repository: "…"
  license: "MIT"
requires:
  speckit_version: ">=1.0.0,<2.0.0"
provides:
  commands: [...]
  scripts:  [...]
  config:   [...]
hooks:
  before_implement: {...}
```

**Campos obligatorios:** `schema_version`, `extension`, `requires`, `provides`.

### Regla · el nombre del comando lleva el identificador de la extensión

SpecKit registra `speckit.<id>.<verbo>`. Si declaras `speckit.comprobar` con `id: conformidad`, lo registra como `speckit.conformidad.comprobar`. **Declara el nombre completo** para saber cómo se va a invocar.

### Regla · los hooks no son coerción

El texto del comando nativo dice, literalmente: *«After emitting the block above you MUST actually invoke the hook»*. Es una instrucción dirigida al agente. **Un agente que no la siga no es detenido por nada.**

Usa hooks como recordatorio en el momento correcto. **La coerción vive en el workflow.**

### Trampa · la ruta de un script instalado

Un script se instala en `.specify/extensions/<id>/scripts/`, que son **cuatro niveles** bajo la raíz del proyecto.

```bash
RAIZ="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../../.." && pwd)"
[ -d "$RAIZ/.specify" ] || { echo "no se encontró .specify"; exit 2; }
```

**La guarda no es opcional.** Contando mal, el script no encuentra ninguna feature y **sale en verde sin haber mirado nada** — el peor modo de fallo de una comprobación.

### Trampa · `provides: script` de un preset no entrega scripts nuevos

Resuelve **por nombre** contra los nativos —`setup-plan.sh`, `resolve-template.sh`—. Es una capa de sustitución. Un script nuevo necesita una extensión.

---

## 5 · Qué está prohibido, siempre

| Prohibido | Por qué |
|---|---|
| **Parafrasear el manifiesto** | Una cita literal es la misma cadena en cada ejecución y se verifica carácter por carácter. Una paráfrasis es texto nuevo que nada puede contrastar. Así «y» se volvió «o» y «criterio de salida» se volvió «puntuación de entrada» |
| **Inventar vocabulario** | El que nombra doctrina sale del manifiesto; el que nombra maquinaria se declara en `docs/method/vocabulario-de-maquinaria.md`. Un concepto inventado para ordenar el manifiesto no es ninguno de los dos |
| **Redactar un cuerpo de comando a mano** | Se generan con `tools/method/generar-comandos.py` desde la compilación |
| **Editar un artefacto generado** | Llevan la marca «no se edita a mano». Se corrige el generador |
| **Modificar el core de SpecKit** | Lo prohíbe el anexo |

---

## 6 · Antes de dar cualquier cambio por bueno

```bash
python3 tools/method/extraer-identificadores.py --comprobar
python3 tools/method/comprobar-vocabulario.py
python3 tools/method/comprobar-conformidad.py
python3 tools/method/generar-mapa-de-cobertura.py
```

Las tres primeras corren también en `tools/build-package.sh` **antes de copiar nada**: un paquete que no demuestra su correspondencia con el manifiesto no se distribuye.

### Y la validación contra la herramienta, que es distinta

Instalar en un proyecto de prueba, **nunca en este repositorio**:

```bash
specify init --here --force --non-interactive --script sh --integration claude
specify preset add --dev <ruta del preset>
specify preset info <id>
specify preset resolve spec-template
specify extension add --dev <ruta de la extensión>
```

Comprueba después:
- el compuesto conserva `description`, `handoffs` y `scripts` nativos;
- la plantilla resuelta conserva sus secciones y tokens nativos;
- los comandos quedaron registrados en el directorio del agente;
- `integration status` da *warning* con los archivos que el preset compone — **ese es el resultado esperado**, no un fallo.

**Correcto en el papel no es probado.** Hasta que se instale y resuelva, no está verificado.

---

## 7 · Límites conocidos de SpecKit

Declarados para que nadie los descubra a medio camino.

- **Los hooks los ejecuta el agente**, no el arnés. No son coerción.
- **No hay operación después de liberar.** El sexto punto de control del manifiesto —observar resultado, fricción, abandono y errores— no tiene equivalente nativo.
- **La plantilla de `tasks` trae `P1`, `P2`, `P3` y `MVP` en duro**, y el anexo los vuelve condicionales. Con adición no se pueden borrar: el addendum declara que solo se usan cuando el fundamento los autorice. Si se observa que el agente sigue asignando MVP por su cuenta, **ahí hay una necesidad técnica demostrada** para sustituir esa plantilla, que es el criterio que el anexo exige para cambiar de mecanismo.
