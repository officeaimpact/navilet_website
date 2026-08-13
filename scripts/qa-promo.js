#!/usr/bin/env node
/**
 * Быстрая проверка промо-плашки и формы-развилки.
 * Нужна, чтобы после смены текста акции не гонять весь мобильный аудит.
 *
 * Запуск: node scripts/qa-promo.js (сайт должен отдаваться на :8099)
 */

const puppeteer = require("puppeteer-core");

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const BASE = "http://127.0.0.1:8099";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let fails = 0;
const check = (name, cond, detail = "") => {
  console.log(`${cond ? "PASS" : "FAIL"}  ${name}${detail ? " — " + detail : ""}`);
  if (!cond) fails++;
};

(async () => {
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: "new",
    args: ["--no-sandbox"],
  });
  // Страховка от подвисшего прогона: процесс не должен жить дольше двух минут
  const guard = setTimeout(() => {
    console.log("FAIL  прогон не уложился в 120 секунд");
    browser.close().finally(() => process.exit(1));
  }, 120_000);

  const page = await browser.newPage();
  const text = (sel) =>
    page.$eval(sel, (el) => el.innerText.replace(/\s+/g, " ").trim()).catch(() => "");

  for (const w of [375, 1280]) {
    await page.setViewport({ width: w, height: 850, isMobile: w < 700, hasTouch: w < 700 });
    await page.goto(BASE + "/", { waitUntil: "networkidle2" });
    await sleep(1200);

    const banner = await text("[data-slim-bar=promo]");
    check(`${w} плашка видна`, banner.length > 0, banner);
    check(`${w} плашка без даты`, !/август|сентябр|осталось|дн(ей|я|ь)/i.test(banner), banner);
    check(`${w} плашка про бесплатный месяц`, /месяц бесплатно/i.test(banner), banner);
  }

  await page.click("[data-slim-bar=promo] button");
  await sleep(900);
  const modal = await text("[role=dialog]");
  check("форма открывается из плашки", modal.length > 0);
  check(
    "в форме нет устаревшего дедлайна",
    !/до 15 август/i.test(modal),
    modal.slice(0, 80)
  );
  check(
    "в форме сказано про лимит диалогов",
    /200 диалог/i.test(modal),
    modal.slice(0, 120)
  );

  await page.goto(BASE + "/tarify.html", { waitUntil: "networkidle2" });
  await sleep(1200);
  const promoStrip = await page.evaluate(() => {
    const el = [...document.querySelectorAll("p")].find((e) =>
      /месяц бесплатно/i.test(e.textContent || "")
    );
    return el ? el.innerText.replace(/\s+/g, " ").trim() : "";
  });
  check("на тарифах промо-полоса без даты", promoStrip && !/август/i.test(promoStrip), promoStrip);

  clearTimeout(guard);
  await browser.close();
  console.log(fails === 0 ? "\nВСЁ ЗЕЛЁНОЕ" : `\nПРОВАЛОВ: ${fails}`);
  process.exit(fails === 0 ? 0 : 1);
})();
