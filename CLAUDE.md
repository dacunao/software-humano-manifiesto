# Instrucciones del proyecto para Claude Code

Las reglas que gobiernan este repositorio están en `AGENTS.md` y se cargan desde aquí. **`AGENTS.md` es la fuente única**: este archivo la referencia y añade solo lo específico de Claude Code. No duplica ninguna regla, porque dos copias de instrucciones rectoras divergen.

@AGENTS.md

---

## Específico de Claude Code

Lo que sigue no es doctrina. Es cómo opera este método dentro de Claude Code.

### Los comandos de SpecKit son skills

`specify init --integration claude` registra los ocho comandos compuestos como skills en `.claude/skills/`. Se invocan así:

| Operación | Invocación |
|---|---|
| Constitución | `/speckit-constitution` |
| Especificar | `/speckit-specify` |
| Aclarar | `/speckit-clarify` |
| Planificar | `/speckit-plan` |
| Tareas | `/speckit-tasks` |
| Analizar | `/speckit-analyze` |
| Implementar | `/speckit-implement` |
| Converger | `/speckit-converge` |
| Checklist (nativo, sin adaptar) | `/speckit-checklist` |

### Las skills recién instaladas no existen hasta reiniciar la sesión

**Esta es la fricción más común y conviene anticiparla.**

Claude Code carga su catálogo de skills **al iniciar la sesión**. Si ejecutas `specify init` y enseguida intentas invocar un comando en la misma sesión, obtendrás:

```
Unknown skill: speckit-constitution
```

Por eso la instalación normalmente requiere **dos sesiones**:

1. **Sesión 1** — comprobar entorno, inicializar SpecKit, instalar el preset y verificar plantillas, comandos, checklist y límites.
2. **Sesión 2**, iniciada de nuevo en el mismo directorio — materializar la constitución con `/speckit-constitution` y verificarla.

Es lo esperado, no un error. Infórmalo a la persona antes de empezar para que no lo interprete como una falla, y **no copies la plantilla de constitución a mano** como sustituto: la instrucción 01 lo prohíbe expresamente.

### Ejecutar scripts de SpecKit

Los comandos te pedirán ejecutar scripts de `.specify/scripts/bash/`. Antepón siempre el shim de PyYAML:

```bash
PATH="$PWD/tools/speckit/shim:$PATH" .specify/scripts/bash/resolve-template.sh spec-template
```

Sin eso, la resolución de plantillas compuestas falla con `PyYAML is required to resolve preset template composition`. Es la primera causa a descartar cuando un comando `speckit.*` no encuentra su plantilla.

### Invocar SpecKit

Si la instalación global de SpecKit está fuera del rango que exige el preset, usa el envoltorio del repositorio en lugar del comando global:

```bash
tools/speckit/specify preset list
```

### Antes de empezar cualquier trabajo

Ejecuta la comprobación de entorno y reporta su resultado:

```bash
tools/speckit/preflight.sh
```

Si reporta un bloqueo, detente e informa. No lo rodees por iniciativa propia.
