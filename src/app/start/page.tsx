import type { Metadata } from "next";
import Navigation from "@/components/sections/Navigation";
import Footer from "@/components/sections/Footer";
import StartLanding from "@/components/start/StartLanding";
import { startFaqItems } from "@/lib/content";
import { jsonLdScript } from "@/lib/schema";

const siteUrl = "https://navilet.ru";

export const metadata: Metadata = {
  title: {
    absolute:
      "Подключить ИИ-ассистента за 2 минуты — месяц бесплатно, дальше от 990 ₽/мес",
  },
  description:
    "Зарегистрируйтесь, получите код виджета и вставьте на сайт — ИИ-ассистент на базе Tourvisor начнёт отвечать туристам 24/7. Без созвонов и разовых платежей. Тарифы от 990 ₽/мес.",
  keywords: [
    "подключить ИИ турагентство",
    "виджет подбора туров на сайт",
    "чат-бот tourvisor",
    "ИИ-ассистент для сайта турагентства",
    "Навылет AI регистрация",
  ],
  alternates: { canonical: "/start" },
  openGraph: {
    title: "ИИ-ассистент на вашем сайте — подключение за 2 минуты",
    description:
      "Регистрация → код виджета → одна строка на сайт. 30 дней бесплатно, подключение 0 ₽. Подбор туров по базе Tourvisor 24/7.",
    url: `${siteUrl}/start`,
    type: "website",
    locale: "ru_RU",
    images: [{ url: "/og-image.png", width: 1376, height: 768 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ИИ-ассистент — подключение за 2 минуты",
    description:
      "Регистрация → код виджета → одна строка на сайт. 30 дней бесплатно, подключение 0 ₽.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
};

export default function StartPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${siteUrl}/start#webpage`,
        url: `${siteUrl}/start`,
        name: "Подключить ИИ-ассистента за 2 минуты",
        isPartOf: { "@id": `${siteUrl}/#website` },
        inLanguage: "ru-RU",
        breadcrumb: { "@id": `${siteUrl}/start#breadcrumb` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${siteUrl}/start#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Главная", item: siteUrl },
          {
            "@type": "ListItem",
            position: 2,
            name: "Подключение",
            item: `${siteUrl}/start`,
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${siteUrl}/start#faq`,
        mainEntity: startFaqItems.map((item) => ({
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
        <StartLanding />
      </main>
      <Footer />
    </>
  );
}
