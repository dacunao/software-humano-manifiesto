# Cloudflare · baseline y registro de configuración

**Gobierno:** la sesión del sitio del Manifiesto, como parte del estándar común (`docs/estandar/estandar-comun-de-los-sitios.md`). **Damián Acuña aprueba.**
**Cuenta:** la de `dacunao@gmail.com`, plan Free. **Zona compartida:** `softwarehumano.com`, registrada en GoDaddy, con DNS en Cloudflare.
**Quién hace qué:** Damián, en el panel; el agente, en el repositorio y con Wrangler.

## Cómo se lleva

- **Este documento** tiene dos partes:
  - **§1, el baseline:** cómo debe quedar la zona compartida y cada sitio. Es obligatorio.
  - **§2, el registro de este proyecto.**
- **Cada proyecto lleva su propio registro** de acciones en su repositorio, con las mismas columnas de §2. Hoy el de la agencia es `agencia-software-humano/docs/proposals/Registro_Configuracion_Cloudflare_Agencia.md`.
- **Lo que vale para todos** se propone a esta sesión. Damián lo aprueba y entra al baseline de §1.
- **Columnas del registro:** fecha · dónde (panel o archivo) · qué · cómo o valor · por qué · quién · reversible.
- **Las acciones en la zona compartida afectan a todos los sitios.** Se registran aquí y se avisa a las otras sesiones antes de hacerlas.

---

## 1 · Baseline

### Zona compartida `softwarehumano.com`

| Ajuste | Estado del baseline | Por qué | Comprobado |
|---|---|---|---|
| Plan | Free | Alcanza para sitios estáticos sin límite de visitas | 2026-09-30 |
| Servidores de nombres | Los de Cloudflare (`davina`, `mcgrory.ns.cloudflare.com`); DNSSEC apagado | Un dominio propio en Workers exige el DNS en Cloudflare | 2026-09-30 |
| Raíz `softwarehumano.com` | El Worker `agencia`, como dominio propio, desde el 2026-10-02; se borraron los dos A de estacionamiento de GoDaddy | Publicación del sitio de la agencia (su registro, acciones 10 a 13) | 2026-10-02 |
| `www` | CNAME a la raíz, con proxy; regla «Redirect from WWW to root», 301, conservando la ruta y la consulta | Una sola dirección canónica para la agencia | 2026-10-02: `https://www…/es/acerca?x=1` → 301 → `https://softwarehumano.com/es/acerca?x=1` |
| Always Use HTTPS (SSL/TLS → Edge Certificates) | **Activado** (2026-10-02) | Sin él, `http://` responde sin cifrar (200 en `manifiesto` y en la raíz) y `http://www` da 522, porque la regla de `www` solo cubre `https`. El HSTS de los sitios solo protege a quien ya entró una vez por `https` | 2026-10-02 |
| AI Crawl Control: Search, Agent y Training | «Allow» | Que buscadores y agentes de IA lean y citen los sitios; el contenido del Manifiesto es CC BY 4.0 | 2026-10-01: 173 solicitudes de IA en 7 días, 0 bloqueadas |
| Bot Preference Sync | Apagado | `robots.txt` es el del proyecto, sin texto agregado por Cloudflare | 2026-10-01 |
| Bot fight mode y AI Labyrinth | Apagados | No desafiar ni confundir a rastreadores legítimos | 2026-10-01 |
| Email Address Obfuscation | **Apagado** (decisión de Damián, 2026-10-01) | Solo reescribe HTML que pasa por el proxy desde un origen. Las respuestas de Workers con archivos estáticos salen intactas: el `mailto:` del Manifiesto se publica sin cambios. Apagarlo evita sorpresas si algún sitio se sirve de otra forma | 2026-10-01 |
| Browser integrity check y Replace insecure JavaScript libraries | Activos, sin efecto observado | Anotar si cambia algo | 2026-10-01 |
| Email Routing | Activo; una dirección por sitio y propósito; catch-all desactivado | Recibir sin comprar un servicio de correo. Solo recibe: enviar como el dominio requiere un servicio propio (DMARC `p=quarantine`) | 2026-09-30 |
| Google Search Console | Propiedad de dominio `softwarehumano.com`, verificada por el proveedor de DNS | Cubre todos los subdominios | 2026-09-30 |

### Cada sitio

| Ajuste | Baseline | Referencia en el Manifiesto |
|---|---|---|
| Plataforma | Workers con archivos estáticos, por subida directa con `bunx wrangler@4.144.0` | `wrangler.jsonc` |
| Sin ruta pública hasta la aceptación | `workers_dev: false`, `preview_urls: true`. El dominio se agrega en `routes` con `custom_domain: true` solo después de la aceptación de Damián | `wrangler.jsonc` |
| Orden de publicación | Primero `versions deploy` de la versión revisada y después el dominio, para no publicar una versión anterior | `specs/001-sitio-manifiesto/evidencia/tecnica.md` |
| Vistas previas | `versions upload --preview-alias vista-previa`; Cloudflare agrega `X-Robots-Tag: noindex` | `evidencia/tecnica.md` |
| Vuelta atrás | `rollback <versión>`, probada antes de publicar | `evidencia/tecnica.md` |
| Web Analytics | Un sitio por dominio, **instalación manual** con el JS snippet. Antes de crearlo, revisar si Cloudflare ya lo creó en modo automático (no admite duplicar el nombre) y cambiarlo a manual. Comprobar que la página publicada lleva **un solo** beacon | `src/content/sitio.yaml` |
| Correo del sitio | Su propia dirección en Email Routing, con destino verificado | — |
| Buscadores | Google: la propiedad de dominio `softwarehumano.com` ya cubre todos los sitios. **Bing: cada sitio es una dirección aparte.** Se agrega su URL, se verifica (por CNAME en el DNS de Cloudflare si no se puede importar desde Search Console) y se envía su sitemap. La importación desde la propiedad de dominio solo trae la raíz | `specs/001-sitio-manifiesto/evidencia/checklist-publicacion.md` |

