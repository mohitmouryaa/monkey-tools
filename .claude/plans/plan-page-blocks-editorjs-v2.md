# Plano: Page CUSTOM com Editor.js (substituindo TipTap)

> Versão: v2 | Criado em: 2026-04-29 | Status: draft
> Revisado por subagente | 8 sugestões incorporadas, 0 ignoradas

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
9. **Estilo do bloco `raw-html`**: como `@tailwindcss/typography` NÃO está instalado no monorepo (descoberta da Fase 0.5), o bloco `raw-html` usa **classes utilitárias arbitrárias** no padrão do `post-content-renderer.tsx` linhas 23–32 (`[&_h1]:...`, `[&_a]:text-primary`, etc.). Não dependemos de `prose`. Essa decisão também vale para o fallback HTML legado em `[slug]/page.tsx` — atualizado na Fase 6.2.
10. **Migração é pré-condição obrigatória antes do form de edição abrir uma página legada** (resposta ao R5). O form NÃO normaliza string para `raw-html` on-the-fly: se o `defaultValues.content` for string, o form mostra um banner "Esta página precisa ser migrada — rode `pnpm --filter web migrate:pages`" e desabilita a aba do editor. Mais simples, evita ambiguidade e força o operador a ter um único caminho.

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
- **Estilo de conteúdo HTML cru**: imitar o padrão do `post-content-renderer.tsx` linhas 23–32 — classes arbitrárias Tailwind tipo `[&_h1]:text-3xl [&_h1]:font-bold` etc. **Sem `prose`** (não há plugin instalado).
- **Style**: Biome — 2 espaços, double quotes, 130 colunas. Imports manuais.
- **Convenção**: arquivos kebab-case, models PascalCase, classes de plugin Editor.js em PascalCase (`HeroPlugin`).

## Premissas

1. **Editor.js client-only**: o wrapper é montado via `next/dynamic({ ssr: false })` (ver `post-form.tsx` linha 24). Mesmo padrão será aplicado em `custom-page-form.tsx`.
2. **`Severity.ALLOW` no Page model** já está habilitado — `Page.content` pode armazenar objeto Mongoose `Mixed` sem definir shape (mesmo padrão de `Post.content`).
3. **`OutputData` é exportado por `@editorjs/editorjs`** e já é importado em `post-content-renderer.tsx` linha 1. Confirmação na Fase 0.
4. **`packages/types` não importa Zod em runtime** — schemas Zod ficam em `apps/web` (form e router). Tipos TS compartilhados sim.
5. **Plugins Editor.js custom rodam fora do React tree**: o padrão estabelecido no projeto (`ToolEmbedBlock`) é renderizar HTML imperativo no `render()` e expor um callback no `config` para acessar dados externos (ex.: `fetchTools` recebido via `config`). Para abrir modal React do plugin, vamos usar **bridge via callback no config** (`config.openEditor(blockId, currentData, onSave)`) — um modal React fica montado no `EditorJSField` e é aberto pelo callback. **Validação prática obrigatória na Fase 0.6 (spike)** antes de explodir Fase 7.
6. **Rebuild do `packages/database/dist`**: o turbo `dev` script rola `tsc --watch` em packages (verificar em `packages/database/package.json` — `"dev": "tsc --watch"`). Mudanças em `Page.ts` exigem que o watcher esteja rodando OU `pnpm --filter @workspace/database build` manual. **Confirmação na Fase 0.**
7. **Bloco `raw-html` é fictício** (não há plugin oficial publicado por esse nome). Vamos criar um plugin trivial em `editor-js-plugins/raw-html.plugin.ts` (textarea simples no editor + render com classes utilitárias arbitrárias no público) **especificamente como destino de migração**. Não exposto na toolbox por padrão para novas páginas — só aparece em conteúdo migrado.
8. **Fallback HTML legado** funciona com base no `typeof content === "string"`: o renderer público checa o tipo antes de tentar `.blocks`. **Pré-condição:** `content === undefined`/`null` é tratado como notFound() ANTES do branching de tipo.
9. **`@tailwindcss/typography` não está instalado** (verificado: `packages/ui/package.json` e `apps/web/package.json` não listam o plugin; `packages/ui/src/styles/globals.css` não importa typography). O uso atual de `className="prose..."` em `[slug]/page.tsx` linha 56 e `rich-text-editor.tsx` linha 154 está **silenciosamente sem efeito visual** — caso de drift que esta entrega corrige indiretamente ao migrar para classes arbitrárias. Plano assume que NADA depende de `prose` funcionar.
10. **Mongoose `Mixed` + atribuição vs mutação**: o router atual faz `page.content = input.content` (atribuição direta) — isso é safe sem `markModified('content')`. Caso futuro código mute `page.content.blocks.push(...)` (mutação in-place), precisaria de `page.markModified('content')`. Documentar a regra inline no model.
11. **Serialização tRPC + SuperJSON**: queries `pages.getBySlug` retornam `...page` (spread de `.lean()`) e `_id` stringificado. Objetos `Mixed` aninhados são preservados sem perder a tipagem em runtime. Confirmar empiricamente na Fase 6.

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
- Instalar `@tailwindcss/typography` agora. Decisão arquitetural (Decisão 9) é viver sem.

