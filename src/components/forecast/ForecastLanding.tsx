"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  CalendarClock,
  Sparkles,
  Globe2,
  Wallet,
  TrendingUp,
  Activity,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  MessageSquare,
} from "lucide-react";
import RealDashboardFrame from "@/components/dashboard/RealDashboardFrame";
import RealForecastContent from "@/components/dashboard/RealForecastContent";
import SkolkovoBadge from "@/components/ui/SkolkovoBadge";
import CountUp from "@/components/ui/CountUp";
import { forecastFaqItems, networkResults } from "@/lib/content";
import { useLeadForm } from "@/contexts/LeadFormContext";
const capabilities = [
  {
    icon: CalendarClock,
    title: "Прогноз до конца месяца",
    text: "Ожидаемые диалоги, клиенты с интересом и сумма оплаченных туров — вместе с вашим доходом. Пересчитывается каждый день по темпу с поправкой на тренд.",
  },
  {
    icon: Sparkles,
    title: "AI-прогноз на 4–6 недель",
    text: "Модель разбирает вашу динамику, тренды всей сети и сезонный календарь направлений — и даёт практические рекомендации на месяц вперёд.",
  },
  {
    icon: Globe2,
    title: "Барометр спроса по сети",
    text: "Куда смотрят туристы всех агентств прямо сейчас: растущие направления, начало сезона, медианный чек. Полностью обезличенно.",
  },
  {
    icon: Wallet,
    title: "Факт за 30 дней",
    text: "Средний чек интереса, корзина спроса и топ-направления — отдельно для сайта и MAX. База, на которой строится каждый прогноз.",
  },
];

const methodology = [
  {
    icon: Activity,
    title: "Прогноз по темпу и тренду",
    text: "Берём факт с 1-го числа месяца, делим на прошедшие дни, умножаем на длину месяца и поправку на тренд последних недель. Никакой магии — обычная арифметика.",
  },
  {
    icon: Wallet,
    title: "Сумма и ваш доход",
    text: "Клиенты с интересом × средний чек = корзина спроса. Умножаем на конверсию в покупку (отраслевые 10–20%) и вашу комиссию — получаем диапазон дохода.",
  },
  {
    icon: TrendingUp,
    title: "Тренд направлений в п.п.",
    text: "Изменение доли спроса к предыдущим 14 дням в процентных пунктах — честно, без обманчивых «+1100%» на новых направлениях.",
  },
];

