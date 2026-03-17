"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  fadeInUp,
  staggerContainer,
  slideInLeft,
  slideInRight,
} from "@/lib/animations";
import { useLeadForm } from "@/contexts/LeadFormContext";
import { demoScenarios } from "@/lib/scenarios";
import type { DemoScenario } from "@/lib/scenarios";
import DemoWidget from "@/components/DemoWidget";
import {
  Globe,
  Flame,
  Building2,
  Car,
  HelpCircle,
  Phone,
  ArrowRight,
} from "lucide-react";
import Button from "@/components/ui/Button";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Globe,
  Flame,
  Building2,
  Car,
  HelpCircle,
  Phone,
};

function ScenarioButton({
  scenario,
  isActive,
  onClick,
}: {
  scenario: DemoScenario;
  isActive: boolean;
  onClick: () => void;
}) {
  const Icon = iconMap[scenario.icon];

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.015 }}
      whileTap={{ scale: 0.98 }}
      className={`group flex w-full cursor-pointer items-center gap-4 rounded-2xl border-2 px-5 py-5 text-left transition-all duration-200 ${
        isActive
          ? "border-accent/40 bg-gradient-to-r from-[#0097F5]/10 to-[#00E7FD]/5 shadow-md"
          : "border-transparent bg-white shadow-sm hover:border-accent/15 hover:shadow-md"
      }`}
    >
      <div
        className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl transition-all ${
          isActive
            ? "bg-gradient-to-br from-[#0062EF] to-[#0097F5] text-white shadow-md"
            : "bg-blue-ice text-accent group-hover:bg-accent/10"
        }`}
      >
        <Icon className="h-6 w-6" />
      </div>
      <div className="min-w-0 flex-1">
        <div
          className={`text-[15px] font-bold transition-colors ${
            isActive ? "text-accent" : "text-heading"
          }`}
        >
          {scenario.title}
        </div>
        <div className="mt-0.5 text-[13px] leading-snug text-muted">
          {scenario.subtitle}
        </div>
      </div>
      {isActive && (
        <motion.div
          layoutId="demoActiveIndicator"
          className="h-2.5 w-2.5 flex-shrink-0 rounded-full bg-accent"
          transition={{ duration: 0.2 }}
        />
      )}
    </motion.button>
  );
}

export default function LiveDemo() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { openForm } = useLeadForm();
  const [activeScenario, setActiveScenario] = useState<DemoScenario | null>(
    null
  );

  const handleScenarioClick = (scenario: DemoScenario) => {
    if (activeScenario?.id === scenario.id) {
      setActiveScenario(null);
      setTimeout(() => setActiveScenario(scenario), 50);
    } else {
      setActiveScenario(scenario);
    }
  };

  return (
    <section
      id="demo"
      ref={ref}
      className="relative overflow-hidden border-t border-blue-subtle/30 bg-surface-alt"
    >
      <div className="pointer-events-none absolute -left-40 top-1/3 h-[500px] w-[500px] rounded-full bg-[#0097F5]/[0.04] blur-[120px]" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-[400px] w-[400px] rounded-full bg-[#00E7FD]/[0.03] blur-[100px]" />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="relative mx-auto max-w-7xl px-5 py-24 sm:px-6 lg:px-8 lg:py-28"
      >
        {/* Section header */}
        <motion.div variants={fadeInUp} className="mb-12 text-center lg:mb-16">
          <h2 className="font-display text-3xl font-bold text-heading sm:text-4xl lg:text-[2.75rem]">
            Демонстрация{" "}
            <span className="bg-gradient-to-r from-[#0062EF] to-[#00E7FD] bg-clip-text text-transparent">
              AI-турменеджера
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base text-body">
            Выберите сценарий и посмотрите, как AI-ассистент обрабатывает
            реальные запросы клиентов
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div className="flex flex-col items-start gap-8 lg:flex-row lg:gap-10">
          {/* Widget (second on mobile, first on desktop) */}
          <motion.div
            variants={slideInLeft}
            className="order-2 w-full flex-shrink-0 lg:order-1 lg:w-[440px]"
          >
            <div className="relative">
              <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-[#0097F5]/8 to-[#00E7FD]/8 blur-xl" />
              <DemoWidget scenario={activeScenario} className="relative" />
            </div>
          </motion.div>

          {/* Scenario selector (first on mobile, second on desktop) */}
          <motion.div
            variants={slideInRight}
            className="order-1 w-full flex-1 lg:order-2"
          >
            <div className="mb-6">
              <h3 className="mb-1 font-display text-xl font-bold text-heading">
                Выберите сценарий
              </h3>
              <p className="text-sm text-muted">
                Каждый демонстрирует отдельную возможность ассистента
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {demoScenarios.map((scenario) => (
                <ScenarioButton
                  key={scenario.id}
                  scenario={scenario}
                  isActive={activeScenario?.id === scenario.id}
                  onClick={() => handleScenarioClick(scenario)}
                />
              ))}
            </div>

            {/* Info note */}
            <motion.div
              variants={fadeInUp}
              className="mt-6 rounded-2xl border border-blue-subtle/40 bg-white p-5 shadow-sm"
            >
              <p className="text-[13px] leading-relaxed text-muted">
                <span className="font-semibold text-body">
                  Это сокращённая демонстрация.
                </span>{" "}
                В рабочей версии AI-ассистент отвечает более человекоподобно
                и детально, подключён к реальной базе туроператоров
                и показывает актуальные цены в момент запроса. Виджет
                встраивается на ваш сайт одной строкой кода.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="mt-4 flex justify-center">
              <Button variant="primary" size="md" onClick={() => openForm()}>
                <span className="flex items-center gap-2">
                  Подключить на свой сайт
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
