import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/sections/Navigation";
import Footer from "@/components/sections/Footer";
import FloatingCTA from "@/components/ui/FloatingCTA";
import { faqItems } from "@/lib/content";
import { ChevronRight, HelpCircle, MessageCircleQuestion } from "lucide-react";
import { jsonLdScript } from "@/lib/schema";

export const metadata: Metadata = {
  title: { absolute: "Частые вопросы про ИИ-ассистент | Навылет! AI" },
  description:
    "Ответы на частые вопросы про ИИ-ассистент для турагентств: цены от 990 ₽/мес, технологии, подключение, безопасность, лимиты диалогов, интеграция с Tourvisor и MAX. Полный гид для турбизнеса.",
  keywords: [
    "ИИ-ассистент турагентство FAQ",
    "ИИ-ассистент вопросы",
    "Навылет AI вопросы",
    "как работает ИИ-ассистент в туризме",
    "виджет подбора туров FAQ",
    "автоматизация турагентства ответы",
    "Tourvisor интеграция вопросы",
    "MAX мессенджер для турагентства",
  ],
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "FAQ — частые вопросы про ИИ-ассистент «Навылет! AI»",
    description:
      "Полный гид: цены, технологии, подключение, безопасность, интеграции.",
    url: "https://navilet.ru/faq",
    type: "website",
    locale: "ru_RU",
    images: [{ url: "/og-image.png", width: 1376, height: 768 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ — частые вопросы про ИИ-ассистент «Навылет! AI»",
    description: "Ответы на популярные вопросы про ИИ-ассистент для турбизнеса.",
    images: ["/og-image.png"],
  },
};

const siteUrl = "https://navilet.ru";

// Сгруппируем FAQ по логическим разделам для AEO
const faqSections = [
  {
    id: "product",
    title: "О продукте",
    icon: HelpCircle,
    matcher: (q: string) =>
      /как работает|что такое.*навылет|интегрируется|конверс/i.test(q),
  },
  {
    id: "pricing",
    title: "Цены и тарифы",
    icon: HelpCircle,
    matcher: (q: string) =>
      /сколько стоит|тариф|второй канал|подключени|диалог|лимит/i.test(q),
  },
  {
    id: "channels",
    title: "Каналы и подключение",
    icon: HelpCircle,
    matcher: (q: string) =>
      /кана|подключи|max|web|сайт/i.test(q),
  },
  {
    id: "tech",
    title: "Технологии и безопасность",
    icon: HelpCircle,
    matcher: (q: string) =>
      /языковая|gpt|llm|данные|безопасн|152-фз/i.test(q),
  },
  {
    id: "business",
    title: "Бизнес-вопросы",
    icon: HelpCircle,
    matcher: (q: string) =>
      /менеджер|кастомиз|настро|тестовый|период|конверс|горящ/i.test(q),
  },
];

const groupedFaq = faqSections.map((section) => ({
  ...section,
  items: faqItems.filter((item) => section.matcher(item.question)),
}));
const usedQuestions = new Set(
  groupedFaq.flatMap((g) => g.items.map((i) => i.question)),
);
const remainingItems = faqItems.filter((i) => !usedQuestions.has(i.question));
if (remainingItems.length > 0) {
  groupedFaq.push({
    id: "other",
    title: "Прочее",
    icon: HelpCircle,
    matcher: () => true,
    items: remainingItems,
  });
}

const faqJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "@id": `${siteUrl}/faq#breadcrumb`,
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
          name: "FAQ",
          item: `${siteUrl}/faq`,
        },
      ],
    },
    {
      "@type": "WebPage",
      "@id": `${siteUrl}/faq#webpage`,
      url: `${siteUrl}/faq`,
      name: "FAQ — Часто задаваемые вопросы",
      description:
        "Ответы на частые вопросы про ИИ-ассистент «Навылет! AI» для турагентств и туроператоров.",
      inLanguage: "ru-RU",
      isPartOf: { "@id": `${siteUrl}/#website` },
      breadcrumb: { "@id": `${siteUrl}/faq#breadcrumb` },
      mainEntity: { "@id": `${siteUrl}/faq#faq` },
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "FAQPage",
      "@id": `${siteUrl}/faq#faq`,
      inLanguage: "ru-RU",
      mainEntity: faqItems.map((item, idx) => ({
        "@type": "Question",
        "@id": `${siteUrl}/faq#question-${idx + 1}`,
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
  ],
};

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(faqJsonLd) }}
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
              FAQ
            </li>
          </ol>
        </nav>

        {/* Hero */}
        <section className="mx-auto max-w-3xl px-5 py-10 text-center sm:px-6 sm:py-14 lg:px-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5">
            <MessageCircleQuestion className="h-4 w-4 text-accent" />
            <span className="text-xs font-semibold text-accent sm:text-sm">
              Часто задаваемые вопросы
            </span>
          </div>
          <h1 className="font-display text-4xl font-bold leading-tight text-heading sm:text-5xl">
            Всё про <span className="text-accent">ИИ-ассистент</span>{" "}
            «Навылет! AI»
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-body sm:text-lg">
            Самые частые вопросы о тарифах, технологиях, подключении и
            безопасности. Если не нашли ответ — напишите на{" "}
            <a
              href="mailto:office@aimpact.ru"
              className="font-semibold text-accent underline decoration-accent/30 underline-offset-2 hover:decoration-accent"
            >
              office@aimpact.ru
            </a>
            .
          </p>
        </section>

        {/* Quick navigation */}
        <section className="mx-auto max-w-3xl px-5 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-blue-subtle/50 bg-surface-alt p-5">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted">
              Разделы
            </p>
            <ul className="flex flex-wrap gap-2">
              {groupedFaq
                .filter((s) => s.items.length > 0)
                .map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="inline-flex items-center gap-1.5 rounded-full border border-blue-subtle/50 bg-white px-3 py-1.5 text-xs font-medium text-heading transition-colors hover:border-accent/30 hover:bg-accent/5 hover:text-accent sm:text-sm"
                    >
                      {section.title}
                      <span className="text-muted">
                        ({section.items.length})
                      </span>
                    </a>
                  </li>
                ))}
            </ul>
          </div>
        </section>

        {/* FAQ sections */}
        <section className="mx-auto max-w-3xl px-5 py-12 sm:px-6 lg:px-8 lg:py-16">
          {groupedFaq
            .filter((s) => s.items.length > 0)
            .map((section) => (
              <div
                key={section.id}
                id={section.id}
                className="mb-12 scroll-mt-28"
              >
                <h2 className="mb-6 font-display text-2xl font-bold text-heading sm:text-3xl">
                  {section.title}
                </h2>
                <div className="space-y-3">
                  {section.items.map((item) => (
                    <details
                      key={item.question}
                      className="group rounded-xl border border-blue-subtle/50 bg-white transition-shadow hover:shadow-[0_2px_12px_rgba(0,82,204,0.06)]"
                    >
                      <summary className="flex cursor-pointer items-center gap-4 px-6 py-5 text-left font-display text-[15px] font-semibold leading-snug text-heading sm:text-base">
                        <span className="flex-1">{item.question}</span>
                        <ChevronRight className="h-5 w-5 shrink-0 text-muted transition-transform group-open:rotate-90" />
                      </summary>
                      <div className="border-t border-blue-subtle/30 px-6 pb-5 pt-4">
                        <p className="text-sm leading-relaxed text-body">
                          {item.answer}
                        </p>
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            ))}
        </section>

        {/* Related */}
        <section className="bg-surface-alt">
          <div className="mx-auto max-w-3xl px-5 py-16 text-center sm:px-6 lg:px-8 lg:py-20">
            <h2 className="font-display text-2xl font-bold text-heading sm:text-3xl">
              Не нашли ответ?
            </h2>
            <p className="mt-4 text-base text-body">
              Посмотрите{" "}
              <Link
                href="/tarify"
                className="font-semibold text-accent underline decoration-accent/30 underline-offset-2 hover:decoration-accent"
              >
                полную страницу тарифов
              </Link>{" "}
              или подробности про{" "}
              <Link
                href="/integraciya-tourvisor"
                className="font-semibold text-accent underline decoration-accent/30 underline-offset-2 hover:decoration-accent"
              >
                интеграцию с Tourvisor
              </Link>
              . Или позвоните +7 (963) 799-79-77.
            </p>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
