import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { coverGradient, formatPostDate, type PostMeta } from "@/lib/blog-utils";

export default function BlogCard({ post }: { post: PostMeta }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-blue-subtle/40 bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
    >
      <div
        className="relative flex h-40 items-end overflow-hidden p-5"
        style={{ background: coverGradient(post.cover) }}
      >
        <div className="noise-overlay pointer-events-none absolute inset-0 opacity-20" />
        <span className="relative z-10 inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
          {post.category}
        </span>
        <ArrowUpRight className="absolute right-4 top-4 h-5 w-5 text-white/70 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-bold leading-snug text-heading transition-colors group-hover:text-accent">
          {post.title}
        </h3>
        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-body">
          {post.description}
        </p>
        <div className="mt-4 flex items-center gap-3 text-xs text-muted">
          <time dateTime={post.date}>{formatPostDate(post.date)}</time>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {post.readingMinutes} мин
          </span>
        </div>
      </div>
    </Link>
  );
}
