# Páginas em `dashboard/` que importam Client Components

**Data:** 2026-04-30
**Worktree:** `melhorias-react`
**Branch:** `melhorias-react` (rebased em `dev-br`)
**Diretório base:** `apps/web/app/dashboard/`

> Relatório-irmão de `public-pages-client-components.md`. Aqui o levantamento ainda é só de **estado atual** — nenhuma conversão foi aplicada. As "ações sugeridas" estão no fim, prontas para virarem PR depois da revisão.

## Resumo

- **19 páginas** + 1 layout sob `app/dashboard/` (rota `spike-editorjs/` removida pós-Fase 9 do plano `plan-page-blocks-editorjs-v2`)
- **0 páginas** declaram `"use client"` no próprio arquivo
- **Todas as 19 páginas + o `layout.tsx`** são Server Components; todas importam pelo menos um Client Component (na prática, uma `*-view.tsx` client)
- **0 arquivos de rota** são 100% Server na árvore inspecionada
- **Sem `error.tsx` / `loading.tsx` / `not-found.tsx`** em `app/dashboard/` — o tratamento de erro herda do `(main)` ou do root, e não há UI de loading dedicada para suspense de listagens

**Padrão dominante.** `page.tsx` (server) → `*-container.tsx` (server, layout) → `*-header.tsx` / `*-search.tsx` / `*-pagination.tsx` (client) + `*-view.tsx` (client com `useSuspense*` da tRPC + mutações + delete). Forms vivem em `*-form.tsx` (client com react-hook-form + Zod).

---

## Layout

### `app/dashboard/layout.tsx` — scaffold do dashboard

- Self: **Server**. Apenas re-exporta `<DashboardLayout>` (`modules/dashboard/ui/views/dashboard-layout.tsx`), também Server.
- Client components na árvore (via `DashboardLayout`):
  - `modules/dashboard/ui/components/app-sidebar.tsx` — `"use client"`. Usa `Link`, `useState` e props/hook do shadcn `Sidebar` (que é client por design).
  - `modules/dashboard/ui/components/site-header.tsx` — `"use client"`. `useTheme` (next-themes), `useState` para `mounted`, search bar interativa.
  - `modules/dashboard/ui/components/nav-main.tsx` — `"use client"`. `useRouter` + `usePathname` + `onClick` para navegação ativa. **Cliente legítimo.**
  - `@workspace/ui/components/sidebar` — `SidebarProvider` é Context Provider (client por definição) + `SidebarInset`.

> O sidebar inteiro é client por causa do `SidebarProvider` do shadcn. A escolha aqui é arquitetural: ou se mantém o provider envolvendo tudo (estado atual), ou se isola o provider mais profundo. Não é alvo desta auditoria.

---

## Páginas COM Client Components (19)

### 1. `app/dashboard/page.tsx` — Overview/home admin
- `modules/dashboard/ui/views/dashboard-overview-view.tsx` — `"use client"`. `useSuspense*` da tRPC + visualizações (recharts).

### 2. `app/dashboard/account/page.tsx` — Conta do usuário
- `modules/dashboard/ui/views/account-view.tsx` — `"use client"`. `useState` + `useRouter` + `useForm` (perfil + segurança), copiar token de API.

### 3. `app/dashboard/categories/page.tsx` — Listagem de categorias
- `modules/dashboard/ui/components/categories-container.tsx` — Server (layout puro).
- `modules/dashboard/ui/components/categories-header.tsx` — `"use client"`. Botão "Nova categoria" (interativo).
- `modules/dashboard/ui/components/categories-search.tsx` — `"use client"`. `useEntitySearch` + `useCategoriesParams` (nuqs/URL sync).
- `modules/dashboard/ui/components/categories-pagination.tsx` — `"use client"`. `useCategoriesParams` + handler para mudar página.
- `modules/dashboard/ui/views/categories-view.tsx` — `"use client"`. `useSuspenseCategories`, `useRemoveCategory`, delete inline.

### 4. `app/dashboard/categories/create/page.tsx` — Criar categoria
- `modules/dashboard/ui/views/create-category-view.tsx` — `"use client"`. `useRouter` + mutation `useCreateCategory` + `<CategoryForm>`.
- `modules/dashboard/ui/components/category-form.tsx` — `"use client"`. `useForm` + `useWatch` + `useEffect`, `DynamicIcon`, validação Zod.

### 5. `app/dashboard/categories/[id]/page.tsx` — Editar categoria
- `modules/dashboard/ui/views/category-view.tsx` — `"use client"`. `useSuspenseCategories` + `useRemoveCategory` + `useUpdateCategory` + form de edição.

### 6. `app/dashboard/pages/page.tsx` — Gerenciar páginas (custom + comparativas + fixas)
- `modules/dashboard/ui/components/pages-container.tsx` — Server.
- `modules/dashboard/ui/views/pages-view.tsx` — `"use client"`. `useSuspensePages` + `usePagesParams` (nuqs), tabs custom/fixed, delete.
- `modules/dashboard/ui/components/pages-custom-list.tsx` — `"use client"`. `useState` + ações de delete/edit.
- `modules/dashboard/ui/components/pages-tabs.tsx` — `"use client"`. `useState` para tab ativa.

### 7. `app/dashboard/pages/homepage/page.tsx` — Editar homepage
- `modules/dashboard/ui/views/edit-homepage-view.tsx` — `"use client"`. `useUpdateHomepage` + editor de hero.

### 8. `app/dashboard/pages/all-tools/page.tsx` — Editar página "Todas as ferramentas"
- `modules/dashboard/ui/views/edit-all-tools-page-view.tsx` — `"use client"`. `useUpdateAllToolsPage` + seleção/ordenação de ferramentas.

### 9. `app/dashboard/pages/custom/create/page.tsx` — Criar página custom
- `modules/dashboard/ui/views/create-custom-page-view.tsx` — `"use client"`. `useCreateCustomPage` + page builder (Editor.js).

### 10. `app/dashboard/pages/custom/[id]/page.tsx` — Editar página custom
- `modules/dashboard/ui/views/edit-custom-page-view.tsx` — `"use client"`. `useUpdateCustomPage` + page builder.

### 11. `app/dashboard/posts/page.tsx` — Listagem de posts
- `modules/dashboard/ui/components/posts-container.tsx` — Server.
- `modules/dashboard/ui/components/posts-header.tsx` — `"use client"`. Botão "Novo post".
- `modules/dashboard/ui/components/posts-search.tsx` — `"use client"`. `usePostsSearch` (debounced) + URL sync.
- `modules/dashboard/ui/components/posts-pagination.tsx` — `"use client"`. `usePostsParams` + handler de página.
- `modules/dashboard/ui/views/posts-view.tsx` — `"use client"`. `useSuspensePosts` + `useRemovePost`.

### 12. `app/dashboard/posts/new/page.tsx` — Criar post
- `modules/dashboard/ui/views/create-post-view.tsx` — `"use client"`. `useCreatePost` + `<PostForm>`.
- `modules/dashboard/ui/components/post-form.tsx` — `"use client"`. `useForm` + `useState` + `useEffect`, Editor.js (`dynamic` com `ssr: false`), upload de capa, campos SEO.

### 13. `app/dashboard/posts/[id]/page.tsx` — Editar post
- `modules/dashboard/ui/views/edit-post-view.tsx` — `"use client"`. `usePostById` + `useUpdatePost` + `<PostForm>`.

### 14. `app/dashboard/scripts/page.tsx` — Listagem de scripts globais
- `modules/dashboard/ui/components/scripts-container.tsx` — Server.
- `modules/dashboard/ui/components/scripts-header.tsx` — `"use client"`. Botão "Novo script".
- `modules/dashboard/ui/components/scripts-search.tsx` — `"use client"`. `useEntitySearch` + URL sync.
- `modules/dashboard/ui/components/scripts-pagination.tsx` — `"use client"`. Handler de página.
- `modules/dashboard/ui/views/scripts-view.tsx` — `"use client"`. `useSuspenseScripts` + delete.

