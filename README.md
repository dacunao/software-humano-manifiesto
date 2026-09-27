# Software Humano para SpecKit — paquete de método

**Versión del paquete:** 2.1.0
**Núcleo del manifiesto:** 2.1
**Anexo de aplicación SpecKit:** 2.0
**Preset · workflow:** 2.0.0 · **extensión · bundle:** 2.1.0
**Autoridad:** Damián Acuña

## Qué es

Un paquete autocontenido que instala el **Manifiesto de Software Humano** como doctrina operativa dentro del ciclo SDD nativo de SpecKit, en cualquier proyecto.

**La doctrina no se reformula: se cita.** Cada exigencia que el método pone delante del agente es texto literal del manifiesto, y el ensamblado no produce el paquete si alguna cita no se encuentra en su fuente.

### Las cuatro capas

| Capa | Qué aporta |
|---|---|
| **Preset** | Lo que el manifiesto exige en cada operación, citado, y los artefactos que define, agregados a las plantillas nativas |
| **Extensión** `conformidad` | Comprueba que los artefactos tengan lo exigido y que toda ausencia esté declarada como excepción aprobada |
| **Workflow** | Las compuertas que el propio manifiesto especifica, y la conformidad en los momentos que nombra |
| **Bundle** | Fija las versiones de las tres anteriores |

**No incluye un fundamento de producto.** Ese lo aporta cada proyecto, en la forma que ya tenga. El paquete es el método.

### Lo que no hace

**No sustituye el comportamiento nativo de SpecKit.** Los comandos conservan su descripción, sus `handoffs` y sus scripts; las plantillas conservan sus secciones y sus tokens. El método agrega, no reemplaza.

**No rechaza lo incompleto. Rechaza lo que falta sin que nadie lo sepa.** La definición de terminado del manifiesto admite dos estados: implementación con evidencia verificable, **o excepción explícita y aprobada**. Un repositorio que nació antes del manifiesto entra declarando lo que todavía no cumple.

## Empieza aquí

1. Descomprime este paquete **en la raíz del repositorio** que usarás. No en una subcarpeta: si `SHA256SUMS` y `AGENTS.md` no quedan junto a `.git`, mueve el contenido.
2. Verifica la integridad:

   ```bash
   shasum -a 256 -c SHA256SUMS
   ```

3. Lee [`PARA_QUIEN_DECIDE.md`](PARA_QUIEN_DECIDE.md). Es corto y es el único escrito para ti: dice qué parte del método **no se delega**.
4. Comprueba el entorno **antes de instalar nada**:

   ```bash
   tools/speckit/preflight.sh
   ```

5. Coloca tu fundamento de producto en `docs/product/` y completa la sección **Completar por proyecto** al final de `AGENTS.md`. La [plantilla de fundamento](docs/product/PLANTILLA_FUNDAMENTO_DE_PRODUCTO.md) explica qué debe poder responderse.
6. Abre el repositorio con el agente elegido y entrégale el contenido de [`START_WITH_AI_AGENT.md`](START_WITH_AI_AGENT.md).
7. Permite que inspeccione el entorno antes de modificarlo.
8. Responde las decisiones humanas que aparezcan durante `clarify`.
9. Revisa en lenguaje natural `spec.md`, `plan.md`, `tasks.md` y el informe de `analyze`.
10. Autoriza `implement` únicamente cuando esos artefactos sean coherentes, completos y sin decisiones materiales abiertas.

Los agentes que reconocen `AGENTS.md` cargarán las reglas automáticamente. Claude Code carga `CLAUDE.md`, que referencia `AGENTS.md` sin duplicarlo.

## Cuenta con dos sesiones, no una

Las skills o comandos que registra `specify init` suelen cargarse al iniciar la sesión del agente. Por eso la instalación normalmente requiere:

- **Sesión 1**: comprobar entorno, inicializar SpecKit, instalar y verificar las tres capas instalables.
- **Sesión 2**: materializar y verificar la constitución.

Es lo esperado, no una falla.

## Dos modos de uso

| Modo | Cómo se usa | Qué garantiza |
|---|---|---|
| **Comandos sueltos** | El agente invoca `speckit.*` desde lenguaje natural | La doctrina en los artefactos. **El agente puede omitir una comprobación** |
| **Workflow** | Una persona o una integración continua lo ejecuta | Todo lo anterior, más las compuertas y la conformidad, **que el agente no ejecuta y no puede saltarse** |

