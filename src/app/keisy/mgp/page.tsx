import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navigation from "@/components/sections/Navigation";
import Footer from "@/components/sections/Footer";
import FloatingCTA from "@/components/ui/FloatingCTA";
import {
  ChevronRight,
  CalendarDays,
  MapPin,
  Users,
  Handshake,
  Sparkles,
  ArrowRight,
  Award,
  Globe,
} from "lucide-react";

export const metadata: Metadata = {
  title: { absolute: "Кейс МГП: ИИ в сети из 396 офисов | Навылет! AI" },
  description:
    "Стратегическое партнёрство «Навылет! AI» и МГП — Сети магазинов горящих путёвок (27 лет на рынке, 396 офисов, 5+ млн обслуженных туристов). МГП — первая туристическая сеть в России, внедрившая ИИ-ассистент в реальную работу с клиентами.",
  keywords: [
    "Сеть магазинов горящих путёвок ИИ",
    "МГП Навылет AI",
    "ИИ для сети турагентств",
    "кейс ИИ в туризме",
    "автоматизация большой сети турагентств",
    "горящие путёвки чат-бот",
    "МГП сотрудничество ИИ",
    "ИИ-ассистент кейс внедрения",
  ],
  alternates: { canonical: "/keisy/mgp" },
  openGraph: {
    title:
      "Кейс МГП × «Навылет! AI» — ИИ-ассистент в сети из 396 офисов",
    description:
      "Стратегическое партнёрство с МГП — крупнейшей сетью магазинов горящих путёвок России. 27 лет на рынке.",
    url: "https://navilet.ru/keisy/mgp",
    type: "article",
    locale: "ru_RU",
    images: [
      {
        url: "/events/minsk-congress-2025.png",
        width: 1200,
        height: 675,
        alt: "Совместное выступление МГП и «Навылет! AI» на Международном конгрессе в Минске, апрель 2025",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Кейс МГП × «Навылет! AI» — ИИ-ассистент в сети из 396 офисов",
    description:
      "Стратегическое партнёрство с крупнейшей сетью магазинов горящих путёвок России.",
    images: ["/events/minsk-congress-2025.png"],
  },
};

const siteUrl = "https://navilet.ru";

const partnerFacts = [
  { icon: CalendarDays, value: "27 лет", label: "на туристическом рынке" },
  { icon: MapPin, value: "396", label: "офисов по России" },
  { icon: Users, value: "5 млн+", label: "обслуженных туристов" },
  { icon: Award, value: "№1", label: "по узнаваемости в сегменте" },
];

const partnershipFacts = [
  "МГП — стратегический партнёр проекта «Навылет! AI»",
  "Первая туристическая сеть России, внедрившая ИИ-ассистент в реальную работу с клиентами",
  "Активное участие в развитии продукта: пилотные внедрения и обратная связь",
  "Совместные выступления на международном уровне (Минский конгресс, апрель 2025)",
  "Совместное участие в инициативах ТПП РФ по применению ИИ в туризме",
];

const caseJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "@id": `${siteUrl}/keisy/mgp#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Главная", item: siteUrl },
        {
          "@type": "ListItem",
          position: 2,
          name: "Кейсы",
          item: `${siteUrl}/keisy/mgp`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Сеть магазинов горящих путёвок",
          item: `${siteUrl}/keisy/mgp`,
        },
      ],
    },
    {
      "@type": "Article",
      "@id": `${siteUrl}/keisy/mgp#article`,
      headline:
        "Кейс «Сеть магазинов горящих путёвок» × «Навылет! AI» — ИИ-ассистент в сети из 396 офисов",
      description:
        "Стратегическое партнёрство «Навылет! AI» и МГП — Сети магазинов горящих путёвок: 27 лет на рынке, 396 офисов, 5+ млн обслуженных туристов. МГП — первая туристическая сеть в России, внедрившая ИИ-ассистент.",
      url: `${siteUrl}/keisy/mgp`,
      datePublished: "2025-04-09",
      dateModified: "2026-11-27",
      inLanguage: "ru-RU",
      image: [
        `${siteUrl}/events/minsk-congress-2025.png`,
        `${siteUrl}/og-image.png`,
      ],
      author: { "@id": `${siteUrl}/#organization` },
      publisher: { "@id": `${siteUrl}/#organization` },
      mainEntityOfPage: { "@id": `${siteUrl}/keisy/mgp#webpage` },
      about: [
        {
          "@type": "Organization",
          name: "Сеть магазинов горящих путёвок",
          alternateName: ["МГП", "Магазин горящих путёвок"],
          description:
            "Крупнейшая сеть турагентств в России: 27 лет на рынке, 396 офисов, 5+ млн обслуженных туристов.",
        },
        { "@id": `${siteUrl}/#product` },
      ],
    },
    {
      "@type": "WebPage",
      "@id": `${siteUrl}/keisy/mgp#webpage`,
      url: `${siteUrl}/keisy/mgp`,
      name: "Кейс МГП × «Навылет! AI»",
      inLanguage: "ru-RU",
      isPartOf: { "@id": `${siteUrl}/#website` },
      breadcrumb: { "@id": `${siteUrl}/keisy/mgp#breadcrumb` },
      mainEntity: { "@id": `${siteUrl}/keisy/mgp#article` },
      publisher: { "@id": `${siteUrl}/#organization` },
    },
  ],
};

