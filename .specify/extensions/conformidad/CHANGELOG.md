# Registro de cambios · extensión Conformidad

## 2.1.0

**La excepción aprobada exige sus cuatro campos.** Hasta aquí bastaba nombrar la
sección: una línea sin razón y sin quién la aprueba pasaba como excepción
aprobada. El núcleo pide lo contrario en dos lugares —`V01` exige «una excepción
explícita y aprobada» y `SH-FUND` que toda omisión sea «explícita, trazable y
aprobada por la autoridad de producto»—, de modo que la extensión estaba
aceptando menos de lo que exige el manifiesto que distribuye.

Ahora hacen falta `artefacto`, `seccion`, `razon` y `aprobada_por`. Si falta
alguno, la comprobación lo rechaza **nombrando cuál falta**, en vez de reportar
la sección como simplemente ausente.

**`artefacto` es nuevo y obligatorio.** Una misma sección aparece en más de un
artefacto: «Mapa de cobertura» está en `spec.md` y en `tasks.md`, «Plan de
aceptación» en `plan.md` y en `tasks.md`. La excepción se buscaba solo por
nombre de sección, así que una declarada para uno tapaba la del otro sin que
nadie lo viera.

**La comprobación ahora verifica primero que el método siga instalado.** Un
preset puede quedar sin efecto sin que nada lo diga: un `override` del proyecto
en `.specify/templates/overrides/` gana sobre cualquier preset, otro preset con
más precedencia puede reemplazar un comando, y un archivo de addendum vaciado
por una deriva o un merge deja la plantilla sin doctrina. En los tres casos el
artefacto sale limpio porque nunca se le pidió nada.

Antes de mirar los artefactos se comprueba que el preset componga los ocho
comandos con lo que el manifiesto exige, que los tres addenda existan y no estén
vacíos, y que ningún `override` del proyecto esté tapando uno de los ocho. Si
algo de eso falla, lo dice y detiene.

**Migración.** Un `conformidad-config.yml` escrito para 2.0.0 sigue siendo YAML
válido, pero sus excepciones dejan de reconocerse hasta que se les agregue
`artefacto`, `razon` y `aprobada_por`. La comprobación nombra cuál falta en cada
caso.

## 2.0.0

Primera versión. Comprueba que las secciones que el manifiesto exige existan y
tengan contenido, y que toda ausencia esté declarada como excepción aprobada.
