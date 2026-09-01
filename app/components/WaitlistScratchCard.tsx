"use client";

import { useState, useRef, useEffect } from "react";

const COUNTRY_CODES = [
  { code: "+234", label: "🇳🇬 +234" },
  { code: "+44", label: "🇬🇧 +44" },
  { code: "+1", label: "🇺🇸 +1" },
  { code: "+971", label: "🇦🇪 +971" },
];

function normalizePhone(countryCode: string, raw: string) {
  let digits = raw.replace(/\D/g, "");
  if (countryCode !== "+1" && digits.startsWith("0")) {
    digits = digits.slice(1);
  }
  return `${countryCode}${digits}`;
}

async function submitWaitlist(payload: {
  whatsapp: string;
  email?: string;
  hp: string;
}): Promise<{ queueNumber: number }> {
  const res = await fetch("/api/waitlist", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || "Something went wrong. Try again.");
  }
  const data = await res.json();
  return { queueNumber: data.queueNumber };
}

export default function WaitlistScratchCard() {
  const [countryCode, setCountryCode] = useState("+234");
  const [phone, setPhone] = useState("");
  const [optin, setOptin] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [error, setError] = useState("");
  const [stage, setStage] = useState<"form" | "loading" | "scratch">("form");
  const [queueNumber, setQueueNumber] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [showShare, setShowShare] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const scratchingRef = useRef(false);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);
  const completeRevealRef = useRef<() => void>(() => {});

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
    setStage("loading");
    try {
      const res = await submitWaitlist({
        whatsapp: normalizePhone(countryCode, phone),
        email: showEmail ? email : undefined,
        hp: honeypot,
      });
      setQueueNumber(res.queueNumber);
      setStage("scratch");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Try again.");
      setStage("form");
    }
  };

  useEffect(() => {
    if (stage !== "scratch" || !canvasRef.current || !wrapRef.current) return;
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    const w = wrap.clientWidth;
    const h = wrap.clientHeight;
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    setRevealed(false);
    setShowShare(false);

    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, "#E2C07A");
    grad.addColorStop(0.5, "#C9A84C");
    grad.addColorStop(1, "#8A6F32");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    ctx.fillStyle = "rgba(14,13,11,0.08)";
    for (let i = 0; i < 900; i++) {
      ctx.beginPath();
      ctx.arc(Math.random() * w, Math.random() * h, Math.random() * 1.4, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.globalCompositeOperation = "destination-out";

    const complete = () => {
      setRevealed(true);
      setTimeout(() => setShowShare(true), 400);
    };
    completeRevealRef.current = complete;

    const getPos = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const scratchAt = (x: number, y: number) => {
      ctx.beginPath();
      ctx.arc(x, y, 34, 0, Math.PI * 2);
      ctx.fill();
    };
    const checkProgress = () => {
      const data = ctx.getImageData(0, 0, w, h).data;
      let cleared = 0,
        total = 0;
      const step = 8;
      for (let y = 0; y < h; y += step) {
        for (let x = 0; x < w; x += step) {
          total++;
          if (data[(y * w + x) * 4 + 3] < 40) cleared++;
        }
      }
      if (cleared / total > 0.5) complete();
    };

    const onDown = (e: PointerEvent) => {
      scratchingRef.current = true;
      const pos = getPos(e);
      lastPosRef.current = pos;
      scratchAt(pos.x, pos.y);
    };
    const onMove = (e: PointerEvent) => {
      if (!scratchingRef.current) return;
      const pos = getPos(e);
      const last = lastPosRef.current;
      if (last) {
        const dist = Math.hypot(pos.x - last.x, pos.y - last.y);
        const steps = Math.max(1, Math.floor(dist / 6));
        for (let i = 0; i < steps; i++) {
          const t = i / steps;
          scratchAt(last.x + (pos.x - last.x) * t, last.y + (pos.y - last.y) * t);
        }
      }
      lastPosRef.current = pos;
      checkProgress();
    };
    const onUp = () => {
      scratchingRef.current = false;
      lastPosRef.current = null;
    };

    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [stage]);

  const handleShare = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  const reset = () => {
    setStage("form");
    setPhone("");
    setOptin(false);
    setError("");
  };

  const loading = stage === "loading";

  return (
    <div className="max-w-[440px] mx-auto bg-ink-2 border border-[rgba(201,168,76,0.14)] rounded-[14px] p-9 text-center">
      {stage !== "scratch" ? (
        <div>
          {/* Honeypot: invisible to sighted users, skipped in tab order.
              Real bots that auto-fill every field populate it; real people never do. */}
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
        <div>
          <div ref={wrapRef} className="relative w-full h-[220px] rounded-[10px] overflow-hidden mb-[22px] bg-ink">
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-5">
              <div className="text-[0.64rem] tracking-[0.2em] uppercase text-gold-light mb-[10px]">You&apos;re in</div>
              <div className="font-serif italic text-[2.5rem] text-gold-champagne leading-none mb-[10px]">
                Founding Sender No. {queueNumber}
              </div>
              <div className="text-cream text-[0.85rem] max-w-[260px] leading-[1.6]">
                First to know when Ebun opens. First to send the first gift.
              </div>
            </div>
            <canvas
              ref={canvasRef}
              aria-hidden="true"
              className="absolute inset-0 cursor-grab active:cursor-grabbing touch-none transition-opacity duration-500"
              style={{ opacity: revealed ? 0 : 1 }}
            />
            <div
              className="absolute top-[14px] left-1/2 -translate-x-1/2 text-[0.66rem] tracking-[0.16em] uppercase text-[rgba(14,13,11,0.55)] pointer-events-none transition-opacity duration-300"
              style={{ opacity: revealed ? 0 : 1 }}
            >
              Scratch to reveal
            </div>
          </div>

          {!revealed && (
            <button
              onClick={() => completeRevealRef.current()}
              className="mb-4 text-[0.74rem] text-muted underline underline-offset-4 hover:text-gold-light"
            >
              Prefer not to scratch? Reveal instantly
            </button>
          )}

          <button
            onClick={handleShare}
            className={`w-full border border-[rgba(201,168,76,0.35)] rounded-lg py-[14px] text-gold text-[0.76rem] tracking-[0.14em] uppercase transition-all hover:border-gold hover:text-gold-light hover:bg-[rgba(201,168,76,0.06)] ${
              showShare ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            }`}
          >
            {copied ? "Link copied ✓" : "Share your spot ↗"}
          </button>
          <button onClick={reset} className="mt-[18px] text-[0.74rem] text-muted underline underline-offset-4 hover:text-gold-light">
            Start over
          </button>
        </div>
      )}
    </div>
  );
}