import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, ArrowRight } from "lucide-react";
import Navigation from "@/components/sections/Navigation";
import Footer from "@/components/sections/Footer";
import RegisterCta from "@/components/seo/RegisterCta";
import { scenarioPages, getScenarioPage } from "@/lib/seo/scenario-pages";
import { jsonLdScript } from "@/lib/schema";

const siteUrl = "https://navilet.ru";

export function generateStaticParams() {
  return scenarioPages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getScenarioPage(slug);
  if (!page) return {};
  return {
    title: { absolute: page.title },
    description: page.description,
    keywords: [...page.keywords],
    alternates: { canonical: `/resheniya/${page.slug}` },
    openGraph: {
      title: page.title,
      description: page.description,
      url: `${siteUrl}/resheniya/${page.slug}`,
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

export default async function ScenarioPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getScenarioPage(slug);
  if (!page) notFound();

  const url = `${siteUrl}/resheniya/${page.slug}`;
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
            name: "Решения",
            item: `${siteUrl}/resheniya`,
          },
          { "@type": "ListItem", position: 3, name: page.h1, item: url },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: page.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
    ],
  };

  const otherScenarios = scenarioPages.filter((p) => p.slug !== page.slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }}
      />
      <Navigation />
      <main>
        {/* Hero + problem */}
        <section className="relative overflow-hidden bg-white">
          <div className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#00E7FD]/[0.07] blur-[120px]" />
          <div className="relative mx-auto max-w-3xl px-5 pt-28 pb-10 sm:px-6 sm:pt-32 lg:px-8">
            <nav className="mb-5 text-xs text-muted" aria-label="Хлебные крошки">
              <Link href="/" className="hover:text-accent">
                Главная
              </Link>
              {" · "}
              <Link href="/resheniya" className="hover:text-accent">
                Решения
              </Link>
              {" · "}
              <span className="text-body">{page.h1}</span>
            </nav>
            <h1 className="font-display text-3xl font-bold leading-[1.12] text-heading sm:text-4xl">
              {page.h1}
            </h1>

            <div className="mt-7 rounded-2xl border border-blue-subtle/40 bg-blue-ice/40 p-6 sm:p-7">
              <div className="font-display text-3xl font-bold text-accent sm:text-4xl">
                {page.problem.stat}
              </div>
              <div className="mt-1 text-sm font-medium text-muted">
                {page.problem.statLabel}
              </div>
              <div className="mt-4 space-y-3 text-base leading-relaxed text-body">
                {page.problem.text.map((t, i) => (
                  <p key={i}>{t}</p>
                ))}
              </div>
            </div>

            <div className="mt-7">
              <RegisterCta source={`resheniya_${page.slug}_hero`} />
            </div>
          </div>
        </section>

        {/* Solution */}
        <section className="bg-surface-alt">
          <div className="mx-auto max-w-3xl px-5 py-14 sm:px-6 lg:px-8">
            <h2 className="font-display text-2xl font-bold text-heading sm:text-3xl">
              Как это решает <span className="whitespace-nowrap">ИИ-ассистент</span>
            </h2>
            <div className="mt-7 space-y-4">
              {page.solution.map((step, i) => (
                <div
                  key={step.title}
                  className="flex gap-4 rounded-2xl border border-blue-subtle/40 bg-white p-5 shadow-card sm:p-6"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-white">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="font-display text-base font-bold text-heading">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-body">
                      {step.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Outcomes */}
        <section className="bg-surface">
          <div className="mx-auto max-w-3xl px-5 py-14 sm:px-6 lg:px-8">
            <h2 className="font-display text-2xl font-bold text-heading sm:text-3xl">
              Что получает агентство
            </h2>
            <ul className="mt-6 space-y-3">
              {page.outcomes.map((o) => (
                <li
                  key={o}
                  className="flex items-start gap-2.5 text-sm leading-relaxed text-body sm:text-base"
                >
                  <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-accent/10">
                    <Check className="h-3 w-3 text-accent" />
                  </span>
                  {o}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-surface-alt">
          <div className="mx-auto max-w-3xl px-5 py-14 sm:px-6 lg:px-8">
            <h2 className="font-display text-2xl font-bold text-heading sm:text-3xl">
              Частые вопросы
            </h2>
            <div className="mt-6 space-y-4">
              {page.faq.map((item) => (
                <details
                  key={item.question}
                  className="group rounded-2xl border border-blue-subtle/40 bg-white p-5 shadow-card"
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
          </div>
        </section>

        {/* Related */}
        <section className="bg-surface">
          <div className="mx-auto max-w-3xl px-5 py-14 sm:px-6 lg:px-8">
            <h2 className="font-display text-xl font-bold text-heading">
              По теме
            </h2>
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm">
              {page.related.map((r) => (
                <Link
                  key={r.href}
                  href={r.href}
                  className="inline-flex items-center gap-1 font-semibold text-accent hover:underline"
                >
                  {r.label} <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              ))}
            </div>
            <h2 className="mt-8 font-display text-xl font-bold text-heading">
              Другие задачи агентств
            </h2>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {otherScenarios.map((p) => (
                <Link
                  key={p.slug}
                  href={`/resheniya/${p.slug}`}
                  className="rounded-full border border-blue-subtle/50 bg-white px-4 py-2 text-sm font-medium text-body transition-colors hover:border-accent hover:text-accent"
                >
                  {p.h1}
                </Link>
              ))}
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
              Проверьте на своём агентстве — бесплатно
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-white/70">
              Регистрация за 2 минуты, 30 дней теста, без созвонов.
            </p>
            <div className="mt-6 flex justify-center">
              <RegisterCta source={`resheniya_${page.slug}_bottom`} compact dark />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
