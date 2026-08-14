/* eslint-disable */
// Глубокий аудит мобильного UI/UX: скролл, тап-зоны, читаемость, перекрытия
// фиксированных элементов, формы, переключатели, аккордеоны.
// Запуск: node scripts/qa-mobile.js  (нужен статический билд на :8099)
const puppeteer = require("puppeteer-core");
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

const VIEWPORTS = [
  { w: 320, h: 640, label: "320 (iPhone SE 1)" },
  { w: 375, h: 812, label: "375 (iPhone X)" },
  { w: 390, h: 844, label: "390 (iPhone 14)" },
  { w: 414, h: 896, label: "414 (iPhone 11 Pro Max)" },
  { w: 768, h: 1024, label: "768 (iPad портрет)" },
];

const PAGES = [
  ["/", "home"],
  ["/podborki.html", "podborki"],
  ["/versii.html", "versii"],
  ["/vozvrat-klientov.html", "vozvrat"],
  ["/tarify.html", "tarify"],
  ["/skolko-stoit.html", "skolko-stoit"],
  ["/demo.html", "demo"],
  ["/start.html", "start"],
];

async function open(page, route, wait = 1000) {
  await page.goto(BASE + route, { waitUntil: "networkidle2" });
  await page.evaluate(() => document.fonts.ready);
  await sleep(wait);
  // Куки-плашка не должна мешать замерам
  await page.evaluate(() => {
    const b = Array.from(document.querySelectorAll("button")).find((x) =>
      /принять/i.test(x.innerText)
    );
    if (b) b.click();
  });
  await sleep(300);
}

/** Реальная возможность горизонтальной прокрутки. */
const canScrollX = (page) =>
  page.evaluate(() => {
    window.scrollTo(9999, window.scrollY);
    const x = Math.round(window.scrollX);
    window.scrollTo(0, window.scrollY);
    return x;
  });

/** Элементы, выходящие за правый край окна. */
const overflowing = (page) =>
  page.evaluate(() => {
    const vw = window.innerWidth;
    const bad = [];
    /** Внутри собственных горизонтальных лент выход за край — норма. */
    const inScroller = (el) => {
      for (let p = el.parentElement; p && p !== document.body; p = p.parentElement) {
        const s = getComputedStyle(p);
        if (
          (s.overflowX === "auto" || s.overflowX === "scroll" || s.overflowX === "hidden") &&
          p.scrollWidth > p.clientWidth + 1
        )
          return true;
      }
      return false;
    };
    document.querySelectorAll("body *").forEach((el) => {
      const s = getComputedStyle(el);
      if (el.offsetParent === null && s.position !== "fixed") return;
      if (s.visibility === "hidden" || s.opacity === "0") return;
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) return;
      // Декоративные блюр-круги специально уезжают за край и обрезаются
      if (s.pointerEvents === "none") return;
      if (inScroller(el)) return;
      // Моки продукта масштабируются трансформом и обрезаются рамкой
      if (el.closest("[data-product-mock]")) return;
      // Появление секций анимируется сдвигом — до входа в кадр элемент стоит
      // на несколько пикселей левее, это не переполнение вёрстки
      let transformed = false;
      for (let p = el; p && p !== document.body; p = p.parentElement) {
        if (getComputedStyle(p).transform !== "none") {
          transformed = true;
          break;
        }
      }
      if (transformed) return;
      if (r.right > vw + 2 || r.left < -2) {
        bad.push(
          `${el.tagName.toLowerCase()}.${String(el.className).slice(0, 28)} [${Math.round(r.left)}..${Math.round(r.right)}]`
        );
      }
    });
    return bad.slice(0, 6);
  });

