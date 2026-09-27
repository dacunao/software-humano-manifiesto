# Shim de `python3` con PyYAML

## Por qué existe

`.specify/scripts/bash/common.sh` toma el **primer `python3` del `PATH`** para componer plantillas de presets. Si ese intérprete no puede importar `yaml`, toda resolución de plantillas falla:

```
Error: PyYAML is required to resolve preset template composition
ERROR: Could not resolve required spec-template from the template override stack
```

Eso bloquea `specify`, `plan` y `tasks`: todo el ciclo posterior a la instalación. El mensaje no dice qué hacer.

En macOS con Homebrew es el estado por defecto: el Python de Homebrew no trae PyYAML y el del sistema, en las herramientas de línea de comandos de Xcode, sí.

## Por qué no se arregla instalando PyYAML

En un Python gestionado por Homebrew, `pip install --user pyyaml` es rechazado por [PEP 668](https://peps.python.org/pep-0668/). Forzarlo con `--break-system-packages` produce la advertencia del propio Homebrew de que puede romper la instalación.

Este shim evita ese riesgo sin modificar nada fuera del repositorio.

## Cómo se usa

Antepón este directorio al `PATH` al invocar cualquier script de SpecKit:

```bash
PATH="$PWD/tools/speckit/shim:$PATH" .specify/scripts/bash/resolve-template.sh spec-template
```

Aplica a `resolve-template.sh`, `check-prerequisites.sh`, `create-new-feature.sh`, `setup-plan.sh` y `setup-tasks.sh`.

## Cómo funciona

Recorre una lista de intérpretes conocidos por **ruta absoluta**, y ejecuta el primero que pueda importar `yaml`. Las rutas son absolutas a propósito: un `python3` relativo resolvería al propio shim y produciría una recursión infinita.

Si ninguno sirve, falla con un mensaje explícito en lugar de fallar más adelante y de forma confusa.

## Por qué no se modifica `.specify/scripts/`

Son copias que SpecKit genera en cada proyecto. Una actualización las reescribiría y el arreglo se perdería en silencio. El shim vive fuera de ese directorio y sobrevive a las actualizaciones.

## Cómo saber si lo necesitas

```bash
python3 -c 'import yaml; print("PyYAML", yaml.__version__)'
```

Si falla, lo necesitas. `tools/speckit/preflight.sh` también lo comprueba e informa.
