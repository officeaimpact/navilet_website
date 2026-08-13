import type { Metadata, Viewport } from "next";
import Navigation from "@/components/sections/Navigation";
import Footer from "@/components/sections/Footer";
import DemoExperience from "@/components/demo/DemoExperience";
import { demoFaqItems } from "@/lib/content";
import { jsonLdScript } from "@/lib/schema";

const siteUrl = "https://navilet.ru";

export const metadata: Metadata = {
  title: {
    absolute:
      "Демо ИИ-ассистента — попробовать вживую без регистрации | Навылет! AI",
  },
  description:
    "Живая демонстрация ИИ-ассистента «Навылет! AI»: спросите про любой тур и получите подбор с ценами прямо в чате. Обе версии — «Лид» и «Про» — переключаются в один клик. Демо бесплатное и без регистрации, подписка потом от 990 ₽/мес.",
  keywords: [
    "демо ИИ-ассистент",
    "попробовать ИИ для турагентства",
    "демо чат-бот турагентство",
    "ИИ подбор туров демо",
    "Навылет AI демо",
  ],
  alternates: { canonical: "/demo" },
  openGraph: {
    title: "Демо ИИ-ассистента «Навылет! AI» — попробовать вживую",
    description:
      "Спросите ассистента про любой тур и получите подбор с ценами прямо в чате. Бренд и данные настраиваются под вас.",
    url: `${siteUrl}/demo`,
    images: [{ url: "/og-image.png", width: 1376, height: 768 }],
    type: "website",
    locale: "ru_RU",
  },
  twitter: {
    card: "summary_large_image",
    title: "Демо ИИ-ассистента «Навылет! AI»",
    description:
      "Живая демонстрация: спросите про тур — получите подбор с ценами в чате.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
};

/**
 * На /demo встроен чат-виджет (iframe от lk.navilet.ru) с полем ввода.
 * На iOS Safari фокус на поле с font-size < 16px вызывает авто-зум,
 * который сам не отменяется — пользователь «залипает» в поле. Viewport
 * верхней страницы (а не iframe) управляет зумом, поэтому здесь задаём
 * maximum-scale=1: авто-зум при фокусе подавляется (ручной pinch на iOS
 * остаётся). Ограничено только страницей /demo — остальной сайт не трогаем.
 */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function DemoPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${siteUrl}/demo#webpage`,
        url: `${siteUrl}/demo`,
        name: "Демо ИИ-ассистента «Навылет! AI»",
        isPartOf: { "@id": `${siteUrl}/#website` },
        inLanguage: "ru-RU",
        breadcrumb: { "@id": `${siteUrl}/demo#breadcrumb` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${siteUrl}/demo#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Главная", item: siteUrl },
          {
            "@type": "ListItem",
            position: 2,
            name: "Демо",
            item: `${siteUrl}/demo`,
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${siteUrl}/demo#faq`,
        mainEntity: demoFaqItems.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
    ],
  };

  return (
    <>
      {/* Ранний коннект к lk.navilet.ru — там живёт демо-виджет (чат) */}
      <link rel="preconnect" href="https://lk.navilet.ru" />
      <link rel="dns-prefetch" href="https://lk.navilet.ru" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }}
      />
      <Navigation />
      <main>
        <DemoExperience />
      </main>
      <Footer />
    </>
  );
}
