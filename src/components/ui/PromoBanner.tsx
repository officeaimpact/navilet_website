"use client";

import { useEffect, useState } from "react";
import { X, Sparkles } from "lucide-react";
import { useLeadForm } from "@/contexts/LeadFormContext";
import { promo } from "@/lib/content";
import { isPromoActive } from "@/lib/promo";
import { metrikaGoals, reachMetrikaGoal } from "@/lib/metrika";

const BANNER_H = 36;
const DISMISS_KEY = "promo_dismissed_" + promo.endDate;

export default function PromoBanner() {
  const { openForm } = useLeadForm();
  const [mounted, setMounted] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [offset, setOffset] = useState(0);
  const [active, setActive] = useState(false);

  useEffect(() => {
    setMounted(true);
    setActive(isPromoActive());
    try {
      setDismissed(localStorage.getItem(DISMISS_KEY) === "1");
    } catch {}
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (!mounted || dismissed || !promo.active) {
      root.style.setProperty("--promo-h", "0px");
      root.style.setProperty("--promo-pad", "0px");
      return;
    }
    root.style.setProperty("--promo-pad", `${BANNER_H}px`);
    const onScroll = () => {
      const o = Math.min(window.scrollY, BANNER_H);
      setOffset(o);
      root.style.setProperty("--promo-h", `${BANNER_H - o}px`);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [mounted, dismissed]);

  if (!mounted || dismissed || !promo.active) return null;

  const headline = active ? promo.headline : promo.evergreenHeadline;

  const dismiss = () => {
    setDismissed(true);
    document.documentElement.style.setProperty("--promo-h", "0px");
    document.documentElement.style.setProperty("--promo-pad", "0px");
    try {
      localStorage.setItem(DISMISS_KEY, "1");
    } catch {}
  };

  const handleCta = () => {
    reachMetrikaGoal(metrikaGoals.promoClick);
    openForm({ source: "promo_banner" });
  };

  return (
    <div
      className="fixed inset-x-0 top-0 z-[55] flex h-9 items-center justify-center gap-2 px-9 text-[13px] text-white sm:gap-3"
      style={{
        transform: `translateY(-${offset}px)`,
        background:
          "linear-gradient(90deg, #0062EF 0%, #0097F5 55%, #00CCF5 100%)",
      }}
    >
      <button
        onClick={handleCta}
        className="flex h-full min-w-0 cursor-pointer items-center gap-2 font-medium"
      >
        <Sparkles className="hidden h-3.5 w-3.5 shrink-0 text-white/90 sm:block" />
        <span className="truncate sm:hidden">
          {active ? promo.short : promo.evergreenHeadline}
        </span>
        <span className="hidden truncate sm:inline">{headline}</span>
      </button>
      <button
        onClick={handleCta}
        className="hidden shrink-0 cursor-pointer rounded-full bg-white px-3 py-1 text-xs font-semibold text-primary transition-colors hover:bg-blue-ice sm:inline-block"
      >
        {promo.ctaText}
      </button>
      <button
        onClick={dismiss}
        aria-label="Закрыть"
        className="absolute right-2.5 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/15 hover:text-white"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
