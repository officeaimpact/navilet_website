import type { Metadata } from "next";
import Script from "next/script";
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

export const siteUrl = "https://navilet.ru";

/** Яндекс.Метрика — счётчик */
const YANDEX_METRIKA_ID = 108200337;
const siteName = "навылет AI";
const siteDescription =
  "AI-турменеджер для турагентств: подбирает туры, консультирует по отелям, показывает перелёты и цены в живом диалоге с клиентом. Подключение за 1 день. 7 дней бесплатно.";

const keywords = [
  // Основные брендовые
  "навылет AI",
  "navylet ai",
  "AI-турменеджер",
  // Продуктовые — B2B SaaS
  "AI ассистент для турагентства",
  "автоматизация турагентства",
  "чат-бот для турагентства",
  "виджет подбора туров",
  "AI виджет для сайта турагентства",
  "онлайн консультант для турагентства",
  "подбор туров AI",
  "автоматический подбор туров",
  "AI туроператор",
  // Длинный хвост
  "искусственный интеллект для туризма",
  "автоматизация обработки заявок турагентство",
  "чат-бот подбор туров",
  "AI ассистент туризм Россия",
  "B2B SaaS туризм",
  "сервис автоматизации турагентства",
  "нейросеть для турагентства",
  "круглосуточный консультант по турам",
  "горящие туры AI",
  "подбор туров 24 7",
  "виджет для сайта турагентства",
  "увеличить продажи туров",
];

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} — AI-турменеджер для турагентств | подбор туров 24/7`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords,
  alternates: {
    canonical: "/",
    languages: { "ru-RU": "/" },
  },
  openGraph: {
    title: `${siteName} — AI-турменеджер для турагентств`,
    description: siteDescription,
    url: siteUrl,
    siteName,
    images: [
      {
        url: "/og-image.png",
        width: 1376,
        height: 768,
        alt: "навылет AI — AI-турменеджер для турагентств: подбор туров 24/7",
        type: "image/png",
      },
    ],
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} — AI-турменеджер для турагентств`,
    description: siteDescription,
    images: [
      {
        url: "/og-image.png",
        alt: "навылет AI — AI-турменеджер для турагентств",
      },
    ],
    creator: "@navylet_ai",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/logo-icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
    other: {
      "msvalidate.01": process.env.NEXT_PUBLIC_BING_VERIFICATION ?? "",
    },
  },
  category: "technology",
  creator: "AIMPACT",
  publisher: "ООО «ИИМПАКТ ПЛЮС»",
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: siteUrl,
    description: siteDescription,
    inLanguage: "ru-RU",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: "навылет AI",
    legalName: "ООО «ИИМПАКТ ПЛЮС»",
    url: siteUrl,
    logo: {
      "@type": "ImageObject",
      url: `${siteUrl}/logo.svg`,
      width: 200,
      height: 60,
    },
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
    foundingDate: "2023",
    areaServed: {
      "@type": "Country",
      name: "Russia",
    },
    sameAs: [
      "https://t.me/navylet_ai",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+7-963-799-79-77",
      contactType: "sales",
      availableLanguage: "Russian",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${siteUrl}/#product`,
    name: "навылет AI — AI-турменеджер",
    alternateName: "navylet AI",
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "TravelApplication",
    operatingSystem: "Web",
    browserRequirements: "Requires JavaScript",
    description:
      "AI-турменеджер для турагентств: автоматический подбор туров, консультация по отелям, показ перелётов и актуальных цен — в живом диалоге с клиентом. Работает 24/7.",
    url: siteUrl,
    screenshot: `${siteUrl}/og-image.png`,
    featureList: [
      "Подбор туров по 50+ странам в реальном времени",
      "Живой диалог на естественном языке",
      "Актуальные цены и наличие от туроператоров",
      "Консультация по отелям: пляж, питание, инфраструктура",
      "Информация о перелётах",
      "Горящие туры и специальные предложения",
      "Личный кабинет с аналитикой",
      "Кастомизация виджета под бренд",
      "Подключение за 1 рабочий день",
    ],
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "RUB",
      lowPrice: "14990",
      highPrice: "64990",
      offerCount: 4,
      offers: [
        {
          "@type": "Offer",
          name: "Старт",
          price: "14990",
          priceCurrency: "RUB",
          description: "100 диалогов в месяц",
        },
        {
          "@type": "Offer",
          name: "Рост",
          price: "29990",
          priceCurrency: "RUB",
          description: "300 диалогов в месяц",
        },
        {
          "@type": "Offer",
          name: "Профи",
          price: "39990",
          priceCurrency: "RUB",
          description: "500 диалогов в месяц",
        },
        {
          "@type": "Offer",
          name: "Максимум",
          price: "64990",
          priceCurrency: "RUB",
          description: "1000 диалогов в месяц",
        },
      ],
    },
    provider: {
      "@id": `${siteUrl}/#organization`,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "48",
      bestRating: "5",
      worstRating: "1",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${siteUrl}/#webpage`,
    url: siteUrl,
    name: `${siteName} — AI-турменеджер для турагентств | подбор туров 24/7`,
    description: siteDescription,
    inLanguage: "ru-RU",
    isPartOf: { "@id": `${siteUrl}/#website` },
    about: { "@id": `${siteUrl}/#product` },
    publisher: { "@id": `${siteUrl}/#organization` },
    datePublished: "2024-01-01",
    dateModified: "2026-03-17",
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
        <meta name="theme-color" content="#0062EF" />
        <meta name="color-scheme" content="light" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
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
        <Script id="yandex-metrika" strategy="afterInteractive">
          {`(function(m,e,t,r,i,k,a){
    m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
    m[i].l=1*new Date();
    for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
    k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
})(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=${YANDEX_METRIKA_ID}', 'ym');

ym(${YANDEX_METRIKA_ID}, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});`}
        </Script>
        <noscript>
          <div>
            <img
              src={`https://mc.yandex.ru/watch/${YANDEX_METRIKA_ID}`}
              style={{ position: "absolute", left: "-9999px" }}
              alt=""
            />
          </div>
        </noscript>
        <LeadFormProvider>
          {children}
          <LeadFormModal />
          <CookieConsent />
        </LeadFormProvider>
      </body>
    </html>
  );
}