### 15. `app/dashboard/scripts/create/page.tsx` — Criar script global
- `modules/dashboard/ui/views/create-script-view.tsx` — `"use client"`. `useCreateScript` + `<ScriptForm>`.
- `modules/dashboard/ui/components/script-form.tsx` — `"use client"`. `useForm` + paste de JSON + validação.

### 16. `app/dashboard/scripts/[id]/page.tsx` — Editar script
- `modules/dashboard/ui/views/script-view.tsx` — `"use client"`. `useSuspenseScripts` + `useUpdateScript` + form.

### 17. `app/dashboard/tools/page.tsx` — Listagem de ferramentas
- `modules/dashboard/ui/components/tools-container.tsx` — Server.
- `modules/dashboard/ui/components/tools-header.tsx` — `"use client"`. Filtro de visualização (grid/tabela).
- `modules/dashboard/ui/components/tools-search.tsx` — `"use client"`. `useEntitySearch` + filtro por categoria.
- `modules/dashboard/ui/components/tools-board.tsx` — `"use client"`. `useToolsParams` (nuqs), abas de view + skeleton.
- `modules/dashboard/ui/components/tools-grid.tsx` — `"use client"`. `useToolsSelection` + `useRemoveTool` (checkbox + bulk delete).
- `modules/dashboard/ui/components/tools-table.tsx` — `"use client"`. Tabela com sorting/filtering + delete row.
- `modules/dashboard/ui/components/tools-stats.tsx` — `"use client"` **legado**. Confirmado por inspeção: 38 linhas, sem `useState` / `useEffect` / `useRouter` / `useQuery` / `onClick` / `onChange`. Apenas Cards com contagens passadas via prop. **Candidato a Server.**

### 18. `app/dashboard/tools/create/page.tsx` — Criar ferramenta
- `modules/dashboard/ui/views/create-tool-view.tsx` — `"use client"`. `useCreateTool` + `<ToolForm>`.
- `modules/dashboard/ui/components/tool-form.tsx` — `"use client"`. `useForm` + `useState` + `useMemo`, abas (básico, passos, FAQ, SEO), `RichTextEditor`, `PostCombobox`.

### 19. `app/dashboard/tools/[id]/page.tsx` — Editar ferramenta
- `modules/dashboard/ui/views/tool-view.tsx` — `"use client"`. `useSuspenseTools` + `useUpdateTool` + `<ToolForm>`.

---

## Componentes client recorrentes (motivos)

| Categoria | Exemplos | Motivo client |
|---|---|---|
| Forms | `category-form`, `tool-form`, `post-form`, `script-form` | `useForm` + `useWatch` + submit handlers + Zod |
| Views de listagem | `categories-view`, `posts-view`, `scripts-view`, `tools-grid` | `useSuspense*` (tRPC) + `useRemove*` + delete inline |
| Views de criação/edição | `create-*-view`, `*-view` (de `[id]`) | mutações tRPC + `useRouter` (redirect pós-submit) |
| Search/Pagination | `*-search`, `*-pagination`, `pages-tabs`, `tools-board` | `useEntitySearch` / `nuqs` (`useQueryStates`) — URL sync |
| Headers de ação | `*-header` | botão "Novo X" + `<Link>` dentro de `<Button>` (interativo) |
| Editor rico | `post-form`, `tool-form`, page builder de custom pages | Editor.js / TipTap → `dynamic({ ssr: false })` obrigatório |
| Sidebar/Header global | `app-sidebar`, `site-header`, `nav-main` | `useTheme`, `useRouter`, `usePathname`, `Sidebar` providers do shadcn |

---

## Oportunidades observadas

Este relatório é um inventário; conversões serão aplicadas em PR separada. Os pontos abaixo já apareceram durante a varredura e são fortes candidatos:

1. **`tools-stats.tsx`** — `"use client"` legado confirmado (sem hooks/handlers, só Cards com contagens). Equivalente direto do `ToolCard` / `CategoryCard` desclientizados na auditoria pública. **Mover para Server.**
2. **Headers tipo `*-header.tsx`** (categorias, posts, scripts) — verificar individualmente: se o único motivo client for `<Button asChild><Link>...</Link></Button>`, **podem virar Server** (mesmo padrão do `BlogPagination` da auditoria pública: `<Link>` resolve a navegação client-side sem precisar do componente ser client). Cada um precisa ser inspecionado: se houver `onClick` / dropdown / state local, fica client.
3. **Paginações** (`categories-pagination`, `posts-pagination`, `scripts-pagination`, similares no `tools-board`) — replicar a heurística aplicada em `BlogPagination`: trocar `onClick` por `<Link href="?page=N&...">` preservando filtros via querystring. Hoje todas usam handler client + `useQueryStates`. Conversão típica de "pagination → server".
4. **`pages-tabs.tsx` / `tools-board.tsx` (abas)** — se forem só "tab visual com URL sync", dá para virar Server lendo `searchParams` na page e renderizando o tab ativo. Se houver state efêmero (sem persistir na URL), continua client. Inspeção pendente.
5. **Headers em `dashboard-overview-view.tsx`, `account-view.tsx`, `category-view.tsx`, `script-view.tsx`** — provavelmente misturam HTML estático (título, subtítulo, breadcrumb) com 1–2 ações. Aplicar a **heurística de quebrar componente client misto** já documentada em `public-pages-client-components.md`: extrair o pedaço interativo para um island `*-actions.tsx` e deixar o wrapper como Server. Avaliar caso a caso.

> Nada disso afirma "vamos converter X". É a fila de itens que vale auditoria fina antes de cada conversão. Algumas vão sobreviver ao escrutínio (ex.: paginações com debounce real), outras não.

---

## Heurística reaproveitada da auditoria pública

Os mesmos princípios de `public-pages-client-components.md` se aplicam aqui:

- **Um componente só recebe `"use client"` se ele próprio precisa de** hooks de client, event handlers, browser APIs ou Context Providers de client. Hover via Tailwind (`group-hover`, `hover:`), CSS variables inline e renderização determinística são Server.
- **Componente client misto** → inverter o default: wrapper Server + `*-actions.tsx` client co-localizado mantendo a API pública estável.
- **Paginação SSR-friendly** → `<Link href="?page=N">` em vez de `useQueryStates` + `onClick`. Ganho duplo: bundle menor + rota indexável (irrelevante para dashboard logado, mas continua sendo o padrão certo).
- **Suspense + `useSuspense*` da tRPC** é cliente legítimo enquanto o padrão for esse no dashboard. Não é alvo desta auditoria reverter para fetch server. A discussão sobre migrar para `caller.*` em Server Components no dashboard fica para outro momento.

### Estratégia de Error Boundaries

Hoje **não existe `error.tsx` em `app/dashboard/`**. Quando uma listagem falha (ex.: `useSuspenseCategories` rejeita), o erro sobe até o boundary mais próximo — provavelmente o root. Recomendação:

1. **Criar `app/dashboard/error.tsx`** — boundary de rota equivalente ao de `(main)`, com mensagem amigável e botão "tentar novamente".
2. **`SectionErrorBoundary` em volta de listagens com `Promise.all`/múltiplas queries** — `categories-view`, `posts-view`, `scripts-view`, `tools-grid`/`tools-table`. Padrão idêntico ao aplicado em `<NewToolsGrid />` na home.
3. **`SectionErrorBoundary` em volta de editores com input arbitrário** — page builder de custom pages, `post-form` (Editor.js), `tool-form` (RichTextEditor + JSON de passos/FAQ). Risco real de quebra com payload malformado vindo do banco.
4. **`app/dashboard/loading.tsx`** — skeleton genérico de dashboard. Hoje cada `*-view.tsx` resolve isso internamente via Suspense + skeleton específico, então o `loading.tsx` da rota é opcional. Fica como nice-to-have.

