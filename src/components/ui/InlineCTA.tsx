"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { fadeInUp } from "@/lib/animations";
import { ArrowRight } from "lucide-react";
import { useLeadForm } from "@/contexts/LeadFormContext";

interface InlineCTAProps {
  text: string;
  buttonText: string;
}

export default function InlineCTA({ text, buttonText }: InlineCTAProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const { openForm } = useLeadForm();

  return (
    <section ref={ref} className="border-y border-blue-subtle/30 bg-white">
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={fadeInUp}
        className="mx-auto flex max-w-4xl flex-col items-center gap-5 px-5 py-10 text-center sm:flex-row sm:justify-center sm:gap-8 sm:py-8 sm:text-left"
      >
        <p className="font-display text-lg font-semibold text-heading sm:text-xl">
          {text}
        </p>
        <button
          onClick={() => openForm()}
          className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3 text-base font-semibold text-white shadow-lg shadow-accent/20 transition-colors duration-200 hover:bg-accent-hover"
        >
          {buttonText}
          <ArrowRight className="h-4 w-4" />
        </button>
      </motion.div>
    </section>
  );
}