El workflow es el camino recomendado, **no un requisito**: un método que solo funciona bajo workflow excluye a quien invoca comandos sueltos.

## Orden de lectura y autoridad

Ningún documento debe absorber el papel de otro.

| Orden | Fuente | Qué gobierna |
|---:|---|---|
| 1 | [`docs/method/Manifiesto_Software_Humano_IA_Nucleo_v2.1.md`](docs/method/Manifiesto_Software_Humano_IA_Nucleo_v2.1.md) | Cómo se concibe, decide, implementa y verifica software humano. |
| 2 | Tu fundamento de producto, en `docs/product/` | Qué debe construirse, con qué alcance y qué evidencia permite aceptarlo. |
| 3 | [`docs/method/Anexo_Aplicacion_SpecKit_v2.0.md`](docs/method/Anexo_Aplicacion_SpecKit_v2.0.md) | Cómo se corresponde el núcleo con los mecanismos nativos de SpecKit. |
| 4 | [`docs/method/GUIA_DE_IMPLEMENTACION_SPECKIT.md`](docs/method/GUIA_DE_IMPLEMENTACION_SPECKIT.md) | Cómo se construye y se mantiene esa correspondencia. |
| 5 | Las cuatro capas, en `tools/speckit/` | Cómo se materializa técnicamente. |
| 6 | SpecKit nativo | El ciclo SDD y todo comportamiento que el método no modifique. |

El núcleo y el fundamento no compiten: el núcleo gobierna el método; el fundamento gobierna el producto. Ante una contradicción real o aparente, el agente debe identificarla y **detener la decisión afectada**, no inventar una conciliación.

## Contenido

```text
├── README.md
├── AGENTS.md                         Reglas persistentes. Neutral de agente y de proyecto.
├── CLAUDE.md                         Referencia a AGENTS.md + lo específico de Claude Code.
├── PARA_QUIEN_DECIDE.md              Para la persona: qué no se delega.
├── START_WITH_AI_AGENT.md            Prompt de arranque.
├── SHA256SUMS
├── LICENSE                           Frontera de licencias, por naturaleza.
├── LICENSE-CODE                      MIT · método, herramientas e instrucciones.
├── LICENSE-CONTENT                   CC BY 4.0 · texto del núcleo v2.1.
├── docs/
│   ├── method/
│   │   ├── Manifiesto_Software_Humano_IA_Nucleo_v2.1.md
│   │   ├── Anexo_Aplicacion_SpecKit_v2.0.md
│   │   ├── Anexo_Aplicacion_SpecKit_v1.2.md      Superado; se conserva para instalaciones previas.
│   │   ├── GUIA_DE_IMPLEMENTACION_SPECKIT.md     Cómo mantener el método sobre SpecKit.
│   │   ├── inventario-de-objetos.md              Qué gobierna el manifiesto, generado.
│   │   ├── compuertas-del-metodo.md              Los seis momentos y su decisión requerida.
│   │   ├── mapa-de-cobertura.md                  Qué del manifiesto está compilado y qué no.
│   │   └── vocabulario-de-maquinaria.md          Términos que no son doctrina, declarados.
│   └── product/
│       └── PLANTILLA_FUNDAMENTO_DE_PRODUCTO.md
├── instructions/
│   ├── 00_REQUISITOS_DE_INSTALACION.md     Requisitos de entorno y checklist.
│   └── 01_INSTALAR_Y_VERIFICAR_SPECKIT.md  Procedimiento y verificación.
└── tools/
    └── speckit/
        ├── preflight.sh                             Comprueba el entorno. No modifica nada.
        ├── specify                                  Envoltorio con versión de SpecKit fijada.
        ├── shim/python3                             Intérprete con PyYAML para los scripts.
        ├── software-humano-spec-kit-preset-2.0.0/
        ├── conformidad-2.1.0/
        ├── workflow-software-humano-2.0.0/
        ├── bundle-software-humano-2.1.0/
        └── *.zip                                    Cada capa, empaquetada por separado.
```

Cada capa viaja como directorio y como ZIP. El directorio facilita inspección e instalación local; el ZIP conserva la distribución verificable. **El ZIP del bundle lleva solo su manifiesto**, no los componentes: instalarlo por identificador exige un catálogo publicado.

## Requisitos previos

Comprobados todos por `tools/speckit/preflight.sh`:

- un repositorio Git con árbol limpio;
- SpecKit compatible con `>=1.0.0,<2.0.0`;
- **un `python3` en el `PATH` con PyYAML** — sin él, la resolución de plantillas falla;
- una integración de agente elegida por una persona;
- permiso para inicializar SpecKit si no existe `.specify/`;
- capacidad del agente para ejecutar comandos, leer Markdown y presentar resultados en lenguaje natural.

No se requiere ninguna tecnología concreta: el paquete no impone arquitectura. Esas decisiones pertenecen a tu fundamento de producto.

## Flujo autorizado

El paquete conserva el flujo nativo de SpecKit y le agrega las compuertas que el manifiesto especifica.

1. `constitution` — instala o verifica la proyección del núcleo v2.1.
2. `specify` — deriva la especificación desde el fundamento completo.
3. `clarify` — resuelve decisiones materiales sin adivinarlas.
4. **Punto de control · antes de diseñar.**
5. `plan` — define la estrategia técnica y las dependencias.
6. `tasks` — deriva trabajo para todo el alcance autorizado.
7. `analyze` — comprueba doctrina, cobertura y trazabilidad.
8. **Comprobación de conformidad y punto de control · antes de generar código.**
9. `implement` — solo después de autorización explícita.
10. **Punto de control · antes de integrar.**
11. `converge` — reconcilia implementación, alcance y evidencia.
12. **Comprobación de conformidad y punto de control · antes de liberar.**

El manifiesto llama **puntos de control** a esos momentos. Bajo comandos sueltos son responsabilidad de la persona; bajo workflow los ejecuta el motor como pasos `gate`, y cuatro de los seis son expresables así.

Una ejecución parcial es avance, **no una reducción del alcance**. El agente no puede inventar prioridades, MVP, releases, exclusiones ni aceptación.

## Qué significa estar listo para desarrollar

- SpecKit está inicializado con la integración elegida;
- las tres capas instalables están instaladas y verificadas;
- **los comandos compuestos conservan la descripción, los `handoffs` y los `scripts` nativos**;
- las plantillas conservan sus secciones y tokens nativos, y llevan agregados los artefactos del manifiesto;
- el checklist nativo sigue sin intervenir;
- la constitución v2.1 completa está materializada y verificada;
- el fundamento de producto fue utilizado como fuente autorizada;
- las decisiones materiales necesarias para planificar están resueltas;
- `spec.md`, `plan.md`, `tasks.md` y `analyze` conservan todo el alcance;
- una persona revisó los artefactos y autorizó comenzar `implement`.

**Instalar el método o generar código no basta** para declarar que el proyecto está preparado.

## Qué mide y qué no mide este método

Comprueba que lo que el manifiesto exige **esté presente y trazable**. No comprueba que lo escrito sea bueno: una tabla llena de frases plausibles pasa toda comprobación de forma.

Esa distancia la cierran `analyze`, una persona, y —para el resultado— las pruebas con personas que el propio manifiesto exige antes de aceptar. **La unidad de medida del manifiesto no es la cobertura: es el progreso que una persona puede lograr con claridad, confianza y control.**

## Historial de versiones

### 2.1.0

**La excepción aprobada exige sus cuatro campos**: `artefacto`, `seccion`,
`razon` y `aprobada_por`. Hasta aquí bastaba nombrar la sección, y una línea sin
razón ni aprobador pasaba como excepción aprobada — menos de lo que exige el
manifiesto que el paquete distribuye. `artefacto` es nuevo y obligatorio porque
una misma sección aparece en más de un artefacto, y la excepción declarada para
uno tapaba la del otro.

**La conformidad comprueba primero que el método siga instalado.** Un `override`
del proyecto, otro preset con más precedencia o un addendum vaciado dejan el
artefacto limpio porque nunca se le pidió nada. Ahora se verifica que el preset
componga los ocho comandos, que los tres addenda no estén vacíos y que ningún
`override` esté tapando uno de los ocho.

**El bundle instalaba cero componentes reportando éxito.** Su manifiesto los
declaraba fuera de `provides`, que es donde SpecKit los lee. Corregido; sigue sin
poder instalarse hasta publicar las capas en un catálogo, y ninguna instrucción
lo ofrece.

### 2.0.0

Reconstrucción completa del método. **No modifica el núcleo v2.1.**