## Fases de implementação

### Fase 0 — Inventário, validação de premissas e SPIKE de bridge ✅

**Objetivo:** confirmar todas as premissas técnicas + provar que bridge plugin→modal React funciona ANTES de mexer em código de produção e antes de explodir Fases 7/8.
**Critério de conclusão:** todas as 7 perguntas abaixo respondidas com evidência (linha:arquivo) + spike da Fase 0.7 funcional em branch local descartável.

#### 0.1 — Confirmar `OutputData` exportado por `@editorjs/editorjs` ✅
**Arquivo de referência:** `node_modules/@editorjs/editorjs/types/index.d.ts` (ou `.d.ts` em `dist/`).
**Depende de:** —
Verificar que `OutputData` é nomeado exportado e que o shape é `{ time?: number; blocks: Array<{ id?: string; type: string; data: unknown }>; version?: string }` ou compatível com o uso em `post-content-renderer.tsx` linha 1.
**Feito quando:** import `import type { OutputData } from "@editorjs/editorjs"` resolve sem erro de tipo no `tsc`.
**Resultado:** `OutputData` é nomeado exportado em `types/index.d.ts:85` (`export { OutputData, OutputBlockData} from './data-formats/output-data';`). Shape em `types/data-formats/output-data.d.ts`: `{ version?: string; time?: number; blocks: OutputBlockData[] }`. Compatível com o uso em `apps/web/modules/blog/ui/components/post-content-renderer.tsx`. `pnpm --filter web typecheck` passa.

#### 0.2 — Confirmar como `Post.content` é persistido no Mongoose ✅
**Arquivo:** `packages/database/src/models/Post.ts`
**Depende de:** —
Ler linhas 43–45 e confirmar que o padrão é `@prop({ type: () => Object, required: true })` com `Record<string, any>`. Esse vai ser o template para `Page.content`.
**Feito quando:** padrão documentado no plano (✅ já documentado em Premissas).
**Resultado:** confirmado em `packages/database/src/models/Post.ts:43-45`: `@prop({ type: () => Object, required: true }) content!: Record<string, any>` + `Severity.ALLOW` na classe (linha 24). Para `Page.content` na Fase 3 vamos usar `Record<string, any> | string` (sem `required`) para suportar legado.

#### 0.3 — Inventariar usos de `RichTextEditor` (TipTap) no `apps/web` ✅
**Comando:** `rg -n "from \"@/modules/dashboard/ui/components/rich-text-editor\"" apps/web`
**Depende de:** —
Listar todos os imports. Esperado: 3 arquivos (`custom-page-form.tsx`, `create-custom-page-form.tsx`, `edit-custom-page-form.tsx`). Se aparecer outro uso, decidir se migra junto ou fica fora de escopo.
**Feito quando:** lista de arquivos confirmada e adicionada como nota na Fase 11.
**Resultado:** **4 usos**, não 3. In-scope (Page CUSTOM): `apps/web/modules/dashboard/ui/components/custom-page-form.tsx:21`, `create-custom-page-form.tsx:15`, `edit-custom-page-form.tsx:15`. **Out-of-scope (Tool):** `apps/web/modules/dashboard/ui/components/tool-form.tsx:19+385` no campo `richContent` da entidade Tool — fica fora desta entrega (auditoria de TipTap em Tool é outra entrega, alinhada ao "Fora de escopo" do plano). Documentar no checkpoint da Fase 11.

#### 0.4 — Confirmar build/watch do `@workspace/database` ✅
**Arquivo:** `packages/database/package.json`
**Depende de:** —
Confirmar que existe script `"dev": "tsc --watch"` e que o `pnpm dev` da raiz dispara via TurboRepo. Se não, plano da Fase 3 inclui `pnpm --filter @workspace/database build` manual após editar `Page.ts`.
**Feito quando:** estratégia (watcher vs manual) escolhida e registrada na Fase 3.
**Resultado:** confirmado em `packages/database/package.json:14-17`: `"dev": "tsc --watch"`. `turbo.json:28-31` declara `dev` com `cache: false, persistent: true` — o `pnpm dev` da raiz dispara em todos os packages. **Estratégia para Fase 3:** se `pnpm dev` estiver rodando, o watcher pega; caso contrário, rodar `pnpm --filter @workspace/database build` manual após salvar `Page.ts`.

