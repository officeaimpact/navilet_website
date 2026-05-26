"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLeadForm } from "@/contexts/LeadFormContext";
import { submitLeadForm } from "@/lib/submitForm";
import {
  pricingPlans,
  crossChannelAddons,
  channelOptions,
  type ChannelId,
  type PricingPlan,
} from "@/lib/content";
import Link from "next/link";
import {
  X,
  User,
  Building2,
  Phone,
  Mail,
  CheckCircle,
  Sparkles,
  Loader2,
  Globe,
  MessageSquare,
  Layers,
} from "lucide-react";

const fmt = (n: number) => n.toLocaleString("ru-RU").replace(/\s/g, "\u202F");

const channelIcons: Record<ChannelId, typeof Globe> = {
  web: Globe,
  max: MessageSquare,
  cross: Layers,
};

const channelShortLabel: Record<ChannelId, string> = {
  web: "Web",
  max: "MAX",
  cross: "Web + MAX",
};

export default function LeadFormModal() {
  const { isOpen, preset, closeForm } = useLeadForm();

  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [consent, setConsent] = useState(false);

  const [selectedPlanId, setSelectedPlanId] = useState<PricingPlan["id"] | null>(null);
  const [selectedChannel, setSelectedChannel] = useState<ChannelId>("web");

  /** Восстановить пресет при открытии */
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    setSubmitted(false);
    setError(null);
    setConsent(false);

    // Plan: либо по id, либо угадаем по имени (legacy)
    if (preset?.planId) {
      setSelectedPlanId(preset.planId);
    } else if (preset?.planName) {
      const found = pricingPlans.find(
        (p) => p.name.toLowerCase() === preset.planName!.toLowerCase()
      );
      setSelectedPlanId(found?.id ?? null);
    } else {
      setSelectedPlanId(null);
    }

    setSelectedChannel(preset?.channelId ?? "web");

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

  const selectedPlan = useMemo(
    () => pricingPlans.find((p) => p.id === selectedPlanId) ?? null,
    [selectedPlanId]
  );

  const crossAddon = useMemo(
    () =>
      selectedPlan
        ? crossChannelAddons.find((a) => a.planId === selectedPlan.id) ?? null
        : null,
    [selectedPlan]
  );

  /** Превью «итого / диалоги» под селекторами */
  const preview = useMemo(() => {
    if (!selectedPlan) return null;
    if (selectedChannel === "cross" && crossAddon) {
      return {
        total: crossAddon.totalPrice,
        dialogs: crossAddon.totalDialogs,
        channel: "Web + MAX",
      };
    }
    return {
      total: selectedPlan.price,
      dialogs: selectedPlan.dialogs,
      channel: selectedChannel === "max" ? "MAX" : "Web",
    };
  }, [selectedPlan, selectedChannel, crossAddon]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setError(null);
    try {
      await submitLeadForm(e.currentTarget, {
        planName: selectedPlan?.name ?? null,
        channelLabel: selectedPlan ? channelShortLabel[selectedChannel] : null,
        monthlyPrice: preview?.total ?? null,
        dialogs: preview?.dialogs ?? null,
      });
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка отправки");
    } finally {
      setSending(false);
    }
  };

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
                {!submitted ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Header */}
                    <div className="mb-5">
                      <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-accent/5 px-3 py-1 text-xs font-semibold text-accent">
                        <Sparkles className="h-3.5 w-3.5" />
                        7 дней бесплатно
                      </div>
                      <h3 className="font-display text-2xl font-bold text-heading">
                        Подключить AI-ассистента
                      </h3>
                      <p className="mt-1.5 text-sm text-muted">
                        {selectedPlan
                          ? "Выберите тариф и канал — мы свяжемся для настройки за 1 день."
                          : "Оставьте заявку и мы свяжемся для настройки за 1 день."}
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      {/* ── Plan selector ──────────────────────── */}
                      <div>
                        <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-muted">
                          Тариф
                        </label>
                        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                          {pricingPlans.map((p) => {
                            const active = selectedPlanId === p.id;
                            return (
                              <button
                                key={p.id}
                                type="button"
                                onClick={() => setSelectedPlanId(p.id)}
                                className={`group relative flex flex-col items-center gap-0.5 rounded-xl border px-2 py-2.5 text-center transition-all duration-200 ${
                                  active
                                    ? "border-accent bg-accent/5 shadow-[0_2px_8px_rgba(0,151,245,0.15)]"
                                    : "border-gray-200 bg-white hover:border-accent/40 hover:bg-blue-ice/40"
                                }`}
                              >
                                <span
                                  className={`text-[11px] font-bold uppercase tracking-wide ${
                                    active ? "text-accent" : "text-heading"
                                  }`}
                                >
                                  {p.name}
                                </span>
                                <span className="text-[11px] font-medium text-muted">
                                  {fmt(p.price)} ₽
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* ── Channel selector ──────────────────── */}
                      <div>
                        <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-muted">
                          Канал
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {channelOptions.map((ch) => {
                            const Icon = channelIcons[ch.id];
                            const active = selectedChannel === ch.id;
                            return (
                              <button
                                key={ch.id}
                                type="button"
                                onClick={() => setSelectedChannel(ch.id)}
                                className={`relative flex flex-col items-center gap-1 rounded-xl border px-2 py-3 text-center transition-all duration-200 ${
                                  active
                                    ? "border-accent bg-accent/5 shadow-[0_2px_8px_rgba(0,151,245,0.15)]"
                                    : "border-gray-200 bg-white hover:border-accent/40 hover:bg-blue-ice/40"
                                }`}
                              >
                                <Icon
                                  className={`h-4 w-4 ${
                                    active ? "text-accent" : "text-muted"
                                  }`}
                                />
                                <span
                                  className={`text-[11px] font-semibold leading-tight ${
                                    active ? "text-accent" : "text-heading"
                                  }`}
                                >
                                  {ch.label}
                                </span>
                                {ch.id === "cross" && (
                                  <span className="text-[9px] font-medium uppercase tracking-wide text-muted">
                                    Второй канал
                                  </span>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* ── Live preview ─────────────────────── */}
                      <AnimatePresence>
                        {selectedPlan && preview && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            className="overflow-hidden"
                          >
                            <div className="flex items-center justify-between gap-3 rounded-xl border border-accent/15 bg-gradient-to-br from-blue-ice/50 to-white px-4 py-3">
                              <div>
                                <p className="text-[10px] font-semibold uppercase tracking-wide text-accent">
                                  {selectedPlan.name} · {preview.channel}
                                </p>
                                <p className="mt-0.5 font-display text-lg font-bold text-heading">
                                  {fmt(preview.total)} ₽
                                  <span className="ml-1 text-xs font-medium text-muted">
                                    / мес
                                  </span>
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="text-[10px] font-semibold uppercase tracking-wide text-muted">
                                  Диалогов
                                </p>
                                <p className="font-display text-base font-bold text-heading">
                                  {preview.dialogs}
                                  <span className="ml-1 text-xs font-medium text-muted">
                                    / мес
                                  </span>
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* ── Contact fields ──────────────────── */}
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
                            autoFocus
                            className="w-full rounded-xl border border-gray-200 bg-gray-50/70 py-3 pl-10 pr-4 text-sm text-heading outline-none transition-all placeholder:text-gray-400 focus:border-accent/40 focus:bg-white focus:ring-2 focus:ring-accent/10"
                          />
                        </div>
                        <div className="relative">
                          <label htmlFor="modal-company" className="sr-only">
                            Компания
                          </label>
                          <Building2 className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                          <input
                            id="modal-company"
                            type="text"
                            name="company"
                            required
                            placeholder="Компания"
                            className="w-full rounded-xl border border-gray-200 bg-gray-50/70 py-3 pl-10 pr-4 text-sm text-heading outline-none transition-all placeholder:text-gray-400 focus:border-accent/40 focus:bg-white focus:ring-2 focus:ring-accent/10"
                          />
                        </div>
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
                          className="w-full rounded-xl border border-gray-200 bg-gray-50/70 py-3 pl-10 pr-4 text-sm text-heading outline-none transition-all placeholder:text-gray-400 focus:border-accent/40 focus:bg-white focus:ring-2 focus:ring-accent/10"
                        />
                      </div>
                      <div className="relative">
                        <label htmlFor="modal-email" className="sr-only">
                          Email
                        </label>
                        <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <input
                          id="modal-email"
                          type="email"
                          name="email"
                          required
                          placeholder="Email"
                          className="w-full rounded-xl border border-gray-200 bg-gray-50/70 py-3 pl-10 pr-4 text-sm text-heading outline-none transition-all placeholder:text-gray-400 focus:border-accent/40 focus:bg-white focus:ring-2 focus:ring-accent/10"
                        />
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
                          "Отправить заявку"
                        )}
                      </button>

                      {error && (
                        <p className="text-center text-xs text-red-500">
                          {error}
                        </p>
                      )}

                      <p className="text-center text-xs text-muted">
                        Бесплатный период • Без карты • Интеграция за 1 день
                      </p>
                    </form>
                  </motion.div>
                ) : (
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
                      Мы свяжемся с вами в ближайшее время для настройки
                      AI-ассистента.
                    </p>
                    <button
                      onClick={closeForm}
                      className="mt-2 cursor-pointer rounded-lg px-6 py-2.5 text-sm font-semibold text-accent transition-colors hover:bg-accent/5"
                    >
                      Закрыть
                    </button>
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
