# infra/

Configurações versionadas do bucket DigitalOcean Spaces (`pdfs-com-br`).

## Pré-requisito (uma vez)

`aws cli` configurado com as Spaces Access Keys (não confundir com Personal Access Token da DO):

```bash
aws configure --profile do-spaces
# AWS Access Key ID:     <DO_SPACES_ACCESS_KEY>
# AWS Secret Access Key: <DO_SPACES_SECRET_KEY>
# Default region name:   sfo3
# Default output format: json
```

Teste:

```bash
aws --profile do-spaces s3 ls s3://pdfs-com-br --endpoint-url https://sfo3.digitaloceanspaces.com
```

## Aplicar

Da raiz do monorepo:

```bash
pnpm spaces:cors        # aplica infra/spaces-cors.json
pnpm spaces:lifecycle   # aplica infra/spaces-lifecycle.json
```

## Conferir o que está em produção

```bash
aws --profile do-spaces s3api get-bucket-cors \
  --bucket pdfs-com-br \
  --endpoint-url https://sfo3.digitaloceanspaces.com

aws --profile do-spaces s3api get-bucket-lifecycle-configuration \
  --bucket pdfs-com-br \
  --endpoint-url https://sfo3.digitaloceanspaces.com
```

## Arquivos

- `spaces-cors.json` — origens autorizadas a fazer PUT/GET no bucket (apex,
  www, localhost). Necessário pro upload direto do browser via signed URL.
- `spaces-lifecycle.json` — regras de expiração por prefixo:
  - `uploads/` → 1 dia (originais; depois do worker baixar não precisam mais)
  - `advanced-compressed/`, `compressed/`, `converted/` → 7 dias (resultados
    pra o usuário baixar)
  - `cms/` **não tem regra** (permanente, conteúdo do dashboard)