#### 0.5 — Confirmar (in)disponibilidade do Tailwind Typography (`prose`) ✅
**Arquivos:** `apps/web/package.json`, `packages/ui/package.json`, `packages/ui/src/styles/globals.css`.
**Depende de:** —
Confirmar (já feito no levantamento desta v2) que `@tailwindcss/typography` NÃO está instalado e que `prose` não tem efeito. Decisão arquitetural já fechada na Decisão 9: usar classes utilitárias arbitrárias.
**Feito quando:** Premissa 9 e Decisão 9 referenciadas e plano segue sem instalar typography.
**Resultado:** confirmado: nenhuma menção a `typography` em `apps/web/package.json`, `packages/ui/package.json` ou `packages/ui/src/styles/globals.css` (count = 0). Premissa 9 e Decisão 9 mantidas — usaremos classes utilitárias arbitrárias.

#### 0.6 — Validar precedente de bridge plugin → React ✅
**Arquivo:** `apps/web/modules/dashboard/ui/components/editor-js/tool-embed-block.tsx`
**Depende de:** —
Reler o padrão atual (config recebe callback, plugin chama no `render`).
**Feito quando:** padrão estudado e documentado como base para spike 0.7.
**Resultado:** padrão estabelecido em `tool-embed-block.tsx`: `constructor({ data, config })` recebe callbacks externos via `config`; `render()` cria HTML imperativo (linha 40-61), anexa listeners (linha 49) e dispara callback assíncrono (`config.fetchTools()` em `loadTools`, linha 64); `save(blockContent)` lê do DOM (linha 77-80). **Adaptação para spike:** em vez de ler DOM no `save`, mantemos `this.data` sincronizado via `onSave` callback do modal — o `save()` retorna `this.data` direto. Reduz dependência do DOM.

#### 0.7 — SPIKE: plugin custom hello world com modal React (NOVO) ✅
**Arquivo temporário:** `apps/web/modules/dashboard/ui/components/editorjs-plugins/_spike-hello.plugin.ts` (descartável).
**Depende de:** 0.6
Criar plugin minimalista que recebe `config: { openEditor: (data, onSave) => void }`, no `render()` cria botão "Editar"; ao clicar chama `config.openEditor(this.data, (newData) => { this.data = newData })`. No `EditorJsWrapper` de teste (cópia ou rota dev), montar `<Dialog>` controlado por `useState` e passar `openEditor` no config. Verificar:
- O modal abre.
- O `save()` do plugin retorna `data` atualizado após edição.
- Não há leak de estado entre múltiplas instâncias do mesmo bloco.
**Feito quando:** spike funciona em http://localhost:3000 (rota de dev temporária OK), conclusão registrada como decisão de implementação na Fase 7 (deletar arquivo do spike depois).
**Status:** **validado visualmente em 2026-04-29.** Arquivos:
- Plugin: `apps/web/modules/dashboard/ui/components/editorjs-plugins/_spike-hello.plugin.ts`
- View client: `apps/web/modules/dashboard/ui/views/spike-editorjs-view.tsx` (carregada via `next/dynamic({ ssr: false })`)
- Rota: `apps/web/app/dashboard/spike-editorjs/page.tsx` (URL: `/dashboard/spike-editorjs`)

Typecheck (`pnpm --filter web typecheck`) passa. Lint nos 3 arquivos do spike passa (`npx biome check ...`). Falhas de lint do `pnpm lint` são **pré-existentes** em `modules/blog/*`, `modules/tools/*`, `scripts/i18n-audit.ts` — não foram introduzidas por esta fase.

**Validação visual confirmada pelo usuário** — 4 critérios (modal abre, save() retorna data atualizado, sem leak entre instâncias, JSON correto após editar) passaram.

**Decisão herdada de `dev-br` (commit 76a5176 fix(editor-js))**: para evitar colisão no React 19 Strict Mode, o `EditorJSField` da Fase 8 deve seguir o padrão **holder único por mount (`useState(() => Math.random().toString(36).slice(2))`) + init adiado com `setTimeout(0)` + cleanup com `clearTimeout` + sem guard `if (ref.current) return`**. `useId` colide no double-mount. Replicar exatamente como em `apps/web/modules/dashboard/ui/components/editor-js/index.tsx`.

**Cleanup pós-fase 7:** deletar `_spike-hello.plugin.ts`, `spike-editorjs-view.tsx`, `app/dashboard/spike-editorjs/`.

---

### Fase 1 — Tipos compartilhados em `packages/types` ✅

**Objetivo:** ter os shapes TS dos `data` dos blocos custom + união de tipos de blocos importáveis tanto pelo schema Mongoose (no `dist/`) quanto pelo router/forms.
**Critério de conclusão:** `import { type PageBlock, type HeroBlockData, ... } from "@workspace/types"` funciona em `apps/web` e o build do package passa.

