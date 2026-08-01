const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? "";

export interface LeadFormMeta {
  planName?: string | null;
  channelLabel?: string | null;
  monthlyPrice?: number | null;
  dialogs?: number | null;
  /** Диапазон из квалификации в форме, например «до 120 диалогов/мес». */
  dialogsRange?: string | null;
  /** Откуда пришла заявка: "modal" | "section_cta" | ... */
  source?: string | null;
}

/**
 * Дублирует заявку в Telegram через собственный прокси (/api/lead).
 * Токен бота живёт на сервере, а не в коде сайта.
 * Возвращает true, если прокси подтвердил доставку.
 */
async function notifyTelegram(
  data: FormData,
  meta: LeadFormMeta
): Promise<boolean> {
  try {
    const utm: Record<string, string> = {};
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      for (const k of [
        "utm_source",
        "utm_medium",
        "utm_campaign",
        "utm_content",
        "utm_term",
      ]) {
        const v = params.get(k);
        if (v) utm[k] = v;
      }
    }

    const payload = {
      name: (data.get("name") as string) || "",
      phone: (data.get("phone") as string) || "",
      company: (data.get("company") as string) || "",
      email: (data.get("email") as string) || "",
      company_website: (data.get("company_website") as string) || "",
      plan: meta.planName ?? "",
      channel: meta.channelLabel ?? "",
      monthly_price: meta.monthlyPrice != null ? String(meta.monthlyPrice) : "",
      dialogs: meta.dialogs != null ? String(meta.dialogs) : "",
      dialogs_range: meta.dialogsRange ?? "",
      source: meta.source ?? "",
      page: typeof window !== "undefined" ? window.location.pathname : "",
      ...utm,
    };

    const res = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    });
    return res.ok;
  } catch {
    return false;
  }
}

/**
 * Отправляет заявку в два канала — email (Web3Forms) и Telegram (свой прокси).
 * Бросает ошибку, только если не сработал ни один. Принимает либо имя тарифа
 * строкой (legacy-вызовы), либо объект с контекстом заявки.
 */
export async function submitLeadForm(
  form: HTMLFormElement,
  meta?: string | LeadFormMeta | null
) {
  const data = new FormData(form);
  data.append("access_key", WEB3FORMS_KEY);

  const normalized: LeadFormMeta =
    typeof meta === "string" ? { planName: meta } : meta ?? {};

  const { planName, channelLabel, monthlyPrice, dialogs, dialogsRange } =
    normalized;

  // Оба канала идут параллельно: Telegram — через свой прокси, email — через
  // Web3Forms. Заявка засчитывается, если сработал хотя бы один: api.web3forms.com
  // у части клиентов режется провайдером, и терять из-за этого лид нельзя.
  const telegramSent = notifyTelegram(data, normalized);

  // Subject
  const subjectParts: string[] = ["Новая заявка — Навылет! AI"];
  if (planName) subjectParts.push(`тариф «${planName}»`);
  if (dialogsRange) subjectParts.push(dialogsRange);
  if (channelLabel) subjectParts.push(`канал ${channelLabel}`);
  data.append("subject", subjectParts.join(" · "));
  data.append("from_name", "Навылет! AI — Заявка с сайта");

  // Hidden context fields — попадут в письмо как отдельные поля
  if (planName) data.append("plan", planName);
  if (channelLabel) data.append("channel", channelLabel);
  if (monthlyPrice != null) data.append("monthly_price_rub", String(monthlyPrice));
  if (dialogs != null) data.append("dialogs_per_month", String(dialogs));
  if (dialogsRange) data.append("dialogs_range", dialogsRange);

  let emailOk = false;
  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: data,
    });
    const json = await res.json();
    emailOk = res.ok && Boolean(json?.success);
  } catch {
    emailOk = false;
  }

  const tgOk = await telegramSent;

  if (!emailOk && !tgOk) {
    throw new Error(
      "Не удалось отправить заявку. Попробуйте ещё раз или позвоните нам — ответим сразу."
    );
  }

  return { emailOk, tgOk };
}