---

## Análise detalhada — Overview e Account

Aprofundamento das duas primeiras linhas pendentes da tabela. Não é PR — é a "leitura fina" que a coluna pedia. Confirma o que pode virar Server e o que tem que ficar client, com nomes propostos para os islands.

### 1. `app/dashboard/page.tsx` — Overview

**Estado atual.** `dashboard-overview-view.tsx` é client inteira por causa de `useSuspenseOverview()`. Mas a maior parte do markup é determinística — só os charts da `recharts` precisam mesmo de DOM/JS no cliente.

**O que pode virar Server:**
- `header` (lin 87–93) — `<h1>` + `<p>` + `<span>` formatado por `formatRelative`.
- `KpiGrid` (lin 265–325) — sem hooks, sem handlers, sem browser API. Só `<Card>` + `<Icon>` + valores derivados. Equivalente direto do `ToolCard`/`CategoryCard` desclientizados na auditoria pública.
- Lista `Falhas recentes` (lin 198–214) — `<ul>/<li>` puro com `formatRelative`.
- Lista `Posts recentes` (lin 218–256) — idem, com `<Link href="/dashboard/posts/...">` que já roda em Server.
- Helpers `formatNumber`, `formatPercent`, `formatRelative`, `shortDay` — funções puras, executam no server sem mudança.

**O que precisa continuar client:**
- Três charts da `recharts` (`AreaChart`, `BarChart`, `PieChart`) — usam `ResizeObserver`, eventos de tooltip/hover. `<ChartContainer>` já é client por design.

**Como isolar.** Inverter o default — view vira Server Component que recebe `data` por prop. A page resolve o fetch com `caller.dashboard.overview()` server-side (já existe `prefetchDashboardOverview()`; trocar por `getCaller()` ou equivalente). Três islands client co-localizados:
- `dashboard-jobs-area-chart.tsx` — `"use client"`, recebe `data.jobsByDay`.
- `dashboard-status-pie-chart.tsx` — `"use client"`, recebe `data.jobsByStatus`. Já é função separada (`StatusPieChart`, lin 327); só falta arquivo próprio.
- `dashboard-top-tools-bar-chart.tsx` — `"use client"`, recebe `data.topTools`.

As constantes `jobsChartConfig` / `statusChartConfig` / `topToolsChartConfig` viajam junto com seu respectivo island. Mantém a API pública intacta — quem importa `<DashboardOverviewView />` na page nem percebe.

**Custo.** Pequeno. Recorte de 3 trechos já bem delimitados + troca do hook por prop.

**Ganho.** Bundle do `/dashboard` deixa de carregar `recharts` + `ChartContainer` no JS do KpiGrid e das listas. HTML estático completo no primeiro paint sem esperar hidratação para ver KPIs e contagens.

### 2. `app/dashboard/account/page.tsx` — Conta

**Estado atual.** `account-view.tsx` é client inteira por causa de `useSession()` + `useRouter()`. Mas a sessão já está disponível no server — `requireAuth()` em `app/dashboard/account/page.tsx` resolve isso antes de renderizar.

**O que pode virar Server:**
- Header com avatar / nome / e-mail / badges (lin 150–178) — recebendo `user` por prop, é só `<Avatar>` + `<Badge>` + `<span>`.
- Sidebar (`Resumo`, `Cronologia`, `Sessão atual` — lin 210–274) — `<dl>/<dt>/<dd>` + `format(date-fns)` (executa no server) + `<SectionHeader>` puro.
- `SectionHeader` (lin 68–87), `Field` (lin 89–105) — só HTML.
- `PasswordStrengthMeter` (lin 583–601) — recebe `score` + `label`, sem hook. Server se exportado em arquivo próprio (mas é consumido por componente client, então fica client transitivo — sem ganho real, vale só por higiene).
- Função `passwordStrength` (lin 603–612) — pura.
- Botão "Voltar para o Painel" (lin 140–148) — usa `router.push("/dashboard")` só pra navegar. Trocar por `<Link href="/dashboard">` elimina a dependência do `useRouter` aqui.

**O que precisa continuar client:**
- `<Tabs>` do shadcn (lin 182–207) — Context Provider client.
- `ProfileSection` (lin 281–383) — `useForm` + `useWatch` + submit handler (`authClient.updateUser`).
- `SecuritySection` (lin 385–555) — `useForm` + `useState(showCurrent/showNew)` + `authClient.changePassword`.
- `CopyableValue` (lin 557–581) — `navigator.clipboard` + `useState(copied)` + `setTimeout`.
- Botão "Encerrar sessão" (lin 261–271) — `authClient.signOut()` + `router.push("/login")`.

**Como isolar.** Page passa `user` (e `session` quando precisar de `expiresAt`) como props para `AccountView`. View vira Server Component:
- Renderiza breadcrumb, header, sidebar inteiros como HTML estático.
- Importa islands client:
  - `account-tabs.tsx` — envelopa `<Tabs>` + `<ProfileSection>` + `<SecuritySection>` em uma única árvore client. Recebe `user` por prop.
  - `copyable-value.tsx` — extrair o `CopyableValue` atual (já é o ilhote certo, só falta arquivo próprio).
  - `sign-out-button.tsx` — novo island mínimo só com `authClient.signOut() + router.push("/login")`.

**Detalhe importante.** O `onSaved={() => refetch()}` de hoje (`useSession().refetch`) tem que migrar de estratégia: a page é Server, então o equivalente é `router.refresh()` no fim do submit (revalida dados que vieram via prop). Adapta-se com 1 linha em `ProfileSection`.

**Custo.** Médio. Exige passar `user` como prop e aposentar `useSession` no top-level (forms continuam usando o que precisarem internamente — o efeito colateral é só `router.refresh()` em vez de `refetch`).

**Ganho.** Header, breadcrumb e sidebar do Account viram HTML estático no primeiro paint. JS só desce para `<Tabs>` + forms + clipboard + signOut. Botão "Voltar" deixa de exigir bundle só pra chamar `router.push`.

### Padrão emergente

Os dois casos resolvem com a mesma jogada da auditoria pública:

1. **Inverter o default** — view externa vira Server, recebe dados (e auth) por prop.
2. **Extrair só o que tem motivo client** — charts (`recharts`), forms (`useForm`), clipboard, navegação imperativa (signOut).
3. **Co-localizar** os islands no mesmo diretório do componente que os consome, com nome próprio (`*-chart.tsx`, `*-tabs.tsx`, `sign-out-button.tsx`, `copyable-value.tsx`).
4. **Manter a API pública estável** — quem importa a view não muda a chamada.

A diferença pra `ShareBar` da auditoria pública é só o tamanho dos islands resultantes: aqui são 3 charts médios (Overview) e ~3 ilhotas pequenas + 1 árvore de forms (Account). Mesma técnica.

---

## Análise detalhada — Categories listagem e Categories view

Aprofundamento das duas próximas linhas pendentes (`#3` e `#5`). O `CategoriesContainer` é o caso-modelo da família "listagem com header/search/pagination" — categorias, posts, scripts e tools seguem o mesmo esqueleto, então a leitura aqui prepara as três conversões irmãs (`posts/page.tsx`, `scripts/page.tsx`, `tools/page.tsx`).

### 3. `app/dashboard/categories/page.tsx` — Listagem

**Estado atual.** Page já é Server (lê params via `categoriesParamsLoader` + `prefetchCategories`). Os 4 sub-componentes do `CategoriesContainer` carregam `"use client"` por motivos diferentes:

- `categories-header.tsx` — `useRouter().push("/dashboard/categories/create")` no `onNew`. **Falso positivo:** o `EntityHeader` em `modules/common/ui/components/entity-components.tsx` (lin 16, 34–41) já expõe a variante `newButtonHref` que renderiza `<Button asChild><Link>`. Trocar `onNew` por `newButtonHref` elimina o `useRouter`, o handler e o `"use client"`.
- `categories-search.tsx` — `useEntitySearch` + `useCategoriesParams` (URL sync com debounce). **Cliente legítimo** — input controlado, typing, sincronização de querystring.
- `categories-pagination.tsx` — `useSuspenseCategories()` para `totalPages`/`isFetching` + `useCategoriesParams` + `setParams({ page })`. **Falso positivo parcial:** o handler `onPageChange` é trocável por `<Link href="?page=N&search=...">` (mesmo padrão proposto pra `BlogPagination` na auditoria pública). A barreira é que hoje o componente lê `useSuspenseCategories()` para descobrir `totalPages` — então depende de cache client.
- `categories-view.tsx` — `useSuspenseCategories` + `useRemoveCategory` + `<CategoryCard onRemove>` (mutação inline). **Cliente legítimo** enquanto o padrão for `useSuspense*` no dashboard.

**O que pode virar Server:**
- `CategoriesHeader` — uma linha. Substituir o handler por `newButtonHref`. Ganho: 1 arquivo a menos no bundle, `useRouter` some.
- `CategoriesPagination` — só dá pra mover pra Server se a page resolver `getMany` via `caller.categories.getMany(params)` server-side e passar `page`/`totalPages` por prop. Aí o componente Server emite `<Button asChild><Link href={`?${qs}`}>`. Custo: a page passa de "prefetch + hydrate" pra "fetch direto + hydrate" — mantém o cache client-side intacto via `dehydrate`, mas exige tocar na page.

**O que precisa continuar client:**
- `CategoriesSearch` — input com debounce.
- `CategoriesView` — listagem com mutação inline (`useRemoveCategory`).

**Como isolar.**

**Caminho mínimo (recomendado pra esta PR de isolamento):**
1. `categories-header.tsx` → Server. Remover `"use client"`/`useRouter`/handler. Trocar prop por `<EntityHeader newButtonHref="/dashboard/categories/create" newButtonLabel="Nova categoria" ... />`.
2. `categories-pagination.tsx` → manter client por enquanto. A conversão envolve mover o fetch pra page (caller) + receber `page`/`totalPages`/`searchParams` por prop. Faz mais sentido casar com a refatoração de view (item abaixo) num PR dedicado.
3. `categories-search.tsx` → manter client (legítimo).
4. `categories-view.tsx` → manter client por ora.

**Caminho completo (PR seguinte, opcional):** mover o fetch pra page (`const data = await caller.categories.getMany(params)` em `app/dashboard/categories/page.tsx`), passar `data.items` e `data.totalPages` por prop pra `<CategoriesView items=...>` e `<CategoriesPagination page=... totalPages=...>`. View vira Server-com-island-de-actions: `<CategoryCard>` Server + island `<CategoryRowActions>` cuidando do `useRemoveCategory`. Pagination vira Server emitindo `<Link href="?page=N&search=...">`. Ganho real, custo médio (mexe em 4 arquivos).

**Custo (caminho mínimo).** Trivial. 1 arquivo, ~10 linhas.

**Ganho (caminho mínimo).** `categories-header` deixa de hidratar — não carrega `useRouter` só pra navegar. Pequeno por arquivo, mas estabelece o padrão pra `posts-header.tsx`, `scripts-header.tsx` e o equivalente em `tools-header.tsx` (mesmo bug copy-paste em todas).

### 5. `app/dashboard/categories/[id]/page.tsx` — Editar/visualizar categoria

**Estado atual.** Page é Server (`prefetchCategory(id)`). `category-view.tsx` é client inteiro — 465 linhas — por causa de:
- `useState(isEditing)` (lin 93) — alterna a árvore renderizada entre "view-mode" e "edit-mode".
- `useState(isConfirmingRemove)` (lin 94) — abre/fecha o `<Dialog>`.
- `useRouter` (lin 92) — `router.push("/dashboard/categories")` após delete.
- `useSuspenseCategory` (lin 96), `useUpdateCategory`, `useRemoveCategory` — fetch + mutações tRPC.

Mas a maior parte do markup é determinística: header com avatar/badges, breadcrumb, `<dl>/<dt>/<dd>` das seções "Identidade", "Aparência", "Visibilidade", aside com "Resumo"/"Cronologia", helpers `SectionHeader`/`Field`/`EmptyValue` (lin 48–89, todos puros).

**O que pode virar Server:**
- Helpers `SectionHeader`, `Field`, `EmptyValue` (lin 48–89) — funções puras, sem hooks.
- Header completo (lin 242–285) — `<DynamicIcon>`, `<Badge>`, slug, color. Tudo derivado da prop `category`.
- Seções "Identidade" / "Aparência" / "Visibilidade" (lin 287–360) — só `<dl>` + helpers.
- Aside "Resumo" + "Cronologia" (lin 363–404) — `format(date-fns, locale: ptBR)` executa server sem mudança.
- Breadcrumb (lin 199–206) — `DashboardBreadcrumb` é Server.
- Link "Voltar para Categorias" (lin 209–215) — já é `<Link>`, server-friendly.
- Botão "Ver ao vivo" (lin 218–223) — `<Button asChild><Link href={publicUrl} target="_blank">`. Server.

**O que precisa continuar client:**
- Toolbar de ações no topo (lin 225–238): "Remover" (abre dialog) + "Editar" (alterna `isEditing`).
- Aside "Ações Rápidas" (lin 408–438): mesmas ações da toolbar, replicadas.
- `<Dialog>` de confirmação (lin 443–461) — `useState` + `useRemoveCategory.mutate`.
- Modo edição: `<CategoryForm>` envolto pelo bloco `if (isEditing)` (lin 126–191) — `useForm` + `useWatch` + submit. **Cliente legítimo.**

**Bloqueador estrutural.** O `useState(isEditing)` alterna a árvore inteira (view-mode ↔ edit-mode) via state local. **Isso é incompatível com tornar o view-mode um Server Component** — Server Components não podem ser remontados por state client. A solução é trocar a alternância por roteamento: criar `app/dashboard/categories/[id]/edit/page.tsx` (segue o mesmo padrão de `categories/create`, `posts/new`, `tools/create` que já existem). O botão "Editar" vira `<Link href={`/dashboard/categories/${id}/edit`}>`. O `<CategoryForm>` migra inteiro pra essa nova rota.

**Como isolar.**

1. **Mover o fetch pra page Server.** Trocar `prefetchCategory(id)` por `const category = await caller.categories.getOne({ id })` (ou manter prefetch e adicionar um caller paralelo) e passar `category` por prop pra `<CategoryView category={category}>`. Isso libera a view de depender de `useSuspenseCategory`.
2. **`category-view.tsx` Server.** Recebe `category: CategoryDto`. Renderiza breadcrumb, header, seções e aside como HTML estático. Imports dos islands client co-localizados:
   - `category-actions.tsx` — `"use client"`. Toolbar com botões "Editar" (`<Link>`) e "Remover" (abre dialog). Recebe `id` + `name` por prop. Engole `useRemoveCategory` + `useState(isConfirmingRemove)` + `useRouter` (pra `router.push("/dashboard/categories")` após delete bem-sucedido). Ilhota pequena, ~50 linhas.
   - O bloco "Ações Rápidas" da aside (lin 406–438) consome o mesmo island com layout diferente — extrair como sub-componente do `CategoryActions` (variant `"toolbar"` vs `"aside"`) ou criar `category-quick-actions.tsx` separado. Decidir na hora da PR.
