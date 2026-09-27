# Mensaje de traspaso al nuevo proyecto

**Preparado el 2026-09-27** para que la autoridad de producto lo entregue directamente a la sesión que inicia el proyecto desde cero.

El texto del mensaje empieza después de la línea horizontal. **Se entrega junto con el PRD**, que es el adjunto imprescindible.

---

## Qué vas a construir

El **sitio web público del Manifiesto de Software Humano**: narrativo y documental, en **inglés general** (rutas sin prefijo, idioma predeterminado), **español neutro latinoamericano** (`/es/`) y **portugués de Brasil** (`/pt-br/`). Las tres versiones cubren el alcance público completo; **no son resúmenes**.

El fundamento autorizado es el **PRD del Sitio del Manifiesto de Software Humano v1.0**, que va adjunto a este mensaje. Es la única fuente que gobierna visión, alcance, requisitos, no objetivos y aceptación, y son 1.241 líneas: **léelo entero antes de proponer nada**. La autoridad de producto es **Damián Acuña**; solo él aprueba cambios de alcance o de estado de publicación. **Sigue vigente como v1.0**, confirmado por él el 2026-09-27: lo recibes tal cual, sin enmiendas.

**Una advertencia sobre cómo leerlo, y conviene tenerla presente desde la primera página.** El PRD se escribió el 21 de septiembre de 2026 y, además de gobernar el producto, **describe el método que lo implementa**: su tabla de fuentes declara versiones concretas del núcleo, del anexo y de la adaptación instalable, y varios requisitos obligan al sitio a **publicar el estado verificable de esa adaptación**.

**Ese método cambió después.** La autoridad del PRD sobre el producto no está en discusión; lo que puede haberse movido es aquello que el PRD referencia. Cuando encuentres en él un nombre, una versión o una descripción del método, **compruébala contra lo que tienes instalado antes de llevarla al sitio**. Si difieren, **díselo a la autoridad de producto en lugar de elegir tú cuál vale**: publicar una versión que ya no es la real contradiría el propio requisito que obliga a que ese estado sea verificable.

**Los diez objetivos del producto**, textuales del PRD §12, porque ordenan todo lo demás:

1. Hacer comprensible el manifiesto sin reducir su sustancia.
2. Convertir los diez principios en criterios utilizables, no en lemas.
3. Producir una experiencia narrativa memorable y controlable.
4. Mantener el texto canónico completo como fuente visible y accesible.
5. Mostrar cómo el manifiesto gobierna el desarrollo asistido por IA.
6. Explicar la adaptación a SpecKit sin presentarla como oficial o publicada.
7. **Demostrar el manifiesto mediante el propio comportamiento del sitio.**
8. Servir como primer piloto real del preset Software Humano para SpecKit.
9. Proporcionar contenido semántico, citable y descubrible por personas, buscadores y agentes.
10. Ofrecer una experiencia equivalente en inglés general, español neutro latinoamericano y portugués de Brasil, con elección y continuidad de idioma bajo control del visitante.

El séptimo es el que más se olvida y el que más se nota: **un sitio sobre software humano que se comporte mal refuta su propio contenido.**

**Seis superficies obligatorias** (PRD §18.1): Inicio, Manifiesto, Principios, Aplicación, SpecKit, Acerca de. Y **una URL canónica por superficie, principio e idioma** (PRD §25.2) — los diez principios tienen página propia, no son tarjetas dentro de una lista.

**Dos restricciones que no se reabren**: el texto canónico en español **se lee de su fuente protegida y no se copia**, y la experiencia pública es **determinista**, sin función generativa para el visitante.

**Identificadores del fundamento, que se preservan sin renumerar ni reagrupar**: `JS-01`–`JS-09` (Job Stories, con su circunstancia, motivación y resultado), `FR-001`–`FR-021` y `AC-01`–`AC-16`. Y `P01`–`P10`, los principios del manifiesto, que aquí son además **contenido publicado**. El orden de las Job Stories permite narrar; **no expresa prioridad ni autoriza omitir ninguna**.

El PRD §29 lista las decisiones que requieren autoridad humana. Damián ya las resolvió una vez; al final de este mensaje están sus respuestas para que **las confirmes en lugar de volver a preguntárselas todas**.

---

## Las tres referencias visuales, y qué aportó cada una

