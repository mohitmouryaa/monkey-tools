# Plano: Page Builder leve para páginas CUSTOM (blocos estruturados)

> Versão: v1 | Criado em: 2026-04-29 | Status: draft

## Contexto

Hoje as páginas institucionais (Sobre, Como Funciona, Segurança, Privacidade, Termos, Contato) são páginas `CUSTOM` no model `Page` (`packages/database/src/models/Page.ts`) que armazenam um único campo `content` em HTML. A renderização pública em `apps/web/app/(main)/[slug]/page.tsx` joga esse HTML dentro de uma `div` com classes `prose` via `dangerouslySetInnerHTML`. O resultado fica monótono e o admin (no rich-text editor TipTap) não tem ergonomia para layouts ricos com hero, ícones, cards, FAQ e CTA.

O model `Page` já tem **precedente claro** de blocos estruturados na `pageType: HOMEPAGE`: `heroSection` e `howItWorksSection` são objetos tipados com sub-campos. O dashboard tem builders correspondentes (`hero-section-form.tsx`, `how-it-works-builder.tsx`, `faq-manager.tsx`). A ideia desta entrega é generalizar esse padrão para páginas `CUSTOM`, com um conjunto fechado e pequeno de blocos compartilhados, expansível depois.

Decisões fechadas em conversa com o usuário:

- **Conjunto fechado de blocos no v1**: `hero`, `steps`, `cards`, `faq`, `prose`, `cta`. Nada de blocos genéricos "container" ou layout grid arbitrário. Expansível em futuras versões.
- **Blocos como union discriminada por `type`**: padrão Editor.js-like, mas sem usar Editor.js (já existe TipTap e o blog usa Editor.js — esta entrega é independente). Schema próprio Zod em `packages/types/src/page.ts`.
- **Renderização pública via registry/switch**: cada `type` → componente React server-friendly em `apps/web/modules/page-builder/...`.
- **Builder admin com add/remove/reorder**: usar `@dnd-kit/sortable` (já é dependência do `apps/web`). Sem drag-and-drop sofisticado: lista vertical sortável.
- **Retrocompatibilidade**: páginas existentes que só têm `content` (HTML) continuam funcionando. Estratégia: ao renderizar uma página `CUSTOM`, se `blocks` estiver presente e não-vazio, usa `blocks`; senão cai para o caminho atual (HTML em `content` + `prose`).
- **Migração de dados das páginas atuais**: script idempotente que, para cada página `CUSTOM` existente sem `blocks` (ou com `blocks: []`), cria um único bloco `prose` carregando o `content` HTML atual. O `content` permanece no banco como fallback até confirmação manual.

## Stack & Convenções

- **Monorepo** pnpm + TurboRepo. Pacotes: `apps/web`, `apps/worker`, `packages/database` (Typegoose), `packages/types` (Zod/enums), `packages/ui` (shadcn).
- **Database**: MongoDB via Mongoose 9 + Typegoose 13. Models em `packages/database/src/models/<Entity>.ts`. Re-export em `packages/database/src/index.ts`.
- **Tipos compartilhados**: `packages/types/src/<dominio>.ts` re-exportados em `index.ts`. Enums em PascalCase. Schemas Zod no mesmo arquivo.
- **API**: tRPC v11 com SuperJSON. Router relevante: `apps/web/trpc/routers/pagesRouter.ts`. `baseProcedure` para queries públicas (`getBySlug`, `getFooterPages`), `protectedProcedure` para mutations admin (`createCustomPage`, `updateCustomPage`).
- **Forms**: React Hook Form + Zod resolvers + `packages/ui` (shadcn). Schemas e tipos co-localizados em `apps/web/modules/dashboard/schema/page.tsx` (já existe — esta entrega ESTENDE o arquivo).
- **Hooks**: `apps/web/modules/dashboard/hooks/use-*.tsx` usando `useTRPC().pages.<proc>.mutationOptions()/queryOptions()` + TanStack Query.
- **Componentes admin**: `apps/web/modules/dashboard/ui/components/`. Já há precedentes: `how-it-works-builder.tsx`, `faq-manager.tsx`, `hero-section-form.tsx`, `icon-picker.tsx`.
- **Componentes públicos**: nesta entrega criamos `apps/web/modules/page-builder/ui/blocks/` com um componente por `type` de bloco e um `block-renderer.tsx` que faz o switch/registry.
- **Ícones**: usa `lucide-react` (já dependência); para blocos com ícone configurável, reusar `DynamicIcon` de `lucide-react/dynamic` no padrão de `how-it-works.tsx`. Picker reutilizável já existe em `dashboard/ui/components/icon-picker.tsx`.
- **DnD**: `@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities` (já dependências do `apps/web`).
- **Style**: Biome — 2 espaços, double quotes, 130 colunas. Imports manuais.
- **Convenção**: arquivos kebab-case, models PascalCase, schemas Zod camelCase.

## Premissas

1. O `Page` model usa `Severity.ALLOW` no `@modelOptions` (já está), o que permite armazenar `Mixed`/`Object` arbitrário sem schema Mongoose rígido. Ou seja: adicionar `blocks` como `@prop({ type: () => Array, default: [] })` armazenando objetos discriminados não exige migration de coleção.
2. As páginas custom existentes em produção têm `content` HTML não-vazio. O passo de migração trata o caso `content` faltando (gera lista vazia).
3. Não há requisito de versionamento/histórico — uma única "fonte de verdade" por página.
4. Não há preview live na primeira entrega: o admin salva e abre `/[slug]` em outra aba.
5. Editor de texto longo dentro do bloco `prose` continua sendo o `RichTextEditor` (TipTap) já em uso em `custom-page-form.tsx`. Nada novo aí.
6. Cabeçalho `<h1>` e título da página atualmente são renderizados pela rota, fora do `content`. **Decisão arquitetural:** páginas com `blocks` perdem o `<h1>` automático da rota — quem quiser título grande usa o bloco `hero` (que já tem heading). Para páginas legadas (sem `blocks`), o `<h1>` continua sendo o `page.title` como hoje.
7. SEO (`seoTitle`, `seoDescription`, `seoKeywords`) continua como campos top-level do Page — não é responsabilidade dos blocos.

## Fora de escopo

- Drag-and-drop visual sofisticado (canvas, resize, multi-coluna). DnD é apenas reordenar lista vertical.
- Preview live ao lado do editor (split-view). Admin salva e visualiza em outra aba.
- Versionamento / histórico de revisões / undo entre saves.
- Multi-idioma / i18n de blocos.
- Permitir usuários finais criarem novos `type`s de bloco em runtime. Conjunto é fechado em código.
- Embeds genéricos (YouTube/Vimeo/iframe arbitrário) — fora do v1.
- Aplicação dos blocos em `HOMEPAGE` ou `ALL_TOOLS`. Esses pageTypes mantêm os campos atuais (`heroSection`, `howItWorksSection`, `h1Heading`, `shortDescription`).
- Reaproveitamento dos componentes de bloco públicos para renderizar `homepage` (esses blocos vivem em `modules/hero/...` e mantêm-se separados).

## Fases de implementação

### Fase 1 — Tipos e schemas Zod compartilhados (`packages/types`)
**Objetivo:** Definir o contrato dos blocos como union discriminada Zod, exportar tipos inferidos e o array `Block[]` que o Page passará a aceitar.
**Critério de conclusão:** `pnpm --filter @workspace/types build` passa; `import { type Block, blockSchema, type BlockType, BlockType } from "@workspace/types"` funciona em `apps/web` e em `packages/database`.

> ⚠️ Esta fase tem decisões de **forma exata dos sub-campos de cada bloco** (quais campos são obrigatórios em `hero`, quantas colunas o `cards` aceita, se `cta` tem 1 ou 2 botões, se `steps` tem ícone obrigatório, se `prose` aceita HTML ou Markdown) que ainda não foram inventariadas contra o que o usuário realmente quer renderizar nas páginas atuais. Execute `/explode-phase 1` antes para elicitar esses valores olhando os screenshots/conteúdos atuais.

- [ ] Definir `enum BlockType` com valores: `HERO = "hero"`, `STEPS = "steps"`, `CARDS = "cards"`, `FAQ = "faq"`, `PROSE = "prose"`, `CTA = "cta"`.
- [ ] Definir um Zod schema por bloco (cada um com `id: string` para chave de DnD/React e `type: BlockType.X` literal).
- [ ] Definir `blockSchema = z.discriminatedUnion("type", [heroBlockSchema, stepsBlockSchema, ...])`.
- [ ] Exportar `type Block = z.infer<typeof blockSchema>` e tipos por bloco (`HeroBlock`, `StepsBlock`, etc.).
- [ ] Re-exportar tudo em `packages/types/src/index.ts`.
- [ ] Não tocar em nada do `Post`/`Page` enums — só adicionar.

---

### Fase 2 — Persistência: campo `blocks` no model Page
**Objetivo:** Page passa a ter `blocks: Block[]` opcional. Alteração não-breaking — coleção legada continua válida.
**Critério de conclusão:** `import { PageModel } from "@workspace/database"` permite `PageModel.findById(id).lean().blocks` tipado como `Block[] | undefined`. `pnpm --filter @workspace/database build` passa.

#### 2.1 — Adicionar campo `blocks` em `Page.ts`
**Arquivo:** `packages/database/src/models/Page.ts`
**Depende de:** Fase 1
Importar `Block` de `@workspace/types`. Adicionar `@prop({ type: () => Array, default: [] }) public blocks?: Block[];` próximo aos outros campos de CUSTOM. Não remover `content` — coexistem para retrocompat.
**Feito quando:** Build do package passa e o tipo do campo é `Block[] | undefined`.

#### 2.2 — Documentar coexistência no comentário do model
**Arquivo:** `packages/database/src/models/Page.ts`
**Depende de:** 2.1
Adicionar comentário breve acima dos campos CUSTOM explicando a regra: se `blocks?.length > 0`, é a fonte de verdade; senão `content` (legado) é renderizado como `prose` HTML.
**Feito quando:** Comentário presente, sem alterar comportamento.

---

### Fase 3 — tRPC: `pagesRouter` aceita `blocks` em create/update
**Objetivo:** Mutations `createCustomPage` e `updateCustomPage` passam a aceitar e persistir `blocks`. Queries (`getBySlug`, `getById`, `getAll`, `getFooterPages`) já retornam o documento completo via `.lean()`, então `blocks` aparece automaticamente.
**Critério de conclusão:** Via tRPC devtools/curl, criar uma página custom com `blocks: [{ id, type: "hero", ... }]` persiste no Mongo e retorna no `getBySlug`. Páginas legadas (sem `blocks`) continuam criando/editando sem erro (validação aceita `blocks: []` ou ausente).

- [ ] Importar `blockSchema` de `@workspace/types` em `apps/web/trpc/routers/pagesRouter.ts`.
- [ ] Estender `createCustomPageSchema` (Zod no router) com `blocks: z.array(blockSchema).default([])`.
- [ ] Tornar `content: z.string().min(1)` em `content: z.string().default("")` — o conteúdo agora é opcional pois pode vir 100% via `blocks`. Validação de "tem ALGO renderizável" fica no client form (Fase 6) ou via refinement: `.refine((v) => v.content.length > 0 || v.blocks.length > 0, "Forneça conteúdo HTML ou pelo menos um bloco")`.
- [ ] Persistir `blocks` em `PageModel.create` e em `findOneAndUpdate` (ou no `page.save()` dentro do `updateCustomPage`).
- [ ] Não tocar em `getBySlug`, `getById`, `getAll`, `getFooterPages` — `.lean()` já devolve o doc completo.
- [ ] Confirmar manualmente que páginas legadas (sem `blocks` no doc) continuam passando pelo `getBySlug` sem rejeição de Zod (não há Zod de output — só de input).

---

### Fase 4 — Componentes públicos: blocos + registry de renderização
**Objetivo:** Cada `BlockType` tem um componente React que recebe seu sub-tipo discriminado e renderiza HTML server-friendly. Um `BlockRenderer` faz o switch.
**Critério de conclusão:** Em uma rota dummy (ou no Storybook se existir), passar um array com 1 bloco de cada tipo renderiza todos sem erro. Não há `"use client"` desnecessário — só os blocos que precisam (CTA com botão pode ser server, FAQ com expandir é client).

> ⚠️ Esta fase tem **decisões de UI por bloco** (ícone do CTA, raio de borda dos cards, quantas colunas, comportamento do FAQ — accordion vs sempre aberto, gap entre steps) que dependem de inventariar referências visuais que o usuário tem em mente. Várias dessas decisões já existem no `how-it-works.tsx` e devem ser reusadas. Execute `/explode-phase 4` antes para elicitar e identificar candidatos a reuso.

- [ ] Criar pasta `apps/web/modules/page-builder/ui/blocks/`.
- [ ] Criar componente por bloco: `hero-block.tsx`, `steps-block.tsx`, `cards-block.tsx`, `faq-block.tsx`, `prose-block.tsx`, `cta-block.tsx`. Cada um exporta `<BlockNameBlock block={...} />` recebendo o sub-tipo correto.
- [ ] `prose-block.tsx` usa `dangerouslySetInnerHTML` com classes prose (mover/copiar o snippet atual de `[slug]/page.tsx`).
- [ ] `faq-block.tsx` usa o `Accordion` de `@workspace/ui/components/accordion` (componente shadcn padrão; confirmar disponibilidade — se não existir, gerar via shadcn CLI).
- [ ] `steps-block.tsx` reutiliza visual de `apps/web/modules/hero/ui/components/how-it-works.tsx` (ícone com `DynamicIcon`, círculo + título + descrição). Decidir se extrai um sub-componente `<StepCard>` reusável.
- [ ] Criar `apps/web/modules/page-builder/ui/block-renderer.tsx` que recebe `blocks: Block[]` e faz `switch (block.type)` retornando o componente correspondente. Usar `block.id` como `key`.
- [ ] Exportar `BlockRenderer` num `apps/web/modules/page-builder/ui/index.ts` para import limpo.

---

### Fase 5 — Rota pública `[slug]/page.tsx` consome blocks com fallback
**Objetivo:** A rota pública decide entre renderizar `blocks` (novo) ou `content` HTML (legado).
**Critério de conclusão:** Página com `blocks?.length > 0` renderiza via `BlockRenderer` sem `<h1>` automático. Página legada continua exibindo `<h1>{title}</h1>` + HTML em prose.

- [ ] Editar `apps/web/app/(main)/[slug]/page.tsx`:
  - Importar `BlockRenderer` de `@/modules/page-builder/ui`.
  - Após `if (!page || !page.isActive) notFound()`, ramificar:
    - Se `page.blocks && page.blocks.length > 0` → render `<BlockRenderer blocks={page.blocks} />` (sem container/`prose` ao redor — cada bloco controla o próprio container).
    - Senão → mantém o JSX atual (`<h1>` + `<div className="prose ..." dangerouslySetInnerHTML>`).
- [ ] Decidir wrapper externo: blocos podem precisar de `<main>` e `flex flex-col min-h-screen`. Confirmar olhando o componente `Footer` e o layout de `(main)`. Se já tem `<main>` em layout, blocos só precisam de `<section>`.
- [ ] Não mexer em `generateMetadata` — SEO continua vindo dos top-level fields.

---

### Fase 6 — Admin: builder de blocos no form custom-page
**Objetivo:** O form de criar/editar página custom ganha uma seção "Blocos" com adicionar / remover / reordenar / editar campos por bloco. Form continua salvando `content` HTML opcional para páginas mais simples (ou pode ser removido — ver pontos abertos).
**Critério de conclusão:** Logado em `/dashboard/pages/custom/create`, é possível adicionar um bloco hero, preencher campos, adicionar um bloco steps com 3 passos, salvar, e a página renderiza no /[slug]. Reordenar via drag funciona; remover bloco funciona.

> ⚠️ Esta fase tem **N componentes a criar** (um editor por bloco), **decisão de UI** (modal vs inline, sortable handle, layout do "add block" picker), e **integração com schema Zod existente** que precisa virar resolver tipado. É a fase mais cara e a que mais pede elicitação. Execute `/explode-phase 6` antes.

- [ ] Estender `apps/web/modules/dashboard/schema/page.tsx`: importar `blockSchema` de `@workspace/types`; estender `createCustomPageSchema` e `updateCustomPageSchema` com `blocks: z.array(blockSchema).default([])`.
- [ ] Criar `apps/web/modules/dashboard/ui/components/page-blocks-builder.tsx`: container que recebe `form` e renderiza lista sortable + botão "Adicionar bloco" (popover/menu com 6 opções).
- [ ] Criar editor por bloco em `apps/web/modules/dashboard/ui/components/block-editors/`: `hero-block-editor.tsx`, `steps-block-editor.tsx`, `cards-block-editor.tsx`, `faq-block-editor.tsx`, `prose-block-editor.tsx`, `cta-block-editor.tsx`.
- [ ] Usar `@dnd-kit/sortable` (`useSortable`) — padrão da lib. Cada item tem handle visível.
- [ ] Itens internos a blocos com array (ex: `steps`, `cards`, `faq`) usam `useFieldArray` do RHF + sortable interno.
- [ ] Geração de `id` por bloco: `crypto.randomUUID()` ou `uuid` (já dependência) ao adicionar.
- [ ] Decidir se `content` HTML continua sendo um campo no form ou é removido — usuário sinalizou que prefere abandonar HTML solto. **Recomendação:** manter o campo no form com label "Conteúdo legado (em desuso)" oculto atrás de um collapsible para não perder edição em páginas que ainda só têm content. Em páginas criadas do zero, deixar vazio.
- [ ] Atualizar `custom-page-form.tsx` e `create-custom-page-form.tsx` para incluir o `<PageBlocksBuilder form={form} />` numa nova `<Card>`.
- [ ] Atualizar `defaultValues` para incluir `blocks: []`.

---

### Fase 7 — Migração de dados: páginas legadas ganham bloco `prose`
**Objetivo:** Toda página `CUSTOM` com `content` não-vazio e `blocks` vazio/ausente recebe um único bloco `prose` carregando o HTML existente. Idempotente e seguro de rodar múltiplas vezes.
**Critério de conclusão:** Após rodar o script, `PageModel.find({ pageType: "custom" })` mostra todos os docs com `blocks?.length >= 1`. Rodar de novo não duplica blocos.

- [ ] Criar `apps/web/scripts/migrate-page-blocks.ts` (paralelo ao `scripts/create-admin.ts`).
- [ ] Conectar via `connectDatabase` de `@workspace/database`.
- [ ] Para cada `Page` com `pageType === CUSTOM` e `(!blocks || blocks.length === 0)` e `content?.length > 0`:
  - Criar bloco: `{ id: crypto.randomUUID(), type: "prose", html: page.content }`.
  - `page.blocks = [proseBlock]`. **Não** apagar `page.content` (mantém como fallback). `page.save()`.
- [ ] Logar: `[migrate] X pages migrated, Y skipped (already had blocks)`.
- [ ] Adicionar script no `apps/web/package.json`: `"migrate:page-blocks": "tsx scripts/migrate-page-blocks.ts"`.
- [ ] Rodar localmente em dev e em staging antes de produção.

---

## Dependências entre fases

```
Fase 1 (tipos Zod)
   └── Fase 2 (Page.blocks)
          ├── Fase 3 (router aceita blocks)
          ├── Fase 4 (componentes públicos + renderer)
          │      └── Fase 5 (rota [slug] consome)
          └── Fase 6 (admin builder)
                 └── Fase 7 (migração de dados)
```

- Fase 1 é pré-requisito de tudo (define o contrato).
- Fases 4 e 5 podem ser desenvolvidas em paralelo com Fase 3, mas Fase 5 só tem o que renderizar depois que Fase 3 expõe `blocks` na resposta.
- Fase 6 depende de Fase 3 (precisa do schema Zod no router casado com o do form) e Fase 1 (precisa do `blockSchema` para o resolver).
- Fase 7 só faz sentido depois de Fase 2 (campo existe), Fase 4 (renderiza prose) e Fase 5 (rota usa blocks). Pode rodar antes ou depois de Fase 6 — recomendado depois para confirmar que o admin lê e re-salva páginas migradas sem perda.

## Riscos & mitigações

| Risco | Probabilidade | Mitigação |
|-------|--------------|-----------|
| Zod `discriminatedUnion` não suportar default `[]` em arrays | Baixa | Já é suportado em Zod 4. Validar com teste de smoke na Fase 1. |
| Páginas legadas com `content` malformado quebrarem render do bloco `prose` | Baixa | `prose-block` mantém `dangerouslySetInnerHTML` igual ao caminho atual; sanitização não está no escopo (já não estava antes). |
| `Block[]` no Mongo via `Severity.ALLOW` não preservar `id` ao re-ler | Baixa | Mongoose com `Mixed` preserva object literais. Validar lendo um doc após criar. |
| Builder admin com perda de input ao reordenar (estado do RHF perdendo bloco) | Média | Usar `useFieldArray` com `move()`, não recriar o array do zero. Gerar `id` no add e manter como key. |
| Drag-and-drop pesado em listas grandes (>20 blocos) | Baixa | Conjunto fechado de blocos + páginas institucionais raramente passam de 10 blocos. Aceitar limite implícito. |
| `prose-block` (HTML solto) reaparecer como vetor de XSS via input admin | Baixa | Não muda o status atual — admin já tem TipTap escrevendo HTML. Sanitização server-side fica como ponto aberto. |
| Conflito de validação: form valida `content.min(1)` mas página só tem `blocks` | Alta | Fase 3 e Fase 6 mudam validação para "pelo menos um dos dois" via `.refine`. Esse refinement precisa estar tanto no router quanto no form schema. |
| Migração rodar duas vezes e duplicar blocos | Baixa | Script checa `blocks.length === 0` antes de inserir. Idempotente por design. |
| Renderização ficar diferente do admin no preview (não há preview) | Média | V1 não tem preview. Admin precisa abrir aba `/[slug]` para validar — limitação aceita. |
| Rota `[slug]` pegar conflitos com slugs reservados (`/blog`, `/ferramentas`) | Baixa | Já é o comportamento atual; Next.js resolve rotas mais específicas primeiro. Sem mudança aqui. |

## Pontos abertos (definir antes ou durante /explode-phase)

- **Forma exata dos sub-campos por bloco** (Fase 1):
  - `hero`: badge opcional? CTA primário/secundário ou só primário?
  - `steps`: ícone obrigatório (`iconName` lucide) ou opcional? Quantos passos máximo (3? 6?)?
  - `cards`: ícone, título, descrição, link opcional? Quantas colunas (2/3/4 ou auto)?
  - `faq`: pares pergunta/resposta. Resposta aceita HTML ou só texto?
  - `cta`: 1 botão ou 2? Ícone? Variant (primary/outline)?
  - `prose`: HTML solto (legado) — confirmar.
- **Decisão final sobre `content` no form** (Fase 6): ocultar via collapsible vs remover de vez vs deprecar com warning.
- **Reuso vs extração** entre `steps-block` (público) e `how-it-works` (homepage atual): extrair sub-componente compartilhado ou manter código paralelo? Decidir no /explode-phase 4.
- **Sanitização HTML** no `prose-block`: `DOMPurify` no client? `sanitize-html` server-side? Hoje não há nada — promovendo para "ponto aberto pós-v1".
- **Limite máximo de blocos por página**: definir hard limit (ex: 30) para evitar denial-of-service no admin.
- **Geração de `id` único por bloco**: `crypto.randomUUID()` (Web/Node) vs `uuid` (já dep). Recomendado `crypto.randomUUID` por simplicidade.

## Arquivos que serão criados ou modificados

### Fase 1
- **Modificar**: `packages/types/src/page.ts` (adicionar `BlockType` enum, `blockSchema`, tipos)
- **Não modificar**: `packages/types/src/index.ts` (já re-exporta `./page.js` — todos os novos exports vão pegar carona)

### Fase 2
- **Modificar**: `packages/database/src/models/Page.ts` (campo `blocks?: Block[]`)

### Fase 3
- **Modificar**: `apps/web/trpc/routers/pagesRouter.ts` (Zod schemas + persistência de `blocks`)

### Fase 4
- **Criar**: `apps/web/modules/page-builder/ui/blocks/hero-block.tsx`
- **Criar**: `apps/web/modules/page-builder/ui/blocks/steps-block.tsx`
- **Criar**: `apps/web/modules/page-builder/ui/blocks/cards-block.tsx`
- **Criar**: `apps/web/modules/page-builder/ui/blocks/faq-block.tsx`
- **Criar**: `apps/web/modules/page-builder/ui/blocks/prose-block.tsx`
- **Criar**: `apps/web/modules/page-builder/ui/blocks/cta-block.tsx`
- **Criar**: `apps/web/modules/page-builder/ui/block-renderer.tsx`
- **Criar**: `apps/web/modules/page-builder/ui/index.ts`
- **Possível**: instalar/gerar shadcn `accordion` se não existir (`packages/ui/src/components/accordion.tsx`).

### Fase 5
- **Modificar**: `apps/web/app/(main)/[slug]/page.tsx`

### Fase 6
- **Modificar**: `apps/web/modules/dashboard/schema/page.tsx` (estender schemas com `blocks`)
- **Criar**: `apps/web/modules/dashboard/ui/components/page-blocks-builder.tsx`
- **Criar**: `apps/web/modules/dashboard/ui/components/block-editors/hero-block-editor.tsx`
- **Criar**: `apps/web/modules/dashboard/ui/components/block-editors/steps-block-editor.tsx`
- **Criar**: `apps/web/modules/dashboard/ui/components/block-editors/cards-block-editor.tsx`
- **Criar**: `apps/web/modules/dashboard/ui/components/block-editors/faq-block-editor.tsx`
- **Criar**: `apps/web/modules/dashboard/ui/components/block-editors/prose-block-editor.tsx`
- **Criar**: `apps/web/modules/dashboard/ui/components/block-editors/cta-block-editor.tsx`
- **Modificar**: `apps/web/modules/dashboard/ui/components/custom-page-form.tsx` (incluir builder)
- **Modificar**: `apps/web/modules/dashboard/ui/components/create-custom-page-form.tsx` (incluir builder + defaultValues)

### Fase 7
- **Criar**: `apps/web/scripts/migrate-page-blocks.ts`
- **Modificar**: `apps/web/package.json` (script `migrate:page-blocks`)
