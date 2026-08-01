import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/sections/Navigation";
import Footer from "@/components/sections/Footer";
import { ChevronRight } from "lucide-react";
import { getAllPostsMeta } from "@/lib/blog";
import { platformPages } from "@/lib/seo/platform-pages";
import { scenarioPages } from "@/lib/seo/scenario-pages";
import { demandPages } from "@/lib/seo/demand-pages";

export const metadata: Metadata = {
  title: { absolute: "Карта сайта — все разделы Навылет! AI" },
  description:
    "Полный список страниц сайта navilet.ru: продукт и тарифы, инструкции установки виджета по платформам, задачи турагентств, спрос по направлениям и блог.",
  alternates: { canonical: "/karta-sayta" },
  openGraph: {
    title: "Карта сайта — Навылет! AI",
    description: "Все разделы сайта navilet.ru в одном списке.",
    url: "https://navilet.ru/karta-sayta",
    type: "website",
    locale: "ru_RU",
    images: [{ url: "/og-image.png", width: 1376, height: 768 }],
  },
};

const siteUrl = "https://navilet.ru";

type Group = {
  title: string;
  note: string;
  links: { href: string; label: string }[];
};

const groups: Group[] = [
  {
    title: "Продукт",
    note: "Что такое ИИ-ассистент, как он работает и сколько стоит.",
    links: [
      { href: "/", label: "Главная — ИИ-ассистент для турагентств" },
      { href: "/demo", label: "Демо — попробовать ассистента без регистрации" },
      { href: "/tarify", label: "Тарифы и что входит в подписку" },
      { href: "/start", label: "Как начать: регистрация и код виджета" },
      { href: "/dashboard", label: "Личный кабинет: аналитика диалогов" },
      { href: "/prognozy", label: "ИИ-аналитика: прогнозы спроса и продаж" },
      {
        href: "/integraciya-tourvisor",
        label: "Интеграция с Tourvisor: откуда берутся туры и цены",
      },
    ],
  },
  {
    title: "Кому подходит",
    note: "Разбор сценариев для разных типов туристического бизнеса.",
    links: [
      { href: "/dlya-turagentstv", label: "Для турагентств" },
      { href: "/dlya-turoperatorov", label: "Для туроператоров" },
      { href: "/keisy/mgp", label: "Кейс: сеть «Магазины горящих путёвок»" },
    ],
  },
  {
    title: "Установка виджета по платформам",
    note: "Пошаговые инструкции с нюансами каждой платформы.",
    links: [
      { href: "/vidzhet", label: "Все платформы — обзор" },
      ...platformPages.map((p) => ({
        href: `/vidzhet/${p.slug}`,
        label: `Виджет для ${p.name}`,
      })),
    ],
  },
  {
    title: "Задачи турагентств",
    note: "Конкретные проблемы и то, как ассистент их закрывает.",
    links: [
      { href: "/resheniya", label: "Все задачи — обзор" },
      ...scenarioPages.map((p) => ({
        href: `/resheniya/${p.slug}`,
        label: p.h1,
      })),
    ],
  },
  {
    title: "Спрос по направлениям",
    note: "Что спрашивают туристы — по данным диалогов с ассистентом.",
    links: [
      { href: "/spros", label: "Все направления — обзор" },
      ...demandPages.map((p) => ({
        href: `/spros/${p.slug}`,
        label: `Спрос на туры в ${p.country}`,
      })),
    ],
  },
  {
    title: "Компания и документы",
    note: "О проекте, ответы на вопросы и правовая информация.",
    links: [
      { href: "/o-komande", label: "О компании и команде" },
      { href: "/faq", label: "Частые вопросы (FAQ)" },
      { href: "/voprosy", label: "Вопросы и ответы о внедрении ИИ" },
      { href: "/privacy", label: "Политика конфиденциальности" },
    ],
  },
];

export default function KartaSaytaPage() {
  const posts = getAllPostsMeta();

  const allGroups: Group[] = [
    ...groups,
    {
      title: "Блог",
      note: "Разборы, кейсы и практика внедрения ИИ в турбизнесе.",
      links: [
        { href: "/blog", label: "Все статьи" },
        ...posts.map((p) => ({ href: `/blog/${p.slug}`, label: p.title })),
      ],
    },
  ];

  const totalLinks = allGroups.reduce((n, g) => n + g.links.length, 0);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
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
            name: "Карта сайта",
            item: `${siteUrl}/karta-sayta`,
          },
        ],
      },
      {
        "@type": "CollectionPage",
        "@id": `${siteUrl}/karta-sayta#page`,
        url: `${siteUrl}/karta-sayta`,
        name: "Карта сайта — Навылет! AI",
        description:
          "Полный список разделов и страниц сайта navilet.ru, сгруппированных по темам.",
        isPartOf: { "@id": `${siteUrl}/#website` },
        publisher: { "@id": `${siteUrl}/#organization` },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navigation />
      <main>
        <nav
          aria-label="Хлебные крошки"
          className="mx-auto max-w-5xl px-5 pt-24 sm:px-6 lg:px-8 lg:pt-28"
        >
          <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted">
            <li>
              <Link href="/" className="transition-colors hover:text-accent">
                Главная
              </Link>
            </li>
            <li>
              <ChevronRight className="h-4 w-4" aria-hidden />
            </li>
            <li aria-current="page" className="font-semibold text-heading">
              Карта сайта
            </li>
          </ol>
        </nav>

        <section className="mx-auto max-w-5xl px-5 py-10 sm:px-6 sm:py-12 lg:px-8">
          <h1 className="font-display text-4xl font-bold leading-tight text-heading sm:text-5xl">
            Карта сайта
          </h1>
          <p className="mt-5 max-w-2xl text-base text-body sm:text-lg">
            Все разделы navilet.ru в одном списке — {totalLinks} страниц,
            сгруппированных по темам. Если ищете инструкцию под свою платформу или
            разбор конкретной задачи агентства, начните отсюда.
          </p>
        </section>

        <section className="mx-auto max-w-5xl px-5 pb-20 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {allGroups.map((group) => (
              <div
                key={group.title}
                className="rounded-2xl border border-blue-subtle/40 bg-white p-6"
              >
                <h2 className="font-display text-xl font-bold text-heading">
                  {group.title}
                </h2>
                <p className="mt-1.5 text-sm text-muted">{group.note}</p>
                <ul className="mt-4 space-y-2.5">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-body underline decoration-blue-subtle underline-offset-2 transition-colors hover:text-accent hover:decoration-accent/40"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
