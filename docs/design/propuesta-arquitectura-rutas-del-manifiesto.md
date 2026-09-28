# Propuesta · Arquitectura del sitio según las rutas del manifiesto

**Estado:** propuesta, **sin aprobar**. No se implementó nada.
**Fecha:** 2026-09-27
**Pregunta de origen (Damián Acuña):** si solo tuviéramos que ser fieles al manifiesto, ¿qué deberíamos hacer con la página Manifiesto, que hoy repite en una sola «muralla» lo que otras superficies también muestran?
**Criterio único de esta propuesta:** el núcleo v2.1. Al final se indica qué partes del PRD cambiarían, porque ese cambio solo lo puede autorizar la autoridad de producto.

---

## 1. Qué dice el manifiesto

- **`P01`**: «No diseñes lo que el usuario puede hacer. Diseña el progreso que necesita conseguir.» Quien llega al sitio quiere entender, decidir, aplicar o verificar; no recorrer 10.500 palabras.
- **`P03`**: las estructuras internas «no deberían dictar el lenguaje ni la navegación del usuario». El núcleo está ordenado como documento para equipos y agentes (índice operativo, formato de entrega del agente); publicarlo tal cual como superficie principal expone esa estructura.
- **`P04`**: «No elimines el poder. Elimina la obligación de enfrentarse a él antes de necesitarlo.»
- **`P06`**: cada elemento visible debe justificar la atención que consume.
- **Flujo, artefactos**: «Si la información ya existe, debe referenciarse y no duplicarse.»
- **`P07` y `P10`**: la fuente debe poder verificarse completa, y la persona debe poder «recuperar o llevarse su contenido en un formato útil».

Y el propio núcleo propone la estructura. Su sección «Cómo usar este documento» define **cuatro rutas de lectura**:

| Ruta | Contenido, según el núcleo | Uso recomendado, según el núcleo |
|---|---|---|
| Comprender | Tesis y texto canónico del manifiesto | Alinear al equipo antes de definir una solución |
| Decidir | Diez principios, fundamento de producto y Job Stories con reglas y preguntas de control | Resolver alternativas de producto y UX |
| Construir | Doctrina específica para desarrollo con IA | Guiar a agentes de código y revisores humanos |
| Verificar | Pruebas de aceptación, scorecard y antipatrones | Evaluar prototipos, implementaciones y entregas |

## 2. Diagnóstico del sitio actual

Medido sobre el contenido real (2026-09-27):

- **Hay 2.006 palabras que solo existen en la muralla.** Verificación (711), antipatrones (461), ejemplo aplicado (579) e índice operativo (255) no tienen otro lugar en el sitio. La ruta **Verificar** del manifiesto no tiene superficie.
- **Hay pasajes que aparecen en tres lugares:** en la muralla, en su superficie y en la profundidad de un acto de Inicio. Por ejemplo, la guía de bolsillo está en Manifiesto, Aplicación e Inicio, y el propósito en Manifiesto, Inicio y SpecKit.
- La navegación nombra superficies («Manifiesto») y no para qué sirve cada una.

## 3. La propuesta

**Regla:** cada pasaje del núcleo tiene **una sola casa**, donde se lee completo. En el resto del sitio solo se enlaza a esa casa, o se cita una frase breve con su enlace. El texto íntegro sigue existiendo, entero y citable, como **documento de consulta**, no como superficie de navegación.

### Superficies

| Superficie | Ruta del manifiesto | Qué contiene |
|---|---|---|
| Inicio | — (recorre las cuatro) | Los siete actos, con texto editorial y frases breves enlazadas. Deja de repetir pasajes completos en sus bloques de profundidad |
| **Manifiesto** | Comprender | El texto canónico (unas 400 palabras), el problema que el manifiesto busca resolver y la conclusión central. Al pie, el enlace al texto íntegro |
| Principios | Decidir | La colección, las diez páginas de principio, el **fundamento de producto y las Job Stories**, y la arquitectura del marco |
| Aplicación | Construir | Doctrina para IA, flujo, artefactos, regla de detención, contrato del agente, responsabilidades, puntos de control y el ejemplo aplicado |
| **Verificación** · nueva | Verificar | Las doce dimensiones de verificación, el scorecard, las preguntas de revisión, los antipatrones, la definición de terminado y la guía de bolsillo |
| SpecKit | — (implementación) | Igual que hoy, más el límite entre núcleo e implementación |
| Acerca de | — | Igual que hoy, más el alcance y los lectores, la evolución y el control de cambios del manifiesto, e influencias y notas |
| *Texto íntegro* · fuera del menú | Consulta | El núcleo completo en una página, con índice y anclas, más su descarga en el formato original. Se llega desde Manifiesto y desde el pie de cada página |

Son siete superficies, el texto íntegro y diez principios: **18 páginas por idioma, 54 en total** (hoy son 48).

### Casa de cada sección del núcleo

