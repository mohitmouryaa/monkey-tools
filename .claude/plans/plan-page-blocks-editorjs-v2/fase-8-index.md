---
phase: 8
plan_file: plan-page-blocks-editorjs-v2.md
exploded_at: 2026-04-29
---

# Fase 8 — Componente `<EditorJSField>` reutilizável

## Objetivo

Wrapper React que monta o Editor.js com tools nativas + os 6 plugins custom da Fase 7 + bridge de modais RHF/Zod. Substitui `<RichTextEditor>` no form de Page (consumido na Fase 9) sem regredir UX.

## Critério de conclusão

`<EditorJSField value={...} onChange={...} />`:

- aceita `value: OutputData | undefined` e dispara `onChange(data: OutputData)` a cada mudança no editor;
- registra como tools: nativas (`header`, `paragraph` implícito, `list`, `quote`, `embed`, `table`, `checklist`, `image`) + customs (`hero`, `steps`, `cards`, `faq`, `cta`, `raw-html`);
- ao clicar "Editar" num bloco custom, abre `<Dialog>` com form RHF + Zod resolver específico do tipo; ao salvar, persiste no plugin via callback `onSave`;
- fecha o modal sem perder estado do editor;
- `pnpm --filter web typecheck` passa; `pnpm lint` no diretório passa (drift pré-existente em `modules/blog/*`, `modules/tools/*`, `scripts/i18n-audit.ts` é tolerado).

## Reuso identificado

### Reutilizado (já existe, NÃO recrie)

- Padrão de mount Editor.js (holder único `useState(() => Math.random()...)`, init adiado `setTimeout(0)`, cleanup `clearTimeout`, destroy assíncrono) — `apps/web/modules/dashboard/ui/components/editor-js/index.tsx:55-128`. Replicar o padrão **idêntico**.
- Normalização de `list` v1 → v2 — `editor-js/index.tsx:25-53`. Replicar `normalizeEditorData` no novo arquivo (ou importar — ver task 8.1i).
- Hook `usePostFileUpload` — `apps/web/modules/dashboard/hooks/use-post-file-upload.tsx`. Bloco `image` reutiliza idêntico ao do blog.
- Casts `BlockToolConstructable` — `editor-js/index.tsx:81-101`. Replicar para os customs.
- 6 plugins custom já entregues — `apps/web/modules/dashboard/ui/components/editorjs-plugins/{hero,steps,cards,faq,cta,raw-html}.plugin.ts`. **Não tocar.**
- Schemas Zod — `apps/web/modules/dashboard/schema/page-blocks.ts` (`heroBlockDataSchema`, `stepsBlockDataSchema`, `cardsBlockDataSchema`, `faqBlockDataSchema`, `ctaBlockDataSchema`, `rawHtmlBlockDataSchema`).
- Tipos de `data` — `@workspace/types` (`HeroBlockData`, `StepsBlockData`, `CardsBlockData`, `FaqBlockData`, `CtaBlockData`, `RawHtmlBlockData` + items).
- Padrão `useFieldArray` para listas (steps/cards/faq) — `how-it-works-builder.tsx:8-30`. Espelho exato.
- `IconPicker` — `apps/web/modules/dashboard/ui/components/icon-picker.tsx`. Usado em `steps`/`cards` modal forms.
- shadcn `Dialog`, `Form`, `Input`, `Textarea`, `Button`, `Card`, `Label` — `@workspace/ui/components/*`.
- ToolEmbed plugin + `fetchTools` config — replicar do `editor-js/index.tsx:99-106` (mesmo formato `queryClient.fetchQuery(trpc.tools.getMany.queryOptions(...))`).
- Shims TS para `@editorjs/embed`, `@editorjs/checklist` — `editor-js/editor-js-plugins.d.ts`. **Já existe e cobre os dois.** Nenhum shim novo necessário (plugins customs são `.ts` próprios sem deps externas sem types).

### Criado nesta fase

