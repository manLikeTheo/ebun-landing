"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";

interface PartnerModalContextValue {
  isOpen: boolean;
  openPartnerModal: () => void;
  closePartnerModal: () => void;
}

const PartnerModalContext = createContext<PartnerModalContextValue | null>(null);

/**
 * "Who we work with" opens only when someone asks for it — a tap on a
 * "Become a partner" link. Never on a timer or on scroll: most visitors
 * came to send a gift, and an unasked-for popup costs that sale to win a
 * partner who would have found the button anyway.
 */
export function PartnerModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const openPartnerModal = useCallback(() => {
    setIsOpen(true);
    window.dispatchEvent(new CustomEvent("ebun:partner_modal_opened"));
  }, []);
  const closePartnerModal = useCallback(() => setIsOpen(false), []);
  return (
    <PartnerModalContext.Provider value={{ isOpen, openPartnerModal, closePartnerModal }}>
      {children}
    </PartnerModalContext.Provider>
  );
}

export function usePartnerModal() {
  const ctx = useContext(PartnerModalContext);
  if (!ctx) throw new Error("usePartnerModal must be used within PartnerModalProvider");
  return ctx;
}
