---
phase: 5
plan_file: plan-page-blocks-editorjs-v2.md
exploded_at: 2026-04-29
---

# Fase 5 — Componentes renderer SSR para blocos custom

## Objetivo

Ter um componente React server-side por tipo de bloco rico, prontos para o registry da Fase 6.1.

## Critério de conclusão

`import { HeroBlock } from "@/modules/pages/ui/components/blocks/hero-block"` etc. funciona, cada componente recebe `data: <DataShape>` e renderiza HTML estilizado.

**Smoke test:** uma rota dev `/test-blocks` que renderiza um sample de cada bloco com dados mock passa sem erro de console no navegador.

## Reuso identificado

### Reutilizado (já existe, NAO recrie)

- Tipos `HeroBlockData`, `StepsBlockData`, `CardsBlockData`, `FaqBlockData`, `CtaBlockData`, `RawHtmlBlockData`, `StepsBlockItem`, `CardsBlockItem`, `FaqBlockItem` em `packages/types/src/page-blocks.ts` (Fase 1 ja entregue).
- `DynamicIcon` + `IconName` de `lucide-react/dynamic` (padrao usado em `apps/web/modules/hero/ui/components/how-it-works.tsx:4`).
- `Accordion`, `AccordionItem`, `AccordionTrigger`, `AccordionContent` de `@workspace/ui/components/accordion` (`packages/ui/src/components/accordion.tsx`).
- Padrao visual do hero em `apps/web/modules/hero/ui/components/new-hero-section.tsx` (badge + heading + descricao).
- Padrao visual do steps em `apps/web/modules/hero/ui/components/how-it-works.tsx` (linha conectora + circulos + DynamicIcon + fallback Upload).
- Padrao visual do CTA em `apps/web/modules/blog/ui/views/post-view.tsx:218-243` (gradient `from-primary via-primary to-primary/80`, blobs blur, botao `<a>` rounded-full).
- Classes utilitarias arbitrarias para HTML cru em `apps/web/modules/blog/ui/components/post-content-renderer.tsx:23-32` (`[&_a]:text-primary`, `[&_strong]:font-semibold`, `[&_code]:rounded`, `[&_mark]:bg-amber-200/40`, etc.).
- `lucide-react` icons (`Zap`, `ArrowRight`, `Upload`).

### Criado nesta fase

- `<HeroBlock>` em `apps/web/modules/pages/ui/components/blocks/hero-block.tsx` (task 5.1)
- `<StepsBlock>` em `apps/web/modules/pages/ui/components/blocks/steps-block.tsx` (task 5.2)
- `<CardsBlock>` em `apps/web/modules/pages/ui/components/blocks/cards-block.tsx` (task 5.3)
- `<FaqBlock>` em `apps/web/modules/pages/ui/components/blocks/faq-block.tsx` (task 5.4)
- `<CtaBlock>` em `apps/web/modules/pages/ui/components/blocks/cta-block.tsx` (task 5.5)
- `<RawHtmlBlock>` em `apps/web/modules/pages/ui/components/blocks/raw-html-block.tsx` (task 5.6)
- Rota dev `/test-blocks` em `apps/web/app/test-blocks/page.tsx` (task 5.7, **descartavel apos validar smoke**)

### Extraido de codigo existente

Nada. Toda copia de visual eh para um diretorio novo (`modules/pages/ui/components/blocks/`); nao mexemos nos originais.

## Micro-tarefas (arquivos desta pasta)

| ID  | Tipo   | depends_on                                | Arquivo                                  |
|-----|--------|-------------------------------------------|------------------------------------------|
| 5.1 | criar  | —                                         | `5.1-criar-hero-block.md`                |
| 5.2 | criar  | —                                         | `5.2-criar-steps-block.md`               |
| 5.3 | criar  | —                                         | `5.3-criar-cards-block.md`               |
| 5.4 | criar  | —                                         | `5.4-criar-faq-block.md`                 |
| 5.5 | criar  | —                                         | `5.5-criar-cta-block.md`                 |
| 5.6 | criar  | —                                         | `5.6-criar-raw-html-block.md`            |
| 5.7 | criar  | 5.1, 5.2, 5.3, 5.4, 5.5, 5.6              | `5.7-criar-rota-test-blocks.md`          |

## Ondas de execucao paralela

- **Onda 1** (sem deps): 5.1, 5.2, 5.3, 5.4, 5.5, 5.6 — **6 em paralelo**
- **Onda 2** (apos onda 1): 5.7

Regra: dentro de cada onda, tasks podem rodar em paralelo via subagentes. Entre ondas, aguardar todas concluirem.

> **Nota de consistencia.** Esta lista eh **derivada** dos `depends_on` declarados nos arquivos de task — serve como conveniencia para leitura humana. Em caso de divergencia (task editada sem atualizar este index), **o grafo dos arquivos individuais eh a fonte da verdade**. O executor deve recalcular ondas a partir dos `depends_on` de cada arquivo, nao confiar cegamente no texto acima.

## Decisoes

