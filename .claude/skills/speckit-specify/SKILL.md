---
name: speckit-specify
description: Create or update the feature specification from a natural language feature
  description.
argument-hint: "Describe the feature you want to specify"
compatibility: Requires spec-kit project structure with .specify/ directory
metadata:
  author: github-spec-kit
  source: preset:software-humano
user-invocable: true
disable-model-invocation: false
---

# Speckit Specify Skill

## User Input

```text
$ARGUMENTS
```

You **MUST** consider the user input before proceeding (if not empty).

## Pre-Execution Checks

**Check for extension hooks (before specification)**:
- Check if `.specify/extensions.yml` exists in the project root.
- If it exists, read it and look for entries under the `hooks.before_specify` key
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

The text the user typed after `/speckit-specify` in the triggering message **is** the feature description. Assume you always have it available in this conversation even if `$ARGUMENTS` appears literally below. Do not ask the user to repeat it unless they provided an empty command.

Given that feature description, do this:

1. **Generate a concise short name** (2-4 words) for the feature:
   - Analyze the feature description and extract the most meaningful keywords
   - Create a 2-4 word short name that captures the essence of the feature
   - Use action-noun format when possible (e.g., "add-user-auth", "fix-payment-bug")
   - Preserve technical terms and acronyms (OAuth2, API, JWT, etc.)
   - Keep it concise but descriptive enough to understand the feature at a glance
   - Examples:
     - "I want to add user authentication" → "user-auth"
     - "Implement OAuth2 integration for the API" → "oauth2-api-integration"
     - "Create a dashboard for analytics" → "analytics-dashboard"
     - "Fix payment processing timeout bug" → "fix-payment-timeout"

2. **Branch creation** (optional, via hook):

   If a `before_specify` hook ran successfully in the Pre-Execution Checks above, it will have created/switched to a git branch and output JSON containing `BRANCH_NAME` and `FEATURE_NUM`. Note these values for reference, but the branch name does **not** dictate the spec directory name.

   If the user explicitly provided `GIT_BRANCH_NAME`, pass it through to the hook so the branch script uses the exact value as the branch name (bypassing all prefix/suffix generation).

3. **Create the spec feature directory**:

   Specs live under the default `specs/` directory unless the user explicitly provides `SPECIFY_FEATURE_DIRECTORY`.

   **Resolution order for `SPECIFY_FEATURE_DIRECTORY`**:
   1. If the user explicitly provided `SPECIFY_FEATURE_DIRECTORY` (e.g., via environment variable, argument, or configuration), use it as-is
   2. Otherwise, auto-generate it under `specs/`:
      - Check `.specify/init-options.json` for `feature_numbering` (preferred) or `branch_numbering` (deprecated, migration only — will be removed in a future release)
      - If `"timestamp"`: prefix is `YYYYMMDD-HHMMSS` (current timestamp)
      - If `"sequential"` or absent: prefix is `NNN` (next available 3-digit number after scanning existing directories in `specs/`)
      - Construct the directory name: `<prefix>-<short-name>` (e.g., `003-user-auth` or `20260319-143022-user-auth`)
      - Set `SPECIFY_FEATURE_DIRECTORY` to `specs/<directory-name>`
      - If `branch_numbering` was used (and `feature_numbering` was absent), emit a one-line warning: "⚠️ `branch_numbering` in init-options.json is deprecated. Rename to `feature_numbering`."

   **Create the directory and spec file**:
   - `mkdir -p SPECIFY_FEATURE_DIRECTORY`
   - Resolve the active `spec-template` through the Spec Kit preset/template resolution stack (equivalent to `specify preset resolve spec-template`)
   - Copy the resolved `spec-template` file to `SPECIFY_FEATURE_DIRECTORY/spec.md` as the starting point
   - Set `SPEC_FILE` to `SPECIFY_FEATURE_DIRECTORY/spec.md`
   - Persist the resolved path to `.specify/feature.json`:
     ```json
     {
       "feature_directory": "<resolved feature dir>"
     }
     ```
     Write the actual resolved directory path value (for example, `specs/003-user-auth`), not the literal string `SPECIFY_FEATURE_DIRECTORY`.
     This allows downstream commands (`/speckit-plan`, `/speckit-tasks`, etc.) to locate the feature directory without relying on git branch name conventions.

   **IMPORTANT**:
   - You must only create one feature per `/speckit-specify` invocation
   - The spec directory name and the git branch name are independent — they may be the same but that is the user's choice
   - The spec directory and file are always created by this command, never by the hook