/** Интерактивные элементы с маленькой зоной нажатия. */
const smallTapTargets = (page) =>
  page.evaluate(() => {
    const MIN = 40;
    // Промо-полоса сверху намеренно тонкая (36px) — её кнопки живут в этой высоте
    const SLIM = 28;
    const bad = [];
    document
      .querySelectorAll('a, button, [role="tab"], summary, input, select, label')
      .forEach((el) => {
        if (el.offsetParent === null) return;
        const s = getComputedStyle(el);
        if (s.visibility === "hidden") return;
        // Внутри имитации виджета и кабинета своя мелкая сетка — это «скриншот»
        if (el.closest("[data-product-mock]")) return;
        // Ссылки внутри текста — нормальная типографика, не кнопки
        const inParagraph = el.closest("p, li, td, th, summary, label");
        const r = el.getBoundingClientRect();
        if (r.width === 0 || r.height === 0) return;
        if (inParagraph && el.tagName === "A") return;
        // Метки для скринридеров и сам чекбокс: нажимают по строке-обёртке
        if (el.className && String(el.className).includes("sr-only")) return;
        if (el.tagName === "INPUT" && el.type === "checkbox") return;
        const min = el.closest("[data-slim-bar]") ? SLIM : MIN;
        if (r.height < min || r.width < min) {
          bad.push(
            `${el.tagName.toLowerCase()} «${(el.textContent || el.getAttribute("aria-label") || "").trim().slice(0, 22)}» ${Math.round(r.width)}×${Math.round(r.height)} [${String(el.className).slice(0, 34)}]`
          );
        }
      });
    return bad.slice(0, 8);
  });

/** Слишком мелкий текст (меньше 11px). */
const tinyText = (page) =>
  page.evaluate(() => {
    const bad = new Set();
    document.querySelectorAll("body *").forEach((el) => {
      if (el.offsetParent === null) return;
      if (!el.childNodes.length) return;
      if (el.closest("[data-product-mock]")) return;
      const hasOwnText = Array.from(el.childNodes).some(
        (n) => n.nodeType === 3 && n.textContent.trim().length > 2
      );
      if (!hasOwnText) return;
      const fs = parseFloat(getComputedStyle(el).fontSize);
      if (fs < 11) bad.add(`${fs}px: «${(el.textContent || "").trim().slice(0, 30)}»`);
    });
    return Array.from(bad).slice(0, 6);
  });

/**
 * Цена не должна разрываться между строками: «от 1 / 990 ₽».
 * Перенос после «₽/» браузеры делают штатно, и это допустимо — проверяем
 * только само число вместе со знаком рубля.
 */
const brokenPrices = (page) =>
  page.evaluate(() => {
    const bad = [];
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const re = /(от[\s\u00A0])?\d[\s\u00A0]?\d{3}[\s\u00A0]?₽|(от[\s\u00A0])?\d{1,3}[\s\u00A0]?₽/g;
    for (let n = walker.nextNode(); n; n = walker.nextNode()) {
      const text = n.textContent;
      if (!text || !/₽/.test(text)) continue;
      const parent = n.parentElement;
      if (!parent || parent.offsetParent === null) continue;
      for (const m of text.matchAll(re)) {
        const range = document.createRange();
        range.setStart(n, m.index);
        range.setEnd(n, m.index + m[0].length);
        if (range.getClientRects().length > 1) bad.push(m[0].trim());
      }
    }
    return Array.from(new Set(bad)).slice(0, 5);
  });

/** Плавающая кнопка не должна накрывать другие интерактивные элементы. */
const floatingOverlap = (page) =>
  page.evaluate(() => {
    const fixed = Array.from(document.querySelectorAll("body *")).filter((el) => {
      const s = getComputedStyle(el);
      return (
        s.position === "fixed" &&
        s.pointerEvents !== "none" &&
        el.getBoundingClientRect().width > 0 &&
        el.offsetParent !== null
      );
    });
    const covered = [];
    fixed.forEach((f) => {
      const fr = f.getBoundingClientRect();
      document.querySelectorAll("a, button").forEach((el) => {
        if (f.contains(el) || el.contains(f)) return;
        if (el.offsetParent === null) return;
        const r = el.getBoundingClientRect();
        if (r.width === 0 || r.bottom < 0 || r.top > window.innerHeight) return;
        const overlapW = Math.min(fr.right, r.right) - Math.max(fr.left, r.left);
        const overlapH = Math.min(fr.bottom, r.bottom) - Math.max(fr.top, r.top);
        if (overlapW > 8 && overlapH > 8) {
          covered.push(
            `${String(f.className).slice(0, 18)} накрывает «${(el.innerText || "").trim().slice(0, 20)}»`
          );
        }
      });
    });
    return Array.from(new Set(covered)).slice(0, 5);
  });

