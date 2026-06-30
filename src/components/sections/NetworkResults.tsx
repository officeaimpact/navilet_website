"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { networkResults } from "@/lib/content";
import CountUp from "@/components/ui/CountUp";

export default function NetworkResults() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const r = networkResults;

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #001229 0%, #002152 35%, #0062EF 75%, #0097F5 100%)",
      }}
    >
      <div className="noise-overlay pointer-events-none absolute inset-0 opacity-20" />
      <div className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#00E7FD]/10 blur-[150px]" />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-[320px] w-[320px] rounded-full bg-[#0062EF]/15 blur-[120px]" />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="relative mx-auto max-w-5xl px-5 py-20 text-center sm:px-6 lg:px-8 lg:py-28"
      >
        {/* Eyebrow */}
        <motion.span
          variants={fadeInUp}
          className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-white/80 backdrop-blur-sm"
        >
          {r.eyebrow}
        </motion.span>

        {/* Hero sum */}
        <motion.div
          variants={fadeInUp}
          className="mt-7 font-display text-5xl font-bold leading-none text-white sm:text-6xl lg:text-7xl"
          style={{ letterSpacing: "-0.03em" }}
        >
          <CountUp
            end={r.heroValue}
            decimals={r.heroDecimals}
            prefix={r.heroPrefix}
            suffix={r.heroSuffix}
            duration={2.2}
          />
        </motion.div>
        <motion.p
          variants={fadeInUp}
          className="mx-auto mt-4 max-w-xl text-lg font-medium text-white/85"
        >
          {r.heroLabel}
        </motion.p>
        <motion.p
          variants={fadeInUp}
          className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-white/55"
        >
          {r.description}
        </motion.p>

        {/* Hard stats */}
        <motion.div
          variants={fadeInUp}
          className="mt-12 grid grid-cols-2 gap-x-4 gap-y-8 border-t border-white/10 pt-10 lg:grid-cols-4"
        >
          {r.stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display text-3xl font-bold text-white sm:text-4xl">
                <CountUp
                  end={s.value}
                  prefix={s.prefix}
                  suffix={s.suffix}
                  separator={s.separator}
                  duration={2.4}
                />
              </div>
              <p className="mt-2 text-sm font-medium text-white/55">{s.label}</p>
            </div>
          ))}
        </motion.div>

        {/* CPL line */}
        <motion.p
          variants={fadeInUp}
          className="mt-9 text-sm font-semibold text-[#66F0FF]"
        >
          {r.cplLine}
        </motion.p>

        {/* Clients */}
        <motion.div
          variants={fadeInUp}
          className="mt-10 border-t border-white/10 pt-8"
        >
          <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-white/40">
            {r.clientsLabel}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {r.clients.map((c) => (
              <span
                key={c}
                className="rounded-full border border-white/15 bg-white/[0.07] px-4 py-2 text-sm font-medium text-white/85 backdrop-blur-sm"
              >
                {c}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Footnote */}
        <motion.p
          variants={fadeInUp}
          className="mx-auto mt-8 max-w-2xl text-[11px] leading-relaxed text-white/35"
        >
          {r.footnote}
        </motion.p>
      </motion.div>
    </section>
  );
}
