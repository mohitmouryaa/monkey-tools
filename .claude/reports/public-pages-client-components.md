# Páginas em `(main)` que importam Client Components

**Data:** 2026-04-30
**Worktree:** `melhorias-react`
**Branch:** `melhorias-react` (rebased em `dev-br`)
**Diretório base:** `apps/web/app/(main)/`

## Resumo

Nenhuma página em `(main)` declara `"use client"` no próprio arquivo — todas são Server Components. A análise abaixo segue a árvore de imports e lista os Client Components renderizados (direta ou transitivamente) por cada página.

- **8 páginas** importam pelo menos um Client Component
- **2 arquivos** em `(main)` são 100% Server na árvore inspecionada

---

## Páginas COM Client Components (8)

### 1. `app/(main)/page.tsx` — Home
- `modules/hero/ui/components/new-tools-grid.tsx`
- `modules/hero/ui/components/how-it-works.tsx`
- `react-error-boundary` (lib externa)

### 2. `app/(main)/[slug]/page.tsx` — Páginas custom
- `modules/pages/ui/components/blocks/cards-block.tsx`
- `modules/pages/ui/components/blocks/steps-block.tsx`

### 3. `app/(main)/blog/page.tsx` — Listagem do blog
- `modules/blog/ui/components/post-filter-bar.tsx`
- `modules/blog/ui/components/blog-pagination.tsx`

### 4. `app/(main)/blog/[slug]/page.tsx` — Post individual
- `modules/common/providers/pdf-lib-provider.tsx`
- `modules/blog/ui/components/share-bar.tsx`

### 5. `app/(main)/comparar/[slug]/page.tsx` — Páginas comparativas
- `modules/pages/ui/components/blocks/cards-block.tsx`
- `modules/pages/ui/components/blocks/steps-block.tsx`

### 6. `app/(main)/ferramentas/page.tsx` — Listagem geral de ferramentas
- `modules/tools/ui/components/tools-filter-grid.tsx`
- `modules/tools/ui/components/category-card.tsx`
- `modules/tools/ui/components/tool-audience-benefits.tsx`

### 7. `app/(main)/ferramentas/[toolCategory]/page.tsx` — Página de categoria
- `modules/common/ui/components/tool-card.tsx`
- `modules/tools/ui/components/category-card.tsx`
- `modules/tools/ui/components/tool-audience-benefits.tsx`

### 8. `app/(main)/ferramentas/[toolCategory]/[tool]/page.tsx` — Ferramenta individual
- `modules/tools/ui/components/tool-steps.tsx`
- `modules/tools/ui/components/related-tools.tsx`
- `modules/tools/ui/components/youtube-embed.tsx`
- `modules/tools/ui/components/tool-header.tsx`
- `modules/tools/ui/components/tool-audience-benefits.tsx`
- `modules/common/providers/pdf-lib-provider.tsx`

---

## Arquivos SEM Client Components em `(main)` (2)

- `app/(main)/layout.tsx` — Header e Footer são Server Components.
- `app/(main)/empresas/page.tsx` — `EmpresasView` é Server Component puro.

---

## Análise de isolamento (páginas 1 e 2)

### 1. `app/(main)/page.tsx` — Home

| Componente | Era client por | Ação | Resultado |
|---|---|---|---|
| `ErrorBoundary` (`react-error-boundary`) | Lib externa client envolvendo a árvore inteira da Home | Removido da page; criado `app/(main)/error.tsx` (boundary nativo do Next, co-localizado) | Boundary isolado em arquivo próprio; `page.tsx` volta a ser Server puro |
| `HowItWorks` | `"use client"` legado — sem hooks, sem handlers | Removido `"use client"` | Vira Server Component |
| `NewToolsGrid` | `useState` real (filtro de tabs por categoria) | Mantido client — interatividade legítima | Continua client, isolado |
| `ToolCard` (transitivo via `NewToolsGrid`) | `"use client"` legado — só `<Link>` + estilos `group-hover` (CSS puro) | Removido `"use client"` | Server puro; client transitivo apenas quando consumido por pais client |

