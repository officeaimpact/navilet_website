import type { Metadata } from "next";
import Navigation from "@/components/sections/Navigation";
import Footer from "@/components/sections/Footer";
import FloatingCTA from "@/components/ui/FloatingCTA";
import BlogIndex from "@/components/blog/BlogIndex";
import { getAllPostsMeta } from "@/lib/blog";

const siteUrl = "https://navilet.ru";

export const metadata: Metadata = {
  title: { absolute: "Блог про ИИ в туризме | Навылет! AI" },
  description:
    "Гайды, кейсы и разборы про искусственный интеллект в туризме: автоматизация турагентств, подбор туров, интеграция Tourvisor, экономика ИИ-ассистента для турбизнеса.",
  keywords: [
    "ИИ в туризме блог",
    "автоматизация турагентства статьи",
    "ИИ для турагентства гайд",
    "кейсы ИИ туризм",
    "чат-бот для турагентства",
  ],
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Блог про ИИ в туризме — Навылет! AI",
    description:
      "Гайды, кейсы и разборы про искусственный интеллект в туризме для турагентств и туроператоров.",
    url: `${siteUrl}/blog`,
    images: [{ url: "/og-image.png", width: 1376, height: 768 }],
    type: "website",
    locale: "ru_RU",
  },
  twitter: {
    card: "summary_large_image",
    title: "Блог про ИИ в туризме — Навылет! AI",
    description:
      "Гайды, кейсы и разборы про искусственный интеллект в туризме для турбизнеса.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
};

export default function BlogPage() {
  const posts = getAllPostsMeta();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${siteUrl}/blog#webpage`,
        url: `${siteUrl}/blog`,
        name: "Блог про ИИ в туризме — Навылет! AI",
        isPartOf: { "@id": `${siteUrl}/#website` },
        inLanguage: "ru-RU",
        breadcrumb: { "@id": `${siteUrl}/blog#breadcrumb` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${siteUrl}/blog#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Главная", item: siteUrl },
          {
            "@type": "ListItem",
            position: 2,
            name: "Блог",
            item: `${siteUrl}/blog`,
          },
        ],
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
        <section className="border-b border-blue-subtle/40 bg-surface-alt">
          <div className="mx-auto max-w-7xl px-5 pt-28 pb-12 sm:px-6 sm:pt-32 lg:px-8">
            <nav
              aria-label="Хлебные крошки"
              className="mb-4 text-sm text-muted"
            >
              <a href="/" className="hover:text-accent">
                Главная
              </a>
              <span className="mx-2">/</span>
              <span className="text-body">Блог</span>
            </nav>
            <h1 className="font-display text-4xl font-bold leading-tight text-heading sm:text-5xl">
              Блог про ИИ в туризме
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-body">
              Гайды, кейсы и разборы про автоматизацию турбизнеса: как ИИ
              подбирает туры, обрабатывает заявки 24/7 и увеличивает конверсию.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <p className="text-body">Скоро здесь появятся статьи.</p>
          ) : (
            <BlogIndex posts={posts} />
          )}
        </section>
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
