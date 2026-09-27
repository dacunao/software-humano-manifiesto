# Requisitos de instalación

**Léelo antes de tocar cualquier archivo.** Este documento existe porque la instalación del paquete se detuvo cuatro veces en su primera aplicación real, y en todos los casos por requisitos de entorno que nadie había declarado.

Su propósito es que sepas, desde el primer minuto, qué necesita el entorno y cómo comprobarlo. No instala nada ni modifica nada.

## Comprobación automática

Ejecuta primero:

```bash
tools/speckit/preflight.sh
```

Verifica los seis requisitos de este documento, informa qué hacer ante cada fallo y sale con código 1 si hay bloqueos. **Si reporta un bloqueo, detente e informa a la persona responsable.** No intentes rodearlo por iniciativa propia.

El resto de este documento explica cada requisito, por qué existe y qué hacer cuando falla.

---

## Requisito 1 · Repositorio Git con línea base

**Qué hace falta.** Un repositorio Git en la raíz del proyecto, con el árbol de trabajo limpio antes de instalar.

**Comprobación.**

```bash
git rev-parse --show-toplevel
git status --short
```

**Por qué.** El método exige distinguir en todo momento los cambios que produce la instalación de los cambios que ya existían. Sin un commit base esa distinción es imposible, y la comprobación de límites del paso 7 de la instrucción 01 pierde su evidencia.

**Si falla.**

- Sin repositorio: pide autorización para ejecutar `git init` y crear un commit base con el contenido actual. No lo hagas sin autorización.
- Con cambios sin confirmar: pide que se confirmen o se guarden antes de instalar.

**Nota sobre dónde descomprimir.** El paquete debe quedar **en la raíz del repositorio**, no en una subcarpeta. Un archivo `.zip` descomprimido con doble clic suele crear una carpeta intermedia. Si `SHA256SUMS`, `AGENTS.md` y `docs/` no están en la raíz junto a `.git`, mueve el contenido antes de continuar. `SHA256SUMS` usa rutas relativas y sigue verificando después de mover el paquete completo.

---

## Requisito 2 · SpecKit dentro del rango `>=1.0.0,<2.0.0`

**Qué hace falta.** Una instalación de SpecKit cuya versión esté dentro del rango que declaran las cuatro capas del método.

**Comprobación.**

```bash
specify --version
```

**Por qué.** Las cuatro capas declaran ese rango en `requires.speckit_version`. La `1.0.0` es el piso porque es la primera versión donde la composición de comandos conserva el frontmatter del core cuando la capa del preset no declara uno, y de eso dependen los `handoffs`, la descripción nativa y los `scripts`. Fuera de él, la instalación puede rechazarse y varios comandos que la instrucción 01 prescribe no existen. Un síntoma diagnóstico útil: si `specify preset list --json` responde `No such option: --json`, la versión está por debajo del rango.

**Si falla — y esto es importante.** No actualices la instalación global por reflejo.

SpecKit **fija su versión por proyecto**: cada `.specify/init-options.json` registra el `speckit_version` con el que fue generado, y las plantillas y scripts viven dentro de cada proyecto. Si en este equipo hay otros proyectos SpecKit, una actualización global pone una versión distinta delante de todos ellos.

Comprueba antes qué más hay en el equipo:

```bash
find ~ -maxdepth 4 -name '.specify' -type d 2>/dev/null
```

Tienes dos salidas reales:

**A · Instancia aislada para este proyecto (preferible cuando existen otros proyectos).** No toca la instalación global:

```bash
tools/speckit/specify --version
```

El envoltorio incluido en el paquete fija la versión mediante `uvx` y deja intacta la instalación global. Para probar otra versión sin editarlo: `SPECKIT_REF=v1.0.9 tools/speckit/specify version`.

**B · Actualización global.** Válida cuando no hay otros proyectos, o cuando se decide migrarlos todos a la vez:

```bash
specify self upgrade
```

Ambas son decisiones humanas. Presenta las dos con su consecuencia y espera respuesta.

---

## Requisito 3 · Un `python3` con PyYAML en el `PATH`

**Este es el requisito que más instalaciones detiene.**

**Qué hace falta.** Que el primer `python3` del `PATH` pueda importar `yaml`.

**Comprobación.**

```bash
python3 -c 'import yaml; print("PyYAML", yaml.__version__)'
```

**Por qué.** `.specify/scripts/bash/common.sh` toma el primer `python3` del `PATH` para componer plantillas de presets. Si ese intérprete no tiene PyYAML, **toda resolución de plantillas falla**:

```
Error: PyYAML is required to resolve preset template composition
ERROR: Could not resolve required spec-template from the template override stack
```

Eso bloquea `specify`, `plan` y `tasks`, es decir todo el ciclo posterior a la instalación. El mensaje no dice qué hacer, y en macOS con Homebrew es el estado por defecto: el Python de Homebrew no trae PyYAML y el del sistema sí.

**Si falla.** No fuerces la instalación sobre un Python gestionado. En macOS con Homebrew, `pip install --user pyyaml` lo rechaza PEP 668, y `--break-system-packages` produce la advertencia del propio Homebrew de que puede romper la instalación.

