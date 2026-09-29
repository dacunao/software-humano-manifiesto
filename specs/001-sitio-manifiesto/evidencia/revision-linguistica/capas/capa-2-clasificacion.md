# Capa 2 · Clasificación de los hallazgos de LanguageTool (T183)

**Fecha:** 2026-09-29 · **Herramienta:** LanguageTool 6.6 local, en `en-GB` y `pt-BR`, con la regla `OXFORD_SPELLING_Z_NOT_S` desactivada, porque el núcleo aprobado usa el británico en «-ise» · **Informe completo:** `capa-2-gramatica.json` (116 hallazgos).

El resultado es **determinista**: la misma entrada da la misma salida. La clasificación es del agente y queda para tu revisión en T187.

## Errores reales

| Texto | Idioma | Qué | Corrección propuesta |
|---|---|---|---|
| `canon::principio-2-03` (frase de P02) y su uso en el copy (`VERB_COMMA_CONJUNCTION`) | pt-BR | «Se funciona mas desgasta, ainda não funciona bem.» La norma pide una coma antes de «mas», la conjunción adversativa | «Se funciona, mas desgasta, ainda não funciona bem.» |

## Observación de estilo, para decidir

| Regla | Idioma | Qué |
|---|---|---|
| `PT_BARBARISMS_REPLACE_STATUS` (6 veces) | pt-BR | «status técnico» como rótulo de tipo de contenido, mientras el núcleo usa «estado». Es aceptable en Brasil, pero no es uniforme |

## Falsos positivos, por clase

| Clase | Reglas | Por qué no es un error |
|---|---|---|
| Préstamos correctos | `MORFOLOGIK_*` en *scorecard*, *releases*, *trade-offs*, *happy path*, *features* | Son términos usados deliberadamente, igual que en el núcleo aprobado |
| Grafías correctas que el diccionario no conoce | `MORFOLOGIK_RULE_PT_BR` en «antipadrões», «microinterações», «prototipar» | Son válidas en el portugués de Brasil actual |
| «uma Job Story» | `GENERAL_GENDER_AGREEMENT_ERRORS` | Femenino por «história», el mismo criterio del núcleo aprobado |
| Pronombre después de un infinitivo | `COLOCACAO_PRONOMINAL_COM_ATRATOR_SIMPLES` | «não multiplicá-la» y «sem dividi-las» son correctos: con infinitivo, la norma también admite el pronombre pospuesto |
| «anti-patterns» con guion | `EN_COMPOUNDS_ANTI_PATTERN(S)` | Es la grafía del núcleo aprobado; las dos formas son válidas |
| Coma antes de «and» o «quando» | `COMMA_COMPOUND_SENTENCE_2`, `VERB_COMMA_CONJUNCTION` (con «quando») | Es una preferencia de estilo; las frases son correctas |
| Concordancias correctas | `GENERAL_VERB_AGREEMENT_ERRORS`, `REFLEXIVE_VERB_SE_AGREEMENT`, `NON_IMPERSONAL_VERBS`, `PCT_SINGULAR_NOUN_PLURAL_VERB_AGREEMENT`, «um mostra» y «um poupa» | El sujeto real concuerda: una oración de infinitivo, un plural elíptico («a hundred [inconsistencies]») o un sustantivo masculino implícito |
| Verbos tomados por sustantivos | `PARONYM_PUBLICA_535`, `LP_PARONYMS` | «os publica» y «a leitura continua» son verbos |
| «por que» y «por quê» | `POR_QUE_PORQUE` | Preguntas indirectas y «por quê» elíptico, bien escritos |
| Otros | `ALERTAS_BR`, `ATD_VERBS_TO_COLLOCATION`, `ADMIT_ENJOY_VB`, `IT_IS_JJ_TO_VBG`, `DOUBLE_NEGATIVE` («what nobody asked for»), `UPPERCASE_SENTENCE_START` (rótulos de interfaz) | Construcciones correctas |
| Estilo, redundancia, registro | Categorías `STYLE`, `REDUNDANCY`, `FORMAL`, `ACADEMIC`, `SHORTEN_IT`, `CLARITY`, `REPETITIONS_STYLE` | Son sugerencias de redacción, no errores. Aplicarlas alejaría la traducción del español, que es la referencia |
