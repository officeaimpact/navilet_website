export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  category: string;
  tags: string[];
  author: string;
  keywords: string[];
  cover: string;
  readingMinutes: number;
}

export interface Post extends PostMeta {
  content: string;
}

export const BLOG_CATEGORIES = [
  "Гайды",
  "Кейсы",
  "Продукт",
  "Сравнения",
] as const;

export function formatPostDate(date: string): string {
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return date;
  return d.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const COVER_GRADIENTS: Record<string, string> = {
  blue: "linear-gradient(135deg, #001229 0%, #0062EF 60%, #0097F5 100%)",
  cyan: "linear-gradient(135deg, #002152 0%, #0097F5 55%, #00E7FD 100%)",
  deep: "linear-gradient(135deg, #001229 0%, #002152 50%, #0062EF 100%)",
  sky: "linear-gradient(135deg, #0062EF 0%, #0097F5 50%, #66F0FF 100%)",
};

export function coverGradient(cover: string): string {
  return COVER_GRADIENTS[cover] ?? COVER_GRADIENTS.blue;
}
