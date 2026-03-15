import {
  Search,
  MessageSquare,
  Clock,
  Laptop,
  BookmarkCheck,
  ArrowLeft,
  MapPin,
  Star,
  Utensils,
  Calendar,
  Moon,
  Plane,
  Play,
  CheckCircle,
  Image,
} from "lucide-react";

interface RealConversationsContentProps {
  compact?: boolean;
}

const TABLE_ROWS = [
  {
    dot: "#10B981",
    preview: "Хочу тур в Турцию на двоих, всё включено на 7 ночей",
    msgs: 12,
    searches: 3,
    time: "14:23",
  },
  {
    dot: "#F59E0B",
    preview: "Подскажите горящие туры в Египет из Москвы",
    msgs: 8,
    searches: 2,
    time: "13:45",
  },
  {
    dot: "#10B981",
    preview: "Есть ли туры в Мальдивы в марте на 10 дней?",
    msgs: 15,
    searches: 4,
    time: "12:18",
  },
  {
    dot: "#F59E0B",
    preview: "Сколько стоит перелёт в Дубай бизнес-классом?",
    msgs: 5,
    searches: 1,
    time: "11:52",
  },
  {
    dot: "#CBD5E1",
    preview: "Можно узнать про визу в Таиланд?",
    msgs: 3,
    searches: 0,
    time: "10:30",
  },
  {
    dot: "#10B981",
    preview: "Ищу тур в Доминикану, вылет из СПб, 2 взрослых",
    msgs: 18,
    searches: 5,
    time: "09:15",
  },
];

const CHAT_MESSAGES = [
  {
    role: "user" as const,
    text: "Здравствуйте! Ищу тур в Турцию на двоих, всё включено, 7 ночей",
    time: "14:23",
  },
  {
    role: "bot" as const,
    text: "Здравствуйте! Подскажите, пожалуйста, из какого города вы планируете вылет и в какие даты?",
    time: "14:23",
  },
  {
    role: "user" as const,
    text: "Из Москвы, в конце марта, бюджет до 200 000 ₽",
    time: "14:24",
  },
  {
    role: "bot" as const,
    text: "Отлично! Нашёл несколько вариантов для вас:",
    time: "14:24",
    hasTourCards: true,
  },
];

const TOUR_CARDS = [
  {
    hotel: "Rixos Premium Belek",
    stars: 5,
    country: "Турция",
    resort: "Белек",
    meal: "Ultra All Inclusive",
    dates: "25 мар",
    nights: 7,
    operator: "Anex Tour",
    price: "187 450",
  },
  {
    hotel: "Calista Luxury Resort",
    stars: 5,
    country: "Турция",
    resort: "Белек",
    meal: "All Inclusive",
    dates: "26 мар",
    nights: 7,
    operator: "Pegas",
    price: "165 200",
  },
];

const TIMELINE_EVENTS = [
  { icon: Play, label: "Диалог начат", detail: "14:23", color: "#0038FF", bg: "#F0F4FF" },
  { icon: Search, label: "Поиск: Турция", detail: "14:24", color: "#3B82F6", bg: "#EFF6FF" },
  { icon: Image, label: "Показано 2 карточки", detail: "14:24", color: "#10B981", bg: "#ECFDF5" },
  { icon: CheckCircle, label: "Диалог завершён", detail: "14:46", color: "#64748B", bg: "#F1F5F9" },
];

