# Instalar y verificar el método Software Humano en SpecKit

## Propósito

Instalar, activar y verificar las **cuatro capas** del método Software Humano en un proyecto que utilizará SpecKit. El objetivo termina cuando SpecKit opera con el manifiesto compilado y la instalación ha superado todas las verificaciones descritas aquí.

Este trabajo configura el método. **No autoriza a desarrollar el producto**, modificar su fundamento ni iniciar una implementación salvo que exista una instrucción posterior y explícita.

> **Antes de empezar, aplica [`00_REQUISITOS_DE_INSTALACION.md`](00_REQUISITOS_DE_INSTALACION.md).** Ese documento existe porque la primera aplicación real de esta instrucción se detuvo cuatro veces por requisitos de entorno no declarados. Ejecuta `tools/speckit/preflight.sh` y resuelve todo bloqueo antes de continuar.

---

## Qué instala este método, y por qué son cuatro capas

| Capa | Qué aporta | Mecanismo de SpecKit |
|---|---|---|
| **Preset** `software-humano` | Lo que el manifiesto exige en cada operación, citado literalmente, y los artefactos que define, agregados a las plantillas nativas | preset |
| **Extensión** `conformidad` | Comprueba que los artefactos tengan lo exigido y que toda ausencia esté declarada como excepción aprobada | extension |
| **Workflow** `software-humano` | Las compuertas que el propio manifiesto especifica, y la conformidad en los momentos que nombra | workflow |
| **Bundle** `software-humano` | Fija las versiones de las tres anteriores | bundle |

**Las tres primeras se instalan por separado.** El zip de un bundle lleva solo su manifiesto, no los componentes: instalarlo por identificador exige un catálogo publicado.

---

## Prompt

Actúa como agente senior responsable de integrar un método en un proyecto SpecKit. Debes instalar y verificar el paquete **Software Humano para SpecKit** utilizando **exclusivamente los mecanismos nativos de SpecKit**.

Tu responsabilidad no es reinterpretar el manifiesto ni mejorar el paquete. Es dejar el proyecto preparado para que los agentes apliquen el **Núcleo del manifiesto para el desarrollo de software humano con inteligencia artificial v2.1** durante el ciclo SDD nativo.

### Entradas

- **PROJECT_ROOT**: `[ruta absoluta del proyecto que utilizará SpecKit]`
- **PACKAGE_PATH**: `[ruta absoluta del paquete descomprimido]`
- **INITIALIZE_IF_NEEDED**: `[false por defecto; true solo si la persona autoriza inicializar SpecKit]`
- **SPECIFY_CMD**: `[cómo invocar SpecKit: 'specify' si la instalación global está en rango, o 'tools/speckit/specify' para la instancia aislada]`

Si falta `PROJECT_ROOT` o `PACKAGE_PATH`, solicítalo y **detente**. No adivines rutas.

### Fuentes de autoridad

1. El **núcleo v2.1**, proyectado en `templates/constitution-template.md`, gobierna la doctrina.
2. El **fundamento de producto autorizado** gobierna qué debe construirse.
3. El **anexo v2.0**, en `docs/method/Anexo_Aplicacion_SpecKit_v2.0.md`, gobierna la correspondencia con SpecKit.
4. La **guía de implementación**, en `docs/method/GUIA_DE_IMPLEMENTACION_SPECKIT.md`, gobierna cómo se construye y mantiene esa correspondencia.
5. **SpecKit** conserva su comportamiento nativo en todo lo que el método no modifica.

Ante una contradicción real o aparente, **no inventes una conciliación**: identifica las disposiciones involucradas, informa el conflicto y detén la decisión afectada.

### Resultado requerido

La instalación solo está completa cuando puedas demostrar que:

- SpecKit pertenece al rango `>=1.0.0,<2.0.0`;
- existe una integración de agente activa, **elegida por una persona**;
- el preset `software-humano` está instalado y habilitado;
- la extensión `conformidad` está instalada y su configuración fue creada;
- el workflow `software-humano` está instalado;
- **los ocho comandos compuestos conservan la descripción, los `handoffs` y los `scripts` nativos**;
- las plantillas de especificación, plan y tareas **conservan sus secciones y tokens nativos** y llevan agregados los artefactos del manifiesto;
- `checklist` sigue resolviendo desde SpecKit y no fue sustituido;
- `.specify/memory/constitution.md` contiene la proyección completa del núcleo v2.1;
- no se modificó código central de SpecKit ni código de la aplicación;
- cualquier pendiente o excepción está explícitamente informado.

