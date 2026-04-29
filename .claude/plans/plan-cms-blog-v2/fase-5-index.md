---
phase: 5
plan_file: plan-cms-blog-v2.md
exploded_at: 2026-04-28
---

# Fase 5 — Cross-link Tool ↔ Post

## Objetivo

Tool exibe seu post em destaque ("Aprenda mais"); admin de Tool tem campo para escolher `featuredPostId`. Página pública da Tool fica envolvida em `unstable_cache` com tag dedicada para suportar revalidação na Fase 6.

## Critério de conclusão

Logado, em `/dashboard/tools/[id]/edit` é possível setar o post em destaque. Acessando a página pública da tool o post aparece numa seção visível com link para `/blog/[slug]`.

> **Confirmação de rota.** Inspeção confirmou que a rota pública da Tool é `apps/web/app/(main)/tools/[toolCategory]/[tool]/page.tsx` (e não `/ferramentas/...` como o plano original hipotetizava). O `page.tsx` apenas delega para `<ToolView toolCategory={...} tool={...} />`. O fetch real da tool acontece via `caller.categories.getCategoryWithTools({ slug: toolCategory })` em `apps/web/modules/tools/ui/views/tool-view.tsx`, com a tool sendo selecionada por `category.tools.find(...)`. **O cache + seção "Aprenda mais" moram nesse arquivo, não no `page.tsx`.**

## Reuso identificado

### Reutilizado (já existe, NÃO recrie)

- `PostCard` em `apps/web/modules/blog/ui/components/post-card.tsx` — usar como cartão da seção "Aprenda mais" (linka para `/blog/[slug]`).
- `unstable_cache` de `next/cache` — padrão já em uso em `app/(main)/blog/page.tsx` e `app/(main)/blog/[slug]/page.tsx`.
- `posts.list` (procedure tRPC pública) — alimentar combobox no admin com `status: PostStatus.PUBLISHED`.
- `caller.categories.getCategoryWithTools` — fonte atual de dados da rota da Tool; envolveremos a chamada em `unstable_cache`.
- Hooks `useUpdateTool` / `useSuspenseTool` — já lidam com o flow de save da Tool.
- Padrões `Form` / `FormField` / `Select` shadcn — já usados em `tool-form.tsx`.
- Procedure `tools.update` — já aceita `data: createToolSchema.partial()`, então gravar `featuredPostId` não exige mudar a procedure se o Schema cobrir o campo.
- `PostStatus` em `@workspace/types` — usar nas queries.
- Padrão de tag de cache `blog:${slug}` (Fase 4) — espelhar com `tool:${link normalizado}`.

### Criado nesta fase

- `apps/web/modules/dashboard/ui/components/post-combobox.tsx` — combobox de seleção única de post publicado (resposta P3=A). → 5.2
- `apps/web/modules/tools/lib/cache.ts` — helper `tagForTool(link)` compartilhado com Fase 6.3 (resposta P9=B). → criado dentro de 5.6.

### Extraído de código existente

- (Nenhum — não foi identificada lógica inline duplicada que mereça extração nesta fase.)

## Micro-tarefas (arquivos desta pasta)

| ID | Tipo | depends_on | Arquivo |
|----|------|------------|---------|
| 5.1 | modificar | — | `5.1-adicionar-featured-post-id-no-tool-schema.md` |
| 5.2 | criar | — | `5.2-criar-post-combobox.md` |
| 5.3 | modificar | 5.1, 5.2 | `5.3-adicionar-featured-post-no-tool-form.md` |
| 5.4 | modificar | 5.1 | `5.4-gravar-featured-post-id-no-tools-create.md` |
| 5.5 | modificar | 5.4 | `5.5-confirmar-update-grava-featured-post-id.md` |
| 5.6 | modificar | — | `5.6-envolver-tool-fetch-em-unstable-cache.md` |
| 5.7 | modificar | 5.6 | `5.7-renderizar-secao-aprenda-mais.md` |

## Ondas de execução paralela

- **Onda 1** (sem deps): 5.1, 5.2, 5.6 — 3 paralelas
- **Onda 2** (após onda 1): 5.3, 5.4, 5.7 — 3 paralelas (arquivos distintos)
- **Onda 3** (após onda 2): 5.5

> **Nota de consistência.** Esta lista é **derivada** dos `depends_on` declarados nos arquivos de task — serve como conveniência para leitura humana. Em caso de divergência, **o grafo dos arquivos individuais é a fonte da verdade**. O executor deve recalcular ondas a partir dos `depends_on` de cada arquivo, não confiar cegamente no texto acima.

> **Restrição de paralelismo na Onda 2.** 5.4 e 5.5 ambas tocam `apps/web/trpc/routers/toolsRouter.ts` — por isso 5.5 depende de 5.4 (serializa). 5.7 toca `apps/web/modules/tools/ui/views/tool-view.tsx` (mesmo arquivo de 5.6) — por isso 5.7 depende de 5.6 (serializa). Dentro da Onda 2, 5.3, 5.4 e 5.7 são em arquivos distintos, paralelizáveis.

## Decisões

- **P1=A** Combobox carrega `posts.list({ status: PostStatus.PUBLISHED, pageSize: 50 })` na carga inicial; filtro client-side. Se passar de 50, melhorar depois.
- **P2=A** Campo "Featured Post" entra após "General Information", em subseção própria, antes de "Visual Configuration".
- **P3=A** Item sentinela "Sem post em destaque" (value `""`) no topo da lista; mapeia para `null` no save.
- **P4=A** Tag `tool:${link.replace(/^\//, "")}` — `link` normalizado removendo barra inicial.
- **P5=A** `revalidate: 3600` (1h) como TTL fallback do `unstable_cache` da tool.
- **P6=A** Seção "Aprenda mais" entre `richContent` e `FAQs` na `ToolView`.
- **P7=A** `caller.posts.getById` server-side; try/catch protege; **testar como anônimo após 5.7**.
- **P8=B** `featuredPostId: z.string().nullable().optional()`; `""` → `null` no save.
- **P9=B** Helper `tagForTool` em `apps/web/modules/tools/lib/cache.ts`, compartilhado com Fase 6.3.

## Atenção do executor

`posts.getById` é `protectedProcedure`. Visitantes anônimos podem não conseguir chamar a procedure, fazendo a seção "Aprenda mais" nunca renderizar publicamente.

**Após implementar 5.7, OBRIGATÓRIO:**

1. Abrir uma página pública de tool com `featuredPostId` setado em **browser anônimo (private/incógnito, sem cookies de sessão)**.
2. Confirmar visualmente que a seção "Aprenda mais" aparece.
3. **Se NÃO aparecer**: PARAR a fase, NÃO marcar `✅`, e reportar ao usuário com a mensagem:
   > "P7 caiu no caso degradado: visitantes anônimos não veem a seção 'Aprenda mais' porque `posts.getById` requer sessão. Necessário criar procedure pública dedicada (`posts.getByIdPublic` filtrando PUBLISHED + publishedAt<=now) ou popular o post diretamente em `getCategoryWithTools`. Out-of-scope desta fase — abrir nova fase."

Esse teste é parte do critério de conclusão.
