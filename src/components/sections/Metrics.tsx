"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { metrics } from "@/lib/content";
import CountUp from "@/components/ui/CountUp";

export default function Metrics() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #002152 0%, #0062EF 40%, #0097F5 70%, #00CCF5 100%)" }}>
      <div className="noise-overlay pointer-events-none absolute inset-0 opacity-20" />

      {/* Decorative blurs */}
      <div className="pointer-events-none absolute -left-32 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-[#00E7FD]/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 top-0 h-[300px] w-[300px] rounded-full bg-[#0062EF]/15 blur-[100px]" />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="relative mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-24"
      >
        <motion.div variants={fadeInUp} className="mb-14 text-center">
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
            Результаты на реальных данных
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 sm:gap-8 lg:grid-cols-4">
          {metrics.map((metric, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              className="text-center"
            >
              <div className="mb-3 font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                <CountUp
                  end={metric.value}
                  prefix={metric.prefix}
                  suffix={metric.suffix}
                  duration={2.5}
                />
              </div>
              <p className="text-sm font-medium text-white/60 sm:text-base">
                {metric.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Secondary metrics */}
        <motion.div
          variants={fadeInUp}
          className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-t border-white/10 pt-10"
        >
          {[
            "10 функций API",
            "50+ стран",
            "500+ курортов",
            "15+ safety-nets",
            "Группы до 9 чел",
          ].map((item) => (
            <span
              key={item}
              className="text-sm font-medium text-white/40"
            >
              {item}
            </span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
