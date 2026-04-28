# Plano: CMS de Blog integrado ao monkey-tool

> Versão: v2 | Criado em: 2026-04-28 | Status: draft
> Revisado por subagente | 6 sugestões incorporadas, 0 ignoradas

## Contexto

Adicionar um CMS de blog simples ao monorepo `monkey-tool` (Next.js 16 + tRPC v11 + Mongoose/Typegoose + MongoDB + BullMQ + S3) para publicar artigos em `/blog`, principalmente para explicar cada tool da plataforma. Cada tool poderá apresentar um post em destaque numa seção "Aprenda mais" da sua página pública.

Decisões de produto fechadas em quatro rodadas com o usuário:

- **Post é entidade independente** (não derivada da Tool); relacionamento Post ↔ Tool é N:N.
- **Tool ganha campo `featuredPostId`** (referência opcional a UM post em destaque).
- Sem multi-idioma (só pt-BR). Sem campo author (post é "do site").
- **Conteúdo em Editor.js** (JSON) com blocks built-in (Header, Paragraph, List, Quote, Embed, Table, Checklist), **Image** (upload S3) e custom block **Tool Embed** (renderiza CTA real da tool dentro do artigo).
- **Renderização: Static + revalidate on-demand via tag** (`unstable_cache` + `revalidateTag`), tag por slug (`blog:${slug}`) e tag global (`blog`).
- Admin **dentro do `/dashboard` existente** (nova rota `/dashboard/posts`), seguindo padrão dos outros recursos do dashboard.
- Hard delete inicialmente (soft delete listado em pontos abertos).

## Stack & Convenções

- **Monorepo**: pnpm + TurboRepo. Pacotes: `apps/web`, `apps/worker`, `packages/database` (Typegoose), `packages/types` (Zod/enums), `packages/storage` (S3 helpers), `packages/queue` (BullMQ + rate limit), `packages/ui` (shadcn).
- **Database**: MongoDB via Mongoose 9 + Typegoose 13. Models em `packages/database/src/models/<Entity>.ts` com export do model singleton (padrão `getModelForClass(...)` + reaproveitamento de `mongoose.models.X`). Re-export em `packages/database/src/index.ts`.
- **Tipos compartilhados**: `packages/types/src/<dominio>.ts` re-exportados em `index.ts`. Enums em PascalCase (ex: `PageType`).
- **API**: tRPC v11 com SuperJSON. Routers em `apps/web/trpc/routers/<entity>Router.ts`, registrados em `_app.ts`. `baseProcedure` para queries públicas, `protectedProcedure` para mutations. `caller` server-side em `apps/web/trpc/server.tsx`.
- **Auth**: Better Auth com Mongo adapter (`/api/auth/[...all]`).
- **Forms**: React Hook Form + Zod resolvers + `packages/ui` (shadcn). Schemas e tipos co-localizados em `apps/web/modules/dashboard/schema/<entity>.tsx`.
- **Hooks de mutation/query**: `apps/web/modules/dashboard/hooks/use-*.tsx` usando `useTRPC().<router>.<proc>.mutationOptions()/queryOptions()` + TanStack Query.
- **Componentes**: `apps/web/modules/dashboard/ui/components/` para forms/listagens internos; `views/` para containers de página.
- **App router**:
  - Páginas públicas em `apps/web/app/(main)/...`
  - Dashboard em `apps/web/app/dashboard/...`
- **Upload S3**: presigned URL via `POST /api/upload` (existente). `getUploadUrl(key, contentType)` em `@workspace/storage`. Bucket único `DO_SPACES_BUCKET`, prefixos por uso (`uploads/`, `cms/`).
- **Cache**: o plano usa `unstable_cache` + `revalidateTag` por consistência com a base atual do projeto. Migração para Cache Components do Next 16 (`use cache`, `cacheTag`, `cacheLife`) está fora de escopo deste plano e fica como ponto aberto. Caso o time decida migrar antes da implementação desta entrega, todas as fases de cache (Fase 4 e Fase 6) precisam ser revisadas.
- **Style**: Biome — 2 espaços, double quotes, 130 colunas. Imports manuais (organize-imports off).
- **Convenção de nomes**: arquivos em kebab-case, models PascalCase, schemas Zod camelCase.

