import {
  MessagesSquare,
  BookmarkCheck,
  Search,
  Clock,
  TrendingUp,
  TrendingDown,
  MessageSquare,
  Zap,
} from "lucide-react";

interface RealOverviewContentProps {
  compact?: boolean;
}

const SPARKLINE_PATHS = {
  conversations: "M0,18 L8,16 L16,14 L24,15 L32,11 L40,13 L48,9 L56,7 L64,8 L72,5 L80,3",
  bookings: "M0,16 L8,15 L16,17 L24,13 L32,14 L40,10 L48,11 L56,8 L64,6 L72,7 L80,4",
  searches: "M0,15 L8,17 L16,13 L24,14 L32,10 L40,12 L48,8 L56,9 L64,6 L72,4 L80,5",
};

const METRICS = [
  {
    title: "Диалогов",
    value: "2 847",
    delta: 18,
    icon: MessagesSquare,
    sparkline: SPARKLINE_PATHS.conversations,
  },
  {
    title: "Запросы на бронь",
    value: "156",
    delta: 12,
    icon: BookmarkCheck,
    sparkline: SPARKLINE_PATHS.bookings,
  },
  {
    title: "Поисков туров",
    value: "1 234",
    delta: 0,
    icon: Search,
    sparkline: SPARKLINE_PATHS.searches,
  },
  {
    title: "Ср. время ответа",
    value: "1.2с",
    delta: -8,
    icon: Clock,
    sparkline: null,
  },
];

const FUNNEL_STEPS = [
  { label: "Все диалоги", value: 2847, color: "#0038FF" },
  { label: "Вовлечённые", value: 1923, color: "#1A4FFF" },
  { label: "С поиском туров", value: 1456, color: "#3B82F6" },
  { label: "С результатами", value: 1089, color: "#60A5FA" },
  { label: "Запросы на бронь", value: 156, color: "#10B981" },
  { label: "Потенц. лиды", value: 89, color: "#93C5FD" },
];

const RECENT_CONVERSATIONS = [
  { preview: "Хочу тур в Турцию на двоих, всё включено", msgs: 12, searches: 3, dot: "#10B981" },
  { preview: "Подскажите горящие туры в Египет", msgs: 8, searches: 2, dot: "#F59E0B" },
  { preview: "Сколько стоит перелёт в Дубай?", msgs: 5, searches: 1, dot: "#F59E0B" },
  { preview: "Есть ли туры в Мальдивы в марте?", msgs: 15, searches: 4, dot: "#10B981" },
  { preview: "Можно узнать про визу в Таиланд?", msgs: 3, searches: 0, dot: "#CBD5E1" },
];

const CHART_AREA_PATH =
  "M0,55 C14,52 28,45 42,42 C56,39 70,35 84,30 C98,25 112,28 126,22 C140,16 154,18 168,14 C182,10 196,12 210,8 C224,5 238,6 252,3 L252,70 L0,70 Z";
const CHART_LINE_PATH =
  "M0,55 C14,52 28,45 42,42 C56,39 70,35 84,30 C98,25 112,28 126,22 C140,16 154,18 168,14 C182,10 196,12 210,8 C224,5 238,6 252,3";

const INSIGHTS = [
  { text: "51% клиентов ищут туры через ассистента", color: "#0038FF" },
  { text: "38% запросов завершились показом предложений", color: "#0038FF" },
  { text: "5.5% клиентов проявляют интерес к бронированию", color: "#10B981" },
  { text: "Самое популярное направление: Турция (412 поисков)", color: "#0038FF" },
  { text: "Среднее время ответа ассистента: 1.2с", color: "#0038FF" },
  { text: "23% обращений поступают вне рабочего времени", color: "#0038FF" },
];

