import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Leaf,
  Wallet,
  MessageSquare,
  ArrowRight,
  Check,
} from "lucide-react";
import Navigation from "@/components/sections/Navigation";
import Footer from "@/components/sections/Footer";
import RegisterCta from "@/components/seo/RegisterCta";
import { demandPages, getDemandPage } from "@/lib/seo/demand-pages";
import { jsonLdScript } from "@/lib/schema";

const siteUrl = "https://navilet.ru";

const fmtRub = (v: number) =>
  `${v.toLocaleString("ru-RU").replace(/\s/g, "\u202F")} ₽`;

export function generateStaticParams() {
  return demandPages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getDemandPage(slug);
  if (!page) return {};
  return {
    title: { absolute: page.title },
    description: page.description,
    keywords: [...page.keywords],
    alternates: { canonical: `/spros/${page.slug}` },
    openGraph: {
      title: page.title,
      description: page.description,
      url: `${siteUrl}/spros/${page.slug}`,
      type: "article",
      locale: "ru_RU",
      images: [{ url: "/og-image.png", width: 1376, height: 768 }],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: ["/og-image.png"],
    },
    robots: { index: true, follow: true },
  };
}

export default async function DemandPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getDemandPage(slug);
  if (!page) notFound();

  const url = `${siteUrl}/spros/${page.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: page.title,
        description: page.description,
        isPartOf: { "@id": `${siteUrl}/#website` },
        inLanguage: "ru-RU",
        breadcrumb: { "@id": `${url}#breadcrumb` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Главная", item: siteUrl },
          {
            "@type": "ListItem",
            position: 2,
            name: "Спрос по направлениям",
            item: `${siteUrl}/spros`,
          },
          { "@type": "ListItem", position: 3, name: page.country, item: url },
        ],
      },
      {
        "@type": "Dataset",
        "@id": `${url}#dataset`,
        name: `Спрос на туры: ${page.country} — статистика диалогов сети «Навылет! AI»`,
        description: `Обезличенная статистика запросов туристов по направлению «${page.country}» из диалогов с ИИ-ассистентами сети «Навылет! AI»: доля спроса, тренд, медианный чек интереса.`,
        creator: {
          "@type": "Organization",
          name: "Навылет! AI",
          url: siteUrl,
        },
        temporalCoverage: "P30D",
        variableMeasured: [
          {
            "@type": "PropertyValue",
            name: "Доля спроса по сети",
            value: `${page.sharePct}%`,
          },
          {
            "@type": "PropertyValue",
            name: "Тренд к предыдущему периоду",
            value: `${page.trendPp > 0 ? "+" : ""}${page.trendPp} п.п.`,
          },
          {
            "@type": "PropertyValue",
            name: "Медианный чек интереса",
            value: fmtRub(page.medianCheck),
          },
        ],
      },
    ],
  };

  const TrendIcon =
    page.trendPp > 0 ? TrendingUp : page.trendPp < 0 ? TrendingDown : Minus;
  const trendColor =
    page.trendPp > 0
      ? "text-emerald-600"
      : page.trendPp < 0
        ? "text-amber-600"
        : "text-muted";

  const otherPages = demandPages.filter((p) => p.slug !== page.slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }}
      />
      <Navigation />
      <main>
        {/* Hero + data card */}
        <section className="relative overflow-hidden bg-white">
          <div className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#00E7FD]/[0.07] blur-[120px]" />
          <div className="relative mx-auto max-w-3xl px-5 pt-28 pb-10 sm:px-6 sm:pt-32 lg:px-8">
            <nav className="mb-5 text-xs text-muted" aria-label="Хлебные крошки">
              <Link href="/" className="hover:text-accent">
                Главная
              </Link>
              {" · "}
              <Link href="/spros" className="hover:text-accent">
                Спрос по направлениям
              </Link>
              {" · "}
              <span className="text-body">{page.country}</span>
            </nav>
            <h1 className="font-display text-3xl font-bold leading-[1.12] text-heading sm:text-4xl">
              {page.h1}
            </h1>

            {/* Data snapshot */}
            <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-blue-subtle/40 bg-blue-ice/40 p-5">
                <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                  Доля спроса по сети
                </div>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="font-display text-3xl font-bold text-heading">
                    ≈{page.sharePct}%
                  </span>
                  <span
                    className={`inline-flex items-center gap-0.5 text-sm font-semibold ${trendColor}`}
                  >
                    <TrendIcon className="h-4 w-4" />
                    {page.trendPp > 0 ? "+" : ""}
                    {page.trendPp !== 0 ? `${page.trendPp} п.п.` : "стабильно"}
                  </span>
                </div>
              </div>
              <div className="rounded-2xl border border-blue-subtle/40 bg-blue-ice/40 p-5">
                <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                  Медианный чек интереса
                </div>
                <div className="mt-1 flex items-baseline gap-1.5">
                  <Wallet className="h-5 w-5 self-center text-accent" />
                  <span className="font-display text-2xl font-bold text-heading sm:text-3xl">
                    {fmtRub(page.medianCheck)}
                  </span>
                </div>
              </div>
              <div className="rounded-2xl border border-blue-subtle/40 bg-blue-ice/40 p-5">
                <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                  Сезон
                </div>
                <div className="mt-1 flex items-center gap-1.5">
                  <Leaf
                    className={`h-5 w-5 ${page.inSeason ? "text-emerald-500" : "text-muted/50"}`}
                  />
                  <span className="font-display text-xl font-bold text-heading">
                    {page.inSeason ? "в сезоне" : "не сезон"}
                  </span>
                </div>
              </div>
            </div>
            <p className="mt-3 text-xs text-muted">
              Обезличенные агрегаты диалогов сети «Навылет! AI» в среднем за
              месяц. Без данных отдельных компаний.
            </p>

            <div className="mt-6 space-y-4 text-base leading-relaxed text-body sm:text-lg">
              {page.intro.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </section>

        {/* Top questions */}
        <section className="bg-surface-alt">
          <div className="mx-auto max-w-3xl px-5 py-14 sm:px-6 lg:px-8">
            <h2 className="font-display text-2xl font-bold text-heading sm:text-3xl">
              Что спрашивают туристы: топ-вопросы из диалогов
            </h2>
            <div className="mt-7 space-y-4">
              {page.topQuestions.map((q) => (
                <div
                  key={q.question}
                  className="rounded-2xl border border-blue-subtle/40 bg-white p-5 shadow-card sm:p-6"
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/10">
                      <MessageSquare className="h-3.5 w-3.5 text-accent" />
                    </span>
                    <div>
                      <h3 className="font-display text-base font-bold text-heading">
                        {q.question}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-body">
                        {q.insight}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Demand facts */}
        <section className="bg-surface">
          <div className="mx-auto max-w-3xl px-5 py-14 sm:px-6 lg:px-8">
            <h2 className="font-display text-2xl font-bold text-heading sm:text-3xl">
              Портрет спроса: {page.country}
            </h2>
            <ul className="mt-6 space-y-3">
              {page.demandFacts.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-2.5 text-sm leading-relaxed text-body sm:text-base"
                >
                  <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-accent/10">
                    <Check className="h-3 w-3 text-accent" />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* For agencies */}
        <section className="bg-surface-alt">
          <div className="mx-auto max-w-3xl px-5 py-14 sm:px-6 lg:px-8">
            <h2 className="font-display text-2xl font-bold text-heading sm:text-3xl">
              Что это значит для турагентства
            </h2>
            <div className="mt-6 space-y-4">
              {page.forAgencies.map((t, i) => (
                <p
                  key={i}
                  className="rounded-2xl border-l-4 border-accent bg-white p-5 text-sm leading-relaxed text-body shadow-card sm:text-base"
                >
                  {t}
                </p>
              ))}
            </div>
            <div className="mt-8">
              <RegisterCta source={`spros_${page.slug}_mid`} />
            </div>
          </div>
        </section>

        {/* Other directions + related */}
        <section className="bg-surface">
          <div className="mx-auto max-w-3xl px-5 py-14 sm:px-6 lg:px-8">
            <h2 className="font-display text-xl font-bold text-heading">
              Спрос по другим направлениям
            </h2>
            <div className="mt-5 flex flex-wrap gap-2.5">
              {otherPages.map((p) => (
                <Link
                  key={p.slug}
                  href={`/spros/${p.slug}`}
                  className="rounded-full border border-blue-subtle/50 bg-white px-4 py-2 text-sm font-medium text-body transition-colors hover:border-accent hover:text-accent"
                >
                  {p.country}
                </Link>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm">
              <Link
                href="/prognozy"
                className="inline-flex items-center gap-1 font-semibold text-accent hover:underline"
              >
                Барометр спроса и прогнозы в личном кабинете{" "}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/demo"
                className="inline-flex items-center gap-1 font-semibold text-accent hover:underline"
              >
                Посмотреть, как ассистент отвечает на эти вопросы{" "}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              {/* Связки с другими кластерами: без них страницы спроса
                  стоят в стороне от остального сайта. */}
              <Link
                href="/resheniya/nochnye-zayavki"
                className="inline-flex items-center gap-1 font-semibold text-accent hover:underline"
              >
                Что делать с заявками, которые приходят ночью{" "}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/vidzhet"
                className="inline-flex items-center gap-1 font-semibold text-accent hover:underline"
              >
                Как поставить виджет подбора туров на сайт{" "}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/skolko-stoit"
                className="inline-flex items-center gap-1 font-semibold text-accent hover:underline"
              >
                Сколько стоит ассистент — от 990 ₽/мес{" "}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section
          className="relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, #001229 0%, #002152 30%, #0062EF 70%, #0097F5 100%)",
          }}
        >
          <div className="noise-overlay pointer-events-none absolute inset-0 opacity-20" />
          <div className="relative mx-auto max-w-3xl px-5 py-14 text-center sm:px-6 lg:px-8">
            <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
              Заберите спрос по направлению «{page.country}» себе
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-white/70">
              ИИ-ассистент отвечает на эти вопросы на вашем сайте — 24/7.
              Регистрация за 2 минуты, 30 дней бесплатно.
            </p>
            <div className="mt-6 flex justify-center">
              <RegisterCta source={`spros_${page.slug}_bottom`} compact dark />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