3. **Nova rota `app/dashboard/categories/[id]/edit/page.tsx`.** Server. Resolve `caller.categories.getOne({ id })` e passa pra `<EditCategoryView category=...>`. Esse `EditCategoryView` é client (envolto no `<CategoryForm>`). Pode reaproveitar o que hoje vive no bloco `if (isEditing)` (lin 126–191): breadcrumb com label "Editar", header próprio com botão "Voltar" trocado por `<Link href={`/dashboard/categories/${id}`}>`, e o `<CategoryForm>` consumindo `useUpdateCategory` + `router.push` pós-submit.
4. **Apagar o ramo `if (isEditing)`** do `category-view.tsx` original. O `useState(isEditing)` some. O `useRouter` some (substituído por `<Link>` em "Voltar para Categorias").

**Custo.** Médio-alto. Comparável à conversão da Overview. Toca em 3 arquivos: `category-view.tsx` (Server), novo `category-actions.tsx` (client), nova rota `[id]/edit/page.tsx` + `edit-category-view.tsx` (client). Não é trivial — exige decisão sobre passar `category` via prop (nova convenção no dashboard) e criar uma rota nova.

**Ganho.** Página densa (~250 linhas de markup determinístico) deixa de exigir bundle. JS desce só pra: 1 ilhota de toolbar + 1 dialog + (em /edit) 1 form. Padrão fica disponível pra replicar nas outras páginas de detalhe (`scripts/[id]`, `tools/[id]`).

### Padrão emergente — atualização

Os quatro casos analisados (Overview, Account, Categories listagem, Categories view) cristalizam dois sub-padrões:

**Sub-padrão A — listagens (`*/page.tsx` com `*-container`):**
- Header → Server via `newButtonHref` (variante já existente em `EntityHeader`).
- Search → continua client (input + debounce).
- Pagination → vira Server quando a page resolve o fetch via `caller`, passa `page`/`totalPages` por prop e o componente emite `<Link href="?page=N&search=...">`.
- View → vira Server quando a page passa `items` por prop; ações inline (delete) viram island.

**Sub-padrão B — páginas de detalhe (`*/[id]/page.tsx`):**
- View → Server, recebe entidade por prop (page resolve via `caller`).
- Toolbar de ações → island client (`*-actions.tsx`).
- Modo edição → rota separada `*/[id]/edit/page.tsx`, não state local. Mata `useState(isEditing)`.

A jogada de fundo continua sendo a mesma da auditoria pública: **inverter o default**, extrair só o que tem motivo client, co-localizar, manter API pública estável.

---

## Análise detalhada — Pages listagem e Posts listagem

Aprofundamento das duas próximas linhas pendentes (`#6` e `#11`). Ambas são listagens — uma com tabs (`pages`), outra sem (`posts`) — e cada uma traz um falso positivo de `"use client"` direto, mais um wrapper de orquestração que dá pra mover pra Server quando se deslocam guards p/ os filhos.

### 6. `app/dashboard/pages/page.tsx` — Listagem

**Estado atual.** Page já é Server (`pagesParamsLoader` + `prefetchPages` + `prefetchPagesPaginated`). O `PagesContainer` é Server e renderiza `<PagesBoard />` em `<HydrateClient>` + `<Suspense>`. Sub-componentes do board:

- `pages-board.tsx` (lin 1) — `"use client"`. Lê `usePagesParams()` só pra montar `isCustomTab` e condicionar `<PagesSearch />` e `<PagesPagination />`. Não tem handler nem state local.
- `pages-header.tsx` (lin 1) — `"use client"`, mas o body é só `<EntityHeader newButtonHref="/dashboard/pages/custom/create" newButtonLabel="Nova página personalizada" ... />`. **Sem `useRouter`, sem hook, sem handler.** Falso positivo direto — `EntityHeader` em `entity-components.tsx` é Server por padrão e a variante `newButtonHref` resolve via `<Button asChild><Link>`.
- `pages-tabs.tsx` (lin 1) — `"use client"`. `useQueryStates` + `<Tabs onValueChange>`. **Cliente legítimo** (Tabs do shadcn é Context Provider client + setParams).
- `pages-search.tsx` (lin 1) — `"use client"`. Input controlado + debounce via `useEffect`/`setTimeout`. **Cliente legítimo.**
- `pages-pagination.tsx` (lin 1) — `"use client"`. Usa `usePagesQuery()` (cache client) + `usePagesParams()` + handlers. **Cliente legítimo** enquanto a paginação for cliente. Já carrega guard interno `if (params.tab !== "custom") return null;` (lin 15).
- `pages-view.tsx` (lin 1) — `"use client"`. Decide Fixed vs Custom via `params.tab` + lê `pagesQuery`. **Cliente legítimo.**
- `pages-fixed-list.tsx` (lin 1) — `"use client"`. `useSuspensePages()`. **Cliente legítimo.**
- `pages-custom-list.tsx` (lin 1) — `"use client"`. `useDeleteCustomPage()` + `confirm()` (mutação inline). **Cliente legítimo.**

**O que pode virar Server:**
- `pages-header.tsx` — apagar `"use client";`. Conteúdo idêntico, sem mudar uma linha além disso. `EntityHeader` continua sendo o mesmo Server Component que já é hoje.
- `pages-board.tsx` — apagar `"use client";`, apagar `const [params] = usePagesParams();` + `const isCustomTab = ...`. Renderizar `<PagesSearch />` e `<PagesPagination />` incondicionalmente. **Pré-requisito:** descer o guard `params.tab === "custom"` pra dentro de `pages-search.tsx` (igual ao que `pages-pagination.tsx` já faz).

**O que precisa continuar client:**
- `pages-tabs.tsx`, `pages-search.tsx`, `pages-pagination.tsx`, `pages-view.tsx`, `pages-fixed-list.tsx`, `pages-custom-list.tsx` — todos legítimos pelos motivos acima.

**Como isolar.**

1. **`pages-search.tsx` → adicionar guard interno.** No topo do componente, depois de `const [params, setParams] = usePagesParams();`, inserir `if (params.tab !== "custom") return null;`. Espelha exatamente o que `pages-pagination.tsx` faz na lin 15. Cliente continua — só passa a ser auto-suficiente.
2. **`pages-board.tsx` → Server.** Apagar `"use client";`, remover `usePagesParams` + `isCustomTab`, retornar a árvore sem condicionais. Vira componente puramente compositivo: lê nada, renderiza Breadcrumb + Header + Tabs + Search + View + Pagination. Cada filho cuida do seu próprio guard.
3. **`pages-header.tsx` → Server.** Apagar `"use client";`. Sem nenhuma outra mudança.

**Custo.** Trivial. 3 arquivos, ~6 linhas no total.

**Ganho.** Wrapper Header e wrapper Board deixam de hidratar — não carregam JS no bundle só pra orquestrar. JS desce só pros 6 islands legítimos (Tabs, Search, Pagination, View, FixedList, CustomList). Estabelece precedente arquitetural útil: **wrapper que só orquestra islands fica Server; quem precisa decidir condicional consulta o param dentro de si.**

> **Nota arquitetural.** As listas Fixed e Custom permanecem client porque são alimentadas por `useSuspensePages()`. Pra virarem Server seria preciso mover o fetch para `caller.pages.*` na page Server e passar `items` por prop — mesmo caminho discutido em Categories view (sub-padrão B). Fora do escopo deste isolamento mínimo.

### 11. `app/dashboard/posts/page.tsx` — Listagem

**Estado atual.** Page já é Server (`postsParamsLoader` + `prefetchPosts`). O `PostsContainer` é **Server** (sem `"use client"`) e já renderiza diretamente Breadcrumb (Server) + Header (client) + Search (client) + `{children}` + Pagination (client). Padrão diferente de `pages` — não há `*-board.tsx` intermediário; o container já é o orquestrador.