**Saldo:** 1 client component legítimo (`NewToolsGrid`) e o `error.tsx` (convenção Next). 2 componentes voltam a Server.

### 2. `app/(main)/[slug]/page.tsx` — Páginas custom

| Componente | Era client por | Ação | Resultado |
|---|---|---|---|
| `CardsBlock` | `"use client"` legado — só `DynamicIcon` + map de dados | Removido `"use client"` | Server Component |
| `StepsBlock` | `"use client"` legado — só `DynamicIcon` + map de dados | Removido `"use client"` | Server Component |

**Saldo:** árvore 100% Server. `PageContentRenderer` já era Server e continua sendo.

### 3. `app/(main)/blog/page.tsx` — Listagem do blog

| Componente | Era client por | Ação | Resultado |
|---|---|---|---|
| `BlogPagination` | `useQueryStates` (nuqs) + `onClick` em `<Button>` para mudar URL | Removido `"use client"`. Trocado por `<Link href="/blog?page=N&q=...&tool=...">` (via `<Button asChild>`); page passa `q` e `tool` como prop para preservar filtros na navegação | Server Component puro. Navegação client-side preservada via `<Link>`; sem JS extra para o leitor |
| `PostFilterBar` | `useState` (debounced search), `useQueryStates` (nuqs) + `useQuery(trpc.tools.getMany)` para popular o select | Mantido `"use client"` (busca debounced + sync com URL é interatividade real). Removidos `useTRPC`/`useQuery`; lista de tools agora chega como prop, buscada server-side em `unstable_cache(...["blog-filter-tools-v1"], { revalidate: 300, tags: ["tools"] })` na própria page | Continua client, porém sem fetch client-side: bundle menor, sem flash do select vazio, sem chamada extra do react-query |

**Saldo:** 1 client component legítimo (`PostFilterBar`, agora mais leve). `BlogPagination` virou Server Component. Page busca tools server-side em paralelo com a lista de posts via `Promise.all`.

### 4. `app/(main)/blog/[slug]/page.tsx` — Post individual

| Componente | Era client por | Ação | Resultado |
|---|---|---|---|
| `ShareBar` | `useState` (`copied`) + handlers (`navigator.clipboard.writeText`, `navigator.share`) — mas a maior parte do componente eram apenas 5 `<a target="_blank">` para X / Facebook / LinkedIn / WhatsApp / E-mail (HTML estático) | Removido `"use client"` do wrapper. Os 5 links sociais e o card visual ficam server-rendered. Extraído `ShareActions` (`modules/blog/ui/components/share-actions.tsx`) — client island mínimo só com os botões "Copiar link" e "Compartilhar" (mobile / `navigator.share`) | `ShareBar` agora é Server Component; só o ilhote `ShareActions` carrega JS. Mesma API pública (`url`, `title`, `variant`) |
| `PDFLibProvider` | `useEffect` para configurar `pdfjs-dist.GlobalWorkerOptions.workerSrc` (browser-only) | Mantido `"use client"`. Já estava bem isolado: só é montado quando o post tem um bloco `toolEmbed` (via `ToolEmbedBlockRenderer`) | Sem mudança — interatividade legítima (browser API) e escopo já mínimo |

**Saldo:** `ShareBar` deixa de ser client; client JS reduzido aos 2 botões reais (`ShareActions`). `PDFLibProvider` permanece — bem isolado, condicional ao tipo de bloco.

### 5. `app/(main)/comparar/[slug]/page.tsx` — Páginas comparativas

| Componente | Era client por | Ação | Resultado |
|---|---|---|---|
| `CardsBlock` | Já tratado na página 2 | — | Server Component (compartilhado) |
| `StepsBlock` | Já tratado na página 2 | — | Server Component (compartilhado) |

**Saldo:** árvore 100% Server, sem novas mudanças. A própria `page.tsx` já era Server (`caller.pages.getComparisonBySlug`, `dangerouslySetInnerHTML` em branch legado, `PageContentRenderer` server). Os blocos `CardsBlock`/`StepsBlock` foram desclientizados na conversão da página 2 — eles são compartilhados via `PageContentRenderer`, então todo consumidor (custom pages, comparativos) herda Server gratuitamente.

