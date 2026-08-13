import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/sections/Navigation";
import Footer from "@/components/sections/Footer";
import FloatingCTA from "@/components/ui/FloatingCTA";
import RegisterCta from "@/components/seo/RegisterCta";
import {
  vozvratFeatures,
  vozvratAntiSpam,
  vozvratFaqItems,
} from "@/lib/content";
import {
  ChevronRight,
  Check,
  ShieldCheck,
  MessageCircleReply,
  BellRing,
  TrendingDown,
  Brain,
  Sparkles,
  RefreshCcw,
  MessageSquare,
  Info,
  ArrowRight,
  Quote,
  Share2,
} from "lucide-react";
import { jsonLdScript } from "@/lib/schema";

const siteUrl = "https://navilet.ru";

export const metadata: Metadata = {
  title: {
    absolute:
      "Возврат клиентов: ИИ сам возвращает туристов в диалог | Навылет! AI",
  },
  description:
    "ИИ-ассистент возвращает замолчавших клиентов турагентства: догоняющие сообщения с откликом до 40%, напоминания (~28%), умные подписки на снижение цены и персональные предложения в MAX. Без спама: пауза 3 дня, отписка одним словом.",
  keywords: [
    "возврат клиентов турагентство",
    "повторные продажи туры",
    "догоняющие сообщения мессенджер",
    "подписка на снижение цены тура",
    "автоматизация работы с базой турагентства",
    "ИИ возврат клиентов",
    "MAX мессенджер турагентство",
  ],
  alternates: { canonical: "/vozvrat-klientov" },
  openGraph: {
    title: "Возврат клиентов — ИИ сам возвращает туристов в диалог",
    description:
      "Догоняющие сообщения с откликом до 40%, умные подписки и персональные предложения. Клиент вернулся — диалог оживает с полной памятью запроса.",
    url: `${siteUrl}/vozvrat-klientov`,
    type: "website",
    locale: "ru_RU",
    images: [{ url: "/og-image.png", width: 1376, height: 768 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Возврат клиентов — ИИ возвращает туристов в диалог",
    description:
      "Отклик до 40% на догоняющие сообщения. Умные подписки на снижение цены. Без спама.",
    images: ["/og-image.png"],
  },
};

const vozvratJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "@id": `${siteUrl}/vozvrat-klientov#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Главная", item: siteUrl },
        {
          "@type": "ListItem",
          position: 2,
          name: "Возврат клиентов",
          item: `${siteUrl}/vozvrat-klientov`,
        },
      ],
    },
    {
      "@type": "WebPage",
      "@id": `${siteUrl}/vozvrat-klientov#webpage`,
      url: `${siteUrl}/vozvrat-klientov`,
      name: "Возврат клиентов: ИИ-ассистент сам возвращает туристов в диалог",
      description:
        "Догоняющие сообщения, напоминания, умные подписки и персональные предложения в MAX-мессенджере. Отклик до 40%.",
      inLanguage: "ru-RU",
      isPartOf: { "@id": `${siteUrl}/#website` },
      breadcrumb: { "@id": `${siteUrl}/vozvrat-klientov#breadcrumb` },
      about: { "@id": `${siteUrl}/#product` },
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "FAQPage",
      "@id": `${siteUrl}/vozvrat-klientov#faq`,
      mainEntity: vozvratFaqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
  ],
};

const featureIcons = {
  MessageCircleReply,
  BellRing,
  TrendingDown,
  Brain,
  Sparkles,
  RefreshCcw,
} as const;

