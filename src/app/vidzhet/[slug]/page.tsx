import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, ArrowRight } from "lucide-react";
import Navigation from "@/components/sections/Navigation";
import Footer from "@/components/sections/Footer";
import RegisterCta from "@/components/seo/RegisterCta";
import { platformPages, getPlatformPage } from "@/lib/seo/platform-pages";

const siteUrl = "https://navilet.ru";

export function generateStaticParams() {
  return platformPages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getPlatformPage(slug);
  if (!page) return {};
  return {
    title: { absolute: page.title },
    description: page.description,
    keywords: [...page.keywords],
    alternates: { canonical: `/vidzhet/${page.slug}` },
    openGraph: {
      title: page.title,
      description: page.description,
      url: `${siteUrl}/vidzhet/${page.slug}`,
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

export default async function PlatformPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getPlatformPage(slug);
  if (!page) notFound();

  const url = `${siteUrl}/vidzhet/${page.slug}`;
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
            name: "Виджет на сайт",
            item: `${siteUrl}/vidzhet`,
          },
          { "@type": "ListItem", position: 3, name: page.name, item: url },
        ],
      },
      {
        "@type": "HowTo",
        "@id": `${url}#howto`,
        name: page.h1,
        description: page.description,
        step: page.installSteps.map((s, i) => ({
          "@type": "HowToStep",
          position: i + 1,
          name: s.title,
          text: s.text,
        })),
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

  const otherPlatforms = platformPages.filter((p) => p.slug !== page.slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navigation />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-white">
          <div className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#00E7FD]/[0.07] blur-[120px]" />
          <div className="relative mx-auto max-w-3xl px-5 pt-28 pb-10 sm:px-6 sm:pt-32 lg:px-8">
            <nav className="mb-5 text-xs text-muted" aria-label="Хлебные крошки">
              <Link href="/" className="hover:text-accent">
                Главная
              </Link>
              {" · "}
              <Link href="/vidzhet" className="hover:text-accent">
                Виджет на сайт
              </Link>
              {" · "}
              <span className="text-body">{page.name}</span>
            </nav>
            <h1 className="font-display text-3xl font-bold leading-[1.12] text-heading sm:text-4xl">
              {page.h1}
            </h1>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-body sm:text-lg">
              {page.intro.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div className="mt-7">
              <RegisterCta source={`vidzhet_${page.slug}_hero`} />
            </div>
          </div>
        </section>

        {/* Install steps */}
        <section className="bg-surface-alt">
          <div className="mx-auto max-w-3xl px-5 py-14 sm:px-6 lg:px-8">
            <h2 className="font-display text-2xl font-bold text-heading sm:text-3xl">
              Установка: пошагово
            </h2>
            <div className="mt-7 space-y-4">
              {page.installSteps.map((step, i) => (
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

        {/* Nuances */}
        <section className="bg-surface">
          <div className="mx-auto max-w-3xl px-5 py-14 sm:px-6 lg:px-8">
            <h2 className="font-display text-2xl font-bold text-heading sm:text-3xl">
              Нюансы платформы {page.name}
            </h2>
            <ul className="mt-6 space-y-3">
              {page.nuances.map((n) => (
                <li key={n} className="flex items-start gap-2.5 text-sm leading-relaxed text-body sm:text-base">
                  <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-accent/10">
                    <Check className="h-3 w-3 text-accent" />
                  </span>
                  {n}
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
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-display text-base font-bold text-heading [&::-webkit-details-marker]:hidden">
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

        {/* Other platforms + related */}
        <section className="bg-surface">
          <div className="mx-auto max-w-3xl px-5 py-14 sm:px-6 lg:px-8">
            <h2 className="font-display text-xl font-bold text-heading">
              Виджет для других платформ
            </h2>
            <div className="mt-5 flex flex-wrap gap-2.5">
              {otherPlatforms.map((p) => (
                <Link
                  key={p.slug}
                  href={`/vidzhet/${p.slug}`}
                  className="rounded-full border border-blue-subtle/50 bg-white px-4 py-2 text-sm font-medium text-body transition-colors hover:border-accent hover:text-accent"
                >
                  {p.name}
                </Link>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm">
              <Link href="/demo" className="inline-flex items-center gap-1 font-semibold text-accent hover:underline">
                Живое демо ассистента <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link href="/tarify" className="inline-flex items-center gap-1 font-semibold text-accent hover:underline">
                Тарифы от 1 990 ₽/мес <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link href="/integraciya-tourvisor" className="inline-flex items-center gap-1 font-semibold text-accent hover:underline">
                Интеграция с Tourvisor <ArrowRight className="h-3.5 w-3.5" />
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
              Ассистент на вашем сайте {page.name} — уже сегодня
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-white/70">
              Регистрация за 2 минуты, 30 дней бесплатно, карта не нужна.
            </p>
            <div className="mt-6 flex justify-center">
              <RegisterCta source={`vidzhet_${page.slug}_bottom`} compact dark />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