4. Load the resolved active `spec-template` file to understand required sections.

5. **IF EXISTS**: Load `.specify/memory/constitution.md` for project principles and governance constraints.

6. Follow this execution flow:
    1. Parse user description from arguments
       If empty: ERROR "No feature description provided"
    2. Extract key concepts from description
       Identify: actors, actions, data, constraints
    3. For unclear aspects:
       - Make informed guesses based on context and industry standards
       - Only mark with [NEEDS CLARIFICATION: specific question] if:
         - The choice significantly impacts feature scope or user experience
         - Multiple reasonable interpretations exist with different implications
         - No reasonable default exists
       - **LIMIT: Maximum 3 [NEEDS CLARIFICATION] markers total**
       - Prioritize clarifications by impact: scope > security/privacy > user experience > technical details
    4. Fill User Scenarios & Testing section
       If no clear user flow: ERROR "Cannot determine user scenarios"
    5. Generate Functional Requirements
       Each requirement must be testable
       Use reasonable defaults for unspecified details (document assumptions in Assumptions section)
    6. Define Success Criteria
       Create measurable, technology-agnostic outcomes
       Include both quantitative metrics (time, performance, volume) and qualitative measures (user satisfaction, task completion)
       Each criterion must be verifiable without implementation details
    7. Identify Key Entities (if data involved)
    8. Return: SUCCESS (spec ready for planning)

7. Write the specification to SPEC_FILE using the template structure, replacing placeholders with concrete details derived from the feature description (arguments) while preserving section order and headings.

8. **Specification Quality Validation**: After writing the initial spec, validate it against quality criteria:

   a. **Create Spec Quality Checklist**: Generate a checklist file at `SPECIFY_FEATURE_DIRECTORY/checklists/requirements.md` using the checklist template structure with these validation items:

      ```markdown
      # Specification Quality Checklist: [FEATURE NAME]

      **Purpose**: Validate specification completeness and quality before proceeding to planning
      **Created**: [DATE]
      **Feature**: [Link to spec.md]

      ## Content Quality

      - [ ] No implementation details (languages, frameworks, APIs)
      - [ ] Focused on user value and business needs
      - [ ] Written for non-technical stakeholders
      - [ ] All mandatory sections completed

      ## Requirement Completeness

      - [ ] No [NEEDS CLARIFICATION] markers remain
      - [ ] Requirements are testable and unambiguous
      - [ ] Success criteria are measurable
      - [ ] Success criteria are technology-agnostic (no implementation details)
      - [ ] All acceptance scenarios are defined
      - [ ] Edge cases are identified
      - [ ] Scope is clearly bounded
      - [ ] Dependencies and assumptions identified

      ## Feature Readiness

      - [ ] All functional requirements have clear acceptance criteria
      - [ ] User scenarios cover primary flows
      - [ ] Feature meets measurable outcomes defined in Success Criteria
      - [ ] No implementation details leak into specification

      ## Notes

      - Items marked incomplete require spec updates before `/speckit-clarify` or `/speckit-plan`
      ```

   b. **Run Validation Check**: Review the spec against each checklist item:
      - For each item, determine if it passes or fails
      - Document specific issues found (quote relevant spec sections)

   c. **Handle Validation Results**:

      - **If all items pass**: Mark checklist complete and proceed to the Mandatory Post-Execution Hooks section

      - **If items fail (excluding [NEEDS CLARIFICATION])**:
        1. List the failing items and specific issues
        2. Update the spec to address each issue
        3. Re-run validation until all items pass (max 3 iterations)
        4. If still failing after 3 iterations, document remaining issues in checklist notes and warn user

      - **If [NEEDS CLARIFICATION] markers remain**:
        1. Extract all [NEEDS CLARIFICATION: ...] markers from the spec
        2. **LIMIT CHECK**: If more than 3 markers exist, keep only the 3 most critical (by scope/security/UX impact) and make informed guesses for the rest
        3. For each clarification needed (max 3), present options to user in this format:

           ```markdown
           ## Question [N]: [Topic]

           **Context**: [Quote relevant spec section]

           **What we need to know**: [Specific question from NEEDS CLARIFICATION marker]

           **Suggested Answers**:

           | Option | Answer | Implications |
           |--------|--------|--------------|
           | A      | [First suggested answer] | [What this means for the feature] |
           | B      | [Second suggested answer] | [What this means for the feature] |
           | C      | [Third suggested answer] | [What this means for the feature] |
           | Custom | Provide your own answer | [Explain how to provide custom input] |

           **Your choice**: _[Wait for user response]_
           ```

        4. **CRITICAL - Table Formatting**: Ensure markdown tables are properly formatted:
           - Use consistent spacing with pipes aligned
           - Each cell should have spaces around content: `| Content |` not `|Content|`
           - Header separator must have at least 3 dashes: `|--------|`
           - Test that the table renders correctly in markdown preview
        5. Number questions sequentially (Q1, Q2, Q3 - max 3 total)
        6. Present all questions together before waiting for responses
        7. Wait for user to respond with their choices for all questions (e.g., "Q1: A, Q2: Custom - [details], Q3: B")
        8. Update the spec by replacing each [NEEDS CLARIFICATION] marker with the user's selected or provided answer
        9. Re-run validation after all clarifications are resolved

   d. **Update Checklist**: After each validation iteration, update the checklist file with current pass/fail status

