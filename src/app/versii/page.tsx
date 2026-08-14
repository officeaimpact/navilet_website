import { Fragment } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/sections/Navigation";
import Footer from "@/components/sections/Footer";
import FloatingCTA from "@/components/ui/FloatingCTA";
import VersionPicker from "@/components/sections/VersionPicker";
import RegisterCta from "@/components/seo/RegisterCta";
import {
  assistantVersions,
  versionCompareGroups,
  versionCompareMaxNote,
  versiiFaqItems,
} from "@/lib/content";
import {
  ChevronRight,
  Check,
  Minus,
  Sparkles,
  Target,
  Gem,
  ArrowRight,
  Link2,
  RotateCcw,
} from "lucide-react";
import { jsonLdScript } from "@/lib/schema";

const siteUrl = "https://navilet.ru";

export const metadata: Metadata = {
  title: {
    absolute:
      "Версии ассистента «Лид» и «Про»: сравнение и цены от 990 ₽ | Навылет! AI",
  },
  description:
    "Две версии ИИ-ассистента для турагентства: «Лид» — лидогенерация и заявки менеджерам от 990 ₽/мес, «Про» — полноценный инструмент с консультациями и возвратом клиентов от 1 990 ₽/мес. Полное сравнение в таблице.",
  keywords: [
    "версии ИИ-ассистента",
    "ИИ лидогенерация турагентство",
    "сравнение версий Навылет AI",
    "ИИ-ассистент Лид",
    "ИИ-ассистент Про",
    "чат-бот сбор заявок турагентство",
    "ИИ для менеджеров турагентства",
  ],
  alternates: { canonical: "/versii" },
  openGraph: {
    title: "Версии ИИ-ассистента «Лид» и «Про» — какое решение для вашего агентства",
    description:
      "«Лид» собирает готовые заявки для менеджеров от 990 ₽/мес. «Про» консультирует, сопровождает и возвращает клиентов. Сравните и попробуйте обе версии в демо.",
    url: `${siteUrl}/versii`,
    type: "website",
    locale: "ru_RU",
    images: [{ url: "/og-image.png", width: 1376, height: 768 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Версии ИИ-ассистента «Лид» и «Про» — сравнение",
    description:
      "«Лид» — заявки менеджерам от 990 ₽/мес. «Про» — консультации и возврат клиентов. Первый месяц бесплатно.",
    images: ["/og-image.png"],
  },
};

const versiiJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "@id": `${siteUrl}/versii#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Главная", item: siteUrl },
        {
          "@type": "ListItem",
          position: 2,
          name: "Версии ассистента",
          item: `${siteUrl}/versii`,
        },
      ],
    },
    {
      "@type": "WebPage",
      "@id": `${siteUrl}/versii#webpage`,
      url: `${siteUrl}/versii`,
      name: "Версии ИИ-ассистента «Лид» и «Про» — сравнение",
      description:
        "Сравнение двух версий ИИ-ассистента «Навылет! AI»: «Лид» для лидогенерации и «Про» для полного сопровождения клиентов.",
      inLanguage: "ru-RU",
      isPartOf: { "@id": `${siteUrl}/#website` },
      breadcrumb: { "@id": `${siteUrl}/versii#breadcrumb` },
      about: { "@id": `${siteUrl}/#product` },
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      // Страница сравнивает два платных предложения, поэтому цены
      // размечены прямо здесь: Яндекс собирает из lowPrice сниппет
      // «от 990 ₽», а ИИ-поиск получает цену вместе с описанием версий.
      "@type": "Product",
      "@id": `${siteUrl}/versii#product`,
      name: "ИИ-ассистент «Навылет! AI»: версии «Лид» и «Про»",
      description:
        "Две версии ИИ-ассистента для турагентства на одном движке: «Лид» — лидогенерация и готовые заявки менеджеру, «Про» — консультации без ограничений, проверка цен в диалоге и возврат клиентов в MAX.",
      brand: { "@id": `${siteUrl}/#organization` },
      category: "B2B SaaS / TravelTech",
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "RUB",
        lowPrice: "990",
        highPrice: "14990",
        offerCount: 2,
        availability: "https://schema.org/InStock",
        url: `${siteUrl}/tarify`,
        offers: assistantVersions.map((v) => ({
          "@type": "Offer",
          name: v.fullName,
          description: v.tagline,
          price: String(v.priceFrom),
          priceCurrency: "RUB",
          availability: "https://schema.org/InStock",
          url: `${siteUrl}/versii`,
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: String(v.priceFrom),
            priceCurrency: "RUB",
            unitText: "MONTHLY",
            billingDuration: 1,
          },
        })),
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${siteUrl}/versii#faq`,
      mainEntity: versiiFaqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
  ],
};

