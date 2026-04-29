# Prompts autocontidos — Importação layout pdf-simples (caminho C)

> Cada bloco abaixo é um prompt completo para uma nova conversa. Copie só o bloco da fase atual.
> Ao terminar, o agente DEVE imprimir literalmente: `✅ FASE <n> CONCLUÍDA — pronto para FASE <n+1>`.
> Plano completo: `.claude/plans/import-pdf-simples-layout.md`.
> Worktree: `/home/vinicius/Jobs/durvalino/freelas/monkey-tool/.claude/worktrees/import-pdf-simples-layout` (branch `worktree-import-pdf-simples-layout`, base `dev-br`).
> Memória do projeto: **não subir/derrubar `pnpm dev` ou docker automaticamente** — só rodar quando o usuário pedir.

---

## FASE 1 — Tokens (paleta dark + coral)

```
Contexto: pnpm monorepo (Next.js 16 App Router + Tailwind 4) do projeto monkey-tool.
Trabalhe na worktree: /home/vinicius/Jobs/durvalino/freelas/monkey-tool/.claude/worktrees/import-pdf-simples-layout
Estamos importando a paleta visual do repo felipelayoun/pdf-simples mantendo o tema DARK atual (caminho C). O plano completo está em .claude/plans/import-pdf-simples-layout.md.

Objetivo desta fase: trocar os tokens de cor + radius em packages/ui/src/styles/globals.css para a paleta vermelho-coral, mantendo o background escuro. NÃO mexa em componentes nem em utilitários customizados (.btn-gradient-*, .card-glow) ainda — isso é a Fase 2.

Mudanças exatas em packages/ui/src/styles/globals.css, em AMBOS os blocos :root e .dark:
- --primary: 4 85% 55%        (era 243 100% 68%)
- --primary-foreground: 0 0% 100%
- --ring: 4 85% 55%            (era 243 100% 68%)
- --secondary: 14 90% 55%      (era 162 100% 45%)
- --secondary-foreground: 0 0% 100%   (era 222 47% 7%)
- --accent: 14 90% 55%         (era 162 100% 45%)
- --accent-foreground: 0 0% 100%      (era 222 47% 7%)
- --radius: 0.75rem            (era 1rem)  — só no :root, .dark não declara radius
- --logo-primary: 4 85% 55%    (era 243 100% 68%)
- --logo-secondary: 14 90% 55% (era 162 100% 45%)
- Sidebar: --sidebar-primary: 4 85% 55%; --sidebar-ring: 4 85% 55%
- Categorias remapeadas:
  - --category-pdf: 4 85% 60%
  - --category-image: 145 65% 55%
  - --category-text: 210 80% 65%
  - --category-converter: 35 95% 60%
- ADICIONAR (em :root e .dark) os tokens novos:
  - --tool-pdf-word: 210 80% 55%
  - --tool-juntar: 145 65% 50%
  - --tool-comprimir: 35 95% 55%
  - --tool-dividir: 265 70% 60%
  - --tool-assinar: 340 75% 55%

No bloco @theme inline (mesmo arquivo), ADICIONAR:
- --color-tool-pdf-word: hsl(var(--tool-pdf-word));
- --color-tool-juntar: hsl(var(--tool-juntar));
- --color-tool-comprimir: hsl(var(--tool-comprimir));
- --color-tool-dividir: hsl(var(--tool-dividir));
- --color-tool-assinar: hsl(var(--tool-assinar));

NÃO toque em:
- @layer components / .btn-gradient-* / .card-glow (Fase 2)
- Cores de chart-* (mantenha)
- Background, card, popover, muted, border, input, foreground (mantenha valores dark atuais)

Validação:
1. cd para a worktree e rode: pnpm --filter @workspace/ui build (se existir) OU pnpm lint
2. Confirme que o arquivo abre no editor sem erro de sintaxe CSS

Ao concluir, imprima EXATAMENTE:
✅ FASE 1 CONCLUÍDA — pronto para FASE 2
```

---

## FASE 2 — Utilitários globais