export default function RealConversationsContent({
  compact = false,
}: RealConversationsContentProps) {
  const s = compact ? 0.85 : 1;

  if (compact) {
    return <CompactView s={s} />;
  }

  return (
    <div style={{ fontSize: 10 * s }}>
      {/* Back link */}
      <div
        className="flex items-center gap-1 text-[#64748B] group"
        style={{ fontSize: 8 * s, marginBottom: 5 * s }}
      >
        <ArrowLeft size={8 * s} />
        <span>Назад к диалогам</span>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {/* Chat replay (2 cols) */}
        <div
          className="col-span-2 rounded-xl bg-[#F1F5F9] overflow-hidden"
          style={{ boxShadow: "0 1px 3px rgba(0,56,255,0.06)" }}
        >
          {/* Chat header */}
          <div
            className="flex items-center justify-between"
            style={{ padding: `${5 * s}px ${8 * s}px` }}
          >
            <div className="flex items-center gap-2">
              <span
                className="font-semibold text-[#1E293B]"
                style={{ fontSize: 9 * s }}
              >
                Переписка
              </span>
              <span
                className="rounded-md bg-white/60 px-1.5 text-[#64748B]"
                style={{ fontSize: 6.5 * s, paddingBlock: 1 }}
              >
                12 сообщений
              </span>
            </div>
            <span
              className="flex items-center gap-0.5 rounded-md bg-white/60 px-1.5 text-[#64748B]"
              style={{ fontSize: 6.5 * s, paddingBlock: 1 }}
            >
              <Laptop size={7 * s} />
              Chrome
            </span>
          </div>

          {/* Messages */}
          <div
            style={{ padding: `${5 * s}px ${8 * s}px` }}
            className="space-y-2"
          >
            {CHAT_MESSAGES.map((msg, i) => (
              <div key={i}>
                <div
                  className={`flex gap-1.5 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  {/* Avatar */}
                  {msg.role === "bot" && (
                    <div
                      className="rounded-full bg-[#F0F4FF] flex items-center justify-center shrink-0"
                      style={{
                        width: 16 * s,
                        height: 16 * s,
                        marginTop: 1,
                      }}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#0038FF"
                        strokeWidth="2"
                        style={{ width: 9 * s, height: 9 * s }}
                      >
                        <rect x="3" y="11" width="18" height="10" rx="2" />
                        <circle cx="9" cy="16" r="1" fill="#0038FF" />
                        <circle cx="15" cy="16" r="1" fill="#0038FF" />
                        <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                      </svg>
                    </div>
                  )}
                  {msg.role === "user" && (
                    <div
                      className="rounded-full bg-[#F0F4FF] flex items-center justify-center shrink-0"
                      style={{
                        width: 16 * s,
                        height: 16 * s,
                        marginTop: 1,
                      }}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#0038FF"
                        strokeWidth="2"
                        style={{ width: 9 * s, height: 9 * s }}
                      >
                        <circle cx="12" cy="8" r="4" />
                        <path d="M20 21a8 8 0 1 0-16 0" />
                      </svg>
                    </div>
                  )}

                  <div className="flex flex-col" style={{ maxWidth: "72%" }}>
                    <div
                      className={`rounded-2xl px-2 py-1.5 leading-relaxed ${
                        msg.role === "user"
                          ? "bg-[#F0F4FF] text-[#1E293B] rounded-br-sm border border-[#0038FF]/10"
                          : "bg-white text-[#1E293B] rounded-bl-sm border border-[#E2E8F0]/60 shadow-sm"
                      }`}
                      style={{ fontSize: 7.5 * s }}
                    >
                      {msg.text}
                    </div>
                    <span
                      className={`text-[#94A3B8] mt-0.5 ${msg.role === "user" ? "text-right" : ""}`}
                      style={{ fontSize: 5.5 * s }}
                    >
                      {msg.time}
                    </span>
                  </div>
                </div>

                {/* Tour cards after bot message */}
                {msg.hasTourCards && (
                  <div style={{ marginLeft: 16 * s + 6, marginTop: 4 * s }}>
                    <div
                      className="border-t border-[#E2E8F0]/40 mb-1.5"
                      style={{ paddingTop: 3 * s }}
                    >
                      <span className="text-[#64748B]" style={{ fontSize: 6.5 * s }}>
                        Предложенные варианты
                      </span>
                    </div>
                    <div className="space-y-1.5">
                      {TOUR_CARDS.map((card, ci) => (
                        <TourCard key={ci} card={card} s={s} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right sidebar */}
        <div className="space-y-2">
          {/* Client profile */}
          <div
            className="rounded-xl bg-white"
            style={{
              padding: `${7 * s}px ${8 * s}px`,
              boxShadow: "0 1px 3px rgba(0,56,255,0.06)",
            }}
          >
            <div
              className="flex items-center justify-between"
              style={{ marginBottom: 5 * s }}
            >
              <span
                className="font-semibold text-[#1E293B]"
                style={{ fontSize: 9 * s }}
              >
                Профиль клиента
              </span>
              <span
                className="flex items-center gap-0.5 rounded-lg bg-[#ECFDF5] text-[#10B981] px-1.5"
                style={{ fontSize: 6.5 * s, paddingBlock: 2 }}
              >
                <BookmarkCheck size={7 * s} />
                Бронь
              </span>
            </div>

            {/* Device info */}
            <div
              className="flex items-center gap-2 border-b border-[#E2E8F0]/50 pb-2"
              style={{ marginBottom: 4 * s }}
            >
              <div
                className="flex items-center justify-center rounded-xl bg-[#F1F5F9]"
                style={{ width: 20 * s, height: 20 * s }}
              >
                <Laptop size={11 * s} className="text-[#64748B]" />
              </div>
              <div>
                <div
                  className="font-medium text-[#1E293B]"
                  style={{ fontSize: 7.5 * s }}
                >
                  Chrome · macOS
                </div>
                <div className="text-[#64748B]" style={{ fontSize: 6.5 * s }}>
                  185.23.xx.xx
                </div>
              </div>
            </div>

            {/* Info rows */}
            <div className="space-y-1.5">
              <InfoRow s={s} icon={Clock} label="Начало" value="2 мар, 14:23" />
              <InfoRow s={s} icon={Clock} label="Длительность" value="23 мин" />
              <InfoRow s={s} icon={Clock} label="Ср. время отв." value="1.1с" />
              <InfoRow s={s} icon={MessageSquare} label="Сообщений" value="12" />
              <InfoRow s={s} icon={Search} label="Поисков" value="3" />
            </div>
          </div>

          {/* Timeline */}
          <div
            className="rounded-xl bg-white"
            style={{
              padding: `${7 * s}px ${8 * s}px`,
              boxShadow: "0 1px 3px rgba(0,56,255,0.06)",
            }}
          >
            <span
              className="font-semibold text-[#1E293B] block"
              style={{ fontSize: 8 * s, marginBottom: 5 * s }}
            >
              Путь клиента
            </span>
            <div>
              {TIMELINE_EVENTS.map((ev, i) => {
                const Icon = ev.icon;
                const isLast = i === TIMELINE_EVENTS.length - 1;
                return (
                  <div key={i} className="flex gap-1.5">
                    <div className="flex flex-col items-center">
                      <div
                        className="flex items-center justify-center rounded-full shrink-0"
                        style={{
                          width: 14 * s,
                          height: 14 * s,
                          backgroundColor: ev.bg,
                          color: ev.color,
                        }}
                      >
                        <Icon size={7 * s} />
                      </div>
                      {!isLast && (
                        <div
                          className="bg-[#E2E8F0]/60"
                          style={{ width: 1, flex: 1, marginBlock: 1 }}
                        />
                      )}
                    </div>
                    <div style={{ paddingBottom: isLast ? 0 : 4 * s }}>
                      <div
                        className="font-medium text-[#1E293B] leading-tight"
                        style={{ fontSize: 6.5 * s }}
                      >
                        {ev.label}
                      </div>
                      <div className="text-[#94A3B8]" style={{ fontSize: 5.5 * s }}>
                        {ev.detail}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Search queries */}
          <div
            className="rounded-xl bg-white"
            style={{
              padding: `${6 * s}px ${8 * s}px`,
              boxShadow: "0 1px 3px rgba(0,56,255,0.06)",
            }}
          >
            <span
              className="font-semibold text-[#1E293B] block"
              style={{ fontSize: 7.5 * s, marginBottom: 3 * s }}
            >
              Поисковые запросы
            </span>
            <div className="space-y-1">
              {[
                "Турция, 7 ночей, AI, 5★",
                "Турция, Анталья, 7 ночей",
                "Белек, март, 2 взр.",
              ].map((q, i) => (
                <div
                  key={i}
                  className="flex items-center gap-1 text-[#64748B]"
                  style={{ fontSize: 6.5 * s }}
                >
                  <Search
                    size={6 * s}
                    className="text-[#94A3B8] shrink-0"
                  />
                  {q}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TourCard({ card, s }: { card: (typeof TOUR_CARDS)[0]; s: number }) {
  return (
    <div
      className="bg-white border border-[#E2E8F0]/60 rounded-xl flex gap-2 shadow-sm"
      style={{ padding: `${4 * s}px ${5 * s}px` }}
    >
      {/* Color indicator strip */}
      <div
        className="rounded-lg shrink-0 bg-gradient-to-b from-[#0038FF] to-[#3B82F6] overflow-hidden"
        style={{ width: 32 * s, height: 38 * s }}
      >
        <div className="w-full h-full flex items-end justify-center pb-0.5">
          <MapPin size={8 * s} className="text-white/70" />
        </div>
      </div>

      <div className="flex-1 min-w-0">
        {/* Hotel name + stars */}
        <div className="flex items-center gap-1" style={{ marginBottom: 1 }}>
          <span
            className="font-semibold text-[#1E293B] truncate"
            style={{ fontSize: 7.5 * s }}
          >
            {card.hotel}
          </span>
          <span className="flex items-center shrink-0">
            {Array.from({ length: card.stars }).map((_, i) => (
              <Star
                key={i}
                size={5.5 * s}
                fill="#F59E0B"
                className="text-[#F59E0B]"
              />
            ))}
          </span>
        </div>

        {/* Location */}
        <div
          className="flex items-center gap-0.5 text-[#64748B]"
          style={{ fontSize: 6 * s }}
        >
          <MapPin size={5.5 * s} className="shrink-0" />
          <span className="truncate">
            {card.country} / {card.resort}
          </span>
        </div>

        {/* Details row */}
        <div
          className="flex flex-wrap items-center gap-x-2 gap-y-0 text-[#64748B]"
          style={{ marginTop: 2 * s, fontSize: 5.5 * s }}
        >
          <span className="flex items-center gap-0.5">
            <Utensils size={5 * s} />
            {card.meal}
          </span>
          <span className="flex items-center gap-0.5">
            <Calendar size={5 * s} />
            {card.dates}
          </span>
          <span className="flex items-center gap-0.5">
            <Moon size={5 * s} />
            {card.nights} ноч.
          </span>
          <span className="flex items-center gap-0.5">
            <Plane size={5 * s} />
            {card.operator}
          </span>
        </div>

        {/* Price */}
        <div
          className="font-bold text-[#0038FF]"
          style={{ fontSize: 8 * s, marginTop: 2 * s }}
        >
          {card.price} ₽
        </div>
      </div>
    </div>
  );
}

function CompactView({ s }: { s: number }) {
  return (
    <div style={{ fontSize: 10 * s }}>
      {/* Header */}
      <div
        className="flex items-center justify-between"
        style={{ marginBottom: 5 * s }}
      >
        <div>
          <div
            className="font-bold text-[#1E293B]"
            style={{ fontSize: 12 * s }}
          >
            Диалоги
          </div>
          <div className="text-[#64748B]" style={{ fontSize: 8 * s }}>
            История всех разговоров клиентов с AI-ассистентом
          </div>
        </div>
        <div className="flex items-center gap-1">
          <div
            className="flex items-center gap-0.5 rounded-xl bg-white border border-[#E2E8F0]/60 px-2"
            style={{ height: 16 * s, fontSize: 7.5 * s }}
          >
            <Search size={8 * s} className="text-[#94A3B8]" />
            <span className="text-[#94A3B8]">Поиск</span>
          </div>
        </div>
      </div>

      {/* Filter badges */}
      <div
        className="flex items-center gap-1"
        style={{ marginBottom: 5 * s }}
      >
        {[
          {
            label: "Все",
            active: true,
            bg: "#1E293B",
            text: "white",
          },
          {
            label: "С карточками",
            active: false,
            bg: "#FEF3C7",
            text: "#D97706",
          },
          {
            label: "С бронью",
            active: false,
            bg: "#ECFDF5",
            text: "#10B981",
          },
        ].map((f) => (
          <span
            key={f.label}
            className="rounded-full font-medium"
            style={{
              fontSize: 7 * s,
              padding: `${1.5}px ${6 * s}px`,
              backgroundColor: f.bg,
              color: f.text,
              boxShadow: f.active
                ? "0 1px 2px rgba(0,0,0,0.1)"
                : undefined,
            }}
          >
            {f.label}
          </span>
        ))}
        <div className="flex items-center gap-1.5 ml-auto">
          {[
            { color: "#10B981", label: "Бронь" },
            { color: "#F59E0B", label: "Карточки" },
            { color: "#CBD5E1", label: "Чат" },
          ].map((l) => (
            <span
              key={l.label}
              className="flex items-center gap-0.5 text-[#94A3B8]"
              style={{ fontSize: 6 * s }}
            >
              <span
                className="rounded-full"
                style={{
                  width: 4.5 * s,
                  height: 4.5 * s,
                  backgroundColor: l.color,
                }}
              />
              {l.label}
            </span>
          ))}
        </div>
      </div>

      {/* Table */}
      <div
        className="rounded-xl bg-white overflow-hidden"
        style={{ boxShadow: "0 1px 3px rgba(0,56,255,0.06)" }}
      >
        {/* Table header */}
        <div
          className="flex items-center bg-[#F1F5F9]/60 text-[#64748B] font-semibold uppercase tracking-wider"
          style={{
            fontSize: 6 * s,
            padding: `${3.5 * s}px ${6 * s}px`,
          }}
        >
          <span style={{ width: "5%" }} />
          <span style={{ width: "55%" }}>Сообщение</span>
          <span style={{ width: "15%" }} className="text-center">
            Сообщ.
          </span>
          <span style={{ width: "15%" }} className="text-center">
            Поиски
          </span>
          <span style={{ width: "10%" }} className="text-right">
            Время
          </span>
        </div>
        {TABLE_ROWS.map((row, i) => (
          <div
            key={i}
            className="flex items-center border-t border-[#E2E8F0]/40 hover:bg-[#F0F4FF]/30 transition-colors"
            style={{ padding: `${3 * s}px ${6 * s}px` }}
          >
            <span style={{ width: "5%" }}>
              <span
                className="rounded-full block"
                style={{
                  width: 5 * s,
                  height: 5 * s,
                  backgroundColor: row.dot,
                }}
              />
            </span>
            <span
              className="text-[#1E293B] truncate"
              style={{ width: "55%", fontSize: 7.5 * s }}
            >
              {row.preview}
            </span>
            <span
              className="text-center flex items-center justify-center gap-0.5 text-[#64748B]"
              style={{ width: "15%", fontSize: 7 * s }}
            >
              <MessageSquare size={6 * s} />
              {row.msgs}
            </span>
            <span
              className="text-center flex items-center justify-center gap-0.5 text-[#64748B]"
              style={{ width: "15%", fontSize: 7 * s }}
            >
              <Search size={6 * s} />
              {row.searches}
            </span>
            <span
              className="text-right text-[#94A3B8]"
              style={{ width: "10%", fontSize: 6.5 * s }}
            >
              {row.time}
            </span>
          </div>
        ))}
        {/* Pagination */}
        <div
          className="flex items-center justify-between border-t border-[#E2E8F0]/40 bg-[#F1F5F9]/30"
          style={{ padding: `${3 * s}px ${6 * s}px` }}
        >
          <span className="text-[#94A3B8]" style={{ fontSize: 6 * s }}>
            1–6 из 2 847
          </span>
          <div className="flex items-center gap-1">
            <span className="text-[#94A3B8]" style={{ fontSize: 6 * s }}>
              ← Пред.
            </span>
            <span className="text-[#0038FF] font-semibold" style={{ fontSize: 6 * s }}>
              След. →
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoRow({
  s,
  icon: Icon,
  label,
  value,
}: {
  s: number;
  icon: typeof Clock;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1 text-[#64748B]">
        <Icon size={7 * s} className="shrink-0" />
        <span style={{ fontSize: 7 * s }}>{label}</span>
      </div>
      <span
        className="font-medium text-[#1E293B]"
        style={{ fontSize: 7 * s }}
      >
        {value}
      </span>
    </div>
  );
}
