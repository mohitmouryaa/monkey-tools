# Prompt de execução paralela — Fase 3 (Admin UI `/dashboard/posts`)

> Use este prompt em uma sessão **limpa**, dentro do worktree
> `monkey-tool-cms-blog` (branch `feat/cms-blog`). Cole tudo a partir
> do bloco de código abaixo.

---

```
Leia:
  - .claude/plans/plan-cms-blog-v2.md             (plano original)
  - .claude/plans/plan-cms-blog-v2/fase-3-index.md (índice da fase)
  - arquivos .claude/plans/plan-cms-blog-v2/<id>-*.md sob demanda

CONTEXTO PERMITIDO: apenas esses arquivos + o código do repo.
NÃO leia nada de conversas anteriores, histórico de sessão, ou
outras pastas de planos. Se algo importante estiver faltando,
PARE e pergunte — não infira.

Comece lendo fase-3-index.md. Ele tem:
  - objetivo, critério de conclusão
  - REGRA DE ESCOPO (blog é admin-only, NÃO reusar componentes do
    contexto público — análogos dedicados em modules/dashboard/posts/)
  - tabela de reuso (itens em "Reutilizado" PODEM ser usados;
    itens em "NÃO reusar" são proibidos)
  - tabela de tasks com depends_on
  - ondas de execução paralela
  - decisões já tomadas (P1..P7)
  - restrições e armadilhas (Editor.js + Next 16, queryKey tRPC,
    URL pública do S3)

## Execução paralela

Antes de tudo, recalcule as ondas a partir dos `depends_on` dos
arquivos individuais de task. A seção "Ondas de execução paralela"
do fase-index é conveniência, não fonte da verdade.

Para cada onda, em sequência:
  1. Identifique as tasks da onda pelo grafo recalculado
  2. Para cada task, leia o arquivo <id>-*.md correspondente
  3. Se a onda tem 2+ tasks, delegue cada uma a um subagente
     (Agent tool, subagent_type=general-purpose). Passe ao subagente:
       - o arquivo do plano
       - o fase-index
       - o arquivo da task específica
     Rode os subagentes EM PARALELO (múltiplas tool calls na mesma
     resposta). Espere todos terminarem antes da próxima onda.
  4. Tasks solitárias na onda: execute você mesmo, sem subagente.

Restrição de paralelismo: se duas tasks da mesma onda editam o
mesmo arquivo do projeto, NÃO paralelize — rode sequencialmente
dentro da onda.

## Política de falha

Qualquer task que falhar — erro ao editar, typecheck quebrado,
lint quebrado, verificação objetiva não bate — PARA a execução
da fase inteira. Nenhuma onda posterior inicia.

Ao detectar falha:
  1. NÃO marque ✅ na task que falhou
  2. NÃO inicie nenhuma task de onda posterior
  3. Reporte ao usuário:
     - qual task falhou e por quê (stack trace ou mensagem)
     - quais tasks da mesma onda já concluíram (✅)
     - quais tasks posteriores foram canceladas
  4. Espere instrução do usuário. NÃO tente recuperar sozinho.

## Pontos críticos a verificar ANTES de executar

1. Onda 1 contém 3.0a (instalar deps com pnpm). Esta task NÃO pode
   rodar em paralelo com outras tasks que dependam de pacote novo
   sendo resolvido — mas como nada na Onda 1 depende dos pacotes
   recém-instalados, é seguro. Apenas garanta que `pnpm install`
   completa ANTES de qualquer task da Onda 2 começar.

2. Decisão sobre URL pública do S3 (em 3.3f): se o fallback
   `url.split("?")[0]` não bater com como o resto do projeto
   constrói URLs públicas, PARE e pergunte. Não invente
   `NEXT_PUBLIC_*` sem confirmação.

3. queryKey do tRPC no plugin Tool Embed (3.6b): adote o contrato
   "fetchTools callback injetado pelo wrapper" — está descrito no
   próprio arquivo de task. Não tente reconstruir queryKey
   manualmente.

4. Para componentes shadcn em packages/ui (3.4a, 3.4b), confira o
   build do package após criar — `packages/ui` provavelmente exige
   re-export ou step de build. Se algo não resolve em apps/web,
   PARE e olhe `packages/ui/package.json` exports.

## Marcação de progresso

Ao concluir uma task:
  - Adicione "✅ " no início do título (`# ✅ 3.2a — ...`)
  - NÃO edite depends_on nem o índice

Ao concluir TODAS as tasks da fase:
  - Rode `pnpm --filter web typecheck`
  - Rode `pnpm lint` (raiz, biome)
  - Me informe o resultado
  - Adicione ✅ no título da Fase 3 em
    .claude/plans/plan-cms-blog-v2.md

## Se algo sai do esperado

- Ambiguidade não coberta pelas "Decisões" do fase-index → PARE, pergunte.
- Lógica que poderia reusar algo NÃO listado em "Reutilizado" e que
  pareceria reuso do contexto público → PARE, pergunte (regra do usuário
  é forte: blog é admin-only).
- Erro inesperado ao rodar typecheck/lint → PARE, reporte stack trace.

Nada de adivinhar. Nada de duplicar silenciosamente.
```
