#!/usr/bin/env bash
set -euo pipefail

# IndexNow — мгновенное уведомление поисковиков о новых и обновлённых страницах.
# Протокол поддерживают Bing (его индекс питает поиск ChatGPT и Copilot),
# Яндекс, Seznam и Naver. Обычный переобход занимает 2–14 дней, IndexNow
# сокращает это до часов.
#
# Ключ подтверждается файлом public/<KEY>.txt, который после сборки лежит
# по адресу https://navilet.ru/<KEY>.txt — без него запросы отклоняются.
#
# Запуск: bash scripts/indexnow.sh              — все адреса из sitemap
#         bash scripts/indexnow.sh /versii /tarify — только указанные

HOST="navilet.ru"
KEY="9bdb375fc3d59c5408dc5206a2e116a2"
SITEMAP="https://${HOST}/sitemap.xml"

if [ "$#" -gt 0 ]; then
  urls=$(printf "https://%s%s\n" "$HOST" "$@")
else
  echo "==> читаю адреса из ${SITEMAP}"
  urls=$(curl -fsS "$SITEMAP" | grep -oE '<loc>[^<]+</loc>' | sed -E 's#</?loc>##g')
fi

count=$(printf '%s\n' "$urls" | grep -c . || true)
if [ "$count" -eq 0 ]; then
  echo "IndexNow: не нашёл ни одного адреса — прерываю" >&2
  exit 1
fi

payload=$(printf '%s\n' "$urls" | awk -v host="$HOST" -v key="$KEY" '
  BEGIN {
    printf "{\"host\":\"%s\",\"key\":\"%s\",", host, key
    printf "\"keyLocation\":\"https://%s/%s.txt\",\"urlList\":[", host, key
  }
  NF { printf "%s\"%s\"", (n++ ? "," : ""), $0 }
  END { print "]}" }
')

# Проверяем, что ключ реально отдаётся сайтом: иначе оба эндпоинта вернут 403.
key_code=$(curl -s -o /dev/null -w '%{http_code}' "https://${HOST}/${KEY}.txt")
echo "==> ключ https://${HOST}/${KEY}.txt -> ${key_code}"

for endpoint in "https://api.indexnow.org/indexnow" "https://yandex.com/indexnow"; do
  code=$(curl -s -o /dev/null -w '%{http_code}' -X POST "$endpoint" \
    -H 'Content-Type: application/json; charset=utf-8' \
    --data-binary "$payload")
  echo "==> ${endpoint} -> ${code} (адресов: ${count})"
done

echo "==> 200 или 202 означают, что заявка принята"
