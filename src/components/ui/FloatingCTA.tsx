"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap } from "lucide-react";
import { useLeadForm } from "@/contexts/LeadFormContext";

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);
  const { openForm } = useLeadForm();

  useEffect(() => {
    const onScroll = () => {
      if (document.body.style.overflow === "hidden") {
        setVisible(false);
        return;
      }

      const scrollY = window.scrollY;
      const heroBottom = window.innerHeight * 0.8;
      const ctaEl = document.getElementById("cta");
      const ctaTop = ctaEl
        ? ctaEl.getBoundingClientRect().top + scrollY - window.innerHeight
        : Infinity;

      setVisible(scrollY > heroBottom && scrollY < ctaTop);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    const mo = new MutationObserver(onScroll);
    mo.observe(document.body, { attributes: true, attributeFilter: ["style"] });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      mo.disconnect();
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={() => openForm()}
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          aria-label="Подключить AI-ассистента"
          className="fixed bottom-4 right-4 z-30 flex cursor-pointer items-center gap-2 rounded-full px-5 py-3 font-semibold text-white shadow-lg shadow-accent/30 transition-shadow duration-300 hover:shadow-xl hover:shadow-accent/40 sm:bottom-6 sm:right-6"
          style={{
            background:
              "linear-gradient(135deg, #0062EF 0%, #0097F5 60%, #00CCF5 100%)",
          }}
        >
          <Zap className="h-4 w-4" fill="currentColor" />
          <span className="text-sm">Подключить ИИ</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
