# Traspaso al sitio de la agencia · `softwarehumano.com`

**De:** el proyecto del sitio del Manifiesto (`manifiesto.softwarehumano.com`), publicado el 2026-09-30.
**Para:** el proyecto nuevo del sitio de la agencia Software Humano.
**Autoridad de producto de ambos:** Damián Acuña.
**Fecha:** 2026-09-30. Revisado con la sesión del paquete del método.

Este documento tiene **dos partes, separadas por autoridad**:

- **Parte A · Decisiones que deben gobernar.** No sirven como contexto: si se quedan en un documento de consulta, el agente puede ignorarlas sin incumplir nada, porque `AGENTS.md` no le da autoridad a un traspaso. Damián las lleva al fundamento de producto del sitio de la agencia o a «Decisiones técnicas aprobadas» de su `AGENTS.md`.
- **Parte B · Experiencia y recursos.** Qué ya existe, dónde está, qué costó y qué no repetir. Se nombra en `AGENTS.md` como **lectura de consulta sin autoridad**: si choca con el fundamento o con una decisión de Damián, valen el fundamento y la decisión; se avisa la contradicción y no se concilia.

Las fuentes se enlazan, no se copian. Viven en el repositorio público del Manifiesto; aquí `REPO/…` significa `https://github.com/dacunao/software-humano-manifiesto/blob/main/…`.

---

## Cómo arrancar el proyecto nuevo

1. **Primero, el paquete del método**, versión **v2.3.2** (`https://github.com/dacunao/software-humano-speckit/releases/tag/v2.3.2`; SHA-256 del ZIP starter `bfb17a1fe3f5aa434c41881b8f354299385613a63d584d0fa1a43ea40d14c909`). Se instala siguiendo `instructions/01` del propio paquete, sin atajos. Este documento no repite esos pasos: viven en el paquete.
2. **Después, este documento**, en una ruta que el paquete no toca (por ejemplo `docs/traspaso/`). Descomprimir el paquete escribe en la raíz, y lo que esté ahí con el mismo nombre se pierde.
3. **Damián completa «Completar por proyecto» de `AGENTS.md`** con:
   - el fundamento de producto;
   - las decisiones de la Parte A que adopte;
   - la mención de este documento como lectura de consulta sin autoridad.

   Esto va antes de `specify`: sin fundamento identificable, el método se detiene (`STOP01`).
4. Si algo de este documento contradice al paquete, **vale el paquete**: se avisa la contradicción y se detiene.

---

## Parte A · Decisiones que deben gobernar

Estado de cada una:
- **Vigente para ambos sitios:** Damián ya la decidió para los dos.
- **Decidida para la agencia:** Damián la decidió para este proyecto.
- **Propuesta:** regía en el Manifiesto; Damián confirma si rige también aquí.

| # | Decisión | Estado | Fuente |
|---|---|---|---|
| A1 | **La marca es la especificación visual compartida v1.0**:<br>• Noto Sans como única familia<br>• paleta y tokens<br>• componentes<br>• WCAG 2.2 AA<br>• claro y oscuro equivalentes<br>• en `softwarehumano.com`, sus reglas del §9 | Vigente para ambos sitios | `REPO/docs/design/Software_Humano_Especificacion_Visual_v1.0.md` (SHA-256 `721a409e…0cad`), autoridad Damián Acuña |
| A2 | **Relación entre los dos sitios:**<br>• el Manifiesto publica la doctrina y la agencia se presenta a sí misma<br>• los pasajes del núcleo viven solo en el Manifiesto; la agencia los cita en frases breves con enlace, sin duplicarlos<br>• el Manifiesto enlaza a la agencia en su pie y en Acerca de | Vigente para ambos sitios (2026-09-28) | `REPO/AGENTS.md`, «Relación con Software Humano» |
| A3 | **Nombres y licencias:**<br>• «Software Humano» no se traduce; en portugués es femenino: «a Software Humano»<br>• «Manifiesto» es el nombre del sitio del Manifiesto en los tres idiomas<br>• los nombres y el logotipo quedan fuera de las licencias MIT y CC BY 4.0 | Vigente para ambos sitios | PRD del Manifiesto v1.6 §29.1 y §29.5 |
| A4 | **Voz:**<br>• claro, directo y preciso; humano sin infantilizar; sin grandilocuencia sobre IA; sin presentar recomendaciones como hechos<br>• español neutro latinoamericano con `tú` y `ustedes`, sin voseo, `vosotros` ni localismos<br>• inglés estadounidense<br>• portugués de Brasil | Propuesta | PRD del Manifiesto v1.6 §21.6; `REPO/AGENTS.md`, «Contrato lingüístico» |
| A5 | **Aprobación:**<br>• cada texto visible lleva su estado por idioma (`pendiente`, `borrador`, `aprobado`, con quién y cuándo)<br>• Damián aprueba los tres idiomas<br>• no se publica un idioma con textos sin aprobar ni fragmentos de otro<br>• el agente nunca marca un texto como aprobado sin su instrucción explícita | Propuesta | `REPO/AGENTS.md`, «Contrato lingüístico»; `REPO/scripts/check-publish.ts` |
| A6 | **Traducción:**<br>• el español es siempre la referencia<br>• un idioma no se aprueba sin la verificación en cuatro capas<br>• el revisor de la capa 3 es de otra familia de modelos que el traductor<br>• la verificación se usa desde el repositorio del Manifiesto, sin copiar las herramientas | Decidida para la agencia: el servicio desde el Manifiesto (2026-09-30). Propuesta: la obligatoriedad | `REPO/specs/001-sitio-manifiesto/research.md` (RQ-19) |
| A7 | **Infraestructura:**<br>• Cloudflare Workers con archivos estáticos, por subida directa<br>• la misma cuenta y la zona `softwarehumano.com`, que ya existen<br>• publicar es un acto deliberado, con la aceptación de Damián | Decidida para la agencia (2026-09-30: «se apalanca en lo que ya está hecho») | `REPO/AGENTS.md`, «Plataforma»; `REPO/specs/001-sitio-manifiesto/evidencia/tecnica.md` |

