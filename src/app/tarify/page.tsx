import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/sections/Navigation";
import Footer from "@/components/sections/Footer";
import Pricing from "@/components/sections/Pricing";
import FloatingCTA from "@/components/ui/FloatingCTA";
import { pricingPlans, crossChannelAddons, maxChannelInstallation } from "@/lib/content";
import { ChevronRight, Check, Sparkles, Phone, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Тарифы ИИ-турменеджера «Навылет! AI» — от 3 290 ₽/мес",
  description:
    "Прозрачные тарифы для турагентств и туроператоров: «Старт» 3 290 ₽/мес, «Стандарт» 5 290 ₽/мес, «Бизнес» 7 990 ₽/мес, «Сеть» 14 990 ₽/мес. Web-виджет или MAX-мессенджер. Надстройка «Второй канал». 7 дней бесплатно.",
  keywords: [
    "тарифы ИИ-турменеджер",
    "стоимость ИИ-ассистент для турагентства",
    "цена чат-бот турагентство",
    "ИИ виджет цена",
    "Навылет! AI тарифы",
    "подключить ИИ-ассистент",
    "виджет подбора туров цена",
    "автоматизация турагентства стоимость",
    "MAX-мессенджер для турагентства",
  ],
  alternates: { canonical: "/tarify" },
  openGraph: {
    title: "Тарифы ИИ-турменеджера «Навылет! AI» — от 3 290 ₽/мес",
    description:
      "Четыре базовых тарифа в Web-виджете или MAX-мессенджере. Прозрачная цена за диалог, без скрытых платежей. Надстройка «Второй канал».",
    url: "https://navilet.ru/tarify",
    type: "website",
    locale: "ru_RU",
    images: [{ url: "/og-image.png", width: 1376, height: 768 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Тарифы ИИ-турменеджера «Навылет! AI» — от 3 290 ₽/мес",
    description:
      "От 3 290 ₽/мес за ИИ-ассистента для турагентства. 7 дней бесплатно.",
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
      name: "Тарифы ИИ-турменеджера «Навылет! AI»",
      description:
        "Прозрачные тарифы для турагентств: Старт, Стандарт, Бизнес, Сеть. Web-виджет или MAX-мессенджер. Надстройка «Второй канал».",
      inLanguage: "ru-RU",
      isPartOf: { "@id": `${siteUrl}/#website` },
      breadcrumb: { "@id": `${siteUrl}/tarify#breadcrumb` },
      about: { "@id": `${siteUrl}/#product` },
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "Product",
      "@id": `${siteUrl}/tarify#product`,
      name: "Навылет! AI — ИИ-турменеджер (подписка)",
      description:
        "ИИ-ассистент для турагентств и туроператоров. Подбирает туры, консультирует по отелям, показывает перелёты и цены в живом диалоге с клиентом. Работает в Web-виджете или MAX-мессенджере.",
      brand: { "@id": `${siteUrl}/#organization` },
      category: "B2B SaaS / TravelTech",
      image: `${siteUrl}/og-image.png`,
      offers: pricingPlans.map((p) => ({
        "@type": "Offer",
        "@id": `${siteUrl}/tarify#offer-${p.id}`,
        name: p.name,
        price: String(p.price),
        priceCurrency: "RUB",
        url: `${siteUrl}/tarify#${p.id}`,
        availability: "https://schema.org/InStock",
        description: `${p.dialogs} диалогов в месяц. Инсталляция ${fmt(p.installation)} ₽. ${p.tagline}.`,
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
    },
  ],
};

export default function TarifyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(tarifyJsonLd) }}
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
        <section className="mx-auto max-w-4xl px-5 py-10 text-center sm:px-6 sm:py-14 lg:px-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5">
            <Sparkles className="h-4 w-4 text-accent" />
            <span className="text-xs font-semibold text-accent sm:text-sm">
              7 дней бесплатно · Без карты · Отмена в любой момент
            </span>
          </div>
          <h1 className="font-display text-4xl font-bold leading-tight text-heading sm:text-5xl">
            Тарифы <span className="text-accent">ИИ-турменеджера</span>{" "}
            «Навылет! AI»
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-body sm:text-lg">
            Прозрачная подписка для турагентств и туроператоров. Каждый
            базовый тариф работает в Web-виджете или MAX-мессенджере. Хотите
            оба канала сразу — добавьте «Второй канал» с льготным лимитом
            диалогов.
          </p>

          {/* Comparison table */}
          <div className="mt-10 overflow-hidden rounded-2xl border border-blue-subtle/50 bg-white text-left">
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
                      Инсталляция
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-blue-subtle/30">
                  {pricingPlans.map((p) => (
                    <tr key={p.id} className="bg-white hover:bg-blue-ice/20">
                      <td className="px-4 py-3 font-display font-semibold text-heading">
                        {p.name}
                        {p.popular && (
                          <span className="ml-2 rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-accent">
                            популярный
                          </span>
                        )}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-right font-semibold text-heading">
                        {fmt(p.price)} ₽
                      </td>
                      <td className="px-4 py-3 text-right text-body">
                        {p.dialogs}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-right text-body">
                        {p.extraDialog} ₽
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-right text-body">
                        {fmt(p.installation)} ₽
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Reuse existing Pricing block for visual cards + cross-channel + installation */}
        <Pricing />

        {/* Что входит в подписку */}
        <section className="bg-surface-alt">
          <div className="mx-auto max-w-5xl px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
            <h2 className="text-center font-display text-3xl font-bold text-heading sm:text-4xl">
              Что входит в любой тариф
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-base text-body">
              Все ключевые функции платформы доступны на всех тарифах. Разница
              только в лимите диалогов и стоимости сверхлимитного диалога.
            </p>
            <ul className="mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-2">
              {[
                "ИИ-ассистент 24/7 на базе GPT-5-mini",
                "Подбор туров через АПИ Tourvisor",
                "Live-цены и наличие от туроператоров",
                "Консультация по отелям и перелётам",
                "Горящие туры и спецпредложения",
                "White-label виджет под ваш бренд",
                "Личный кабинет с аналитикой",
                "Поддержка по email и в Telegram",
                "Соответствие 152-ФЗ, серверы в РФ",
                "API/webhook передача лидов в CRM",
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

        {/* Cross-channel summary */}
        <section className="mx-auto max-w-5xl px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
          <h2 className="text-center font-display text-3xl font-bold text-heading sm:text-4xl">
            Стоимость <span className="text-accent">«Второго канала»</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-base text-body">
            Подключите Web и MAX одновременно. Дополнительные диалоги во втором
            канале — по льготной цене.
          </p>
          <div className="mt-10 overflow-hidden rounded-2xl border border-blue-subtle/50 bg-white">
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
                    const plan = pricingPlans.find((p) => p.id === a.planId)!;
                    return (
                      <tr
                        key={a.planId}
                        className="bg-white hover:bg-blue-ice/20"
                      >
                        <td className="px-4 py-3 font-display font-semibold text-heading">
                          {plan.name}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 text-right text-body">
                          +{fmt(a.addonPrice)} ₽
                        </td>
                        <td className="px-4 py-3 text-right text-body">
                          +{a.extraDialogs}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 text-right font-semibold text-heading">
                          {fmt(a.totalPrice)} ₽
                        </td>
                        <td className="px-4 py-3 text-right text-body">
                          {a.totalDialogs}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 text-right text-body">
                          {a.extraDialogPrice} ₽
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <p className="mt-6 text-center text-sm text-muted">
            Разовая инсталляция MAX-канала — {fmt(maxChannelInstallation)} ₽.
          </p>
        </section>

        {/* Contact CTA */}
        <section className="bg-surface-alt">
          <div className="mx-auto max-w-3xl px-5 py-16 text-center sm:px-6 lg:px-8 lg:py-20">
            <h2 className="font-display text-3xl font-bold text-heading sm:text-4xl">
              Не уверены, какой тариф подойдёт?
            </h2>
            <p className="mt-4 text-base text-body sm:text-lg">
              Расскажите о вашем агентстве — поможем подобрать оптимальный
              вариант. Можно начать с бесплатных 7 дней без карты.
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
