"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { faqItems } from "@/lib/content";
import { HelpCircle, ChevronDown } from "lucide-react";

function FaqAccordionItem({
  question,
  answer,
  index,
}: {
  question: string;
  answer: string;
  index: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      custom={index}
      variants={{
        hidden: { opacity: 0, y: 16 },
        visible: (i: number) => ({
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.45,
            delay: 0.15 + i * 0.07,
            ease: [0.22, 1, 0.36, 1] as const,
          },
        }),
      }}
      className="overflow-hidden rounded-xl border border-blue-subtle/50 bg-white transition-shadow duration-300 hover:shadow-[0_2px_12px_rgba(0,82,204,0.06)]"
    >
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="flex w-full cursor-pointer items-center gap-4 px-6 py-5 text-left transition-colors duration-200 hover:bg-blue-ice/30"
      >
        <span className="flex-1 font-display text-[15px] font-semibold leading-snug text-heading sm:text-base">
          {question}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="shrink-0"
        >
          <ChevronDown className="h-5 w-5 text-muted" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="border-t border-blue-subtle/30 px-6 pb-5 pt-4">
              <p className="text-sm leading-relaxed text-body">{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  if (faqItems.length === 0) return null;

  return (
    <section id="faq" ref={ref} className="bg-surface-alt">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="mx-auto max-w-3xl px-5 py-20 sm:px-6 lg:px-8 lg:py-24"
      >
        <motion.div variants={fadeInUp} className="mb-10 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/15 bg-accent/5 px-4 py-1.5">
            <HelpCircle className="h-4 w-4 text-accent" />
            <span className="text-sm font-semibold text-accent">FAQ</span>
          </div>
          <h2 className="font-display text-3xl font-bold text-heading sm:text-4xl">
            Часто задаваемые{" "}
            <span className="text-accent">вопросы</span>
          </h2>
        </motion.div>

        <div className="flex flex-col gap-3">
          {faqItems.map((item, i) => (
            <FaqAccordionItem
              key={i}
              question={item.question}
              answer={item.answer}
              index={i}
            />
          ))}
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqItems.map((item) => ({
                "@type": "Question",
                name: item.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: item.answer,
                },
              })),
            }),
          }}
        />
      </motion.div>
    </section>
  );
}