Se exploraron tres direcciones. Ninguna fue aprobada, y conviene que sepas **por qué cada una vale** antes de mirarlas, porque el error del intento anterior fue descartarlas enteras.

**A y B están publicadas juntas:**
`https://software-humano-prototipos.dacunao.chatgpt.site/`

**C está publicada y navegable:**
`https://claude.ai/artifact/VigqJFuBPnefhnrK86B9Lz`

### Dirección A — la que mejor resuelve la presentación

**Su eje deriva de `P01`**: el progreso que habilita es *comprender progresivamente el problema y la tesis* (`JS-01`, `JS-02`). No se distingue por un atributo del artefacto sino por lo que le ocurre a quien la lee.

**Su mérito, en juicio de la autoridad de producto: es la mejor lograda visualmente de las tres.** La presentación de la información, la jerarquía tipográfica y el tratamiento de las tarjetas están resueltos mejor que en cualquier otra. **Eso es lo que hay que conservar de A**, y no se conserva mirándola por encima: hay que entender cómo construye la jerarquía.

### Dirección B — la que resuelve la navegación

**Su eje también deriva de `P01`**: el progreso que habilita es *resolver una pregunta concreta o revisar una decisión* (`JS-03`, `JS-06`).

**Su mérito: el menú lateral, la tabla de contenidos.** Es la navegación que funciona, y sale claramente mejor que la de las otras dos. Un pendiente que conviene decidir desde el principio en lugar de dejarlo implícito: **esa tabla lateral no solo debe moverte dentro de una página, sino llevarte a otras**, y su relación con el menú superior necesita quedar definida.

A y B comparten un sistema de tokens declarado.

### Dirección C — la síntesis, y por qué no basta

C nació como combinación de A y B, con una razón real: `FR-001` exige el recorrido progresivo y `FR-002` entrar directo a cualquier superficie, de modo que **A sola incumple `FR-002` y B sola incumple `FR-001`**.

**Lo que C resolvió bien y conviene heredar:**

- La **estructura**, derivada de `P04` traducido a una restricción concreta del producto: *ni portada mínima que oculta ni página que muestra todo, y el texto canónico íntegro siempre alcanzable*.
- **Una página por principio**, porque `JS-08` exige compartir una sección autocontenida sin enviar el documento completo.
- **El manifiesto no se parte**: `JS-05` acepta explícitamente «una URL **o un ancla** estable», y partirlo rompería citarlo.
- **Profundidad progresiva medida, no argumentada.** Se contó qué porcentaje del texto queda visible antes de abrir nada. Un primer intento dejó el 3%, y era tan incumplidor como el 100%: `P04` prohíbe los dos extremos. La versión final quedó en 30% en la superficie más densa.
- **Completitud comprobada por el generador**, que falla si falta un nodo del manifiesto, si hay un identificador repetido o un enlace sin destino.

**Lo que C hizo mal, dicho para que no se repita:**

- **El oficio visual retrocedió.** Es peor que A en jerarquía y tarjetas. Al corregir la estructura se reconstruyó desde cero y se tiró lo que funcionaba.
- **La navegación retrocedió.** Es peor que B. La tabla lateral no quedó resuelta.
- **Los rótulos editoriales sobran.** «Explicación editorial», «capítulo de presentación · encuadre editorial del sitio, no del manifiesto». Eso **expone la estructura interna de un documento** que no tiene por qué aflorar entera en la superficie pública. Pregúntate por cada elemento del manifiesto si debe mapearse al sitio, en vez de asumir que sí.
- **Competencia entre títulos.** En una misma sección compiten el título de la sección y un subtítulo que no aporta. Entiende de dónde nace cada uno en el documento original antes de renderizar los dos.
- **Detalles de acabado**: el símbolo `#` aparece al pasar el ratón sobre los títulos, y las anclas y punteros no están bien puestos por sección.

**La lección que más te va a servir:** cuando una propuesta se rechaza por una razón, **no se tira entera**. Se nombra qué se conserva de ella. El intento anterior no lo hizo y perdió dos iteraciones.

---

## Sobre el método

La **adaptación para SpecKit que soporta el manifiesto ya está instalada en tu repositorio**, en su versión vigente. **Lee ahí sus reglas**: esa instalación es la fuente.

