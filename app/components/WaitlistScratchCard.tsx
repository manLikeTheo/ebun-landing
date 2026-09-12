"use client";

import { useState, useRef, useEffect } from "react";
import { submitWaitlist, fetchWaitlistStatus } from "@/lib/waitlist-client";
import WaitlistRevealModal from "./WaitlistRevealModal";

const COUNTRY_CODES = [
  { code: "+234", label: "🇳🇬 +234" },
  { code: "+44", label: "🇬🇧 +44" },
  { code: "+1", label: "🇺🇸 +1" },
  { code: "+971", label: "🇦🇪 +971" },
];

const ID_STORAGE_KEY = "ebun_waitlist_id";
const REVEALED_STORAGE_KEY = "ebun_waitlist_revealed";

function normalizePhone(countryCode: string, raw: string) {
  let digits = raw.replace(/\D/g, "");
  if (countryCode !== "+1" && digits.startsWith("0")) {
    digits = digits.slice(1);
  }
  return `${countryCode}${digits}`;
}

export default function WaitlistScratchCard() {
  const [countryCode, setCountryCode] = useState("+234");
  const [phone, setPhone] = useState("");
  const [optin, setOptin] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [myId, setMyId] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(ID_STORAGE_KEY);
  });
  const [queueNumber, setQueueNumber] = useState<number | null>(null);
  const [hasJoined, setHasJoined] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return Boolean(localStorage.getItem(ID_STORAGE_KEY));
  });
  const [hasRevealed, setHasRevealed] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem(REVEALED_STORAGE_KEY) === "true";
  });
  const [modalOpen, setModalOpen] = useState(false);

  const referrerRef = useRef<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref");
    if (ref) {
      referrerRef.current = ref;
      params.delete("ref");
      const clean = window.location.pathname + (params.toString() ? `?${params}` : "") + window.location.hash;
      window.history.replaceState({}, "", clean);
    }

    if (myId) {
      fetchWaitlistStatus(myId).then((status) => {
        if (status) setQueueNumber(status.queueNumber);
      });
    }
  }, [myId]);

  const handleSubmit = async () => {
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 7) {
      setError("Enter a valid WhatsApp number first");
      return;
    }
    if (!optin) {
      setError("Check the box so we know it's okay to message you");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await submitWaitlist({
        whatsapp: normalizePhone(countryCode, phone),
        email: showEmail ? email : undefined,
        hp: honeypot,
        ref: referrerRef.current,
      });
      localStorage.setItem(ID_STORAGE_KEY, res.id);
      setMyId(res.id);
      setQueueNumber(res.queueNumber);
      setHasJoined(true);
      setModalOpen(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRevealed = () => {
    setHasRevealed(true);
    localStorage.setItem(REVEALED_STORAGE_KEY, "true");
  };

  return (
    <div className="max-w-[440px] mx-auto bg-ink-2 border border-[rgba(201,168,76,0.14)] rounded-[14px] p-9 text-center">
      {!hasJoined ? (
        <div>
          <input
            type="text"
            name="companyWebsite"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            className="sr-only"
          />

          <label htmlFor="phone" className="block text-left text-[0.68rem] tracking-[0.14em] uppercase text-gold-light mb-[10px]">
            WhatsApp number
          </label>
          <div className="flex gap-2 mb-2">
            <select
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              disabled={loading}
              aria-label="Country code"
              className="w-[100px] bg-ink-3 border border-[rgba(201,168,76,0.2)] rounded-lg text-cream text-[0.85rem] px-2 h-[46px] outline-none focus:border-gold disabled:opacity-50"
            >
              {COUNTRY_CODES.map((c) => (
                <option key={c.code} value={c.code} className="bg-ink text-cream">
                  {c.label}
                </option>
              ))}
            </select>
            <input
              id="phone"
              type="tel"
              placeholder="801 234 5678"
              value={phone}
              disabled={loading}
              aria-describedby={error ? "phoneError" : undefined}
              onChange={(e) => setPhone(e.target.value)}
              className="flex-1 bg-ink-3 border border-[rgba(201,168,76,0.2)] rounded-lg text-cream text-[0.95rem] px-[14px] h-[46px] outline-none focus:border-gold disabled:opacity-50"
            />
          </div>
          <div id="phoneError" role="alert" aria-live="polite" className="text-[#E0897A] text-[0.76rem] text-left min-h-[18px] my-1">
            {error}
          </div>

          <label className="flex gap-2 text-left text-[0.74rem] text-muted leading-[1.5] my-3">
            <input
              type="checkbox"
              checked={optin}
              disabled={loading}
              onChange={(e) => setOptin(e.target.checked)}
              className="mt-[3px] accent-gold shrink-0"
            />
            <span>We&apos;ll message you on WhatsApp when we launch. No spam, no bulk lists.</span>
          </label>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-gold text-ink rounded-lg py-[15px] font-sans font-medium text-[0.78rem] tracking-[0.14em] uppercase transition-all hover:bg-gold-light hover:-translate-y-0.5 shadow-[0_4px_26px_rgba(201,168,76,0.22)] disabled:opacity-60"
          >
            {loading ? "Joining..." : "Join early access"}
          </button>

          {showEmail && (
            <>
              <label htmlFor="waitlist-email" className="sr-only">Email address</label>
              <input
                id="waitlist-email"
                type="email"
                placeholder="name@email.com"
                value={email}
                disabled={loading}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-3 bg-ink-3 border border-[rgba(201,168,76,0.2)] rounded-lg text-cream text-[0.9rem] px-[14px] h-[42px] outline-none focus:border-gold disabled:opacity-50"
              />
            </>
          )}
          <button
            onClick={() => setShowEmail((s) => !s)}
            disabled={loading}
            className="mt-[14px] text-[0.76rem] text-muted underline underline-offset-4 hover:text-gold-light disabled:opacity-50"
          >
            In case we can&apos;t reach you on WhatsApp yet, add an email
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3">
          <div className="text-[0.64rem] tracking-[0.2em] uppercase text-gold-light">You&apos;re in</div>
          <div className="font-serif italic text-[1.6rem] text-gold-champagne leading-none">
            Founding Sender No. {queueNumber ?? "—"}
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="mt-2 border border-[rgba(201,168,76,0.35)] rounded-lg px-6 py-[12px] text-gold text-[0.74rem] tracking-[0.14em] uppercase transition-all hover:border-gold hover:text-gold-light hover:bg-[rgba(201,168,76,0.06)]"
          >
            View your invite
          </button>
        </div>
      )}

      <WaitlistRevealModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        id={myId}
        initialQueueNumber={queueNumber}
        playScratch={!hasRevealed}
        onRevealed={handleRevealed}
      />
    </div>
  );
}