import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/sections/Navigation";
import Footer from "@/components/sections/Footer";
import FloatingCTA from "@/components/ui/FloatingCTA";
import {
  ChevronRight,
  Database,
  Zap,
  Plane,
  Globe,
  ShieldCheck,
  Bot,
  Check,
  Server,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: { absolute: "Интеграция с Tourvisor — ИИ-подбор туров | Навылет! AI" },
  description:
    "Готовая интеграция ИИ-ассистента «Навылет! AI» с агрегатором Tourvisor: 50+ стран, 500+ курортов, тысячи отелей. Live-цены, наличие, перелёты — в живом диалоге с клиентом 24/7. Подключение за 1 день.",
  keywords: [
    "интеграция Tourvisor",
    "Tourvisor API",
    "ИИ подбор туров",
    "автоматический подбор туров",
    "виджет Tourvisor для сайта",
    "АПИ Tourvisor турагентство",
    "подключить Tourvisor на сайт",
    "ИИ-ассистент Tourvisor",
    "Навылет AI Tourvisor",
    "автоматизация подбора туров",
  ],
  alternates: { canonical: "/integraciya-tourvisor" },
  openGraph: {
    title:
      "Интеграция «Навылет! AI» с Tourvisor — ИИ-подбор туров в реальном времени",
    description:
      "ИИ-ассистент с готовой интеграцией Tourvisor. 50+ стран, live-цены, мгновенный подбор.",
    url: "https://navilet.ru/integraciya-tourvisor",
    type: "website",
    locale: "ru_RU",
    images: [{ url: "/og-image.png", width: 1376, height: 768 }],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Интеграция «Навылет! AI» с Tourvisor — ИИ-подбор туров",
    description:
      "ИИ-ассистент работает на базе АПИ Tourvisor — крупнейшего агрегатора туроператоров России.",
    images: ["/og-image.png"],
  },
};

const siteUrl = "https://navilet.ru";

const howToSteps = [
  {
    name: "Подайте заявку",
    text: "Заполните короткую форму на сайте или позвоните +7 (963) 799-79-77. Мы создадим аккаунт в личном кабинете lk.navilet.ru.",
  },
  {
    name: "Выберите тариф и канал",
    text: "Подберите подходящий тариф (Старт / Стандарт / Бизнес / Сеть) и канал работы — Web-виджет на сайте или MAX-мессенджер. Можно сразу оба через надстройку «Второй канал».",
  },
  {
    name: "Настройте бренд",
    text: "В личном кабинете задайте название, логотип, цвета, приветственное сообщение и аватар ассистента. Виджет работает в white-label-режиме — без сторонних упоминаний.",
  },
  {
    name: "Вставьте одну строку кода на сайт",
    text: "Перед закрывающим тегом </body> добавьте: <script src=\"https://lk.navilet.ru/widget-loader.js\" data-assistant-id=\"YOUR_ASSISTANT_ID\"></script>. Никакой интеграции с CRM или АПИ туроператоров не требуется — Tourvisor уже подключён на стороне «Навылет! AI».",
  },
  {
    name: "Запустите и анализируйте",
    text: "Ассистент сразу начинает обрабатывать заявки 24/7. В личном кабинете — диалоги, аналитика, конверсия, топ-направления.",
  },
];

const tourvisorJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "@id": `${siteUrl}/integraciya-tourvisor#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Главная",
          item: siteUrl,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Интеграция с Tourvisor",
          item: `${siteUrl}/integraciya-tourvisor`,
        },
      ],
    },
    {
      "@type": "WebPage",
      "@id": `${siteUrl}/integraciya-tourvisor#webpage`,
      url: `${siteUrl}/integraciya-tourvisor`,
      name: "Интеграция «Навылет! AI» с Tourvisor",
      description:
        "Готовая интеграция ИИ-ассистента «Навылет! AI» с агрегатором Tourvisor: 50+ стран, live-цены, мгновенный подбор туров.",
      inLanguage: "ru-RU",
      isPartOf: { "@id": `${siteUrl}/#website` },
      breadcrumb: { "@id": `${siteUrl}/integraciya-tourvisor#breadcrumb` },
      about: { "@id": `${siteUrl}/#product` },
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "HowTo",
      "@id": `${siteUrl}/integraciya-tourvisor#howto`,
      name: "Как подключить ИИ-ассистент с Tourvisor на сайт турагентства",
      description:
        "Пошаговая инструкция подключения ИИ-турменеджера «Навылет! AI» с готовой интеграцией Tourvisor.",
      totalTime: "PT1H",
      estimatedCost: {
        "@type": "MonetaryAmount",
        currency: "RUB",
        value: "1000",
      },
      tool: [
        { "@type": "HowToTool", name: "Сайт турагентства" },
        { "@type": "HowToTool", name: "Доступ в личный кабинет lk.navilet.ru" },
      ],
      step: howToSteps.map((s, i) => ({
        "@type": "HowToStep",
        position: i + 1,
        name: s.name,
        text: s.text,
        url: `${siteUrl}/integraciya-tourvisor#step-${i + 1}`,
      })),
    },
  ],
};