### Lecciones

1. **Wrangler 4.144 ya no crea proyectos de Pages clásico:** delega en Workers. Se verificó en la documentación oficial antes de decidir, en lugar de seguir la sugerencia de la herramienta.
2. **Un certificado nuevo tarda unos minutos.** El primer acceso a una vista previa o a un dominio recién conectado puede fallar en el intercambio TLS; se reintenta.
3. **Cloudflare puede crear un sitio de Web Analytics en modo automático por su cuenta.** Hay que revisarlo antes de crear el manual.
4. **Email Address Obfuscation no afecta a Workers con archivos estáticos,** pero conviene comprobarlo en cada sitio que publique un correo.
5. **El primer `deploy` publica las `routes` de `wrangler.jsonc`.** Wrangler no sube versiones a un Worker que no existe, y el `deploy` que lo crea publica las rutas declaradas. El Worker se crea con una configuración **sin rutas** y el dominio se agrega después de la aceptación (lección aportada por la sesión de la agencia, 2026-10-01).
6. **Bing no hereda la propiedad de dominio de Google.** Importar desde Search Console trajo solo `softwarehumano.com`, y el Manifiesto quedó fuera de Bing sin que nadie lo notara durante dos días. Cada sitio se agrega en Bing por su dirección (hallazgo de la sesión de la agencia, 2026-10-02).

---

## 2 · Registro del sitio del Manifiesto

| # | Fecha | Dónde | Qué | Cómo o valor | Por qué | Quién | Reversible |
|---|---|---|---|---|---|---|---|
| 1 | 2026-09-30 | Terminal | Conectar este equipo a la cuenta | `bunx wrangler@4.144.0 login`, «Allow» | Subir el sitio con Wrangler | Damián | Sí: `wrangler logout` |
| 2 | 2026-09-30 | Wrangler | Crear el Worker `manifiesto`, sin ruta pública | `wrangler deploy` con `workers_dev: false` | Cloudflare exige un primer `deploy` para aceptar versiones | Agente | Sí |
| 3 | 2026-09-30 | Domains → Onboard a domain | Agregar la zona `softwarehumano.com` | «Connect a domain»; rastreadores de IA en «Allow»; Bot Preference Sync apagado; plan Free; registros importados (2 A, 2 CNAME, 1 TXT), todos «DNS only» | Dominio propio en Workers | Damián (guiado) | Sí: «Remove from Cloudflare» |
| 4 | 2026-09-30 | GoDaddy → DNS → Servidores de nombres | Cambiar a los de Cloudflare | `davina.ns.cloudflare.com`, `mcgrory.ns.cloudflare.com` | Activar la zona | Damián | Sí: volver a los de GoDaddy |
| 5 | 2026-09-30 | Wrangler | Publicar la versión revisada y conectar el dominio | `versions deploy <eaf38dab>@100%`; luego `routes` `manifiesto.softwarehumano.com` con `custom_domain: true` y `triggers deploy` | Aceptación de Damián (T111) | Agente | Sí: `rollback` y quitar la ruta |
| 6 | 2026-09-30 | Analytics → Web Analytics | Sitio `manifiesto.softwarehumano.com`, instalación manual | JS snippet; token en `src/content/sitio.yaml` | Medición sin cookies, sin contar doble | Damián y agente | Sí |
| 7 | 2026-09-30 | Google Search Console | Propiedad de dominio `softwarehumano.com` | Verificación por el proveedor de DNS (registro TXT en Cloudflare) | Indexación y datos de búsqueda | Damián | Sí |
| 8 | 2026-09-30 | Email → Email Routing | Activar; destino `manifiestosoftwarehumano@gmail.com` verificado; regla `manifiesto@softwarehumano.com`; catch-all desactivado | Cloudflare agregó tres MX y el SPF | Contacto del sitio | Damián (guiado) | Sí |
| 9 | 2026-10-01 | Security → Settings → Client side abuse | Apagar Email Address Obfuscation en la zona compartida | Interruptor en «off» | Comportamiento predecible: no reescribe correos ni agrega un script que no controlamos; afecta a los dos sitios | Damián | Sí: volver a activarlo |
| 10 | 2026-10-02 | DNS → Records | Verificación de Bing para el Manifiesto | CNAME `0f2340d9d3abd3578d7681b3b37954b9.manifiesto` → `verify.bing.com`, «DNS only» | Bing trata cada sitio por su dirección (puesta en marcha, B3) | Damián (guiado) | Sí: borrar el registro (Bing pide conservarlo para mantener la verificación) |

**Comprobaciones:**
- **2026-09-30:** producción sin `X-Robots-Tag`; `robots.txt` sin texto de Cloudflare; un solo beacon.
- **2026-10-01:** Email Address Obfuscation sin efecto en el `mailto:` publicado.