#### 1.1 — Criar `packages/types/src/page-blocks.ts`
**Arquivo:** `packages/types/src/page-blocks.ts`
**Depende de:** Fase 0
Definir interfaces TS para `data` de cada plugin custom: `HeroBlockData`, `StepsBlockData`, `CardsBlockData`, `FaqBlockData`, `CtaBlockData`, `RawHtmlBlockData`. Definir também `PageBlockType` (union de strings: `"hero" | "steps" | "cards" | "faq" | "cta" | "header" | "paragraph" | "list" | "quote" | "image" | "table" | "checklist" | "embed" | "raw-html"`) e `PageBlock` (genérico `{ id?: string; type: PageBlockType; data: unknown }`). Exportar tudo nomeado.
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
Espelhar os tipos da Fase 1 com `z.object(...)`. Para blocos nativos do Editor.js (`header`, `paragraph`, etc.), aceitar `data: z.record(z.string(), z.unknown())` (passthrough — Editor.js já valida internamente). Para os 5 customs + `raw-html`, definir shape estrito. Exportar `pageBlockSchema` (union discriminada por `type`) e **dois** schemas de conteúdo:
- `pageOutputDataSchema` — só objeto `OutputData` (estrito, mínimo 1 bloco). Usado em validação do form quando o admin já está editando (não-legado).
- `pageContentSchema` — `z.union([pageOutputDataSchema, z.string().min(1)])` — aceita string legada DURANTE a janela de migração. **Removido na Fase 11.3 quando migração estiver provada.**
**Feito quando:** schemas exportados, `z.infer<typeof pageOutputDataSchema>` é compatível com `OutputData`, e ambos os schemas usáveis.

#### 2.2 — Estender `apps/web/modules/dashboard/schema/page.tsx`
**Arquivo:** `apps/web/modules/dashboard/schema/page.tsx`
**Depende de:** 2.1
Substituir em `createCustomPageSchema` (linha 60) o campo `content: z.string().min(1, ...)` por `content: pageOutputDataSchema` (formulários novos só aceitam objeto; nada de string em criação). Atualizar `updateCustomPageSchema` herdando — também só aceita objeto. **A pré-condição da Decisão 10 (banner se legado)** garante que update só dispara com objeto.
**Feito quando:** `tsc --noEmit` no `apps/web` passa e o tipo de `content` agora é objeto, não string.

---

### Fase 3 — Schema Mongoose

**Objetivo:** `Page.content` aceita tanto `OutputData` (novo) quanto `string` (legado, durante migração).
**Critério de conclusão:** documentos novos salvam `content` como objeto e leitura preserva o shape; documentos antigos com `content` string continuam lendo sem erro.

#### 3.1 — Atualizar `packages/database/src/models/Page.ts`
**Arquivo:** `packages/database/src/models/Page.ts`
**Depende de:** Fase 0 (decisão watcher vs manual)
Mudar a prop `content` (linhas 73–74) de `@prop() content?: string;` para `@prop({ type: () => Object }) content?: Record<string, any> | string;` seguindo o padrão de `Post.content` linha 44 e `heroSection` linha 39. Manter o nome `content`. **Não importar tipos de `@workspace/types`** aqui — manter `Record<string, any>` para evitar dep cross-package. Adicionar comentário JSDoc:
```ts
// `content` é um Mongoose Mixed. Use SEMPRE atribuição direta
// (page.content = newValue) — nunca mutate in-place sem markModified('content').
```
**Feito quando:** `pnpm --filter @workspace/database build` (ou watcher) gera `dist/models/Page.js` atualizado e `import { PageModel } from "@workspace/database"` em `apps/web` mostra o tipo novo.

---

### Fase 4 — Router tRPC

**Objetivo:** `createCustomPage` e `updateCustomPage` aceitam `content` como `OutputData` (estrito) na criação; `updateCustomPage` também aceita string apenas se vier de uma página legada (rota especial NÃO criada — ver Decisão 10).
**Critério de conclusão:** mutation com payload `{ content: { blocks: [...] } }` salva e retorna o objeto; mutation com `content: ""` ou `content: "<p>..."` (string em update normal) retorna erro Zod claro.

#### 4.1 — Importar `pageOutputDataSchema` no router
**Arquivo:** `apps/web/trpc/routers/pagesRouter.ts`
**Depende de:** 2.1, 3.1
Importar `pageOutputDataSchema` de `@/modules/dashboard/schema/page-blocks`. Substituir `content: z.string().min(1)` (linha 64) por `content: pageOutputDataSchema`. Atualizar `updateCustomPageSchema` (linha 71) que herda. Como o body de `createCustomPage` (linhas 233–245) e `updateCustomPage` (linhas 282–291) atribui `page.content = input.content` direto, nenhuma mudança ali é necessária.
**Feito quando:** typecheck passa e payload novo retornando 200 OK; payload legado string retorna erro Zod.

