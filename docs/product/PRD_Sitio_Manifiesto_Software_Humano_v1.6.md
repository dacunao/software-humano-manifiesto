# PRD — Sitio del Manifiesto de Software Humano

**Versión:** 1.6  
**Fecha:** 2026-09-28  
**Estado:** Vigente. Decisiones aprobadas por la autoridad de producto el 2026-09-28; redacción sujeta a su revisión  
**Nombre del sitio:** Manifiesto, igual en los tres idiomas  
**Dominio:** `manifiesto.softwarehumano.com`  
**Editor:** Software Humano (`softwarehumano.com`)  
**Producto:** Sitio web público, narrativo y documental  
**Idiomas de lanzamiento:** Inglés general (`en`), español neutro latinoamericano (`es`) y portugués de Brasil (`pt-BR`)  
**Idioma predeterminado:** Inglés general (`en`)  
**Autoridad de producto:** Damián Acuña  

## Cambios de la versión 1.6

Decisión de la autoridad de producto (2026-09-28): la preferencia de idioma se modifica eligiendo otro idioma, sin una acción separada para restablecerla. La acción «Olvidar mi elección de idioma» no aportaba al visitante y variaba la altura de la cabecera según el idioma.

| Sección | Cambio |
|---|---|
| `FR-020` | La elección se conserva localmente y se modifica eligiendo otro idioma; ya no se ofrece una acción para restablecerla. Sigue siendo prescindible: borrar los datos del navegador la elimina. |
| §26 y `AC-14` | «Conservan o modifican su preferencia», en lugar de «conservan o restablecen». |

El resto del documento no cambia. Los identificadores existentes se conservan sin renumerar. La versión 1.5 se conserva como registro histórico.

## Cambios de la versión 1.5

La versión 1.5 adopta el sistema visual compartido de Software Humano, definido por la autoridad de producto en `docs/design/Software_Humano_Especificacion_Visual_v1.0.md`, que pasa a ser la fuente autorizada del aspecto visual de este sitio.

| Sección | Cambio |
|---|---|
| §21.2 | Sistema visual: Noto Sans como única familia tipográfica, autoalojada; paleta oficial en modo claro y oscuro; reglas de componentes. La palabra «Manifiesto» del logotipo es texto en Noto Sans; solo el ícono es SVG. Reemplaza la afirmación de la v1.4 de que el resto del sitio conserva las fuentes del sistema. |
| §21.2 | Dos interpretaciones decididas por la autoridad: las secciones expandibles conservan el control nativo del navegador (`FR-015`); el panel oscuro de texto canónico se aplica a las declaraciones y citas, y los pasajes largos llevan borde. |
| §21.7 | El tema oscuro usa la escala oscura de la especificación. En teléfonos, el índice se abre con un botón «Contenido». |

El resto del documento no cambia. Los identificadores existentes se conservan sin renumerar. La versión 1.4 se conserva como registro histórico.

## Cambios de la versión 1.4

La versión 1.4 incorpora mejoras de identidad y de cabecera decididas por la autoridad de producto el 2026-09-28, tomando como referencia el sitio de KiwiDesk.

| Sección | Cambio |
|---|---|
| §21.2 | El sitio usa el logotipo de Software Humano junto a la palabra «Manifiesto», como imagen SVG: ícono y nombre en pantallas anchas, solo el ícono en teléfonos. |
| §18.2 | El menú suma «GitHub», hacia el repositorio de la adaptación para SpecKit, que se muestra solo cuando ese repositorio sea público. |
| §21.7 | El selector de idioma se muestra compacto: EN · ES · PT, con el nombre completo de cada idioma disponible para tecnologías de asistencia y al pasar el cursor. Se agrega el tema claro u oscuro. |
| `FR-020` | Las preferencias reales del producto suman el tema claro u oscuro. |

El resto del documento no cambia. Los identificadores existentes se conservan sin renumerar. La versión 1.3 se conserva como registro histórico.

## Cambios de la versión 1.3

La versión 1.3 sitúa el sitio dentro de la marca Software Humano. `softwarehumano.com` es el sitio de la agencia, que presenta la marca, su oferta y sus productos; este sitio publica y preserva la doctrina en `manifiesto.softwarehumano.com`. Las decisiones de la autoridad de producto se tomaron el 2026-09-28 a partir de `Software_Humano_Definicion_de_Marca_y_Oferta` v1.2 y del copy web v0.4, que son insumos y no gobiernan este sitio.

| Sección | Cambio |
|---|---|
| Encabezado, §29 | Nombre del sitio: «Manifiesto», igual en los tres idiomas. Dominio: `manifiesto.softwarehumano.com`. |
| §18.4 | Nueva: relación con Software Humano. Autor, editor, enlace hacia la agencia y reparto de contenido entre los dos sitios. |
| §18.1 | Acerca de suma la relación entre el autor, la agencia y el Manifiesto, y una tabla de licencias por tipo de material. |
| §18.2 | La navegación global incluye, en el pie, el enlace hacia la agencia. |
| §25.2 | `WebSite` y `CreativeWork` declaran como editor a la organización Software Humano; el autor sigue siendo la persona. |
| §29 | Resoluciones de nombre, dominio, autoría y licencias. |

El resto del documento no cambia. Los identificadores existentes se conservan sin renumerar. La versión 1.2 se conserva como registro histórico.

## Cambios de la versión 1.2

La versión 1.2 divide el núcleo en el sitio según su propia estructura: divisiones temáticas de secciones consecutivas, completas y en su orden, sin duplicar pasajes. El núcleo completo deja de desplegarse como página y se ofrece como descarga en el idioma seleccionado. Se agrega una búsqueda. Las decisiones de la autoridad de producto y su análisis están en `docs/design/propuesta-nucleo-por-divisiones-2026-09-28.md` y `docs/design/analisis-patrones-kiwidesk-2026-09-28.md`.

| Sección | Cambio |
|---|---|
| §18.1 | El manifiesto se lee en nueve divisiones temáticas en el orden del núcleo. Desaparecen como superficies Aplicación, Verificación y el texto íntegro. Influencias y notas se presenta destilada en Acerca de, y su Declaración final cierra la Guía de bolsillo. |
| §18.2 | Menú principal: Inicio, Manifiesto, SpecKit y Acerca de. Índice del manifiesto en el orden del núcleo, anterior y siguiente, búsqueda y descarga. |
| §18.3 | Sin excepción: ningún pasaje se lee completo fuera de su división. |
| `FR-003` | El núcleo completo se ofrece como descarga en Markdown en el idioma seleccionado; en el sitio se lee repartido en sus divisiones. |
| `FR-007` | La división Construir con IA reúne doctrina, flujo y contrato; el fundamento, el ejemplo aplicado y la gobernanza tienen división propia. |
| `FR-022` | La división Verificar reúne verificación y antipatrones. |
| `FR-023` | Nuevo: búsqueda. |
| §25.2 | El `CreativeWork` del manifiesto corresponde a la división «El manifiesto». |
| §33 | `JS-05` suma `FR-023`. |

El resto del documento no cambia. Los identificadores existentes se conservan sin renumerar. La versión 1.1 se conserva como registro histórico.

## Cambios de la versión 1.1

La versión 1.1 reorganiza la arquitectura de información según las cuatro rutas de lectura que el propio núcleo define en «Cómo usar este documento»: comprender, decidir, construir y verificar. Cada pasaje del núcleo tiene una sola superficie de referencia; el texto íntegro se conserva completo como documento de consulta. La propuesta de origen está en `docs/design/propuesta-arquitectura-rutas-del-manifiesto.md`.

| Sección | Cambio |
|---|---|
| §18.1 | «Manifiesto» pasa a ser la ruta Comprender; se agrega la superficie Verificación; el texto íntegro pasa a documento de consulta fuera de la navegación principal. |
| §18.3 | Nueva: regla de una sola superficie de referencia por pasaje. |
| `FR-003` | El núcleo completo se publica en una página de consulta, con índice, identificadores, enlaces estables y descarga. |
| `FR-007` | La aplicación operativa se concentra en la ruta Construir; el fundamento de producto pasa a Principios y la definición de terminado a Verificación. |
| `FR-022` | Nuevo: superficie Verificación. |
| §25.2 | El `CreativeWork` del manifiesto corresponde a la página de texto íntegro. |
| §33 | La matriz suma `FR-022`. |

El resto del documento no cambia. Los identificadores existentes se conservan sin renumerar.

## 1. Resumen ejecutivo

El sitio del Manifiesto de Software Humano será una experiencia web pública destinada a explicar por qué el aumento de la capacidad para construir software —especialmente mediante inteligencia artificial— no garantiza productos más comprensibles, útiles o humanos, y puede amplificar decisiones débiles, complejidad innecesaria y pérdida de control.

El producto conducirá progresivamente al visitante desde ese problema hasta la propuesta del manifiesto: una doctrina de diez principios para construir software que amplíe la capacidad de las personas sin trasladarles la complejidad de la tecnología. Después mostrará cómo esa doctrina se vuelve operativa durante el desarrollo mediante una constitución y un preset para SpecKit, presentado con precisión como una implementación de referencia independiente que aún no se encuentra publicada.

El sitio no será una transcripción decorada ni una demostración de efectos visuales. Será la primera aplicación pública del propio manifiesto y el primer proyecto real desarrollado mediante la adaptación Software Humano para SpecKit. Su experiencia deberá demostrar, en su funcionamiento, aquello que el texto sostiene: claridad, profundidad progresiva, respeto por la atención, confianza, continuidad, rendimiento, accesibilidad y control.

La versión 1.0 ofrecerá paridad en inglés general, español neutro latinoamericano y portugués de Brasil. El inglés será el idioma predeterminado para ampliar el alcance internacional potencial; español y portugués estarán disponibles mediante selección nativa del sitio. El contenido se administrará como software mediante YAML versionado, utilizará semántica Schema.org y se construirá con TypeScript, Astro y daisyUI bajo una arquitectura estática, accesible y con JavaScript de cliente selectivo como resultado de compilación. Estas decisiones están subordinadas a los resultados del producto: no sustituyen la validación de comprensión, rendimiento, descubrimiento ni calidad humana.

## 2. Fuentes, autoridad y precedencia

### 2.1 Fuentes rectoras

| Fuente | Versión | Autoridad dentro del producto |
|---|---:|---|
| `Manifiesto_Software_Humano_IA_Nucleo_v2.1.md` | 2.1 | Doctrina, principios, flujo, artefactos, contrato, verificación y gobernanza. |
| `Anexo_Aplicacion_SpecKit_v1.2.md` | 1.2 | Correspondencia entre el núcleo y los mecanismos nativos de SpecKit. |
| `Software_Humano_SpecKit_Preset_v1.0.0.zip` | 1.0.0 | Materialización técnica instalable de la adaptación. |
| Este PRD | 1.0 | Definición autorizada del sitio: resultados, alcance, reglas y evidencia. |

### 2.2 Regla de precedencia

