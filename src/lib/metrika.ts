"use client";

const YANDEX_METRIKA_ID = 108200337;

export const metrikaGoals = {
  demoClick: "demo_click",
  leadFormOpen: "lead_form_open",
  leadFormPlanSelect: "lead_form_plan_select",
  leadFormChannelSelect: "lead_form_channel_select",
  leadFormSubmitSuccess: "lead_form_submit_success",
  phoneClick: "phone_click",
  emailClick: "email_click",
  telegramClick: "telegram_click",
} as const;

type MetrikaGoal = (typeof metrikaGoals)[keyof typeof metrikaGoals];

declare global {
  interface Window {
    ym?: (
      counterId: number,
      method: "reachGoal",
      goal: string,
      params?: Record<string, unknown>
    ) => void;
  }
}

export function reachMetrikaGoal(
  goal: MetrikaGoal,
  params?: Record<string, unknown>
) {
  if (typeof window === "undefined" || typeof window.ym !== "function") return;

  window.ym(YANDEX_METRIKA_ID, "reachGoal", goal, {
    path: window.location.pathname,
    ...params,
  });
}
