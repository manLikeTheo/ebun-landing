"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { usePartnerModal } from "../context/PartnerModalContext";
import { businessDetails } from "@/lib/business-details";
import {
  HANDOVER_OPTIONS,
  PARTNER_TYPES,
  partnerWhatsAppText,
  type HandoverId,
  type PartnerTypeId,
} from "@/lib/partner-signup";

/**
 * "Become a partner", as a short application. Five screens, one decision
 * each, so nobody faces a long form:
 *
 *   0  Why partner (and who we work with)
 *   1  Your business — type, name, area
 *   2  What you'd offer — and how customers get it
 *   3  How to reach you — with the terms, stated plainly, before sending
 *   4  Done — and the same details as a WhatsApp message, one tap
 *
 * Opens only when someone taps "Become a partner" (see
 * PartnerModalContext). The details are emailed to SendEbun; WhatsApp is
 * offered at the end as the fastest way to a reply, and as the fallback
 * if the email can't be sent.
 */

type Step = 0 | 1 | 2 | 3 | 4;

const BENEFITS = [
  { title: "Paid before you prepare", body: "Every order is paid in full before it reaches you." },
  { title: "Your price, your brand", body: "Never sold above your counter price." },
  { title: "Runs from your phone", body: "No app to install. See orders, check codes, get paid." },
] as const;

const TERMS = [
  "Free to join — 10% commission only on orders we bring you",
  "Your normal prices, and your name on every gift",
  "Paid after each handover, usually the same day",
  "Pause items or stop any time",
] as const;

const field =
  "w-full rounded-lg border border-[rgba(var(--gold-rgb),0.22)] bg-ink px-4 py-3 text-[0.95rem] text-cream outline-none placeholder:text-[rgba(var(--cream-rgb),0.35)] focus:border-gold/70";
const label = "mb-1.5 block text-[0.78rem] tracking-[0.04em] text-[rgba(var(--cream-rgb),0.72)]";
const primary =
  "flex-1 rounded-lg bg-amber px-6 py-4 text-center font-sans text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-ink transition-colors hover:bg-amber-light disabled:opacity-40";
const secondary =
  "flex-1 rounded-lg border border-[rgba(var(--gold-rgb),0.3)] px-6 py-4 font-sans text-[0.78rem] uppercase tracking-[0.14em] text-[rgba(var(--cream-rgb),0.8)] transition-colors hover:border-gold/60";

/** "0803 123 4567" or "+44 7700 900123" -> E.164. Nigerian numbers without a country code are assumed. */
function toE164(raw: string): string {
  const trimmed = raw.trim();
  const digits = trimmed.replace(/\D/g, "");
  if (trimmed.startsWith("+")) return `+${digits}`;
  if (digits.startsWith("234")) return `+${digits}`;
  return `+234${digits.replace(/^0/, "")}`;
}

function whatsAppLink(text: string): string {
  return `https://wa.me/${businessDetails.phone.replace(/\D/g, "")}?text=${encodeURIComponent(text)}`;
}

