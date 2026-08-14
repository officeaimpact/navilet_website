import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/sections/Navigation";
import Footer from "@/components/sections/Footer";
import FloatingCTA from "@/components/ui/FloatingCTA";
import RegisterCta from "@/components/seo/RegisterCta";
import CollectionPreview from "@/components/sections/CollectionPreview";
import {
  podborkiSteps,
  podborkiClientFeatures,
  podborkiDashboardRows,
  podborkiFunnel,
  podborkiFaqItems,
} from "@/lib/content";
import {
  ChevronRight,
  Share2,
  Hotel,
  Plane,
  RefreshCcw,
  ClipboardCheck,
  Palette,
  Timer,
  ArrowRight,
  MessageCircleReply,
  BarChart3,
} from "lucide-react";
import { jsonLdScript } from "@/lib/schema";

const siteUrl = "https://navilet.ru";

export const metadata: Metadata = {
  title: {
    absolute:
      "Подборка туров одной ссылкой клиенту — со статистикой | Навылет! AI",
  },
  description:
    "ИИ-ассистент собирает подборку туров в отдельную страницу под брендом агентства: фото и описания отелей, живые варианты перелёта, обновление цен и заявка без ухода на сторонние сайты. Клиент пересылает ссылку семье, агентство видит просмотры и заявки в кабинете. Входит в обе версии ассистента, от 990 ₽/мес.",
  keywords: [
    "подборка туров ссылкой",
    "отправить подборку туров клиенту",
    "подборка туров в мессенджер",
    "страница подборки туров турагентство",
    "ИИ-ассистент подборка туров",
    "статистика просмотров подборки",
  ],
  alternates: { canonical: "/podborki" },
  openGraph: {
    title: "Подборка туров одной ссылкой — с фото, перелётами и живыми ценами",
    description:
      "Клиент открывает подборку и пересылает её семье, а вы видите просмотры, открытия туров и заявки в личном кабинете.",
    url: `${siteUrl}/podborki`,
    type: "website",
    locale: "ru_RU",
    images: [{ url: "/og-image.png", width: 1376, height: 768 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Подборка туров одной ссылкой",
    description:
      "Фото отелей, варианты перелёта, актуальные цены и заявка внутри страницы агентства.",
    images: ["/og-image.png"],
  },
};

const podborkiJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "@id": `${siteUrl}/podborki#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Главная", item: siteUrl },
        {
          "@type": "ListItem",
          position: 2,
          name: "Подборки",
          item: `${siteUrl}/podborki`,
        },
      ],
    },
    {
      "@type": "WebPage",
      "@id": `${siteUrl}/podborki#webpage`,
      url: `${siteUrl}/podborki`,
      name: "Подборка туров одной ссылкой — страница клиента под брендом агентства",
      description:
        "Публичная страница с вариантами туров: фото и описания отелей, варианты перелёта, обновление цен и заявка агентству. Статистика просмотров и заявок — в личном кабинете.",
      inLanguage: "ru-RU",
      isPartOf: { "@id": `${siteUrl}/#website` },
      breadcrumb: { "@id": `${siteUrl}/podborki#breadcrumb` },
      about: { "@id": `${siteUrl}/#product` },
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "HowTo",
      "@id": `${siteUrl}/podborki#howto`,
      name: "Как отправить клиенту подборку туров одной ссылкой",
      description:
        "Ассистент показывает варианты в диалоге, клиент открывает подборку одной кнопкой и пересылает ссылку семье, а агентство видит статистику в кабинете.",
      totalTime: "PT1M",
      step: podborkiSteps.map((s, i) => ({
        "@type": "HowToStep",
        position: i + 1,
        name: s.title,
        text: s.description,
      })),
    },
    {
      "@type": "FAQPage",
      "@id": `${siteUrl}/podborki#faq`,
      mainEntity: podborkiFaqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
  ],
};

const featureIcons = {
  Hotel,
  Plane,
  RefreshCcw,
  ClipboardCheck,
  Palette,
  Timer,
} as const;

