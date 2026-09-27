---
name: speckit-conformidad-comprobar
description: Check the project artifacts against what the manifesto requires and report gaps that have no approved exception.
compatibility: Requires spec-kit project structure with .specify/ directory
metadata:
  author: Damián Acuña
  source: conformidad:commands/speckit.conformidad.comprobar.md
---

## Qué hace este comando

Ejecuta la comprobación determinista de conformidad sobre los artefactos de la feature activa. **No la interpreta ni la sustituye**: corre el script y reporta lo que devuelve.

```bash
.specify/extensions/conformidad/scripts/conformidad.sh
```

## Cómo reportar el resultado

- Si sale **0**, informa qué secciones tienen contenido y cuáles pasaron por excepción aprobada, nombrando cada excepción y quién la aprobó.
- Si sale **1**, informa cada ausencia sin declarar y **detente**. No completes las secciones tú para que la comprobación pase: eso convierte una ausencia visible en una plausible, que es peor.

## El límite de esta comprobación, que debes declarar al informar

Comprueba que las secciones existan y tengan contenido. **No comprueba que lo escrito sea bueno.** Una tabla llena de frases plausibles pasa.

Esa distancia la cierran `analyze` y una persona. Al informar, distingue lo que quedó verificado por comprobación de lo que espera juicio humano.