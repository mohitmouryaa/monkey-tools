# Plano — Importar layout do `felipelayoun/pdf-simples`

**Worktree**: `.claude/worktrees/import-pdf-simples-layout` (branch `worktree-import-pdf-simples-layout`, base `dev-br`)
**Repo de referência**: `https://github.com/felipelayoun/pdf-simples` (clonado em `/tmp/pdf-simples-ref`)
**Escopo**: trazer **cores, design e estilos**. **Lógica permanece a do monkey-tool** (tRPC, BullMQ, MongoDB, rotas Next.js, tools dinâmicas, etc.).

---

## 1. Diagnóstico

### Atual (monkey-tool)
- Next.js 16 App Router + Tailwind 4 (com `@theme inline`)
- `globals.css` único em `packages/ui/src/styles/globals.css`
- Tema **DARK**: bg `222 47% 7%`, primary `243 100% 68%` (roxo), secondary `162 100% 45%` (verde neon), radius `1rem`
- Fontes: **DM Sans** (já configurado em `apps/web/app/layout.tsx`) + Fredoka como variable
- Utilitários customizados em uso: `.btn-gradient-primary`, `.btn-gradient-secondary`, `.card-glow` (em `header.tsx`, `tool-card.tsx`, `new-hero-section.tsx`)
- Tokens de categoria semânticos: `--category-pdf|image|text|converter`
- Tokens de logo: `--logo-primary|secondary`

### Referência (pdf-simples)
- Vite + React Router + Tailwind 3 (config tradicional)
- Tema **LIGHT**: bg branco, primary `4 85% 55%` (vermelho-coral), secondary cinza claro `220 14% 96%`, radius `0.75rem`
- Fonte: **DM Sans** + headings com `tracking-tight`
- Tokens por ferramenta: `--tool-pdf-word|juntar|comprimir|dividir|assinar`
- Componentes globais: `.tool-card` (rounded-2xl + hover -translate-y-1), `.upload-zone` (com modifier `.dragging`)
- Header sticky minimalista, footer compacto, hero centralizado, cards com ícone em quadrado colorido pastel forte

---

## 2. Decisão tomada

**Caminho C** — manter o tema **DARK** atual e reaplicar a **paleta vermelho-coral** do pdf-simples por cima. Sem migração para light. O `.dark` do projeto continua sendo o tema canônico; o `:root` espelha o `.dark` (como já está hoje).

---

## 3. Fases de execução

### Fase 1 — Tokens (paleta dark + coral)
**Arquivo**: `packages/ui/src/styles/globals.css`

Recolorir os tokens em ambos `:root` e `.dark` (mantendo background escuro):

- `--primary: 4 85% 55%` (coral) — substitui o roxo `243 100% 68%`
- `--primary-foreground: 0 0% 100%`
- `--ring: 4 85% 55%`
- `--secondary: 14 90% 55%` (laranja-coral, como par do primary; substitui o verde neon)
- `--secondary-foreground: 0 0% 100%`
- `--accent: 14 90% 55%` (acompanha secondary)
- `--accent-foreground: 0 0% 100%`
- `--background`, `--card`, `--popover`, `--muted`, `--border`, `--input`: manter valores dark atuais
- `--radius: 0.75rem` (era `1rem`)
- `--logo-primary: 4 85% 55%`, `--logo-secondary: 14 90% 55%`
- Remapear tokens de categoria para refletir a paleta do ref (em hue dark-friendly):
  - `--category-pdf: 4 85% 60%` (coral) — antes era vermelho `0 85% 60%`
  - `--category-image: 145 65% 55%` (verde) — antes neon `162 100% 45%`
  - `--category-text: 210 80% 65%` (azul) — antes roxo `243 100% 68%`
  - `--category-converter: 35 95% 60%` (âmbar) — antes `45 100% 55%`
- Adicionar tokens novos para a paleta `--tool-*` do ref (úteis para componentes futuros e gradientes):
  - `--tool-pdf-word: 210 80% 55%`
  - `--tool-juntar: 145 65% 50%`
  - `--tool-comprimir: 35 95% 55%`
  - `--tool-dividir: 265 70% 60%`
  - `--tool-assinar: 340 75% 55%`
- Atualizar bloco `@theme inline` com:
  - novos `--color-tool-*`
  - `--radius` propagado
  - sidebar tokens em hue alinhado ao novo primary

### Fase 2 — Utilitários globais
Mesmo arquivo `globals.css` (`@layer components` / fora):

