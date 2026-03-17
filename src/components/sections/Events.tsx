"use client";

import {
  motion,
  useInView,
  AnimatePresence,
} from "framer-motion";
import { useRef, useState, useCallback, useEffect } from "react";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { events, type EventItem } from "@/lib/content";
import {
  CalendarDays,
  MapPin,
  ExternalLink,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";

const CARD_WIDTH = 360;
const GAP = 20;

/* ── Detail Modal ─────────────────────────────────────────── */

function EventModal({
  event,
  onClose,
}: {
  event: EventItem;
  onClose: () => void;
}) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-[#001229]/60 backdrop-blur-sm" />

      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 max-h-[90vh] w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Закрыть"
          className="absolute right-3 top-3 z-20 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition-colors hover:bg-black/50"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="max-h-[90vh] overflow-y-auto overscroll-contain">
          {/* Photo */}
          {event.image ? (
            <div className="relative aspect-[16/9] w-full overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={event.image}
                alt={event.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

              <div className="absolute bottom-4 left-4 flex flex-wrap items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold backdrop-blur-md ${
                    event.upcoming
                      ? "bg-emerald-500/90 text-white"
                      : "bg-white/90 text-heading"
                  }`}
                >
                  <CalendarDays className="h-3.5 w-3.5" />
                  {event.date}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-heading backdrop-blur-md">
                  <MapPin className="h-3.5 w-3.5" />
                  {event.location}
                </span>
              </div>
            </div>
          ) : (
            <div className="relative flex aspect-[16/9] items-center justify-center bg-gradient-to-br from-[#0052CC]/8 via-[#0097F5]/6 to-[#00E7FD]/10">
              <Sparkles className="h-16 w-16 text-accent/15" />
              <div className="absolute bottom-4 left-4 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-heading backdrop-blur-md">
                  <CalendarDays className="h-3.5 w-3.5" />
                  {event.date}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-heading backdrop-blur-md">
                  <MapPin className="h-3.5 w-3.5" />
                  {event.location}
                </span>
              </div>
            </div>
          )}

          {/* Content */}
          <div className="p-6 sm:p-8">
            {event.upcoming && (
              <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Предстоящее событие
              </div>
            )}

            <h2 className="mb-4 font-display text-xl font-bold leading-snug text-heading sm:text-2xl">
              {event.title}
            </h2>

            <p className="mb-6 text-[15px] leading-[1.75] text-body">
              {event.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {event.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-blue-ice px-3 py-1 text-xs font-medium text-accent"
                >
                  {tag}
                </span>
              ))}
            </div>

            {event.link && (
              <a
                href={event.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-accent-hover"
              >
                Подробнее о мероприятии
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Main Section ─────────────────────────────────────────── */

export default function Events() {
  const sectionRef = useRef(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [activeEvent, setActiveEvent] = useState<EventItem | null>(null);

  if (events.length === 0) return null;

  const sorted = [...events].sort((a, b) =>
    a.upcoming === b.upcoming ? 0 : a.upcoming ? -1 : 1
  );

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    const ro = new ResizeObserver(updateScrollState);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      ro.disconnect();
    };
  }, [updateScrollState]);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = CARD_WIDTH + GAP;
    el.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <>
      <section id="events" ref={sectionRef} className="bg-surface">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-24"
        >
          {/* Header */}
          <motion.div
            variants={fadeInUp}
            className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end"
          >
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/15 bg-accent/5 px-4 py-1.5">
                <Sparkles className="h-4 w-4 text-accent" />
                <span className="text-sm font-semibold text-accent">
                  Мероприятия
                </span>
              </div>
              <h2 className="font-display text-3xl font-bold text-heading sm:text-4xl lg:text-[2.75rem]">
                Участие в{" "}
                <span className="text-accent">отраслевых событиях</span>
              </h2>
              <p className="mt-3 max-w-xl text-body">
                Представляем технологии AI-автоматизации для туризма на ведущих
                конференциях и конгрессах индустрии
              </p>
            </div>

            <div className="hidden gap-2 sm:flex">
              <button
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
                aria-label="Предыдущее мероприятие"
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-blue-subtle/60 bg-white text-heading shadow-sm transition-all duration-200 hover:border-accent/40 hover:shadow-md disabled:cursor-default disabled:opacity-30"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                aria-label="Следующее мероприятие"
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-blue-subtle/60 bg-white text-heading shadow-sm transition-all duration-200 hover:border-accent/40 hover:shadow-md disabled:cursor-default disabled:opacity-30"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </motion.div>

          {/* Carousel */}
          <motion.div variants={fadeInUp} className="relative">
            {canScrollLeft && (
              <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 hidden w-12 bg-gradient-to-r from-surface to-transparent sm:block" />
            )}
            {canScrollRight && (
              <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 hidden w-12 bg-gradient-to-l from-surface to-transparent sm:block" />
            )}

            <div
              ref={scrollRef}
              className="scrollbar-hide -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 sm:-mx-0 sm:px-0"
              style={{ scrollSnapType: "x mandatory" }}
            >
              {sorted.map((event, i) => (
                <motion.article
                  key={event.id}
                  initial={{ opacity: 0, y: 20, scale: 0.97 }}
                  animate={
                    isInView
                      ? { opacity: 1, y: 0, scale: 1 }
                      : { opacity: 0, y: 20, scale: 0.97 }
                  }
                  transition={{
                    duration: 0.5,
                    delay: 0.15 + i * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group w-[85vw] max-w-[320px] flex-shrink-0 cursor-pointer snap-start sm:w-[360px] sm:max-w-none"
                  onClick={() => setActiveEvent(event)}
                >
                  <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-blue-subtle/50 bg-white shadow-[0_1px_3px_rgba(0,82,204,0.04),0_4px_16px_rgba(0,82,204,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(0,82,204,0.1)]">
                    {event.image ? (
                      <div className="relative aspect-[16/10] overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={event.image}
                          alt={event.title}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
                        <div className="absolute left-3 top-3">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold backdrop-blur-md ${
                              event.upcoming
                                ? "bg-emerald-500/90 text-white"
                                : "bg-white/90 text-heading"
                            }`}
                          >
                            <CalendarDays className="h-3 w-3" />
                            {event.date}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="relative flex aspect-[16/10] items-center justify-center bg-gradient-to-br from-[#0052CC]/5 via-[#0097F5]/5 to-[#00E7FD]/10">
                        <Sparkles className="h-10 w-10 text-accent/20" />
                        <div className="absolute left-3 top-3">
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-heading backdrop-blur-md">
                            <CalendarDays className="h-3 w-3" />
                            {event.date}
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="flex flex-1 flex-col p-5">
                      <div className="mb-2 flex items-center gap-1.5 text-xs text-muted">
                        <MapPin className="h-3 w-3 shrink-0" />
                        {event.location}
                      </div>

                      <h3 className="mb-2.5 line-clamp-2 font-display text-[15px] font-bold leading-snug text-heading">
                        {event.title}
                      </h3>

                      <p className="mb-4 line-clamp-4 flex-1 text-[13px] leading-relaxed text-body">
                        {event.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5">
                        {event.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-blue-ice px-2 py-0.5 text-[10px] font-medium text-accent"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-colors group-hover:text-accent-hover">
                        Подробнее
                        <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>

            <div className="mt-4 flex justify-center gap-2 sm:hidden">
              <button
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
                aria-label="Предыдущее мероприятие"
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-blue-subtle/60 bg-white text-heading shadow-sm transition-all disabled:opacity-30"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                aria-label="Следующее мероприятие"
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-blue-subtle/60 bg-white text-heading shadow-sm transition-all disabled:opacity-30"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(
                sorted.map((e) => ({
                  "@context": "https://schema.org",
                  "@type": "Event",
                  name: e.title,
                  description: e.description,
                  startDate: e.dateISO,
                  location: { "@type": "Place", name: e.location },
                  ...(e.image && {
                    image: `https://navylet.ai${e.image}`,
                  }),
                  organizer: {
                    "@type": "Organization",
                    name: "навылет AI",
                    url: "https://navylet.ai",
                  },
                }))
              ),
            }}
          />
        </motion.div>
      </section>

      {/* Event detail modal */}
      <AnimatePresence>
        {activeEvent && (
          <EventModal
            event={activeEvent}
            onClose={() => setActiveEvent(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
