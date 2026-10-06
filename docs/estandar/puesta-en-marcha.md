# Puesta en marcha de un sitio de Software Humano

**Parte del estándar común** (`estandar-comun-de-los-sitios.md`). Es obligatoria para todo sitio nuevo y para cada dominio nuevo de un sitio existente. **Gobierno:** la sesión del sitio del Manifiesto. **Damián Acuña aprueba.**

Es la lista de acciones, en orden, para que todos los sitios se pongan en marcha de la misma forma. El detalle de Cloudflare (por qué y cómo) está en `cloudflare.md`; aquí solo va qué hacer y cómo comprobarlo. Cada acción se anota en el registro del proyecto, con las columnas de `cloudflare.md`.

**Quién:** 👤 Damián, en un panel · 🤖 el agente, en el repositorio o con Wrangler.

**Origen:** lo aprendido al poner en marcha el Manifiesto (2026-09-30) y la agencia (2026-10-01 y 2026-10-02).

---

## 1 · Zona compartida `softwarehumano.com`

Ya está hecho. Se comprueba una vez por puesta en marcha, porque un cambio en la zona afecta a todos los sitios.

| # | Acción | Quién | Cómo se comprueba |
|---|---|---|---|
| Z1 | DNS en Cloudflare, plan Free, DNSSEC apagado | 👤 | `dig NS softwarehumano.com` devuelve los servidores de Cloudflare |
| Z2 | **Always Use HTTPS activado** (SSL/TLS → Edge Certificates) | 👤 | `http://<sitio>/` responde 301 a `https://` |
| Z3 | Rastreadores de IA en «Allow» (Search, Agent, Training); Bot Preference Sync, Bot fight mode y AI Labyrinth apagados | 👤 | AI Crawl Control: 0 solicitudes bloqueadas; `robots.txt` es el del proyecto |
| Z4 | Email Address Obfuscation apagado | 👤 | El `mailto:` publicado sale intacto |
| Z5 | Google Search Console: propiedad de dominio `softwarehumano.com` verificada | 👤 | Ya cubre todo sitio nuevo bajo el dominio |
| Z6 | Avisar a las otras sesiones **antes** de cualquier cambio en la zona | 🤖 | Mensaje enviado y registrado |

## 2 · Antes de publicar

| # | Acción | Quién | Cómo se comprueba |
|---|---|---|---|
| P1 | Implementar el set común B1–B16 tal como está en la referencia, y declarar el anexo propio si lo hay | 🤖 | Pruebas automáticas del proyecto |
| P2 | Construcción, pruebas, Lighthouse y comprobación previa en verde | 🤖 | `check:publish` completa |
| P3 | Crear el Worker **sin rutas** (`workers_dev: false`, `preview_urls: true`, sin `routes`). El primer `deploy` publica las rutas que haya | 🤖 | «No targets deployed» |
| P4 | Subir la vista previa con `versions upload --preview-alias vista-previa` | 🤖 | `X-Robots-Tag: noindex`; rutas, 404 por idioma, cabeceras y un solo script de medición |
| P5 | Probar la vuelta atrás con `rollback` | 🤖 | `deployments list` muestra la versión anterior activa |
| P6 | Validar los datos estructurados (validador de Schema.org) | 🤖 | 0 errores y 0 advertencias |
| P7 | **Web Analytics:** revisar si Cloudflare ya creó el sitio en automático; dejarlo en instalación manual y llevar el identificador al proyecto | 👤 🤖 | Un solo beacon en la página |
| P8 | **Correo:** dirección propia del sitio en Email Routing, destino verificado y catch-all desactivado | 👤 | Un correo de prueba enviado **desde otra cuenta** llega a destino |
| P9 | Aceptación de Damián sobre la vista previa | 👤 | Registrada con fecha |

## 3 · Publicar

| # | Acción | Quién | Cómo se comprueba |
|---|---|---|---|
| L1 | Desplegar al 100 % la versión **revisada** (`versions deploy`) **antes** de conectar el dominio | 🤖 | La versión activa es la aceptada |
| L2 | Si el nombre ya tiene registros (por ejemplo, de estacionamiento), borrar **solo** esos; nunca los de correo (MX, SPF, DMARC) ni el TXT de Google | 👤 | `dig MX` y `dig TXT` sin cambios |
| L3 | Conectar el dominio con `routes` y `custom_domain: true` (`triggers deploy`) | 🤖 | El dominio responde 200; el certificado puede tardar unos minutos |
| L4 | Si el sitio usa `www`: regla de redirección `www` → raíz, 301, conservando la ruta y la consulta, con `www` con proxy | 👤 | `https://www…/ruta?x=1` → 301 → `https://…/ruta?x=1` |
| L5 | En producción: sin `X-Robots-Tag`, HSTS y CSP presentes, `robots.txt` propio, sitemap y `llms.txt` en 200 | 🤖 | `curl -I` y la prueba de rutas |
| L6 | Preferencias compartidas: el tema y el idioma pasan entre los sitios | 🤖 | Navegador real: elegir en un sitio, abrir el otro |
| L7 | Activar en los otros sitios los enlaces a este, si esperaban a que estuviera en línea (por ejemplo, `publisher.enLinea`, el sitio hermano en `llms.txt`) | 🤖 | Enlaces visibles en los otros sitios |

