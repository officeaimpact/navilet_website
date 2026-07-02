"use client";

import { motion } from "framer-motion";
import {
  MessageSquare,
  Sparkles,
  Palette,
  Building2,
  Settings2,
  Send,
  LayoutGrid,
  Rocket,
  Phone,
  Mail,
  ArrowRight,
} from "lucide-react";
import Button from "@/components/ui/Button";
import { useLeadForm } from "@/contexts/LeadFormContext";
import {
  companyInfo,
  lkUrls,
  demoFaqItems,
  demoExampleQueries,
} from "@/lib/content";
import { metrikaGoals, reachMetrikaGoal } from "@/lib/metrika";

declare global {
  interface Window {
    AimpactWidget?: { open: () => void; close?: () => void; toggle?: () => void };
  }
}

const steps = [
  {
    icon: Send,
    title: "Напишите запрос",
    text: "Например: «Турция из Москвы, 7 ночей в июле, всё включено, до 200 000 ₽ на двоих».",
  },
  {
    icon: LayoutGrid,
    title: "Получите подбор",
    text: "Ассистент найдёт туры и покажет карточки с отелями, ценами и кнопкой «Забронировать».",
  },
  {
    icon: Rocket,
    title: "Подключите себе",
    text: "Такой же ассистент работает на вашем сайте и в мессенджерах. Запуск за 1 день.",
  },
];

const customization = [
  {
    icon: Palette,
    title: "Брендирование",
    text: "Логотип, цвета, тон голоса и приветствие — под ваш бренд. White-label, без наших упоминаний.",
  },
  {
    icon: Building2,
    title: "Ваши данные и контакты",
    text: "Телефоны, адреса офисов, ссылки на бронирование и базу туров — ваши, не демонстрационные.",
  },
  {
    icon: Settings2,
    title: "Индивидуальная настройка",
    text: "Всё обсуждается лично. Если что-то не понравится — доработаем сценарии и оформление под вас.",
  },
];

