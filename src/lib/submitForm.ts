const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? "";

export async function submitLeadForm(form: HTMLFormElement, planName?: string | null) {
  const data = new FormData(form);
  data.append("access_key", WEB3FORMS_KEY);
  data.append("subject", planName
    ? `Новая заявка — навылет AI (тариф «${planName}»)`
    : "Новая заявка — навылет AI"
  );
  data.append("from_name", "навылет AI — Заявка с сайта");

  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    body: data,
  });

  if (!res.ok) throw new Error("Ошибка отправки");
  const json = await res.json();
  if (!json.success) throw new Error(json.message || "Ошибка отправки");
  return json;
}