export default function MgpCasePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(caseJsonLd) }}
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
            <li>
              <span className="text-heading">Кейсы</span>
            </li>
            <li>
              <ChevronRight className="h-4 w-4" aria-hidden />
            </li>
            <li aria-current="page" className="font-semibold text-heading">
              Сеть магазинов горящих путёвок
            </li>
          </ol>
        </nav>

        {/* Hero */}
        <article>
          <header className="mx-auto max-w-5xl px-5 py-10 sm:px-6 sm:py-14 lg:px-8">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5">
              <Handshake className="h-4 w-4 text-accent" />
              <span className="text-xs font-semibold text-accent sm:text-sm">
                Стратегический партнёр · апрель 2025
              </span>
            </div>
            <h1 className="font-display text-3xl font-bold leading-tight text-heading sm:text-4xl lg:text-5xl">
              Как «Сеть магазинов горящих путёвок» внедряет{" "}
              <span className="text-accent">ИИ-ассистент «Навылет! AI»</span>
            </h1>
            <p className="mt-5 max-w-3xl text-base text-body sm:text-lg">
              МГП — одна из крупнейших туристических сетей России: 27 лет на
              рынке, 396 офисов по всей стране, более 5 млн обслуженных
              туристов. В 2025 году сеть стала первой в России, кто внедрил
              ИИ-ассистент «Навылет! AI» в реальную работу с клиентами и
              получила статус нашего стратегического партнёра.
            </p>

            {/* MGP Logo block */}
            <div className="mt-10 overflow-hidden rounded-2xl border border-blue-subtle/50 bg-white">
              <div className="flex items-center justify-center border-b border-blue-subtle/30 bg-white p-10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/partners/mgp-logo.svg"
                  alt="Сеть магазинов горящих путёвок — логотип"
                  className="h-20 w-auto max-w-[360px] object-contain sm:h-24"
                  draggable={false}
                />
              </div>
              <div className="grid grid-cols-2 divide-x divide-blue-subtle/30 sm:grid-cols-4">
                {partnerFacts.map((f) => (
                  <div key={f.label} className="p-5 text-center">
                    <f.icon className="mx-auto mb-2 h-5 w-5 text-accent" />
                    <p className="font-display text-xl font-bold text-heading sm:text-2xl">
                      {f.value}
                    </p>
                    <p className="mt-1 text-xs leading-tight text-muted">
                      {f.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </header>

          {/* Context */}
          <section className="bg-surface-alt">
            <div className="mx-auto max-w-3xl px-5 py-14 sm:px-6 lg:px-8 lg:py-16">
              <h2 className="font-display text-2xl font-bold text-heading sm:text-3xl">
                Контекст партнёрства
              </h2>
              <div className="prose prose-base mt-5 max-w-none text-body">
                <p>
                  «Магазин горящих путёвок» — туристический бренд с 1997 года.
                  За 27 лет работы сеть выросла до 396 офисов в России, через
                  которые прошло более 5 миллионов туристов. Это даёт МГП
                  уникальную позицию для оценки технологий, способных
                  масштабироваться на большую сеть.
                </p>
                <p>
                  В 2024 году руководство сети начало искать ИИ-решения,
                  которые могли бы разгрузить менеджеров от рутинного подбора и
                  обработки типовых вопросов. К началу 2025 года команды МГП и
                  «Навылет! AI» начали совместную работу — первое крупное
                  внедрение ИИ-ассистента в российскую туристическую сеть.
                </p>
              </div>
            </div>
          </section>

          {/* Joint events */}
          <section className="mx-auto max-w-5xl px-5 py-14 sm:px-6 lg:px-8 lg:py-16">
            <h2 className="font-display text-2xl font-bold text-heading sm:text-3xl">
              Совместные шаги
            </h2>

            <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[2fr,3fr] lg:items-stretch">
              <div className="overflow-hidden rounded-2xl border border-blue-subtle/50 bg-white">
                <div className="relative aspect-[16/9] w-full bg-blue-ice">
                  <Image
                    src="/events/minsk-congress-2025.png"
                    alt="Совместное выступление МГП и «Навылет! AI» на Международном конгрессе в Минске, апрель 2025"
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                    9 апреля 2025 · Минск
                  </p>
                  <p className="mt-2 font-display text-base font-semibold text-heading">
                    Международный конгресс: ИИ в турагентствах
                  </p>
                  <p className="mt-2 text-sm text-body">
                    Генеральный директор МГП Сергей Агафонов и команда
                    проекта «Навылет! AI» обсудили влияние
                    искусственного интеллекта на продажи в турагентствах.
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-blue-subtle/50 bg-white p-7 sm:p-8">
                <h3 className="font-display text-xl font-bold text-heading">
                  Что фиксирует партнёрство
                </h3>
                <ul className="mt-5 space-y-3">
                  {partnershipFacts.map((fact) => (
                    <li key={fact} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10">
                        <Sparkles className="h-3 w-3 text-accent" />
                      </span>
                      <span className="text-sm leading-relaxed text-body sm:text-base">
                        {fact}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Why MGP chose AI */}
          <section className="bg-surface-alt">
            <div className="mx-auto max-w-3xl px-5 py-14 sm:px-6 lg:px-8 lg:py-16">
              <h2 className="font-display text-2xl font-bold text-heading sm:text-3xl">
                Почему сеть из 396 офисов выбирает ИИ-ассистент
              </h2>
              <p className="mt-5 text-base text-body">
                По данным экспертов отрасли, лишь 20% туристических компаний
                сегодня используют ИИ в работе. У МГП — три причины оказаться
                среди этих 20% первыми:
              </p>
              <ol className="mt-6 space-y-4">
                {[
                  {
                    title: "Масштаб ночных и выходных обращений",
                    text: "Большая сеть = большой поток обращений вне рабочих часов офисов. Только ИИ-ассистент может обрабатывать их одновременно по всей стране 24/7.",
                  },
                  {
                    title: "Унификация качества консультации",
                    text: "В 396 офисах сложно поддерживать одинаково высокий стандарт первичного подбора. ИИ-ассистент работает по единому скрипту и одинаковой базе.",
                  },
                  {
                    title: "Производительность менеджеров",
                    text: "Менеджер тратит 15–40 минут на ручной подбор. С ИИ он подключается уже на этапе бронирования, когда клиент готов купить. Производительность каждого сотрудника растёт в 3–5 раз.",
                  },
                ].map((item, i) => (
                  <li
                    key={item.title}
                    className="flex gap-4 rounded-2xl border border-blue-subtle/50 bg-white p-5"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent/10 font-display text-base font-bold text-accent">
                      {i + 1}
                    </div>
                    <div>
                      <p className="font-display text-base font-semibold text-heading">
                        {item.title}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-body">
                        {item.text}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* Recognition */}
          <section className="mx-auto max-w-3xl px-5 py-14 sm:px-6 lg:px-8 lg:py-16">
            <h2 className="font-display text-2xl font-bold text-heading sm:text-3xl">
              Признание индустрии
            </h2>
            <p className="mt-5 text-base text-body">
              В октябре 2025 года на Международном конгрессе туроператоров
              проект «Навылет! AI» был удостоен почётной благодарности за
              «Вклад в развитие ИИ-технологий в туризме» от вице-президента
              Российского союза туриндустрии Юрия Барзыкина и заместителя
              председателя комитета Госдумы по туризму Натальи Костенко.
              Партнёрство с МГП стало одной из ключевых причин такого признания.
            </p>
            <div className="mt-6">
              <Link
                href="/#events"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-colors hover:text-accent-hover"
              >
                Все совместные выступления и события
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </section>

          {/* CTA */}
          <section className="bg-surface-alt">
            <div className="mx-auto max-w-3xl px-5 py-16 text-center sm:px-6 lg:px-8 lg:py-20">
              <Globe className="mx-auto mb-4 h-10 w-10 text-accent" />
              <h2 className="font-display text-3xl font-bold text-heading sm:text-4xl">
                Подключите ИИ-ассистент в своём агентстве
              </h2>
              <p className="mt-4 text-base text-body sm:text-lg">
                Используется в крупнейшей сети России — теперь доступно и
                одиночному офису. 30 дней бесплатно, подключение 0 ₽.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/tarify"
                  className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 font-semibold text-white shadow-lg transition-transform hover:scale-[1.02]"
                >
                  Выбрать тариф
                </Link>
                <Link
                  href="/dlya-turagentstv"
                  className="inline-flex items-center gap-2 rounded-xl border border-blue-subtle/50 bg-white px-6 py-3 font-semibold text-heading transition-colors hover:bg-blue-ice/30"
                >
                  Решение для турагентств
                </Link>
              </div>
            </div>
          </section>
        </article>
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