> Observação: a árvore de comparativos não inclui `ToolEmbedBlockRenderer` (logo não puxa `PDFLibProvider`). É uma página de conteúdo puro.

### 6. `app/(main)/ferramentas/page.tsx` — Listagem geral de ferramentas

| Componente | Era client por | Ação | Resultado |
|---|---|---|---|
| `ToolsFilterGrid` | `useState` real (filtro de tabs por categoria) | Mantido client — interatividade legítima | Continua client, isolado |
| `CategoryCard` | `"use client"` legado — só `<Link>`, `DynamicIcon`, CSS variables inline e hover via Tailwind (`group-hover:`) | Removido `"use client"` | Server Component |
| `ToolAudienceBenefits` | `"use client"` legado — render determinístico de duas listas com `DynamicIcon`, sem hooks ou handlers | Removido `"use client"` | Server Component |
| `ToolFAQ`, `FAQSchema`, `BreadcrumbSchema` | já eram Server | — | sem mudança |

**Saldo:** 1 client component legítimo (`ToolsFilterGrid`, isolado dentro do bloco "Todas as ferramentas"). Categorias em destaque, blocos educacionais ("Para quem é"/"Vantagens") e CTA final viram 100% Server. `AllToolsView` já era Server Component, então a árvore só descarrega JS no ilhote do filtro — o resto da página chega pré-renderizado.

> Observação: `CategoryCard` é um caso clássico de `"use client"` desnecessário — `style={{ background: ... }}` com `color-mix()` em runtime é apenas atributo HTML, e `group-hover:` é CSS, não JS. Mesma família do `ToolCard` desclientizado na página 1.

### 7. `app/(main)/ferramentas/[toolCategory]/page.tsx` — Página de categoria

| Componente | Era client por | Ação | Resultado |
|---|---|---|---|
| `ToolCard` | Já tratado na página 1 | — | Server Component (compartilhado) |
| `CategoryCard` | Já tratado na página 6 | — | Server Component (compartilhado) |
| `ToolAudienceBenefits` | Já tratado na página 6 | — | Server Component (compartilhado) |
| `ToolFAQ`, `FAQSchema`, `BreadcrumbSchema`, `Breadcrumb`, `InvalidToolSelection` | Já eram Server | — | sem mudança |

**Saldo:** árvore 100% Server, sem novas mudanças. `CategoryView` (`async`) é Server e busca categoria + tools + outras categorias em paralelo via `caller.*`. Os 3 componentes "decorativos" (cards de tool, cards de categoria, blocos audience/benefits) já tinham sido desclientizados em rotas anteriores — esta página colhe o benefício de graça. O CTA final, blocos educacionais e "Outras categorias" são todos HTML estático com `<Link>`.

### 8. `app/(main)/ferramentas/[toolCategory]/[tool]/page.tsx` — Ferramenta individual

| Componente | Era client por | Ação | Resultado |
|---|---|---|---|
| `ToolHeader` | `"use client"` legado — só `DynamicIcon` + estilos inline | Removido `"use client"` | Server Component |
| `ToolSteps` | `"use client"` legado — render determinístico de 3 passos com `DynamicIcon` e cores inline | Removido `"use client"` | Server Component |
| `RelatedTools` | `"use client"` legado — só `<Link>` + `DynamicIcon` + Tailwind hover | Removido `"use client"` | Server Component |
| `ToolAudienceBenefits` | Já tratado na página 6 | — | Server Component (compartilhado) |
| `YouTubeEmbed` | `react-lite-youtube-embed` injeta iframe via clique do usuário (lib client-only) | Mantido `"use client"` | Continua client, isolado e renderizado condicional a `toolData.videoId` |
| `PDFLibProvider` | `useEffect` para `pdfjs-dist.GlobalWorkerOptions.workerSrc` (browser API) | Mantido `"use client"` | Continua client, escopo já mínimo (envolve apenas `<ToolComponent />` no card de upload) |
| `ToolComponent` (dinâmico via `await import(...)`) | UI específica de cada ferramenta (upload, processamento, download) | Não tocado — fora do escopo da auditoria | Cada implementação decide o próprio modelo |