No las des por sabidas desde este mensaje. **El método cambió después del piloto anterior**, y describirte aquí lo que hacía entonces te llevaría a trabajar contra una versión que ya no existe. Lo que sigue no son reglas del método: son **cuatro cosas que salieron mal en el intento anterior**, y que seguirán siendo ciertas mientras haya un agente y una persona.

**1 · El trabajo se hizo por fuera del flujo, y eso desactivó las comprobaciones.** Cuatro bloques enteros —modelo de contenido, contenido real, topología de rutas y la exploración visual— se ejecutaron editando archivos directamente, sin pasar por el flujo del método. El agente incluso registró el defecto por escrito y volvió a cometerlo el mismo día. Las comprobaciones de un método solo existen mientras el método corre: saltárselo no es ahorrar ceremonia, es quedarse sin red. Nada te exime, ni que el pedido venga en lenguaje coloquial, ni que el trabajo te esté saliendo bien.

**2 · Se propuso antes de consultar la doctrina.** Tres fallos distintos tuvieron la misma forma: proponer primero y mirar el manifiesto después de que la persona lo cuestionara. En al menos uno, la restricción que decidía el caso estaba escrita en español llano, en un artefacto que el propio agente había redactado semanas antes.

**3 · Se le trasladaron a la persona decisiones que ya estaban resueltas.** Se le presentaron tres alternativas de diseño para que eligiera, y las tres estaban adjudicadas por una restricción ya escrita. Una pregunta cuya respuesta existe no es deferencia: gasta la atención de quien decide, que es el recurso que el propio manifiesto protege.

**4 · Se presentó una propuesta sin evaluarla.** C llegó a la autoridad de producto sin haber sido valorada con el instrumento que el propio manifiesto define. Aplicado después, la dimensión que el manifiesto pone en el centro —**el progreso del usuario**— daba **cero**: nadie había sido observado usando nada. Eso bastaba para no presentarla, o para presentarla declarada como hipótesis sin observar.

Y una regla de oficio que no es del método y vale igual: **mide en vez de leer**. El defecto del 3% de visibilidad era invisible leyendo la página, que se veía ordenada y prometedora. Apareció al contar palabras.

---

## Las puertas humanas, que no son trabajo pendiente

- **Dirección visual**: la elige la autoridad de producto y bloquea todo lo posterior. **Ninguna de A, B ni C está aprobada.**
- **Revisión profesional de inglés y portugués de Brasil**: servicio pagado externo. Sin registro de revisión aprobada, **no se publica ese idioma**.
- **Revisión de neutralidad del español**: la hace la autoridad de producto.
- **Aceptación humana antes de publicar**: aprobar el fundamento **no autoriza** publicar el sitio.

No te las atribuyas ni las cruces por inferencia. El intento anterior mantuvo las cuatro cerradas durante todo su recorrido, y es lo mejor que hizo.

---

## Anexo · decisiones que Damián ya tomó

Corresponden a las decisiones abiertas del PRD §29 y a dos que aparecieron después. **Confírmalas con él; no las vuelvas a plantear desde cero.**

| Qué | Decisión |
|---|---|
| Nombre y dominio | «Software Humano», valor único en los tres idiomas · `softwarehumano.com` |
| Autoría visible | Persona: Damián Acuña. No organización |
| Licencia del texto y contenido editorial | CC BY 4.0 |
| Licencia del código | MIT |
| Plataforma | Cloudflare Pages |
| Medición | Search Console y CrUX sin script, más Cloudflare Web Analytics como único script de terceros |
| Contacto | Alias de correo como `mailto:`, más Issues del repositorio para lo técnico |
| Voz | Impersonal en el recorrido, con una nota de origen en primera persona |
| Aprobación lingüística | Mixta: él aprueba el español; inglés y portugués, servicio profesional pagado |
| Exploración visual | Dos direcciones, libertad total, sin identidad previa vinculante. **Esas dos se prototiparon como A y B**, y **C es su combinación**; las tres están enlazadas más arriba y **ninguna está aprobada** |
| Estado de la adaptación SpecKit | Se modela como **dato**; mientras no esté publicada se declara disponibilidad futura y **no se publican enlaces sin destino** |

La última merece atención: el sitio describe una herramienta que todavía no está publicada, y **no puede insinuar que lo está**. Un botón de descarga sin destino contradice el manifiesto que el propio sitio publica.
