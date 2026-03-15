"use client";

import { useEffect, useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLeadForm } from "@/contexts/LeadFormContext";
import {
  X,
  User,
  Building2,
  Phone,
  Mail,
  CheckCircle,
  Sparkles,
} from "lucide-react";

export default function LeadFormModal() {
  const { isOpen, planName, closeForm } = useLeadForm();
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setSubmitted(false);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeForm();
    };
    if (isOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, closeForm]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-center justify-center px-4"
          onClick={closeForm}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-[#001229]/60 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Decorative top gradient bar */}
            <div
              className="h-1.5"
              style={{
                background:
                  "linear-gradient(90deg, #0062EF 0%, #0097F5 50%, #00E7FD 100%)",
              }}
            />

            {/* Close button */}
            <button
              onClick={closeForm}
              className="absolute right-4 top-5 flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
              aria-label="Закрыть"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="px-7 pb-7 pt-6 sm:px-8 sm:pb-8">
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Header */}
                    <div className="mb-6">
                      <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-accent/5 px-3 py-1 text-xs font-semibold text-accent">
                        <Sparkles className="h-3.5 w-3.5" />
                        7 дней бесплатно
                      </div>
                      <h3 className="font-display text-2xl font-bold text-heading">
                        Подключить AI-ассистента
                      </h3>
                      <p className="mt-1.5 text-sm text-muted">
                        {planName
                          ? `Тариф «${planName}» — оставьте заявку и мы настроим всё за 1 день`
                          : "Оставьте заявку и мы свяжемся для настройки за 1 день"}
                      </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="relative">
                          <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                          <input
                            type="text"
                            name="name"
                            required
                            placeholder="Имя"
                            autoFocus
                            className="w-full rounded-xl border border-gray-200 bg-gray-50/70 py-3 pl-10 pr-4 text-sm text-heading outline-none transition-all placeholder:text-gray-400 focus:border-accent/40 focus:bg-white focus:ring-2 focus:ring-accent/10"
                          />
                        </div>
                        <div className="relative">
                          <Building2 className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                          <input
                            type="text"
                            name="company"
                            required
                            placeholder="Компания"
                            className="w-full rounded-xl border border-gray-200 bg-gray-50/70 py-3 pl-10 pr-4 text-sm text-heading outline-none transition-all placeholder:text-gray-400 focus:border-accent/40 focus:bg-white focus:ring-2 focus:ring-accent/10"
                          />
                        </div>
                      </div>
                      <div className="relative">
                        <Phone className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <input
                          type="tel"
                          name="phone"
                          required
                          placeholder="Телефон"
                          className="w-full rounded-xl border border-gray-200 bg-gray-50/70 py-3 pl-10 pr-4 text-sm text-heading outline-none transition-all placeholder:text-gray-400 focus:border-accent/40 focus:bg-white focus:ring-2 focus:ring-accent/10"
                        />
                      </div>
                      <div className="relative">
                        <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <input
                          type="email"
                          name="email"
                          required
                          placeholder="Email"
                          className="w-full rounded-xl border border-gray-200 bg-gray-50/70 py-3 pl-10 pr-4 text-sm text-heading outline-none transition-all placeholder:text-gray-400 focus:border-accent/40 focus:bg-white focus:ring-2 focus:ring-accent/10"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full cursor-pointer rounded-xl py-3.5 font-semibold text-white shadow-lg shadow-accent/25 transition-all duration-200 hover:shadow-xl hover:shadow-accent/30"
                        style={{
                          background:
                            "linear-gradient(135deg, #0062EF 0%, #0097F5 60%, #00CCF5 100%)",
                        }}
                      >
                        Отправить заявку
                      </button>

                      <p className="text-center text-xs text-muted">
                        Бесплатный период • Без карты • Интеграция за 1 день
                      </p>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.4,
                      ease: [0.22, 1, 0.36, 1] as const,
                    }}
                    className="flex flex-col items-center gap-4 py-8"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        delay: 0.15,
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1] as const,
                      }}
                      className="flex h-16 w-16 items-center justify-center rounded-full bg-green-50"
                    >
                      <CheckCircle className="h-10 w-10 text-green-500" />
                    </motion.div>
                    <h3 className="font-display text-2xl font-bold text-heading">
                      Заявка отправлена!
                    </h3>
                    <p className="max-w-xs text-center text-sm text-muted">
                      Мы свяжемся с вами в ближайшее время для настройки
                      AI-ассистента.
                    </p>
                    <button
                      onClick={closeForm}
                      className="mt-2 cursor-pointer rounded-lg px-6 py-2.5 text-sm font-semibold text-accent transition-colors hover:bg-accent/5"
                    >
                      Закрыть
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
