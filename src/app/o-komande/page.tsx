import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/sections/Navigation";
import Footer from "@/components/sections/Footer";
import FloatingCTA from "@/components/ui/FloatingCTA";
import {
  ChevronRight,
  User,
  Award,
  Briefcase,
  Mail,
  Phone,
  MapPin,
  Building2,
  ArrowRight,
} from "lucide-react";
import { companyInfo, events } from "@/lib/content";

export const metadata: Metadata = {
  title: "Команда «Навылет! AI» — эксперты ИИ-технологий в туризме",
  description:
    "Команда проекта «Навылет! AI» (ООО «ИИМПАКТ ПЛЮС») — эксперты по применению искусственного интеллекта в туризме при Комитете ТПП РФ. Спикеры международных конгрессов туроператоров, благодарность Российского союза туриндустрии и Госдумы РФ.",
  keywords: [
    "команда Навылет AI",
    "ИИМПАКТ ПЛЮС команда",
    "Лукиан Силагадзе",
    "Евгений Ребеко",
    "эксперты ИИ туризм",
    "ТПП РФ ИИ",
    "разработчики ИИ для турагентств",
    "о компании Навылет",
  ],
  alternates: { canonical: "/o-komande" },
  openGraph: {
    title: "Команда «Навылет! AI» — эксперты ИИ-технологий в туризме",
    description:
      "Эксперты по ИИ в туризме при Комитете ТПП РФ. Спикеры конгрессов и форумов туроператоров.",
    url: "https://navilet.ru/o-komande",
    type: "profile",
    locale: "ru_RU",
    images: [{ url: "/og-image.png", width: 1376, height: 768 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Команда «Навылет! AI»",
    description: "Эксперты ИИ-технологий в туризме при ТПП РФ.",
    images: ["/og-image.png"],
  },
};

const siteUrl = "https://navilet.ru";

const team = [
  {
    id: "lukian-silagadze",
    name: "Лукиан Силагадзе",
    role: "Основатель и CEO проекта «Навылет!»",
    bio: "Эксперт по искусственному интеллекту и цифровизации в туризме при Комитете ТПП РФ. Руководитель проекта «Навылет! AI» — ИИ-турменеджера для турагентств и туроператоров. Спикер международных конгрессов туроператоров (Сочи, Москва, Минск, Актау) и Совета ТПП РФ по применению ИИ в бизнесе. В октябре 2025 года удостоен почётной благодарности РСТ и Госдумы РФ за «Вклад в развитие ИИ-технологий в туризме».",
    focus: [
      "Искусственный интеллект в туризме",
      "Архитектура B2B-продуктов",
      "Стратегия партнёрств с туристическими сетями",
    ],
    icon: Briefcase,
  },
  {
    id: "evgenii-rebeko",
    name: "Евгений Ребеко",
    role: "Первый заместитель руководителя проекта",
    bio: "Член Комитета ТПП РФ по предпринимательству в сфере туризма. Спикер форумов в РЭУ им. Г.В. Плеханова и заседаний Совета ТПП РФ по применению ИИ в бизнесе. Соучредитель «Навылет! AI». В октябре 2025 года удостоен почётной благодарности РСТ и Госдумы РФ за «Вклад в развитие ИИ-технологий в туризме» совместно с Лукианом Силагадзе.",
    focus: [
      "Генеративный ИИ в туризме",
      "Образовательные программы для отрасли",
      "Взаимодействие с регуляторами (ТПП РФ, РСТ)",
    ],
    icon: User,
  },
];

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
          name: "О команде",
          item: `${siteUrl}/o-komande`,
        },
      ],
    },
    {
      "@type": "AboutPage",
      "@id": `${siteUrl}/o-komande#webpage`,
      url: `${siteUrl}/o-komande`,
      name: "Команда «Навылет! AI»",
      description:
        "Команда проекта «Навылет! AI» — эксперты ИИ-технологий в туризме при ТПП РФ.",
      inLanguage: "ru-RU",
      isPartOf: { "@id": `${siteUrl}/#website` },
      breadcrumb: { "@id": `${siteUrl}/o-komande#breadcrumb` },
      publisher: { "@id": `${siteUrl}/#organization` },
      about: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "Person",
      "@id": `${siteUrl}/o-komande#lukian-silagadze`,
      name: "Лукиан Силагадзе",
      jobTitle: "Основатель и CEO «Навылет! AI»",
      worksFor: { "@id": `${siteUrl}/#organization` },
      knowsAbout: [
        "Искусственный интеллект в туризме",
        "B2B SaaS",
        "Интеграция Tourvisor",
        "Автоматизация турагентств",
      ],
      affiliation: [
        {
          "@type": "Organization",
          name: "Торгово-промышленная палата РФ",
          url: "https://tpprf.ru",
        },
      ],
      award: [
        "Благодарность за «Вклад в развитие ИИ-технологий в туризме» от вице-президента РСТ Юрия Барзыкина (2025)",
        "Благодарность от заместителя председателя комитета Госдумы РФ по туризму Натальи Костенко (2025)",
      ],
    },
    {
      "@type": "Person",
      "@id": `${siteUrl}/o-komande#evgenii-rebeko`,
      name: "Евгений Ребеко",
      jobTitle: "Первый заместитель руководителя «Навылет! AI»",
      worksFor: { "@id": `${siteUrl}/#organization` },
      knowsAbout: [
        "Генеративный ИИ",
        "Образовательные программы в туризме",
        "Регулирование ИИ-технологий",
      ],
      affiliation: [
        {
          "@type": "Organization",
          name: "Комитет ТПП РФ по предпринимательству в сфере туризма",
          url: "https://tpprf.ru",
        },
      ],
      award: [
        "Благодарность за «Вклад в развитие ИИ-технологий в туризме» от РСТ и Госдумы РФ (2025)",
      ],
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
              О команде
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
            Команда <span className="text-accent">«Навылет! AI»</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-body sm:text-lg">
            ООО «ИИМПАКТ ПЛЮС» — российская команда, разрабатывающая
            ИИ-турменеджер «Навылет! AI» с 2023 года. Признаны экспертами по
            применению искусственного интеллекта в туризме при Комитете ТПП РФ.
          </p>
        </section>

        {/* Team cards */}
        <section className="mx-auto max-w-5xl px-5 pb-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {team.map((member) => (
              <article
                key={member.id}
                id={member.id}
                className="rounded-2xl border border-blue-subtle/50 bg-white p-7 sm:p-8"
              >
                <div className="mb-5 flex items-start gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-accent/15 to-accent/5">
                    <member.icon className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h2 className="font-display text-xl font-bold text-heading sm:text-2xl">
                      {member.name}
                    </h2>
                    <p className="mt-1 text-sm font-medium text-accent">
                      {member.role}
                    </p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-body sm:text-base">
                  {member.bio}
                </p>
                <div className="mt-6 border-t border-blue-subtle/30 pt-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                    Фокус экспертизы
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {member.focus.map((f) => (
                      <li
                        key={f}
                        className="rounded-full border border-blue-subtle/50 bg-blue-ice/30 px-3 py-1 text-xs font-medium text-heading"
                      >
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Recognition */}
        <section className="bg-surface-alt">
          <div className="mx-auto max-w-3xl px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
            <div className="text-center">
              <h2 className="font-display text-3xl font-bold text-heading sm:text-4xl">
                Признание индустрии
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base text-body">
                Экспертиза команды подтверждена ведущими отраслевыми
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
            Где выступала команда
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
            Команда отвечает на запросы лично — по email, телефону или через
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
