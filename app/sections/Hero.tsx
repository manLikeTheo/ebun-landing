"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import GiftIllustration from "../components/GiftIllustration";
import { useWaitlistModal } from "../context/WaitlistModalContext";
import { useLaunched } from "../hooks/useLaunchClock";
import { sendUrl } from "@/lib/links";
import { LAUNCH_CTA_LABEL } from "@/lib/launch";

/**
 * Redesigned hero (Oct 2026), modelled on Chowdeck / Glovo:
 * one headline, one supporting line, ONE action, one visual. Nothing else
 * above the fold — no countdown, pills or stock photography.
 *
 * The action is a WhatsApp-number field (our version of their address box).
 * Submitting opens the existing waitlist modal with the number filled in,
 * so the queue number, consent and survey flow all stay as they were.
 */
const COUNTRY_CODES = [
  { code: "+234", label: "🇳🇬 +234" },
  { code: "+44", label: "🇬🇧 +44" },
  { code: "+1", label: "🇺🇸 +1" },
  { code: "+971", label: "🇦🇪 +971" },
];

export default function Hero() {
  const { openModal, openModalWith, mounted, hasJoined, queueNumber } = useWaitlistModal();
  const launched = useLaunched();

  const [countryCode, setCountryCode] = useState("+234");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 7) {
      setError("Enter your WhatsApp number to join.");
      return;
    }
    setError("");
    window.dispatchEvent(
      new CustomEvent("ebun:prelaunch_cta_clicked", { detail: { source: "hero_form", destination: "waitlist_modal" } })
    );
    openModalWith({ countryCode, phone });
  };

  return (
    <section className="relative overflow-hidden bg-paper pt-28 md:pt-32">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-10 px-4 pb-24 md:px-8 md:pb-32 lg:grid-cols-[1.2fr_0.8fr] lg:gap-4">
        <div className="text-center lg:text-left">
          <span className="inline-flex items-center gap-2 rounded-full bg-paper-warm px-4 py-1.5 text-[0.85rem] font-semibold text-forest">
            <span aria-hidden="true">🎁</span> Ẹ̀bùn means gift
          </span>

          <h1
            className="mt-6 font-sans font-extrabold leading-[1.02] tracking-[-0.035em] text-forest text-balance"
            style={{ fontSize: "clamp(2.6rem, 5.6vw, 4.6rem)" }}
          >
            Send{" "}
            <span className="whitespace-nowrap bg-[linear-gradient(transparent_64%,rgba(254,167,3,0.55)_64%,rgba(254,167,3,0.55)_90%,transparent_90%)] px-1">
              real gifts
            </span>
            , <span className="lg:whitespace-nowrap">without the hassle.</span>
          </h1>

          <p className="mx-auto mt-5 max-w-[500px] text-[1.1rem] leading-[1.65] text-ink-text/75 lg:mx-0">
            A meal, a cake or a spa day — sent with your voice note. They open it on their phone and collect it with a
            code. No address needed.
          </p>

          <div className="mx-auto mt-8 max-w-[540px] lg:mx-0">
            {launched ? (
              <a
                href={sendUrl("hero")}
                className="inline-flex min-h-14 items-center gap-2 rounded-full bg-forest px-8 text-[1.05rem] font-semibold text-paper transition-colors hover:bg-forest-hover"
              >
                {LAUNCH_CTA_LABEL} <ArrowRight className="h-5 w-5" strokeWidth={2} />
              </a>
            ) : mounted && hasJoined ? (
              <button
                type="button"
                onClick={openModal}
                className="inline-flex min-h-14 items-center gap-2 rounded-full bg-forest px-8 text-[1.05rem] font-semibold text-paper transition-colors hover:bg-forest-hover"
              >
                You&apos;re on the list{queueNumber !== null ? ` — No. ${queueNumber}` : ""}
                <ArrowRight className="h-5 w-5" strokeWidth={2} />
              </button>
            ) : (
              <form onSubmit={onSubmit} noValidate>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-0 sm:rounded-full sm:bg-white sm:p-1.5 sm:shadow-[0_10px_30px_rgba(3,69,43,0.10)] sm:ring-1 sm:ring-forest/10 sm:focus-within:ring-2 sm:focus-within:ring-forest">
                  <div className="flex min-w-0 flex-1 items-center rounded-full bg-white shadow-[0_10px_30px_rgba(3,69,43,0.10)] ring-1 ring-forest/10 focus-within:ring-2 focus-within:ring-forest sm:shadow-none sm:ring-0 sm:focus-within:ring-0">
                    <label htmlFor="hero-cc" className="sr-only">
                      Country code
                    </label>
                    <select
                      id="hero-cc"
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      className="cursor-pointer bg-transparent py-3.5 pl-4 pr-1 text-[0.95rem] font-medium text-ink-text outline-none"
                    >
                      {COUNTRY_CODES.map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                    <span className="h-6 w-px bg-forest/15" aria-hidden="true" />
                    <label htmlFor="hero-phone" className="sr-only">
                      Your WhatsApp number
                    </label>
                    <input
                      id="hero-phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel-national"
                      placeholder="Your WhatsApp number"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        if (error) setError("");
                      }}
                      aria-invalid={error ? true : undefined}
                      aria-describedby={error ? "hero-phone-error" : "hero-phone-hint"}
                      className="min-w-0 flex-1 bg-transparent px-3 py-3.5 text-[1rem] text-ink-text outline-none placeholder:text-ink-text/45"
                    />
                  </div>
                  <button
                    type="submit"
                    className="min-h-12 shrink-0 rounded-full bg-forest px-6 text-[1rem] font-semibold text-paper transition-colors hover:bg-forest-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
                  >
                    Get early access
                  </button>
                </div>
                {error ? (
                  <p id="hero-phone-error" role="alert" className="mt-3 text-[0.9rem] font-medium text-[#B42318]">
                    {error}
                  </p>
                ) : (
                  <p id="hero-phone-hint" className="mt-3 text-[0.88rem] text-ink-text/60">
                    Free to join. We&apos;ll message you on WhatsApp when we open — nothing else.
                  </p>
                )}
              </form>
            )}
          </div>
        </div>

        <GiftIllustration className="max-w-[420px] lg:max-w-[540px]" />
      </div>

      {/* Soft wave into the next section (Glovo pattern). Fill matches the section below. */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="absolute inset-x-0 bottom-[-1px] block h-[40px] w-full md:h-[70px]"
      >
        <path d="M0,50 C360,95 1080,0 1440,40 L1440,80 L0,80 Z" style={{ fill: "var(--ink)" }} />
      </svg>
    </section>
  );
}
