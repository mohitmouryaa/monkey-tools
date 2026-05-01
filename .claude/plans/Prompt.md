# Prompt — Execução faseada do plano de otimização de bundle

## Como usar

Em qualquer sessão limpa, escreva:

```
Prompt.md fase <N>
```

Onde `<N>` é o número da fase (1 a 8). O agente seguirá o protocolo abaixo sem precisar de mais contexto.

---

## Protocolo (sempre o mesmo, independente da fase)

Você está executando a **Fase {N}** do plano em `.claude/plans/plan-bundle-optimization-v2.md`.

Trabalhe a partir do worktree:
`/home/vinicius/Jobs/durvalino/freelas/monkey-tool/.claude/worktrees/melhorias-react`

### Passo 0 — Carregar contexto

1. Leia `.claude/plans/plan-bundle-optimization-v2.md` inteiro.
2. Localize a seção da **Fase {N}**.
3. Se a fase já estiver marcada com `✅` no título, pare e responda apenas: `Fase {N} já concluída.` Não execute nada.
4. Liste as tarefas/subtarefas da fase e os critérios de conclusão antes de começar.

### Passo 1 — Decidir formato de execução

- Se a fase está marcada como **"a explodir"** ou **"explode"** no plano (atualmente: **somente a Fase 3**):
  - Antes de começar, rode `/explode-phase {N}` contra o arquivo do plano.
  - Responda às perguntas de elicitação que a skill fizer com defaults razoáveis (sem me perguntar).
  - Use o prompt de execução paralela gerado para implementar.
- Se a fase é **inline**: implemente direto, sem `/explode-phase`.

### Passo 2 — Implementar

- Siga as instruções literais da fase no plano.
- Trate qualquer `[DECISÃO PENDENTE]` aplicando o **default razoável** indicado no próprio plano. Não me pergunte.
- Não invente refatoração extra fora do escopo da fase.
- Não pule hooks (`--no-verify`) nem desabilite typecheck.

### Passo 3 — Validar

Antes de marcar a fase como concluída, rode:

```bash
# carrega env do .env raiz pro Mongo/Redis/MinIO local
set -a && . /home/vinicius/Jobs/durvalino/freelas/monkey-tool/.env && set +a

# garante packages internos buildados (dist do @workspace/types fica desatualizado às vezes)
pnpm --filter "@workspace/*" build

# typecheck do app (não roda build inteiro pra economizar tempo, exceto se a fase exigir)
pnpm --filter web typecheck
```

Se a fase exigir build full (Fases 1, 2, 3, 4, 6 — qualquer uma que mexa em chunk size ou next.config), rode também:

```bash
set -a && . /home/vinicius/Jobs/durvalino/freelas/monkey-tool/.env && set +a
pnpm --filter web build
```

E compare o tamanho dos chunks da rota afetada antes/depois (use `du -h .next/static/chunks/*.js | sort -hr | head -20` ou inspecione `.next/server/app/<rota>/page/_client-reference-manifest.js`).

### Passo 4 — Verificar critérios de conclusão

Confirme um a um que cada critério listado na fase do plano foi atendido. Se algum não foi, **não marque a fase como concluída** — reporte o que falta e pare.

### Passo 5 — Marcar fase como concluída

No arquivo `.claude/plans/plan-bundle-optimization-v2.md`:

1. Para cada tarefa/subtarefa concluída, marque o checkbox `[x]`.
2. No título da fase, adicione `✅` no final. Exemplo:
   - Antes: `## Fase {N} — <título>`
   - Depois: `## Fase {N} — <título> ✅`

### Passo 6 — Reportar

Ao final, envie uma mensagem curta com:

- O que mudou (1-3 bullets).
- Resultado da validação (typecheck/build OK, métrica antes/depois quando aplicável).
- Qual é a próxima fase pendente e o que ela requer (resumo de 1 linha).
- **Não inicie a próxima fase.** Pare aqui.

### Em caso de erro

- Se uma decisão crítica não tiver default no plano, pare, reporte o impasse de forma objetiva e **não marque** a fase como concluída.
- Se o build/typecheck falhar por motivo fora do escopo da fase atual (ex.: erro pré-existente), reporte e pare — não tente "consertar de quebra".
- Não mexa em `next.config.mjs.bak`, `apps/web/next-env.d.ts` ou outros arquivos órfãos sem instrução explícita.

---

## Mapa rápido das fases (do plano v2)

| Fase | Tema | Formato |
|---|---|---|
| 1 | `optimizePackageImports` lucide-react + zod | inline |
| 2 | `dynamic()` em xlsx/jspdf/pdf-lib/jszip nas tools | inline |
| 3 | Quebrar barril `tool-embed-block-renderer.tsx` | **explode** |
| 4 | `dynamic()` Recharts (dashboard) + TipTap (tool form) | inline |
| 5 | Auditoria de imports de Zod em client components | inline |
| 6 | Fix dos `source:` quebrados em `next.config.mjs` | inline |
| 7 | Fix `ChartLegendContent` (Recharts v3) | inline |
| 8 | Índices Mongoose duplicados em `PostModel` | inline |

A fonte de verdade do que cada fase faz é sempre o arquivo `plan-bundle-optimization-v2.md`. Este prompt só descreve o **protocolo de execução**.
