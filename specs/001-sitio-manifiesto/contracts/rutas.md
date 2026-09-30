# Contrato de rutas, anclas e idioma

Interfaz pública del sitio: lo que una persona, un buscador o un agente puede enlazar y citar. Una vez publicada, una ruta **no cambia sin redirección** (PRD §24.2). Decisiones de origen: RQ-01, RQ-03 y RQ-04 de [research.md](../research.md).

## Rutas

Misma topología en los tres idiomas; los nombres de ruta están localizados. `pNN` va en minúsculas y no depende del nombre del principio. **Ninguna ruta termina en barra**, tampoco las portadas `/es` y `/pt-br` (ajuste de implementación del 2026-09-27, antes de publicar nada).

| Página (v1.2) | `en` | `es` | `pt-BR` |
|---|---|---|---|
| Inicio | `/` | `/es` | `/pt-br` |
| 0 · Mapa del manifiesto | `/manifesto/map` | `/es/manifiesto/mapa` | `/pt-br/manifesto/mapa` |
| 1 · El manifiesto | `/manifesto` | `/es/manifiesto` | `/pt-br/manifesto` |
| 2 · Principios | `/principles` | `/es/principios` | `/pt-br/principios` |
| Un principio | `/principles/p01` … `/principles/p10` | `/es/principios/p01` … | `/pt-br/principios/p01` … |
| 3 · Fundamento de producto | `/manifesto/product-foundation` | `/es/manifiesto/fundamento-de-producto` | `/pt-br/manifesto/fundamento-de-produto` |
| 4 · Construir con IA | `/manifesto/building-with-ai` | `/es/manifiesto/construir-con-ia` | `/pt-br/manifesto/construir-com-ia` |
| 5 · Verificar | `/manifesto/verify` | `/es/manifiesto/verificar` | `/pt-br/manifesto/verificar` |
| 6 · Ejemplo aplicado | `/manifesto/worked-example` | `/es/manifiesto/ejemplo-aplicado` | `/pt-br/manifesto/exemplo-aplicado` |
| 7 · Gobernanza | `/manifesto/governance` | `/es/manifiesto/gobernanza` | `/pt-br/manifesto/governanca` |
| 8 · Guía de bolsillo | `/manifesto/pocket-guide` | `/es/manifiesto/guia-de-bolsillo` | `/pt-br/manifesto/guia-de-bolso` |
| SpecKit | `/speckit` | `/es/speckit` | `/pt-br/speckit` |
| Acerca de | `/about` | `/es/acerca` | `/pt-br/sobre` |
| No encontrada | `/404` | `/es/404` | `/pt-br/404` |

Son **66 páginas de contenido**, 22 por idioma (Inicio, SpecKit, Acerca de, las nueve divisiones y los diez principios), más tres 404. Salen las rutas de la v1.1 `/practice`, `/verification` y `/manifesto/full-text` con sus equivalentes; como nada se publicó, no llevan redirección.

**Descargas** (v1.2), una por idioma, ofrecidas en el pie de cada página y en el Mapa, solo la del idioma seleccionado:
- `/descargas/nucleo-v2.1-es.md`: el archivo original, idéntico byte a byte;
- `/descargas/nucleo-v2.1-en.md` y `/descargas/nucleo-v2.1-pt-br.md`: generadas nodo a nodo y rotuladas como traducción.

**Índice de búsqueda** (RQ-16 enmendado): `/pagefind/`, generado por Pagefind desde nuestros registros, con un índice por idioma. No son páginas y no entran en el sitemap. Los nombres de ruta de `es` y `pt-BR` son propuesta y entran en la revisión lingüística; una vez publicados, quedan fijos.

## Anclas del manifiesto

Idénticas en los tres idiomas, para que una cita funcione cambiando solo el idioma de la ruta:

- anclas existentes en la fuente: `#sh-index`, `#p01`–`#p10`, `#sh-fund`, `#sh-stop`, `#sh-score`, `#sh-ap`, `#sh-gov`, `#sh-done`, `#sh-pocket`;
- anclas derivadas de identificadores en tabla: `#d01`–`#d06`, `#f01`–`#f08`, `#a01`–`#a08`, `#stop01`–`#stop07`, `#cr01`–`#cr08`, `#o01`–`#o09`, `#v01`–`#v12`.

Al pasar el cursor sobre un título **no** aparece ningún símbolo; copiar el enlace de una sección es una acción explícita con confirmación (`FR-011`, lección del traspaso).

## Idioma

| Situación | Resultado |
|---|---|
| Primera visita a `/`, cualquier idioma del navegador | Inglés; sin redirección (`FR-020`) |
| Visita a `/` con preferencia `es` guardada y JavaScript activo | Lleva a `/es` (RQ-04) |
| Visita a `/` con preferencia guardada, sin JavaScript | Inglés |
| Cualquier otra URL, con cualquier preferencia | Se respeta la URL (`FR-019`) |
| Cambio de idioma en `/es/principios/p03` | Navega a `/principles/p03` o `/pt-br/principios/p03`, con la misma ancla si la hay |
| Elegir otro idioma (v1.6; ya no hay acción para restablecer) | La preferencia pasa a ese idioma; `/` lo sigue |

## Encabezado de cada página

- `lang` del documento con el código BCP 47 del idioma;
- URL canónica propia;
- `hreflang` recíprocos para `en`, `es`, `pt-BR` y `x-default` (que apunta a `en`);
- título, descripción y tarjetas sociales localizados y fieles al contenido visible (PRD §25.2).

## Archivos de plataforma

- `sitemap` con las 66 páginas de contenido y sus alternas;
- `robots` explícito;
- redirecciones versionadas;
- cabeceras de seguridad: política de contenido que solo admite el script de analítica decidido, HSTS, `nosniff`, política de referente y política de permisos.
