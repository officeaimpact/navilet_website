"use client";

import Link from "next/link";
import { MessageSquare } from "lucide-react";
import { metrikaGoals, reachMetrikaGoal } from "@/lib/metrika";

interface DemoFirstCtaProps {
  /** Источник для целей Метрики (demo_click / trial_register_click) */
  source: string;
  className?: string;
}

/**
 * CTA для страниц, куда приходят из поиска «холодными»: демо первым действием,
 * тарифы — вторым. Обратный порядок к RegisterCta.
 */
export default function DemoFirstCta({
  source,
  className = "",
}: DemoFirstCtaProps) {
  return (
    <div className={`flex flex-col items-center gap-3 sm:flex-row ${className}`}>
      <Link
        href="/demo"
        onClick={() => reachMetrikaGoal(metrikaGoals.demoClick, { source })}
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3 font-semibold text-white shadow-lg transition-transform hover:scale-[1.02]"
      >
        <MessageSquare className="h-4 w-4" />
        Попробовать демо — без регистрации
      </Link>
      <Link
        href="/tarify"
        className="inline-flex items-center justify-center gap-2 rounded-xl border border-blue-subtle/50 bg-white px-6 py-3 font-semibold text-heading transition-colors hover:bg-blue-ice/30"
      >
        Посмотреть тарифы
      </Link>
    </div>
  );
}
