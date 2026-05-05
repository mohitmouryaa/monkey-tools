# Issue: Deploy na Digital Ocean

**Status:** aberta — aguardando decisão de infra
**Origem:** análise do fork — Fase 4 / Fase 5, item #5 (descartado do Sprint 1, levantado como issue)
**Contexto:** o worker do monorepo é deployado na Digital Ocean. O Next.js (`apps/web`) já vai para a Vercel via `vercel.json`. Hoje não há pipeline automatizado para o worker.

---

## Problema

O fork tinha um workflow `.github/workflows/main.yml` que fazia deploy via `rsync + ssh + docker compose down/up --build` em runner `self-hosted`. Não dá para portar literal porque:

1. Branch alvo do fork é `master` — atual usa `main`.
2. `docker compose down && up --build` derruba o worker durante o deploy → qualquer job em andamento perde o lock do BullMQ. Pode causar retry ou job abandonado.
3. Runner `self-hosted` pressupõe runner do GitHub Actions provisionado em algum servidor da DO. Se não existe, precisa ou provisionar, ou trocar por `ubuntu-latest` + SSH puro.

---

## Trecho do fork (para referência)

```yaml
on:
  push:
    branches: [master]
jobs:
  deploy:
    runs-on: self-hosted
    steps:
      - uses: actions/checkout@v4
      - name: Sync code to app server
        run: |
          rsync -az --delete --exclude=".git" --exclude="node_modules" \
            --exclude=".env" --exclude="uploads/" \
            ./ root@${{ secrets.WORKER_1_IP }}:/var/www/app
      - name: Docker compose deploy
        run: |
          ssh root@${{ secrets.WORKER_1_IP }} "cd /var/www/app && \
            docker compose down && docker compose up -d --build"
```

---

## Decisões pendentes (responder antes de implementar)

- [ ] Hoje o deploy do worker é manual (SSH na DO + `docker compose pull/up`)? Ou já existe algum script/CI?
- [ ] Existe runner GitHub Actions self-hosted provisionado na DO, ou usar `ubuntu-latest` + SSH com chave em secret (`appleboy/ssh-action`)?
- [ ] Mongo/Redis/MinIO em produção rodam no mesmo droplet do worker, ou em serviços gerenciados (Mongo Atlas, Upstash, S3 nativo da DO)? Isso muda se o `docker compose` na DO tem só o worker ou o stack inteiro.
- [ ] Aceita downtime no deploy (jobs em andamento perdem o lock) ou precisa de zero-downtime? Caminho menos invasivo: `docker compose up -d --no-deps --build worker` (rebuilda só o worker).

---

## Próximos passos

Com as respostas acima, montar `.github/workflows/deploy-worker.yml` adaptado:
- trigger em `push` para `main` com filtro de path (`apps/worker/**`, `packages/**`, `pnpm-lock.yaml`)
- runner conforme decisão
- secrets: `DO_HOST`, `DO_SSH_KEY`, `DO_USER`
- comando de deploy ajustado para preservar jobs em andamento

---

## Referências

- Análise consolidada: `.claude/analise-fork/fase-5-plano.md` (item #5)
- Análise detalhada: `.claude/analise-fork/fase-4-infra.md` (seção `.github/`)
- Fork extraído em: `/tmp/monkey-tools-fork/monkey-tools-master/.github/workflows/main.yml`
