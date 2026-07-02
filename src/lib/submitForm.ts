const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? "";

export interface LeadFormMeta {
  planName?: string | null;
  channelLabel?: string | null;
  monthlyPrice?: number | null;
  dialogs?: number | null;
  /** Откуда пришла заявка: "modal" | "section_cta" | ... */
  source?: string | null;
}

/**
 * Дублирует заявку в Telegram через собственный прокси (/api/lead).
 * Токен бота живёт на сервере, а не в коде сайта. Ошибку глушим —
 * это дополнительный канал уведомлений, он не должен ломать сабмит.
 */
async function notifyTelegram(
  data: FormData,
  meta: LeadFormMeta
): Promise<void> {
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
      source: meta.source ?? "",
      page: typeof window !== "undefined" ? window.location.pathname : "",
      ...utm,
    };

    await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    });
  } catch {
    // Telegram — вспомогательный канал; email через Web3Forms остаётся основным.
  }
}

/**
 * Submit lead form to web3forms. Backwards compatible: accepts either
 * a plain plan name string (legacy) or a richer meta object.
 */
export async function submitLeadForm(
  form: HTMLFormElement,
  meta?: string | LeadFormMeta | null
) {
  const data = new FormData(form);
  data.append("access_key", WEB3FORMS_KEY);

  const normalized: LeadFormMeta =
    typeof meta === "string" ? { planName: meta } : meta ?? {};

  const { planName, channelLabel, monthlyPrice, dialogs } = normalized;

  // Дублируем в Telegram параллельно с отправкой на email (не блокируем UX).
  void notifyTelegram(data, normalized);

  // Subject
  const subjectParts: string[] = ["Новая заявка — Навылет! AI"];
  if (planName) subjectParts.push(`тариф «${planName}»`);
  if (channelLabel) subjectParts.push(`канал ${channelLabel}`);
  data.append("subject", subjectParts.join(" · "));
  data.append("from_name", "Навылет! AI — Заявка с сайта");

  // Hidden context fields — попадут в письмо как отдельные поля
  if (planName) data.append("plan", planName);
  if (channelLabel) data.append("channel", channelLabel);
  if (monthlyPrice != null) data.append("monthly_price_rub", String(monthlyPrice));
  if (dialogs != null) data.append("dialogs_per_month", String(dialogs));

  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    body: data,
  });

  if (!res.ok) throw new Error("Ошибка отправки");
  const json = await res.json();
  if (!json.success) throw new Error(json.message || "Ошибка отправки");
  return json;
}
