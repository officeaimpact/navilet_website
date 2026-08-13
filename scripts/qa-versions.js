/* eslint-disable */
// Локальная QA-проверка версий «Лид»/«Про»: главная, /versii, /tarify, /demo,
// /vozvrat-klientov + мобильные вьюпорты. Запуск: node scripts/qa-versions.js
const puppeteer = require("puppeteer-core");
const fs = require("fs");
const path = require("path");

const BASE = "http://127.0.0.1:8099";
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const SHOT_DIR = path.join(__dirname, "..", "qa-shots");

const results = [];
function check(name, ok, detail = "") {
  results.push({ name, ok, detail });
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? " — " + detail : ""}`);
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const shot = (page, name, full = false) =>
  page.screenshot({ path: path.join(SHOT_DIR, `${name}.png`), fullPage: full });

/** Текст модалки формы (без учёта регистра — часть чипов в uppercase). */
const modalText = (page) =>
  page.evaluate(() =>
    (document.querySelector('[role="dialog"]')?.innerText || "").toLowerCase()
  );

/** Реальная возможность горизонтального скролла (то, что чувствует пользователь). */
const canScrollX = (page) =>
  page.evaluate(() => {
    const se = document.scrollingElement;
    se.scrollLeft = 999;
    const moved = se.scrollLeft;
    se.scrollLeft = 0;
    return moved;
  });

/** Элементы, вылезающие за правый край вьюпорта (без клипящих родителей). */
const clippedOverflow = (page) =>
  page.evaluate(() => {
    const vw = document.documentElement.clientWidth;
    const bad = [];
    document.querySelectorAll("body *").forEach((el) => {
      const st = getComputedStyle(el);
      if (st.position === "fixed" || st.visibility === "hidden") return;
      let n = el.parentElement,
        clipped = false;
      while (n) {
        const s = getComputedStyle(n);
        if (/(auto|scroll|hidden|clip)/.test(s.overflowX)) {
          clipped = true;
          break;
        }
        n = n.parentElement;
      }
      if (clipped) return;
      const r = el.getBoundingClientRect();
      if (r.width > 0 && r.right > vw + 2)
        bad.push(
          el.tagName +
            "[" +
            (typeof el.className === "string" ? el.className.slice(0, 40) : "") +
            "] right=" +
            Math.round(r.right)
        );
    });
    return bad.slice(0, 3);
  });

async function openPage(page, route, wait = 700) {
  await page.goto(`${BASE}${route}`, { waitUntil: "networkidle2", timeout: 30000 });
  await page.evaluate(() => document.fonts.ready);
  await sleep(wait);
}

/** Закрыть cookie-плашку, чтобы не мешала кликам и скриншотам. */
async function dismissCookies(page) {
  await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll("button")).find((b) =>
      /принять/i.test(b.innerText)
    );
    if (btn) btn.click();
  });
  await sleep(250);
}

async function main() {
  fs.mkdirSync(SHOT_DIR, { recursive: true });
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: "new",
    args: ["--no-sandbox", "--disable-dev-shm-usage"],
  });

  const page = await browser.newPage();
  page.on("pageerror", (e) =>
    check("нет JS-ошибок на странице", false, String(e).slice(0, 160))
  );

  /* ─── 1. Главная, десктоп ─────────────────────────────────── */
  await page.setViewport({ width: 1280, height: 900 });
  await openPage(page, "/");
  await dismissCookies(page);

  check("home: секция #versions есть", !!(await page.$("#versions")));

  const cardIds = await page.$$eval("#versions [data-version-card]", (els) =>
    els.map((e) => e.getAttribute("data-version-card"))
  );
  check(
    "home: карточки «Лид» и «Про»",
    cardIds.includes("lid") && cardIds.includes("pro"),
    cardIds.join(",")
  );

  await page.evaluate(() => document.querySelector("#versions").scrollIntoView());
  await sleep(900);
  await page.click('#versions [data-version-card="lid"]');
  await sleep(800);
  const lidPanel = await page.evaluate(
    () => document.querySelector("#versions [data-version-panel]")?.innerText || ""
  );
  check("home: панель «Лид» раскрылась", /подбор|диалог/i.test(lidPanel));
  check(
    "home: в панели полный функционал (3 группы)",
    (await page.$$eval("#versions [data-version-panel] ul", (e) => e.length)) >= 3
  );

  const demoHref = await page.evaluate(() => {
    const a = Array.from(
      document.querySelectorAll("#versions [data-version-panel] a")
    ).find((x) => (x.getAttribute("href") || "").includes("/demo"));
    return a ? a.getAttribute("href") : "";
  });
  check("home: deep-link в демо ?v=lid", demoHref.includes("v=lid"), demoHref);
  await shot(page, "home-versions-open-1280");

  // Переключение на «Про»: панель должна замениться, а не открыться второй
  await page.click('#versions [data-version-card="pro"]');
  await sleep(800);
  const panels = await page.$$eval(
    "#versions [data-version-panel]",
    (els) => els.filter((e) => e.offsetParent !== null).length
  );
  check("home: открыта одна панель за раз", panels === 1, `панелей: ${panels}`);
  const proPanel = await page.evaluate(
    () => document.querySelector("#versions [data-version-panel]")?.innerText || ""
  );
  check("home: панель «Про» с возвратом клиентов", /возврат|догоня/i.test(proPanel));

  // CTA в панели → форма (шаг 1), затем шаг 2 с чипом версии
  await page.evaluate(() => {
    const b = Array.from(
      document.querySelectorAll("#versions [data-version-panel] button")
    ).find((x) => /подключить/i.test(x.innerText));
    if (b) b.click();
  });
  await sleep(800);
  let mt = await modalText(page);
  check(
    "home: форма открылась на шаге выбора пути",
    mt.includes("подключусь сам") && mt.includes("оставить заявку"),
    mt.slice(0, 70).replace(/\n/g, " | ")
  );
  await shot(page, "home-modal-step1-1280");

  await page.evaluate(() => {
    const b = Array.from(document.querySelectorAll('[role="dialog"] button')).find(
      (x) => /оставить заявку/i.test(x.innerText)
    );
    if (b) b.click();
  });
  await sleep(700);
  mt = await modalText(page);
  check("home: на шаге заявки чип версии «Про»", mt.includes("про"));
  check("home: выбор канала Web/MAX", mt.includes("web-виджет") && mt.includes("max"));
  check("home: опция «больше 200 диалогов»", mt.includes("больше 200 диалогов"));
  check("home: нет чипов объёма диалогов", !mt.includes("до 120"));
  await shot(page, "home-modal-step2-1280");
  await page.keyboard.press("Escape");
  await sleep(400);

  // Навигация и цены
  const navText = await page.$eval("header", (h) => h.innerText);
  check("home: в хедере «Версии ассистента»", navText.includes("Версии ассистента"));
  check("home: в хедере «Возврат клиентов»", navText.includes("Возврат клиентов"));
  check("home: «ИИ-аналитика» убрана", !navText.includes("ИИ-аналитика"));

  const bodyText = await page.evaluate(() => document.body.innerText);
  check("home: цена «от 990 ₽»", /от 990/.test(bodyText));
  check("home: нет «ИИ-турменеджер»", !bodyText.includes("турменеджер"));
  check("home: нет «за 1 день»", !/подключа\w* за 1 день/i.test(bodyText));
  check("home: «резидент» Сколково (не участник)", !/участник проекта «?Сколково/i.test(bodyText));

  /* ─── 2. /versii ──────────────────────────────────────────── */
  await openPage(page, "/versii.html");
  const versiiBody = await page.evaluate(() => document.body.innerText);
  check("versii: обе версии в тексте", /«Лид»/.test(versiiBody) && /«Про»/.test(versiiBody));
  check("versii: полное сравнение", versiiBody.includes("полное сравнение"));
  check(
    "versii: таблица наполнена",
    (await page.$$eval("table tr", (r) => r.length)) > 30
  );
  check(
    "versii: карточки версий интерактивны",
    (await page.$$eval("[data-version-card]", (e) => e.length)) === 2
  );
  check("versii: FAQ-аккордеоны", (await page.$$eval("details", (e) => e.length)) >= 3);
  check(
    "versii: FAQPage-схема в JSON-LD",
    await page.evaluate(() =>
      Array.from(document.querySelectorAll('script[type="application/ld+json"]')).some(
        (s) => s.textContent.includes("FAQPage")
      )
    )
  );
  await shot(page, "versii-1280", true);

  /* ─── 3. /tarify: переключатель версий ────────────────────── */
  await openPage(page, "/tarify.html");
  const tabs = await page.$$eval('[role="tablist"] button', (els) =>
    els.map((e) => e.innerText.replace(/\n/g, " "))
  );
  check("tarify: переключатель «Лид»/«Про»", tabs.length >= 2, tabs.join(" / "));

  const liteLid = await page.evaluate(
    () => document.querySelector("#lite")?.innerText || ""
  );
  check(
    "tarify: по умолчанию «Лид» — Lite 990 ₽ / 40 диалогов",
    /990/.test(liteLid) && !/1[\s\u202f]990/.test(liteLid) && /40 диалог/.test(liteLid),
    liteLid.replace(/\n/g, " | ").slice(0, 90)
  );

  await page.evaluate(() => {
    const b = Array.from(document.querySelectorAll('[role="tablist"] button')).find((x) =>
      x.innerText.includes("Про")
    );
    if (b) b.click();
  });
  await sleep(800);
  const litePro = await page.evaluate(
    () => document.querySelector("#lite")?.innerText || ""
  );
  check(
    "tarify: «Про» — Lite 1 990 ₽ / 30 диалогов",
    /1[\s\u202f]990/.test(litePro) && /30 диалог/.test(litePro),
    litePro.replace(/\n/g, " | ").slice(0, 90)
  );
  check(
    "tarify: URL обновился на ?v=pro",
    await page.evaluate(() => location.search.includes("v=pro"))
  );
  await shot(page, "tarify-pro-1280");

  await openPage(page, "/tarify.html?v=pro");
  check(
    "tarify: deep-link ?v=pro применяется",
    /1[\s\u202f]990/.test(
      await page.evaluate(() => document.querySelector("#lite")?.innerText || "")
    )
  );

  await page.evaluate(() => {
    const card = document.querySelector("#lite");
    const b = Array.from(card.querySelectorAll("button")).find((x) =>
      /подключить|начать/i.test(x.innerText)
    );
    if (b) b.click();
  });
  await sleep(800);
  mt = await modalText(page);
  check("tarify: CTA тарифа открывает форму", mt.includes("подключусь сам"));
  await page.evaluate(() => {
    const b = Array.from(document.querySelectorAll('[role="dialog"] button')).find((x) =>
      /оставить заявку/i.test(x.innerText)
    );
    if (b) b.click();
  });
  await sleep(700);
  mt = await modalText(page);
  check("tarify: в заявке версия «Про»", mt.includes("про"));
  check("tarify: в заявке тариф Lite", mt.includes("lite") || mt.includes("месяц"));
  await page.keyboard.press("Escape");
  await sleep(300);

  /* ─── 4. /demo: тумблер версий ────────────────────────────── */
  await openPage(page, "/demo.html", 2500);
  const demoTabs = await page.$$eval('[role="tablist"] button', (els) =>
    els.map((e) => e.innerText.replace(/\n/g, " "))
  );
  check("demo: тумблер из двух версий", demoTabs.length === 2, demoTabs.join(" / "));

  const idPro = await page.evaluate(
    () =>
      document.querySelector("script[data-assistant-id]")?.getAttribute("data-assistant-id") ||
      ""
  );
  check("demo: по умолчанию «Про»", idPro.startsWith("e919868a"), idPro);

  await page.evaluate(() => {
    const b = Array.from(document.querySelectorAll('[role="tablist"] button')).find((x) =>
      x.innerText.includes("Лид")
    );
    if (b) b.click();
  });
  await sleep(2500);
  const idLid = await page.evaluate(
    () =>
      document.querySelector("script[data-assistant-id]")?.getAttribute("data-assistant-id") ||
      ""
  );
  // Демо «Лид» опубликовано в ЛК — переключатель обязан поднимать его виджет.
  check(
    "demo: переключение на «Лид» меняет ассистента",
    idLid.startsWith("f745cbae"),
    idLid
  );
  check(
    "demo: один загрузчик виджета в DOM",
    (await page.$$eval("script[data-assistant-id]", (e) => e.length)) === 1
  );
  check(
    "demo: URL ?v=lid",
    await page.evaluate(() => location.search.includes("v=lid"))
  );
  check(
    "demo: подсказка сменилась под «Лид»",
    await page.evaluate(() => document.body.innerText.includes("собирает запрос по шагам"))
  );
  check(
    "demo: нет заглушки «демо готовим»",
    await page.evaluate(
      () => !document.body.innerText.includes("Живое демо версии «Лид» готовим")
    )
  );
  await shot(page, "demo-lid-1280");

  await openPage(page, "/demo.html?v=lid", 2500);
  check(
    "demo: deep-link ?v=lid применяется",
    await page.evaluate(() =>
      document.body.innerText.includes("собирает запрос по шагам")
    )
  );

  /* ─── 5. /vozvrat-klientov ────────────────────────────────── */
  await openPage(page, "/vozvrat-klientov.html");
  const vozvratBody = await page.evaluate(() => document.body.innerText);
  check("vozvrat: страница отдаётся", /возвра/i.test(vozvratBody));
  check("vozvrat: механики перечислены", vozvratBody.includes("механик"));
  check("vozvrat: привязка к версии «Про»", /«Про»/.test(vozvratBody));
  check("vozvrat: блок про антиспам", /спам/i.test(vozvratBody));
  await shot(page, "vozvrat-1280", true);

  /* ─── 5.5. Подборки и заявка рядом с регистрацией ─────────── */
  await page.setViewport({ width: 1280, height: 900 });
  await openPage(page, "/podborki.html", 1200);
  const podborkiText = await page.evaluate(() => document.body.innerText);
  check(
    "podborki: рассказ про панель отеля и перелёт",
    /Панель отеля/.test(podborkiText) && /Вкладка «Перелёт»/.test(podborkiText)
  );
  // Заголовки таблицы кабинета отрисованы в uppercase — сравниваем без учёта регистра.
  check(
    "podborki: метрики кабинета и воронка",
    /открытия туров/i.test(podborkiText) && /ссылку отправили/i.test(podborkiText)
  );
  check(
    "podborki: JSON-LD с HowTo и FAQPage",
    await page.evaluate(() =>
      Array.from(document.querySelectorAll('script[type="application/ld+json"]')).some(
        (s) => s.textContent.includes("HowTo") && s.textContent.includes("FAQPage")
      )
    )
  );
  await page.evaluate(() => {
    const t = Array.from(document.querySelectorAll('[role="tab"]')).find((x) =>
      x.innerText.includes("Перелёт")
    );
    if (t) t.click();
  });
  await sleep(500);
  check(
    "podborki: вкладка «Перелёт» показывает рейсы",
    await page.evaluate(() => document.body.innerText.includes("Шереметьево"))
  );
  check(
    "podborki: ведёт на возврат клиентов",
    await page.evaluate(() =>
      Array.from(document.querySelectorAll("a")).some(
        (a) => a.getAttribute("href") === "/vozvrat-klientov"
      )
    )
  );
  await shot(page, "podborki-1280");

  // Заявка на подключение стоит везде, где есть регистрация
  for (const [route, name] of [
    ["/demo.html", "demo"],
    ["/start.html", "start"],
  ]) {
    await openPage(page, route, 1000);
    const requestButtons = await page.evaluate(
      () =>
        Array.from(document.querySelectorAll("button")).filter((x) =>
          /оставить заявку на подключение/i.test(x.innerText)
        ).length
    );
    check(`${name}: две кнопки «Оставить заявку»`, requestButtons === 2, `найдено ${requestButtons}`);
    // Кнопка заявки идёт строкой ниже регистрации, а не рядом с ней
    const geometry = await page.evaluate(() => {
      const req = Array.from(document.querySelectorAll("button")).find((x) =>
        /оставить заявку на подключение/i.test(x.innerText)
      );
      const reg = Array.from(document.querySelectorAll("a")).find((x) =>
        /зарегистрироваться|подключить ассистента за 2 минуты/i.test(x.innerText)
      );
      if (!req || !reg) return null;
      return {
        reqTop: Math.round(req.getBoundingClientRect().top),
        regBottom: Math.round(reg.getBoundingClientRect().bottom),
      };
    });
    check(
      `${name}: заявка стоит под регистрацией`,
      geometry !== null && geometry.reqTop >= geometry.regBottom - 2,
      geometry ? `заявка ${geometry.reqTop}, регистрация до ${geometry.regBottom}` : "не нашли кнопки"
    );
    await page.evaluate(() => {
      const req = Array.from(document.querySelectorAll("button")).find((x) =>
        /оставить заявку на подключение/i.test(x.innerText)
      );
      req.click();
    });
    await sleep(800);
    const modal = await modalText(page);
    check(
      `${name}: заявка открывает форму-развилку`,
      modal.includes("подключусь сам") && modal.includes("оставить заявку")
    );
    await page.keyboard.press("Escape");
    await sleep(300);
  }

  /* ─── 6. Мобильные вьюпорты ───────────────────────────────── */
  for (const [w, h, label] of [
    [320, 700, "320"],
    [375, 812, "375"],
    [768, 1000, "768"],
  ]) {
    const mob = w < 700;
    await page.setViewport({ width: w, height: h, isMobile: mob, hasTouch: mob });

    for (const [route, name] of [
      ["/", "home"],
      ["/versii.html", "versii"],
      ["/tarify.html", "tarify"],
      ["/vozvrat-klientov.html", "vozvrat"],
      ["/podborki.html", "podborki"],
      ["/demo.html", "demo"],
    ]) {
      await openPage(page, route, 900);
      const moved = await canScrollX(page);
      check(`mobile ${label}: ${name} без гориз. скролла`, moved === 0, `scrollLeft=${moved}`);
      const bad = await clippedOverflow(page);
      check(
        `mobile ${label}: ${name} нет элементов за краем`,
        bad.length === 0,
        bad.join("; ")
      );
      if (label === "375") {
        await dismissCookies(page);
        await shot(page, `${name}-375`, true);
      }
    }

    // Аккордеон версий на узком экране
    await openPage(page, "/", 900);
    await page.evaluate(() => document.querySelector("#versions").scrollIntoView());
    await sleep(800);
    await page.evaluate(() =>
      document.querySelector('#versions [data-version-card="pro"]').click()
    );
    await sleep(800);
    const mobPanel = await page.evaluate(() => {
      const p = document.querySelector("#versions [data-version-panel]");
      return p && p.offsetParent !== null ? p.innerText : "";
    });
    check(`mobile ${label}: аккордеон «Про» раскрылся`, /возврат|консульт/i.test(mobPanel));
    check(
      `mobile ${label}: после раскрытия скролла нет`,
      (await canScrollX(page)) === 0
    );
    const panelGeo = await page.evaluate(() => {
      const p = document.querySelector("#versions [data-version-panel]");
      const s = document.querySelector("#versions");
      return {
        panelBottom: Math.round(p.getBoundingClientRect().bottom),
        sectionBottom: Math.round(s.getBoundingClientRect().bottom),
      };
    });
    check(
      `mobile ${label}: панель не наезжает на следующую секцию`,
      panelGeo.panelBottom <= panelGeo.sectionBottom + 2,
      `панель ${panelGeo.panelBottom} vs секция ${panelGeo.sectionBottom}`
    );
    await shot(page, `home-versions-open-${label}`);

    // Таблица сравнения на /versii: стек на мобиле, таблица на планшете
    await openPage(page, "/versii.html", 900);
    const tableMode = await page.evaluate(() => {
      const t = document.querySelector("table");
      const wrap = t.parentElement;
      return {
        display: getComputedStyle(t).display,
        overflows: t.getBoundingClientRect().width > wrap.clientWidth + 2,
      };
    });
    check(
      `mobile ${label}: таблица сравнения ${w < 640 ? "в стеке" : "таблицей"}`,
      w < 640 ? tableMode.display === "block" : tableMode.display === "table",
      tableMode.display
    );
    check(
      `mobile ${label}: значения «Лид»/«Про» видны без скролла`,
      w < 640 ? !tableMode.overflows : true
    );

    // Тарифная таблица внутри details
    await openPage(page, "/tarify.html", 900);
    await page.evaluate(() => {
      const d = document.querySelector("details");
      if (d) d.open = true;
    });
    await sleep(600);
    check(
      `mobile ${label}: раскрытая таблица тарифов без гориз. скролла страницы`,
      (await canScrollX(page)) === 0
    );
  }

  await browser.close();

  const failed = results.filter((r) => !r.ok);
  console.log(`\n===== ИТОГО: ${results.length - failed.length}/${results.length} PASS =====`);
  if (failed.length) {
    console.log("FAILED:");
    failed.forEach((f) => console.log(` - ${f.name}: ${f.detail}`));
    process.exit(1);
  }
}

main().catch((e) => {
  console.error("SCRIPT ERROR:", e);
  process.exit(2);
});
