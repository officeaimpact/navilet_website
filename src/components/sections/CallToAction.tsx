"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, type FormEvent } from "react";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { ctaContent } from "@/lib/content";
import { submitLeadForm } from "@/lib/submitForm";
import Link from "next/link";
import { CheckCircle, User, Building2, Phone, Mail, Loader2 } from "lucide-react";

export default function CallToAction() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [consent, setConsent] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setError(null);
    try {
      await submitLeadForm(e.currentTarget);
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка отправки");
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      id="cta"
      ref={ref}
      className="relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #001229 0%, #002152 25%, #0062EF 55%, #0097F5 80%, #00E7FD 100%)",
      }}
    >
      <div className="noise-overlay pointer-events-none absolute inset-0 opacity-20" />

      <div className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#00E7FD]/10 blur-[150px]" />
      <div className="pointer-events-none absolute -left-20 bottom-0 h-[300px] w-[300px] rounded-full bg-[#0062EF]/15 blur-[120px]" />

      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        animate={{
          background: [
            "radial-gradient(circle, rgba(0,151,245,0.1) 0%, transparent 60%)",
            "radial-gradient(circle, rgba(0,231,253,0.1) 0%, transparent 60%)",
            "radial-gradient(circle, rgba(0,151,245,0.1) 0%, transparent 60%)",
          ],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="relative mx-auto max-w-4xl px-5 py-24 sm:px-6 lg:px-8 lg:py-32"
      >
        <motion.h2
          variants={fadeInUp}
          className="mb-4 text-center font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl"
          style={{ letterSpacing: "-0.02em" }}
        >
          {ctaContent.title}
        </motion.h2>

        <motion.p
          variants={fadeInUp}
          className="mx-auto mb-10 max-w-lg text-center text-lg text-white/70"
        >
          {ctaContent.subtitle}
        </motion.p>

        <motion.div variants={fadeInUp} className="mx-auto max-w-xl">
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="rounded-2xl border border-white/15 bg-white/[0.07] p-6 backdrop-blur-xl sm:p-8"
              >
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="relative">
                    <label htmlFor="cta-name" className="sr-only">Имя</label>
                    <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                    <input
                      id="cta-name"
                      type="text"
                      name="name"
                      required
                      placeholder="Имя"
                      className="w-full rounded-xl border border-white/15 bg-white/10 py-3 pl-10 pr-4 text-sm text-white placeholder-white/40 outline-none transition-colors focus:border-white/30 focus:bg-white/15"
                    />
                  </div>
                  <div className="relative">
                    <label htmlFor="cta-company" className="sr-only">Компания</label>
                    <Building2 className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                    <input
                      id="cta-company"
                      type="text"
                      name="company"
                      required
                      placeholder="Компания"
                      className="w-full rounded-xl border border-white/15 bg-white/10 py-3 pl-10 pr-4 text-sm text-white placeholder-white/40 outline-none transition-colors focus:border-white/30 focus:bg-white/15"
                    />
                  </div>
                  <div className="relative">
                    <label htmlFor="cta-phone" className="sr-only">Телефон</label>
                    <Phone className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                    <input
                      id="cta-phone"
                      type="tel"
                      name="phone"
                      required
                      placeholder="Телефон"
                      className="w-full rounded-xl border border-white/15 bg-white/10 py-3 pl-10 pr-4 text-sm text-white placeholder-white/40 outline-none transition-colors focus:border-white/30 focus:bg-white/15"
                    />
                  </div>
                  <div className="relative">
                    <label htmlFor="cta-email" className="sr-only">Email</label>
                    <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                    <input
                      id="cta-email"
                      type="email"
                      name="email"
                      required
                      placeholder="Email"
                      className="w-full rounded-xl border border-white/15 bg-white/10 py-3 pl-10 pr-4 text-sm text-white placeholder-white/40 outline-none transition-colors focus:border-white/30 focus:bg-white/15"
                    />
                  </div>
                </div>

                <label className="mt-4 flex cursor-pointer items-start gap-2.5">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-0.5 h-4 w-4 shrink-0 accent-[#00E7FD]"
                  />
                  <span className="text-xs leading-relaxed text-white/60">
                    Я даю согласие на обработку персональных данных в
                    соответствии с{" "}
                    <Link
                      href="/privacy"
                      target="_blank"
                      className="text-white/80 underline hover:text-white"
                    >
                      политикой конфиденциальности
                    </Link>
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={sending || !consent}
                  className="mt-4 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-white py-3.5 font-semibold text-primary shadow-lg shadow-black/10 transition-all duration-200 hover:bg-blue-ice hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {sending ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Отправка...
                    </>
                  ) : (
                    "Отправить заявку"
                  )}
                </button>
                {error && (
                  <p className="mt-2 text-center text-xs text-red-300">
                    {error}
                  </p>
                )}
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center gap-4 rounded-2xl border border-white/15 bg-white/[0.07] px-8 py-12 backdrop-blur-xl"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    delay: 0.15,
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <CheckCircle className="h-16 w-16 text-[#00E7FD]" />
                </motion.div>
                <h3 className="font-display text-2xl font-bold text-white">
                  Заявка отправлена!
                </h3>
                <p className="max-w-sm text-center text-white/60">
                  Мы свяжемся с вами в ближайшее время для настройки
                  AI-ассистента.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.p
          variants={fadeInUp}
          className="mt-6 text-center text-sm text-white/40"
        >
          7 дней бесплатно • Без карты • Интеграция за 1 день
        </motion.p>
      </motion.div>
    </section>
  );
}
