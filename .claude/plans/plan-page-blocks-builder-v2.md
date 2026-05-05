# Plano: Page Builder leve para páginas CUSTOM (blocos estruturados)

> Versão: v2 | Criado em: 2026-04-29 | Status: draft
> Revisado por subagente | 5 sugestões incorporadas, 1 ignorada

## Contexto

Hoje as páginas institucionais (Sobre, Como Funciona, Segurança, Privacidade, Termos, Contato) são páginas `CUSTOM` no model `Page` (`packages/database/src/models/Page.ts`) que armazenam um único campo `content` em HTML. A renderização pública em `apps/web/app/(main)/[slug]/page.tsx` joga esse HTML dentro de uma `div` com classes `prose` via `dangerouslySetInnerHTML`. O resultado fica monótono e o admin (no rich-text editor TipTap) não tem ergonomia para layouts ricos com hero, ícones, cards, FAQ e CTA.

O model `Page` já tem **precedente claro** de blocos estruturados na `pageType: HOMEPAGE`: `heroSection` e `howItWorksSection` são objetos tipados com sub-campos. O dashboard tem builders correspondentes (`hero-section-form.tsx`, `how-it-works-builder.tsx`, `faq-manager.tsx`). A ideia desta entrega é generalizar esse padrão para páginas `CUSTOM`, com um conjunto fechado e pequeno de blocos compartilhados, expansível depois.

Decisões fechadas em conversa com o usuário:

- **Conjunto fechado de blocos no v1**: `hero`, `steps`, `cards`, `faq`, `prose`, `cta`. Nada de blocos genéricos "container" ou layout grid arbitrário. Expansível em futuras versões.
- **Blocos como union discriminada por `type`**: padrão Editor.js-like, mas sem usar Editor.js (já existe TipTap e o blog usa Editor.js — esta entrega é independente).
- **Onde vivem os schemas Zod**: o pacote `@workspace/types` hoje **só exporta enums e tipos TS** (não tem `zod` em `dependencies`, só em `devDependencies`). O padrão consistente é: **enums + interfaces TS em `packages/types`; schemas Zod em `apps/web/modules/dashboard/schema/page.tsx`** (espelhando o que já existe para Homepage/AllTools/CustomPage). O router tRPC em `apps/web/trpc/routers/pagesRouter.ts` define seus próprios schemas Zod — também é o padrão atual. Nesta entrega seguimos esse padrão (ver Fase 1 dividida em 1A e 1B).
- **Renderização pública via registry/switch**: cada `type` → componente React server-friendly em `apps/web/modules/page-builder/...`.
- **Builder admin com add/remove/reorder**: usar `@dnd-kit/sortable` (já é dependência do `apps/web`). Sem drag-and-drop sofisticado: lista vertical sortável.
- **Retrocompatibilidade**: páginas existentes que só têm `content` (HTML) continuam funcionando. Estratégia: ao renderizar uma página `CUSTOM`, se `blocks` estiver presente e não-vazio, usa `blocks`; senão cai para o caminho atual (HTML em `content` + `prose`).
- **Migração de dados das páginas atuais**: script idempotente que, para cada página `CUSTOM` existente sem `blocks` (ou com `blocks: []`), cria um único bloco `prose` carregando o `content` HTML atual. O `content` permanece no banco como fallback até confirmação manual.

## Stack & Convenções

- **Monorepo** pnpm + TurboRepo. Pacotes: `apps/web`, `apps/worker`, `packages/database` (Typegoose), `packages/types` (enums/tipos TS — **sem Zod runtime**), `packages/ui` (shadcn).
- **Database**: MongoDB via Mongoose 9 + Typegoose 13. Models em `packages/database/src/models/<Entity>.ts`. Re-export em `packages/database/src/index.ts`. `@workspace/database` já depende de `@workspace/types`.
- **Tipos compartilhados**: `packages/types/src/<dominio>.ts` re-exportados em `index.ts`. Enums em PascalCase. Sem schemas Zod (validação é responsabilidade do consumidor — router tRPC e form admin).
- **API**: tRPC v11 com SuperJSON. Router relevante: `apps/web/trpc/routers/pagesRouter.ts`. `baseProcedure` para queries públicas (`getBySlug`, `getFooterPages`), `protectedProcedure` para mutations admin (`createCustomPage`, `updateCustomPage`).
- **Forms**: React Hook Form + Zod resolvers + `packages/ui` (shadcn). Schemas Zod e tipos co-localizados em `apps/web/modules/dashboard/schema/page.tsx` (já existe — esta entrega ESTENDE o arquivo).
- **Hooks**: `apps/web/modules/dashboard/hooks/use-*.tsx` usando `useTRPC().pages.<proc>.mutationOptions()/queryOptions()` + TanStack Query.
- **Componentes admin**: `apps/web/modules/dashboard/ui/components/`. Já há precedentes: `how-it-works-builder.tsx`, `faq-manager.tsx`, `hero-section-form.tsx`, `icon-picker.tsx`.
- **Componentes públicos**: nesta entrega criamos `apps/web/modules/page-builder/ui/blocks/` com um componente por `type` de bloco e um `block-renderer.tsx` que faz o switch/registry.
- **Ícones**: usa `lucide-react` (já dependência); para blocos com ícone configurável, reusar `DynamicIcon` de `lucide-react/dynamic` no padrão de `how-it-works.tsx`. Picker reutilizável já existe em `dashboard/ui/components/icon-picker.tsx`.
- **DnD**: `@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities` (já dependências do `apps/web`).
- **Cache & revalidação**: o projeto está em Next.js 16. Páginas custom hoje são server components que chamam `caller.pages.getBySlug` direto (sem `unstable_cache` envolvendo). **Esta entrega NÃO altera essa estratégia** — ao salvar pelo admin, o servidor renderiza a versão nova no próximo request porque não há cache em frente. Caso o time decida cachear `[slug]/page.tsx` no futuro, ver "Pontos abertos".
- **Style**: Biome — 2 espaços, double quotes, 130 colunas. Imports manuais.
- **Convenção**: arquivos kebab-case, models PascalCase, schemas Zod camelCase.

## Premissas

1. O `Page` model usa `Severity.ALLOW` no `@modelOptions` (já está), o que permite armazenar `Mixed`/`Object` arbitrário sem schema Mongoose rígido. Adicionar `blocks` como `@prop({ type: () => Array, default: [] })` armazenando objetos discriminados não exige migration de coleção.
2. As páginas custom existentes em produção têm `content` HTML não-vazio. O passo de migração trata o caso `content` faltando (gera lista vazia).
3. Não há requisito de versionamento/histórico — uma única "fonte de verdade" por página.
4. Não há preview live na primeira entrega: o admin salva e abre `/[slug]` em outra aba.
5. Editor de texto longo dentro do bloco `prose` continua sendo o `RichTextEditor` (TipTap) já em uso em `custom-page-form.tsx`. Nada novo aí.
6. Cabeçalho `<h1>` e título da página atualmente são renderizados pela rota, fora do `content`. **Decisão arquitetural:** páginas com `blocks` perdem o `<h1>` automático da rota — quem quiser título grande usa o bloco `hero` (que já tem heading). Para páginas legadas (sem `blocks`), o `<h1>` continua sendo o `page.title` como hoje. **`page.title` continua obrigatório no schema** (alimenta `<title>` HTML / fallback de SEO / footer label) mesmo quando não aparece visualmente na rota.
7. SEO (`seoTitle`, `seoDescription`, `seoKeywords`) continua como campos top-level do Page — não é responsabilidade dos blocos.
8. **`packages/types` não importa Zod em runtime.** Schemas Zod ficam em `apps/web` (form e router). O contrato compartilhado entre database, router e form é: enum + interface TS exportados de `packages/types`. Cada Zod schema é construído **na fronteira que precisa validar input**.

## Fora de escopo

- Drag-and-drop visual sofisticado (canvas, resize, multi-coluna). DnD é apenas reordenar lista vertical.
- Preview live ao lado do editor (split-view). Admin salva e visualiza em outra aba.
- Versionamento / histórico de revisões / undo entre saves.
- Multi-idioma / i18n de blocos.
- Permitir usuários finais criarem novos `type`s de bloco em runtime. Conjunto é fechado em código.
- Embeds genéricos (YouTube/Vimeo/iframe arbitrário) — fora do v1.
- Aplicação dos blocos em `HOMEPAGE` ou `ALL_TOOLS`. Esses pageTypes mantêm os campos atuais (`heroSection`, `howItWorksSection`, `h1Heading`, `shortDescription`).
- Reaproveitamento dos componentes de bloco públicos para renderizar `homepage` (esses blocos vivem em `modules/hero/...` e mantêm-se separados).
- Adicionar `unstable_cache` ou Cache Components (`use cache`, `cacheTag`) em `[slug]/page.tsx`. Permanece sem cache (comportamento atual).
- Sanitização HTML server-side do bloco `prose` (idem comportamento atual: TipTap → HTML salvo cru).

## Fases de implementação

### Fase 1A — Tipos compartilhados em `packages/types`
**Objetivo:** Definir `BlockType` (enum) e interfaces TS por bloco em `packages/types/src/page.ts`. **Sem Zod.** Exportar `Block` como union discriminada em TypeScript puro.
**Critério de conclusão:** `pnpm --filter @workspace/types build` passa; `import { type Block, BlockType, type HeroBlock } from "@workspace/types"` funciona em `apps/web` e em `packages/database`.

> ⚠️ Esta fase tem decisões de **forma exata dos sub-campos de cada bloco** (quais campos são obrigatórios em `hero`, quantas colunas o `cards` aceita, se `cta` tem 1 ou 2 botões, se `steps` tem ícone obrigatório, comportamento do `faq`) que ainda não foram inventariadas contra o que o usuário realmente quer renderizar nas páginas atuais. Execute `/explode-phase 1A` antes para elicitar olhando as referências visuais (homepage atual, screenshots em `.claude/screens/`).

- [ ] Estender `packages/types/src/page.ts` adicionando: `enum BlockType { HERO = "hero", STEPS = "steps", CARDS = "cards", FAQ = "faq", PROSE = "prose", CTA = "cta" }`.
- [ ] Definir uma interface TS por bloco. Cada uma com `id: string` (chave de DnD/React) e `type: BlockType.X` literal. Sub-campos a definir no /explode-phase.
- [ ] Definir `export type Block = HeroBlock | StepsBlock | CardsBlock | FaqBlock | ProseBlock | CtaBlock`.
- [ ] `packages/types/src/index.ts` já re-exporta `./page.js` — nada a tocar lá.
- [ ] Não tocar em `Post` enums.
- [ ] **Não adicionar `zod` ao `packages/types/package.json`.** Os schemas Zod ficam nos consumidores.

---

### Fase 1B — Schema Zod do bloco em `apps/web` (compartilhado entre router e form)
**Objetivo:** Construir o `blockSchema` Zod uma vez, no app web, e reusar tanto no router tRPC quanto no form admin. Evita duplicação.
**Critério de conclusão:** `import { blockSchema } from "@/modules/dashboard/schema/page"` resolve no router tRPC e no form admin, e o tipo inferido `z.infer<typeof blockSchema>` é assignable ao `Block` exportado por `@workspace/types`.

- [ ] Estender `apps/web/modules/dashboard/schema/page.tsx`:
  - Importar `BlockType` de `@workspace/types`.
  - Criar `heroBlockSchema`, `stepsBlockSchema`, `cardsBlockSchema`, `faqBlockSchema`, `proseBlockSchema`, `ctaBlockSchema` (Zod). Cada um com `id: z.string()` + `type: z.literal(BlockType.X)` + sub-campos casando com a interface TS.
  - Criar `export const blockSchema = z.discriminatedUnion("type", [...])`.
  - Adicionar uma checagem de tipo (de preferência via `satisfies` ou um `type _check = z.infer<typeof blockSchema> extends Block ? true : false; const _: _check = true;`) para falhar o build se as duas representações divergirem.
- [ ] Esses schemas serão importados na Fase 3 (router) e Fase 6 (form).

---

### Fase 2 — Persistência: campo `blocks` no model Page
**Objetivo:** Page passa a ter `blocks: Block[]` opcional. Alteração não-breaking — coleção legada continua válida.
**Critério de conclusão:** `import { PageModel } from "@workspace/database"` permite `PageModel.findById(id).lean()` retornar `blocks` tipado como `Block[] | undefined`. `pnpm --filter @workspace/database build` passa.

#### 2.1 — Adicionar campo `blocks` em `Page.ts`
**Arquivo:** `packages/database/src/models/Page.ts`
**Depende de:** Fase 1A
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

- [ ] Importar `blockSchema` de `@/modules/dashboard/schema/page` no `apps/web/trpc/routers/pagesRouter.ts` (ou re-exportar via um arquivo compartilhado se houver atrito de imports cross-module).
- [ ] Estender `createCustomPageSchema` (no router) com `blocks: z.array(blockSchema).default([])`.
- [ ] Tornar `content: z.string().min(1)` em `content: z.string().default("")` — o conteúdo agora é opcional pois pode vir 100% via `blocks`. Adicionar refinement no schema completo: `.refine((v) => v.content.length > 0 || v.blocks.length > 0, "Forneça conteúdo HTML ou pelo menos um bloco")`.
- [ ] Persistir `blocks` em `PageModel.create` (`createCustomPage`) e em `page.blocks = input.blocks; await page.save()` no `updateCustomPage`.
- [ ] Não tocar em `getBySlug`, `getById`, `getAll`, `getFooterPages` — `.lean()` já devolve o doc completo. Verificar se os tipos de retorno do router (inferidos pelo tRPC) refletem `blocks?: Block[]` automaticamente; senão, ajustar tipagem do retorno.
- [ ] Confirmar manualmente que páginas legadas (sem `blocks` no doc) continuam passando pelo `getBySlug` sem rejeição (não há Zod de output — só de input).

---

### Fase 4 — Componentes públicos: blocos + registry de renderização
**Objetivo:** Cada `BlockType` tem um componente React que recebe seu sub-tipo discriminado e renderiza HTML server-friendly. Um `BlockRenderer` faz o switch.
**Critério de conclusão:** Em uma rota dummy ou diretamente após Fase 5 num doc de teste no Mongo, passar um array com 1 bloco de cada tipo renderiza todos sem erro de hidratação. Verificável via `pnpm dev` + carregar `/<slug>` da página de teste e inspecionar HTML. Não há `"use client"` desnecessário — só os blocos que precisam (CTA com botão pode ser server, FAQ com expandir é client).

> ⚠️ Esta fase tem **decisões de UI por bloco** (ícone do CTA, raio de borda dos cards, quantas colunas, comportamento do FAQ — accordion vs sempre aberto, gap entre steps) que dependem de inventariar referências visuais que o usuário tem em mente. Várias dessas decisões já existem no `how-it-works.tsx` e devem ser reusadas. Execute `/explode-phase 4` antes para elicitar e identificar candidatos a reuso.

- [ ] Criar pasta `apps/web/modules/page-builder/ui/blocks/`.
- [ ] Criar componente por bloco: `hero-block.tsx`, `steps-block.tsx`, `cards-block.tsx`, `faq-block.tsx`, `prose-block.tsx`, `cta-block.tsx`. Cada um exporta `<BlockNameBlock block={...} />` recebendo o sub-tipo correto (importado de `@workspace/types`).
- [ ] `prose-block.tsx` usa `dangerouslySetInnerHTML` com classes prose (mover/copiar o snippet atual de `[slug]/page.tsx`).
- [ ] `faq-block.tsx` usa o `Accordion` de `@workspace/ui/components/accordion` (componente shadcn padrão; **confirmar disponibilidade** — se não existir em `packages/ui/src/components/`, gerar via shadcn CLI no `packages/ui`).
- [ ] `steps-block.tsx` reutiliza visual de `apps/web/modules/hero/ui/components/how-it-works.tsx` (ícone com `DynamicIcon`, círculo + título + descrição). Decisão de extração de sub-componente fica no /explode-phase 4.
- [ ] Criar `apps/web/modules/page-builder/ui/block-renderer.tsx` que recebe `blocks: Block[]` e faz `switch (block.type)` retornando o componente correspondente. Usar `block.id` como `key`.
- [ ] Exportar `BlockRenderer` num `apps/web/modules/page-builder/ui/index.ts` para import limpo.

---

### Fase 5 — Rota pública `[slug]/page.tsx` consome blocks com fallback
**Objetivo:** A rota pública decide entre renderizar `blocks` (novo) ou `content` HTML (legado).
**Critério de conclusão:** Página com `blocks?.length > 0` renderiza via `BlockRenderer` sem `<h1>` automático. Página legada continua exibindo `<h1>{title}</h1>` + HTML em prose. Verificável criando um doc de teste no Mongo via shell e acessando o slug em dev.

- [ ] Editar `apps/web/app/(main)/[slug]/page.tsx`:
  - Importar `BlockRenderer` de `@/modules/page-builder/ui`.
  - Após `if (!page || !page.isActive) notFound()`, ramificar:
    - Se `page.blocks && page.blocks.length > 0` → render `<BlockRenderer blocks={page.blocks} />` (sem container/`prose` ao redor — cada bloco controla o próprio container).
    - Senão → mantém o JSX atual (`<h1>` + `<div className="prose ..." dangerouslySetInnerHTML>`).
- [ ] Decidir wrapper externo: blocos podem precisar de `<main>` e `flex flex-col min-h-screen`. Confirmar olhando o `layout.tsx` do grupo `(main)` antes de duplicar wrappers.
- [ ] Não mexer em `generateMetadata` — SEO continua vindo dos top-level fields.

---

### Fase 6 — Admin: builder de blocos no form custom-page
**Objetivo:** O form de criar/editar página custom ganha uma seção "Blocos" com adicionar / remover / reordenar / editar campos por bloco.
**Critério de conclusão:** Logado em `/dashboard/pages/custom/create`, é possível adicionar um bloco hero, preencher campos, adicionar um bloco steps com 3 passos, salvar, e a página renderiza no /[slug]. Reordenar via drag funciona; remover bloco funciona.

> ⚠️ Esta fase tem **N componentes a criar** (um editor por bloco), **decisão de UI** (modal vs inline, sortable handle, layout do "add block" picker), e **integração com schema Zod existente** que precisa virar resolver tipado. É a fase mais cara e a que mais pede elicitação. Execute `/explode-phase 6` antes.

- [ ] `apps/web/modules/dashboard/schema/page.tsx` (já estendido na Fase 1B) precisa estender também `createCustomPageSchema` e `updateCustomPageSchema` com `blocks: z.array(blockSchema).default([])` + o mesmo refinement de "tem blocks ou content" da Fase 3.
- [ ] Criar `apps/web/modules/dashboard/ui/components/page-blocks-builder.tsx`: container que recebe `form` e renderiza lista sortable + botão "Adicionar bloco" (popover/menu com 6 opções).
- [ ] Criar editor por bloco em `apps/web/modules/dashboard/ui/components/block-editors/`: `hero-block-editor.tsx`, `steps-block-editor.tsx`, `cards-block-editor.tsx`, `faq-block-editor.tsx`, `prose-block-editor.tsx`, `cta-block-editor.tsx`.
- [ ] Usar `@dnd-kit/sortable` (`useSortable`) — padrão da lib. Cada item tem handle visível.
- [ ] Itens internos a blocos com array (ex: `steps`, `cards`, `faq`) usam `useFieldArray` do RHF + sortable interno.
- [ ] Geração de `id` por bloco: `crypto.randomUUID()` ao adicionar.
- [ ] Decidir se `content` HTML continua sendo um campo no form ou é removido — usuário sinalizou que prefere abandonar HTML solto. **Recomendação:** manter o campo no form com label "Conteúdo legado (em desuso)" oculto atrás de um collapsible para não perder edição em páginas que ainda só têm content. Em páginas criadas do zero, deixar vazio. Confirmar no /explode-phase 6.
- [ ] Atualizar `custom-page-form.tsx` e `create-custom-page-form.tsx` para incluir o `<PageBlocksBuilder form={form} />` numa nova `<Card>`.
- [ ] Atualizar `defaultValues` para incluir `blocks: []`.
- [ ] Hooks (`use-create-custom-page.tsx`, `use-update-custom-page.tsx`) já chamam `queryClient.invalidateQueries(...)` e funcionam sem alteração — `blocks` vai junto no payload.

---

### Fase 7 — Migração de dados: páginas legadas ganham bloco `prose`
**Objetivo:** Toda página `CUSTOM` com `content` não-vazio e `blocks` vazio/ausente recebe um único bloco `prose` carregando o HTML existente. Idempotente e seguro de rodar múltiplas vezes.
**Critério de conclusão:** Após rodar o script, `PageModel.find({ pageType: "custom" })` mostra todos os docs com `blocks?.length >= 1`. Rodar de novo não duplica blocos.

- [ ] Criar `apps/web/scripts/migrate-page-blocks.ts` (paralelo ao `apps/web/scripts/create-admin.ts`).
- [ ] Conectar via o helper de connect já usado em `create-admin.ts` (inspecionar e reusar — provável `connectDatabase` ou similar de `@workspace/database`).
- [ ] Para cada `Page` com `pageType === CUSTOM` e `(!blocks || blocks.length === 0)` e `content?.length > 0`:
  - Criar bloco: `{ id: crypto.randomUUID(), type: "prose", html: page.content }`.
  - `page.blocks = [proseBlock]`. **Não** apagar `page.content` (mantém como fallback). `page.save()`.
- [ ] Logar: `[migrate] X pages migrated, Y skipped (already had blocks)`.
- [ ] Adicionar script no `apps/web/package.json`: `"migrate:page-blocks": "tsx scripts/migrate-page-blocks.ts"`.
- [ ] Rodar localmente em dev e em staging antes de produção.

---

## Dependências entre fases

```
Fase 1A (tipos TS em packages/types)
   ├── Fase 1B (Zod schema em apps/web)
   │      ├── Fase 3 (router aceita blocks)
   │      └── Fase 6 (admin builder)
   │             └── Fase 7 (migração de dados)
   └── Fase 2 (Page.blocks)
          └── Fase 4 (componentes públicos + renderer)
                 └── Fase 5 (rota [slug] consome)
```

- Fase 1A é pré-requisito de tudo (define o contrato TS).
- Fase 1B depende só de 1A; pode ser feita em paralelo com Fase 2.
- Fases 4 e 5 podem ser desenvolvidas em paralelo com Fase 3, mas Fase 5 só vale a pena exercitar depois que Fase 3 expõe `blocks` na resposta.
- Fase 6 depende de Fase 1B (schema Zod) + Fase 3 (router casado).
- Fase 7 só faz sentido depois de Fase 2 (campo existe), Fase 4 (renderiza prose) e Fase 5 (rota usa blocks). Pode rodar antes ou depois de Fase 6 — recomendado depois para confirmar que o admin lê e re-salva páginas migradas sem perda.

## Riscos & mitigações

| Risco | Probabilidade | Mitigação |
|-------|--------------|-----------|
| `packages/types` ganhar dependência runtime de Zod por engano | Média | **Mitigado por design**: Fase 1A só adiciona TS puro. Fase 1B coloca Zod em `apps/web`. Adicionar comentário no `package.json` do `packages/types` lembrando isso. |
| Drift entre interface TS (Fase 1A) e schema Zod (Fase 1B) | Alta | **Type-check guard em compilação**: na Fase 1B, declarar `type _Check = z.infer<typeof blockSchema> extends Block ? true : false; const _check: _Check = true;`. Se divergir, build quebra. |
| Zod `discriminatedUnion` não suportar default `[]` em arrays | Baixa | Já é suportado em Zod 4. Validar com smoke test na Fase 1B. |
| Páginas legadas com `content` malformado quebrarem render do bloco `prose` | Baixa | `prose-block` mantém `dangerouslySetInnerHTML` igual ao caminho atual; sanitização não está no escopo. |
| `Block[]` no Mongo via `Severity.ALLOW` não preservar `id` ao re-ler | Baixa | Mongoose com `Mixed` preserva object literais. Validar lendo um doc após criar. |
| Builder admin com perda de input ao reordenar (estado do RHF perdendo bloco) | Média | Usar `useFieldArray` com `move()`, não recriar o array do zero. Gerar `id` no add e manter como key. |
| Drag-and-drop pesado em listas grandes (>20 blocos) | Baixa | Conjunto fechado de blocos + páginas institucionais raramente passam de 10 blocos. Aceitar limite implícito. |
| `prose-block` (HTML solto) reaparecer como vetor de XSS via input admin | Baixa | Não muda o status atual — admin já tem TipTap escrevendo HTML. Sanitização server-side fica como ponto aberto. |
| Conflito de validação: form/router validam `content.min(1)` mas página só tem `blocks` | Alta | Fases 3 e 6 mudam validação para refinement "blocks.length > 0 OR content.length > 0". Refinement é o **mesmo** trecho de código compartilhado entre router e form (vem da Fase 1B). |
| Migração rodar duas vezes e duplicar blocos | Baixa | Script checa `blocks.length === 0` antes de inserir. Idempotente por design. |
| Renderização ficar diferente entre admin e público (sem preview) | Média | V1 não tem preview. Admin abre aba `/[slug]` para validar — limitação aceita. |
| Update admin não refletir imediatamente em `/<slug>` | Baixa | Página NÃO está em `unstable_cache`. Cada request faz fetch fresh do Mongo. Confirmar no smoke test inicial. |

## Pontos abertos (definir antes ou durante /explode-phase)

- **Forma exata dos sub-campos por bloco** (Fase 1A):
  - `hero`: badge opcional? CTA primário/secundário ou só primário?
  - `steps`: ícone obrigatório (`iconName` lucide) ou opcional? Quantos passos máximo (3? 6?)?
  - `cards`: ícone, título, descrição, link opcional? Quantas colunas (2/3/4 ou auto)?
  - `faq`: pares pergunta/resposta. Resposta aceita HTML ou só texto?
  - `cta`: 1 botão ou 2? Ícone? Variant (primary/outline)?
  - `prose`: HTML solto (legado) — confirmar.
- **Decisão final sobre `content` no form** (Fase 6): ocultar via collapsible vs remover de vez vs deprecar com warning.
- **Reuso vs extração** entre `steps-block` (público) e `how-it-works` (homepage atual): extrair sub-componente compartilhado ou manter código paralelo? Decidir no /explode-phase 4.
- **Sanitização HTML** no `prose-block`: `DOMPurify` no client? `sanitize-html` server-side? Hoje não há nada — promovendo para "pós-v1".
- **Limite máximo de blocos por página**: definir hard limit (ex: 30) para evitar problemas de UX no admin.
- **Cache em `[slug]/page.tsx`**: hoje não há `unstable_cache`/Cache Components. Se time decidir cachear no futuro, criar tag `page:${slug}` e revalidar nos hooks `useUpdateCustomPage`/`useCreateCustomPage`. Não está no escopo desta entrega.

## Arquivos que serão criados ou modificados

### Fase 1A
- **Modificar**: `packages/types/src/page.ts` (adicionar `BlockType` enum + interfaces TS por bloco + tipo `Block`)
- **Não modificar**: `packages/types/src/index.ts` (já re-exporta `./page.js`)
- **Não modificar**: `packages/types/package.json` (NÃO adicionar `zod` em dependencies)

### Fase 1B
- **Modificar**: `apps/web/modules/dashboard/schema/page.tsx` (adicionar `blockSchema` discriminado + sub-schemas por bloco + type-check guard)

### Fase 2
- **Modificar**: `packages/database/src/models/Page.ts` (campo `blocks?: Block[]` + comentário de coexistência)

### Fase 3
- **Modificar**: `apps/web/trpc/routers/pagesRouter.ts` (importar `blockSchema`, estender create/update schemas, persistir `blocks`, refinement "blocks ou content")

### Fase 4
- **Criar**: `apps/web/modules/page-builder/ui/blocks/hero-block.tsx`
- **Criar**: `apps/web/modules/page-builder/ui/blocks/steps-block.tsx`
- **Criar**: `apps/web/modules/page-builder/ui/blocks/cards-block.tsx`
- **Criar**: `apps/web/modules/page-builder/ui/blocks/faq-block.tsx`
- **Criar**: `apps/web/modules/page-builder/ui/blocks/prose-block.tsx`
- **Criar**: `apps/web/modules/page-builder/ui/blocks/cta-block.tsx`
- **Criar**: `apps/web/modules/page-builder/ui/block-renderer.tsx`
- **Criar**: `apps/web/modules/page-builder/ui/index.ts`
- **Possível**: gerar shadcn `accordion` se não existir em `packages/ui/src/components/accordion.tsx`.

### Fase 5
- **Modificar**: `apps/web/app/(main)/[slug]/page.tsx`

### Fase 6
- **Modificar**: `apps/web/modules/dashboard/schema/page.tsx` (estender create/update schemas com `blocks` + refinement)
- **Criar**: `apps/web/modules/dashboard/ui/components/page-blocks-builder.tsx`
- **Criar**: `apps/web/modules/dashboard/ui/components/block-editors/hero-block-editor.tsx`
- **Criar**: `apps/web/modules/dashboard/ui/components/block-editors/steps-block-editor.tsx`
- **Criar**: `apps/web/modules/dashboard/ui/components/block-editors/cards-block-editor.tsx`
- **Criar**: `apps/web/modules/dashboard/ui/components/block-editors/faq-block-editor.tsx`
- **Criar**: `apps/web/modules/dashboard/ui/components/block-editors/prose-block-editor.tsx`
- **Criar**: `apps/web/modules/dashboard/ui/components/block-editors/cta-block-editor.tsx`
- **Modificar**: `apps/web/modules/dashboard/ui/components/custom-page-form.tsx`
- **Modificar**: `apps/web/modules/dashboard/ui/components/create-custom-page-form.tsx`

### Fase 7
- **Criar**: `apps/web/scripts/migrate-page-blocks.ts`
- **Modificar**: `apps/web/package.json` (script `migrate:page-blocks`)