```
Contexto: pnpm monorepo (Next.js 16 + Tailwind 4) monkey-tool. Continuação da importação da paleta do felipelayoun/pdf-simples (caminho C — dark mantido).
Worktree: /home/vinicius/Jobs/durvalino/freelas/monkey-tool/.claude/worktrees/import-pdf-simples-layout
Plano: .claude/plans/import-pdf-simples-layout.md
Pré-requisito: FASE 1 concluída (tokens trocados).

Objetivo: redefinir utilitários globais em packages/ui/src/styles/globals.css para casar com a nova paleta + adicionar .tool-card e .upload-zone do ref pdf-simples.

Mudanças no fim de packages/ui/src/styles/globals.css:

1) Reescrever as classes existentes (.btn-gradient-primary, .btn-gradient-secondary, .card-glow):
.btn-gradient-primary {
  background: linear-gradient(135deg, hsl(4 85% 55%) 0%, hsl(14 90% 55%) 100%);
}
.btn-gradient-secondary {
  background: linear-gradient(135deg, hsl(14 90% 55%) 0%, hsl(24 90% 55%) 100%);
}
.card-glow:hover {
  box-shadow: 0 0 30px -5px hsl(4 85% 55% / 0.4);
}

2) Adicionar dois novos utilitários (formato Tailwind 4 — pode usar @utility ou classes diretas em @layer components; siga o padrão já presente no arquivo):

.tool-card — base: rounded-2xl p-6 transition-all duration-200 cursor-pointer border-2 border-transparent
.tool-card:hover — shadow-lg -translate-y-1

.upload-zone — base: border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-200 cursor-pointer; cor da borda muted-foreground/25; hover: border-primary/50 e bg-primary/5
.upload-zone.dragging — border-primary bg-primary/10 scale-[1.02]

Equivalente em CSS puro (já que o arquivo usa @apply em @layer base):
@layer components {
  .tool-card {
    @apply rounded-2xl p-6 transition-all duration-200 cursor-pointer border-2 border-transparent;
  }
  .tool-card:hover {
    @apply shadow-lg -translate-y-1;
  }
  .upload-zone {
    @apply border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-200 cursor-pointer;
    @apply border-muted-foreground/25 hover:border-primary/50 hover:bg-primary/5;
  }
  .upload-zone.dragging {
    @apply border-primary bg-primary/10 scale-[1.02];
  }
}

3) No bloco @layer base existente, adicionar regra para headings:
h1, h2, h3, h4, h5, h6 {
  @apply tracking-tight;
}

NÃO toque em tokens (Fase 1) nem em componentes .tsx (Fase 4).

Validação:
1. pnpm lint na raiz do monorepo
2. Confirme que .tool-card / .upload-zone aparecem 1× no arquivo

Ao concluir, imprima EXATAMENTE:
✅ FASE 2 CONCLUÍDA — pronto para FASE 3
```

---

## FASE 3 — Tipografia

```
Contexto: monkey-tool monorepo. Caminho C da importação pdf-simples. Plano: .claude/plans/import-pdf-simples-layout.md.
Worktree: /home/vinicius/Jobs/durvalino/freelas/monkey-tool/.claude/worktrees/import-pdf-simples-layout
Pré-requisitos: FASES 1 e 2 concluídas.

Objetivo: garantir que DM Sans renderize com os pesos usados pelo design do pdf-simples.

Edite apps/web/app/layout.tsx:

Localizar:
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

Substituir por:
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
});

Não mexa em mais nada (Fredoka, Toaster, Providers, scripts dinâmicos — tudo permanece).

Validação:
1. pnpm --filter web typecheck
2. pnpm lint

Ao concluir, imprima EXATAMENTE:
✅ FASE 3 CONCLUÍDA — pronto para FASE 4
```

---

## FASE 4 — Componentes públicos

