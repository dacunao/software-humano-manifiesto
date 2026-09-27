# Registro del piloto

Obligación del PRD §12 (objetivo 8) y §23.4. Registra dónde el preset hizo lo que debía (**A**), las fricciones operativas (**B**) y los defectos o mejoras candidatas (**C**).

Límite, textual de PRD §23.4: «Esos hallazgos servirán para evaluar el preset; no autorizan a modificar el manifiesto o el paquete durante la ejecución sin una decisión separada.»

Versiones evaluadas: SpecKit 1.0.8, preset `software-humano` 2.0.0, conformidad 2.1.0 y workflow 2.0.0.

---

## A · Lo que funcionó

- **A1 · Constitución completa y verificable** (2026-09-27). La plantilla resuelta era el núcleo v2.1 íntegro; solo cambiaban los niveles de encabezado y el orden de `SH-GOV`/`SH-DONE`. Las quince familias (82 identificadores) se comprobaron automáticamente.
- **A2 · La constancia de procedencia hizo segura la sobrescritura** (2026-09-27). La huella de `.constitution-template.json` probó que la constitución previa era el andamiaje nativo sin cambios humanos.
- **A3 · Los apéndices del manifiesto llegan a la especificación y al plan** (2026-09-27). Las secciones nativas (`Success Criteria`, `Edge Cases`) se conservan, y `conformidad.sh` reconoce las secciones del manifiesto: 7 con contenido y 0 sin declarar tras el plan.

## B · Fricciones operativas

- **B1 · PyYAML** (2026-09-27). Todo script de `.specify/scripts/bash/` necesita el shim; sin él, la resolución de plantillas falla. Documentado en `AGENTS.md`; sigue siendo un paso que el agente debe recordar.
- **B2 · `specify` sin descripción** (2026-09-27). El comando nativo exige una descripción y marca error si llega vacío. En este método la fuente es el PRD completo, así que el agente tuvo que interpretar la invocación vacía como «usa el fundamento». Funciona, pero depende de que el agente lea `AGENTS.md`.

## C · Defectos y mejoras candidatas

- **C1 · La plantilla de especificación empuja prioridades y MVP** (2026-09-27; PRD §23.4, caso 1). El comentario nativo de `User Scenarios & Testing` pide historias «PRIORITIZED», «Priority: P1», «Independent Test» y un «viable MVP». El preset agrega el apéndice del manifiesto, pero no neutraliza ese comentario, que contradice `SH-FUND` y la regla 3 de `AGENTS.md`. Aquí no causó daño porque el agente lo detectó y lo registró en la especificación, pero la presión la ejerce la plantilla, no el agente. Candidata: que el preset anote o reemplace ese comentario.
- **C2 · La plantilla de `AGENTS.md` no tiene dónde declarar una lectura sin autoridad** (2026-09-27). Para nombrar el traspaso del piloto anterior hubo que inventar una nota. La sesión de gobernanza ya lo había señalado.
- **C3 · El PRD fija versiones del método que luego cambian** (2026-09-27; PRD §23.4, caso 4). PRD §2.1, §23.2 y `FR-009` fijaban el preset 1.0.0. La autoridad lo resolvió tratando la versión como dato. Candidata para la plantilla de fundamento: pedir que las versiones del método se declaren como referencia fechada, no como requisito.