## 4 · Buscadores, después de publicar

| # | Acción | Quién | Cómo se comprueba |
|---|---|---|---|
| B1 | **Google:** enviar el sitemap del sitio en Search Console (la propiedad de dominio ya existe) | 👤 | Estado «Correcto» (puede tardar unas horas) |
| B2 | **Google:** pedir la indexación de las portadas de cada idioma y de la página principal de recorrido | 👤 | «Se ha solicitado la indexación» |
| B3 | **Bing: agregar el sitio por su dirección.** Bing no hereda la propiedad de dominio de Google: importar desde Search Console trae solo la raíz. Verificarlo con **CNAME en el DNS de Cloudflare** («DNS only»), no con archivo XML ni etiqueta meta, que obligan a cambiar el sitio. **En un subdominio, el nombre lleva el subdominio:** `<código>.manifiesto`, no solo `<código>` | 👤 | El sitio aparece en la lista de Bing Webmaster Tools |
| B4 | **Bing:** enviar el sitemap del sitio | 👤 | «Mapas del sitio» lo muestra |
| B5 | Al cabo de uno o dos días: `site:<dirección>` en Google y en Bing | 🤖 | Aparecen páginas del sitio |
| B6 | Validar los datos estructurados también en el dominio final (prueba de resultados enriquecidos de Google) | 🤖 | «Rastreado correctamente» |

## 5 · Estado por sitio

| Sitio | Pendiente al 2026-10-02 |
|---|---|
| `manifiesto.softwarehumano.com` | B5 al 2026-10-06: Google tiene unas 45 de 66 páginas, en los tres idiomas; **Bing, ninguna** (solo los repositorios que lo mencionan). En Bing Webmaster Tools, el sitemap está «Correcto» con 66 URL descubiertas, pero la portada figura como «Detectada, pero no rastreada» desde el 30 de septiembre. La prueba «URL en directo» la da por indexable, sin problemas de SEO/GEO y con JSON-LD y Open Graph leídos, así que no hay bloqueo. El 2026-10-06 Damián solicitó la indexación de `/`, `/es`, `/pt-br` y `/manifesto/map`. Revisar `site:` hacia el 2026-10-09; si el 2026-10-13 sigue sin páginas, proponer IndexNow |
| `softwarehumano.com` | P8 cumplido el 2026-10-06: el correo de prueba enviado desde otra cuenta llegó (confirmado por Damián). Z3 cumplido el 2026-10-06 para la zona (ver nota). B5 al 2026-10-06 (revisado por su sesión con Damián): sin bloqueo técnico. **Google:** sitemap «Correcto» con 9 URL, portada «Descubierta: actualmente sin indexar», y la prueba en tiempo real la da por indexable. **Bing:** sitemap «Correcto» con 9 URL; el explorador solo conoce la página de estacionamiento anterior, «Excluida»; 0 indexadas. El mismo día, Damián solicitó en Bing la indexación de `/`, `/es` y `/pt-br`; antes, «URL en directo» dio las tres por indexables, sin problemas de SEO/GEO. Revisar hacia el 2026-10-09 y el 2026-10-13. P1 cumplido el 2026-10-02 |

**Nota del 2026-10-06 · Z3:** en AI Crawl Control, 855 solicitudes de rastreadores de IA en 7 días, las 855 permitidas y 0 fallidas (Meta 321, Google 175, Anthropic 107, OpenAI 100, Microsoft 76, entre otros). Bot Preference Sync apagado. Los dos `robots.txt` son los del proyecto. Cubre los dos sitios, porque el ajuste es de la zona.

**Nota del 2026-10-06 · Bing:** lista bajo `softwarehumano.com` cinco subdominios ajenos (`ln.`, `svd4ff.`, `suaejs.`, `sez42t.`, `v6ubt4.`). No tienen registros en el DNS ni hay comodín (comprobado por las dos sesiones): son restos anteriores a la zona actual, sin efecto.

Z2 (Always Use HTTPS) quedó activo el 2026-10-02: `http://` responde 301 a `https://` en el Manifiesto, en la raíz y en `www` (comprobado por las dos sesiones).