## Mandatory Post-Execution Hooks

**You MUST complete this section before reporting completion to the user.**

Check if `.specify/extensions.yml` exists in the project root.
- If it does not exist, or no hooks are registered under `hooks.after_specify`, skip to the Completion Report.
- If it exists, read it and look for entries under the `hooks.after_specify` key.
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

Report completion to the user with:
- `SPECIFY_FEATURE_DIRECTORY` — the feature directory path
- `SPEC_FILE` — the spec file path
- Checklist results summary
- Readiness for the next phase (`/speckit-clarify` or `/speckit-plan`)

**NOTE:** Branch creation is handled by the `before_specify` hook (git extension). Spec directory and file creation are always handled by this core command.

## Quick Guidelines

- Focus on **WHAT** users need and **WHY**.
- Avoid HOW to implement (no tech stack, APIs, code structure).
- Written for business stakeholders, not developers.
- DO NOT create any checklists that are embedded in the spec. That will be a separate command.

### Section Requirements

- **Mandatory sections**: Must be completed for every feature
- **Optional sections**: Include only when relevant to the feature
- When a section doesn't apply, remove it entirely (don't leave as "N/A")

### For AI Generation

When creating this spec from a user prompt:

1. **Make informed guesses**: Use context, industry standards, and common patterns to fill gaps
2. **Document assumptions**: Record reasonable defaults in the Assumptions section
3. **Limit clarifications**: Maximum 3 [NEEDS CLARIFICATION] markers - use only for critical decisions that:
   - Significantly impact feature scope or user experience
   - Have multiple reasonable interpretations with different implications
   - Lack any reasonable default
4. **Prioritize clarifications**: scope > security/privacy > user experience > technical details
5. **Think like a tester**: Every vague requirement should fail the "testable and unambiguous" checklist item
6. **Common areas needing clarification** (only if no reasonable default exists):
   - Feature scope and boundaries (include/exclude specific use cases)
   - User types and permissions (if multiple conflicting interpretations possible)
   - Security/compliance requirements (when legally/financially significant)

