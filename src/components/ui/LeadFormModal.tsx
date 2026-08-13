"use client";

import { useEffect, useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLeadForm } from "@/contexts/LeadFormContext";
import { submitLeadForm } from "@/lib/submitForm";
import {
  pricingPlans,
  assistantVersions,
  lkUrls,
  promo,
  trial,
  type PricingPlan,
  type AssistantVersionId,
} from "@/lib/content";
import { isPromoActive } from "@/lib/promo";
import { metrikaGoals, reachMetrikaGoal } from "@/lib/metrika";
import Link from "next/link";
import {
  X,
  User,
  Phone,
  CheckCircle,
  Sparkles,
  Loader2,
  Globe,
  MessageSquare,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  Gift,
  TrendingUp,
  Zap,
  Headset,
} from "lucide-react";

type TrialChannelId = "web" | "max";

const trialChannels: { id: TrialChannelId; label: string; Icon: typeof Globe }[] = [
  { id: "web", label: "Web-виджет", Icon: Globe },
  { id: "max", label: "MAX-мессенджер", Icon: MessageSquare },
];

const channelShortLabel: Record<TrialChannelId, string> = {
  web: "Web",
  max: "MAX",
};

type Step = "choice" | "request";

export default function LeadFormModal() {
  const { isOpen, preset, closeForm } = useLeadForm();

  const [step, setStep] = useState<Step>("choice");
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [consent, setConsent] = useState(false);
  const [started, setStarted] = useState(false);
  const [promoOn, setPromoOn] = useState(false);

  const [presetPlanId, setPresetPlanId] = useState<PricingPlan["id"] | null>(null);
  const [presetVersionId, setPresetVersionId] =
    useState<AssistantVersionId | null>(null);
  const [selectedChannel, setSelectedChannel] = useState<TrialChannelId>("web");
  /** Крупный поток: больше лимита бесплатного месяца, условия индивидуально. */
  const [bigVolume, setBigVolume] = useState(false);

  const handleFormStart = () => {
    if (started) return;
    setStarted(true);
    reachMetrikaGoal(metrikaGoals.leadFormStart, { form: "modal" });
  };

  /** Восстановить пресет при открытии */
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    setSubmitted(false);
    setError(null);
    setConsent(false);
    setStarted(false);
    setBigVolume(false);
    setPromoOn(isPromoActive());
    setStep(preset?.path === "request" ? "request" : "choice");

    // Пресет тарифа (клик на карточке) — уходит в ЛК и менеджеру как контекст
    let planId: PricingPlan["id"] | null = null;
    if (preset?.planId) {
      planId = preset.planId;
    } else if (preset?.planName) {
      planId =
        pricingPlans.find(
          (p) => p.name.toLowerCase() === preset.planName!.toLowerCase()
        )?.id ?? null;
    }
    setPresetPlanId(planId);
    setPresetVersionId(preset?.versionId ?? null);

    // На тест — один канал: «cross» сводим к web, второй добавляется позже
    setSelectedChannel(preset?.channelId === "max" ? "max" : "web");

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, preset]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeForm();
    };
    if (isOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, closeForm]);

  const presetPlan = presetPlanId
    ? pricingPlans.find((p) => p.id === presetPlanId) ?? null
    : null;
  const presetVersion = presetVersionId
    ? assistantVersions.find((v) => v.id === presetVersionId) ?? null
    : null;

  const handleSelfRegister = () => {
    reachMetrikaGoal(metrikaGoals.trialClick, {
      source: "lead_form_modal",
      plan_id: presetPlanId ?? undefined,
      version_id: presetVersionId ?? undefined,
    });
    const params = new URLSearchParams();
    if (presetPlanId) params.set("plan", presetPlanId);
    if (presetVersionId) params.set("version", presetVersionId);
    const query = params.toString();
    window.location.href = query ? `${lkUrls.register}?${query}` : lkUrls.register;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setError(null);
    try {
      await submitLeadForm(e.currentTarget, {
        planName: presetPlan?.name ?? null,
        versionLabel: presetVersion?.name ?? null,
        dialogsRange: bigVolume
          ? "больше 200 диалогов/мес — обсудить индивидуально"
          : null,
        channelLabel: channelShortLabel[selectedChannel],
        source: "modal",
      });
      reachMetrikaGoal(metrikaGoals.leadFormSubmitSuccess, {
        form: "modal",
        plan_id: presetPlanId ?? undefined,
        version_id: presetVersionId ?? undefined,
        channel_id: selectedChannel,
        big_volume: bigVolume,
      });
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка отправки");
    } finally {
      setSending(false);
    }
  };

  const badgeText =
    promoOn && promo.deadlineLabel
      ? `${trial.label} — акция ${promo.deadlineLabel}`
      : trial.label;

  /* 16px на телефоне — иначе Safari на iOS зумит страницу при фокусе в поле. */
  const inputClass =
    "w-full rounded-xl border border-gray-200 bg-gray-50/70 py-3 pl-10 pr-4 text-base text-heading outline-none transition-all placeholder:text-gray-400 focus:border-accent/40 focus:bg-white focus:ring-2 focus:ring-accent/10 sm:text-sm";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-6 sm:py-10"
          onClick={closeForm}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-[#001229]/60 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Подключение ИИ-ассистента"
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex max-h-[calc(100dvh-3rem)] w-full max-w-lg flex-col overflow-hidden rounded-2xl bg-white shadow-2xl sm:max-h-[calc(100dvh-5rem)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Decorative top gradient bar */}
            <div
              className="h-1.5 flex-shrink-0"
              style={{
                background:
                  "linear-gradient(90deg, #0062EF 0%, #0097F5 50%, #00E7FD 100%)",
              }}
            />

            {/* Close button */}
            <button
              onClick={closeForm}
              className="absolute right-4 top-5 z-10 flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
              aria-label="Закрыть"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex-1 overflow-y-auto px-6 pb-6 pt-6 sm:px-8 sm:pb-7">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.4,
                      ease: [0.22, 1, 0.36, 1] as const,
                    }}
                    className="flex flex-col items-center gap-4 py-8"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        delay: 0.15,
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1] as const,
                      }}
                      className="flex h-16 w-16 items-center justify-center rounded-full bg-green-50"
                    >
                      <CheckCircle className="h-10 w-10 text-green-500" />
                    </motion.div>
                    <h3 className="font-display text-2xl font-bold text-heading">
                      Заявка отправлена!
                    </h3>
                    <p className="max-w-xs text-center text-sm text-muted">
                      Мы свяжемся с вами в ближайшее время и подключим
                      бесплатный период — {trial.days} дней.
                    </p>
                    <button
                      onClick={closeForm}
                      className="mt-2 cursor-pointer rounded-lg px-6 py-2.5 text-sm font-semibold text-accent transition-colors hover:bg-accent/5"
                    >
                      Закрыть
                    </button>
                  </motion.div>
                ) : step === "choice" ? (
                  /* ── Шаг 1: выбор пути ──────────────────────── */
                  <motion.div
                    key="choice"
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="mb-5">
                      <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-accent/5 px-3 py-1 text-xs font-semibold text-accent">
                        <Sparkles className="h-3.5 w-3.5" />
                        {badgeText}
                      </div>
                      <h3 className="font-display text-2xl font-bold text-heading">
                        Первый месяц — бесплатно
                      </h3>
                      <p className="mt-1.5 text-sm text-muted">
                        {trial.days} дней и {trial.capLabel}. Как вам удобнее
                        подключиться?
                      </p>
                    </div>

                    <div className="space-y-3">
                      <button
                        type="button"
                        onClick={handleSelfRegister}
                        className="group flex w-full cursor-pointer items-center gap-4 rounded-2xl border border-accent/25 bg-gradient-to-br from-blue-ice/40 to-white p-4 text-left transition-all duration-200 hover:border-accent/50 hover:shadow-[0_4px_16px_rgba(0,151,245,0.15)] sm:p-5"
                      >
                        <span
                          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white shadow-md"
                          style={{
                            background:
                              "linear-gradient(135deg, #0062EF 0%, #0097F5 60%, #00CCF5 100%)",
                          }}
                        >
                          <Zap className="h-5 w-5" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="flex items-center gap-2 font-display text-base font-bold text-heading">
                            Подключусь сам
                            <span className="rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-accent">
                              2 минуты
                            </span>
                          </span>
                          <span className="mt-0.5 block text-sm text-body">
                            Регистрация в личном кабинете — код виджета сразу.
                          </span>
                        </span>
                        <ChevronRight className="h-5 w-5 shrink-0 text-accent transition-transform group-hover:translate-x-0.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => setStep("request")}
                        className="group flex w-full cursor-pointer items-center gap-4 rounded-2xl border border-gray-200 bg-white p-4 text-left transition-all duration-200 hover:border-accent/40 hover:bg-blue-ice/20 sm:p-5"
                      >
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10">
                          <Headset className="h-5 w-5 text-accent" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block font-display text-base font-bold text-heading">
                            Оставить заявку менеджеру
                          </span>
                          <span className="mt-0.5 block text-sm text-body">
                            Подключим под ключ и свяжемся в тот же день.
                          </span>
                        </span>
                        <ChevronRight className="h-5 w-5 shrink-0 text-muted transition-transform group-hover:translate-x-0.5" />
                      </button>
                    </div>

                    <p className="mt-5 text-center text-xs text-muted">
                      {trial.label} • {trial.capLabel} • Подключение 0 ₽
                    </p>
                  </motion.div>
                ) : (
                  /* ── Шаг 2: заявка менеджеру ────────────────── */
                  <motion.div
                    key="request"
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 12 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="mb-5">
                      <button
                        type="button"
                        onClick={() => setStep("choice")}
                        className="mb-3 inline-flex cursor-pointer items-center gap-1 text-xs font-semibold text-muted transition-colors hover:text-accent"
                      >
                        <ArrowLeft className="h-3.5 w-3.5" />
                        Назад
                      </button>
                      <h3 className="font-display text-2xl font-bold text-heading">
                        Заявка на подключение
                      </h3>
                      <p className="mt-1.5 text-sm text-muted">
                        Менеджер настроит всё под ключ и свяжется с вами в тот
                        же день.
                      </p>
                    </div>

                    <form
                      onSubmit={handleSubmit}
                      onFocusCapture={handleFormStart}
                      className="space-y-5"
                    >
                      {/* Honeypot — скрыто от людей, ловит ботов */}
                      <input
                        type="text"
                        name="company_website"
                        tabIndex={-1}
                        autoComplete="off"
                        aria-hidden="true"
                        className="absolute left-[-9999px] h-0 w-0 opacity-0"
                      />

                      {/* ── Что входит в бесплатный месяц ──────── */}
                      <div className="flex items-center gap-3 rounded-xl border border-accent/15 bg-gradient-to-br from-blue-ice/50 to-white px-4 py-3">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                          <Gift className="h-4 w-4 text-accent" />
                        </span>
                        <div>
                          {/* На узком экране плашка версии уходит на свою
                              строку — иначе слово «версия» рвётся пополам. */}
                          <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-bold text-heading">
                            Первый месяц бесплатно
                            {presetVersion && (
                              <span className="whitespace-nowrap rounded-full bg-accent/10 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-accent">
                                версия «{presetVersion.name}»
                              </span>
                            )}
                          </p>
                          <p className="text-xs text-body">
                            {trial.days} дней · {trial.capLabel} · подключение
                            0 ₽
                          </p>
                        </div>
                      </div>

                      {/* ── Канал (один на тест) ───────────────── */}
                      <div>
                        <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-muted">
                          Какой канал подключаем
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {trialChannels.map((ch) => {
                            const active = selectedChannel === ch.id;
                            return (
                              <button
                                key={ch.id}
                                type="button"
                                onClick={() => {
                                  setSelectedChannel(ch.id);
                                  reachMetrikaGoal(
                                    metrikaGoals.leadFormChannelSelect,
                                    {
                                      channel_id: ch.id,
                                      channel_label: ch.label,
                                    }
                                  );
                                }}
                                className={`flex items-center justify-center gap-2 rounded-xl border px-2 py-3 transition-all duration-200 ${
                                  active
                                    ? "border-accent bg-accent/5 shadow-[0_2px_8px_rgba(0,151,245,0.15)]"
                                    : "border-gray-200 bg-white hover:border-accent/40 hover:bg-blue-ice/40"
                                }`}
                              >
                                <ch.Icon
                                  className={`h-4 w-4 ${
                                    active ? "text-accent" : "text-muted"
                                  }`}
                                />
                                <span
                                  className={`text-xs font-semibold ${
                                    active ? "text-accent" : "text-heading"
                                  }`}
                                >
                                  {ch.label}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                        <p className="mt-2 text-xs text-muted">
                          Один канал на тест. Второй можно добавить после
                          подключения.
                        </p>
                      </div>

                      {/* ── Крупный поток ──────────────────────── */}
                      <button
                        type="button"
                        onClick={() => {
                          const next = !bigVolume;
                          setBigVolume(next);
                          if (next) {
                            reachMetrikaGoal(metrikaGoals.leadFormPlanSelect, {
                              dialogs_range: "больше 200",
                            });
                          }
                        }}
                        className={`flex w-full cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all duration-200 ${
                          bigVolume
                            ? "border-accent bg-accent/5 shadow-[0_2px_8px_rgba(0,151,245,0.15)]"
                            : "border-gray-200 bg-white hover:border-accent/40 hover:bg-blue-ice/40"
                        }`}
                      >
                        <span
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                            bigVolume ? "bg-accent/15" : "bg-gray-100"
                          }`}
                        >
                          <TrendingUp
                            className={`h-4 w-4 ${
                              bigVolume ? "text-accent" : "text-muted"
                            }`}
                          />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span
                            className={`block text-sm font-semibold ${
                              bigVolume ? "text-accent" : "text-heading"
                            }`}
                          >
                            У нас больше 200 диалогов в месяц
                          </span>
                          <span className="block text-xs text-body">
                            Обсудим индивидуальные условия и лимиты.
                          </span>
                        </span>
                        <span
                          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors ${
                            bigVolume
                              ? "border-accent bg-accent"
                              : "border-gray-300 bg-white"
                          }`}
                        >
                          {bigVolume && (
                            <CheckCircle className="h-3.5 w-3.5 text-white" />
                          )}
                        </span>
                      </button>

                      {/* ── Контакты: имя + телефон ────────────── */}
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <div className="relative">
                          <label htmlFor="modal-name" className="sr-only">
                            Имя
                          </label>
                          <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                          <input
                            id="modal-name"
                            type="text"
                            name="name"
                            required
                            placeholder="Имя"
                            className={inputClass}
                          />
                        </div>
                        <div className="relative">
                          <label htmlFor="modal-phone" className="sr-only">
                            Телефон
                          </label>
                          <Phone className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                          <input
                            id="modal-phone"
                            type="tel"
                            name="phone"
                            required
                            placeholder="Телефон"
                            className={inputClass}
                          />
                        </div>
                      </div>

                      <label className="flex cursor-pointer items-start gap-2.5">
                        <input
                          type="checkbox"
                          checked={consent}
                          onChange={(e) => setConsent(e.target.checked)}
                          className="mt-0.5 h-4 w-4 shrink-0 accent-accent"
                        />
                        <span className="text-xs leading-relaxed text-muted">
                          Я даю согласие на обработку персональных данных в
                          соответствии с{" "}
                          <Link
                            href="/privacy"
                            target="_blank"
                            className="text-accent underline hover:text-accent-hover"
                          >
                            политикой конфиденциальности
                          </Link>
                        </span>
                      </label>

                      <button
                        type="submit"
                        disabled={sending || !consent}
                        className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl py-3.5 font-semibold text-white shadow-lg shadow-accent/25 transition-all duration-200 hover:shadow-xl hover:shadow-accent/30 disabled:cursor-not-allowed disabled:opacity-50"
                        style={{
                          background:
                            "linear-gradient(135deg, #0062EF 0%, #0097F5 60%, #00CCF5 100%)",
                        }}
                      >
                        {sending ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Отправка...
                          </>
                        ) : (
                          <>
                            Отправить заявку
                            <ArrowRight className="h-4 w-4" />
                          </>
                        )}
                      </button>

                      {error && (
                        <p className="text-center text-xs text-red-500">
                          {error}
                        </p>
                      )}

                      <p className="text-center text-xs text-muted">
                        {trial.label} • {trial.capLabel} • Подключение 0 ₽
                      </p>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
