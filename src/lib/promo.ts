import { promo } from "@/lib/content";

const endMs = () => (promo.endDate ? new Date(promo.endDate).getTime() : null);

/**
 * Акция активна сейчас: включена в конфиге и, если задан дедлайн, он не прошёл.
 * Без дедлайна предложение бессрочное и активно всегда.
 */
export function isPromoActive(): boolean {
  const end = endMs();
  return promo.active && (end === null || Date.now() < end);
}

/** Сколько целых дней осталось до дедлайна (0, если дедлайна нет). */
export function promoDaysLeft(): number {
  const end = endMs();
  if (end === null) return 0;
  return Math.max(0, Math.ceil((end - Date.now()) / 86_400_000));
}

/** Склонение слова «день» по числу. */
export function pluralDays(n: number): string {
  const a = Math.abs(n) % 100;
  const b = a % 10;
  if (a > 10 && a < 20) return "дней";
  if (b === 1) return "день";
  if (b >= 2 && b <= 4) return "дня";
  return "дней";
}