**Examples of reasonable defaults** (don't ask about these):

- Data retention: Industry-standard practices for the domain
- Performance targets: Standard web/mobile app expectations unless specified
- Error handling: User-friendly messages with appropriate fallbacks
- Authentication method: Standard session-based or OAuth2 for web apps
- Integration patterns: Use project-appropriate patterns (REST/GraphQL for web services, function calls for libraries, CLI args for tools, etc.)

### Success Criteria Guidelines

Success criteria must be:

1. **Measurable**: Include specific metrics (time, percentage, count, rate)
2. **Technology-agnostic**: No mention of frameworks, languages, databases, or tools
3. **User-focused**: Describe outcomes from user/business perspective, not system internals
4. **Verifiable**: Can be tested/validated without knowing implementation details

**Good examples**:

- "Users can complete checkout in under 3 minutes"
- "System supports 10,000 concurrent users"
- "95% of searches return results in under 1 second"
- "Task completion rate improves by 40%"

**Bad examples** (implementation-focused):

- "API response time is under 200ms" (too technical, use "Users see results instantly")
- "Database can handle 1000 TPS" (implementation detail, use user-facing metric)
- "React components render efficiently" (framework-specific)
- "Redis cache hit rate above 80%" (technology-specific)

## Done When

- [ ] Specification written to `SPEC_FILE` and validated against quality checklist
- [ ] Extension hooks dispatched or skipped according to the rules in Mandatory Post-Execution Hooks above
- [ ] Completion reported to user with feature directory, spec file path, and checklist results


---

## Lo que el manifiesto exige en esta operación

Cada fila es una cita literal del núcleo. No hay redacción propia: si una fila no puede responderse mirando un artefacto, eso es el hallazgo.

| Dónde lo dice el manifiesto | Qué exige | Dónde se comprueba |
|---|---|---|
| `SH-FUND` | El fundamento de producto es el contenido autorizado que establece qué debe construirse, por qué debe existir, qué resultados debe producir, qué condiciones debe respetar y cómo podrá determinarse su cumplimiento. No es un nuevo tipo de documento ni una plantilla obligatoria. Puede encontrarse en una Job Story, un Jobs to Be Done, una épica, una capacidad, un requisito, una regla de negocio, un recorrido, un criterio de aceptación o una combinación coherente de estos elementos. | El fundamento de producto |
| `P01` | Identificar el fundamento de producto y la fuente autorizada que establece el alcance antes de diseñar una respuesta. | El fundamento de producto |
| `D01` | Comprender la definición de producto, su autoridad, su alcance y la evidencia que la respalda antes de proponer componentes o código. Cuando existan Job Stories, conservar su circunstancia, motivación y resultado. · No comenzar a construir si una ambigüedad material puede alterar la solución, el alcance o una regla. | El fundamento de producto |
| `SH-FUND` | Fuente y autoridad · ¿De dónde proviene y quién puede modificarlo? · Origen trazable y autoridad reconocida | El fundamento de producto |
| `SH-FUND` | Razón · ¿Qué situación, necesidad, problema u oportunidad aborda? · Justificación comprensible sin depender de la solución | El fundamento de producto |
| `SH-FUND` | Resultado · ¿Qué cambio o progreso debe producir? · Resultado reconocible para las personas o para el producto | El fundamento de producto |
| `SH-FUND` | Condiciones y límites · ¿Qué reglas, restricciones y exclusiones deben respetarse? · Límites suficientes para evitar decisiones silenciosas | El fundamento de producto |
| `SH-FUND` | Evidencia · ¿Cómo sabremos que se cumplió? · Criterios, observaciones o pruebas proporcionales al riesgo | El fundamento de producto |
| `A01` | ¿Qué debe construirse, por qué y con qué autoridad? · Fuentes; alcance; resultados; reglas; límites; evidencia; no objetivos | Mapa del fundamento |
| `F01` | Comprender el fundamento · Reconocer las fuentes, la autoridad, el alcance, la estructura utilizada y los resultados esperados. · Mapa fiel de la definición de producto, sin reformularla por conveniencia técnica. | Mapa del fundamento |
| `CR02` | Identifica las fuentes autorizadas, explica el fundamento de producto y confirma el alcance completo. Reconoce la estructura utilizada por la definición; cuando contenga Job Stories, conserva su circunstancia, motivación y resultado. Separa evidencia de supuestos e identifica cualquier ambigüedad que pueda cambiar materialmente la solución. | Ficha de Job Story cuando aplique · Mapa del fundamento |
| `O01` | Fuentes autorizadas y fundamento de producto que justifican el desarrollo. | Mapa del fundamento |
| `F02` | Establecer cobertura · Inventariar historias, capacidades, reglas, estados, recorridos, criterios y relaciones aplicables. · Cobertura completa y vacíos o contradicciones visibles. | Cobertura |
| `A02` | ¿Cómo se dará cuenta de todo el alcance? · Elementos obligatorios; relaciones; dependencias; implementación; pruebas; estado; excepciones | Cobertura |
| `CR03` | Da cuenta de todos los elementos obligatorios y establece sus dependencias, bloqueantes, orden, integración y pruebas. No selecciones, omitas ni postergues partes del alcance por iniciativa propia. Si las restricciones impiden cubrirlo, solicita una decisión a la autoridad de producto. | Cobertura |
| `O02` | Inventario de alcance y cobertura de historias, capacidades, reglas, estados y criterios aplicables. | Cobertura |
| `SH-FUND` | Toda omisión, modificación o postergación debe ser explícita, trazable y aprobada por la autoridad de producto. | Cobertura |
| `SH-FUND` | Si las restricciones de tiempo, recursos o tecnología impiden cubrir el alcance, el plan debe hacer visible la incompatibilidad y solicitar una decisión. | Cobertura |
| `SH-FUND` | Una estrategia incremental, por fases o por releases puede utilizarse cuando el proyecto la adopta; no es una obligación del núcleo. | Cobertura |
| `SH-FUND` | La completitud se determina reconciliando la implementación y la evidencia contra la definición de producto completa y sus excepciones aprobadas. | Cobertura |
| `SH-FUND` | Definición de producto · Qué debe construirse y bajo qué condiciones · Todo elemento obligatorio tiene cobertura o una excepción aprobada | Cobertura |
| `SH-FUND` | Jobs to Be Done · Qué progreso general merece atención cuando esta forma resulta aplicable · El resultado sigue siendo relevante para la persona | Cobertura |
| `SH-FUND` | Job Story · Qué circunstancia concreta debe atenderse cuando la fuente utiliza esta forma · La historia está validada y no prescribe una solución no autorizada | Cobertura |
| `SH-FUND` | Diseño e implementación · Qué comportamiento responde al fundamento · Cada elemento tiene una razón trazable | Cobertura |
| `SH-FUND` | Aceptación · Qué evidencia autoriza declarar completo el desarrollo · Resultados, reglas y criterios se cumplen bajo las condiciones definidas | Cobertura |
| `A03` | ¿Cuándo surge la necesidad y qué cambio busca la persona? · Circunstancia; motivación; resultado; conducta actual; ansiedad; evidencia; supuestos | Causalidad · Ficha de Job Story cuando aplique · Progreso |
| `P01` | Formular cada Job Story como circunstancia, motivación y resultado, sin nombrar una pantalla, un componente ni una funcionalidad. | Ficha de Job Story cuando aplique |
| `P02` | Considerar el estado emocional y cognitivo que acompaña la situación definida por el producto y, cuando exista, por la Job Story. | Ficha de Job Story cuando aplique |
| `F04` | Concretar el progreso · Usar las Job Stories existentes o formular una vista derivada cuando aporte claridad y esté identificada como tal. · Circunstancias, motivaciones y resultados preservados cuando corresponda. | Ficha de Job Story cuando aplique · Progreso |
| `O03` | Jobs to Be Done y Job Stories cuando formen parte de la definición o aporten una vista derivada útil. | Ficha de Job Story cuando aplique |
| `SH-FUND` | Jobs to Be Done · El progreso amplio que la persona busca conseguir · Organizar el producto alrededor de funcionalidades | Ficha de Job Story cuando aplique |
| `SH-FUND` | Job Story · La circunstancia, la motivación y el resultado que activan una necesidad concreta · Diseñar desde roles genéricos o pedidos literales | Ficha de Job Story cuando aplique |
| `SH-FUND` | Respuesta del producto · El comportamiento del sistema elegido para resolver la historia · Confundir el problema con la primera solución imaginada | Ficha de Job Story cuando aplique |
| `SH-FUND` | Evidencia de aceptación · La observación que demuestra progreso en esa circunstancia · Aceptar una entrega porque funciona técnicamente | Ficha de Job Story cuando aplique |
| `SH-FUND` | Conducta actual · ¿Qué hace hoy la persona? · Pasos, alternativa o abandono observados | Ficha de Job Story cuando aplique |
| `SH-FUND` | Obstáculo o ansiedad · ¿Qué frena o vuelve riesgoso el avance? · Duda, costo, temor, esfuerzo o dependencia relevante | Ficha de Job Story cuando aplique |
| `SH-FUND` | Evidencia causal · ¿Qué respalda la relación entre circunstancia y motivación? · Observación, entrevista, dato de uso o supuesto declarado | Ficha de Job Story cuando aplique |
| `SH-FUND` | Evidencia de éxito · ¿Qué demostraría que hubo progreso? · Conducta o resultado observable dentro de la circunstancia | Ficha de Job Story cuando aplique |
| `SH-FUND` | La circunstancia describe un desencadenante concreto y no una categoría de usuario. | Ficha de Job Story cuando aplique |
| `SH-FUND` | La motivación expresa progreso o comprensión y no una funcionalidad solicitada. | Ficha de Job Story cuando aplique |
| `SH-FUND` | El resultado puede reconocerse sin confundirlo con completar el flujo del producto. | Ficha de Job Story cuando aplique |
| `SH-FUND` | La historia está respaldada por evidencia o identifica con claridad el supuesto pendiente. | Ficha de Job Story cuando aplique |
| `SH-FUND` | La formulación permite comparar varias respuestas, incluida la opción de no construir. | Ficha de Job Story cuando aplique |
| `SH-FUND` | El alcance es suficiente para cambiar una decisión, pero no intenta contener el trabajo completo del usuario. | Ficha de Job Story cuando aplique |
| `A04` | ¿Qué debe comprender y poder hacer la persona? · Ruta principal; lenguaje; decisiones; feedback; control; recuperación | Comprensión · Contrato de experiencia · Profundidad |
| `P05` | Hacer evidente la acción principal, el estado actual y el siguiente paso posible. | Contrato de experiencia |
| `F05` | Establecer el contrato de experiencia · Describir qué debe comprender, decidir y sentir la persona en los momentos críticos. · Ruta principal, estados y promesa de interacción. | Contrato de experiencia |
| `CR05` | No expongas estructuras internas. Usa lenguaje del usuario, convenciones conocidas, jerarquía clara, profundidad progresiva, valores predeterminados editables y feedback inmediato. | Comprensión · Contrato de experiencia · Profundidad |
| `D02` | Definir estados, decisiones, restricciones y criterios de aceptación con el nivel necesario para el riesgo. · No convertir un prompt vago en una implementación extensa y luego usar el código para descubrir el problema. | Modelo de estados |
| `P06` | Exigir que cada elemento visible y cada decisión solicitada respondan a una circunstancia, motivación o resultado verificable. | Carga |
| `P06` | Jerarquizar por relevancia para el estado actual, no por igualdad entre features. | Carga |
| `P06` | Reducir interrupciones y reservar señales intensas para asuntos que realmente requieren atención. | Carga |
| `P02` | Incluir esfuerzo, claridad y confianza dentro de los criterios de aceptación. | Plan de aceptación |
| `P02` | Probar el flujo completo, no solo cada pantalla o endpoint de forma aislada. | Plan de aceptación |
| `O04` | Evidencia disponible, supuestos y criterios de resultado. | Plan de aceptación |
| `CR04` | Presenta la alternativa recomendada, una alternativa más simple y la opción de no construir cuando la decisión aún pertenezca a producto. Explica cómo responde cada una al fundamento, qué carga introduce y qué tradeoffs exige. | Registro de decisiones |
| `CR01` | Construye la solución más simple que permita al usuario lograr el resultado definido, conservando claridad, control y capacidad de recuperación. | Registro de decisiones |
| `O05` | Alternativa elegida y razón de descarte de opciones más complejas. | Registro de decisiones |
| `P01` | Cuando el fundamento se exprese mediante Job Stories, ubicarlas dentro del progreso o propósito de nivel superior que corresponda. | Progreso |
| `P01` | Respaldar las decisiones con conducta observada, obstáculo o ansiedad actual y evidencia que permita aceptar el resultado. | Causalidad |
| `P05` | Preferir convenciones conocidas cuando resuelvan bien el problema. | Comprensión |
| `P05` | Explicar en contexto sin exigir tutoriales previos para acciones básicas. | Comprensión |
| `P07` | Mostrar qué está ocurriendo, qué cambiará y cuándo una acción será irreversible. | Confianza |
| `P07` | Diferenciar con claridad recomendaciones, decisiones automáticas y resultados confirmados. | Confianza |
| `P10` | Pedir confirmación proporcional al impacto, no para cada gesto ni después de una acción irreversible. | Confianza |
| `P10` | Permitir revisar, editar, exportar y revertir cuando el dominio lo permita. | Control |
| `P10` | Explicar el uso de datos y separar autorización, recomendación y ejecución. | Control |
| `P07` | Permitir deshacer, corregir o volver a un estado seguro cuando sea razonable. | Control |
| `O09` | Riesgos, incertidumbres, pendientes, excepciones y decisiones que aún requieren juicio humano. | todos los objetos |
| `SH-STOP` | Regla de detención antes de generar | todos los objetos |
