"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  fadeInUp,
  slideInLeft,
  slideInRight,
} from "@/lib/animations";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Button from "@/components/ui/Button";
import RealDashboardFrame from "@/components/dashboard/RealDashboardFrame";
import RealOverviewContent from "@/components/dashboard/RealOverviewContent";
import {
  BarChart3,
  MessageSquare,
  Palette,
  Activity,
  ArrowRight,
} from "lucide-react";

const miniFeatures = [
  {
    icon: BarChart3,
    title: "Аналитика в реальном времени",
    description: "15+ графиков, воронки, тепловые карты, экспорт CSV",
  },
  {
    icon: MessageSquare,
    title: "Управление диалогами",
    description: "Chat replay, профиль клиента, фильтры и поиск",
  },
  {
    icon: Palette,
    title: "Кастомизация виджета",
    description: "Цвета, логотип, аватары — белый лейбл под ваш бренд",
  },
  {
    icon: Activity,
    title: "Мониторинг системы",
    description: "Статус инфраструктуры, AI-ассистенты, аптайм",
  },
];

export default function DashboardPromo() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <SectionWrapper id="dashboard">
      <motion.div variants={fadeInUp} className="mb-12 text-center">
        <h2 className="font-display text-3xl font-bold text-heading sm:text-4xl lg:text-[2.75rem]">
          Личный кабинет —{" "}
          <span className="text-accent">аналитика и управление</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base text-body sm:text-lg">
          Полный контроль над AI-ассистентом: метрики, диалоги, настройка
          виджета — всё в одном месте
        </p>
      </motion.div>

      <div
        ref={ref}
        className="grid gap-10 lg:grid-cols-2 lg:gap-14 items-center"
      >
        {/* Left: feature cards */}
        <motion.div
          variants={slideInLeft}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {miniFeatures.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={i}
                className="rounded-xl border border-blue-subtle/60 bg-white p-4 transition-colors hover:border-accent/30 hover:shadow-card-hover"
              >
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-blue-ice">
                  <Icon className="h-4 w-4 text-accent" />
                </div>
                <h3 className="mb-1 font-display text-sm font-semibold text-heading">
                  {feature.title}
                </h3>
                <p className="text-xs leading-relaxed text-body">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </motion.div>

        {/* Right: real dashboard compact preview */}
        <motion.div
          variants={slideInRight}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <RealDashboardFrame
            activeScreen="overview"
            animate={false}
            compact
          >
            <RealOverviewContent compact />
          </RealDashboardFrame>
        </motion.div>
      </div>

      <motion.div
        variants={fadeInUp}
        className="mt-10 text-center"
      >
        <Button variant="primary" size="lg" href="/dashboard">
          <span className="flex items-center gap-2">
            Подробнее о личном кабинете
            <ArrowRight className="h-4 w-4" />
          </span>
        </Button>
      </motion.div>
    </SectionWrapper>
  );
}
