import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Code2, Clock, Palette } from "lucide-react";
import Navigation from "@/components/sections/Navigation";
import Footer from "@/components/sections/Footer";
import RegisterCta from "@/components/seo/RegisterCta";
import { platformPages } from "@/lib/seo/platform-pages";

const siteUrl = "https://navilet.ru";

export const metadata: Metadata = {
  title: {
    absolute: "Виджет подбора туров на сайт — установка на любую платформу",
  },
  description:
    "ИИ-виджет подбора туров для сайта турагентства: инструкции установки для Tilda, WordPress, 1С-Битрикс, Wix, Craftum и других платформ. Одна строка кода, 7 дней бесплатно.",
  keywords: [
    "виджет подбора туров на сайт",
    "виджет поиска туров",
    "чат виджет турагентство",
    "модуль поиска туров для сайта",
  ],
  alternates: { canonical: "/vidzhet" },
  openGraph: {
    title: "Виджет подбора туров на сайт — любая платформа",
    description:
      "Инструкции установки ИИ-виджета подбора туров: Tilda, WordPress, Битрикс, Wix и другие. Одна строка кода.",
    url: `${siteUrl}/vidzhet`,
    type: "website",
    locale: "ru_RU",
    images: [{ url: "/og-image.png", width: 1376, height: 768 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Виджет подбора туров на сайт — любая платформа",
    description:
      "Инструкции установки ИИ-виджета подбора туров: Tilda, WordPress, Битрикс, Wix и другие.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${siteUrl}/vidzhet#webpage`,
      url: `${siteUrl}/vidzhet`,
      name: "Виджет подбора туров на сайт — установка на любую платформу",
      isPartOf: { "@id": `${siteUrl}/#website` },
      inLanguage: "ru-RU",
      breadcrumb: { "@id": `${siteUrl}/vidzhet#breadcrumb` },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${siteUrl}/vidzhet#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Главная", item: siteUrl },
        {
          "@type": "ListItem",
          position: 2,
          name: "Виджет на сайт",
          item: `${siteUrl}/vidzhet`,
        },
      ],
    },
    {
      "@type": "ItemList",
      "@id": `${siteUrl}/vidzhet#list`,
      itemListElement: platformPages.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: p.h1,
        url: `${siteUrl}/vidzhet/${p.slug}`,
      })),
    },
  ],
};

const highlights = [
  {
    icon: Code2,
    title: "Одна строка кода",
    text: "Как счётчик Метрики: вставили перед </body> — работает. Без SDK и программиста.",
  },
  {
    icon: Clock,
    title: "10–15 минут",
    text: "Столько занимает установка на любой платформе — от Tilda до самописного сайта.",
  },
  {
    icon: Palette,
    title: "Ваш бренд",
    text: "Логотип, цвета и приветствие настраиваются в кабинете — виджет white-label.",
  },
];

export default function VidzhetHubPage() {
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
              Виджет подбора туров на сайт —{" "}
              <span className="text-accent">любая платформа</span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-body sm:text-lg">
              ИИ-ассистент «Навылет!» подключается одной строкой кода и
              подбирает туры по базе Tourvisor прямо на вашем сайте. Выберите
              свою платформу — внутри пошаговая инструкция с нюансами.
            </p>
            <div className="mt-7 flex justify-center">
              <RegisterCta source="vidzhet_hub_hero" />
            </div>
          </div>
        </section>

        {/* Highlights */}
        <section className="mx-auto max-w-4xl px-5 py-10 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {highlights.map((h) => (
              <div
                key={h.title}
                className="rounded-2xl border border-blue-subtle/40 bg-white p-6 shadow-card"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10">
                  <h.icon className="h-5 w-5 text-accent" />
                </div>
                <h2 className="font-display text-base font-bold text-heading">
                  {h.title}
                </h2>
                <p className="mt-1.5 text-sm leading-relaxed text-body">
                  {h.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Platform grid */}
        <section className="bg-surface-alt">
          <div className="mx-auto max-w-4xl px-5 py-14 sm:px-6 lg:px-8">
            <h2 className="text-center font-display text-2xl font-bold text-heading sm:text-3xl">
              Инструкции по платформам
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {platformPages.map((p) => (
                <Link
                  key={p.slug}
                  href={`/vidzhet/${p.slug}`}
                  className="group flex flex-col rounded-2xl border border-blue-subtle/40 bg-white p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
                >
                  <h3 className="font-display text-base font-bold text-heading transition-colors group-hover:text-accent">
                    {p.name}
                  </h3>
                  <p className="mt-1.5 flex-1 text-sm leading-relaxed text-body">
                    {p.description.split(":")[0]}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                    Инструкция
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              ))}
            </div>
            <p className="mt-8 text-center text-sm text-muted">
              Вашей платформы нет в списке? Виджет работает на любом сайте, где
              можно вставить строку кода —{" "}
              <Link href="/vidzhet/svoy-sait" className="font-semibold text-accent hover:underline">
                общая инструкция здесь
              </Link>
              .
            </p>
          </div>
        </section>

        {/* Final CTA */}
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
              Попробуйте на своём сайте — бесплатно
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-white/70">
              7 дней теста, без карты. Установка за 10 минут по инструкции.
            </p>
            <div className="mt-6 flex justify-center">
              <RegisterCta source="vidzhet_hub_bottom" compact dark />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
