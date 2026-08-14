#!/usr/bin/env node
/**
 * Проверка верхней навигации: выпадающие меню на десктопе,
 * аккордеон в мобильном, живые ссылки и отсутствие поломок вёрстки.
 *
 * Запуск: node scripts/qa-nav.js (собранный сайт должен отдаваться на :8099)
 */

const puppeteer = require("puppeteer-core");

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const BASE = "http://127.0.0.1:8099";
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

/** Видимость панели меню: закрытая скрыта через visibility. */
const panelState = (page, label) =>
  page.evaluate((l) => {
    const el = document.querySelector(`[data-nav-panel="${l}"]`);
    if (!el) return null;
    const s = getComputedStyle(el);
    const links = [...el.querySelectorAll("a")].map((a) => ({
      text: a.innerText.split("\n")[0].trim(),
      href: a.getAttribute("href"),
    }));
    const r = el.getBoundingClientRect();
    return {
      visible: s.visibility === "visible" && parseFloat(s.opacity) > 0.5,
      links,
      left: Math.round(r.left),
      right: Math.round(r.right),
      width: Math.round(r.width),
    };
  }, label);

(async () => {
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: "new",
    args: ["--no-sandbox"],
  });
  const guard = setTimeout(() => {
    console.log("FAIL  прогон не уложился в 150 секунд");
    browser.close().finally(() => process.exit(1));
  }, 150_000);

  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(20000);

  /* ─── Десктоп ─────────────────────────────────────────────── */
  for (const w of [1024, 1280, 1440]) {
    await page.setViewport({ width: w, height: 900 });
    await page.goto(BASE + "/", { waitUntil: "networkidle2" });
    await sleep(800);

    const top = await page.evaluate(() =>
      [...document.querySelectorAll("nav > div:nth-child(2) > *")].map((el) =>
        (el.innerText || "").trim()
      )
    );
    check(
      `${w} в шапке ровно пять пунктов`,
      top.length === 5,
      top.join(" | ")
    );
    check(
      `${w} состав: Продукт, Возможности, Тарифы, Демо, Нам доверяют`,
      ["Продукт", "Возможности", "Тарифы", "Демо", "Нам доверяют"].every((t) =>
        top.some((x) => x === t)
      ),
      top.join(" | ")
    );
    check(
      `${w} «Контакты» из шапки убраны`,
      !top.some((t) => /Контакты/.test(t))
    );

    // Пять пунктов на 1024px не должны прижиматься к логотипу и кнопкам
    const room = await page.evaluate(() => {
      const nav = document.querySelector("nav[data-nav-root]");
      const logo = nav.querySelector("a img").getBoundingClientRect();
      const center = nav.children[1].getBoundingClientRect();
      const right = nav.children[2].getBoundingClientRect();
      return {
        left: Math.round(center.left - logo.right),
        right: Math.round(right.left - center.right),
      };
    });
    check(
      `${w} шапка дышит: зазоры от 32px`,
      room.left >= 32 && room.right >= 32,
      `слева ${room.left}px, справа ${room.right}px`
    );

    const closed = await panelState(page, "Продукт");
    check(`${w} меню закрыто по умолчанию`, closed && !closed.visible);

    // Наведение открывает
    await page.hover('button[aria-controls="nav-menu-продукт"]');
    await sleep(400);
    const opened = await panelState(page, "Продукт");
    check(`${w} наведение открывает «Продукт»`, opened && opened.visible);
    check(
      `${w} панель не выходит за экран`,
      opened && opened.left >= 0 && opened.right <= w,
      opened ? `${opened.left}…${opened.right} из ${w}` : ""
    );
    check(
      `${w} в «Продукте» шесть ссылок`,
      opened && opened.links.length === 6,
      opened ? String(opened.links.length) : ""
    );

    // Второе меню перехватывает открытие
    await page.hover('button[aria-controls="nav-menu-возможности"]');
    await sleep(400);
    const first = await panelState(page, "Продукт");
    const second = await panelState(page, "Возможности");
    check(`${w} переход на «Возможности» закрывает «Продукт»`, first && !first.visible);
    check(`${w} «Возможности» открылись`, second && second.visible);
    check(
      `${w} в «Возможностях» три ссылки`,
      second && second.links.length === 3,
      second ? String(second.links.length) : ""
    );

    // Уход курсора закрывает
    await page.mouse.move(w / 2, 700);
    await sleep(500);
    const afterLeave = await panelState(page, "Возможности");
    check(`${w} уход курсора закрывает меню`, afterLeave && !afterLeave.visible);

    // Клавиатура: фокус + Enter открывает (мышь при этом в стороне)
    await page.focus('button[aria-controls="nav-menu-продукт"]');
    await page.keyboard.press("Enter");
    await sleep(350);
    const byKey = await panelState(page, "Продукт");
    check(`${w} Enter с клавиатуры открывает меню`, byKey && byKey.visible);
    const aria = await page.$eval(
      'button[aria-controls="nav-menu-продукт"]',
      (b) => b.getAttribute("aria-expanded")
    );
    check(`${w} aria-expanded=true при открытии`, aria === "true", String(aria));
    await page.keyboard.press("Escape");
    await sleep(300);
    const afterEsc = await panelState(page, "Продукт");
    check(`${w} Escape закрывает меню`, afterEsc && !afterEsc.visible);

    // Скрытое меню не ловит Tab
    const tabbable = await page.evaluate(() => {
      const el = document.querySelector('[data-nav-panel="Продукт"]');
      const a = el.querySelector("a");
      return a.getBoundingClientRect().width > 0 && getComputedStyle(el).visibility === "visible";
    });
    check(`${w} закрытое меню не участвует в обходе Tab`, tabbable === false);

    check(
      `${w} «Войти» ведёт в кабинет`,
      await page.$$eval("header a", (as) =>
        as.some((a) => /Войти/.test(a.innerText) && /lk\.navilet\.ru/.test(a.href))
      )
    );

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth + 1
    );
    check(`${w} горизонтального скролла нет`, !overflow);
  }

  /* ─── Переходы по ссылкам меню ────────────────────────────── */
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(BASE + "/", { waitUntil: "networkidle2" });
  await sleep(600);
  await page.hover('button[aria-controls="nav-menu-возможности"]');
  await sleep(400);
  const hrefs = (await panelState(page, "Возможности")).links.map((l) => l.href);
  for (const href of hrefs) {
    if (href.startsWith("/#")) continue;
    const url = BASE + (href === "/" ? "/" : href + ".html");
    const res = await page.goto(url, { waitUntil: "domcontentloaded" });
    check(`ссылка меню открывается: ${href}`, res.status() === 200, String(res.status()));
  }

  /* ─── «Нам доверяют» ведёт к блоку партнёров и мероприятий ── */
  await page.goto(BASE + "/", { waitUntil: "networkidle2" });
  await sleep(700);
  await page.evaluate(() => {
    const a = [...document.querySelectorAll("nav > div:nth-child(2) a")].find(
      (x) => x.innerText.trim() === "Нам доверяют"
    );
    a.click();
  });
  await sleep(1800);
  const anchor = await page.evaluate(() => {
    const s = document.getElementById("partners");
    if (!s) return null;
    const r = s.getBoundingClientRect();
    const header = document.querySelector("header").getBoundingClientRect();
    const text = (s.innerText || "").replace(/\s+/g, " ");
    return {
      top: Math.round(r.top),
      headerBottom: Math.round(header.bottom),
      hasPartners: /Партнёры и мероприятия/i.test(text),
      hasEvents: /отраслевых событиях/i.test(text),
      hasSkolkovo: /Сколково/i.test(text),
    };
  });
  check("«Нам доверяют» доскроллил до блока", anchor && Math.abs(anchor.top) < 120, anchor ? `top=${anchor.top}` : "нет секции");
  check(
    "заголовок блока не спрятан под шапкой",
    anchor && anchor.top >= anchor.headerBottom - 8,
    anchor ? `top=${anchor.top}, шапка до ${anchor.headerBottom}` : ""
  );
  check("в блоке есть и партнёры, и мероприятия, и Сколково", anchor && anchor.hasPartners && anchor.hasEvents && anchor.hasSkolkovo,
    anchor ? `партнёры:${anchor.hasPartners} события:${anchor.hasEvents} Сколково:${anchor.hasSkolkovo}` : "");

  /* ─── Мобильный аккордеон ─────────────────────────────────── */
  for (const w of [320, 375]) {
    await page.setViewport({
      width: w,
      height: 812,
      isMobile: true,
      hasTouch: true,
    });
    await page.goto(BASE + "/", { waitUntil: "domcontentloaded" });
    await sleep(1600);

    await page.click('button[aria-label="Открыть меню"]');
    await sleep(600);

    const rows = await page.evaluate(() =>
      [...document.querySelectorAll("[data-mobile-menu] button")]
        .filter((b) => /^(Продукт|Возможности)$/.test(b.innerText.trim()))
        .map((b) => b.innerText.trim())
    );
    check(`${w} в бургере есть оба раздела`, rows.length === 2, rows.join(", "));

    const trustRow = await page.evaluate(() => {
      const a = [...document.querySelectorAll("[data-mobile-menu] a")].find(
        (x) => x.innerText.trim() === "Нам доверяют"
      );
      if (!a) return null;
      const r = a.getBoundingClientRect();
      return { href: a.getAttribute("href"), h: Math.round(r.height) };
    });
    check(
      `${w} в бургере есть «Нам доверяют» на /#partners`,
      trustRow && trustRow.href === "/#partners" && trustRow.h >= 44,
      trustRow ? `${trustRow.href}, ${trustRow.h}px` : "нет пункта"
    );

    // Раскрываем «Продукт»
    const opened = await page.evaluate(() => {
      const b = [...document.querySelectorAll("[data-mobile-menu] button")].find(
        (x) => x.innerText.trim() === "Продукт"
      );
      if (!b) return false;
      b.click();
      return true;
    });
    check(`${w} раздел «Продукт» кликается`, opened);
    await sleep(500);

    const sub = await page.evaluate(() => {
      const links = [...document.querySelectorAll("[data-mobile-menu] a")].filter(
        (a) =>
          a.offsetParent &&
          ["/versii", "/dashboard", "/prognozy", "/vidzhet", "/start", "/skolko-stoit"].includes(
            a.getAttribute("href")
          )
      );
      return links.map((a) => ({
        href: a.getAttribute("href"),
        h: Math.round(a.getBoundingClientRect().height),
        w: Math.round(a.getBoundingClientRect().width),
        right: Math.round(a.getBoundingClientRect().right),
      }));
    });
    check(`${w} подпункты раскрылись`, sub.length >= 5, `${sub.length} шт.`);
    check(
      `${w} тап-зоны подпунктов от 40px`,
      sub.every((s) => s.h >= 40),
      sub.map((s) => `${s.href}:${s.h}`).join(" ")
    );
    check(
      `${w} подпункты не вылезают за экран`,
      sub.every((s) => s.right <= w + 1),
      sub.map((s) => `${s.href}:${s.right}`).join(" ")
    );

    const noScroll = await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth + 1
    );
    check(`${w} меню не вызывает горизонтальный скролл`, noScroll);

    // Переход по подпункту закрывает меню
    await page.evaluate(() => {
      const a = [...document.querySelectorAll("[data-mobile-menu] a")].find(
        (x) => x.offsetParent && x.getAttribute("href") === "/versii"
      );
      a.click();
    });
    await sleep(1200);
    check(
      `${w} клик по подпункту уводит на страницу`,
      page.url().includes("versii"),
      page.url()
    );
  }

  clearTimeout(guard);
  await browser.close();
  console.log(`\n===== ИТОГО: ${pass} PASS, ${fails.length} FAIL =====`);
  if (fails.length) {
    fails.forEach((f) => console.log(" - " + f));
    process.exit(1);
  }
})();
