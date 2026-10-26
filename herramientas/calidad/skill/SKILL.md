---
name: calidad
description: Revisa la calidad de los sitios web de Damián (Señales Claras, Observatorio Comercial, softwarehumano.com, manifiesto) o de un producto nuevo con las herramientas comunes de Software Humano. Úsala cuando pidan revisar calidad, seguridad, velocidad, accesibilidad, SEO, AEO, GEO o schema.org de un sitio; antes de publicar (camino) y después de publicar (control); o al crear un sitio nuevo (camino --nuevo).
---

# Calidad de los sitios

Las revisiones de calidad se hacen **solo** con esta herramienta. No improvises otras: nada de `curl`, Lighthouse, axe ni PageSpeed por tu cuenta para dar un veredicto. Si la herramienta no cubre algo, dilo y propón agregarlo a la herramienta.

```
CALIDAD="bun $HOME/proyectos/website-software-humano/herramientas/calidad/calidad.ts"
```

## Cuándo correr qué

| Momento | Comando |
|---|---|
| Antes de construir o de publicar un producto | `$CALIDAD camino <perfil> --json` |
| Producto nuevo sin perfil | Pide a Damián que corra `$CALIDAD camino <perfil> --nuevo` (las preguntas son suyas; no las respondas tú) |
| Después de publicar en la vista previa | `$CALIDAD control <perfil> --vista-previa --json` |
| Después de publicar en producción | `$CALIDAD control <perfil> --json` |
| Revisión general | `$CALIDAD control todos --json` |
| Un paso manual cumplido, con evidencia | `$CALIDAD confirmar <perfil> <id>` (solo si Damián lo aprueba o hay evidencia escrita en el repositorio) |

Perfiles: `ls $HOME/proyectos/website-software-humano/herramientas/calidad/perfiles/`. Usa siempre `--json` y lee el resultado; no lo reinterpretes.

## Cómo informar

1. Primero la cifra: «X de Y cumplen».
2. Cada falla con su `porque`, `hacer` y `cuando`, tal como vienen. No inventes causas ni cambies las recomendaciones.
3. Los avisos, en una línea cada uno.
4. Cierra con «Por dónde partir»: la primera falla.
5. Español plano, sin tecnicismos innecesarios, sin repetir lo que cumple.

## Reglas

- **Nunca** pases por Turnstile real, ni envíes datos o consumas límites de producción para «probar».
- **Nunca** confirmes un paso sin evidencia.
- Nada corre solo: no programes ni automatices el control salvo que Damián lo pida.
- La salida de la herramienta manda. Si te parece equivocada (un falso positivo), dilo y propone el arreglo en `pasos.ts` o `control.ts`. No la ignores.
