import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/sections/Navigation";
import Footer from "@/components/sections/Footer";
import FloatingCTA from "@/components/ui/FloatingCTA";
import {
  ChevronRight,
  Briefcase,
  Globe,
  Users,
  Network,
  Sparkles,
  ArrowRight,
  Check,
  Cpu,
  ShieldCheck,
  Layers,
} from "lucide-react";

export const metadata: Metadata = {
  title: { absolute: "ИИ для туроператора — B2B и B2C | Навылет! AI" },
  description:
    "ИИ-турменеджер для туроператоров: вооружите агентов мгновенным подбором по вашей базе или встройте виджет на B2C-сайт — клиенты получают предложения 24/7 без ожидания. Интеграция с Tourvisor, white-label, MAX-мессенджер.",
  keywords: [
    "ИИ для туроператора",
    "ИИ-ассистент туроператор",
    "B2B ИИ для туризма",
    "виджет туроператора на сайт",
    "автоматизация туроператор",
    "B2C виджет туроператор",
    "Tourvisor API туроператор",
    "ИИ инструмент для агентов",
    "Навылет AI для туроператоров",
    "корпоративный ИИ туризм",
  ],
  alternates: { canonical: "/dlya-turoperatorov" },
  openGraph: {
    title: "ИИ для туроператора — «Навылет! AI» для B2B и B2C",
    description:
      "Вооружите агентов ИИ-инструментом или встройте виджет на B2C-сайт. 24/7 подбор, white-label, интеграция Tourvisor.",
    url: "https://navilet.ru/dlya-turoperatorov",
    type: "website",
    locale: "ru_RU",
    images: [{ url: "/og-image.png", width: 1376, height: 768 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ИИ для туроператора — «Навылет! AI»",
    description: "B2B и B2C ИИ-инструмент для туроператоров.",
    images: ["/og-image.png"],
  },
};

const siteUrl = "https://navilet.ru";

const scenarios = [
  {
    icon: Briefcase,
    badge: "B2B-сценарий",
    title: "ИИ-инструмент для агентов",
    text: "Дайте партнёрским агентствам и собственным менеджерам мгновенный инструмент подбора по вашей базе и фидам туроператоров. Запрос на естественном языке → готовая подборка за секунды. Освобождает агентов от рутинных операций и сокращает цикл сделки.",
    points: [
      "Запросы на естественном языке: «Турция на 7 ночей семьёй, бюджет 200к, all inclusive»",
      "Поиск по 50+ направлениям через АПИ Tourvisor с учётом ваших комиссий",
      "Сравнение нескольких вариантов в одном диалоге",
      "Возможность встроить инструмент в B2B-кабинет агента",
    ],
  },
  {
    icon: Globe,
    badge: "B2C-сценарий",
    title: "Виджет на ваш B2C-сайт",
    text: "Превращает сайт туроператора в интерактивную витрину. Клиент получает живую консультацию и подборку туров без ожидания менеджера. Конверсия растёт за счёт обработки ночных и выходных обращений.",
    points: [
      "Виджет на сайте + опциональный MAX-мессенджер",
      "White-label под бренд туроператора: лого, цвета, приветствие",
      "Передача готовой заявки в вашу CRM через webhook или email",
      "Аналитика обращений: топ-направления, конверсия, нагрузка по часам",
    ],
  },
];

const outcomes = [
  "Каждый агент закрывает в 3–5 раз больше сделок без расширения штата",
  "B2C-сайт конвертирует ночные и выходные обращения в 3–4 раза эффективнее",
  "Live-цены и наличие из Tourvisor — без отказов «уже забронировано»",
  "White-label виджет — клиент видит ваш бренд, а не сторонний сервис",
  "Подключение MAX-мессенджера расширяет канал коммуникации с клиентом",
  "Соответствие 152-ФЗ, серверы в РФ, ДПУ — для корпоративной службы безопасности",
  "Аналитика и сегментация диалогов в личном кабинете",
  "Гибкая настройка скриптов под специфику туроператора и его направлений",
];

const tariffsForOperators = [
  {
    icon: Users,
    title: "Региональный туроператор",
    rec: "Тариф «Стандарт» + Второй канал",
    detail: "180 диалогов в месяц, Web + MAX, инсталляция 3 000 ₽",
    price: "7 280 ₽/мес",
    when: "До 5 агентств-партнёров, базовая B2C-витрина",
    href: "/tarify#standart",
  },
  {
    icon: Briefcase,
    title: "Туроператор федерального уровня",
    rec: "Тариф «Бизнес» + Второй канал",
    detail: "300 диалогов в месяц, Web + MAX, инсталляция 5 000 ₽",
    price: "10 980 ₽/мес",
    when: "Активная B2C-витрина + 5–15 агентских партнёров",
    isPopular: true,
    href: "/tarify#biznes",
  },
  {
    icon: Network,
    title: "Сетевой холдинг / ассоциация",
    rec: "Тариф «Сеть» + Второй канал",
    detail: "600 диалогов в месяц, Web + MAX, инсталляция 15 000 ₽",
    price: "19 980 ₽/мес",
    when: "Региональные сети, ассоциации, B2B-маркетплейсы туров",
    href: "/tarify#set",
  },
];

const operatorJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "@id": `${siteUrl}/dlya-turoperatorov#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Главная", item: siteUrl },
        {
          "@type": "ListItem",
          position: 2,
          name: "Для туроператоров",
          item: `${siteUrl}/dlya-turoperatorov`,
        },
      ],
    },
    {
      "@type": "WebPage",
      "@id": `${siteUrl}/dlya-turoperatorov#webpage`,
      url: `${siteUrl}/dlya-turoperatorov`,
      name: "ИИ для туроператора — «Навылет! AI»",
      description:
        "ИИ-турменеджер для туроператоров: B2B-инструмент для агентов и B2C-виджет на сайт.",
      inLanguage: "ru-RU",
      isPartOf: { "@id": `${siteUrl}/#website` },
      breadcrumb: { "@id": `${siteUrl}/dlya-turoperatorov#breadcrumb` },
      about: { "@id": `${siteUrl}/#product` },
      publisher: { "@id": `${siteUrl}/#organization` },
      primaryImageOfPage: { "@id": `${siteUrl}/#logo` },
    },
    {
      "@type": "Service",
      "@id": `${siteUrl}/dlya-turoperatorov#service`,
      name: "ИИ-турменеджер «Навылет! AI» для туроператоров",
      serviceType: "ИИ-автоматизация туроператоров (B2B + B2C)",
      provider: { "@id": `${siteUrl}/#organization` },
      areaServed: { "@type": "Country", name: "Россия" },
      audience: {
        "@type": "BusinessAudience",
        audienceType:
          "Туроператоры (региональные, федеральные), сетевые холдинги, ассоциации турбизнеса",
      },
      description:
        "ИИ-инструмент для туроператоров: вооружите агентов мгновенным подбором по вашей базе или встройте виджет на B2C-сайт. Интеграция Tourvisor, MAX-мессенджер, white-label.",
      offers: { "@id": `${siteUrl}/#product` },
    },
  ],
};

