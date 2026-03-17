"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  fadeInUp,
  slideInLeft,
  slideInRight,
  staggerContainer,
} from "@/lib/animations";
import { problems, solutionText } from "@/lib/content";
import { TrendingDown, Clock, MessageSquare, ArrowRight, Sparkles } from "lucide-react";

const iconMap = {
  TrendingDown,
  Clock,
  MessageSquare,
} as const;

export default function ProblemSolution() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="problem"
      ref={ref}
      className="relative overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, #001229 0%, #002152 25%, #0062EF 55%, #0097F5 80%, #00D4F5 100%)",
      }}
    >
      <div className="noise-overlay pointer-events-none absolute inset-0 opacity-15" />
      <div className="pointer-events-none absolute -right-40 top-0 h-[500px] w-[500px] rounded-full bg-[#00E7FD]/10 blur-[150px]" />
      <div className="pointer-events-none absolute -left-20 bottom-0 h-[400px] w-[400px] rounded-full bg-[#0062EF]/10 blur-[100px]" />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="relative mx-auto max-w-7xl px-5 py-24 sm:px-6 lg:px-8 lg:py-28 xl:py-32"
      >
        <motion.div variants={fadeInUp} className="mb-16 text-center">
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl lg:text-[2.75rem]">
            Турагентства теряют{" "}
            <span className="text-[#00E7FD]">70% заявок</span> из-за скорости
            ответа
          </h2>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Problems */}
          <motion.div variants={slideInLeft} className="space-y-5">
            {problems.map((problem, i) => {
              const Icon = iconMap[problem.icon];
              return (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="group flex gap-5 rounded-2xl border border-white/20 bg-white p-6 shadow-lg shadow-black/5 transition-all duration-300 hover:shadow-xl hover:shadow-black/10 cursor-default"
                >
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-accent/10 transition-colors duration-300 group-hover:bg-accent/15">
                    <Icon className="h-6 w-6 text-accent transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <div>
                    <div className="mb-1 flex items-baseline gap-2">
                      <span className="font-display text-2xl font-bold text-heading">
                        {problem.stat}
                      </span>
                      <span className="text-sm font-semibold text-body">
                        {problem.title}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-muted">
                      {problem.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Solution */}
          <motion.div
            variants={slideInRight}
            className="flex flex-col justify-center"
          >
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="group relative rounded-2xl border border-white/20 bg-white p-8 shadow-lg shadow-black/5 transition-all duration-300 hover:shadow-xl hover:shadow-black/10 cursor-default lg:p-10"
            >
              <div className="absolute -right-3 -top-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#00E7FD] to-accent shadow-lg shadow-accent/30">
                <Sparkles className="h-7 w-7 text-white" />
              </div>

              <h3 className="mb-4 font-display text-2xl font-bold leading-tight text-heading">
                {solutionText.title}
              </h3>
              <p className="mb-6 text-base leading-relaxed text-body">
                {solutionText.description}
              </p>

              <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-heading">
                {["Сообщение", "AI-анализ", "Поиск", "Результат"].map(
                  (step, i) => (
                    <div key={step} className="flex items-center gap-3">
                      <span className="rounded-lg bg-accent/10 px-3 py-1.5 text-accent font-semibold">
                        {step}
                      </span>
                      {i < 3 && (
                        <ArrowRight className="hidden h-4 w-4 text-accent/40 sm:block" />
                      )}
                    </div>
                  )
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
