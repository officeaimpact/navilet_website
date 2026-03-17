"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  fadeInUp,
  staggerContainer,
  slideInLeft,
  slideInRight,
  scaleIn,
} from "@/lib/animations";
import { Handshake, MapPin, Users, CalendarDays } from "lucide-react";

const STATS = [
  { icon: CalendarDays, value: "27 лет", label: "на рынке" },
  { icon: MapPin, value: "396", label: "офисов по России" },
  { icon: Users, value: "5 млн+", label: "туристов" },
];

const PARTNER_LOGOS = [
  {
    src: "/partners/rst-logo.png",
    alt: "Российский союз туриндустрии",
    name: "РСТ",
  },
  {
    src: "/partners/plekhanov-logo.png",
    alt: "РЭУ им. Г.В. Плеханова",
    name: "РЭУ Плеханова",
  },
  {
    src: "/partners/tpp-logo.svg",
    alt: "Торгово-промышленная палата РФ",
    name: "ТПП РФ",
  },
  {
    src: "/partners/mgimo-logo.svg",
    alt: "МГИМО",
    name: "МГИМО",
  },
];

const logoCardVariant = {
  hidden: { opacity: 0, scale: 0.9, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.3 + i * 0.1,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

const statVariant = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      delay: 0.5 + i * 0.12,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export default function Partners() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="partners" ref={ref} className="bg-surface">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-24"
      >
        {/* Section header */}
        <motion.div variants={fadeInUp} className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/15 bg-accent/5 px-4 py-1.5">
            <Handshake className="h-4 w-4 text-accent" />
            <span className="text-sm font-semibold text-accent">
              Партнёры и клиенты
            </span>
          </div>
          <h2 className="font-display text-3xl font-bold text-heading sm:text-4xl lg:text-[2.75rem]">
            Нам <span className="text-accent">доверяют</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-2">
          {/* LEFT: MGP featured card */}
          <motion.div
            variants={slideInLeft}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex flex-col overflow-hidden rounded-2xl border border-blue-subtle/50 bg-white shadow-[0_1px_3px_rgba(0,82,204,0.04),0_4px_16px_rgba(0,82,204,0.05)] transition-shadow duration-300 hover:shadow-[0_8px_40px_rgba(0,82,204,0.1)]"
          >
            <div className="relative flex items-center justify-center overflow-hidden border-b border-blue-subtle/30 bg-white p-6">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent/[0.02] via-transparent to-primary/[0.02]" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/partners/mgp-logo.svg"
                alt="МГП — Сеть магазинов горящих путёвок"
                loading="lazy"
                className="relative w-full max-w-[380px] object-contain"
                draggable={false}
              />
            </div>

            <div className="flex flex-1 flex-col p-7 sm:p-8">
              <motion.div
                variants={scaleIn}
                className="mb-4 inline-flex w-fit items-center gap-1.5 rounded-full border border-accent/20 bg-accent/5 px-3.5 py-1.5"
              >
                <Handshake className="h-3.5 w-3.5 text-accent" />
                <span className="text-xs font-bold text-accent">
                  Стратегический партнёр
                </span>
              </motion.div>

              <h3 className="mb-3 font-display text-xl font-bold text-heading">
                Сеть магазинов горящих путёвок
              </h3>

              <p className="mb-6 flex-1 text-sm leading-relaxed text-body">
                МГП — одна из крупнейших туристических сетей России
                с 27-летней историей и 396 офисами по всей стране.
                Компания стала первой, кто внедрил AI Tour Assistant
                в реальную работу с клиентами и активно участвует
                в развитии продукта.
              </p>

              <div className="flex flex-wrap gap-5">
                {STATS.map((stat, i) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={stat.label}
                      custom={i}
                      variants={statVariant}
                      className="flex items-center gap-2.5"
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-ice transition-colors duration-300 group-hover:bg-accent/10">
                        <Icon className="h-4 w-4 text-accent" />
                      </div>
                      <div>
                        <div className="font-display text-sm font-bold text-heading">
                          {stat.value}
                        </div>
                        <div className="text-[11px] text-muted">
                          {stat.label}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Partner logos grid */}
          <motion.div
            variants={slideInRight}
            className="flex flex-col rounded-2xl border border-blue-subtle/50 bg-white p-7 shadow-[0_1px_3px_rgba(0,82,204,0.04),0_4px_16px_rgba(0,82,204,0.05)] sm:p-8"
          >
            <div className="mb-8">
              <h3 className="font-display text-xl font-bold text-heading">
                Наши партнёры
              </h3>
              <p className="mt-1.5 text-sm text-muted">
                Сотрудничаем с ведущими организациями отрасли
              </p>
            </div>

            <div className="grid flex-1 grid-cols-2 gap-5">
              {PARTNER_LOGOS.map((partner, i) => (
                <motion.div
                  key={partner.name}
                  custom={i}
                  variants={logoCardVariant}
                  whileHover={{
                    y: -4,
                    boxShadow:
                      "0 4px 20px rgba(0,82,204,0.10), 0 1px 4px rgba(0,82,204,0.06)",
                  }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="group flex flex-col items-center justify-center gap-4 rounded-xl border border-blue-subtle/40 bg-white p-6 transition-colors duration-300 hover:border-accent/25"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={partner.src}
                    alt={partner.alt}
                    loading="lazy"
                    className="h-20 w-auto max-w-[140px] object-contain opacity-60 grayscale transition-all duration-400 group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0 sm:h-24 sm:max-w-[160px]"
                    draggable={false}
                  />
                  <span className="text-center text-[13px] font-medium text-muted transition-colors duration-300 group-hover:text-heading">
                    {partner.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
