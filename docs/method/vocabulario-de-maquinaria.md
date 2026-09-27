# Vocabulario de maquinaria de la adaptación

**Generado a partir de los candidatos reales; cada término justificado a mano.**

El anexo v2.0 §5.4 admite tres clases de vocabulario. Este archivo declara la segunda: **términos que nombran maquinaria de la adaptación y no doctrina.** El manifiesto no puede tenerlos porque no habla de SpecKit ni de archivos.

Lo que no esté aquí ni en el núcleo, y se use en posición de definición, **detiene la construcción del paquete**. `tools/method/comprobar-vocabulario.py` lo ejecuta.

**Agregar un término a esta tabla es una decisión, no un trámite.** Si al escribirlo no puede justificarse como maquinaria, entonces es un concepto inventado para ordenar el manifiesto, y ese caso el anexo no lo admite.

## Términos declarados

| Término | Por qué es maquinaria y no doctrina |
|---|---|
| compuerta | El paso `gate` de un workflow de SpecKit. **No es sinónimo de «punto de control»**, que es como el manifiesto llama al momento: la compuerta es el mecanismo que lo implementa, y solo cuatro de los seis puntos de control son expresables como compuerta. |
| bundle | Mecanismo nativo de SpecKit: distribuye componentes como una unidad versionada. |
| speckit | Nombre de la herramienta que el método adapta. |
| texto literal | Rótulo de columna: la cita del núcleo, sin reformular. |
| comprobacion | Cada control que el ensamblado ejecuta. Maquinaria de la adaptación. |
| completar por proyecto | Sección de AGENTS.md que cada proyecto llena. |
| workflow | Mecanismo nativo de SpecKit: secuencia con pasos y compuertas. |
| si falla | Rótulo de fila en las instrucciones de instalación. |
| constitucion | Archivo nativo de SpecKit donde se aloja la proyección del núcleo. |
| version de speckit | Rango de compatibilidad declarado por el preset. |
| sesion 2 | Paso de la instalación, por la misma razón. |
| sesion 1 | Paso de la instalación: el catálogo de skills se carga al iniciar sesión. |
| preset | Mecanismo nativo de SpecKit: compone plantillas y comandos. |
| objeto | La cosa sujeta a obligación. Unidad de compilación, definida en el anexo §5.1. |
| iniciar la sesion | Momento en que el agente carga su catálogo de skills. |
| fusionados | Veredicto en la tabla de cosas que el núcleo nombra dos veces. |
| entorno | El conjunto de herramientas que la instalación comprueba. |
| dos sesiones | Consecuencia de lo anterior: la instalación las requiere. |
| dos objetos | Veredicto en la misma tabla. |
| condiciones de detencion | Sección de AGENTS.md que enumera cuándo el agente se detiene. |
| comandos sueltos | Modo de ejecución sin workflow. Declarado en el anexo §8. |

## Límites de la comprobación

Se declaran porque una comprobación que oculta su alcance invita a confiar donde no debe.

**Qué mira:** términos en posición de definición —encabezados, cabeceras y rótulos de tabla, negritas—, de hasta tres palabras, con dos o más apariciones.

**Qué no caza, medido:** un término instituido **una sola vez**, o que aparece solo dentro de una celda de valor o de la prosa corrida. Probada contra las cuatro invenciones que motivaron la regla, caza dos: «ángulo», con diecinueve apariciones, y «nivel de conformidad». Se escapan «capa transversal», que aparecía una vez, y «libro mayor», que vivía en una celda de valor.

**Por qué no se amplió:** emitir prefijos de frases largas sube la detección a tres de cuatro y lleva los candidatos de dieciocho a ciento noventa y cuatro, con basura incluida. Una comprobación con ese ruido enseña a ignorarla, que es el modo de fallo advertido en `docs/proposals/006`.

**Lo que sí garantiza:** que una invención **que se propaga** dispare. Las que más daño hacen son las que se repiten.
