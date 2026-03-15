import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { LeadFormProvider } from "@/contexts/LeadFormContext";
import LeadFormModal from "@/components/ui/LeadFormModal";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-body",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AI Tour Assistant — AI-турменеджер для турагентств",
  description:
    "Полностью автоматизированный AI-ассистент для турагентств. Подбирает туры, консультирует по отелям, показывает перелёты и цены — в живом диалоге с клиентом.",
  keywords: [
    "AI турагент",
    "автоматизация турагентства",
    "AI ассистент туризм",
    "чат-бот для турагентства",
    "подбор туров AI",
  ],
  openGraph: {
    title: "AI Tour Assistant — AI-турменеджер для турагентств",
    description:
      "Подбирает туры, консультирует по отелям, показывает перелёты и цены — в живом диалоге с клиентом. Подключается за 1 день.",
    type: "website",
    locale: "ru_RU",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={`${inter.variable} ${manrope.variable}`}>
      <body>
        <LeadFormProvider>
          {children}
          <LeadFormModal />
        </LeadFormProvider>
      </body>
    </html>
  );
}
