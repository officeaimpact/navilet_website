import Navigation from "@/components/sections/Navigation";
import Footer from "@/components/sections/Footer";
import DashboardHero from "@/components/dashboard/DashboardHero";
import DashboardValueMetrics from "@/components/dashboard/DashboardValueMetrics";
import DashboardAnalyticsShowcase from "@/components/dashboard/DashboardAnalyticsShowcase";
import DashboardConversationsShowcase from "@/components/dashboard/DashboardConversationsShowcase";
import DashboardWidgetShowcase from "@/components/dashboard/DashboardWidgetShowcase";
import DashboardBenefits from "@/components/dashboard/DashboardBenefits";
import DashboardCTA from "@/components/dashboard/DashboardCTA";

export const metadata = {
  title: "Личный кабинет ИИ-турменеджера — Навылет! AI",
  description:
    "Аналитика диалогов, управление виджетом, история заявок и мониторинг системы. Полный контроль над ИИ-турменеджером для турагентств в едином личном кабинете на lk.navilet.ru.",
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
    title: "Личный кабинет ИИ-турменеджера — Навылет! AI",
    description:
      "Аналитика, история диалогов, настройка виджета и мониторинг. Управляйте ИИ-ассистентом для турагентства из единого интерфейса.",
    url: "https://navilet.ru/dashboard",
    images: [{ url: "/og-image.png", width: 1376, height: 768 }],
    type: "website",
    locale: "ru_RU",
  },
  twitter: {
    card: "summary_large_image",
    title: "Личный кабинет ИИ-турменеджера — Навылет! AI",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <Navigation />
      <main>
        <DashboardHero />
        <DashboardValueMetrics />
        <DashboardAnalyticsShowcase />
        <DashboardConversationsShowcase />
        <DashboardWidgetShowcase />
        <DashboardBenefits />
        <DashboardCTA />
      </main>
      <Footer />
    </>
  );
}
