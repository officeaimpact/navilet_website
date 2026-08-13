"use client";

import { useState } from "react";
import {
  RefreshCcw,
  MapPin,
  Waves,
  Utensils,
  BedDouble,
  Plane,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

const tv = (code: number) =>
  `https://static.tourvisor.ru/hotel_pics/main400/${code}.jpg`;

const hotels = [
  {
    name: "Barut Hemera",
    stars: 5,
    resort: "Сиде, Турция",
    dates: "03.06–10.06 · 7 ночей",
    price: "142 500 ₽",
    code: 1033,
  },
  {
    name: "Calista Luxury Resort",
    stars: 5,
    resort: "Белек, Турция",
    dates: "02.06–09.06 · 7 ночей",
    price: "186 200 ₽",
    code: 1065,
  },
];

const hotelChips = [
  { label: "1-я линия, песок", Icon: Waves },
  { label: "Ультра всё включено", Icon: Utensils },
  { label: "Семейные номера", Icon: BedDouble },
];

const flights = [
  {
    direction: "Туда · 3 июня",
    from: "Москва, Шереметьево 09:40",
    to: "Анталия 13:55",
    note: "Прямой · 4 ч 15 мин",
  },
  {
    direction: "Обратно · 10 июня",
    from: "Анталия 15:10",
    to: "Москва, Шереметьево 19:20",
    note: "Прямой · 4 ч 10 мин",
  },
];

/**
 * Демонстрация публичной страницы подборки — той самой, что открывает клиент
 * по ссылке из диалога. Вкладки повторяют панель отеля из реальной страницы.
 */
export default function CollectionPreview() {
  const [tab, setTab] = useState<"hotel" | "flight">("hotel");

  return (
    <div className="overflow-hidden rounded-2xl border border-blue-subtle/50 bg-white shadow-card">
      {/* Шапка с брендом агентства */}
      <div className="flex items-center justify-between gap-3 border-b border-blue-subtle/40 bg-gradient-to-r from-blue-ice/70 to-white px-4 py-3 sm:px-5">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-accent/10 font-display text-xs font-bold text-accent">
            ВА
          </span>
          <span className="min-w-0">
            <span className="block truncate font-display text-sm font-bold text-heading">
              Ваше агентство
            </span>
            <span className="block truncate text-[11px] text-muted">
              логотип и цвет — ваши
            </span>
          </span>
        </div>
        <span className="flex-shrink-0 rounded-full bg-accent/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-accent">
          Страница клиента
        </span>
      </div>

      <div className="px-4 py-4 sm:px-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="font-display text-lg font-bold text-heading">
              Подборка туров — Турция
            </p>
            <p className="mt-0.5 text-xs text-muted">
              3 варианта · цены проверены в 12:40
            </p>
          </div>
          <span className="inline-flex flex-shrink-0 items-center gap-1.5 rounded-lg border border-blue-subtle/60 px-2.5 py-1.5 text-[11px] font-semibold text-accent">
            <RefreshCcw className="h-3.5 w-3.5" />
            Обновить цены
          </span>
        </div>

        {/* Карточки вариантов */}
        <div className="mt-4 space-y-2.5">
          {hotels.map((h, i) => (
            <div
              key={h.name}
              className={`flex items-center gap-3 rounded-xl border p-2.5 transition-colors ${
                i === 0
                  ? "border-accent/30 bg-blue-ice/30"
                  : "border-blue-subtle/40 bg-white"
              }`}
            >
              <img
                src={tv(h.code)}
                alt={h.name}
                loading="lazy"
                className="h-14 w-20 flex-shrink-0 rounded-lg object-cover sm:h-16 sm:w-24"
              />
              <div className="min-w-0 flex-1">
                <p className="font-display text-sm font-bold leading-snug text-heading">
                  {h.name}
                  <span className="ml-1.5 whitespace-nowrap text-[11px] font-semibold text-amber-500">
                    {"★".repeat(h.stars)}
                  </span>
                </p>
                <p className="mt-0.5 flex items-start gap-1 text-[11px] leading-snug text-muted">
                  <MapPin className="mt-0.5 h-3 w-3 flex-shrink-0" />
                  <span>
                    {h.resort} · {h.dates}
                  </span>
                </p>
                <p className="mt-1 font-display text-sm font-bold text-accent">
                  {h.price}
                  <span className="ml-1 text-[11px] font-medium text-muted">
                    за тур
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Панель отеля: вкладки как на реальной странице */}
        <div className="mt-4 rounded-xl border border-blue-subtle/50 bg-surface-alt/60 p-3">
          <div
            role="tablist"
            aria-label="Панель отеля"
            className="flex gap-1 rounded-lg bg-white p-1"
          >
            {(
              [
                { id: "hotel" as const, label: "Отель", Icon: BedDouble },
                { id: "flight" as const, label: "Перелёт", Icon: Plane },
              ] satisfies {
                id: "hotel" | "flight";
                label: string;
                Icon: typeof Plane;
              }[]
            ).map((t) => (
              <button
                key={t.id}
                role="tab"
                type="button"
                aria-selected={tab === t.id}
                onClick={() => setTab(t.id)}
                className={`flex h-10 flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-md px-3 text-xs font-semibold transition-colors ${
                  tab === t.id
                    ? "bg-accent/10 text-accent"
                    : "text-muted hover:text-heading"
                }`}
              >
                <t.Icon className="h-3.5 w-3.5" />
                {t.label}
              </button>
            ))}
          </div>

          {tab === "hotel" ? (
            <div className="mt-3">
              <p className="text-xs leading-relaxed text-body">
                Отель на первой линии в Сиде: три бассейна, детский клуб и
                собственный песчаный пляж в 50 метрах от корпусов. Описание,
                фото и услуги подтягиваются из Tourvisor.
              </p>
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {hotelChips.map((c) => (
                  <span
                    key={c.label}
                    className="inline-flex items-center gap-1 rounded-full border border-blue-subtle/50 bg-white px-2.5 py-1 text-[11px] font-medium text-body"
                  >
                    <c.Icon className="h-3 w-3 text-accent" />
                    {c.label}
                  </span>
                ))}
              </div>
              <div className="mt-2.5 grid grid-cols-4 gap-1.5">
                {[1033, 1065, 1582, 1449].map((code) => (
                  <img
                    key={code}
                    src={tv(code)}
                    alt="Фото отеля"
                    loading="lazy"
                    className="h-12 w-full rounded-md object-cover sm:h-14"
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="mt-3 space-y-2">
              {flights.map((f) => (
                <div
                  key={f.direction}
                  className="rounded-lg border border-blue-subtle/40 bg-white px-3 py-2"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-muted">
                    {f.direction}
                  </p>
                  <p className="mt-1 flex flex-wrap items-center gap-1.5 text-xs font-semibold text-heading">
                    {f.from}
                    <ArrowRight className="h-3 w-3 text-accent" />
                    {f.to}
                  </p>
                  <p className="mt-0.5 text-[11px] text-muted">{f.note}</p>
                </div>
              ))}
              <p className="text-[11px] text-muted">
                Клиент выбирает связку рейсов — она уходит в заявку вместе с
                туром.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Подвал страницы */}
      <div className="flex flex-wrap items-center gap-2.5 border-t border-blue-subtle/40 bg-surface-alt/70 px-4 py-3 sm:px-5">
        <span className="inline-flex items-center rounded-lg bg-accent px-4 py-2 text-xs font-semibold text-white">
          Забронировать
        </span>
        <span className="flex min-w-0 flex-1 items-start gap-1.5 text-[11px] leading-snug text-muted">
          <ShieldCheck className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-accent" />
          Заявка уходит вашему менеджеру — клиента не уводят на сторонние сайты
        </span>
      </div>
    </div>
  );
}
