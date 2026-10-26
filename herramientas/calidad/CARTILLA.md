# Cartilla de calidad

Dos herramientas. Se usan cuando tú quieras; nada corre solo.

```
calidad = bun ~/proyectos/website-software-humano/herramientas/calidad/calidad.ts
```

(Con el atajo instalado, escribe solo `calidad`.)

## Lo diario

| Quiero… | Escribo |
|---|---|
| Revisar mis sitios publicados | `calidad control todos` |
| Revisar uno | `calidad control senales-claras` |
| Revisar rápido (sin Google, segundos) | `calidad control todos --rapido` |
| Revisar la vista previa antes de aprobar | `calidad control senales-claras --vista-previa` |
| Saber qué le falta a un producto | `calidad camino observatorio` |
| Empezar un producto nuevo | `calidad camino mi-producto --nuevo` |
| Marcar un paso manual como hecho | `calidad confirmar senales-claras volver-atras` |

Perfiles: `senales-claras`, `observatorio`, `agencia`, `manifiesto`.

## Cómo leer el resultado

- **❌ Falla:** se corrige. Trae *Por qué*, *Qué hacer* y *Cuándo*.
- **⚠️ Aviso:** mejora o espera; no detiene nada.
- **◻️ Pendiente (camino):** lo confirmas tú una vez, con su `[id]`.
- **Por dónde partir:** la primera falla. Si no hay, dice «Nada que corregir ahora».

## Cuándo usarlas

1. **Antes de construir algo nuevo:** `camino --nuevo`. Te dice todo lo que aplica de una vez.
2. **Antes de aprobar una vista previa:** `control <sitio> --vista-previa`.
3. **Después de publicar:** `control <sitio>`.
4. **Una vez a la semana o al mes:** `control todos`.

## Pedírselo a un agente

«Corre el control de calidad de todos los sitios» o «¿qué le falta a Observatorio?». La skill `calidad` le dice qué comando usar y cómo informarte, sin improvisar.

## Si algo no funciona

- Sin velocidad ni visitas reales: falta la clave en `~/.config/software-humano/pagespeed-api-key`.
- Un sitio cambió de dirección: edita su archivo en `perfiles/`.
- Un falso positivo: pídele a un agente que lo corrija en `pasos.ts` o `control.ts`.

Estándares que aplica: WCAG 2.2 AA · Core Web Vitals · OWASP · Google Search Essentials · schema.org · llms.txt · Twelve-Factor · Ley 21.719 · DORA.
