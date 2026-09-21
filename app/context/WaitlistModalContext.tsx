"use client";

import { createContext, useContext, useState, useRef, useEffect, ReactNode } from "react";
import { fetchWaitlistStatus } from "@/lib/waitlist-client";

const ID_STORAGE_KEY = "ebun_waitlist_id";
const REVEALED_STORAGE_KEY = "ebun_waitlist_revealed";
const SURVEY_STORAGE_KEY = "ebun_waitlist_surveyed";

interface WaitlistModalContextValue {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  mounted: boolean;
  hasJoined: boolean;
  hasRevealed: boolean;
  hasSurveyed: boolean;
  myId: string | null;
  queueNumber: number | null;
  referrerRef: React.MutableRefObject<string | null>;
  handleJoinSuccess: (id: string, queueNumber: number) => void;
  handleRevealed: () => void;
  handleSurveyDone: () => void;
}

const WaitlistModalContext = createContext<WaitlistModalContextValue | null>(null);

export function WaitlistModalProvider({ children }: { children: ReactNode }) {
const [isOpen, setIsOpen] = useState(false);
const [mounted, setMounted] = useState(false);

const [myId, setMyId] = useState<string | null>(null);
const [queueNumber, setQueueNumber] = useState<number | null>(null);
const [hasJoined, setHasJoined] = useState(false);
const [hasRevealed, setHasRevealed] = useState(false);
const [hasSurveyed, setHasSurveyed] = useState(false);

const referrerRef = useRef<string | null>(null);

useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const ref = params.get("ref");

  if (ref) {
    referrerRef.current = ref;
    params.delete("ref");

    const clean =
      window.location.pathname +
      (params.toString() ? `?${params}` : "") +
      window.location.hash;

    window.history.replaceState({}, "", clean);
  }

  const savedId = localStorage.getItem(ID_STORAGE_KEY);

  setMyId(savedId);
  setHasJoined(Boolean(savedId));
  setHasRevealed(localStorage.getItem(REVEALED_STORAGE_KEY) === "true");
  setHasSurveyed(localStorage.getItem(SURVEY_STORAGE_KEY) === "true");
  setMounted(true);

  if (savedId) {
    fetchWaitlistStatus(savedId).then((status) => {
      if (status) setQueueNumber(status.queueNumber);
    });
  }
}, []);

  const handleJoinSuccess = (id: string, qn: number) => {
    localStorage.setItem(ID_STORAGE_KEY, id);
    setMyId(id);
    setQueueNumber(qn);
    setHasJoined(true);
  };

  const handleRevealed = () => {
    setHasRevealed(true);
    localStorage.setItem(REVEALED_STORAGE_KEY, "true");
  };

  const handleSurveyDone = () => {
    setHasSurveyed(true);
    localStorage.setItem(SURVEY_STORAGE_KEY, "true");
  };

  return (
    <WaitlistModalContext.Provider
      value={{
        isOpen,
        openModal: () => setIsOpen(true),
        closeModal: () => setIsOpen(false),
        mounted,
        hasJoined,
        hasRevealed,
        hasSurveyed,
        myId,
        queueNumber,
        referrerRef,
        handleJoinSuccess,
        handleRevealed,
        handleSurveyDone,
      }}
    >
      {children}
    </WaitlistModalContext.Provider>
  );
}

export function useWaitlistModal() {
  const ctx = useContext(WaitlistModalContext);
  if (!ctx) throw new Error("useWaitlistModal must be used within WaitlistModalProvider");
  return ctx;
}