---
name: speckit-plan
description: Execute the implementation planning workflow using the plan template
  to generate design artifacts.
argument-hint: "Optional guidance for the planning phase"
compatibility: Requires spec-kit project structure with .specify/ directory
metadata:
  author: github-spec-kit
  source: preset:software-humano
user-invocable: true
disable-model-invocation: false
---

# Speckit Plan Skill

## User Input

```text
$ARGUMENTS
```

You **MUST** consider the user input before proceeding (if not empty).

## Pre-Execution Checks

**Check for extension hooks (before planning)**:
- Check if `.specify/extensions.yml` exists in the project root.
- If it exists, read it and look for entries under the `hooks.before_plan` key
- If the YAML cannot be parsed or is invalid, do not skip silently: tell the user that `.specify/extensions.yml` could not be read (include the parser error) and that no hooks were checked, including any mandatory (`optional: false`) hooks registered there, then continue normally
- Filter out hooks where `enabled` is explicitly `false`. Treat hooks without an `enabled` field as enabled by default.
- For each remaining hook, do **not** attempt to interpret or evaluate hook `condition` expressions:
  - If the hook has no `condition` field, or it is null/empty, treat the hook as executable
  - If the hook defines a non-empty `condition`, skip the hook and leave condition evaluation to the HookExecutor implementation
- When constructing command invocations from hook command names, replace dots (`.`) with hyphens (`-`). For example, `speckit.git.commit` → `/speckit-git-commit`.
- For each executable hook, output the following based on its `optional` flag:
  - **Optional hook** (`optional: true`):
    ```
    ## Extension Hooks

    **Optional Pre-Hook**: {extension}
    Command: `/{command}`
    Description: {description}

    Prompt: {prompt}
    To execute: `/{command}`
    ```
  - **Mandatory hook** (`optional: false`):
    ```
    ## Extension Hooks

    **Automatic Pre-Hook**: {extension}
    Executing: `/{command}`
    EXECUTE_COMMAND: {command}

    Wait for the result of the hook command before proceeding to the Outline.
    ```
    After emitting the block above you MUST actually invoke the hook and wait for it to finish before continuing. Run it the same way you would run the command yourself in this agent/session (the invocation may differ from the literal `{command}` id shown above, e.g. a skills-mode agent runs it as `/skill:speckit-...` or `$speckit-...`). Emitting the block alone does not run the hook.
- If no hooks are registered or `.specify/extensions.yml` does not exist, skip silently

## Outline

1. **Setup**: Run `.specify/scripts/bash/setup-plan.sh --json` from repo root and parse JSON for FEATURE_SPEC, IMPL_PLAN, FEATURE_DIR, BRANCH. For single quotes in args like "I'm Groot", use escape syntax: e.g 'I'\''m Groot' (or double-quote if possible: "I'm Groot").

2. **Load context**: Read FEATURE_SPEC and `.specify/memory/constitution.md`. Load IMPL_PLAN template (already copied).

3. **Execute plan workflow**: Follow the structure in IMPL_PLAN template to:
   - Fill Technical Context (mark unknowns as "NEEDS CLARIFICATION")
   - Fill Constitution Check section from constitution
   - Evaluate gates (ERROR if violations unjustified)
   - Phase 0: Generate research.md (resolve all NEEDS CLARIFICATION)
   - Phase 1: Generate data-model.md, contracts/, quickstart.md
   - Re-evaluate Constitution Check post-design

## Mandatory Post-Execution Hooks

**You MUST complete this section before reporting completion to the user.**

Check if `.specify/extensions.yml` exists in the project root.
- If it does not exist, or no hooks are registered under `hooks.after_plan`, skip to the Completion Report.
- If it exists, read it and look for entries under the `hooks.after_plan` key.
- If the YAML cannot be parsed or is invalid, do not skip silently: tell the user that `.specify/extensions.yml` could not be read (include the parser error) and that no hooks were checked, including any mandatory (`optional: false`) hooks registered there, then continue to the Completion Report.
- Filter out hooks where `enabled` is explicitly `false`. Treat hooks without an `enabled` field as enabled by default.
- For each remaining hook, do **not** attempt to interpret or evaluate hook `condition` expressions:
  - If the hook has no `condition` field, or it is null/empty, treat the hook as executable
  - If the hook defines a non-empty `condition`, skip the hook and leave condition evaluation to the HookExecutor implementation