```
Contexto: monkey-tool (Next.js 16 + Tailwind 4 + shadcn/ui). Caminho C: dark mantido, paleta vermelho-coral aplicada via tokens.
Worktree: /home/vinicius/Jobs/durvalino/freelas/monkey-tool/.claude/worktrees/import-pdf-simples-layout
Plano: .claude/plans/import-pdf-simples-layout.md
Pré-requisitos: FASES 1, 2, 3 concluídas (tokens + utilitários + DM Sans com pesos).

Objetivo: ajustar componentes públicos para refletir o mood visual do pdf-simples, REMOVENDO hex hardcoded e preservando 100% da lógica (tRPC, links, props).

Arquivos a editar:

1) apps/web/modules/common/ui/components/tool-card.tsx
   - Remover o objeto categoryIconColors com hex (#ef4444, #00E5A8, #635BFF, #eab308).
   - Mapear categorySlug → CSS var:
       const categoryVar: Record<string, string> = {
         "pdf-tools": "var(--category-pdf)",
         "image-tools": "var(--category-image)",
         "text-tools": "var(--category-text)",
         "text-ai-tools": "var(--category-text)",
         "converters": "var(--category-converter)",
       };
       const categoryColor = `hsl(${categoryVar[categorySlug] ?? "var(--category-pdf)"})`;
   - Manter a estrutura atual do card (ícone + badge + título + descrição + botão "Usar"). Manter classes card-glow e btn-gradient-primary (foram redefinidas em Fase 2).

2) apps/web/modules/hero/ui/components/new-hero-section.tsx
   - Manter estrutura. Conferir/manter classes btn-gradient-secondary (já redefinida em Fase 2).
   - Os blurs decorativos (bg-primary/10 blur-3xl, bg-secondary/10 blur-3xl) ficam — combinam com dark.

3) apps/web/modules/common/ui/components/header.tsx
   - Manter estrutura (logo + nav + CTAs). Sem mudanças necessárias além das classes já usando tokens semânticos.

4) apps/web/modules/common/ui/components/footer.tsx
   - Sem mudanças (já usa tokens semânticos).

5) apps/web/modules/hero/ui/components/new-tools-grid.tsx
   - Leia o arquivo. Se há classes com cores hardcoded ou padding fora do padrão do ref (gap-4, grid 2/3/5 cols na home), alinhe ao ref. Se já está coerente com tokens, deixe.

6) apps/web/modules/hero/ui/components/how-it-works.tsx
   - Mesma diretriz: revisar tokens, não introduzir hex.

Regra geral: NENHUM arquivo .tsx pode conter cor em hex (#xxxxxx) ou rgb(). Tudo via tokens semânticos do Tailwind ou CSS vars hsl(var(--...)).

Validação:
1. grep -rE "#[0-9a-fA-F]{3,6}\\b" apps/web/modules/common/ui/components apps/web/modules/hero/ui/components — não deve retornar matches em arquivos .tsx (exceto comentários docstring se houver).
2. pnpm --filter web typecheck
3. pnpm lint

Ao concluir, imprima EXATAMENTE:
✅ FASE 4 CONCLUÍDA — pronto para FASE 5
```

---

## FASE 5 — Tool pages

```
Contexto: monkey-tool. Caminho C da importação pdf-simples. Plano: .claude/plans/import-pdf-simples-layout.md.
Worktree: /home/vinicius/Jobs/durvalino/freelas/monkey-tool/.claude/worktrees/import-pdf-simples-layout
Pré-requisitos: FASES 1–4 concluídas.

Objetivo: aplicar o look do pdf-simples nas páginas de ferramenta, principalmente na zona de drop e no FAQ. NÃO mude lógica de upload/processamento (presigned URL, tRPC, pdf-lib).

Arquivos a editar:

1) apps/web/modules/common/ui/components/file-upload.tsx
   - Aplicar a classe .upload-zone (criada em Fase 2) na div da drop zone.
   - Adicionar/Manter modifier .dragging quando o estado for "arrastando".
   - Preservar o input file invisível, callbacks, validação de tipo e estado.
   - Visual interno: ícone Upload (lucide), texto principal "Arraste seu arquivo aqui" (mantenha o texto i18n existente), texto secundário "ou clique para selecionar".

2) apps/web/modules/tools/ui/components/tool-faq.tsx
   - Estilo accordion limpo: cada item dentro de um div com border border-border/50 rounded-xl overflow-hidden, botão full-width com hover:bg-secondary/50 transition-colors, ícone ChevronDown que rotaciona 180deg quando aberto.
   - Preservar lógica de estado e i18n.

3) apps/web/modules/tools/ui/components/tool-header.tsx
   - Centralizar título e subtítulo, h1 com text-3xl md:text-4xl font-bold, p com text-lg text-muted-foreground.
   - Sem mudanças funcionais.

4) apps/web/modules/tools/ui/components/tool-steps.tsx
   - Apenas garantir tokens semânticos; sem hex.

Regra: nenhum hex em .tsx. Lógica/handlers/estado intocados.

Validação:
1. grep -rE "#[0-9a-fA-F]{3,6}\\b" apps/web/modules/tools/ui/components apps/web/modules/common/ui/components/file-upload.tsx — sem matches em código.
2. pnpm --filter web typecheck
3. pnpm lint

Ao concluir, imprima EXATAMENTE:
✅ FASE 5 CONCLUÍDA — pronto para FASE 6
```

