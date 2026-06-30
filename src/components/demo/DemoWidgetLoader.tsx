"use client";

import { useEffect } from "react";

const LOADER_SRC = "https://lk.navilet.ru/widget-loader.js";

/**
 * Встраивает реальный демо-виджет «Навылет! AI» (lk.navilet.ru).
 * Чат работает внутри iframe от lk.navilet.ru, поэтому домен-проверка
 * ассистента проходит на любом сайте.
 */
export default function DemoWidgetLoader({
  assistantId,
}: {
  assistantId: string;
}) {
  useEffect(() => {
    if (document.querySelector("script[data-assistant-id]")) return;
    const script = document.createElement("script");
    script.src = LOADER_SRC;
    script.async = true;
    script.setAttribute("data-assistant-id", assistantId);
    document.body.appendChild(script);
  }, [assistantId]);

  return null;
}
