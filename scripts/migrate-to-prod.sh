#!/usr/bin/env bash
# Migra coleções editoriais (tools, categories, pages, posts) do Mongo local
# para o Mongo de produção. NÃO migra users/sessions/accounts/jobs.
#
# Uso:
#   bash scripts/migrate-to-prod.sh discover   # detecta nome do DB em prod
#   bash scripts/migrate-to-prod.sh backup     # backup completo da prod (rollback)
#   bash scripts/migrate-to-prod.sh dump       # dump local das 4 coleções
#   bash scripts/migrate-to-prod.sh restore    # aplica dump na prod com --drop por coleção
#   bash scripts/migrate-to-prod.sh all        # discover + backup + dump + restore (com confirmação)

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
ENV_FILE="$ROOT/.env"
CONTAINER="pdfs-com-br-mongo"
WORKDIR_HOST="$ROOT/.tmp/migrate-$(date +%Y%m%d-%H%M%S)"
WORKDIR_CTR="/tmp/migrate"
COLLECTIONS=(tools categories pages posts)

if [[ ! -f "$ENV_FILE" ]]; then
  echo "ERRO: .env não encontrado em $ENV_FILE" >&2
  exit 1
fi

# carrega DATABASE_URL e DATABASE_URL_PROD
set -a
# shellcheck disable=SC1090
source <(grep -E '^(DATABASE_URL|DATABASE_URL_PROD)=' "$ENV_FILE")
set +a

: "${DATABASE_URL:?DATABASE_URL não definido em .env}"
: "${DATABASE_URL_PROD:?DATABASE_URL_PROD não definido em .env}"

LOCAL_DB="$(echo "$DATABASE_URL" | sed -E 's#.*/([^/?]+)(\?.*)?$#\1#')"
# mongorestore não aceita /admin no path quando se usa --db; remove o path
PROD_URI="$(echo "$DATABASE_URL_PROD" | sed -E 's#(mongodb(\+srv)?://[^/]+)/[^?]*\?#\1/?#')"

cmd="${1:-}"

discover() {
  echo "→ Listando databases na PROD (precisa do mongosh):"
  mongosh "$DATABASE_URL_PROD" --quiet --eval '
    const dbs = db.getMongo().getDBs().databases
      .filter(d => !["admin","local","config"].includes(d.name));
    print(JSON.stringify(dbs.map(d => d.name)));
  '
  echo
  echo "→ DB local detectado: $LOCAL_DB"
  echo
  echo "Defina PROD_DB no ambiente antes de rodar restore (ex.: export PROD_DB=monkey-tools)"
}

backup() {
  : "${PROD_DB:?Defina PROD_DB antes (export PROD_DB=...)}"
  mkdir -p "$WORKDIR_HOST/prod-backup"
  echo "→ Backup completo da PROD em $WORKDIR_HOST/prod-backup"
  docker run --rm --network host \
    -v "$WORKDIR_HOST/prod-backup:/dump" \
    mongo:7 \
    mongodump --uri="$PROD_URI" --db="$PROD_DB" --out=/dump
  echo "✓ Backup salvo. Para restaurar: mongorestore --uri=\"\$PROD_URI\" --db=\"\$PROD_DB\" --drop /dump/\$PROD_DB"
  echo "  (mantenha esse diretório a salvo até validar a migração)"
}

dump() {
  mkdir -p "$WORKDIR_HOST/local-dump"
  echo "→ Dump local de: ${COLLECTIONS[*]} (db=$LOCAL_DB)"
  for col in "${COLLECTIONS[@]}"; do
    docker exec "$CONTAINER" mkdir -p "$WORKDIR_CTR"
    docker exec "$CONTAINER" mongodump \
      --uri="mongodb://localhost:27017/?replicaSet=rs0&directConnection=true" \
      --db="$LOCAL_DB" \
      --collection="$col" \
      --out="$WORKDIR_CTR" 2>&1 | sed "s/^/  [$col] /"
  done
  docker cp "$CONTAINER:$WORKDIR_CTR/." "$WORKDIR_HOST/local-dump/"
  docker exec "$CONTAINER" rm -rf "$WORKDIR_CTR"
  echo "✓ Dump local em $WORKDIR_HOST/local-dump/$LOCAL_DB"
  ls -1 "$WORKDIR_HOST/local-dump/$LOCAL_DB" || true
}

restore() {
  : "${PROD_DB:?Defina PROD_DB antes (export PROD_DB=...)}"
  : "${WORKDIR_HOST_OVERRIDE:=}"
  local wd="${WORKDIR_HOST_OVERRIDE:-$WORKDIR_HOST}"
  if [[ ! -d "$wd/local-dump/$LOCAL_DB" ]]; then
    echo "ERRO: dump local não encontrado em $wd/local-dump/$LOCAL_DB" >&2
    echo "Rode 'dump' antes ou exporte WORKDIR_HOST_OVERRIDE apontando pro dump anterior." >&2
    exit 1
  fi
  echo "→ Restaurando ${COLLECTIONS[*]} em PROD db='$PROD_DB' a partir de $wd"
  docker run --rm --network host \
    -v "$wd/local-dump/$LOCAL_DB:/dump" \
    mongo:7 \
    mongorestore \
      --uri="$PROD_URI" \
      --db="$PROD_DB" \
      --drop \
      /dump 2>&1 | sed 's/^/  /'
  echo "✓ Restore concluído. Validando contagens em PROD:"
  for col in "${COLLECTIONS[@]}"; do
    n=$(mongosh "$DATABASE_URL_PROD" --quiet --eval "db.getSiblingDB('$PROD_DB').$col.countDocuments({})")
    echo "  $col: $n"
  done
}

all() {
  discover
  echo
  read -r -p "Confirme PROD_DB para continuar (Enter para abortar): " ans
  [[ -z "$ans" ]] && { echo "abortado."; exit 1; }
  export PROD_DB="$ans"
  backup
  dump
  echo
  read -r -p "Backup feito e dump pronto. Aplicar restore em '$PROD_DB'? [y/N] " conf
  [[ "$conf" != "y" && "$conf" != "Y" ]] && { echo "abortado antes do restore."; exit 1; }
  restore
}

case "$cmd" in
  discover) discover ;;
  backup)   backup ;;
  dump)     dump ;;
  restore)  restore ;;
  all)      all ;;
  *)
    echo "Uso: bash scripts/migrate-to-prod.sh {discover|backup|dump|restore|all}" >&2
    exit 1
    ;;
esac