export default function RealOverviewContent({
  compact = false,
}: RealOverviewContentProps) {
  const s = compact ? 0.85 : 1;

  return (
    <div style={{ fontSize: 10 * s }}>
      {/* Greeting + period */}
      <div className="flex items-center justify-between" style={{ marginBottom: 8 * s }}>
        <div>
          <div
            className="font-bold text-[#1E293B]"
            style={{ fontSize: 12 * s }}
          >
            Добрый день, Администратор
          </div>
          <div className="text-[#64748B]" style={{ fontSize: 8.5 * s, marginTop: 1 }}>
            Вот что происходит с вашим AI-ассистентом
          </div>
        </div>
        {/* Period selector */}
        <div
          className="flex rounded-lg bg-white p-0.5"
          style={{ boxShadow: "0 1px 2px rgba(0,56,255,0.04)" }}
        >
          {["7 дн", "30 дн", "90 дн"].map((p, i) => (
            <div
              key={p}
              className={`rounded-md px-1.5 py-0.5 font-medium ${
                i === 1
                  ? "bg-[#0038FF] text-white"
                  : "text-[#64748B]"
              }`}
              style={{ fontSize: 7 * s }}
            >
              {p}
            </div>
          ))}
        </div>
      </div>

      {/* Metric cards */}
      <div
        className="grid grid-cols-2 gap-2 sm:grid-cols-4"
        style={{ marginBottom: 8 * s }}
      >
        {METRICS.map((m) => {
          const Icon = m.icon;
          return (
            <div
              key={m.title}
              className="rounded-xl bg-white"
              style={{
                padding: `${6 * s}px ${7 * s}px`,
                borderLeft: "2px solid rgba(0,56,255,0.4)",
                boxShadow: "0 1px 2px rgba(0,56,255,0.04)",
              }}
            >
              <div className="flex items-center justify-between">
                <span
                  className="font-medium text-[#64748B]"
                  style={{ fontSize: 7.5 * s }}
                >
                  {m.title}
                </span>
                <div
                  className="flex items-center justify-center rounded-md bg-[#F0F4FF]"
                  style={{
                    width: 14 * s,
                    height: 14 * s,
                  }}
                >
                  <Icon
                    size={8 * s}
                    className="text-[#0038FF]"
                    strokeWidth={1.8}
                  />
                </div>
              </div>
              <div className="flex items-end justify-between" style={{ marginTop: 3 * s }}>
                <div className="flex items-end gap-1">
                  <span
                    className="font-bold text-[#1E293B] whitespace-nowrap"
                    style={{ fontSize: 14 * s }}
                  >
                    {m.value}
                  </span>
                  {m.delta !== 0 && (
                    <span
                      className={`flex items-center gap-0.5 rounded-full px-1 font-semibold ${
                        m.delta > 0
                          ? "bg-[#ECFDF5] text-[#10B981]"
                          : "bg-[#FEF2F2] text-[#EF4444]"
                      }`}
                      style={{ fontSize: 6 * s, paddingBlock: 1 }}
                    >
                      {m.delta > 0 ? (
                        <TrendingUp size={6 * s} />
                      ) : (
                        <TrendingDown size={6 * s} />
                      )}
                      {m.delta > 0 ? "+" : ""}
                      {m.delta}%
                    </span>
                  )}
                </div>
                {m.sparkline && (
                  <svg
                    width={40 * s}
                    height={14 * s}
                    viewBox="0 0 80 20"
                    className="opacity-50"
                  >
                    <polyline
                      points={m.sparkline
                        .replace(/M|L/g, "")
                        .trim()
                        .replace(/\s+/g, " ")}
                      fill="none"
                      stroke="#0038FF"
                      strokeWidth="1.5"
                    />
                  </svg>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Chart + funnel row */}
      <div
        className="grid grid-cols-1 gap-2 sm:grid-cols-[2fr_1fr]"
        style={{ marginBottom: 8 * s }}
      >
        {/* Area chart */}
        <div
          className="rounded-xl bg-white"
          style={{
            padding: `${6 * s}px ${7 * s}px`,
            boxShadow: "0 1px 2px rgba(0,56,255,0.04)",
          }}
        >
          <div className="flex items-center justify-between" style={{ marginBottom: 4 * s }}>
            <span
              className="font-semibold text-[#1E293B]"
              style={{ fontSize: 8 * s }}
            >
              Динамика
            </span>
            <div className="flex rounded-md bg-[#F1F5F9] p-0.5">
              {["Диалоги", "Бронь", "Поиски"].map((t, i) => (
                <span
                  key={t}
                  className={`rounded-md px-1 py-0.5 font-medium ${
                    i === 0
                      ? "bg-[#0038FF] text-white shadow-sm"
                      : "text-[#64748B]"
                  }`}
                  style={{ fontSize: 6 * s }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
          <svg
            viewBox="0 0 252 70"
            className="w-full"
            style={{ height: compact ? 55 : 75 }}
          >
            <defs>
              <linearGradient id="oAreaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0038FF" stopOpacity="0.12" />
                <stop offset="100%" stopColor="#0038FF" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* Grid lines */}
            {[18, 35, 52].map((y) => (
              <line
                key={y}
                x1="0"
                y1={y}
                x2="252"
                y2={y}
                stroke="#E2E8F0"
                strokeDasharray="3 3"
              />
            ))}
            <path d={CHART_AREA_PATH} fill="url(#oAreaGrad)" />
            <path
              d={CHART_LINE_PATH}
              fill="none"
              stroke="#0038FF"
              strokeWidth="1.8"
            />
            {/* X-axis labels */}
            {["18 фев", "22 фев", "26 фев", "2 мар"].map((l, i) => (
              <text
                key={l}
                x={i * 84}
                y="70"
                fill="#94A3B8"
                fontSize="5"
              >
                {l}
              </text>
            ))}
          </svg>
        </div>

        {/* Conversion funnel */}
        <div
          className="rounded-xl bg-white"
          style={{
            padding: `${6 * s}px ${7 * s}px`,
            boxShadow: "0 1px 2px rgba(0,56,255,0.04)",
          }}
        >
          <span
            className="font-semibold text-[#1E293B] block"
            style={{ fontSize: 8 * s, marginBottom: 4 * s }}
          >
            Воронка конверсии
          </span>
          <div className="space-y-1">
            {FUNNEL_STEPS.map((step) => {
              const pct = (step.value / FUNNEL_STEPS[0].value) * 100;
              return (
                <div key={step.label}>
                  <div className="flex items-center justify-between">
                    <span
                      className="font-medium text-[#1E293B]"
                      style={{ fontSize: 6 * s }}
                    >
                      {step.label}
                    </span>
                    <span
                      className="font-semibold text-[#1E293B]"
                      style={{ fontSize: 6.5 * s }}
                    >
                      {step.value.toLocaleString("ru-RU")}
                    </span>
                  </div>
                  <div
                    className="rounded-full bg-[#F1F5F9] overflow-hidden"
                    style={{ height: 3 * s }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${Math.max(pct, 3)}%`,
                        backgroundColor: step.color,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Insights */}
      {!compact && (
        <div
          className="rounded-xl bg-white"
          style={{
            padding: `${6 * s}px ${7 * s}px`,
            boxShadow: "0 1px 2px rgba(0,56,255,0.04)",
            marginBottom: 6 * s,
          }}
        >
          <div className="flex items-center gap-1" style={{ marginBottom: 3 * s }}>
            <div
              className="flex items-center justify-center rounded-md bg-[#FFFBEB]"
              style={{ width: 12 * s, height: 12 * s }}
            >
              <Zap size={7 * s} className="text-[#F59E0B]" />
            </div>
            <span className="font-semibold text-[#1E293B]" style={{ fontSize: 8 * s }}>
              Быстрые инсайты
            </span>
          </div>
          <div className="grid grid-cols-1 gap-x-3 gap-y-0.5 sm:grid-cols-2">
            {INSIGHTS.map((ins, i) => (
              <div key={i} className="flex items-start gap-1">
                <TrendingUp
                  size={6 * s}
                  style={{ color: ins.color, marginTop: 1 }}
                  className="shrink-0"
                />
                <span className="text-[#64748B]" style={{ fontSize: 6.5 * s }}>
                  {ins.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent conversations */}
      {!compact && (
        <div
          className="rounded-xl bg-white overflow-hidden"
          style={{ boxShadow: "0 1px 2px rgba(0,56,255,0.04)" }}
        >
          <div
            className="flex items-center justify-between"
            style={{ padding: `${5 * s}px ${7 * s}px` }}
          >
            <span
              className="font-semibold text-[#1E293B]"
              style={{ fontSize: 8 * s }}
            >
              Последние диалоги
            </span>
            <span
              className="font-medium text-[#0038FF]"
              style={{ fontSize: 7 * s }}
            >
              Все диалоги →
            </span>
          </div>
          <div className="border-t border-[#E2E8F0]/50">
            {RECENT_CONVERSATIONS.map((conv, i) => (
              <div
                key={i}
                className="flex items-center gap-1.5 border-b border-[#E2E8F0]/30 last:border-0"
                style={{
                  padding: `${3 * s}px ${7 * s}px`,
                }}
              >
                <span
                  className="rounded-full shrink-0"
                  style={{
                    width: 4 * s,
                    height: 4 * s,
                    backgroundColor: conv.dot,
                  }}
                />
                <span
                  className="flex-1 text-[#1E293B] truncate"
                  style={{ fontSize: 7 * s }}
                >
                  {conv.preview}
                </span>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="flex items-center gap-0.5 text-[#94A3B8]" style={{ fontSize: 6 * s }}>
                    <MessageSquare size={6 * s} />
                    {conv.msgs}
                  </span>
                  <span className="flex items-center gap-0.5 text-[#94A3B8]" style={{ fontSize: 6 * s }}>
                    <Search size={6 * s} />
                    {conv.searches}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
