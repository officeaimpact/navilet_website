"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeInUp, scaleIn } from "@/lib/animations";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import RealDashboardFrame from "./RealDashboardFrame";
import RealOverviewContent from "./RealOverviewContent";
import { useLeadForm } from "@/contexts/LeadFormContext";

export default function DashboardHero() {
  const { openForm } = useLeadForm();
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="pointer-events-none absolute -right-40 -top-40 h-[700px] w-[700px] rounded-full bg-[#00E7FD]/[0.07] blur-[120px]" />
      <div className="pointer-events-none absolute -left-20 top-1/3 h-[500px] w-[500px] rounded-full bg-[#0097F5]/[0.05] blur-[100px]" />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-12 px-5 pt-32 pb-20 sm:px-6 lg:flex-row lg:items-start lg:gap-12 lg:px-8 lg:pt-36 lg:pb-24">
        {/* Left: content */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-1 flex-col items-center text-center lg:items-start lg:pt-8 lg:text-left"
        >
          <Badge className="mb-6">Личный кабинет</Badge>

          <motion.h1
            variants={fadeInUp}
            className="mb-6 font-display text-4xl font-bold leading-[1.1] text-heading sm:text-5xl lg:text-[3.5rem]"
            style={{ letterSpacing: "-0.02em" }}
          >
            Полный контроль над вашим{" "}
            <span className="text-accent">AI-ассистентом</span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="mb-8 max-w-xl text-lg leading-relaxed text-body"
          >
            Аналитика в реальном времени, управление диалогами, кастомизация
            виджета и мониторинг системы — всё в одном личном кабинете.
            Принимайте решения на основе данных.
          </motion.p>

          <motion.div variants={fadeInUp} className="mb-10 flex flex-wrap gap-4">
            <Button variant="primary" size="lg" onClick={() => openForm()}>
              Попробовать бесплатно
            </Button>
            <Button variant="outline" size="lg" href="/#demo">
              Посмотреть демо
            </Button>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap items-center gap-6 text-sm text-muted"
          >
            {[
              "15+ типов графиков",
              "Экспорт CSV",
              "White-label виджет",
              "24/7 мониторинг",
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
          </motion.div>
        </motion.div>

        {/* Right: real dashboard */}
        <motion.div
          variants={scaleIn}
          initial="hidden"
          animate="visible"
          className="w-full flex-shrink-0 lg:w-[620px]"
        >
          <div className="relative">
            <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-[#0097F5]/8 to-[#00E7FD]/8 blur-xl" />
            <RealDashboardFrame
              activeScreen="overview"
              className="relative"
              animate={false}
            >
              <RealOverviewContent />
            </RealDashboardFrame>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
