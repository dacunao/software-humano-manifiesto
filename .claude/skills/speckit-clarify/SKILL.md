---
name: speckit-clarify
description: Identify underspecified areas in the current feature spec by asking up
  to 5 highly targeted clarification questions and encoding answers back into the
  spec.
argument-hint: "Optional areas to clarify in the spec"
compatibility: Requires spec-kit project structure with .specify/ directory
metadata:
  author: github-spec-kit
  source: preset:software-humano
user-invocable: true
disable-model-invocation: false
---

# Speckit Clarify Skill

## User Input

```text
$ARGUMENTS
```

You **MUST** consider the user input before proceeding (if not empty).

## Pre-Execution Checks

**Check for extension hooks (before clarification)**:
- Check if `.specify/extensions.yml` exists in the project root.
- If it exists, read it and look for entries under the `hooks.before_clarify` key
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

Goal: Detect and reduce ambiguity or missing decision points in the active feature specification and record the clarifications directly in the spec file.

Note: This clarification workflow is expected to run (and be completed) BEFORE invoking `/speckit-plan`. If the user explicitly states they are skipping clarification (e.g., exploratory spike), you may proceed, but must warn that downstream rework risk increases.

Execution steps:

1. Run `.specify/scripts/bash/check-prerequisites.sh --json --paths-only` from repo root **once** (combined `--json --paths-only` mode / `-Json -PathsOnly`). Parse minimal JSON payload fields:
   - `FEATURE_DIR`
   - `FEATURE_SPEC`
   - (Optionally capture `IMPL_PLAN`, `TASKS` for future chained flows.)
   - If JSON parsing fails, abort and instruct user to re-run `/speckit-specify` or verify feature branch environment.
   - For single quotes in args like "I'm Groot", use escape syntax: e.g 'I'\''m Groot' (or double-quote if possible: "I'm Groot").

2. **IF EXISTS**: Load `.specify/memory/constitution.md` for project principles and governance constraints.

3. Load the current spec file. Perform a structured ambiguity & coverage scan using this taxonomy. For each category, mark status: Clear / Partial / Missing. Produce an internal coverage map used for prioritization (do not output raw map unless no questions will be asked).

   Functional Scope & Behavior:
   - Core user goals & success criteria
   - Explicit out-of-scope declarations
   - User roles / personas differentiation

   Domain & Data Model:
   - Entities, attributes, relationships
   - Identity & uniqueness rules
   - Lifecycle/state transitions
   - Data volume / scale assumptions

   Interaction & UX Flow:
   - Critical user journeys / sequences
   - Error/empty/loading states
   - Accessibility or localization notes

   Non-Functional Quality Attributes:
   - Performance (latency, throughput targets)
   - Scalability (horizontal/vertical, limits)
   - Reliability & availability (uptime, recovery expectations)
   - Observability (logging, metrics, tracing signals)
   - Security & privacy (authN/Z, data protection, threat assumptions)
   - Compliance / regulatory constraints (if any)

   Integration & External Dependencies:
   - External services/APIs and failure modes
   - Data import/export formats
   - Protocol/versioning assumptions

   Edge Cases & Failure Handling:
   - Negative scenarios
   - Rate limiting / throttling
   - Conflict resolution (e.g., concurrent edits)

   Constraints & Tradeoffs:
   - Technical constraints (language, storage, hosting)
   - Explicit tradeoffs or rejected alternatives

   Terminology & Consistency:
   - Canonical glossary terms
   - Avoided synonyms / deprecated terms

   Completion Signals:
   - Acceptance criteria testability
   - Measurable Definition of Done style indicators

   Misc / Placeholders:
   - TODO markers / unresolved decisions
   - Ambiguous adjectives ("robust", "intuitive") lacking quantification

   For each category with Partial or Missing status, add a candidate question opportunity unless:
   - Clarification would not materially change implementation or validation strategy
   - The item is specifically about implementation method, tech-stack comparison, or task breakdown (note internally)

4. Generate (internally) a prioritized queue of candidate clarification questions (maximum 5). Do NOT output them all at once. Apply these constraints:
    - Maximum of 5 total questions across the whole session.
    - Each question must be answerable with EITHER:
       - A short multiple‑choice selection (2–5 distinct, mutually exclusive options), OR
       - A one-word / short‑phrase answer (explicitly constrain: "Answer in <=5 words").
    - Only include questions whose answers materially impact architecture, data modeling, task decomposition, test design, UX behavior, operational readiness, or compliance validation.
    - Ensure category coverage balance: attempt to cover the highest impact unresolved categories first; avoid asking two low-impact questions when a single high-impact area (e.g., security posture) is unresolved.
    - Exclude questions already answered, trivial stylistic preferences, or plan-level execution details (unless blocking correctness).
    - Favor clarifications that reduce downstream rework risk or prevent misaligned acceptance tests.
    - If more than 5 categories remain unresolved, select the top 5 by (Impact * Uncertainty) heuristic.

