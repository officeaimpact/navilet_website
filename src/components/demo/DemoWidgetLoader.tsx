"use client";

import { useEffect } from "react";

const LOADER_SRC = "https://lk.navilet.ru/widget-loader.js";

/**
 * Встраивает реальный демо-виджет «Навылет! AI» (lk.navilet.ru).
 *
 * У ассистента в ЛК есть список разрешённых доменов: /api/widget/config
 * отдаёт 403 «Domain not allowed» для origin, которого в списке нет.
 * Поэтому локально (localhost:3000) чат не поднимется, пока домен не добавлен
 * в настройках демо-ассистента — на navilet.ru он работает.
 */
export default function DemoWidgetLoader({
  assistantId,
}: {
  assistantId: string;
}) {
  useEffect(() => {
    if (!document.querySelector("script[data-assistant-id]")) {
      const script = document.createElement("script");
      script.src = LOADER_SRC;
      script.async = true;
      script.setAttribute("data-assistant-id", assistantId);
      document.body.appendChild(script);
    }

    // При уходе со страницы (клиентская навигация Next) виджет нужно убрать —
    // иначе launcher «прилипает» ко всем страницам.
    return () => {
      try {
        const w = window as unknown as {
          AimpactWidget?: { destroy?: () => void };
        };
        w.AimpactWidget?.destroy?.();
      } catch {
        /* noop */
      }
      document
        .querySelectorAll(
          "script[data-assistant-id], .aimpact-launcher, .aimpact-frame, .aimpact-overlay"
        )
        .forEach((el) => el.remove());
    };
  }, [assistantId]);

  return null;
}
