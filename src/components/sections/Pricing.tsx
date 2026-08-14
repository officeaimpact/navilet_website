"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import {
  pricingPlans,
  crossChannelAddons,
  promo,
  type PricingPlan,
  type CrossChannelAddon,
  type AssistantVersionId,
  type VersionPlanValues,
  type CrossChannelValues,
} from "@/lib/content";
import { isPromoActive } from "@/lib/promo";
import { metrikaGoals, reachMetrikaGoal } from "@/lib/metrika";
import { versionIcons } from "@/lib/version-icons";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Button from "@/components/ui/Button";
import {
  Check,
  Sparkles,
  Settings,
  ArrowRight,
  Globe,
  MessageSquare,
  Layers,
  Inbox,
  Info,
} from "lucide-react";
import { useLeadForm } from "@/contexts/LeadFormContext";

/** Форматирование чисел с тонкими неразрывными пробелами */
const fmt = (n: number) => n.toLocaleString("ru-RU").replace(/\s/g, "\u202F");

/** Значения тарифа в выбранной версии */
const planValues = (
  plan: PricingPlan,
  version: AssistantVersionId
): VersionPlanValues =>
  version === "lid"
    ? plan.lid
    : {
        price: plan.price,
        dialogs: plan.dialogs,
        extraDialog: plan.extraDialog,
        effectivePerDialog: plan.effectivePerDialog,
      };

/** Значения надстройки «Второй канал» в выбранной версии */
const addonValues = (
  addon: CrossChannelAddon,
  version: AssistantVersionId
): CrossChannelValues =>
  version === "lid"
    ? addon.lid
    : {
        addonPrice: addon.addonPrice,
        extraDialogs: addon.extraDialogs,
        totalPrice: addon.totalPrice,
        totalDialogs: addon.totalDialogs,
        extraDialogPrice: addon.extraDialogPrice,
      };

const versionMeta: Record<
  AssistantVersionId,
  { name: string; caption: string; Icon: typeof versionIcons.lid; blurb: string }
> = {
  lid: {
    name: "Лид",
    caption: "лидогенерация · от 990\u00A0₽",
    Icon: versionIcons.lid,
    blurb:
      "«Лид» ведёт живой диалог, подбирает туры и передаёт готовую заявку с контактом вашему менеджеру.",
  },
  pro: {
    name: "Про",
    caption: "полный инструмент · от 1\u00A0990\u00A0₽",
    Icon: versionIcons.pro,
    blurb:
      "«Про» консультирует без ограничений, проверяет цены в чате и возвращает клиентов в MAX.",
  },
};