## Premissas

1. **Gating de admin**: o deploy atual considera "todo usuário logado pode usar o admin" — `protectedProcedure` é suficiente para o CMS. Caso registro público venha a existir, será necessário adicionar role check nas mutations do `postsRouter` antes do go-live (sinalizado também em pontos abertos).
2. O bucket S3 `DO_SPACES_BUCKET` aceita objetos públicos (`ACL: public-read`) e o `DO_SPACES_ENDPOINT` retorna URL pública navegável (já é o caso do upload de jobs).
3. MongoDB local (replica set via `docker-compose.yml`) e Redis estão de pé durante dev (CLAUDE.md já cobre).
4. Editor.js + plugins oficiais (`@editorjs/editorjs`, `@editorjs/header`, etc.) podem ser carregados client-only no admin (Next 16 + React 19 são compatíveis com componentes dinâmicos `next/dynamic`).
5. **Editor.js é client-only**: não é renderizável em SSR. Por isso, a renderização pública (Fase 4) NÃO usa o runtime do Editor.js — usa um renderer React próprio que mapeia o JSON de blocks para componentes React server-friendly. Cada block suportado precisa de renderer próprio.
6. Não há requisito de URL prefixada por idioma — `/blog` e `/blog/[slug]` são as URLs canônicas em pt-BR.
7. Posts agendados não exigem job em background no v1: a query de listagem filtra `publishedAt <= now`. Para a janela exata de aparição valer, a rota `/blog` usa `cacheLife`/`revalidate` curto (definido na Fase 4) como fallback ao `revalidateTag`.
8. Imagens do CMS ficam no mesmo bucket dos uploads de jobs com prefixo `cms/`, evitando nova env var.
9. **Página pública da Tool**: a rota correta da página de uma tool não é `/[slug]` (esse arquivo renderiza CMS de Page). A rota de Tool é resolvida em `apps/web/app/(main)/ferramentas/...` (estrutura `/ferramentas/[toolCategory]/[tool]/page.tsx`). A Fase 5 deve confirmar a rota exata via inspeção antes de editar.
10. A página pública da Tool atualmente **não** está envolvida em `unstable_cache` com tag dedicada. A Fase 5/6 inclui adicionar esse cache antes que `revalidateTag("tool:...")` faça efeito.

## Fora de escopo

- Multi-idioma / i18n de posts.
- Soft delete (planejado hard delete inicial; fica registrado como ponto aberto).
- Comentários, reações, newsletter, RSS feed.
- Editor visual WYSIWYG alternativo ao Editor.js (TipTap já existe no projeto para outras superfícies, mas não será usado para posts).
- Analytics/contagem de visualizações por post.
- Workflow de revisão (rascunho → review → publicado); só `draft | scheduled | published` direto.
- Migration script formal — MongoDB é schemaless; serão definidos índices no Typegoose e basta deploy.
- Cron job para "ativar" posts agendados em tempo real (decisão: filtragem por query no v1).
- Rich diff / histórico de versões de posts.
- Integração com worker BullMQ — CMS é 100% síncrono via tRPC.
- Migração para Cache Components do Next 16 (`use cache`, `cacheTag`, `cacheLife`) — usaremos `unstable_cache` (consistente com o resto do projeto).
- Implementação de role-based gating (admin vs user) — o deploy atual trata todo logado como admin. Se mudar, é uma entrega separada.

## Fases de implementação

### Fase 1 — Schema e tipos (database + types) ✅
**Objetivo:** Modelos persistentes do Post, alteração da Tool com `featuredPostId`, schemas Zod compartilhados, índices definidos.
**Critério de conclusão:** `pnpm --filter @workspace/database build` e `pnpm --filter @workspace/types build` passam; `import { PostModel, type Post } from "@workspace/database"` e `import { PostStatus } from "@workspace/types"` funcionam em `apps/web`.

#### 1.1 — Adicionar enum `PostStatus` em `packages/types`
**Arquivo:** `packages/types/src/post.ts`
**Depende de:** —
Criar enum `PostStatus { DRAFT = "draft", SCHEDULED = "scheduled", PUBLISHED = "published" }`. Re-exportar em `packages/types/src/index.ts` na mesma linha de `page.js`/`job-types.js`.
**Feito quando:** `import { PostStatus } from "@workspace/types"` resolve sem erro de tipos no `apps/web`.