Sub-componentes:
- `posts-header.tsx` (lin 1) — `"use client"`. `useRouter().push("/dashboard/posts/new")` em `handleCreate`. **Falso positivo idêntico ao `categories-header`.** O `PostsHeader` base em `posts-entity-components.tsx` (lin 32) já expõe `newButtonHref` na união discriminada `({ onNew } | { newButtonHref })`.
- `posts-search.tsx` (lin 1) — `"use client"`. `usePostsSearch()` (debounce). **Cliente legítimo.**
- `posts-pagination.tsx` (lin 1) — `"use client"`. `useSuspensePosts()` (cache client) + `usePostsParams()`. **Cliente legítimo.**
- `posts-view.tsx` (lin 1) — `"use client"`. `useSuspensePosts()` + `useRemovePost()` (mutação inline). **Cliente legítimo.**

**O que pode virar Server:**
- `posts-header.tsx` — apagar `"use client";`/`useRouter`/`handleCreate`. Trocar a chamada por `newButtonHref="/dashboard/posts/new"`:
  ```tsx
  export const PostsHeader = ({ disabled }: { disabled?: boolean }) => (
    <PostsHeaderBase
      title="Posts"
      description="Crie e gerencie posts do blog"
      newButtonHref="/dashboard/posts/new"
      newButtonLabel="Novo post"
      disabled={disabled}
    />
  );
  ```

**O que precisa continuar client:** `posts-search.tsx`, `posts-pagination.tsx`, `posts-view.tsx` — todos legítimos.

**Como isolar.**

1. **`posts-header.tsx` → Server.** ~5 linhas alteradas. Sem outras mudanças no container ou na árvore.

**Custo.** Trivial. 1 arquivo.

**Ganho.** Wrapper deixa de carregar `useRouter` + handler só pra navegar. Mesma melhoria pequena que `categories-header` ganharia.

> **Nota.** O `PostsHeader` base em `posts-entity-components.tsx` continua sendo Client Component porque o **arquivo inteiro** tem `"use client"` no topo (lin 1) — então mesmo a variante `newButtonHref` (que é puramente HTML: `<Button asChild><Link>`) atravessa boundary client. É bundle-waste residual herdado da concentração desse arquivo. Refatorar `posts-entity-components.tsx` (separar componentes puros — `PostsHeader`, `PostsLoadingView`, `PostsErrorView`, `PostsEmpty`, `PostsList` — em arquivo Server, mantendo `"use client"` só nos que têm hooks/handlers) fica como item para auditoria fina dessa "biblioteca", fora deste escopo.

### Padrão emergente — atualização

A análise dessas duas páginas confirma e expande o **Sub-padrão A** (listagens):

- **`*-header.tsx` que só faz `router.push("/criar")`** → falso positivo direto. Trocar por `newButtonHref` (suportado tanto pelo `EntityHeader` quanto pelo `PostsHeader` base). Aplicação imediata: `pages-header`, `posts-header`, `categories-header`, `scripts-header` — todos com a mesma pegadinha. (`tools-header` é diferente: tem filtro de visualização grid/tabela, fica client.)
- **Wrapper `*-board.tsx` / `*-container.tsx` que só orquestra islands com guards condicionais** → vira Server quando os guards descem para os próprios islands. Padrão novo, capturado aqui em `pages-board.tsx`. Generalização da mesma jogada que `pages-pagination.tsx` já implementava por dentro.
- **`*-entity-components.tsx`** com `"use client"` global no arquivo é uma armadilha de bundle: derruba para client mesmo os exports que seriam puros. Item de fundo para revisão arquitetural separada.

---

## Análise detalhada — Scripts e Tools listagem

Aprofundamento das duas últimas linhas pendentes (`#14` e `#17`). Scripts é o gêmeo direto de `posts/categories` (mesmo esqueleto, mesmo falso positivo). Tools é o caso mais denso da família — board com Context Provider de seleção, command palette, filter bar e duas visualizações (grid/table) — e exige avaliar se o Provider precisa mesmo envolver toda a árvore.

### 14. `app/dashboard/scripts/page.tsx` — Listagem

**Estado atual.** Page é Server (`scriptsParamsLoader` + `prefetchScripts`). O `ScriptsContainer` é **já Server** (não tem `"use client"`) e renderiza diretamente `DashboardBreadcrumb` (Server) + Header + Search + `{children}` + Pagination.

Sub-componentes:
- `scripts-header.tsx` (lin 1) — `"use client"`. `useRouter().push("/dashboard/scripts/create")` em `handleCreate`. **Falso positivo idêntico ao `categories-header`/`posts-header`/`pages-header`.** O `EntityHeader` já expõe `newButtonHref` na união discriminada `({ onNew } | { newButtonHref })`, e `EntityHeader` em si é Server.
- `scripts-search.tsx` (lin 1) — `"use client"`. `useEntitySearch` + `useScriptsParams` (input controlado + debounce + URL sync). **Cliente legítimo.**
- `scripts-pagination.tsx` (lin 1) — `"use client"`. `useSuspenseScripts()` (cache client) + `useScriptsParams()` + `setParams({ page })`. **Cliente legítimo** enquanto o padrão for `useSuspense*` no dashboard. Mesma situação de `categories-pagination`: dá pra mover pra Server quando a page resolver o fetch via `caller.scripts.getMany(params)` e passar `page`/`totalPages` por prop, mas envolve PR maior fora do escopo do isolamento mínimo.
- `scripts-view.tsx` (`views/`, lin 1) — `"use client"`. `useSuspenseScripts` + `useRemoveScript` (mutação inline). **Cliente legítimo** enquanto `useSuspense*` for o padrão.

**O que pode virar Server:**
- `scripts-header.tsx` — apagar `"use client";`/`useRouter`/`handleCreate`. Trocar prop por:
  ```tsx
  export const ScriptsHeader = ({ disabled }: { disabled?: boolean }) => (
    <EntityHeader
      title="Scripts globais"
      description="Gerencie scripts externos (Analytics, chatbots, pixels) injetados no site."
      newButtonHref="/dashboard/scripts/create"
      newButtonLabel="Novo script"
      disabled={disabled}
    />
  );
  ```

**O que precisa continuar client:** `scripts-search.tsx`, `scripts-pagination.tsx`, `scripts-view.tsx` — todos legítimos pelos motivos acima.

**Como isolar.**

1. **`scripts-header.tsx` → Server.** Apagar `"use client"`, remover `useRouter` e `handleCreate`, trocar `onNew` por `newButtonHref`. ~10 linhas alteradas. Sem outras mudanças no container ou na árvore.

**Custo.** Trivial. 1 arquivo.

**Ganho.** Wrapper Header deixa de hidratar — não carrega `useRouter` só pra navegar. Pequeno por arquivo, mas fecha o ciclo do mesmo falso positivo já mapeado em `categories-header`, `posts-header` e `pages-header` — todos passam a virar Server na mesma PR ou em PRs irmãs com edição de uma linha cada.

### 17. `app/dashboard/tools/page.tsx` — Listagem (caso denso)

**Estado atual.** Page é Server (`toolsParamsLoader` + `prefetchTools` + `prefetchToolsStats` + `prefetchCategories`). `ToolsContainer` é **já Server** (puro wrapper de layout — `<div>` com `max-w-7xl`). Mas o `ToolsBoard` carrega `"use client"` mesmo sem hook próprio, só por causa do `<ToolsSelectionProvider>` que envolve a árvore inteira.

