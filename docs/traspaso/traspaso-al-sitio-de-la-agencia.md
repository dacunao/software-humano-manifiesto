# Traspaso al sitio de la agencia · `softwarehumano.com`

**De:** el proyecto del sitio del Manifiesto (`manifiesto.softwarehumano.com`), publicado el 2026-09-30.
**Para:** el proyecto nuevo del sitio de la agencia Software Humano.
**Autoridad de producto de ambos:** Damián Acuña.
**Proyecto nuevo:** `agencia-software-humano`.
**Fecha:** 2026-09-30. Revisado con la sesión del paquete del método; la separación por autoridad la decidió Damián.

Este documento tiene **dos partes, separadas por autoridad**:

- **Parte A · Decisiones que deben gobernar.** No sirven como contexto: si se quedan en un documento de consulta, el agente puede ignorarlas sin incumplir nada, porque `AGENTS.md` no le da autoridad a un traspaso. Damián las lleva al fundamento de producto del sitio de la agencia o a «Decisiones técnicas aprobadas» de su `AGENTS.md`.
- **Parte B · Experiencia y recursos.** Qué ya existe, dónde está, qué costó y qué no repetir. Se nombra en `AGENTS.md` como **lectura de consulta sin autoridad**: si choca con el fundamento o con una decisión de Damián, valen el fundamento y la decisión; se avisa la contradicción y no se concilia.

Las fuentes se enlazan, no se copian. Viven en el repositorio público del Manifiesto; aquí `REPO/…` significa `https://github.com/dacunao/software-humano-manifiesto/blob/main/…`.

---

## Orden de inicio: seguirlo tal cual

El proyecto nuevo es **`agencia-software-humano`**. El orden importa porque descomprimir el paquete del método escribe en la raíz (`AGENTS.md`, `CLAUDE.md`, las licencias, `SHA256SUMS` y otros), y lo que esté ahí antes con el mismo nombre se pierde. Completar `AGENTS.md` antes de descomprimir es trabajo perdido.

1. **Repositorio vacío** y `git init`.
2. **Descomprimir el paquete del método v2.3.2**, el ZIP starter de `https://github.com/dacunao/software-humano-speckit/releases/tag/v2.3.2` (SHA-256 `bfb17a1fe3f5aa434c41881b8f354299385613a63d584d0fa1a43ea40d14c909`).
3. **Poner el contenido propio en rutas que el paquete no toca:** el fundamento de producto, los insumos de marca y copy, y este documento (por ejemplo en `docs/traspaso/`). Desde la 2.2.4, el `README.md` de la raíz es libre para el proyecto.
4. **Damián completa «Completar por proyecto» de `AGENTS.md`:**
   - el fundamento de producto;
   - las decisiones de la Parte A, en «Decisiones técnicas aprobadas» o en el fundamento;
   - la especificación visual v1.0 **entre las fuentes rectoras** (A1);
   - este documento como **lectura de consulta sin autoridad**.
5. **Sesión 1**, siguiendo `instructions/01` del paquete: comprobación de entorno, `init`, las tres capas y su verificación. Los pasos y las trampas conocidas están en el paquete y en las «Notas de entorno» de su `AGENTS.md`; este documento no los repite.
6. **Cerrar y reabrir la sesión.** Las skills se cargan al iniciar: un comando instalado en la sesión 1 no existe hasta reabrir. Es lo esperado, no un fallo.
7. **Sesión 2:** materializar la constitución.
8. **Recién entonces, `specify`.** Sin fundamento identificable, el método se detiene (`STOP01`).

Si algo de este documento contradice al paquete, **vale el paquete**: se avisa y se detiene.

---

## Parte A · Decisiones que gobiernan

Decididas por Damián Acuña (2026-09-30). Van al fundamento de producto o a «Decisiones técnicas aprobadas» del `AGENTS.md` de `agencia-software-humano`.

