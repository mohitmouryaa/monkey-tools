# Run Page Blocks Phase

> **Como usar:** abra uma sessão nova do Claude Code dentro da worktree
> `feat/page-blocks` e cole este arquivo inteiro como prompt, **substituindo
> `<NUMERO_DA_FASE>` na primeira linha pela fase desejada** (ex: `0`, `1`, `5`).
> O agente vai trabalhar essa fase isoladamente. Cada fase é uma sessão sem
> contexto das anteriores — este prompt é autocontido.

---

## INPUT

**Fase a executar:** `<NUMERO_DA_FASE>`

---

## QUEM VOCÊ É NESTA SESSÃO

Você é o executor de **uma única fase** do plano
`.claude/plans/plan-page-blocks-editorjs-v2.md`. Você não tem memória das
fases anteriores e não vai começar a fase seguinte. Sua entrega é:

1. Implementar **somente** as tarefas da fase indicada acima.
2. Marcar checkboxes no plano à medida que cada tarefa é concluída.
3. Adicionar `✅` ao título da fase quando todas as tarefas estiverem feitas
   e os critérios de done validados.
4. Reportar ao usuário o que foi entregue e qual é a próxima fase.

---

## CONTEXTO DO PROJETO (autocontido)

### Onde você está

- **Repo:** `pdfs.com.br` — SaaS de processamento de PDFs/imagens.
- **Worktree:** `/home/vinicius/Jobs/durvalino/freelas/monkey-tool-page-blocks`
  (branch `feat/page-blocks` a partir de `dev-br`).
- **Servidor de dev:** já pode estar rodando em `http://localhost:3000`
  (`pnpm dev`). Não suba/derrube containers Docker sem comando explícito do
  usuário — Mongo/Redis/MinIO já estão de pé via `docker compose up -d`.

### Stack

- pnpm monorepo + TurboRepo
- Next.js 16 (App Router, Turbopack), React 19, Tailwind CSS 4
- tRPC v11 com SuperJSON, TanStack Query v5
- MongoDB + Mongoose 9 + Typegoose 13
- React Hook Form + Zod (Zod só em `apps/web`/`packages/database` — em
  `packages/types` o `zod` está apenas em devDependencies, **não usar Zod
  em runtime ali**)
- shadcn/ui (Radix), Biome 2.x (2 spaces, double quotes, 130 char line width)
- Editor.js 2.x já instalado em `apps/web` (usado pelo blog hoje)

### Convenções

- **Biome** lint/format: `pnpm lint` (check) / `pnpm format` (auto-fix).
- **Typecheck:** `pnpm --filter web typecheck` e
  `pnpm --filter worker typecheck`.
- **Imports:** organização manual (Biome import sort está OFF).
- **Não criar arquivos `.md` de planejamento/relatório/análise** salvo se a
  fase exigir explicitamente.
- **Sem emojis** em código. Apenas `✅` é permitido como marcação de fase
  concluída no plano.
- **Comentários:** só quando o "porquê" é não-óbvio. Não documentar o "o quê".
- **Não fazer** features extras, refactors laterais, abstrações prematuras
  ou backwards-compat de coisas que ninguém usa.

### Paths críticos

| O quê | Onde |
|---|---|
| Plano da fase | `.claude/plans/plan-page-blocks-editorjs-v2.md` |
| Page model (Typegoose) | `packages/database/src/models/Page.ts` |
| Tipos compartilhados | `packages/types/src/` |
| tRPC router de páginas | `apps/web/trpc/routers/pagesRouter.ts` |
| Rota pública dinâmica | `apps/web/app/(main)/[slug]/page.tsx` |
| Forms admin de Page | `apps/web/modules/dashboard/ui/components/{create-,edit-,}custom-page-form.tsx` |
| Schema Zod do form | `apps/web/modules/dashboard/schema/page.tsx` |
| Editor TipTap atual (a substituir) | `apps/web/modules/dashboard/ui/components/rich-text-editor.tsx` |
| Renderer Editor.js (referência blog) | `apps/web/modules/blog/ui/components/post-content-renderer.tsx` |
| Footer (consumidor) | `apps/web/modules/common/ui/components/footer.tsx` |

---

## O QUE FAZER (passo a passo)

### 1. Carregar o plano

Leia **na íntegra**:

- `.claude/plans/plan-page-blocks-editorjs-v2.md`

Esse plano é a fonte da verdade. Ele contém: premissas, decisões já tomadas,
fases numeradas, sub-tarefas com checkboxes, critérios de done por fase,
pontos abertos e diagramas de dependências entre fases.

### 2. Localizar a fase indicada

Encontre no plano a seção `## Fase <NUMERO_DA_FASE>` (ou variação textual
equivalente — pode ser `### Fase`, `Fase 0:`, etc).

- Se a fase já estiver com `✅` no título, **pare** e avise o usuário —
  ela já foi executada em outra sessão.
