import { promo } from "@/lib/content";

const endMs = () => new Date(promo.endDate).getTime();

/** Акция активна сейчас (включена в конфиге и дедлайн не прошёл). */
export function isPromoActive(): boolean {
  return promo.active && Date.now() < endMs();
}

/** Сколько целых дней осталось до дедлайна (не меньше 0). */
export function promoDaysLeft(): number {
  const ms = endMs() - Date.now();
  return Math.max(0, Math.ceil(ms / 86_400_000));
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
