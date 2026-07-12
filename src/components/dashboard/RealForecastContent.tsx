import {
  CalendarClock,
  Sparkles,
  RefreshCw,
  HelpCircle,
  Leaf,
  TrendingUp,
  TrendingDown,
  Minus,
  MessageSquare,
  MousePointerClick,
  Wallet,
  Globe2,
} from "lucide-react";

interface RealForecastContentProps {
  compact?: boolean;
}

const SEMANTIC_COLORS = ["#0038FF", "#F59E0B", "#10B981", "#EF4444", "#8B5CF6"];

/** Прогноз до конца месяца (герой). Демо-цифры одного агентства. */
const MONTH = {
  label: "Июль",
  elapsedDays: 12,
  totalDays: 31,
  trend: "1.08",
  dialogs: "≈ 340",
  dialogsMtd: "факт: 124",
  engaged: "≈ 60",
  engagedMtd: "факт: 22",
  paid: "1,1–2,2 млн ₽",
  income: "доход ≈ 110–220 тыс. ₽",
};

const AI_LINES = [
  "Спрос на Египет растёт — по сети +6 п.п. за 2 недели, стоит усилить направление.",
  "Пик заявок ожидается в выходные 19–20 июля — проверьте загрузку менеджеров.",
  "Ваш средний чек интереса выше сети — есть запас для премиальных предложений.",
];

const FACT = [
  { label: "Диалогов", value: "486", accent: "#0038FF", icon: MessageSquare },
  { label: "С интересом", value: "12%", accent: "#8B5CF6", icon: MousePointerClick },
  { label: "Ср. чек интереса", value: "182 тыс. ₽", accent: "#10B981", icon: Wallet },
  { label: "Корзина интереса", value: "10,6 млн ₽", accent: "#F59E0B", icon: TrendingUp },
];

/** Барометр спроса по сети: доля спроса + тренд в п.п. + сезонность. */
const BAROMETER = [
  { country: "Турция", share: 34, pp: 2.1, season: true },
  { country: "Египет", share: 22, pp: 6.0, season: true },
  { country: "ОАЭ", share: 14, pp: -1.2, season: false },
  { country: "Таиланд", share: 9, pp: 0, season: false },
  { country: "Мальдивы", share: 6, pp: 1.4, season: true },
];

