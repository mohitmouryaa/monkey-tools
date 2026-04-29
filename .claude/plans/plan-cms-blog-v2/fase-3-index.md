---
phase: 3
plan_file: plan-cms-blog-v2.md
exploded_at: 2026-04-28
---

# Fase 3 — Admin UI (`/dashboard/posts`)

## Objetivo
Admin completa para CRUD de posts: listagem com busca/filtro por status, criar, editar, deletar.

## Critério de conclusão
Logado como admin, em `/dashboard/posts` é possível criar um post completo (com cover image, tools associadas, conteúdo Editor.js incluindo um Tool Embed), salvar como rascunho, publicar, e ver na listagem `/blog`.

## Regra de escopo desta fase (decisão do usuário)

**Blog é admin-only. NÃO reaproveitar componentes/hooks/utilitários do contexto público nem dos outros recursos do dashboard:**

- NÃO usar `EntityContainer / EntityHeader / EntitySearch / EntityPagination / EntityList / EntityItem / EmptyView` de `apps/web/modules/common/ui/components/entity-components.tsx`.
- NÃO usar `useEntitySearch` de `apps/web/modules/common/hooks/use-entity-search.tsx`.
- NÃO usar `prefetchTools` etc. de `apps/web/modules/common/prefetch.ts`.
- NÃO usar `useFileUpload` de `apps/web/modules/common/hooks/use-file-upload.tsx`.
- NÃO reusar `page-seo-fields.tsx`.
- NÃO criar/usar `tools-params.tsx` / `params-loader.tsx` compartilhado.

Em vez disso: **criar análogos dedicados** dentro de `apps/web/modules/dashboard/` (e/ou em pastas novas como `apps/web/modules/dashboard/posts/`) com código próprio. Visualmente/comportamentalmente espelhe o padrão atual, mas o código é dedicado ao admin de posts.

## Reuso identificado

### Reutilizado (já existe e PODE ser usado nesta fase)
- `packages/ui` shadcn: `Button`, `Input`, `Textarea`, `Switch`, `Select`, `Card`, `Form`, `Badge`, `Popover`, `Command`, `Empty`, `DropdownMenu`, `Sidebar`, `Skeleton` — primitives genéricos.
- `cmdk` em `packages/ui/package.json` (para multi-select via Popover+Command).
- `date-fns` em `apps/web/package.json` (formatação de datas no DatePicker).
- `useTRPC()` em `apps/web/trpc/client.tsx`.
- `useQueryClient` (TanStack Query) — usado dentro do plugin Tool Embed para `fetchQuery`.
- `requireAuth` em `apps/web/lib/auth-utils` (server actions de proteção das pages).
- `HydrateClient`, `prefetch`, `caller`, `trpc` server-side em `apps/web/trpc/server.tsx`.
- `SuspenseLoader` em `apps/web/modules/common/ui/components/suspense-loader.tsx` (loader genérico, não específico de listagem).
- `next/dynamic` para SSR-off do Editor.js.
- `postsRouter` (tRPC posts.* já criado na Fase 2).
- `createPostSchema` / `updatePostSchema` em `apps/web/modules/dashboard/schema/post.tsx` (será ajustado em 3.0b).
- `POST /api/upload` aceita `prefix: "cms"` (Fase 2).
- `tools.getMany` em `toolsRouter` para popular multi-select e Tool Embed.

