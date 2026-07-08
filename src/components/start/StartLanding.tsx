"use client";

import { motion } from "framer-motion";
import {
  UserPlus,
  Code2,
  Rocket,
  ArrowRight,
  Sparkles,
  MessageSquare,
  Check,
} from "lucide-react";
import Link from "next/link";
import SkolkovoBadge from "@/components/ui/SkolkovoBadge";
import CountUp from "@/components/ui/CountUp";
import {
  lkUrls,
  startFaqItems,
  networkResults,
  pricingPlans,
} from "@/lib/content";
import { metrikaGoals, reachMetrikaGoal } from "@/lib/metrika";

const fmt = (n: number) => n.toLocaleString("ru-RU").replace(/\s/g, "\u202F");

const steps = [
  {
    icon: UserPlus,
    title: "Зарегистрируйтесь",
    text: "Название компании, email и телефон — это всё. Занимает 2 минуты, карта не нужна.",
  },
  {
    icon: Code2,
    title: "Получите код виджета",
    text: "Код и пошаговая инструкция появятся в личном кабинете и придут на почту сразу после регистрации.",
  },
  {
    icon: Rocket,
    title: "Вставьте на сайт",
    text: "Одна строка кода перед </body> — и ассистент отвечает туристам. Tilda, WordPress, Bitrix — подходит всё.",
  },
];

const included = [
  "Подбор туров по базе Tourvisor — 50+ стран, live-цены",
  "Ответы туристам 24/7 — ночью и в выходные",
  "Готовые заявки с контактами — менеджеру на почту",
  "Виджет в вашем бренде: логотип и цвета",
];

export default function StartLanding() {
  const litePlan = pricingPlans.find((p) => p.id === "lite");

  const register = (source: string) => {
    reachMetrikaGoal(metrikaGoals.trialClick, { source });
  };

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-white">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full bg-[#00E7FD]/[0.07] blur-[120px]" />
        <div className="pointer-events-none absolute -left-20 top-1/3 h-[400px] w-[400px] rounded-full bg-[#0097F5]/[0.05] blur-[100px]" />

        <div className="relative mx-auto max-w-3xl px-5 pt-28 pb-12 text-center sm:px-6 sm:pt-32 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-accent">
            <Sparkles className="h-3.5 w-3.5" />
            7 дней бесплатно · без карты
          </span>

          <h1 className="mt-6 font-display text-4xl font-bold leading-[1.08] text-heading sm:text-5xl">
            ИИ-турменеджер на вашем сайте —{" "}
            <span className="text-accent">подключение за 2 минуты</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-body">
            Зарегистрируйтесь, получите код виджета и вставьте его на сайт.
            Ассистент на базе Tourvisor подбирает туры и отвечает туристам
            круглосуточно — заявки приходят менеджеру готовыми.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3">
            <a
              href={lkUrls.register}
              onClick={() => register("start_landing_hero")}
              className="inline-flex items-center justify-center gap-2 rounded-xl px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-accent/25 transition-all duration-200 hover:shadow-xl hover:shadow-accent/35"
              style={{
                background:
                  "linear-gradient(135deg, #0062EF 0%, #0097F5 60%, #00CCF5 100%)",
              }}
            >
              Подключить ассистента за 2 минуты
              <ArrowRight className="h-5 w-5" />
            </a>
            <span className="text-sm text-muted">
              Без созвонов и ожидания — всё самостоятельно
            </span>
          </div>

          {/* Trust row */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 border-t border-blue-subtle/50 pt-7 text-sm text-muted">
            <span>Уже работает: сеть МГП · Sun Orange · AnyTour</span>
            <span aria-hidden className="hidden h-5 w-px bg-blue-subtle/60 sm:block" />
            <SkolkovoBadge imgClassName="h-6 w-auto" />
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="mx-auto max-w-5xl px-5 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="rounded-2xl border border-blue-subtle/40 bg-white p-6 shadow-card"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10">
                <s.icon className="h-5 w-5 text-accent" />
              </div>
              <h2 className="font-display text-base font-bold text-heading">
                {i + 1}. {s.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-body">{s.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* What's included + price anchor */}
      <section className="mx-auto max-w-5xl px-5 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-blue-subtle/40 bg-white p-7 shadow-card sm:p-8">
            <h2 className="font-display text-xl font-bold text-heading">
              Что делает ассистент
            </h2>
            <ul className="mt-5 space-y-3">
              {included.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-body">
                  <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-accent/10">
                    <Check className="h-3 w-3 text-accent" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/demo"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline"
            >
              <MessageSquare className="h-4 w-4" />
              Попробовать демо-чат перед регистрацией
            </Link>
          </div>

          <div className="flex flex-col justify-between rounded-2xl border border-accent/20 bg-gradient-to-br from-blue-ice/40 to-white p-7 shadow-card sm:p-8">
            <div>
              <h2 className="font-display text-xl font-bold text-heading">
                Сколько стоит после теста
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-body">
                7 дней — бесплатно и без карты. Дальше — тариф{" "}
                <span className="font-semibold text-heading">
                  Lite: {litePlan ? fmt(litePlan.price) : "1 990"} ₽/мес
                </span>{" "}
                за {litePlan?.dialogs ?? 30} диалогов, подключение 0 ₽. Нужен
                объём больше — тарифы до 400 диалогов/мес.
              </p>
              <p className="mt-3 text-xs text-muted">
                Никаких автосписаний: карту вы не привязываете, оплата — только
                по вашему решению.
              </p>
            </div>
            <Link
              href="/tarify"
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline"
            >
              Все тарифы
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Network results */}
      <section className="mx-auto max-w-5xl px-5 py-10 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-blue-subtle/40 bg-white px-6 py-8 shadow-card sm:px-10">
          <p className="text-center text-xs font-semibold uppercase tracking-wide text-muted">
            {networkResults.eyebrow}
          </p>
          <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {networkResults.stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-display text-2xl font-bold text-heading sm:text-3xl">
                  {s.prefix}
                  <CountUp end={s.value} separator={s.separator} />
                  {s.suffix}
                </div>
                <div className="mt-1 text-xs text-muted">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-5 py-10 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-center font-display text-2xl font-bold text-heading sm:text-3xl">
          Частые вопросы
        </h2>
        <div className="space-y-4">
          {startFaqItems.map((item) => (
            <details
              key={item.question}
              className="group rounded-2xl border border-blue-subtle/40 bg-white p-5 shadow-card sm:p-6"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-display text-base font-bold text-heading [&::-webkit-details-marker]:hidden">
                {item.question}
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-body">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #001229 0%, #002152 30%, #0062EF 70%, #0097F5 100%)",
        }}
      >
        <div className="noise-overlay pointer-events-none absolute inset-0 opacity-20" />
        <div className="relative mx-auto max-w-3xl px-5 py-16 text-center sm:px-6 lg:px-8 lg:py-20">
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
            Ассистент может работать у вас уже сегодня
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-lg text-white/70">
            Регистрация за 2 минуты, 7 дней бесплатно, без карты и созвонов.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3">
            <a
              href={lkUrls.register}
              onClick={() => register("start_landing_bottom")}
              className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-lg font-semibold text-primary shadow-lg shadow-black/10 transition-all hover:bg-blue-ice hover:shadow-xl"
            >
              Подключить ассистента за 2 минуты
              <ArrowRight className="h-5 w-5" />
            </a>
            <Link
              href="/demo"
              className="text-sm text-white/60 underline decoration-white/30 underline-offset-2 transition-colors hover:text-white"
            >
              Сначала посмотреть демо
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