**Saldo:** 3 componentes deixam de ser client. Os 2 client legítimos (`YouTubeEmbed`, `PDFLibProvider`) ficam isolados e condicionais — só carregam JS quando a ferramenta tem vídeo associado / quando o usuário entra na página da ferramenta. O conteúdo SEO/GEO crítico (hero, steps, audience/benefits, FAQ, related, closing) chega 100% pré-renderizado, exatamente o que importa para crawlers e LLMs.

> Observação: `ToolHeader`, `ToolSteps` e `RelatedTools` formam um padrão recorrente — cards/seções "decorativas" com cores dinâmicas via inline styles que ficaram client por convenção. Inline `style={{ backgroundColor: ... }}` é apenas atributo serializável; `group-hover:` é CSS puro. Sem hooks, sem handlers, sem browser API → Server.

### Heurística para quebrar componentes client mistos

Quando um componente client é majoritariamente HTML estático com **alguns** pontos interativos (botão de copiar, share nativo, "ver mais"), o caminho é:

1. **Inverter o default**: o componente externo vira Server Component.
2. **Extrair o pedaço interativo** num client island com nome próprio (`*-actions.tsx`, `*-toggle.tsx`, etc.).
3. **Co-localizar** o island no mesmo diretório do componente que o consome.
4. **Manter a API pública estável** — quem importa o componente externo nem percebe a quebra.

Aplicado aqui em `ShareBar` (servidor) + `ShareActions` (cliente). Mesmo padrão pode ser aplicado a navbars com dropdown isolado, cards com botão de favoritar, etc.

### Heurística para paginação SSR-friendly

`useQueryStates` + `onClick` em paginação é cliente desnecessário. App Router já faz prefetch de `<Link>` e re-renderização parcial via React Server Components. Substituir pelos `<Link href="?page=N">` com os filtros atuais preservados em querystring elimina hooks, JS e bundle, mantém histórico do navegador funcionando, e ainda dá rota indexável por crawler. Padrão a replicar nas demais paginações pendentes (`ferramentas`, etc.).

### Princípio aplicado

Um componente só recebe `"use client"` se **ele próprio** precisa de:
- `useState` / `useReducer` / `useEffect` / outros hooks de client;
- Event handlers (`onClick`, `onChange`, etc.);
- Browser-only APIs (`window`, `localStorage`, `IntersectionObserver`...);
- Context Providers de client.

Componentes "decorativos" com hover via Tailwind (`group-hover`, `hover:`), CSS variables inline e renderização determinística são Server Components — mesmo que sejam consumidos por pais client (viram client transitivamente sem JS extra).

### Estratégia de Error Boundaries

Dois níveis:

1. **Boundary de rota (`error.tsx`)** — `app/(main)/error.tsx`. Rede de segurança grossa: qualquer erro não capturado em qualquer segmento da rota cai aqui. Convenção do Next, obrigatoriamente Client Component.
2. **Boundaries dedicados por seção** — `modules/common/ui/components/section-error-boundary.tsx` (wrapper client reusável sobre `react-error-boundary`). Aplicado em volta de seções com risco específico de quebra:
   - **Home:** `<NewToolsGrid />` (depende de `Promise.all` em múltiplas queries de categorias).
   - **`[slug]`:** `<PageContentRenderer />` (recebe `OutputData` arbitrário do CMS, com `dangerouslySetInnerHTML` no caminho legado).

Componentes determinísticos sem fetch próprio nem parsing de input externo (Hero, HowItWorks, JsonLd, CardsBlock, StepsBlock) ficam só sob o `error.tsx` da rota — não vale boundary próprio.

---

## `SectionErrorBoundary` — guia de uso

**Arquivo:** `modules/common/ui/components/section-error-boundary.tsx`

Wrapper client reusável em volta do `react-error-boundary`, com fallback visual padronizado (alerta `AlertTriangle` + mensagem em card `bg-muted/40`).

### API

