# Data Model · Sitio del Manifiesto de Software Humano

**Fase 1 de `/speckit-plan`** · 2026-09-27 · Deriva de las Key Entities de [spec.md](spec.md) y del PRD §19. Las decisiones técnicas que lo sostienen están en [research.md](research.md).

El contenido vive en archivos YAML versionados (`FR-021`), salvo el texto canónico en español, que se lee de su fuente (RQ-01). Los identificadores son **independientes del idioma** (PRD §19.3). El texto de cada idioma cuelga de la misma entidad; las reglas y relaciones no se duplican.

## Entidades

### Idioma (`Locale`)

| Campo | Valor |
|---|---|
| `code` | `en`, `es`, `pt-BR` (BCP 47) |
| `path` | `""` (sin prefijo), `es`, `pt-br` |
| `label` | «English», «Español», «Português (Brasil)» (PRD §21.7) |
| `default` | `true` solo para `en` |

Conjunto cerrado de tres. No se crean variantes por país (PRD §19.4).

### Sitio (`Site`)

Nombre público «Software Humano», dominio `softwarehumano.com`, autoría (`Person`: Damián Acuña), licencias (contenido CC BY 4.0, código MIT), contacto (alias de correo más Issues del repositorio) y versión vigente del núcleo. **La dirección del alias está pendiente** de la autoridad (nota final de [research.md](research.md)).

### Superficie (`Surface`)

Las del PRD §18.1 v1.2: `inicio`, `speckit`, `acerca` y las divisiones del manifiesto (ver «División»), que comparten este esquema: `mapa`, `manifiesto`, `principios`, `fundamento`, `construir`, `verificar`, `ejemplo`, `gobernanza`, `bolsillo`.

| Campo | Descripción |
|---|---|
| `id` | Uno de los de arriba; estable |
| `slug[locale]` | Nombre de ruta localizado ([contracts/rutas.md](contracts/rutas.md)) |
| `title[locale]`, `description[locale]` | Metadatos localizados (`FR-016`, `FR-019`) |
| `blocks` | Referencias ordenadas a entradas editoriales o nodos canónicos |
| `fr` | Requisitos que realiza |
| `updatedAt` | **Derivado**: fecha del último cambio de contenido de la página según el historial de git, calculada en la construcción (`FR-012`) |

### División del manifiesto (`Division`) · v1.2

Una superficie que aloja secciones consecutivas del núcleo, completas y en su orden (PRD §18.1 v1.2, RQ-15).

| Campo | Descripción |
|---|---|
| `id` | `mapa`, `manifiesto`, `principios`, `fundamento`, `construir`, `verificar`, `ejemplo`, `gobernanza` o `bolsillo` |
| `posicion` | 0–8, el orden del núcleo; define anterior y siguiente |
| `ruta` | Ruta del núcleo que la agrupa en el índice: Comprender, Decidir, Construir, Verificar o Llevarlo a la práctica |
| `secciones` | **Derivado** de `casas.ts`: las secciones del núcleo cuya casa es esta división |

Casa especial `descarga`: los nodos de Influencias y notas, salvo la Declaración final, no se muestran completos en el sitio (decisión de la autoridad, 2026-09-28).

### Índice de búsqueda (`SearchIndex`) · derivado, v1.2

Un archivo por idioma, generado en la construcción (RQ-16). Cada entrada tiene página, ancla, título, identificador si lo hay y texto. Contiene cada nodo canónico una sola vez, en su casa, y las entradas editoriales visibles de cada página. Excluye las citas `breve` y los actos de Inicio. Desde RQ-16 enmendado, cada entrada está escrita en el idioma del índice: los textos que se muestran en el original por falta de traducción no entran.

### Acto narrativo (`Act`)

Los siete actos del PRD §16, en `inicio`. Tienen `id` (`acto-1` a `acto-7`), `question` opcional, bloques y los principios que presenta. El acto 4 lista `P01`–`P10` en orden canónico; el agrupamiento en capítulos es opcional.

### Nodo canónico (`CanonicalNode`) · derivado, no editable

Se produce al leer el archivo del núcleo (RQ-01); no existe en YAML.

| Campo | Descripción |
|---|---|
| `id` | Ancla existente (`p03`), derivada de un identificador en tabla (`d01`) o derivada de sección y posición |
| `kind` | Encabezado, párrafo, lista, tabla o cita |
| `section` | Sección de nivel superior a la que pertenece |
| `hash` | Huella del contenido del nodo |
| `source` | Contenido en español, tal como está en el archivo |

### Traducción canónica (`CanonicalTranslation`)

Una por nodo y por idioma (`en`, `pt-BR`).

| Campo | Descripción |
|---|---|
| `node` | `id` del nodo canónico |
| `locale` | `en` o `pt-BR` |
| `text` | Traducción |
| `sourceHash` | Huella del nodo que se tradujo |
| `state` | Ver «Estados de traducción» |
| `approvedBy`, `approvedAt` | Quién y cuándo (`FR-021`); solo personas |

### Principio (`Principle`)

Campos del PRD §19.2 y contrato del PRD §17.

| Campo | Descripción |
|---|---|
| `id` | `P01`–`P10`; orden = orden canónico |
| `canonicalNode` | Ancla del principio en el núcleo (`p01`…) |
| `name`, `statement` | **Nombre y frase canónicos: se leen del núcleo**, no se escriben en YAML |
| `chapter` | Capítulo de presentación, opcional |
| `entries` | Tensión, significado, consecuencia, ejemplo, contraejemplo y prueba de decisión (entradas editoriales) |
| `jobStories`, `requirements` | Relaciones con `JS-*` y `FR-*` |