| # | Decisión | Fuente |
|---|---|---|
| A1 | **La marca es la especificación visual compartida v1.0.1.** El documento declara en su cabecera que su ámbito son los dos sitios y que es fuente de verdad para el agente que implementa ambos. **El `AGENTS.md` del proyecto nuevo debe nombrarla entre sus fuentes rectoras:** si no, el agente la lee como contexto y puede apartarse sin incumplir nada. Son obligatorias tal como están escritas:<br>• sus ocho reglas no negociables (§2)<br>• la sección del sitio comercial (§9)<br>• el flywheel del ciclo (§7.9)<br>• Prisma en índigo y Catalizador en coral<br>• el único llamado principal, «Leer el Manifiesto», en índigo | `REPO/docs/design/Software_Humano_Especificacion_Visual_v1.0.1.md` (SHA-256 `b6175ff7708bcc0a9ccfaf86cb27ad4d22ad1edbdd6d35d59dfb2e1930d921e2`), autoridad Damián Acuña. Lo propio del sitio comercial, como el flywheel, va en su anexo declarado del estándar común (`REPO/docs/estandar/estandar-comun-de-los-sitios.md`) |
| A2 | **Relación entre los dos sitios:**<br>• la agencia cita el núcleo del manifiesto en frases breves con enlace a su pasaje en `manifiesto.softwarehumano.com`<br>• nunca lo duplica | `REPO/AGENTS.md`, «Relación con Software Humano» |
| A3 | **Nombres y derechos:**<br>• «Software Humano» no se traduce; en portugués es femenino: «a Software Humano»<br>• el nombre, el logotipo y **el contenido del sitio de la agencia son de autor, con todos los derechos reservados**: no se licencian como el Manifiesto, cuyo contenido es CC BY 4.0<br>• **el código del sitio de la agencia es privado, para siempre**: su repositorio no se publica y no lleva licencia abierta (decisión de Damián Acuña, 2026-09-30) | Decisión de Damián Acuña (2026-09-30); PRD del Manifiesto v1.6 §29.5 para la exclusión de los nombres y el logotipo |
| A4 | **Verificación en cuatro capas, obligatoria siempre:** ningún idioma se publica sin pasarla, para **todo** el contenido del sitio y no solo para lo que cite el manifiesto. Detalles en B3 | `REPO/specs/001-sitio-manifiesto/research.md` (RQ-19) |
| A5 | **Publicación en Cloudflare con el mismo flujo que el Manifiesto:**<br>• Workers con archivos estáticos, por subida directa, en la misma cuenta y la zona `softwarehumano.com`, que ya existen<br>• construir, pasar las pruebas y la comprobación previa<br>• subir una vista previa<br>• Damián la revisa y acepta<br>• recién entonces se publica, con vuelta atrás disponible | `REPO/specs/001-sitio-manifiesto/evidencia/tecnica.md`; `REPO/wrangler.jsonc` |
| A6 | **Uniformidad: una sola forma de hacer cada cosa.** El sitio del Manifiesto es la **implementación de referencia**. Lo que allí ya está resuelto se usa igual en la agencia, sin variantes:<br>• los datos estructurados (JSON-LD): `REPO/src/lib/semantica/jsonld.ts`<br>• el tema claro u oscuro: `REPO/public/tema.js`, `REPO/src/cliente/tema.ts`, `REPO/src/components/ControlTema.astro`<br>• el selector de idioma: `REPO/src/components/SelectorIdioma.astro`, `REPO/src/cliente/preferencia-idioma.ts`<br>Solo cambia si alguien trae una forma mejor y Damián la aprueba; entonces se actualiza primero en el Manifiesto y después en los demás | Decisión de Damián Acuña (2026-10-01) |

**Por qué la voz queda libre y la verificación atada:** la voz es criterio y cambia con el propósito de cada sitio; el comercial tiene otro que el Manifiesto. La verificación, en cambio, atrapa cambios de sentido que ninguna voz justifica. «O pacote reclama a raiz do projeto», que en portugués de Brasil dice que el paquete se queja, habría pasado cualquier revisión de estilo.

**Si algo de la Parte B choca con el fundamento o con la especificación visual, ganan el fundamento y la especificación.** El agente lo reporta en vez de resolverlo por su cuenta.

