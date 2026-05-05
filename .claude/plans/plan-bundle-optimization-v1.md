# Plano: Otimização de bundle do apps/web

> Versão: v1 | Criado em: 2026-04-30 | Status: draft

## Contexto

Build local com Next 16.1.1 + Turbopack mostra payloads de JS gigantes em rotas
públicas. Lib pesada (xlsx, jspdf, pdf-lib, jszip, recharts, TipTap) está sendo
incluída eager em rotas onde NÃO é usada. Lucide-react importa o icon set
inteiro. Zod 4 entra em quase tudo via client components. Há também
warnings/erros de configuração herdados do upgrade pro Next 16 (path-to-regexp
v8) e tipagem de Recharts v3 que precisam ser resolvidos para o build estar
limpo.

Medições atuais (gzip do First Load JS, conforme bundle analyzer e build):

| Rota | Payload |
|---|---|
| `/blog/[slug]` | 2570 KB |
| `/ferramentas/[toolCategory]/[tool]` | 2564 KB |
| `/dashboard/tools/[id]` | 2190 KB |
| `/dashboard/tools/create` | 2127 KB |
| `/dashboard/pages/homepage` | 1579 KB |
| `/(auth)/login` | 620 KB |

Origens identificadas:

- `lucide-react` aparece em 4 chunks de ~556 KB com icon set inteiro
- Zod 4 em 3 chunks de ~316 KB
- xlsx (399 KB), jspdf (407 KB+350 KB), pdf-lib (261 KB), jszip (153 KB) eager
  em rotas públicas via tools `import * as XLSX from "xlsx"` em top-level
- recharts (411 KB) eager em `/dashboard` (charts statically importados)
- TipTap (400 KB) eager em tool form (`rich-text-editor.tsx` import top-level)
- Barrel: `tool-embed-block-renderer.tsx` faz `await import(\`@/modules/tools/ui/components/${componentSlug}\`)`. Next/Turbopack resolve o template glob e empacota TODOS os componentes de tool no chunk do `/blog/[slug]`.

Decisão guarda-chuva: **manter mesma rota e mesma UX**. Só virar imports em
dynamic onde a lib só é necessária após interação (clicar em "Converter",
"Baixar", "Editar"). Schemas Zod permanecem no client mas são **isolados em
arquivos co-localizados que NÃO importam nada de server** — o que reduz Zod no
client é só a parte de tree-shaking via `optimizePackageImports`, não mover pra
server.

## Stack & Convenções

- **Next.js 16.1.1 + Turbopack** (App Router). React 19.2.3.
- **Monorepo pnpm + TurboRepo**. App: `apps/web`. Pacotes: `@workspace/ui`,
  `@workspace/database`, `@workspace/types`, `@workspace/queue`,
  `@workspace/storage`.
- **tRPC v11** com SuperJSON. Routers em `apps/web/trpc/routers/`.
- **Forms**: React Hook Form + Zod (`@hookform/resolvers/zod`). Schemas em
  `apps/web/modules/dashboard/schema/<entity>.tsx` (extensão `.tsx` herdada,
  não há JSX dentro).
- **DB**: MongoDB + Mongoose 9 + Typegoose 13. Models em
  `packages/database/src/models/`.
- **UI**: shadcn (`@workspace/ui`), Tailwind 4, Recharts 3, lucide-react.
- **Tool components**: `apps/web/modules/tools/ui/components/<slug>.tsx`,
  `export default` por arquivo, todos client components.
- **Bundle analyzer**: `@next/bundle-analyzer` já está em devDependencies.
- **Style**: Biome — 2 espaços, double quotes, 130 cols.

## Premissas

1. Mudar `import` estático para `dynamic()`/`await import()` é compatível com
   o uso atual: as libs (xlsx, jspdf, pdf-lib, jszip) só rodam **dentro de
   handlers de evento** (click, drop, submit), nunca no render inicial nem em
   `useEffect` de mount imediato.
2. `next/dynamic` com `ssr: false` para Recharts e TipTap não quebra SEO —
   ambos só rodam em `/dashboard` (rota autenticada, não indexada).
