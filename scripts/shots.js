/**
 * Скриншоты правок для визуальной проверки.
 * Запуск: node scripts/shots.js (нужен статический сервер на 127.0.0.1:8099)
 */
const puppeteer = require("puppeteer-core");
const fs = require("fs");

const BASE = "http://127.0.0.1:8099";
const OUT = "/tmp/shots";
const CHROME =
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** Шаги: [файл, url, ширина, скролл, действие] */
const MOBILE = [
  ["versii-hero", "/versii.html", 0],
  ["demo-hero", "/demo.html", 0],
  ["demo-brand", "/demo.html", "brand"],
  ["podborki-hero", "/podborki.html", 0],
  ["home-features", "/", "features"],
  ["home-partners", "/", "partners"],
  ["home-events", "/", "events"],
];

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: "new",
    args: ["--no-sandbox", "--hide-scrollbars"],
  });

  // Мобайл 390px
  for (const [name, url, target] of MOBILE) {
    const page = await browser.newPage();
    await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
    await page.goto(BASE + url, { waitUntil: "domcontentloaded" });
    await sleep(1800);
    // закрываем cookie-баннер, если есть
    await page.evaluate(() => {
      const b = [...document.querySelectorAll("button")].find((x) =>
        /Принять/i.test(x.textContent || "")
      );
      if (b) b.click();
    });
    if (typeof target === "string") {
      await page.evaluate((sel) => {
        const map = {
          features: "#features",
          partners: "#partners",
          events: "#events",
          brand: "h2",
        };
        if (sel === "brand") {
          const h = [...document.querySelectorAll("h2")].find((x) =>
            /под вашим брендом/i.test(x.textContent || "")
          );
          if (h) h.scrollIntoView({ block: "start" });
          return;
        }
        const el = document.querySelector(map[sel]);
        if (el) el.scrollIntoView({ block: "start" });
      }, target);
      await sleep(1200);
    }
    await page.screenshot({ path: `${OUT}/m-${name}.png` });
    await page.close();
  }

  // Десктоп: выпадающие меню
  for (const label of ["Продукт", "Возможности"]) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
    await page.goto(BASE + "/", { waitUntil: "domcontentloaded" });
    await sleep(1500);
    const btn = await page.evaluateHandle((l) => {
      return [...document.querySelectorAll("nav button")].find(
        (b) => (b.textContent || "").trim() === l
      );
    }, label);
    const el = btn.asElement();
    if (el) {
      await el.hover();
      await sleep(600);
    }
    await page.screenshot({
      path: `${OUT}/d-menu-${label === "Продукт" ? "product" : "features"}.png`,
      clip: { x: 0, y: 0, width: 1440, height: 460 },
    });
    await page.close();
  }

  await browser.close();
  console.log("готово:", OUT);
}

main();
