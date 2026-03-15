"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks } from "@/lib/content";
import { Menu, X } from "lucide-react";
import Button from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";
import { useLeadForm } from "@/contexts/LeadFormContext";

function isCtaLink(href: string) {
  return href === "/#cta";
}

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { openForm } = useLeadForm();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const renderNavLink = (
    link: { label: string; href: string },
    cls: string,
    onClickExtra?: () => void
  ) => {
    if (isCtaLink(link.href)) {
      return (
        <button
          key={link.label}
          onClick={() => {
            onClickExtra?.();
            openForm();
          }}
          className={`cursor-pointer ${cls}`}
        >
          {link.label}
        </button>
      );
    }

    if (link.href.startsWith("/") && !link.href.startsWith("/#")) {
      return (
        <Link
          key={link.href}
          href={link.href}
          onClick={onClickExtra}
          className={cls}
        >
          {link.label}
        </Link>
      );
    }

    return (
      <a
        key={link.href}
        href={link.href}
        onClick={onClickExtra}
        className={cls}
      >
        {link.label}
      </a>
    );
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/90 py-2.5 shadow-nav backdrop-blur-xl"
            : "bg-white/60 py-4 backdrop-blur-sm"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
          <a href="/" className="flex items-center">
            <Image
              src="/logo.svg"
              alt="AI Tour Assistant"
              width={220}
              height={48}
              priority
              className={`w-auto transition-all duration-300 ${
                scrolled ? "h-10" : "h-12"
              }`}
            />
          </a>

          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) =>
              renderNavLink(
                link,
                "text-sm font-medium text-body transition-colors duration-200 hover:text-accent"
              )
            )}
          </div>

          <div className="hidden md:block">
            <Button variant="primary" size="sm" href="/#demo">
              Попробовать демо
            </Button>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="inline-flex items-center justify-center rounded-lg p-2 text-heading md:hidden"
            aria-label="Открыть меню"
          >
            {mobileOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="absolute right-0 top-0 h-full w-72 bg-white p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-8 mt-4">
                <Image
                  src="/logo.svg"
                  alt="AI Tour Assistant"
                  width={140}
                  height={31}
                  className="h-8 w-auto"
                />
              </div>
              <div className="flex flex-col gap-6">
                {navLinks.map((link) =>
                  renderNavLink(
                    link,
                    "text-lg font-medium text-heading hover:text-accent",
                    () => setMobileOpen(false)
                  )
                )}
                <div className="mt-4">
                  <Button variant="primary" size="md" href="/#demo">
                    Попробовать демо
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