- Se a fase tiver pré-requisitos (fases anteriores) listados como
  dependência e essas dependências **não** estiverem com `✅`, **pare** e
  avise o usuário antes de qualquer alteração de código.

### 3. Confirmar entendimento

Antes de tocar em qualquer arquivo, escreva no chat (1 mensagem curta):

- A lista de **tarefas** desta fase (cada checkbox)
- Os **critérios de done** desta fase
- Os **arquivos** que você espera modificar/criar
- Quaisquer **ambiguidades reais** que você identifica

Se houver ambiguidade real (decisão de UI/arquitetura não respondida no
plano), **pergunte ao usuário** antes de prosseguir. Não invente premissa.

Caso o plano marque a fase como **"a explodir"**: **pare** e avise o usuário
que essa fase deve ser executada via `/explode-phase <N>` em sessão dedicada,
não por este prompt direto.

### 4. Implementar

Execute as tarefas na ordem listada no plano. Para cada tarefa:

1. Ler os arquivos relevantes antes de editar (use `Read`, não `cat`).
2. Fazer a alteração mínima que cumpre a tarefa.
3. Marcar o checkbox correspondente no plano (`- [ ]` → `- [x]`).
4. Não pular pra próxima tarefa antes de marcar.

**Limites:**

- Não toque em arquivos fora do escopo declarado da fase.
- Não inicie fases vizinhas, mesmo que pareça "trivial estender".
- Não comite. O usuário comita.

### 5. Validar

Antes de marcar a fase como `✅`, rode (paralelo quando possível):

```bash
pnpm --filter web typecheck
pnpm lint
```

Se a fase declara **smoke test** explícito nos critérios de done (ex: criar
doc no Mongo, abrir uma rota no browser), execute também.

**Se algum check falhar:**

- Corrija o root cause. Não use `--no-verify`, não silencie regras de lint.
- Se o erro for **pré-existente e não causado pela fase**, documente no
  relatório final mas siga.

### 6. Fechar a fase

Quando todas as tarefas estiverem `[x]` e os critérios de done satisfeitos:

- Edite o título da fase no plano adicionando `✅` ao final
  (ex: `## Fase 3: Schema Mongoose ✅`).
- Faça **uma** mensagem final ao usuário com:
  - O que foi entregue (1–3 bullets curtos)
  - Resultado dos checks (`typecheck`, `lint`, smoke se houve)
  - Qual é a **próxima fase** segundo o plano e se ela é `inline` ou
    `a explodir`
  - Avisos relevantes (ex: drift descoberto, premissa que não bateu, ponto
    aberto novo)

Não comece a próxima fase. Encerre a sessão.

---

## REGRAS DE FRONTEIRA

- **Worktree:** trabalhe sempre dentro de
  `/home/vinicius/Jobs/durvalino/freelas/monkey-tool-page-blocks`. Se o
  `cwd` estiver fora, pare e avise.
- **Outras worktrees** do mesmo repo (`monkey-tool/`, `monkey-tool-cms-blog/`)
  podem existir — não as edite.
- **`packages/types`** não pode ganhar import de `zod` em runtime (Zod está
  só em devDependencies lá). Tipos TS sim, schemas Zod ficam em `apps/web`.
- **Editor.js plugins** são classes vanilla TS (não componentes React no
  `render()`). Use o padrão "render = preview + botão; modal React separado"
  já decidido no plano (Decisão 5 / Fase 0.7).
- **Mongoose `Mixed`** exige `markModified('content')` em mutações in-place.
  Confirme isso quando tocar persistência (Premissa 10 do plano).
- **Drift conhecido:** `@tailwindcss/typography` **não** está instalado no
  projeto — `prose` está sem efeito. Não dependa de `prose` em código novo;
  use utilitárias Tailwind explícitas (padrão do `post-content-renderer.tsx`).

---

## SE ALGO NÃO BATER

Você vai encontrar no caminho situações que o plano não previu:
incompatibilidades de versão, API que mudou, premissa errada, arquivo que
sumiu. Quando isso acontecer:

1. **Pare** antes de aplicar workaround.
2. Compare o achado com a seção "Premissas" e "Pontos Abertos" do plano.
3. Se for premissa quebrada e o impacto for ≥ 1 fase: avise o usuário e
   peça orientação.
4. Se for ajuste local sem impacto em outras fases: registre o ajuste no
   relatório final e siga.

Não invente decisões arquiteturais para destravar a fase. Quando em dúvida,
pergunte.

---

## CHECKLIST FINAL ANTES DE ENCERRAR

- [ ] Todas as tarefas da fase estão `[x]` no plano
- [ ] Critérios de done declarados na fase foram cumpridos
- [ ] `pnpm --filter web typecheck` passa (ou falha pré-existente
  documentada)
- [ ] `pnpm lint` passa (ou falha pré-existente documentada)
- [ ] Smoke test rodado se a fase exigia
- [ ] Título da fase com `✅`
- [ ] Mensagem final ao usuário enviada (entrega + próxima fase)
- [ ] Nada commitado por você
