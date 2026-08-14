"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navigation, companyInfo, lkUrls } from "@/lib/content";
import type { NavEntry, NavMenuItem } from "@/lib/content";
import { Menu, X, Phone, ChevronDown, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLeadForm } from "@/contexts/LeadFormContext";

/** Пауза перед закрытием: курсор успевает пройти от кнопки к панели. */
const CLOSE_DELAY = 160;

const menuId = (label: string) =>
  "nav-menu-" + label.toLowerCase().replace(/[^a-zа-я]+/gi, "-");

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { openForm } = useLeadForm();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Переход на другую страницу закрывает всё открытое
  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
    setMobileSection(null);
  }, [pathname]);

  useEffect(() => {
    if (!openMenu) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenMenu(null);
    };
    const onClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-nav-root]")) setOpenMenu(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClickOutside);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, [openMenu]);

  const clearCloseTimer = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const hoverOpen = (label: string) => {
    clearCloseTimer();
    setOpenMenu(label);
  };

  const hoverClose = () => {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => setOpenMenu(null), CLOSE_DELAY);
  };

  const closeMobileMenu = () => {
    document.body.style.overflow = "";
    setMobileOpen(false);
    setMobileSection(null);
  };

  const renderMenuItem = (item: NavMenuItem) => (
    <Link
      key={item.href}
      href={item.href}
      onClick={() => setOpenMenu(null)}
      className="group/item block rounded-xl px-3 py-2.5 transition-colors hover:bg-blue-ice/60"
    >
      <span className="flex items-center gap-1.5 text-sm font-semibold text-heading transition-colors group-hover/item:text-accent">
        {item.label}
        <ArrowRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all group-hover/item:translate-x-0 group-hover/item:opacity-100" />
      </span>
      <span className="mt-0.5 block text-xs leading-snug text-muted">
        {item.description}
      </span>
    </Link>
  );

  const renderDesktopEntry = (entry: NavEntry) => {
    if (entry.kind === "link") {
      return (
        <Link
          key={entry.href}
          href={entry.href}
          className="flex h-9 items-center whitespace-nowrap px-1 text-[13px] font-medium text-body transition-colors duration-200 hover:text-accent xl:text-sm"
        >
          {entry.label}
        </Link>
      );
    }

    const isOpen = openMenu === entry.label;
    const id = menuId(entry.label);

    return (
      <div
        key={entry.label}
        className="relative"
        onMouseEnter={() => hoverOpen(entry.label)}
        onMouseLeave={hoverClose}
      >
        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls={id}
          onClick={() => setOpenMenu(isOpen ? null : entry.label)}
          className={`flex h-9 cursor-pointer items-center gap-1 whitespace-nowrap px-1 text-[13px] font-medium transition-colors duration-200 hover:text-accent xl:text-sm ${
            isOpen ? "text-accent" : "text-body"
          }`}
        >
          {entry.label}
          <ChevronDown
            className={`h-3.5 w-3.5 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Панель всегда в разметке: так ссылки видят поисковые роботы,
            а visibility:hidden убирает их из обхода по Tab, пока закрыто. */}
        {/* Двухколоночная панель шириной 40rem не влезает по центру
            кнопки на 1024px — её держим по левой кромке триггера,
            узкую центрируем: так обе выглядят пристёгнутыми к пункту. */}
        <div
          id={id}
          data-nav-panel={entry.label}
          className={`absolute top-full z-10 pt-3 transition-all duration-200 ${
            entry.columns.length > 1
              ? "left-0 w-[min(40rem,calc(100vw-3rem))]"
              : "left-1/2 w-[min(22rem,calc(100vw-3rem))] -translate-x-1/2"
          } ${
            isOpen
              ? "visible translate-y-0 opacity-100"
              : "invisible -translate-y-1 opacity-0"
          }`}
        >
          <div className="overflow-hidden rounded-2xl border border-blue-subtle/50 bg-white shadow-xl shadow-primary/10">
            <div
              className={`grid gap-x-2 gap-y-1 p-3 ${
                entry.columns.length > 1 ? "grid-cols-2" : "grid-cols-1"
              }`}
            >
              {entry.columns.map((column) => (
                <div key={column.title}>
                  <p className="px-3 pb-1 pt-2 text-[11px] font-bold uppercase tracking-wide text-muted">
                    {column.title}
                  </p>
                  {column.items.map(renderMenuItem)}
                </div>
              ))}
            </div>
            {entry.highlight && (
              <Link
                href={entry.highlight.href}
                onClick={() => setOpenMenu(null)}
                className="group/hl flex items-center justify-between gap-4 border-t border-blue-subtle/40 bg-blue-ice/40 px-6 py-3.5 transition-colors hover:bg-blue-ice"
              >
                <span>
                  <span className="block text-sm font-semibold text-heading transition-colors group-hover/hl:text-accent">
                    {entry.highlight.label}
                  </span>
                  <span className="mt-0.5 block text-xs text-muted">
                    {entry.highlight.description}
                  </span>
                </span>
                <ArrowRight className="h-4 w-4 shrink-0 text-accent transition-transform group-hover/hl:translate-x-1" />
              </Link>
            )}
          </div>
        </div>
      </div>
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
        <nav
          data-nav-root
          className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8"
        >
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
                scrolled ? "h-9 xl:h-10" : "h-10 xl:h-12"
              }`}
            />
          </Link>

          {/* Верхняя панель: два меню, тарифы, демо и блок доверия. Контакты
              живут в футере и в кнопке звонка — в шапке они только мешали.
              На 1024px пять пунктов помещаются только с узкими отступами. */}
          <div className="hidden items-center gap-4 lg:flex xl:gap-7">
            {navigation.map(renderDesktopEntry)}
          </div>

          <div className="flex items-center gap-2">
            <a
              href={`tel:${companyInfo.phoneRaw}`}
              title={companyInfo.phone}
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-blue-subtle/60 text-accent transition-colors hover:border-accent hover:bg-blue-ice lg:h-9 lg:w-9"
              aria-label={`Позвонить: ${companyInfo.phone}`}
            >
              <Phone className="h-4 w-4" />
            </a>
            {/* Действующему клиенту нужен вход, а не рассказ о продукте */}
            <a
              href={lkUrls.base}
              className="hidden h-9 items-center whitespace-nowrap rounded-lg px-3 text-[13px] font-medium text-body transition-colors hover:bg-blue-ice hover:text-accent lg:inline-flex xl:text-sm"
            >
              Войти
            </a>
            <button
              onClick={() => openForm({ source: "nav" })}
              className="hidden min-h-10 cursor-pointer items-center justify-center whitespace-nowrap rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-accent/20 transition-colors duration-200 hover:bg-accent-hover sm:inline-flex lg:min-h-9"
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
              data-mobile-menu
              className="absolute right-0 top-0 h-full w-[19rem] max-w-[85vw] overflow-y-auto bg-white px-5 pb-6 shadow-2xl"
              style={{ paddingTop: "calc(var(--promo-h, 0px) + 88px)" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col">
                {navigation.map((entry) => {
                  if (entry.kind === "link") {
                    return (
                      <Link
                        key={entry.href}
                        href={entry.href}
                        onClick={closeMobileMenu}
                        className="flex min-h-12 items-center border-b border-blue-subtle/30 text-base font-semibold text-heading"
                      >
                        {entry.label}
                      </Link>
                    );
                  }

                  const expanded = mobileSection === entry.label;
                  return (
                    <div
                      key={entry.label}
                      className="border-b border-blue-subtle/30"
                    >
                      <button
                        type="button"
                        aria-expanded={expanded}
                        onClick={() =>
                          setMobileSection(expanded ? null : entry.label)
                        }
                        className="flex min-h-12 w-full cursor-pointer items-center justify-between text-base font-semibold text-heading"
                      >
                        {entry.label}
                        <ChevronDown
                          className={`h-4 w-4 text-muted transition-transform duration-200 ${
                            expanded ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      <AnimatePresence initial={false}>
                        {expanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.22 }}
                            className="overflow-hidden"
                          >
                            <div className="pb-2">
                              {entry.columns.map((column) => (
                                <div key={column.title}>
                                  <p className="pb-0.5 pt-2 text-[11px] font-bold uppercase tracking-wide text-muted">
                                    {column.title}
                                  </p>
                                  {column.items.map((item) => (
                                    <Link
                                      key={item.href}
                                      href={item.href}
                                      onClick={closeMobileMenu}
                                      className="flex min-h-11 items-center text-[15px] text-body hover:text-accent"
                                    >
                                      {item.label}
                                    </Link>
                                  ))}
                                </div>
                              ))}
                              {entry.highlight && (
                                <Link
                                  href={entry.highlight.href}
                                  onClick={closeMobileMenu}
                                  className="mt-2 flex min-h-11 items-center gap-1.5 rounded-lg bg-blue-ice/60 px-3 text-[15px] font-semibold text-accent"
                                >
                                  {entry.highlight.label}
                                  <ArrowRight className="h-4 w-4" />
                                </Link>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}

                <a
                  href={lkUrls.base}
                  className="flex min-h-12 items-center border-b border-blue-subtle/30 text-base font-semibold text-heading"
                >
                  Войти в кабинет
                </a>

                <div className="mt-5 space-y-3">
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
