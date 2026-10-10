"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useWaitlistModal } from "../context/WaitlistModalContext";
import BrandLogo from "./BrandLogo";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  const { openModal } = useWaitlistModal();

const handlePrelaunchCta = () => {
  window.dispatchEvent(
    new CustomEvent("ebun:prelaunch_cta_clicked", {
      detail: {
        source: "navbar",
        destination: "waitlist_modal",
      },
    })
  );

  openModal();
};

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] flex items-center justify-between transition-all duration-400",
        scrolled
          ? "py-[18px] px-4 md:px-[52px] bg-ink-deep/95 backdrop-blur-[24px] border-b border-gold/20"
          : "py-7 px-4 md:px-[52px] bg-ink/70 backdrop-blur-sm border-b border-gold/10"
      )}
    >
      <a href="#" className="flex shrink-0 items-center no-underline" aria-label="SendEbun home">
        <BrandLogo />
      </a>

      <div className="flex items-center gap-3 lg:gap-9">
        <a
          href="#how"
          className="hidden md:inline text-[0.75rem] tracking-[0.14em] uppercase text-[rgba(var(--cream-rgb),0.98)] hover:text-gold-light transition-colors duration-300"
        >
          How it works
        </a>
        <a
          href="#use-cases"
          className="hidden md:inline text-[0.75rem] tracking-[0.14em] uppercase text-[rgba(var(--cream-rgb),0.98)] hover:text-gold-light transition-colors duration-300"
        >
          Use Cases
        </a>
        <a
          href="#corporate"
          className="hidden md:inline text-[0.75rem] tracking-[0.14em] uppercase text-[rgba(var(--cream-rgb),0.98)] hover:text-gold-light transition-colors duration-300"
        >
          Corporate
        </a>
        <button
          type="button"
          onClick={handlePrelaunchCta}
          className="min-h-11 border border-gold/60 bg-transparent px-3 py-[9px] font-sans text-[0.6rem] font-semibold uppercase tracking-[0.08em] text-gold transition-all duration-300 sm:px-[22px] sm:text-[0.72rem] sm:tracking-[0.16em] hover:border-amber hover:bg-amber hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-light"
        >
          Join Early Access
        </button>
      </div>
    </nav>
  );
}
