const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? "";

export interface LeadFormMeta {
  planName?: string | null;
  channelLabel?: string | null;
  monthlyPrice?: number | null;
  dialogs?: number | null;
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
