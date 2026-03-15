"use client";

import { createContext, useContext, useState, useCallback } from "react";

interface LeadFormContextValue {
  isOpen: boolean;
  planName: string | null;
  openForm: (planName?: string) => void;
  closeForm: () => void;
}

const LeadFormContext = createContext<LeadFormContextValue | null>(null);

export function LeadFormProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [planName, setPlanName] = useState<string | null>(null);

  const openForm = useCallback((plan?: string) => {
    setPlanName(plan ?? null);
    setIsOpen(true);
  }, []);

  const closeForm = useCallback(() => {
    setIsOpen(false);
    setTimeout(() => setPlanName(null), 300);
  }, []);

  return (
    <LeadFormContext.Provider value={{ isOpen, planName, openForm, closeForm }}>
      {children}
    </LeadFormContext.Provider>
  );
}

export function useLeadForm() {
  const ctx = useContext(LeadFormContext);
  if (!ctx) throw new Error("useLeadForm must be used within LeadFormProvider");
  return ctx;
}
