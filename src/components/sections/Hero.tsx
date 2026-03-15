"use client";

import { motion } from "framer-motion";
import {
  staggerContainer,
  heroWordVariant,
  fadeInUp,
  scaleIn,
  fadeIn,
} from "@/lib/animations";
import { heroContent } from "@/lib/content";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import DemoWidget from "@/components/DemoWidget";
import { demoScenarios } from "@/lib/scenarios";
import { Globe } from "lucide-react";

function PartnerLogos() {
  return (
    <motion.div
      variants={fadeIn}
      className="flex flex-wrap items-center justify-center gap-8 border-t border-blue-subtle/50 pt-8 lg:justify-start"
    >
      <span className="text-sm text-muted">Совместим с</span>
      <div className="flex items-center gap-2 text-muted transition-colors hover:text-accent">
        <Globe className="h-5 w-5" />
        <span className="text-sm font-medium">Web Widget</span>
      </div>
    </motion.div>
  );
}

export default function Hero() {
  const words = heroContent.title.split(" ");
  const heroScenario = demoScenarios[0];

  return (
    <section className="relative overflow-hidden bg-white">
      {/* Subtle decorative gradient blobs */}
      <div className="pointer-events-none absolute -right-40 -top-40 h-[700px] w-[700px] rounded-full bg-[#00E7FD]/[0.07] blur-[120px]" />
      <div className="pointer-events-none absolute -left-20 top-1/3 h-[500px] w-[500px] rounded-full bg-[#0097F5]/[0.05] blur-[100px]" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-[#0062EF]/[0.04] blur-[120px]" />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-12 px-5 pt-32 pb-20 sm:px-6 lg:flex-row lg:items-start lg:gap-12 lg:px-8 lg:pt-36 lg:pb-24">
        {/* Left: content */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-1 flex-col items-center text-center lg:items-start lg:pt-8 lg:text-left"
        >
          <Badge className="mb-6">
            {heroContent.badge}
          </Badge>

          <motion.h1
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="mb-6 font-display text-4xl font-bold leading-[1.1] text-heading sm:text-5xl lg:text-6xl xl:text-[4rem]"
            style={{ letterSpacing: "-0.02em" }}
          >
            {words.map((word, i) => (
              <motion.span
                key={i}
                variants={heroWordVariant}
                className="mr-[0.3em] inline-block"
                style={{ perspective: "600px" }}
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="mb-8 max-w-xl text-lg leading-relaxed text-body"
          >
            {heroContent.subtitle}
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="mb-10 flex flex-wrap gap-4"
          >
            <Button variant="primary" size="lg" href="#demo">
              {heroContent.ctaPrimary}
            </Button>
            <Button variant="outline" size="lg" href="#how-it-works">
              {heroContent.ctaSecondary}
            </Button>
          </motion.div>

          <PartnerLogos />
        </motion.div>

        {/* Right: chat widget — same DemoWidget as LiveDemo section */}
        <motion.div
          variants={scaleIn}
          initial="hidden"
          animate="visible"
          className="w-full flex-shrink-0 lg:w-[440px]"
        >
          <div className="relative">
            <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-[#0097F5]/8 to-[#00E7FD]/8 blur-xl" />
            <DemoWidget scenario={heroScenario} className="relative" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
