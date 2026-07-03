import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/sections/Navigation";
import Footer from "@/components/sections/Footer";
import FloatingCTA from "@/components/ui/FloatingCTA";
import {
  ChevronRight,
  Award,
  Mail,
  Phone,
  MapPin,
  Building2,
  ArrowRight,
} from "lucide-react";
import { companyInfo, events } from "@/lib/content";

export const metadata: Metadata = {
  title: { absolute: "О компании «Навылет! AI» — разработчик ИИ для туризма" },
  description:
    "ООО «ИИМПАКТ ПЛЮС» — российский разработчик ИИ-турменеджера «Навылет! AI». Эксперты по применению искусственного интеллекта в туризме при Комитете ТПП РФ, благодарность Российского союза туриндустрии и Госдумы РФ.",
  keywords: [
    "о компании Навылет",
    "ИИМПАКТ ПЛЮС",
    "разработчик ИИ для турагентств",
    "эксперты ИИ туризм",
    "ТПП РФ ИИ",
    "участник Сколково",
  ],
  alternates: { canonical: "/o-komande" },
  openGraph: {
    title: "О компании «Навылет! AI» — разработчик ИИ для туризма",
    description:
      "Российский разработчик ИИ-турменеджера. Эксперты по ИИ в туризме при Комитете ТПП РФ.",
    url: "https://navilet.ru/o-komande",
    type: "website",
    locale: "ru_RU",
    images: [{ url: "/og-image.png", width: 1376, height: 768 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "О компании «Навылет! AI»",
    description: "Российский разработчик ИИ-турменеджера для туризма.",
    images: ["/og-image.png"],
  },
};

const siteUrl = "https://navilet.ru";

// Берём только реальные мероприятия из content.ts — без дублирования текстов
const speakingEvents = events.slice(0, 6).map((e) => ({
  date: e.date,
  location: e.location,
  title: e.title,
}));

const teamJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "@id": `${siteUrl}/o-komande#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Главная", item: siteUrl },
        {
          "@type": "ListItem",
          position: 2,
          name: "О компании",
          item: `${siteUrl}/o-komande`,
        },
      ],
    },
    {
      "@type": "AboutPage",
      "@id": `${siteUrl}/o-komande#webpage`,
      url: `${siteUrl}/o-komande`,
      name: "О компании «Навылет! AI»",
      description:
        "ООО «ИИМПАКТ ПЛЮС» — российский разработчик ИИ-турменеджера «Навылет! AI», эксперты по ИИ в туризме при ТПП РФ.",
      inLanguage: "ru-RU",
      isPartOf: { "@id": `${siteUrl}/#website` },
      breadcrumb: { "@id": `${siteUrl}/o-komande#breadcrumb` },
      publisher: { "@id": `${siteUrl}/#organization` },
      about: { "@id": `${siteUrl}/#organization` },
    },
  ],
};

