"use client";

import { createContext, useContext, useState, useCallback } from "react";
import type { ChannelId, PricingPlan } from "@/lib/content";

export interface LeadFormPreset {
  planId?: PricingPlan["id"];
  /** Имя тарифа (для обратной совместимости со старыми вызовами) */
  planName?: string;
  channelId?: ChannelId;
}

interface LeadFormContextValue {
  isOpen: boolean;
  preset: LeadFormPreset | null;
  /**
   * Открыть форму. Можно вызвать:
   *  - без аргументов — без предустановок,
   *  - с строкой — старый формат (только имя тарифа),
   *  - с объектом LeadFormPreset — новый формат.
   */
  openForm: (preset?: string | LeadFormPreset) => void;
  closeForm: () => void;
}

const LeadFormContext = createContext<LeadFormContextValue | null>(null);

export function LeadFormProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [preset, setPreset] = useState<LeadFormPreset | null>(null);

  const openForm = useCallback((p?: string | LeadFormPreset) => {
    if (typeof p === "string") {
      setPreset({ planName: p });
    } else {
      setPreset(p ?? null);
    }
    setIsOpen(true);
  }, []);

  const closeForm = useCallback(() => {
    setIsOpen(false);
    setTimeout(() => setPreset(null), 300);
  }, []);

  return (
    <LeadFormContext.Provider value={{ isOpen, preset, openForm, closeForm }}>
      {children}
    </LeadFormContext.Provider>
  );
}

export function useLeadForm() {
  const ctx = useContext(LeadFormContext);
  if (!ctx) throw new Error("useLeadForm must be used within LeadFormProvider");
  return ctx;
}