#### 1.2 — Criar model `Post` (Typegoose)
**Arquivo:** `packages/database/src/models/Post.ts`
**Depende de:** 1.1
Seguir o padrão de `Tool.ts` (decoradores `@modelOptions` com `timestamps: true`, `collection: "posts"`, `Severity.ALLOW` por causa do `content: Mixed`, `customName: "Post"`, getter idempotente `mongoose.models.Post ?? getModelForClass(Post)`).

Campos obrigatórios:
- `title: string` (required, minlength 2)
- `slug: string` (required, unique, index)
- `excerpt: string` (required, minlength 1)
- `coverImage: string` (required — URL do S3)
- `content: object` (Mixed, required — JSON do Editor.js, usar `@prop({ type: () => Object })`)
- `status: PostStatus` (enum, index, default `DRAFT`)
- `publishedAt: Date` (optional, index)
- `isFeaturedGlobal: boolean` (default false)
- `tools: Ref<Tool>[]` (`@prop({ ref: () => Tool, type: () => [mongoose.Schema.Types.ObjectId], default: [] })`)
- `seo: { title?, description?, ogImage? }` (sub-objeto opcional via `@prop({ type: () => Object })`)
- `createdAt`, `updatedAt` automáticos

Índices adicionais (em `@modelOptions` ou via método estático `schema.index`):
- compound `{ status: 1, publishedAt: -1 }` para listagem cronológica filtrada
- text index em `{ title: "text", excerpt: "text" }` para busca textual

**Feito quando:** `mongoose.connection.collection("posts").indexes()` numa instância dev mostra os 3 índices (slug unique, status+publishedAt, text).

#### 1.3 — Adicionar `featuredPostId` em `Tool`
**Arquivo:** `packages/database/src/models/Tool.ts`
**Depende de:** 1.2
Adicionar `@prop({ ref: () => Post, type: () => mongoose.Schema.Types.ObjectId, default: null }) public featuredPostId?: Ref<Post> | null;` no model `Tool`. Importar `Post` do mesmo diretório. Importar `mongoose` (já é importado).
**Feito quando:** Pode-se fazer `ToolModel.findById(...).populate("featuredPostId")` retornando o post.

#### 1.4 — Re-exportar `Post` no índice do package
**Arquivo:** `packages/database/src/index.ts`
**Depende de:** 1.2
Adicionar `export * from "./models/Post.js";` na lista existente.
**Feito quando:** `import { PostModel, type Post } from "@workspace/database"` resolve em `apps/web`.

#### 1.5 — Schema Zod do Post (admin form)
**Arquivo:** `apps/web/modules/dashboard/schema/post.tsx`
**Depende de:** 1.1
Criar `createPostSchema` (Zod) — paralelo a `createCustomPageSchema` em `page.tsx`. Campos:
- `title` (min 1)
- `slug` (regex `/^[a-z0-9-]+$/`, min 1)
- `excerpt` (min 1)
- `coverImage` (URL string, min 1)
- `content` (objeto, validado como `z.record(z.string(), z.any())` — JSON do Editor.js)
- `status` (`z.nativeEnum(PostStatus)`)
- `publishedAt` (`z.date().optional()`)
- `isFeaturedGlobal` (boolean, default false)
- `toolIds` (`z.array(z.string()).default([])`)
- `seo: { title?, description?, ogImage? }` (objeto opcional, todos opcionais)

Exportar `updatePostSchema = createPostSchema.extend({ id: z.string().min(1) })` e tipos inferidos.

**Feito quando:** Compila sem erro e tipos são consumíveis pelo form.

---

### Fase 2 — tRPC `postsRouter` + endpoint de upload de imagem ✅

> ⚠️ Esta fase tem "decisão de reuso de upload S3 (reutilizar `/api/upload` com prefixo cms/ vs criar `/api/upload/cms`) que envolve inventariar o código" e definição de assinaturas de procedures que precisam casar com hooks futuros. Execute `/explode-phase 2` antes.

