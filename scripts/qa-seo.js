#!/usr/bin/env node
/**
 * Проверка SEO-разметки по собранной статике (папка out).
 *
 * Что проверяем:
 *  - каждый JSON-LD парсится и не содержит невидимых символов в ценах;
 *  - у Offer/AggregateOffer есть цена и валюта, цена — чистое число;
 *  - FAQPage не пустой, у каждого вопроса есть непустой ответ;
 *  - на каждой странице есть title, description, canonical и BreadcrumbList;
 *  - title и description уникальны между страницами;
 *  - в тексте не осталось устаревших формулировок (7 дней триала,
 *    «ИИ-турменеджер», цена входа 1 990 ₽);
 *  - технические файлы для поисковиков и ИИ-краулеров попали в сборку.
 *
 * Запуск: node scripts/qa-seo.js
 */

const fs = require("fs");
const path = require("path");

const OUT = path.join(__dirname, "..", "out");
let pass = 0;
const fails = [];
const warns = [];

const ok = (name) => {
  pass += 1;
  console.log(`  ok   ${name}`);
};
const fail = (name, detail) => {
  fails.push(`${name}${detail ? ` — ${detail}` : ""}`);
  console.log(`  FAIL ${name}${detail ? ` — ${detail}` : ""}`);
};
const warn = (name, detail) => {
  warns.push(`${name}${detail ? ` — ${detail}` : ""}`);
  console.log(`  warn ${name}${detail ? ` — ${detail}` : ""}`);
};

function htmlFiles(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "_next") continue;
      htmlFiles(full, acc);
    } else if (entry.name.endsWith(".html")) {
      acc.push(full);
    }
  }
  return acc;
}

const decode = (s) =>
  s
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, "\u00A0");

const pick = (html, re) => {
  const m = html.match(re);
  return m ? decode(m[1]).trim() : null;
};

/** Рекурсивный обход графа схем */
function walk(node, visit) {
  if (Array.isArray(node)) return node.forEach((n) => walk(n, visit));
  if (node && typeof node === "object") {
    visit(node);
    Object.values(node).forEach((v) => walk(v, visit));
  }
}

const files = htmlFiles(OUT).sort();
console.log(`\n=== JSON-LD и метаданные (${files.length} страниц) ===`);

const titles = new Map();
const descriptions = new Map();
let offersChecked = 0;
let faqChecked = 0;
let breadcrumbMissing = [];
let priceProblems = [];
let schemaBroken = [];
let metaProblems = [];

for (const file of files) {
  const rel = "/" + path.relative(OUT, file).replace(/\\/g, "/");
  const html = fs.readFileSync(file, "utf8");

  // Служебные файлы: 404 и подтверждения прав в вебмастерах —
  // это не страницы сайта, метаданные им не нужны.
  if (
    rel === "/404.html" ||
    rel === "/_not-found.html" ||
    /^\/yandex_[0-9a-f]+\.html$/.test(rel) ||
    /^\/google[0-9a-f]+\.html$/.test(rel)
  )
    continue;

  const title = pick(html, /<title>([^<]*)<\/title>/);
  const description = pick(
    html,
    /<meta name="description" content="([^"]*)"/
  );
  const canonical = pick(html, /<link rel="canonical" href="([^"]*)"/);

  if (!title) metaProblems.push(`${rel}: нет title`);
  if (!description) metaProblems.push(`${rel}: нет description`);
  if (!canonical) metaProblems.push(`${rel}: нет canonical`);
  if (title && title.length > 75)
    warn(`${rel}: title ${title.length} символов`, title.slice(0, 60) + "…");
  if (description && (description.length < 70 || description.length > 320))
    warn(`${rel}: description ${description.length} символов`);

  if (title) {
    if (titles.has(title)) titles.get(title).push(rel);
    else titles.set(title, [rel]);
  }
  if (description) {
    if (descriptions.has(description)) descriptions.get(description).push(rel);
    else descriptions.set(description, [rel]);
  }

  const blocks = [
    ...html.matchAll(
      /<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g
    ),
  ].map((m) => m[1]);

  let hasBreadcrumb = false;

  for (const raw of blocks) {
    let data;
    try {
      data = JSON.parse(decode(raw));
    } catch (e) {
      schemaBroken.push(`${rel}: ${e.message}`);
      continue;
    }

    walk(data, (node) => {
      const type = node["@type"];
      if (!type) return;
      const types = Array.isArray(type) ? type : [type];

      if (types.includes("BreadcrumbList")) hasBreadcrumb = true;

      if (types.includes("Offer") || types.includes("AggregateOffer")) {
        offersChecked += 1;
        const price = node.price ?? node.lowPrice;
        if (price === undefined)
          priceProblems.push(`${rel}: ${types[0]} без price/lowPrice`);
        if (!node.priceCurrency)
          priceProblems.push(`${rel}: ${types[0]} без priceCurrency`);
        for (const key of ["price", "lowPrice", "highPrice"]) {
          const v = node[key];
          if (v === undefined) continue;
          const s = String(v);
          if (!/^\d+(\.\d+)?$/.test(s))
            priceProblems.push(
              `${rel}: ${key}="${s}" не чистое число (пробелы, ₽ или NBSP)`
            );
        }
      }

      if (types.includes("FAQPage")) {
        faqChecked += 1;
        const list = node.mainEntity;
        if (!Array.isArray(list) || list.length === 0) {
          priceProblems.push(`${rel}: FAQPage без вопросов`);
          return;
        }
        for (const q of list) {
          if (!q.name || !q.acceptedAnswer?.text)
            priceProblems.push(`${rel}: вопрос без текста ответа`);
        }
      }
    });
  }

  if (blocks.length === 0) {
    metaProblems.push(`${rel}: нет ни одного JSON-LD`);
  } else if (!hasBreadcrumb && rel !== "/index.html") {
    breadcrumbMissing.push(rel);
  }
}