---

### Fase 5 — Componentes renderer SSR para blocos custom

**Objetivo:** ter um componente React server-side por tipo de bloco rico, prontos para o registry.
**Critério de conclusão:** `import { HeroBlock } from "@/modules/pages/ui/components/blocks/hero-block"` etc. funciona, cada componente recebe `data: <DataShape>` e renderiza HTML estilizado. **Smoke test:** uma rota dev `/test-blocks` que renderiza um sample de cada bloco com dados mock passa sem erro de console no navegador.

> ⚠️ Esta fase tem múltiplos componentes (5+1) com decisões visuais localizadas (paddings, raios, cores de gradiente, hover states, escolha de ícone default por card vazio, layout de FAQ). Execute `/explode-phase 5` antes.

- [ ] 5.1 — `apps/web/modules/pages/ui/components/blocks/hero-block.tsx`. Reusa visual de `apps/web/modules/hero/ui/components/new-hero-section.tsx` (badge + heading + descrição + 2 CTAs). Server component.
- [ ] 5.2 — `apps/web/modules/pages/ui/components/blocks/steps-block.tsx`. Reusa visual de `apps/web/modules/hero/ui/components/how-it-works.tsx`. Server component, ícones via `DynamicIcon` lucide.
- [ ] 5.3 — `apps/web/modules/pages/ui/components/blocks/cards-block.tsx`. Grid responsivo de cards (título + descrição + ícone opcional + link opcional).
- [ ] 5.4 — `apps/web/modules/pages/ui/components/blocks/faq-block.tsx`. Acordeão usando `@workspace/ui/components/accordion` (confirmado existente).
- [ ] 5.5 — `apps/web/modules/pages/ui/components/blocks/cta-block.tsx`. Block destacado (gradiente primary) com heading + descrição + CTA. Reusa visual do CTA final em `post-view.tsx` linhas 218–243.
- [ ] 5.6 — `apps/web/modules/pages/ui/components/blocks/raw-html-block.tsx`. Render `dangerouslySetInnerHTML` em wrapper com **classes arbitrárias Tailwind** (espelhando `post-content-renderer.tsx` linhas 23–32). Recebe `data: { html: string }`. **Sem `prose`.**

---

### Fase 6 — Renderer registry e integração na rota

**Objetivo:** rota pública `/[slug]` usa o renderer novo para `OutputData` e mantém fallback HTML para legado. Cobre o caso `content === undefined` antes do branching.
**Critério de conclusão:** página com `content: OutputData` renderiza blocos; página com `content: "<p>...</p>"` (string) ainda renderiza com classes arbitrárias; página com `content: undefined`/`null` retorna `notFound()`. **Smoke test:** as 6 páginas institucionais renderizam visualmente sem regressão na home/footer/links.

#### 6.1 — Criar `page-content-renderer.tsx`
**Arquivo:** `apps/web/modules/pages/ui/components/page-content-renderer.tsx`
**Depende de:** Fase 5
Espelhar `post-content-renderer.tsx`: switch por `block.type` mapeando para os componentes da Fase 5 + os blocos do blog (header, paragraph, list, quote, image, table, checklist, embed). **Reusar diretamente os componentes em `apps/web/modules/blog/ui/components/blocks/`** (paragraph, header, etc.) — eles são server components puros. Adicionar `case "raw-html"` e os 5 customs. Default `null`.
**Feito quando:** componente compila e renderiza um sample `OutputData` mock.

#### 6.2 — Atualizar `apps/web/app/(main)/[slug]/page.tsx`
**Arquivo:** `apps/web/app/(main)/[slug]/page.tsx`
**Depende de:** 6.1
Substituir o `dangerouslySetInnerHTML` (linhas 55–59) por:
1. `if (!page.content) notFound()` — guarda explícita ANTES do branching (responde a R4).
2. Se `typeof page.content === "string"` → render `<div className="[&_h1]:... [&_a]:text-primary ...">` (espelhando o pattern do `post-content-renderer.tsx` linhas 23–32) com `dangerouslySetInnerHTML`. **Sem `prose`** (já não tinha efeito).
3. Senão → renderizar `<PageContentRenderer content={page.content as OutputData} />`.
Manter `<h1>{page.title}</h1>` acima do conteúdo.
**Feito quando:** rota `/[slug]` funciona com ambos formatos sem erro de hidratação e nenhuma das 6 páginas institucionais existentes regrediu.

---

### Fase 7 — Plugins Editor.js custom

