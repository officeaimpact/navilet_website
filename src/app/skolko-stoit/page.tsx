import type { ReactNode } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/sections/Navigation";
import Footer from "@/components/sections/Footer";
import FloatingCTA from "@/components/ui/FloatingCTA";
import RegisterCta from "@/components/seo/RegisterCta";
import {
  pricingPlans,
  crossChannelAddons,
  costAlternatives,
  costPaybackPoints,
  skolkoStoitFaqItems,
  networkResults,
  trial,
} from "@/lib/content";
import {
  ChevronRight,
  Check,
  Wallet,
  Target,
  Gem,
  ArrowRight,
  Sparkles,
  Calculator,
} from "lucide-react";
import { jsonLdScript } from "@/lib/schema";

const siteUrl = "https://navilet.ru";

/** Дата последней проверки цен — показываем на странице и в разметке. */
const priceCheckedAt = "2026-08-13";
const priceCheckedLabel = "13 августа 2026";

/** Цена с неразрывными пробелами: «1 990 ₽» не рвётся по строкам. */
const rub = (value: number) => `${value.toLocaleString("ru-RU")}\u00A0₽`;

const lidPlans = pricingPlans.map((p) => ({
  name: p.name,
  price: p.lid.price,
  dialogs: p.lid.dialogs,
  extraDialog: p.lid.extraDialog,
  perDialog: p.lid.effectivePerDialog,
}));

const proPlans = pricingPlans.map((p) => ({
  name: p.name,
  price: p.price,
  dialogs: p.dialogs,
  extraDialog: p.extraDialog,
  perDialog: p.effectivePerDialog,
}));

const minLid = Math.min(...lidPlans.map((p) => p.price));
const maxLid = Math.max(...lidPlans.map((p) => p.price));
const minPro = Math.min(...proPlans.map((p) => p.price));
const maxPro = Math.max(...proPlans.map((p) => p.price));