- **La doctrina se cita, no se reformula.** Se encontraron diez defectos en la versión anterior y nueve eran de transcripción: un criterio de salida convertido en criterio de entrada, una regla inventada y atribuida al núcleo, una exigencia debilitada de «y» a «o». Ahora no hay campo de redacción propia y el ensamblado verifica cada cita contra su fuente.
- **Cuatro mecanismos nativos, no uno.** Preset, extensión, workflow y bundle.
- **Los comandos conservan su frontmatter nativo.** La versión anterior lo declaraba y con eso borraba los `handoffs` —el encadenamiento entre comandos— en los cinco que los traen.
- **Las plantillas se amplían, no se sustituyen.** Sustituir borraba las secciones que `analyze` busca por su nombre y los tokens que SpecKit sustituye por la invocación del agente.
- **Los puntos de control no se diseñan: se citan.** El manifiesto especifica seis momentos con su decisión requerida.
- **La conformidad admite excepciones aprobadas**, que es como un repositorio que ya existía adopta el método sin ser bloqueado.

### 1.6.0

**Nuevo `PARA_QUIEN_DECIDE.md`: el primer documento del paquete escrito para la persona y no para el agente.**

La compilación del preset 1.2.0 dejó setenta y nueve comprobaciones a cargo del agente. Lo que no se pudo compilar quedó a cargo de la persona —no aprobar un gate rechazado por prisa, correr las pruebas con personas, y leer lo que el agente pone delante— **y ningún documento se lo decía**. Un método que transfiere obligaciones a quien no sabe que las tiene no las transfirió: las perdió.

El documento tiene cuatro momentos, cinco preguntas y una tabla de respuestas huecas frente a reales. Es corto a propósito y declara que debe seguir siéndolo.

No toca el preset, que permanece en v1.2.0.

### 1.5.0

**Preset 1.2.0: las disposiciones pasan de prosa a comprobación.** La 1.1.0 nombró qué debe activar cada comando; al medirlo, menos de la mitad de esas obligaciones podía responderse sí o no mirando el artefacto. Ahora cada una está expresada como comprobación verificable, y **las que no compilan están declaradas como tales**.

Una disposición compila cuando se expresa como «X existe», «X traza a Y» o «ninguna X sin Z». Se resiste cuando se expresa como un adjetivo de calidad. Las que nombran artefactos y estados compilan; las que nombran cualidades no.

Ninguna comprobación verifica si la persona comprende, confía o progresa: eso exige pruebas moderadas con personas, y cada comando lo declara en lugar de darlo por cubierto.

Sin cambio doctrinal: un proyecto instalado **no necesita rematerializar su constitución**.

### 1.4.1

Dos reglas nuevas en la plantilla de `AGENTS.md`, que cubren el territorio donde el preset **estructuralmente no llega**: los comandos `speckit.*` solo gobiernan mientras uno de ellos corre, y los tres fallos de juicio del primer piloto ocurrieron en conversación, fuera de todo comando y de todo artefacto.

- La regla 1 se amplía de «antes de proponer componentes o código» a **antes de proponer cualquier cosa**, incluida una dirección de diseño o una alternativa, consultando la doctrina **antes** de formular la propuesta.
- La regla 11 es nueva: **antes de abrir una decisión a la persona, comprobar que las fuentes rectoras no la resuelvan ya**, pudiendo nombrar cuál se consultó.

Sigue siendo persuasión, no coerción. `AGENTS.md` es la única capa presente cuando no corre ningún comando, y por eso es donde estas reglas pueden servir de algo.

No toca el preset, que permanece en v1.1.0.

### 1.4.0

**El preset pasa a cumplir el anexo que materializa.** Hasta 1.0.2 no incorporaba las *referencias por operación* que el anexo exige en su línea 516 y verifica en sus criterios 14 y 15: de unas cien asignaciones, citaba tres.

La consecuencia, medida en el primer piloto real, era que el preset protegía el alcance y la autoridad y no aplicaba los principios de experiencia ni los controles de verificación.

**Preset 1.1.0**, en cuatro capas para que la doctrina no pueda saltarse en silencio:

1. Cada comando nombra las disposiciones que el anexo le asigna y qué exige cada una **en ese momento**.
2. Cada comando obliga a **declarar qué activó y con qué consecuencia concreta**.
3. `plan-template.md` y `tasks-template.md` tienen el hueco donde esa declaración vive.
4. `analyze` **comprueba que la declaración exista y sea concreta**; su ausencia es un hallazgo.

