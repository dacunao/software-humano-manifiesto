# Cómo funcionó el método en la práctica · sitio del Manifiesto

**Fecha:** 2026-09-29 · **Pedido de:** Damián Acuña, por medio de la sesión «Manifiesto Software Humano: gobernanza inicial» · **Alcance:** este repositorio, del 2026-09-27 al 2026-09-29 (116 commits).

Este informe **observa y no propone**. La bitácora es [`registro-del-piloto.md`](registro-del-piloto.md) (entradas A1–A8, B1–B6 y C1–C6).

**Hecho** es lo que consta en los artefactos, el historial de git o esta sesión. **Suposición** es lo que el agente infiere y no puede comprobar. La conversación se compactó varias veces, así que de las sesiones anteriores solo conozco lo que quedó en los artefactos y en los resúmenes; lo marco donde importa.

## 1 · Comandos invocados, en orden

Hechos, según el historial de git y los artefactos:

| Comando | Uso | Evidencia |
|---|---|---|
| `constitution` | Una vez, el 2026-09-27 | Commit «materializar constitución con el núcleo Software Humano v2.1» |
| `specify` | Una vez | Commit «especificar el sitio del Manifiesto a partir del PRD v1.0» |
| `clarify` | **No hay evidencia de que se invocara** | `spec.md` no tiene sección de aclaraciones y ningún commit lo menciona. Las decisiones materiales se tomaron en la conversación y se registraron en `AGENTS.md` y en el PRD |
| `plan` | Una vez; luego, `spec.md` y `plan.md` se editaron a mano para cada PRD nuevo (v1.1 a v1.6) | Commits «spec y plan: actualizar a PRD v1.x» (B4: no hay un comando para propagar un cambio del fundamento) |
| `tasks` | Una vez, con 106 tareas | Commit «derivar 106 tareas trazables del plan» |
| `analyze` | 10 veces | Commits «analyze…», del 2026-09-27 al 2026-09-29 |
| `implement` | Invocado como comando al menos en la fase 20, donde consta en esta sesión. En las demás fases, el agente implementó siguiendo `tasks.md`, casi siempre tras ejecutar a mano el gancho `before_implement` | *Suposición*: en las sesiones compactadas pudo haberse invocado más veces; no lo puedo comprobar |
| `converge` | 7 veces (fases 17, 20, 21, 22, 24, 25 y 30) | Commits «converge…» y encabezados «Convergence» en `tasks.md` |
| `speckit-conformidad-comprobar` | Como gancho `before_implement`, antes de cada implementación en esta sesión, y una vez a pedido de Damián | Salidas en la sesión |

**Modo:** comandos sueltos. `workflow run` **no se usó nunca**: ningún commit lo menciona y en esta sesión no se ejecutó, aunque el workflow `software-humano` está instalado en `.specify/workflows/`. *Suposición sobre el porqué:* el trabajo avanzó turno a turno, con decisiones de la autoridad en la conversación; el agente eligió el comando siguiente según lo que pedía cada turno y no delegó el ciclo en el workflow. No quedó registrada una razón explícita.

## 2 · La conformidad

- **Nunca detuvo nada.** En esta sesión dio siempre «9 con contenido · 0 con excepción aprobada · 0 sin declarar». El registro (A3) consigna «7 con contenido y 0 sin declarar» tras el plan inicial.
- **No se declaró ninguna excepción aprobada.**
- **Qué comprueba:** que las secciones existan y tengan contenido. No comprobó, ni está hecha para comprobar, si lo escrito es bueno ni si la experiencia coincide con él.

## 3 · Dónde el método cambió una decisión

Hechos, cada uno con su commit:

1. **`analyze` antes de implementar (A4, 2026-09-27).** Detectó que las pruebas con personas estaban al final, después de diseñar y traducir. Damián agregó una ronda temprana. Detectó también una regla de validación que habría dejado la construcción rota durante nueve fases.
2. **`analyze` de la fase 20 (A6).** La ronda temprana habría observado la estructura anterior del sitio, y la búsqueda solo tenía el caso en que todo sale bien. Se corrigió antes del código.
3. **Las reglas deterministas del contenido (`RV-11`, `RV-13`, `RV-14`).** Detuvieron construcciones con enlaces rotos, pasajes duplicados o mezcla de idiomas en la búsqueda (A5, B3).
4. **`analyze` tras la aprobación lingüística (2026-09-28, I1).** Señaló que traducir las páginas contradecía el orden fijado («después de la fase 12»), porque la ronda temprana seguía abierta. Damián lo resolvió cerrando T086 con la retroalimentación de quienes revisaban el sitio.
5. **`analyze` de la fase 28 (G2).** Aplicó `V12` a las salidas de modelo de la verificación de traducciones: se exigió marcarlas como observaciones por confirmar, no como veredictos.
6. **`converge` como T109.** Encontró seis brechas, dos de ellas en trabajo que se había dado por terminado:
   - T187 figuraba cerrada, pero el documento consolidado no existía;
   - el aviso de la descarga no estaba aprobado, la comprobación previa no lo cubría y el código tenía un comentario que afirmaba una aprobación inexistente.

   Se corrigieron en la fase 30.
