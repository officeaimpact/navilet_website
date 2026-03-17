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
  title: "Личный кабинет — навылет AI",
  description:
    "Аналитика, управление диалогами, кастомизация виджета и мониторинг системы. Полный контроль над AI-турменеджером для турагентств в едином личном кабинете.",
  alternates: { canonical: "/dashboard" },
  openGraph: {
    title: "Личный кабинет AI-турменеджера — навылет AI",
    description:
      "Расширенная аналитика, история диалогов, настройка виджета и мониторинг. Управляйте AI-ассистентом для турагентства из единого интерфейса.",
  },
};

export default function DashboardPage() {
  return (
    <>
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