**Objetivo:** ter classes vanilla TS para `hero`, `steps`, `cards`, `faq`, `cta`, `raw-html` plugáveis no `EditorJsWrapper`. Cada uma desenha preview compacto + botão "Editar" no editor. **Padrão de bridge: callback `openEditor` no `config`** — provado na Fase 0.7.
**Critério de conclusão:** plugins instaláveis no Editor.js sem warning, `save()` retorna `data` consistente, `validate()` rejeita estados vazios obrigatórios.

> ⚠️ Esta fase tem decisões de UI do preview (quanto mostrar), padrão de estado entre plugin e modal, layout da textarea do `raw-html`, e default values de cada bloco. Execute `/explode-phase 7` antes.

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

> ⚠️ Esta fase decide o padrão de bridge concreto (callback no `config` + modal montado no field), gerencia estado de "qual bloco está sendo editado", e integra com `usePostFileUpload` para o bloco `image` nativo. Execute `/explode-phase 8` antes.

- [ ] 8.1 — `apps/web/modules/dashboard/ui/components/editor-js-field/index.tsx` — wrapper React, bridge de modal, registry de plugins.
- [ ] 8.2 — Configurar plugin `raw-html` como **escondido da toolbox** (existe no `tools` do Editor.js mas com `inlineToolbar: false` e sem `toolbox` visível) — só renderiza se já estiver no `data`.
- [ ] 8.3 — Modais RHF + Zod resolver — um `<Dialog>` por tipo, ou um único `<Dialog>` que muda o conteúdo conforme `editingBlock.type`. Decisão de explosão.

---

### Fase 9 — Atualizar forms de Page

**Objetivo:** `create-custom-page-form.tsx`, `edit-custom-page-form.tsx`, `custom-page-form.tsx` usam `<EditorJSField>` em vez de `<RichTextEditor>`. `defaultValues.content` muda de `""` para `{ blocks: [] }`. **Form de edit detecta string legada e bloqueia com banner (Decisão 10).**
**Critério de conclusão:** criar página custom funciona end-to-end; editar página JÁ MIGRADA funciona end-to-end; abrir página NÃO migrada mostra banner pedindo `pnpm --filter web migrate:pages`.

#### 9.1 — Atualizar `create-custom-page-form.tsx`
**Arquivo:** `apps/web/modules/dashboard/ui/components/create-custom-page-form.tsx`
**Depende de:** Fase 8, 2.2
Trocar import de `RichTextEditor` por `EditorJSField` (via `next/dynamic({ ssr: false })`, ver `post-form.tsx` linha 24 como modelo). Mudar `defaultValues.content` de `""` para `{ blocks: [] }`. Substituir o `<RichTextEditor value={field.value} onChange={field.onChange} />` (linha 108) pelo novo componente.
**Feito quando:** form abre, edita, e cria página com sucesso.

#### 9.2 — Atualizar `edit-custom-page-form.tsx`
**Arquivo:** `apps/web/modules/dashboard/ui/components/edit-custom-page-form.tsx`
**Depende de:** Fase 8, 2.2, Decisão 10
Mesma troca da 9.1, mas com guarda no topo do componente:
```tsx
if (typeof defaultValues.content === "string") {
  return <LegacyMigrationBanner pageId={defaultValues.id} />;
}
```
`LegacyMigrationBanner` é um componente local (criado nesta sub-task) que mostra alerta com instrução clara ("Esta página tem conteúdo em formato legado. Rode `pnpm --filter web migrate:pages` antes de editar.") + botão "Atualizar a página" que faz `router.refresh()`.
**Feito quando:** form abre página migrada e salva mudanças OK; form abre página não-migrada e mostra banner sem disparar fetch ao Editor.js.

#### 9.3 — Atualizar `custom-page-form.tsx`
**Arquivo:** `apps/web/modules/dashboard/ui/components/custom-page-form.tsx`
**Depende de:** Fase 8, 2.2
Mesma troca da 9.1. Esse form é o "polimorfo" usado por outras telas — confirmar quais (`rg "<CustomPageForm" apps/web`) e se requerem ajuste. Quando em modo `edit`, aplicar guarda da Decisão 10 (igual a 9.2).
**Feito quando:** typecheck e fluxo end-to-end passam para os dois modos (`create` e `edit`).

---

### Fase 10 — Script de migração

**Objetivo:** converter páginas existentes com `content: string` HTML para `OutputData` envolvendo num bloco `raw-html`. Idempotente.
**Critério de conclusão:** rodar duas vezes não duplica blocos; páginas com `content` já em objeto são puladas. **Smoke test:** rodar contra base local com pelo menos 1 página HTML, ver migração; rodar segunda vez, ver `skipped`.