**Decisiones abiertas del proyecto nuevo:**
- **Nombrar «Software Humano» en la cabecera:** se decide al definir la de `softwarehumano.com`, para los dos sitios a la vez.
- **Enviar correo como el dominio:** requiere un servicio de correo propio (ver B4).

---

## Parte B · Experiencia y recursos

### B1 · Marca: lo que ya está hecho y se puede copiar

Es código del sitio del Manifiesto, bajo MIT. La marca que representa sigue A1 y A3: el logotipo y los nombres no entran en esa licencia.

| Pieza | Dónde |
|---|---|
| Tokens de la especificación §8, claro y oscuro | `REPO/src/styles/tokens.css` |
| Logotipo: ícono SVG en línea más la palabra en Noto Sans; nombre accesible | `REPO/src/components/Marca.astro` |
| Favicon (ICO 16/32, SVG) e ícono de Apple (180 px) | `REPO/public/favicon.ico`, `favicon.svg`, `apple-touch-icon.png` |
| Noto Sans variable autoalojada, subconjunto latino, WOFF2, con su licencia OFL | `REPO/public/fonts/`, `@font-face` en `REPO/src/styles/global.css` |
| Imágenes sociales por idioma, 1200 × 630 | `REPO/public/social/` |
| Tema claro u oscuro, sin destello al cargar | `REPO/public/tema.js`, `REPO/src/cliente/tema.ts` |

Lo aprendido:
- **La cabecera del teléfono** mostraba solo el ícono y dejaba el sitio anónimo para quien no conoce la marca. Se corrigió así: ícono y nombre desde 360 px de ancho, y «Buscar» como lupa para hacerle lugar.
- **Los documentos de marca y el copy de la agencia** que Damián entregó como insumo no están en el repositorio del Manifiesto. Los aporta él.

### B2 · Copy: voz, aprobación y cómo trabajar con Damián

**Voz del Manifiesto, como referencia y no como regla** (la voz del sitio comercial la decide su propio fundamento):
- **Tono** (PRD del Manifiesto v1.6 §21.6): claro, directo y preciso; humano sin infantilizar; técnico solo cuando mejora la comprensión; sin grandilocuencia sobre IA; sin presentar recomendaciones como hechos.
- **Español neutro latinoamericano:** `tú` y `ustedes`, sin voseo, `vosotros` ni localismos nacionales.
- **Inglés estadounidense** (*organize, behavior, center*).
- **Portugués de Brasil,** con `pt-BR` en los metadatos.

**El flujo de aprobación, como se practicó aquí:**
- cada texto visible lleva su estado por idioma: `pendiente`, `borrador` o `aprobado`, este último con quién y cuándo;
- Damián aprueba los tres idiomas, después de las cuatro capas;
- una comprobación previa impide publicar con textos sin aprobar (`REPO/scripts/check-publish.ts`);
- el agente nunca marcó un texto como aprobado sin la instrucción explícita de Damián.


- **Una tabla de tres columnas.** Los textos nuevos se le presentan en español, inglés y portugués, cortos, y se le pide un sí. Le ahorra lectura y decide rápido.
- **Qué exige volver a aprobar:** un texto nuevo o modificado vuelve a `borrador`. Cambiar un dato que el texto usa, como una versión o una dirección, no exige volver a aprobarlo.
- **La prueba de neutralidad del español** detecta voseo y `vosotros`: `REPO/tests/unit/lenguaje/neutralidad.test.ts`.
- **La autoría:** autor Damián Acuña, persona; editor Software Humano, organización. Su página de autor es `https://www.linkedin.com/in/dacunao/`. En el Manifiesto, la voz del recorrido es impersonal, con una sola nota de origen en primera persona equilibrada.

### B3 · Traducción: el servicio y cómo usarlo

La verificación en cuatro capas (RQ-19):

| Capa | Qué hace | Costo |
|---|---|---|
| 1 · Terminología | Glosario es → en → pt con variantes prohibidas | Local, gratis |
| 2 · Ortografía y gramática | LanguageTool local, `en-US` y `pt-BR` | Local, gratis |
| 3 · Sentido | Errores estilo MQM (omisión, adición, cambio de sentido, terminología, fluidez) por el revisor, de otra familia que el traductor | Claude, en la sesión, por archivos |
| 4 · Contraste | Traducción independiente con DeepL, comparada por el revisor | Plan Developer de DeepL, un millón de caracteres en total; el Manifiesto usó cerca del 9 % |

