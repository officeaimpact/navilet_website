"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { staggerContainer } from "@/lib/animations";

interface SectionWrapperProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  dark?: boolean;
  alt?: boolean;
  /** Вертикальные отступы, если секция идёт сразу за hero страницы */
  paddingClassName?: string;
}

export default function SectionWrapper({
  children,
  id,
  className = "",
  dark = false,
  alt = false,
  paddingClassName = "py-24 lg:py-28 xl:py-32",
}: SectionWrapperProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const bg = dark
    ? "bg-gradient-to-br from-dark to-dark-mid"
    : alt
      ? "bg-surface-alt"
      : "bg-surface";

  return (
    <section id={id} className={`${bg} ${className}`}>
      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className={`mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 ${paddingClassName}`}
      >
        {children}
      </motion.div>
    </section>
  );
}