3. `optimizePackageImports` do Next 16 funciona via SWC para `lucide-react`
   (transforma `import { Foo } from "lucide-react"` em path import) e tem
   suporte a `zod` (testado no Next 15+).
4. Os schemas Zod usados em `tool-form.tsx`, `account-tabs.tsx`,
   `login-view.tsx` etc. já são definidos sem dependências server-side
   (não importam de `packages/database`, `packages/queue` etc.) — verificável
   por inspeção. Não há refatoração de mover pra server: a [DECISÃO PENDENTE]
   "schemas em server-only" é descartada — schemas Zod precisam estar no
   client para `zodResolver` funcionar.
5. O cache headers em `next.config.mjs` herdados (`/_next/image:path*` e
   `/:path*.(svg|...)`) precisam ser corrigidos para a sintaxe path-to-regexp
   v8 que o Next 16 usa, senão o build emite warning ou ignora os headers.
6. `ChartLegendContent` em `packages/ui/src/components/chart.tsx` (linha
   207-208) tipa via `Pick<RechartsPrimitive.LegendProps, "payload" |
   "verticalAlign">`. Recharts v3 mudou a forma do `payload`. O erro no
   `dashboard-overview-area-chart.tsx:58` é **uso correto** de uma assinatura
   que ficou frágil; o fix vive no chart.tsx do `@workspace/ui`.
7. `PostModel` em `packages/database/src/models/Post.ts` declara
   `@prop({ index: true })` em `status` e `publishedAt` E re-declara
   `model.schema.index({ status: 1, publishedAt: -1 })` — Mongoose loga
   "duplicate index". Mesma coisa para text index sobre `title` + `excerpt`
   onde já existe `unique: true` em `slug` (esse não duplica, mas o text é
   declarado em `getPostModel()` toda vez que o módulo carrega).

## Fora de escopo

- Migração de Editor.js para outro editor.
- Reescrita de tools para Server Components (são interativas por natureza).
- Trocar Recharts por outra lib de chart.
- Cache de tRPC ou ISR de páginas (já tem outro plano coberto).
- Tree-shake de `@imgly/background-removal`, `pdfjs-dist`, `heic2any` —
  são modelo/wasm pesados mas já são dynamic ou só carregam em tools
  específicas (`remover-fundo-imagem`, `pdf-para-jpg`).
- Habilitar `optimizePackageImports` para outras libs além de lucide-react e
  zod (ex: date-fns, recharts) — fica como ponto aberto.
- Code-split de `@editorjs/*` no admin de posts (já tem plano específico).

## Fases de implementação

### Fase 1 — Habilitar `optimizePackageImports` para lucide-react e zod

**Objetivo:** reduzir os ~556 KB de lucide-react e ~316 KB de Zod nos chunks
via tree-shaking automático que o Next 16 oferece.

**Critério de conclusão:** após `pnpm --filter web build`, o output mostra
`/(auth)/login` < 500 KB e o chunk de lucide-react some/baixa drasticamente
no analyzer.

#### 1.1 — Adicionar `experimental.optimizePackageImports` em next.config.mjs
**Arquivo:** `apps/web/next.config.mjs`
**Depende de:** —
Adicionar bloco `experimental: { optimizePackageImports: ["lucide-react", "zod"] }` no objeto `nextConfig`. Manter o resto intacto. Não tocar em `transpilePackages`. Conferir se `experimental` já existe (atualmente não existe).
**Feito quando:** `pnpm --filter web build` roda sem erro novo, e o build log lista `lucide-react` e `zod` em "package imports optimized" (Next imprime isso).

#### 1.2 — Rodar build com analyzer e validar redução
**Arquivo:** N/A (verificação)
**Depende de:** 1.1
Rodar `ANALYZE=true pnpm --filter web build` (o `@next/bundle-analyzer` precisa do flag). Se o `next.config.mjs` ainda não tem o wrapper de bundle-analyzer, adicionar o wrapper condicional ao mesmo arquivo. Comparar tamanho de chunk lucide-react antes/depois e anotar no PR.
**Feito quando:** chunk de lucide-react caiu pelo menos 70% (de 556 KB para < 170 KB) na rota `/(auth)/login`.

---

### Fase 2 — Quebrar barril de tool-embed em `/blog/[slug]`

**Objetivo:** `import(\`@/modules/tools/ui/components/${slug}\`)` está fazendo
o bundler empacotar TODAS as ~30 tools no chunk de `/blog/[slug]`. Trocar por
um mapa estático com `next/dynamic` apenas para os slugs que efetivamente
podem ser embedados em posts.

**Critério de conclusão:** `/blog/[slug]` cai abaixo de 800 KB. Tool embedada
em post continua funcionando (validar uma rota com tool embed ao vivo).

> ATENÇÃO: esta fase tem decisão arquitetural pendente em [DECISÃO PENDENTE 2.X]
> mas é executável com defaults. Se o usuário decidir diferente, ajustar antes
> de explodir.

#### 2.1 — Criar registry estático de tools embedáveis
**Arquivo:** `apps/web/modules/blog/lib/tool-embed-registry.ts` (novo)
**Depende de:** —
Criar arquivo que exporta `TOOL_EMBED_REGISTRY: Record<slug, () => Promise<{ default: ComponentType }>>` mapeando cada slug de tool para `() => import("@/modules/tools/ui/components/<slug>")`. Cada entrada vira um chunk separado pelo Next. [DECISÃO PENDENTE 2.1]: incluir TODAS as ~30 tools de `apps/web/modules/tools/ui/components/` ou só um subset curado? **Default razoável**: incluir todas, já que o autor pode embedar qualquer uma. O ganho ainda existe porque cada tool vira chunk próprio carregado on-demand pela página do post.
**Feito quando:** arquivo existe, exporta o registry, e cada chave bate exatamente com o nome do arquivo (sem `.tsx`).

#### 2.2 — Reescrever tool-embed-block-renderer para usar o registry + next/dynamic
**Arquivo:** `apps/web/modules/blog/ui/components/blocks/tool-embed-block-renderer.tsx`
**Depende de:** 2.1
Trocar o `await import(\`@/modules/tools/ui/components/${componentSlug}\`)` por lookup no `TOOL_EMBED_REGISTRY[componentSlug]`. Como hoje o componente é um Server Component (`async`) que renderiza um Client Component, virar Client Component (`"use client"`) que usa `next/dynamic` com `ssr: false` — ou manter como async e fazer `const mod = await registry[slug]?.()`. **Default razoável**: manter async server component e chamar `registry[slug]?.()`. Se o slug não estiver no registry, retorna null. Mantém o `Suspense` + `PDFLibProvider` atuais.
**Feito quando:** post com tool embed renderiza no dev e em prod build, e analyzer mostra que o chunk inicial de `/blog/[slug]` NÃO contém código de tool (verificável buscando por nome de função distinta de uma tool).

#### 2.3 — Adicionar teste de regressão de bundle (opcional, gated por DECISÃO)
**Arquivo:** N/A
**Depende de:** 2.2
[DECISÃO PENDENTE 2.3]: adicionar regra de bundle budget no script de build? **Default razoável**: NÃO adicionar nesta fase. Apenas documentar no PR o tamanho antes/depois.
**Feito quando:** PR documenta o tamanho via screenshot ou número.

---

### Fase 3 — Dynamic import de xlsx, jspdf, pdf-lib e jszip dentro das tools

**Objetivo:** essas libs (~1500 KB somadas) só rodam em handler de
clique/submit. Tirar do bundle inicial das rotas de tool.

**Critério de conclusão:** `/ferramentas/[toolCategory]/[tool]` cai abaixo de
1300 KB. Cada tool ainda funciona quando o usuário processa um arquivo.

> ATENÇÃO: esta fase toca **9 arquivos de tool** com padrões similares mas não
> idênticos. Recomenda-se rodar `/explode-phase 3` antes de executar — cada
> tool tem assinatura própria do uso da lib (ex: `XLSX.utils.book_new()` vs
> `XLSX.read(buffer)`).

- [ ] Reescrever `excel-para-pdf.tsx`: trocar `import * as XLSX from "xlsx"` e `import { jsPDF } from "jspdf"` por `await import("xlsx")` e `await import("jspdf")` dentro do handler de conversão.
- [ ] Reescrever `marca-dagua-pdf.tsx`: dynamic de `pdf-lib`.
- [ ] Reescrever `pdf-para-jpg.tsx`: dynamic de `pdf-lib` (e manter `pdfjs-dist` como já está).
- [ ] Reescrever `numerar-pdf.tsx`: dynamic de `pdf-lib`.
- [ ] Reescrever `rotacionar-pdf.tsx`: dynamic de `pdf-lib`.
- [ ] Reescrever `mesclar-pdf.tsx`: dynamic de `pdf-lib`.
- [ ] Reescrever `json-para-excel.tsx`: dynamic de `xlsx`.
- [ ] Reescrever `dividir-pdf.tsx`: dynamic de `pdf-lib` e `jszip`.
- [ ] Reescrever `jpg-para-pdf.tsx`: dynamic de `jspdf`.
- [ ] Verificar `pdf-para-excel.tsx`: confirmar se usa `xlsx` ou só `pdfjs-dist` (o grep não trouxe — investigar).
- [ ] Validar manualmente cada tool após mudança (uma rodada de smoke test).

---

### Fase 4 — Dynamic import de Recharts no /dashboard e TipTap no tool form

**Objetivo:** retirar 411 KB (recharts) de `/dashboard` e 400 KB (TipTap) das
rotas `/dashboard/tools/[id]` e `/dashboard/tools/create`. Como `/dashboard` é
autenticado, aceita-se `ssr: false`.

**Critério de conclusão:** `/dashboard` cai abaixo de 1100 KB.
`/dashboard/tools/create` cai abaixo de 1700 KB.

#### 4.1 — Wrapper dynamic dos 3 charts em dashboard-overview-view
**Arquivo:** `apps/web/modules/dashboard/ui/views/dashboard-overview-view.tsx`
**Depende de:** —
Trocar os 3 imports estáticos (`DashboardOverviewAreaChart`, `DashboardOverviewBarChart`, `DashboardOverviewPieChart`) por `dynamic(() => import("..."), { ssr: false, loading: () => <ChartSkeleton /> })`. [DECISÃO PENDENTE 4.1]: criar `<ChartSkeleton />` ou reusar componente existente? **Default razoável**: usar um `<div className="h-[280px] w-full animate-pulse bg-muted/30 rounded" />` inline na primeira iteração. Se já existir um Skeleton em `@workspace/ui`, usar ele.
**Feito quando:** `/dashboard` renderiza sem charts no SSR, charts aparecem após hydration, e analyzer mostra recharts em chunk separado.

#### 4.2 — Wrapper dynamic do RichTextEditor em tool-form
**Arquivo:** `apps/web/modules/dashboard/ui/components/tool-form.tsx`
**Depende de:** —
Trocar `import { RichTextEditor } from "./rich-text-editor"` por `const RichTextEditor = dynamic(() => import("./rich-text-editor").then(m => m.RichTextEditor), { ssr: false, loading: () => <div className="h-[300px] animate-pulse bg-muted/30 rounded" /> })`.
**Feito quando:** form de tool renderiza, editor aparece após hydration, analyzer mostra TipTap em chunk separado de `tool-form`.

#### 4.3 — Verificar outros usos de RichTextEditor
**Arquivo:** N/A (busca)
**Depende de:** 4.2
`grep -r RichTextEditor apps/web/modules/`. Se houver outras superfícies usando, aplicar o mesmo dynamic. Hoje só `tool-form.tsx` consome (segundo grep prévio).
**Feito quando:** zero `import { RichTextEditor }` estático restante.

---

### Fase 5 — Auditoria de Zod em client components (sem mover schemas)

**Objetivo:** confirmar que NÃO há schemas que deveriam estar em server-only
sendo arrastados pro client. Hoje a hipótese é que Zod no client é necessário
(forms) e o ganho vem só de `optimizePackageImports` (Fase 1). Esta fase
valida a hipótese e documenta.

**Critério de conclusão:** relatório curto no PR listando cada uso de Zod no
client e justificando manutenção. Zero schemas movidos.

#### 5.1 — Listar todos os imports `from "zod"` em client components
**Arquivo:** N/A (relatório)
**Depende de:** —
`grep -rn "from \"zod\"" apps/web/modules/`. Para cada arquivo retornado, anotar: (a) é client component? (b) é usado por `zodResolver` ou apenas para tipagem? Se só tipagem, virar `import type { z } from "zod"` (zero custo runtime). Se `zodResolver`, mantém.
**Feito quando:** lista completa anexada ao PR. Conhecidos: `dashboard/schema/*.tsx`, `dashboard/ui/components/account-tabs.tsx`, `auth/ui/views/login-view.tsx`, `dashboard/ui/components/tool-form.tsx` (já é `import type`).

#### 5.2 — Trocar `import z` por `import type z` onde só serve para tipagem
**Arquivo:** múltiplos (definidos em 5.1)
**Depende de:** 5.1
Em cada arquivo onde Zod só aparece como `z.infer<typeof schema>` ou em type-only positions, trocar para `import type { z } from "zod"`. Não afeta runtime, mas garante que o bundler nunca puxe Zod por engano em arquivos que só tipam.
**Feito quando:** `pnpm --filter web typecheck` passa, e `grep "import { z } from \"zod\"" apps/web/modules` só retorna arquivos que de fato chamam `z.object`/`z.string` em runtime.

---

### Fase 6 — Corrigir patterns quebrados em next.config.mjs (Next 16 / path-to-regexp v8)

**Objetivo:** Next 16 migrou para path-to-regexp v8, que mudou semântica de
patterns. Os dois patterns atuais (`/_next/image:path*` e
`/:path*.(svg|png|...)`) emitem warning ou ignoram silenciosamente.

**Critério de conclusão:** `pnpm --filter web build` zero warnings sobre
header patterns. Cache-Control sendo aplicado em produção (validável via
`curl -I`).

#### 6.1 — Corrigir source de `/_next/image:path*`
**Arquivo:** `apps/web/next.config.mjs`
**Depende de:** —
A intenção é casar `/_next/image` E qualquer subpath `/_next/image/...`. path-to-regexp v8 quer parâmetros nomeados separados por `/`. Trocar `source: "/_next/image:path*"` por dois entries: `source: "/_next/image"` e `source: "/_next/image/:path*"` com mesmos headers. (Alternativa: `/_next/image/:path*` apenas se o Next sempre serve o endpoint nessa forma — verificar documentação Next 16.)
**Feito quando:** build sem warning sobre `_next/image` e header presente em request real.

#### 6.2 — Corrigir source de `/:path*.(svg|png|jpg|...)`
**Arquivo:** `apps/web/next.config.mjs`
**Depende de:** —
path-to-regexp v8 não suporta `:param.(group)` na mesma sintaxe antiga. Trocar por padrão com `has`/`missing` ou usar regex named: `source: "/:path*\\.svg"` e duplicar para cada extensão, OU usar uma única `source: "/:path(.*)\\.(svg|png|jpg|jpeg|gif|webp|avif|ico|woff|woff2|ttf|otf)$"` (sintaxe regex inline). [DECISÃO PENDENTE 6.2]: qual sintaxe? **Default razoável**: usar a forma `source: "/:path(.*\\.(svg|png|jpg|jpeg|gif|webp|avif|ico|woff|woff2|ttf|otf))"` que é o padrão sugerido pela doc Next 16. Se falhar, partir para um entry por extensão.
**Feito quando:** build limpo e `curl -I https://.../foo.svg` retorna o `Cache-Control` esperado.

---

### Fase 7 — Corrigir tipagem de ChartLegendContent (Recharts v3)

**Objetivo:** o erro de tipo em `dashboard-overview-area-chart.tsx:58` ao
passar `<ChartLegendContent />` como `content` do `<ChartLegend>` vem da
mudança de `LegendProps.payload` no Recharts v3. O fix vive no
`@workspace/ui`.

**Critério de conclusão:** `pnpm --filter web typecheck` passa zero erros em
`dashboard-overview-area-chart.tsx` E em `dashboard-overview-pie-chart.tsx`
(que usa o mesmo componente).

#### 7.1 — Atualizar tipagem de ChartLegendContent em packages/ui
**Arquivo:** `packages/ui/src/components/chart.tsx`
**Depende de:** —
Linha 207-210: `Pick<RechartsPrimitive.LegendProps, "payload" | "verticalAlign">`. Em Recharts v3, `LegendProps.payload` virou `Array<LegendPayload>` (tipo importável de `recharts/types/component/DefaultLegendContent` ou similar). [DECISÃO PENDENTE 7.1]: importar tipo direto da Recharts (caminho instável) ou afrouxar para `payload?: Array<{ value?: unknown; dataKey?: string; color?: string; payload?: unknown }>`? **Default razoável**: afrouxar com tipo local mínimo (sem depender de path interno do recharts), preservando os usos atuais em `area-chart` e `pie-chart`. Isso é o que o shadcn/ui upstream fez no commit equivalente para Recharts v3 (referência: shadcn/ui PR #5430 ou equivalente).
**Feito quando:** `pnpm --filter web typecheck` passa em ambos os charts. Sem `@ts-expect-error`. Sem `any` na assinatura.

---

### Fase 8 — Resolver índices duplicados de PostModel

**Objetivo:** Mongoose loga warnings ruidosos sobre índices duplicados em
`packages/database/src/models/Post.ts`. Limpar.

**Critério de conclusão:** ao iniciar o app (`pnpm dev`), zero warnings
"Duplicate schema index" ou "Mongoose: ..." sobre `posts`.

#### 8.1 — Remover @prop({index:true}) de status e publishedAt OU remover schema.index() composto
**Arquivo:** `packages/database/src/models/Post.ts`
**Depende de:** —
Hoje há (a) `@prop({ enum, index: true })` em `status` (linha 47), (b) `@prop({ index: true })` em `publishedAt` (linha 50), (c) `model.schema.index({ status: 1, publishedAt: -1 })` na função `getPostModel()`. O composto cobre prefixo de `status`, então remover `index: true` de `status` e manter `publishedAt` independente (queries de "publicado em data X" sem filtro de status existem? Ver `apps/web/trpc/routers/postsRouter.ts`). [DECISÃO PENDENTE 8.1]: manter index em `publishedAt` standalone? **Default razoável**: remover `index: true` de `status` (linha 47) — composto cobre. Manter `index: true` em `publishedAt` (sort em listagem pública usa só publishedAt). Composto fica.
**Feito quando:** zero warning de duplicate index em `posts.status` no boot.

#### 8.2 — Idempotência do text index em getPostModel()
**Arquivo:** `packages/database/src/models/Post.ts`
**Depende de:** —
A função `getPostModel()` chama `model.schema.index(...)` toda vez. Quando o módulo é reimportado (HMR ou serverless cold start), Mongoose pode logar "duplicate text index" porque `mongoose.models.Post` já existe e os índices já foram declarados. Mover as duas chamadas `model.schema.index(...)` para fora da função, executadas APENAS quando o model é criado pela primeira vez (`if (!mongoose.models.Post) { ... }`).
**Feito quando:** HMR no `apps/web` durante dev não acumula warnings de index a cada reload.

## Dependências entre fases

```
Fase 1 (config) ──────────────┐
Fase 2 (barrel blog) ─────────┤
Fase 3 (dynamic tools) ───────┼──> validação combinada de bundle
Fase 4 (dynamic dashboard) ───┤
Fase 5 (zod audit) ───────────┘   (independente de 1 mas valida hipótese de 1)

Fase 6 (next.config patterns) — independente
Fase 7 (chart types)          — independente
Fase 8 (post indexes)         — independente
```

Fases 1–5 são todas sobre redução de payload e podem rodar em qualquer ordem
mas valem ser medidas em conjunto via `ANALYZE=true pnpm build` ao final.
Fases 6–8 são correções de regressão pós-upgrade (Next 16, Recharts 3,
Mongoose) e podem rodar em paralelo a qualquer outra.

## Riscos & mitigações

| Risco | Probabilidade | Mitigação |
|---|---|---|
| `optimizePackageImports` quebra algum import nomeado de Zod ou lucide-react | Baixa | Build local antes de merge; Next 16 tem suporte estável a ambos |
| Dynamic import quebra UX (delay perceptível antes de processar arquivo) | Média | Adicionar `loading: () => <Loader2 className="animate-spin" />` no botão de ação. xlsx/jspdf/pdf-lib são chunks de centenas de KB que carregam em < 1s em conexão decente |
| `next/dynamic({ ssr: false })` causa hydration mismatch em rota indexada | Baixa | Recharts está só em `/dashboard` (autenticado, no-index). TipTap idem. Tools convertidas usam dynamic só no HANDLER, não no render — sem `ssr: false` |
| Registry estático de tool-embed cresce e vira mantém-em-paralelo com pasta de tools | Média | Aceitar trade-off na v1. Considerar gerar via script no build numa v2. Documentar no `tool-embed-registry.ts` o convite para atualizar quando criar tool nova |
| Patterns de path-to-regexp v8 não pegam todas extensões | Média | Validar com `curl -I` em prod antes de fechar PR |
| Tipagem afrouxada de `ChartLegendContent` esconde bug futuro | Baixa | Comentar no código que veio de upgrade Recharts v3 e linkar ao plano |
| Remover `index: true` de `status` quebra query existente | Baixa | Composto `{status: 1, publishedAt: -1}` cobre prefixo de `status`. Validar via `db.posts.getIndexes()` em staging |

## Arquivos que serão criados ou modificados

**Fase 1**
- `apps/web/next.config.mjs` (modificar)

**Fase 2**
- `apps/web/modules/blog/lib/tool-embed-registry.ts` (criar)
- `apps/web/modules/blog/ui/components/blocks/tool-embed-block-renderer.tsx` (modificar)

**Fase 3**
- `apps/web/modules/tools/ui/components/excel-para-pdf.tsx` (modificar)
- `apps/web/modules/tools/ui/components/marca-dagua-pdf.tsx` (modificar)
- `apps/web/modules/tools/ui/components/pdf-para-jpg.tsx` (modificar)
- `apps/web/modules/tools/ui/components/numerar-pdf.tsx` (modificar)
- `apps/web/modules/tools/ui/components/rotacionar-pdf.tsx` (modificar)
- `apps/web/modules/tools/ui/components/mesclar-pdf.tsx` (modificar)
- `apps/web/modules/tools/ui/components/json-para-excel.tsx` (modificar)
- `apps/web/modules/tools/ui/components/dividir-pdf.tsx` (modificar)
- `apps/web/modules/tools/ui/components/jpg-para-pdf.tsx` (modificar)
- (verificar) `apps/web/modules/tools/ui/components/pdf-para-excel.tsx`

**Fase 4**
- `apps/web/modules/dashboard/ui/views/dashboard-overview-view.tsx` (modificar)
- `apps/web/modules/dashboard/ui/components/tool-form.tsx` (modificar)

**Fase 5**
- `apps/web/modules/dashboard/schema/category.tsx` (potencial: trocar `import z` por `import type { z }` se só tipa)
- `apps/web/modules/dashboard/schema/tool.tsx` (idem)
- `apps/web/modules/dashboard/schema/page.tsx` (idem)
- `apps/web/modules/dashboard/schema/post.tsx` (idem)
- `apps/web/modules/dashboard/schema/global-script.tsx` (idem)
- `apps/web/modules/dashboard/schema/page-blocks.ts` (idem)
- `apps/web/modules/dashboard/ui/components/account-tabs.tsx` (auditar — usa `z.object`)
- `apps/web/modules/auth/ui/views/login-view.tsx` (auditar — usa `z.object`)

**Fase 6**
- `apps/web/next.config.mjs` (modificar)

**Fase 7**
- `packages/ui/src/components/chart.tsx` (modificar)

**Fase 8**
- `packages/database/src/models/Post.ts` (modificar)
