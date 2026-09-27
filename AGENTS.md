# Instrucciones persistentes para agentes

Este archivo es la **fuente única** de las reglas que gobiernan el trabajo de cualquier agente en este repositorio. Es neutral respecto del agente: sirve para Claude Code, Codex, Cursor, Gemini, Copilot o cualquier otro que lea instrucciones persistentes del proyecto.

Si tu agente carga un archivo distinto —`CLAUDE.md`, por ejemplo—, ese archivo debe **referenciar** este, no duplicarlo. Dos copias de instrucciones rectoras divergen; el anexo lo prohíbe expresamente.

## Mandato

Este repositorio aplica el **Núcleo del manifiesto para el desarrollo de software humano con inteligencia artificial v2.1** mediante la adaptación Software Humano para SpecKit, y preserva íntegramente el fundamento de producto autorizado.

No conviertas estas instrucciones en una metodología adicional. Usa el flujo nativo de SpecKit y los artefactos que ya define el núcleo.

## Lectura obligatoria antes de actuar

Lee completos y en este orden:

1. `docs/method/Manifiesto_Software_Humano_IA_Nucleo_v2.1.md`
2. El fundamento de producto autorizado de este proyecto — ver **Completar por proyecto**
3. `docs/method/Anexo_Aplicacion_SpecKit_v2.0.md`
4. `docs/method/GUIA_DE_IMPLEMENTACION_SPECKIT.md`
5. `instructions/00_REQUISITOS_DE_INSTALACION.md`
6. Los artefactos vigentes de `.specify/`, una vez que existan

No basta con buscar palabras o leer resúmenes. Los identificadores permiten navegar y citar; no sustituyen el pasaje completo.

## Autoridad

- El **núcleo** gobierna principios, doctrina, flujo, artefactos, contrato del agente, detenciones, verificación y gobernanza.
- El **fundamento de producto** gobierna visión, alcance completo, requisitos, no objetivos, decisiones aprobadas y aceptación.
- El **anexo** gobierna la correspondencia entre el núcleo y SpecKit.
- El **preset** gobierna la materialización técnica de esa correspondencia.
- **SpecKit** conserva su comportamiento nativo donde el preset no interviene.

El núcleo y el fundamento no compiten: el núcleo gobierna el método y los criterios; el fundamento gobierna el producto.

No alteres silenciosamente una fuente para acomodarla a otra. Si detectas incompatibilidad, cita ambas disposiciones, explica el impacto y detén la decisión afectada.

## Reglas de trabajo

1. Comprende la definición completa antes de proponer **cualquier cosa**: componentes, código, arquitectura, una dirección de diseño, una alternativa o un enfoque. Consulta la doctrina que gobierna esa decisión **antes de formular la propuesta**, no después de que alguien la cuestione.
2. Conserva todos los identificadores del fundamento de producto sin renumerarlos ni reagruparlos.
3. No asignes prioridad, MVP, releases, independencia ni incrementalidad salvo autorización expresa del fundamento.
4. Ordena el trabajo por dependencias, bloqueantes, integración y riesgo sin reducir alcance.
5. Distingue hechos, evidencia, supuestos, inferencias, recomendaciones y decisiones humanas.
6. Utiliza la solución más simple que satisfaga lo aprobado; no agregues modos, paneles, configuraciones, abstracciones ni documentos sin fundamento.
7. Trata experiencia, accesibilidad, rendimiento, confianza, continuidad y control como parte de la funcionalidad.
8. No confundas código correcto, build exitoso o pruebas verdes con aceptación del producto.
9. No te atribuyas revisión humana, excepción aprobada ni autoridad para modificar el fundamento.
10. Mantén trazabilidad bidireccional entre fuente, especificación, plan, tareas, código y evidencia.
11. **Antes de abrir una decisión a la persona, comprueba que las fuentes rectoras no la resuelvan ya.** Debes poder nombrar qué fuente consultaste. Una pregunta cuya respuesta ya está escrita no es deferencia: traslada a la persona un trabajo que te corresponde y gasta la atención que `P06` protege.

Las reglas 1 y 11 existen porque los comandos `speckit.*` solo gobiernan mientras uno de ellos corre. **Una propuesta hecha en conversación, una pregunta formulada en el chat o un informe presentado fuera de un artefacto no pasan por ninguno de ellos.** Este archivo es la única capa presente en ese territorio, y ahí ocurrieron los tres fallos de juicio del primer piloto real.

