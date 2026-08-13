const puppeteer = require("puppeteer-core");
const fs = require("fs");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const answers = ["в начале сентября", "двое взрослых, без детей", "любые отели 4-5 звёзд, первая линия не обязательна", "да, покажи варианты", "да"];
(async () => {
  const b = await puppeteer.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: "new", args: ["--no-sandbox"] });
  const p = await b.newPage();
  await p.setViewport({ width: 1280, height: 950 });
  await p.goto("https://navilet.ru/demo", { waitUntil: "networkidle2", timeout: 90000 });
  await sleep(4000);
  await p.evaluate(() => { const x = Array.from(document.querySelectorAll("button")).find(e => /Открыть чат/i.test(e.innerText)); if (x) x.click(); });
  await sleep(7000);
  const frame = p.frames().find(f => f.url().includes("/widget/embed"));
  if (!frame) { console.log("НЕТ IFRAME"); await b.close(); return; }
  const send = (txt) => frame.evaluate((t) => {
    const i = document.getElementById("chatInput");
    i.value = t; i.dispatchEvent(new Event("input", { bubbles: true }));
    document.getElementById("chatForm").dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
  }, txt);
  const state = () => frame.evaluate(() => ({
    cards: document.querySelectorAll(".tour-card").length,
    msgs: document.querySelectorAll("#chatMessages > *").length,
    quick: Array.from(document.querySelectorAll(".quick-reply")).map(e => e.innerText),
    coll: Array.from(document.querySelectorAll("[id*=collection],[class*=collection]")).map(e => (e.innerText || "").trim() || e.className),
    last: (document.getElementById("chatMessages")?.innerText || "").slice(-180).replace(/\n+/g, " | "),
  }));
  await send("Турция из Москвы, 7 ночей в начале сентября, всё включено, двое взрослых, до 250 000 ₽");
  let qi = 0, cards = 0, prevMsgs = 0, idle = 0;
  for (let step = 0; step < 60; step++) {
    await sleep(6000);
    const st = await state();
    console.log(step * 6 + "s", JSON.stringify(st).slice(0, 300));
    cards = st.cards;
    if (cards > 0) break;
    if (st.msgs === prevMsgs) idle++; else { idle = 0; prevMsgs = st.msgs; }
    if (idle >= 2 && qi < answers.length) { console.log(">>> отвечаю:", answers[qi]); await send(answers[qi++]); idle = 0; }
  }
  await sleep(2500);
  await p.screenshot({ path: "qa-shots/prod-widget-cards.png" });
  fs.writeFileSync("/tmp/prod-cards.html", await frame.evaluate(() => document.getElementById("chatMessages")?.innerHTML.slice(-14000) || ""));
  console.log("карточек:", cards);
  if (cards > 0) {
    const info = await frame.evaluate(() => {
      const btns = Array.from(document.querySelectorAll("button, a")).filter(e => /подборк/i.test(e.innerText));
      return btns.map(e => ({ txt: e.innerText.trim(), id: e.id, cls: e.className }));
    });
    console.log("кнопки подборки:", JSON.stringify(info));
    const url = await frame.evaluate(async () => {
      const btn = Array.from(document.querySelectorAll("button, a")).find(e => /смотреть подборку/i.test(e.innerText));
      if (!btn) return null;
      let captured = null; const orig = window.open;
      window.open = (u) => { captured = u; return { focus() {} } };
      btn.click();
      await new Promise(r => setTimeout(r, 8000));
      window.open = orig;
      return captured;
    });
    console.log("ссылка подборки:", url);
    if (url && /^https?:/.test(url)) {
      const cp = await b.newPage();
      await cp.setViewport({ width: 1280, height: 950 });
      await cp.goto(url, { waitUntil: "networkidle2", timeout: 90000 });
      await sleep(4000);
      await cp.screenshot({ path: "qa-shots/prod-collection-desktop.png" });
      fs.writeFileSync("/tmp/prod-collection.html", await cp.content());
      await cp.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
      await cp.reload({ waitUntil: "networkidle2" }); await sleep(3500);
      await cp.screenshot({ path: "qa-shots/prod-collection-mobile.png" });
      console.log("подборка снята:", url);
    }
  }
  await b.close();
})();
