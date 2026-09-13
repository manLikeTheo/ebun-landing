"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { fetchWaitlistStatus } from "@/lib/waitlist-client";

const STATUS_POLL_MS = 12000;
const FOUNDER_WHATSAPP = process.env.NEXT_PUBLIC_FOUNDER_WHATSAPP || "";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  id: string | null;
  initialQueueNumber: number | null;
  playScratch: boolean;
  onRevealed: () => void;
}

export default function WaitlistRevealModal({
  isOpen,
  onClose,
  id,
  initialQueueNumber,
  playScratch,
  onRevealed,
}: Props) {
  const [queueNumber, setQueueNumber] = useState<number | null>(initialQueueNumber);
  const [displayNumber, setDisplayNumber] = useState<number | null>(null);
  const [justRevealed, setJustRevealed] = useState(false);
  const [revealed, setRevealed] = useState(!playScratch);
  const [referralCount, setReferralCount] = useState(0);
  const [position, setPosition] = useState<number | null>(initialQueueNumber);
  const [copied, setCopied] = useState(false);
  const [particles, setParticles] = useState<{ id: number; x: number; delay: number }[]>([]);

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
        onClose();
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
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen || !id) return;
    let cancelled = false;
    const tick = async () => {
      const status = await fetchWaitlistStatus(id);
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
  }, [isOpen, id]);

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
      onRevealed();
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
  }, [isOpen, playScratch, revealed, queueNumber, onRevealed]);

  const handleShare = async () => {
    if (!id) return;
    const link = `${window.location.origin}/?ref=${id}`;
    await navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
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
          <div className="absolute inset-0 bg-[rgba(10,9,8,0.82)] backdrop-blur-sm" onClick={onClose} />
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
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-muted hover:text-gold-light hover:bg-[rgba(201,168,76,0.08)] transition-colors"
            >
              ✕
            </button>

            <div id="waitlist-modal-title" className="text-[0.64rem] tracking-[0.2em] uppercase text-gold-light mb-5 text-center">
              Early Access
            </div>

            <div ref={wrapRef} className="relative w-full h-[250px] rounded-[12px] overflow-hidden mb-[22px] bg-ink">
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-5">
                <div className="text-[0.95rem] tracking-[0.2em] uppercase text-gold-light mb-[10px]">You&apos;re in</div>
                <div className={`font-serif italic text-[2.7rem] leading-none mb-[10px] ${justRevealed ? "shimmer-text" : "text-gold-champagne"}`}>
                  Founding Sender No. {displayNumber ?? queueNumber}
                </div>
                <div className="text-cream text-[0.85rem] max-w-[280px] leading-[1.6]">
                  First to know when Ebun opens. First to send the Gift Experience.
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
                <div className="text-[0.8rem] tracking-[0.14em] font-semibold uppercase text-gold-light mb-2">Your invite position</div>
                <div className="text-cream text-[1.3rem] font-mono font-semibold tracking-wider mb-2">#{position ?? queueNumber}</div>
                <div className="text-muted text-[0.8rem] leading-[1.6] mb-4">
                  {referralCount > 0
                    ? `${referralCount} friend${referralCount === 1 ? "" : "s"} joined through your link. Every referral moves you up 5 spots.`
                    : "Share your link... Every friend who joins moves you up 5 spots."}
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
                    className="mt-3 block w-full text-center py-[14px] text-gold-light text-[0.76rem] tracking-[0.14em] uppercase hover:text-gold-champagne hover:font-semibold transition-colors"
                  >
                    Say hello on WhatsApp →
                  </a>
                )}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}