export default function ForOperatorsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(operatorJsonLd) }}
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
              Для туроператоров
            </li>
          </ol>
        </nav>

        {/* Hero */}
        <section className="mx-auto max-w-4xl px-5 py-10 text-center sm:px-6 sm:py-14 lg:px-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5">
            <Sparkles className="h-4 w-4 text-accent" />
            <span className="text-xs font-semibold text-accent sm:text-sm">
              Решение для туроператоров
            </span>
          </div>
          <h1 className="font-display text-4xl font-bold leading-tight text-heading sm:text-5xl">
            <span className="text-accent">ИИ для туроператора:</span>{" "}
            вооружите агентов и заработайте на B2C-сайте больше
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-body sm:text-lg">
            «Навылет! AI» закрывает два сценария: даёт партнёрским агентам
            мгновенный ИИ-инструмент подбора и превращает ваш B2C-сайт в
            интерактивную витрину. Один продукт — два контура продаж.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/tarify"
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 font-semibold text-white shadow-lg transition-transform hover:scale-[1.02]"
            >
              Подобрать тариф
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/#demo"
              className="inline-flex items-center gap-2 rounded-xl border border-blue-subtle/50 bg-white px-6 py-3 font-semibold text-heading transition-colors hover:bg-blue-ice/30"
            >
              Попробовать демо
            </Link>
          </div>
        </section>

        {/* Two scenarios */}
        <section className="bg-surface-alt">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
            <div className="text-center">
              <h2 className="font-display text-3xl font-bold text-heading sm:text-4xl">
                Два сценария использования{" "}
                <span className="text-accent">в одном продукте</span>
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base text-body">
                Один тариф, одна интеграция — работаете и с агентской сетью, и
                с B2C-сайтом.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
              {scenarios.map((s) => (
                <div
                  key={s.title}
                  className="rounded-2xl border border-blue-subtle/50 bg-white p-7 sm:p-8"
                >
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent/5 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent">
                    {s.badge}
                  </div>
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                    <s.icon className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-heading">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-body sm:text-base">
                    {s.text}
                  </p>
                  <ul className="mt-6 space-y-2.5">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-start gap-2.5 text-sm">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                        <span className="text-body">{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technology */}
        <section className="mx-auto max-w-5xl px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="text-center">
            <h2 className="font-display text-3xl font-bold text-heading sm:text-4xl">
              Технологически совместим с задачами{" "}
              <span className="text-accent">корпоративного туроператора</span>
            </h2>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {[
              {
                icon: Cpu,
                title: "GPT-5-mini + RAG",
                text: "Языковая модель + Retrieval-Augmented Generation: ИИ не «выдумывает» данные о ценах и наличии, всё подтверждается у Tourvisor в реальном времени.",
              },
              {
                icon: Layers,
                title: "Multi-channel",
                text: "Один ИИ-движок обслуживает Web-виджет и MAX-мессенджер одновременно. Подключение второго канала через надстройку.",
              },
              {
                icon: ShieldCheck,
                title: "Безопасность по 152-ФЗ",
                text: "Серверы в РФ, шифрование TLS, ДПУ с каждым клиентом, cookie-consent. Подходит для службы безопасности корпоративного туроператора.",
              },
            ].map((t) => (
              <div
                key={t.title}
                className="rounded-2xl border border-blue-subtle/50 bg-white p-6"
              >
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10">
                  <t.icon className="h-5 w-5 text-accent" />
                </div>
                <h3 className="font-display text-base font-bold text-heading">
                  {t.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-body">
                  {t.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Outcomes */}
        <section className="bg-surface-alt">
          <div className="mx-auto max-w-5xl px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
            <div className="text-center">
              <h2 className="font-display text-3xl font-bold text-heading sm:text-4xl">
                Что получает туроператор
              </h2>
            </div>
            <ul className="mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-2">
              {outcomes.map((outcome) => (
                <li key={outcome} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10">
                    <Check className="h-3 w-3 text-accent" />
                  </span>
                  <span className="text-sm text-body sm:text-base">
                    {outcome}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Recommended tariffs */}
        <section className="mx-auto max-w-6xl px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="text-center">
            <h2 className="font-display text-3xl font-bold text-heading sm:text-4xl">
              Какой тариф для туроператора
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-body">
              Для туроператоров обычно нужен «Второй канал» (Web + MAX
              одновременно): B2C-витрина + чат-канал с клиентом.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {tariffsForOperators.map((t) => (
              <div
                key={t.title}
                className={`relative rounded-2xl border bg-white p-6 ${
                  t.isPopular
                    ? "border-accent/40 shadow-[0_8px_40px_rgba(0,82,204,0.1)]"
                    : "border-blue-subtle/50"
                }`}
              >
                {t.isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                    Рекомендуем
                  </div>
                )}
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                  <t.icon className="h-6 w-6 text-accent" />
                </div>
                <p className="font-display text-base font-semibold text-heading">
                  {t.title}
                </p>
                <p className="mt-3 text-sm text-muted">{t.when}</p>
                <div className="mt-6 border-t border-blue-subtle/30 pt-4">
                  <p className="font-display text-xs font-semibold uppercase tracking-wide text-accent">
                    {t.rec}
                  </p>
                  <p className="mt-1 font-display text-2xl font-bold text-heading">
                    {t.price}
                  </p>
                  <p className="mt-1 text-xs text-muted">{t.detail}</p>
                </div>
                <Link
                  href={t.href}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-colors hover:text-accent-hover"
                >
                  Подробнее
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-surface-alt">
          <div className="mx-auto max-w-3xl px-5 py-16 text-center sm:px-6 lg:px-8 lg:py-20">
            <h2 className="font-display text-3xl font-bold text-heading sm:text-4xl">
              Готовы вооружить агентов и B2C-сайт?
            </h2>
            <p className="mt-4 text-base text-body sm:text-lg">
              Расскажите о ваших задачах — поможем спроектировать сценарий и
              подобрать тариф. 7 дней бесплатно, без карты.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/tarify"
                className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 font-semibold text-white shadow-lg transition-transform hover:scale-[1.02]"
              >
                Выбрать тариф
              </Link>
              <Link
                href="/integraciya-tourvisor"
                className="inline-flex items-center gap-2 rounded-xl border border-blue-subtle/50 bg-white px-6 py-3 font-semibold text-heading transition-colors hover:bg-blue-ice/30"
              >
                Подробности интеграции
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
