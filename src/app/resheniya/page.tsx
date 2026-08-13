import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Navigation from "@/components/sections/Navigation";
import Footer from "@/components/sections/Footer";
import RegisterCta from "@/components/seo/RegisterCta";
import { scenarioPages } from "@/lib/seo/scenario-pages";
import { jsonLdScript } from "@/lib/schema";

const siteUrl = "https://navilet.ru";

export const metadata: Metadata = {
  title: {
    absolute: "Решения для турагентств — как ИИ закрывает типовые проблемы",
  },
  description:
    "Ночные заявки, перегруженные менеджеры, низкая конверсия сайта, дорогая реклама: разборы типовых проблем турагентств и как их решает ИИ-ассистент «Навылет!».",
  keywords: [
    "автоматизация турагентства",
    "проблемы турагентства решения",
    "ИИ для турагентства задачи",
  ],
  alternates: { canonical: "/resheniya" },
  openGraph: {
    title: "Решения для турагентств — Навылет! AI",
    description:
      "Разборы типовых проблем турагентств: ночные заявки, загрузка менеджеров, конверсия сайта, дорогая реклама.",
    url: `${siteUrl}/resheniya`,
    type: "website",
    locale: "ru_RU",
    images: [{ url: "/og-image.png", width: 1376, height: 768 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Решения для турагентств — Навылет! AI",
    description:
      "Разборы типовых проблем турагентств и как их решает ИИ-ассистент.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${siteUrl}/resheniya#webpage`,
      url: `${siteUrl}/resheniya`,
      name: "Решения для турагентств",
      isPartOf: { "@id": `${siteUrl}/#website` },
      inLanguage: "ru-RU",
      breadcrumb: { "@id": `${siteUrl}/resheniya#breadcrumb` },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${siteUrl}/resheniya#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Главная", item: siteUrl },
        {
          "@type": "ListItem",
          position: 2,
          name: "Решения",
          item: `${siteUrl}/resheniya`,
        },
      ],
    },
    {
      "@type": "ItemList",
      "@id": `${siteUrl}/resheniya#list`,
      itemListElement: scenarioPages.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: p.h1,
        url: `${siteUrl}/resheniya/${p.slug}`,
      })),
    },
  ],
};

export default function ResheniyaHubPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }}
      />
      <Navigation />
      <main>
        <section className="relative overflow-hidden bg-white">
          <div className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#00E7FD]/[0.07] blur-[120px]" />
          <div className="relative mx-auto max-w-3xl px-5 pt-28 pb-10 text-center sm:px-6 sm:pt-32 lg:px-8">
            <h1 className="font-display text-3xl font-bold leading-[1.12] text-heading sm:text-4xl lg:text-5xl">
              Типовые проблемы турагентств —{" "}
              <span className="text-accent">и как их решает ИИ</span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-body sm:text-lg">
              Ночные обращения без ответа, перегруженные менеджеры, сайт без
              заявок, дорожающая реклама. Разбираем каждую проблему в цифрах —
              и показываем, как её закрывает ИИ-ассистент.
            </p>
            <div className="mt-7 flex justify-center">
              <RegisterCta source="resheniya_hub_hero" />
            </div>
          </div>
        </section>

        <section className="bg-surface-alt">
          <div className="mx-auto max-w-4xl px-5 py-14 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {scenarioPages.map((p) => (
                <Link
                  key={p.slug}
                  href={`/resheniya/${p.slug}`}
                  className="group flex flex-col rounded-2xl border border-blue-subtle/40 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
                >
                  <div className="font-display text-2xl font-bold text-accent">
                    {p.problem.stat}
                  </div>
                  <div className="mt-0.5 text-xs text-muted">
                    {p.problem.statLabel}
                  </div>
                  <h2 className="mt-3 font-display text-lg font-bold leading-snug text-heading transition-colors group-hover:text-accent">
                    {p.h1}
                  </h2>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                    Разбор решения
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              ))}
            </div>
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
              Узнали свою проблему? Решите её за сегодня
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-white/70">
              Регистрация за 2 минуты, 30 дней бесплатно, подключение 0 ₽.
            </p>
            <div className="mt-6 flex justify-center">
              <RegisterCta source="resheniya_hub_bottom" compact dark />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
