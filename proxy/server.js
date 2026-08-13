"use strict";

/**
 * navilet-proxy — минимальный сервер пересылки заявок с сайта в Telegram.
 *
 * Работает без внешних зависимостей (только встроенные модули Node).
 * Секреты (токен бота, chat_id) приходят ТОЛЬКО через переменные окружения
 * на сервере и никогда не попадают в бандл сайта.
 *
 * ENV:
 *   TG_BOT_TOKEN   — токен бота от @BotFather (обязательно)
 *   TG_CHAT_ID     — id группы/чата, куда слать заявки (обязательно)
 *   PORT           — порт (по умолчанию 8080)
 *   ALLOWED_HOSTS  — разрешённые хосты Origin/Referer, через запятую
 *                    (по умолчанию navilet.ru,www.navilet.ru)
 */

const http = require("http");
const https = require("https");

const TOKEN = process.env.TG_BOT_TOKEN || "";
const CHAT_ID = process.env.TG_CHAT_ID || "";
const PORT = parseInt(process.env.PORT || "8080", 10);
const ALLOWED_HOSTS = (process.env.ALLOWED_HOSTS || "navilet.ru,www.navilet.ru")
  .split(",")
  .map((s) => s.trim().toLowerCase())
  .filter(Boolean);

const MAX_BODY = 16 * 1024; // 16 KB — заявка маленькая, лишнее режем

// ── Простой rate-limit в памяти: не более RL_MAX заявок с IP за окно ──
const RL_WINDOW_MS = 60 * 1000;
const RL_MAX = 6;
const hits = new Map();

function rateLimited(ip) {
  const now = Date.now();
  const arr = (hits.get(ip) || []).filter((t) => now - t < RL_WINDOW_MS);
  arr.push(now);
  hits.set(ip, arr);
  // периодическая чистка, чтобы Map не рос бесконечно
  if (hits.size > 5000) {
    for (const [k, v] of hits) {
      if (!v.some((t) => now - t < RL_WINDOW_MS)) hits.delete(k);
    }
  }
  return arr.length > RL_MAX;
}

