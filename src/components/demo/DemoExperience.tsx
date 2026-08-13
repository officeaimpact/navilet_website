"use client";

import { useEffect, useState } from "react";
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
  Target,
  Gem,
  ClipboardList,
  Info,
} from "lucide-react";
import Button from "@/components/ui/Button";
import DemoWidgetLoader from "@/components/demo/DemoWidgetLoader";
import { useLeadForm } from "@/contexts/LeadFormContext";
import {
  companyInfo,
  lkUrls,
  demoFaqItems,
  demoExampleQueries,
  demoAssistants,
  demoFallbackVersion,
  type AssistantVersionId,
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
    text: "Например: «Турция из Москвы, 7 ночей в июле, всё включено, до 200 000 ₽ на двоих».",
  },
  {
    icon: LayoutGrid,
    title: "Получите подбор",
    text: "Ассистент найдёт туры, покажет карточки с ценами и соберёт их в подборку — страницу по ссылке, которую клиент открывает и пересылает своим.",
  },
  {
    icon: Rocket,
    title: "Подключите себе",
    text: "Такой же ассистент работает на вашем сайте и в мессенджерах. Запуск за пару минут.",
  },
];

const demoVersions: {
  id: AssistantVersionId;
  name: string;
  caption: string;
  hint: string;
  Icon: typeof Target;
}[] = [
  {
    id: "lid",
    name: "Лид",
    caption: "лидогенерация",
    hint: "«Лид» собирает запрос по шагам, показывает подборку и передаёт заявку с контактом менеджеру — попробуйте пройти путь клиента до заявки.",
    Icon: Target,
  },
  {
    id: "pro",
    name: "Про",
    caption: "полный инструмент",
    hint: "«Про» консультирует без ограничений: спросите про отель, пляж или питание, попросите сравнить варианты и проверить цену.",
    Icon: Gem,
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
  const [version, setVersion] = useState<AssistantVersionId>("pro");

  // Deep-link: /demo?v=lid|pro открывает нужную версию (карточки версий
  // на главной и /versii ведут сюда с предустановкой)
  useEffect(() => {
    const v = new URLSearchParams(window.location.search).get("v");
    if (v === "lid" || v === "pro") setVersion(v);
  }, []);

  const switchVersion = (next: AssistantVersionId) => {
    if (next === version) return;
    setVersion(next);
    reachMetrikaGoal(metrikaGoals.demoVersionSwitch, { version_id: next });
    // Обновляем ?v= без перезагрузки — ссылкой можно поделиться
    const url = new URL(window.location.href);
    url.searchParams.set("v", next);
    window.history.replaceState(null, "", url.toString());
  };

  const activeVersion = demoVersions.find((v) => v.id === version)!;
  const fallbackVersion = demoVersions.find(
    (v) => v.id === demoFallbackVersion
  )!;
  /** Ассистент для виджета: выбранная версия или доступная взамен */
  const liveAssistantId =
    demoAssistants[version] ?? demoAssistants[demoFallbackVersion]!;

  const openChat = () => {
    reachMetrikaGoal(metrikaGoals.demoChatOpen, { version_id: version });
    if (typeof window !== "undefined" && window.AimpactWidget) {
      window.AimpactWidget.open();
    }
  };

  const handleTrialClick = () => {
    reachMetrikaGoal(metrikaGoals.trialClick, { destination: "lk_register" });
  };

  /** Заявка на подключение с демо — с версией, которую человек тестировал. */
  const handleRequestClick = (source: string) => () =>
    openForm({ source, versionId: version });

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
            Попробуйте ИИ-ассистента вживую
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-body">
            Спросите ассистента про любой тур — направление, даты, бюджет, число
            туристов. Он подберёт реальные варианты и покажет карточки с ценами,
            как на сайте агентства.
          </p>

          {/* Переключатель версий «Лид» / «Про» */}
          <div className="mx-auto mt-7 max-w-md">
            <p className="mb-2.5 text-xs font-semibold uppercase tracking-wide text-muted">
              Какую версию попробовать
            </p>
            <div
              role="tablist"
              aria-label="Версия демо-ассистента"
              className="grid grid-cols-2 gap-1 rounded-2xl border border-blue-subtle/50 bg-surface-alt p-1.5"
            >
              {demoVersions.map((v) => {
                const active = version === v.id;
                return (
                  <button
                    key={v.id}
                    role="tab"
                    aria-selected={active}
                    onClick={() => switchVersion(v.id)}
                    className={`flex cursor-pointer flex-col items-center rounded-xl px-3 py-2.5 transition-all duration-200 ${
                      active
                        ? "bg-white shadow-[0_2px_8px_rgba(0,82,204,0.10)] ring-1 ring-blue-subtle/60"
                        : "hover:bg-white/60"
                    }`}
                  >
                    <span
                      className={`flex items-center gap-1.5 font-display text-sm font-bold sm:text-base ${
                        active ? "text-accent" : "text-heading"
                      }`}
                    >
                      <v.Icon className="h-4 w-4" />
                      Версия «{v.name}»
                    </span>
                    <span className="mt-0.5 text-[11px] font-medium text-muted sm:text-xs">
                      {v.caption}
                    </span>
                  </button>
                );
              })}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-body">
              {activeVersion.hint}
            </p>
            {/* Страховка на случай, если демо версии нет в кабинете: чат
                открывает доступную версию, но говорим об этом прямо. */}
            {!demoAssistants[version] && (
              <p className="mt-3 flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50/70 px-3.5 py-2.5 text-left text-[13px] leading-relaxed text-amber-900">
                <Info className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-600" />
                <span>
                  Живое демо версии «{activeVersion.name}» готовим — чат ниже
                  пока отвечает на версии «{fallbackVersion.name}». Нужна версия
                  «{activeVersion.name}» на вашем сайте — оставьте заявку, мы её
                  включим.
                </span>
              </p>
            )}
          </div>

          <div className="mt-8 flex flex-col items-center gap-3.5">
            {/* Два равных пути — попробовать и подключить самому — стоят в
                ряд; заявка менеджеру идёт строкой ниже как третий выбор. */}
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button variant="primary" size="lg" onClick={openChat}>
                <span className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Открыть чат
                </span>
              </Button>
              <a
                href={lkUrls.register}
                onClick={handleTrialClick}
                className="group inline-flex items-center justify-center gap-2 rounded-lg border-2 border-accent/30 px-6 py-3.5 text-base font-semibold text-accent transition-colors duration-200 hover:border-accent hover:bg-blue-ice sm:px-8 sm:py-4 sm:text-lg"
              >
                <Rocket className="h-5 w-5" />
                <span className="sm:hidden">Зарегистрироваться</span>
                <span className="hidden sm:inline">
                  Зарегистрироваться за 2 минуты
                </span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
            {/* Версия из тумблера уходит вместе с заявкой. */}
            <button
              type="button"
              onClick={handleRequestClick("demo_hero_request")}
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-blue-subtle/70 bg-white px-5 py-2.5 text-sm font-semibold text-heading shadow-sm transition-colors duration-200 hover:border-accent/40 hover:bg-blue-ice/40 hover:text-accent"
            >
              <ClipboardList className="h-4 w-4 text-accent" />
              Оставить заявку на подключение
            </button>
            <p className="inline-flex items-center gap-2 rounded-full bg-accent/5 px-4 py-1.5 text-sm font-medium text-accent">
              <Sparkles className="h-4 w-4" />
              Свой ассистент за 2 минуты — доступ на 30 дней бесплатно
            </p>
            <span className="text-sm text-muted">
              или откройте чат кнопкой в правом нижнем углу →
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
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Когда придут карточки, нажмите под ними «Смотреть подборку» —
              откроется страница с турами, которую клиент получает ссылкой.
            </p>
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
              <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 font-display text-base font-bold text-heading [&::-webkit-details-marker]:hidden">
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
            30 дней бесплатно
          </div>
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
            Хотите такого ассистента себе?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-lg text-white/70">
            Подключим ИИ-ассистента на ваш сайт и в мессенджеры (Web-виджет и
            MAX). Запуск за пару минут — с вашим брендом и данными.
          </p>

          <div className="mt-9 flex flex-col items-center gap-3">
            <a
              href={lkUrls.register}
              onClick={handleTrialClick}
              className="inline-flex cursor-pointer items-center justify-center rounded-xl bg-white px-8 py-4 text-lg font-semibold text-primary shadow-lg shadow-black/10 transition-all hover:bg-blue-ice hover:shadow-xl"
            >
              Зарегистрироваться за 2 минуты
            </a>
            <button
              type="button"
              onClick={handleRequestClick("demo_bottom_request")}
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-white/35 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-white/10"
            >
              <ClipboardList className="h-4 w-4" />
              Оставить заявку на подключение
            </button>
            <span className="text-xs text-white/45">
              Сами за 2 минуты или через менеджера — первый месяц бесплатно
              в обоих случаях
            </span>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 border-t border-white/10 pt-8">
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

      {/* Виджет пересоздаётся при смене версии — меняется data-assistant-id */}
      <DemoWidgetLoader assistantId={liveAssistantId} />
    </>
  );
}