export default function DemoExperience() {
  const { openForm } = useLeadForm();

  const openChat = () => {
    reachMetrikaGoal(metrikaGoals.demoChatOpen);
    if (typeof window !== "undefined" && window.AimpactWidget) {
      window.AimpactWidget.open();
    }
  };

  const handleTrialClick = () => {
    reachMetrikaGoal(metrikaGoals.trialClick, { destination: "lk_register" });
  };

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-white">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full bg-[#00E7FD]/[0.07] blur-[120px]" />
        <div className="pointer-events-none absolute -left-20 top-1/3 h-[400px] w-[400px] rounded-full bg-[#0097F5]/[0.05] blur-[100px]" />

        <div className="relative mx-auto max-w-3xl px-5 pt-28 pb-14 text-center sm:px-6 sm:pt-32 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-accent">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            Демо-режим · тестовые данные
          </span>

          <h1 className="mt-6 font-display text-4xl font-bold leading-[1.1] text-heading sm:text-5xl">
            Попробуйте ИИ-турменеджера вживую
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-body">
            Спросите ассистента про любой тур — направление, даты, бюджет, число
            туристов. Он подберёт реальные варианты и покажет карточки с ценами,
            как на сайте агентства.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button variant="primary" size="lg" onClick={openChat}>
              <span className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Открыть чат
              </span>
            </Button>
            <span className="text-sm text-muted">
              или кнопка чата в правом нижнем углу →
            </span>
          </div>

          {/* Примеры запросов — что спросить у ассистента */}
          <div className="mx-auto mt-8 max-w-2xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted">
              Примеры запросов — скопируйте в чат
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {demoExampleQueries.map((q) => (
                <span
                  key={q}
                  className="rounded-full border border-blue-subtle/60 bg-surface-alt px-4 py-2 text-sm text-body"
                >
                  «{q}»
                </span>
              ))}
            </div>
          </div>

          <div className="mx-auto mt-8 max-w-xl rounded-2xl border border-blue-subtle/50 bg-surface-alt px-5 py-4 text-sm leading-relaxed text-body">
            Это демонстрация на тестовых данных. Ваш бренд, логотип, контакты и
            данные компании настраиваются под вас при подключении.
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="mx-auto max-w-5xl px-5 py-8 sm:px-6 lg:px-8">
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
              <h3 className="font-display text-base font-bold text-heading">
                {i + 1}. {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-body">{s.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Customization — всё под вас */}
      <section className="mx-auto max-w-5xl px-5 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h2 className="font-display text-2xl font-bold text-heading sm:text-3xl">
            В демо — тестовые данные. На проде — всё под вас
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-base text-body">
            Демо показывает логику работы. При подключении ассистент полностью
            адаптируется под ваше агентство.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {customization.map((c) => (
            <div
              key={c.title}
              className="rounded-2xl border border-blue-subtle/40 bg-white p-6 shadow-card"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10">
                <c.icon className="h-5 w-5 text-accent" />
              </div>
              <h3 className="font-display text-base font-bold text-heading">
                {c.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-body">{c.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ по демо */}
      <section className="mx-auto max-w-3xl px-5 py-12 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-center font-display text-2xl font-bold text-heading sm:text-3xl">
          Частые вопросы про демо
        </h2>
        <div className="space-y-4">
          {demoFaqItems.map((item) => (
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

      {/* CTA */}
      <section
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #001229 0%, #002152 30%, #0062EF 70%, #0097F5 100%)",
        }}
      >
        <div className="noise-overlay pointer-events-none absolute inset-0 opacity-20" />
        <div className="pointer-events-none absolute -right-32 -top-32 h-[400px] w-[400px] rounded-full bg-[#00E7FD]/10 blur-[140px]" />

        <div className="relative mx-auto max-w-3xl px-5 py-20 text-center sm:px-6 lg:px-8 lg:py-24">
          <div className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5" />
            7 дней бесплатно
          </div>
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
            Хотите такого ассистента себе?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-lg text-white/70">
            Подключим ИИ-ассистента на ваш сайт и в мессенджеры (Web-виджет и
            MAX). Запуск за 1 день — с вашим брендом и данными.
          </p>

          <div className="mt-9 flex flex-col items-center gap-3">
            <a
              href={lkUrls.register}
              onClick={handleTrialClick}
              className="inline-flex cursor-pointer items-center justify-center rounded-xl bg-white px-7 py-3.5 font-semibold text-primary shadow-lg shadow-black/10 transition-all hover:bg-blue-ice hover:shadow-xl"
            >
              Зарегистрироваться и начать пробный период
            </a>
            <span className="text-xs text-white/45">
              Регистрация в личном кабинете · 7 дней бесплатно
            </span>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 border-t border-white/10 pt-8">
            <Button
              variant="outline"
              size="md"
              className="!border-white/25 !text-white hover:!bg-white/10"
              onClick={() => openForm()}
            >
              <span className="flex items-center gap-2">
                Оставить заявку
                <ArrowRight className="h-4 w-4" />
              </span>
            </Button>
            <a
              href="https://t.me/navylet_ai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-4 py-2.5 text-sm font-semibold text-white/90 transition-colors hover:bg-white/10"
            >
              <Send className="h-4 w-4" />
              Telegram
            </a>
            <a
              href={`tel:${companyInfo.phoneRaw}`}
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-4 py-2.5 text-sm font-semibold text-white/90 transition-colors hover:bg-white/10"
            >
              <Phone className="h-4 w-4" />
              {companyInfo.phone}
            </a>
            <a
              href={`mailto:${companyInfo.email}`}
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-4 py-2.5 text-sm font-semibold text-white/90 transition-colors hover:bg-white/10"
            >
              <Mail className="h-4 w-4" />
              {companyInfo.email}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
