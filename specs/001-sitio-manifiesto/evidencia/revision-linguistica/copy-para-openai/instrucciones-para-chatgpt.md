# Instrucciones para ChatGPT

Pega este texto completo en ChatGPT y, a continuación, el contenido de **una** parte (`copy-es-parte-1.json`, luego la 2 y luego la 3, cada una en un mensaje nuevo). Guarda cada respuesta como `copy-traducido-parte-N.json` en esta misma carpeta.

---

You are a professional translator. Translate the Spanish website copy in the JSON below into **British English** and **Brazilian Portuguese**. The site publishes a doctrinal manifesto for human software development with AI. **The Spanish is the authoritative reference**: translate faithfully, with no added or omitted ideas and the same normative strength (debe = must / deve; puede = may / pode; keep every negation and "solo" = only / apenas), but write natural prose, not a word-for-word calque.

**Output**: a single JSON object with exactly the same keys as the input, each value `{"en": "...", "pt": "..."}`. Return only the JSON, with no comments.

**Rules**
1. Keep all Markdown exactly: bold, italics, tables (same rows and columns), lists, line breaks and text between backticks (for example `P03`, `CR05`, `STOP02`). Keep placeholders such as `{version}`, `{fecha}`, `{codigo}`, `{q}`, `{n}`, `{editor}` and `{frase}` unchanged.
2. Address the reader as "you" in English and "você" in Portuguese; the Spanish uses "tú".
3. English: British spelling with "-ise" (organise, recognise, behaviour, centred). Portuguese: Brazil only; never forms from Portugal (equipa, utilizador, ecrã, ficheiro, registo, "estar a + infinitivo").
4. Do not translate: "Manifiesto" (the site's name), "Software Humano", "SpecKit", "Job Story/Job Stories", "Jobs to Be Done", "GitHub", "Craft", "Pagefind", "Damián Acuña". Language names in the language selector stay as they are (Español, English, Português), as do the codes EN, ES and PT.
5. Internal links: translate the link text and change the route exactly as follows.

| Spanish | English | Português |
|---|---|---|
| `/es/manifiesto` | `/manifesto` | `/pt-br/manifesto` |
| `/es/principios` | `/principles` | `/pt-br/principios` |
| `/es/manifiesto/fundamento-de-producto` | `/manifesto/product-foundation` | `/pt-br/manifesto/fundamento-de-produto` |
| `/es/manifiesto/construir-con-ia` | `/manifesto/building-with-ai` | `/pt-br/manifesto/construir-com-ia` |
| `/es/manifiesto/verificar` | `/manifesto/verify` | `/pt-br/manifesto/verificar` |
| `/es/manifiesto/guia-de-bolsillo#sh-pocket` | `/manifesto/pocket-guide#sh-pocket` | `/pt-br/manifesto/guia-de-bolso#sh-pocket` |
| `/es/speckit` | `/speckit` | `/pt-br/speckit` |

External links stay identical, except `https://creativecommons.org/licenses/by/4.0/deed.es`, which becomes `https://creativecommons.org/licenses/by/4.0/`.

6. Use these approved terms, which are already used in the translated manifesto:

| Español | English | Português (Brasil) |
|---|---|---|
| fundamento de producto | product foundation | fundamento de produto |
| alcance | scope | escopo |
| trazabilidad / trazable | traceability / traceable | rastreabilidade / rastreável |
| confianza | trust ("confidence" only for "nivel de confianza") | confiança |
| evidencia | evidence | evidência |
| circunstancia · motivación · resultado | circumstance · motivation · outcome | circunstância · motivação · resultado |
| definición de terminado | definition of done | definição de conclusão |
| guía de bolsillo | pocket guide | guia de bolso |
| antipatrones | anti-patterns | antipadrões |
| carga cognitiva | cognitive load | carga cognitiva |
| revelación progresiva | progressive disclosure | revelação progressiva |
| autoridad de producto | product authority | autoridade de produto |
| entregas | deliveries (never "releases", unless the Spanish says "liberar") | entregas |
| jerarquizar | establish hierarchy (never "prioritise") | hierarquizar |
| equipo | team | time |

The names of the ten principles must be exactly:

| | Español | English | Português (Brasil) |
|---|---|---|---|
| P01 | El progreso del usuario es la unidad de diseño | The user's progress is the unit of design | O progresso da pessoa é a unidade de design |
| P02 | La experiencia también es funcionalidad | Experience is also functionality | A experiência também é funcionalidade |
| P03 | La complejidad pertenece al sistema | Complexity belongs to the system | A complexidade pertence ao sistema |
| P04 | Simple al comenzar y profundo al necesitarlo | Simple to begin with, deep when needed | Simples no começo e profundo quando necessário |
| P05 | La interfaz no debe convertirse en otra tarea | The interface must not become another task | A interface não deve se tornar outra tarefa |
| P06 | La atención es un recurso del producto | Attention is a product resource | A atenção é um recurso do produto |
| P07 | La confianza se diseña | Trust is designed | A confiança é projetada |
| P08 | La calidad vive en la acumulación de detalles | Quality lives in the accumulation of details | A qualidade vive no acúmulo de detalhes |
| P09 | El tiempo y la continuidad forman parte de la interfaz | Time and continuity are part of the interface | O tempo e a continuidade fazem parte da interface |
| P10 | La persona conserva control y propiedad | The person retains control and ownership | A pessoa conserva controle e propriedade |

7. Text in «» that quotes the manifesto keeps its quotation marks, as “ ” in English and Portuguese.
8. If a Spanish text is ambiguous, choose the most faithful reading and add nothing.

Spanish JSON to translate:
