# Plano: Page CUSTOM com Editor.js (substituindo TipTap)

> Versão: v1 | Criado em: 2026-04-29 | Status: draft

## Contexto

As páginas institucionais (Sobre, Como Funciona, Segurança, Privacidade, Termos, Contato) são `Page` com `pageType = CUSTOM` e armazenam conteúdo num único campo `content: string` em HTML. O admin edita via **TipTap** (`apps/web/modules/dashboard/ui/components/rich-text-editor.tsx`) e a rota pública `apps/web/app/(main)/[slug]/page.tsx` joga o HTML em `prose` com `dangerouslySetInnerHTML`. Resultado: layout monótono, sem hero/cards/FAQ/CTA, e ergonomia limitada para o admin.

O blog já usa **Editor.js** com sucesso e tem precedente claro:
- Wrapper `EditorJsWrapper` em `apps/web/modules/dashboard/ui/components/editor-js/index.tsx` com tools nativas + um plugin custom (`ToolEmbedBlock` em `tool-embed-block.tsx`).
- Renderer público em `apps/web/modules/blog/ui/components/post-content-renderer.tsx` mapeando `OutputData.blocks[].type` → componente React (registry/switch). Componentes em `apps/web/modules/blog/ui/components/blocks/`.
- `Post.content` no schema Mongoose já é `Record<string, any>` com `type: () => Object` e `Severity.ALLOW` (`packages/database/src/models/Post.ts`).
- Pacotes Editor.js já instalados em `apps/web/package.json`: `@editorjs/editorjs ^2.31.6`, `header`, `list`, `image`, `quote`, `table`, `embed`, `checklist`.

**Plano anterior (`plan-page-blocks-builder-v2.md`) descartado** em favor desta abordagem (Editor.js no lugar de union discriminada custom + DnD com `@dnd-kit/sortable`). Não reescrever em cima dele.

### Decisões fechadas

1. **Editor único nas Page CUSTOM**: Editor.js. TipTap permanece nas dependências (pode ter outros usos a inventariar na Fase 0) mas sai do form de Page.
2. **Tools nativas para narrativa**: `header`, `paragraph`, `list`, `quote`, `image`, `table`, `checklist`, `embed` — reaproveitando exatamente o que o blog já usa.
3. **Plugins custom para blocos ricos institucionais**: `hero`, `steps`, `cards`, `faq`, `cta`. Cada plugin é uma classe TS vanilla (contrato Editor.js: `render`, `save`, `validate`, `static get toolbox`). O `render` desenha **preview compacto** + botão "Editar" que abre **modal React** (shadcn `Dialog`) com form RHF + Zod para a validação rica do `data`.
4. **Renderer público SSR**: switch por `block.type` mapeando para componentes server-side, idêntico em padrão ao `post-content-renderer.tsx`.
5. **Persistência**: `Page.content` muda de `string` HTML para `OutputData` (objeto JSON `{ blocks: [...] }`) + retrocompat com `string` durante a janela de migração.
6. **Migração**: script standalone idempotente que converte páginas com `content: string` em `OutputData` envolvendo o HTML num bloco `raw-html` único (preserva fidelidade visual sem riscos de parsing). Roda manualmente.
7. **Renderer com fallback**: durante a transição, `[slug]/page.tsx` aceita `content` em ambos formatos. Após migrar, fallback fica como rede de proteção e sai num cleanup futuro.
8. **Sem extrair para `packages/ui`**: blocos institucionais ficam em `apps/web` — opinionados, reuso prematuro seria especulativo.

## Stack & Convenções

- **Monorepo** pnpm + TurboRepo. Worktree atual: `feat/page-blocks` (a partir de `dev-br`). `pnpm dev` rodando, web em http://localhost:3000.
- **Frontend**: Next.js 16 App Router + Turbopack, React 19.2, Tailwind CSS 4, shadcn/ui (`@workspace/ui`), TanStack Query v5, tRPC v11 (SuperJSON), React Hook Form + Zod 4, `zodResolver` de `@hookform/resolvers/zod`.
- **Database**: MongoDB via Mongoose 9 + Typegoose 13. Models em `packages/database/src/models/<Entity>.ts`. Re-export em `packages/database/src/index.ts`. `@workspace/database` é compilado para `dist/` (ver Premissa 6).
- **Tipos compartilhados**: `packages/types/src/<dominio>.ts` re-exportados em `index.ts`. **Sem Zod runtime** (`zod` está em `devDependencies`). Enums + interfaces TS apenas.
- **API**: `apps/web/trpc/routers/pagesRouter.ts`. `baseProcedure` para queries públicas (`getBySlug`, `getFooterPages`), `protectedProcedure` para mutations admin (`createCustomPage`, `updateCustomPage`).
- **Forms admin**: RHF + `zodResolver` + shadcn. Schemas Zod em `apps/web/modules/dashboard/schema/page.tsx` (já existe, vai ser estendido).
- **Hooks admin**: `apps/web/modules/dashboard/hooks/use-*.tsx` usando `useTRPC().pages.<proc>.mutationOptions()/queryOptions()` + TanStack Query.
- **Componentes admin**: `apps/web/modules/dashboard/ui/components/`. Diretório do Editor.js do blog em `editor-js/` (index.tsx + tool-embed-block.tsx + editor-js-plugins.d.ts).
- **Componentes públicos**: novos em `apps/web/modules/pages/ui/components/blocks/` + renderer em `apps/web/modules/pages/ui/components/page-content-renderer.tsx`.
- **Ícones**: `lucide-react`. Para blocos com ícone configurável (`steps`, `cards`), usar `DynamicIcon` de `lucide-react/dynamic` no padrão de `how-it-works.tsx`. Picker reutilizável existe em `dashboard/ui/components/icon-picker.tsx`.
- **Style**: Biome — 2 espaços, double quotes, 130 colunas. Imports manuais.
- **Convenção**: arquivos kebab-case, models PascalCase, classes de plugin Editor.js em PascalCase (`HeroPlugin`).

## Premissas

1. **Editor.js client-only**: o wrapper é montado via `next/dynamic({ ssr: false })` (ver `post-form.tsx` linha 24). Mesmo padrão será aplicado em `custom-page-form.tsx`.
2. **`Severity.ALLOW` no Page model** já está habilitado — `Page.content` pode armazenar objeto Mongoose `Mixed` sem definir shape (mesmo padrão de `Post.content`).
3. **`OutputData` é exportado por `@editorjs/editorjs`** e já é importado em `post-content-renderer.tsx` linha 1. Confirmação na Fase 0.
4. **`packages/types` não importa Zod em runtime** — schemas Zod ficam em `apps/web` (form e router). Tipos TS compartilhados sim.
5. **Plugins Editor.js custom rodam fora do React tree**: o padrão estabelecido no projeto (`ToolEmbedBlock`) é renderizar HTML imperativo no `render()` e expor um callback no `config` para acessar dados externos (ex.: `fetchTools` recebido via `config`). Para abrir modal React do plugin, vamos usar **bridge via callback no config** (`config.openEditor(blockId, currentData, onSave)`) — um modal React fica montado no `EditorJSField` e é aberto pelo callback. Confirmação prática na Fase 7.
6. **Rebuild do `packages/database/dist`**: o turbo `dev` script rola `tsc --watch` em packages (verificar em `packages/database/package.json` — `"dev": "tsc --watch"`). Mudanças em `Page.ts` exigem que o watcher esteja rodando OU `pnpm --filter @workspace/database build` manual. **Confirmação na Fase 0.**
7. **Bloco `raw-html` é fictício** (não há plugin oficial publicado por esse nome). Vamos criar um plugin trivial em `editor-js-plugins/raw-html.plugin.ts` (textarea simples no editor + render `dangerouslySetInnerHTML` em `prose` no público) **especificamente como destino de migração**. Não exposto na toolbox por padrão para novas páginas — só aparece em conteúdo migrado.
8. **Fallback HTML legado** funciona com base no `typeof content === "string"`: o renderer público checa o tipo antes de tentar `.blocks`.

## Fora de escopo

- Drag-and-drop sofisticado entre blocos (Editor.js já dá inline reorder gratuito).
- Preview live separado da renderização do editor.
- Versionamento ou histórico de páginas.
- i18n / multi-idioma.
- Sanitização HTML do bloco `raw-html` (assumimos que o conteúdo migrado vem do TipTap, já confiável).
- Autosave.
- Tocar no Blog (`Post`). Aproveitamos o conhecimento mas **não consolidamos editor compartilhado** nesta v1. Se virar dor, extraímos depois.
- Extrair blocos para `packages/ui`. Reuso prematuro.
- Cache/revalidação na rota `[slug]/page.tsx` (mantém comportamento atual: server component sem `unstable_cache`).
- Remover TipTap das dependências do `apps/web`. Cleanup só do uso no form de Page. Auditoria total de TipTap fica para outra entrega.

## Fases de implementação

### Fase 0 — Inventário e validação de premissas

**Objetivo:** confirmar todas as premissas técnicas antes de mexer em código de produção.
**Critério de conclusão:** todas as 6 perguntas abaixo respondidas com evidência (linha:arquivo) e qualquer drift documentado em "Riscos & mitigações".

#### 0.1 — Confirmar `OutputData` exportado por `@editorjs/editorjs`
**Arquivo de referência:** `node_modules/@editorjs/editorjs/types/index.d.ts` (ou `.d.ts` em `dist/`).
**Depende de:** —
Verificar que `OutputData` é nomeado exportado e que o shape é `{ time?: number; blocks: Array<{ id?: string; type: string; data: unknown }>; version?: string }` ou compatível com o uso em `post-content-renderer.tsx` linha 1. Se houver mudança de versão futura, registrar.
**Feito quando:** import `import type { OutputData } from "@editorjs/editorjs"` resolve sem erro de tipo no `tsc`.

#### 0.2 — Confirmar como `Post.content` é persistido no Mongoose
**Arquivo:** `packages/database/src/models/Post.ts`
**Depende de:** —
Ler linhas 43–45 e confirmar que o padrão é `@prop({ type: () => Object, required: true })` com `Record<string, any>`. Esse vai ser o template para `Page.content`.
**Feito quando:** padrão documentado no plano (✅ já documentado em Premissas).

#### 0.3 — Inventariar usos de `RichTextEditor` (TipTap) no `apps/web`
**Comando:** `rg -n "from \"@/modules/dashboard/ui/components/rich-text-editor\"" apps/web`
**Depende de:** —
Listar todos os imports. Esperado: 3 arquivos (`custom-page-form.tsx`, `create-custom-page-form.tsx`, `edit-custom-page-form.tsx`). Se aparecer outro uso, decidir se migra junto ou fica fora de escopo.
**Feito quando:** lista de arquivos confirmada e adicionada como nota na Fase 11.

#### 0.4 — Confirmar build/watch do `@workspace/database`
**Arquivo:** `packages/database/package.json`
**Depende de:** —
Confirmar que existe script `"dev": "tsc --watch"` e que o `pnpm dev` da raiz dispara via TurboRepo. Se não, plano da Fase 3 inclui `pnpm --filter @workspace/database build` manual após editar `Page.ts`.
**Feito quando:** estratégia (watcher vs manual) escolhida e registrada na Fase 3.

#### 0.5 — Confirmar `prose` do Tailwind Typography
**Arquivo:** `apps/web/app/globals.css` (ou config Tailwind 4 equivalente).
**Depende de:** —
Verificar que `prose` está disponível (usado em `[slug]/page.tsx` linha 56 e em `rich-text-editor.tsx` linha 154). Tailwind Typography é geralmente um plugin externo — confirmar import. Necessário porque o fallback de migração e o bloco `raw-html` continuam usando `prose`.
**Feito quando:** `prose` confirmado disponível (ou plano de adicionar dependência registrado).

#### 0.6 — Validar precedente de bridge plugin → React no projeto
**Arquivo:** `apps/web/modules/dashboard/ui/components/editor-js/tool-embed-block.tsx`
**Depende de:** —
Reler o padrão: o plugin recebe `config: { fetchTools }` e chama o callback no `render`. Confirmar que o mesmo padrão suporta um callback `openEditor(blockId, data, onSave)` que dispara setState no `EditorJSField` para abrir um modal RHF. Se houver bloqueio (ex.: Editor.js destruir o iframe da seleção), revisitar Fase 7.
**Feito quando:** estratégia de bridge documentada como decisão na Fase 7.

---

### Fase 1 — Tipos compartilhados em `packages/types`

**Objetivo:** ter os shapes TS dos `data` dos blocos custom + união de tipos de blocos importáveis tanto pelo schema Mongoose (no `dist/`) quanto pelo router/forms.
**Critério de conclusão:** `import { type PageBlock, type HeroBlockData, ... } from "@workspace/types"` funciona em `apps/web` e o build do package passa.

#### 1.1 — Criar `packages/types/src/page-blocks.ts`
**Arquivo:** `packages/types/src/page-blocks.ts`
**Depende de:** Fase 0
Definir interfaces TS para `data` de cada plugin custom: `HeroBlockData`, `StepsBlockData`, `CardsBlockData`, `FaqBlockData`, `CtaBlockData`, `RawHtmlBlockData`. Definir também `PageBlockType` (union de strings: `"hero" | "steps" | ... | "header" | "paragraph" | "list" | "quote" | "image" | "table" | "checklist" | "embed" | "raw-html"`) e `PageBlock` (genérico `{ id?: string; type: PageBlockType; data: unknown }` — não pretendemos discriminar exatamente blocos nativos, eles caem em `unknown`). Exportar tudo nomeado.
**Feito quando:** arquivo compila isolado (`pnpm --filter @workspace/types build`).

#### 1.2 — Re-export em `packages/types/src/index.ts`
**Arquivo:** `packages/types/src/index.ts`
**Depende de:** 1.1
Adicionar `export * from "./page-blocks.js";` ao lado dos exports existentes.
**Feito quando:** `import { HeroBlockData } from "@workspace/types"` resolve em `apps/web`.

---

### Fase 2 — Schemas Zod no app

**Objetivo:** validar `data` de cada bloco custom no client (modais RHF) e no servidor (router tRPC).
**Critério de conclusão:** schemas Zod existem para todos os 5 blocos custom + `raw-html` + união completa, e `pageContentSchema` valida um `OutputData` inteiro (mínimo 1 bloco).

#### 2.1 — Criar `apps/web/modules/dashboard/schema/page-blocks.ts`
**Arquivo:** `apps/web/modules/dashboard/schema/page-blocks.ts`
**Depende de:** 1.2
Espelhar os tipos da Fase 1 com `z.object(...)`. Para blocos nativos do Editor.js (`header`, `paragraph`, etc.), aceitar `data: z.record(z.string(), z.unknown())` (passthrough — Editor.js já valida internamente). Para os 5 customs + `raw-html`, definir shape estrito. Exportar `pageBlockSchema` (union discriminada por `type`) e `pageContentSchema` (= `z.object({ time: z.number().optional(), blocks: z.array(pageBlockSchema).min(1, "Conteúdo precisa de ao menos 1 bloco"), version: z.string().optional() })`).
**Feito quando:** schemas exportados e tipo `z.infer<typeof pageContentSchema>` é compatível com `OutputData`.

#### 2.2 — Estender `apps/web/modules/dashboard/schema/page.tsx`
**Arquivo:** `apps/web/modules/dashboard/schema/page.tsx`
**Depende de:** 2.1
Substituir em `createCustomPageSchema` (linha 60) o campo `content: z.string().min(1, ...)` por `content: pageContentSchema`. Atualizar `updateCustomPageSchema` herdando. Os tipos `CreateCustomPageFormValues`/`UpdateCustomPageFormValues` mudam automaticamente.
**Feito quando:** `tsc --noEmit` no `apps/web` passa e o tipo de `content` agora é objeto, não string.

---

### Fase 3 — Schema Mongoose

**Objetivo:** `Page.content` aceita tanto `OutputData` (novo) quanto `string` (legado, durante migração).
**Critério de conclusão:** documentos novos salvam `content` como objeto e leitura preserva o shape; documentos antigos com `content` string continuam lendo sem erro.

#### 3.1 — Atualizar `packages/database/src/models/Page.ts`
**Arquivo:** `packages/database/src/models/Page.ts`
**Depende de:** Fase 0 (decisão watcher vs manual)
Mudar a prop `content` (linhas 73–74) de `@prop() content?: string;` para `@prop({ type: () => Object }) content?: Record<string, any> | string;` seguindo o padrão de `Post.content` linha 44 e `heroSection` linha 39. Manter o nome `content`. **Não importar tipos de `@workspace/types`** aqui — manter `Record<string, any>` para evitar dep cross-package.
**Feito quando:** `pnpm --filter @workspace/database build` (ou watcher) gera `dist/models/Page.js` atualizado e `import { PageModel } from "@workspace/database"` em `apps/web` mostra o tipo novo.

---

### Fase 4 — Router tRPC

**Objetivo:** `createCustomPage` e `updateCustomPage` aceitam `content` como `OutputData` validado por `pageContentSchema`. Aceite de string fica deprecated (apenas durante janela de migração).
**Critério de conclusão:** mutation com payload `{ content: { blocks: [...] } }` salva e retorna o objeto; mutation com `content: ""` (vazio) retorna erro Zod claro.

#### 4.1 — Importar `pageContentSchema` no router
**Arquivo:** `apps/web/trpc/routers/pagesRouter.ts`
**Depende de:** 2.1, 3.1
Importar `pageContentSchema` de `@/modules/dashboard/schema/page-blocks`. Substituir `content: z.string().min(1)` (linha 64) por `content: pageContentSchema`. Atualizar `updateCustomPageSchema` (linha 71) que herda. Como o body de `createCustomPage` (linhas 233–245) e `updateCustomPage` (linhas 282–291) atribui `page.content = input.content` direto, nenhuma mudança ali é necessária.
**Feito quando:** typecheck passa e curl/devtools batem na mutation com payload novo retornando 200 OK.

