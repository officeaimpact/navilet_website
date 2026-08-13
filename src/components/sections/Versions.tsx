"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Layers, ArrowRight } from "lucide-react";
import { fadeInUp } from "@/lib/animations";
import SectionWrapper from "@/components/ui/SectionWrapper";
import VersionPicker from "@/components/sections/VersionPicker";

/** Секция «Две версии ассистента» на главной: выбор формата под модель агентства. */
export default function Versions() {
  return (
    <SectionWrapper id="versions" alt>
      <motion.div variants={fadeInUp} className="mb-10 text-center sm:mb-12">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5">
          <Layers className="h-4 w-4 text-accent" />
          <span className="text-xs font-semibold text-accent sm:text-sm">
            Два формата под модель вашего агентства
          </span>
        </div>
        <h2 className="font-display text-3xl font-bold text-heading sm:text-4xl lg:text-[2.75rem]">
          Один ассистент — <span className="text-accent">две версии</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base text-body">
          «Лид» собирает готовые заявки для ваших менеджеров.
          «Про» — полноценный инструмент: консультирует, сопровождает
          и возвращает клиентов. Выберите свой формат — и попробуйте его в демо.
        </p>
      </motion.div>

      <motion.div variants={fadeInUp}>
        <VersionPicker source="home" />
      </motion.div>

      <motion.div variants={fadeInUp} className="mt-8 text-center">
        <Link
          href="/versii"
          className="inline-flex min-h-10 items-center gap-1.5 text-sm font-semibold text-accent transition-colors hover:text-accent-hover"
        >
          Полное сравнение версий в таблице
          <ArrowRight className="h-4 w-4" />
        </Link>
      </motion.div>
    </SectionWrapper>
  );
}
