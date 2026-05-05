# Prompt de execução — CMS Blog (autocontido)

Use este prompt em qualquer sessão **limpa** para avançar uma fase do plano. Ele se auto-orienta: detecta a fase atual, decide se precisa explodir e age.

---

## Como usar

1. Abra uma sessão Claude Code dentro do worktree:
   ```
   /home/vinicius/Jobs/durvalino/freelas/monkey-tool-cms-blog
   ```
2. Cole o prompt abaixo (a partir do bloco `---` seguinte) como primeira mensagem.
3. Não precisa passar número de fase — o prompt descobre sozinho.

---

## Prompt (copiar daqui pra baixo)

```
Você está no worktree `monkey-tool-cms-blog` (branch `feat/cms-blog`),
trabalhando no plano em `.claude/plans/plan-cms-blog-v2.md`.

# Sua tarefa

Avançar **exatamente uma fase** do plano. Não comece a próxima sem
confirmação minha. Se houver bloqueios, pare e me pergunte.

# Passo 1 — Orientação

1.1 Leia integralmente `.claude/plans/plan-cms-blog-v2.md`.
1.2 Identifique a primeira fase **sem ✅** no título (`### Fase N — ...`).
    Esta é a fase atual. Anote o número N.
1.3 Liste os "Pontos abertos" do plano que afetam a fase N. Se algum
    deles é necessário para começar, **pare e me pergunte** antes de
    qualquer outra ação.

# Passo 2 — Decidir formato

Use a tabela de formato do plano (presente no resumo do /draft-plan) e
estas regras de decisão:

- **Inline (executar direto)**: Fases 1 e 6.
- **Explodir antes**: Fases 2, 3, 4 e 5.

Se a fase atual é "inline", vá para Passo 3A.
Se a fase atual é "a explodir", vá para Passo 3B.

# Passo 3A — Execução inline

3A.1 Liste em uma única mensagem para mim:
     - Título da fase N
     - Sub-tarefas (checkboxes do plano)
     - Critério de conclusão
     - Arquivos que serão criados/modificados (seção "Arquivos que serão
       criados ou modificados → Fase N" do plano)
     - Pontos abertos relevantes e como você pretende resolvê-los
3A.2 **Pare e espere meu OK.** Não comece a editar código antes.
3A.3 Após meu OK, implemente a fase. Use TaskCreate/TaskUpdate para
     rastrear sub-tarefas (uma task por checkbox do plano).
3A.4 Conforme cada sub-tarefa concluir:
     - Marque o checkbox correspondente no `plan-cms-blog-v2.md`
     - Atualize a task como completed
3A.5 Verifique o critério de conclusão da fase. Rode comandos relevantes
     (`pnpm typecheck`, `pnpm lint`, `pnpm build` se fizer sentido para a
     fase). Se algo falhar, conserte antes de fechar.
3A.6 Quando tudo estiver verde:
     - Adicione `✅` ao final do título da fase no plano
     - Faça um commit com mensagem `feat(cms-blog): fase N — <título curto>`
       (NÃO faça push)
     - Me reporte: o que foi entregue, o que ficou pendente (se algo),
       qual a próxima fase, e se ela precisará de explosão.

# Passo 3B — Explodir antes de executar

3B.1 Invoque a skill `/explode-phase` passando o caminho do plano e o
     número N. Comando esperado pela skill:
     `/explode-phase .claude/plans/plan-cms-blog-v2.md N`
3B.2 A skill vai te fazer perguntas de elicitação. Responda com base
     no plano, no estado atual do código e em padrões existentes
     (Tool, Job, Category são bons espelhos). Se uma resposta exigir
     decisão de produto que NÃO está no plano, **pare e me pergunte**.
3B.3 A skill produzirá um prompt de execução paralela (micro-tarefas).
     Salve esse prompt em `.claude/plans/plan-cms-blog-fase-N-exec.md`.
3B.4 Mostre-me um resumo:
     - Quantas micro-tarefas
     - Quais podem rodar em paralelo
     - Decisões tomadas durante a explosão
     - Caminho do arquivo gerado
3B.5 **Pare aqui.** Eu vou abrir nova sessão limpa e usar o prompt de
     execução paralela. Não tente executar a fase nesta sessão.

# Regras gerais

- Se você descobrir que uma premissa do plano está errada (ex: rota
  inexistente, lib indisponível, conflito com código atual), **pare e
  me avise**. Não tente "consertar o plano" sozinho. Atualize o plano
  apenas após meu OK.
- Não faça push. Não abra PR. Apenas commits locais.
- Não pule fases. Não comece a próxima sem confirmação explícita.
- Não rode `docker` (subir/derubar containers) — siga a memória do
  usuário sobre lifecycle de containers.
- Mantenha respostas curtas. O plano é a fonte de verdade; não duplique
  conteúdo dele nas mensagens.
- Para avançar para a fase seguinte, eu vou abrir uma nova sessão e
  rodar este mesmo prompt de novo.
```

---

## Notas para mim (Vinícius)

- O prompt assume que `plan-cms-blog-v2.md` é a fonte de verdade. Se eu
  renomear o plano, atualizar este arquivo também.
- Sequência esperada de invocações deste prompt:
  - **Sessão 1**: executa Fase 1 (inline).
  - **Sessão 2**: explode Fase 2 → gera `plan-cms-blog-fase-2-exec.md`.
  - **Sessão 3** (limpa): cola o conteúdo do `plan-cms-blog-fase-2-exec.md`
    para rodar as micro-tarefas em paralelo.
  - **Sessão 4**: explode Fase 3 → idem.
  - …e assim sucessivamente até Fase 6 (inline).
- Para Fases 2–5 são **2 sessões cada** (explodir + executar). Fases 1 e
  6 são **1 sessão cada**. Total estimado: ~10 sessões.
