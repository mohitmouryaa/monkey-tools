---
phase: 4
plan_file: plan-cms-blog-v2.md
exploded_at: 2026-04-28
---

# Fase 4 — Render público (`/blog` e `/blog/[slug]`)

## Objetivo
Páginas públicas funcionais com SSG + revalidate-on-demand, SEO completo,
renderização do JSON do Editor.js (incluindo Tool Embed reutilizando o
componente real da tool).

## Critério de conclusão
- Acessar `/blog` mostra listagem paginada com posts publicados, seção de
  featured no topo, filtros por tool e busca textual.
- Acessar `/blog/[slug]` mostra o post renderizado com og tags corretas
  (fallbacks aplicados), tools relacionadas no rodapé.
- Cada bloco está mapeado a um componente React e é validado num post de
  teste contendo TODOS os blocos: Header, Paragraph, List, Quote, Embed,
  Table, Checklist, Image, Tool Embed.
- O Tool Embed renderiza o componente real da tool (mesmo módulo usado em
  `/tools/[toolCategory]/[tool]`).
- A rota `/blog` usa `revalidate: 60` (TTL fallback) na função
  `unstable_cache` para posts agendados aparecerem mesmo sem dispatch
  explícito de `revalidateTag`.

## Reuso identificado

### Reutilizado (já existe, NÃO recrie)
- `caller.posts.list`, `caller.posts.getBySlug`, `caller.posts.getFeatured`
  em `apps/web/trpc/routers/postsRouter.ts` (Fase 2). Já populam `tools`.
- `caller.tools.getMany` em `apps/web/trpc/routers/toolsRouter.ts`
  (baseProcedure, ok para uso público no filtro).
- `(main)/layout.tsx` envolve children com Header + Footer — pages do blog
  herdam isso automaticamente ao serem criadas em `app/(main)/blog/`.
- Estilos `prose prose-lg dark:prose-invert max-w-none ...` (mesmo set
  usado em `app/(main)/[slug]/page.tsx:56` e `tool-view.tsx:88`) para
  tipografia do conteúdo do post.
- `next/image` para cover image e blocks de imagem.
- `PAGINATION` em `apps/web/modules/common/constants.ts`.
- `OutputData` type de `@editorjs/editorjs` (já é dep direta) para tipagem
  do JSON do post.
- Padrão de `tool-view.tsx:37` (`await import(\`@/modules/tools/ui/components/${tool}\`)`)
  para resolver dinamicamente o componente real da tool — replicar inline
  no `tool-embed-block-renderer.tsx` (decisão P4: NÃO extrair util agora,
  fora do escopo da Fase 4).
- `tool.link` é o slug usado tanto no path `/tools/[categorySlug]/[tool.link]`
  quanto no nome de arquivo do componente em `modules/tools/ui/components/`.

### Criado nesta fase
- `apps/web/app/(main)/blog/page.tsx` (listagem) → 4.16
- `apps/web/app/(main)/blog/[slug]/page.tsx` (detail) → 4.17
- `apps/web/modules/blog/ui/components/post-card.tsx` → 4.1
- `apps/web/modules/blog/ui/components/post-filter-bar.tsx` (client + nuqs) → 4.2
- `apps/web/modules/blog/ui/components/featured-posts-section.tsx` → 4.3
- `apps/web/modules/blog/ui/components/blog-pagination.tsx` (client) → 4.14
- `apps/web/modules/blog/blog-params.tsx` (nuqs loader) → 4.15
- `apps/web/modules/blog/ui/components/post-content-renderer.tsx` (RSC; switch por bloco) → 4.13
- `apps/web/modules/blog/ui/components/blocks/header-block.tsx` → 4.4
- `apps/web/modules/blog/ui/components/blocks/paragraph-block.tsx` → 4.5
- `apps/web/modules/blog/ui/components/blocks/list-block.tsx` → 4.6
- `apps/web/modules/blog/ui/components/blocks/quote-block.tsx` → 4.7
- `apps/web/modules/blog/ui/components/blocks/embed-block.tsx` → 4.8
- `apps/web/modules/blog/ui/components/blocks/table-block.tsx` → 4.9
- `apps/web/modules/blog/ui/components/blocks/checklist-block.tsx` → 4.10
- `apps/web/modules/blog/ui/components/blocks/image-block.tsx` → 4.11
- `apps/web/modules/blog/ui/components/blocks/tool-embed-block-renderer.tsx` → 4.12

### Extraído de código existente
Nenhuma extração nesta fase (decisão P4 = B: deixar lógica de
`resolveToolComponent` inline no novo `tool-embed-block-renderer.tsx`,
sem mexer em `tool-view.tsx`).

## Micro-tarefas (arquivos desta pasta)

