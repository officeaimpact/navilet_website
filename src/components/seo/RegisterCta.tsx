"use client";

import Link from "next/link";
import { ArrowRight, MessageSquare } from "lucide-react";
import { lkUrls } from "@/lib/content";
import { metrikaGoals, reachMetrikaGoal } from "@/lib/metrika";

interface RegisterCtaProps {
  /** Источник для цели Метрики (trial_register_click) */
  source: string;
  /** Компактный вариант — без подписи снизу */
  compact?: boolean;
  /** Тёмный фон секции: белая кнопка вместо градиентной */
  dark?: boolean;
  className?: string;
}

/** Основной CTA SEO-страниц: регистрация (primary) + демо (secondary). */
export default function RegisterCta({
  source,
  compact = false,
  dark = false,
  className = "",
}: RegisterCtaProps) {
  return (
    <div className={`flex flex-col items-center gap-3 sm:flex-row ${className}`}>
      <a
        href={lkUrls.register}
        onClick={() => reachMetrikaGoal(metrikaGoals.trialClick, { source })}
        className={
          dark
            ? "inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-base font-semibold text-primary shadow-lg shadow-black/10 transition-all hover:bg-blue-ice hover:shadow-xl"
            : "inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-accent/25 transition-all duration-200 hover:shadow-xl hover:shadow-accent/35"
        }
        style={
          dark
            ? undefined
            : {
                background:
                  "linear-gradient(135deg, #0062EF 0%, #0097F5 60%, #00CCF5 100%)",
              }
        }
      >
        Подключить за 2 минуты
        <ArrowRight className="h-4 w-4" />
      </a>
      <Link
        href="/demo"
        className={
          dark
            ? "inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-white/10"
            : "inline-flex items-center justify-center gap-2 rounded-xl border-2 border-accent/30 px-6 py-3.5 text-base font-semibold text-accent transition-colors hover:border-accent hover:bg-blue-ice"
        }
      >
        <MessageSquare className="h-4 w-4" />
        Попробовать демо
      </Link>
      {!compact && (
        <span
          className={`text-sm sm:hidden ${dark ? "text-white/60" : "text-muted"}`}
        >
          7 дней бесплатно · без карты
        </span>
      )}
    </div>
  );
}
