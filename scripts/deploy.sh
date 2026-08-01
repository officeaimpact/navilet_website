#!/usr/bin/env bash
set -euo pipefail

# Деплой navilet.ru. Живёт на сервере как /root/navilet-deploy.sh.
# Запуск: ssh root@5.129.241.199 'bash /root/navilet-deploy.sh'

REPO_DIR=/root/navilet_website
REPO_URL=https://github.com/officeaimpact/navilet_website.git
PROXY_DIR=/root/navilet-proxy
NETWORK=navilet-net

if [ ! -d "$REPO_DIR/.git" ]; then
  echo "==> project dir missing, cloning fresh"
  rm -rf "$REPO_DIR"
  git clone --depth 50 "$REPO_URL" "$REPO_DIR"
fi

cd "$REPO_DIR"

echo "==> pulling latest from origin/main"
git fetch --all --prune
git reset --hard origin/main
git pull origin main

echo "==> reading WEB3FORMS access key from running container"
CURRENT_KEY=$(docker exec navylet-site sh -c 'grep -roEh "[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}" /usr/share/nginx/html/_next/static/chunks/ 2>/dev/null | sort -u | head -1')

if [ -z "$CURRENT_KEY" ]; then
  echo "ERROR: could not extract WEB3FORMS_ACCESS_KEY from container"
  exit 1
fi
echo "==> got key (masked): ${CURRENT_KEY:0:8}-****-****"

echo "==> syncing telegram proxy"
mkdir -p "$PROXY_DIR"
cp "$REPO_DIR/proxy/server.js" "$PROXY_DIR/server.js"
docker restart navilet-proxy >/dev/null || echo "WARN: navilet-proxy not running"

echo "==> docker build"
docker build \
  --build-arg "NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=$CURRENT_KEY" \
  -t navylet-site:latest \
  .

echo "==> safe-swap: stop & remove old container, run new"
docker stop navylet-site || true
docker rm navylet-site || true

# --network navilet-net обязателен: nginx проксирует /api/lead на
# navilet-proxy:8080 по внутреннему DNS docker. Без общей сети приём
# заявок в Telegram отваливается с 502.
docker run -d \
  --name navylet-site \
  --restart unless-stopped \
  --network "$NETWORK" \
  -p 80:80 \
  -p 443:443 \
  -v /etc/letsencrypt:/etc/letsencrypt:ro \
  navylet-site:latest

sleep 4
echo "==> container status"
docker ps --filter "name=navylet-site"

echo "==> smoke: сайт отвечает?"
curl -s -o /dev/null -w "  https://navilet.ru/ -> %{http_code}\n" https://navilet.ru/

echo "==> smoke: приём заявок жив? (ожидаем 400 empty, а не 502)"
curl -s -o /dev/null -w "  POST /api/lead -> %{http_code}\n" \
  -X POST https://navilet.ru/api/lead \
  -H "Content-Type: application/json" \
  -H "Origin: https://navilet.ru" \
  -d '{}'

echo "==> ALL DONE"
