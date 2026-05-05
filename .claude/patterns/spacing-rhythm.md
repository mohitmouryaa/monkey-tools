# Pattern — Ritmo vertical das páginas públicas

Escala única e semântica para padding/gap em todas as páginas públicas do site (`/`, `/ferramentas`, `/ferramentas/[cat]`, `/ferramentas/[cat]/[tool]`, `/blog`, `/blog/[slug]`, `/[slug]`).

Objetivo: eliminar o "cada página inventa o próprio espaçamento" e dar coerência visual + ritmo de leitura previsível.

---

## Tokens

| Token | Tailwind | Valor (mob/desk) | Quando usar |
|---|---|---|---|
| **page-y** | `py-12 md:py-16` | 48 / 64px | Padding vertical do `<main>` ou container principal de **toda** página pública |
| **header-gap** | `mb-8 md:mb-10` | 32 / 40px | Entre o header da página (h1 + descrição) e o primeiro bloco abaixo |
| **heading-gap** | `mb-6` | 24px | Entre `h2` de uma seção e o conteúdo dela |
| **section-gap** | `space-y-12 md:space-y-16` | 48 / 64px | Entre seções dentro de **um mesmo fluxo mental** (apenas em páginas multi-seção) |
| **flow-break** | `mt-24 md:mt-32` | 96 / 128px | Entre **fluxos mentais distintos** do usuário (ex: ferramenta → educacional → confiança) |
| **hero-y** | `py-20 md:py-28` | 80 / 112px | Hero da home (apenas um por site) |

Regra mental — duas seções com cards (`p-6/p-8` interno) precisam de pelo menos 48px externo (`section-gap`) para o ritmo não colapsar.

---

## Quais tokens cada página consome

| Página | page-y | header-gap | section-gap | flow-break | hero-y |
|---|---|---|---|---|---|
| `/` (home) | — (hero próprio) | — | uso parcial | — | ✅ |
| `/ferramentas` | ✅ | ✅ | — | — | — |
| `/ferramentas/[cat]` | ✅ | ✅ | — | — | — |
| `/ferramentas/[cat]/[tool]` | ✅ | — | ✅ | ✅ | — |
| `/blog` | ✅ | ✅ | parcial | — | — |
| `/blog/[slug]` | ✅ | ✅ | — | — | — |
| `/[slug]` (custom) | ✅ | ✅ | — | — | — |

Páginas de listagem (single-flow) usam só `page-y` + `header-gap`. Páginas de conteúdo multi-seção usam todos. Isso **é o sistema funcionando** — não é falha.

---

## Identificando "fluxos mentais" (`flow-break`)

Usar `flow-break` (não `section-gap`) quando a próxima seção corresponde a uma **mudança de intenção do usuário**.

Exemplo na página de ferramenta (`/ferramentas/[cat]/[tool]`):

1. **Fluxo "a ferramenta"** — Hero, Ad top, Tool card (upload + processamento) → o usuário está executando a tarefa
2. **Fluxo "educacional"** — Como funciona, Para quem é, Benefícios, SEO content, Aprenda mais → o usuário entendeu como usar e agora absorve contexto/SEO
3. **Fluxo "confiança / fechamento"** — FAQs, Closing text, Related tools → o usuário valida confiança ou explora o que vem a seguir

Entre cada fluxo: `flow-break`. Dentro de cada fluxo: `section-gap`.

Sinal de que duas seções pertencem ao **mesmo** fluxo: o usuário lê uma logo depois da outra sem mudar de "modo mental".

---

## Aplicação canônica

### Página de listagem (single-flow)

```tsx
<main className="container flex-1 px-4 py-12 md:py-16 mx-auto">
  <div className="mb-8 md:mb-10 text-center">
    <h1>...</h1>
    <p>...</p>
  </div>

  <Tabs>...</Tabs>
  <Grid>...</Grid>
</main>
```

### Página de conteúdo multi-flow (ex: tool page)

```tsx
<div className="container mx-auto max-w-4xl px-4 py-12 md:py-16">
  {/* Fluxo 1 — A ferramenta em si */}
  <div className="space-y-12 md:space-y-16">
    <ToolHeader />
    <AdPlaceholder position="top" />
    <section> {/* Tool card */} </section>
  </div>

  {/* Fluxo 2 — Educacional */}
  <div className="mt-24 md:mt-32 space-y-12 md:space-y-16">
    <section> {/* Como funciona */} </section>
    <ToolAudienceBenefits />
    {richContent && <section> {/* SEO content */} </section>}
    {featuredPost && <section> {/* Aprenda mais */} </section>}
  </div>

  {/* Fluxo 3 — Confiança / fechamento */}
  <div className="mt-24 md:mt-32 space-y-12 md:space-y-16">
    <section> {/* FAQs */} </section>
    <section> {/* Closing text */} </section>
    <RelatedTools />
  </div>

  <div className="mt-12 md:mt-16">
    <AdPlaceholder position="bottom" />
  </div>
</div>
```

---

## Estado atual (2026-04-29)

✅ Já aplicado:
- `apps/web/modules/tools/ui/views/tool-view.tsx` — todos os tokens, três fluxos identificados
- `apps/web/modules/tools/ui/views/all-tools-view.tsx` — todos os tokens, três fluxos (achar / conhecer / dúvidas)
- `apps/web/modules/tools/ui/views/category-view.tsx` — todos os tokens, quatro fluxos (achar / aprender / dúvidas / explorar)
- `apps/web/modules/hero/ui/components/new-tools-grid.tsx` — `pb-16 md:pb-20`; filter `mb-8 md:mb-10`
- `apps/web/modules/hero/ui/components/how-it-works.tsx` — `pt-16 md:pt-20 pb-16 md:pb-20`; header→steps e steps→trust `mb-12 md:mb-16`
- `apps/web/modules/hero/ui/components/new-hero-section.tsx` — `hero-y` (`py-20 md:py-28`)

⏳ Pendente:
- `apps/web/app/(main)/blog/page.tsx` — header `mb-10` → `mb-8 md:mb-10`; container `py-12` → `py-12 md:py-16`
- `apps/web/app/(main)/blog/[slug]/page.tsx` — mesma normalização do blog list; footer `pt-10 mt-12` → `mt-12 md:mt-16 pt-12`
- `apps/web/app/(main)/[slug]/page.tsx` — `py-12` → `py-12 md:py-16`; título `mb-8` → `mb-8 md:mb-10`

---

## Recomendação de longo prazo

Quando esses tokens estiverem aplicados em todas as páginas e provarem-se estáveis, extrair para um constants em `apps/web/modules/common/constants` ou `packages/ui/lib/spacing.ts`:

```ts
export const SPACING = {
  pageY: "py-12 md:py-16",
  headerGap: "mb-8 md:mb-10",
  headingGap: "mb-6",
  sectionGap: "space-y-12 md:space-y-16",
  flowBreak: "mt-24 md:mt-32",
  heroY: "py-20 md:py-28",
} as const;
```

Assim toda página nova já nasce no ritmo certo, e qualquer ajuste futuro acontece num lugar só.