export const metadata: Metadata = {
  title: {
    absolute:
      "Сколько стоит ИИ-ассистент для турагентства — от 990 ₽/мес | Навылет! AI",
  },
  description:
    "Стоимость ИИ-ассистента для турагентства: от 990 ₽/мес за 40 диалогов в версии «Лид», от 1 990 ₽/мес в версии «Про». Подключение 0 ₽, первый месяц бесплатно. Сравнение с разработкой бота, конструкторами и наймом менеджера, расчёт окупаемости.",
  keywords: [
    "сколько стоит ИИ для турагентства",
    "сколько стоит чат-бот для турагентства",
    "ИИ-ассистент для турагентства цена",
    "чат-бот для турагентства цена",
    "стоимость автоматизации турагентства",
    "недорогой чат-бот для турагентства",
    "ИИ-ассистент от 990 рублей",
    "окупаемость ИИ в турагентстве",
  ],
  alternates: { canonical: "/skolko-stoit" },
  openGraph: {
    title:
      "Сколько стоит ИИ-ассистент для турагентства — от 990 ₽/мес",
    description:
      "Полный разбор стоимости: тарифы обеих версий, цена диалога, сравнение с разработкой бота и наймом менеджера, расчёт окупаемости. Подключение 0 ₽, первый месяц бесплатно.",
    url: `${siteUrl}/skolko-stoit`,
    type: "article",
    locale: "ru_RU",
    images: [{ url: "/og-image.png", width: 1376, height: 768 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Сколько стоит ИИ-ассистент для турагентства — от 990 ₽/мес",
    description:
      "Тарифы обеих версий, цена за диалог, сравнение с альтернативами и расчёт окупаемости. Первый месяц бесплатно.",
    images: ["/og-image.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "@id": `${siteUrl}/skolko-stoit#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Главная", item: siteUrl },
        {
          "@type": "ListItem",
          position: 2,
          name: "Сколько стоит",
          item: `${siteUrl}/skolko-stoit`,
        },
      ],
    },
    {
      "@type": "WebPage",
      "@id": `${siteUrl}/skolko-stoit#webpage`,
      url: `${siteUrl}/skolko-stoit`,
      name: "Сколько стоит ИИ-ассистент для турагентства",
      description:
        "Стоимость ИИ-ассистента для турагентства: тарифы версий «Лид» и «Про», цена за диалог, сравнение с разработкой бота и наймом менеджера, расчёт окупаемости.",
      inLanguage: "ru-RU",
      isPartOf: { "@id": `${siteUrl}/#website` },
      breadcrumb: { "@id": `${siteUrl}/skolko-stoit#breadcrumb` },
      about: { "@id": `${siteUrl}/#product` },
      publisher: { "@id": `${siteUrl}/#organization` },
      datePublished: priceCheckedAt,
      dateModified: priceCheckedAt,
    },
    {
      // AggregateOffer с lowPrice даёт Яндексу сниппет «от 990 ₽»
      // и отвечает LLM на вопрос «сколько стоит» одной строкой.
      "@type": "Product",
      "@id": `${siteUrl}/skolko-stoit#product`,
      name: "ИИ-ассистент «Навылет! AI» для турагентств",
      description:
        "Подписка на ИИ-ассистента для турагентства: подбор туров по базе Tourvisor, живой диалог на сайте и в MAX, готовая заявка менеджеру. Две версии — «Лид» и «Про».",
      brand: { "@id": `${siteUrl}/#organization` },
      category: "Программное обеспечение для турагентств",
      url: `${siteUrl}/skolko-stoit`,
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "RUB",
        lowPrice: String(minLid),
        highPrice: String(maxPro),
        offerCount: pricingPlans.length * 2,
        availability: "https://schema.org/InStock",
        url: `${siteUrl}/tarify`,
        eligibleRegion: { "@type": "Country", name: "Россия" },
        offers: [
          ...lidPlans.map((p) => ({
            "@type": "Offer",
            name: `${p.name} — версия «Лид»`,
            description: `${p.dialogs} диалогов в месяц, сверхлимитный диалог ${p.extraDialog} ₽`,
            price: String(p.price),
            priceCurrency: "RUB",
            availability: "https://schema.org/InStock",
            url: `${siteUrl}/tarify`,
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: String(p.price),
              priceCurrency: "RUB",
              unitText: "MONTHLY",
              billingDuration: 1,
              referenceQuantity: {
                "@type": "QuantitativeValue",
                value: p.dialogs,
                unitText: "диалогов в месяц",
              },
            },
          })),
          ...proPlans.map((p) => ({
            "@type": "Offer",
            name: `${p.name} — версия «Про»`,
            description: `${p.dialogs} диалогов в месяц, сверхлимитный диалог ${p.extraDialog} ₽`,
            price: String(p.price),
            priceCurrency: "RUB",
            availability: "https://schema.org/InStock",
            url: `${siteUrl}/tarify`,
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: String(p.price),
              priceCurrency: "RUB",
              unitText: "MONTHLY",
              billingDuration: 1,
              referenceQuantity: {
                "@type": "QuantitativeValue",
                value: p.dialogs,
                unitText: "диалогов в месяц",
              },
            },
          })),
        ],
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${siteUrl}/skolko-stoit#faq`,
      mainEntity: skolkoStoitFaqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
  ],
};

const included = [
  "Виджет в вашем фирменном стиле: логотип, цвет, название агентства",
  "Интеграция с базой туров Tourvisor — 50+ стран и 500+ курортов",
  "База знаний агентства: свои условия, рассрочки, документы, регламенты",
  "Передача заявок в CRM, Telegram менеджеров и на почту",
  "Личный кабинет: диалоги, заявки, аналитика, подборки",
  "Обновления продукта и поддержка — без отдельной оплаты",
];

