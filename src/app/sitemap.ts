import type { MetadataRoute } from "next";
import { getAllPostsMeta } from "@/lib/blog";

export const dynamic = "force-static";

const siteUrl = "https://navilet.ru";

type Entry = {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
};

const staticEntries: Entry[] = [
  { path: "/", changeFrequency: "weekly", priority: 1.0 },
  { path: "/tarify", changeFrequency: "weekly", priority: 0.9 },
  { path: "/demo", changeFrequency: "monthly", priority: 0.8 },
  { path: "/start", changeFrequency: "monthly", priority: 0.8 },
  { path: "/dlya-turagentstv", changeFrequency: "monthly", priority: 0.9 },
  { path: "/dlya-turoperatorov", changeFrequency: "monthly", priority: 0.9 },
  { path: "/integraciya-tourvisor", changeFrequency: "monthly", priority: 0.8 },
  { path: "/keisy/mgp", changeFrequency: "monthly", priority: 0.8 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.8 },
  { path: "/voprosy", changeFrequency: "monthly", priority: 0.7 },
  { path: "/o-komande", changeFrequency: "monthly", priority: 0.7 },
  { path: "/faq", changeFrequency: "monthly", priority: 0.7 },
  { path: "/dashboard", changeFrequency: "monthly", priority: 0.7 },
  { path: "/prognozy", changeFrequency: "monthly", priority: 0.8 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticUrls: MetadataRoute.Sitemap = staticEntries.map((e) => ({
    url: `${siteUrl}${e.path === "/" ? "/" : e.path}`,
    lastModified: now,
    changeFrequency: e.changeFrequency,
    priority: e.priority,
  }));

  const postUrls: MetadataRoute.Sitemap = getAllPostsMeta().map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updated ?? post.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticUrls, ...postUrls];
}