**Objetivo:** API completa para CRUD de posts (admin) e leitura pública (blog). Upload de imagens do Editor.js funcional.
**Critério de conclusão:** Manualmente, no painel tRPC ou via curl: criar post, listar com filtros, buscar por slug, atualizar, deletar, publicar/agendar. Endpoint de upload retorna `{ success: 1, file: { url } }` no formato esperado pelo Editor.js Image plugin. **`posts.list` retorna shape `{ items, page, pageSize, totalCount, totalPages, hasNextPage, hasPreviousPage }` — espelhando o padrão de `tools.getMany`** (consumido pelos hooks da Fase 3).

- [x] Criar `apps/web/trpc/routers/postsRouter.ts` com procedures:
  - `list` (baseProcedure): paginada, filtros opcionais por `status`, `toolId`, `search` (text index), só retorna `published` + `publishedAt <= now` quando sem sessão; admins veem todos.
  - `getBySlug` (baseProcedure): retorna post + tools populadas. Aplica filtro `publishedAt <= now` para não-admins.
  - `getByToolId` (baseProcedure): lista posts associados a uma tool (paginada).
  - `getFeatured` (baseProcedure): retorna posts com `isFeaturedGlobal: true` + status published.
  - `getById` (protectedProcedure): admin — sem filtro de status.
  - `create`, `update`, `delete` (protectedProcedure): mutations padrão. `delete` é hard delete.
  - Em `update` validar unicidade do slug ao mudar.
  - Em `delete` rodar `ToolModel.updateMany({ featuredPostId: id }, { $unset: { featuredPostId: 1 } })` para evitar referência pendurada.
- [x] Registrar `postsRouter` em `apps/web/trpc/routers/_app.ts` como `posts`.
- [x] Decidir endpoint de upload de imagem para o Editor.js: reutilizar `POST /api/upload` adicionando suporte a prefixo (`cms/`) via parâmetro do body, OU criar `POST /api/upload/cms/route.ts` que reusa `getUploadUrl`. Documentar a escolha aqui antes de implementar. → **Escolha: reutilizar `/api/upload` com `prefix` opcional (allowlist `["uploads", "cms"]`).**
- [x] Adicionar configuração de rate limit em `proxy.ts` para `/api/upload/cms` se for criado endpoint dedicado (reusar tier `upload`). → **N/A: rota `/api/upload` única já coberta por `proxy.ts:38`.**
- [x] Garantir que mutations de write (create/update/delete + publish) chamem `revalidateTag("blog")` e `revalidateTag(\`blog:${slug}\`)` — pode ser via `next/cache` import nas próprias procedures (tRPC roda no server) ou helper compartilhado da Fase 6. → **Implementado com `updateTag` (Next 16 Cache Components — assinatura nova de `revalidateTag` exige profile; `updateTag` é o substituto idiomático para mutations).**

---

### Fase 3 — Admin UI (`/dashboard/posts`) ✅

> ⚠️ Esta fase tem "múltiplos componentes a criar (lista, form, editor, plugin custom Tool Embed) com decisões de UI localizadas" e envolve integração com lib externa (Editor.js) cujo padrão de carregamento (`next/dynamic`, SSR-off) precisa ser definido. Execute `/explode-phase 3` antes.

**Objetivo:** Admin completa para CRUD de posts: listagem com busca/filtro por status, criar, editar, deletar.
**Critério de conclusão:** Logado como admin, em `/dashboard/posts` é possível criar um post completo (com cover image, tools associadas, conteúdo Editor.js incluindo um Tool Embed), salvar como rascunho, publicar, e ver na listagem `/blog`.