---

### Fase 5 — Componentes renderer SSR para blocos custom

**Objetivo:** ter um componente React server-side por tipo de bloco rico, prontos para o registry.
**Critério de conclusão:** `import { HeroBlock } from "@/modules/pages/ui/components/blocks/hero-block"` etc. funciona, cada componente recebe `data: <DataShape>` e renderiza HTML estilizado seguindo o look das institucionais existentes.

> ⚠️ Esta fase tem múltiplos componentes (5+1) com decisões visuais localizadas (paddings, raios, cores de gradiente, hover states, escolha de ícone default por card vazio). Execute `/explode-phase 5` antes.

- [ ] 5.1 — `apps/web/modules/pages/ui/components/blocks/hero-block.tsx`. Reusa visual de `apps/web/modules/hero/ui/components/new-hero-section.tsx` (badge + heading + descrição + 2 CTAs). Server component.
- [ ] 5.2 — `apps/web/modules/pages/ui/components/blocks/steps-block.tsx`. Reusa visual de `apps/web/modules/hero/ui/components/how-it-works.tsx`. Server component, ícones via `DynamicIcon` lucide.
- [ ] 5.3 — `apps/web/modules/pages/ui/components/blocks/cards-block.tsx`. Grid responsivo de cards (título + descrição + ícone opcional + link opcional).
- [ ] 5.4 — `apps/web/modules/pages/ui/components/blocks/faq-block.tsx`. Acordeão (shadcn `Accordion` em `@workspace/ui/components/accordion` se existir; senão composição com `Disclosure` ou detalhes/summary).
- [ ] 5.5 — `apps/web/modules/pages/ui/components/blocks/cta-block.tsx`. Block destacado (gradiente primary) com heading + descrição + CTA. Reusa visual do CTA final em `post-view.tsx` linhas 218–243.
- [ ] 5.6 — `apps/web/modules/pages/ui/components/blocks/raw-html-block.tsx`. Render `dangerouslySetInnerHTML` em wrapper `prose`. Recebe `data: { html: string }`.

---

### Fase 6 — Renderer registry e integração na rota

**Objetivo:** rota pública `/[slug]` usa o renderer novo para `OutputData` e mantém fallback HTML para legado.
**Critério de conclusão:** página com `content: OutputData` renderiza blocos; página com `content: "<p>...</p>"` (string) ainda renderiza no `prose` legado; página com `content: undefined` mostra `notFound()`.

#### 6.1 — Criar `page-content-renderer.tsx`
**Arquivo:** `apps/web/modules/pages/ui/components/page-content-renderer.tsx`
**Depende de:** Fase 5
Espelhar `post-content-renderer.tsx`: switch por `block.type` mapeando para os componentes da Fase 5 + os blocos do blog (header, paragraph, list, quote, image, table, checklist, embed). **Reusar diretamente os componentes em `apps/web/modules/blog/ui/components/blocks/`** (paragraph, header, etc.) — eles são server components puros. Adicionar `case "raw-html"` e os 5 customs. Default `null`.
**Feito quando:** componente compila e renderiza um sample `OutputData` mock em página de teste.

#### 6.2 — Atualizar `apps/web/app/(main)/[slug]/page.tsx`
**Arquivo:** `apps/web/app/(main)/[slug]/page.tsx`
**Depende de:** 6.1
Substituir o `dangerouslySetInnerHTML` (linhas 55–59) por uma checagem: se `typeof page.content === "string"` → manter o div `prose` com `dangerouslySetInnerHTML` (fallback legado); senão se `page.content && typeof page.content === "object"` → renderizar `<PageContentRenderer content={page.content as OutputData} />`. Manter o `<h1>{page.title}</h1>` acima do conteúdo.
**Feito quando:** rota `/[slug]` funciona com ambos formatos sem erro de hidratação.

---

### Fase 7 — Plugins Editor.js custom

**Objetivo:** ter classes vanilla TS para `hero`, `steps`, `cards`, `faq`, `cta`, `raw-html` plugáveis no `EditorJsWrapper`. Cada uma desenha preview compacto + botão "Editar" no editor.
**Critério de conclusão:** plugins instaláveis no Editor.js sem warning, `save()` retorna `data` consistente, `validate()` rejeita estados vazios obrigatórios.

> ⚠️ Esta fase tem decisões de bridge React-vanilla (callback no `config` para abrir modal), padrão de estado entre plugin e modal, e UI do preview compacto (quanto mostrar). Execute `/explode-phase 7` antes.

- [ ] 7.1 — `apps/web/modules/dashboard/ui/components/editorjs-plugins/hero.plugin.ts`
- [ ] 7.2 — `apps/web/modules/dashboard/ui/components/editorjs-plugins/steps.plugin.ts`
- [ ] 7.3 — `apps/web/modules/dashboard/ui/components/editorjs-plugins/cards.plugin.ts`
- [ ] 7.4 — `apps/web/modules/dashboard/ui/components/editorjs-plugins/faq.plugin.ts`
- [ ] 7.5 — `apps/web/modules/dashboard/ui/components/editorjs-plugins/cta.plugin.ts`
- [ ] 7.6 — `apps/web/modules/dashboard/ui/components/editorjs-plugins/raw-html.plugin.ts` (textarea simples no editor; **não exposto na toolbox por padrão** — ver Fase 8.2).
- [ ] 7.7 — Atualizar `apps/web/modules/dashboard/ui/components/editor-js/editor-js-plugins.d.ts` com shims se algum plugin custom precisar.

---

### Fase 8 — Componente `<EditorJSField>` reutilizável

**Objetivo:** wrapper React que monta o Editor.js com tools nativas + plugins custom + bridge de modais. Substitui `<RichTextEditor>` no form de Page sem regredir UX.
**Critério de conclusão:** `<EditorJSField value onChange />` aceita `OutputData`, abre modais ao clicar em "Editar" nos blocos custom, persiste mudanças no form via `field.onChange`.

> ⚠️ Esta fase decide o padrão de bridge (callback no `config` + modal montado no field), gerencia estado de "qual bloco está sendo editado", e integra com `usePostFileUpload` para o bloco `image`. Execute `/explode-phase 8` antes.

- [ ] 8.1 — `apps/web/modules/dashboard/ui/components/editor-js-field/index.tsx` — wrapper React, bridge de modal, registry de plugins.
- [ ] 8.2 — Configurar plugin `raw-html` como **escondido da toolbox** (existe no `tools` do Editor.js mas com `inlineToolbar: false` e sem `toolbox` visível) — só renderiza se já estiver no `data`.
- [ ] 8.3 — Modais RHF + Zod resolver — um `<Dialog>` por tipo, ou um único `<Dialog>` que muda o conteúdo conforme `editingBlock.type`. Decisão de explosão.

---

### Fase 9 — Atualizar forms de Page

**Objetivo:** `create-custom-page-form.tsx`, `edit-custom-page-form.tsx`, `custom-page-form.tsx` usam `<EditorJSField>` em vez de `<RichTextEditor>`. `defaultValues.content` muda de `""` para `{ blocks: [] }`.
**Critério de conclusão:** criar e editar página custom pelo dashboard funciona end-to-end.

#### 9.1 — Atualizar `create-custom-page-form.tsx`
**Arquivo:** `apps/web/modules/dashboard/ui/components/create-custom-page-form.tsx`
**Depende de:** Fase 8, 2.2
Trocar import de `RichTextEditor` por `EditorJSField` (via `next/dynamic({ ssr: false })`, ver `post-form.tsx` linha 24 como modelo). Mudar `defaultValues.content` de `""` para `{ blocks: [] }`. Substituir o `<RichTextEditor value={field.value} onChange={field.onChange} />` (linha 108) pelo novo componente.
**Feito quando:** form abre, edita, e cria página com sucesso.

#### 9.2 — Atualizar `edit-custom-page-form.tsx`
**Arquivo:** `apps/web/modules/dashboard/ui/components/edit-custom-page-form.tsx`
**Depende de:** Fase 8, 2.2
Mesma troca da 9.1. `defaultValues.content` vem do banco; se for string legada, normalizar para `{ blocks: [{ type: "raw-html", data: { html: defaultValues.content } }] }` no momento de carregar (defensivo, caso a migração não tenha rodado). Substituir o `<RichTextEditor>` (linha ~106).
**Feito quando:** form abre página existente, salva mudanças e o conteúdo aparece corretamente na rota pública.

#### 9.3 — Atualizar `custom-page-form.tsx`
**Arquivo:** `apps/web/modules/dashboard/ui/components/custom-page-form.tsx`
**Depende de:** Fase 8, 2.2
Mesma troca. Esse form é o "polimorfo" usado por outras telas — confirmar quais (rg `<CustomPageForm`) e se requerem ajuste.
**Feito quando:** typecheck e fluxo end-to-end passam.

---

### Fase 10 — Script de migração

**Objetivo:** converter páginas existentes com `content: string` HTML para `OutputData` envolvendo num bloco `raw-html`. Idempotente.
**Critério de conclusão:** rodar duas vezes não duplica blocos; páginas com `content` já em objeto são puladas.

#### 10.1 — Criar `apps/web/scripts/migrate-pages-content.ts`
**Arquivo:** `apps/web/scripts/migrate-pages-content.ts`
**Depende de:** Fase 3
Script tsx (segue padrão de `apps/web/scripts/create-admin.ts`) que:
1. Conecta no Mongoose via env (mesma config do `apps/web/lib`).
2. `PageModel.find({ pageType: PageType.CUSTOM })`.
3. Para cada page: se `typeof page.content === "string"` e `page.content.trim().length > 0`, montar `OutputData` `{ time: Date.now(), blocks: [{ type: "raw-html", data: { html: page.content } }], version: "2.31.6" }`. Salvar.
4. Se `content` já é objeto ou está vazio, pular e logar.
**Feito quando:** rodando contra base local com pelo menos 1 página HTML, ela aparece migrada e duas execuções consecutivas geram log "skipped" na segunda.

#### 10.2 — Adicionar script ao `apps/web/package.json`
**Arquivo:** `apps/web/package.json`
**Depende de:** 10.1
Adicionar `"migrate:pages": "tsx scripts/migrate-pages-content.ts"` ao bloco `scripts` (linha 6–14).
**Feito quando:** `pnpm --filter web migrate:pages` funciona.

---

### Fase 11 — Cleanup

**Objetivo:** remover `<RichTextEditor>` dos forms de Page. Manter o componente no projeto (pode ter outros usos a auditar) e o pacote TipTap nas dependências por enquanto.
**Critério de conclusão:** nenhum import de `rich-text-editor` em arquivos de `dashboard/ui/components/*-page-form.tsx`. Renderer público mantém o fallback string (rede de proteção até a migração estar provada em prod).

#### 11.1 — Confirmar que apenas os 3 forms de Page importam `RichTextEditor`
**Comando:** `rg -n "rich-text-editor" apps/web --type ts --type tsx`
**Depende de:** Fase 9
Resultado esperado pós-Fase 9: 0 ocorrências fora do próprio `rich-text-editor.tsx` e dos 3 forms já migrados (e os 3 não devem importar mais). Se aparecer outro uso, escalar como fora de escopo desta entrega e documentar.
**Feito quando:** lista estabilizada.

#### 11.2 — Confirmar que fallback HTML do renderer fica
**Arquivo:** `apps/web/modules/pages/ui/components/page-content-renderer.tsx` e `app/(main)/[slug]/page.tsx`
**Depende de:** 11.1
Não remover o branch `typeof content === "string"` ainda. Adicionar comentário `// TODO(post-migration): remover após confirmar migração rodou em prod`.
**Feito quando:** comentário no código + nota no plano.

---

## Dependências entre fases

```
Fase 0 ──┬── Fase 1 ── Fase 2 ──┬── Fase 4
         │                       │
         └── Fase 3 ─────────────┘
                                 │
Fase 5 (paralela com 1–4) ──── Fase 6
                                 │
Fase 7 (paralela com 5) ──── Fase 8 ── Fase 9 ── Fase 10 ── Fase 11
```

- **Fase 0** é pré-requisito de tudo.
- **Fase 5** (componentes públicos) é independente das Fases 1–4 e pode ser feita em paralelo.
- **Fase 7** (plugins Editor.js) depende dos tipos da Fase 1 mas é independente da 5/6 — pode rodar em paralelo.
- **Fase 8** consolida Fase 7 com tipos/schemas das Fases 1–2.
- **Fase 9** depende de 8 e 2.
- **Fase 10** depende de 3 (schema permite objeto).
- **Fase 11** é cleanup pós-9.

## Riscos & mitigações