export default function RealForecastContent({
  compact = false,
}: RealForecastContentProps) {
  const s = compact ? 0.85 : 1;
  const maxShare = Math.max(...BAROMETER.map((b) => b.share));

  return (
    <div style={{ fontSize: 10 * s }}>
      {/* Header */}
      <div
        className="flex items-center justify-between"
        style={{ marginBottom: 6 * s }}
      >
        <div>
          <div className="font-bold text-[#1E293B]" style={{ fontSize: 12 * s }}>
            Отчёты и прогнозы
          </div>
          <div
            className="text-[#64748B]"
            style={{ fontSize: 8.5 * s, marginTop: 1 }}
          >
            Предиктивная аналитика по данным ассистента — сайт и MAX
          </div>
        </div>
        <div
          className="flex items-center gap-1 rounded-lg bg-white font-medium text-[#0038FF]"
          style={{
            padding: `${3 * s}px ${6 * s}px`,
            fontSize: 7 * s,
            boxShadow: "0 1px 2px rgba(0,56,255,0.04)",
          }}
        >
          <RefreshCw size={7 * s} />
          Обновить
        </div>
      </div>

      <SectionDivider label="Прогноз" s={s} />

      {/* Month forecast hero */}
      <div
        className="rounded-xl bg-white"
        style={{
          padding: `${7 * s}px ${8 * s}px`,
          borderLeft: "2.5px solid #0038FF",
          boxShadow: "0 1px 2px rgba(0,56,255,0.04)",
          marginBottom: 6 * s,
        }}
      >
        <PanelHead
          icon={CalendarClock}
          title={`Прогноз до конца месяца · ${MONTH.label}`}
          subtitle={`Прошло ${MONTH.elapsedDays} из ${MONTH.totalDays} дней · темп с поправкой на тренд ×${MONTH.trend}`}
          s={s}
        />
        <div
          className="grid grid-cols-3 gap-1.5"
          style={{ marginTop: 5 * s }}
        >
          <ForecastCell
            label="Диалогов ожидается"
            value={MONTH.dialogs}
            hint={MONTH.dialogsMtd}
            s={s}
          />
          <ForecastCell
            label="С интересом к покупке"
            value={MONTH.engaged}
            hint={MONTH.engagedMtd}
            s={s}
          />
          <ForecastCell
            label="Сумма оплаченных туров"
            value={MONTH.paid}
            hint={MONTH.income}
            money
            s={s}
          />
        </div>
        <Methodology s={s} />
      </div>

      {/* AI forecast */}
      <div
        className="rounded-xl bg-white"
        style={{
          padding: `${7 * s}px ${8 * s}px`,
          borderLeft: "2.5px solid #8B5CF6",
          boxShadow: "0 1px 2px rgba(0,56,255,0.04)",
          marginBottom: compact ? 0 : 6 * s,
        }}
      >
        <div className="flex items-start justify-between gap-2">
          <PanelHead
            icon={Sparkles}
            iconColor="#8B5CF6"
            iconBg="#F5F3FF"
            title="AI-прогноз на 4–6 недель"
            subtitle="Ваша динамика + тренды всей сети + сезонность направлений"
            s={s}
          />
          <div
            className="flex shrink-0 items-center gap-1 rounded-md bg-[#F5F3FF] font-semibold text-[#7C3AED]"
            style={{ padding: `${2.5 * s}px ${5 * s}px`, fontSize: 6.5 * s }}
          >
            <RefreshCw size={6.5 * s} />
            Обновить
          </div>
        </div>
        <div className="space-y-1" style={{ marginTop: 5 * s }}>
          {AI_LINES.map((line, i) => (
            <div key={i} className="flex items-start gap-1.5">
              <span
                className="shrink-0 font-bold text-[#8B5CF6]"
                style={{ fontSize: 8 * s, lineHeight: 1.2 }}
              >
                •
              </span>
              <span className="text-[#334155]" style={{ fontSize: 7.5 * s }}>
                {line}
              </span>
            </div>
          ))}
        </div>
        <div
          className="border-t border-[#E2E8F0]/60 text-[#94A3B8]"
          style={{ marginTop: 5 * s, paddingTop: 3 * s, fontSize: 6 * s }}
        >
          Обновлено 12 июля, 09:40 · автообновление по понедельникам
        </div>
      </div>

      {!compact && (
        <>
          <SectionDivider label="Факт за 30 дней" s={s} />
          <div
            className="grid grid-cols-2 gap-1.5 sm:grid-cols-4"
            style={{ marginBottom: 6 * s }}
          >
            {FACT.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.label}
                  className="rounded-xl bg-white"
                  style={{
                    padding: `${5 * s}px ${6 * s}px`,
                    boxShadow: "0 1px 2px rgba(0,56,255,0.04)",
                  }}
                >
                  <div className="flex items-center justify-between gap-1">
                    <span
                      className="font-medium text-[#64748B] truncate"
                      style={{ fontSize: 6.5 * s }}
                    >
                      {f.label}
                    </span>
                    <Icon
                      size={8 * s}
                      style={{ color: f.accent }}
                      strokeWidth={1.9}
                      className="shrink-0"
                    />
                  </div>
                  <div
                    className="font-bold text-[#1E293B]"
                    style={{ fontSize: 10.5 * s, marginTop: 2 * s }}
                  >
                    {f.value}
                  </div>
                </div>
              );
            })}
          </div>

          <SectionDivider label="Барометр спроса по сети" s={s} />
        </>
      )}

      {/* Network barometer */}
      <div
        className="rounded-xl bg-white"
        style={{
          padding: `${7 * s}px ${8 * s}px`,
          boxShadow: "0 1px 2px rgba(0,56,255,0.04)",
          marginTop: compact ? 6 * s : 0,
        }}
      >
        <PanelHead
          icon={Globe2}
          title="Барометр спроса по сети «Навылет! AI»"
          subtitle="Куда смотрят туристы всех агентств сети — обезличенно"
          s={s}
        />
        <div style={{ marginTop: 5 * s }}>
          {BAROMETER.map((b, i) => (
            <div
              key={b.country}
              className="flex items-center gap-1.5"
              style={{ paddingBlock: 2 * s }}
            >
              <span
                className="flex shrink-0 items-center gap-0.5 font-medium text-[#1E293B]"
                style={{ fontSize: 7 * s, width: 46 * s }}
              >
                <span className="truncate">{b.country}</span>
                {b.season && (
                  <Leaf size={6 * s} className="text-[#10B981] shrink-0" />
                )}
              </span>
              <div
                className="flex-1 rounded-full bg-[#F1F5F9] overflow-hidden"
                style={{ height: 3.5 * s }}
              >
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${(b.share / maxShare) * 100}%`,
                    backgroundColor: SEMANTIC_COLORS[i % SEMANTIC_COLORS.length],
                  }}
                />
              </div>
              <span
                className="shrink-0 text-right font-semibold text-[#1E293B]"
                style={{ fontSize: 7 * s, width: 16 * s }}
              >
                {b.share}%
              </span>
              <span
                className="flex shrink-0 justify-end"
                style={{ width: 36 * s }}
              >
                <TrendBadge pp={b.pp} s={s} />
              </span>
            </div>
          ))}
        </div>
        <div
          className="flex flex-wrap items-center border-t border-[#E2E8F0]/60 text-[#64748B]"
          style={{
            marginTop: 4 * s,
            paddingTop: 3 * s,
            gap: `${1}px ${10 * s}px`,
            fontSize: 6.5 * s,
          }}
        >
          <span>
            Медианный чек сети: <b className="text-[#1E293B]">168 000 ₽</b>
          </span>
          <span className="inline-flex items-center gap-0.5">
            <Leaf size={6 * s} className="text-[#10B981]" /> — в сезоне
          </span>
        </div>
      </div>

      {!compact && (
        <div
          className="text-[#94A3B8]"
          style={{ fontSize: 6 * s, marginTop: 5 * s, lineHeight: 1.5 }}
        >
          Прогнозные суммы — диапазоны-ориентиры по поведению клиентов в чате, а не
          фактические продажи.
        </div>
      )}
    </div>
  );
}

function SectionDivider({ label, s }: { label: string; s: number }) {
  return (
    <div
      className="flex items-center gap-1.5"
      style={{ marginTop: 6 * s, marginBottom: 5 * s }}
    >
      <div className="flex-1 border-t border-[#E2E8F0]" />
      <span
        className="font-semibold uppercase text-[#94A3B8]"
        style={{ fontSize: 6 * s, letterSpacing: "0.06em" }}
      >
        {label}
      </span>
      <div className="flex-1 border-t border-[#E2E8F0]" />
    </div>
  );
}

function PanelHead({
  icon: Icon,
  title,
  subtitle,
  s,
  iconColor = "#0038FF",
  iconBg = "#F0F4FF",
}: {
  icon: typeof CalendarClock;
  title: string;
  subtitle?: string;
  s: number;
  iconColor?: string;
  iconBg?: string;
}) {
  return (
    <div className="flex items-start gap-1.5">
      <div
        className="flex shrink-0 items-center justify-center rounded-md"
        style={{ width: 14 * s, height: 14 * s, backgroundColor: iconBg }}
      >
        <Icon size={8 * s} style={{ color: iconColor }} strokeWidth={1.9} />
      </div>
      <div className="min-w-0">
        <div
          className="font-semibold text-[#1E293B]"
          style={{ fontSize: 8.5 * s }}
        >
          {title}
        </div>
        {subtitle && (
          <div
            className="text-[#64748B]"
            style={{ fontSize: 6.5 * s, marginTop: 0.5 }}
          >
            {subtitle}
          </div>
        )}
      </div>
    </div>
  );
}

function ForecastCell({
  label,
  value,
  hint,
  money = false,
  s,
}: {
  label: string;
  value: string;
  hint: string;
  money?: boolean;
  s: number;
}) {
  return (
    <div
      className="rounded-lg"
      style={{
        padding: `${5 * s}px ${6 * s}px`,
        backgroundColor: money ? "rgba(16,185,129,0.10)" : "rgba(0,56,255,0.05)",
      }}
    >
      <div
        className="font-medium uppercase text-[#64748B]"
        style={{ fontSize: 5.5 * s, letterSpacing: "0.02em", lineHeight: 1.25 }}
      >
        {label}
      </div>
      <div
        className="font-bold"
        style={{
          fontSize: (money ? 8.5 : 11) * s,
          marginTop: 2 * s,
          color: money ? "#059669" : "#1E293B",
          lineHeight: 1.15,
        }}
      >
        {value}
      </div>
      <div className="text-[#94A3B8]" style={{ fontSize: 5.5 * s, marginTop: 1 }}>
        {hint}
      </div>
    </div>
  );
}

function TrendBadge({ pp, s }: { pp: number; s: number }) {
  if (pp === 0) {
    return (
      <span className="text-[#94A3B8]">
        <Minus size={7 * s} />
      </span>
    );
  }
  const up = pp > 0;
  const Icon = up ? TrendingUp : TrendingDown;
  return (
    <span
      className="inline-flex items-center gap-0.5 font-semibold"
      style={{ fontSize: 6 * s, color: up ? "#10B981" : "#F59E0B" }}
    >
      <Icon size={7 * s} />
      {up ? "+" : ""}
      {pp} п.п.
    </span>
  );
}

function Methodology({ s }: { s: number }) {
  return (
    <div
      className="border-t border-[#E2E8F0]/60"
      style={{ marginTop: 5 * s, paddingTop: 3 * s }}
    >
      <span
        className="inline-flex items-center gap-1 text-[#64748B]"
        style={{ fontSize: 6.5 * s }}
      >
        <HelpCircle size={7 * s} />
        Как это посчитано
      </span>
    </div>
  );
}