#### 10.1 — Criar `apps/web/scripts/migrate-pages-content.ts`
**Arquivo:** `apps/web/scripts/migrate-pages-content.ts`
**Depende de:** Fase 3
Script tsx (segue padrão de `apps/web/scripts/create-admin.ts`) que:
1. Conecta no Mongoose via env (mesma config do `apps/web/lib`).
2. `PageModel.find({ pageType: PageType.CUSTOM })`.
3. Para cada page: se `typeof page.content === "string"` e `page.content.trim().length > 0`, montar `OutputData` `{ time: Date.now(), blocks: [{ type: "raw-html", data: { html: page.content } }], version: "2.31.6" }`. **Atribuição direta** (`page.content = newOutputData`) + `page.save()` — não mutar in-place (regra Premissa 10).
4. Se `content` já é objeto ou string vazia, pular e logar `skipped (already migrated|empty)`.
5. Log final com counts: `migrated`, `skipped (already migrated)`, `skipped (empty)`.
**Feito quando:** rodar contra base local: idempotência confirmada e log de count visível.

#### 10.2 — Adicionar script ao `apps/web/package.json`
**Arquivo:** `apps/web/package.json`
**Depende de:** 10.1
Adicionar `"migrate:pages": "tsx scripts/migrate-pages-content.ts"` ao bloco `scripts` (linha 6–14).
**Feito quando:** `pnpm --filter web migrate:pages` funciona.

---

### Fase 11 — Cleanup

**Objetivo:** remover `<RichTextEditor>` dos forms de Page. Manter o componente no projeto (pode ter outros usos a auditar) e o pacote TipTap nas dependências por enquanto. Após confirmação prática da migração, remover string-fallback dos schemas Zod.
**Critério de conclusão:** nenhum import de `rich-text-editor` em arquivos `*-page-form.tsx`. Renderer público mantém fallback string como rede de proteção.

#### 11.1 — Confirmar que apenas os 3 forms de Page importam `RichTextEditor`
**Comando:** `rg -n "rich-text-editor" apps/web --type ts --type tsx`
**Depende de:** Fase 9
Resultado esperado pós-Fase 9: 0 ocorrências fora do próprio `rich-text-editor.tsx`. Se aparecer outro uso, escalar como fora de escopo desta entrega e documentar.
**Feito quando:** lista estabilizada.

#### 11.2 — Confirmar que fallback HTML do renderer fica
**Arquivos:** `apps/web/modules/pages/ui/components/page-content-renderer.tsx`, `apps/web/app/(main)/[slug]/page.tsx`
**Depende de:** 11.1
Não remover o branch `typeof content === "string"` ainda. Adicionar comentário `// TODO(post-migration): remover após confirmar migração rodou em prod`.
**Feito quando:** comentário no código + nota no plano.

#### 11.3 — (Opcional, pós-deploy) Remover string-fallback do `pageContentSchema`
**Arquivo:** `apps/web/modules/dashboard/schema/page-blocks.ts`
**Depende de:** confirmação de prod
Quando a migração for confirmada em prod, deprecar `pageContentSchema` (= union string|object) e usar só `pageOutputDataSchema` no router. Esta sub-task fica registrada mas **não é critério de done desta entrega**.

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

- **Fase 0** é pré-requisito de tudo. **Fase 0.7 (spike) é pré-requisito de explodir Fase 7.**
- **Fase 5** (componentes públicos) é independente das Fases 1–4 e pode ser feita em paralelo.
- **Fase 7** (plugins Editor.js) depende dos tipos da Fase 1 e do spike 0.7. Independente da 5/6 — pode rodar em paralelo após 0.7.
- **Fase 8** consolida Fase 7 com tipos/schemas das Fases 1–2.
- **Fase 9** depende de 8 e 2.
- **Fase 10** depende de 3 (schema permite objeto).
- **Fase 11** é cleanup pós-9. Sub-task 11.3 é pós-prod (não desta entrega).

## Riscos & mitigações