Sub-componentes (8 no total):
- `tools-board.tsx` (lin 1) — `"use client"`. Body é só composição: `<ToolsSelectionProvider>` + breadcrumb HTML + `<ToolsHeader>` + `<ToolsStats>` + `<ToolsFilterBar>` + `<ToolsBulkActionsBar>` + `<ToolsView>` + `<ToolsPagination>` + `<ToolsCommandPalette>`. **Sem hook ou state local próprio.** O `"use client"` só existe pelo Provider que está aqui dentro. (Detalhe: o breadcrumb é "manual" — `<nav>` + `<Link>` — em vez do `<DashboardBreadcrumb>` usado nos outros containers; não impacta a auditoria, só anota inconsistência.)
- `tools-header.tsx` (lin 1) — `"use client"`. `useRouter().push("/dashboard/tools/create")` em `handleCreate`. **Falso positivo direto** — o relatório original já anotava em "Headers tipo `*-header.tsx`". Mesmo bug copy-paste de `categories-header`/`scripts-header`.
- `tools-stats.tsx` (lin 1) — `"use client"`. **Reclassificação.** O resumo deste relatório (lin 112, 141) afirmava "38 linhas, sem `useState` / `useEffect` / `useRouter` / `useQuery` / `onClick`. Apenas Cards com contagens passadas via prop. Candidato a Server." O código atual mostra outra coisa: lin 5 importa `useSuspenseToolsStats`, lin 28 chama `const { data } = useSuspenseToolsStats();`. **Cliente legítimo agora.** O resumo no topo está desatualizado — provavelmente reflete um estado anterior (props vinha por fora) e foi alterado em refactor posterior. **Não é mais candidato a Server** sem antes mover o fetch pra page Server e passar `data` por prop.
- `tools-filter-bar.tsx` (lin 1) — `"use client"`. `useEntitySearch` + `useToolsParams` + `useCategoriesForFilter` + 3 `<Select onValueChange>` + 2 botões de toggle de view. **Cliente legítimo** (input interativo + 4 controles client).
- `tools-bulk-actions-bar.tsx` (lin 1) — `"use client"`. `useToolsSelection` + `useState(open)` + `useBulkDeleteTools` + `<Dialog>` de confirmação. **Cliente legítimo** (consome Context de seleção + mutação + state local).
- `tools-command-palette.tsx` (lin 1) — `"use client"`. `useState(open/search)` + `useEffect` (atalho ⌘K) + `useRouter` + `useQuery` (busca dinâmica) + `useToolsParams`. **Cliente legítimo** (atalho de teclado e Dialog dinâmico).
- `tools-pagination.tsx` (lin 1) — `"use client"`. `useToolsQuery` + `useToolsParams` + handlers de paginação e page-size. **Cliente legítimo.**
- `tools-view.tsx` (`views/`) — `"use client"` provavelmente. Decide grid vs table via `params.view` e renderiza `<ToolsGrid>` ou `<ToolsTable>`. **Cliente legítimo** enquanto a leitura do `view` for via hook.
- `tools-grid.tsx` / `tools-table.tsx` — `"use client"`. Cards/linhas com `useRouter` (`onClick={() => router.push(...)}`), `useToolsSelection`, `useRemoveTool`, checkboxes, sort headers, dropdown de ações. **Cliente legítimo por design** — interativo de ponta a ponta.

**Análise do `<ToolsSelectionProvider>`.** Hoje envolve a árvore inteira. Quem realmente consome o context (via `useToolsSelection`)? Apenas:
- `tools-bulk-actions-bar.tsx` (lin 14)
- `tools-grid.tsx` (lin 20)
- `tools-table.tsx` (lin 30)

Nenhum dos outros (`ToolsHeader`, `ToolsStats`, `ToolsFilterBar`, `ToolsCommandPalette`, `ToolsPagination`) toca `useToolsSelection`. **O Provider pode ser empurrado pra dentro do escopo onde é consumido**, liberando o board pra ser Server.

**O que pode virar Server:**
1. `tools-header.tsx` — apagar `"use client"`/`useRouter`/`handleCreate`. Trocar prop por `newButtonHref="/dashboard/tools/create"`. Mesmo padrão dos demais headers. ~5 linhas.
2. `tools-board.tsx` — apagar `"use client"`. Mover `<ToolsSelectionProvider>` pra envolver só `<ToolsBulkActionsBar>` + `<ToolsView>` (`<ToolsGrid>`/`<ToolsTable>` viajam dentro de `<ToolsView>`). `<ToolsCommandPalette>` continua fora do Provider — ele não usa selection. O board vira composição Server pura, e o Provider client é importado e usado no JSX como qualquer outro Client Component (a fronteira client é estabelecida pelo arquivo `use-tools-selection.ts` que já tem `"use client"` no topo).

**O que precisa continuar client:** todo o resto — `tools-stats`, `tools-filter-bar`, `tools-bulk-actions-bar`, `tools-command-palette`, `tools-pagination`, `tools-view`, `tools-grid`, `tools-table`.

**Como isolar.**

**Caminho mínimo (recomendado pra esta auditoria de isolamento):**

1. **`tools-header.tsx` → Server.** Apagar `"use client"`/`useRouter`/`handleCreate`. Trocar prop por `newButtonHref="/dashboard/tools/create"`. ~5 linhas.

2. **`tools-board.tsx` → Server.** Apagar `"use client"`. Reorganizar a árvore para escopar o Provider:
   ```tsx
   import { ToolsSelectionProvider } from "@/modules/dashboard/hooks/use-tools-selection";
   // ... outros imports ...

   export const ToolsBoard = () => (
     <>
       <div className="flex flex-col gap-y-6">
         <nav aria-label="Navegação" className="...">
           <Link href="/dashboard">Dashboard</Link>
           <span aria-hidden>/</span>
           <span>Ferramentas</span>
         </nav>
         <ToolsHeader />
         <ToolsStats />
         <div className="flex flex-col gap-y-4">
           <ToolsFilterBar />
           <ToolsSelectionProvider>
             <ToolsBulkActionsBar />
             <ToolsView />
           </ToolsSelectionProvider>
         </div>
         <ToolsPagination />
       </div>
       <ToolsCommandPalette />
     </>
   );
   ```
   Server Components podem importar e renderizar Client Components — a fronteira client é estabelecida pelo próprio `<ToolsSelectionProvider>` (que já vive em arquivo com `"use client"` no topo).

   Pré-condição: confirmar que `<ToolsView>` (em `views/tools-view.tsx`) é o único caminho até `<ToolsGrid>`/`<ToolsTable>` — sim, é o que o board já faz hoje. Sem alterações estruturais em grid/table/view.

**Custo.** Pequeno-médio. 2 arquivos (`tools-header.tsx`, `tools-board.tsx`), ~15 linhas no total. Não toca grid/table/stats/filter/palette.

**Ganho.** Wrapper Header e wrapper Board deixam de hidratar. JS desce só pros 8 islands legítimos (Stats, FilterBar, Provider, BulkActionsBar, CommandPalette, Pagination, View → Grid/Table). Estabelece o mesmo precedente arquitetural já validado em `pages-board.tsx`: **wrapper que só orquestra islands fica Server; Context Provider client é empurrado pro escopo onde é realmente consumido.**

**Caminho completo (PR seguinte, opcional):** mover fetch pra page Server (`caller.tools.getMany(params)` + `caller.tools.stats()`), passar `items`/`page`/`totalPages`/`stats` por prop, recortar `ToolsStats` em "container Server + número client" (ou aceitar Stats Server inteiro), recortar `<ToolsGrid>`/`<ToolsTable>` em "card/row Server + actions island". Mesmo escopo discutido em Categories view (sub-padrão B). Custo médio-alto, fora deste isolamento.

**Atualização da reclassificação.** A entrada da tabela de checks na lin 444 listava `tools-stats` como conversão pendente. Após inspeção, **`tools-stats.tsx` permanece client legítimo** enquanto consumir `useSuspenseToolsStats()` direto. Conversão pra Server depende do "caminho completo" acima (mover fetch pra page).