| Sección del núcleo | Palabras | Casa propuesta | Hoy |
|---|---:|---|---|
| Portada (título, subtítulo, versión) | — | Texto íntegro; el subtítulo, en Manifiesto | Muralla |
| `SH-INDEX` Índice operativo para agentes | 255 | Texto íntegro, como encabezado de su índice | Solo muralla |
| Propósito · el problema y la conclusión central | 814 en total | Manifiesto | Muralla, Inicio |
| Propósito · alcance y lectores | | Acerca de | Muralla |
| Propósito · cómo usar este documento | | Manifiesto; es el mapa de las cuatro rutas | Muralla |
| Propósito · arquitectura del marco | | Principios | Muralla |
| Propósito · límite entre núcleo e implementación | | SpecKit | Muralla, SpecKit |
| Texto canónico | 398 | Manifiesto | Muralla, Inicio |
| Principios de diseño (introducción y tabla) | 262 | Principios | Muralla, Principios, Inicio |
| `P01`–`P10` | 2.160 | Página de cada principio, completa | Muralla y página de principio |
| `SH-FUND` Fundamento y forma de referencia | 1.351 | Principios (ruta Decidir) | Muralla, Aplicación |
| Doctrina para IA (`D01`–`D06`) | 580 | Aplicación | Muralla, Inicio |
| Flujo, artefactos y `SH-STOP` (`F01`–`F08`, `A01`–`A08`) | 769 | Aplicación | Muralla, Aplicación |
| Contrato reutilizable (`CR01`–`CR08`, `O01`–`O09`) | 520 | Aplicación | Muralla, Aplicación |
| Verificación (`V01`–`V12`, `SH-SCORE`) | 711 | Verificación | Solo muralla |
| `SH-AP` Antipatrones | 461 | Verificación | Solo muralla |
| Ejemplo aplicado | 579 | Aplicación | Solo muralla |
| `SH-GOV` · responsabilidades y puntos de control | 908 en total | Aplicación | Muralla, Aplicación |
| `SH-GOV` · evolución y control de cambios | | Acerca de | Muralla |
| `SH-DONE` Definición de terminado | | Verificación | Muralla, Aplicación |
| `SH-POCKET` Guía de bolsillo (incluye `STOP01`–`STOP07`) | 280 | Verificación | Muralla, Aplicación, Inicio |
| Influencias y notas | 312 | Acerca de | Muralla, Acerca de |

### Citas y anclas

- Cada identificador (`P03`, `D01`, `CR05`, `STOP03`…) tiene **una dirección principal: la de su casa**. Es la que usa «Copiar enlace».
- El texto íntegro conserva las mismas anclas, para quien quiera citar el documento completo.

## 4. Lo que no cambia

- **El texto canónico no se parafrasea ni se copia**: se sigue leyendo de su archivo único, y la regla `RV-01` sigue protegiéndolo.
- **El núcleo completo sigue publicado y citable**, ahora como documento de consulta.
- Los siete actos de Inicio, las diez páginas de principio, los tres idiomas, las decisiones del 2026-09-27 y todas las reglas de validación.

## 5. Decisiones que requiere

1. **Adoptar la arquitectura por rutas.** Sí o no.
2. **Forma del texto íntegro:**
   - una página de consulta fuera del menú, más su descarga (recomendado: se puede leer de corrido, buscar e imprimir, y es accesible);
   - solo la descarga, más un índice que lleva a cada casa. Máxima unicidad, pero nadie puede leerlo completo en el sitio.
3. **Casa del fundamento de producto:** Principios, como dice la tabla del núcleo (recomendado si el criterio es solo el manifiesto), o Aplicación, como está hoy y como agrupa `FR-007`.
4. **Nombres en el menú:** sustantivos conocidos, con la ruta como subtítulo («Verificación — para evaluar una entrega»), recomendado por `P05`; o los verbos del manifiesto («Comprender · Decidir · Construir · Verificar»).

## 6. Cambios al PRD que implicaría (autoridad: Damián Acuña)

- **§18.1 Superficies obligatorias:** «Manifiesto» pasa a ser la ruta Comprender; se agrega **Verificación**; el texto íntegro pasa a documento de consulta.
- **`FR-003`:** el núcleo completo se sigue publicando «con índice, identificadores y enlaces estables», en su página de consulta, y cada pasaje tiene además su casa.
- **`FR-007`:** Aplicación deja de explicar el fundamento y la definición de terminado, que se van a Principios y Verificación, y suma el ejemplo aplicado y la gobernanza operativa.
- **§25.2:** el `CreativeWork` del manifiesto se declara en la página de texto íntegro.
- **§33:** la matriz de trazabilidad suma Verificación. Candidatas: `JS-06`, porque permite identificar una detención, y `JS-03`, por las pruebas de decisión.

## 7. Cómo se aplicaría, sin salirse del método

Primero el PRD v1.1, decidido por la autoridad. Después, actualizar la especificación, el plan y las tareas, con `analyze` antes de implementar. No se toca el código antes de eso: el traspaso registra que en el piloto anterior el trabajo por fuera del flujo desactivó las comprobaciones.

**Costo estimado de implementación**, una vez aprobado:
- reorganizar tres archivos de contenido y crear uno;
- dos vistas nuevas (Verificación y texto íntegro);
- seis rutas nuevas (las dos páginas, en tres idiomas);
- ajustar las pruebas de `JS-03`, `JS-05` y `JS-06`, y el contrato de rutas.

No requiere traducir nada nuevo: los pasajes ya están traducidos nodo a nodo.
