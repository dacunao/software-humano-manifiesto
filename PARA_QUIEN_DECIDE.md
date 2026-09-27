# Para quien decide

**Este es el único documento del paquete escrito para ti y no para el agente.** Es corto a propósito.

## Por qué existe

El método traduce el manifiesto a exigencias que el agente debe cumplir, **citadas literalmente**: doscientas diez, repartidas entre las operaciones del ciclo. Todo lo que se podía volver comprobable, se volvió comprobable.

Lo que no se pudo **aterrizó en ti**. Y hasta ahora ningún documento te lo decía.

Un método que transfiere obligaciones a alguien que no sabe que las tiene no las transfirió: las perdió. Esto lo corrige.

## Lo que NO es tuyo

Para que esto no se convierta en vigilancia permanente, conviene empezar por lo que el método ya absorbió:

- **No** tienes que recordar qué principios aplican en cada momento. Cada comando los trae citados.
- **No** tienes que verificar la cobertura. La matriz existe o no existe.
- **No** tienes que comprobar que la doctrina esté en los artefactos. `analyze` y la comprobación de conformidad lo hacen.
- **No** tienes que conocer las doscientas diez exigencias. Son del agente.

Tu trabajo es más pequeño que todo eso. Son cinco momentos.

---

## Los cinco momentos

### 1 · Cuando adoptas el método en algo que ya existía

**Esto solo lo puedes hacer tú.** Un proyecto en marcha rara vez cumple todo desde el primer día, y el método lo admite: la definición de terminado acepta *implementación con evidencia verificable, **o excepción explícita y aprobada***.

Esas excepciones se declaran en `.specify/extensions/conformidad/conformidad-config.yml`, y **exigen tres cosas**: qué no se cumple, por qué en términos que otra persona pueda evaluar, y quién lo aprueba.

**Sin las tres no es una excepción: es una ausencia con excusa.**

**Lo que puede fallar:** que el agente las complete por ti para que la comprobación pase en verde. Una ausencia declarada es visible; una ausencia rellenada es invisible, y es peor.

### 2 · Cuando te presenta una propuesta

Una dirección de diseño, una arquitectura, una alternativa técnica.

**Lo que puede fallar:** que te la traiga sin haber consultado la doctrina que la gobierna. Ocurrió en el primer piloto: dos direcciones visuales presentadas sin mirar los principios que las descartaban.

### 3 · Cuando te abre una decisión

Te pregunta algo y espera que elijas.

**Lo que puede fallar:** que la respuesta ya esté escrita en el manifiesto o en tu propio fundamento de producto. También ocurrió. Una pregunta cuya respuesta ya existe no es deferencia: te traslada un trabajo que no es tuyo.

### 4 · Cuando declara algo terminado

Un bloque, una tarea, una entrega.

**Lo que puede fallar:** que confunda «las comprobaciones pasaron» con «el producto sirve». Son cosas distintas y el método las separa; el informe tiene que separarlas también.

### 5 · Cuando toca decidir si se prueba con personas

**Esto no lo puede hacer ningún agente.** Es el único punto donde no hay nada que delegar.

Si el producto nunca se prueba con personas reales, el método puede estar en verde y el producto puede no servirle a nadie. Ninguna comprobación cubre esa distancia.

---

## Cómo se ve una respuesta hueca

Esta es la parte que hace accionable el momento 4, y se aprende con ejemplos.

**La prueba es una sola pregunta: ¿puedo saber si se cumplió mirando algo?**

| Hueca | Real |
|---|---|
| «Se respetará el principio de confianza» | «Toda acción irreversible declara su consecuencia antes de ejecutarse» |
| «El diseño será simple» | «Ninguna ruta termina sin una acción siguiente disponible» |
| «Se cuidará la carga cognitiva» | «Cada elemento visible traza a un requisito; sin traza, se elimina» |
| «Se considerará la accesibilidad» | «Los recorridos principales pasan revisión por teclado y lector de pantalla, con la salida archivada» |
| «Se harán las pruebas necesarias» | «Ocho casos negativos comprueban que cada regla detiene el build» |

La columna izquierda **repite el enunciado**. La derecha **dice qué va a pasar**.

Una consecuencia hueca pasa cualquier comprobación automática: la celda no está vacía. Que diga algo, solo lo verificas tú.

---

## Las cinco preguntas

No tienes que recordar la doctrina. Tienes que recordar cinco preguntas. **Cada una es del manifiesto**, y cada una activa una exigencia que ya existe.

| Cuándo | Qué preguntas |
|---|---|
| Adoptas el método en algo que ya existía | **¿Qué quedó declarado como excepción, con qué razón y aprobado por quién?** |
| Te presenta una propuesta | **¿Cuál es la alternativa más simple, y cuál sería no construir esto?** |
| Te abre una decisión | **¿Qué fuente consultaste para confirmar que no está ya resuelta?** |
| Una fila te suena vacía | **Esa consecuencia repite el enunciado. Reescríbela.** |
| Declara algo terminado | **¿Qué quedó verificado por comprobación y qué espera verificación humana?** |

Si el agente no puede responder alguna, esa es la señal. No hace falta que sepas por qué.

---

## Las dos cosas que nadie puede hacer por ti

**No aprobar un punto de control que una comprobación rechazó porque tienes prisa.** El método puede detectar el problema y señalártelo. No puede impedirte que lo pases por alto.

**Correr las pruebas con personas.** Es la mitad del método que mide si el producto sirve, y la única que no se automatiza.

---

## Un dato que conviene conocer

En el primer piloto real hubo tres fallos de juicio. **Uno de ellos ya tenía su regla escrita** en las instrucciones del agente, y no sirvió: la regla estaba y se ignoró.

No se cuenta como advertencia moral. Se cuenta porque explica para qué sirve este documento: **ninguna cantidad de reglas reemplaza a alguien leyendo lo que tiene delante.** Lo que las reglas hacen es volver ese trabajo pequeño y ubicable, en lugar de continuo y difuso.

---

## Lo que el método mide, y lo que no

Comprueba que lo que el manifiesto exige **esté presente y trazable**. No comprueba que lo escrito sea bueno.

El propio manifiesto fija la unidad de medida, y no es la cobertura:

> «Su unidad de medida no es la cantidad de funcionalidades entregadas. Es **el progreso que una persona puede lograr con claridad, confianza y control**.»

Eso solo se sabe probando con personas.

---

## Este documento debe seguir siendo corto

Si crece, deja de leerse — y entonces vuelve a no tener dueño lo que describe.

Antes de agregarle algo, comprueba que no pertenezca a `AGENTS.md`, que es donde van las reglas del agente. Aquí solo va lo que **no se puede delegar**.