**Roles fijos, para que la revisión sea adversaria** (decisión de Damián Acuña, 2026-10-01): **ChatGPT (OpenAI) traduce, Claude revisa** la capa 3 y compara la capa 4, y **DeepL** da el contraste independiente. Gemini dejó de usarse: el 2026-10-01 estuvo saturado durante horas y el servicio no entregó nada. El servicio no llama a ningún modelo; todo pasa por archivos.

**Corre desde el repositorio del Manifiesto.** Bun lee las claves de su `.env.local`, que Damián creó y está fuera del repositorio. LanguageTool está instalado aislado en `~/.local/share/languagetool-software-humano`. El proyecto nuevo no puede adivinarlo.

```bash
cd /Users/damianacuna/proyectos/website-software-humano
R=scripts/traduccion/readme.ts

# 1 · Traducir: la indicación fija (glosario y variedad) para que Damián lleve el español a ChatGPT.
bun run $R --modo=traducir --es="<ruta>/archivo.es.md" --dir="<paquete>"

# 2 · Preparar: capas 1 y 2 locales, contraste de DeepL y los paquetes del revisor.
bun run $R --modo=preparar --es="<ruta>/archivo.es.md" --en="<ruta>/archivo.md" --pt="<ruta>/archivo.pt-BR.md" \
  --dir="<paquete>" --tradujo=openai --reviso=anthropic

# 3 · Claude lee capa3-en.md, capa3-pt.md, capa4-en.md y capa4-pt.md y escribe
#     revision-capa3-en.json, revision-capa3-pt.json, revision-capa4-en.json y revision-capa4-pt.json.

# 4 · Recibir: valida las respuestas y escribe el informe.
bun run $R --modo=recibir --dir="<paquete>" --salida="<ruta>/informe-cuatro-capas.json"
```

- **Control de familia:** `--tradujo` y `--reviso` son obligatorios, y el servicio se detiene si son de la misma familia (hallazgo C6).
- **Validación de las respuestas:** un elemento por segmento, con la misma clave y en el mismo orden, y los campos según el esquema de la capa. Si algo no calza, se detiene y dice qué.
- **Archivos:** el paquete y el informe se escriben solo en `--dir` y `--salida`; no se toca el repositorio del Manifiesto.
- **Aviso de envío:** el servicio avisa qué texto sale a DeepL o al revisor. No sabe si es público: el copy de la agencia no lo es, y enviarlo es decisión de Damián.
- **Bloques alineados:** los tres archivos deben tener los mismos bloques, separados por línea en blanco, en el mismo orden. Una barra de idioma en la primera línea se omite. Si un idioma lleva un aviso propio, se pone también en los otros; si no, el servicio se detiene.
- **Copy que no está en Markdown** (YAML, componentes): se exporta cada idioma a un Markdown alineado, un bloque por texto, y se pasa por el mismo servicio.
- **Cupo:** una página de unas 120 líneas cuesta unos 12.000 caracteres de DeepL.
- **Glosario:** `REPO/scripts/traduccion/glosario.yaml`, con 27 términos fijados del núcleo y 10 variantes prohibidas. Los términos propios de la agencia se proponen a Damián y se agregan allí, para que un concepto no tenga dos nombres en dos sitios del mismo autor.
- **El flujo:**
  1. Damián traduce con ChatGPT, usando la indicación del paso 1.
  2. El servicio prepara las capas 1, 2 y el contraste.
  3. Claude revisa las capas 3 y 4, y confirma cada observación contra el archivo.
  4. Damián aprueba.

  Evidencia: `REPO/specs/001-sitio-manifiesto/evidencia/revision-linguistica/verificacion-cuatro-capas.md`.