- [ ] Adicionar entrada "Posts" no `app-sidebar.tsx` (rota `/dashboard/posts`, ícone `lucide-react/Newspaper`).
- [ ] Página `apps/web/app/dashboard/posts/page.tsx` — listagem com paginação + busca + filtro por status.
- [ ] Página `apps/web/app/dashboard/posts/new/page.tsx` — formulário de criação.
- [ ] Página `apps/web/app/dashboard/posts/[id]/page.tsx` — formulário de edição.
- [ ] Componentes: `posts-container.tsx`, `posts-header.tsx`, `posts-pagination.tsx`, `posts-search.tsx`, `post-form.tsx` em `apps/web/modules/dashboard/ui/components/`.
- [ ] Views: `posts-view.tsx`, `create-post-view.tsx`, `edit-post-view.tsx`, exportadas via `views/index.ts`.
- [ ] Hooks: `use-posts.tsx`, `use-suspense-posts.tsx`, `use-post-by-id.tsx`, `use-create-post.tsx`, `use-update-post.tsx`, `use-remove-post.tsx`, `use-posts-params.tsx` em `apps/web/modules/dashboard/hooks/`.
- [ ] Form de post: campos `title` (com auto-slug gerador), `slug` (editável), `excerpt`, `coverImage` (uploader reusando endpoint S3), multi-select de `toolIds`, Editor.js para `content`, sub-form colapsável de SEO, switch `status` + datepicker `publishedAt`, toggle `isFeaturedGlobal`.
- [ ] Integrar Editor.js: instalar `@editorjs/editorjs`, `@editorjs/header`, `@editorjs/list`, `@editorjs/quote`, `@editorjs/embed`, `@editorjs/table`, `@editorjs/checklist`, `@editorjs/image`. Componente wrapper React client-only (`"use client"` + `useEffect` para inicializar/destruir instância). Importar via `next/dynamic` com `ssr: false`.
- [ ] Implementar plugin custom **Tool Embed**: classe que segue o protocolo Editor.js (`render`, `save`, `validate`); persiste `{ toolId: string }` no JSON do post; o `render` mostra um seletor de tool (combobox de `tools.getMany` filtrado).
- [ ] Após salvar/publicar/deletar: hooks chamam invalidação do TanStack Query + a procedure tRPC já chamou `revalidateTag` no servidor.

---

### Fase 4 — Render público (`/blog` e `/blog/[slug]`) ✅

> ⚠️ Esta fase tem "decisão entre lib pronta `editorjs-html` vs renderer React custom (recomendado para suportar o Tool Embed)" e UI da listagem com filtros/busca/featured envolvendo múltiplos componentes a criar/extrair. Execute `/explode-phase 4` antes.

**Objetivo:** Páginas públicas funcionais com SSG + revalidate-on-demand, SEO completo, renderização do JSON do Editor.js (incluindo Tool Embed reutilizando o componente real da tool).
**Critério de conclusão:**
- Acessar `/blog` mostra listagem paginada com posts publicados, seção de featured no topo, filtros por tool e busca textual.
- Acessar `/blog/[slug]` mostra o post renderizado com og tags corretas (fallbacks aplicados), tools relacionadas no rodapé.
- **Cada bloco listado abaixo está mapeado a um componente React e é validado num post de teste contendo TODOS os blocos: Header, Paragraph, List, Quote, Embed, Table, Checklist, Image, Tool Embed.**
- O Tool Embed renderiza o componente real da tool (mesmo módulo usado em `/ferramentas/...`).
- A rota `/blog` usa `cacheLife`/`revalidate` curto (definido nesta fase) como fallback para posts agendados aparecerem mesmo sem dispatch explícito de `revalidateTag`.

- [ ] Página `apps/web/app/(main)/blog/page.tsx` — server component, fetch via `caller.posts.list` + `caller.posts.getFeatured`, com `unstable_cache` taggeado `blog`. Aceita query string `?tool=<id>&q=<search>&page=N` via `searchParams`. **Definir `revalidate: 60` (TTL fallback) na função `unstable_cache`.**
- [ ] Página `apps/web/app/(main)/blog/[slug]/page.tsx` — server component, fetch via `caller.posts.getBySlug` envolvido em `unstable_cache` com tag `blog:${slug}` + `blog`. Implementa `generateMetadata` aplicando fallback (title→post.title, description→post.excerpt, ogImage→post.coverImage).
- [ ] Decidir e implementar renderer JSON→React: criar `apps/web/modules/blog/ui/components/post-content-renderer.tsx` que mapeia cada bloco do Editor.js para um componente React (Header → `<h2>`/`<h3>`, Paragraph → `<p>`, List → `<ul>`/`<ol>`, Quote → `<blockquote>`, Embed → iframe seguro, Table → `<table>`, Checklist → lista com checkboxes desabilitados, Image → `next/image`, Tool Embed → reusa o componente real da tool).
- [ ] Resolver "componente real da tool": inventariar como hoje o `componentName` da Tool é resolvido na rota da tool (`apps/web/app/(main)/ferramentas/...`) e reutilizar a mesma resolução dentro do Tool Embed.
- [ ] Componentes da listagem: `post-card.tsx` (cover, title, excerpt, badges das tools), `post-filter-bar.tsx` (busca + select de tools), `featured-posts-section.tsx`.
- [ ] Tipografia: usar `prose` do Tailwind Typography (já está em uso em outras páginas).