5. Sequential questioning loop (interactive):
    - Present EXACTLY ONE question at a time.
    - **Question writing quality (applies to every question, MC or short-answer):**
       - Lead with `**Question:**` followed by a full interrogative that ends with `?`. The question text before the `?` must make sense on its own.
       - NEVER use a topic label, section heading, or requirement id as the question itself. For example, `Acceptance device/runtime matrix (FR-023)` is INVALID — it is a label, not a question.
       - After the `?`, the only permitted suffix is an optional parenthesized requirement/question id. Exact format: `**Question:** <interrogative>?` or `**Question:** <interrogative>? (FR-023)`. Never put the id before the `?`, and never use the id (alone or with a topic label) as the whole prompt.
       - Immediately after the question line, add one plain-language "Why it matters" sentence (the stake for acceptance or shipping) before the recommendation/options.
       - Use everyday wording; introduce jargon only if defined in the same sentence. Self-check: a reader who does not know Spec Kit must be able to answer from the Question line alone. Terse is fine; cryptic labels are not.
    - For multiple‑choice questions:
       - **Analyze all options** and determine the **most suitable option** based on:
          - Best practices for the project type
          - Common patterns in similar implementations
          - Risk reduction (security, performance, maintainability)
          - Alignment with any explicit project goals or constraints visible in the spec
       - Present your **recommended option prominently** at the top with clear reasoning (1-2 sentences explaining why this is the best choice).
       - Format as: `**Recommended:** Option [X] - <reasoning>`
       - Then render all options as a Markdown table:

       | Option | Description |
       |--------|-------------|
       | A | <Option A description> |
       | B | <Option B description> |
       | C | <Option C description> (add D/E as needed up to 5) |
       | Short | Provide a different short answer (<=5 words) (Include only if free-form alternative is appropriate) |

       - After the table, add: `You can reply with the option letter (e.g., "A"), accept the recommendation by saying "yes" or "recommended", or provide your own short answer.`
    - For short‑answer style (no meaningful discrete options):
       - Provide your **suggested answer** based on best practices and context.
       - Format as: `**Suggested:** <your proposed answer> - <brief reasoning>`
       - Then output: `Format: Short answer (<=5 words). You can accept the suggestion by saying "yes" or "suggested", or provide your own answer.`
    - After the user answers:
       - If the user replies with "yes", "recommended", or "suggested", use your previously stated recommendation/suggestion as the answer.
       - Otherwise, validate the answer maps to one option or fits the <=5 word constraint.
       - If ambiguous, ask for a quick disambiguation (count still belongs to same question; do not advance).
       - Once satisfactory, record it in working memory (do not yet write to disk) and move to the next queued question.
    - Stop asking further questions when:
       - All critical ambiguities resolved early (remaining queued items become unnecessary), OR
       - User signals completion ("done", "good", "no more"), OR
       - You reach 5 asked questions.
    - Never reveal future queued questions in advance.
    - If no valid questions exist at start, immediately report no critical ambiguities.

6. Integration after EACH accepted answer (incremental update approach):
    - Maintain in-memory representation of the spec (loaded once at start) plus the raw file contents.
    - For the first integrated answer in this session:
       - Ensure a `## Clarifications` section exists (create it just after the highest-level contextual/overview section per the spec template if missing).
       - Under it, create (if not present) a `### Session YYYY-MM-DD` subheading for today.
    - Append a bullet line immediately after acceptance: `- Q: <question> → A: <final answer>`.
    - Then immediately apply the clarification to the most appropriate section(s):
       - Functional ambiguity → Update or add a bullet in Functional Requirements.
       - User interaction / actor distinction → Update User Stories or Actors subsection (if present) with clarified role, constraint, or scenario.
       - Data shape / entities → Update Data Model (add fields, types, relationships) preserving ordering; note added constraints succinctly.
       - Non-functional constraint → Add/modify measurable criteria in Success Criteria > Measurable Outcomes (convert vague adjective to metric or explicit target).
       - Edge case / negative flow → Add a new bullet under Edge Cases / Error Handling (or create such subsection if template provides placeholder for it).
       - Terminology conflict → Normalize term across spec; retain original only if necessary by adding `(formerly referred to as "X")` once.
    - If the clarification invalidates an earlier ambiguous statement, replace that statement instead of duplicating; leave no obsolete contradictory text.
    - Save the spec file AFTER each integration to minimize risk of context loss (atomic overwrite).
    - Preserve formatting: do not reorder unrelated sections; keep heading hierarchy intact.
    - Keep each inserted clarification minimal and testable (avoid narrative drift).