(async () => {
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: "new",
    args: ["--no-sandbox"],
  });
  const page = await browser.newPage();

  /* ─── 1. Каждая страница на каждой ширине ─────────────────── */
  for (const vp of VIEWPORTS) {
    const mobile = vp.w < 700;
    await page.setViewport({
      width: vp.w,
      height: vp.h,
      isMobile: mobile,
      hasTouch: mobile,
      deviceScaleFactor: 2,
    });
    for (const [route, name] of PAGES) {
      await open(page, route, 900);
      const x = await canScrollX(page);
      check(`${vp.w} ${name}: нет горизонтальной прокрутки`, x === 0, `scrollX=${x}`);
      const over = await overflowing(page);
      check(`${vp.w} ${name}: ничего не выходит за край`, over.length === 0, over.join("; "));
      const taps = await smallTapTargets(page);
      check(`${vp.w} ${name}: тап-зоны не меньше 40px`, taps.length === 0, taps.join("; "));
      const tiny = await tinyText(page);
      check(`${vp.w} ${name}: нет текста мельче 11px`, tiny.length === 0, tiny.join("; "));
      const prices = await brokenPrices(page);
      check(`${vp.w} ${name}: цены не рвутся между строками`, prices.length === 0, prices.join("; "));
      const cover = await floatingOverlap(page);
      check(`${vp.w} ${name}: плавающие элементы никого не накрывают`, cover.length === 0, cover.join("; "));
      // Внизу страницы стоят главные кнопки — плавающая кнопка не должна их закрыть
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await sleep(700);
      const coverBottom = await floatingOverlap(page);
      check(
        `${vp.w} ${name}: в конце страницы кнопки не перекрыты`,
        coverBottom.length === 0,
        coverBottom.join("; ")
      );
    }
  }

  /* ─── 2. Форма-развилка на телефоне ───────────────────────── */
  await page.setViewport({ width: 375, height: 812, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
  await open(page, "/podborki.html", 1000);
  await page.evaluate(() => {
    const b = Array.from(document.querySelectorAll("button")).find(
      (x) => /подключить бесплатно/i.test(x.innerText) && !x.closest("header")
    );
    b.scrollIntoView({ block: "center" });
    b.click();
  });
  await sleep(900);
  const modalFits = await page.evaluate(() => {
    const d = document.querySelector('[role="dialog"]');
    if (!d) return null;
    const r = d.getBoundingClientRect();
    return {
      inViewport: r.left >= -1 && r.right <= window.innerWidth + 1,
      height: Math.round(r.height),
      viewport: window.innerHeight,
      scrollable: d.scrollHeight > d.clientHeight ? "да" : "нет",
    };
  });
  check("375 форма: помещается по ширине", modalFits && modalFits.inViewport, JSON.stringify(modalFits));
  // Шаг 2 и поля ввода
  await page.evaluate(() => {
    const b = Array.from(document.querySelectorAll('[role="dialog"] button')).find((x) =>
      /оставить заявку/i.test(x.innerText)
    );
    if (b) b.click();
  });
  await sleep(700);
  const inputs = await page.evaluate(() =>
    Array.from(document.querySelectorAll('[role="dialog"] input, [role="dialog"] textarea'))
      // Поле-ловушка для ботов скрыто, а чекбокс нажимают по строке-обёртке
      .filter(
        (el) =>
          el.type !== "hidden" &&
          el.type !== "checkbox" &&
          el.getBoundingClientRect().height > 0
      )
      .map((el) => ({
        name: el.getAttribute("name") || el.getAttribute("placeholder") || el.type,
        font: parseFloat(getComputedStyle(el).fontSize),
        height: Math.round(el.getBoundingClientRect().height),
      }))
  );
  check(
    "375 форма: поля не вызывают зум iOS (шрифт ≥16px)",
    inputs.length > 0 && inputs.every((i) => i.font >= 16),
    inputs.map((i) => `${i.name}:${i.font}px`).join(", ")
  );
  check(
    "375 форма: поля удобны для пальца (≥44px)",
    inputs.length > 0 && inputs.every((i) => i.height >= 44),
    inputs.map((i) => `${i.name}:${i.height}px`).join(", ")
  );
  const consent = await page.evaluate(() => {
    const box = document.querySelector('[role="dialog"] input[type="checkbox"]');
    const label = box && box.closest("label");
    const r = label && label.getBoundingClientRect();
    return r ? { w: Math.round(r.width), h: Math.round(r.height) } : null;
  });
  check(
    "375 форма: согласие нажимается по всей строке",
    consent && consent.h >= 40 && consent.w >= 200,
    JSON.stringify(consent)
  );
  const submitVisible = await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('[role="dialog"] button')).find((x) =>
      /отправить|отправляем/i.test(x.innerText)
    );
    if (!btn) return null;
    btn.scrollIntoView({ block: "center" });
    const r = btn.getBoundingClientRect();
    return { top: Math.round(r.top), bottom: Math.round(r.bottom), vh: window.innerHeight };
  });
  check(
    "375 форма: кнопка отправки достижима",
    submitVisible && submitVisible.bottom <= submitVisible.vh + 1 && submitVisible.top >= 0,
    JSON.stringify(submitVisible)
  );
  // Фон не должен скроллиться под открытой формой
  const bodyLocked = await page.evaluate(() => {
    const before = window.scrollY;
    window.scrollBy(0, 300);
    const after = window.scrollY;
    return { moved: Math.round(after - before), overflow: getComputedStyle(document.body).overflow };
  });
  check(
    "375 форма: фон под формой не уезжает",
    bodyLocked.moved === 0 || bodyLocked.overflow === "hidden",
    JSON.stringify(bodyLocked)
  );
  await page.keyboard.press("Escape");
  await sleep(400);
  check(
    "375 форма: закрывается по Escape",
    await page.evaluate(() => !document.querySelector('[role="dialog"]'))
  );

  /* ─── 3. Мобильное меню ───────────────────────────────────── */
  await open(page, "/", 900);
  const burgerOk = await page.evaluate(() => {
    const b = Array.from(document.querySelectorAll("header button")).find((x) =>
      /меню/i.test(x.getAttribute("aria-label") || "")
    );
    if (!b) return null;
    const r = b.getBoundingClientRect();
    b.click();
    return { w: Math.round(r.width), h: Math.round(r.height) };
  });
  check(
    "375 меню: кнопка-бургер не меньше 40px",
    burgerOk && burgerOk.w >= 40 && burgerOk.h >= 40,
    JSON.stringify(burgerOk)
  );
  await sleep(700);
  // Разделы «Продукт» и «Возможности» раскрываются аккордеоном
  const sections = await page.evaluate(() =>
    Array.from(document.querySelectorAll("[data-mobile-menu] button"))
      .map((b) => b.innerText.trim())
      .filter((t) => /^(Продукт|Возможности)$/.test(t))
  );
  check("375 меню: открылось, разделы на месте", sections.length === 2, sections.join(", "));

  const expanded = await page.evaluate(() => {
    const b = Array.from(
      document.querySelectorAll("[data-mobile-menu] button")
    ).find((x) => x.innerText.trim() === "Возможности");
    if (!b) return false;
    b.click();
    return true;
  });
  check("375 меню: раздел «Возможности» раскрывается", expanded);
  await sleep(600);

  const menu = await page.evaluate(() =>
    Array.from(document.querySelectorAll("[data-mobile-menu] a"))
      .filter((a) => a.offsetParent)
      .map((a) => ({
        href: a.getAttribute("href"),
        h: Math.round(a.getBoundingClientRect().height),
      }))
  );
  check("375 меню: содержит пункты", menu.length >= 6, `пунктов ${menu.length}`);
  check(
    "375 меню: есть «Подборки» внутри раздела",
    menu.some((m) => m.href === "/podborki")
  );
  check(
    "375 меню: пункты не меньше 40px",
    menu.every((m) => m.h >= 40),
    menu.filter((m) => m.h < 40).map((m) => `${m.href}:${m.h}`).join(", ")
  );

  /* ─── 4. Интерактив: превью подборки, аккордеоны, тумблеры ── */
  for (const w of [320, 375]) {
    await page.setViewport({ width: w, height: 800, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
    await open(page, "/podborki.html", 900);
    await page.evaluate(() => {
      const t = Array.from(document.querySelectorAll('[role="tab"]')).find((x) =>
        /Перелёт/.test(x.innerText)
      );
      t.scrollIntoView({ block: "center" });
      t.click();
    });
    await sleep(500);
    check(
      `${w} превью: вкладка «Перелёт» переключается`,
      await page.evaluate(() => document.body.innerText.includes("Шереметьево"))
    );
    check(`${w} превью: после переключения скролла нет`, (await canScrollX(page)) === 0);
    // Названия отелей не обрезаны многоточием
    check(
      `${w} превью: названия отелей не обрезаны`,
      await page.evaluate(() => {
        const els = Array.from(document.querySelectorAll("p")).filter((p) =>
          /Barut Hemera|Calista Luxury Resort/.test(p.innerText)
        );
        return els.length > 0 && els.every((p) => !p.innerText.includes("…") && p.scrollWidth <= p.clientWidth + 1);
      })
    );
    // FAQ-аккордеон
    await page.evaluate(() => {
      const d = document.querySelector("details");
      d.scrollIntoView({ block: "center" });
      d.querySelector("summary").click();
    });
    await sleep(400);
    const faq = await page.evaluate(() => {
      const d = document.querySelector("details");
      return { open: d.open, scrollX: window.scrollX };
    });
    check(`${w} FAQ: раскрывается без сдвига страницы`, faq.open === true && faq.scrollX === 0);

    // Тумблер версий в тарифах
    await open(page, "/tarify.html", 1000);
    const priceBefore = await page.evaluate(() => document.body.innerText.includes("990"));
    await page.evaluate(() => {
      const b = Array.from(document.querySelectorAll('[role="tablist"] button')).find((x) =>
        x.innerText.includes("Про")
      );
      b.scrollIntoView({ block: "center" });
      b.click();
    });
    await sleep(700);
    check(
      `${w} тарифы: тумблер версий работает`,
      priceBefore && (await page.evaluate(() => location.search.includes("v=pro")))
    );
    check(`${w} тарифы: после переключения нет скролла`, (await canScrollX(page)) === 0);

    // Тумблер версий в демо
    await open(page, "/demo.html", 1200);
    await page.evaluate(() => {
      const b = Array.from(document.querySelectorAll('[role="tablist"] button')).find((x) =>
        x.innerText.includes("Лид")
      );
      b.scrollIntoView({ block: "center" });
      b.click();
    });
    await sleep(1500);
    check(
      `${w} демо: тумблер поднимает ассистента «Лид»`,
      await page.evaluate(() =>
        (
          document.querySelector("script[data-assistant-id]")?.getAttribute("data-assistant-id") || ""
        ).startsWith("f745cbae")
      )
    );
  }

  /* ─── 5. Скриншоты для глаз ──────────────────────────────── */
  await page.setViewport({ width: 375, height: 812, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
  for (const [route, name] of PAGES) {
    await open(page, route, 1200);
    await page.screenshot({ path: path.join(SHOT_DIR, `m375-${name}.png`), fullPage: true });
  }

  const ok = results.filter((r) => r.ok).length;
  console.log(`\n===== ИТОГО: ${ok}/${results.length} PASS =====`);
  if (ok !== results.length) {
    console.log("FAILED:");
    results.filter((r) => !r.ok).forEach((r) => console.log(` - ${r.name}: ${r.detail}`));
  }
  await browser.close();
})();
