import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { Post, PostMeta } from "@/lib/blog-utils";

export type { Post, PostMeta } from "@/lib/blog-utils";
export { formatPostDate, coverGradient, BLOG_CATEGORIES } from "@/lib/blog-utils";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

function readPostFile(slug: string): Post {
  const fullPath = path.join(BLOG_DIR, `${slug}.mdx`);
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);
  const minutes = Math.max(1, Math.round(readingTime(content).minutes));

  return {
    slug,
    title: String(data.title ?? ""),
    description: String(data.description ?? ""),
    date: String(data.date ?? ""),
    updated: data.updated ? String(data.updated) : undefined,
    category: String(data.category ?? "Гайды"),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    author: String(data.author ?? "Команда Навылет! AI"),
    keywords: Array.isArray(data.keywords) ? data.keywords.map(String) : [],
    cover: String(data.cover ?? "blue"),
    readingMinutes: minutes,
    content,
  };
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getAllPostsMeta(): PostMeta[] {
  return getAllSlugs()
    .map((slug) => {
      const { content: _content, ...meta } = readPostFile(slug);
      void _content;
      return meta;
    })
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export function getPostBySlug(slug: string): Post | null {
  try {
    return readPostFile(slug);
  } catch {
    return null;
  }
}

export function getRelatedPosts(slug: string, limit = 3): PostMeta[] {
  const all = getAllPostsMeta();
  const current = all.find((p) => p.slug === slug);
  const others = all.filter((p) => p.slug !== slug);
  if (!current) return others.slice(0, limit);
  const sameCat = others.filter((p) => p.category === current.category);
  const rest = others.filter((p) => p.category !== current.category);
  return [...sameCat, ...rest].slice(0, limit);
}