- Reescrever `.btn-gradient-primary` para gradiente coral: `linear-gradient(135deg, hsl(4 85% 55%) 0%, hsl(14 90% 55%) 100%)`.
- Reescrever `.btn-gradient-secondary` como gradiente análogo (variantes do mesmo coral) para os usos atuais não quebrarem.
- Atualizar `.card-glow` para `box-shadow: 0 0 30px -5px hsl(4 85% 55% / 0.4)`.
- Adicionar `.tool-card` (usando tokens dark): `rounded-2xl p-6 transition-all duration-200 cursor-pointer border-2 border-transparent` + hover `shadow-lg -translate-y-1`.
- Adicionar `.upload-zone` (drop zone do ref): `border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-200 cursor-pointer border-muted-foreground/25 hover:border-primary/50 hover:bg-primary/5` + modifier `.dragging`.
- `@layer base`: adicionar `tracking-tight` em `h1..h6`.

### Fase 3 — Tipografia
- Adicionar `weight: ["400","500","600","700"]` ao `DM_Sans()` em `apps/web/app/layout.tsx`.

### Fase 4 — Componentes públicos
- `modules/common/ui/components/header.tsx`: ajustes de espaçamento/inspiração no ref. Mantém categorias dinâmicas + CTA. `btn-gradient-secondary` segue funcionando porque foi redefinido.
- `modules/common/ui/components/footer.tsx`: validar tokens; sem mudança estrutural.
- `modules/hero/ui/components/new-hero-section.tsx`: manter blurs decorativos (combinam com dark), só revisar cores; CTA principal vira coral via gradient.
- `modules/hero/ui/components/new-tools-grid.tsx`: alinhar grid (2/3/5 cols) e espaçamento ao ref.
- `modules/common/ui/components/tool-card.tsx`:
  - Remover hex hardcoded (`#635BFF`, `#00E5A8`, `#ef4444`, `#eab308`).
  - Usar `var(--category-...)` por slug (lookup via CSS class ou inline `style={{ color: 'hsl(var(--category-pdf))' }}`).
  - Layout inspirado no ref: ícone num quadrado colorido sólido no topo, título grande, descrição curta. Manter botão "Usar" (lógica atual) com `.btn-gradient-primary`.
- `modules/hero/ui/components/how-it-works.tsx`: revisar tokens.

### Fase 5 — Tool pages
- `modules/common/ui/components/file-upload.tsx`: aplicar `.upload-zone` para drop zone consistente (preservando lógica atual de upload presigned URL).
- `modules/tools/ui/components/tool-faq.tsx`: ajustar visual do accordion ao ref (cantos arredondados, hover sutil).
- `tool-header.tsx` / `tool-steps.tsx`: revisar espaçamentos, apenas estilo.

### Fase 6 — Validação
1. `pnpm lint` e `pnpm --filter web typecheck`
2. **`pnpm dev`** apenas sob teu comando (memória pede pra não subir servidores automaticamente)
3. Smoke test no browser: `/`, `/tools`, `/tools/<cat>`, `/tools/<cat>/<tool>`, `/dashboard`

### Fase 7 — Commit + PR
- Commit: `style: aplicar paleta vermelho-coral do pdf-simples mantendo tema dark`
- PR `worktree-import-pdf-simples-layout` → `dev-br`

---

## 4. Riscos e mitigações
- **`btn-gradient-secondary` é verde neon hardcoded** em 3 arquivos: redefinido no `globals.css` para gradiente coral — sem tocar nos consumidores.
- **`card-glow` calibrado pro tema antigo**: novo glow coral mantém o efeito.
- **Hex congelados em `tool-card.tsx`**: trocar por `hsl(var(--category-*))` para virar token-driven.
- **Tailwind 4 `@theme inline`**: adicionar `--color-tool-*` no bloco existente; nada de `tailwind.config.ts` separado.
- **Nada do ref será copiado como código fonte** — só extraímos tokens e classes utilitárias.

---

## 5. Checklist de aceite
- [ ] `globals.css` migrado, tokens novos, `.dark` consistente com a opção escolhida
- [ ] Hero, header, footer, tool grid e tool card alinhados ao mood do ref
- [ ] `pnpm lint` e `typecheck` passando
- [ ] Páginas públicas testadas no browser (golden path: home → categoria → ferramenta → upload)
- [ ] Dashboard e auth funcionais (sem regressão)
- [ ] Sem strings de cor hex hardcoded sobrando em componentes (todas via `--var`)
