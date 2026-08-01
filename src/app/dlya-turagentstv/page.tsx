import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/sections/Navigation";
import Footer from "@/components/sections/Footer";
import FloatingCTA from "@/components/ui/FloatingCTA";
import {
  ChevronRight,
  Moon,
  Clock,
  MessageSquare,
  TrendingDown,
  Sparkles,
  ArrowRight,
  Check,
  Store,
  Building2,
  Users,
} from "lucide-react";

export const metadata: Metadata = {
  title: { absolute: "ИИ для турагентства: подбор туров 24/7 | Навылет! AI" },
  description:
    "ИИ-ассистент для турагентств: не пропускает ночные заявки, подбирает туры за секунды, отвечает на 80% вопросов клиентов сам. Менеджер подключается только когда клиент готов бронировать. Подключение за пару минут, 30 дней бесплатно.",
  keywords: [
    "ИИ для турагентства",
    "ИИ-ассистент турагентство",
    "автоматизация турагентства",
    "виджет для турагентства",
    "чат-бот турагентство",
    "круглосуточный консультант турагентство",
    "автоматический подбор туров для агентств",
    "Навылет AI для турагентств",
    "ИИ-ассистент для офиса",
    "сеть турагентств ИИ",
  ],
  alternates: { canonical: "/dlya-turagentstv" },
  openGraph: {
    title: "ИИ для турагентства — «Навылет! AI» подбирает туры 24/7",
    description:
      "Не теряйте ночные заявки. ИИ-ассистент берёт на себя первичную консультацию, подбор и сравнение туров. Менеджер закрывает сделку.",
    url: "https://navilet.ru/dlya-turagentstv",
    type: "website",
    locale: "ru_RU",
    images: [{ url: "/og-image.png", width: 1376, height: 768 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ИИ для турагентства — «Навылет! AI»",
    description: "ИИ-ассистент для турагентства. 24/7 подбор туров.",
    images: ["/og-image.png"],
  },
};

const siteUrl = "https://navilet.ru";

const pains = [
  {
    icon: Moon,
    stat: "70%",
    title: "ночных заявок теряются",
    text: "Клиент пишет в 23:00 — менеджер ответит утром. К утру клиент уже купил тур у конкурента.",
  },
  {
    icon: Clock,
    stat: "15–40 мин",
    title: "на подбор одного тура",
    text: "Менеджер вручную сравнивает варианты в нескольких системах бронирования. На 50 заявок нужно 5 сотрудников.",
  },
  {
    icon: MessageSquare,
    stat: "80%",
    title: "вопросов — типовые",
    text: "«Какой пляж?», «Есть бассейн?», «Что входит в тур?» — менеджер тратит время на то, что можно автоматизировать.",
  },
  {
    icon: TrendingDown,
    stat: "60%+",
    title: "конверсии — упущено",
    text: "Клиент уходит в долгом ожидании. По данным отрасли — только 35–40% входящих заявок конвертируются в заявку.",
  },
];

const outcomes = [
  "Ассистент работает 24/7 — ночные, выходные и праздничные обращения обрабатываются мгновенно",
  "Подбор тура за 3–30 секунд через АПИ Tourvisor (50+ стран, 500+ курортов)",
  "До 80% диалогов закрывает ИИ — менеджер видит уже квалифицированную заявку",
  "Каждый менеджер закрывает в 3–5 раз больше сделок без расширения штата",
  "Виджет работает от имени вашего бренда (white-label, без сторонних упоминаний)",
  "Подключение за пару минут — одна строка кода и настройка в личном кабинете",
  "Аналитика по диалогам, источникам, конверсии — в личном кабинете lk.navilet.ru",
  "Соответствие 152-ФЗ, серверы в РФ, ДПУ с каждым клиентом",
];

const recommendedTariffs = [
  {
    icon: Store,
    title: "Первый шаг — минимальный бюджет",
    rec: "Тариф «Lite»",
    price: "1 990 ₽/мес",
    detail: "30 диалогов в месяц. Подключение бесплатно.",
    when: "Одиночный агент или небольшой сайт, до 1 диалога в день",
    href: "/tarify#lite",
  },
  {
    icon: Store,
    title: "Одиночный офис или филиал",
    rec: "Тариф «Старт»",
    price: "3 290 ₽/мес",
    detail: "50 диалогов в месяц. Подключение бесплатно.",
    when: "1–2 диалога в день, базовый поток, тестируете подход",
    href: "/tarify#start",
  },
  {
    icon: Building2,
    title: "Главный офис небольшой сети",
    rec: "Тариф «Стандарт»",
    price: "5 290 ₽/мес",
    detail: "120 диалогов в месяц. Подключение бесплатно.",
    when: "2–4 диалога в день, активный сайт, есть менеджеры на бронировании",
    isPopular: true,
    href: "/tarify#standart",
  },
  {
    icon: Users,
    title: "Зрелое агентство или 2–3 офиса",
    rec: "Тариф «Бизнес»",
    price: "7 990 ₽/мес",
    detail: "200 диалогов в месяц. Подключение бесплатно.",
    when: "5–7 диалогов в день, поток ночных и выходных заявок",
    href: "/tarify#biznes",
  },
];

const audienceJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "@id": `${siteUrl}/dlya-turagentstv#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Главная", item: siteUrl },
        {
          "@type": "ListItem",
          position: 2,
          name: "Для турагентств",
          item: `${siteUrl}/dlya-turagentstv`,
        },
      ],
    },
    {
      "@type": "WebPage",
      "@id": `${siteUrl}/dlya-turagentstv#webpage`,
      url: `${siteUrl}/dlya-turagentstv`,
      name: "ИИ для турагентства — «Навылет! AI»",
      description:
        "ИИ-ассистент для турагентств: подбор туров 24/7, обработка ночных заявок, разгрузка менеджеров.",
      inLanguage: "ru-RU",
      isPartOf: { "@id": `${siteUrl}/#website` },
      breadcrumb: { "@id": `${siteUrl}/dlya-turagentstv#breadcrumb` },
      about: { "@id": `${siteUrl}/#product` },
      publisher: { "@id": `${siteUrl}/#organization` },
      primaryImageOfPage: { "@id": `${siteUrl}/#logo` },
    },
    {
      "@type": "Service",
      "@id": `${siteUrl}/dlya-turagentstv#service`,
      name: "ИИ-ассистент «Навылет! AI» для турагентств",
      serviceType: "ИИ-автоматизация турагентств",
      provider: { "@id": `${siteUrl}/#organization` },
      areaServed: { "@type": "Country", name: "Россия" },
      audience: {
        "@type": "BusinessAudience",
        audienceType: "Турагентства, сети магазинов горящих путёвок, офисы продаж туров",
      },
      description:
        "Готовая ИИ-автоматизация для турагентств. Виджет на сайте подбирает туры, консультирует и отвечает на типовые вопросы клиентов 24/7. Интеграция с Tourvisor. Подключение за пару минут.",
      offers: { "@id": `${siteUrl}/#product` },
    },
  ],
};