**Decisiones abiertas que pertenecen al proyecto nuevo:**
- **Nombrar «Software Humano» en la cabecera:** se decide al definir la cabecera de `softwarehumano.com`, para los dos sitios a la vez. Hoy la del Manifiesto muestra el ícono y «Manifiesto».
- **Enviar correo como el dominio:** requiere un servicio de correo propio (ver B4).

---

## Parte B · Experiencia y recursos

### B1 · Marca: lo que ya está hecho y se puede copiar

Es código del sitio del Manifiesto, bajo MIT. La marca que representa sigue A1 y A3.

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

### B2 · Copy: cómo trabajar con Damián

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
| 3 · Sentido | Errores estilo MQM (omisión, adición, cambio de sentido, terminología, fluidez) por un modelo de otra familia | Capa gratuita de Gemini |
| 4 · Contraste | Traducción independiente con DeepL, comparada por el revisor de la capa 3 | Plan Developer de DeepL, un millón de caracteres en total; el Manifiesto usó cerca del 9 % |

**Corre desde el repositorio del Manifiesto.** Bun lee las claves de su `.env.local`, que Damián creó y está fuera del repositorio; LanguageTool está instalado aislado en `~/.local/share/languagetool-software-humano`. El proyecto nuevo no puede adivinarlo:

```bash
cd /Users/damianacuna/proyectos/website-software-humano
bun run scripts/traduccion/readme.ts \
  --es="<ruta>/archivo.es.md" \
  --en="<ruta>/archivo.md" \
  --pt="<ruta>/archivo.pt-BR.md" \
  --salida="<ruta del proyecto nuevo>/informe-cuatro-capas.json"
```

- **Salida:** el informe se escribe solo donde indica `--salida`, así que no se toca el repositorio del Manifiesto.
- **Bloques alineados:** los tres archivos deben tener los mismos bloques, separados por línea en blanco, en el mismo orden. La barra de idioma de la primera línea se omite. Si un idioma lleva un aviso propio, se pone también en los otros; si no, el script se detiene.
- **Copy que no está en Markdown** (YAML, componentes): se exporta cada idioma a un Markdown alineado, un bloque por texto, y se pasa por el mismo script.
- **Cupo:** una página de unas 120 líneas cuesta unas 4 llamadas a Gemini y unos 12.000 caracteres de DeepL.
- **Glosario:** `REPO/scripts/traduccion/glosario.yaml`, con 27 términos fijados del núcleo y 10 variantes prohibidas. Los términos propios de la agencia se proponen a Damián y se agregan allí, para que un concepto no tenga dos nombres en dos sitios del mismo autor.
- **El flujo que dio mejor resultado:**
  1. Damián traduce con ChatGPT (OpenAI).
  2. Claude revisa con las capas 1 a 3.
  3. DeepL sirve de contraste.
  4. Damián aprueba.

  Evidencia: `REPO/specs/001-sitio-manifiesto/evidencia/revision-linguistica/verificacion-cuatro-capas.md`.

Lecciones del registro del piloto (`REPO/docs/pilot/registro-del-piloto.md`):
- **Verificar quién tradujo antes de elegir el revisor** (C6). Se supuso mal y casi se descartó una revisión necesaria.
- **Las salidas de modelo son observaciones por confirmar** (`V12`). Hubo falsos positivos; cada observación se confirma contra el archivo.
- **Las capas gratuitas no siempre responden** (B6). Gemini estuvo saturado durante horas y el modo gratuito de Mistral tiene cupo cero. El script reintenta; puede tardar.
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
