const puppeteer = require("puppeteer-core");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const ok = [], bad = [];
const t = (c, n) => (c ? ok : bad).push(n);

const wText = (p) => p.evaluate(() => document.querySelector(".demo-widget")?.innerText || "");
const wBtns = (p) =>
  p.evaluate(() =>
    Array.from(document.querySelectorAll(".demo-widget button")).map((b) => ({
      text: b.innerText.trim(),
      title: b.getAttribute("title") || "",
    }))
  );
const clickIn = (p, src) =>
  p.evaluate((s) => {
    const rx = new RegExp(s, "i");
    const b = Array.from(document.querySelectorAll(".demo-widget button")).find(
      (x) => rx.test(x.innerText.trim()) || rx.test(x.getAttribute("title") || "")
    );
    if (!b) return false;
    b.click();
    return true;
  }, src);
const waitFor = async (p, re, sec = 30) => {
  for (let i = 0; i < sec; i++) {
    if (new RegExp(re, "i").test(await wText(p))) return true;
    await sleep(1000);
  }
  return false;
};

(async () => {
  const b = await puppeteer.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: "new", args: ["--no-sandbox"] });
  for (const [w, h, tag, mob] of [[1440, 950, "desktop", false], [390, 844, "mobile", true]]) {
    const p = await b.newPage();
    await p.setViewport({ width: w, height: h, isMobile: mob, hasTouch: mob, deviceScaleFactor: mob ? 2 : 1 });
    await p.goto("http://localhost:3000/", { waitUntil: "networkidle2", timeout: 60000 });
    await sleep(1200);
    await p.evaluate(() => { const x = Array.from(document.querySelectorAll("button")).find(e => /принять/i.test(e.innerText)); if (x) x.click(); });
    await p.evaluate(() => document.querySelector(".demo-widget")?.scrollIntoView({ block: "center" }));

    t(await waitFor(p, "Найдено \\d+ тура", 40), tag + ": карточки и счётчик туров появились");
    const btns = await wBtns(p);
    t(btns.some(x => /Смотреть подборку/i.test(x.text)), tag + ": кнопка «Смотреть подборку»");
    t(btns.some(x => /^Поделиться$/i.test(x.text)), tag + ": кнопка «Поделиться»");
    t(btns.some(x => /Убрать подсказки/i.test(x.title)), tag + ": переключатель подсказок в шапке");
    t(/Передать менеджеру/i.test(await wText(p)), tag + ": чипы-подсказки под карточками");
    await sleep(300);
    await p.screenshot({ path: "qa-shots/mock-cards-" + tag + ".png" });

    // «Поделиться» — состояние «Ссылка готова»
    t(await clickIn(p, "^Поделиться$"), tag + ": клик «Поделиться»");
    await sleep(400);
    t(/Ссылка готова/i.test(await wText(p)), tag + ": «Поделиться» подтверждает готовую ссылку");

    // Страница подборки
    await clickIn(p, "Смотреть подборку");
    await sleep(700);
    const txt = await wText(p);
    t(/Страница для клиента/i.test(txt) && /Подборка туров/i.test(txt) && /Забронировать/i.test(txt) && /7 дней/i.test(txt), tag + ": страница подборки — брендинг, заявка, срок ссылки");
    await p.screenshot({ path: "qa-shots/mock-collection-" + tag + ".png" });
    await clickIn(p, "Вернуться в диалог");
    await sleep(500);
    t(!/Страница для клиента/i.test(await wText(p)), tag + ": возврат в диалог");

    // Подсказки выключаются и включаются
    await clickIn(p, "Убрать подсказки");
    await sleep(400);
    t(!/Передать менеджеру/i.test(await wText(p)), tag + ": подсказки выключаются");
    await p.screenshot({ path: "qa-shots/mock-hints-off-" + tag + ".png" });
    t(await clickIn(p, "Показать подсказки"), tag + ": кнопка возврата подсказок доступна");

    // Передача менеджеру — с перезапуска сценария
    await clickIn(p, "Воспроизвести снова|Начать новый подбор");
    await sleep(800);
    if (await waitFor(p, "Передать менеджеру", 40)) {
      await clickIn(p, "Передать менеджеру");
      await sleep(900);
      const h = await wText(p);
      t(/Диалог завершён/i.test(h) && /Передал запрос менеджеру/i.test(h) && /Начать новый подбор/i.test(h), tag + ": передача менеджеру закрывает диалог и предлагает новый подбор");
      await p.screenshot({ path: "qa-shots/mock-handoff-" + tag + ".png" });
    } else {
      t(false, tag + ": чип «Передать менеджеру» не дождались после перезапуска");
    }

    const noScroll = await p.evaluate(() => { document.documentElement.scrollLeft = 9999; const s = document.documentElement.scrollLeft || document.body.scrollLeft; document.documentElement.scrollLeft = 0; return s === 0; });
    t(noScroll, tag + ": нет горизонтальной прокрутки страницы");
    await p.close();
  }
  await b.close();
  console.log("OK " + ok.length); ok.forEach(x => console.log("  + " + x));
  if (bad.length) { console.log("ПРОВАЛЫ " + bad.length); bad.forEach(x => console.log("  - " + x)); process.exit(1); }
})();