### Criado nesta fase
- `apps/web/modules/dashboard/posts/posts-params.tsx` — params nuqs dedicados (page/pageSize/search/status). Análogo dedicado, NÃO reusa `tool-params.tsx`.
- `apps/web/modules/dashboard/posts/server/params-loader.tsx` — `createLoader(postsParams)` dedicado.
- `apps/web/modules/dashboard/posts/server/prefetch.ts` — `prefetchPosts(params)` e `prefetchPost(id)` dedicados.
- `apps/web/modules/dashboard/posts/ui/posts-entity-components.tsx` — versões dedicadas de `PostsContainer`, `PostsHeader`, `PostsSearch`, `PostsPagination`, `PostsList`, `PostsItem`, `PostsEmpty`. Código próprio.
- `apps/web/modules/dashboard/hooks/use-posts-params.tsx` — hook nuqs dedicado para postsParams.
- `apps/web/modules/dashboard/hooks/use-posts-search.tsx` — análogo dedicado de `useEntitySearch`.
- `apps/web/modules/dashboard/hooks/use-suspense-posts.tsx`, `use-post-by-id.tsx`, `use-create-post.tsx`, `use-update-post.tsx`, `use-remove-post.tsx`.
- `apps/web/modules/dashboard/hooks/use-post-file-upload.tsx` — uploader S3 dedicado (prefix `cms` hardcoded). Análogo dedicado de `useFileUpload`.
- `packages/ui/src/components/calendar.tsx` — componente shadcn `<Calendar>` (react-day-picker).
- `packages/ui/src/components/date-picker.tsx` — `<DatePicker>` (Popover+Calendar).
- `apps/web/modules/dashboard/ui/components/post-seo-fields.tsx` — dedicado, NÃO reusa `page-seo-fields.tsx` (escopo diferente: `seo.title/description/ogImage` em sub-objeto).
- `apps/web/modules/dashboard/ui/components/post-tools-multi-select.tsx` — Popover + Command com checkboxes e busca para selecionar múltiplas tools.
- `apps/web/modules/dashboard/ui/components/editor-js/index.tsx` — wrapper React client-only do Editor.js.
- `apps/web/modules/dashboard/ui/components/editor-js/tool-embed-block.tsx` — plugin custom Editor.js para tool embeds.
- `apps/web/modules/dashboard/ui/components/post-form.tsx` — formulário completo de post.
- `apps/web/modules/dashboard/ui/components/posts-container.tsx`, `posts-header.tsx`, `posts-search.tsx`, `posts-pagination.tsx` — wrappers usando os entity-components dedicados.
- `apps/web/modules/dashboard/ui/views/posts-view.tsx`, `create-post-view.tsx`, `edit-post-view.tsx`.
- `apps/web/app/dashboard/posts/page.tsx`, `new/page.tsx`, `[id]/page.tsx`.

### Extraído de código existente
- Nada nesta fase. Tudo é criação dedicada (regra de não-reuso).

### Modificado
- `apps/web/modules/dashboard/schema/post.tsx` — adicionar `superRefine` para validar `coverImage` obrigatório só em SCHEDULED/PUBLISHED (P6).
- `apps/web/modules/dashboard/ui/components/app-sidebar.tsx` — adicionar entrada "Posts" com ícone `Newspaper`.
- `apps/web/package.json` — adicionar deps Editor.js + `react-day-picker`.

### Decisão explícita: NÃO modificar
- `apps/web/modules/dashboard/ui/views/index.ts` — **arquivo NÃO existe**; padrão atual do projeto é importar views diretamente. Plano original mencionava criar `views/index.ts`; **ignorado por consistência (P4 = A)**.

## Micro-tarefas (arquivos desta pasta)

