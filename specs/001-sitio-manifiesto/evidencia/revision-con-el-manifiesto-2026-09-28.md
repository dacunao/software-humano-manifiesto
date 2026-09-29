# Revisión del sitio con el propio manifiesto

**Fecha:** 2026-09-28 · **Pedido de:** Damián Acuña · **Instrumentos del núcleo:** `V01`–`V12`, `SH-SCORE`, `SH-AP`, `SH-DONE`, `SH-POCKET` y `STOP01`–`STOP07`.
**Alcance:** el sitio construido (66 páginas) y el proceso que lo produjo. **Estado:** hallazgos del agente; su pertinencia la decide la autoridad.

Distinción obligatoria (`AGENTS.md`, regla 5): **hecho** es lo medido en el sitio o en el repositorio; **inferencia** es lo que el agente deduce de ello; **propuesta** es una acción posible.

---

## 1. Puntaje de decisión (`SH-SCORE`)

0 sin evidencia · 1 parcial o apoyado en un supuesto no validado · 2 evidencia suficiente.

| Criterio | Puntaje | Evidencia |
|---|:-:|---|
| Fundamento trazable | 2 | PRD v1.6 con autoridad, versiones y huellas; decisiones registradas en `AGENTS.md`, el plan y las tareas |
| Cobertura del producto | 1 | 23 de 23 requisitos con tareas; 24 tareas abiertas, entre ellas las de calidad transversal (T088–T092) y las de idiomas (T084, T098–T102) |
| Job Stories aplicables | **0** | Ninguna de las nueve historias fue observada con personas; la ronda temprana (T086) no se hizo |
| Progreso del usuario | **0** | No hay evidencia de que alguien entienda el problema, la tesis o un principio gracias al sitio |
| Carga cognitiva | 1 | Cada control tiene fundamento, pero hay redundancias medidas (§2, H4, H5, H7) |
| Claridad de interfaz | 1 | Pruebas automáticas verdes; sin validación con personas |
| Control y recuperación | 2 | Preferencias locales y reversibles, descarga del núcleo, sin cuenta ni datos personales |
| Profundidad progresiva | 1 | Ruta para principiante (Inicio) y para experto (búsqueda, identificadores, descarga); sin validar |
| Confiabilidad y tiempo | 1 | Presupuestos definidos; Lighthouse sin ejecutar (T091, T092) |
| Uso responsable de IA | 2 | Sitio determinista; reglas `RV-01`–`RV-14` verificables |
| Calidad acumulativa | 1 | Mezcla de idiomas en `en` y `pt-BR`; controles duplicados por sección |

**Criterio de salida del núcleo:** «Ninguna dimensión crítica puede puntuar 0». Hoy hay dos en 0. Es coherente con el estado del proyecto, que no está listo para publicar, pero indica dónde está el riesgo.

## 2. Hallazgos

| # | Hallazgo | Hecho | Doctrina | Propuesta |
|---|---|---|---|---|
| **H1** | **Construimos sin evidencia de personas** | Desde que se decidió la ronda temprana (2026-09-27) se agregaron once fases (17 a 27) y cinco versiones del PRD, y la ronda sigue sin hacerse. Las decisiones recientes (búsqueda, cabecera, tema, estructura) salen de preferencias y de un sitio de referencia, no de observar a quien lee | `STOP07`; `V02`, `V03`; antipatrones «La circunstancia fue inventada» y «La estética maquilla la fricción» | Hacer la ronda temprana ahora y no agregar capacidades nuevas hasta tener sus notas |
| **H2** | **La calidad transversal no está medida en todo el sitio** | axe corre sobre 4 páginas y el diálogo; faltan sin JavaScript en 66 páginas (T088), accesibilidad en 66 (T089), bordes (T090) y rendimiento real (T091, T092) | `V10`, `V11`; `SH-DONE` | Ejecutar T088–T092: son del agente y no dependen de nadie |
| **H3** | **Las versiones `en` y `pt-BR` mezclan español sin explicarlo** | 37 elementos en español en la portada inglesa y 37 en la portuguesa. Al quitar el aviso, nada le dice a quien lee que falta traducir | PRD §19.4; `P07`; `V04` | Mostrar «Esta página todavía no está traducida» solo donde falta traducción (distinto del aviso de borrador), hasta completar T084 |
| **H4** | **La insignia «Núcleo v2.1» en la cabecera** | Es uno de los 12 controles de la cabecera; la versión ya está en el pie y en el Mapa; «núcleo» es vocabulario interno | `P06`, `P05`; `V05` | Quitarla de la cabecera |
| **H5** | **El índice de una página de principio es largo** | 27 entradas en P06: «En esta página» (8) más el índice del manifiesto con los diez principios desplegados | `P06`, `P04` | En las páginas de principio, dejar «En esta página» y el grupo Decidir; plegar las otras rutas |
| **H6** | **Vocabulario interno en la navegación** | «Ruta de lectura · Construir», «Índice operativo para agentes» en el Mapa, códigos `SH-FUND` o `P01` en el índice | `P03`, `STOP05` | No cambiarlo todavía: observar en la ronda si confunde |
| **H7** | **Dos controles para lo mismo en cada sección** | «Enlace a esta sección» y «Copiar enlace», juntos, en cada sección de las divisiones (5 pares en Construir con IA) | `P06`; antipatrón «Más opciones se confunden con más valor» | Un solo control: «Copiar enlace», que sin JavaScript funciona como enlace |
| **H8** | **La primera división empieza por metatexto** | «El manifiesto» abre con el problema, alcance, rutas, arquitectura del marco y límite con la implementación antes del texto canónico | `P04`; `V04` | Observar en la ronda antes de cambiarlo, porque respeta el orden del núcleo |
| **H9** | **Muchos cambios de fundamento en poco tiempo** | Seis versiones del PRD en dos días, casi todas desde la conversación. Cada una quedó registrada (`SH-GOV`), pero responden a pedidos, no a evidencia | `V03`; `SH-GOV` | Desde ahora, una capacidad nueva entra con evidencia de la ronda o como hipótesis declarada, y los cambios al PRD se agrupan |

**Lo que cumple** (con evidencia): trazabilidad del fundamento; un solo lugar por pasaje (`RV-13`); búsqueda con cada pasaje una vez y en su idioma (`RV-14`); estados de la búsqueda y del sitio sin JavaScript; control del idioma y del tema; descarga del núcleo (`P10`); sistema visual aprobado y medido contra su especificación.

## 3. Respuesta a la guía de bolsillo (resumen)

- **1–2 · Fuente y alcance:** sí, con cobertura planificada completa.
- **3–7 · Circunstancia, motivación, resultado y evidencia de las historias:** declaradas en el PRD, **no observadas** (H1).
- **8 · Complejidad trasladada:** vocabulario interno y controles redundantes (H4–H7).
- **9–10 · Qué ve y qué pasa si se equivoca:** estados cubiertos; mezcla de idiomas sin explicar (H3).
- **11–12 · Control y determinismo:** sí.
- **13 · Alternativa más simple:** algunas redundancias (H4, H5, H7).
- **14 · Evidencia de terminado:** falta la de personas (H1) y la de calidad en todo el sitio (H2).
