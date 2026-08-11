"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

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
          ? "py-[18px] px-[52px] bg-[rgba(14,13,11,0.93)] backdrop-blur-[24px] border-b border-[rgba(201,168,76,0.07)]"
          : "py-7 px-[52px] border-b border-transparent"
      )}
    >
      <a href="#" className="flex items-center gap-3 no-underline">
        <div className="w-[34px] h-[34px]">
          <svg viewBox="0 0 36 36" fill="none" className="w-full h-full">
            <circle cx="18" cy="18" r="16.5" stroke="#C9A84C" strokeWidth="0.7" opacity="0.35" />
            <rect x="11" y="10" width="2" height="16" fill="#C9A84C" />
            <rect x="11" y="10" width="10" height="2" fill="#C9A84C" />
            <rect x="11" y="17" width="7.5" height="2" fill="#C9A84C" />
            <rect x="11" y="24" width="10" height="2" fill="#C9A84C" />
            <circle cx="24" cy="11.2" r="1.8" fill="#C9A84C" opacity="0.55" />
          </svg>
        </div>
        <span className="font-serif text-[1.55rem] font-medium tracking-[0.09em] text-gold leading-none">
          Ebun
        </span>
      </a>

      <div className="flex items-center gap-9">
        <a
          href="#how"
          className="hidden md:inline text-[0.75rem] tracking-[0.14em] uppercase text-[rgba(245,239,224,0.8)] hover:text-gold-light transition-colors duration-300"
        >
          How it works
        </a>
        <a
          href="#stories"
          className="hidden md:inline text-[0.75rem] tracking-[0.14em] uppercase text-[rgba(245,239,224,0.8)] hover:text-gold-light transition-colors duration-300"
        >
          Stories
        </a>
        <a
          href="#corporate"
          className="hidden md:inline text-[0.75rem] tracking-[0.14em] uppercase text-[rgba(245,239,224,0.8)] hover:text-gold-light transition-colors duration-300"
        >
          Corporate
        </a>
        <a
          href="#early-access"
          className="border border-gold-dark text-gold bg-transparent px-[22px] py-[9px] rounded-sm font-sans font-semibold text-[0.72rem] tracking-[0.16em] uppercase transition-all duration-300 hover:bg-[rgba(201,168,76,0.8)] hover:border-gold hover:text-gold-light"
        >
          Send a Gift
        </a>
      </div>
    </nav>
  );
}