```tsx
interface SectionErrorBoundaryProps {
  children: ReactNode;
  message?: string;                    // padrão: "Não foi possível carregar esta seção agora."
  resetKeys?: ReadonlyArray<unknown>;  // muda a chave → boundary reseta automaticamente
}
```

### Quando usar

Envolva uma seção com `SectionErrorBoundary` quando ela tiver **risco específico de quebra em runtime** que você quer conter sem derrubar a página inteira. Sinais:

- A seção depende de **dados externos com forma variável** (CMS, JSON do banco, payload de terceiros).
- A seção faz **parsing/transformação** que pode estourar com input malformado.
- A seção usa **`dangerouslySetInnerHTML`** ou interpreta blocos arbitrários (editor.js, MDX, AST de blog).
- A seção tem **`Promise.all` / múltiplas queries** onde uma falha não deve ocultar o resto da página.
- A seção tem **dependência de runtime do navegador** que pode falhar (ex.: lib só funciona com `window`, intersection observer, leitor de arquivo).

### Quando NÃO usar

- Componentes determinísticos que só renderizam props (Hero, JsonLd, layouts).
- Componentes simples sem fetch próprio, parsing ou input externo.
- A página inteira — para isso use `error.tsx` da rota.

> Regra prática: se você não consegue descrever em uma frase **o que pode quebrar**, não envolva.

### Exemplos

**Padrão (mensagem custom):**

```tsx
<SectionErrorBoundary message="Não foi possível carregar a lista de ferramentas agora.">
  <NewToolsGrid toolsByCategory={toolsByCategory} />
</SectionErrorBoundary>
```

**Com `resetKeys`** — força reset quando uma dependência muda (útil para listas paginadas/filtradas):

```tsx
<SectionErrorBoundary
  message="Não foi possível carregar os posts."
  resetKeys={[currentPage, activeFilter]}
>
  <BlogList page={currentPage} filter={activeFilter} />
</SectionErrorBoundary>
```

**Mensagem padrão:**

```tsx
<SectionErrorBoundary>
  <SomeRiskySection />
</SectionErrorBoundary>
```

### Onde já está aplicado

- `app/(main)/page.tsx` → em volta de `<NewToolsGrid />`.
- `app/(main)/[slug]/page.tsx` → em volta de `<PageContentRenderer />` (apenas no branch novo, não no legacy HTML — esse já é envolvido pelo `error.tsx` da rota).

### Notas

- Como é Client Component, a `page.tsx` ao redor permanece Server. O custo de bundle é mínimo (a lib `react-error-boundary` já está no projeto e é tree-shakeable).
- O boundary captura erros de **renderização** dos children. Para erros assíncronos (Promises não awaited), é necessário propagar via `throw` dentro de um `useEffect` ou usar `useErrorBoundary().showBoundary(error)`.
- Para fallbacks com mais que mensagem (ex.: botão "tentar novamente", ilustração), criar um boundary específico ou estender este via prop opcional `fallbackRender`. Adicionar quando houver caso real, não preventivamente.

---

## Tabela de checks

| # | Página | Status |
|---|---|---|
| 1 | `app/(main)/page.tsx` — Home | ✅ checked |
| 2 | `app/(main)/[slug]/page.tsx` — Páginas custom | ✅ checked |
| 3 | `app/(main)/blog/page.tsx` — Listagem do blog | ✅ checked |
| 4 | `app/(main)/blog/[slug]/page.tsx` — Post individual | ✅ checked |
| 5 | `app/(main)/comparar/[slug]/page.tsx` — Páginas comparativas | ✅ checked |
| 6 | `app/(main)/ferramentas/page.tsx` — Listagem geral de ferramentas | ✅ checked |
| 7 | `app/(main)/ferramentas/[toolCategory]/page.tsx` — Página de categoria | ✅ checked |
| 8 | `app/(main)/ferramentas/[toolCategory]/[tool]/page.tsx` — Ferramenta individual | ✅ checked |
| — | `app/(main)/layout.tsx` | ✅ já era Server |
| — | `app/(main)/empresas/page.tsx` | ✅ já era Server |
