import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  TrendingUp,
  TrendingDown,
  Minus,
  Leaf,
} from "lucide-react";
import Navigation from "@/components/sections/Navigation";
import Footer from "@/components/sections/Footer";
import RegisterCta from "@/components/seo/RegisterCta";
import { demandPages } from "@/lib/seo/demand-pages";

const siteUrl = "https://navilet.ru";

const fmtRub = (v: number) =>
  `${v.toLocaleString("ru-RU").replace(/\s/g, "\u202F")} ₽`;

export const metadata: Metadata = {
  title: {
    absolute: "Спрос на туры по направлениям — статистика запросов туристов",
  },
  description:
    "Куда туристы хотят поехать прямо сейчас: обезличенная статистика диалогов сети «Навылет! AI» по направлениям — Турция, Египет, ОАЭ, Таиланд, Мальдивы, Россия. Доли спроса, тренды, чеки.",
  keywords: [
    "спрос на туры статистика",
    "популярные направления туры",
    "аналитика туристического спроса",
    "что спрашивают туристы",
  ],
  alternates: { canonical: "/spros" },
  openGraph: {
    title: "Спрос на туры по направлениям — данные ИИ-диалогов",
    description:
      "Обезличенная статистика диалогов туристов: доли направлений, тренды, медианные чеки.",
    url: `${siteUrl}/spros`,
    type: "website",
    locale: "ru_RU",
    images: [{ url: "/og-image.png", width: 1376, height: 768 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Спрос на туры по направлениям — данные ИИ-диалогов",
    description:
      "Обезличенная статистика диалогов туристов: доли направлений, тренды, чеки.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${siteUrl}/spros#webpage`,
      url: `${siteUrl}/spros`,
      name: "Спрос на туры по направлениям — статистика запросов туристов",
      isPartOf: { "@id": `${siteUrl}/#website` },
      inLanguage: "ru-RU",
      breadcrumb: { "@id": `${siteUrl}/spros#breadcrumb` },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${siteUrl}/spros#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Главная", item: siteUrl },
        {
          "@type": "ListItem",
          position: 2,
          name: "Спрос по направлениям",
          item: `${siteUrl}/spros`,
        },
      ],
    },
    {
      "@type": "ItemList",
      "@id": `${siteUrl}/spros#list`,
      itemListElement: demandPages.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: p.h1,
        url: `${siteUrl}/spros/${p.slug}`,
      })),
    },
  ],
};

export default function SprosHubPage() {
  const maxShare = Math.max(...demandPages.map((p) => p.sharePct));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navigation />
      <main>
        <section className="relative overflow-hidden bg-white">
          <div className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#00E7FD]/[0.07] blur-[120px]" />
          <div className="relative mx-auto max-w-3xl px-5 pt-28 pb-10 text-center sm:px-6 sm:pt-32 lg:px-8">
            <h1 className="font-display text-3xl font-bold leading-[1.12] text-heading sm:text-4xl lg:text-5xl">
              Куда хотят туристы:{" "}
              <span className="text-accent">спрос по направлениям</span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-body sm:text-lg">
              Уникальные данные: тысячи диалогов туристов с ИИ-ассистентами
              сети «Навылет! AI» в среднем за месяц — обезличенно. Какие
              направления растут, что спрашивают и какие бюджеты называют.
            </p>
          </div>
        </section>

        {/* Barometer table */}
        <section className="bg-surface-alt">
          <div className="mx-auto max-w-3xl px-5 py-14 sm:px-6 lg:px-8">
            <div className="rounded-2xl border border-blue-subtle/40 bg-white p-6 shadow-card sm:p-8">
              <h2 className="font-display text-xl font-bold text-heading">
                Барометр спроса по сети
              </h2>
              <p className="mt-1 text-sm text-muted">
                Доля направления в поисках туров · тренд к предыдущему периоду
              </p>
              <div className="mt-6 space-y-3">
                {demandPages.map((p) => {
                  const TrendIcon =
                    p.trendPp > 0
                      ? TrendingUp
                      : p.trendPp < 0
                        ? TrendingDown
                        : Minus;
                  const trendColor =
                    p.trendPp > 0
                      ? "text-emerald-600"
                      : p.trendPp < 0
                        ? "text-amber-600"
                        : "text-muted";
                  return (
                    <Link
                      key={p.slug}
                      href={`/spros/${p.slug}`}
                      className="group block"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-heading transition-colors group-hover:text-accent">
                          {p.country}
                          {p.inSeason && (
                            <Leaf className="h-3.5 w-3.5 text-emerald-500" />
                          )}
                        </span>
                        <span className="flex items-center gap-3 text-sm">
                          <span
                            className={`inline-flex items-center gap-0.5 font-semibold ${trendColor}`}
                          >
                            <TrendIcon className="h-3.5 w-3.5" />
                            {p.trendPp > 0 ? "+" : ""}
                            {p.trendPp !== 0 ? `${p.trendPp}` : "0"} п.п.
                          </span>
                          <span className="w-12 text-right font-bold text-heading">
                            {p.sharePct}%
                          </span>
                        </span>
                      </div>
                      <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-blue-ice">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[#0062EF] to-[#00CCF5] transition-all"
                          style={{ width: `${(p.sharePct / maxShare) * 100}%` }}
                        />
                      </div>
                    </Link>
                  );
                })}
              </div>
              <p className="mt-5 border-t border-blue-subtle/40 pt-4 text-xs text-muted">
                <Leaf className="mr-1 inline h-3 w-3 text-emerald-500" />—
                направление в сезоне. Данные — обезличенные агрегаты сети, без
                названий компаний и абсолютных объёмов.
              </p>
            </div>
          </div>
        </section>

        {/* Direction cards */}
        <section className="bg-surface">
          <div className="mx-auto max-w-4xl px-5 py-14 sm:px-6 lg:px-8">
            <h2 className="text-center font-display text-2xl font-bold text-heading sm:text-3xl">
              Разборы по направлениям
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {demandPages.map((p) => (
                <Link
                  key={p.slug}
                  href={`/spros/${p.slug}`}
                  className="group flex flex-col rounded-2xl border border-blue-subtle/40 bg-white p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
                >
                  <h3 className="font-display text-lg font-bold text-heading transition-colors group-hover:text-accent">
                    {p.country}
                  </h3>
                  <p className="mt-1 text-xs text-muted">
                    доля ≈{p.sharePct}% · чек {fmtRub(p.medianCheck)}
                  </p>
                  <p className="mt-2.5 flex-1 text-sm leading-relaxed text-body">
                    {p.topQuestions[0].question}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                    Что спрашивают туристы
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              ))}
            </div>
            <p className="mt-8 text-center text-sm text-body">
              Такой же барометр — по вашим собственным диалогам — есть в{" "}
              <Link href="/prognozy" className="font-semibold text-accent hover:underline">
                разделе «Прогнозы» личного кабинета
              </Link>
              .
            </p>
          </div>
        </section>

        <section
          className="relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, #001229 0%, #002152 30%, #0062EF 70%, #0097F5 100%)",
          }}
        >
          <div className="noise-overlay pointer-events-none absolute inset-0 opacity-20" />
          <div className="relative mx-auto max-w-3xl px-5 py-14 text-center sm:px-6 lg:px-8">
            <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
              Этот спрос уже идёт на сайты агентств
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-white/70">
              Подключите ассистента — и вопросы туристов начнут превращаться в
              заявки. 2 минуты на регистрацию, 7 дней бесплатно.
            </p>
            <div className="mt-6 flex justify-center">
              <RegisterCta source="spros_hub_bottom" compact dark />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