/** Ячейка сравнительной таблицы: ✓ / — / текст */
function CompareCell({ value }: { value: string | boolean }) {
  if (value === true) {
    return (
      <span className="inline-flex items-center gap-1.5">
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent/10">
          <Check className="h-3 w-3 text-accent" aria-hidden />
        </span>
        <span className="sr-only">да</span>
      </span>
    );
  }
  if (value === false) {
    return (
      <span className="inline-flex items-center text-muted">
        <Minus className="h-4 w-4" aria-hidden />
        <span className="sr-only">нет</span>
      </span>
    );
  }
  return <span className="text-body">{value}</span>;
}

const whoLid = [
  "Продают живые менеджеры — ассистент готовит для них заявки",
  "Нужен стабильный поток лидов с сайта и из MAX — 24/7",
  "Заявки теряются ночью и в выходные",
  "Важна минимальная цена за диалог",
];

const whoPro = [
  "Хотите, чтобы ассистент консультировал клиента как менеджер",
  "Клиенты задают много вопросов об отелях, пляжах и питании",
  "Есть база клиентов в MAX — нужен возврат и повторные касания",
  "Менеджеров мало, автоматизации нужно больше",
];

export default function VersiiPage() {
  const lid = assistantVersions.find((v) => v.id === "lid")!;
  const pro = assistantVersions.find((v) => v.id === "pro")!;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(versiiJsonLd) }}
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
              Версии ассистента
            </li>
          </ol>
        </nav>

        {/* Hero + интерактивный выбор */}
        <section className="mx-auto max-w-5xl px-5 py-10 sm:px-6 sm:py-14 lg:px-8">
          <div className="text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5">
              <Sparkles className="h-4 w-4 text-accent" />
              <span className="text-xs font-semibold text-accent sm:text-sm">
                Первый месяц бесплатно · на любой версии
              </span>
            </div>
            <h1 className="font-display text-4xl font-bold leading-tight text-heading sm:text-5xl">
              Версии ИИ-ассистента:{" "}
              <span className="text-accent">«Лид» и «Про»</span>
            </h1>
            <p className="mx-auto mt-5 max-w-3xl text-base text-body sm:text-lg">
              ИИ-ассистент «Навылет! AI» выпускается в двух версиях на одном
              движке. <strong className="font-semibold text-heading">«Лид»</strong> —
              лидогенерация: живой диалог, подбор туров и готовая заявка сразу
              вашему менеджеру,{" "}
              <span className="whitespace-nowrap">от 990 ₽/мес</span>.{" "}
              <strong className="font-semibold text-heading">«Про»</strong> —
              полноценный инструмент менеджера: консультации без ограничений,
              проверка цен в чате и возврат клиентов,{" "}
              <span className="whitespace-nowrap">от 1 990 ₽/мес</span>. Обе
              работают в Web-виджете и MAX.
            </p>
          </div>

          <div className="mt-10">
            <VersionPicker source="versii" />
          </div>
        </section>

        {/* Кому какая версия */}
        <section className="bg-surface-alt">
          <div className="mx-auto max-w-5xl px-5 py-14 sm:px-6 lg:px-8 lg:py-16">
            <h2 className="text-center font-display text-3xl font-bold text-heading sm:text-4xl">
              Какая версия подойдёт вашему агентству?
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
              <div className="rounded-2xl border border-blue-subtle/50 bg-white p-6 shadow-card sm:p-7">
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10">
                    <Target className="h-5 w-5 text-accent" />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold text-heading">
                      Берите «Лид», если
                    </h3>
                    <p className="text-xs font-medium text-accent">
                      от 990 ₽/мес · 40 диалогов
                    </p>
                  </div>
                </div>
                <ul className="space-y-2.5">
                  {whoLid.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-body">
                      <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-accent/10">
                        <Check className="h-3 w-3 text-accent" />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-blue-subtle/50 bg-white p-6 shadow-card sm:p-7">
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10">
                    <Gem className="h-5 w-5 text-accent" />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold text-heading">
                      Берите «Про», если
                    </h3>
                    <p className="text-xs font-medium text-accent">
                      от 1 990 ₽/мес · 30 диалогов
                    </p>
                  </div>
                </div>
                <ul className="space-y-2.5">
                  {whoPro.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-body">
                      <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-accent/10">
                        <Check className="h-3 w-3 text-accent" />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="mt-6 text-center text-sm text-muted">
              Сомневаетесь? Версия меняется в личном кабинете в любой момент —
              история диалогов и настройки сохраняются.
            </p>
          </div>
        </section>

        {/* Полный функционал обеих версий — серверный рендер.
            В интерактивной карточке выше эти списки появляются только
            после клика, то есть в HTML их нет: ни поиск, ни ИИ-краулеры
            такой контент не видят. Здесь он есть всегда. */}
        <section className="mx-auto max-w-5xl px-5 py-14 sm:px-6 lg:px-8 lg:py-16">
          <h2 className="text-center font-display text-3xl font-bold text-heading sm:text-4xl">
            Что умеет каждая версия
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-base text-body">
            Полный список возможностей: слева — то, что делает «Лид» за{" "}
            <span className="whitespace-nowrap">
              {lid.priceFrom.toLocaleString("ru-RU")} ₽/мес
            </span>
            , справа — что добавляет «Про» за{" "}
            <span className="whitespace-nowrap">
              {pro.priceFrom.toLocaleString("ru-RU")} ₽/мес
            </span>
            .
          </p>

          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {[lid, pro].map((version) => (
              <div
                key={version.id}
                className="rounded-2xl border border-blue-subtle/50 bg-white p-6 shadow-card sm:p-7"
              >
                <div className="flex items-center gap-3 border-b border-blue-subtle/40 pb-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10">
                    {version.id === "lid" ? (
                      <Target className="h-5 w-5 text-accent" />
                    ) : (
                      <Gem className="h-5 w-5 text-accent" />
                    )}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold text-heading">
                      {version.fullName}
                    </h3>
                    <p className="text-xs font-medium text-accent">
                      от {version.priceFrom.toLocaleString("ru-RU")} ₽/мес
                    </p>
                  </div>
                </div>

                <div className="mt-5 space-y-5">
                  {version.featureGroups.map((group) => (
                    <div key={group.title}>
                      <h4 className="mb-2.5 text-xs font-bold uppercase tracking-wide text-muted">
                        {group.title}
                      </h4>
                      <ul className="space-y-2">
                        {group.items.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2 text-sm leading-relaxed text-body"
                          >
                            <span className="mt-0.5 flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center rounded-full bg-accent/10">
                              <Check className="h-2.5 w-2.5 text-accent" />
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Две функции заслуживают отдельного разбора — раньше со страницы
              версий на них не было ни одной прямой ссылки. */}
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Link
              href="/podborki"
              className="group flex items-start gap-3 rounded-2xl border border-blue-subtle/50 bg-white p-5 transition-colors hover:border-accent/40 hover:bg-blue-ice/30"
            >
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent/10">
                <Link2 className="h-4 w-4 text-accent" />
              </span>
              <span>
                <span className="flex items-center gap-1.5 font-display text-base font-bold text-heading transition-colors group-hover:text-accent">
                  Подборки по ссылке
                  <ArrowRight className="h-4 w-4" />
                </span>
                <span className="mt-1 block text-sm leading-relaxed text-body">
                  Есть в обеих версиях: клиент открывает страницу с турами под
                  брендом агентства, вы видите просмотры и заявки.
                </span>
              </span>
            </Link>
            <Link
              href="/vozvrat-klientov"
              className="group flex items-start gap-3 rounded-2xl border border-blue-subtle/50 bg-white p-5 transition-colors hover:border-accent/40 hover:bg-blue-ice/30"
            >
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent/10">
                <RotateCcw className="h-4 w-4 text-accent" />
              </span>
              <span>
                <span className="flex items-center gap-1.5 font-display text-base font-bold text-heading transition-colors group-hover:text-accent">
                  Возврат клиентов в MAX
                  <ArrowRight className="h-4 w-4" />
                </span>
                <span className="mt-1 block text-sm leading-relaxed text-body">
                  Только в «Про»: догоняющие сообщения и подписки на снижение
                  цены возвращают до 40% замолчавших клиентов.
                </span>
              </span>
            </Link>
          </div>
        </section>

        {/* Полная сравнительная таблица */}
        <section className="mx-auto max-w-5xl px-5 pb-14 sm:px-6 lg:px-8 lg:pb-16">
          <h2 className="text-center font-display text-3xl font-bold text-heading sm:text-4xl">
            Чем отличаются версии — полное сравнение
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-base text-body">
            Это разные инструменты на одном движке: «Лид» ловит заявку и
            передаёт её живому менеджеру, «Про» сам сопровождает клиента до
            брони и возвращает ушедших.
          </p>

          {/* На узких экранах таблица разворачивается в стек: название функции
              строкой, под ней две колонки со значениями «Лид» и «Про». */}
          <div className="mt-10 overflow-hidden rounded-2xl border border-blue-subtle/50">
            <div className="sm:overflow-x-auto">
              <table className="block w-full text-sm sm:table sm:min-w-[640px]">
                <thead className="hidden sm:table-header-group">
                  <tr className="bg-surface-alt">
                    <th className="w-[40%] px-4 py-3.5 text-left font-semibold text-heading sm:px-5">
                      Возможность
                    </th>
                    <th className="w-[30%] px-4 py-3.5 text-left sm:px-5">
                      <span className="flex items-center gap-2 font-display font-bold text-heading">
                        <Target className="h-4 w-4 text-accent" />
                        «Лид»
                      </span>
                      <span className="mt-0.5 block text-xs font-medium text-accent">
                        от 990 ₽/мес
                      </span>
                    </th>
                    <th className="w-[30%] px-4 py-3.5 text-left sm:px-5">
                      <span className="flex items-center gap-2 font-display font-bold text-heading">
                        <Gem className="h-4 w-4 text-accent" />
                        «Про»
                      </span>
                      <span className="mt-0.5 block text-xs font-medium text-accent">
                        от 1 990 ₽/мес
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody className="block sm:table-row-group">
                  {versionCompareGroups.map((group) => (
                    <Fragment key={group.title}>
                      <tr className="block bg-blue-ice/40 sm:table-row">
                        <td
                          colSpan={3}
                          className="block px-4 py-2.5 text-xs font-bold uppercase tracking-wide text-accent sm:table-cell sm:px-5"
                        >
                          {group.title}
                        </td>
                      </tr>
                      {group.rows.map((row) => (
                        <tr
                          key={row.feature}
                          className="grid grid-cols-2 gap-x-4 border-t border-blue-subtle/30 bg-white px-4 py-3.5 sm:table-row sm:px-0 sm:py-0 sm:align-top sm:hover:bg-blue-ice/15"
                        >
                          <td className="col-span-2 block font-medium text-heading sm:table-cell sm:px-5 sm:py-3">
                            {row.feature}
                          </td>
                          <td className="mt-2 block sm:mt-0 sm:table-cell sm:px-5 sm:py-3">
                            <span className="mb-1 block text-[11px] font-bold uppercase tracking-wide text-muted sm:hidden">
                              Лид
                            </span>
                            <CompareCell value={row.lid} />
                          </td>
                          <td className="mt-2 block sm:mt-0 sm:table-cell sm:px-5 sm:py-3">
                            <span className="mb-1 block text-[11px] font-bold uppercase tracking-wide text-muted sm:hidden">
                              Про
                            </span>
                            <CompareCell value={row.pro} />
                          </td>
                        </tr>
                      ))}
                    </Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <p className="mx-auto mt-5 max-w-3xl text-center text-xs leading-relaxed text-muted">
            {versionCompareMaxNote}
          </p>

          <div className="mt-8 text-center">
            <Link
              href="/tarify"
              className="inline-flex min-h-10 items-center gap-1.5 text-sm font-semibold text-accent transition-colors hover:text-accent-hover"
            >
              Смотреть тарифы обеих версий
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* Надёжность «Лид» + сила «Про» */}
        <section className="bg-surface-alt">
          <div className="mx-auto max-w-5xl px-5 py-14 sm:px-6 lg:px-8 lg:py-16">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              {[
                {
                  stat: "100%",
                  label: "диалогов с контактом",
                  text: "В версии «Лид» контакт клиента известен с первого сообщения — ни один диалог не заканчивается «в никуда».",
                },
                {
                  stat: "107",
                  label: "реальных диалогов",
                  text: "Сценарий «Лид» проверен повтором 107 боевых диалогов с продакшена — ноль сбоев после доработок.",
                },
                {
                  stat: "до 40%",
                  label: "отклик на возврат",
                  text: "В версии «Про» догоняющие сообщения в MAX возвращают в диалог до 40% замолчавших клиентов.",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-blue-subtle/50 bg-white p-6 text-center shadow-card"
                >
                  <p className="font-display text-3xl font-bold text-accent">
                    {item.stat}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-heading">
                    {item.label}
                  </p>
                  <p className="mt-2.5 text-sm leading-relaxed text-body">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mx-auto max-w-3xl px-5 py-14 sm:px-6 lg:px-8 lg:py-16">
          <h2 className="mb-8 text-center font-display text-3xl font-bold text-heading sm:text-4xl">
            Вопросы про версии
          </h2>
          <div className="space-y-4">
            {versiiFaqItems.map((item) => (
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
              Попробуйте обе версии бесплатно
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-body sm:text-lg">
              Первый месяц — бесплатно на любой версии: «Лид» от{" "}
              {lid.priceFrom.toLocaleString("ru-RU")} ₽/мес, «Про» от{" "}
              {pro.priceFrom.toLocaleString("ru-RU")} ₽/мес после теста.
              Подключение — 0 ₽.
            </p>
            <div className="mt-8 flex justify-center">
              <RegisterCta source="versii_cta" />
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