function PlanCard({
  plan,
  values,
  onSelect,
  onRegister,
}: {
  plan: PricingPlan;
  values: VersionPlanValues;
  onSelect: (plan: PricingPlan) => void;
  onRegister: (plan: PricingPlan) => void;
}) {
  const { name, popular } = plan;
  const { price, dialogs, extraDialog, effectivePerDialog } = values;

  const card = (
    <motion.div
      id={plan.id}
      variants={fadeInUp}
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className={`group relative flex h-full flex-col scroll-mt-28 rounded-2xl bg-white p-6 transition-shadow duration-200 lg:p-7 ${
        popular
          ? "shadow-[0_4px_24px_rgba(0,82,204,0.12)] hover:shadow-[0_8px_40px_rgba(0,82,204,0.16)]"
          : "border border-blue-subtle/50 shadow-[0_1px_3px_rgba(0,82,204,0.04),0_4px_16px_rgba(0,82,204,0.05)] hover:border-accent/25 hover:shadow-[0_4px_12px_rgba(0,82,204,0.08),0_12px_40px_rgba(0,82,204,0.07)]"
      }`}
    >
      {popular && (
        <div className="absolute -top-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1 rounded-full bg-gradient-to-r from-[#0062EF] to-[#0097F5] px-3 py-1 text-xs font-bold text-white shadow-md">
          <Sparkles className="h-3 w-3" />
          Популярный
        </div>
      )}
      {/* Header */}
      <div className="mb-4">
        <h3 className="font-display text-lg font-bold uppercase tracking-wide text-heading">
          {name}
        </h3>
      </div>

      {/* Price */}
      <div className="mb-1 flex flex-wrap items-baseline gap-x-1">
        <span className="whitespace-nowrap font-display text-3xl font-bold text-heading">
          {fmt(price)}&nbsp;₽
        </span>
        <span className="text-sm font-medium text-muted">/ мес</span>
      </div>
      <p className="text-sm font-medium text-accent">
        {dialogs} диалогов / мес
      </p>

      <div className="my-5 h-px w-full bg-blue-subtle/60" />

      {/* Details */}
      <ul className="mb-7 flex-1 space-y-2.5 text-sm text-body">
        <li className="flex items-start gap-2.5">
          <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-accent/10">
            <Check className="h-3 w-3 text-accent" />
          </span>
          <span>
            Доп. диалог сверх лимита —{" "}
            <span className="font-semibold text-heading">{extraDialog} ₽</span>
          </span>
        </li>
        <li className="flex items-start gap-2.5">
          <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-accent/10">
            <Check className="h-3 w-3 text-accent" />
          </span>
          <span>
            В тарифе —{" "}
            <span className="font-semibold text-heading">
              ~{effectivePerDialog} ₽ / диалог
            </span>
          </span>
        </li>
        <li className="flex items-start gap-2.5">
          <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-accent/10">
            <Check className="h-3 w-3 text-accent" />
          </span>
          <span>Канал на выбор — Web или MAX</span>
        </li>
      </ul>

      <Button
        variant={popular ? "primary" : "outline"}
        size="md"
        onClick={() => onRegister(plan)}
      >
        Начать бесплатно
      </Button>
      <button
        onClick={() => onSelect(plan)}
        className="mt-1 min-h-10 cursor-pointer px-2 text-center text-xs font-medium text-muted underline decoration-blue-subtle underline-offset-2 transition-colors hover:text-accent hover:decoration-accent/40"
      >
        Или подключим с менеджером — оставьте заявку
      </button>
    </motion.div>
  );

  if (popular) {
    return (
      <div
        className="relative rounded-2xl p-[2px]"
        style={{
          background:
            "linear-gradient(135deg, #0062EF 0%, #0097F5 50%, #00E7FD 100%)",
        }}
      >
        {card}
      </div>
    );
  }

  return card;
}

function CrossChannelCard({
  plan,
  values,
  onSelect,
}: {
  plan: PricingPlan;
  values: CrossChannelValues;
  onSelect: (plan: PricingPlan) => void;
}) {
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="group relative flex h-full flex-col rounded-2xl border border-accent/15 bg-gradient-to-br from-blue-ice/40 to-white p-6 shadow-[0_1px_3px_rgba(0,82,204,0.04),0_4px_16px_rgba(0,82,204,0.05)] transition-all duration-300 hover:border-accent/30 hover:shadow-[0_4px_12px_rgba(0,82,204,0.08),0_12px_40px_rgba(0,82,204,0.07)]"
    >
      {/* Header */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <h3 className="font-display text-sm font-bold uppercase tracking-wide text-heading sm:text-base">
          {plan.name}
          <span className="ml-1.5 text-accent">+ Второй канал</span>
        </h3>
        <span className="inline-flex items-center gap-1 rounded-md bg-accent/10 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-accent">
          <Layers className="h-3 w-3" />
          Web + MAX
        </span>
      </div>

      {/* Addon price */}
      <div className="mb-1 flex flex-wrap items-baseline gap-x-1">
        <span className="whitespace-nowrap font-display text-2xl font-bold text-heading lg:text-3xl">
          +{fmt(values.addonPrice)}&nbsp;₽
        </span>
        <span className="text-sm font-medium text-muted">/ мес</span>
      </div>
      <p className="text-sm font-medium text-accent">
        +{values.extraDialogs} диалогов во втором канале
      </p>

      <div className="my-4 h-px w-full bg-blue-subtle/60" />

      {/* Total */}
      <div className="mb-4 rounded-xl bg-white/80 px-3.5 py-2.5 ring-1 ring-blue-subtle/40">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-muted">
          Итого с тарифом
        </p>
        <p className="mt-0.5 font-display text-lg font-bold text-heading">
          <span className="whitespace-nowrap">{fmt(values.totalPrice)}&nbsp;₽</span>
          <span className="ml-1 text-sm font-medium text-muted">/ мес</span>
        </p>
        <p className="text-xs font-medium text-body">
          {values.totalDialogs} диалогов в двух каналах
        </p>
      </div>

      <p className="mb-5 text-xs text-muted">
        Доп. диалог во втором канале —{" "}
        <span className="font-semibold text-body">
          {values.extraDialogPrice} ₽
        </span>
      </p>

      <div className="mt-auto">
        <Button variant="outline" size="sm" onClick={() => onSelect(plan)}>
          Подключить
        </Button>
      </div>
    </motion.div>
  );
}

