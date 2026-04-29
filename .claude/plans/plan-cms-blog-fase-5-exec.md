# Prompt de execução — Fase 5 (CMS Blog) · paralelo

Cole este conteúdo como **primeira mensagem** numa sessão Claude Code limpa dentro de `/home/vinicius/Jobs/durvalino/freelas/monkey-tool-cms-blog`.

---

```
Você está no worktree `monkey-tool-cms-blog` (branch `feat/cms-blog`).
Sua tarefa é executar a Fase 5 do plano CMS Blog em paralelo.

## Arquivos que você pode ler

- .claude/plans/plan-cms-blog-v2.md             (plano global — fonte da verdade)
- .claude/plans/plan-cms-blog-v2/fase-5-index.md  (índice da fase)
- .claude/plans/plan-cms-blog-v2/5.*-*.md         (arquivos de task; ler sob demanda)
- código do repositório

CONTEXTO PERMITIDO: apenas esses arquivos + o código do repo. NÃO leia nada de
conversas anteriores, histórico de sessão, ou outras pastas de planos. Se algo
importante estiver faltando, PARE e pergunte — não infira.

## Passo 1 — Orientação

Comece lendo `.claude/plans/plan-cms-blog-v2/fase-5-index.md`. Ele tem:
  - objetivo, critério de conclusão
  - tabela de reuso (itens em "Reutilizado" NÃO devem ser recriados)
  - tabela de tasks com `depends_on`
  - ondas de execução paralela (apenas conveniência)
  - decisões já tomadas (P1..P9)
  - **Atenção do executor**: teste anônimo obrigatório após 5.7 (P7).

## Passo 2 — Execução paralela

Antes de tudo, **recalcule as ondas a partir dos `depends_on`** dos arquivos
individuais de task. A seção "Ondas de execução paralela" do fase-index é
conveniência, não fonte da verdade.

Para cada onda, em sequência:
  1. Identifique as tasks da onda pelo grafo recalculado.
  2. Para cada task, leia o arquivo `5.<id>-*.md` correspondente.
  3. Se a onda tem 2+ tasks, delegue cada uma a um subagente
     (Agent tool, subagent_type=general-purpose). Passe ao subagente:
       - o arquivo do plano (`plan-cms-blog-v2.md`)
       - o fase-index (`fase-5-index.md`)
       - o arquivo da task específica (`5.X-...md`)
     Rode os subagentes EM PARALELO (single message, multiple Agent calls).
     Espere todos terminarem antes da próxima onda.
  4. Tasks solitárias na onda: execute você mesmo, sem subagente.

Restrição de paralelismo já capturada no grafo (verifique ao ler cada task):
  - 5.4 e 5.5 ambas tocam `apps/web/trpc/routers/toolsRouter.ts` → 5.5 depende de 5.4.
  - 5.6 e 5.7 ambas tocam `apps/web/modules/tools/ui/views/tool-view.tsx` → 5.7 depende de 5.6.

## Política de falha

Qualquer task que falhar — erro ao editar, typecheck quebrado, lint quebrado,
verificação objetiva não bate — PARA a execução da fase inteira. Nenhuma onda
posterior inicia.

Ao detectar falha:
  1. NÃO marque ✅ na task que falhou.
  2. NÃO inicie nenhuma task de onda posterior.
  3. Reporte ao usuário: qual task falhou, por quê, quais já concluíram (✅),
     quais foram canceladas.
  4. Espere instrução. NÃO tente recuperar sozinho.

## Marcação de progresso

Ao concluir uma task:
  - Adicione `✅ ` no início do título do arquivo (`# ✅ 5.X — ...`).
  - NÃO edite `depends_on` nem o índice.

Ao concluir TODAS as tasks da fase:
  - Rode `pnpm --filter web typecheck` (ou `pnpm typecheck` no root).
  - Rode `pnpm --filter web lint` (ou `pnpm lint` no root).
  - Adicione `✅` no final do título da Fase 5 em `.claude/plans/plan-cms-blog-v2.md`
    (`### Fase 5 — Cross-link Tool ↔ Post ✅`).
  - **OBRIGATÓRIO antes de fechar a fase**: testar a página pública de uma tool
    com `featuredPostId` setado em **browser anônimo (private/incógnito, sem
    cookies)**. Confirmar que a seção "Aprenda mais" renderiza.
  - Se renderizar: faça um commit local com a mensagem
    `feat(cms-blog): fase 5 — cross-link tool↔post`. NÃO faça push.
  - Reporte: o que foi entregue, resultado do teste anônimo, se algo ficou
    pendente, qual é a próxima fase (Fase 6).

## Caso degradado do P7 (visitante anônimo não vê "Aprenda mais")

Se o teste anônimo falhar (seção não aparece publicamente porque
`posts.getById` é `protectedProcedure`):
  - NÃO marque ✅ na Fase 5 nem em 5.7.
  - NÃO faça commit.
  - Reporte ao usuário com a mensagem:
    > "P7 caiu no caso degradado: visitantes anônimos não veem a seção
    > 'Aprenda mais' porque `posts.getById` requer sessão. Necessário criar
    > procedure pública dedicada (`posts.getByIdPublic` filtrando PUBLISHED +
    > publishedAt<=now) ou popular o post diretamente em
    > `getCategoryWithTools`. Out-of-scope desta fase — abrir nova fase."

## Se algo sai do esperado

- Ambiguidade não coberta pelas "Decisões" do fase-index → PARE, pergunte.
- Lógica que poderia reusar algo não listado em "Reutilizado" → PARE, pergunte.
- Erro inesperado ao rodar typecheck/lint → PARE, reporte stack trace.
- Não rode `docker` (subir/derrubar containers).
- Mantenha respostas curtas. Os arquivos da Fase 5 são a fonte da verdade.
```
