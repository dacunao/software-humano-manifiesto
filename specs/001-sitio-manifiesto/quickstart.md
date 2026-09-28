# Quickstart · validar el sitio

Guía para comprobar de punta a punta que el sitio cumple lo especificado. No contiene implementación; los comandos exactos los fija `tasks.md` y se confirman al implementar. Detalle de reglas en [data-model.md](data-model.md) y de rutas en [contracts/rutas.md](contracts/rutas.md).

## Requisitos

- `bun`, con la versión fijada en `.bun-version`;
- navegadores de Playwright instalados;
- el archivo del núcleo sin cambios (huella `9beef610…`).

## Validación técnica · repetible

| Paso | Comando previsto | Resultado esperado | Evidencia de |
|---|---|---|---|
| Instalar | `bun install --frozen-lockfile` | Sin cambios en el archivo de bloqueo | PRD §24.5 |
| Tipos | `bun run check` | 0 errores en modo estricto | `AC-16` |
| Construir | `bun run build` | Construye; `RV-01`–`RV-12` pasan; se informa la proporción de texto visible por superficie | `AC-15`, `AC-03`, RQ-13 |
| Unitarias | `bun test` | Lector canónico, validaciones y JSON-LD en verde | `AC-03`, `AC-15` |
| Extremo a extremo | `bunx playwright test` | Escenarios de las nueve historias y los bordes de spec.md, con y sin JavaScript, con movimiento reducido y solo teclado; axe sin violaciones AA | `AC-05`–`AC-07`, `AC-14` |
| Rendimiento | `bunx lhci autorun` | LCP ≤ 2,5 s, INP ≤ 200 ms (medido con TBT en laboratorio), CLS ≤ 0,1 | `AC-08` |
| Publicación | `bun run check:publish` | Falla mientras falten aprobaciones, revisiones lingüísticas o el alias de contacto | PRD §19.4, §34 |

## Comprobaciones rápidas a mano

1. Abre `/` con el navegador en portugués: **debe** verse en inglés.
2. En `/principles/p03`, cambia a Español: llegas a `/es/principios/p03`.
3. Recarga `/` con la preferencia en Español: llegas a `/es/`. Desactiva JavaScript y recarga: inglés.
4. Abre `/es/aplicacion#cr03` (su casa) y `/es/manifiesto/texto-integro#cr03`: en las dos aterrizas en `CR03` (PRD v1.1).
5. Abre `/speckit`: estado «no publicada», versión igual a la del preset instalado, sin botón ni enlace de descarga.
6. Abre `/es/no-existe`: 404 en español con salida clara.

## Validación humana · no la sustituye nada de lo anterior

| Qué | Quién decide | Evidencia de |
|---|---|---|
| Elección de la dirección visual | Damián Acuña | Puerta humana; bloquea el diseño final |
| Primera ronda de comprensión, en español con contenido en borrador, antes de optimizar, diseñar y traducir | Damián Acuña, con las notas de las sesiones | Evidencia temprana de `JS-01`–`JS-09` |
| Ronda final de pruebas moderadas de comprensión con representantes de las audiencias principales | Damián Acuña, con las notas de las sesiones (sin umbral fijo) | `AC-01`, `AC-02`, `JS-01`–`JS-09` |
| Recorrido completo con lector de pantalla y teclado | Revisión humana | `AC-07` |
| Revisión profesional de inglés y portugués de Brasil | Servicio externo; registro aprobado | `AC-13` |
| Revisión de neutralidad del español | Damián Acuña | `AC-13` |
| Datos estructurados en las herramientas de Google | Revisión manual | PRD §25.3 |
| Aceptación antes de publicar | Damián Acuña | PRD §34 |
