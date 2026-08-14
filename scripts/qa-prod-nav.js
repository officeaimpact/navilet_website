#!/usr/bin/env node
/**
 * Проверка навигации на живом сайте: меню открываются, ссылки ведут
 * на живые страницы, форма и звонок работают.
 *
 * Запуск: node scripts/qa-prod-nav.js [https://navilet.ru]
 */

const puppeteer = require("puppeteer-core");

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const BASE = process.argv[2] || "https://navilet.ru";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let pass = 0;
const fails = [];
const check = (name, cond, detail = "") => {
  if (cond) {
    pass++;
    console.log(`PASS  ${name}`);
  } else {
    fails.push(`${name}${detail ? " — " + detail : ""}`);
    console.log(`FAIL  ${name}${detail ? " — " + detail : ""}`);
  }
};

(async () => {
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: "new",
    args: ["--no-sandbox"],
  });
  const guard = setTimeout(() => {
    console.log("FAIL  прогон не уложился в 180 секунд");
    browser.close().finally(() => process.exit(1));
  }, 180_000);

  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(25000);
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(BASE + "/", { waitUntil: "domcontentloaded" });
  await sleep(2000);

  const top = await page.evaluate(() =>
    [...document.querySelectorAll("nav > div:nth-child(2) > *")].map((el) =>
      (el.innerText || "").trim()
    )
  );
  check("шапка: пять пунктов", top.length === 5, top.join(" | "));
  check(
    "шапка: Продукт, Возможности, Тарифы, Демо, Нам доверяют",
    ["Продукт", "Возможности", "Тарифы", "Демо", "Нам доверяют"].every((t) =>
      top.includes(t)
    ),
    top.join(" | ")
  );

  const collect = async (label) => {
    await page.hover(`button[aria-controls="nav-menu-${label}"]`);
    await sleep(500);
    return page.evaluate((l) => {
      const el = document.querySelector(`[data-nav-panel="${l}"]`);
      const s = getComputedStyle(el);
      return {
        visible: s.visibility === "visible" && parseFloat(s.opacity) > 0.5,
        links: [...el.querySelectorAll("a")].map((a) => a.getAttribute("href")),
      };
    }, l2(label));
  };
  // hover по id в нижнем регистре, а data-атрибут хранит подпись как есть
  function l2(label) {
    return label === "продукт" ? "Продукт" : "Возможности";
  }

  const product = await collect("продукт");
  check("меню «Продукт» открывается", product.visible);
  const features = await collect("возможности");
  check("меню «Возможности» открывается", features.visible);

  const all = [...new Set([...product.links, ...features.links])];
  // Шесть ссылок в «Продукте» и три в «Возможностях» — меню специально
  // разгрузили, страницы «кому подходит» живут в футере и карте сайта.
  check("в меню девять ссылок", all.length === 9, String(all.length));

  for (const href of all) {
    if (href.startsWith("/#")) continue;
    const res = await page.goto(BASE + href, { waitUntil: "domcontentloaded" });
    const title = await page.title();
    check(
      `страница живая: ${href}`,
      res.status() === 200 && title.length > 10,
      `${res.status()} · ${title.slice(0, 40)}`
    );
  }

  // Вход в кабинет
  await page.goto(BASE + "/", { waitUntil: "domcontentloaded" });
  await sleep(1500);
  const loginHref = await page.$$eval("header a", (as) => {
    const a = as.find((x) => /Войти/.test(x.innerText));
    return a ? a.href : null;
  });
  check("«Войти» ведёт в кабинет", loginHref === "https://lk.navilet.ru/", String(loginHref));

  // Форма подключения открывается из шапки
  await page.evaluate(() => {
    const b = [...document.querySelectorAll("header button")].find((x) =>
      /Подключить/.test(x.innerText)
    );
    b.click();
  });
  await sleep(1200);
  const modal = await page
    .$eval("[role=dialog]", (el) => el.innerText.slice(0, 60))
    .catch(() => "");
  check("форма подключения открывается", modal.length > 0, modal.replace(/\n/g, " "));

  clearTimeout(guard);
  await browser.close();
  console.log(`\n===== ПРОД: ${pass} PASS, ${fails.length} FAIL =====`);
  if (fails.length) {
    fails.forEach((f) => console.log(" - " + f));
    process.exit(1);
  }
})();
