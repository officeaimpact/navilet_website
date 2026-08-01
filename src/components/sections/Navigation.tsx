"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks, companyInfo } from "@/lib/content";
import { Menu, X, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLeadForm } from "@/contexts/LeadFormContext";

function isCtaLink(href: string) {
  return href === "/#cta";
}

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { openForm } = useLeadForm();
  const pathname = usePathname();

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

  const closeMobileMenu = () => {
    document.body.style.overflow = "";
    setMobileOpen(false);
  };

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
          className={`cursor-pointer text-left ${cls}`}
        >
          {link.label}
        </button>
      );
    }

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
  };

  return (
    <>
      <header
        style={{ top: "var(--promo-h, 0px)" }}
        className={`fixed left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/90 py-2.5 shadow-nav backdrop-blur-xl"
            : "bg-white/60 py-4 backdrop-blur-sm"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
          <Link
            href="/"
            onClick={(e) => {
              closeMobileMenu();
              if (pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className="flex shrink-0 items-center"
          >
            <Image
              src="/logo.svg"
              alt="Навылет! AI — ИИ-ассистент для турагентств"
              width={220}
              height={48}
              priority
              className={`w-auto transition-all duration-300 ${
                scrolled ? "h-10" : "h-12"
              }`}
            />
          </Link>

          <div className="hidden items-center gap-5 lg:flex xl:gap-8">
            {navLinks.map((link) =>
              renderNavLink(
                link,
                "whitespace-nowrap text-sm font-medium text-body transition-colors duration-200 hover:text-accent"
              )
            )}
          </div>

          <div className="flex items-center gap-2">
            <a
              href={`tel:${companyInfo.phoneRaw}`}
              title={companyInfo.phone}
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-blue-subtle/60 text-accent transition-colors hover:border-accent hover:bg-blue-ice"
              aria-label={`Позвонить: ${companyInfo.phone}`}
            >
              <Phone className="h-4 w-4" />
            </a>
            <button
              onClick={() => openForm({ source: "nav" })}
              className="hidden cursor-pointer items-center justify-center whitespace-nowrap rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-accent/20 transition-colors duration-200 hover:bg-accent-hover sm:inline-flex"
            >
              <span className="hidden xl:inline">Подключить бесплатно</span>
              <span className="xl:hidden">Подключить</span>
            </button>

            <button
              onClick={() =>
                mobileOpen ? closeMobileMenu() : setMobileOpen(true)
              }
              className="inline-flex items-center justify-center rounded-lg p-2 text-heading lg:hidden"
              aria-label={mobileOpen ? "Закрыть меню" : "Открыть меню"}
            >
              {mobileOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
            onClick={closeMobileMenu}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="absolute right-0 top-0 h-full w-72 overflow-y-auto bg-white px-6 pb-6 shadow-2xl"
              style={{ paddingTop: "calc(var(--promo-h, 0px) + 88px)" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col gap-6">
                {navLinks.map((link) =>
                  renderNavLink(
                    link,
                    "text-lg font-medium text-heading hover:text-accent",
                    closeMobileMenu
                  )
                )}
                <div className="mt-4 space-y-3">
                  <button
                    onClick={() => {
                      closeMobileMenu();
                      openForm({ source: "nav_mobile" });
                    }}
                    className="inline-flex w-full cursor-pointer items-center justify-center rounded-lg bg-accent px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-accent-hover"
                  >
                    Подключить бесплатно
                  </button>
                  <p className="text-center text-xs text-muted">
                    Месяц бесплатно · подключение 0 ₽
                  </p>
                  <a
                    href={`tel:${companyInfo.phoneRaw}`}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-blue-subtle/60 px-6 py-3 text-base font-semibold text-heading transition-colors hover:border-accent hover:text-accent"
                  >
                    <Phone className="h-4 w-4 text-accent" />
                    {companyInfo.phone}
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