function esc(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function clip(s, n) {
  const str = String(s == null ? "" : s).trim();
  return str.length > n ? str.slice(0, n) + "…" : str;
}

function clientIp(req) {
  const xff = req.headers["x-forwarded-for"];
  if (xff) return String(xff).split(",")[0].trim();
  return req.socket.remoteAddress || "unknown";
}

function hostAllowed(req) {
  const src = req.headers.origin || req.headers.referer;
  if (!src) return false;
  try {
    return ALLOWED_HOSTS.includes(new URL(src).hostname.toLowerCase());
  } catch {
    return false;
  }
}

// У хостера фильтруется ЧАСТЬ подсети Telegram: DNS отдаёт 149.154.166.110
// (закрыт), при этом 149.154.167.220/.99 доступны. Поэтому шлём с перебором:
// сначала известные рабочие IP c SNI=api.telegram.org (TLS-сертификат
// валидируется по servername, соединение честное), затем обычный DNS.
const TG_ENDPOINTS = [
  { host: "149.154.167.220", servername: "api.telegram.org" },
  { host: "149.154.167.99", servername: "api.telegram.org" },
  { host: "api.telegram.org" },
];

function sendTelegramVia(endpoint, payload) {
  return new Promise((resolve, reject) => {
    const req = https.request(
      {
        host: endpoint.host,
        servername: endpoint.servername || undefined,
        path: `/bot${TOKEN}/sendMessage`,
        method: "POST",
        headers: {
          Host: "api.telegram.org",
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(payload),
        },
        timeout: 8000,
      },
      (res) => {
        let data = "";
        res.on("data", (c) => (data += c));
        res.on("end", () => {
          if (res.statusCode >= 200 && res.statusCode < 300) resolve(data);
          else reject(new Error(`TG ${res.statusCode}: ${data}`));
        });
      }
    );
    req.on("error", (e) => reject(new Error(`${e.code || ""} ${e.message}`)));
    req.on("timeout", () => req.destroy(new Error("TG timeout")));
    req.write(payload);
    req.end();
  });
}

async function sendTelegram(text) {
  const payload = JSON.stringify({
    chat_id: CHAT_ID,
    text,
    parse_mode: "HTML",
    disable_web_page_preview: true,
  });
  let lastErr;
  for (const ep of TG_ENDPOINTS) {
    try {
      return await sendTelegramVia(ep, payload);
    } catch (e) {
      lastErr = e;
      console.error(`telegram via ${ep.host} failed: ${e.message}`);
    }
  }
  throw lastErr || new Error("TG unreachable");
}

function buildMessage(d) {
  const lines = [];
  lines.push("🔔 <b>Новая заявка — Навылет! AI</b>");
  lines.push("");
  if (d.name) lines.push(`👤 <b>Имя:</b> ${esc(clip(d.name, 120))}`);
  if (d.phone) lines.push(`📞 <b>Телефон:</b> ${esc(clip(d.phone, 60))}`);
  if (d.company) lines.push(`🏢 <b>Компания:</b> ${esc(clip(d.company, 160))}`);
  if (d.email) lines.push(`✉️ <b>Email:</b> ${esc(clip(d.email, 160))}`);

  if (d.version) lines.push(`⚙️ <b>Версия:</b> ${esc(clip(d.version, 40))}`);
  const plan = [];
  if (d.plan) plan.push(esc(clip(d.plan, 60)));
  if (d.channel) plan.push(esc(clip(d.channel, 40)));
  if (plan.length) lines.push(`📦 <b>Тариф:</b> ${plan.join(" · ")}`);
  if (d.monthly_price) lines.push(`💰 <b>Цена/мес:</b> ${esc(clip(d.monthly_price, 40))} ₽`);
  if (d.dialogs) lines.push(`💬 <b>Диалогов/мес:</b> ${esc(clip(d.dialogs, 40))}`);
  if (d.dialogs_range) lines.push(`💬 <b>Объём:</b> ${esc(clip(d.dialogs_range, 60))}`);

  const utm = [];
  for (const k of ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"]) {
    if (d[k]) utm.push(`${k}=${esc(clip(d[k], 80))}`);
  }
  if (utm.length) lines.push(`🎯 <b>UTM:</b> ${utm.join(", ")}`);

  const meta = [];
  if (d.source) meta.push(esc(clip(d.source, 40)));
  if (d.page) meta.push(esc(clip(d.page, 200)));
  if (meta.length) lines.push(`🧭 <b>Источник:</b> ${meta.join(" · ")}`);

  lines.push("");
  lines.push(
    `🕒 ${new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" })} (МСК)`
  );
  return lines.join("\n");
}

function json(res, code, obj) {
  const body = JSON.stringify(obj);
  res.writeHead(code, {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(body),
  });
  res.end(body);
}

const server = http.createServer((req, res) => {
  const path = (req.url || "").split("?")[0];

  if (req.method === "GET" && path === "/api/health") {
    return json(res, 200, {
      ok: true,
      configured: Boolean(TOKEN && CHAT_ID),
    });
  }

  if (req.method !== "POST" || path !== "/api/lead") {
    return json(res, 404, { ok: false, error: "not_found" });
  }

  const ip = clientIp(req);
  if (rateLimited(ip)) return json(res, 429, { ok: false, error: "rate_limited" });
  if (!hostAllowed(req)) return json(res, 403, { ok: false, error: "forbidden" });

  let body = "";
  let aborted = false;
  req.on("data", (chunk) => {
    body += chunk;
    if (body.length > MAX_BODY) {
      aborted = true;
      json(res, 413, { ok: false, error: "too_large" });
      req.destroy();
    }
  });
  req.on("end", async () => {
    if (aborted) return;
    let d;
    try {
      d = JSON.parse(body || "{}");
    } catch {
      return json(res, 400, { ok: false, error: "bad_json" });
    }

    // Honeypot: скрытое поле, которое заполняют только боты.
    if (d.company_website) return json(res, 200, { ok: true });

    if (!d.name && !d.phone && !d.email) {
      return json(res, 400, { ok: false, error: "empty" });
    }

    if (!TOKEN || !CHAT_ID) {
      console.error("proxy not configured: TG_BOT_TOKEN/TG_CHAT_ID missing");
      return json(res, 503, { ok: false, error: "not_configured" });
    }

    try {
      await sendTelegram(buildMessage(d));
      return json(res, 200, { ok: true });
    } catch (e) {
      console.error("telegram send failed:", e.message);
      return json(res, 502, { ok: false, error: "send_failed" });
    }
  });
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(
    `navilet-proxy listening on :${PORT} (configured=${Boolean(
      TOKEN && CHAT_ID
    )}, hosts=${ALLOWED_HOSTS.join(",")})`
  );
});