### Entrada editorial (`EditorialEntry`)

Explicación, ejemplo, contraejemplo, prueba de decisión o texto de superficie.

| Campo | Descripción |
|---|---|
| `id` | Estable, independiente del idioma |
| `type` | `explanation`, `example`, `counterexample`, `decision-test`, `inference` (inferencia o propuesta, `FR-017`), `surface-text` |
| `derivedFrom` | Nodo canónico o principio de origen (obligatorio para `explanation`, `example`, `counterexample` e `inference`; `FR-017`) |
| `text[locale]` | Texto por idioma |
| `state[locale]` | Estado editorial por idioma |
| `approvedBy[locale]`, `approvedAt[locale]` | Solo personas |

### Estado de la adaptación (`AdaptationStatus`)

| Campo | Descripción |
|---|---|
| `version` | Debe coincidir con el preset instalado (RQ-09) |
| `verifiedAt` | Fecha de verificación técnica |
| `published` | `false` hasta decisión de la autoridad |
| `limitations[locale]` | Límites declarados |
| `url`, `sha256` | Solo existen cuando `published: true` |

### Cadenas de interfaz (`UIString`)

Etiquetas de navegación, selector, 404 y confirmaciones. Una clave y su texto en tres idiomas, con estado editorial.

### Preferencia de idioma · solo en el navegador

`none` o un idioma. No sale del navegador, no requiere cuenta y puede borrarse (`FR-020`, `FR-018`).

## Reglas de validación · detienen la construcción

| Regla | Qué comprueba | Fuente |
|---|---|---|
| `RV-01` | La huella del archivo del núcleo coincide con la fijada | RQ-01, PRD §27.2 |
| `RV-02` | No hay identificadores duplicados en ninguna colección | PRD §19.3 |
| `RV-03` | Toda relación apunta a una entidad existente (nodo, principio, `JS`, `FR`) | PRD §19.3 |
| `RV-04` | Existen los diez principios, en orden, cada uno ligado a su ancla canónica | `FR-004`, `AC-03` |
| `RV-05` | Cada principio tiene todas las entradas del contrato del PRD §17 | `FR-005`, `FR-006`, `AC-04` |
| `RV-06` | Cada explicación, ejemplo, contraejemplo e inferencia declara su origen | `FR-017` |
| `RV-07` | Todo nodo canónico tiene una entrada de traducción en `en` y `pt-BR` (`pendiente` es válido; la aprobación la exige la comprobación previa a la publicación) | `AC-13`, PRD §19.4 |
| `RV-08` | Toda superficie y cadena de interfaz tiene una entrada en los tres idiomas (`pendiente` es válido; la aprobación la exige la comprobación previa a la publicación) | `FR-019`, `AC-13` |
| `RV-09` | La versión del estado de la adaptación coincide con la del preset instalado | RQ-09, `AC-09` |
| `RV-10` | Si `published` es `false`, no hay `url` ni marcado de código fuente | `FR-010`, PRD §25.2 |
| `RV-11` | No hay enlaces internos rotos en la salida construida | PRD §24.2 |
| `RV-12` | El JSON-LD solo describe entidades presentes en la página | PRD §25.3, `AC-15` |
| `RV-13` | Cada nodo canónico con contenido aparece completo en su casa y en ninguna otra página; fuera de ella, solo en bloques `breve` de 60 palabras como máximo. Sin excepciones; los nodos con casa `descarga` solo admiten `breve` | PRD §18.3 v1.2, RQ-15 |
| `RV-14` | El índice de búsqueda de cada idioma contiene cada nodo canónico con contenido una sola vez, con la dirección de su casa, y ningún nodo con casa `descarga` | `FR-023`, PRD §18.3 v1.2, RQ-16 |

**Comprobación previa a la publicación**, un comando aparte que **no** detiene la construcción de trabajo:

- todas las entradas publicables están aprobadas en su idioma, sin traducciones obsoletas;
- existe el alias de correo de contacto;
- existe un registro de revisión lingüística aprobada para `en` y `pt-BR`, y de neutralidad para `es`.

Sin eso, ese idioma no se publica (PRD §19.4).

## Estados y transiciones

### Estado editorial (PRD §27.1)

```text
borrador ──(aprobación humana)──▶ aprobado
aprobado ──(edición del texto)──▶ borrador
```

Los tipos «canónico aprobado», «explicación aprobada» y «ejemplo aprobado» son `aprobado` más su `type`. «Estado técnico verificado» se aplica solo al estado de la adaptación. «Propuesta futura» marca contenido que no se publica como disponible.

**Permisos**: solo una persona con autoridad puede pasar a `aprobado` y firmar `approvedBy`. **Un agente nunca escribe `aprobado`** (`AGENTS.md` regla 9). Todo lo que redacte un agente nace en `borrador`.

### Estados de traducción

```text
pendiente → borrador → en revisión → aprobada
aprobada ──(cambia la huella del nodo original)──▶ potencialmente obsoleta → en revisión
```

### Estado de la adaptación

```text
no publicada ──(decisión de la autoridad: PRD §29.10 resuelta + URL verificable)──▶ publicada
```

Es irreversible hacia afuera, porque un enlace publicado se cita, y por eso requiere autorización humana.

### Preferencia de idioma

```text
none ──(elige idioma)──▶ saved(x) ──(restablece)──▶ none
saved(x) ──(elige otro)──▶ saved(y)
```

Solo afecta la entrada por `/` (RQ-04).