### Padrão emergente — fechamento

A análise das oito páginas pendentes da auditoria cristaliza três jogadas reaproveitáveis em todo o dashboard:

1. **Header com `router.push("/criar")`** → falso positivo universal. Trocar por `newButtonHref`. Aplica em `categories-header`, `posts-header`, `pages-header`, `scripts-header`, `tools-header` — 5 arquivos com bug idêntico, ~5 linhas cada.
2. **Wrapper `*-board.tsx` / `*-container.tsx` sem hook próprio** → vira Server. Se houver Context Provider client (`<ToolsSelectionProvider>`), empurrá-lo pro escopo onde é consumido. Se houver guard condicional (`isCustomTab` em `pages-board`), descê-lo pro próprio island. Aplica em `pages-board`, `tools-board`.
3. **Mudança de modo (view-mode ↔ edit-mode) via `useState`** → trocar por rota dedicada `*/[id]/edit/page.tsx`. Mata o `useState(isEditing)` e libera o view-mode pra ser Server. Aplica em `category-view` (e potencialmente em outras páginas de detalhe — `script-view`, `tool-view` — que provavelmente têm o mesmo padrão; auditoria fina pendente).

A discussão sobre mover o fetch pra `caller.*` Server-side e passar `items`/`page`/`totalPages` por prop fica como Sub-padrão C (caminho completo) — uma PR maior por listagem, fora do escopo do isolamento mínimo.

---

## Tabela de checks

Auditoria = inventariada. Conversões = pendentes (em PR posterior).

| # | Página / arquivo | Auditado | Conversão Server? |
|---|---|---|---|
| L | `app/dashboard/layout.tsx` | ✅ | n/a (já Server; sidebar precisa ficar client) |
| 1 | `app/dashboard/page.tsx` — Overview | ✅ | ✅ convertido — view virou Server recebendo `data` por prop (page chama `caller.dashboard.overview()`); 3 charts isolados em islands (`dashboard-overview-{area,pie,bar}-chart.tsx`); KpiGrid/header/listas Server; `overview-prefetch.ts` e `use-suspense-overview.tsx` removidos |
| 2 | `app/dashboard/account/page.tsx` | ✅ | ✅ convertido — view virou Server recebendo `user`/`session` por prop (page usa `requireAuth()` server-side); islands `account-tabs.tsx` (Tabs+Profile+Security), `account-copyable-value.tsx`, `account-sign-out-button.tsx`; "Voltar" virou `<Link>`; ProfileSection usa `router.refresh()` no lugar de `useSession().refetch` |
| 3 | `app/dashboard/categories/page.tsx` | ✅ | ✅ convertido (caminho mínimo) — `categories-header.tsx` virou Server: `useRouter`/`onNew`/handler removidos, troca por `newButtonHref="/dashboard/categories/create"`. Search/pagination/view permanecem client (legítimos). Pagination → Server fica para PR de "caminho completo" junto com mover fetch p/ caller |
| 4 | `app/dashboard/categories/create/page.tsx` | ✅ | ❌ form é client legítimo |
| 5 | `app/dashboard/categories/[id]/page.tsx` | ✅ | ✅ convertido — page resolve fetch via `caller.categories.getOne({ id })` e passa `category` por prop; `category-view.tsx` virou Server (markup determinístico, breadcrumb, header, seções e aside todos HTML estático); island `category-actions.tsx` engole o que tem motivo client (dialog de remover + `useRemoveCategory` + `useRouter`, com variants `toolbar`/`aside`); branch `if(isEditing)` removido — modo edição virou rota dedicada `app/dashboard/categories/[id]/edit/page.tsx` (Server) + `edit-category-view.tsx` (client com `CategoryForm` + `useUpdateCategory`); botão "Voltar" virou `<Link>` no /edit |
| 6 | `app/dashboard/pages/page.tsx` | ✅ | ✅ convertido (caminho mínimo) — `pages-header.tsx` virou Server (apagado `"use client"`, já usava `newButtonHref`); `pages-board.tsx` virou Server (removido `"use client"` + `usePagesParams` + `isCustomTab`; renderiza `<PagesSearch />` e `<PagesPagination />` incondicionalmente); `pages-search.tsx` ganhou guard interno `if (params.tab !== "custom") return null;` espelhando o que `pages-pagination.tsx` já fazia. Tabs/search/pagination/view/lists permanecem client (legítimos: input controlado, debounce, `useSuspense*`, mutações inline) |
| 7 | `app/dashboard/pages/homepage/page.tsx` | ✅ | ❌ form/editor client legítimo |
| 8 | `app/dashboard/pages/all-tools/page.tsx` | ✅ | ❌ form client legítimo |
| 9 | `app/dashboard/pages/custom/create/page.tsx` | ✅ | ❌ page builder client legítimo |
| 10 | `app/dashboard/pages/custom/[id]/page.tsx` | ✅ | ❌ page builder client legítimo |
| 11 | `app/dashboard/posts/page.tsx` | ✅ | ✅ convertido (caminho mínimo) — `posts-header.tsx` virou Server: apagado `"use client"`/`useRouter`/`handleCreate`, prop trocada por `newButtonHref="/dashboard/posts/new"`. Search/pagination/view permanecem client (legítimos). Bundle-waste residual em `posts-entity-components.tsx` (que ainda tem `"use client"` global) fica para refatoração de fundo dessa biblioteca, fora deste isolamento |
| 12 | `app/dashboard/posts/new/page.tsx` | ✅ | ❌ form + Editor.js client legítimo |
| 13 | `app/dashboard/posts/[id]/page.tsx` | ✅ | ❌ form client legítimo |
| 14 | `app/dashboard/scripts/page.tsx` | ✅ | ✅ convertido (caminho mínimo) — `scripts-header.tsx` virou Server: apagado `"use client"`/`useRouter`/`handleCreate`, prop trocada por `newButtonHref="/dashboard/scripts/create"`. Search/pagination/view permanecem client (legítimos: input controlado/debounce, `useSuspenseScripts`, mutação inline) |
| 15 | `app/dashboard/scripts/create/page.tsx` | ✅ | ❌ form client legítimo |
| 16 | `app/dashboard/scripts/[id]/page.tsx` | ✅ | ❌ form client legítimo |
| 17 | `app/dashboard/tools/page.tsx` | ✅ | ✅ convertido (caminho mínimo) — `tools-header.tsx` virou Server (apagado `"use client"`/`useRouter`/`handleCreate`, prop trocada por `newButtonHref="/dashboard/tools/create"`); `tools-board.tsx` virou Server (removido `"use client"`; `<ToolsSelectionProvider>` empurrado p/ envolver só `<ToolsBulkActionsBar>` + `<ToolsView>` — os 3 consumidores de `useToolsSelection` (BulkActionsBar/Grid/Table) ficam dentro do escopo reduzido; CommandPalette ficou fora do Provider porque não consome selection). `tools-stats` continua client (consome `useSuspenseToolsStats`); FilterBar/Pagination/View/Grid/Table/CommandPalette permanecem client (legítimos) |
| 18 | `app/dashboard/tools/create/page.tsx` | ✅ | ❌ form client legítimo |
| 19 | `app/dashboard/tools/[id]/page.tsx` | ✅ | ❌ form client legítimo |

> Rota `app/dashboard/spike-editorjs/` removida em 2026-04-30 (junto com `spike-editorjs-view.tsx` e `_spike-hello.plugin.ts`) — cleanup pós-Fase 9 do `plan-page-blocks-editorjs-v2`.

**Legenda:** ✅ feito · ⏳ inspecionar mais a fundo · ❌ deve continuar client · 🗑️ remover.
