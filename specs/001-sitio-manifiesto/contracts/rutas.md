# Contrato de rutas, anclas e idioma

Interfaz pública del sitio: lo que una persona, un buscador o un agente puede enlazar y citar. Una vez publicada, una ruta **no cambia sin redirección** (PRD §24.2). Decisiones de origen: RQ-01, RQ-03 y RQ-04 de [research.md](../research.md).

## Rutas

Misma topología en los tres idiomas; los nombres de ruta están localizados. `pNN` va en minúsculas y no depende del nombre del principio.

| Superficie | `en` | `es` | `pt-BR` |
|---|---|---|---|
| Inicio | `/` | `/es/` | `/pt-br/` |
| Manifiesto | `/manifesto` | `/es/manifiesto` | `/pt-br/manifesto` |
| Principios | `/principles` | `/es/principios` | `/pt-br/principios` |
| Un principio | `/principles/p01` … `/principles/p10` | `/es/principios/p01` … | `/pt-br/principios/p01` … |
| Aplicación | `/practice` | `/es/aplicacion` | `/pt-br/aplicacao` |
| SpecKit | `/speckit` | `/es/speckit` | `/pt-br/speckit` |
| Acerca de | `/about` | `/es/acerca` | `/pt-br/sobre` |
| No encontrada | `/404` | `/es/404` | `/pt-br/404` |

Son **48 páginas de contenido** (seis superficies y diez principios, por tres idiomas), más tres 404. Los nombres de ruta de `es` y `pt-BR` son propuesta y entran en la revisión lingüística; una vez publicados, quedan fijos.

## Anclas del manifiesto

Idénticas en los tres idiomas, para que una cita funcione cambiando solo el idioma de la ruta:

- anclas existentes en la fuente: `#sh-index`, `#p01`–`#p10`, `#sh-fund`, `#sh-stop`, `#sh-score`, `#sh-ap`, `#sh-gov`, `#sh-done`, `#sh-pocket`;
- anclas derivadas de identificadores en tabla: `#d01`–`#d06`, `#f01`–`#f08`, `#a01`–`#a08`, `#stop01`–`#stop07`, `#cr01`–`#cr08`, `#o01`–`#o09`, `#v01`–`#v12`.

Al pasar el cursor sobre un título **no** aparece ningún símbolo; copiar el enlace de una sección es una acción explícita con confirmación (`FR-011`, lección del traspaso).

## Idioma

| Situación | Resultado |
|---|---|
| Primera visita a `/`, cualquier idioma del navegador | Inglés; sin redirección (`FR-020`) |
| Visita a `/` con preferencia `es` guardada y JavaScript activo | Lleva a `/es/` (RQ-04) |
| Visita a `/` con preferencia guardada, sin JavaScript | Inglés |
| Cualquier otra URL, con cualquier preferencia | Se respeta la URL (`FR-019`) |
| Cambio de idioma en `/es/principios/p03` | Navega a `/principles/p03` o `/pt-br/principios/p03`, con la misma ancla si la hay |
| Restablecer preferencia | Se borra; `/` vuelve a inglés |

## Encabezado de cada página

- `lang` del documento con el código BCP 47 del idioma;
- URL canónica propia;
- `hreflang` recíprocos para `en`, `es`, `pt-BR` y `x-default` (que apunta a `en`);
- título, descripción y tarjetas sociales localizados y fieles al contenido visible (PRD §25.2).

## Archivos de plataforma

- `sitemap` con las 48 páginas de contenido y sus alternas;
- `robots` explícito;
- redirecciones versionadas;
- cabeceras de seguridad: política de contenido que solo admite el script de analítica decidido, HSTS, `nosniff`, política de referente y política de permisos.