| ID | Tipo | depends_on | Arquivo |
|----|------|------------|---------|
| 3.0a | modificar | — | `3.0a-instalar-deps-editor-day-picker.md` |
| 3.0b | modificar | — | `3.0b-ajustar-schema-cover-condicional.md` |
| 3.1a | criar | — | `3.1a-criar-posts-params.md` |
| 3.1b | criar | 3.1a | `3.1b-criar-use-posts-params.md` |
| 3.1c | criar | 3.1a | `3.1c-criar-posts-params-loader.md` |
| 3.1d | criar | 3.1b | `3.1d-criar-use-posts-search.md` |
| 3.2a | criar | — | `3.2a-criar-posts-entity-components.md` |
| 3.2b | criar | — | `3.2b-criar-posts-prefetch.md` |
| 3.3a | criar | 3.1b | `3.3a-criar-use-suspense-posts.md` |
| 3.3b | criar | — | `3.3b-criar-use-post-by-id.md` |
| 3.3c | criar | — | `3.3c-criar-use-create-post.md` |
| 3.3d | criar | — | `3.3d-criar-use-update-post.md` |
| 3.3e | criar | — | `3.3e-criar-use-remove-post.md` |
| 3.3f | criar | — | `3.3f-criar-use-post-file-upload.md` |
| 3.4a | criar | 3.0a | `3.4a-criar-calendar-shadcn.md` |
| 3.4b | criar | 3.4a | `3.4b-criar-date-picker.md` |
| 3.5a | criar | — | `3.5a-criar-post-seo-fields.md` |
| 3.5b | criar | — | `3.5b-criar-post-tools-multi-select.md` |
| 3.6a | criar | 3.0a | `3.6a-criar-editor-js-wrapper.md` |
| 3.6b | criar | 3.0a | `3.6b-criar-tool-embed-block.md` |
| 3.7 | criar | 3.0b, 3.3c, 3.3d, 3.3f, 3.4b, 3.5a, 3.5b, 3.6a, 3.6b | `3.7-criar-post-form.md` |
| 3.8a | criar | 3.2a | `3.8a-criar-posts-container.md` |
| 3.8b | criar | 3.2a | `3.8b-criar-posts-header.md` |
| 3.8c | criar | 3.1d, 3.2a | `3.8c-criar-posts-search.md` |
| 3.8d | criar | 3.1b, 3.2a, 3.3a | `3.8d-criar-posts-pagination.md` |
| 3.9a | criar | 3.2a, 3.3a, 3.3e | `3.9a-criar-posts-view.md` |
| 3.9b | criar | 3.7 | `3.9b-criar-create-post-view.md` |
| 3.9c | criar | 3.3b, 3.7, 3.3d | `3.9c-criar-edit-post-view.md` |
| 3.10a | criar | 3.1c, 3.2b, 3.8a, 3.8b, 3.8c, 3.8d, 3.9a | `3.10a-criar-posts-page.md` |
| 3.10b | criar | 3.9b | `3.10b-criar-new-post-page.md` |
| 3.10c | criar | 3.9c | `3.10c-criar-edit-post-page.md` |
| 3.11 | modificar | — | `3.11-adicionar-sidebar-posts-entry.md` |

## Ondas de execução paralela

Recalculadas a partir dos `depends_on` declarados em cada arquivo de task.

- **Onda 1** (sem deps): 3.0a, 3.0b, 3.1a, 3.2a, 3.2b, 3.3b, 3.3c, 3.3d, 3.3e, 3.3f, 3.5a, 3.5b, 3.11
- **Onda 2** (após 1): 3.1b, 3.1c, 3.4a, 3.6a, 3.6b
- **Onda 3** (após 2): 3.1d, 3.3a, 3.4b, 3.8a, 3.8b
- **Onda 4** (após 3): 3.7, 3.8c, 3.8d, 3.9a
- **Onda 5** (após 4): 3.9b, 3.9c
- **Onda 6** (após 5): 3.10a, 3.10b, 3.10c

> **Nota de consistência.** Esta lista é **derivada** dos `depends_on` declarados nos arquivos de task — serve como conveniência para leitura humana. Em caso de divergência (task editada sem atualizar este index), **o grafo dos arquivos individuais é a fonte da verdade**. O executor deve recalcular ondas a partir dos `depends_on` de cada arquivo, não confiar cegamente no texto acima.

## Decisões

**P1 — Hook de upload de imagem do Editor.js (e cover do post)**
→ Resposta: NOVO. Criar `use-post-file-upload.tsx` DEDICADO em `apps/web/modules/dashboard/hooks/`. NÃO reusar `useFileUpload` existente.
→ Impacto: 3.3f cria hook próprio que internamente chama `POST /api/upload` com `prefix: "cms"` hardcoded. 3.6a/3.7 consomem este hook.

**P2 — DatePicker do `publishedAt`**
→ Resposta: B. Instalar `react-day-picker` + adicionar `<Calendar>` shadcn em `packages/ui` e criar `<DatePicker>` (Popover+Calendar).
→ Impacto: 3.0a instala dep; 3.4a cria `calendar.tsx`; 3.4b cria `date-picker.tsx`; 3.7 usa no campo `publishedAt`.