| Risco | Probabilidade | Mitigação |
|-------|---------------|-----------|
| Bridge plugin Editor.js → modal React tem race conditions (modal abre antes do `render` terminar) | média | **Spike obrigatório na Fase 0.7** antes de explodir Fase 7. Padrão estabelecido: callback `openEditor` no `config`; modal controlado pelo `EditorJSField`; `save()` lê do estado React via closure, não do DOM do plugin. |
| `OutputData` muda de shape em `@editorjs/editorjs` 3.x | baixa | Pinning na versão `^2.31.6` já está no `package.json`. Cobertura mínima na Fase 0.1. |
| Migração corrompe páginas (perda de formatação) | média | Bloco `raw-html` preserva HTML cru. Renderer fallback string-HTML continua funcionando se o script falhar. Backup do banco antes de rodar produção. |
| Editor.js carrega no SSR e quebra (window undefined) | baixa | Já mitigado pelo padrão `next/dynamic({ ssr: false })` do `post-form.tsx`. Replicar em `EditorJSField`. |
| `Severity.ALLOW` permite salvar lixo (typo no `type`) | média | Validação Zod no router (`pageOutputDataSchema`) é o gate. `pageBlockSchema` é union discriminada por `type`. |
| `tsc --watch` do `@workspace/database` não pega mudança e `dist/` fica stale | média | Premissa 6 + Fase 0.4. Documento explicita rodar `pnpm --filter @workspace/database build` manual quando necessário. |
| Plugin custom de imagem (Editor.js nativo) precisa de upload — tem que reusar `usePostFileUpload` | baixa | Fase 8 espelha exatamente o que `editor-js/index.tsx` linhas 51–58 já faz. |
| `prose` legado nunca teve efeito — visual atual das páginas pode parecer regressão depois da troca | **alta** | **Premissa 9** explicita o achado. Decisão 9 troca para classes arbitrárias. Fase 6 smoke test compara visual antes/depois nas 6 institucionais. Se regredir, adicionar classes faltantes no wrapper do `raw-html-block`. |
| Operador esquece de rodar migração e tenta editar página legada no dashboard | média | **Decisão 10** — `LegacyMigrationBanner` na Fase 9.2/9.3 bloqueia o editor com instrução clara. |
| `Mongoose Mixed` exige `markModified` em mutações in-place | baixa | Premissa 10 + comentário JSDoc na Fase 3.1. Migração e router usam atribuição direta (safe). |
| SuperJSON serializa `Mixed` aninhado de forma inesperada | baixa | Premissa 11 + smoke test na Fase 6 (renderizar página migrada e comparar JSON do response no DevTools). |

## Arquivos que serão criados ou modificados

### Criados

| Fase | Arquivo |
|------|---------|
| 0.7 | `apps/web/modules/dashboard/ui/components/editorjs-plugins/_spike-hello.plugin.ts` (descartável) |
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
| 9.2 | `LegacyMigrationBanner` (componente local em `edit-custom-page-form.tsx` ou irmão) |
| 10.1 | `apps/web/scripts/migrate-pages-content.ts` |

### Modificados

| Fase | Arquivo | Mudança |
|------|---------|---------|
| 1.2 | `packages/types/src/index.ts` | `export * from "./page-blocks.js"` |
| 2.2 | `apps/web/modules/dashboard/schema/page.tsx` | `content` agora `pageOutputDataSchema` |
| 3.1 | `packages/database/src/models/Page.ts` | `content?: Record<string, any> \| string` + comentário JSDoc sobre `markModified` |
| 4.1 | `apps/web/trpc/routers/pagesRouter.ts` | importar `pageOutputDataSchema` |
| 6.2 | `apps/web/app/(main)/[slug]/page.tsx` | guarda `!content` + branching string vs OutputData (sem `prose`) |
| 7.7 | `apps/web/modules/dashboard/ui/components/editor-js/editor-js-plugins.d.ts` | shims se necessário |
| 9.1 | `apps/web/modules/dashboard/ui/components/create-custom-page-form.tsx` | `<EditorJSField>` |
| 9.2 | `apps/web/modules/dashboard/ui/components/edit-custom-page-form.tsx` | `<EditorJSField>` + guarda legado |
| 9.3 | `apps/web/modules/dashboard/ui/components/custom-page-form.tsx` | `<EditorJSField>` + guarda legado |
| 10.2 | `apps/web/package.json` | script `migrate:pages` |
| 11.2 | `apps/web/modules/pages/ui/components/page-content-renderer.tsx` | comentário TODO |

### Não-modificados (intencional)

- `apps/web/modules/dashboard/ui/components/rich-text-editor.tsx` — fica no projeto (auditoria de outros usos é fora de escopo).
- `apps/web/modules/dashboard/ui/components/editor-js/index.tsx` — wrapper do blog, não tocar.
- `apps/web/modules/blog/ui/components/blocks/*` — reusados pelo renderer de Pages, sem mudanças.
- `apps/web/modules/common/ui/components/footer.tsx` — query `getFooterPages` já retorna o que precisa.
- `apps/web/package.json` — não adicionar `@tailwindcss/typography` (Decisão 9, fora de escopo).

## Pontos abertos (pós-entrega)

- **Auditoria completa de TipTap**: outros usos no projeto e decisão de manter ou remover. Outra entrega.
- **Cache da rota `[slug]/page.tsx`**: avaliar `unstable_cache` ou tag-based revalidation com `updateTag` quando o admin salvar. Outra entrega.
- **Editor compartilhado entre Blog e Pages**: extrair `EditorJsWrapper` se virar dor. Outra entrega.
- **Sub-task 11.3**: remover `string` do schema Zod após confirmação prática da migração em prod.
