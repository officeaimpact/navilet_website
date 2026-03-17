"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { features } from "@/lib/content";
import SectionWrapper from "@/components/ui/SectionWrapper";
import {
  Globe,
  Flame,
  Building2,
  Info,
  Plane,
  BadgeRussianRuble,
  Car,
  Shield,
  GitBranch,
  ArrowLeftRight,
  Users,
  HelpCircle,
} from "lucide-react";

const iconMap = {
  Globe,
  Flame,
  Building2,
  Info,
  Plane,
  BadgeRussianRuble,
  Car,
  Shield,
  GitBranch,
  ArrowLeftRight,
  Users,
  HelpCircle,
} as const;

export default function Features() {
  return (
    <SectionWrapper id="features" alt>
      <motion.div variants={fadeInUp} className="mb-16 text-center">
        <h2 className="font-display text-3xl font-bold text-heading sm:text-4xl lg:text-[2.75rem]">
          Возможности AI-турменеджера —{" "}
          <span className="text-accent">быстрее живого менеджера в 10 раз</span>
        </h2>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {features.map((feature, i) => {
          const Icon = iconMap[feature.icon];
          return (
            <motion.div
              key={i}
              variants={fadeInUp}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="group relative overflow-hidden rounded-2xl border border-blue-subtle/50 bg-white p-6 shadow-[0_1px_3px_rgba(0,82,204,0.04),0_4px_16px_rgba(0,82,204,0.05)] transition-all duration-300 hover:border-accent/25 hover:shadow-[0_4px_12px_rgba(0,82,204,0.08),0_12px_40px_rgba(0,82,204,0.07)]"
            >
              <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-accent/[0.04] transition-all duration-500 group-hover:scale-[1.8] group-hover:bg-accent/[0.07]" />
              <div className="relative h-full">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-ice transition-colors duration-300 group-hover:bg-accent/10">
                  <Icon className="h-5 w-5 text-accent transition-transform duration-300 group-hover:scale-110" />
                </div>
                <h3 className="mb-2 font-display text-base font-semibold text-heading">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-body">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </SectionWrapper>
  );
}
