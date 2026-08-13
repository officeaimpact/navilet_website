import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Navigation from "@/components/sections/Navigation";
import Footer from "@/components/sections/Footer";
import DashboardHero from "@/components/dashboard/DashboardHero";
import DashboardValueMetrics from "@/components/dashboard/DashboardValueMetrics";
import DashboardAnalyticsShowcase from "@/components/dashboard/DashboardAnalyticsShowcase";
import DashboardForecastShowcase from "@/components/dashboard/DashboardForecastShowcase";
import DashboardConversationsShowcase from "@/components/dashboard/DashboardConversationsShowcase";
import DashboardWidgetShowcase from "@/components/dashboard/DashboardWidgetShowcase";
import DashboardBenefits from "@/components/dashboard/DashboardBenefits";
import DashboardCTA from "@/components/dashboard/DashboardCTA";
import { jsonLdScript } from "@/lib/schema";

export const metadata = {
  title: { absolute: "Личный кабинет ИИ-ассистента | Навылет! AI" },
  description:
    "Аналитика диалогов, прогнозы спроса и продаж, управление виджетом, история заявок и мониторинг. Полный контроль над ИИ-ассистентом для турагентств в едином личном кабинете на lk.navilet.ru.",
  keywords: [
    "личный кабинет турагентства",
    "аналитика ИИ турагентство",
    "управление ИИ-виджетом",
    "мониторинг диалогов турагентство",
    "Навылет! AI личный кабинет",
    "lk.navilet.ru",
  ],
  alternates: { canonical: "/dashboard" },
  openGraph: {
    title: "Личный кабинет ИИ-ассистента — Навылет! AI",
    description:
      "Аналитика, история диалогов, настройка виджета и мониторинг. Управляйте ИИ-ассистентом для турагентства из единого интерфейса.",
    url: "https://navilet.ru/dashboard",
    images: [{ url: "/og-image.png", width: 1376, height: 768 }],
    type: "website",
    locale: "ru_RU",
  },
  twitter: {
    card: "summary_large_image",
    title: "Личный кабинет ИИ-ассистента — Навылет! AI",
    description:
      "Аналитика, история диалогов, настройка виджета и мониторинг.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": "https://navilet.ru/dashboard#breadcrumb",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Главная",
      item: "https://navilet.ru/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Личный кабинет",
      item: "https://navilet.ru/dashboard",
    },
  ],
};

export default function DashboardPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumbLd) }}
      />
      <Navigation />
      <main>
        <DashboardHero />
        <DashboardValueMetrics />
        <DashboardAnalyticsShowcase />
        <DashboardForecastShowcase />
        <DashboardConversationsShowcase />
        <DashboardWidgetShowcase />
        <DashboardBenefits />
        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8">
          <h2 className="mb-2 font-display text-2xl font-bold text-heading sm:text-3xl">
            Что посмотреть дальше
          </h2>
          <p className="mb-8 max-w-2xl text-body">
            Личный кабинет — часть платформы «Навылет! AI». Узнайте больше о
            продукте, ценах и интеграции.
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                href: "/dlya-turagentstv",
                title: "ИИ для турагентства",
                text: "Как ассистент обрабатывает заявки 24/7",
              },
              {
                href: "/tarify",
                title: "Тарифы",
                text: "Прозрачные планы от 990 ₽/мес",
              },
              {
                href: "/integraciya-tourvisor",
                title: "Интеграция Tourvisor",
                text: "Подбор туров по реальной базе",
              },
              {
                href: "/blog",
                title: "Блог",
                text: "Гайды и кейсы про ИИ в туризме",
              },
            ].map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="group flex flex-col rounded-2xl border border-blue-subtle/40 bg-white p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
              >
                <h3 className="font-display text-base font-bold text-heading transition-colors group-hover:text-accent">
                  {card.title}
                </h3>
                <p className="mt-1.5 flex-1 text-sm text-body">{card.text}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                  Подробнее
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </section>
        <DashboardCTA />
      </main>
      <Footer />
    </>
  );
}
