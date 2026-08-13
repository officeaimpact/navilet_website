"use client";

const YANDEX_METRIKA_ID = 108200337;

export const metrikaGoals = {
  demoClick: "demo_click",
  demoChatOpen: "demo_chat_open",
  trialClick: "trial_register_click",
  promoClick: "promo_click",
  leadFormOpen: "lead_form_open",
  leadFormStart: "lead_form_start",
  leadFormPlanSelect: "lead_form_plan_select",
  leadFormChannelSelect: "lead_form_channel_select",
  leadFormSubmitSuccess: "lead_form_submit_success",
  versionSelect: "version_select",
  versionSwitchPricing: "version_switch_pricing",
  demoVersionSwitch: "demo_version_switch",
  heroChatVersionSwitch: "hero_chat_version_switch",
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