**P3 — Sub-form de SEO do post**
→ Resposta: A. Criar `post-seo-fields.tsx` dedicado. NÃO reusar `page-seo-fields.tsx`.
→ Impacto: 3.5a cria componente próprio com campos `seo.title`, `seo.description`, `seo.ogImage` (sub-objeto, names com prefixo `seo.`). 3.7 consome.

**P4 — `views/index.ts`**
→ Resposta: A. Ignorar pedido do plano. Manter consistência com código atual (imports diretos das views).
→ Impacto: nenhuma task gera `views/index.ts`. 3.10a/b/c importam `posts-view`, `create-post-view`, `edit-post-view` diretamente do path completo.

**P5 — Multi-select de tools**
→ Resposta: A. Popover + Command (cmdk) com checkboxes e busca.
→ Impacto: 3.5b cria `post-tools-multi-select.tsx` consumindo `Popover` + `Command` shadcn (já em `packages/ui`). Recebe `value: string[]`, `onChange: (ids: string[]) => void`, busca via `tools.getMany`.

**P6 — `coverImage` obrigatório só em SCHEDULED/PUBLISHED**
→ Resposta: A. Ajustar `createPostSchema`/`updatePostSchema` com `superRefine` para validar coverImage condicional.
→ Impacto: 3.0b modifica `apps/web/modules/dashboard/schema/post.tsx`. Em DRAFT, `coverImage` aceita string vazia. ATENÇÃO ao impacto na Fase 2: o servidor (`postsRouter`) valida via `createPostSchema` — esta mudança relaxa a validação no servidor para DRAFT também (consistente).

**P7 — Carregamento de tools dentro do plugin Tool Embed**
→ Resposta: C. Usar `queryClient.fetchQuery` (TanStack Query client direto). Editor.js renderiza em DOM imperativo, não em árvore React.
→ Impacto: 3.6b implementa o plugin Tool Embed acessando o queryClient via prop/closure repassada do wrapper React (3.6a recebe `queryClient` via `useQueryClient()` e injeta na config do plugin). O plugin chama `queryClient.fetchQuery(trpc.tools.getMany.queryOptions({ pageSize: 100 }))` dentro do `render()`.

## Restrições e armadilhas conhecidas

1. **Editor.js + Next 16 + React 19**: SSR é incompatível. Sempre `next/dynamic({ ssr: false })` para wrapper. Inicializar instância em `useEffect`, destruir em cleanup.
2. **Plugin Tool Embed**: protocolo Editor.js exige classe com `static get toolbox()`, `constructor({ data, api, config })`, `render()`, `save()`, opcionalmente `validate()`. Persistir `{ toolId: string }` no JSON.
3. **`unstable_cache` vs Cache Components**: a Fase 2 usou `updateTag` (Cache Components). A Fase 3 não toca em cache; basta consumir a API. Se vir mismatch, reportar.
4. **`postsRouter.list` retorna shape `{ items, page, pageSize, totalCount, totalPages, hasNextPage, hasPreviousPage }`** — consumir esse shape nos hooks/components dedicados.
5. **Image plugin do Editor.js** espera resposta no formato `{ success: 1, file: { url } }`. O `POST /api/upload` atual retorna `{ url, fileKey }` (presigned URL para o navegador fazer PUT direto no S3). Estratégia: o **Image plugin do Editor.js precisa de um `uploader` customizado** que (1) chame `/api/upload`, (2) faça `PUT` no `url` retornado, (3) construa a URL pública final do S3 a partir do `fileKey` e retorne `{ success: 1, file: { url: publicUrl } }`. Esse uploader fica dentro de 3.6a (config do Image plugin) e usa o `use-post-file-upload.tsx` (3.3f) para abstrair o fluxo presigned-PUT.
6. **URL pública do S3**: a Fase 2 não cria helper para "fileKey → URL pública". Hoje o frontend assume que fica acessível pelo bucket público. Conferir como é construída em outros usos (`uploads/`). Se não houver helper, o `use-post-file-upload.tsx` deve concatenar `${process.env.NEXT_PUBLIC_S3_PUBLIC_URL}/${fileKey}` ou expor a partir do response. **Se ambíguo na execução, PARAR e perguntar.**