7. **La regla 11 y el `STOP`.** El agente se detuvo antes de marcar como aprobadas unas traducciones revisadas solo por un agente, citando `AGENTS.md` y el PRD (A7). La autoridad decidió de forma explícita.

## 4 · Dónde estorbó

Hechos:
- **Shim de PyYAML (B1).** Hay que anteponerlo en cada script.
- **`specify` sin descripción (B2).** Hubo que interpretar la invocación vacía.
- **Sin comando para propagar un cambio del fundamento (B4).** El tramo PRD → especificación y plan se hizo a mano seis veces.
- **Servicios externos gratuitos (B6).** El revisor externo de la verificación de traducciones no estuvo disponible: Gemini, saturado; Mistral, sin cupo. No es fricción del método, sino de la ejecución de RQ-19.

*Suposición:* reescribir `spec.md` y `plan.md` a mano para cada versión del PRD fue el costo recurrente más alto del método. No lo medí.

## 5 · Trabajo fuera del método y qué pasó al volver

### Tramos en que se trabajó fuera del ciclo

Hechos:

| Cuándo | Qué se produjo fuera | Cómo se volvió |
|---|---|---|
| 2026-09-28, T123–T126 (C4) | Cuatro ajustes de navegación implementados directamente desde la conversación | Se registraron después en tareas, investigación y plan. El `analyze` posterior encontró desajustes que habría detectado antes: RQ-06 y el plan desactualizados, una cita del PRD mal atribuida y la referencia al original rota en inglés y portugués |
| 2026-09-28, revisión con el propio manifiesto | Un informe de calidad hecho en la conversación, fuera de cualquier comando | Quedó como evidencia en `specs/…/evidencia/`. Su hallazgo principal era falso: suponía que no había evidencia de personas porque la retroalimentación llegaba sin origen (C5) |
| 2026-09-28, incorporación del núcleo traducido (T084) | Se implementó **sin ejecutar antes** el gancho de conformidad | El agente lo reconoció cuando Damián preguntó «¿estamos trabajando con el método?», y lo ejecutó entonces (pasó) |
| 2026-09-28, aprobación de `en` y `pt-BR` por la autoridad | La decisión se registró en `AGENTS.md` y en las tareas, pero no en la especificación, el plan, la investigación ni el `quickstart` | Se propagó a mano; el `analyze` posterior (I2–I6) encontró referencias viejas a la revisión profesional en T099, T101, T102 y en la nota de dependencias |
| 2026-09-29, fases 29, 31 y 32, T205, T218 y T219 | Cambios pedidos en la conversación: la página Acerca, la navegación estándar, los once hallazgos del recorrido, la tabla de contenido, el enlace a sí mismo y la búsqueda | Se registraron como tareas **antes** de implementar (la lección de C4) y se implementaron tras el gancho de conformidad. **No pasaron por `analyze`.** El `converge` de T109 corrió antes de ellas, así que tampoco las cubrió |
| 2026-09-29, script de ortografía | Se ejecutó sin querer al importarlo para probarlo | Lo detectó el propio agente al ver «centerd» en la salida; ninguna comprobación del método lo señaló (C6) |

### ¿El método detectó el trabajo hecho fuera?

- **Sí, cuando se volvió a ejecutar un comando.** `analyze` y `converge` encontraron desajustes concretos del trabajo hecho fuera: C4, I1–I6 y las brechas F1 y F2 de T109. Ninguna comprobación automática lo señaló por sí sola, antes de que alguien invocara el comando.
- **No, en la experiencia.** Cuatro defectos de lo hecho en la conversación los encontró Damián al usar el sitio, no una comprobación del método:
  - «En esta página» dejaba fuera secciones;
  - al cambiar de idioma se perdía la posición;
  - «Enlace a esta sección» se enlazaba a sí mismo;
  - la búsqueda no permitía navegar con el teclado.

  Después se agregaron pruebas permanentes para los cuatro, pero el método no los anticipó. *Suposición:* los comandos revisan la coherencia entre artefactos y el código contra las tareas, no si la experiencia coincide con los principios. Por eso estos defectos no podían aparecer en `analyze`, `converge` ni en la conformidad.

### ¿Quedó algo sin cobertura?

- **Hecho:** las fases 29, 31 y 32 y las tareas T205, T218 y T219 **no pasaron por `analyze` ni por un `converge` posterior**. Tienen tareas, pruebas y commits, pero ningún comando del método revisó su coherencia con la especificación y el plan.
- **Hecho:** `plan.md` y `spec.md` no se actualizaron para la navegación estándar (fase 31) ni para la página Acerca del Manifiesto (fase 29). Esas decisiones constan en `AGENTS.md` y en `tasks.md`, no en esos dos artefactos.
- *Suposición:* un `converge` o un `analyze` ahora encontraría esos desajustes. No lo he ejecutado para este informe.

## 6 · Lo que no tengo

- Tiempos, horas y costo por comando: no los medí.
- Cuántas veces se invocó `implement` como comando en las sesiones compactadas: no consta en los artefactos.
- El efecto del método en las personas que usan el sitio: la ronda final con personas (T103–T104) no se ha hecho.