1. El núcleo gobierna cómo debe concebirse y evaluarse el producto.
2. Este PRD gobierna qué debe construirse para el sitio.
3. El anexo gobierna cómo se traduce el núcleo a SpecKit.
4. El preset gobierna la materialización técnica dentro de SpecKit.
5. El plan técnico podrá decidir cómo implementar, pero no podrá reducir ni ampliar silenciosamente el alcance de este PRD.

### 2.3 Autoridad de cambio

- Las modificaciones del alcance, los resultados, las exclusiones y el estado de publicación requieren aprobación de la autoridad de producto.
- El agente puede proponer alternativas y señalar contradicciones; no puede aprobarlas.
- Una decisión técnica reversible puede ser adoptada durante planificación cuando no altere alcance, contenido, experiencia, seguridad, derechos ni posicionamiento.

### 2.4 Referencias técnicas y estándares

Estas referencias orientan la implementación y la verificación; no agregan doctrina al manifiesto ni sustituyen este PRD:

- [Schema.org](https://schema.org/) para vocabulario semántico compartido.
- [Google Search Central — datos estructurados](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data) para comportamiento verificable en Google Search.
- [Google Search Central — versiones localizadas](https://developers.google.com/search/docs/specialty/international/localized-versions) para relación entre idiomas.
- [Astro — arquitectura de islas](https://docs.astro.build/en/concepts/islands/) e [internacionalización](https://docs.astro.build/en/guides/internationalization/) para la arquitectura web de referencia.
- [daisyUI](https://daisyui.com/docs/intro/) como biblioteca de componentes sobre Tailwind CSS.
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/) y [Web Vitals](https://web.dev/articles/vitals) para accesibilidad y rendimiento.

## 3. Visión

Convertir el Manifiesto de Software Humano en la referencia más clara, tangible y aplicable para comprender y construir productos digitales que amplíen las capacidades de las personas en la era de la inteligencia artificial.

El sitio debe conseguir que el visitante no solo recuerde una lista de principios, sino que reconozca el problema, comprenda la doctrina, pueda utilizarla para evaluar decisiones y vea cómo se incorpora de manera persistente al trabajo de agentes de desarrollo.

## 4. Misión

Guiar a quienes conciben, diseñan y construyen software mediante una experiencia narrativa que:

- haga visible el costo humano del software centrado en el sistema;
- explique los diez principios sin trivializarlos;
- permita relacionarlos con situaciones y decisiones concretas;
- preserve acceso directo al texto canónico completo;
- permita comprender y recorrer el contenido con igual dignidad en inglés general, español neutro latinoamericano y portugués de Brasil;
- muestre cómo la doctrina se convierte en una práctica de desarrollo;
- explique con honestidad el estado y alcance de la adaptación a SpecKit.

## 5. Propósito

Ayudar a que más decisiones de producto y desarrollo se midan por el progreso, la comprensión, la confianza y el control que producen en las personas, y no por la cantidad de funcionalidades, automatizaciones o código que resulta posible generar.

## 6. Problema y dolor que se busca resolver

### 6.1 Problema principal

La capacidad para producir software está creciendo más rápido que la capacidad para decidir qué merece construirse, por qué debe existir y cómo debería sentirse al utilizarlo.

La IA reduce el costo de generar código, pantallas, textos, configuraciones y automatizaciones. Esa reducción permite acelerar buenas decisiones, pero también convertir con rapidez:

- una idea débil en una implementación extensa;
- una ambigüedad de producto en comportamiento aparentemente terminado;
- la arquitectura interna en trabajo para el usuario;
- una recomendación probabilística en una decisión presentada como cierta;
- un conjunto de capacidades en una experiencia difícil de comprender;
- una interfaz atractiva en una máscara para la fricción.

### 6.2 Dolor de quienes construyen

Quienes definen y desarrollan productos carecen con frecuencia de un marco compartido que les permita:

- distinguir capacidad técnica de progreso humano;
- evaluar la experiencia como parte de la funcionalidad;
- decidir cuándo la IA debe proponer, cuándo debe obedecer reglas y cuándo debe detenerse;
- proteger alcance y autoridad cuando intervienen agentes;
- reconocer sobreingeniería, complejidad transferida y automatización sin control;
- exigir evidencia más allá de código correcto y pruebas verdes.

### 6.3 Dolor de quienes usan el software

Las personas terminan administrando herramientas que deberían ayudarlas. Deben aprender convenciones internas, interpretar estados ambiguos, tolerar esperas sin explicación, reconstruir avances perdidos, desconfiar de resultados opacos o aceptar automatizaciones que no pueden revisar ni revertir.

### 6.4 Problema de comunicación del manifiesto

Un documento extenso conserva rigor, pero por sí solo no garantiza comprensión, recordación o aplicación. Una presentación superficial puede resultar accesible, pero corre el riesgo de reducir la doctrina a frases inspiracionales. El producto debe resolver esa tensión sin reemplazar el texto canónico por una simplificación.

## 7. Por qué importa

Este problema importa porque la IA amplifica el efecto de las decisiones previas al código. Cuando construir resulta más barato:

- aumenta la cantidad de decisiones que pueden materializarse;
- disminuye la fricción que antes obligaba a discutirlas;
- crece el costo acumulado de agregar capacidades innecesarias;
- una interpretación incorrecta puede propagarse a especificaciones, planes, tareas y código;
- la apariencia de competencia de un agente puede ocultar incertidumbre y falta de autoridad;
- la calidad humana se vuelve una responsabilidad deliberada, no un resultado automático de la calidad técnica.

El sitio debe hacer comprensible esta relación sin recurrir al miedo tecnológico ni presentar la IA como enemiga. El problema no es que la IA construya; es construir sin fundamento, límites ni evidencia.

## 8. Oportunidades que surgen de la IA

### 8.1 Para el desarrollo de software

- Absorber complejidad técnica que antes llegaba a la interfaz.
- Explorar alternativas antes de comprometer una solución.
- Mantener trazabilidad entre fundamento, especificación, plan, tareas y evidencia.
- Adaptar explicaciones y profundidad al contexto.
- Detectar omisiones, contradicciones y estados no considerados.
- Acelerar la implementación sin reducir el espacio de juicio humano.
- Permitir que equipos pequeños construyan productos antes inaccesibles.

### 8.2 Para este sitio

- Construir el producto utilizando agentes gobernados por el manifiesto.
- Demostrar públicamente la relación entre doctrina y ejecución.
- Ofrecer en el futuro una exploración guiada de principios según una situación aportada por el visitante.
- Ayudar a identificar qué principio podría orientar una decisión concreta.
- Facilitar comprensión en distintas profundidades sin duplicar innecesariamente el contenido.
- Crear contenido semánticamente estructurado que pueda ser interpretado correctamente por buscadores y agentes.

### 8.3 Límite para la versión 1.0

La versión 1.0 no requiere una función generativa visible para el visitante. La narrativa, la exploración de principios y la explicación de SpecKit deben funcionar de manera determinista. Una experiencia conversacional o un evaluador asistido por IA solo podrá incorporarse después de demostrar que resuelve una Job Story concreta, declara sus límites y no introduce una nueva barrera de comprensión o confianza.

## 9. Desafíos que impone la IA

| Desafío | Riesgo para el producto | Respuesta requerida |
|---|---|---|
| Generación sin fundamento | Crear secciones o capacidades plausibles pero no autorizadas. | Mantener trazabilidad con este PRD y detener ampliaciones. |
| Fluidez que parece certeza | Presentar interpretaciones como texto canónico. | Diferenciar cita, explicación, ejemplo e inferencia. |
| Homogeneización | Producir lenguaje genérico y una estética intercambiable. | Diseñar una voz, jerarquía y narrativa propias, vinculadas al manifiesto. |
| Sobreproducción | Agregar animaciones, paneles, chat, preferencias o modos “por si acaso”. | Exigir una Job Story y evidencia para cada capacidad. |
| Pérdida de autoridad | Permitir que el agente cambie alcance o doctrina. | Mantener constitución, reglas de detención y revisión humana. |
| Personalización opaca | Cambiar lo visible sin que la persona comprenda por qué. | Mantener una ruta canónica y control sobre cualquier adaptación. |
| Contenido divergente | Explicaciones o resúmenes que contradicen el núcleo. | Versionar, revisar y vincular todo contenido derivado con su fuente. |
| Dependencia de una plataforma | Confundir el manifiesto con SpecKit o con un agente particular. | Presentar SpecKit como implementación de referencia, no como doctrina. |

## 10. El manifiesto como fuente de solución

El Manifiesto de Software Humano responde al problema desplazando la unidad de decisión desde la capacidad del sistema hacia el progreso de la persona. No promete que la tecnología será simple internamente. Exige que esa sofisticación no se convierta, por comodidad del equipo, en trabajo, incertidumbre o pérdida de control para quien utiliza el producto.

Su solución opera en capas relacionadas:

| Capa | Función |
|---|---|
| Texto canónico | Declara la postura y el propósito. |
| Diez principios | Entregan criterios estables capaces de cambiar o detener decisiones. |
| Fundamento de producto | Conserva fuente, autoridad, alcance, resultados, límites y evidencia. |
| Job Stories | Vuelven concreto el progreso cuando circunstancia, motivación y resultado son la forma adecuada. |
| Flujo y artefactos | Llevan el fundamento hasta una solución verificable sin imponer documentación artificial. |
| Contrato del agente | Limita la autoridad de la IA y exige trazabilidad, supuestos y evidencia. |
| Verificación y gobernanza | Impiden confundir funcionamiento técnico con aceptación humana. |

El manifiesto no es un estilo visual, una plantilla rígida de PRD, una metodología de gestión de proyectos ni una variante de SpecKit. Es la doctrina que gobierna decisiones de producto, experiencia y desarrollo. SpecKit es una de las maneras de mantener esa doctrina disponible y operativa para agentes durante un proceso SDD.

### Tesis del producto

El manifiesto se comprenderá mejor si el visitante puede experimentar progresivamente el problema que busca resolver, reconocer sus consecuencias y descubrir cada principio como respuesta a una tensión concreta.

La experiencia debe sostener tres verdades:

1. El software existe para ampliar lo que una persona puede hacer.
2. La experiencia forma parte de la función.
3. La IA debe permanecer subordinada a un fundamento de producto, reglas explícitas y autoridad humana.

## 11. Propuesta de valor

### 11.1 Promesa principal

Comprender cómo diseñar y construir software que utilice toda la capacidad de la tecnología sin obligar a las personas a cargar con su complejidad.

### 11.2 Diferenciación

El producto combina cuatro niveles que normalmente aparecen separados:

- una postura ética y de producto;
- principios de diseño con consecuencias observables;
- un método operativo para agentes de desarrollo;
- una implementación concreta y actualizable mediante SpecKit.

### 11.3 Resultado esperado para el visitante

Al terminar la experiencia, la persona debe poder:

- explicar el problema que origina el manifiesto;
- expresar su tesis con palabras propias;
- reconocer los diez principios y cuándo resultan relevantes;
- utilizar preguntas del manifiesto para evaluar una decisión;
- distinguir doctrina, método e implementación;
- explicar qué aporta SpecKit y qué no representa;
- acceder al texto canónico completo y citarlo correctamente.

## 12. Objetivos del producto

1. Hacer comprensible el manifiesto sin reducir su sustancia.
2. Convertir los diez principios en criterios utilizables, no en lemas.
3. Producir una experiencia narrativa memorable y controlable.
4. Mantener el texto canónico completo como fuente visible y accesible.
5. Mostrar cómo el manifiesto gobierna el desarrollo asistido por IA.
6. Explicar la adaptación a SpecKit sin presentarla como oficial o publicada.
7. Demostrar el manifiesto mediante el propio comportamiento del sitio.
8. Servir como primer piloto real del preset Software Humano para SpecKit.
9. Proporcionar contenido semántico, citable y descubrible por personas, buscadores y agentes.
10. Ofrecer una experiencia equivalente en inglés general, español neutro latinoamericano y portugués de Brasil, con elección y continuidad de idioma bajo control del visitante.

## 13. No objetivos

La versión 1.0 no busca:

- enseñar exhaustivamente a utilizar SpecKit;
- competir con la documentación oficial de SpecKit;
- publicar o distribuir todavía el preset;
- afirmar respaldo, certificación o afiliación de GitHub;
- crear una comunidad, academia, foro o red social;
- ofrecer certificaciones del manifiesto;
- generar un blog o sistema editorial complejo;
- personalizar el manifiesto para cada visitante;
- incluir un chatbot solo para demostrar IA;
- reemplazar la revisión humana por un score automático;
- permitir que el framework o la biblioteca de componentes dicten la experiencia, la identidad o la arquitectura de información;
- construir un CMS si el contenido versionado puede administrarse de manera más simple.

## 14. Público objetivo

### 14.1 Audiencias principales

| Audiencia | Situación característica | Progreso buscado |
|---|---|---|
| Product managers y responsables de producto | Deben decidir qué merece construirse y traducir una visión a desarrollo. | Contar con criterios para proteger propósito, alcance y experiencia. |
| Diseñadores de producto y UX | Deben convertir necesidades complejas en recorridos comprensibles. | Evaluar carga, atención, confianza, profundidad y control. |
| Ingenieros y líderes técnicos | Construyen sistemas complejos y trabajan con agentes de código. | Absorber complejidad sin trasladarla y exigir evidencia completa. |
| Fundadores y responsables de negocio | Pueden producir software con equipos pequeños gracias a IA. | Evitar que velocidad y entusiasmo sustituyan causalidad y criterio. |
| Creadores de agentes y automatizaciones | Diseñan sistemas que proponen, deciden o ejecutan. | Establecer autoridad, determinismo, límites y recuperación. |

### 14.2 Audiencias secundarias

- docentes y estudiantes de producto, diseño e ingeniería;
- investigadores y autores interesados en interacción humano-computador;
- equipos que evalúan métodos SDD;
- personas que desean cuestionar productos difíciles de comprender o controlar.

### 14.3 Criterio de inclusión

El sitio no debe exigir experiencia previa en SpecKit, SDD, Jobs to Be Done o Job Stories. Debe explicar los conceptos cuando aparecen y permitir que un lector experto avance sin atravesar explicaciones básicas innecesarias. El idioma tampoco debe convertirse en una barrera artificial: el alcance de lanzamiento comprende inglés general, español neutro latinoamericano y portugués de Brasil con paridad funcional y doctrinal.

## 15. Job Stories

Las Job Stories siguientes forman parte del alcance completo de la versión 1.0. El orden permite construir una narrativa; no expresa prioridad ni autoriza a omitir historias.

### `JS-01` Comprender el problema

**Cuando** observo que la IA permite construir más software y más rápido, pero sospecho que eso no necesariamente produce mejores productos,  
**quiero** comprender qué riesgo humano y de producto aparece detrás de esa velocidad,  
**para poder** distinguir progreso real de producción técnica.

**Evidencia de cumplimiento:** la persona puede explicar por qué “más capacidad para construir” no equivale a “más capacidad para progresar”.

### `JS-02` Descubrir la tesis

**Cuando** reconozco que muchas interfaces me obligan a administrar la herramienta en vez de resolver mi necesidad,  
**quiero** encontrar una afirmación clara que reoriente el diseño,  
**para poder** evaluar el software desde el progreso de la persona.

**Evidencia de cumplimiento:** la persona puede formular la tesis del manifiesto con sus propias palabras.

### `JS-03` Comprender cada principio

**Cuando** una decisión de producto parece razonable pero no sé qué efecto tendrá sobre la experiencia,  
**quiero** comprender qué observa, exige y permite probar cada principio,  
**para poder** utilizarlo como criterio y no solo como inspiración.

**Evidencia de cumplimiento:** la persona relaciona una situación con el principio aplicable y explica por qué.

### `JS-04` Experimentar la diferencia

**Cuando** un concepto abstracto no basta para cambiar mi manera de diseñar,  
**quiero** comparar respuestas centradas en el sistema y respuestas centradas en la persona,  
**para poder** reconocer la diferencia en decisiones concretas.

**Evidencia de cumplimiento:** la persona identifica qué complejidad, carga o pérdida de control introduce una alternativa.

### `JS-05` Consultar y citar la fuente

**Cuando** necesito estudiar, discutir o utilizar el manifiesto en un proyecto,  
**quiero** acceder al texto canónico, su versión y anclas estables,  
**para poder** verificar el significado y citarlo sin depender de un resumen.

**Evidencia de cumplimiento:** cualquier principio o sección canónica se alcanza directamente y posee una URL o ancla estable.

### `JS-06` Pasar de doctrina a práctica

**Cuando** estoy de acuerdo con los principios pero no sé cómo incorporarlos al desarrollo cotidiano,  
**quiero** comprender el flujo, los artefactos, el contrato del agente y la verificación,  
**para poder** convertir el manifiesto en decisiones y evidencia.

**Evidencia de cumplimiento:** la persona explica al menos un punto donde el manifiesto puede cambiar o detener el desarrollo.

### `JS-07` Comprender la implementación en SpecKit

**Cuando** utilizo o evalúo desarrollo guiado por especificaciones con agentes,  
**quiero** ver cómo la constitución y el preset adaptan SpecKit sin sustituirlo,  
**para poder** entender qué permanece nativo y qué cambia por el manifiesto.

**Evidencia de cumplimiento:** la persona distingue núcleo, anexo, preset y SpecKit, y no interpreta la adaptación como oficial.

### `JS-08` Compartir una idea precisa

**Cuando** quiero conversar con otra persona sobre un principio o una decisión,  
**quiero** compartir una sección autocontenida con contexto suficiente,  
**para poder** iniciar la conversación sin enviar un documento completo ni perder rigor.

**Evidencia de cumplimiento:** el enlace compartido abre el principio o sección correcta, conserva contexto y ofrece acceso al texto completo.

### `JS-09` Comprender en mi idioma y conservar mi elección

**Cuando** accedo al manifiesto desde un contexto lingüístico distinto o prefiero leerlo en otro idioma,  
**quiero** elegir entre inglés general, español neutro latinoamericano y portugués de Brasil y mantener esa preferencia durante mi recorrido,  
**para poder** comprender, navegar y compartir el contenido sin perder contexto ni quedar atrapado en una versión incorrecta.

**Evidencia de cumplimiento:** sin preferencia previa, la persona recibe inglés en una ruta sin prefijo; luego puede cambiar de idioma desde cualquier superficie, llegar a la sección equivalente, conservar su elección de manera local y reconocer qué versión lingüística está leyendo.

## 16. Recorrido narrativo principal

La experiencia inicial seguirá una columna vertebral de siete actos. La navegación permitirá entrar directamente a cualquier sección; la narrativa no se impondrá mediante scroll bloqueado.

### Acto 1 — Ahora podemos construir casi cualquier cosa

Presenta la oportunidad creada por la IA: velocidad, accesibilidad y capacidad para equipos pequeños.

**Pregunta:** si construir dejó de ser el principal límite, ¿qué pasa a limitar la calidad?

### Acto 2 — Poder construir no significa deber construir

Muestra cómo decisiones débiles se transforman rápidamente en software funcional y cómo la complejidad llega a la persona.

**Interacción:** una comparación breve entre una respuesta centrada en el sistema y una respuesta centrada en la persona.

### Acto 3 — El progreso humano es el producto

Introduce la tesis y el texto canónico breve del manifiesto.

**Momento de comprensión:** el visitante entiende que la experiencia forma parte de la función.

### Acto 4 — Diez principios para decidir

Presenta los diez principios en su orden canónico. Para facilitar la comprensión, la narrativa puede enmarcarlos en cuatro capítulos sin alterar su identidad:

| Capítulo de presentación | Principios | Tensión que resuelve |
|---|---|---|
| Propósito | `P01`–`P02` | Funciones entregadas frente a progreso conseguido. |
| Complejidad y atención | `P03`–`P06` | Poder técnico frente a carga impuesta. |
| Confianza y continuidad | `P07`–`P09` | Resultado técnico frente a experiencia confiable. |
| Agencia humana | `P10` | Asistencia frente a control y propiedad. |

### Acto 5 — Del principio a la decisión

Utiliza ejemplos y contraejemplos para mostrar que un principio debe cambiar una decisión, exigir evidencia o detener una implementación.

### Acto 6 — De la doctrina al desarrollo

Explica fundamento de producto, Job Stories como forma de referencia, flujo, artefactos, contrato reutilizable, razones de detención y definición de terminado.

### Acto 7 — Una implementación mediante SpecKit

Muestra la relación sin confundir sus autoridades:

| Capa | Relación con la siguiente |
|---|---|
| Núcleo del manifiesto | Gobierna la constitución operativa. |
| Constitución operativa | Condiciona la actuación del agente. |
| SpecKit nativo + preset Software Humano | Organiza especificación, clarificación, plan, tareas, análisis, implementación y convergencia. |

Cierra con el estado real de la adaptación y las acciones disponibles: leer, explorar, aplicar conceptualmente o conocer el estado del preset.

## 17. Tratamiento de cada principio

Cada principio debe contar con una superficie propia y mantener el mismo contrato de contenido. La uniformidad permite aprender la estructura sin volverla monótona.

| Sección | Función |
|---|---|
| Declaración | Presentar el nombre y la frase canónica. |
| Tensión | Mostrar el problema humano o de producto que observa. |
| Significado | Explicar el principio sin reemplazar el texto canónico. |
| Consecuencia | Indicar qué debe cambiar al diseñar o implementar. |
| Ejemplo | Mostrar una aplicación concreta. |
| Contraejemplo | Hacer reconocible el incumplimiento. |
| Prueba de decisión | Permitir utilizar el principio en una revisión real. |
| Fuente | Vincular con el pasaje canónico y su identificador. |

### `P01` El progreso del usuario es la unidad de diseño

- **Concepto:** una capacidad solo importa cuando produce un cambio reconocible para una persona.
- **Expresión en el sitio:** toda sección debe responder qué comprensión o capacidad obtiene el visitante.
- **Interacción adecuada:** transformar una petición de función en circunstancia, motivación y resultado.
- **Incumplimiento que debe evitarse:** describir el sitio como una colección de páginas o efectos.

### `P02` La experiencia también es funcionalidad

- **Concepto:** exactitud, esfuerzo, claridad, emoción y confianza forman parte del resultado.
- **Expresión en el sitio:** comprender no puede requerir luchar con navegación, tipografía o movimiento.
- **Interacción adecuada:** comparar dos respuestas que llegan al mismo contenido con cargas distintas.
- **Incumplimiento que debe evitarse:** considerar suficiente que todo el texto esté técnicamente disponible.

### `P03` La complejidad pertenece al sistema

- **Concepto:** el sistema debe absorber estructura y excepciones internas.
- **Expresión en el sitio:** traducir SDD, presets y constitución a un modelo comprensible antes de mostrar detalles técnicos.
- **Interacción adecuada:** explicación progresiva con acceso posterior al mecanismo exacto.
- **Incumplimiento que debe evitarse:** abrir con rutas, archivos, YAML o comandos.

### `P04` Simple al comenzar y profundo al necesitarlo

- **Concepto:** la simplicidad controla el momento de la profundidad; no elimina capacidad.
- **Expresión en el sitio:** narrativa inicial clara, principio ampliable y texto canónico siempre disponible.
- **Interacción adecuada:** revelar “significado”, “aplicación” y “fuente” a demanda sin callejones sin salida.
- **Incumplimiento que debe evitarse:** una portada mínima que oculta el contenido o una página inicial que muestra todo a la vez.

### `P05` La interfaz no debe convertirse en otra tarea

- **Concepto:** el visitante viene a comprender, no a aprender una navegación original.
- **Expresión en el sitio:** etiquetas explícitas, patrones conocidos, orientación persistente y enlaces predecibles.
- **Interacción adecuada:** navegación por nombre y significado, no por números sin contexto.
- **Incumplimiento que debe evitarse:** obligar a descubrir cómo avanzar o interpretar gestos ocultos.

### `P06` La atención es un recurso del producto

- **Concepto:** cada elemento visible compite con el propósito del visitante.
- **Expresión en el sitio:** una idea dominante por momento, jerarquía clara y ausencia de efectos decorativos invasivos.
- **Interacción adecuada:** movimiento reservado para explicar una relación o transición conceptual.
- **Incumplimiento que debe evitarse:** animaciones continuas, llamados simultáneos o fondos que reduzcan legibilidad.

### `P07` La confianza se diseña

- **Concepto:** la confianza nace de estado, consecuencia, evidencia y recuperación.
- **Expresión en el sitio:** distinguir texto canónico, explicación editorial, ejemplo y estado experimental.
- **Interacción adecuada:** etiquetas y procedencia visibles; enlaces que no cambian de destino inesperadamente.
- **Incumplimiento que debe evitarse:** presentar el preset como oficial, publicado o respaldado por GitHub.

### `P08` La calidad vive en la acumulación de detalles

- **Concepto:** lenguaje, foco, estados, espaciado y comportamiento forman una experiencia única.
- **Expresión en el sitio:** consistencia entre principio, navegación, enlaces, componentes y estados responsivos.
- **Interacción adecuada:** transiciones breves, foco conservado y estados de enlace claramente visibles.
- **Incumplimiento que debe evitarse:** tratar errores, carga, dispositivos pequeños o teclado como terminaciones posteriores.

### `P09` El tiempo y la continuidad forman parte de la interfaz

- **Concepto:** espera, disponibilidad y preservación del estado son experiencia.
- **Expresión en el sitio:** carga rápida, contenido esencial disponible sin JavaScript y retorno al punto de lectura cuando sea razonable.
- **Interacción adecuada:** progreso honesto solo cuando exista una operación perceptible.
- **Incumplimiento que debe evitarse:** bloquear lectura por animaciones, fuentes o recursos pesados.

### `P10` La persona conserva control y propiedad

- **Concepto:** asistencia no equivale a apropiación ni decisión silenciosa.
- **Expresión en el sitio:** navegación libre, movimiento reducible, contenido copiable, URLs estables y ausencia de personalización obligatoria.
- **Interacción adecuada:** compartir o copiar una sección con confirmación clara y sin captura innecesaria de datos.
- **Incumplimiento que debe evitarse:** secuestrar el scroll, reproducir audio, forzar registro o impedir acceso al texto.

## 18. Arquitectura de información

### 18.1 Superficies obligatorias

| Superficie | Propósito | Contenido principal |
|---|---|---|
| Inicio | Contar la historia completa de manera progresiva. | Problema, tesis, principios, aplicación y SpecKit, con citas breves que enlazan a la división donde vive cada pasaje. |
| Manifiesto | Leer el núcleo por temas, en su orden. | Las nueve divisiones de la tabla siguiente. |
| SpecKit | Mostrar la implementación de referencia. | Arquitectura, qué conserva, qué adapta, estado y límites. Enlaza al límite entre núcleo e implementación, que vive en la división 1. |
| Acerca de | Explicar origen, autoría, versiones y relación independiente con influencias y herramientas. | Procedencia, autoría, versiones, gobernanza editorial, influencias y notas destiladas, la relación entre el autor, Software Humano y el Manifiesto (§18.4), la tabla de licencias por tipo de material y contacto si corresponde. |

#### Divisiones del manifiesto

Cada división agrupa secciones **consecutivas** del núcleo que comparten un tema. Ninguna sección se parte ni cambia de lugar; la única excepción aprobada es la Declaración final (ver abajo). Cada división abre con una explicación editorial y presenta después el texto canónico completo. Recorridas en orden, con anterior y siguiente, las divisiones reproducen el núcleo.

| # | División | Secciones del núcleo | Ruta del núcleo |
|---|---|---|---|
| 0 | Mapa del manifiesto | Índice operativo para agentes (`SH-INDEX`) | Comprender |
| 1 | El manifiesto | Propósito del documento y texto canónico | Comprender |
| 2 | Principios | Principios de diseño y `P01`–`P10`, cada uno en su propia página | Decidir |
| 3 | Fundamento de producto | `SH-FUND` | Decidir |
| 4 | Construir con IA | Doctrina para desarrollo con IA, flujo de trabajo (incluye `SH-STOP`) y contrato reutilizable | Construir |
| 5 | Verificar | Verificación (incluye `SH-SCORE`) y antipatrones (`SH-AP`) | Verificar |
| 6 | Ejemplo aplicado | Ejemplo aplicado | Llevarlo a la práctica |
| 7 | Gobernanza | Gobernanza (`SH-GOV`, incluye `SH-DONE`) | Llevarlo a la práctica |
| 8 | Guía de bolsillo | Guía de bolsillo (`SH-POCKET`, incluye `STOP01`–`STOP07`) y, como cierre, la Declaración final | Llevarlo a la práctica |

**Influencias y notas** se presenta destilada en Acerca de: el origen, las influencias y las fuentes con sus enlaces, como explicación editorial. La aclaración de que el marco no es un manifiesto oficial de Craft ni atribuye a su fundador sus reglas se cita textual. Su **Declaración final** se mueve al cierre de la Guía de bolsillo, para seguir siendo lo último que se lee del núcleo (decisión de la autoridad de producto, 2026-09-28).

**Descarga.** El pie de cada página, y el Mapa del manifiesto, ofrecen la descarga del núcleo completo en Markdown, en el idioma seleccionado. En español, el archivo original, idéntico byte a byte; en inglés y portugués de Brasil, la traducción identificada como tal y con referencia al original. El núcleo completo no se despliega como página del sitio.

Las divisiones se materializan como páginas independientes con URLs estables. La decisión técnica debe garantizar acceso directo, indexación y navegación sin depender de completar la narrativa.

Cada superficie tendrá una URL equivalente por idioma. La arquitectura deberá preservar la correspondencia entre secciones para que un cambio de idioma mantenga al visitante en el mismo concepto, principio o punto del recorrido siempre que exista la traducción aprobada.

### 18.2 Navegación global

Debe permitir, desde cualquier superficie:

- volver al inicio;
- abrir el manifiesto y moverse entre sus divisiones en el orden del núcleo, con anterior y siguiente;
- explorar principios;
- buscar en el sitio;
- descargar el núcleo completo en el idioma seleccionado;
- conocer SpecKit y su estado;
- abrir, desde el menú, el repositorio de la adaptación para SpecKit en GitHub, cuando ese repositorio sea público (v1.4). Mientras no lo sea, la entrada no aparece: no hay enlaces sin destino (`FR-010`, §29.10);
- identificar la versión vigente;
- cambiar el idioma sin perder la sección actual;
- desde el pie, llegar al sitio de Software Humano (§18.4);
- abrir ajustes de experiencia sin interrumpir la lectura.

La acción principal debe variar según el contexto. No deben competir simultáneamente múltiples llamados con el mismo peso visual.

El menú principal nombra Inicio, Manifiesto, SpecKit y Acerca de. Dentro del manifiesto, un índice lateral muestra las divisiones en el orden del núcleo, agrupadas bajo las rutas que el núcleo nombra (Comprender, Decidir, Construir, Verificar) y «Llevarlo a la práctica». Los nombres de ruta orientan; no reordenan.

### 18.3 Una sola superficie de referencia por pasaje

Cada sección del núcleo se lee completa en una sola división: su casa. Fuera de ella, un pasaje solo se enlaza o se cita en una frase breve con su enlace. No hay excepciones en el sitio: el núcleo completo solo se ofrece como descarga. Los identificadores del núcleo conservan anclas estables en su casa, y la acción de copiar el enlace usa esa dirección. Influencias y notas y su Declaración final siguen lo indicado en §18.1.

### 18.4 Relación con Software Humano

Software Humano es la marca y la agencia que crea productos bajo el Manifiesto. Este sitio es su sitio doctrinal: explica, fundamenta y gobierna. El sitio de la agencia (`softwarehumano.com`) persuade y demuestra.

- **Autoría y edición.** El autor del Manifiesto es Damián Acuña; la atribución de la licencia es a él, y la nota de origen conserva su primera persona. Software Humano es la organización que publica y cuida el sitio.
- **Enlace hacia la agencia.** El pie de cada página dice «Publicado por Software Humano» y ofrece «Conoce la empresa ↗» hacia `softwarehumano.com`. Acerca de explica la relación en una sección breve. El enlace no entra al menú ni compite con la lectura.
- **Reparto de contenido entre los dos sitios.** Los pasajes del núcleo viven solo en este sitio (§18.3). El sitio de la agencia puede citarlos en frases breves, con enlace a su casa aquí. Este sitio no presenta productos, oferta ni llamados comerciales.

## 19. Modelo de contenido

### 19.1 Tipos de contenido

| Tipo | Fuente | Regla de edición |
|---|---|---|
| Texto canónico | Núcleo v2.1 | No se parafrasea dentro de la superficie canónica. |
| Explicación editorial | Derivada y revisada | Debe referenciar el principio o sección de origen. |
| Ejemplo y contraejemplo | Núcleo o aplicación aprobada | Debe identificarse como ejemplo, no como doctrina adicional. |
| Estado de implementación | Paquete y validaciones reales | Debe mostrar fecha, versión y limitaciones. |
| Documentación técnica | Anexo y preset | Debe distinguir mecanismo nativo de adaptación. |
| Traducción aprobada | Entrada equivalente en otro idioma | Conserva identificador, significado, fuente, versión y estado de revisión. |
| Metadatos | Sistema editorial | Versión, fecha, autoría, idioma, URL canónica, alternas y relaciones semánticas. |

### 19.2 Entidad Principio

Cada principio debe admitir:

- `id` estable (`P01`–`P10`);
- nombre canónico;
- frase canónica;
- significado;
- problema o tensión;
- reglas;
- pruebas de decisión;
- ejemplo;
- señal de incumplimiento;
- capítulo de presentación;
- enlace al texto completo;
- relaciones con Job Stories y requisitos del sitio;
- versiones aprobadas en inglés general, español neutro latinoamericano y portugués de Brasil.

### 19.3 Fuente de contenido recomendada

La versión 1.0 administrará el contenido mediante archivos YAML versionados en GitHub. El contenido se tratará como software: cambios mediante control de versiones, revisión antes de integrar, validación automática y trazabilidad entre fuente, traducciones y salida publicada.

El modelo debe:

- mantener identificadores estables independientes del idioma;
- separar contenido canónico, explicación, ejemplo, metadatos y estado;
- representar inglés general, español neutro latinoamericano y portugués de Brasil sin duplicar reglas ni relaciones;
- declarar versión, idioma, autoría, estado editorial y fuente;
- validar estructura y valores mediante un esquema formal;
- detener el build ante identificadores duplicados, relaciones rotas, campos obligatorios ausentes o traducciones requeridas incompletas;
- permitir generar desde la misma fuente HTML, navegación, metadatos y JSON-LD.

Un CMS solo se justificará si aparece una necesidad editorial que GitHub, YAML y el flujo de revisión no puedan resolver con menor complejidad. Su incorporación futura no deberá cambiar los identificadores ni el contrato del contenido.

### 19.4 Contrato de localización

- Inglés general (`en`) es el idioma predeterminado del sitio y ocupa las rutas públicas sin prefijo de idioma.
- Español neutro latinoamericano (`es`) y portugués de Brasil (`pt-BR`) son versiones completas de lanzamiento, no resúmenes.
- La versión española utiliza el código general `es` y un único contrato editorial latinoamericano; la versión 1.0 no crea variantes por país.
- El texto original del manifiesto en español conserva su condición de fuente doctrinal aunque la experiencia predeterminada del sitio sea inglesa.
- El texto canónico traducido debe distinguirse de la versión original y conservar referencia a ella.
- Una explicación puede adaptarse lingüísticamente, pero no alterar la doctrina, agregar promesas ni eliminar matices.
- Toda entrada traducible comparte el mismo `id` y declara su código de idioma BCP 47.
- No se publicará una página como disponible en un idioma si su contenido principal conserva fragmentos no aprobados de otro idioma.

## 20. Alcance funcional

### `FR-001` Narrativa progresiva

El sistema debe presentar el recorrido problema → consecuencias → tesis → principios → aplicación → SpecKit sin exigir conocimientos previos.

### `FR-002` Navegación no lineal

El visitante debe poder abandonar la secuencia, acceder directamente a cualquier superficie y regresar sin perder orientación.

### `FR-003` Texto canónico íntegro

El sistema debe ofrecer el núcleo v2.1 completo como descarga en Markdown, en el idioma seleccionado: en español, el archivo original; en inglés y portugués de Brasil, la traducción identificada como tal y con referencia al original. En el sitio, el núcleo se lee repartido en las divisiones de §18.1, en su orden, con identificadores y enlaces estables, según §18.3.

### `FR-004` Explorador de principios

El sistema debe permitir recorrer y abrir individualmente `P01`–`P10`, conservando orden, identidad y fuente.

### `FR-005` Ejemplos y contraejemplos

Cada principio debe incluir al menos una situación que permita reconocer su aplicación o incumplimiento sin convertirla en regla nueva.

### `FR-006` Pruebas de decisión

Cada principio debe exponer preguntas que el visitante pueda utilizar en una revisión de producto.

### `FR-007` Aplicación operativa

El sistema debe explicar, en la división Construir con IA, la doctrina para desarrollo con IA, el flujo, los artefactos, la regla de detención y el contrato del agente. El fundamento de producto y las Job Stories como forma de referencia, el ejemplo aplicado y la gobernanza (responsabilidades, puntos de control, evolución y definición de terminado) se explican cada uno en su propia división (§18.1).

### `FR-008` Presentación de SpecKit

El sistema debe explicar la relación entre núcleo, constitución, anexo, preset y SpecKit nativo.

### `FR-009` Estado verificable de SpecKit

La superficie de SpecKit debe indicar que la adaptación:

- es independiente;
- utiliza presets nativos;
- no modifica el core;
- fue validada técnicamente en versión 1.0.0;
- no está publicada todavía;
- no constituye una integración oficial ni un respaldo de GitHub.

### `FR-010` Acciones según estado de publicación

Mientras el preset no esté publicado, no debe mostrarse una instalación pública operativa. Puede mostrarse el estado, la arquitectura y una indicación de disponibilidad futura. Cuando exista publicación autorizada, la incorporación del enlace y las instrucciones requerirá actualización de contenido y validación.

### `FR-011` Compartir y citar

El sistema debe ofrecer URLs estables para principios y secciones. La copia o compartición debe utilizar contenido preciso y no atribuir una explicación editorial al texto canónico.

### `FR-012` Versiones y procedencia

El visitante debe poder identificar versión del núcleo, fecha de actualización, procedencia del contenido y estado del preset.

### `FR-013` Preferencia de movimiento

El sitio debe respetar `prefers-reduced-motion` y ofrecer una experiencia completa sin movimiento no esencial.

### `FR-014` Continuidad de lectura

El regreso a una URL profunda debe restituir la sección correcta. Cualquier preservación adicional de progreso debe ser local, transparente y prescindible.

### `FR-015` Función esencial sin JavaScript de cliente

El texto, la navegación primaria, las URLs profundas y el contenido canónico deben seguir disponibles si JavaScript falla o está deshabilitado. Las mejoras interactivas deben incorporarse mediante mejora progresiva.

### `FR-016` Descubrimiento

El sitio debe proporcionar títulos, descripciones, encabezados, enlaces internos, sitemap, URLs canónicas y datos estructurados basados en Schema.org para que personas, buscadores y agentes comprendan la jerarquía, el idioma y la procedencia del contenido.

### `FR-017` Transparencia de contenido derivado

El sistema debe distinguir visual y semánticamente:

- cita canónica;
- explicación;
- ejemplo;
- inferencia o propuesta;
- estado técnico confirmado.

### `FR-018` Privacidad

La lectura no debe requerir cuenta, registro ni entrega de datos personales. Cualquier medición debe minimizar datos, documentar su propósito y no bloquear el contenido por falta de consentimiento.

### `FR-019` Experiencia multilingüe

Todo el alcance público de la versión 1.0 debe estar disponible en inglés general (`en`), español neutro latinoamericano (`es`) y portugués de Brasil (`pt-BR`). Cada versión debe contar con URL propia, atributo `lang`, metadatos localizados, enlaces alternativos `hreflang` recíprocos y correspondencia con la misma entidad conceptual.

Las rutas sin prefijo —incluida la raíz `/`— servirán la versión inglesa. La topología localizada utilizará `/es/` para español y `/pt-br/` para portugués de Brasil, manteniendo `pt-BR` como código de idioma en metadatos. Una URL localizada explícita siempre prevalecerá sobre cualquier preferencia almacenada.

### `FR-020` Ajustes de idioma y experiencia

El visitante debe poder cambiar el idioma desde cualquier superficie sin perder, cuando exista, la sección equivalente. La elección debe conservarse localmente, poder modificarse eligiendo otro idioma y no requerir una cuenta (v1.6: sin una acción separada para restablecerla). En la primera visita, una ruta sin prefijo debe mostrarse en inglés sin redirección automática basada en el idioma del navegador. La preferencia guardada podrá orientar la navegación posterior, pero no sobrescribir una URL de idioma elegida o compartida explícitamente.

La superficie de ajustes debe agrupar únicamente preferencias reales del producto —idioma, tema claro u oscuro (v1.4) y comportamiento de movimiento cuando corresponda— y no convertirse en un panel de personalización ornamental.

### `FR-021` Contenido como software

El contenido debe originarse en YAML versionado en GitHub y validarse durante integración y build. Una modificación debe permitir conocer qué cambió, quién la aprobó, qué idiomas afecta y qué páginas o datos estructurados genera.

### `FR-022` Verificación

El sistema debe presentar, en la división Verificar, las dimensiones de verificación, el scorecard de decisión, las preguntas para una revisión de producto y los antipatrones, de modo que el visitante pueda usarlos para evaluar un prototipo, una implementación o una entrega. La definición de terminado se lee en Gobernanza y la guía de bolsillo en su propia división; Verificar enlaza a ambas.

### `FR-023` Búsqueda

El sistema debe ofrecer una búsqueda en el contenido del sitio, por idioma, cuyos resultados lleven a la sección exacta. Debe funcionar sin servidor ni servicios de terceros, sin registrar lo que se busca (`FR-018`), y cargarse solo cuando la persona la abre (§24.1). Sin JavaScript, el sitio sigue completo y navegable (`FR-015`). Cada pasaje del núcleo aparece una sola vez en los resultados: en su casa (§18.3).

## 21. Requisitos de UX/UI

### 21.1 Principios rectores de experiencia

1. Una idea dominante por estado o sección.
2. Profundidad accesible sin obligar a recorrerla.
3. Orientación visible: dónde estoy, qué significa y qué puedo hacer.
4. Convenciones conocidas antes que navegación experimental.
5. Movimiento con función explicativa, nunca como requisito de lectura.
6. Contraste, foco y legibilidad como condiciones de función.
7. Feedback inmediato y proporcional.
8. Contenido real durante diseño y prueba; no aprobar con lorem ipsum.

### 21.2 Dirección visual

La identidad debe sentirse humana, deliberada y contemporánea sin adoptar una estética genérica de “producto de IA”. Se esperan:

- tipografía de lectura sobresaliente;
- amplitud y ritmo editorial;
- jerarquía que facilite comprensión rápida y lectura profunda;
- uso contenido del color para significado y orientación;
- imágenes, diagramas o movimiento solo cuando expliquen una relación;
- ausencia de gradientes, brillos, partículas, chat bubbles u otros clichés si no cumplen una función.

La dirección visual definitiva debe explorarse y validarse; este PRD no prescribe una marca gráfica antes de comprender su efecto.

**Sistema visual (v1.5).** El aspecto del sitio sigue `docs/design/Software_Humano_Especificacion_Visual_v1.0.md`, compartido con `softwarehumano.com`: Noto Sans como única familia, autoalojada en WOFF2, con los pesos 400, 500 y 600, `font-display: swap` y solo los caracteres de los tres idiomas; paleta oficial (Índigo `#3F51C6` para la interacción, Tinta `#18212C` para el texto y la autoridad, Turquesa, Coral y Ámbar solo con su significado); escala oscura derivada de la Tinta; WCAG 2.2 AA en los dos temas; sin gradientes, brillos, sombras profundas ni animación ornamental. El flywheel del ciclo pertenece al sitio de la agencia y no a este.

**Logotipo (v1.4, ajustado en la v1.5).** La cabecera muestra el ícono de Software Humano, en SVG, junto a la palabra «Manifiesto» en Noto Sans. En pantallas anchas se muestran el ícono y el nombre; en teléfonos, solo el ícono. En ambos casos el nombre accesible es «Manifiesto» y el logotipo lleva al inicio del sitio.

**Interpretaciones de la especificación visual** (autoridad de producto, 2026-09-28):
- las secciones expandibles conservan `<details>` y `<summary>`, que exponen su estado a las tecnologías de asistencia y funcionan sin JavaScript (`FR-015`), con el estilo de la especificación (§7.6);
- el panel de texto canónico con fondo Tinta (§7.5) se aplica a las declaraciones de los principios y a las citas breves. Los pasajes canónicos largos de las divisiones se leen sobre el fondo claro, con borde Índigo y la etiqueta «Texto canónico», para no convertir la lectura extensa en un bloque oscuro (`P06`).

### 21.3 Interacción narrativa

- No se debe secuestrar el scroll.
- El visitante debe poder detenerse, saltar, retroceder y abrir una URL profunda.
- Las transiciones no deben retrasar el acceso al contenido.
- Toda información revelada por hover debe estar disponible por foco, toque u otro mecanismo.
- Los acordeones o capas progresivas deben conservar títulos explícitos y estados accesibles.
- Los ejemplos interactivos deben tener alternativa textual equivalente.

### 21.4 Diseño responsivo

- El recorrido debe funcionar con jerarquía equivalente en móvil, tablet y escritorio.
- No se reducirán diagramas hasta volverlos ilegibles; deberán reestructurarse.
- El orden de lectura semántico debe permanecer correcto sin CSS.
- El contenido no debe exigir orientación horizontal ni gestos complejos.

### 21.5 Accesibilidad

El producto debe alcanzar WCAG 2.2 nivel AA como mínimo. La recomendación de W3C cubre accesibilidad en distintos dispositivos y considera, entre otros aspectos, teclado, foco, reflow, movimiento, contraste, lenguaje y mensajes de estado: [WCAG 2.2](https://www.w3.org/TR/WCAG22/).

Debe verificarse al menos:

- navegación completa por teclado;
- foco visible, lógico y no oculto;
- contraste de texto y componentes;
- zoom y reflow sin pérdida;
- encabezados y landmarks semánticos;
- alternativas textuales;
- reducción de movimiento;
- enlaces con propósito comprensible;
- tamaño adecuado de objetivos;
- lenguaje de página declarado;
- mensajes de estado anunciables;
- pruebas con lector de pantalla en recorridos principales.

### 21.6 Lenguaje

- Claro, directo y preciso.
- Humano sin infantilizar.
- Técnico solo cuando mejora la comprensión.
- Sin grandilocuencia sobre IA.
- Sin presentar recomendaciones como hechos.
- Con frases canónicas claramente diferenciadas de la explicación editorial.

#### Español neutro latinoamericano

La versión española debe resultar natural y comprensible en toda Hispanoamérica. Utilizará `tú` para la segunda persona singular y `ustedes` para la segunda persona plural.

- No utilizar voseo (`vos`, `sos`, `tenés`, `podés`).
- No utilizar `vosotros` ni sus conjugaciones.
- Evitar modismos, humor, giros y vocabulario exclusivos de un país.
- Preferir términos ampliamente comprendidos en Latinoamérica; cuando no exista una opción común, explicar el concepto antes que localizarlo artificialmente.
- Mantener precisión doctrinal y técnica: neutralidad no significa eliminar matices ni simplificar el contenido.
- Someter el contenido a revisión humana específica de neutralidad latinoamericana, además de corrección ortográfica.

### 21.7 Idioma y ajustes

- El selector debe nombrar cada idioma de forma reconocible: English, Español y Português (Brasil); no depender solo de banderas. Desde la v1.4 se muestra compacto, **EN · ES · PT**, y cada código conserva su nombre completo para tecnologías de asistencia y al pasar el cursor.
- **Índice en teléfonos (v1.5).** Se abre con un botón «Contenido» que despliega el panel del índice; no se mantiene una columna lateral comprimida.
- **Tema claro u oscuro (v1.4).** Sin una elección guardada, el sitio sigue la preferencia del sistema operativo. Un control de día y noche permite cambiarlo; la elección se guarda en el navegador, es transparente, reversible y prescindible, y puede volver a seguir al sistema. Sin JavaScript, el sitio sigue la preferencia del sistema. Los dos temas deben cumplir WCAG 2.2 AA, también en contraste.
- El idioma activo debe ser perceptible para la persona y para tecnologías de asistencia.
- Cambiar de idioma debe conservar la entidad o sección actual cuando exista equivalencia.
- La preferencia guardada debe ser local, transparente, reversible y prescindible.
- El selector será parte nativa de la aplicación; no dependerá de traducción automática ni de un widget de terceros.
- La ausencia de una preferencia guardada debe resolver en inglés para las rutas sin prefijo.
- La interfaz no debe mezclar idiomas salvo nombres propios, citas identificadas o términos cuya conservación esté justificada.
- Cada versión se probará con contenido real para detectar expansión de texto, cortes, cambios de jerarquía y expresiones culturalmente inadecuadas.

## 22. Estrategia de IA del propio sitio

### 22.1 Versión 1.0

El sitio será determinista en su experiencia pública. La IA podrá participar en diseño, desarrollo, pruebas y control de calidad bajo SpecKit, pero el visitante no dependerá de una inferencia para acceder o comprender el manifiesto.

### 22.2 Capacidades futuras sujetas a validación

- “Aplica el principio a mi situación”.
- Comparación guiada de una decisión de producto.
- Navegación conversacional del texto canónico.
- Generación de una lista de preguntas para una revisión humana.

Antes de autorizar cualquiera de ellas deberá definirse:

- Job Story concreta;
- fuentes que puede utilizar;
- diferencia entre cita e inferencia;
- manejo de incertidumbre;
- datos enviados y retención;
- decisiones que no puede tomar;
- recuperación y alternativa determinista;
- evidencia de que reduce carga en vez de agregarla.

## 23. Implementación mediante SpecKit

### 23.1 Papel de SpecKit

SpecKit no define el manifiesto ni el producto. Organiza la especificación, planificación, tareas, análisis, implementación y convergencia bajo una constitución operativa.

La documentación oficial establece que los presets permiten adaptar plantillas y comandos sin modificar las herramientas, y admite composición y prioridades entre capas: [guía de personalización](https://github.github.io/spec-kit/guides/customization.html) y [referencia de presets](https://github.github.io/spec-kit/reference/presets.html).

### 23.2 Configuración requerida para este proyecto

- SpecKit compatible con el rango declarado por el preset.
- Integración de agente activa.
- Preset `software-humano` v1.0.0 instalado con prioridad acordada.
- Núcleo v2.1 materializado en `.specify/memory/constitution.md`.
- Cuatro plantillas adaptadas resueltas desde el preset.
- Ocho comandos compuestos con el core nativo.
- Checklist nativo sin reemplazo.

### 23.3 Flujo autorizado

1. Utilizar este PRD como fundamento de producto para `specify`.
2. Conservar `JS-01`–`JS-09`, requisitos, reglas y exclusiones.
3. Ejecutar `clarify` hasta resolver decisiones materiales.
4. Producir un plan que cubra todo el alcance y ordene dependencias.
5. Crear documentos auxiliares únicamente cuando respondan una pregunta real.
6. Derivar tareas completas y trazables.
7. Ejecutar `analyze` antes de implementar.
8. Revisar los artefactos en lenguaje natural.
9. Autorizar `implement` después de la revisión.
10. Ejecutar `converge` y separar cierre técnico de aceptación humana.

### 23.4 Valor como piloto

El proyecto debe registrar cualquier caso donde:

- el agente intente imponer historias de usuario o prioridades;
- se pierda una Job Story o requisito;
- se genere un documento innecesario;
- una directiva del núcleo no sea visible para el agente;
- el plan confunda secuencia con alcance;
- la implementación cumpla técnicamente pero contradiga la experiencia.

Esos hallazgos servirán para evaluar el preset; no autorizan a modificar el manifiesto o el paquete durante la ejecución sin una decisión separada.

## 24. Requisitos no funcionales

### 24.1 Rendimiento

En el percentil 75 de visitas reales, el sitio debe alcanzar como objetivo:

- LCP igual o inferior a 2,5 segundos;
- INP igual o inferior a 200 milisegundos;
- CLS igual o inferior a 0,1.

Estos indicadores deben utilizarse junto con observación del recorrido, no como sustituto de la experiencia. Referencia: [Web Vitals](https://web.dev/articles/vitals).

Además:

- el contenido inicial no debe depender de una animación o petición tardía;
- las fuentes y recursos visuales deben tener presupuestos explícitos;
- las imágenes deben responder al dispositivo;
- el JavaScript debe justificarse por interacción necesaria;
- los fallos de recursos secundarios no deben impedir leer.

### 24.2 Confiabilidad y continuidad

- URLs estables y redirecciones al cambiar estructura.
- Página 404 útil y orientadora.
- Ausencia de enlaces internos rotos antes de liberar.
- Despliegues reversibles.
- Contenido canónico versionado.
- Recuperación del servicio proporcional a su naturaleza pública y documental.

### 24.3 Seguridad y privacidad

- No recopilar datos que el producto no utilice.
- No incorporar claves o secretos en cliente.
- Dependencias revisadas y mínimas.
- Encabezados de seguridad adecuados.
- Formularios, si se autorizan posteriormente, con validación, protección contra abuso y propósito explícito.
- Ningún script de terceros puede degradar privacidad, rendimiento o accesibilidad sin decisión aprobada.

### 24.4 Compatibilidad

- Navegadores modernos con soporte vigente.
- Degradación comprensible cuando una mejora no esté disponible.
- Sin dependencia de un dispositivo apuntador, tamaño de pantalla o modalidad de entrada.

### 24.5 Mantenibilidad

- Contenido separado de componentes cuando ello evite divergencia.
- Identificadores `P01`–`P10` y versiones en una fuente única.
- Componentes reutilizados por coherencia, no por abstracción anticipada.
- Pruebas automatizadas en recorridos críticos y verificaciones humanas para experiencia.
- Dependencias y versiones fijadas de manera reproducible.
- Validación automática del contenido YAML, traducciones, enlaces y datos estructurados.

### 24.6 Arquitectura técnica aprobada para la versión 1.0

#### TypeScript

TypeScript será el lenguaje fuente para la lógica del sitio, componentes, integraciones, validadores, pruebas y configuración siempre que la herramienta correspondiente lo soporte. El proyecto deberá utilizar comprobación estricta de tipos y fallar el build ante errores de tipado.

- No se escribirá lógica nueva en archivos JavaScript cuando pueda expresarse en TypeScript.
- Se evitará `any`; toda excepción deberá ser localizada, explicada y verificable.
- Los límites entre YAML, componentes y JSON-LD deberán tener tipos explícitos o derivados de una fuente única.
- Los tipos no sustituyen la validación de datos en tiempo de ejecución cuando la entrada provenga de archivos, navegador o servicios externos.
- El JavaScript enviado al navegador será únicamente la salida compilada necesaria para las islas interactivas autorizadas.

#### Astro

Astro será el framework de la versión 1.0. El sitio utilizará generación estática por defecto y entregará HTML utilizable antes de ejecutar JavaScript. La arquitectura de islas se reservará para interacciones que realmente lo requieran, como ajustes persistentes o comparaciones interactivas.

La configuración de internacionalización utilizará inglés como `defaultLocale`. Las rutas inglesas no tendrán prefijo; español utilizará `/es/` y portugués de Brasil `/pt-br/`, con la misma topología de páginas. El cambio de idioma será una navegación entre URLs equivalentes, no una sustitución de texto en cliente.

Astro no se adopta porque Google premie un framework específico. Se adopta porque su salida estática y su hidratación selectiva facilitan alcanzar los resultados que este PRD exige: contenido rastreable, poco JavaScript, rendimiento, resiliencia y mejora progresiva. El cumplimiento se demostrará con evidencia; el nombre del framework no lo garantiza.

#### daisyUI

daisyUI, sobre Tailwind CSS, será la biblioteca base de componentes. Su función es acelerar patrones comunes, mantener consistencia y evitar reconstruir controles estándar. No define la identidad visual ni reemplaza el sistema de diseño del producto.

Todo componente utilizado deberá:

- partir de HTML semántico y conservar comportamiento sin estilos cuando sea aplicable;
- ser personalizado mediante tokens y reglas visuales propias;
- cumplir los requisitos de foco, teclado, contraste, reflow y estados;
- evitar clases o componentes no utilizados en la salida final;
- poder sustituirse localmente cuando el componente base contradiga una decisión del manifiesto.

#### Regla de sustitución

Astro o daisyUI solo podrán reemplazarse mediante una decisión explícita de producto y un registro técnico que demuestre una incompatibilidad material con este PRD. Preferencia personal, novedad tecnológica o conveniencia del agente no constituyen razones suficientes.

## 25. Descubrimiento: SEO, AEO y GEO

### 25.1 Objetivo

Permitir que una búsqueda humana o una consulta a un agente encuentre una respuesta correcta, contextualizada y trazable al texto canónico.

### 25.2 Requisitos

- HTML semántico renderizado y accesible.
- Una URL canónica por superficie, principio e idioma.
- Títulos y descripciones específicos.
- Jerarquía de encabezados coherente.
- Sitemap y robots configurados de forma explícita.
- Enlaces internos entre explicación y fuente.
- Metadatos de autoría, versión y fecha.
- Datos estructurados JSON-LD basados en Schema.org y coherentes con el contenido visible.
- Open Graph y tarjetas sociales con textos fieles.
- Respuestas breves y citables que no sustituyan el contexto.
- No publicar marcado estructurado que describa contenido inexistente.
- URLs localizadas y relaciones `hreflang` recíprocas para `es`, `en` y `pt-BR`.
- `lang`, URL canónica, título, descripción y contenido social correctos para cada idioma.
- Inglés como versión predeterminada de las rutas sin prefijo; español y portugués de Brasil como alternativas completas, indexables y enlazadas recíprocamente.

#### Mapeo semántico mínimo

| Superficie o entidad | Tipo Schema.org de referencia | Condición |
|---|---|---|
| Sitio completo | `WebSite` | Identidad, nombre («Manifiesto»), URL, idioma, autor (Damián Acuña, `Person`) y editor (Software Humano, `Organization`, `https://softwarehumano.com`). |
| Página o sección autónoma | `WebPage` y subtipo más específico cuando corresponda | Solo usar un subtipo si describe realmente la página visible. |
| El manifiesto (división «El manifiesto») | `CreativeWork` o un subtipo validado durante implementación | Debe declarar versión, idioma, autoría, fecha y relación con traducciones. |
| Colección de principios | `DefinedTermSet` | Los diez principios deben ser entidades visibles y enlazables. |
| Principio individual | `DefinedTerm` | Debe conservar `P01`–`P10`, nombre, descripción y pertenencia al conjunto. |
| Jerarquía de navegación | `BreadcrumbList` | Solo en páginas cuya navegación visible muestre esa jerarquía. |
| Autor o iniciativa | `Person` u `Organization` | El tipo dependerá de la decisión de autoría aprobada. |
| Preset publicado | `SoftwareSourceCode` | Solo cuando exista publicación real, URL verificable y contenido visible equivalente. |

El mapeo deberá usar el tipo más específico que sea correcto, no el que prometa una apariencia más atractiva en resultados. Se preferirá menor cantidad de propiedades completas y verdaderas sobre marcado extenso, incompleto o especulativo.

### 25.3 Validación semántica y multilingüe

- Generar JSON-LD desde la misma fuente YAML que produce el contenido visible.
- Utilizar `inLanguage` y, cuando corresponda, `translationOfWork` o `workTranslation` para expresar relaciones reales entre obras y traducciones.
- Validar Schema.org y las funciones compatibles mediante las herramientas de Google aplicables.
- Comprobar que cada entidad, relación, idioma, fecha, versión y URL exista realmente en la página.
- Verificar reciprocidad de `hreflang`, códigos BCP 47 y correspondencia entre versiones.
- Mantener identificadores conceptuales comunes aunque las URLs y los textos estén localizados.
- No asumir que el marcado garantiza posicionamiento, inclusión en una respuesta generativa o un resultado enriquecido.

### 25.4 Regla para agentes

Las superficies canónicas deben permitir distinguir el texto aprobado de las explicaciones. Los resúmenes diseñados para descubrimiento deben enlazar la sección exacta y conservar versión y procedencia.

## 26. Medición y evidencia

### 26.1 Señales de éxito de comprensión

En pruebas con personas de las audiencias principales:

- pueden explicar el problema sin mencionar primero una funcionalidad del sitio;
- expresan la tesis con palabras propias;
- distinguen al menos tres principios cercanos sin confundirlos;
- relacionan escenarios con principios y justifican la relación;
- distinguen manifiesto, método, preset y SpecKit;
- no interpretan la adaptación como oficial o publicada.

### 26.2 Señales de éxito de experiencia

- encuentran el manifiesto completo sin ayuda;
- abren directamente un principio desde un enlace compartido;
- recorren el contenido por teclado;
- pueden reducir movimiento sin perder información;
- comprenden cómo avanzar y cómo profundizar;
- cambian de idioma sin perder el concepto o sección actual;
- conservan o modifican su preferencia sin crear una cuenta;
- no deben cerrar interrupciones, registrarse ni aprender controles no convencionales.

### 26.3 Señales cuantitativas iniciales

Estas métricas son hipótesis para calibración, no criterios universales de aceptación:

- porcentaje de visitantes que alcanzan la tesis desde la narrativa;
- exploración de uno o más principios;
- acceso al texto canónico;
- acceso a la explicación de aplicación;
- enlaces compartidos hacia principios;
- uso y continuidad de las versiones en inglés general, español neutro latinoamericano y portugués de Brasil;
- impresiones, clics y consultas por idioma para comprobar si la estrategia inglesa amplía realmente el alcance internacional;
- errores de traducción, rutas localizadas o relaciones `hreflang`;
- abandono asociado a esperas, movimiento o errores;
- Core Web Vitals y errores de cliente.

No se optimizará el producto para tiempo de permanencia, páginas vistas o scroll completo si esas métricas compiten con comprensión rápida y control.

### 26.4 Plan de validación

Antes de aceptar la versión 1.0 se realizarán:

- revisión de contenido contra el núcleo;
- pruebas moderadas de comprensión con representantes de las audiencias principales;
- prueba de navegación sin explicación previa;
- revisión completa por teclado y lector de pantalla;
- prueba con movimiento reducido;
- evaluación móvil y escritorio con contenido real;
- auditoría de rendimiento;
- comprobación de enlaces, metadatos y datos estructurados;
- revisión lingüística humana en inglés general, español neutro latinoamericano y portugués de Brasil;
- verificación específica de ausencia de voseo, `vosotros` y localismos nacionales en la versión española;
- prueba de cambio de idioma y correspondencia de URLs;
- validación del modelo YAML y de sus reglas de integridad;
- revisión humana del recorrido completo.

## 27. Gobernanza editorial y de producto

### 27.1 Estados de contenido

El contenido debe distinguir como mínimo:

- canónico aprobado;
- explicación aprobada;
- ejemplo aprobado;
- borrador;
- estado técnico verificado;
- propuesta futura.

### 27.2 Cambios del manifiesto

Una nueva versión del núcleo no debe sobrescribir silenciosamente la anterior. Debe:

1. registrar la versión;
2. describir los cambios;
3. actualizar contenido derivado;
4. revisar las páginas de principios;
5. verificar la adaptación SpecKit;
6. mantener redirecciones o archivo cuando corresponda.

### 27.3 Cambios de SpecKit

Una actualización de SpecKit no modifica el manifiesto. Debe evaluarse la compatibilidad del preset, actualizar el estado visible y no afirmar soporte hasta completar la verificación técnica.

### 27.4 Cambios y traducciones de contenido

- Todo cambio se origina en YAML y pasa por revisión en GitHub.
- Un cambio canónico debe identificar qué traducciones quedan pendientes o potencialmente obsoletas.
- El manifiesto original en español conserva la autoridad doctrinal. Inglés general, español editorial para el sitio y portugués de Brasil requieren revisión lingüística y doctrinal antes de publicarse.
- La revisión española debe verificar neutralidad latinoamericana y excluir voseo, `vosotros` y localismos nacionales.
- Las traducciones no pueden modificar identificadores, relaciones, alcance ni estado del contenido.
- El historial debe permitir reconstruir qué texto y qué traducción estaban publicados en una fecha y versión determinadas.

## 28. Riesgos y mitigaciones

| Riesgo | Impacto | Mitigación |
|---|---|---|
| El sitio se convierte en una pieza visual espectacular pero difícil de leer. | Contradicción directa con `P02`, `P05` y `P06`. | Pruebas de comprensión y control estricto del movimiento. |
| Los principios se reducen a tarjetas o slogans. | Pérdida de sustancia y aplicación. | Contrato común: tensión, significado, consecuencia, ejemplo, prueba y fuente. |
| El recorrido lineal bloquea a quien busca una referencia. | Pérdida de control y profundidad útil. | Navegación global, URLs profundas e índice. |
| SpecKit domina el mensaje. | Confusión entre doctrina e implementación. | Introducirlo después del método y declarar su papel subordinado. |
| Se interpreta la adaptación como oficial. | Pérdida de confianza y riesgo reputacional. | Etiqueta independiente y estado explícito en toda mención relevante. |
| Se agregan capacidades de IA sin necesidad. | Sobrecarga, incertidumbre y datos innecesarios. | Versión 1.0 determinista; evaluación separada de cualquier función generativa. |
| Explicaciones divergen del núcleo. | Inconsistencia doctrinal. | Identificadores estables, revisión editorial y pruebas de contenido. |
| El sitio depende de demasiado JavaScript. | Rendimiento, accesibilidad y fragilidad. | Generación estática y mejora progresiva. |
| Astro se trata como garantía automática de SEO o rendimiento. | Se sustituyen resultados verificables por una elección tecnológica. | Presupuestos, pruebas y métricas independientes del framework. |
| daisyUI impone una apariencia genérica o componentes inadecuados. | El sitio contradice su identidad y el principio de experiencia. | Tokens propios, auditoría de accesibilidad y sustitución local cuando corresponda. |
| Las traducciones divergen o mezclan idiomas. | Pérdida de doctrina, confianza y descubrimiento. | IDs comunes, estados editoriales, revisión humana y build bloqueado ante incompletitud. |
| Se asume que publicar en inglés garantiza mayor tráfico. | Una hipótesis de distribución se presenta como resultado. | Medir impresiones, consultas, clics y comprensión por idioma; ajustar sin reducir la paridad. |
| El YAML se convierte en un CMS artesanal complejo. | Sobreingeniería y mantenimiento innecesario. | Esquema mínimo; solo campos que generen contenido, navegación, trazabilidad o validación. |
| La medición invade privacidad o distorsiona objetivos. | Contradicción con control y propósito. | Analítica mínima y métricas de comprensión, no adicción. |
| El desarrollo con agentes amplía el alcance. | Sobreingeniería. | Preset, trazabilidad, `analyze`, revisión humana y reglas de detención. |

## 29. Decisiones abiertas que requieren autoridad humana

Estas decisiones deben resolverse durante `clarify` antes de que afecten diseño o publicación:

1. Nombre público definitivo y dominio.
2. Autoría visible: persona, iniciativa u organización.
3. Identidad visual existente o libertad para proponerla.
4. Nivel de protagonismo personal del autor en la narrativa.
5. Licencia del texto del manifiesto y condiciones de reutilización.
6. Acción pública mientras el preset no esté publicado: solo estado, solicitud de acceso o ninguna captura.
7. Canal de contacto, si corresponde.
8. Uso o ausencia de analítica y herramienta autorizada.
9. Responsables y mecanismo de aprobación lingüística para inglés general, español neutro latinoamericano y portugués de Brasil.
10. Publicación futura del preset: repositorio, licencia y soporte.

Estas decisiones no bloquean la especificación de la arquitectura conceptual, pero bloquean cualquier implementación que las vuelva irreversibles o públicas.

**Resoluciones de la versión 1.3** (autoridad de producto, 2026-09-28). Las demás resoluciones están registradas en `AGENTS.md`.

| Decisión | Resolución |
|---|---|
| 1 · Nombre y dominio | Nombre del sitio: «Manifiesto», igual en los tres idiomas. Dominio: `manifiesto.softwarehumano.com`. «Software Humano» es la marca de la agencia (`softwarehumano.com`) |
| 2 · Autoría visible | Autor: Damián Acuña, persona. Editor: Software Humano, organización (§18.4) |
| 5 · Licencias | Texto del núcleo y contenido editorial del sitio: CC BY 4.0, con atribución a Damián Acuña. Código del sitio y del método: MIT. Quedan excluidos de ambas licencias los nombres «Software Humano» y «Manifiesto» y el logotipo. Acerca de muestra una tabla que indica, por tipo de material, qué puede reutilizarse y bajo qué condiciones |

## 30. Supuestos explícitos y reversibles

- El contenido de lanzamiento se publica en inglés general (`en`), español neutro latinoamericano (`es`) y portugués de Brasil (`pt-BR`). Inglés es el idioma predeterminado del sitio; el manifiesto original en español conserva la autoridad doctrinal.
- Las rutas sin prefijo sirven inglés y no redirigen automáticamente según el idioma del navegador.
- El sitio será público y no requerirá autenticación.
- La versión 1.0 se administrará mediante YAML versionado en GitHub sin CMS.
- TypeScript, Astro y daisyUI constituyen la arquitectura técnica aprobada para la versión 1.0 bajo los límites de este PRD.
- No existe una función generativa para visitantes en la versión 1.0.
- SpecKit se presenta como implementación de referencia independiente y no publicada.
- El texto canónico v2.1 no cambia durante este ciclo de desarrollo.

Si uno de estos supuestos deja de ser verdadero, deberá revisarse el impacto; no se convierte automáticamente en nueva capacidad.

## 31. Criterios de aceptación del producto

### `AC-01` Comprensión del problema

Una persona sin contexto previo puede explicar por qué la capacidad de generar software con IA aumenta la necesidad de criterio.

### `AC-02` Comprensión de la tesis

La persona puede explicar que el progreso humano y la experiencia forman parte del producto.

### `AC-03` Integridad doctrinal

Los diez principios, sus identificadores y el texto canónico coinciden con el núcleo v2.1.

### `AC-04` Aplicabilidad

Cada principio contiene una consecuencia y una prueba de decisión utilizable.

### `AC-05` Profundidad progresiva

La narrativa puede comprenderse sin abrir todos los detalles y el contenido completo permanece accesible.

### `AC-06` Control

El visitante puede navegar, saltar, volver, compartir y reducir movimiento sin perder información.

### `AC-07` Accesibilidad

Los recorridos principales cumplen WCAG 2.2 AA y pasan revisión humana con teclado y tecnología de asistencia.

### `AC-08` Rendimiento

Las métricas reales o de laboratorio representativas cumplen los presupuestos definidos y el contenido esencial aparece sin esperas artificiales.

### `AC-09` SpecKit preciso

La explicación distingue doctrina, anexo, preset y framework; declara independencia, estado y límites.

### `AC-10` Desarrollo gobernado

Los artefactos producidos por SpecKit conservan todas las Job Stories y requisitos de este PRD, sin prioridades, MVP o exclusiones inventadas.

### `AC-11` Descubrimiento y cita

Cada principio tiene una dirección estable, metadatos correctos y vínculo con la fuente canónica.

### `AC-12` Privacidad

El sitio puede leerse íntegramente sin registro ni entrega de información personal.

### `AC-13` Paridad multilingüe

Todo el alcance público existe en inglés general, español neutro latinoamericano y portugués de Brasil; cada versión conserva significado, navegación, procedencia, accesibilidad y metadatos, sin fragmentos obligatorios pendientes ni mezclas accidentales. La versión española supera además una revisión de neutralidad latinoamericana sin voseo, `vosotros` ni localismos nacionales.

### `AC-14` Preferencia y continuidad de idioma

Sin preferencia previa, la raíz y las rutas sin prefijo se muestran en inglés. La persona puede cambiar de idioma desde cualquier superficie, mantenerse en la entidad equivalente, conservar o modificar su elección localmente y compartir una URL que abre directamente la versión elegida. Una URL localizada explícita no es sustituida por detección del navegador ni por una preferencia diferente.

### `AC-15` Contenido y semántica verificables

El build valida el YAML, las relaciones entre idiomas, los enlaces y el JSON-LD. El marcado Schema.org describe únicamente contenido visible y las comprobaciones aplicables no reportan errores críticos.

### `AC-16` Integridad TypeScript

El proyecto supera la comprobación estricta de tipos sin errores. La lógica mantenida por el equipo está escrita en TypeScript y cualquier excepción en JavaScript está técnicamente justificada, acotada y aprobada.

## 32. Definición de terminado

La versión 1.0 estará terminada cuando:

- todos los elementos obligatorios de este PRD tengan implementación y evidencia, o una excepción explícita aprobada;
- `JS-01`–`JS-09` se encuentren cubiertas y trazables;
- el contenido canónico haya sido comparado con el núcleo v2.1;
- inglés general, español neutro latinoamericano y portugués de Brasil hayan alcanzado paridad y revisión aprobada;
- el modelo YAML, sus referencias y la salida JSON-LD hayan superado validación automática;
- la comprobación estricta de TypeScript y las pruebas automatizadas hayan finalizado sin errores;
- el recorrido completo haya sido probado con personas;
- estados responsivos, accesibilidad, rendimiento, enlaces y metadatos hayan sido verificados;
- la presentación de SpecKit corresponda con el estado técnico real;
- no se hayan incorporado capacidades no autorizadas;
- `analyze` y `converge` no reporten brechas críticas;
- una revisión humana confirme comprensión, confianza, control y coherencia con los diez principios.

Código correcto, build exitoso o pruebas automatizadas verdes no bastan por sí solos.

## 33. Matriz de trazabilidad inicial

| Resultado / historia | Requisitos principales | Principios rectores | Evidencia |
|---|---|---|---|
| `JS-01` Comprender el problema | `FR-001`, `FR-005`, `FR-017` | `P01`, `P02`, `P06` | Explicación con palabras propias y prueba moderada. |
| `JS-02` Descubrir la tesis | `FR-001`, `FR-003` | `P01`, `P02` | Comprensión sin asistencia. |
| `JS-03` Comprender principios | `FR-004`–`FR-006` | `P01`–`P10` | Asociación de escenario y principio. |
| `JS-04` Experimentar diferencia | `FR-005`, `FR-013`, `FR-015` | `P02`–`P08` | Comparación accesible y explicación del impacto. |
| `JS-05` Consultar y citar | `FR-003`, `FR-011`, `FR-012`, `FR-016`, `FR-023` | `P07`, `P08`, `P10` | URL estable, versión y fuente. |
| `JS-06` Pasar a práctica | `FR-007`, `FR-022` | `P01`, `P03`, `P07`, `P10` | Identificación de una decisión o detención. |
| `JS-07` Comprender SpecKit | `FR-008`–`FR-010` | `P03`, `P07`, `P10` | Distinción correcta y estado comprendido. |
| `JS-08` Compartir | `FR-011`, `FR-017` | `P05`, `P07`, `P10` | Enlace contextual y atribución correcta. |
| `JS-09` Comprender en mi idioma | `FR-019`–`FR-021` | `P02`, `P04`, `P05`, `P07`, `P10` | Paridad, cambio contextual, preferencia reversible y URL localizada. |

## 34. Criterio para iniciar desarrollo

Este PRD puede ingresar a la adaptación Software Humano para SpecKit cuando la autoridad de producto confirme:

- que la visión, misión y propósito representan la intención del sitio;
- que `JS-01`–`JS-09` conforman el alcance inicial completo;
- que los no objetivos son correctos;
- qué decisiones abiertas deben resolverse antes del diseño;
- que el estado público de la adaptación SpecKit está descrito con precisión.

La aprobación de este PRD autoriza especificar y planificar. No autoriza automáticamente publicar el sitio, liberar el preset ni adoptar una licencia.

## 35. Declaración final del producto

El sitio no debe pedir al visitante que admire su sofisticación. Debe permitirle comprender una idea difícil, utilizarla para tomar mejores decisiones y reconocer que la tecnología puede permanecer detrás mientras la persona conserva delante su propósito, su atención y su control.
