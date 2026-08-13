import type { Metadata } from "next";
import Navigation from "@/components/sections/Navigation";
import Footer from "@/components/sections/Footer";
import ForecastLanding from "@/components/forecast/ForecastLanding";
import { forecastFaqItems } from "@/lib/content";
import { jsonLdScript } from "@/lib/schema";

const siteUrl = "https://navilet.ru";

export const metadata: Metadata = {
  title: {
    absolute: "Прогнозы спроса и продаж для турагентства — предиктивная аналитика",
  },
  description:
    "Раздел «Прогнозы» личного кабинета «Навылет! AI»: прогноз заявок и выручки до конца месяца, AI-прогноз на 4–6 недель, барометр спроса по сети турагентств. Предиктивная аналитика по диалогам ассистента — сайт и MAX.",
  keywords: [
    "предиктивная аналитика для турагентств",
    "прогноз спроса туры",
    "прогноз продаж турагентства",
    "аналитика спроса в туризме",
    "прогнозирование заявок турагентство",
    "барометр спроса туры",
  ],
  alternates: { canonical: "/prognozy" },
  openGraph: {
    title: "Прогнозы спроса и продаж для турагентства — Навылет! AI",
    description:
      "Прогноз заявок и выручки до конца месяца, AI-прогноз на 4–6 недель и барометр спроса по сети. Предиктивная аналитика по диалогам ИИ-ассистента.",
    url: `${siteUrl}/prognozy`,
    type: "website",
    locale: "ru_RU",
    images: [{ url: "/og-image.png", width: 1376, height: 768 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Прогнозы спроса и продаж для турагентства — Навылет! AI",
    description:
      "Прогноз заявок и выручки, AI-прогноз на 4–6 недель и барометр спроса по сети турагентств.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
};

export default function PrognozyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${siteUrl}/prognozy#webpage`,
        url: `${siteUrl}/prognozy`,
        name: "Прогнозы спроса и продаж для турагентства",
        description:
          "Предиктивная аналитика по диалогам ИИ-ассистента: прогноз заявок и выручки до конца месяца, AI-прогноз на 4–6 недель, барометр спроса по сети.",
        isPartOf: { "@id": `${siteUrl}/#website` },
        inLanguage: "ru-RU",
        breadcrumb: { "@id": `${siteUrl}/prognozy#breadcrumb` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${siteUrl}/prognozy#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Главная", item: siteUrl },
          {
            "@type": "ListItem",
            position: 2,
            name: "Личный кабинет",
            item: `${siteUrl}/dashboard`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Прогнозы",
            item: `${siteUrl}/prognozy`,
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${siteUrl}/prognozy#faq`,
        mainEntity: forecastFaqItems.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
    ],
  };

  return (
    <>
      <link rel="preconnect" href="https://lk.navilet.ru" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }}
      />
      <Navigation />
      <main>
        <ForecastLanding />
      </main>
      <Footer />
    </>
  );
}