7. Validation (performed after EACH write plus final pass):
   - Clarifications session contains exactly one bullet per accepted answer (no duplicates).
   - Total asked (accepted) questions ≤ 5.
   - Updated sections contain no lingering vague placeholders the new answer was meant to resolve.
   - No contradictory earlier statement remains (scan for now-invalid alternative choices removed).
   - Markdown structure valid; only allowed new headings: `## Clarifications`, `### Session YYYY-MM-DD`.
   - Terminology consistency: same canonical term used across all updated sections.

8. Write the updated spec back to `FEATURE_SPEC`.

9. **Re-validate Spec Quality Checklist** (if it exists):
   - Check if `FEATURE_DIR/checklists/requirements.md` exists.
   - If it does NOT exist, skip this step silently.
   - If it exists:
     1. Read the checklist file.
     2. Identify all GitHub task-list checkbox lines — lines matching `- [ ]`, `- [x]`, or `- [X]` (case-insensitive, tolerant of leading whitespace for nested items) outside of code fences. Ignore all other content (headings, notes, non-checkbox bullets, metadata).
     3. For each checkbox line, record its current marker state (checked or unchecked) and item text into a before-snapshot list.
     4. Re-evaluate each checkbox item against the **updated** spec (the version just saved in step 7).
     5. For each checkbox item, update only if the checked/unchecked state actually changes:
        - If the item now passes and was unchecked: change `[ ]` to `[x]`.
        - If the item now fails and was checked: change `[x]`/`[X]` to `[ ]`.
        - If the state is unchanged: leave the marker as-is (preserve existing case to avoid cosmetic diffs).
     6. Save the updated checklist file. **Only toggle the `[ ]`/`[x]` marker portion of checkbox lines whose state changed.** All other file content — headings, metadata, notes, line ordering, whitespace — must remain unchanged to avoid noisy diffs.
     7. Compare the before-snapshot with the current state to compute three lists for the Completion Report:
        - **Newly passing**: items that changed from unchecked to checked.
        - **Regressions**: items that changed from checked to unchecked.
        - **Still unchecked**: items that remain unchecked.
     8. Record the before/after pass counts as checked/total checkbox items (e.g., "12/16 → 15/16 items passing").

Behavior rules:

- If no meaningful ambiguities found (or all potential questions would be low-impact), respond: "No critical ambiguities detected worth formal clarification." and suggest proceeding.
- If spec file missing, instruct user to run `/speckit-specify` first (do not create a new spec here).
- Never exceed 5 total asked questions (clarification retries for a single question do not count as new questions).
- Avoid speculative tech stack questions unless the absence blocks functional clarity.
- Respect user early termination signals ("stop", "done", "proceed").
- If no questions asked due to full coverage, output a compact coverage summary (all categories Clear) then suggest advancing.
- If quota reached with unresolved high-impact categories remaining, explicitly flag them under Deferred with rationale.

Context for prioritization: $ARGUMENTS

## Mandatory Post-Execution Hooks

**You MUST complete this section before reporting completion to the user.**

Check if `.specify/extensions.yml` exists in the project root.
- If it does not exist, or no hooks are registered under `hooks.after_clarify`, skip to the Completion Report.
- If it exists, read it and look for entries under the `hooks.after_clarify` key.
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

Report completion (after questioning loop ends or early termination):
- Number of questions asked & answered.
- Path to updated spec.
- Sections touched (list names).
- Spec quality checklist status (if `FEATURE_DIR/checklists/requirements.md` was re-validated): show before/after pass counts (e.g., "Spec Quality Checklist: 12/16 → 15/16 items passing") and list any items that changed state — both newly checked (unchecked → checked) and any regressions (checked → unchecked). If any items remain unchecked, list them as areas needing attention.
- Coverage summary table listing each taxonomy category with Status: Resolved (was Partial/Missing and addressed), Deferred (exceeds question quota, or remaining item is specifically implementation method, tech-stack comparison, or task breakdown), Clear (already sufficient), Outstanding (still Partial/Missing but low impact).
- If any Outstanding or Deferred remain, recommend whether to proceed to `/speckit-plan` or run `/speckit-clarify` again later post-plan.
- Suggested next command.

## Done When

- [ ] Spec ambiguities identified and clarifications integrated into spec file
- [ ] Spec quality checklist re-validated against updated spec (if `FEATURE_DIR/checklists/requirements.md` exists)
- [ ] Extension hooks dispatched or skipped according to the rules in Mandatory Post-Execution Hooks above
- [ ] Completion reported to user with questions answered, sections touched, checklist status, and coverage summary


---

## Lo que el manifiesto exige en esta operación

Cada fila es una cita literal del núcleo. No hay redacción propia: si una fila no puede responderse mirando un artefacto, eso es el hallazgo.

