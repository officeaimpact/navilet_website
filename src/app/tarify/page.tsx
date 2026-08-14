import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/sections/Navigation";
import Footer from "@/components/sections/Footer";
import Pricing from "@/components/sections/Pricing";
import FloatingCTA from "@/components/ui/FloatingCTA";
import {
  pricingPlans,
  crossChannelAddons,
  tarifyFaqItems,
} from "@/lib/content";
import { ChevronRight, Check, Sparkles, Phone, Mail } from "lucide-react";
import { jsonLdScript } from "@/lib/schema";

export const metadata: Metadata = {
  title: { absolute: "Тарифы ИИ-ассистента — от 990 ₽/мес | Навылет! AI" },
  description:
    "Тарифы ИИ-ассистента для турагентств в двух версиях: «Лид» (лидогенерация) — от 990 ₽/мес, «Про» (консультации и возврат клиентов) — от 1 990 ₽/мес. Web-виджет или MAX-мессенджер. Подключение 0 ₽, первый месяц бесплатно.",
  keywords: [
    "тарифы ИИ-ассистент",
    "стоимость ИИ-ассистент для турагентства",
    "цена чат-бот турагентство",
    "ИИ виджет цена",
    "Навылет! AI тарифы",
    "подключить ИИ-ассистент",
    "виджет подбора туров цена",
    "автоматизация турагентства стоимость",
    "MAX-мессенджер для турагентства",
    "ИИ лидогенерация цена",
  ],
  alternates: { canonical: "/tarify" },
  openGraph: {
    title: "Тарифы ИИ-ассистента «Навылет! AI» — от 990 ₽/мес",
    description:
      "Две версии: «Лид» для лидогенерации от 990 ₽/мес и «Про» с консультациями и возвратом клиентов от 1 990 ₽/мес. Прозрачная цена за диалог, без скрытых платежей.",
    url: "https://navilet.ru/tarify",
    type: "website",
    locale: "ru_RU",
    images: [{ url: "/og-image.png", width: 1376, height: 768 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Тарифы ИИ-ассистента «Навылет! AI» — от 990 ₽/мес",
    description:
      "«Лид» от 990 ₽/мес, «Про» от 1 990 ₽/мес. Первый месяц бесплатно.",
    images: ["/og-image.png"],
  },
};

const siteUrl = "https://navilet.ru";

const fmt = (n: number) => n.toLocaleString("ru-RU");

const tarifyJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "@id": `${siteUrl}/tarify#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Главная",
          item: siteUrl,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Тарифы",
          item: `${siteUrl}/tarify`,
        },
      ],
    },
    {
      "@type": "WebPage",
      "@id": `${siteUrl}/tarify#webpage`,
      url: `${siteUrl}/tarify`,
      name: "Тарифы ИИ-ассистента «Навылет! AI»",
      description:
        "Тарифы двух версий ИИ-ассистента: «Лид» от 990 ₽/мес и «Про» от 1 990 ₽/мес. Web-виджет или MAX-мессенджер. Надстройка «Второй канал».",
      inLanguage: "ru-RU",
      isPartOf: { "@id": `${siteUrl}/#website` },
      breadcrumb: { "@id": `${siteUrl}/tarify#breadcrumb` },
      about: { "@id": `${siteUrl}/#product` },
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "Product",
      "@id": `${siteUrl}/tarify#product`,
      name: "Навылет! AI — ИИ-ассистент (подписка)",
      description:
        "ИИ-ассистент для турагентств и туроператоров в двух версиях: «Лид» — лидогенерация и заявки менеджерам, «Про» — консультации, сопровождение и возврат клиентов. Работает в Web-виджете или MAX-мессенджере.",
      brand: { "@id": `${siteUrl}/#organization` },
      category: "B2B SaaS / TravelTech",
      image: `${siteUrl}/og-image.png`,
      // AggregateOffer с lowPrice — то, из чего Яндекс собирает сниппет
      // «от 990 ₽», а ИИ-поиск берёт ответ на «сколько стоит».
      offers: {
        "@type": "AggregateOffer",
        "@id": `${siteUrl}/tarify#offers`,
        priceCurrency: "RUB",
        lowPrice: String(
          Math.min(...pricingPlans.map((p) => p.lid.price))
        ),
        highPrice: String(Math.max(...pricingPlans.map((p) => p.price))),
        offerCount: pricingPlans.length * 2,
        availability: "https://schema.org/InStock",
        url: `${siteUrl}/tarify`,
        eligibleRegion: { "@type": "Country", name: "Россия" },
        offers: [
          ...pricingPlans.map((p) => ({
          "@type": "Offer",
          "@id": `${siteUrl}/tarify#offer-lid-${p.id}`,
          name: `${p.name} — версия «Лид»`,
          price: String(p.lid.price),
          priceCurrency: "RUB",
          url: `${siteUrl}/tarify#${p.id}`,
          availability: "https://schema.org/InStock",
          description: `Версия «Лид» (лидогенерация): ${p.lid.dialogs} диалогов в месяц. Подключение бесплатно. ${p.tagline}.`,
          eligibleRegion: { "@type": "Country", name: "Россия" },
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: String(p.lid.price),
            priceCurrency: "RUB",
            unitText: "MONTHLY",
            referenceQuantity: {
              "@type": "QuantitativeValue",
              value: p.lid.dialogs,
              unitText: "диалогов в месяц",
            },
          },
        })),
        ...pricingPlans.map((p) => ({
          "@type": "Offer",
          "@id": `${siteUrl}/tarify#offer-pro-${p.id}`,
          name: `${p.name} — версия «Про»`,
          price: String(p.price),
          priceCurrency: "RUB",
          url: `${siteUrl}/tarify#${p.id}`,
          availability: "https://schema.org/InStock",
          description: `Версия «Про» (консультации и возврат клиентов): ${p.dialogs} диалогов в месяц. Подключение бесплатно. ${p.tagline}.`,
          eligibleRegion: { "@type": "Country", name: "Россия" },
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: String(p.price),
            priceCurrency: "RUB",
            unitText: "MONTHLY",
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
      "@id": `${siteUrl}/tarify#faq`,
      mainEntity: tarifyFaqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
  ],
};

export default function TarifyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(tarifyJsonLd) }}
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
              Тарифы
            </li>
          </ol>
        </nav>

        {/* Hero */}
        {/* Отступ снизу маленький: следующий блок тарифов даёт свой py-24 */}
        <section className="mx-auto max-w-4xl px-5 pb-2 pt-10 text-center sm:px-6 sm:pb-3 sm:pt-14 lg:px-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5">
            <Sparkles className="h-4 w-4 text-accent" />
            <span className="text-xs font-semibold text-accent sm:text-sm">
              Первый месяц бесплатно · Подключение 0 ₽ · Отмена в любой момент
            </span>
          </div>
          <h1 className="font-display text-4xl font-bold leading-tight text-heading sm:text-5xl">
            Тарифы <span className="whitespace-nowrap text-accent">ИИ-ассистента</span>{" "}
            «Навылет! AI»
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-body sm:text-lg">
            Прозрачная подписка для турагентств и туроператоров в двух
            версиях: <strong className="font-semibold text-heading">«Лид»</strong> —
            лидогенерация от 990 ₽/мес,{" "}
            <strong className="font-semibold text-heading">«Про»</strong> —
            полный инструмент с консультациями и возвратом клиентов от
            1 990 ₽/мес. Каждый тариф работает в Web-виджете или
            MAX-мессенджере,{" "}
            <Link
              href="/versii"
              className="font-medium text-accent underline decoration-accent/30 underline-offset-2 hover:decoration-accent"
            >
              сравнить версии
            </Link>
            .
          </p>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-muted">
            Нужны оба канала сразу? Добавьте{" "}
            <a
              href="#cross-channel"
              className="font-medium text-accent underline decoration-accent/30 underline-offset-2 hover:decoration-accent"
            >
              «Второй канал»
            </a>{" "}
            к любому тарифу. Считаете бюджет и окупаемость?{" "}
            <Link
              href="/skolko-stoit"
              className="font-medium text-accent underline decoration-accent/30 underline-offset-2 hover:decoration-accent"
            >
              Разбор стоимости и сравнение с альтернативами
            </Link>
            .
          </p>
        </section>

        {/* Карточки, «Второй канал» и подключение — заголовок уже есть в hero */}
        <Pricing showHeader={false} />

        {/* Что входит в подписку */}
        <section className="bg-surface-alt">
          <div className="mx-auto max-w-5xl px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
            <h2 className="text-center font-display text-3xl font-bold text-heading sm:text-4xl">
              Что входит в любой тариф
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-base text-body">
              Базовые функции платформы доступны на всех тарифах обеих версий.
              Тарифы отличаются лимитом диалогов, а версии «Лид» и «Про» —
              глубиной консультаций и возвратом клиентов:{" "}
              <Link
                href="/versii"
                className="font-medium text-accent underline decoration-accent/30 underline-offset-2 hover:decoration-accent"
              >
                полное сравнение версий
              </Link>
              .
            </p>
            <ul className="mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-2">
              {[
                "ИИ-ассистент 24/7 на базе GPT-5-mini",
                "Подбор туров через АПИ Tourvisor",
                "Live-цены и наличие от туроператоров",
                "Карточки туров с фото, ценами и перелётами",
                "Горящие туры и спецпредложения",
                "White-label виджет под ваш бренд",
                "Подборки по ссылке с брендингом агентства",
                "Личный кабинет с аналитикой и воронкой",
                "Поддержка по email и в Telegram",
                "Соответствие 152-ФЗ, серверы в РФ",
                "API/webhook передача лидов в CRM",
                "Заявки в Telegram менеджеров и на почту",
              ].map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10">
                    <Check className="h-3 w-3 text-accent" />
                  </span>
                  <span className="text-sm text-body sm:text-base">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Сравнительные таблицы — свёрнуты, раскрываются по клику */}
        <section className="mx-auto max-w-5xl px-5 py-14 sm:px-6 lg:px-8 lg:py-16">
          <details className="group rounded-2xl border border-blue-subtle/50 bg-white">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 sm:px-6 [&::-webkit-details-marker]:hidden">
              <span className="font-display text-lg font-bold text-heading sm:text-xl">
                Сравнить тарифы в таблице
              </span>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10 transition-transform duration-200 group-open:rotate-180">
                <ChevronRight className="h-4 w-4 rotate-90 text-accent" />
              </span>
            </summary>

            <div className="border-t border-blue-subtle/40 px-5 pb-6 pt-5 sm:px-6">
              {(["lid", "pro"] as const).map((versionId) => (
                <div key={versionId}>
                  <h3
                    className={`mb-3 text-sm font-semibold uppercase tracking-wide text-muted ${
                      versionId === "pro" ? "mt-8" : ""
                    }`}
                  >
                    {versionId === "lid"
                      ? "Версия «Лид» — лидогенерация"
                      : "Версия «Про» — полный инструмент"}
                  </h3>
                  <div className="overflow-hidden rounded-xl border border-blue-subtle/50">
                    <div className="overflow-x-auto">
                      <table className="min-w-full text-sm">
                        <thead className="bg-surface-alt">
                          <tr>
                            <th className="px-4 py-3 text-left font-semibold text-heading">
                              Тариф
                            </th>
                            <th className="px-4 py-3 text-right font-semibold text-heading">
                              Цена/мес
                            </th>
                            <th className="px-4 py-3 text-right font-semibold text-heading">
                              Диалогов
                            </th>
                            <th className="px-4 py-3 text-right font-semibold text-heading">
                              Сверхлимит
                            </th>
                            <th className="px-4 py-3 text-right font-semibold text-heading">
                              Подключение
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-blue-subtle/30">
                          {pricingPlans.map((p) => {
                            const v =
                              versionId === "lid"
                                ? p.lid
                                : {
                                    price: p.price,
                                    dialogs: p.dialogs,
                                    extraDialog: p.extraDialog,
                                  };
                            return (
                              <tr
                                key={p.id}
                                className="bg-white hover:bg-blue-ice/20"
                              >
                                <td className="px-4 py-3 font-display font-semibold text-heading">
                                  {p.name}
                                  {p.popular && (
                                    <span className="ml-2 rounded-full bg-accent/10 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-accent">
                                      популярный
                                    </span>
                                  )}
                                </td>
                                <td className="whitespace-nowrap px-4 py-3 text-right font-semibold text-heading">
                                  {fmt(v.price)} ₽
                                </td>
                                <td className="px-4 py-3 text-right text-body">
                                  {v.dialogs}
                                </td>
                                <td className="whitespace-nowrap px-4 py-3 text-right text-body">
                                  {v.extraDialog} ₽
                                </td>
                                <td className="whitespace-nowrap px-4 py-3 text-right font-semibold text-accent">
                                  0 ₽
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ))}

              {(["lid", "pro"] as const).map((versionId) => (
                <div key={`addon-${versionId}`}>
                  <h3 className="mb-3 mt-8 text-sm font-semibold uppercase tracking-wide text-muted">
                    «Второй канал» в версии{" "}
                    {versionId === "lid" ? "«Лид»" : "«Про»"} — Web и MAX
                    одновременно
                  </h3>
                  <div className="overflow-hidden rounded-xl border border-blue-subtle/50">
                    <div className="overflow-x-auto">
                      <table className="min-w-full text-sm">
                        <thead className="bg-surface-alt">
                          <tr>
                            <th className="px-4 py-3 text-left font-semibold text-heading">
                              Тариф
                            </th>
                            <th className="px-4 py-3 text-right font-semibold text-heading">
                              Доплата
                            </th>
                            <th className="px-4 py-3 text-right font-semibold text-heading">
                              +Диалоги
                            </th>
                            <th className="px-4 py-3 text-right font-semibold text-heading">
                              Итого/мес
                            </th>
                            <th className="px-4 py-3 text-right font-semibold text-heading">
                              Итого диалогов
                            </th>
                            <th className="px-4 py-3 text-right font-semibold text-heading">
                              Сверхлимит во 2-м канале
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-blue-subtle/30">
                          {crossChannelAddons.map((a) => {
                            const plan = pricingPlans.find(
                              (p) => p.id === a.planId
                            )!;
                            const v = versionId === "lid" ? a.lid : a;
                            return (
                              <tr
                                key={a.planId}
                                className="bg-white hover:bg-blue-ice/20"
                              >
                                <td className="px-4 py-3 font-display font-semibold text-heading">
                                  {plan.name}
                                </td>
                                <td className="whitespace-nowrap px-4 py-3 text-right text-body">
                                  +{fmt(v.addonPrice)} ₽
                                </td>
                                <td className="px-4 py-3 text-right text-body">
                                  +{v.extraDialogs}
                                </td>
                                <td className="whitespace-nowrap px-4 py-3 text-right font-semibold text-heading">
                                  {fmt(v.totalPrice)} ₽
                                </td>
                                <td className="px-4 py-3 text-right text-body">
                                  {v.totalDialogs}
                                </td>
                                <td className="whitespace-nowrap px-4 py-3 text-right text-body">
                                  {v.extraDialogPrice} ₽
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ))}

              <p className="mt-5 text-center text-sm text-muted">
                Подключение MAX-канала бесплатное — разовых платежей нет. Все
                цены с НДС.
              </p>
            </div>
          </details>
        </section>

        {/* FAQ про механику тарифов: как считается диалог, что при
            перерасходе, как менять тариф. Вопросы уникальны для этой
            страницы — общий FAQ живёт на /faq и /voprosy. */}
        <section className="mx-auto max-w-3xl px-5 pb-14 sm:px-6 lg:px-8 lg:pb-16">
          <h2 className="mb-8 text-center font-display text-3xl font-bold text-heading sm:text-4xl">
            Как работает подписка
          </h2>
          <div className="space-y-4">
            {tarifyFaqItems.map((item) => (
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
          <div className="mt-8 text-center">
            <Link
              href="/skolko-stoit"
              className="inline-flex min-h-10 items-center gap-1.5 text-sm font-semibold text-accent transition-colors hover:text-accent-hover"
            >
              Сколько стоит ИИ-ассистент: расчёт окупаемости и сравнение
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="bg-surface-alt">
          <div className="mx-auto max-w-3xl px-5 py-16 text-center sm:px-6 lg:px-8 lg:py-20">
            <h2 className="font-display text-3xl font-bold text-heading sm:text-4xl">
              Не уверены, какой тариф подойдёт?
            </h2>
            <p className="mt-4 text-base text-body sm:text-lg">
              Расскажите о вашем агентстве — поможем подобрать оптимальный
              вариант. Можно начать с бесплатных 30 дней.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="tel:+79637997977"
                className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 font-semibold text-white shadow-lg transition-transform hover:scale-[1.02]"
              >
                <Phone className="h-4 w-4" />
                +7 (963) 799-79-77
              </a>
              <a
                href="mailto:office@aimpact.ru"
                className="inline-flex items-center gap-2 rounded-xl border border-blue-subtle/50 bg-white px-6 py-3 font-semibold text-heading transition-colors hover:bg-blue-ice/30"
              >
                <Mail className="h-4 w-4" />
                office@aimpact.ru
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
