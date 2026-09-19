"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useWaitlistModal } from "../context/WaitlistModalContext";
import { submitWaitlist, fetchWaitlistStatus, submitSurvey } from "@/lib/waitlist-client";

const COUNTRY_CODES = [
  { code: "+234", label: "🇳🇬 +234" },
  { code: "+44", label: "🇬🇧 +44" },
  { code: "+1", label: "🇺🇸 +1" },
  { code: "+971", label: "🇦🇪 +971" },
];

const STATUS_POLL_MS = 12000;
const FOUNDER_WHATSAPP = process.env.NEXT_PUBLIC_FOUNDER_WHATSAPP || "";

const SURVEY_STEPS = [
  { key: "segment", question: "Sending from Nigeria, or abroad?", options: ["Nigeria", "Abroad (diaspora)"] },
  {
    key: "frustration",
    question: "What's stopped you from sending a real gift before?",
    options: ["Bank transfer felt easier", "Vendors felt unreliable", "Too far to coordinate", "Never really tried"],
  },
  { key: "occasion", question: "First occasion you'd use Ebun for?", options: ["Birthday", "Wedding", "Anniversary", "Just because"] },
] as const;

function normalizePhone(countryCode: string, raw: string) {
  let digits = raw.replace(/\D/g, "");
  if (countryCode !== "+1" && digits.startsWith("0")) {
    digits = digits.slice(1);
  }
  return `${countryCode}${digits}`;
}

