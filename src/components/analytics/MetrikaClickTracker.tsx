"use client";

import { useEffect } from "react";
import { metrikaGoals, reachMetrikaGoal } from "@/lib/metrika";

function findAnchor(target: EventTarget | null) {
  if (!(target instanceof Element)) return null;
  return target.closest("a");
}

export default function MetrikaClickTracker() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const anchor = findAnchor(event.target);
      const href = anchor?.getAttribute("href");
      if (!href) return;

      if (href.startsWith("tel:")) {
        reachMetrikaGoal(metrikaGoals.phoneClick);
        return;
      }

      if (href.startsWith("mailto:")) {
        reachMetrikaGoal(metrikaGoals.emailClick);
        return;
      }

      if (href.includes("t.me/navylet_ai")) {
        reachMetrikaGoal(metrikaGoals.telegramClick);
        return;
      }

      if (href === "/#demo" || href === "#demo" || href.endsWith("/#demo")) {
        reachMetrikaGoal(metrikaGoals.demoClick);
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
