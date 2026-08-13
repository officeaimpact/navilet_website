"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { chatMessageVariant } from "@/lib/animations";
import type {
  DemoQuickReply,
  DemoScenario,
  DemoTourCard,
} from "@/lib/scenarios";
import {
  RotateCcw,
  Lightbulb,
  LightbulbOff,
  Search,
  Link2,
  Check,
  ArrowLeft,
  Star,
  ShieldCheck,
} from "lucide-react";
import Image from "next/image";

/** Ответ ассистента после «Передать менеджеру» — как в версии «Лид». */
const HANDOFF_REPLY =
  "Передал запрос менеджеру вместе с подборкой и вашими параметрами. Он свяжется с вами и оформит выбранный вариант — обычно в течение 15 минут.";

const priceOf = (card: DemoTourCard) => ({
  value: (card.price_per_person ?? card.price).toLocaleString("ru-RU") + " ₽",
  label: card.price_per_person
    ? "за человека"
    : card.flight_included
      ? "за тур"
      : "за проживание",
});

function TypingIndicator() {
  return (
    <div className="flex items-center gap-2">
      <BotAvatar />
      <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md bg-[#F8F9FA] px-4 py-3">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="h-[6px] w-[6px] rounded-full bg-[#0097F5]"
            animate={{ opacity: [0.3, 1, 0.3], scale: [0.85, 1, 0.85] }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
          />
        ))}
      </div>
    </div>
  );
}

function BotAvatar() {
  return (
    <div
      className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full"
      style={{ background: "linear-gradient(135deg, #0062EF, #0097F5)" }}
    >
      <svg viewBox="0 0 24 24" fill="white" className="h-4 w-4">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
      </svg>
    </div>
  );
}

function UserAvatar() {
  return (
    <div
      className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full"
      style={{ background: "linear-gradient(135deg, #1976D2, #1565C0)" }}
    >
      <svg viewBox="0 0 24 24" fill="white" className="h-4 w-4">
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
      </svg>
    </div>
  );
}

