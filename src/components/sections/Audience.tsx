"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { audiences } from "@/lib/content";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { Store, Briefcase, Monitor, ArrowRight } from "lucide-react";
import { useLeadForm } from "@/contexts/LeadFormContext";

const iconMap = {
  Store,
  Briefcase,
  Monitor,
} as const;

const accentColors = [
  "from-[#0062EF] to-[#0097F5]",
  "from-[#0097F5] to-[#00E7FD]",
  "from-[#0052CC] to-[#0062EF]",
];

export default function Audience() {
  const { openForm } = useLeadForm();
  return (
    <SectionWrapper id="audience" alt>
      <motion.div variants={fadeInUp} className="mb-16 text-center">
        <h2 className="font-display text-3xl font-bold text-heading sm:text-4xl lg:text-[2.75rem]">
          Кому подходит{" "}
          <span className="text-accent">AI-турменеджер навылет AI</span>
        </h2>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        className="grid grid-cols-1 gap-6 md:grid-cols-3"
      >
        {audiences.map((audience, i) => {
          const Icon = iconMap[audience.icon];
          return (
            <motion.div
              key={i}
              variants={fadeInUp}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="group relative overflow-hidden rounded-2xl border border-blue-subtle/50 bg-white shadow-[0_1px_3px_rgba(0,82,204,0.04),0_4px_16px_rgba(0,82,204,0.05)] transition-all duration-300 hover:border-accent/25 hover:shadow-[0_4px_12px_rgba(0,82,204,0.08),0_12px_40px_rgba(0,82,204,0.07)]"
            >
              <div
                className={`h-1.5 bg-gradient-to-r ${accentColors[i]}`}
              />

              <div className="p-6 lg:p-8">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-ice transition-colors duration-300 group-hover:bg-accent/10">
                  <Icon className="h-7 w-7 text-accent transition-transform duration-300 group-hover:scale-110" />
                </div>

                <h3 className="mb-1 font-display text-xl font-bold text-heading">
                  {audience.title}
                </h3>
                <p className="mb-4 text-sm font-medium text-accent">
                  {audience.subtitle}
                </p>
                <p className="mb-6 text-sm leading-relaxed text-body">
                  {audience.description}
                </p>

                <button
                  onClick={() => openForm()}
                  className="inline-flex cursor-pointer items-center gap-1.5 text-sm font-semibold text-accent transition-colors hover:text-accent-hover"
                >
                  Подробнее
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </SectionWrapper>
  );
}
