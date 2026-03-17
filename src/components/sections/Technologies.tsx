"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { technologies } from "@/lib/content";
import SectionWrapper from "@/components/ui/SectionWrapper";
import {
  Brain,
  Database,
  ShieldCheck,
  Zap,
  Palette,
  Share2,
  HardDrive,
} from "lucide-react";

const iconMap = {
  Brain,
  Database,
  ShieldCheck,
  Zap,
  Palette,
  Share2,
  HardDrive,
} as const;

function NeuralDots() {
  return (
    <div className="absolute right-4 top-4 h-32 w-32 opacity-30">
      <svg viewBox="0 0 100 100" className="h-full w-full">
        {[
          [20, 20],
          [50, 15],
          [80, 25],
          [30, 50],
          [60, 45],
          [85, 55],
          [25, 80],
          [55, 75],
          [75, 85],
        ].map(([cx, cy], i) => (
          <g key={i}>
            <motion.circle
              cx={cx}
              cy={cy}
              r="3"
              fill="#00E7FD"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.25,
              }}
            />
            {i > 0 && (
              <line
                x1={[20, 50, 80, 30, 60, 85, 25, 55, 75][i - 1]}
                y1={[20, 15, 25, 50, 45, 55, 80, 75, 85][i - 1]}
                x2={cx}
                y2={cy}
                stroke="#00E7FD"
                strokeWidth="0.5"
                opacity="0.3"
              />
            )}
          </g>
        ))}
      </svg>
    </div>
  );
}

export default function Technologies() {
  return (
    <SectionWrapper id="tech">
      <motion.div variants={fadeInUp} className="mb-16 text-center">
        <h2 className="font-display text-3xl font-bold text-heading sm:text-4xl lg:text-[2.75rem]">
          Технологии AI-ассистента:{" "}
          <span className="text-accent">надёжная</span> AI-система для туризма
        </h2>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
      >
        {technologies.map((tech, i) => {
          const Icon = iconMap[tech.icon];
          const isLarge = tech.size === "large";
          const isMedium = tech.size === "medium";

          return (
            <motion.div
              key={i}
              variants={fadeInUp}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className={`group relative overflow-hidden rounded-2xl border border-blue-subtle/60 p-6 shadow-[0_1px_3px_rgba(0,82,204,0.04),0_4px_16px_rgba(0,82,204,0.05)] transition-all duration-300 hover:border-accent/30 hover:shadow-[0_4px_12px_rgba(0,82,204,0.08),0_12px_40px_rgba(0,82,204,0.07)] ${
                isLarge
                  ? "sm:col-span-2 lg:col-span-2 lg:row-span-2 text-white lg:p-8"
                  : isMedium
                    ? "bg-white"
                    : "bg-blue-ice"
              }`}
              style={isLarge ? { background: "linear-gradient(135deg, #0052CC 0%, #0097F5 60%, #00CCF5 100%)" } : undefined}
            >
              {isLarge && <NeuralDots />}

              <div
                className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl ${
                  isLarge
                    ? "bg-white/15"
                    : "bg-blue-ice group-hover:bg-accent/10"
                } transition-colors duration-300`}
              >
                <Icon
                  className={`h-5 w-5 transition-transform duration-300 group-hover:scale-110 ${isLarge ? "text-white" : "text-accent"}`}
                />
              </div>

              <h3
                className={`mb-2 font-display font-semibold ${
                  isLarge ? "text-xl text-white" : "text-base text-heading"
                }`}
              >
                {tech.title}
              </h3>
              <p
                className={`text-sm leading-relaxed ${
                  isLarge ? "text-white/75" : "text-body"
                }`}
              >
                {tech.description}
              </p>
            </motion.div>
          );
        })}
      </motion.div>
    </SectionWrapper>
  );
}