export default function PodborkiPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(podborkiJsonLd) }}
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
              Подборки
            </li>
          </ol>
        </nav>

        {/* Hero */}
        <section className="mx-auto max-w-4xl px-5 py-10 text-center sm:px-6 sm:py-14 lg:px-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5">
            <Share2 className="h-4 w-4 text-accent" />
            <span className="text-xs font-semibold text-accent sm:text-sm">
              Версии «Лид» и «Про» · Web-виджет и MAX
            </span>
          </div>
          <h1 className="font-display text-4xl font-bold leading-tight text-heading sm:text-5xl">
            Подборка туров —{" "}
            <span className="text-accent">одной ссылкой клиенту</span>
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-base text-body sm:text-lg">
            Тур редко выбирают в одиночку. Ассистент собирает подобранные
            варианты в отдельную страницу под вашим брендом: фото отелей,
            варианты перелёта, живые цены. Клиент открывает её по ссылке вне
            чата, сравнивает и пересылает близким — а вы видите, что открыли и
            где появилась заявка.
          </p>

          <div className="mx-auto mt-9 grid max-w-lg grid-cols-2 gap-3">
            {[
              { stat: "7 дней", label: "живёт ссылка у клиента" },
              { stat: "1 клик", label: "от варианта до заявки вам" },
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

        {/* Как это работает */}
        <section className="bg-surface-alt">
          <div className="mx-auto max-w-5xl px-5 py-14 sm:px-6 lg:px-8 lg:py-16">
            <h2 className="text-center font-display text-3xl font-bold text-heading sm:text-4xl">
              Как подборка попадает к клиенту
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-base text-body">
              Менеджер не участвует: страницу создаёт сам ассистент в момент,
              когда показал варианты.
            </p>
            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
              {podborkiSteps.map((s) => (
                <div
                  key={s.step}
                  className="rounded-2xl border border-blue-subtle/50 bg-white p-6 shadow-card"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/10 font-display text-base font-bold text-accent">
                    {s.step}
                  </span>
                  <h3 className="mt-4 font-display text-base font-bold text-heading">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-body">
                    {s.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Что видит клиент */}
        <section className="mx-auto max-w-6xl px-5 py-14 sm:px-6 lg:px-8 lg:py-16">
          <div className="text-center">
            <h2 className="font-display text-3xl font-bold text-heading sm:text-4xl">
              Что клиент видит на странице
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-body">
              Всё, ради чего обычно уходят на сайты туроператоров — фото,
              описание отеля и расписание рейсов — собрано в одном месте с вашим
              логотипом.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-start lg:gap-10">
            {/* На широких экранах превью держится в поле зрения, пока читают
                список возможностей справа. */}
            <div className="lg:sticky lg:top-24">
              <CollectionPreview />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {podborkiClientFeatures.map((f) => {
                const Icon = featureIcons[f.icon];
                return (
                  <div
                    key={f.title}
                    className="flex gap-3.5 rounded-2xl border border-blue-subtle/50 bg-white p-5 shadow-card"
                  >
                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-accent/10">
                      <Icon className="h-5 w-5 text-accent" />
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-display text-base font-bold text-heading">
                        {f.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-body">
                        {f.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Что видит агентство */}
        <section className="bg-surface-alt">
          <div className="mx-auto max-w-5xl px-5 py-14 sm:px-6 lg:px-8 lg:py-16">
            <div className="text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-white px-4 py-1.5">
                <BarChart3 className="h-4 w-4 text-accent" />
                <span className="text-xs font-semibold text-accent sm:text-sm">
                  Раздел «Подборки» в личном кабинете
                </span>
              </div>
              <h2 className="font-display text-3xl font-bold text-heading sm:text-4xl">
                Вы видите, что происходит со ссылкой
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base text-body">
                Обычно после отправки вариантов наступает тишина. Здесь видно,
                открыли ли подборку, сколько человек её смотрело и какой тур
                разглядывали дольше остальных.
              </p>
            </div>

            {/* Мок раздела кабинета */}
            <div className="mt-9 overflow-hidden rounded-2xl border border-blue-subtle/50 bg-white shadow-card">
              <div className="border-b border-blue-subtle/40 bg-gradient-to-r from-blue-ice/60 to-white px-5 py-3">
                <p className="font-display text-sm font-bold text-heading">
                  Подборки · 30 дней
                </p>
                <p className="text-[11px] text-muted">
                  пример данных личного кабинета
                </p>
              </div>

              {/* Десктоп — таблица */}
              <table className="hidden w-full text-left text-sm sm:table">
                <thead>
                  <tr className="border-b border-blue-subtle/40 text-[11px] uppercase tracking-wide text-muted">
                    <th className="px-5 py-3 font-semibold">Подборка</th>
                    <th className="px-3 py-3 font-semibold">Просмотры</th>
                    <th className="px-3 py-3 font-semibold">Открытия туров</th>
                    <th className="px-3 py-3 font-semibold">Заявки</th>
                    <th className="px-5 py-3 font-semibold">Отправлена</th>
                  </tr>
                </thead>
                <tbody>
                  {podborkiDashboardRows.map((row) => (
                    <tr
                      key={row.title}
                      className="border-b border-blue-subtle/30 last:border-0"
                    >
                      <td className="px-5 py-3.5 font-semibold text-heading">
                        {row.title}
                      </td>
                      <td className="px-3 py-3.5 text-body">{row.views}</td>
                      <td className="px-3 py-3.5 text-body">
                        {row.cardClicks}
                      </td>
                      <td className="px-3 py-3.5 font-semibold text-accent">
                        {row.leads}
                      </td>
                      <td className="px-5 py-3.5 text-muted">{row.sent}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Мобильный — карточки */}
              <div className="divide-y divide-blue-subtle/30 sm:hidden">
                {podborkiDashboardRows.map((row) => (
                  <div key={row.title} className="px-4 py-3.5">
                    <p className="font-display text-sm font-bold text-heading">
                      {row.title}
                    </p>
                    <p className="mt-0.5 text-[11px] text-muted">
                      отправлена {row.sent}
                    </p>
                    <div className="mt-2.5 grid grid-cols-3 gap-2 text-center">
                      {[
                        { label: "Просмотры", value: row.views },
                        { label: "Открытия", value: row.cardClicks },
                        { label: "Заявки", value: row.leads },
                      ].map((cell) => (
                        <div
                          key={cell.label}
                          className="rounded-lg bg-surface-alt/70 px-2 py-2"
                        >
                          <p className="font-display text-sm font-bold text-heading">
                            {cell.value}
                          </p>
                          <p className="text-[11px] text-muted">{cell.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Воронка из «Аналитики» */}
            <div className="mt-6 rounded-2xl border border-blue-subtle/50 bg-white p-5 shadow-card sm:p-6">
              <p className="text-center font-display text-sm font-bold text-heading">
                В «Аналитике» это собирается в воронку
              </p>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                {podborkiFunnel.map((f, i) => (
                  <div key={f.label} className="flex items-center gap-2 sm:gap-3">
                    <div className="rounded-xl border border-blue-subtle/50 bg-surface-alt/60 px-3 py-2 text-center sm:px-4">
                      <p className="font-display text-lg font-bold text-accent">
                        {f.value}
                      </p>
                      <p className="text-[11px] leading-tight text-muted">
                        {f.label}
                      </p>
                    </div>
                    {i < podborkiFunnel.length - 1 && (
                      <ArrowRight className="h-4 w-4 flex-shrink-0 text-blue-subtle" />
                    )}
                  </div>
                ))}
              </div>
              <p className="mt-4 text-center text-xs text-muted">
                Пример за 30 дней: из 46 созданных подборок ссылками поделились
                31 раз, открыли 24 — и семь из них закончились заявкой.
              </p>
            </div>
          </div>
        </section>

        {/* Мостик на возврат клиентов */}
        <section className="mx-auto max-w-4xl px-5 py-14 sm:px-6 lg:px-8 lg:py-16">
          <div className="rounded-2xl border border-accent/15 bg-gradient-to-br from-blue-ice/40 to-white p-6 sm:p-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
              <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-accent/10">
                <MessageCircleReply className="h-5 w-5 text-accent" />
              </span>
              <div>
                <h2 className="font-display text-xl font-bold text-heading sm:text-2xl">
                  Подборка работает и на возврат клиента
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-body sm:text-base">
                  Ссылка живёт в семейном чате неделю и всё это время напоминает
                  о вас. Когда срок выходит, страница не ломается: клиент видит
                  брендированный экран с выходами — вернуться в диалог, написать
                  боту в MAX, зайти на сайт или позвонить менеджеру. А в версии
                  «Про» ассистент дополнительно возвращает замолчавших клиентов
                  сам — догоняющими сообщениями и подписками на снижение цены.
                </p>
                <Link
                  href="/vozvrat-klientov"
                  className="mt-2 inline-flex min-h-10 items-center gap-1.5 text-sm font-semibold text-accent transition-colors hover:text-accent-hover"
                >
                  Как работает возврат клиентов
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Доступность в версиях */}
        <section className="bg-surface-alt">
          <div className="mx-auto max-w-4xl px-5 py-14 sm:px-6 lg:px-8 lg:py-16">
            <div className="rounded-2xl border border-blue-subtle/50 bg-white p-6 text-center shadow-card sm:p-10">
              <h2 className="font-display text-2xl font-bold text-heading sm:text-3xl">
                Входит в обе версии ассистента
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sm text-body sm:text-base">
                Подборки работают и в версии «Лид» от 990 ₽/⁠мес, и в «Про»
                от 1 990 ₽/⁠мес, в веб-виджете и в MAX-мессенджере. Отдельной платы
                за них нет — первый месяц бесплатно в любом случае.
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
                  Посмотреть тарифы
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mx-auto max-w-3xl px-5 py-14 sm:px-6 lg:px-8 lg:py-16">
          <h2 className="mb-8 text-center font-display text-3xl font-bold text-heading sm:text-4xl">
            Вопросы про подборки
          </h2>
          <div className="space-y-4">
            {podborkiFaqItems.map((item) => (
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
              Пусть варианты уходят страницей, а не скриншотами
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-body sm:text-lg">
              Подключите ассистента — первый месяц бесплатно, настройка 0 ₽.
            </p>
            <div className="mt-8 flex justify-center">
              <RegisterCta source="podborki_cta" />
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