export default function TourvisorIntegrationPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(tourvisorJsonLd) }}
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
              Интеграция с Tourvisor
            </li>
          </ol>
        </nav>

        {/* Hero */}
        <section className="mx-auto max-w-4xl px-5 py-10 text-center sm:px-6 sm:py-14 lg:px-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5">
            <Sparkles className="h-4 w-4 text-accent" />
            <span className="text-xs font-semibold text-accent sm:text-sm">
              Готовая интеграция · Не нужно подключать самостоятельно
            </span>
          </div>
          <h1 className="font-display text-4xl font-bold leading-tight text-heading sm:text-5xl">
            ИИ-ассистент с интеграцией{" "}
            <span className="text-accent">Tourvisor</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-body sm:text-lg">
            «Навылет! AI» уже подключён к АПИ Tourvisor — крупнейшего
            агрегатора туроператоров России. Турагентству не нужно настраивать
            интеграцию: вы вставляете одну строку кода на сайт, и ИИ-ассистент
            начинает подбирать туры в реальном времени.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/tarify"
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 font-semibold text-white shadow-lg transition-transform hover:scale-[1.02]"
            >
              Посмотреть тарифы
            </Link>
            <Link
              href="/#demo"
              className="inline-flex items-center gap-2 rounded-xl border border-blue-subtle/50 bg-white px-6 py-3 font-semibold text-heading transition-colors hover:bg-blue-ice/30"
            >
              Попробовать демо
            </Link>
          </div>
        </section>

        {/* Что такое Tourvisor */}
        <section className="mx-auto max-w-5xl px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-accent">
                Что такое Tourvisor
              </p>
              <h2 className="font-display text-3xl font-bold text-heading sm:text-4xl">
                Крупнейший агрегатор туров в России
              </h2>
              <p className="mt-5 text-base text-body sm:text-lg">
                Tourvisor агрегирует предложения всех крупных российских
                туроператоров в едином АПИ: цены, наличие, описания отелей,
                информацию о перелётах. Турагентства используют его для
                подбора туров, но обычно это делают вручную.
              </p>
              <p className="mt-4 text-base text-body sm:text-lg">
                «Навылет! AI» автоматизирует этот процесс: ИИ-ассистент
                обращается к Tourvisor в реальном времени, понимает запрос
                клиента на естественном языке и выдаёт результат за секунды.
              </p>
            </div>
            <ul className="grid grid-cols-2 gap-4">
              {[
                { icon: Globe, label: "50+ стран", sub: "Турция, ОАЭ, Египет, Россия, Таиланд и другие" },
                { icon: Database, label: "500+ курортов", sub: "С описаниями и инфраструктурой" },
                { icon: Server, label: "Тысячи отелей", sub: "Со звёздностью и рейтингами" },
                { icon: Plane, label: "Live-перелёты", sub: "Авиакомпании, время, пересадки" },
              ].map((item) => (
                <li
                  key={item.label}
                  className="rounded-2xl border border-blue-subtle/50 bg-white p-5"
                >
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10">
                    <item.icon className="h-5 w-5 text-accent" />
                  </div>
                  <p className="font-display text-lg font-semibold text-heading">
                    {item.label}
                  </p>
                  <p className="mt-1 text-sm text-muted">{item.sub}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Что получает агентство */}
        <section className="bg-surface-alt">
          <div className="mx-auto max-w-5xl px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
            <div className="text-center">
              <h2 className="font-display text-3xl font-bold text-heading sm:text-4xl">
                Что получает турагентство
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base text-body">
                ИИ-ассистент работает с актуальными данными Tourvisor 24/7 —
                это закрывает три главных боли турагентства.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
              {[
                {
                  icon: Bot,
                  title: "Подбор за секунды",
                  text: "Клиент описывает на естественном языке («хочу в Турцию на 7 ночей в августе, бюджет 150 тысяч на двоих») — ИИ возвращает 3–5 вариантов с фото, ценой и описанием.",
                },
                {
                  icon: Zap,
                  title: "Live-цены без отказов",
                  text: "Все цены и доступность подтверждаются у Tourvisor в момент запроса. Никаких «уже забронировано» после показа клиенту.",
                },
                {
                  icon: ShieldCheck,
                  title: "Без галлюцинаций",
                  text: "15+ safety-net автокорректоров проверяют даты, бюджет, направления и звёздность. ИИ не может «выдумать» отель или цену — все факты идут из Tourvisor.",
                },
              ].map((card) => (
                <div
                  key={card.title}
                  className="rounded-2xl border border-blue-subtle/50 bg-white p-6"
                >
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                    <card.icon className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-heading">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-body">
                    {card.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HowTo: как подключить */}
        <section className="mx-auto max-w-4xl px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="text-center">
            <h2 className="font-display text-3xl font-bold text-heading sm:text-4xl">
              Как подключить за <span className="text-accent">1 день</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-body">
              Никаких сложных интеграций с Tourvisor — он уже подключён на
              нашей стороне. Турагентству нужно только три шага.
            </p>
          </div>

          <ol className="mt-12 space-y-5">
            {howToSteps.map((step, i) => (
              <li
                key={step.name}
                id={`step-${i + 1}`}
                className="flex gap-5 rounded-2xl border border-blue-subtle/50 bg-white p-5 sm:p-6"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 font-display text-lg font-bold text-accent">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-heading">
                    {step.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-body sm:text-base">
                    {step.text}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Что ассистент умеет с Tourvisor */}
        <section className="bg-surface-alt">
          <div className="mx-auto max-w-5xl px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
            <h2 className="text-center font-display text-3xl font-bold text-heading sm:text-4xl">
              Конкретные функции на базе Tourvisor
            </h2>
            <ul className="mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-2">
              {[
                "Подбор по 20+ параметрам: даты, бюджет, состав группы, питание, звёздность, удалённость от моря",
                "Горящие туры по городу вылета с фильтрами",
                "Информация об отелях: пляж, бассейн, детская инфраструктура, рейтинг",
                "Расчёт перелётов с пересадками и временем в пути",
                "Мультистрановой поиск: «Турция или Египет» — сравнение в одном диалоге",
                "Туры без перелёта — для клиентов на машине или автобусом",
                "Учёт визовых сборов и доплат в финальной цене",
                "Fuzzy-matching по названиям отелей и сетей (Rixos = Риксос)",
                "Поддержка групп и семей с распределением по номерам",
                "Кеш популярных направлений для мгновенных повторных запросов",
              ].map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10">
                    <Check className="h-3 w-3 text-accent" />
                  </span>
                  <span className="text-sm text-body sm:text-base">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-3xl px-5 py-16 text-center sm:px-6 lg:px-8 lg:py-20">
          <h2 className="font-display text-3xl font-bold text-heading sm:text-4xl">
            Готовая интеграция — без настроек на вашей стороне
          </h2>
          <p className="mt-4 text-base text-body sm:text-lg">
            Попробуйте бесплатно 7 дней. Без карты, без сложных договоров —
            одна строка кода и аналитика в личном кабинете.
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