function TourCard({ card }: { card: DemoTourCard }) {
  const priceDisplay = card.price_per_person
    ? `${card.price_per_person.toLocaleString("ru-RU")} ₽`
    : `${card.price.toLocaleString("ru-RU")} ₽`;
  const priceLabel = card.price_per_person
    ? "за человека"
    : card.flight_included
      ? "за тур"
      : "за проживание";
  const starsText = "★".repeat(card.hotel_stars);
  const bookBtnText = card.flight_included ? "✈️ Оформить тур" : "🏨 Забронировать";

  return (
    <div className="tour-card min-w-[220px] w-[220px] flex-shrink-0 overflow-hidden rounded-xl border border-[#E0E0E0]/60 bg-white shadow-sm transition-transform hover:-translate-y-0.5 hover:shadow-md">
      {/* Photo */}
      <div className="relative h-[130px] w-full overflow-hidden bg-[#f0f0f0]">
        <img
          src={card.image_url}
          alt={card.hotel_name}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          loading="lazy"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = "none";
            if (target.parentElement) {
              target.parentElement.innerHTML =
                '<div style="display:flex;align-items:center;justify-content:center;height:100%;background:linear-gradient(135deg,#0062EF22,#0097F522);font-size:32px;">🏨</div>';
            }
          }}
        />
        <div
          className="absolute left-2 top-2 rounded px-2 py-1 text-[11px] font-semibold backdrop-blur-md"
          style={{ background: "rgba(0,0,0,0.7)", color: "#FFD700", letterSpacing: "0.5px" }}
        >
          {starsText}
        </div>
        <div
          className="absolute right-2 top-2 flex items-center gap-0.5 rounded px-1.5 py-1 text-[10px] font-bold text-white"
          style={{ background: "rgba(39,174,96,0.95)" }}
        >
          <span style={{ color: "#FFD700", fontSize: "9px" }}>★</span>
          {card.hotel_rating}
        </div>
        {card.discount && (
          <div className="absolute bottom-2 right-2 rounded-md bg-red-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
            -{card.discount}%
          </div>
        )}
        {!card.flight_included && (
          <div className="absolute bottom-2 left-2 rounded-md bg-amber-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
            Без перелёта
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-2.5">
        <div className="mb-1 truncate text-[13px] font-bold leading-tight text-[#2C3E50]">
          {card.hotel_name}
        </div>
        <div className="mb-1.5 text-[11px] text-[#7F8C8D]">
          📍 {card.country}, {card.resort}
        </div>

        {/* Info rows */}
        <div className="mb-2 space-y-1">
          {card.flight_included && (
            <div className="flex items-center gap-1.5 rounded-md bg-[#27AE60]/10 px-1.5 py-1 text-[11px] font-medium text-[#27AE60]">
              ✈️ {card.departure_city}
            </div>
          )}
          <div className="flex flex-wrap gap-x-3 text-[11px] text-[#2C3E50]">
            <span>📅 {card.date_from} — {card.date_to}</span>
            <span>🌙 {card.nights} ноч.</span>
          </div>
          <div className="text-[11px] text-[#2C3E50]">🍽️ {card.meal_description}</div>
          <div className="text-[11px] text-[#95A5A6]">🛏️ {card.room_type}</div>
        </div>

        {/* Price */}
        <div className="mb-2.5">
          <div className="text-[17px] font-extrabold text-[#0062EF]">
            {priceDisplay}
          </div>
          <div className="text-[10px] text-[#7F8C8D]">{priceLabel}</div>
          {card.price_per_person && (
            <div className="mt-0.5 text-[10px] text-[#95A5A6]">
              {card.price.toLocaleString("ru-RU")} ₽ за двоих
            </div>
          )}
        </div>

        {/* Action button */}
        <button
          className="flex w-full items-center justify-center gap-1 rounded-lg py-2 text-[12px] font-semibold text-white transition-all hover:-translate-y-px hover:shadow-md active:translate-y-0"
          style={{
            background: "linear-gradient(135deg, #0062EF, #0097F5)",
            boxShadow: "0 2px 8px rgba(0, 98, 239, 0.25)",
          }}
        >
          {bookBtnText}
        </button>
      </div>
    </div>
  );
}

/**
 * Мини-версия публичной страницы подборки (`lk.navilet.ru/share/…`), которую
 * клиент открывает из чата или получает ссылкой в мессенджере. Здесь она
 * показана внутри виджета, чтобы объяснить механику без перехода на страницу.
 */
