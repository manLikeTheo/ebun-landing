"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useWaitlistModal } from "../context/WaitlistModalContext";
import BrandLogo from "./BrandLogo";
import { sendUrl } from "@/lib/links";
import { LAUNCH_CTA_LABEL } from "@/lib/launch";
import { useLaunched } from "../hooks/useLaunchClock";

/**
 * Light header (redesign). Few links, sentence case, one button — the
 * Chowdeck/Glovo pattern: nothing competes with the hero's single action.
 */
const links = [
  { label: "How it works", href: "#how" },
  { label: "Gifts", href: "#gifts" },
  { label: "For companies", href: "#corporate" },
  { label: "For businesses", href: "#vendors" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { openModal } = useWaitlistModal();
  const launched = useLaunched();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handlePrelaunchCta = () => {
    window.dispatchEvent(
      new CustomEvent("ebun:prelaunch_cta_clicked", { detail: { source: "navbar", destination: "waitlist_modal" } })
    );
    openModal();
  };

  const button =
    "inline-flex min-h-11 items-center rounded-full bg-forest px-5 text-[0.9rem] font-semibold text-paper transition-colors duration-200 hover:bg-forest-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest";

  return (
    <nav
      className={cn(
        "fixed inset-x-0 top-0 z-[100] transition-[background-color,box-shadow,padding] duration-300",
        scrolled ? "bg-paper/95 py-3 shadow-[0_1px_0_rgba(3,69,43,0.08)] backdrop-blur-md" : "bg-paper py-4 md:py-5"
      )}
    >
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-4 md:px-8">
        <a href="#" className="flex shrink-0 items-center no-underline" aria-label="SendEbun home">
          <BrandLogo tone="light" />
        </a>

        <div className="flex items-center gap-2 md:gap-8">
          <ul className="hidden list-none items-center gap-7 lg:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-[0.95rem] font-medium text-ink-text/80 transition-colors hover:text-forest"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          {launched ? (
            <a href={sendUrl("navbar")} className={button}>
              {LAUNCH_CTA_LABEL}
            </a>
          ) : (
            <button type="button" onClick={handlePrelaunchCta} className={button}>
              Get early access
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