---

### Fase 5 — Cross-link Tool ↔ Post ✅

> ⚠️ Esta fase tem "edição da página da Tool existente para adicionar seção 'Aprenda mais' que precisa harmonizar com o layout atual da tool" — decisão de UI localizada. Execute `/explode-phase 5` antes.

**Objetivo:** Tool exibe seu post em destaque ("Aprenda mais"); admin de Tool tem campo para escolher `featuredPostId`. Página pública da Tool fica envolvida em `unstable_cache` com tag dedicada para suportar revalidação na Fase 6.
**Critério de conclusão:** Logado, em `/dashboard/tools/[id]/edit` é possível setar o post em destaque. Acessando a página pública da tool o post aparece numa seção visível com link para `/blog/[slug]`.

- [ ] **Confirmar a rota correta da página pública da Tool antes de editar** — provavelmente `apps/web/app/(main)/ferramentas/[toolCategory]/[tool]/page.tsx` (atenção: NÃO confundir com `apps/web/app/(main)/[slug]/page.tsx`, que renderiza CMS de Page custom). Se a rota foi reorganizada (ver `git status` mostra arquivos `tools/...` deletados), atualizar este plano com a rota real antes de implementar.
- [ ] Adicionar campo `featuredPostId` (combobox de seleção única) no `tool-form.tsx`, alimentado por `posts.list({ status: published })`.
- [ ] Atualizar `createToolSchema` em `apps/web/modules/dashboard/schema/tool.tsx` com `featuredPostId: z.string().optional().nullable()`.
- [ ] Atualizar `toolsRouter.create`/`update` para gravar `featuredPostId`.
- [ ] **Envolver o fetch da Tool na rota pública com `unstable_cache` e tag `tool:${tool.link}` (ou identificador equivalente).** Sem esse cache, a Fase 6.3 não terá efeito.
- [ ] Renderizar seção "Aprenda mais" com `post-card` na página pública da Tool, populando via `featuredPostId` (popular query do Tool).

---

### Fase 6 — Revalidação on-demand

**Objetivo:** Garantir que invalidação de cache funciona corretamente em todos os pontos de write (create/update/delete) e que setar `featuredPostId` numa tool revalida a página da tool.
**Critério de conclusão:** Editar um post no admin reflete em `/blog/[slug]` no próximo request (sem rebuild). Mudar `featuredPostId` de uma tool reflete na página pública da tool no próximo request.

#### 6.1 — Criar helper de revalidação
**Arquivo:** `apps/web/modules/blog/lib/revalidate.ts`
**Depende de:** Fase 2 e Fase 4
Função `revalidateBlog(slug?: string)` que chama `revalidateTag("blog")` e, se `slug`, `revalidateTag(\`blog:${slug}\`)`.
**Feito quando:** Importável e tipado. Sem efeito colateral além das chamadas a `revalidateTag`.

#### 6.2 — Chamar revalidação nas mutations do `postsRouter`
**Arquivo:** `apps/web/trpc/routers/postsRouter.ts`
**Depende de:** 6.1
Em `create`/`update`/`delete`, após sucesso, invocar `revalidateBlog(post.slug)`. Em `update`, se o slug mudou, revalidar tanto o slug antigo quanto o novo. Em `delete`, após o `updateMany` que limpa `featuredPostId`, também revalidar as tags das tools afetadas (depende de 6.3).
**Feito quando:** Editar um post reflete em `/blog/[slug]` sem dev server reload.

