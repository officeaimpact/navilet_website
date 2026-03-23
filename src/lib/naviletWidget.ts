/**
 * Официальный виджет навылет AI (загрузчик с личного кабинета lk.navilet.ru).
 * Меняйте только здесь — layout, блок «Интеграция» и копирование кода подтянутся автоматически.
 */
export const NAVILET_WIDGET_LOADER_URL =
  "https://lk.navilet.ru/widget-loader.js" as const;

export const NAVILET_ASSISTANT_ID =
  "13ec306b-cc48-4585-8fa1-0216a0afdc3d" as const;

/** Готовый фрагмент для вставки перед </body> на сайте клиента */
export const integrationCode = `<script src="${NAVILET_WIDGET_LOADER_URL}" data-assistant-id="${NAVILET_ASSISTANT_ID}"></script>`;