- When constructing command invocations from hook command names, replace dots (`.`) with hyphens (`-`). For example, `speckit.git.commit` → `/speckit-git-commit`.
- For each executable hook, output the following based on its `optional` flag:
  - **Mandatory hook** (`optional: false`) — **You MUST emit `EXECUTE_COMMAND:` for each mandatory hook**:
    ```
    ## Extension Hooks

    **Automatic Hook**: {extension}
    Executing: `/{command}`
    EXECUTE_COMMAND: {command}
    ```
    After emitting the block above you MUST actually invoke the hook and wait for it to finish before continuing. Run it the same way you would run the command yourself in this agent/session (the invocation may differ from the literal `{command}` id shown above, e.g. a skills-mode agent runs it as `/skill:speckit-...` or `$speckit-...`). Emitting the block alone does not run the hook.
  - **Optional hook** (`optional: true`):
    ```
    ## Extension Hooks

    **Optional Hook**: {extension}
    Command: `/{command}`
    Description: {description}

    Prompt: {prompt}
    To execute: `/{command}`
    ```

## Completion Report

Command ends after Phase 1 design. Report branch, IMPL_PLAN path, and generated artifacts.

## Phases

### Phase 0: Outline & Research

1. **Extract unknowns from Technical Context** above:
   - For each NEEDS CLARIFICATION → research task
   - For each dependency → best practices task
   - For each integration → patterns task

2. **Generate and dispatch research agents**:

   ```text
   For each unknown in Technical Context:
     Task: "Research {unknown} for {feature context}"
   For each technology choice:
     Task: "Find best practices for {tech} in {domain}"
   ```

3. **Consolidate findings** in `research.md` using format:
   - Decision: [what was chosen]
   - Rationale: [why chosen]
   - Alternatives considered: [what else evaluated]

**Output**: research.md with all NEEDS CLARIFICATION resolved

### Phase 1: Design & Contracts

**Prerequisites:** `research.md` complete

1. **Extract entities from feature spec** → `data-model.md`:
   - Entity name, fields, relationships
   - Validation rules from requirements
   - State transitions if applicable

2. **Define interface contracts** (if project has external interfaces) → `/contracts/`:
   - Identify what interfaces the project exposes to users or other systems
   - Document the contract format appropriate for the project type
   - Examples: public APIs for libraries, command schemas for CLI tools, endpoints for web services, grammars for parsers, UI contracts for applications
   - Skip if project is purely internal (build scripts, one-off tools, etc.)

3. **Create quickstart validation guide** → `quickstart.md`:
   - Document runnable validation scenarios that prove the feature works end-to-end
   - Include prerequisites, setup commands, test/run commands, and expected outcomes
   - Use links or references to contracts and data model details instead of duplicating them
   - Do not include full implementation code, model/service/controller bodies, migrations, or complete test suites
   - Keep this artifact as a validation/run guide; implementation details belong in `tasks.md` and the implementation phase