Sin cambio doctrinal: `constitution-template.md` es byte a byte la de 1.0.2, así que un proyecto instalado **no necesita rematerializar su constitución**.

### 1.3.0

**Nuevo apartado en la plantilla de `AGENTS.md`: protocolo de coordinación entre sesiones.**

Se agrega porque la plantilla no preguntaba si el proyecto usaría más de un agente ni bajo qué reglas, y esa omisión tuvo consecuencia medida: durante el desarrollo de este método, dos sesiones sostuvieron ocho rondas de mensajes cruzados que produjeron 17 de 25 commits sin instrucción humana, y la autoridad de producto quedó fuera de su propio proyecto. Registrado como `M1` en las propuestas del repositorio del paquete.

El apartado pide declarar qué sesiones trabajan, qué archivos pueden colisionar, qué exige aprobación humana previa y a quién reporta cada una. Fija además una regla: **ningún commit antes de que la autoridad haya visto de qué se trata**.

**No toca el preset**, que permanece en v1.0.2. Un proyecto con el preset instalado no necesita re-sincronizar nada por esta versión.

### 1.2.0

**El paquete pasa a ser redistribuible.** Hasta 1.1.1 no tenía `LICENSE`, de modo que quedaba como «todos los derechos reservados» por omisión mientras invitaba a instalarse en cualquier proyecto. Y el `LICENSE` del preset decía expresamente «no permission is granted to… publish», lo que volvía **inejecutable** la decisión aprobada de publicarlo en el catálogo de comunidad de SpecKit.

| Área | Cambio |
|---|---|
| `LICENSE`, `LICENSE-CODE`, `LICENSE-CONTENT` | Nuevos. Declaran la frontera por naturaleza: MIT para código y operación, CC BY 4.0 para el texto del núcleo |
| Anexo v1.2 | Queda bajo MIT. Es documentación de la adaptación, no doctrina |
| Preset 1.0.2 | Sustituye la licencia propietaria por MIT; `preset.yml` declara `license: "MIT"`. **Sin cambio doctrinal ni funcional** |

Un proyecto con 1.0.1 instalado **no necesita rematerializar su constitución** al adoptar esta versión: la proyección doctrinal es byte a byte la misma.

### 1.1.1

`AGENTS.md` sale de `SHA256SUMS`. Al migrar el primer repositorio a 1.1.0 se hizo evidente que completar la sección «Completar por proyecto» —el uso previsto del archivo— rompía la verificación de integridad. Un control que falla en el caso normal deja de ser un control.

## Integridad y licencias

`SHA256SUMS` verifica los archivos **invariantes** del método: el manifiesto, el anexo, el preset, las instrucciones y las herramientas. Usa rutas relativas, de modo que sigue verificando si mueves el paquete completo o lo instalas en un repositorio con otros archivos.

**`AGENTS.md` queda deliberadamente fuera de la verificación**, porque su sección «Completar por proyecto» está diseñada para que cada repositorio la edite. Incluirlo haría que la integridad fallara en cuanto alguien usara el paquete como se espera, y eso enseñaría a ignorar el resultado. Si `SHA256SUMS` falla, hay un problema real.

### Licencias

El paquete contiene **dos naturalezas bajo dos licencias**, con la frontera definida **por naturaleza y no por carpeta**:

| Qué | Licencia |
|---|---|
| Preset, herramientas, instrucciones y el anexo v1.2 | [MIT](LICENSE-CODE) |
| Texto del núcleo del manifiesto v2.1, dondequiera que aparezca | [CC BY 4.0](LICENSE-CONTENT) |

`templates/constitution-template.md` vive dentro del preset y es **contenido**, no código: su texto doctrinal es el del núcleo. [`LICENSE`](LICENSE) explica la frontera completa.

Puedes instalar, modificar y redistribuir el paquete sin pedir permiso, y citar, traducir o adaptar el texto del manifiesto con atribución.

Este paquete no concede licencia alguna sobre SpecKit ni sobre software de terceros, que conservan las suyas.

El preset conserva su licencia propietaria en su propio directorio. Este paquete no concede una licencia adicional sobre el manifiesto, SpecKit ni software de terceros.

## Una nota sobre fechas

El núcleo v2.1 declara **ratificación el 2026-09-20**; el paquete se fecha el **2026-09-21**. La diferencia es deliberada: la doctrina se ratifica antes de empaquetarse. No es una inconsistencia que deba corregirse.
