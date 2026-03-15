import { Copy } from "lucide-react";

interface RealWidgetContentProps {
  compact?: boolean;
}

export default function RealWidgetContent({
  compact = false,
}: RealWidgetContentProps) {
  const s = compact ? 0.85 : 1;

  return (
    <div style={{ fontSize: 10 * s }}>
      {/* Header */}
      <div style={{ marginBottom: 6 * s }}>
        <div className="font-bold text-[#1E293B]" style={{ fontSize: 12 * s }}>
          Настройки виджета
        </div>
        <div className="text-[#64748B]" style={{ fontSize: 8.5 * s, marginTop: 1 }}>
          Настройте внешний вид и поведение чат-виджета
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {/* Settings form */}
        <div
          className="rounded-xl bg-white space-y-2"
          style={{
            padding: `${6 * s}px ${7 * s}px`,
            boxShadow: "0 1px 2px rgba(0,56,255,0.04)",
          }}
        >
          <span className="font-semibold text-[#1E293B] block" style={{ fontSize: 8 * s }}>
            Основные настройки
          </span>

          {/* Title input */}
          <FormField s={s} label="Заголовок виджета">
            <div
              className="rounded-lg border border-[#E2E8F0] bg-white text-[#1E293B] px-2"
              style={{ height: 16 * s, fontSize: 7 * s, lineHeight: `${16 * s}px` }}
            >
              AI Ассистент
            </div>
          </FormField>

          {/* Subtitle input */}
          <FormField s={s} label="Подзаголовок">
            <div
              className="rounded-lg border border-[#E2E8F0] bg-white text-[#1E293B] px-2"
              style={{ height: 16 * s, fontSize: 7 * s, lineHeight: `${16 * s}px` }}
            >
              Турагентство
            </div>
          </FormField>

          {/* Welcome message */}
          <FormField s={s} label="Приветственное сообщение">
            <div
              className="rounded-lg border border-[#E2E8F0] bg-white text-[#1E293B] px-2 py-1"
              style={{ fontSize: 6.5 * s, minHeight: 24 * s, lineHeight: 1.4 }}
            >
              Здравствуйте! 👋 Я ваш AI-ассистент. Помогу подобрать идеальный тур.
            </div>
          </FormField>

          {/* Color + Position row */}
          <div className="flex gap-2">
            <div className="flex-1">
              <span className="text-[#64748B] block" style={{ fontSize: 6 * s, marginBottom: 2 }}>
                Основной цвет
              </span>
              <div className="flex items-center gap-1">
                <div
                  className="rounded-lg border border-[#E2E8F0]"
                  style={{
                    width: 16 * s,
                    height: 16 * s,
                    background: "linear-gradient(135deg, #E30613, #B8050F)",
                  }}
                />
                <span className="text-[#64748B] font-mono" style={{ fontSize: 6.5 * s }}>
                  #E30613
                </span>
              </div>
            </div>
            <div className="flex-1">
              <span className="text-[#64748B] block" style={{ fontSize: 6 * s, marginBottom: 2 }}>
                Позиция
              </span>
              <div className="flex gap-0.5">
                {["Слева", "Справа"].map((pos, i) => (
                  <div
                    key={pos}
                    className={`rounded-md px-1.5 py-0.5 font-medium border ${
                      i === 1
                        ? "bg-gradient-to-r from-[#0038FF] to-[#3B82F6] text-white border-transparent"
                        : "bg-white text-[#64748B] border-[#E2E8F0]"
                    }`}
                    style={{ fontSize: 6 * s }}
                  >
                    {pos}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Preset avatars */}
          {!compact && (
            <div>
              <span className="text-[#64748B] block" style={{ fontSize: 6 * s, marginBottom: 2 }}>
                Аватар виджета
              </span>
              <div className="flex gap-1">
                {["🤖", "🌍", "✈️", "👨‍💼"].map((emoji, i) => (
                  <div
                    key={emoji}
                    className={`flex items-center justify-center rounded-lg ${
                      i === 1
                        ? "bg-[#F0F4FF] ring-1 ring-[#0038FF]"
                        : "bg-[#F1F5F9]"
                    }`}
                    style={{
                      width: 20 * s,
                      height: 20 * s,
                      fontSize: 10 * s,
                    }}
                  >
                    {emoji}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Save button */}
          <div className="flex gap-1 pt-1">
            <div
              className="rounded-lg bg-gradient-to-r from-[#0038FF] to-[#3B82F6] text-white font-medium text-center"
              style={{
                fontSize: 7 * s,
                padding: `${3 * s}px ${10 * s}px`,
              }}
            >
              Сохранить
            </div>
            <div
              className="rounded-lg bg-[#F1F5F9] text-[#64748B] font-medium text-center"
              style={{
                fontSize: 7 * s,
                padding: `${3 * s}px ${8 * s}px`,
              }}
            >
              Сброс
            </div>
          </div>
        </div>

        {/* Live preview + embed */}
        <div className="space-y-1.5">
          {/* Preview */}
          <div
            className="rounded-xl bg-white"
            style={{
              padding: `${6 * s}px ${7 * s}px`,
              boxShadow: "0 1px 2px rgba(0,56,255,0.04)",
            }}
          >
            <span className="font-semibold text-[#1E293B] block" style={{ fontSize: 8 * s, marginBottom: 4 * s }}>
              Предварительный просмотр
            </span>
            <div
              className="rounded-xl bg-[#F1F5F9] overflow-hidden mx-auto"
              style={{ maxWidth: 160 * s }}
            >
              {/* Widget header */}
              <div
                className="flex items-center gap-1.5 px-2"
                style={{
                  background: "linear-gradient(135deg, #E30613, #B8050F)",
                  paddingBlock: 5 * s,
                }}
              >
                <div
                  className="rounded-full bg-white/20 flex items-center justify-center"
                  style={{ width: 14 * s, height: 14 * s }}
                >
                  <svg viewBox="0 0 24 24" fill="white" style={{ width: 8 * s, height: 8 * s }}>
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                  </svg>
                </div>
                <div className="text-white min-w-0">
                  <div className="font-semibold truncate" style={{ fontSize: 7 * s, lineHeight: 1.2 }}>
                    AI Ассистент
                  </div>
                  <div style={{ fontSize: 6 * s, opacity: 0.9 }}>
                    Турагентство
                  </div>
                </div>
              </div>

              {/* Messages area */}
              <div
                className="bg-[#F8F9FA]"
                style={{ padding: `${4 * s}px ${5 * s}px`, minHeight: 50 * s }}
              >
                <div className="flex gap-1 items-start">
                  <div
                    className="rounded-full flex items-center justify-center shrink-0"
                    style={{
                      width: 10 * s,
                      height: 10 * s,
                      background: "linear-gradient(135deg, #E30613, #B8050F)",
                    }}
                  >
                    <svg viewBox="0 0 24 24" fill="white" style={{ width: 6 * s, height: 6 * s }}>
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                    </svg>
                  </div>
                  <div
                    className="bg-white rounded-xl rounded-bl-sm shadow-sm px-1.5 py-1 text-[#1E293B]"
                    style={{ fontSize: 6 * s, lineHeight: 1.4 }}
                  >
                    Здравствуйте! 👋 Я ваш AI-ассистент. Помогу подобрать идеальный тур.
                  </div>
                </div>
              </div>

              {/* Input footer */}
              <div
                className="bg-white border-t border-[#E2E8F0]/40 flex items-center gap-1 px-2"
                style={{ paddingBlock: 4 * s }}
              >
                <div
                  className="flex-1 bg-[#F8F9FA] rounded-full px-2 text-[#94A3B8]"
                  style={{ fontSize: 6 * s, paddingBlock: 3 * s }}
                >
                  Введите ваш запрос...
                </div>
                <div
                  className="rounded-full flex items-center justify-center"
                  style={{
                    width: 14 * s,
                    height: 14 * s,
                    background: "linear-gradient(135deg, #E30613, #B8050F)",
                  }}
                >
                  <svg viewBox="0 0 24 24" fill="white" style={{ width: 7 * s, height: 7 * s }}>
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                  </svg>
                </div>
              </div>
            </div>
            <div
              className="text-center text-[#64748B]"
              style={{ fontSize: 6 * s, marginTop: 3 * s }}
            >
              Так виджет будет выглядеть на вашем сайте
            </div>
          </div>

          {/* Embed code */}
          {!compact && (
            <div
              className="rounded-xl bg-white"
              style={{
                padding: `${6 * s}px ${7 * s}px`,
                boxShadow: "0 1px 2px rgba(0,56,255,0.04)",
              }}
            >
              <div className="flex items-center justify-between" style={{ marginBottom: 3 * s }}>
                <span className="font-semibold text-[#1E293B]" style={{ fontSize: 8 * s }}>
                  Код для вставки
                </span>
                <div
                  className="flex items-center gap-0.5 rounded-md bg-white border border-[#E2E8F0] px-1 text-[#64748B]"
                  style={{ fontSize: 6 * s, paddingBlock: 1 }}
                >
                  <Copy size={6 * s} />
                  Копировать
                </div>
              </div>
              <div
                className="rounded-lg bg-[#F1F5F9] font-mono text-[#1E293B] overflow-hidden"
                style={{ padding: `${4 * s}px ${5 * s}px`, fontSize: 5.5 * s, lineHeight: 1.5 }}
              >
                <div className="text-[#64748B]">&lt;!-- навылет AI Widget --&gt;</div>
                <div>
                  <span className="text-[#0038FF]">&lt;script</span>{" "}
                  <span className="text-[#10B981]">src</span>=
                  <span className="text-[#F59E0B]">&quot;https://cdn...&quot;</span>
                </div>
                <div className="pl-2">
                  <span className="text-[#10B981]">data-token</span>=
                  <span className="text-[#F59E0B]">&quot;tk_abc...&quot;</span>
                  <span className="text-[#0038FF]">&gt;&lt;/script&gt;</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FormField({
  s,
  label,
  children,
}: {
  s: number;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <span className="text-[#64748B] block" style={{ fontSize: 6 * s, marginBottom: 2 }}>
        {label}
      </span>
      {children}
    </div>
  );
}
