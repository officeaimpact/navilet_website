"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { fadeInUp, slideInLeft, slideInRight, staggerContainer } from "@/lib/animations";
import { integrationSteps, integrationCode } from "@/lib/content";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { Check, Copy, Code2, Settings, Rocket } from "lucide-react";

const stepIcons = [Code2, Settings, Rocket];

function CodeBlock() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(integrationCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="overflow-hidden rounded-xl border border-blue-subtle/60 bg-dark">
      {/* Tab bar */}
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-red-400/60" />
            <span className="h-3 w-3 rounded-full bg-yellow-400/60" />
            <span className="h-3 w-3 rounded-full bg-green-400/60" />
          </div>
          <span className="ml-3 text-xs text-white/40">index.html</span>
        </div>
        <button
          onClick={handleCopy}
          aria-label="Скопировать код"
          className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-white/50 transition-colors hover:bg-white/10 hover:text-white/80"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5" />
              Скопировано
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              Копировать
            </>
          )}
        </button>
      </div>

      {/* Текст кода — src/lib/integrationSnippet.ts (экспорт через content.ts) */}
      <div className="overflow-x-auto p-5 font-mono text-sm leading-relaxed">
        <span className="text-white/30">{"<!-- Вставьте перед </body> -->"}</span>
        <pre className="mt-2 whitespace-pre-wrap break-all text-emerald-400/95">
          {integrationCode}
        </pre>
      </div>
    </div>
  );
}

function BrowserMockup() {
  return (
    <div className="overflow-hidden rounded-xl border border-blue-subtle/60 bg-white shadow-lg">
      {/* Browser chrome */}
      <div className="flex items-center gap-2 border-b border-blue-subtle/40 bg-surface-alt px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-300" />
        </div>
        <div className="ml-3 flex-1 rounded-md bg-white px-3 py-1 text-xs text-muted">
          your-agency.ru
        </div>
      </div>

      {/* Page content */}
      <div className="relative h-48 bg-gradient-to-br from-surface-alt to-white p-4">
        <div className="mb-3 h-4 w-32 rounded bg-blue-subtle" />
        <div className="mb-2 h-3 w-48 rounded bg-blue-subtle/60" />
        <div className="mb-2 h-3 w-40 rounded bg-blue-subtle/40" />
        <div className="h-3 w-44 rounded bg-blue-subtle/30" />

        {/* Widget bubble */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute bottom-4 right-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent shadow-lg shadow-accent/30"
        >
          <svg
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </motion.div>
      </div>
    </div>
  );
}

export default function Integration() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <SectionWrapper id="integration" alt>
      <motion.div variants={fadeInUp} className="mb-16 text-center">
        <h2 className="font-display text-3xl font-bold text-heading sm:text-4xl lg:text-[2.75rem]">
          Подключение за{" "}
          <span className="text-accent">1 день</span>
        </h2>
      </motion.div>

      <div
        ref={ref}
        className="grid gap-12 lg:grid-cols-2 lg:gap-16"
      >
        {/* Steps */}
        <motion.div
          variants={slideInLeft}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-8"
        >
          {integrationSteps.map((step, i) => {
            const Icon = stepIcons[i];
            return (
              <div key={i} className="flex gap-5">
                <div className="flex flex-col items-center">
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-accent text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  {i < integrationSteps.length - 1 && (
                    <div className="mt-2 h-full w-px bg-blue-subtle" />
                  )}
                </div>
                <div className="pb-6">
                  <div className="mb-1 flex items-baseline gap-2">
                    <span className="font-display text-sm font-bold text-accent">
                      Шаг {step.step}
                    </span>
                  </div>
                  <h3 className="mb-2 font-display text-lg font-semibold text-heading">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-body">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Code + Mockup */}
        <motion.div
          variants={slideInRight}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-6"
        >
          <CodeBlock />
          <BrowserMockup />
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
