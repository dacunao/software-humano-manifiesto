# Contrato de datos estructurados

Lo que el sitio declara a buscadores y agentes. Se genera desde las mismas entradas que el contenido visible (RQ-08 de [research.md](../research.md)) y **solo describe lo que la página muestra** (`RV-12`). Tipos tomados del mapeo mínimo del PRD §25.2.

| Página | Tipos | Propiedades obligatorias |
|---|---|---|
| Todas | `WebSite` (una vez, en Inicio) y `WebPage` | `name` = «Manifiesto» (v1.3), `url`, `inLanguage`; `WebSite.author` → `Person`; `WebSite.publisher` → `Organization` |
| El manifiesto, división 1 (v1.2) | `WebPage` + `CreativeWork` | `name`, `version` = `2.1`, `inLanguage`, `author`, `datePublished`, `license` (CC BY 4.0). En `es`: `workTranslation` → versiones `en` y `pt-BR`. En `en` y `pt-BR`: `translationOfWork` → versión `es` |
| Principios | `WebPage` + `DefinedTermSet` | `name`, `inLanguage`, `hasDefinedTerm` → los diez |
| Un principio | `WebPage` + `DefinedTerm` | `termCode` = `P0N`, `name` (nombre canónico), `description`, `inDefinedTermSet`, `url` |
| Páginas con migas visibles | `BreadcrumbList` | Solo si la navegación visible muestra esa jerarquía |
| Autoría | `Person` | `@id` = `https://softwarehumano.com/#autor` (común a los sitios de Software Humano), `name` = Damián Acuña, `sameAs` = su página de autor (LinkedIn). Antes del 2026-10-01: `url` |
| Editor (v1.3) | `Organization` | `@id` = `https://softwarehumano.com/#organizacion`, `name` = Software Humano, `url` = `https://softwarehumano.com`, `logo`, `contactPoint` del sitio (`email` y su propósito en `contactType`), sin `email` suelto (estándar común B8, 2026-10-01). También en `CreativeWork.publisher` |

**Prohibido mientras `AdaptationStatus.published` sea `false`**: `SoftwareSourceCode`, `downloadUrl` o cualquier propiedad que insinúe publicación (`RV-10`, `FR-010`).

**Validación**: la prueba unitaria compara cada entidad declarada con el HTML de la página. Antes de publicar, se revisa manualmente con las herramientas de Google aplicables (PRD §25.3). El marcado no garantiza posicionamiento ni resultados enriquecidos.