function CollectionPreview({
  title,
  cards,
  onBack,
}: {
  title: string;
  cards: DemoTourCard[];
  onBack: () => void;
}) {
  const [openCard, setOpenCard] = useState<number | null>(null);
  const [booked, setBooked] = useState<number | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.25 }}
      data-collection-page
      className="absolute inset-0 z-20 flex flex-col bg-white"
    >
      <div className="flex items-center justify-between gap-2 border-b border-[#E0E0E0]/60 bg-[#F8F9FA] px-3 py-2">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg px-2 py-1.5 text-[12px] font-semibold text-[#0062EF] transition-colors hover:bg-[#0062EF]/8"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Вернуться в диалог
        </button>
        <span className="rounded-full bg-[#0062EF]/8 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#0062EF]">
          Страница для клиента
        </span>
      </div>

      <div className="flex-1 overflow-y-auto overscroll-contain">
        <div className="flex items-center gap-2.5 px-4 pb-3 pt-3.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0062EF]/10">
            <Image
              src="/logo-icon.svg"
              alt="Логотип агентства"
              width={20}
              height={18}
              className="h-4 w-auto"
            />
          </div>
          <div className="min-w-0">
            <div className="truncate text-[12px] font-bold text-[#2C3E50]">
              Ваше агентство
            </div>
            <div className="truncate text-[10px] text-[#95A5A6]">
              логотип, цвет и контакты — ваши
            </div>
          </div>
        </div>

        <div className="px-4">
          <h4 className="text-[15px] font-bold leading-snug text-[#2C3E50]">
            {title}
          </h4>
          <p className="mt-1 text-[11px] text-[#7F8C8D]">
            {cards.length} варианта · цены актуальны · ссылка живёт 7 дней
          </p>
        </div>

        <div className="mt-3 space-y-2 px-4 pb-4">
          {cards.map((card, i) => {
            const price = priceOf(card);
            return (
              <div
                key={i}
                className="flex gap-2.5 rounded-xl border border-[#E0E0E0]/70 bg-white p-2.5"
              >
                <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-[#f0f0f0]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={card.image_url}
                    alt={card.hotel_name}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1">
                    <span className="truncate text-[12px] font-bold text-[#2C3E50]">
                      {card.hotel_name}
                    </span>
                    <span className="flex flex-shrink-0 items-center gap-0.5 text-[10px] font-semibold text-[#F39C12]">
                      <Star className="h-2.5 w-2.5 fill-current" />
                      {card.hotel_stars}
                    </span>
                  </div>
                  <div className="truncate text-[10px] text-[#7F8C8D]">
                    {card.resort}, {card.country} · {card.date_from}–
                    {card.date_to} · {card.nights} ноч.
                  </div>
                  <div className="mt-1 flex flex-wrap items-end justify-between gap-x-2 gap-y-1">
                    <div className="whitespace-nowrap">
                      <span className="text-[13px] font-extrabold text-[#0062EF]">
                        {price.value}
                      </span>
                      <span className="ml-1 text-[9px] text-[#95A5A6]">
                        {price.label}
                      </span>
                    </div>
                    {booked === i ? (
                      <span className="inline-flex items-center gap-1 rounded-md bg-[#27AE60]/10 px-1.5 py-1 text-[10px] font-semibold text-[#27AE60]">
                        <Check className="h-3 w-3" />
                        Заявка у менеджера
                      </span>
                    ) : (
                      <div className="flex gap-1">
                        <button
                          type="button"
                          onClick={() =>
                            setOpenCard((c) => (c === i ? null : i))
                          }
                          aria-expanded={openCard === i}
                          className="cursor-pointer rounded-md border border-[#E0E0E0] px-1.5 py-1 text-[10px] font-semibold text-[#7F8C8D] transition-colors hover:border-[#0062EF]/40 hover:text-[#0062EF]"
                        >
                          Подробнее
                        </button>
                        <button
                          type="button"
                          onClick={() => setBooked(i)}
                          className="cursor-pointer rounded-md bg-[#0062EF] px-1.5 py-1 text-[10px] font-semibold text-white transition-all hover:brightness-110"
                        >
                          Забронировать
                        </button>
                      </div>
                    )}
                  </div>

                  {openCard === i && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-2 space-y-0.5 overflow-hidden border-t border-[#E0E0E0]/70 pt-2 text-[10px] text-[#7F8C8D]"
                    >
                      <div>Питание: {card.meal_description}</div>
                      <div>Номер: {card.room_type}</div>
                      <div>Туроператор: {card.operator}</div>
                      <div>
                        {card.flight_included
                          ? `Перелёт включён (вылет: ${card.departure_city})`
                          : "Без перелёта — только проживание"}
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex items-start gap-2 border-t border-[#E0E0E0]/60 bg-[#F8F9FA] px-4 py-2.5">
        <ShieldCheck className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-[#27AE60]" />
        <p className="text-[10px] leading-relaxed text-[#7F8C8D]">
          Клиент бронирует прямо здесь — заявка с выбранным вариантом уходит
          менеджеру. Никаких ссылок на сторонние сайты.
        </p>
      </div>
    </motion.div>
  );
}

interface DemoWidgetProps {
  scenario: DemoScenario | null;
  className?: string;
  /**
   * Диалог останавливается на кнопках-подсказках и ждёт клика — для секции,
   * где посетитель сам ведёт демонстрацию. В hero-иллюстрации выключено:
   * там сценарий проигрывается сам.
   */
  interactive?: boolean;
}

export default function DemoWidget({
  scenario,
  className = "",
  interactive = false,
}: DemoWidgetProps) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [showTyping, setShowTyping] = useState(false);
  const [playKey, setPlayKey] = useState(0);
  const [hintsOn, setHintsOn] = useState(true);
  const [handoff, setHandoff] = useState(false);
  const [collectionCards, setCollectionCards] = useState<DemoTourCard[] | null>(
    null
  );
  const [linkReady, setLinkReady] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const messages = scenario?.messages ?? [];
  const isFinished = scenario && (visibleCount >= messages.length || handoff);

  const resetPlayback = () => {
    setVisibleCount(0);
    setShowTyping(false);
    setHandoff(false);
    setCollectionCards(null);
    setLinkReady(false);
    setPlayKey((k) => k + 1);
  };

  useEffect(() => {
    setVisibleCount(0);
    setShowTyping(false);
    setHandoff(false);
    setCollectionCards(null);
    setLinkReady(false);
    setPlayKey((k) => k + 1);
  }, [scenario?.id]);

  /** Клик по кнопке-подсказке: продолжить диалог или передать менеджеру. */
  const handleQuickReply = (qr: DemoQuickReply) => {
    if (qr.action === "handoff") {
      setShowTyping(false);
      setHandoff(true);
      return;
    }
    setShowTyping(false);
    setVisibleCount((c) => Math.min(c + 1, messages.length));
  };

  const handleShare = () => {
    setLinkReady(true);
    window.setTimeout(() => setLinkReady(false), 2600);
  };

  useEffect(() => {
    if (!scenario || handoff || visibleCount >= messages.length) return;

    // На кнопках-подсказках ждём выбор посетителя; без них сценарий идёт сам,
    // только даём время прочитать подсказки.
    const lastShown = visibleCount > 0 ? messages[visibleCount - 1] : null;
    const chipsPending = Boolean(
      hintsOn && lastShown?.quickReplies?.length && lastShown.role === "assistant"
    );
    if (chipsPending && interactive) return;

    const nextMsg = messages[visibleCount];
    const prevDelay = visibleCount > 0 ? messages[visibleCount - 1].delay : 0;
    const baseWait = (nextMsg.delay - prevDelay) * 1000;
    const wait =
      visibleCount === 0
        ? 300
        : Math.max(baseWait, chipsPending ? 3800 : 600);

    if (nextMsg.role === "assistant") {
      setShowTyping(true);
      const typingWait = Math.max(wait, 800);
      const typingTimer = setTimeout(() => {
        setShowTyping(false);
        setVisibleCount((c) => c + 1);
      }, typingWait);
      return () => clearTimeout(typingTimer);
    } else {
      const timer = setTimeout(() => {
        setVisibleCount((c) => c + 1);
      }, Math.max(wait, 400));
      return () => clearTimeout(timer);
    }
  }, [visibleCount, scenario, messages, playKey, handoff, hintsOn, interactive]);

  // Scroll ONLY within the widget container, not the page
  useEffect(() => {
    if (scrollContainerRef.current) {
      const el = scrollContainerRef.current;
      el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    }
  }, [visibleCount, showTyping]);

  const idleState = !scenario;

  return (
    <div
      data-product-mock="widget"
      className={`demo-widget @container relative flex h-[480px] flex-col overflow-hidden rounded-2xl border border-[#E0E0E0]/50 bg-white shadow-xl sm:h-[600px] ${className}`}
    >
      {/* Header */}
      <div
        className="flex items-center gap-2.5 px-4 py-3"
        style={{
          background: "linear-gradient(135deg, #0062EF, #0097F5, #00CCF5)",
        }}
      >
        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-white/20 p-1">
          <Image
            src="/logo-icon.svg"
            alt="Навылет! AI — ИИ-ассистент"
            width={28}
            height={24}
            className="h-6 w-auto brightness-0 invert"
          />
        </div>
        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-semibold text-white">
            ИИ-ассистент
          </div>
          <div className="flex items-center gap-1.5 text-xs text-white/70">
            <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
            Онлайн
          </div>
        </div>
        {/* Подсказки можно выключить и включить — чтобы попробовать диалог
            и с кнопками, и без них. */}
        <button
          type="button"
          onClick={() => setHintsOn((v) => !v)}
          aria-pressed={hintsOn}
          title={hintsOn ? "Убрать подсказки" : "Показать подсказки"}
          className="inline-flex h-9 flex-shrink-0 cursor-pointer items-center gap-1.5 rounded-full bg-white/15 px-3 text-[11px] font-semibold text-white transition-colors hover:bg-white/25"
        >
          {hintsOn ? (
            <Lightbulb className="h-3.5 w-3.5" />
          ) : (
            <LightbulbOff className="h-3.5 w-3.5" />
          )}
          <span className="hidden @[360px]:inline">
            {hintsOn ? "Убрать подсказки" : "Подсказки"}
          </span>
        </button>
      </div>

      {/* Messages area */}
      <div
        ref={scrollContainerRef}
        className="flex-1 space-y-3 overflow-y-auto overscroll-contain p-4"
      >
        {idleState && (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-ice">
              <Image
                src="/logo-icon.svg"
                alt="Навылет! AI — выберите сценарий демонстрации"
                width={32}
                height={28}
                className="h-7 w-auto"
              />
            </div>
            <p className="mb-1 text-sm font-semibold text-heading">
              Выберите сценарий
            </p>
            <p className="max-w-[240px] text-xs leading-relaxed text-muted">
              Нажмите на один из сценариев, чтобы увидеть ИИ-ассистента в
              действии
            </p>
          </div>
        )}

        <AnimatePresence mode="popLayout">
          {messages.slice(0, visibleCount).map((msg, i) => (
            <motion.div
              key={`${playKey}-${i}`}
              variants={chatMessageVariant}
              initial="hidden"
              animate="visible"
              className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
            >
              {msg.role === "user" ? <UserAvatar /> : <BotAvatar />}

              <div
                className={`flex max-w-[80%] flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed ${
                    msg.role === "user"
                      ? "rounded-br-md bg-gradient-to-br from-[#1976D2] to-[#1565C0] text-white"
                      : "rounded-bl-md bg-[#F8F9FA] text-[#2C3E50] shadow-[0_1px_3px_rgba(0,0,0,0.06)]"
                  }`}
                >
                  <span className="whitespace-pre-line">{msg.text}</span>
                </div>

                {msg.cards && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="mt-2 w-full"
                  >
                    <div
                      className="demo-cards-scroll flex gap-2.5 overflow-x-auto pb-2"
                      style={{ scrollbarWidth: "thin" }}
                      onWheel={(e) => {
                        const el = e.currentTarget;
                        if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) {
                          el.scrollLeft += e.deltaY;
                        }
                      }}
                    >
                      {msg.cards.map((card, ci) => (
                        <TourCard key={ci} card={card} />
                      ))}
                    </div>
                    <div className="mt-1 flex items-center justify-between text-[10px] text-[#95A5A6]">
                      <span>Найдено {msg.cards.length} тура</span>
                      <span>← листайте →</span>
                    </div>

                    {/* Как в реальном виджете: подборку можно открыть
                        страницей или отправить клиенту ссылкой. */}
                    <div className="mt-1.5 flex gap-1.5">
                      <button
                        type="button"
                        onClick={() => setCollectionCards(msg.cards ?? null)}
                        className="flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-[10px] bg-[#0062EF] px-2 py-2 text-[11.5px] font-semibold text-white transition-all hover:brightness-110"
                      >
                        <Search className="h-3.5 w-3.5" />
                        Смотреть подборку
                      </button>
                      <button
                        type="button"
                        onClick={handleShare}
                        className="flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-[10px] border-2 border-[#0062EF] bg-white px-2 py-[6px] text-[11.5px] font-semibold text-[#0062EF] transition-colors hover:bg-[#0062EF] hover:text-white"
                      >
                        {linkReady ? (
                          <Check className="h-3.5 w-3.5" />
                        ) : (
                          <Link2 className="h-3.5 w-3.5" />
                        )}
                        {linkReady ? "Ссылка готова" : "Поделиться"}
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Кнопки-подсказки живут только под последним ответом —
                    так же, как контракт quick_replies в виджете. */}
                {hintsOn &&
                  msg.quickReplies &&
                  msg.role === "assistant" &&
                  i === visibleCount - 1 &&
                  !showTyping &&
                  !handoff && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.45, duration: 0.35 }}
                      className="mt-2 flex flex-wrap gap-1.5"
                    >
                      {msg.quickReplies.map((qr) => (
                        <button
                          key={qr.text}
                          type="button"
                          onClick={() => handleQuickReply(qr)}
                          className="cursor-pointer rounded-full border-2 border-[#0062EF] bg-white px-3 py-1.5 text-[11.5px] font-medium text-[#0062EF] transition-colors hover:bg-[#0062EF] hover:text-white"
                        >
                          {qr.text}
                        </button>
                      ))}
                    </motion.div>
                  )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {handoff && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <div className="flex flex-row gap-2">
              <BotAvatar />
              <div className="flex max-w-[80%] flex-col items-start">
                <div className="rounded-2xl rounded-bl-md bg-[#F8F9FA] px-3.5 py-2.5 text-[13px] leading-relaxed text-[#2C3E50] shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
                  {HANDOFF_REPLY}
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center gap-1 rounded-xl bg-[#F8F9FA] px-4 py-3 text-center">
              <span className="text-[12px] font-semibold text-[#2C3E50]">
                Диалог завершён
              </span>
              <span className="text-[11px] text-[#7F8C8D]">
                Заявка с подборкой ушла менеджеру и в CRM
              </span>
            </div>
          </motion.div>
        )}

        {showTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <TypingIndicator />
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Страница подборки перекрывает чат: у клиента она открывается
          отдельной вкладкой по ссылке. */}
      <AnimatePresence>
        {collectionCards && (
          <CollectionPreview
            title={scenario?.collectionTitle ?? "Подборка туров"}
            cards={collectionCards}
            onBack={() => setCollectionCards(null)}
          />
        )}
      </AnimatePresence>

      {/* Footer */}
      <div className="border-t border-[#E0E0E0]/40 bg-white px-4 py-3">
        {isFinished ? (
          <motion.button
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={resetPlayback}
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#F8F9FA] py-2.5 text-sm font-medium text-accent transition-colors hover:bg-accent/5"
          >
            <RotateCcw className="h-4 w-4" />
            {handoff ? "Начать новый подбор" : "Воспроизвести снова"}
          </motion.button>
        ) : (
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              placeholder="Введите ваш запрос..."
              className="flex-1 rounded-xl border border-[#E0E0E0] bg-white px-3.5 py-2.5 text-sm text-[#2C3E50] outline-none placeholder:text-[#95A5A6]"
            />
            <button
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl text-white"
              style={{
                background: "linear-gradient(135deg, #0062EF, #0097F5)",
              }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          </div>
        )}
        <div className="mt-2 text-center text-[10px] text-[#BDC3C7]">
          Powered by{" "}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-short.svg" alt="Навылет! AI" className="inline-block h-3 align-middle ml-0.5" draggable={false} />
        </div>
      </div>
    </div>
  );
}