#### 6.3 — Revalidar página da tool ao mudar `featuredPostId`
**Arquivo:** `apps/web/trpc/routers/toolsRouter.ts`
**Depende de:** Fase 5 (cache da Tool já adicionado)
Em `update`, se `featuredPostId` mudou, chamar `revalidateTag(\`tool:${tool.link}\`)` (mesma tag definida na Fase 5). Se a Fase 5 não adicionou esse cache, esta tarefa é no-op — não fazer antes de Fase 5 estar ✅.
**Feito quando:** Mudar `featuredPostId` reflete na página pública da tool sem dev server reload.

## Dependências entre fases

```
Fase 1 (schema)
   └── Fase 2 (tRPC + upload)
          └── Fase 3 (admin UI)
                 └── Fase 4 (render público + cache /blog)
                        └── Fase 5 (cross-link tool↔post + cache da Tool)
                               └── Fase 6 (revalidação — depende dos caches existirem)
```

- Fase 2 pode iniciar assim que Fase 1 estiver mergeada/sincronizada.
- Fase 3 e Fase 4 podem ser desenvolvidas em paralelo após Fase 2, mas Fase 3 facilita criar dados de teste para Fase 4.
- Fase 5 só depois de Fase 4 estar funcional (precisa de posts publicados).
- Fase 6.1 e 6.2 podem ser feitas junto da Fase 2 (chamadas a `revalidateTag`), mas a verificação só faz sentido após Fase 4.
- Fase 6.3 só após Fase 5 (precisa que o `unstable_cache` da Tool esteja em produção com tag).

## Riscos & mitigações

| Risco | Probabilidade | Mitigação |
|-------|--------------|-----------|
| Editor.js + Next.js 16 + React 19 com problemas de SSR | Média | Carregar via `next/dynamic({ ssr: false })`, testar incrementalmente bloco por bloco |
| Plugin Tool Embed quebrar serialização do JSON | Média | Implementar `validate()` rigoroso e testes manuais salvando/recarregando |
| Renderer JSON→React render diferente do que o Editor.js renderiza no admin | Média | Implementar renderer espelhando 1:1 cada block, validar com post de teste contendo TODOS os blocks (ver critério de Fase 4) |
| `unstable_cache` ser legado em Next 16 e exigir migração | Média | Plano usa `unstable_cache` por consistência com base atual; migração para Cache Components fica como ponto aberto |
| Bucket S3 com prefixo `cms/` ficar misturado com `uploads/` de jobs | Baixa | Documentar prefixos. Não usa env nova; lifecycle policies futuras podem separar |
| Posts agendados não "publicarem" automaticamente até receberem revalidate | Média | TTL fallback de 60s na rota `/blog` (Fase 4). V2 pode adicionar cron/BullMQ |
| `featuredPostId` apontando para post deletado | Baixa | Em delete de post, rodar `ToolModel.updateMany({ featuredPostId: id }, { $unset: { featuredPostId: 1 } })` (Fase 2) |
| Slug colidir entre páginas custom (já em `Page.slug`) e posts (`Post.slug`) | Baixa | URLs diferentes (`/[slug]` vs `/blog/[slug]`); coleções separadas. Não há colisão real |
| Busca textual em MongoDB sem text index correto | Baixa | Index em `{ title: text, excerpt: text }` definido na Fase 1 |
| CMS exposto a qualquer usuário logado se `protectedProcedure` for insuficiente | Média | Premissa 1 declara o gating atual. Se mudar, adicionar role check antes do go-live |

## Pontos abertos (definir antes ou durante /explode-phase)

- **Bucket S3 para imagens do CMS**: prefixo `cms/` no bucket atual (recomendado, sem env nova) vs bucket separado.
- **Soft delete vs hard delete**: hard no v1; v2 pode mover para soft com filtro `deletedAt: null`.
- **Lib de render JSON do Editor.js**: renderer React custom (recomendado, dá controle total e necessário para Tool Embed) vs `editorjs-html`.
- **Estratégia de busca textual**: text index do MongoDB (recomendado) vs `$regex`.
- **Schedule publishing**: filtragem por `publishedAt <= now` em queries (recomendado v1) vs BullMQ scheduled job que muda status.
- **Endpoint de upload do Editor.js**: reusar `/api/upload` com parâmetro de prefixo vs criar `/api/upload/cms`.
- **Estratégia de cache no Next 16**: manter `unstable_cache` (decidido aqui) vs migrar para Cache Components (`use cache`, `cacheTag`, `cacheLife`). Migração não está no escopo deste plano.
- **Role-based gating**: necessário antes do go-live se o sistema permitir registro público.
- **TTL fallback exato em `/blog`**: o plano sugere 60s; pode ser ajustado conforme tolerância a posts agendados aparecerem com atraso.

