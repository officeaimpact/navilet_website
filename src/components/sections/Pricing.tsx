"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { pricingPlans } from "@/lib/content";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Button from "@/components/ui/Button";
import { Check, Sparkles, Settings, ArrowRight } from "lucide-react";
import { useLeadForm } from "@/contexts/LeadFormContext";

function PlanCard({
  plan,
  onSelect,
}: {
  plan: (typeof pricingPlans)[0];
  onSelect: (name: string) => void;
}) {
  const { name, price, dialogs, popular, features } = plan;

  const card = (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={`group relative flex h-full flex-col items-center text-center rounded-2xl bg-white p-6 transition-all duration-300 sm:items-start sm:text-left lg:p-7 ${
        popular
          ? "shadow-[0_4px_24px_rgba(0,82,204,0.12)] hover:shadow-[0_8px_40px_rgba(0,82,204,0.16)]"
          : "border border-blue-subtle/50 shadow-[0_1px_3px_rgba(0,82,204,0.04),0_4px_16px_rgba(0,82,204,0.05)] hover:border-accent/25 hover:shadow-[0_4px_12px_rgba(0,82,204,0.08),0_12px_40px_rgba(0,82,204,0.07)]"
      }`}
    >
      {popular && (
        <div className="absolute -top-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1 rounded-full bg-gradient-to-r from-[#0062EF] to-[#0097F5] px-3 py-1 text-xs font-bold text-white shadow-md sm:left-auto sm:right-5 sm:translate-x-0">
          <Sparkles className="h-3 w-3" />
          Популярный
        </div>
      )}

      <div className="mb-5">
        <h3 className="mb-3 font-display text-lg font-bold text-heading">
          {name}
        </h3>
        <div className="flex items-baseline gap-1 justify-center sm:justify-start">
          <span className="font-display text-3xl font-bold text-heading lg:text-4xl">
            {price}
          </span>
          <span className="text-sm font-medium text-muted">₽/мес</span>
        </div>
        <p className="mt-2 text-sm font-medium text-accent">
          {dialogs} диалогов/мес
        </p>
      </div>

      <div className="mb-6 h-px w-full bg-blue-subtle/60" />

      <ul className="mb-8 max-w-fit flex-1 space-y-3 text-left sm:max-w-none">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5">
            <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-accent/10">
              <Check className="h-3 w-3 text-accent" />
            </span>
            <span className="text-sm leading-snug text-body">{feature}</span>
          </li>
        ))}
      </ul>

      <div className="flex w-full justify-center sm:justify-start">
        <Button
          variant={popular ? "primary" : "outline"}
          size="md"
          onClick={() => onSelect(name)}
        >
          Выбрать
        </Button>
      </div>
    </motion.div>
  );

  if (popular) {
    return (
      <div
        className="relative rounded-2xl p-[2px]"
        style={{
          background: "linear-gradient(135deg, #0062EF 0%, #0097F5 50%, #00E7FD 100%)",
        }}
      >
        {card}
      </div>
    );
  }

  return card;
}

export default function Pricing() {
  const { openForm } = useLeadForm();

  return (
    <SectionWrapper id="pricing">
      <motion.div variants={fadeInUp} className="mb-12 text-center">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5">
          <Sparkles className="h-4 w-4 text-accent" />
          <span className="text-xs font-semibold text-accent sm:text-sm">
            7 дней бесплатно • Без карты • Отмена в любой момент
          </span>
        </div>
        <h2 className="font-display text-3xl font-bold text-heading sm:text-4xl lg:text-[2.75rem]">
          Тарифы <span className="text-accent">AI-турменеджера</span>
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-base text-body">
          Диалоги — это обращения клиентов, которые обработал AI-ассистент
        </p>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {pricingPlans.map((plan) => (
          <PlanCard
            key={plan.name}
            plan={plan}
            onSelect={(name) => openForm(name)}
          />
        ))}
      </motion.div>

      {/* Installation fee */}
      <motion.div
        variants={fadeInUp}
        className="mx-auto mt-10 flex max-w-2xl flex-col items-center gap-3 rounded-2xl border border-blue-subtle/40 bg-surface-alt p-5 text-center sm:flex-row sm:gap-4 sm:text-left"
      >
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-accent/10">
          <Settings className="h-5 w-5 text-accent" />
        </div>
        <div>
          <p className="text-sm font-semibold text-heading">
            Установочный платёж — 14 990 ₽{" "}
            <span className="font-normal text-muted">(разовый)</span>
          </p>
          <p className="mt-0.5 text-sm text-body">
            Включает полную настройку ассистента и подключение к личному
            кабинету.
          </p>
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div
        variants={fadeInUp}
        className="mt-10 flex justify-center"
      >
        <Button variant="primary" size="lg" onClick={() => openForm()}>
          <span className="flex items-center gap-2">
            Начать бесплатно
            <ArrowRight className="h-4 w-4" />
          </span>
        </Button>
      </motion.div>
    </SectionWrapper>
  );
}
