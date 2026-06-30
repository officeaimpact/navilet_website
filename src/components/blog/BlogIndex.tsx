"use client";

import { useMemo, useState } from "react";
import BlogCard from "@/components/blog/BlogCard";
import type { PostMeta } from "@/lib/blog-utils";

export default function BlogIndex({ posts }: { posts: PostMeta[] }) {
  const categories = useMemo(() => {
    const set = new Set(posts.map((p) => p.category));
    return ["Все", ...Array.from(set)];
  }, [posts]);

  const [active, setActive] = useState("Все");

  const filtered = useMemo(
    () => (active === "Все" ? posts : posts.filter((p) => p.category === active)),
    [posts, active]
  );

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2">
        {categories.map((cat) => {
          const isActive = cat === active;
          return (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`cursor-pointer rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                isActive
                  ? "bg-accent text-white shadow-[0_2px_8px_rgba(0,151,245,0.25)]"
                  : "bg-surface-alt text-muted hover:bg-blue-ice hover:text-accent"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <p className="text-body">Пока нет статей в этой категории.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
