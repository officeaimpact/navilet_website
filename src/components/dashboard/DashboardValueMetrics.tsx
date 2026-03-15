"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { Activity, BarChart3, Palette, Shield } from "lucide-react";

const items = [
  {
    icon: Activity,
    title: "В реальном времени",
    description: "Аналитика обновляется автоматически — метрики, графики, инсайты",
  },
  {
    icon: BarChart3,
    title: "15+ типов графиков",
    description: "Тепловые карты, воронки, распределения, тренды, матрицы",
  },
  {
    icon: Palette,
    title: "Полная кастомизация",
    description: "Цвета, логотип, аватар, приветственное сообщение — ваш бренд",
  },
  {
    icon: Shield,
    title: "24/7 мониторинг",
    description: "Статус инфраструктуры, здоровье системы, аптайм ассистента",
  },
];

export default function DashboardValueMetrics() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #002152 0%, #0062EF 40%, #0097F5 70%, #00CCF5 100%)",
      }}
    >
      <div className="noise-overlay pointer-events-none absolute inset-0 opacity-20" />
      <div className="pointer-events-none absolute -left-32 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-[#00E7FD]/10 blur-[120px]" />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="relative mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8 lg:py-20"
      >
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div key={i} variants={fadeInUp} className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
                  <Icon className="h-7 w-7 text-white" strokeWidth={1.5} />
                </div>
                <h3 className="mb-2 font-display text-lg font-bold text-white">
                  {item.title}
                </h3>
                <p className="text-sm text-white/60">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