**P1** — Layout do `<HeroBlock>` (5.1): badge opcional + heading + descricao opcional + ate 2 CTAs lado-a-lado (sem imagem/media).
→ Resposta: A (default).
→ Impacto: estrutura `section > container > badge inline-flex + h1 + p + div.flex CTAs`. Sem `<img>`, sem ilustracao. Botoes secundarios so renderizam quando `secondaryButtonText && secondaryButtonLink` truthy.

**P2** — Icone do badge no `<HeroBlock>` (5.1): fixo `Zap` lucide.
→ Resposta: A (default).
→ Impacto: import direto `import { Zap } from "lucide-react"`. Sem icone configuravel por dado (mantem simplicidade — diferente do `<StepsBlock>`).

**P3** — Layout do `<StepsBlock>` (5.2): copia do `how-it-works.tsx` sem trustBadges.
→ Resposta: A (default).
→ Impacto: secao com `bg-muted/70`, titulo+subtitulo opcionais, grid 3 colunas com linha conectora (`md:absolute top-12 ...`), circulos com `bg-primary` + DynamicIcon. Sem o bloco final de trust badges (`Shield/Zap/Lock/FileText` quad).

**P4** — Fallback de icone no `<StepsBlock>` (5.2): `Upload` se DynamicIcon nao resolver.
→ Resposta: A (default).
→ Impacto: `<DynamicIcon name={iconName as IconName} fallback={() => <Upload ... />} />` — espelho exato do how-it-works:72-76.

**P5** — Grid responsivo no `<CardsBlock>` (5.3): 1/2/3 colunas.
→ Resposta: A (default).
→ Impacto: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`.

**P6** — Estilo do card no `<CardsBlock>` (5.3): card de padding `p-6`, `rounded-xl`, `border`, `bg-card`. Icone em quadrado `bg-primary/10 text-primary` quando `iconName` truthy.
→ Resposta: A (default).
→ Impacto: `div className="rounded-xl border bg-card p-6"`. Icone em `<div className="mb-4 flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">`.

**P7** — Link no `<CardsBlock>` (5.3): renderizar `<a>` com `ArrowRight` quando `linkLabel && linkHref`.
→ Resposta: A (default).
→ Impacto: footer do card eh `<a href={linkHref} className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">{linkLabel} <ArrowRight className="h-4 w-4" /></a>`. Sem botao shadcn.

**P8** — Componente do `<FaqBlock>` (5.4): `<Accordion type="single" collapsible>`.
→ Resposta: A (default).
→ Impacto: import de `@workspace/ui/components/accordion`. Cada item: `<AccordionItem value={`faq-${idx}`}><AccordionTrigger>{question}</AccordionTrigger><AccordionContent>{answer html}</AccordionContent></AccordionItem>`.

**P9** — Render de `answer` no `<FaqBlock>` (5.4): `dangerouslySetInnerHTML` com classes arbitrarias.
→ Resposta: A (default).
→ Impacto: `<div className="[&_a]:text-primary [&_a]:underline [&_strong]:font-semibold" dangerouslySetInnerHTML={{ __html: answer }} />`. Comentario `biome-ignore lint/security/noDangerouslySetInnerHtml`.

**P10** — Visual do `<CtaBlock>` (5.5): copia exata de `post-view.tsx:218-243`.
→ Resposta: A (default).
→ Impacto: `section.relative.overflow-hidden.rounded-3xl.bg-gradient-to-br.from-primary.via-primary.to-primary/80` + 2 blobs blur + heading `text-primary-foreground` + descricao `text-primary-foreground/90` + botao `<a>`.

**P11** — Botao no `<CtaBlock>` (5.5): `<a>` rounded-full com `ArrowRight`.
→ Resposta: A (default).
→ Impacto: `<a href={buttonLink} className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary-foreground text-primary text-sm md:text-base font-semibold shadow-lg shadow-primary-foreground/20 transition-transform hover:scale-105">{buttonText} <ArrowRight className="h-4 w-4" /></a>`. Sem `<Button>` shadcn.

**P12** — Wrapper do `<RawHtmlBlock>` (5.6): div com classes arbitrarias do post-content-renderer.
→ Resposta: A (default).
→ Impacto: copia das classes em `post-content-renderer.tsx:23-32` mais `[&_h1]`, `[&_h2]`, `[&_p]`, `[&_ul]`, `[&_ol]`, `[&_blockquote]` para cobrir HTML legado do TipTap. Lista completa documentada na task 5.6.

**P13** — Smoke test: rota descartavel `/test-blocks`.
→ Resposta: A (default).
→ Impacto: `apps/web/app/test-blocks/page.tsx` server component que importa todos os 6 blocos com dados mock e renderiza um abaixo do outro. Marcar com `// TODO(post-fase-5): deletar apos confirmar visual.`

**P14** — Server vs client components nos 6 blocos.
→ Resposta: A (default).
→ Impacto: todos sao server components puros (sem `"use client"`). Acordeao do FAQ delega o `"use client"` para o componente shadcn (`accordion.tsx` ja tem). Ainda que `how-it-works.tsx` original tenha `"use client"` — replicar o conteudo num server component eh seguro porque nao usa hooks. Mantem RSC ate o limite (Accordion).