if (schemaBroken.length === 0) ok(`все JSON-LD парсятся (${files.length} страниц)`);
else fail("невалидный JSON-LD", schemaBroken.slice(0, 5).join("; "));

if (priceProblems.length === 0)
  ok(`цены и FAQ в разметке корректны (${offersChecked} офферов, ${faqChecked} FAQPage)`);
else fail("проблемы в разметке", priceProblems.slice(0, 6).join("; "));

if (metaProblems.length === 0) ok("у всех страниц есть title, description, canonical и схемы");
else fail("метаданные", metaProblems.slice(0, 6).join("; "));

if (breadcrumbMissing.length === 0) ok("BreadcrumbList есть на всех внутренних страницах");
else warn("нет BreadcrumbList", breadcrumbMissing.join(", "));

const dupTitles = [...titles.entries()].filter(([, v]) => v.length > 1);
if (dupTitles.length === 0) ok("все title уникальны");
else
  fail(
    "дубли title",
    dupTitles.map(([t, v]) => `"${t.slice(0, 40)}…" → ${v.join(", ")}`).join("; ")
  );

const dupDesc = [...descriptions.entries()].filter(([, v]) => v.length > 1);
if (dupDesc.length === 0) ok("все description уникальны");
else
  fail(
    "дубли description",
    dupDesc.map(([, v]) => v.join(" = ")).join("; ")
  );

console.log("\n=== Устаревшие формулировки ===");
const stale = [
  { re: /ИИ-турменеджер/g, label: "«ИИ-турменеджер» (должно быть «ИИ-ассистент»)" },
  { re: /7\s*дней\s*(?:—\s*)?бесплатно/g, label: "старый триал «7 дней бесплатно»" },
  { re: /первые\s*7\s*дней/gi, label: "старый триал «первые 7 дней»" },
  // Инсталляция как платная услуга: «инсталляция 1 000 ₽», строка таблицы
  // или ячейка с ценой. Простое упоминание слова допустимо — на странице
  // про стоимость мы объясняем, что разовых платежей у нас нет.
  {
    re: /инсталляц[а-я]*\s*[—:|]?\s*\d[\d\s\u00A0]*₽/gi,
    label: "инсталляция с ценой (услуга удалена из продукта)",
  },
];
for (const { re, label } of stale) {
  const hits = [];
  for (const file of files) {
    const rel = "/" + path.relative(OUT, file).replace(/\\/g, "/");
    if (rel === "/_not-found.html" || rel === "/404.html") continue;
    const html = fs.readFileSync(file, "utf8");
    // Считаем только видимый текст: скрипты Next содержат сериализованные данные
    const text = html.replace(/<script[\s\S]*?<\/script>/g, "");
    if (re.test(text)) hits.push("/" + path.relative(OUT, file));
    re.lastIndex = 0;
  }
  if (hits.length === 0) ok(`нет: ${label}`);
  else fail(`найдено: ${label}`, hits.slice(0, 5).join(", "));
}

console.log("\n=== Файлы для поисковиков и ИИ-краулеров ===");
const required = [
  "robots.txt",
  "sitemap.xml",
  "llms.txt",
  "llms-full.txt",
  "9bdb375fc3d59c5408dc5206a2e116a2.txt",
];
for (const f of required) {
  const p = path.join(OUT, f);
  if (fs.existsSync(p) && fs.statSync(p).size > 0) ok(`${f} (${fs.statSync(p).size} Б)`);
  else fail(`${f} отсутствует в сборке`);
}

const robots = fs.readFileSync(path.join(OUT, "robots.txt"), "utf8");
for (const agent of [
  "YandexAdditional",
  "YandexAdditionalBot",
  "OAI-SearchBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "CCBot",
  "Bingbot",
]) {
  if (new RegExp(`User-agent:\\s*${agent}\\b`).test(robots))
    ok(`robots.txt: ${agent}`);
  else fail(`robots.txt: нет правила для ${agent}`);
}

const sitemap = fs.readFileSync(path.join(OUT, "sitemap.xml"), "utf8");
for (const url of ["/skolko-stoit", "/versii", "/podborki", "/vozvrat-klientov"]) {
  if (sitemap.includes(`https://navilet.ru${url}`)) ok(`sitemap: ${url}`);
  else fail(`sitemap: нет ${url}`);
}
const lastmods = [...sitemap.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)].map(
  (m) => m[1].slice(0, 10)
);
const uniqueLastmods = new Set(lastmods);
if (uniqueLastmods.size > 1)
  ok(`sitemap: даты правок различаются (${uniqueLastmods.size} разных)`);
else fail("sitemap: у всех страниц одна и та же дата lastmod");

console.log(
  `\n=== Итог: ${pass} ok, ${fails.length} fail, ${warns.length} warn ===`
);
if (fails.length) {
  console.log("\nОшибки:");
  fails.forEach((f) => console.log(" - " + f));
  process.exit(1);
}
