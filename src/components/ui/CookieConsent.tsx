"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Cookie, X } from "lucide-react";

const STORAGE_KEY = "cookie-consent-accepted";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem(STORAGE_KEY);
    if (!accepted) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, "true");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed inset-x-0 bottom-0 z-[70] px-4 pb-4 sm:px-6"
        >
          <div className="mx-auto flex max-w-xl flex-col items-center gap-3 rounded-2xl border border-gray-200 bg-white/95 px-5 py-4 shadow-xl backdrop-blur-lg sm:flex-row sm:gap-4 sm:px-6">
            <Cookie className="hidden h-5 w-5 shrink-0 text-accent sm:block" />
            <p className="text-center text-xs leading-relaxed text-body sm:text-left sm:text-sm">
              Мы используем файлы cookie для улучшения работы сайта.{" "}
              <Link
                href="/privacy"
                className="text-accent underline hover:text-accent-hover"
              >
                Подробнее
              </Link>
            </p>
            <div className="flex shrink-0 items-center gap-2">
              <button
                onClick={accept}
                className="cursor-pointer rounded-lg px-4 py-2 text-xs font-semibold text-white transition-colors sm:text-sm"
                style={{
                  background:
                    "linear-gradient(135deg, #0062EF 0%, #0097F5 100%)",
                }}
              >
                Принять
              </button>
              <button
                onClick={accept}
                className="cursor-pointer rounded-lg p-2 text-gray-400 transition-colors hover:text-gray-600"
                aria-label="Закрыть"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