/**
 * `showHeader={false}` — на /tarify заголовок и бейдж уже есть в hero страницы,
 * второй раз их показывать не нужно.
 */
export default function Pricing({ showHeader = true }: { showHeader?: boolean }) {
  const { openForm } = useLeadForm();
  const [promoActive, setPromoActive] = useState(false);
  const [version, setVersion] = useState<AssistantVersionId>("lid");

  useEffect(() => {
    setPromoActive(isPromoActive());
    // Deep-link: /tarify?v=pro открывает линейку «Про»
    const v = new URLSearchParams(window.location.search).get("v");
    if (v === "pro" || v === "lid") setVersion(v);
  }, []);

  const switchVersion = (next: AssistantVersionId) => {
    if (next === version) return;
    setVersion(next);
    reachMetrikaGoal(metrikaGoals.versionSwitchPricing, { version_id: next });
    // Обновляем ?v= без перезагрузки — ссылкой на линейку можно поделиться
    const url = new URL(window.location.href);
    url.searchParams.set("v", next);
    window.history.replaceState(null, "", url.toString());
  };

  const handlePromoCta = () => {
    reachMetrikaGoal(metrikaGoals.promoClick);
    openForm({ versionId: version, source: "pricing_promo" });
  };

  /** «Оставьте заявку» — сразу конструктор заявки, минуя выбор пути */
  const handleSelectPlan = (plan: PricingPlan, channel?: "web" | "max" | "cross") =>
    openForm({
      planId: plan.id,
      planName: plan.name,
      channelId: channel,
      versionId: version,
      path: "request",
    });

  /** «Начать бесплатно» — форма с выбором пути (сам / через менеджера) */
  const handleRegister = (plan?: PricingPlan) =>
    openForm(
      plan
        ? { planId: plan.id, planName: plan.name, versionId: version }
        : { versionId: version }
    );

  const activeMeta = versionMeta[version];

  return (
    <SectionWrapper
      id="pricing"
      paddingClassName={
        showHeader ? undefined : "pb-24 pt-8 sm:pt-10 lg:pb-28 xl:pb-32"
      }
    >
      {/* Section header */}
      {showHeader && (
      <motion.div variants={fadeInUp} className="mb-8 text-center sm:mb-10">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5">
          <Sparkles className="h-4 w-4 text-accent" />
          <span className="text-xs font-semibold text-accent sm:text-sm">
            {/* Условия акции повторяет плашка ниже — в бейдже оставляем суть */}
            {promoActive
              ? "Первый месяц бесплатно"
              : "Первый месяц бесплатно • Подключение 0 ₽ • Отмена в любой момент"}
          </span>
        </div>
        <h2 className="font-display text-3xl font-bold text-heading sm:text-4xl lg:text-[2.75rem]">
          Тарифы <span className="whitespace-nowrap text-accent">ИИ-ассистента</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base text-body">
          Каждый тариф работает в одном канале на выбор — Web-виджет или
          MAX-мессенджер. Нужны оба сразу? Подключите{" "}
          <a
            href="#cross-channel"
            className="font-medium text-accent underline decoration-accent/30 underline-offset-2 hover:decoration-accent"
          >
            «Второй канал»
          </a>
          .
        </p>
      </motion.div>
      )}

      {/* Без заголовка секции тумблер идёт первым — подписываем, что он делает */}
      {!showHeader && (
        <motion.p
          variants={fadeInUp}
          className="mb-2.5 text-center text-xs font-semibold uppercase tracking-wide text-muted"
        >
          Выберите версию ассистента
        </motion.p>
      )}

      {/* Переключатель версий «Лид» / «Про» */}
      <motion.div variants={fadeInUp} className="mb-3 flex justify-center">
        <div
          role="tablist"
          aria-label="Версия ассистента"
          className="grid w-full max-w-md grid-cols-2 gap-1 rounded-2xl border border-blue-subtle/50 bg-surface-alt p-1.5"
        >
          {(Object.keys(versionMeta) as AssistantVersionId[]).map((id) => {
            const meta = versionMeta[id];
            const active = version === id;
            return (
              <button
                key={id}
                role="tab"
                aria-selected={active}
                onClick={() => switchVersion(id)}
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
                  <meta.Icon className="h-4 w-4" />
                  Версия «{meta.name}»
                </span>
                <span className="mt-0.5 text-[11px] font-medium text-muted sm:text-xs">
                  {meta.caption}
                </span>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Пояснение выбранной версии */}
      <motion.p
        variants={fadeInUp}
        className="mx-auto mb-10 max-w-2xl text-center text-sm text-body"
      >
        {activeMeta.blurb}{" "}
        <Link
          href="/versii"
          className="whitespace-nowrap font-medium text-accent underline decoration-accent/30 underline-offset-2 hover:decoration-accent"
        >
          Сравнить версии
        </Link>
      </motion.p>

      {/* Promo plashka */}
      {promoActive && (
        <motion.div
          variants={fadeInUp}
          className="mx-auto mb-8 max-w-3xl overflow-hidden rounded-2xl p-[1.5px]"
          style={{
            background:
              "linear-gradient(135deg, #0062EF 0%, #0097F5 55%, #00E7FD 100%)",
          }}
        >
          <div className="flex flex-col items-center gap-4 rounded-[15px] bg-white px-5 py-4 text-center sm:flex-row sm:justify-between sm:text-left">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10">
                <Sparkles className="h-5 w-5 text-accent" />
              </span>
              <div>
                <p className="font-display text-base font-bold text-heading sm:text-lg">
                  {promo.headline}
                </p>
                <p className="text-sm text-body">
                  Подключение 0 ₽ · отмена в любой момент
                </p>
              </div>
            </div>
            <div className="shrink-0">
              <Button variant="primary" size="md" onClick={handlePromoCta}>
                Успеть по акции
              </Button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Channel info banner */}
      <motion.div
        variants={fadeInUp}
        className="mx-auto mb-10 flex max-w-3xl flex-col items-center justify-center gap-3 rounded-2xl border border-blue-subtle/50 bg-surface-alt px-5 py-4 text-sm text-body sm:flex-row sm:gap-5"
      >
        <div className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white shadow-sm ring-1 ring-blue-subtle/60">
            <Globe className="h-4 w-4 text-accent" />
          </span>
          <span className="font-semibold text-heading">Web-виджет</span>
        </div>
        <span className="hidden text-muted sm:inline">или</span>
        <div className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white shadow-sm ring-1 ring-blue-subtle/60">
            <MessageSquare className="h-4 w-4 text-accent" />
          </span>
          <span className="font-semibold text-heading">MAX-мессенджер</span>
        </div>
        <span className="hidden text-muted sm:inline">·</span>
        <span className="text-center text-xs text-muted sm:text-left sm:text-sm">
          Цены и лимиты идентичны в обоих каналах
        </span>
      </motion.div>

      {/* Main plan cards */}
      <motion.div
        variants={staggerContainer}
        className="grid grid-cols-1 gap-5 pt-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
      >
        {pricingPlans.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            values={planValues(plan, version)}
            onSelect={(p) => handleSelectPlan(p)}
            onRegister={(p) => handleRegister(p)}
          />
        ))}
      </motion.div>

      {/* ── Second Channel (Cross-Channel) ─────────────────────── */}
      <motion.div
        variants={fadeInUp}
        id="cross-channel"
        className="mt-20 scroll-mt-28"
      >
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5">
            <Layers className="h-4 w-4 text-accent" />
            <span className="text-xs font-semibold uppercase tracking-wide text-accent sm:text-sm">
              Надстройка · Второй канал
            </span>
          </div>
          <h3 className="font-display text-2xl font-bold text-heading sm:text-3xl">
            Web и MAX <span className="text-accent">одновременно</span>
          </h3>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-body sm:text-base">
            Базовый тариф работает в одном канале. Если хотите использовать
            ИИ-ассистента сразу <strong className="font-semibold text-heading">и в Web-виджете на сайте, и в MAX-мессенджере</strong> — добавьте «Второй канал»
            к выбранному тарифу. Получите дополнительный лимит диалогов во
            втором канале по льготной цене. Цены — для версии «{activeMeta.name}».
          </p>
        </div>

        <motion.div
          variants={staggerContainer}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
        >
          {crossChannelAddons.map((addon) => {
            const plan = pricingPlans.find((p) => p.id === addon.planId)!;
            return (
              <CrossChannelCard
                key={addon.planId}
                plan={plan}
                values={addonValues(addon, version)}
                onSelect={(p) => handleSelectPlan(p, "cross")}
              />
            );
          })}
        </motion.div>
      </motion.div>

      {/* ── Подключение бесплатно ───────────────────────────────── */}
      <motion.div variants={fadeInUp} className="mt-20">
        <div className="mb-6 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-subtle/60 bg-white px-4 py-1.5">
            <Settings className="h-4 w-4 text-accent" />
            <span className="text-xs font-semibold uppercase tracking-wide text-primary sm:text-sm">
              Подключение · 0 ₽
            </span>
          </div>
          <h3 className="font-display text-2xl font-bold text-heading sm:text-3xl">
            Подключение и настройка — бесплатно
          </h3>
          <p className="mx-auto mt-3 max-w-xl text-sm text-body sm:text-base">
            Никаких разовых платежей ни на одном тарифе. Вы платите только
            месячную подписку — настройку и запуск мы берём на себя.
          </p>
        </div>

        {/* Что входит в подключение */}
        <motion.div
          variants={staggerContainer}
          className="mx-auto grid max-w-4xl grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4"
        >
          {[
            {
              icon: Globe,
              title: "Виджет на вашем сайте",
              text: "Настройка под фирменный стиль и установка одной строкой кода.",
            },
            {
              icon: Layers,
              title: "Интеграция с Tourvisor",
              text: "Уже подключена на нашей стороне — настраивать ничего не нужно.",
            },
            {
              icon: MessageSquare,
              title: "MAX-канал — тоже 0 ₽",
              text: "Зарегистрируйтесь в MAX Бизнес — у вас появится свой чат-бот, и мы подключим его к ассистенту.",
            },
            {
              icon: Inbox,
              title: "Заявки — в CRM и на почту",
              text: "Контакты клиентов из диалогов приходят на почту и передаются в вашу CRM по API.",
            },
          ].map((item) => (
            <motion.div
              key={item.title}
              variants={fadeInUp}
              className="flex items-start gap-3 rounded-xl border border-blue-subtle/40 bg-white px-4 py-3.5"
            >
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-accent/10">
                <item.icon className="h-4 w-4 text-accent" />
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-heading">{item.title}</p>
                <p className="mt-0.5 text-sm text-body">{item.text}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Small disclaimer */}
        <motion.p
          variants={fadeInUp}
          className="mx-auto mt-6 flex max-w-2xl items-start justify-center gap-1.5 text-center text-xs text-muted"
        >
          <Info className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" />
          <span>
            Все цены указаны с НДС — налог уже включён в стоимость подписок.
            Подписка списывается ежемесячно, разовых платежей за подключение нет.
          </span>
        </motion.p>
      </motion.div>

      {/* CTA */}
      <motion.div
        variants={fadeInUp}
        className="mt-14 flex flex-col items-center gap-3"
      >
        <Button variant="primary" size="lg" onClick={() => handleRegister()}>
          <span className="flex items-center gap-2">
            Начать бесплатно — подключение за 2 минуты
            <ArrowRight className="h-4 w-4" />
          </span>
        </Button>
        <button
          onClick={() => openForm({ versionId: version, path: "request" })}
          className="min-h-10 cursor-pointer px-3 text-sm font-medium text-muted underline decoration-blue-subtle underline-offset-2 transition-colors hover:text-accent hover:decoration-accent/40"
        >
          Нужна помощь с подключением? Оставьте заявку
        </button>
      </motion.div>
    </SectionWrapper>
  );
}
