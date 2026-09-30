**English** · [Español](README.es.md) · [Português (BR)](README.pt-BR.md)

# Manifiesto · the Software Humano manifesto site

Code and content for the public site **[manifiesto.softwarehumano.com](https://manifiesto.softwarehumano.com)**. It publishes the *Core of the manifesto for human software development with artificial intelligence v2.1* in American English (default), neutral Latin American Spanish (the original) and Brazilian Portuguese.

> **A note on language.** The site is published in English, Spanish and Brazilian Portuguese. **This repository's documents (specification, plan, tasks, evidence, pilot log and agent instructions) and its code comments are written in Spanish.**

It is also the first real project built with the Software Humano adaptation for SpecKit. This repository is public and complete on purpose: the specification, plan, tasks, evidence and pilot log show how it was built, mistakes included.

## What's here

| Path | What it is |
|---|---|
| `src/` | The site: static Astro, strict TypeScript, Tailwind CSS and daisyUI |
| `src/content/` | Versioned YAML content, with its approval state per language |
| `docs/method/` | The manifesto core. The site reads the canonical Spanish text from here at build time; it doesn't copy it |
| `docs/product/` | The PRD, the site's product foundation |
| `specs/001-sitio-manifiesto/` | Specification, plan, research, tasks and evidence from the SpecKit cycle |
| `docs/pilot/` | Pilot log and a report on how the method worked |
| `tools/speckit/`, `.specify/` | The Software Humano adaptation for SpecKit, installed and verified |
| `tests/` | Unit and end-to-end tests (Playwright and axe) |

`README.md`, `LICENSE*`, `PARA_QUIEN_DECIDE.md` and `START_WITH_AI_AGENT.md` at the root belong to the method package installed in this project. `SHA256SUMS` verifies their integrity, so they are not modified. This file is the site's README.

## How it was built

With the Manifiesto (core v2.1) and the Software Humano adaptation 2.0.0, on SpecKit 1.0.8, under the product authority of Damián Acuña. The rules for agents are in `AGENTS.md`.

## Running it locally

Requires [Bun](https://bun.sh) at the version in `.bun-version`.

```bash
bun install --frozen-lockfile
bun run dev          # local server
bun run build        # type check, content validation and build
bun run test         # unit tests
bun run test:e2e     # end-to-end tests
bun run check:publish  # pre-publication check
```

The build stops if the canonical text changes, if an internal link has no destination or if a page mixes languages.

## Licensing

| Material | License |
|---|---|
| Manifesto core text and the site's editorial content, in all three languages | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/), with attribution to Damián Acuña |
| Site and method code | MIT (`LICENSE-CODE`) |
| The names “Software Humano” and “Manifiesto” and the logo | **Excluded from both licenses.** They may not be used without permission |

The full table, by type of material, is in [About the Manifiesto](https://manifiesto.softwarehumano.com/about#licencias).

## Contact

By email: manifiesto@softwarehumano.com. Site errors: [Issues](https://github.com/dacunao/software-humano-manifiesto/issues).
