import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import GithubSlugger from "github-slugger";
import { ArrowLeft, Clock, Calendar, ListTree } from "lucide-react";
import Navigation from "@/components/sections/Navigation";
import Footer from "@/components/sections/Footer";
import FloatingCTA from "@/components/ui/FloatingCTA";
import BlogCta from "@/components/blog/BlogCta";
import BlogCard from "@/components/blog/BlogCard";
import { mdxComponents } from "@/components/blog/mdx-components";
import {
  getAllSlugs,
  getPostBySlug,
  getRelatedPosts,
} from "@/lib/blog";
import { coverGradient, formatPostDate } from "@/lib/blog-utils";

const siteUrl = "https://navilet.ru";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const url = `${siteUrl}/blog/${post.slug}`;
  return {
    title: { absolute: `${post.title} | Навылет! AI` },
    description: post.description,
    keywords: post.keywords.length ? post.keywords : post.tags,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      authors: [post.author],
      tags: post.tags,
      images: [{ url: "/og-image.png", width: 1376, height: 768 }],
      locale: "ru_RU",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: ["/og-image.png"],
    },
    robots: { index: true, follow: true },
  };
}

interface TocItem {
  level: number;
  text: string;
  id: string;
}

function extractToc(content: string): TocItem[] {
  const slugger = new GithubSlugger();
  const items: TocItem[] = [];
  let inCode = false;
  for (const line of content.split("\n")) {
    if (line.trim().startsWith("```")) {
      inCode = !inCode;
      continue;
    }
    if (inCode) continue;
    const m = /^(##|###)\s+(.*)$/.exec(line);
    if (m) {
      const text = m[2].replace(/[*_`]/g, "").trim();
      items.push({ level: m[1].length, text, id: slugger.slug(text) });
    }
  }
  return items;
}

function authorInitials(name: string): string {
  const parts = name.split(/\s+/).filter(Boolean);
  return parts
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(slug, 3);
  const toc = extractToc(post.content);
  const url = `${siteUrl}/blog/${post.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        headline: post.title,
        description: post.description,
        datePublished: post.date,
        dateModified: post.updated ?? post.date,
        inLanguage: "ru-RU",
        author: { "@type": "Organization", name: post.author, url: siteUrl },
        publisher: { "@id": `${siteUrl}/#organization` },
        mainEntityOfPage: url,
        image: `${siteUrl}/og-image.png`,
        keywords: post.tags.join(", "),
        articleSection: post.category,
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Главная", item: siteUrl },
          {
            "@type": "ListItem",
            position: 2,
            name: "Блог",
            item: `${siteUrl}/blog`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: post.title,
            item: url,
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
        {/* Header */}
        <header
          className="relative overflow-hidden"
          style={{ background: coverGradient(post.cover) }}
        >
          <div className="noise-overlay pointer-events-none absolute inset-0 opacity-20" />
          <div className="relative z-10 mx-auto max-w-3xl px-5 pt-28 pb-12 sm:px-6 sm:pt-32 lg:px-8">
            <nav
              aria-label="Хлебные крошки"
              className="mb-5 text-sm text-white/70"
            >
              <Link href="/" className="hover:text-white">
                Главная
              </Link>
              <span className="mx-2">/</span>
              <Link href="/blog" className="hover:text-white">
                Блог
              </Link>
            </nav>
            <span className="inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
              {post.category}
            </span>
            <h1 className="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-[2.75rem]">
              {post.title}
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-white/75">
              {post.description}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-white/70">
              <span className="inline-flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-xs font-bold text-white">
                  {authorInitials(post.author)}
                </span>
                {post.author}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {formatPostDate(post.date)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {post.readingMinutes} мин чтения
              </span>
            </div>
          </div>
        </header>

        {/* Body */}
        <div className="mx-auto max-w-3xl px-5 py-12 sm:px-6 lg:px-8">
          {toc.length >= 3 && (
            <nav
              aria-label="Содержание"
              className="mb-10 rounded-2xl border border-blue-subtle/50 bg-surface-alt p-5"
            >
              <p className="mb-3 inline-flex items-center gap-2 font-display text-sm font-bold text-heading">
                <ListTree className="h-4 w-4 text-accent" />
                Содержание
              </p>
              <ul className="space-y-2">
                {toc.map((item) => (
                  <li
                    key={item.id}
                    className={item.level === 3 ? "pl-4" : ""}
                  >
                    <a
                      href={`#${item.id}`}
                      className="text-sm text-body transition-colors hover:text-accent"
                    >
                      {item.text}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          <article className="prose-navilet">
            <MDXRemote
              source={post.content}
              components={mdxComponents}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [rehypeSlug],
                },
              }}
            />
          </article>

          <div className="mt-10">
            <BlogCta />
          </div>

          {post.tags.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-surface-alt px-3 py-1 text-xs font-medium text-muted"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <div className="mt-10 border-t border-blue-subtle/40 pt-6">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-hover"
            >
              <ArrowLeft className="h-4 w-4" />
              Все статьи блога
            </Link>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="border-t border-blue-subtle/40 bg-surface-alt">
            <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8">
              <h2 className="mb-8 font-display text-2xl font-bold text-heading">
                Похожие статьи
              </h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((p) => (
                  <BlogCard key={p.slug} post={p} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