/** Таблица тарифов одной версии. На телефоне разворачивается в стек. */
function PlanTable({
  plans,
  versionName,
  accentIcon,
}: {
  plans: typeof lidPlans;
  versionName: string;
  accentIcon: ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-blue-subtle/50">
      <div className="flex items-center gap-2 bg-surface-alt px-4 py-3 sm:px-5">
        {accentIcon}
        <span className="font-display text-base font-bold text-heading">
          Версия «{versionName}»
        </span>
      </div>
      <div className="sm:overflow-x-auto">
        <table className="block w-full text-sm sm:table sm:min-w-[560px]">
          <thead className="hidden sm:table-header-group">
            <tr className="bg-blue-ice/40">
              <th className="px-4 py-3 text-left font-semibold text-heading sm:px-5">
                Тариф
              </th>
              <th className="px-4 py-3 text-left font-semibold text-heading sm:px-5">
                Цена в месяц
              </th>
              <th className="px-4 py-3 text-left font-semibold text-heading sm:px-5">
                Диалогов
              </th>
              <th className="px-4 py-3 text-left font-semibold text-heading sm:px-5">
                Цена диалога
              </th>
              <th className="px-4 py-3 text-left font-semibold text-heading sm:px-5">
                Сверх лимита
              </th>
            </tr>
          </thead>
          <tbody className="block sm:table-row-group">
            {plans.map((p) => (
              <tr
                key={p.name}
                className="grid grid-cols-2 gap-x-4 gap-y-2 border-t border-blue-subtle/30 bg-white px-4 py-3.5 sm:table-row sm:px-0 sm:py-0"
              >
                <td className="col-span-2 block font-semibold text-heading sm:table-cell sm:px-5 sm:py-3 sm:font-medium">
                  {p.name}
                </td>
                <td className="block sm:table-cell sm:px-5 sm:py-3">
                  <span className="mb-0.5 block text-[11px] font-bold uppercase tracking-wide text-muted sm:hidden">
                    Цена в месяц
                  </span>
                  <span className="font-semibold text-accent">
                    {rub(p.price)}
                  </span>
                </td>
                <td className="block sm:table-cell sm:px-5 sm:py-3">
                  <span className="mb-0.5 block text-[11px] font-bold uppercase tracking-wide text-muted sm:hidden">
                    Диалогов
                  </span>
                  <span className="text-body">{p.dialogs}</span>
                </td>
                <td className="block sm:table-cell sm:px-5 sm:py-3">
                  <span className="mb-0.5 block text-[11px] font-bold uppercase tracking-wide text-muted sm:hidden">
                    Цена диалога
                  </span>
                  <span className="text-body">≈ {rub(p.perDialog)}</span>
                </td>
                <td className="block sm:table-cell sm:px-5 sm:py-3">
                  <span className="mb-0.5 block text-[11px] font-bold uppercase tracking-wide text-muted sm:hidden">
                    Сверх лимита
                  </span>
                  <span className="text-body">{rub(p.extraDialog)}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function SkolkoStoitPage() {
  const liteLid = pricingPlans[0].lid;
  const liteAddonLid = crossChannelAddons[0].lid;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }}
      />
      <Navigation />
      <main>
        {/* Breadcrumbs */}
        <nav
          aria-label="Хлебные крошки"
          className="mx-auto max-w-7xl px-5 pt-24 sm:px-6 lg:px-8 lg:pt-28"
        >
          <ol className="flex items-center gap-1 text-sm text-muted">
            <li>
              <Link href="/" className="transition-colors hover:text-accent">
                Главная
              </Link>
            </li>
            <li>
              <ChevronRight className="h-4 w-4" aria-hidden />
            </li>
            <li aria-current="page" className="font-semibold text-heading">
              Сколько стоит
            </li>
          </ol>
        </nav>

        {/* Ответ первым экраном: короткий факт, который можно процитировать */}
        <section className="mx-auto max-w-4xl px-5 py-10 sm:px-6 sm:py-14 lg:px-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5">
            <Wallet className="h-4 w-4 text-accent" />
            <span className="text-xs font-semibold text-accent sm:text-sm">
              Цены проверены {priceCheckedLabel}
            </span>
          </div>
          <h1 className="font-display text-4xl font-bold leading-tight text-heading sm:text-5xl">
            Сколько стоит ИИ-ассистент для турагентства
          </h1>

          <div className="mt-6 rounded-2xl border border-blue-subtle/50 bg-white p-6 shadow-card sm:p-7">
            <p className="text-lg font-semibold leading-relaxed text-heading sm:text-xl">
              От {rub(minLid)} в месяц.
            </p>
            <p className="mt-3 text-base leading-relaxed text-body sm:text-lg">
              За эти деньги агентство получает ассистента, который круглосуточно
              ведёт живой диалог на сайте или в MAX, подбирает туры по реальной
              базе с ценами и наличием и передаёт менеджеру готовую заявку с
              контактом клиента. Подключение — 0 ₽, первый месяц бесплатно.
              Дальше цена зависит только от числа диалогов: {rub(maxLid)} в
              месяц — это уже 500 диалогов.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              {
                value: rub(minLid),
                label: "цена входа в месяц",
                note: "версия «Лид», 40 диалогов",
              },
              {
                value: "0 ₽",
                label: "подключение и настройка",
                note: "на всех тарифах, без договора на внедрение",
              },
              {
                value: `${trial.days} дней`,
                label: "бесплатно на старте",
                note: trial.capLabel,
              },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-blue-subtle/40 bg-surface-alt p-5"
              >
                <p className="font-display text-2xl font-bold text-accent">
                  {item.value}
                </p>
                <p className="mt-1 text-sm font-semibold text-heading">
                  {item.label}
                </p>
                <p className="mt-1 text-xs text-muted">{item.note}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Тарифы обеих версий */}
        <section className="bg-surface-alt">
          <div className="mx-auto max-w-5xl px-5 py-14 sm:px-6 lg:px-8 lg:py-16">
            <h2 className="font-display text-3xl font-bold text-heading sm:text-4xl">
              Сколько стоят тарифы: две версии, по пять шагов в каждой
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-body">
              Ассистент выпускается в двух версиях.{" "}
              <Link
                href="/versii"
                className="font-semibold text-accent hover:text-accent-hover"
              >
                «Лид»
              </Link>{" "}
              собирает заявки для живых менеджеров и стоит от {rub(minLid)} до{" "}
              {rub(maxLid)} в месяц. «Про» сам консультирует клиента, проверяет
              цены в диалоге и возвращает ушедших — от {rub(minPro)} до{" "}
              {rub(maxPro)} в месяц. Внутри версии цена растёт только вместе с
              числом диалогов: чем больше пакет, тем дешевле один диалог.
            </p>

            <div className="mt-9 space-y-6">
              <PlanTable
                plans={lidPlans}
                versionName="Лид"
                accentIcon={<Target className="h-4 w-4 text-accent" />}
              />
              <PlanTable
                plans={proPlans}
                versionName="Про"
                accentIcon={<Gem className="h-4 w-4 text-accent" />}
              />
            </div>

            <div className="mt-6 rounded-2xl border border-blue-subtle/50 bg-white p-5 sm:p-6">
              <h3 className="font-display text-lg font-bold text-heading">
                Сколько стоит работать сразу на сайте и в MAX
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-body sm:text-base">
                Базовый тариф работает в одном канале на выбор. Второй канал —
                надстройка с льготным лимитом диалогов: доплата от{" "}
                {rub(liteAddonLid.addonPrice)} в месяц в версии «Лид» и от{" "}
                {rub(crossChannelAddons[0].addonPrice)} в версии «Про».
                Например, Lite «Лид» с двумя каналами — это{" "}
                {rub(liteAddonLid.totalPrice)} в месяц и{" "}
                {liteAddonLid.totalDialogs} диалогов вместо {liteLid.dialogs}.
              </p>
              <Link
                href="/tarify"
                className="mt-4 inline-flex min-h-10 items-center gap-1.5 text-sm font-semibold text-accent transition-colors hover:text-accent-hover"
              >
                Полные тарифы со всеми условиями
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Сравнение с альтернативами */}
        <section className="mx-auto max-w-5xl px-5 py-14 sm:px-6 lg:px-8 lg:py-16">
          <h2 className="font-display text-3xl font-bold text-heading sm:text-4xl">
            Почему 990 ₽ — это мало для такой задачи
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-body">
            Сравнивать подписку честно нужно не с ценой, а с задачей: клиент
            пишет ночью «хочу в Турцию на неделю, бюджет 200 тысяч» — и должен
            получить конкретные варианты с ценами, а агентство — заявку с
            контактом. Вот сколько стоят другие способы закрыть эту задачу.
          </p>

          <div className="mt-9 space-y-4">
            {costAlternatives.map((alt) => (
              <div
                key={alt.title}
                className={`rounded-2xl border p-5 sm:p-6 ${
                  alt.highlight
                    ? "border-accent/40 bg-accent/5 shadow-card"
                    : "border-blue-subtle/50 bg-white"
                }`}
              >
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                  <h3 className="font-display text-lg font-bold text-heading">
                    {alt.title}
                  </h3>
                  <p className="shrink-0 font-display text-lg font-bold text-accent">
                    {alt.price}
                  </p>
                </div>
                <p className="mt-1 text-xs text-muted">{alt.priceNote}</p>
                <p className="mt-3 text-sm leading-relaxed text-body sm:text-base">
                  {alt.limits}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-6 text-sm leading-relaxed text-muted">
            Цены альтернатив — рыночные оценки по открытым прайсам и публичным
            расценкам студий на август 2026 года. Мы называем категории решений,
            а не бренды: прайсы конкурентов меняются чаще, чем эта страница.
          </p>
        </section>

        {/* Что входит */}
        <section className="bg-surface-alt">
          <div className="mx-auto max-w-4xl px-5 py-14 sm:px-6 lg:px-8 lg:py-16">
            <h2 className="font-display text-3xl font-bold text-heading sm:text-4xl">
              Что уже входит в подписку и не требует доплат
            </h2>
            <p className="mt-4 text-base leading-relaxed text-body">
              В подписке нет скрытых частей: разовых платежей за внедрение,
              оплаты за интеграцию с агрегатором и отдельного счёта за расходы
              на ИИ-модель не существует.
            </p>
            <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {included.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-xl border border-blue-subtle/40 bg-white p-4 text-sm leading-relaxed text-body"
                >
                  <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-accent/10">
                    <Check className="h-3 w-3 text-accent" />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Окупаемость */}
        <section className="mx-auto max-w-5xl px-5 py-14 sm:px-6 lg:px-8 lg:py-16">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5">
            <Calculator className="h-4 w-4 text-accent" />
            <span className="text-xs font-semibold text-accent sm:text-sm">
              Считаем на данных сети партнёров
            </span>
          </div>
          <h2 className="font-display text-3xl font-bold text-heading sm:text-4xl">
            Когда подписка окупается
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-body">
            Подписка на ассистента — это не расход на инструмент, а цена лида.
            Поэтому считать окупаемость проще всего так: сколько стоил один
            квалифицированный лид и что приносит одна бронь.
          </p>

          <div className="mt-9 grid grid-cols-1 gap-5 md:grid-cols-3">
            {costPaybackPoints.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-blue-subtle/50 bg-white p-6 shadow-card"
              >
                <p className="font-display text-2xl font-bold text-accent sm:text-3xl">
                  {item.stat}
                </p>
                <p className="mt-1 text-sm font-semibold text-heading">
                  {item.label}
                </p>
                <p className="mt-2.5 text-sm leading-relaxed text-body">
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-6 max-w-3xl text-xs leading-relaxed text-muted">
            {networkResults.footnote}
          </p>
        </section>

        {/* От чего зависит цена */}
        <section className="bg-surface-alt">
          <div className="mx-auto max-w-4xl px-5 py-14 sm:px-6 lg:px-8 lg:py-16">
            <h2 className="font-display text-3xl font-bold text-heading sm:text-4xl">
              От чего зависит итоговая цена
            </h2>
            <div className="mt-8 space-y-5">
              {[
                {
                  title: "Число диалогов в месяц",
                  text: "Единственный счётчик в подписке. Диалог — это одна законченная беседа с клиентом, а не сообщение: сколько бы реплик человек ни написал, считается один диалог. Начинать разумно с тарифа под текущий трафик сайта: пересчитать пакет можно в любой момент.",
                },
                {
                  title: "Версия ассистента",
                  text: "«Лид» дешевле, потому что решает более узкую задачу: довести человека до заявки и передать её менеджеру. «Про» стоит дороже, потому что консультирует без ограничений, проверяет цены в диалоге и возвращает клиентов в MAX.",
                },
                {
                  title: "Количество каналов",
                  text: "Сайт и MAX-мессенджер считаются отдельными каналами. Один канал уже включён в тариф, второй подключается надстройкой с дополнительным лимитом диалогов по льготной цене.",
                },
                {
                  title: "Диалоги сверх лимита",
                  text: `Если поток вырос, ассистент не отключается: сверхлимитные диалоги считаются по фиксированной цене — от\u00A0${rub(pricingPlans[0].lid.extraDialog)} на тарифе Lite до ${rub(pricingPlans[4].lid.extraDialog)} на тарифе «Сеть» в версии «Лид».`,
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-blue-subtle/40 bg-white p-5 sm:p-6"
                >
                  <h3 className="font-display text-lg font-bold text-heading">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-body sm:text-base">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mx-auto max-w-3xl px-5 py-14 sm:px-6 lg:px-8 lg:py-16">
          <h2 className="mb-8 font-display text-3xl font-bold text-heading sm:text-4xl">
            Частые вопросы про стоимость
          </h2>
          <div className="space-y-4">
            {skolkoStoitFaqItems.map((item) => (
              <details
                key={item.question}
                className="group rounded-2xl border border-blue-subtle/40 bg-white p-5 shadow-card sm:p-6"
              >
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 font-display text-base font-bold text-heading [&::-webkit-details-marker]:hidden">
                  {item.question}
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-body">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link
              href="/tarify"
              className="inline-flex min-h-10 items-center gap-1.5 text-sm font-semibold text-accent transition-colors hover:text-accent-hover"
            >
              Все тарифы и условия
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/versii"
              className="inline-flex min-h-10 items-center gap-1.5 text-sm font-semibold text-accent transition-colors hover:text-accent-hover"
            >
              Сравнение версий «Лид» и «Про»
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/voprosy"
              className="inline-flex min-h-10 items-center gap-1.5 text-sm font-semibold text-accent transition-colors hover:text-accent-hover"
            >
              Другие вопросы про ИИ в турагентстве
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-surface-alt">
          <div className="mx-auto max-w-3xl px-5 py-16 text-center sm:px-6 lg:px-8 lg:py-20">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-white px-4 py-1.5">
              <Sparkles className="h-4 w-4 text-accent" />
              <span className="text-xs font-semibold text-accent sm:text-sm">
                Первый месяц бесплатно · {trial.capLabel}
              </span>
            </div>
            <h2 className="font-display text-3xl font-bold text-heading sm:text-4xl">
              Проверьте цену на своих клиентах
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-body sm:text-lg">
              Месяц работы ассистента ничего не стоит, а после теста в личном
              кабинете уже видно, сколько диалогов у вас реально бывает — и какой
              тариф нужен. Дальше от {rub(minLid)} в месяц.
            </p>
            <div className="mt-8 flex justify-center">
              <RegisterCta source="skolko_stoit_cta" />
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