---

## Procedimiento

### 1. Inspección previa, sin modificar nada

Antes de instalar, comprueba y reporta:

```bash
$SPECIFY_CMD --version
$SPECIFY_CMD preset list
$SPECIFY_CMD extension list
$SPECIFY_CMD workflow list
$SPECIFY_CMD integration status
```

Si SpecKit no está inicializado en `PROJECT_ROOT` y `INITIALIZE_IF_NEEDED` es `false`, **detente e informa**. No inicialices por iniciativa propia: la integración de agente la elige una persona.

### 2. Verificación del paquete

```bash
cd "[PACKAGE_PATH]" && shasum -a 256 -c SHA256SUMS
```

**Todas las líneas deben decir `OK`.** Una sola discrepancia detiene la instalación: el paquete fue alterado y no puede demostrar su correspondencia con el manifiesto.

`AGENTS.md` **no** está cubierto por `SHA256SUMS`, y eso es deliberado: cada proyecto lo completa.

### 3. Instalación de las tres capas instalables

Limpia primero la basura del sistema de archivos, porque `--dev` copia el directorio completo:

```bash
find "[PACKAGE_PATH]/tools/speckit" -name '.DS_Store' -delete
```

Instala en este orden:

```bash
$SPECIFY_CMD preset add    --dev "[PACKAGE_PATH]/tools/speckit/software-humano-spec-kit-preset-2.0.0"
$SPECIFY_CMD extension add --dev "[PACKAGE_PATH]/tools/speckit/conformidad-2.1.0"
$SPECIFY_CMD workflow add        "[PACKAGE_PATH]/tools/speckit/workflow-software-humano-2.0.0"
```

`--dev` significa «instalar desde un directorio local». Produce una **copia real**, no un enlace: lo instalado queda autocontenido y no depende del directorio de origen.

El preset queda en prioridad **10**, que es el valor por omisión. Si el proyecto instala otros presets que compongan los mismos comandos, decide el orden con `preset set-priority` — **número menor gana**.

### 4. Lo que está prohibido durante la instalación

- **No modifiques el core de SpecKit** ni sus plantillas base.
- **No copies archivos a mano** sobre lo que instalan los comandos anteriores.
- **No copies la plantilla de constitución a mano** como sustituto de materializarla. Si el comando todavía no existe, ver el paso 6.
- **No instales `constitution-sync`** ni otros presets o extensiones no declarados aquí.
- **No modifiques `.specify/memory/.constitution-template.json`.** Su desajuste tras materializar la constitución es deliberado: hace que el CLI trate la constitución como documento humano y no la sobrescriba.

### 5. Verificación de registro y resolución

#### 5.1 · Las tres capas están instaladas

```bash
$SPECIFY_CMD preset info software-humano
$SPECIFY_CMD extension list
$SPECIFY_CMD workflow list
```

#### 5.2 · Las plantillas resuelven y **conservan lo nativo**

```bash
$SPECIFY_CMD preset resolve constitution-template
$SPECIFY_CMD preset resolve spec-template
$SPECIFY_CMD preset resolve plan-template
$SPECIFY_CMD preset resolve tasks-template
```

Y comprueba el contenido efectivo, que es lo que importa:

```bash
PATH="tools/speckit/shim:$PATH" .specify/scripts/bash/resolve-template.sh spec-template \
  | grep -c 'Success Criteria\|Edge Cases'
```

**Debe encontrar las dos.** Son las secciones que el comando `analyze` busca **por su nombre**: si desaparecen, el método rompió una dependencia nativa y hay que detenerse.

Comprueba también que el addendum llegó:

```bash
PATH="tools/speckit/shim:$PATH" .specify/scripts/bash/resolve-template.sh plan-template \
  | grep -c 'Lo que el manifiesto exige en este artefacto'
```

#### 5.3 · Los comandos conservan su frontmatter nativo

**Esta es la verificación más importante del paso 5.**

```bash
head -16 .specify/presets/software-humano/.composed/speckit.plan.md
```

Debe mostrar, del comando nativo:

- `description` — la superficie por la que el agente reconoce cuándo invocarlo;
- `handoffs` — el encadenamiento con los comandos siguientes;
- `scripts` — las rutas que el comando ejecuta.

**Si falta alguno, detente.** Una capa que declara frontmatter reemplaza el del core; la de este método no lo declara precisamente para que sobrevivan. Que falten significa que algo se instaló mal o fue alterado.