**Output**: data-model.md, /contracts/*, quickstart.md

## Key rules

- Use absolute paths for filesystem operations; use project-relative paths for references in documentation
- ERROR on gate failures or unresolved clarifications

## Done When

- [ ] Plan workflow executed and design artifacts generated
- [ ] Extension hooks dispatched or skipped according to the rules in Mandatory Post-Execution Hooks above
- [ ] Completion reported to user with branch, plan path, and generated artifacts


---

## Lo que el manifiesto exige en esta operación

Cada fila es una cita literal del núcleo. No hay redacción propia: si una fila no puede responderse mirando un artefacto, eso es el hallazgo.

| Dónde lo dice el manifiesto | Qué exige | Dónde se comprueba |
|---|---|---|
| `F03` | Planificar la implementación · Resolver dependencias, bloqueantes, orden, paralelismo, integración y pruebas sin modificar el alcance. · Plan coherente que da cuenta de toda la definición aprobada. | Cobertura |
| `CR03` | Da cuenta de todos los elementos obligatorios y establece sus dependencias, bloqueantes, orden, integración y pruebas. No selecciones, omitas ni postergues partes del alcance por iniciativa propia. Si las restricciones impiden cubrirlo, solicita una decisión a la autoridad de producto. | Cobertura |
| `CR05` | No expongas estructuras internas. Usa lenguaje del usuario, convenciones conocidas, jerarquía clara, profundidad progresiva, valores predeterminados editables y feedback inmediato. | Comprensión · Contrato de experiencia · Profundidad |
| `A05` | ¿Qué puede ocurrir y qué transiciones son válidas? · Estados; eventos; reglas; errores; permisos; persistencia | Estados · Modelo de estados · Rendimiento |
| `P08` | Diseñar y verificar estados normales, vacíos, de carga, error, éxito y recuperación. | Modelo de estados |
| `F06` | Modelar reglas y riesgos · Separar lógica determinista, comportamiento generativo, permisos y acciones irreversibles. · Mapa de decisiones y límites. | IA · Modelo de estados |
| `P06` | Exigir que cada elemento visible y cada decisión solicitada respondan a una circunstancia, motivación o resultado verificable. | Carga |
| `P06` | Jerarquizar por relevancia para el estado actual, no por igualdad entre features. | Carga |
| `P06` | Reducir interrupciones y reservar señales intensas para asuntos que realmente requieren atención. | Carga |
| `P03` | Resolver dependencias, valores predeterminados y secuencias cuando exista suficiente contexto. | Carga |
| `P03` | Exponer una excepción solo a quienes realmente deben decidirla. | Carga |
| `D03` | Preferir la solución que exige menos conceptos, decisiones y memoria al usuario cuando ambas logran el mismo resultado. · Menos código no es la medida; menos carga innecesaria sí. | Carga · Registro de decisiones |
| `A06` | ¿Qué carga estamos agregando? · Conceptos nuevos; decisiones; pasos; excepciones; opciones visibles | Carga |
| `A07` | ¿Qué evidencia autoriza declarar completo el desarrollo? · Resultados; reglas; Job Stories cuando apliquen; accesibilidad; rendimiento; estados extremos; métricas | Accesibilidad · Plan de aceptación |
| `P08` | Revisar el producto a escala real y con contenido realista antes de aprobarlo. | Plan de aceptación |
| `A08` | ¿Por qué elegimos esta alternativa? · Alternativas; tradeoffs; supuestos; decisión; fecha; evidencia pendiente | Registro de decisiones |
| `F07` | Explorar y prototipar · Comparar alternativas y probar comprensión, jerarquía y recuperación antes de optimizar código. · Razón de la alternativa elegida y evidencia del recorrido. | Registro de decisiones |
| `CR04` | Presenta la alternativa recomendada, una alternativa más simple y la opción de no construir cuando la decisión aún pertenezca a producto. Explica cómo responde cada una al fundamento, qué carga introduce y qué tradeoffs exige. | Registro de decisiones |
| `O05` | Alternativa elegida y razón de descarte de opciones más complejas. | Registro de decisiones |
| `P08` | Mantener lenguaje, jerarquía y comportamiento consistentes en todo el flujo. | Comprensión |
| `P03` | Traducir conceptos internos al lenguaje y al modelo mental de la persona. | Comprensión |
| `P04` | Mostrar primero la ruta principal y revelar opciones avanzadas cuando el contexto las vuelva relevantes. | Profundidad |
| `P04` | Conservar atajos y precisión para usuarios expertos sin imponerlos al principiante. | Profundidad |
| `P04` | Usar buenos valores predeterminados, siempre editables cuando la decisión importa. | Profundidad |
| `P07` | Mostrar qué está ocurriendo, qué cambiará y cuándo una acción será irreversible. | Confianza |
| `P07` | Diferenciar con claridad recomendaciones, decisiones automáticas y resultados confirmados. | Confianza |
| `P10` | Pedir confirmación proporcional al impacto, no para cada gesto ni después de una acción irreversible. | Confianza |
| `CR06` | Reserva las reglas críticas para lógica verificable. Declara incertidumbre. No ejecutes acciones de alto impacto sin autorización proporcional. Mantén trazabilidad, revisión y reversibilidad. | Confianza · Control · IA |
| `P10` | Permitir revisar, editar, exportar y revertir cuando el dominio lo permita. | Control |
| `P10` | Explicar el uso de datos y separar autorización, recomendación y ejecución. | Control |
| `P07` | Permitir deshacer, corregir o volver a un estado seguro cuando sea razonable. | Control |
| `P09` | Guardar trabajo, contexto y estado con una frecuencia proporcional al costo de perderlos. | Estados |
| `P09` | Definir presupuestos de respuesta para las interacciones críticas. | Rendimiento |
| `P09` | Mostrar progreso honesto y permitir continuar cuando una operación pueda demorarse. | Rendimiento |
| `D04` | Implementar reglas críticas, permisos, cálculos, estados y validaciones como lógica verificable. · No delegar certeza, cumplimiento o seguridad al comportamiento variable de un modelo. | IA |
| `O09` | Riesgos, incertidumbres, pendientes, excepciones y decisiones que aún requieren juicio humano. | todos los objetos |
