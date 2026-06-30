import type { Metadata } from "next";
import Navigation from "@/components/sections/Navigation";
import Footer from "@/components/sections/Footer";
import DemoExperience from "@/components/demo/DemoExperience";
import DemoWidgetLoader from "@/components/demo/DemoWidgetLoader";

const siteUrl = "https://navilet.ru";
const DEMO_ASSISTANT_ID = "e919868a-abae-4d5e-87bb-67935c5cca30";

export const metadata: Metadata = {
  title: { absolute: "Демо ИИ-турменеджера — попробовать вживую | Навылет! AI" },
  description:
    "Живая демонстрация ИИ-турменеджера «Навылет! AI»: спросите про любой тур и получите подбор с ценами прямо в чате. Бесплатно, без регистрации. Бренд и данные настраиваются под вас при подключении.",
  keywords: [
    "демо ИИ-турменеджер",
    "попробовать ИИ для турагентства",
    "демо чат-бот турагентство",
    "ИИ подбор туров демо",
    "Навылет AI демо",
  ],
  alternates: { canonical: "/demo" },
  openGraph: {
    title: "Демо ИИ-турменеджера «Навылет! AI» — попробовать вживую",
    description:
      "Спросите ассистента про любой тур и получите подбор с ценами прямо в чате. Бренд и данные настраиваются под вас.",
    url: `${siteUrl}/demo`,
    images: [{ url: "/og-image.png", width: 1376, height: 768 }],
    type: "website",
    locale: "ru_RU",
  },
  twitter: {
    card: "summary_large_image",
    title: "Демо ИИ-турменеджера «Навылет! AI»",
    description:
      "Живая демонстрация: спросите про тур — получите подбор с ценами в чате.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
};

export default function DemoPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${siteUrl}/demo#webpage`,
        url: `${siteUrl}/demo`,
        name: "Демо ИИ-турменеджера «Навылет! AI»",
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
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navigation />
      <main>
        <DemoExperience />
      </main>
      <Footer />
      <DemoWidgetLoader assistantId={DEMO_ASSISTANT_ID} />
    </>
  );
}
