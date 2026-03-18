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
  title: "Личный кабинет AI-турменеджера — навылет AI",
  description:
    "Аналитика диалогов, управление AI-виджетом, история заявок и мониторинг системы. Полный контроль над AI-турменеджером для турагентств в едином личном кабинете.",
  keywords: [
    "личный кабинет турагентства",
    "аналитика AI турагентство",
    "управление AI виджетом",
    "мониторинг диалогов турагентство",
    "навылет AI личный кабинет",
  ],
  alternates: { canonical: "/dashboard" },
  openGraph: {
    title: "Личный кабинет AI-турменеджера — навылет AI",
    description:
      "Аналитика, история диалогов, настройка виджета и мониторинг. Управляйте AI-ассистентом для турагентства из единого интерфейса.",
    images: [{ url: "/og-image.png", width: 1376, height: 768 }],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
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