Lecciones del registro del piloto (`REPO/docs/pilot/registro-del-piloto.md`):
- **Verificar quién tradujo antes de elegir el revisor** (C6). Se supuso mal y casi se descartó una revisión necesaria.
- **Las salidas de modelo son observaciones por confirmar** (`V12`). Hubo falsos positivos; cada observación se confirma contra el archivo.
- **Las capas gratuitas no siempre responden** (B6). Gemini estuvo saturado durante horas, dos días seguidos, y el modo gratuito de Mistral tiene cupo cero. Por eso, desde el 2026-10-01, el servicio no depende de ningún modelo externo: todo pasa por archivos.
- **La capa 3 encuentra lo que nada determinista ve** (A8, A9). Por ejemplo, «O pacote reclama a raiz do projeto», que en portugués de Brasil dice que el paquete se queja.
- **Un defecto del español no se compensa en la traducción.** Se corrige el español o se lleva a Damián.

### B4 · Infraestructura que ya existe

Estado al 2026-09-30:
- **DNS:**
  - `softwarehumano.com` sigue registrado en GoDaddy, con los servidores de nombres de Cloudflare (`davina` y `mcgrory.ns.cloudflare.com`);
  - la raíz y `www` apuntan todavía a la página de estacionamiento de GoDaddy, en modo «DNS only»;
  - DNSSEC está apagado.
- **Cuenta de Cloudflare:** la de `dacunao@gmail.com`, con el subdominio `dacunao.workers.dev`.
  - Un dominio propio en Workers exige el DNS en Cloudflare, y eso ya está hecho.
  - Para el Manifiesto hay vistas previas por versión, publicación y vuelta atrás en menos de un segundo. El procedimiento está en `REPO/specs/001-sitio-manifiesto/evidencia/tecnica.md` y la configuración en `REPO/wrangler.jsonc`.
  - En la cuenta de Damián, Wrangler 4.144 ya no crea proyectos de Pages clásico sin forzarlo: delega en Workers.
- **Rastreadores de IA:** permitidos en la zona (Search, Agent y Training en «Allow»). Bot Preference Sync está desactivado, así que `robots.txt` es el del proyecto.
- **Google Search Console:** la propiedad de **dominio** `softwarehumano.com`, ya verificada, cubre también la agencia. Bing Webmaster Tools está importado desde ella.
- **Cloudflare Web Analytics:** existe el sitio del Manifiesto. La agencia necesita **su propio sitio** en Web Analytics, con instalación manual para no contar dos veces.
  - El script pesa 10,1 KB comprimido: conviene contarlo al fijar el presupuesto de JavaScript (lección C7).
  - Las pruebas locales deben bloquearlo, para no registrar visitas falsas.
- **Correo:**
  - Email Routing recibe `manifiesto@softwarehumano.com` y lo reenvía a `manifiestosoftwarehumano@gmail.com`; se pueden crear más direcciones en la misma zona;
  - **solo recibe:** enviar como el dominio requiere un servicio de correo propio, porque el DMARC del dominio es `p=quarantine` y un envío desde Gmail caería en spam.
- **Checklist de publicación ya recorrido** (SEO, AEO, GEO, Google, medición y rendimiento), reutilizable como lista: `REPO/specs/001-sitio-manifiesto/evidencia/checklist-publicacion.md`.

### B5 · Lo que costó en el Manifiesto y conviene evitar desde el principio

Del registro del piloto y del informe del método (`REPO/docs/pilot/informe-del-metodo-2026-09-29.md`):
- **Los cambios pequeños decididos en la conversación se implementaron sin pasar por el ciclo** (C4). Registrar la tarea antes de implementar y correr `analyze` evitó repetirlo.
- **Una observación de uso transmitida por Damián llegó sin su origen** (C5). El diagnóstico salió equivocado. Conviene anotar en ese momento de dónde viene.
- **Una decisión aprobada no llegó al presupuesto que la afectaba** (C7). La medición de visitas no estaba contada en el presupuesto de JavaScript.
- **El proveedor cambió la plataforma el mismo día del despliegue** (B7). Se verificó en la documentación oficial antes de decidir, en lugar de seguir la sugerencia de la herramienta.