| Risco | Probabilidade | Mitigação |
|-------|---------------|-----------|
| Bridge plugin Editor.js → modal React tem race conditions (modal abre antes do `render` terminar) | média | Padrão estabelecido na Fase 7: callback `openEditor` fica no `config`; modal é controlado pelo `EditorJSField`; `save()` lê do estado React, não do DOM do plugin. |
| `OutputData` muda de shape em `@editorjs/editorjs` 3.x | baixa | Pinning na versão `^2.31.6` já está no `package.json`. Cobertura mínima na Fase 0.1. |
| Migração corrompe páginas (perda de formatação) | média | Bloco `raw-html` preserva HTML cru. Renderer fallback string-HTML continua funcionando se o script falhar. Backup do banco antes de rodar produção. |
| Editor.js carrega no SSR e quebra (window undefined) | baixa | Já mitigado pelo padrão `next/dynamic({ ssr: false })` do `post-form.tsx`. Replicar em `EditorJSField`. |
| `Severity.ALLOW` permite salvar lixo (typo no `type`) | média | Validação Zod no router (`pageContentSchema`) é o gate. Refinement adicional opcional: `z.enum([...])` na lista de `type`s permitidos. |
| `tsc --watch` do `@workspace/database` não pega mudança e `dist/` fica stale | média | Premissa 6 + Fase 0.4. Documento explicita rodar `pnpm --filter @workspace/database build` manual quando necessário. |
| Plugin custom de imagem (Editor.js) precisa de upload — tem que reusar `usePostFileUpload` | baixa | Fase 8 espelha exatamente o que `editor-js/index.tsx` linhas 51–58 já faz. |
| Tailwind Typography não estar instalado | baixa | Verificado em Fase 0.5. Bloco `raw-html` precisa de `prose`. |

## Arquivos que serão criados ou modificados

### Criados

| Fase | Arquivo |
|------|---------|
| 1.1 | `packages/types/src/page-blocks.ts` |
| 2.1 | `apps/web/modules/dashboard/schema/page-blocks.ts` |
| 5.1 | `apps/web/modules/pages/ui/components/blocks/hero-block.tsx` |
| 5.2 | `apps/web/modules/pages/ui/components/blocks/steps-block.tsx` |
| 5.3 | `apps/web/modules/pages/ui/components/blocks/cards-block.tsx` |
| 5.4 | `apps/web/modules/pages/ui/components/blocks/faq-block.tsx` |
| 5.5 | `apps/web/modules/pages/ui/components/blocks/cta-block.tsx` |
| 5.6 | `apps/web/modules/pages/ui/components/blocks/raw-html-block.tsx` |
| 6.1 | `apps/web/modules/pages/ui/components/page-content-renderer.tsx` |
| 7.1–7.6 | `apps/web/modules/dashboard/ui/components/editorjs-plugins/{hero,steps,cards,faq,cta,raw-html}.plugin.ts` |
| 8.1 | `apps/web/modules/dashboard/ui/components/editor-js-field/index.tsx` |
| 10.1 | `apps/web/scripts/migrate-pages-content.ts` |

### Modificados

| Fase | Arquivo | Mudança |
|------|---------|---------|
| 1.2 | `packages/types/src/index.ts` | `export * from "./page-blocks.js"` |
| 2.2 | `apps/web/modules/dashboard/schema/page.tsx` | `content` agora `pageContentSchema` |
| 3.1 | `packages/database/src/models/Page.ts` | `content?: Record<string, any> \| string` |
| 4.1 | `apps/web/trpc/routers/pagesRouter.ts` | importar `pageContentSchema` |
| 6.2 | `apps/web/app/(main)/[slug]/page.tsx` | branch string vs OutputData |
| 7.7 | `apps/web/modules/dashboard/ui/components/editor-js/editor-js-plugins.d.ts` | shims se necessário |
| 9.1 | `apps/web/modules/dashboard/ui/components/create-custom-page-form.tsx` | `<EditorJSField>` |
| 9.2 | `apps/web/modules/dashboard/ui/components/edit-custom-page-form.tsx` | `<EditorJSField>` |
| 9.3 | `apps/web/modules/dashboard/ui/components/custom-page-form.tsx` | `<EditorJSField>` |
| 10.2 | `apps/web/package.json` | script `migrate:pages` |
| 11.2 | `apps/web/modules/pages/ui/components/page-content-renderer.tsx` | comentário TODO |

### Não-modificados (intencional)

- `apps/web/modules/dashboard/ui/components/rich-text-editor.tsx` — fica no projeto (auditoria de outros usos é fora de escopo).
- `apps/web/modules/dashboard/ui/components/editor-js/index.tsx` — wrapper do blog, não tocar.
- `apps/web/modules/blog/ui/components/blocks/*` — reusados pelo renderer de Pages, sem mudanças.
- `apps/web/modules/common/ui/components/footer.tsx` — query `getFooterPages` já retorna o que precisa.