export default function ForecastLanding() {
  const { openForm } = useLeadForm();
  const register = (source: string) => openForm({ source });

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-white">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[700px] w-[700px] rounded-full bg-[#00E7FD]/[0.07] blur-[120px]" />
        <div className="pointer-events-none absolute -left-20 top-1/3 h-[500px] w-[500px] rounded-full bg-[#0097F5]/[0.05] blur-[100px]" />

        <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-12 px-5 pt-24 pb-16 sm:px-6 sm:pt-32 sm:pb-20 lg:flex-row lg:items-start lg:gap-12 lg:px-8 lg:pt-36 lg:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-1 flex-col items-center text-center lg:items-start lg:pt-8 lg:text-left"
          >
            <span className="mb-6 inline-flex items-center gap-1.5 rounded-full bg-blue-ice px-4 py-1.5 text-sm font-medium text-accent">
              <TrendingUp className="h-4 w-4" />
              Личный кабинет · Прогнозы
            </span>

            <h1
              className="mb-6 font-display text-3xl font-bold leading-[1.1] text-heading sm:text-5xl lg:text-[3.25rem]"
              style={{ letterSpacing: "-0.02em" }}
            >
              Прогноз спроса и продаж для вашего{" "}
              <span className="text-accent">турагентства</span>
            </h1>

            <p className="mb-8 max-w-xl text-base leading-relaxed text-body sm:text-lg">
              Раздел «Отчёты и прогнозы» превращает диалоги ИИ-ассистента в
              понятную картину будущего: сколько заявок и денег принесёт месяц,
              куда движется спрос по сети и что делать в ближайшие 4–6 недель.
            </p>

            <div className="mb-6 flex flex-col items-center gap-3 sm:flex-row lg:items-start">
              <button
                onClick={() => register("prognozy_hero")}
                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-accent/25 transition-all duration-200 hover:shadow-xl hover:shadow-accent/35 sm:text-lg"
                style={{
                  background:
                    "linear-gradient(135deg, #0062EF 0%, #0097F5 60%, #00CCF5 100%)",
                }}
              >
                Подключить бесплатно
                <ArrowRight className="h-5 w-5" />
              </button>
              <Link
                href="/demo"
                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-accent/30 px-7 py-3.5 text-base font-semibold text-accent transition-colors hover:border-accent hover:bg-blue-ice sm:text-lg"
              >
                Попробовать демо
              </Link>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-muted sm:text-sm lg:justify-start">
              {[
                "Прогноз до конца месяца",
                "AI на 4–6 недель",
                "Барометр спроса по сети",
                "Сайт + MAX",
              ].map((item) => (
                <span key={item} className="flex items-center gap-1.5">
                  <svg
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-3.5 w-3.5 text-accent"
                  >
                    <path d="M8 0a8 8 0 110 16A8 8 0 018 0zm3.78 5.22a.75.75 0 00-1.06 0L7 8.94 5.28 7.22a.75.75 0 10-1.06 1.06l2.25 2.25a.75.75 0 001.06 0l4.25-4.25a.75.75 0 000-1.06z" />
                  </svg>
                  {item}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="w-full flex-shrink-0 lg:w-[600px]"
          >
            <div className="relative">
              <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-[#0097F5]/8 to-[#00E7FD]/8 blur-xl" />
              <RealDashboardFrame
                activeScreen="reports"
                className="relative"
                animate={false}
              >
                <RealForecastContent />
              </RealDashboardFrame>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="bg-surface">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-24">
          <div className="mb-14 text-center">
            <h2 className="font-display text-3xl font-bold text-heading sm:text-4xl">
              Не только что было — но и{" "}
              <span className="text-accent">что будет</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-body">
              Четыре инструмента одного раздела: от факта за прошедший месяц до
              прогноза дохода и спроса по всей сети.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {capabilities.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="rounded-2xl border border-blue-subtle/40 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-ice">
                  <c.icon className="h-5 w-5 text-accent" />
                </div>
                <h3 className="font-display text-base font-bold text-heading">
                  {c.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-body">
                  {c.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it's calculated */}
      <section className="bg-surface-alt">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-24">
          <div className="mb-14 text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-accent shadow-card">
              <HelpCircle className="h-4 w-4" />
              Как это посчитано
            </span>
            <h2 className="mt-5 font-display text-3xl font-bold text-heading sm:text-4xl">
              Прозрачная математика, а не чёрный ящик
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-body">
              У каждого числа в кабинете есть раскрывающееся пояснение с формулой.
              Вы всегда понимаете, откуда взялась цифра — и можете доверять
              прогнозу.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {methodology.map((m, i) => (
              <motion.div
                key={m.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="rounded-2xl border border-blue-subtle/40 bg-white p-7 shadow-card"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10">
                  <m.icon className="h-5 w-5 text-accent" />
                </div>
                <h3 className="font-display text-lg font-bold text-heading">
                  {m.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-body">
                  {m.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Network barometer differentiator */}
      <section className="bg-surface">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-[6fr_5fr] lg:gap-14">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-ice px-4 py-1.5">
                <Globe2 className="h-4 w-4 text-accent" />
                <span className="text-sm font-semibold text-accent">
                  Сетевой эффект
                </span>
              </div>
              <h2 className="mt-5 font-display text-3xl font-bold text-heading sm:text-4xl">
                Данные всей сети — на вашей стороне
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-body">
                Одиночный чат-бот видит только ваш трафик. «Навылет! AI»
                показывает обезличенный спрос всей сети агентств: вы замечаете
                начало сезона и растущие направления раньше конкурентов и
                сравниваете свою динамику с рынком.
              </p>
              <div className="mt-6 space-y-3">
                {[
                  {
                    icon: ShieldCheck,
                    text: "Только обезличенные агрегаты — без названий компаний и абсолютных объёмов сети.",
                  },
                  {
                    icon: TrendingUp,
                    text: "Тренды направлений в процентных пунктах и отметка сезонности по каждому.",
                  },
                  {
                    icon: Wallet,
                    text: "Медианный чек и доля диалогов с интересом по сети — ориентир для ваших цен.",
                  },
                ].map((item) => (
                  <div key={item.text} className="flex items-start gap-3">
                    <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-lg bg-blue-ice">
                      <item.icon className="h-3.5 w-3.5 text-accent" />
                    </div>
                    <span className="text-sm leading-relaxed text-body">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-blue-subtle/40 bg-gradient-to-br from-blue-ice/40 to-white px-6 py-8 shadow-card sm:px-8">
              <p className="text-center text-xs font-semibold uppercase tracking-wide text-muted">
                {networkResults.eyebrow}
              </p>
              <div className="mt-6 grid grid-cols-2 gap-6">
                {networkResults.stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="font-display text-2xl font-bold text-heading sm:text-3xl">
                      {stat.prefix}
                      <CountUp end={stat.value} separator={stat.separator} />
                      {stat.suffix}
                    </div>
                    <div className="mt-1 break-words text-xs leading-tight text-muted">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-7 flex justify-center border-t border-blue-subtle/50 pt-6">
                <SkolkovoBadge imgClassName="h-6 w-auto" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-surface-alt">
        <div className="mx-auto max-w-3xl px-5 py-20 sm:px-6 lg:px-8 lg:py-24">
          <h2 className="mb-10 text-center font-display text-3xl font-bold text-heading sm:text-4xl">
            Частые вопросы о прогнозах
          </h2>
          <div className="space-y-4">
            {forecastFaqItems.map((item) => (
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
            Подключите ассистента — и увидите прогноз
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-lg text-white/70">
            Раздел «Прогнозы» открывается в личном кабинете автоматически, как
            только ассистент начнёт вести диалоги. Регистрация за 2 минуты,
            30 дней бесплатно.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3">
            <button
              onClick={() => register("prognozy_bottom")}
              className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-white px-8 py-4 text-lg font-semibold text-primary shadow-lg shadow-black/10 transition-all hover:bg-blue-ice hover:shadow-xl"
            >
              Подключить бесплатно
              <ArrowRight className="h-5 w-5" />
            </button>
            <Link
              href="/demo"
              className="inline-flex items-center gap-1.5 text-sm text-white/60 underline decoration-white/30 underline-offset-2 transition-colors hover:text-white"
            >
              <MessageSquare className="h-4 w-4" />
              Сначала посмотреть демо-чат
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
