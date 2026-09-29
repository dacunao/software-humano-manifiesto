# Correspondencia de las traducciones del núcleo con el original

**Fecha:** 2026-09-28 · **Pedido de:** Damián Acuña · **Archivos:** `nucleo-v2.1.en.revisado-2026-09-21.md` (SHA-256 `171fb51e…`) y `nucleo-v2.1.pt-br.revisado-2026-09-21.md` (SHA-256 `5d4bd029…`).
**Original:** `docs/method/Manifiesto_Software_Humano_IA_Nucleo_v2.1.md` (SHA-256 `9beef610…`).

Esta es una verificación del agente. **No es la revisión profesional de T100 ni aprueba ningún idioma.**

## Procedencia

- Los archivos provienen del piloto anterior: revisan los borradores de `sitio-software-humano/src/content/canonico/` (commit `d9b4f05`, 2026-09-21).
- El original del que se tradujeron es el mismo que gobierna este sitio: el núcleo del piloto anterior tiene la misma huella (`9beef610…`) y no cambió desde el 2026-09-21.
- El encabezado de ambos declara una «revisión bilingüe contra el original» y aclara que **no** es el registro de aprobación por hablante nativo. Cita identificadores del piloto anterior (`BR-003`, `CL-09`), que no rigen aquí.

## Estructura (comprobación automática)

| Comprobación | `en` | `pt-BR` |
|---|---|---|
| Bloques (títulos, párrafos, listas, tablas) | 415 de 415, mismo orden y tipo | 415 de 415, mismo orden y tipo |
| Identificadores (`P01`, `D01`, `STOP01`…) y enlaces | Idénticos en cada bloque | Idénticos en cada bloque |
| Dimensiones de las tablas | Idénticas | Idénticas |
| Bloques con longitud atípica (posible omisión) | Ninguno | Ninguno |
| Anclas | Las 18 del original, más 9 derivadas de títulos en español | Igual que `en` |
| Agregado | Aviso de traducción al inicio | Aviso de traducción al inicio |

## Fidelidad (lectura completa, bloque por bloque)

**Veredicto:** ambas son fieles. Ningún hallazgo cambia la fuerza normativa (debe, puede, solo, negaciones) ni omite o agrega cláusulas con efecto doctrinal. El portugués es de Brasil, sin formas europeas.

### Observaciones de gravedad media

| Bloque | Idioma | Original | Traducción | Qué diverge |
|---|---|---|---|---|
| 25 | en | «entregas» | «releases» | «releases» es un concepto que el núcleo declara no obligatorio; en otros bloques «entrega» es «delivery» |
| 368 | en | «dentro de un Jobs to Be Done» | «within the Jobs to Be Done framework» | Convierte un trabajo concreto de nivel superior en el marco metodológico |
| 341 | en, pt | «al mismo Jobs to Be Done de nivel superior» | «Jobs to Be Done outcome» / «resultado … em Jobs to Be Done» | Llama «resultado» al trabajo, término reservado para la Job Story |
| 384 | en | «¿…y qué puede esperar?» | «what can wait?» | El español admite dos lecturas (qué anticipar o qué posponer); la traducción fija una. **Decide el autor** |

### Observaciones de gravedad baja

- `en`: «confianza» → «confidence» en los bloques 14 y 75 (en el resto, «trust»); «Resolver alternativas» → «Evaluate» (25); se pierde «delante de ella» (43); «debe existir» → «should» (213); cambio de sujeto (129); «Jerarquizar» → «Prioritise» (140); «bloqueos» → «obstacles» (341); «pasos consumidos» → «completed» (343); «no distingue» → «cannot distinguish» (330); «terminado» con tres traducciones distintas (389).
- `pt-BR`: celda del índice ampliada (8); cambia el agente de «obligar a deformar» (15); «resultar» → «parecer» (105); cambio de sujeto (129); «recorrido» traducido como «jornada» o «percurso» según el bloque.

## Incorporación al sitio (T084, parte canónica)

Por decisión de Damián Acuña (2026-09-28), estas traducciones son la base de los 341 nodos canónicos en `src/content/traducciones-canon/`, en estado `borrador`. La alineación de bloques a nodos fue exacta en los dos idiomas. Se aplicaron 19 correcciones: las observaciones anteriores, salvo tres que se dejaron como estaban:

- la pregunta 9 (bloque 384): el autor confirmó el 2026-09-28 que significa «qué puede quedar para después» (P04), como la traducen «what can wait?» y «o que pode esperar?»;
- el sujeto del bloque 129, porque el español admite las dos lecturas;
- «jornada» y «percurso» en portugués, porque unificarlos obliga a cambiar la concordancia de género y ambos son usuales en Brasil.

Las celdas del índice (bloque 8) y la frase del bloque 15 se corrigieron también en inglés, que tenía la misma desviación. Construcción, `RV-01`–`RV-14`, 54 pruebas unitarias y 747 de extremo a extremo en verde.
