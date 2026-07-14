"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * Гарантированный сброс скролла при клиентской навигации.
 *
 * Проблема: с CSS `scroll-behavior: smooth` Next.js анимирует прокрутку
 * к верху новой страницы через весь документ. Анимация долгая и отменяется
 * любым касанием — пользователь «застревает» посреди новой страницы.
 *
 * Решение: на смену pathname скроллим в топ мгновенно. Исключения:
 * - первый рендер (сохраняем нативное восстановление позиции при перезагрузке);
 * - назад/вперёд браузера (popstate — восстановление позиции);
 * - переходы на якорь (#...) — ими управляет браузер/CSS smooth.
 */
export default function ScrollReset() {
  const pathname = usePathname();
  const isFirst = useRef(true);
  const isPopState = useRef(false);

  useEffect(() => {
    const onPop = () => {
      isPopState.current = true;
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    if (isPopState.current) {
      isPopState.current = false;
      return;
    }
    if (window.location.hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
