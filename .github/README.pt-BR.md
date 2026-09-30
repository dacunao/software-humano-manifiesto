**Português (BR)** · [English](README.md) · [Español](README.es.md)

# Manifiesto · site do Manifesto de Software Humano

Código e conteúdo do site público **[manifiesto.softwarehumano.com](https://manifiesto.softwarehumano.com)**. Ele publica o *Núcleo do manifesto para o desenvolvimento de software humano com inteligência artificial v2.1* em inglês americano (padrão), espanhol neutro latino-americano (o original) e português do Brasil.

> **Sobre o idioma.** O site é publicado em inglês, espanhol e português do Brasil. **Os documentos deste repositório (especificação, plano, tarefas, evidências, registro do piloto e instruções para agentes) e os comentários do código estão em espanhol.**

É também o primeiro projeto real desenvolvido com a adaptação da Software Humano para o SpecKit. Este repositório é público e completo de propósito: a especificação, o plano, as tarefas, as evidências e o registro do piloto mostram como ele foi construído, erros incluídos.

## O que há aqui

| Caminho | O que é |
|---|---|
| `src/` | O site: Astro estático, TypeScript estrito, Tailwind CSS e daisyUI |
| `src/content/` | Conteúdo em YAML versionado, com seu estado de aprovação por idioma |
| `docs/method/` | O núcleo do manifesto. O site lê daqui o texto canônico em espanhol durante a construção; não o copia |
| `docs/product/` | O PRD, fundamento de produto do site |
| `specs/001-sitio-manifiesto/` | Especificação, plano, pesquisa, tarefas e evidências do ciclo SpecKit |
| `docs/pilot/` | Registro do piloto e relatório sobre como o método funcionou |
| `tools/speckit/`, `.specify/` | A adaptação da Software Humano para o SpecKit, instalada e verificada |
| `tests/` | Testes unitários e de ponta a ponta (Playwright e axe) |

`README.md`, `LICENSE*`, `PARA_QUIEN_DECIDE.md` e `START_WITH_AI_AGENT.md`, na raiz, pertencem ao pacote do método instalado neste projeto. O `SHA256SUMS` verifica sua integridade, por isso eles não são modificados. Este arquivo é o README do site.

## Como foi construído

Com o Manifiesto (núcleo v2.1) e a adaptação da Software Humano 2.0.0, sobre o SpecKit 1.0.8, sob a autoridade de produto de Damián Acuña. As regras para agentes estão em `AGENTS.md`.

## Executar localmente

Requer o [Bun](https://bun.sh) na versão indicada em `.bun-version`.

```bash
bun install --frozen-lockfile
bun run dev          # servidor local
bun run build        # verificação de tipos, validação do conteúdo e construção
bun run test         # testes unitários
bun run test:e2e     # testes de ponta a ponta
bun run check:publish  # verificação anterior à publicação
```

A construção é interrompida se o texto canônico mudar, se um link interno não tiver destino ou se uma página misturar idiomas.

## Licenças

| Material | Licença |
|---|---|
| Texto do núcleo do manifesto e conteúdo editorial do site, nos três idiomas | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.pt_BR), com atribuição a Damián Acuña |
| Código do site e do método | MIT (`LICENSE-CODE`) |
| Os nomes “Software Humano” e “Manifiesto” e o logotipo | **Excluídos de ambas as licenças.** Não podem ser usados sem autorização |

A tabela completa, por tipo de material, está em [Sobre o Manifiesto](https://manifiesto.softwarehumano.com/pt-br/sobre#licencias).

## Contato

Por e-mail: manifiestosoftwarehumano@gmail.com.