---

## FASE 6 — Validação

```
Contexto: monkey-tool. Caminho C da importação pdf-simples. Plano: .claude/plans/import-pdf-simples-layout.md.
Worktree: /home/vinicius/Jobs/durvalino/freelas/monkey-tool/.claude/worktrees/import-pdf-simples-layout
Pré-requisitos: FASES 1–5 concluídas.

Objetivo: validar que a importação não quebrou nada antes de commit.

Passos:
1) cd para a worktree.
2) Rode pnpm lint (raiz). Reporte qualquer erro.
3) Rode pnpm --filter web typecheck. Reporte qualquer erro.
4) Rode pnpm --filter worker typecheck. Reporte qualquer erro.
5) git diff --stat dev-br..HEAD — listar arquivos alterados e confirmar que SÓ tocamos em:
   - packages/ui/src/styles/globals.css
   - apps/web/app/layout.tsx
   - apps/web/modules/common/ui/components/(tool-card.tsx, header.tsx, footer.tsx, file-upload.tsx, ...)
   - apps/web/modules/hero/ui/components/(new-hero-section.tsx, new-tools-grid.tsx, how-it-works.tsx)
   - apps/web/modules/tools/ui/components/(tool-faq.tsx, tool-header.tsx, tool-steps.tsx)
   - .claude/plans/* (docs)
6) NÃO suba `pnpm dev` automaticamente. Em vez disso, ao fim, instrua o usuário a rodar `pnpm dev` manualmente e visitar /, /tools, /tools/<categoria>, /tools/<categoria>/<tool> para inspeção visual.

Se alguma validação falhar: pare, reporte o erro e NÃO finalize a fase.

Ao concluir todas as validações sem erro, imprima EXATAMENTE:
✅ FASE 6 CONCLUÍDA — pronto para FASE 7

E em seguida liste o smoke-test manual sugerido:
- /
- /tools
- /tools/pdf-tools
- /tools/pdf-tools/<algum tool slug>
- /dashboard (verificar que continua intacto)
```

---

## FASE 7 — Commit + PR

```
Contexto: monkey-tool. Caminho C da importação pdf-simples concluído.
Worktree: /home/vinicius/Jobs/durvalino/freelas/monkey-tool/.claude/worktrees/import-pdf-simples-layout (branch worktree-import-pdf-simples-layout, base dev-br)
Pré-requisitos: FASES 1–6 concluídas, smoke test manual aprovado pelo usuário.

Objetivo: commit + PR para dev-br.

Passos:
1) Confirme com o usuário que o smoke-test visual passou. Se ele não tiver confirmado ainda, PARE e pergunte.
2) git status — listar.
3) git diff --stat dev-br..HEAD
4) Stage explícito dos arquivos alterados (NÃO use git add -A):
   - packages/ui/src/styles/globals.css
   - apps/web/app/layout.tsx
   - todos os .tsx alterados em apps/web/modules
   - .claude/plans/import-pdf-simples-layout.md
   - .claude/plans/import-pdf-simples-phases.md (este arquivo)
5) Commit com mensagem (HEREDOC):
   style: aplicar paleta vermelho-coral do pdf-simples mantendo tema dark

   Importa cores/design/estilos do repo felipelayoun/pdf-simples
   sem alterar a lógica do monkey-tool. Mantém o background dark
   atual e troca o primary roxo + secondary verde-neon por
   coral/laranja-coral. Adiciona utilitários .tool-card e
   .upload-zone, redefine gradientes existentes, e remove cores
   hex hardcoded de tool-card.tsx em favor de CSS vars de
   categoria.

   Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
6) git status para confirmar.
7) Pergunte ao usuário se quer abrir o PR. Se sim, gh pr create --base dev-br --title "style: aplicar paleta coral do pdf-simples" --body com:
   - ## Summary (3 bullets do que mudou)
   - ## Test plan (smoke test das rotas)
   - menção 🤖 Generated with Claude Code

NÃO faça push para main. NÃO use --no-verify.

Ao concluir, imprima EXATAMENTE:
✅ FASE 7 CONCLUÍDA — importação pdf-simples finalizada
```