Usa el shim incluido en el paquete, que delega en un intérprete que sí tiene PyYAML:

```bash
PATH="$PWD/tools/speckit/shim:$PATH" .specify/scripts/bash/resolve-template.sh spec-template
```

Antepón ese `PATH` **a toda invocación** de un script de `.specify/scripts/bash/`: `resolve-template.sh`, `check-prerequisites.sh`, `create-new-feature.sh`, `setup-plan.sh` y `setup-tasks.sh`.

No modifiques `.specify/scripts/` para evitar el shim: son copias generadas por SpecKit y una actualización las reescribiría.

---

## Requisito 4 · Integración de agente elegida por una persona

**Qué hace falta.** Saber con qué integración se inicializará SpecKit. **No la elijas por inferencia.**

**Comprobación.**

```bash
specify check
```

Lista las integraciones y cuáles tienen su herramienta instalada. Las basadas en IDE no son verificables por línea de comandos; su ausencia en la lista de disponibles no significa que no estén.

**Por qué.** La integración determina cómo se invocan los ocho comandos compuestos. Si eliges una que la persona no usa, los comandos quedan registrados donde nadie los ejecutará.

**Si falla.** Presenta las alternativas reales, indicando cuáles fueron detectadas y cuáles no pueden verificarse, y espera una decisión.

---

## Requisito 5 · La sesión del agente debe poder invocar los comandos registrados

**Qué hace falta.** Que el agente pueda ejecutar realmente el comando de constitución de la integración activa.

**Por qué.** El paso 5 de la instrucción 01 exige materializar la constitución invocando el comando registrado, y prohíbe copiar la plantilla a mano como sustituto.

**La trampa.** Muchos agentes cargan su catálogo de comandos **al iniciar la sesión**. Si ejecutas `specify init` y enseguida intentas invocar el comando en la misma sesión, no existirá todavía:

```
Unknown skill: speckit-constitution
```

**Por eso la instalación normalmente requiere dos sesiones:**

1. Sesión 1: comprobar entorno, inicializar SpecKit, instalar y verificar las tres capas instalables.
2. Sesión 2, iniciada de nuevo en el mismo directorio: materializar y verificar la constitución.

Es lo esperado, no un error. Plánificalo desde el inicio e infórmalo a la persona antes de empezar, para que no lo interprete como una falla.

---

## Requisito 6 · Autorizaciones humanas previas

Ninguna de estas acciones puede ejecutarse por iniciativa del agente. Consíguelas antes de empezar:

| Acción | Cuándo se necesita |
|---|---|
| `git init` y commit base | El proyecto no es todavía un repositorio |
| `specify init` | No existe `.specify/` |
| Actualizar SpecKit global | La versión está fuera de rango y se descarta la instancia aislada |
| Elegir la integración de agente | Siempre |
| Usar `--force` en `specify init --here` | El directorio no está vacío, que es lo habitual |
| Declarar una excepción aprobada | El proyecto no puede cumplir algo todavía. **Es decisión de la autoridad de producto, no del agente** |

Sobre el último punto, que la versión anterior de esta instrucción prohibía de forma ambigua: `--force` significa cosas distintas según el comando.

- En **`specify preset add`**, implica sobrescribir una instalación existente. **No lo uses.**
- En **`specify init --here`**, únicamente omite la confirmación interactiva de un *merge*, y es necesario en sesiones no interactivas porque el paquete ya ocupa la raíz. Úsalo solo con un commit base establecido, y verifica inmediatamente después con `git status --short` y `shasum -a 256 -c SHA256SUMS`.

---

## Checklist previo a instalar

Copia esto en tu informe inicial y complétalo con evidencia real, no con supuestos.

```text
[ ] 1. Repositorio Git en la raíz, árbol limpio        · git rev-parse --show-toplevel && git status --short
[ ] 2. Paquete en la raíz, integridad verificada       · shasum -a 256 -c SHA256SUMS   → todos OK
[ ] 3. SpecKit dentro de >=1.0.0,<2.0.0                · specify --version
[ ]    3b. Si está fuera de rango: decisión humana registrada sobre aislar o actualizar
[ ] 4. python3 del PATH importa yaml                   · python3 -c 'import yaml'
[ ]    4b. Si no: shim en uso y documentado
[ ] 5. Integración de agente elegida por una persona   · specify check
[ ] 6. Autorización para inicializar SpecKit
[ ] 7. Consciencia de que la constitución requerirá una sesión nueva
[ ] 8. Las tres capas presentes en el paquete    · ls tools/speckit/ → preset, conformidad, workflow
```

Con los ocho puntos resueltos, continúa con [`01_INSTALAR_Y_VERIFICAR_SPECKIT.md`](01_INSTALAR_Y_VERIFICAR_SPECKIT.md).

Si alguno queda abierto, **no instales**. Informa el hecho observado, la evidencia, el impacto, la decisión requerida y la acción que no ejecutaste.