## Arquivos que serão criados ou modificados

### Fase 1
- **Criar**: `packages/types/src/post.ts`
- **Criar**: `packages/database/src/models/Post.ts`
- **Modificar**: `packages/types/src/index.ts` (re-export)
- **Modificar**: `packages/database/src/index.ts` (re-export)
- **Modificar**: `packages/database/src/models/Tool.ts` (campo `featuredPostId`)
- **Criar**: `apps/web/modules/dashboard/schema/post.tsx`

### Fase 2
- **Criar**: `apps/web/trpc/routers/postsRouter.ts`
- **Modificar**: `apps/web/trpc/routers/_app.ts`
- **Criar ou modificar**: `apps/web/app/api/upload/route.ts` ou novo `apps/web/app/api/upload/cms/route.ts`
- **Modificar (talvez)**: `apps/web/proxy.ts` (rate limit do novo endpoint)

### Fase 3
- **Modificar**: `apps/web/modules/dashboard/ui/components/app-sidebar.tsx`
- **Criar**: `apps/web/app/dashboard/posts/page.tsx`
- **Criar**: `apps/web/app/dashboard/posts/new/page.tsx`
- **Criar**: `apps/web/app/dashboard/posts/[id]/page.tsx`
- **Criar**: `apps/web/modules/dashboard/ui/components/posts-container.tsx`, `posts-header.tsx`, `posts-pagination.tsx`, `posts-search.tsx`, `post-form.tsx`
- **Criar**: `apps/web/modules/dashboard/ui/components/editor-js/index.tsx` + `tool-embed-block.tsx`
- **Criar**: `apps/web/modules/dashboard/ui/views/posts-view.tsx`, `create-post-view.tsx`, `edit-post-view.tsx`
- **Modificar**: `apps/web/modules/dashboard/ui/views/index.ts`
- **Criar**: `apps/web/modules/dashboard/hooks/use-posts.tsx`, `use-suspense-posts.tsx`, `use-post-by-id.tsx`, `use-create-post.tsx`, `use-update-post.tsx`, `use-remove-post.tsx`, `use-posts-params.tsx`
- **Modificar**: `apps/web/package.json` (adicionar deps Editor.js)

### Fase 4
- **Criar**: `apps/web/app/(main)/blog/page.tsx`
- **Criar**: `apps/web/app/(main)/blog/[slug]/page.tsx`
- **Criar**: `apps/web/modules/blog/ui/components/post-content-renderer.tsx`
- **Criar**: `apps/web/modules/blog/ui/components/post-card.tsx`
- **Criar**: `apps/web/modules/blog/ui/components/post-filter-bar.tsx`
- **Criar**: `apps/web/modules/blog/ui/components/featured-posts-section.tsx`
- **Criar**: `apps/web/modules/blog/ui/components/blocks/` (renderers individuais por bloco)

### Fase 5
- **Modificar**: `apps/web/modules/dashboard/schema/tool.tsx`
- **Modificar**: `apps/web/modules/dashboard/ui/components/tool-form.tsx`
- **Modificar**: `apps/web/trpc/routers/toolsRouter.ts`
- **Modificar**: rota da página pública da Tool (provável `apps/web/app/(main)/ferramentas/[toolCategory]/[tool]/page.tsx` — confirmar antes de editar). Adicionar `unstable_cache` com tag `tool:${tool.link}` e seção "Aprenda mais" com `post-card`.

### Fase 6
- **Criar**: `apps/web/modules/blog/lib/revalidate.ts`
- **Modificar**: `apps/web/trpc/routers/postsRouter.ts`
- **Modificar**: `apps/web/trpc/routers/toolsRouter.ts`