export default function PartnerModal() {
  const { isOpen, closePartnerModal } = usePartnerModal();
  const panelRef = useRef<HTMLDivElement>(null);

  const [step, setStep] = useState<Step>(0);
  const [type, setType] = useState<PartnerTypeId | null>(null);
  const [businessName, setBusinessName] = useState("");
  const [area, setArea] = useState("");
  const [offer, setOffer] = useState("");
  const [handover, setHandover] = useState<HandoverId | null>(null);
  const [contactName, setContactName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // A sent application starts fresh next time; a half-filled one
  // survives an accidental close until the page reloads.
  const close = () => {
    if (step === 4) setStep(0);
    closePartnerModal();
  };

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closePartnerModal();
        return;
      }
      if (e.key === "Tab" && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], input, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [isOpen, closePartnerModal]);

  const summary = {
    type: type ?? "other",
    businessName: businessName.trim(),
    area: area.trim(),
    offer: offer.trim(),
    handover: handover ?? "pickup",
    contactName: contactName.trim(),
    whatsapp: toE164(whatsapp),
    email: email.trim() || undefined,
  } as const;

  const canNext: Record<Step, boolean> = {
    0: true,
    1: type !== null && businessName.trim().length >= 2 && area.trim().length >= 2,
    2: offer.trim().length >= 3 && handover !== null,
    3: contactName.trim().length >= 2 && /^\+[1-9]\d{7,14}$/.test(toE164(whatsapp)),
    4: true,
  };

  async function submit() {
    setSending(true);
    setError(null);
    try {
      const res = await fetch("/api/partner-interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...summary, website }),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { error?: string };
        setError(body.error ?? "We couldn't send that just now. Please message us on WhatsApp instead.");
        return;
      }
      window.dispatchEvent(new CustomEvent("ebun:partner_signup_sent", { detail: { type: summary.type } }));
      setStep(4);
    } catch {
      setError("We couldn't reach SendEbun. Please message us on WhatsApp instead.");
    } finally {
      setSending(false);
    }
  }

  const firstName = contactName.trim().split(/\s+/)[0] || "there";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center p-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div
            className="absolute inset-0 bg-[rgba(var(--ink-deep-rgb),0.82)] backdrop-blur-sm"
            onClick={close}
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="partner-modal-title"
            tabIndex={-1}
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative w-full max-w-[520px] bg-ink-2 border border-[rgba(var(--gold-rgb),0.18)] rounded-[16px] p-7 sm:p-8 outline-none max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={close}
              aria-label="Close"
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-muted hover:text-gold-light hover:bg-[rgba(var(--gold-rgb),0.08)] transition-colors"
            >
              ✕
            </button>

            {step > 0 && step < 4 && (
              <div className="mb-5 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setStep((s) => (s - 1) as Step)}
                  className="text-[0.78rem] text-[rgba(var(--cream-rgb),0.6)] hover:text-gold-light"
                >
                  ← Back
                </button>
                <ol className="flex flex-1 gap-1.5" aria-label={`Step ${step} of 3`}>
                  {[1, 2, 3].map((n) => (
                    <li
                      key={n}
                      className={`h-[3px] flex-1 rounded-full ${n <= step ? "bg-gold" : "bg-[rgba(var(--gold-rgb),0.15)]"}`}
                    />
                  ))}
                </ol>
                <span className="w-8" aria-hidden="true" />
              </div>
            )}

            {step === 0 && (
              <div>
                <p className="text-[0.64rem] tracking-[0.2em] uppercase text-gold-light mb-3">Partners</p>
                <h2 id="partner-modal-title" className="font-serif font-light text-cream text-[2rem] leading-tight mb-3">
                  Be the gift people send
                </h2>
                <p className="text-[0.92rem] leading-[1.75] text-[rgba(var(--cream-rgb),0.75)] mb-6">
                  SendEbun brings you people buying for someone else — from across Nigeria, from abroad, and companies
                  thanking their teams.
                </p>
                <ul className="mb-6 flex flex-col gap-3">
                  {BENEFITS.map((b) => (
                    <li key={b.title} className="flex items-start gap-3">
                      <span className="mt-[3px] flex h-[18px] w-[18px] min-w-[18px] items-center justify-center rounded-full border border-gold-dark text-gold">
                        <Check className="h-3 w-3" strokeWidth={2} />
                      </span>
                      <span className="text-[0.88rem] leading-[1.6]">
                        <span className="text-cream">{b.title}.</span>{" "}
                        <span className="text-[rgba(var(--cream-rgb),0.65)]">{b.body}</span>
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mb-2 text-[0.64rem] tracking-[0.2em] uppercase text-gold-light">Who we work with</p>
                <p className="mb-7 text-[0.85rem] leading-[1.7] text-[rgba(var(--cream-rgb),0.68)]">
                  {PARTNER_TYPES.filter((t) => t.id !== "other")
                    .map((t) => t.name.replace(/ or /, " & "))
                    .join(" · ")}
                </p>
                <div className="flex flex-col gap-3 sm:flex-row-reverse">
                  <button type="button" onClick={() => setStep(1)} className={primary}>
                    Apply in 2 minutes
                  </button>
                  <button type="button" onClick={close} className={secondary}>
                    Maybe later
                  </button>
                </div>
              </div>
            )}

            {step === 1 && (
              <div>
                <h2 id="partner-modal-title" className="font-serif font-light text-cream text-[1.7rem] leading-tight mb-5">
                  Your business
                </h2>
                <p className={label}>What kind of business is it?</p>
                <div className="mb-5 grid grid-cols-1 gap-2 sm:grid-cols-2" role="radiogroup" aria-label="Type of business">
                  {PARTNER_TYPES.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      role="radio"
                      aria-checked={type === t.id}
                      onClick={() => setType(t.id)}
                      className={`rounded-lg border px-3 py-2.5 text-left transition-colors ${
                        type === t.id
                          ? "border-gold bg-gold/10"
                          : "border-[rgba(var(--gold-rgb),0.18)] hover:border-gold/50"
                      }`}
                    >
                      <span className="block text-[0.88rem] text-cream">{t.name}</span>
                      <span className="block text-[0.74rem] text-[rgba(var(--cream-rgb),0.55)]">{t.gifts}</span>
                    </button>
                  ))}
                </div>
                <label className="mb-4 block">
                  <span className={label}>Business name</span>
                  <input
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    maxLength={120}
                    autoComplete="organization"
                    className={field}
                  />
                </label>
                <label className="mb-7 block">
                  <span className={label}>Area and city</span>
                  <input
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    maxLength={120}
                    placeholder="e.g. Alagbaka, Akure"
                    className={field}
                  />
                </label>
                <button type="button" disabled={!canNext[1]} onClick={() => setStep(2)} className={`${primary} w-full`}>
                  Next
                </button>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 id="partner-modal-title" className="font-serif font-light text-cream text-[1.7rem] leading-tight mb-2">
                  What would you offer?
                </h2>
                <p className="mb-5 text-[0.85rem] text-[rgba(var(--cream-rgb),0.6)]">
                  Two or three things you&rsquo;d love people to gift, with your prices. Rough is fine.
                </p>
                <label className="mb-5 block">
                  <span className="sr-only">What you&rsquo;d offer</span>
                  <textarea
                    value={offer}
                    onChange={(e) => setOffer(e.target.value)}
                    rows={4}
                    maxLength={600}
                    placeholder={"e.g. Birthday cake — ₦15,000\nDinner for two — ₦25,000"}
                    className={`${field} resize-none`}
                  />
                </label>
                <p className={label}>How do customers get their order?</p>
                <div className="mb-7 flex flex-wrap gap-2" role="radiogroup" aria-label="Handover">
                  {HANDOVER_OPTIONS.map((h) => (
                    <button
                      key={h.id}
                      type="button"
                      role="radio"
                      aria-checked={handover === h.id}
                      onClick={() => setHandover(h.id)}
                      className={`rounded-full border px-4 py-2 text-[0.85rem] transition-colors ${
                        handover === h.id
                          ? "border-gold bg-gold/10 text-cream"
                          : "border-[rgba(var(--gold-rgb),0.25)] text-[rgba(var(--cream-rgb),0.75)] hover:border-gold/50"
                      }`}
                    >
                      {h.label}
                    </button>
                  ))}
                </div>
                <button type="button" disabled={!canNext[2]} onClick={() => setStep(3)} className={`${primary} w-full`}>
                  Next
                </button>
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 id="partner-modal-title" className="font-serif font-light text-cream text-[1.7rem] leading-tight mb-5">
                  How we reach you
                </h2>
                <label className="mb-4 block">
                  <span className={label}>Your name</span>
                  <input
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    maxLength={120}
                    autoComplete="name"
                    className={field}
                  />
                </label>
                <label className="mb-4 block">
                  <span className={label}>WhatsApp number</span>
                  <input
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    inputMode="tel"
                    autoComplete="tel"
                    maxLength={20}
                    placeholder="0803 123 4567"
                    className={field}
                  />
                </label>
                <label className="mb-5 block">
                  <span className={label}>Email (optional)</span>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    maxLength={200}
                    autoComplete="email"
                    className={field}
                  />
                </label>
                {/* Honeypot: off-screen for people, irresistible to bots. */}
                <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
                  <label>
                    Website
                    <input tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
                  </label>
                </div>

                <div className="mb-6 rounded-lg border border-[rgba(var(--gold-rgb),0.15)] bg-ink p-4">
                  <p className="mb-2 text-[0.64rem] tracking-[0.2em] uppercase text-gold-light">How it works for you</p>
                  <ul className="flex flex-col gap-1.5">
                    {TERMS.map((t) => (
                      <li key={t} className="flex items-start gap-2 text-[0.82rem] leading-[1.5] text-[rgba(var(--cream-rgb),0.75)]">
                        <Check className="mt-[3px] h-3 w-3 min-w-3 text-gold" strokeWidth={2} />
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>

                {error && (
                  <div role="alert" className="mb-4 text-[0.85rem] text-[#e8a0a0]">
                    {error}{" "}
                    <a
                      href={whatsAppLink(partnerWhatsAppText(summary))}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-4 text-gold-light"
                    >
                      Open WhatsApp
                    </a>
                  </div>
                )}

                <button
                  type="button"
                  disabled={!canNext[3] || sending}
                  onClick={() => void submit()}
                  className={`${primary} w-full`}
                >
                  {sending ? "Sending…" : "Send my details"}
                </button>
                <p className="mt-3 text-center text-[0.72rem] text-[rgba(var(--cream-rgb),0.5)]">
                  We only use these details to set you up as a partner.
                </p>
              </div>
            )}

            {step === 4 && (
              <div className="text-center">
                <span className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-gold text-gold">
                  <Check className="h-6 w-6" strokeWidth={1.75} />
                </span>
                <h2 id="partner-modal-title" className="font-serif font-light text-cream text-[1.9rem] leading-tight mb-3">
                  Thank you, {firstName}.
                </h2>
                <p className="mb-7 text-[0.92rem] leading-[1.75] text-[rgba(var(--cream-rgb),0.75)]">
                  We have your details and will message you on WhatsApp within a day to set {summary.businessName || "you"}{" "}
                  up. Want to start now? Send them to us on WhatsApp — it&rsquo;s already written.
                </p>
                <div className="flex flex-col gap-3 sm:flex-row-reverse">
                  <a
                    href={whatsAppLink(partnerWhatsAppText(summary))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={primary}
                  >
                    Message us on WhatsApp
                  </a>
                  <button type="button" onClick={close} className={secondary}>
                    Done
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
