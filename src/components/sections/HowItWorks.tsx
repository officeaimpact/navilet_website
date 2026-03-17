"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { howItWorks } from "@/lib/content";
import SectionWrapper from "@/components/ui/SectionWrapper";
import {
  MessagesSquare,
  Search,
  LayoutGrid,
  CheckCircle,
} from "lucide-react";

const iconMap = {
  MessagesSquare,
  Search,
  LayoutGrid,
  CheckCircle,
} as const;

function TimelineStep({
  step,
  title,
  description,
  icon,
  index,
  total,
}: (typeof howItWorks)[0] & { index: number; total: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const Icon = iconMap[icon];

  return (
    <motion.div
      ref={ref}
      variants={fadeInUp}
      className="relative flex flex-col items-center text-center"
    >
      {/* Connecting line with arrow (desktop) */}
      {index < total - 1 && (
        <div className="absolute left-[calc(50%+28px)] top-7 hidden h-0.5 w-[calc(100%-56px)] lg:block">
          <div className="h-full w-full bg-blue-subtle absolute top-0 left-0 -z-10" />
          <motion.div
            className="relative h-full bg-gradient-to-r from-accent to-accent-light"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            style={{ transformOrigin: "left" }}
          >
            <svg
              className="absolute -right-2 top-1/2 -translate-y-1/2"
              width="10"
              height="12"
              viewBox="0 0 10 12"
              fill="none"
            >
              <path d="M1 1L8 6L1 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent-light" />
            </svg>
          </motion.div>
        </div>
      )}

      {/* Step number circle */}
      <motion.div
        className="relative z-10 mb-5 flex h-14 w-14 items-center justify-center rounded-full border-2"
        animate={
          isInView
            ? {
                borderColor: "#0097F5",
                backgroundColor: "#0097F5",
                color: "#ffffff",
              }
            : {
                borderColor: "#CCF2FF",
                backgroundColor: "#E8F9FF",
                color: "#0097F5",
              }
        }
        transition={{ duration: 0.5, delay: index * 0.15 }}
      >
        <span className="font-display text-lg font-bold">{step}</span>
      </motion.div>

      {/* Icon */}
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-ice">
        <Icon className="h-6 w-6 text-accent" />
      </div>

      {/* Text */}
      <h3 className="mb-2 font-display text-lg font-semibold text-heading">
        {title}
      </h3>
      <p className="max-w-[260px] text-sm leading-relaxed text-body">
        {description}
      </p>
    </motion.div>
  );
}

export default function HowItWorks() {
  return (
    <SectionWrapper id="how-it-works">
      <motion.div variants={fadeInUp} className="mb-16 text-center">
        <h2 className="font-display text-3xl font-bold text-heading sm:text-4xl lg:text-[2.75rem]">
          От первого сообщения до готового предложения <span className="text-accent sm:whitespace-nowrap">за 30 секунд</span>
        </h2>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6"
      >
        {howItWorks.map((step, i) => (
          <TimelineStep
            key={step.step}
            {...step}
            index={i}
            total={howItWorks.length}
          />
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