| ID | Tipo | depends_on | Arquivo |
|----|------|------------|---------|
| 4.1 | criar | — | `4.1-criar-post-card.md` |
| 4.2 | criar | — | `4.2-criar-post-filter-bar.md` |
| 4.3 | criar | — | `4.3-criar-featured-posts-section.md` |
| 4.4 | criar | — | `4.4-criar-bloco-header.md` |
| 4.5 | criar | — | `4.5-criar-bloco-paragraph.md` |
| 4.6 | criar | — | `4.6-criar-bloco-list.md` |
| 4.7 | criar | — | `4.7-criar-bloco-quote.md` |
| 4.8 | criar | — | `4.8-criar-bloco-embed.md` |
| 4.9 | criar | — | `4.9-criar-bloco-table.md` |
| 4.10 | criar | — | `4.10-criar-bloco-checklist.md` |
| 4.11 | criar | — | `4.11-criar-bloco-image.md` |
| 4.12 | criar | — | `4.12-criar-bloco-tool-embed-renderer.md` |
| 4.13 | criar | 4.4, 4.5, 4.6, 4.7, 4.8, 4.9, 4.10, 4.11, 4.12 | `4.13-criar-post-content-renderer.md` |
| 4.14 | criar | — | `4.14-criar-blog-pagination.md` |
| 4.15 | criar | — | `4.15-criar-blog-params.md` |
| 4.16 | criar | 4.1, 4.2, 4.3, 4.14, 4.15 | `4.16-criar-blog-page.md` |
| 4.17 | criar | 4.1, 4.13 | `4.17-criar-blog-slug-page.md` |

## Ondas de execução paralela

- **Onda 1** (sem deps): 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 4.9, 4.10, 4.11, 4.12, 4.14, 4.15
- **Onda 2** (após onda 1): 4.13, 4.16
- **Onda 3** (após onda 2): 4.17

Regra: dentro de cada onda, tasks podem rodar em paralelo via subagentes.
Entre ondas, aguardar todas concluírem.

> **Nota de consistência.** Esta lista é **derivada** dos `depends_on`
> declarados nos arquivos de task — serve como conveniência para leitura
> humana. Em caso de divergência (task editada sem atualizar este index),
> **o grafo dos arquivos individuais é a fonte da verdade**. O executor
> deve recalcular ondas a partir dos `depends_on` de cada arquivo, não
> confiar cegamente no texto acima.

## Decisões

**P1** — Estratégia de render Editor.js JSON → React: lib pronta
(`editorjs-html`) vs renderer custom?
→ Resposta: **A** (renderer React custom).
→ Impacto: cada bloco vira um componente React próprio (4.4–4.12); o
   despachante (4.13) faz `switch` por `block.type`. Necessário para
   suportar Tool Embed reutilizando o componente real da tool — uma lib
   pronta não dá esse controle.

**P2** — `post-content-renderer.tsx` server component (RSC) ou client?
→ Resposta: **A** (server component / RSC).
→ Impacto: 4.13 e os blocks 4.4–4.12 são server components por padrão
   (sem `"use client"`); SEO e bundle melhores; compatível com `await
   import` dinâmico no Tool Embed (4.12) que renderiza o componente real
   da tool (que é client component, mas pode ser usado a partir de RSC).

**P3** — Estrutura: arquivo único com switch vs sub-arquivos por bloco?
→ Resposta: **A** (sub-arquivos em `blocks/`).
→ Impacto: cada block vira um arquivo, conforme tabela acima. O renderer
   principal (4.13) só faz despacho. Coerente com o que o plano original
   já listava em "Arquivos que serão criados ou modificados".

**P4** — Extrair `resolveToolComponent(toolLink)` antes de usar (vs inline
no Tool Embed renderer)?
→ Resposta: **B** (NÃO extrair — manter inline em 4.12).
→ Impacto: 4.12 replica o padrão `await import(\`@/modules/tools/ui/components/${tool.link}\`)`
   diretamente, sem tocar `tool-view.tsx`. Extração fica para uma fase
   futura quando houver 3+ consumidores. Mantém escopo da Fase 4.

**P5** — Embed (YouTube/Vimeo/etc.): whitelist mínima vs todos providers
padrão do Editor.js?
→ Resposta: **A** (todos providers padrão).
→ Impacto: 4.8 (embed-block) renderiza `<iframe>` a partir do `embed`
   field no JSON salvo pelo `@editorjs/embed` (que já faz a normalização
   do URL no admin). Aplicar `sandbox` e `allow` mínimos em 4.8.

**P6** — `post-filter-bar`: client component com nuqs vs `<form action>` +
searchParams puro?
→ Resposta: **A** (client component com nuqs).
→ Impacto: 4.2 é `"use client"` e usa `useQueryStates` apontando para o
   loader 4.15 (`blog-params.tsx`). Consistente com o admin. A página
   server (`blog/page.tsx`, 4.16) lê os mesmos params via `searchParams`
   prop (Next 16) sem precisar de hook — basta parsear com o mesmo
   loader em `parseAsX.parseServerSide(...)` ou aceitar diretamente.

**P7** — Paginação: estilo simples (prev/next) vs numerada?
→ Resposta: **A** (prev/next simples).
→ Impacto: 4.14 espelha `posts-entity-components.tsx:PostsPaginationBar`
   (admin) — só prev/next + "Page X of Y". Adapta para usar nuqs ao
   invés de prop drill (já que é client + a página inteira é server).

**P8** — `revalidate: 60` aplicado também em `/blog/[slug]`?
→ Resposta: **A** (sim, aplicar nas duas).
→ Impacto: tanto 4.16 quanto 4.17 envolvem o fetch em `unstable_cache`
   com `{ revalidate: 60 }`. 4.16 com tag `["blog"]`; 4.17 com
   `["blog", \`blog:${slug}\`]`. Resolve risco de post agendado nunca
   aparecer no detail caso o tag dispatch falhe.