#### 5.4 · El checklist sigue nativo

```bash
$SPECIFY_CMD preset resolve checklist-template
$SPECIFY_CMD preset resolve speckit.checklist
```

**Ninguno debe mostrar `software-humano`.**

#### 5.5 · Estado de la integración: qué esperar realmente

Tras instalar el preset, `integration status` reportará `warning` con ocho archivos modificados.

**Es el resultado esperado y es evidencia positiva, no una anomalía.** La causa: `init` escribió el contenido core de los comandos y registró sus hashes; `preset add` recompuso esos ocho archivos sin actualizar el manifiesto de la integración.

La verificación correcta no es que no haya `warning`, sino **qué archivos aparecen**. Deben ser **exactamente los ocho comandos adaptados**, y **no** deben incluir `checklist` ni `taskstoissues`. Si aparece alguno de esos dos, el método excedió su alcance declarado: **detente**.

### 6. Materialización de la constitución

Instalar el preset **no basta**. Debes materializar la constitución con el comando registrado por la integración activa.

> **Si ejecutaste `init` en esta misma sesión, el comando probablemente todavía no exista.** Muchos agentes cargan su catálogo al iniciar la sesión, de modo que la instalación suele requerir **dos sesiones**: una para instalar y verificar, otra —iniciada de nuevo en el mismo directorio— para la constitución. **Es lo esperado, no una falla.** Infórmalo antes de que la persona lo interprete como un error.

Al terminar, la constitución debe contener las **quince familias** de identificadores del núcleo y ningún marcador sin resolver.

### 7. Declaración de excepciones aprobadas

**Este paso es la puerta de entrada de un repositorio que ya existía**, y omitirlo es el error más frecuente al adoptar el método en un proyecto en marcha.

La instalación de la extensión crea:

```
.specify/extensions/conformidad/conformidad-config.yml
```

La definición de terminado del manifiesto admite dos estados y no más: un elemento tiene implementación y evidencia verificable, **o una excepción explícita y aprobada**. Lo que no es ninguna de las dos cosas es incumplimiento.

**El método no rechaza lo incompleto. Rechaza lo que falta sin que nadie lo sepa.**

Si el proyecto no puede cumplir algo todavía, decláralo ahí con sus **tres** elementos obligatorios —qué sección, por qué en términos que otra persona pueda evaluar, y quién lo aprueba—. **Sin los tres no es una excepción: es una ausencia con excusa**, y la comprobación la reporta como tal.

Esta declaración es una decisión de la autoridad de producto. **No la completes tú.**

### 8. Comprobación de conformidad

```bash
.specify/extensions/conformidad/scripts/conformidad.sh
```

Sin una feature activa informará que no hay nada que comprobar todavía, y eso es correcto.

**No completes secciones para que la comprobación pase.** Convertir una ausencia visible en una plausible es peor que dejarla visible.

Y declara su límite al informar: comprueba que las secciones existan y tengan contenido, **no que lo escrito sea bueno**. Esa distancia la cierran `analyze` y una persona.

### 9. No ejecutar todavía el desarrollo del producto

La instalación termina aquí. **No ejecutes `specify` ni ninguna operación posterior** sin una instrucción explícita y sin que el fundamento de producto esté registrado en la sección **Completar por proyecto** de `AGENTS.md`.

---

## Los dos modos de uso, para informar a la persona

| Modo | Cómo se usa | Qué garantiza |
|---|---|---|
| **Comandos sueltos** | El agente invoca `speckit.*` desde lenguaje natural | La doctrina en los artefactos. **El agente puede omitir una comprobación** |
| **Workflow** | Una persona o una integración continua ejecuta `$SPECIFY_CMD workflow run software-humano` | Todo lo anterior, más las compuertas y la conformidad, **que el agente no ejecuta y no puede saltarse** |

El workflow es el camino recomendado, **no un requisito**.

---

## Informe final

Al terminar, informa en lenguaje natural:

1. versión de SpecKit e integración activa;
2. las tres capas instaladas, con su versión;
3. resultado de cada verificación del paso 5, **incluida la del frontmatter nativo**;
4. estado de la constitución y las quince familias;
5. si existe configuración de excepciones y si está vacía;
6. qué quedó pendiente y qué requiere decisión humana.

**No declares la instalación completa si alguna verificación no se ejecutó.** Distingue lo verificado de lo supuesto.
