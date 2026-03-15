"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import Button from "@/components/ui/Button";
import { useLeadForm } from "@/contexts/LeadFormContext";

export default function DashboardCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { openForm } = useLeadForm();

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #001229 0%, #002152 25%, #0062EF 55%, #0097F5 80%, #00E7FD 100%)",
      }}
    >
      <div className="noise-overlay pointer-events-none absolute inset-0 opacity-20" />
      <div className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#00E7FD]/10 blur-[150px]" />
      <div className="pointer-events-none absolute -left-20 bottom-0 h-[300px] w-[300px] rounded-full bg-[#0062EF]/15 blur-[120px]" />

      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        animate={{
          background: [
            "radial-gradient(circle, rgba(0,151,245,0.1) 0%, transparent 60%)",
            "radial-gradient(circle, rgba(0,231,253,0.1) 0%, transparent 60%)",
            "radial-gradient(circle, rgba(0,151,245,0.1) 0%, transparent 60%)",
          ],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="relative mx-auto max-w-4xl px-5 py-24 text-center sm:px-6 lg:px-8 lg:py-32"
      >
        <motion.h2
          variants={fadeInUp}
          className="mb-6 font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl"
          style={{ letterSpacing: "-0.02em" }}
        >
          Начните контролировать вашего AI-ассистента
        </motion.h2>

        <motion.p
          variants={fadeInUp}
          className="mx-auto mb-10 max-w-lg text-lg text-white/70"
        >
          Подключите личный кабинет и получите доступ ко всей аналитике,
          управлению диалогами и настройке виджета. 14 дней бесплатно.
        </motion.p>

        <motion.div
          variants={fadeInUp}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Button variant="white" size="lg" onClick={() => openForm()}>
            Начать бесплатно
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="!border-white/25 !text-white hover:!bg-white/10"
            onClick={() => openForm()}
          >
            Связаться с нами
          </Button>
        </motion.div>

        <motion.p
          variants={fadeInUp}
          className="mt-6 text-sm text-white/40"
        >
          14 дней бесплатно · Без карты · Полный доступ ко всем функциям
        </motion.p>
      </motion.div>
    </section>
  );
}