- `apps/web/modules/dashboard/ui/components/editor-js-field/types.ts` — tipos locais de `EditingBlock`, props comuns dos modais. (task 8.1a)
- `apps/web/modules/dashboard/ui/components/editor-js-field/hero-form-modal.tsx` — form RHF/Zod para `HeroBlockData`. (task 8.1b)
- `apps/web/modules/dashboard/ui/components/editor-js-field/steps-form-modal.tsx` — form com `useFieldArray` em `steps`. (task 8.1c)
- `apps/web/modules/dashboard/ui/components/editor-js-field/cards-form-modal.tsx` — form com `useFieldArray` em `cards`. (task 8.1d)
- `apps/web/modules/dashboard/ui/components/editor-js-field/faq-form-modal.tsx` — form com `useFieldArray` em `items`. (task 8.1e)
- `apps/web/modules/dashboard/ui/components/editor-js-field/cta-form-modal.tsx` — form RHF/Zod para `CtaBlockData`. (task 8.1f)
- `apps/web/modules/dashboard/ui/components/editor-js-field/raw-html-form-modal.tsx` — form com `<Textarea>` font-mono. (task 8.1g)
- `apps/web/modules/dashboard/ui/components/editor-js-field/block-edit-dialog.tsx` — `<Dialog>` dispatcher controlado por `editingBlock`; renderiza condicionalmente o modal-form correto. (task 8.1h)
- `apps/web/modules/dashboard/ui/components/editor-js-field/index.tsx` — `EditorJSField` (`"use client"`); mount EditorJS + registry de tools + state `editingBlock` + `openEditor` callback + monta `<BlockEditDialog>`. Default export. (task 8.1i)

### Extraído de código existente

- Nada. **Não** extrair `normalizeEditorData`/`normalizeListItems` do `editor-js/index.tsx` para util compartilhado nesta fase — escopo do plano só toca Page; extração tocaria também o Blog (fora do escopo). Replicar in-line no `editor-js-field/index.tsx` é a opção pragmática (decisão P5 do explode da Fase 7 já estabeleceu que helper compartilhado fica fora). Anotar `// TODO(post-fase-11): extrair normalize* para util compartilhado se Blog/Pages divergirem`.

## Micro-tarefas (arquivos desta pasta)

| ID    | Tipo   | depends_on                                         | Arquivo                                          |
|-------|--------|----------------------------------------------------|--------------------------------------------------|
| 8.1a  | criar  | —                                                  | `8.1a-criar-types-locais.md`                     |
| 8.1b  | criar  | 8.1a                                               | `8.1b-criar-hero-form-modal.md`                  |
| 8.1c  | criar  | 8.1a                                               | `8.1c-criar-steps-form-modal.md`                 |
| 8.1d  | criar  | 8.1a                                               | `8.1d-criar-cards-form-modal.md`                 |
| 8.1e  | criar  | 8.1a                                               | `8.1e-criar-faq-form-modal.md`                   |
| 8.1f  | criar  | 8.1a                                               | `8.1f-criar-cta-form-modal.md`                   |
| 8.1g  | criar  | 8.1a                                               | `8.1g-criar-raw-html-form-modal.md`              |
| 8.1h  | criar  | 8.1a, 8.1b, 8.1c, 8.1d, 8.1e, 8.1f, 8.1g          | `8.1h-criar-block-edit-dialog.md`                |
| 8.1i  | criar  | 8.1a, 8.1h                                         | `8.1i-criar-editor-js-field.md`                  |

## Ondas de execução paralela

- **Onda 1** (sem deps): 8.1a — **1 task**
- **Onda 2** (após 8.1a): 8.1b, 8.1c, 8.1d, 8.1e, 8.1f, 8.1g — **6 em paralelo**
- **Onda 3** (após onda 2): 8.1h — **1**
- **Onda 4** (após 8.1h): 8.1i — **1**

> **Nota de consistência.** Esta lista é **derivada** dos `depends_on` declarados nos arquivos de task — serve como conveniência para leitura humana. Em caso de divergência (task editada sem atualizar este index), **o grafo dos arquivos individuais é a fonte da verdade**. O executor deve recalcular ondas a partir dos `depends_on` de cada arquivo, não confiar cegamente no texto acima.

## Decisões

**P1** — Estrutura de modais: 1 dialog único com switch interno, **6 arquivos de form-modal + 1 dispatcher**, ou tudo inline?
→ Resposta: B (6 form-modals + 1 dispatcher).
→ Impacto: cada form fica em arquivo próprio (`<tipo>-form-modal.tsx`), com sua RHF + Zod resolver. `block-edit-dialog.tsx` é um `<Dialog>` controlado que escolhe qual form-modal renderizar via `switch (editingBlock.type)`. Mantém arquivos pequenos e paralelizáveis (cada modal é uma task da onda 2). Reutiliza estética idêntica do shadcn `Dialog`. **Tasks 8.1b–g + 8.1h refletem essa escolha.**

