import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { LeadFormProvider } from "@/contexts/LeadFormContext";
import LeadFormModal from "@/components/ui/LeadFormModal";
import CookieConsent from "@/components/ui/CookieConsent";

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

const siteUrl = "https://navylet.ai";
const siteName = "навылет AI";
const siteDescription =
  "AI-турменеджер для турагентств: подбирает туры, консультирует по отелям, показывает перелёты и цены в живом диалоге с клиентом. Подключение за 1 день. 7 дней бесплатно.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} — AI-турменеджер для турагентств | подбор туров 24/7`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    "AI турменеджер",
    "AI ассистент для турагентства",
    "автоматизация турагентства",
    "чат-бот для турагентства",
    "подбор туров AI",
    "виджет для турагентства",
    "навылет AI",
    "искусственный интеллект туризм",
    "B2B туризм AI",
    "автоматический подбор туров",
    "онлайн консультант турагентство",
    "AI ассистент туризм",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: `${siteName} — AI-турменеджер для турагентств`,
    description: siteDescription,
    url: siteUrl,
    siteName,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: siteName }],
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} — AI-турменеджер для турагентств`,
    description: siteDescription,
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/logo-icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
  robots: { index: true, follow: true },
  verification: {
    yandex: "YANDEX_VERIFICATION_CODE",
    google: "GOOGLE_VERIFICATION_CODE",
    other: { "msvalidate.01": "BING_VERIFICATION_CODE" },
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "навылет AI",
    legalName: "ООО «ИИМПАКТ ПЛЮС»",
    url: siteUrl,
    logo: `${siteUrl}/logo.svg`,
    description: siteDescription,
    email: "office@aimpact.ru",
    telephone: "+7-963-799-79-77",
    address: {
      "@type": "PostalAddress",
      streetAddress: "5-й Монетчиковский переулок, д. 16, помещение 2П",
      addressLocality: "Москва",
      postalCode: "115054",
      addressCountry: "RU",
    },
    taxID: "9705243471",
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "навылет AI — AI-турменеджер",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description: siteDescription,
    url: siteUrl,
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "RUB",
      lowPrice: "14990",
      highPrice: "64990",
      offerCount: 4,
    },
    provider: {
      "@type": "Organization",
      name: "навылет AI",
      url: siteUrl,
    },
  },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={`${inter.variable} ${manrope.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Yandex.Metrika — replace XXXXXXXX with your counter ID
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return}}k=e.createElement(t);a=e.getElementsByTagName(t)[0];k.async=1;k.src=r;a.parentNode.insertBefore(k,a)})(window,document,"script","https://mc.yandex.ru/metrika/tag.js","ym");ym(XXXXXXXX,"init",{clickmap:true,trackLinks:true,accurateTrackBounce:true,webvisor:true});`,
          }}
        />
        */}
        {/* Google Analytics — replace G-XXXXXXXXXX with your measurement ID
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','G-XXXXXXXXXX');`,
          }}
        />
        */}
      </head>
      <body>
        <LeadFormProvider>
          {children}
          <LeadFormModal />
          <CookieConsent />
        </LeadFormProvider>
      </body>
    </html>
  );
}