export default function ForAgenciesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(audienceJsonLd) }}
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
              Для турагентств
            </li>
          </ol>
        </nav>

        {/* Hero */}
        <section className="mx-auto max-w-4xl px-5 py-10 text-center sm:px-6 sm:py-14 lg:px-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5">
            <Sparkles className="h-4 w-4 text-accent" />
            <span className="text-xs font-semibold text-accent sm:text-sm">
              Решение для турагентств
            </span>
          </div>
          <h1 className="font-display text-4xl font-bold leading-tight text-heading sm:text-5xl">
            <span className="text-accent">ИИ-ассистент</span> для турагентства,
            который не пропустит ночную заявку
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-body sm:text-lg">
            «Навылет! AI» берёт на себя первичную консультацию, подбор и
            сравнение туров — 24 часа в сутки. Менеджер подключается только
            тогда, когда клиент готов бронировать. Один офис или сеть из 100+
            точек — продукт масштабируется под любой поток.
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
              href="/demo"
              className="inline-flex items-center gap-2 rounded-xl border border-blue-subtle/50 bg-white px-6 py-3 font-semibold text-heading transition-colors hover:bg-blue-ice/30"
            >
              Попробовать демо
            </Link>
          </div>
        </section>

        {/* Pains */}
        <section className="bg-surface-alt">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
            <div className="text-center">
              <h2 className="font-display text-3xl font-bold text-heading sm:text-4xl">
                Четыре боли турагентства, которые решает{" "}
                <span className="text-accent">ИИ</span>
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base text-body">
                Каждая из них стоит вам реальных денег и реальных клиентов
                каждый день.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {pains.map((p) => (
                <div
                  key={p.title}
                  className="rounded-2xl border border-blue-subtle/50 bg-white p-6"
                >
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                    <p.icon className="h-6 w-6 text-accent" />
                  </div>
                  <p className="font-display text-3xl font-bold text-heading">
                    {p.stat}
                  </p>
                  <p className="mt-1 font-display text-sm font-semibold text-heading">
                    {p.title}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-body">
                    {p.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What you get */}
        <section className="mx-auto max-w-5xl px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="text-center">
            <h2 className="font-display text-3xl font-bold text-heading sm:text-4xl">
              Что получает турагентство после подключения
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-body">
              Восемь конкретных изменений в работе агентства — измеряются с
              первой недели.
            </p>
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
        </section>

        {/* Recommended tariffs */}
        <section className="bg-surface-alt">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
            <div className="text-center">
              <h2 className="font-display text-3xl font-bold text-heading sm:text-4xl">
                Какой тариф подойдёт вашему агентству
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base text-body">
                Подбираем по размеру офиса, потоку заявок и зрелости процессов.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {recommendedTariffs.map((t) => (
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
            <div className="mt-10 text-center text-sm text-muted">
              Большая сеть с центральным сайтом и 4+ офисами? Смотрите тариф{" "}
              <Link
                href="/tarify#set"
                className="font-semibold text-accent underline decoration-accent/30 underline-offset-2 hover:decoration-accent"
              >
                «Сеть»
              </Link>{" "}
              с лимитом 400 диалогов/мес.
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-3xl px-5 py-16 text-center sm:px-6 lg:px-8 lg:py-20">
          <h2 className="font-display text-3xl font-bold text-heading sm:text-4xl">
            Попробуйте на своём сайте — 30 дней{" "}
            <span className="text-accent">бесплатно</span>
          </h2>
          <p className="mt-4 text-base text-body sm:text-lg">
            Без разовых платежей и сложных договоров. Одна строка кода — и ИИ-ассистент
            обрабатывает заявки 24/7.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/tarify"
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 font-semibold text-white shadow-lg transition-transform hover:scale-[1.02]"
            >
              Выбрать тариф
            </Link>
            <Link
              href="/faq"
              className="inline-flex items-center gap-2 rounded-xl border border-blue-subtle/50 bg-white px-6 py-3 font-semibold text-heading transition-colors hover:bg-blue-ice/30"
            >
              Частые вопросы
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
