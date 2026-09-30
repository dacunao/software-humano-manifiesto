# Verificación de las traducciones en cuatro capas

**Fechas:** 2026-09-28 y 2026-09-29 · **Tareas:** fase 28 (T181–T190) y fase 29 (T194) · **Decisión:** RQ-19, de Damián Acuña.
**El español es la referencia.** Las traducciones se desarrollan sobre él y ninguna capa lo corrige para acomodar una traducción.

Esta es evidencia de revisión. La aprobación de cada texto es de Damián Acuña y consta en los YAML (`approvedBy`, `approvedAt`).

## Quién tradujo y quién revisó

La capa 3 exige un revisor de otra familia de modelos que la que tradujo (RQ-19, 2026-09-29).

| Texto | Traducción | Revisor de la capa 3 | Contraste de la capa 4 |
|---|---|---|---|
| Núcleo (341 nodos) | OpenAI, revisada por un agente el 2026-09-21 y verificada contra el original el 2026-09-28 | Claude | DeepL, comparado por Claude |
| Copy (267 textos) | OpenAI, con ChatGPT, por Damián (2026-09-29). Reemplaza la traducción anterior de Claude, que se conserva como contraste en `copy-claude-2026-09-28.json` | Claude, que compara también con la versión de Claude | No se aplicó: ya había dos traducciones independientes |
| Acerca del Manifiesto (17 textos nuevos) | OpenAI, con ChatGPT, por Damián | Claude | No se aplicó |

Revisores descartados: Gemini, en su capa gratuita, estuvo saturado durante horas (revisó 59 pasajes del núcleo con una sola observación, falsa). El modo gratuito de Mistral tiene cupo cero.

## Resultados por capa

| Capa | Núcleo | Copy y Acerca |
|---|---|---|
| **1 · Terminología** (`scripts/traduccion/glosario.yaml`, prueba `terminologia.test.ts`) | 0 hallazgos | 0 hallazgos. Hubo 2 falsos positivos de la regla, que se corrigió: «determinístico» es válido |
| **2 · Ortografía y gramática** (LanguageTool 6.6 local, `en-US` y `pt-BR`) | 1 error real, una coma en P02 en portugués, corregido. La conversión a inglés estadounidense cambió 127 palabras (T190) y se verificó con 0 grafías británicas restantes | 0 errores reales; los avisos son falsos positivos clasificados en `capas/capa-2-clasificacion.md` |
| **3 · Significado, estilo MQM** (`scripts/traduccion/indicacion-mqm.md`) | 9 observaciones menores: 4 en inglés y 5 en portugués. Se aplicaron 8; «A arquitetura da estrutura» se conservó por coherencia con el resto del núcleo | Copy: 22 observaciones (15 en inglés y 7 en portugués; 2 mayores), todas aplicadas, más el menú «Manifesto». Acerca: 7 correcciones, sobre todo «the Manifesto» y «o Manifesto» al nombrar el documento |
| **4 · Contraste con DeepL** (`scripts/traduccion/indicacion-contraste.md`) | 395 pasajes, con el nivel 1 y lo marcado: en inglés, 189 de 190 equivalentes; en portugués, 204 de 205. Los 2 matices se corrigieron. DeepL usó 91.216 caracteres (9 % del cupo) | — |

Ninguna capa encontró un error crítico.

## Correcciones del español detectadas al traducir

Aprobadas por Damián el 2026-09-29:
- «Cuatro capas» pasó a «Cinco capas» en la página de SpecKit;
- se quitó «Aplicación» del ejemplo de P05.

## Aprobaciones

| Qué | Cuándo |
|---|---|
| Núcleo `en` y `pt-BR`, 341 nodos | 2026-09-28; 69 nodos aprobados de nuevo el 2026-09-29 (ortografía estadounidense y capa 3) y 3 más tras la capa 4 y la coma de P02 |
| Copy `es`, `en` y `pt-BR`, 801 textos | 2026-09-29 |
| Acerca del Manifiesto | Español en T192 y traducciones en T194, el 2026-09-29 |
| Limitaciones de la adaptación | 2026-09-29, con «outros times» por glosario |
| Aviso de la descarga (`descarga.aviso`) | **Pendiente** de Damián (T196) |

## Archivos

- **`capas/`:** informes de cada capa (`capa-1-…`, `capa-2-…`, `capa-3-claude-…`, `capa-4-…`), cachés y pares comparados.
- **`copy-para-openai/`:** lo enviado a ChatGPT y lo recibido.
- **`correspondencia-nucleo-en-pt-2026-09-28.md`:** la verificación inicial del núcleo contra el original.

## README del repositorio (T231, 2026-09-30)

`.github/README.md` (en) y `.github/README.pt-BR.md`, traducidos por Claude desde `.github/README.es.md`, que es la referencia: 16 segmentos. Script `scripts/traduccion/readme.ts`; salida completa en `capas/readme-cuatro-capas.json`. Las observaciones de modelo se confirmaron una por una (`V12`).

| Capa | Resultado | Qué se hizo |
|---|---|---|
| 1 · Terminología | 0 hallazgos | — |
| 2 · LanguageTool (en-US, pt-BR) | 7 avisos de ortografía | Todos falsos positivos: nombres propios y de herramientas (`daisyUI`, `axe`, `README`, `Bun`, «Manifiesto») |
| 3 · MQM, Gemini (otra familia) | en: 0 · pt: 1 menor | Falso positivo: señala «La tabela», pero el texto dice «A tabela» |
| 4 · Contraste con DeepL, comparado por Gemini | en: 0 · pt: 1 matiz | Confirmado: «na prática» agregaba un matiz que el español no tiene. Se quitó en pt y también en en («in practice»), que tenía el mismo agregado aunque la capa no lo marcó |

Conclusión: sin errores de sentido ni de terminología; una corrección de fidelidad aplicada en ambos idiomas. **Aprobado por Damián Acuña el 2026-09-30** (inglés y portugués de Brasil).