## Flujo SpecKit obligatorio

1. Comprueba el entorno con `instructions/00_REQUISITOS_DE_INSTALACION.md` y `tools/speckit/preflight.sh`.
2. Instala y verifica el preset siguiendo `instructions/01_INSTALAR_Y_VERIFICAR_SPECKIT.md`.
3. Materializa la constitución v2.1 completa.
4. Ejecuta `specify` usando el fundamento completo como fuente autorizada.
5. Ejecuta `clarify` en rondas focalizadas hasta resolver las decisiones materiales necesarias.
6. Ejecuta `plan` para todo el alcance; crea auxiliares solo cuando respondan una pregunta necesaria.
7. Ejecuta `tasks` con cobertura completa y evidencia trazable.
8. Ejecuta `analyze` sin modificar los artefactos examinados.
9. Presenta los resultados en lenguaje natural y espera revisión humana.
10. Ejecuta `implement` solo después de autorización explícita.
11. Ejecuta `converge` para cerrar brechas del alcance aprobado; no para agregar producto nuevo.

## Condiciones de detención

Detente cuando:

- una ambigüedad pueda cambiar alcance, reglas, derechos, seguridad, contenido o experiencia;
- una fuente autorizada contradiga otra;
- falte autoridad para una decisión irreversible o sensible;
- un requisito, principio, idioma o criterio de aceptación pierda cobertura;
- el plan o una tarea agregue una capacidad sin fundamento;
- exista riesgo de sobrescribir cambios humanos en `.specify/`, documentos rectores o código;
- la constitución no pueda verificarse completa;
- una acción requiera modificar el core de SpecKit o el preset para continuar;
- el resultado solo tenga evidencia técnica y se intente declarar aceptación humana.

Una detención útil indica: el hecho, la evidencia, el impacto, la decisión requerida y la acción que no ejecutaste.

## Archivos protegidos por autoridad

No modifiques sin instrucción humana explícita:

- `docs/method/Manifiesto_Software_Humano_IA_Nucleo_v2.1.md`
- `docs/method/Anexo_Aplicacion_SpecKit_v2.0.md`
- El fundamento de producto autorizado
- El directorio del preset en `tools/speckit/`
- `SHA256SUMS`

Si una implementación revela una mejora posible, regístrala como propuesta separada. No la incorpores retroactivamente a las fuentes.

## Notas de entorno que ahorran tiempo

Estas no son doctrina. Son fricciones reales observadas en instalaciones anteriores.

- **Scripts de SpecKit y PyYAML.** `.specify/scripts/bash/common.sh` usa el primer `python3` del `PATH`. Si no tiene PyYAML, toda resolución de plantillas falla. Antepón el shim del repositorio: `PATH="$PWD/tools/speckit/shim:$PATH"`. No modifiques `.specify/scripts/`: son copias generadas y una actualización las reescribiría.
- **Versión de SpecKit.** Si la instalación global está fuera del rango del preset, usa `tools/speckit/specify`, que fija una instancia aislada sin tocar otros proyectos.
- **Constancia de procedencia.** No modifiques `.specify/memory/.constitution-template.json`. Su desajuste tras materializar la constitución es deliberado: hace que el CLI trate la constitución como documento humano y no la sobrescriba.
- **Estado de la integración.** Tras instalar el preset, `integration status` reporta `warning` con 8 archivos modificados. Es el resultado esperado: son los ocho comandos que el preset compone. Verifica que sean exactamente esos ocho y que no incluyan `checklist` ni `taskstoissues`.

## Comunicación con la persona

- Explica resultados, decisiones, riesgos y evidencia en lenguaje natural.
- Cuando muestres código o comandos, acompáñalos con la consecuencia que producen.
- No ocultes pendientes bajo un estado exitoso.
- Distingue avance técnico, cobertura del alcance y aceptación humana.
- Antes de solicitar autorización para implementar, resume fuente, cobertura, decisiones, riesgos y evidencia esperada.

---

# Completar por proyecto

**Todo lo anterior es invariante y se aplica a cualquier proyecto que use este método. Lo que sigue es específico de este repositorio y debe completarse antes de ejecutar `specify`.**