**P2** — Onde mora o estado `editingBlock` + callback `openEditor`?
→ Resposta: A (inside `EditorJSField` via `useState` + `useCallback`).
→ Impacto: sem hook extraído. `editingBlock` é `null | { type: PageBlockType; data: T; onSave: (next: T) => void }`. `openEditor` é referência **estável via `useRef`** para que possa ser passada no `tools[*].config.openEditor` durante o init do Editor.js sem reinicializar quando o estado muda. Documentar inline.

**P3** — Visibilidade do plugin `raw-html` na toolbox do Editor.js.
→ Resposta: A (visível na toolbox, consistente com os outros 5 customs).
→ Impacto: simplifica registro — todos os 6 customs entram da mesma forma no `tools` config. **Difere do que o plano original sugeriu** (Decisão 7 do plano fala em "não exposto na toolbox por padrão"), mas o explode da Fase 7 já registrou que a toolbox fica visível e que a regra "não-exposto" é responsabilidade do **conteúdo migrado** (apenas blocos `raw-html` que vêm da migração 10.1 aparecem na renderização). Não bloquear o operador de inserir manualmente é a escolha mais simples e não tem efeito colateral observável (a Fase 9 não cria HTML legado novo). Anotar `// NOTE: raw-html visível na toolbox; criação manual permitida pra debugging.`

**P4** — Contrato de `value`/`onChange` do `EditorJSField`.
→ Resposta: A (`value: OutputData | undefined`, default interno `{ blocks: [] }`; `onChange: (data: OutputData) => void` obrigatório).
→ Impacto: assinatura `interface EditorJSFieldProps { value?: OutputData; onChange: (data: OutputData) => void; }`. Internamente, normaliza com `normalizeEditorData(value ?? { blocks: [] })`. Holder ID gerado internamente (`useState(() => Math.random()...)`). Compatível com `field.value`/`field.onChange` do React Hook Form sem wrapper. **Não aceita `string`** — Decisão 10 do plano garante que form de edit já bloqueou conteúdo legado antes de renderizar este componente. Se vier `string` por engano, `normalizeEditorData` cai no fallback `{ blocks: [] }` e o valor não é destruído (apenas perdido visualmente, mas como Decisão 10 já bloqueou, esse caminho é defensivo).

## Arquivos NÃO tocados (fora de escopo)

- `apps/web/modules/dashboard/ui/components/editor-js/index.tsx` — wrapper do blog, **não tocar** (Premissa do plano: blog e pages não compartilham editor nesta entrega).
- Plugins custom em `editorjs-plugins/{hero,steps,cards,faq,cta,raw-html}.plugin.ts` — **já entregues na Fase 7, não modificar**.
- `apps/web/modules/dashboard/ui/components/{create-,edit-,}custom-page-form.tsx` — **Fase 9**, não tocar aqui.
- `apps/web/modules/dashboard/schema/page-blocks.ts` — schemas já existem, importar, não modificar.
- `editor-js-plugins.d.ts` — shims já cobrem `@editorjs/embed` e `@editorjs/checklist`. Nenhum shim novo necessário.

## Smoke test pós-Fase 8 (manual, antes da Fase 9)

A Fase 8 não tem rota dev própria — o smoke real só vem na Fase 9 quando `EditorJSField` é integrado num form. **Mas** para reduzir risco de descobrir bugs só na 9, o executor da 8.1i pode (opcional, não obrigatório) reabilitar temporariamente a rota de spike `/dashboard/spike-editorjs` substituindo o spike pelo `EditorJSField` real e verificando que:

1. todos os 6 customs aparecem no menu `+`;
2. inserir cada um → preview compacto + botão "Editar" aparece;
3. clicar Editar → modal abre com form RHF;
4. preencher + salvar → preview atualiza com valor novo;
5. salvar editor (`editor.save()`) → `OutputData` correto.

**Reverter** a rota de spike para o estado original ao terminar (ou deletar de vez). Isto NÃO conta como completar a Fase 8 — a fase termina quando typecheck/lint passam e o componente compila.
