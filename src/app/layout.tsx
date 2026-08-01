import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { LeadFormProvider } from "@/contexts/LeadFormContext";
import LeadFormModal from "@/components/ui/LeadFormModal";
import CookieConsent from "@/components/ui/CookieConsent";
import PromoBanner from "@/components/ui/PromoBanner";
import MetrikaClickTracker from "@/components/analytics/MetrikaClickTracker";
import ScrollReset from "@/components/utils/ScrollReset";

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

/** Яндекс.Метрика */
const YANDEX_METRIKA_ID = 108200337;

export const siteName = "Навылет! AI";
const siteDescription =
  "ИИ-ассистент для турагентств и туроператоров: подбирает туры, консультирует по отелям, показывает перелёты и цены в живом диалоге с клиентом. Подключение за пару минут. 30 дней бесплатно. Российская разработка.";

const keywords = [
  "Навылет! AI",
  "Навылет AI",
  "навылет ИИ",
  "navylet ai",
  "ИИ-ассистент",
  "AI-ассистент",
  "искусственный интеллект в туризме",
  "ИИ в туризме",
  "ИИ ассистент для турагентства",
  "AI ассистент для турагентства",
  "ИИ-ассистент турагентство",
  "ИИ для турагентства",
  "автоматизация турагентства",
  "чат-бот для турагентства",
  "виджет подбора туров",
  "ИИ виджет для сайта турагентства",
  "онлайн консультант для турагентства",
  "подбор туров ИИ",
  "подбор туров AI",
  "автоматический подбор туров",
  "ИИ для туроператоров",
  "нейросеть для турагентства",
  "нейросеть для туризма",
  "искусственный интеллект для туризма",
  "автоматизация обработки заявок турагентство",
  "чат-бот подбор туров",
  "ИИ ассистент туризм Россия",
  "B2B SaaS туризм",
  "сервис автоматизации турагентства",
  "круглосуточный консультант по турам",
  "горящие туры ИИ",
  "подбор туров 24 7",
  "виджет для сайта турагентства",
  "увеличить продажи туров",
  "ChatGPT для турагентства",
  "интеграция Tourvisor",
];

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} — ИИ-ассистент для турагентств | подбор туров 24/7`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords,
  alternates: {
    canonical: "/",
    languages: { "ru-RU": "/" },
  },
  openGraph: {
    title: `${siteName} — ИИ-ассистент для турагентств`,
    description: siteDescription,
    url: siteUrl,
    siteName,
    images: [
      {
        url: "/og-image.png",
        width: 1376,
        height: 768,
        alt: "Навылет! AI — ИИ-ассистент для турагентств: подбор туров 24/7",
        type: "image/png",
      },
    ],
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} — ИИ-ассистент для турагентств`,
    description: siteDescription,
    images: [
      {
        url: "/og-image.png",
        alt: "Навылет! AI — ИИ-ассистент для турагентств",
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
    // Токены верификации публичны (видны в HTML). Хардкодим как значение по
    // умолчанию, чтобы мета-тег попадал в сборку даже без build-args.
    yandex:
      process.env.NEXT_PUBLIC_YANDEX_VERIFICATION || "f0ecf06061f0ee1a",
    google:
      process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION ||
      "3vGt69JA7r0IauztZjKLR4Wudh8CrM9M7g_SjSm8EjY",
    other: process.env.NEXT_PUBLIC_BING_VERIFICATION
      ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_VERIFICATION }
      : {},
  },
  category: "technology",
  creator: "Навылет! AI",
  publisher: "ООО «ИИМПАКТ ПЛЮС»",
};

export { siteDescription };

const siteWideJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: siteName,
      alternateName: ["Навылет AI", "navylet AI", "Навылет ИИ"],
      description: siteDescription,
      inLanguage: "ru-RU",
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Навылет! AI",
      legalName: "ООО «ИИМПАКТ ПЛЮС»",
      alternateName: ["навылет AI", "Navilet", "ИИМПАКТ ПЛЮС"],
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        "@id": `${siteUrl}/#logo`,
        url: `${siteUrl}/logo.svg`,
        contentUrl: `${siteUrl}/logo.svg`,
        width: 200,
        height: 60,
        caption: "Навылет! AI",
      },
      image: { "@id": `${siteUrl}/#logo` },
      description: siteDescription,
      email: "office@aimpact.ru",
      telephone: "+7-963-799-79-77",
      address: {
        "@type": "PostalAddress",
        streetAddress: "5-й Монетчиковский переулок, д. 16, помещение 2П",
        addressLocality: "Москва",
        addressRegion: "Москва",
        postalCode: "115054",
        addressCountry: "RU",
      },
      taxID: "9705243471",
      vatID: "9705243471",
      iso6523Code: "0177:1257700255196",
      foundingDate: "2023",
      areaServed: {
        "@type": "Country",
        name: "Россия",
      },
      knowsAbout: [
        "Искусственный интеллект в туризме",
        "Автоматизация турагентств",
        "ИИ-ассистенты для бизнеса",
        "Подбор туров",
        "Интеграция с Tourvisor",
      ],
      memberOf: {
        "@type": "Organization",
        name: "Фонд «Сколково»",
        alternateName: "Инновационный центр «Сколково»",
        url: "https://sk.ru",
      },
      award: "Резидент ИТ-кластера Фонда «Сколково»",
      sameAs: [
        "https://t.me/navylet_ai",
        "https://lk.navilet.ru",
      ],
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+7-963-799-79-77",
          contactType: "sales",
          areaServed: "RU",
          availableLanguage: ["Russian", "ru-RU"],
        },
        {
          "@type": "ContactPoint",
          email: "office@aimpact.ru",
          contactType: "customer support",
          areaServed: "RU",
          availableLanguage: ["Russian", "ru-RU"],
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // data-scroll-behavior: Next 16 отключает CSS smooth-скролл на время
    // перехода между страницами — иначе новая страница открывается не сверху.
    <html
      lang="ru"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${manrope.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var k='promo_dismissed_2026-07-20T23:59:59+03:00';if(localStorage.getItem(k)!=='1'){var r=document.documentElement;r.style.setProperty('--promo-pad','40px');r.style.setProperty('--promo-h','40px');}}catch(e){}})();`,
          }}
        />
        <meta name="theme-color" content="#0062EF" />
        <meta name="color-scheme" content="light" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteWideJsonLd) }}
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
          <ScrollReset />
          <MetrikaClickTracker />
          <PromoBanner />
          {children}
          <LeadFormModal />
          <CookieConsent />
        </LeadFormProvider>
      </body>
    </html>
  );
}