> **Por eso este archivo queda fuera de `SHA256SUMS`.** Está diseñado para que cada proyecto lo edite, de modo que no es un archivo invariante del método. `SHA256SUMS` verifica el manifiesto, el anexo, el preset, las instrucciones y las herramientas: todo lo que **no** debe cambiar. Si la verificación de integridad falla, hay un problema real; completar esta sección nunca la rompe.

Si un campo está sin completar, el agente debe detenerse y solicitarlo. No lo infiera.

## Producto

- **Nombre del proyecto**: `[completar]`
- **Qué construye este repositorio**: `[una o dos frases]`

## Fundamento de producto autorizado

- **Ruta**: `docs/product/[completar]`
- **Versión**: `[completar]`
- **Autoridad de producto**: `[nombre de la persona o función que puede modificar el alcance]`

Solo esa autoridad puede aprobar cambios de alcance, resultados, exclusiones o estado de publicación. El agente puede proponer alternativas y señalar contradicciones; no puede aprobarlas.

## Identificadores que deben preservarse

Enumera las familias de identificadores del fundamento que el agente debe conservar sin renumerar. Ejemplo de formato:

- `[JS-01]`–`[JS-nn]` — `[qué son]`
- `[FR-001]`–`[FR-nnn]` — `[qué son]`
- `[AC-01]`–`[AC-nn]` — `[qué son]`

`[completar, o escribir «ninguna: el fundamento no usa identificadores estables»]`

## Decisiones técnicas aprobadas

Decisiones que el fundamento ya aprobó y que el agente **debe preservar**, no reabrir. Una tecnología aprobada solo puede reemplazarse mediante decisión humana y evidencia de incompatibilidad material; preferencia personal o conveniencia del agente no bastan.

- `[completar: lenguaje, framework, bibliotecas, fuente de contenido, restricciones de arquitectura]`
- `[o escribir «ninguna: el plan puede proponerlas con fundamento»]`

## Contrato lingüístico

`[completar si el producto es multilingüe: idiomas, rutas, variante de cada idioma, reglas de traducción y revisión]`

`[o escribir «no aplica: producto monolingüe»]`

## Herramientas del proyecto

- **Gestor de paquetes y ejecutor**: `[completar, por ejemplo bun, pnpm, npm]`
- **Otras restricciones de herramientas**: `[completar o «ninguna»]`

## Protocolo de coordinación entre sesiones

Complétalo **solo si más de un agente o sesión trabajará sobre este proyecto**, o sobre este y otro relacionado. Si trabaja una sola sesión, escribe «no aplica» y sáltalo.

**Por qué existe.** La coordinación entre agentes puede desplazar a la autoridad humana de su propio proyecto sin que ningún mecanismo lo señale. Dos agentes que se verifican mutuamente detectan bien lo que uno ve y el otro no, y son **estructuralmente ciegos a lo que ambos omiten**. Que la persona siga dentro de la conversación es justamente lo que ninguno de los dos comprueba.

No es hipotético: ocurrió durante el desarrollo de este método, entre dos sesiones que lo aplicaban deliberadamente. Está registrado como `M1` en `docs/proposals/` del repositorio del paquete.

- **Sesiones previstas y su autoridad**: `[qué trabaja cada una y sobre qué repositorio; qué puede decidir cada una por sí misma]`
- **Archivos que más de una sesión puede tocar**: `[los puntos de colisión reales, o «ninguno»]`
- **Qué exige aprobación humana previa**: `[decisiones que ninguna sesión cierra por su cuenta, aunque estén de acuerdo entre ellas]`
- **A quién reporta cada sesión**: `[la autoridad humana, siempre; nunca solo a la otra sesión]`

**Regla de confirmación.** Ningún commit antes de que la autoridad humana haya visto de qué se trata. Un trabajo correcto que la persona no pudo seguir infringe `P10` aunque no contenga ningún error técnico.

**Coordinación directa entre sesiones.** Cuando sea inevitable —dos sesiones tocando el mismo archivo—, pasa primero por la autoridad humana, que decide si hace falta. Acuerda antes de escribir, no después, y deja constancia de qué se acordó.


## Archivos protegidos adicionales

Más allá de los protegidos por el método, este proyecto protege:

- `[completar o «ninguno»]`

## Decisiones abiertas conocidas

Decisiones que el fundamento declara pendientes de autoridad humana y que **no pueden cerrarse con valores predeterminados**:

- `[completar o «ninguna»]`
