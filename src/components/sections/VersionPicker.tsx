"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Target,
  Gem,
  Check,
  ChevronDown,
  ArrowRight,
  MessageSquare,
} from "lucide-react";
import {
  assistantVersions,
  type AssistantVersion,
  type AssistantVersionId,
} from "@/lib/content";
import { useLeadForm } from "@/contexts/LeadFormContext";
import { metrikaGoals, reachMetrikaGoal } from "@/lib/metrika";

/** Неразрывный пробел обычной ширины: в мелких подписях тонкий почти не виден */
const fmt = (n: number) => n.toLocaleString("ru-RU").replace(/\s/g, "\u00A0");

const versionIcons: Record<AssistantVersionId, typeof Target> = {
  lid: Target,
  pro: Gem,
};

/** Раскрытый функционал версии + CTA. Общий для мобайла и десктопа. */
function VersionDetails({
  version,
  source,
}: {
  version: AssistantVersion;
  source: string;
}) {
  const { openForm } = useLeadForm();

  return (
    <div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {version.featureGroups.map((group) => (
          <div key={group.title}>
            <p className="mb-2.5 text-xs font-semibold uppercase tracking-wide text-muted">
              {group.title}
            </p>
            <ul className="space-y-2">
              {group.items.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-body">
                  <span className="mt-0.5 flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center rounded-full bg-accent/10">
                    <Check className="h-2.5 w-2.5 text-accent" />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-col items-stretch gap-3 border-t border-blue-subtle/40 pt-5 sm:flex-row sm:items-center">
        <Link
          href={`/demo?v=${version.id}`}
          onClick={() =>
            reachMetrikaGoal(metrikaGoals.demoClick, {
              version_id: version.id,
              source,
            })
          }
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-accent/20 transition-colors hover:bg-accent-hover sm:text-base"
        >
          <MessageSquare className="h-4 w-4" />
          Попробовать «{version.name}» в демо
        </Link>
        <button
          onClick={() =>
            openForm({ versionId: version.id, source: `${source}_details` })
          }
          className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-accent/30 px-6 py-[10px] text-sm font-semibold text-accent transition-colors hover:border-accent hover:bg-blue-ice sm:text-base"
        >
          Подключить бесплатно
          <ArrowRight className="h-4 w-4" />
        </button>
        <span className="text-center text-xs text-muted sm:ml-auto sm:text-right">
          от {fmt(version.priceFrom)} ₽/мес · первый месяц бесплатно
        </span>
      </div>
    </div>
  );
}

/**
 * Интерактивный выбор версии ассистента («Лид» / «Про»).
 * Клик по карточке раскрывает полный функционал: на мобайле — аккордеоном
 * внутри карточки, на десктопе — общей панелью под сеткой.
 */
export default function VersionPicker({
  source,
  defaultSelected = null,
}: {
  /** Для целей Метрики: "home" | "versii" */
  source: string;
  defaultSelected?: AssistantVersionId | null;
}) {
  const [selected, setSelected] = useState<AssistantVersionId | null>(
    defaultSelected
  );

  const toggle = (id: AssistantVersionId) => {
    const next = selected === id ? null : id;
    setSelected(next);
    if (next) {
      reachMetrikaGoal(metrikaGoals.versionSelect, {
        version_id: next,
        source,
      });
    }
  };

  const selectedVersion =
    assistantVersions.find((v) => v.id === selected) ?? null;

  return (
    <div>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {assistantVersions.map((version) => {
          const active = selected === version.id;
          const Icon = versionIcons[version.id];
          return (
            /* flex-колонка + flex-auto у карточки: карточки одной высоты на
               десктопе, а аккордеон на мобайле честно увеличивает высоту
               ячейки (с h-full карточка растягивалась и выдавливала панель). */
            <div key={version.id} className="flex flex-col">
              <button
                type="button"
                data-version-card={version.id}
                onClick={() => toggle(version.id)}
                aria-expanded={active}
                className={`group flex w-full flex-auto cursor-pointer flex-col rounded-2xl border-2 bg-white p-6 text-left transition-all duration-200 sm:p-7 ${
                  active
                    ? "border-accent shadow-[0_8px_32px_rgba(0,98,239,0.14)]"
                    : "border-blue-subtle/50 shadow-card hover:border-accent/40 hover:shadow-[0_4px_16px_rgba(0,98,239,0.10)]"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex h-11 w-11 items-center justify-center rounded-xl transition-colors ${
                        active ? "text-white" : "bg-accent/10 text-accent"
                      }`}
                      style={
                        active
                          ? {
                              background:
                                "linear-gradient(135deg, #0062EF 0%, #0097F5 60%, #00CCF5 100%)",
                            }
                          : undefined
                      }
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-display text-xl font-bold text-heading">
                        {version.fullName}
                      </h3>
                      <p className="text-sm font-medium text-accent">
                        от {fmt(version.priceFrom)} ₽/мес
                      </p>
                    </div>
                  </div>
                  <span
                    className={`mt-1 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full transition-all duration-200 ${
                      active
                        ? "rotate-180 bg-accent text-white"
                        : "bg-accent/10 text-accent"
                    }`}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </span>
                </div>

                <p className="mt-4 text-sm font-medium leading-relaxed text-heading">
                  {version.tagline}
                </p>
                <p className="mt-1.5 text-xs text-muted">{version.audience}</p>

                <ul className="mt-4 space-y-2">
                  {version.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-sm text-body">
                      <span className="mt-0.5 flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center rounded-full bg-accent/10">
                        <Check className="h-2.5 w-2.5 text-accent" />
                      </span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                <span
                  className={`mt-5 inline-flex items-center gap-1 text-sm font-semibold transition-colors ${
                    active ? "text-accent" : "text-muted group-hover:text-accent"
                  }`}
                >
                  {active ? "Скрыть функционал" : "Весь функционал и демо"}
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform ${
                      active ? "rotate-180" : ""
                    }`}
                  />
                </span>
              </button>

              {/* Мобайл и планшет: раскрытие аккордеоном под карточкой */}
              <AnimatePresence initial={false}>
                {active && (
                  <motion.div
                    key="mobile-details"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden lg:hidden"
                  >
                    <div
                      data-version-panel
                      className="mt-3 rounded-2xl border border-blue-subtle/50 bg-surface-alt p-5"
                    >
                      <VersionDetails version={version} source={source} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Десктоп: общая панель под сеткой карточек */}
      <AnimatePresence initial={false}>
        {selectedVersion && (
          <motion.div
            key={selectedVersion.id}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="hidden overflow-hidden lg:block"
          >
            <div
              data-version-panel
              className="mt-5 rounded-2xl border border-blue-subtle/50 bg-surface-alt p-7"
            >
              <VersionDetails version={selectedVersion} source={source} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