export default function AboutTeamPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(teamJsonLd) }}
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
              О компании
            </li>
          </ol>
        </nav>

        {/* Hero */}
        <section className="mx-auto max-w-4xl px-5 py-10 text-center sm:px-6 sm:py-14 lg:px-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5">
            <Award className="h-4 w-4 text-accent" />
            <span className="text-xs font-semibold text-accent sm:text-sm">
              Эксперты ИИ в туризме при ТПП РФ
            </span>
          </div>
          <h1 className="font-display text-4xl font-bold leading-tight text-heading sm:text-5xl">
            О компании <span className="text-accent">«Навылет! AI»</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-body sm:text-lg">
            ООО «ИИМПАКТ ПЛЮС» — российский разработчик ИИ-турменеджера
            «Навылет! AI». Развиваем продукт с 2023 года и признаны экспертами
            по применению искусственного интеллекта в туризме при Комитете
            ТПП РФ.
          </p>
        </section>

        {/* Recognition */}
        <section className="bg-surface-alt">
          <div className="mx-auto max-w-3xl px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
            <div className="text-center">
              <h2 className="font-display text-3xl font-bold text-heading sm:text-4xl">
                Признание индустрии
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base text-body">
                Экспертиза проекта подтверждена ведущими отраслевыми
                институтами России.
              </p>
            </div>
            <div className="mt-10 space-y-4">
              {[
                {
                  title: "Российский союз туриндустрии (РСТ)",
                  text: "Благодарность вице-президента Юрия Барзыкина за «Вклад в развитие ИИ-технологий в туризме» (октябрь 2025).",
                },
                {
                  title: "Государственная Дума РФ",
                  text: "Благодарность заместителя председателя комитета по туризму Натальи Костенко за вклад в развитие ИИ в туристической отрасли (октябрь 2025).",
                },
                {
                  title: "Торгово-промышленная палата РФ",
                  text: "Эксперты Совета ТПП РФ по применению ИИ в бизнесе, члены Комитета по предпринимательству в сфере туризма.",
                },
                {
                  title: "Ассоциация «ТУРПОМОЩЬ»",
                  text: "Реализован совместный ИИ-проект — интеллектуальный бот проверки легитимности туроператоров по данным реестров.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex items-start gap-4 rounded-2xl border border-blue-subtle/50 bg-white p-5"
                >
                  <Award className="mt-1 h-5 w-5 shrink-0 text-accent" />
                  <div>
                    <p className="font-display text-base font-semibold text-heading">
                      {item.title}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-body">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Speaking events */}
        <section className="mx-auto max-w-3xl px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
          <h2 className="font-display text-3xl font-bold text-heading sm:text-4xl">
            Участие в отраслевых событиях
          </h2>
          <p className="mt-4 text-base text-body">
            Конгрессы туроператоров, заседания ТПП РФ, форумы и научные
            конференции. Полный список — в{" "}
            <Link
              href="/#events"
              className="font-semibold text-accent underline decoration-accent/30 underline-offset-2 hover:decoration-accent"
            >
              разделе «Мероприятия»
            </Link>{" "}
            на главной.
          </p>
          <ol className="mt-8 space-y-3">
            {speakingEvents.map((e) => (
              <li
                key={e.title}
                className="flex gap-4 rounded-2xl border border-blue-subtle/50 bg-white p-5"
              >
                <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                  <div>{e.date}</div>
                  <div className="mt-1 flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    <span>{e.location}</span>
                  </div>
                </div>
                <p className="flex-1 text-sm font-medium text-heading">
                  {e.title}
                </p>
              </li>
            ))}
          </ol>
        </section>

        {/* Company info */}
        <section className="bg-surface-alt">
          <div className="mx-auto max-w-3xl px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
            <h2 className="font-display text-3xl font-bold text-heading sm:text-4xl">
              Юридическое лицо
            </h2>
            <p className="mt-4 text-base text-body">
              Российская компания, серверы в РФ, соответствие 152-ФЗ.
            </p>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-blue-subtle/50 bg-white p-5">
                <Building2 className="mb-2 h-5 w-5 text-accent" />
                <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                  Юридическое название
                </p>
                <p className="mt-2 font-display text-base font-semibold text-heading">
                  {companyInfo.legalName}
                </p>
                <p className="mt-2 text-xs text-muted">
                  ИНН {companyInfo.inn} · ОГРН {companyInfo.ogrn}
                </p>
              </div>
              <div className="rounded-2xl border border-blue-subtle/50 bg-white p-5">
                <MapPin className="mb-2 h-5 w-5 text-accent" />
                <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                  Адрес
                </p>
                <p className="mt-2 text-sm text-heading">{companyInfo.address}</p>
              </div>
              <a
                href={`tel:${companyInfo.phoneRaw}`}
                className="rounded-2xl border border-blue-subtle/50 bg-white p-5 transition-colors hover:border-accent/30"
              >
                <Phone className="mb-2 h-5 w-5 text-accent" />
                <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                  Телефон
                </p>
                <p className="mt-2 font-display text-base font-semibold text-heading">
                  {companyInfo.phone}
                </p>
              </a>
              <a
                href={`mailto:${companyInfo.email}`}
                className="rounded-2xl border border-blue-subtle/50 bg-white p-5 transition-colors hover:border-accent/30"
              >
                <Mail className="mb-2 h-5 w-5 text-accent" />
                <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                  Email
                </p>
                <p className="mt-2 font-display text-base font-semibold text-heading">
                  {companyInfo.email}
                </p>
              </a>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-3xl px-5 py-16 text-center sm:px-6 lg:px-8 lg:py-20">
          <h2 className="font-display text-3xl font-bold text-heading sm:text-4xl">
            Хотите обсудить проект?
          </h2>
          <p className="mt-4 text-base text-body sm:text-lg">
            Мы отвечаем на запросы лично — по email, телефону или через
            форму заявки.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/#cta"
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 font-semibold text-white shadow-lg transition-transform hover:scale-[1.02]"
            >
              Связаться с командой
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/keisy/mgp"
              className="inline-flex items-center gap-2 rounded-xl border border-blue-subtle/50 bg-white px-6 py-3 font-semibold text-heading transition-colors hover:bg-blue-ice/30"
            >
              Кейс МГП
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
