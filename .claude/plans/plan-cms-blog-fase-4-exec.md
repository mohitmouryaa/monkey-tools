# Prompt de execução paralela — Fase 4 (Render público `/blog`)

> Cole este prompt em **uma sessão limpa** dentro do worktree
> `monkey-tool-cms-blog`. Ele executa a Fase 4 inteira em ondas paralelas.

---

## Prompt (copiar daqui pra baixo)

```
Leia:
  - .claude/plans/plan-cms-blog-v2.md                        (plano original)
  - .claude/plans/plan-cms-blog-v2/fase-4-index.md           (índice da fase)
  - arquivos .claude/plans/plan-cms-blog-v2/4.*.md sob demanda

CONTEXTO PERMITIDO: apenas esses arquivos + o código do repo.
NÃO leia nada de conversas anteriores, histórico de sessão, ou outras
pastas de planos. Se algo importante estiver faltando, PARE e pergunte
— não infira.

Comece lendo `fase-4-index.md`. Ele tem:
  - objetivo, critério de conclusão
  - tabela de reuso (itens em "Reutilizado" NÃO devem ser recriados)
  - tabela de tasks com `depends_on`
  - ondas de execução paralela
  - decisões já tomadas (P1..P8)

## Execução paralela

Antes de tudo, recalcule as ondas a partir dos `depends_on` dos arquivos
individuais de task. A seção "Ondas de execução paralela" do
fase-index é conveniência, não fonte da verdade.

Para cada onda, em sequência:
  1. Identifique as tasks da onda pelo grafo recalculado
  2. Para cada task, leia o arquivo `4.<id>-*.md` correspondente
  3. Se a onda tem 2+ tasks, delegue cada uma a um subagente
     (Agent tool, subagent_type=general-purpose). Passe ao subagente:
       - o arquivo do plano
       - o fase-index
       - o arquivo da task específica
     Rode os subagentes EM PARALELO (múltiplas tool calls na mesma
     resposta). Espere todos terminarem antes da próxima onda.
  4. Tasks solitárias na onda: execute você mesmo.

Restrição de paralelismo: se duas tasks da mesma onda editam o mesmo
arquivo, NÃO paralelize — rode sequencialmente. (Não é o caso aqui — todas
as tasks da onda 1 criam arquivos distintos.)

## Política de falha

Qualquer task que falhar — erro ao editar, typecheck quebrado, lint
quebrado, verificação objetiva não bate — PARA a execução da fase
inteira. Nenhuma onda posterior inicia.

Ao detectar falha:
  1. NÃO marque ✅ na task que falhou
  2. NÃO inicie nenhuma task de onda posterior
  3. Reporte ao usuário:
     - qual task falhou e por quê (stack trace ou mensagem)
     - quais tasks da mesma onda já concluíram (✅)
     - quais tasks posteriores foram canceladas
  4. Espere instrução do usuário. NÃO tente recuperar sozinho.

## Marcação de progresso

Ao concluir uma task:
  - Adicione `✅ ` no início do título (`# ✅ 4.X — ...`)
  - NÃO edite `depends_on` nem o índice

Ao concluir TODAS as tasks da fase:
  - Rode `pnpm --filter web typecheck` e `pnpm --filter web lint`
  - Me informe o resultado
  - Adicione `✅` no título da Fase 4 em `.claude/plans/plan-cms-blog-v2.md`

## Se algo sai do esperado

- Ambiguidade não coberta pelas "Decisões" do fase-index → PARE, pergunte.
- Lógica que poderia reusar algo não listado em "Reutilizado" → PARE, pergunte.
- Erro de domínio S3 em `next/image` (4.11 / 4.17) → PARE, reporte —
  pode ser preciso adicionar `images.remotePatterns` em `next.config.js`,
  decisão fora do escopo da Fase 4.
- Erro inesperado ao rodar typecheck/lint → PARE, reporte stack trace.

Nada de adivinhar. Nada de duplicar silenciosamente.
```
