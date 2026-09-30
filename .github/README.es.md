**Español** · [English](README.md) · [Português (BR)](README.pt-BR.md)

# Manifiesto · sitio del Manifiesto de Software Humano

Código y contenido del sitio público **[manifiesto.softwarehumano.com](https://manifiesto.softwarehumano.com)**, que publica el *Núcleo del manifiesto para el desarrollo de software humano con inteligencia artificial v2.1* en inglés estadounidense (predeterminado), español neutro latinoamericano (original) y portugués de Brasil.

> **Sobre el idioma.** El sitio se publica en inglés, español y portugués de Brasil. **Los documentos de este repositorio —especificación, plan, tareas, evidencia, bitácora e instrucciones para agentes— y los comentarios del código están en español.**

Es también el primer proyecto real desarrollado con la adaptación Software Humano para SpecKit. Este repositorio es público y completo a propósito: la especificación, el plan, las tareas, la evidencia y la bitácora del piloto muestran cómo se construyó, errores incluidos.

## Qué hay aquí

| Ruta | Qué es |
|---|---|
| `src/` | El sitio: Astro estático, TypeScript estricto, Tailwind CSS y daisyUI |
| `src/content/` | Contenido en YAML versionado, con su estado de aprobación por idioma |
| `docs/method/` | El núcleo del manifiesto. El sitio lee el texto canónico en español desde aquí durante la construcción; no lo copia |
| `docs/product/` | El PRD, fundamento de producto del sitio |
| `specs/001-sitio-manifiesto/` | Especificación, plan, investigación, tareas y evidencia del ciclo SpecKit |
| `docs/pilot/` | Bitácora del piloto e informe sobre cómo funcionó el método |
| `tools/speckit/`, `.specify/` | La adaptación Software Humano para SpecKit, instalada y verificada |
| `tests/` | Pruebas unitarias y de extremo a extremo (Playwright y axe) |

`README.md`, `LICENSE*`, `PARA_QUIEN_DECIDE.md` y `START_WITH_AI_AGENT.md`, en la raíz, pertenecen al paquete del método que se instaló en este proyecto. Su integridad se verifica con `SHA256SUMS`, por eso no se modifican. Este archivo es el README del sitio.

## Cómo se construyó

Con el Manifiesto (núcleo v2.1) y la adaptación Software Humano 2.0.0, sobre SpecKit 1.0.8, bajo la autoridad de producto de Damián Acuña. Las reglas para agentes están en `AGENTS.md`.

## Ejecutar localmente

Requiere [Bun](https://bun.sh) en la versión de `.bun-version`.

```bash
bun install --frozen-lockfile
bun run dev          # servidor local
bun run build        # comprobación de tipos, validación del contenido y construcción
bun run test         # pruebas unitarias
bun run test:e2e     # pruebas de extremo a extremo
bun run check:publish  # comprobación previa a la publicación
```

La construcción se detiene si el texto canónico cambia, si un enlace interno no tiene destino o si una página mezcla idiomas.

## Licencias

| Material | Licencia |
|---|---|
| Texto del núcleo del manifiesto y contenido editorial del sitio, en los tres idiomas | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.es), con atribución a Damián Acuña |
| Código del sitio y del método | MIT (`LICENSE-CODE`) |
| Los nombres «Software Humano» y «Manifiesto» y el logotipo | **Excluidos de ambas licencias.** No pueden usarse sin autorización |

La tabla completa, por tipo de material, está en [Acerca del Manifiesto](https://manifiesto.softwarehumano.com/es/acerca#licencias).

## Contacto

Por correo: manifiesto@softwarehumano.com.