export default function VozvratKlientovPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(vozvratJsonLd) }}
      />
      <Navigation />
      <main>
        {/* Breadcrumbs */}
        <nav
          aria-label="Хлебные крошки"
          className="mx-auto max-w-7xl px-5 pt-24 sm:px-6 lg:px-8 lg:pt-28"
        >
          <ol className="flex items-center gap-1 text-sm text-muted">
            <li>
              <Link href="/" className="transition-colors hover:text-accent">
                Главная
              </Link>
            </li>
            <li>
              <ChevronRight className="h-4 w-4" aria-hidden />
            </li>
            <li aria-current="page" className="font-semibold text-heading">
              Возврат клиентов
            </li>
          </ol>
        </nav>

        {/* Hero */}
        <section className="mx-auto max-w-4xl px-5 py-10 text-center sm:px-6 sm:py-14 lg:px-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5">
            <MessageSquare className="h-4 w-4 text-accent" />
            <span className="text-xs font-semibold text-accent sm:text-sm">
              Версия «Про» · MAX-мессенджер
            </span>
          </div>
          <h1 className="font-display text-4xl font-bold leading-tight text-heading sm:text-5xl">
            Возврат клиентов: ассистент сам{" "}
            <span className="text-accent">возвращает туристов в диалог</span>
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-base text-body sm:text-lg">
            Клиент получил подборку и замолчал — обычно такой лид потерян.
            ИИ-ассистент «Навылет! AI» возвращает его сам: догоняющее сообщение
            приносит отклик до 40%, напоминание через день — около 28%, а умная
            подписка следит за ценами и пишет клиенту, когда его тур подешевел.
            Всё — автоматически и без спама.
          </p>

          {/* Ключевые цифры */}
          <div className="mx-auto mt-9 grid max-w-2xl grid-cols-3 gap-3">
            {[
              { stat: "до 40%", label: "отклик на догоняющее сообщение" },
              { stat: "~28%", label: "отклик на напоминание через день" },
              { stat: "0", label: "усилий менеджера — всё автоматически" },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-blue-subtle/50 bg-white px-3 py-4 shadow-card sm:px-4 sm:py-5"
              >
                <p className="font-display text-2xl font-bold text-accent sm:text-3xl">
                  {s.stat}
                </p>
                <p className="mt-1 text-[11px] leading-snug text-muted sm:text-xs">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Механики возврата */}
        <section className="bg-surface-alt">
          <div className="mx-auto max-w-6xl px-5 py-14 sm:px-6 lg:px-8 lg:py-16">
            <h2 className="text-center font-display text-3xl font-bold text-heading sm:text-4xl">
              Шесть механик, которые работают за вас
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-base text-body">
              Каждое касание несёт клиенту ценность — конкретную выгоду по его
              запросу, а не рекламу.
            </p>
            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {vozvratFeatures.map((f) => {
                const Icon = featureIcons[f.icon];
                return (
                  <div
                    key={f.title}
                    className="flex flex-col rounded-2xl border border-blue-subtle/50 bg-white p-6 shadow-card"
                  >
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10">
                        <Icon className="h-5 w-5 text-accent" />
                      </span>
                      <span className="text-right">
                        <span className="block font-display text-lg font-bold leading-none text-accent">
                          {f.stat}
                        </span>
                        <span className="text-[11px] font-semibold uppercase tracking-wide text-muted">
                          {f.statLabel}
                        </span>
                      </span>
                    </div>
                    <h3 className="font-display text-base font-bold text-heading">
                      {f.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-body">
                      {f.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Пример умной подписки */}
        <section className="mx-auto max-w-4xl px-5 py-14 sm:px-6 lg:px-8 lg:py-16">
          <div className="rounded-2xl border border-accent/15 bg-gradient-to-br from-blue-ice/40 to-white p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-accent/10">
                <Quote className="h-5 w-5 text-accent" />
              </span>
              <div>
                <h2 className="font-display text-xl font-bold text-heading sm:text-2xl">
                  Как это выглядит на практике
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-body sm:text-base">
                  Клиентка искала тур в Турцию: «спокойный пляж, ребёнку 6 лет,
                  в Кемере уже были». Подборку посмотрела — и пропала. Ассистент
                  запомнил весь запрос и следил за рынком. Через четыре дня цена
                  на подходящий отель в Сиде упала на 7% — клиентка получила
                  одно сообщение с этим вариантом, ответила и забронировала у
                  менеджера. Без рассылок, без обзвона, без участия сотрудников.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Подборка как канал возврата */}
        <section className="mx-auto max-w-4xl px-5 pb-14 sm:px-6 lg:px-8 lg:pb-16">
          <div className="rounded-2xl border border-blue-subtle/50 bg-white p-6 shadow-card sm:p-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
              <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-accent/10">
                <Share2 className="h-5 w-5 text-accent" />
              </span>
              <div>
                <h2 className="font-display text-xl font-bold text-heading sm:text-2xl">
                  Ещё один канал возврата — подборка по ссылке
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-body sm:text-base">
                  Варианты, которые ассистент показал в диалоге, клиент может
                  открыть отдельной страницей под вашим брендом — с фото
                  отелей, вариантами перелёта и живыми ценами — и переслать её
                  семье. Ссылка живёт 7 дней и всё это время напоминает о вас, а
                  когда срок выходит, страница предлагает вернуться в диалог,
                  написать боту в MAX или позвонить менеджеру. В кабинете видно,
                  открыли подборку или нет — и какой тур смотрели дольше
                  остальных.
                </p>
                <Link
                  href="/podborki"
                  className="mt-2 inline-flex min-h-10 items-center gap-1.5 text-sm font-semibold text-accent transition-colors hover:text-accent-hover"
                >
                  Подробнее о подборках
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Без спама */}
        <section className="bg-surface-alt">
          <div className="mx-auto max-w-4xl px-5 py-14 sm:px-6 lg:px-8 lg:py-16">
            <div className="text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-white px-4 py-1.5">
                <ShieldCheck className="h-4 w-4 text-accent" />
                <span className="text-xs font-semibold text-accent sm:text-sm">
                  Защита от спама встроена
                </span>
              </div>
              <h2 className="font-display text-3xl font-bold text-heading sm:text-4xl">
                Никакого спама — жёсткие правила в коде
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base text-body">
                Возврат клиентов работает только пока он полезен клиенту.
                Ограничения зашиты на уровне системы — их нельзя случайно
                нарушить.
              </p>
            </div>
            <ul className="mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-2">
              {vozvratAntiSpam.map((rule) => (
                <li
                  key={rule}
                  className="flex items-start gap-3 rounded-xl border border-blue-subtle/40 bg-white px-4 py-3.5"
                >
                  <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-accent/10">
                    <Check className="h-3 w-3 text-accent" />
                  </span>
                  <span className="text-sm text-body">{rule}</span>
                </li>
              ))}
            </ul>
            <p className="mx-auto mt-6 flex max-w-2xl items-start justify-center gap-1.5 text-center text-xs text-muted">
              <Info className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" />
              <span>
                Возврат клиентов работает в MAX-мессенджере: там у ассистента
                остаётся диалог, куда можно написать. В веб-виджете после ухода
                со страницы написать клиенту некуда — это особенность канала.
              </span>
            </p>
          </div>
        </section>

        {/* Мостик на «Про» */}
        <section className="mx-auto max-w-4xl px-5 py-14 sm:px-6 lg:px-8 lg:py-16">
          <div className="rounded-2xl border border-blue-subtle/50 bg-white p-6 text-center shadow-card sm:p-10">
            <h2 className="font-display text-2xl font-bold text-heading sm:text-3xl">
              Доступно в версии <span className="text-accent">«Про»</span>
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-body sm:text-base">
              Возврат клиентов, безлимитные консультации и проверка цен в чате
              входят в версию «Про» —{" "}
              <span className="whitespace-nowrap">
                от 1 990 ₽/мес
              </span>
              . Первый месяц бесплатно.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/versii"
                className="inline-flex items-center gap-1.5 rounded-xl border-2 border-accent/30 px-6 py-3 text-sm font-semibold text-accent transition-colors hover:border-accent hover:bg-blue-ice sm:text-base"
              >
                Сравнить версии «Лид» и «Про»
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/tarify"
                className="inline-flex items-center gap-1.5 rounded-xl border-2 border-accent/30 px-6 py-3 text-sm font-semibold text-accent transition-colors hover:border-accent hover:bg-blue-ice sm:text-base"
              >
                Тарифы версии «Про»
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mx-auto max-w-3xl px-5 pb-14 sm:px-6 lg:px-8 lg:pb-16">
          <h2 className="mb-8 text-center font-display text-3xl font-bold text-heading sm:text-4xl">
            Вопросы про возврат клиентов
          </h2>
          <div className="space-y-4">
            {vozvratFaqItems.map((item) => (
              <details
                key={item.question}
                className="group rounded-2xl border border-blue-subtle/40 bg-white p-5 shadow-card sm:p-6"
              >
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 font-display text-base font-bold text-heading [&::-webkit-details-marker]:hidden">
                  {item.question}
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-body">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-surface-alt">
          <div className="mx-auto max-w-3xl px-5 py-16 text-center sm:px-6 lg:px-8 lg:py-20">
            <h2 className="font-display text-3xl font-bold text-heading sm:text-4xl">
              Перестаньте терять «остывших» клиентов
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-body sm:text-lg">
              Подключите ассистента с возвратом клиентов — первый месяц
              бесплатно, настройка 0 ₽.
            </p>
            <div className="mt-8 flex justify-center">
              <RegisterCta source="vozvrat_cta" />
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