export default function WaitlistModal() {
  const {
    isOpen,
    closeModal,
    hasJoined,
    hasRevealed,
    hasSurveyed,
    myId,
    queueNumber: ctxQueueNumber,
    referrerRef,
    handleJoinSuccess,
    handleRevealed,
    handleSurveyDone,
  } = useWaitlistModal();

  const [countryCode, setCountryCode] = useState("+234");
  const [phone, setPhone] = useState("");
  const [optin, setOptin] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [formError, setFormError] = useState("");
  const [formLoading, setFormLoading] = useState(false);

  const [queueNumber, setQueueNumber] = useState<number | null>(ctxQueueNumber);
  const [displayNumber, setDisplayNumber] = useState<number | null>(hasJoined && !hasRevealed ? ctxQueueNumber : null);
  const [justRevealed, setJustRevealed] = useState(false);
  const playScratch = hasJoined && !hasRevealed;
  const [revealed, setRevealed] = useState(hasJoined && !playScratch);
  const [referralCount, setReferralCount] = useState(0);
  const [position, setPosition] = useState<number | null>(ctxQueueNumber);
  const [copied, setCopied] = useState(false);
  const [particles, setParticles] = useState<{ id: number; x: number; delay: number }[]>([]);

  const [surveyStep, setSurveyStep] = useState(0);
  const [surveyAnswers, setSurveyAnswers] = useState<Record<string, string>>({});
  const [surveySubmitting, setSurveySubmitting] = useState(false);
  const [surveyError, setSurveyError] = useState("");

  const panelRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const scratchingRef = useRef(false);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);
  const completeRevealRef = useRef<() => void>(() => {});

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
        return;
      }
      if (e.key === "Tab" && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll<HTMLElement>(
          'button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
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
  }, [isOpen, closeModal]);

  useEffect(() => {
    if (!isOpen || !myId || !hasJoined) return;
    let cancelled = false;
    const tick = async () => {
      const status = await fetchWaitlistStatus(myId);
      if (status && !cancelled) {
        setQueueNumber(status.queueNumber);
        setReferralCount(status.referralCount);
        setPosition(status.position);
      }
    };
    tick();
    const interval = setInterval(tick, STATUS_POLL_MS);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [isOpen, myId, hasJoined]);

  const animateCountUp = (target: number) => {
    const start = Math.max(1, target - 40);
    const duration = 900;
    const startTime = performance.now();
    const step = (now: number) => {
      const progress = Math.min(1, (now - startTime) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayNumber(Math.round(start + (target - start) * eased));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const spawnParticles = () => {
    const arr = Array.from({ length: 10 }).map((_, i) => ({
      id: Date.now() + i,
      x: 10 + Math.random() * 80,
      delay: Math.random() * 0.3,
    }));
    setParticles(arr);
    setTimeout(() => setParticles([]), 2000);
  };

  useEffect(() => {
    if (!isOpen || !playScratch || revealed || !canvasRef.current || !wrapRef.current) return;
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    const w = wrap.clientWidth;
    const h = wrap.clientHeight;
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

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
      setJustRevealed(true);
      spawnParticles();
      if (queueNumber !== null) animateCountUp(queueNumber);
      handleRevealed();
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
  }, [isOpen, playScratch, revealed, queueNumber, handleRevealed]);

  const handleFormSubmit = async () => {
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 7) {
      setFormError("Enter a valid WhatsApp number first");
      return;
    }
    if (!optin) {
      setFormError("Check the box so we know it's okay to message you");
      return;
    }
    setFormError("");
    setFormLoading(true);
    try {
      const res = await submitWaitlist({
        whatsapp: normalizePhone(countryCode, phone),
        email: showEmail ? email : undefined,
        hp: honeypot,
        ref: referrerRef.current,
      });
      handleJoinSuccess(res.id, res.queueNumber);
      setQueueNumber(res.queueNumber);
      setPosition(res.queueNumber);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Something went wrong. Try again.");
    } finally {
      setFormLoading(false);
    }
  };

  const handleShare = async () => {
    if (!myId) return;
    const link = `${window.location.origin}/?ref=${myId}`;
    await navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  const handleSurveyTap = async (value: string) => {
    const key = SURVEY_STEPS[surveyStep].key;
    const nextAnswers = { ...surveyAnswers, [key]: value };
    setSurveyAnswers(nextAnswers);
    setSurveyError("");

    if (surveyStep < SURVEY_STEPS.length - 1) {
      setSurveyStep((s) => s + 1);
      return;
    }

    if (!myId) return;
    setSurveySubmitting(true);
    const ok = await submitSurvey({
  sessionId: myId,
  senderType: nextAnswers.segment,
  frustration: nextAnswers.frustration,
  occasion: nextAnswers.occasion,
});
    setSurveySubmitting(false);
    if (ok) {
      handleSurveyDone();
    } else {
      setSurveyError("Couldn't save that — try tapping again?");
    }
  };

  const waLink = FOUNDER_WHATSAPP
    ? `https://wa.me/${FOUNDER_WHATSAPP}?text=${encodeURIComponent(
        `Hey! I just joined the Ebun waitlist as Founding Sender No. ${queueNumber ?? ""} 🎁`
      )}`
    : null;

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
          <div className="absolute inset-0 bg-[rgba(10,9,8,0.82)] backdrop-blur-sm" onClick={closeModal} />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="waitlist-modal-title"
            tabIndex={-1}
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative w-full max-w-[460px] bg-ink-2 border border-[rgba(201,168,76,0.18)] rounded-[16px] p-8 outline-none max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={closeModal}
              aria-label="Close"
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-muted hover:text-gold-light hover:bg-[rgba(201,168,76,0.08)] transition-colors"
            >
              ✕
            </button>

            <div id="waitlist-modal-title" className="text-[0.64rem] tracking-[0.2em] uppercase text-gold-light mb-5 text-center">
              Early Access
            </div>

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

                <label htmlFor="modal-phone" className="block text-left text-[0.68rem] tracking-[0.14em] uppercase text-gold-light mb-[10px]">
                  WhatsApp number
                </label>
                <div className="flex gap-2 mb-2">
                  <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    disabled={formLoading}
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
                    id="modal-phone"
                    type="tel"
                    placeholder="801 234 5678"
                    value={phone}
                    disabled={formLoading}
                    aria-describedby={formError ? "modal-phoneError" : undefined}
                    onChange={(e) => setPhone(e.target.value)}
                    className="flex-1 bg-ink-3 border border-[rgba(201,168,76,0.2)] rounded-lg text-cream text-[0.95rem] px-[14px] h-[46px] outline-none focus:border-gold disabled:opacity-50"
                  />
                </div>
                <div id="modal-phoneError" role="alert" aria-live="polite" className="text-[#E0897A] text-[0.76rem] text-left min-h-[18px] my-1">
                  {formError}
                </div>

                <label className="flex gap-2 text-left text-[0.74rem] text-muted leading-[1.5] my-3">
                  <input
                    type="checkbox"
                    checked={optin}
                    disabled={formLoading}
                    onChange={(e) => setOptin(e.target.checked)}
                    className="mt-[3px] accent-gold shrink-0"
                  />
                  <span>We&apos;ll message you on WhatsApp when we launch. No spam, no bulk lists.</span>
                </label>

                <button
                  onClick={handleFormSubmit}
                  disabled={formLoading}
                  className="w-full bg-gold text-ink rounded-lg py-[15px] font-sans font-medium text-[0.78rem] tracking-[0.14em] uppercase transition-all hover:bg-gold-light hover:-translate-y-0.5 shadow-[0_4px_26px_rgba(201,168,76,0.22)] disabled:opacity-60"
                >
                  {formLoading ? "Joining..." : "Join early access"}
                </button>

                {showEmail && (
                  <>
                    <label htmlFor="modal-email" className="sr-only">Email address</label>
                    <input
                      id="modal-email"
                      type="email"
                      placeholder="name@email.com"
                      value={email}
                      disabled={formLoading}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full mt-3 bg-ink-3 border border-[rgba(201,168,76,0.2)] rounded-lg text-cream text-[0.9rem] px-[14px] h-[42px] outline-none focus:border-gold disabled:opacity-50"
                    />
                  </>
                )}
                <button
                  onClick={() => setShowEmail((s) => !s)}
                  disabled={formLoading}
                  className="mt-[14px] text-[0.76rem] text-muted underline underline-offset-4 hover:text-gold-light disabled:opacity-50"
                >
                  In case we can&apos;t reach you on WhatsApp yet, add an email
                </button>
              </div>
            ) : (
              <div>
                <div ref={wrapRef} className="relative w-full h-[250px] rounded-[12px] overflow-hidden mb-[22px] bg-ink">
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-5">
                    <div className="text-[0.64rem] tracking-[0.2em] uppercase text-gold-light mb-[10px]">You&apos;re in</div>
                    <div className={`font-serif italic text-[2.7rem] leading-none mb-[10px] ${justRevealed ? "shimmer-text" : "text-gold-champagne"}`}>
                      Founding Sender No. {displayNumber ?? queueNumber}
                    </div>
                    <div className="text-cream text-[0.85rem] max-w-[280px] leading-[1.6]">
                      First to know when Ebun opens. First to send the first gift.
                    </div>
                  </div>

                  {playScratch && !revealed && (
                    <canvas
                      ref={canvasRef}
                      aria-hidden="true"
                      className="absolute inset-0 cursor-grab active:cursor-grabbing touch-none transition-opacity duration-500"
                    />
                  )}
                  {playScratch && !revealed && (
                    <div className="absolute top-[14px] left-1/2 -translate-x-1/2 text-[0.66rem] tracking-[0.16em] uppercase text-[rgba(14,13,11,0.55)] pointer-events-none">
                      Scratch to reveal
                    </div>
                  )}

                  {particles.map((p) => (
                    <span key={p.id} className="sparkle" style={{ left: `${p.x}%`, animationDelay: `${p.delay}s` }} />
                  ))}
                </div>

                {playScratch && !revealed && (
                  <button
                    onClick={() => completeRevealRef.current()}
                    className="mb-4 text-[0.74rem] text-muted underline underline-offset-4 hover:text-gold-light block mx-auto"
                  >
                    Prefer not to scratch? Reveal instantly
                  </button>
                )}

                {revealed && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="border-t border-[rgba(201,168,76,0.12)] pt-5 mt-1 text-center"
                  >
                    <div className="text-[0.68rem] tracking-[0.14em] uppercase text-gold-light mb-2">Your invite position</div>
                    <div className="text-cream text-[1.5rem] tracking-wider font-serif mb-2">#{position ?? queueNumber}</div>
                    <div className="text-cream text-[0.78rem] leading-[1.6] mb-4">
                      {referralCount > 0
                        ? `${referralCount} friend${referralCount === 1 ? "" : "s"} joined through your link. Every referral moves you up 5 spots.`
                        : "Share your link — every friend who joins moves you up 5 spots."}
                    </div>
                    <button
                      onClick={handleShare}
                      className="w-full border border-[rgba(201,168,76,0.35)] rounded-lg py-[14px] text-gold text-[0.76rem] tracking-[0.14em] uppercase transition-all hover:border-gold hover:text-gold-light hover:bg-[rgba(201,168,76,0.06)]"
                    >
                      {copied ? "Link copied ✓" : "Copy your invite link"}
                    </button>
                    {waLink && (
                      <a
                        href={waLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 block w-full text-center py-[14px] text-gold-light text-[0.76rem] tracking-[0.14em] uppercase hover:text-gold-champagne transition-colors"
                      >
                        Say hello on WhatsApp →
                      </a>
                    )}
                  </motion.div>
                )}

                {revealed && !hasSurveyed && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="border-t border-[rgba(201,168,76,0.12)] pt-5 mt-5 text-left"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-[0.66rem] tracking-[0.14em] uppercase text-gold-light">One more thing — 15 seconds</div>
                      <div className="flex gap-1">
                        {SURVEY_STEPS.map((_, i) => (
                          <span
                            key={i}
                            className="w-[6px] h-[6px] rounded-full"
                            style={{ background: i <= surveyStep ? "#C9A84C" : "rgba(201,168,76,0.2)" }}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="text-cream text-[0.92rem] mb-3">{SURVEY_STEPS[surveyStep].question}</div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {SURVEY_STEPS[surveyStep].options.map((opt) => (
                        <button
                          key={opt}
                          disabled={surveySubmitting}
                          onClick={() => handleSurveyTap(opt)}
                          className="px-4 py-2 rounded-full border border-[rgba(201,168,76,0.3)] text-cream text-[0.78rem] hover:border-gold hover:text-gold-light hover:bg-[rgba(201,168,76,0.06)] transition-all disabled:opacity-50"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                    {surveyError && <div className="text-[#E0897A] text-[0.74rem] mb-2">{surveyError}</div>}
                    <button onClick={handleSurveyDone} className="text-[0.72rem] text-muted underline underline-offset-4 hover:text-gold-light">
                      Skip for now
                    </button>
                  </motion.div>
                )}
                {revealed && hasSurveyed && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="border-t border-[rgba(201,168,76,0.12)] pt-4 mt-5 text-center"
                  >
                    <a
                      href="/survey"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[0.9rem] text-gold-light underline underline-offset-4 hover:text-gold-champagne transition-colors"
                    >
                      Got 2 more minutes? Help us build this right →
                    </a>
                  </motion.div>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}