| Dónde lo dice el manifiesto | Qué exige | Dónde se comprueba |
|---|---|---|
| `SH-FUND` | El fundamento de producto es el contenido autorizado que establece qué debe construirse, por qué debe existir, qué resultados debe producir, qué condiciones debe respetar y cómo podrá determinarse su cumplimiento. No es un nuevo tipo de documento ni una plantilla obligatoria. Puede encontrarse en una Job Story, un Jobs to Be Done, una épica, una capacidad, un requisito, una regla de negocio, un recorrido, un criterio de aceptación o una combinación coherente de estos elementos. | El fundamento de producto |
| `STOP01` | No existe un fundamento de producto identificable o la solución parece preceder al problema. | El fundamento de producto |
| `SH-FUND` | Fuente y autoridad · ¿De dónde proviene y quién puede modificarlo? · Origen trazable y autoridad reconocida | El fundamento de producto |
| `SH-FUND` | Razón · ¿Qué situación, necesidad, problema u oportunidad aborda? · Justificación comprensible sin depender de la solución | El fundamento de producto |
| `SH-FUND` | Resultado · ¿Qué cambio o progreso debe producir? · Resultado reconocible para las personas o para el producto | El fundamento de producto |
| `SH-FUND` | Condiciones y límites · ¿Qué reglas, restricciones y exclusiones deben respetarse? · Límites suficientes para evitar decisiones silenciosas | El fundamento de producto |
| `SH-FUND` | Evidencia · ¿Cómo sabremos que se cumplió? · Criterios, observaciones o pruebas proporcionales al riesgo | El fundamento de producto |
| `CR02` | Identifica las fuentes autorizadas, explica el fundamento de producto y confirma el alcance completo. Reconoce la estructura utilizada por la definición; cuando contenga Job Stories, conserva su circunstancia, motivación y resultado. Separa evidencia de supuestos e identifica cualquier ambigüedad que pueda cambiar materialmente la solución. | Ficha de Job Story cuando aplique · Mapa del fundamento |
| `O01` | Fuentes autorizadas y fundamento de producto que justifican el desarrollo. | Mapa del fundamento |
| `STOP04` | Una ambigüedad material está siendo resuelta por el agente sin autorización. | Mapa del fundamento |
| `CR03` | Da cuenta de todos los elementos obligatorios y establece sus dependencias, bloqueantes, orden, integración y pruebas. No selecciones, omitas ni postergues partes del alcance por iniciativa propia. Si las restricciones impiden cubrirlo, solicita una decisión a la autoridad de producto. | Cobertura |
| `STOP02` | El plan no da cuenta de todo el alcance obligatorio definido por producto. | Cobertura |
| `STOP03` | Se pretende omitir, modificar o postergar una parte sin una decisión autorizada. | Cobertura |
| `SH-FUND` | Toda omisión, modificación o postergación debe ser explícita, trazable y aprobada por la autoridad de producto. | Cobertura |
| `SH-FUND` | Si las restricciones de tiempo, recursos o tecnología impiden cubrir el alcance, el plan debe hacer visible la incompatibilidad y solicitar una decisión. | Cobertura |
| `SH-FUND` | Una estrategia incremental, por fases o por releases puede utilizarse cuando el proyecto la adopta; no es una obligación del núcleo. | Cobertura |
| `SH-FUND` | La completitud se determina reconciliando la implementación y la evidencia contra la definición de producto completa y sus excepciones aprobadas. | Cobertura |
| `SH-FUND` | Definición de producto · Qué debe construirse y bajo qué condiciones · Todo elemento obligatorio tiene cobertura o una excepción aprobada | Cobertura |
| `SH-FUND` | Jobs to Be Done · Qué progreso general merece atención cuando esta forma resulta aplicable · El resultado sigue siendo relevante para la persona | Cobertura |
| `SH-FUND` | Job Story · Qué circunstancia concreta debe atenderse cuando la fuente utiliza esta forma · La historia está validada y no prescribe una solución no autorizada | Cobertura |
| `SH-FUND` | Diseño e implementación · Qué comportamiento responde al fundamento · Cada elemento tiene una razón trazable | Cobertura |
| `SH-FUND` | Aceptación · Qué evidencia autoriza declarar completo el desarrollo · Resultados, reglas y criterios se cumplen bajo las condiciones definidas | Cobertura |
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
| `D02` | Definir estados, decisiones, restricciones y criterios de aceptación con el nivel necesario para el riesgo. · No convertir un prompt vago en una implementación extensa y luego usar el código para descubrir el problema. | Modelo de estados |
| `O04` | Evidencia disponible, supuestos y criterios de resultado. | Plan de aceptación |
| `O09` | Riesgos, incertidumbres, pendientes, excepciones y decisiones que aún requieren juicio humano. | todos los objetos |
| `SH-STOP` | Regla de detención antes de generar | todos los objetos |
