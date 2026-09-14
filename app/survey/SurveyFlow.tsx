"use client";

import { useState, useRef, useEffect } from "react";
import { saveSurveyProgress } from "@/lib/survey-client";

type StepType = "chips-single" | "chips-multi" | "yesno" | "textarea" | "text" | "number-pair";
type SurveyResponseValue = string | string[] | number | Record<string, string | number | null | undefined> | null | undefined;
type SurveyResponses = Record<string, SurveyResponseValue>;

const asStringArray = (value: SurveyResponseValue): string[] =>
  Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];

const asNumberRecord = (value: SurveyResponseValue): Record<string, string | number | null | undefined> =>
  value && typeof value === "object" && !Array.isArray(value) ? value as Record<string, string | number | null | undefined> : {};

interface Step {
  key: string;
  eyebrow: string;
  question: string;
  hint?: string;
  type: StepType;
  options?: string[];
  fields?: { key: string; label: string }[];
  required: boolean;
  showIf?: (r: SurveyResponses) => boolean;
}

const STEPS: Step[] = [
  { key: "sender_type", eyebrow: "Quick context", question: "Are you usually sending gifts from abroad, or within Nigeria?", type: "chips-single", options: ["Abroad (diaspora)", "Within Nigeria", "Both"], required: true },
  { key: "last_gift_timing", eyebrow: "Question 1 of 10", question: "When was the last time you sent a gift or money to someone for a special occasion?", hint: "Birthday, wedding, anniversary — whatever comes to mind first.", type: "chips-single", options: ["This week", "This month", "A few months ago", "Can't remember"], required: true },
  { key: "how_text", eyebrow: "Question 2 of 10", question: "Walk me through how you did it.", hint: "What app, platform, or method did you actually use?", type: "textarea", required: true },
  { key: "frustration_tags", eyebrow: "Question 3 of 10", question: "What was the most frustrating part of that experience?", hint: "Pick any that apply.", type: "chips-multi", options: ["Vendor reliability", "Payment issues", "Presentation", "Delivery tracking", "Something else"], required: true },
  { key: "frustration_other", eyebrow: "Question 3, continued", question: "Say a bit more about that.", type: "textarea", required: false, showIf: (r) => asStringArray(r.frustration_tags).includes("Something else") },
  { key: "defaulted_transfer", eyebrow: "Question 4 of 10", question: "Have you ever just sent a bank transfer because finding a real gift across distance felt too stressful?", type: "yesno", required: true },
  { key: "feeling_text", eyebrow: "Question 4, continued", question: "How did that make you feel?", type: "textarea", required: false, showIf: (r) => r.defaulted_transfer === "Yes" },
  { key: "reveal_usecase", eyebrow: "Question 5 of 10", question: "If you could send a gift straight to someone's WhatsApp, with a personal reveal moment, when would you use that over cash?", type: "textarea", required: true },
  { key: "group_coordination", eyebrow: "Question 6 of 10", question: "For group occasions — a wedding, a group birthday surprise — how do you currently coordinate contributions?", type: "chips-single", options: ["WhatsApp group chat", "One person pays, others reimburse", "We usually don't coordinate", "Other"], required: true },
  { key: "blockers_tags", eyebrow: "Question 7 of 10", question: "What would stop you from trying a platform like Ebun?", hint: "Pick any that apply — total honesty helps us more than politeness.", type: "chips-multi", options: ["Trust in local vendors", "Price markup", "Payment security", "Delivery speed", "Honestly, nothing — I'd try it"], required: true },
  { key: "spend", eyebrow: "Question 8 of 10", question: "Roughly how much do you spend on a gift?", type: "number-pair", fields: [{ key: "casual_spend", label: "Casual gift (₦)" }, { key: "milestone_spend", label: "Milestone gift (₦)" }], required: false },
  { key: "fee_preference", eyebrow: "Question 9 of 10", question: "Checkout fees — what would you rather see?", type: "chips-single", options: ["A flat service fee", "A small % markup on the item", "No strong preference"], required: true },
  { key: "wishlist_text", eyebrow: "Question 10 of 10", question: "What's one local vendor or gift you wish you could easily order for someone in Nigeria today?", hint: "No more digging through Instagram DMs.", type: "textarea", required: false },
  { key: "contact_whatsapp", eyebrow: "Last thing", question: "Open to a 5-minute voice-note follow-up sometime?", hint: "Totally optional — leave your WhatsApp number if so.", type: "text", required: false },
];

function makeSessionId() {
  return typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`;
}

export default function SurveyFlow() {
  const [sessionId] = useState(makeSessionId);
  const [stage, setStage] = useState<"intro" | "question" | "outro">("intro");
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState<SurveyResponses>({});
  const [shakeError, setShakeError] = useState(false);

  const [revealed, setRevealed] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const scratchingRef = useRef(false);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);

  const visibleSteps = STEPS.filter((s) => !s.showIf || s.showIf(responses));
  const step = visibleSteps[currentStep];

  const buildPayload = (completed: boolean) => {
    const flat: Record<string, unknown> = { sessionId, completed };
    for (const s of STEPS) {
      const v = responses[s.key];
      if (v === undefined) continue;
      if (s.type === "chips-multi") flat[s.key] = asStringArray(v).join(", ");
      else if (s.type === "number-pair") {
        const pair = asNumberRecord(v);
        flat.casual_spend = pair.casual_spend ?? null;
        flat.milestone_spend = pair.milestone_spend ?? null;
      } else flat[s.key] = v;
    }
    return flat;
  };

  const getStringAnswer = (key: string) => {
    const value = responses[key];
    return typeof value === "string" ? value : "";
  };

  const getNumberPairAnswer = (key: string, field: string) => {
    const value = responses[key];
    const pair = asNumberRecord(value);
    const fieldValue = pair[field];
    return typeof fieldValue === "string" || typeof fieldValue === "number" ? fieldValue : "";
  };

  const isAnswered = (s: Step) => {
    const v = responses[s.key];
    if (s.type === "chips-multi") return Array.isArray(v) && v.length > 0;
    if (s.type === "number-pair") return true;
    return v !== undefined && v !== null && String(v).trim() !== "";
  };

  const goNext = (skipped = false) => {
    if (step.required && !skipped && !isAnswered(step)) {
      setShakeError(true);
      setTimeout(() => setShakeError(false), 400);
      return;
    }
    saveSurveyProgress(buildPayload(false));
    if (currentStep + 1 >= visibleSteps.length) {
      setStage("outro");
      saveSurveyProgress(buildPayload(true));
    } else {
      setCurrentStep((c) => c + 1);
    }
  };

  const goBack = () => setCurrentStep((c) => Math.max(0, c - 1));
  const setAnswer = (key: string, value: SurveyResponseValue) => setResponses((r) => ({ ...r, [key]: value }));

  useEffect(() => {
    if (stage !== "outro" || !canvasRef.current || !wrapRef.current) return;
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    const w = wrap.clientWidth, h = wrap.clientHeight;
    canvas.width = w; canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, "#E2C07A"); grad.addColorStop(0.5, "#C9A84C"); grad.addColorStop(1, "#8A6F32");
    ctx.fillStyle = grad; ctx.fillRect(0, 0, w, h);
    ctx.globalCompositeOperation = "destination-out";

    const getPos = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const scratchAt = (x: number, y: number) => { ctx.beginPath(); ctx.arc(x, y, 30, 0, Math.PI * 2); ctx.fill(); };
    const checkProgress = () => {
      const data = ctx.getImageData(0, 0, w, h).data;
      let cleared = 0, total = 0;
      for (let y = 0; y < h; y += 8) for (let x = 0; x < w; x += 8) { total++; if (data[(y * w + x) * 4 + 3] < 40) cleared++; }
      if (cleared / total > 0.5) setRevealed(true);
    };
    const onDown = (e: PointerEvent) => { scratchingRef.current = true; const p = getPos(e); lastPosRef.current = p; scratchAt(p.x, p.y); };
    const onMove = (e: PointerEvent) => {
      if (!scratchingRef.current) return;
      const p = getPos(e); const last = lastPosRef.current;
      if (last) {
        const dist = Math.hypot(p.x - last.x, p.y - last.y);
        const steps = Math.max(1, Math.floor(dist / 6));
        for (let i = 0; i < steps; i++) { const t = i / steps; scratchAt(last.x + (p.x - last.x) * t, last.y + (p.y - last.y) * t); }
      }
      lastPosRef.current = p; checkProgress();
    };
    const onUp = () => { scratchingRef.current = false; lastPosRef.current = null; };
    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [stage]);

  if (stage === "intro") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
        <div className="text-gold text-[0.7rem] tracking-[0.2em] uppercase mb-4">Ebun</div>
        <h1 className="font-serif font-light text-cream text-[2.4rem] mb-4">Got 2 minutes?</h1>
        <p className="text-muted-strong max-w-[420px] leading-[1.7] mb-8">
          We&apos;re building a better way to gift someone back home. A few honest answers shape what we build next — not a generic survey, a real conversation.
        </p>
        <button
          onClick={() => setStage("question")}
          className="bg-gold text-ink rounded-lg px-9 py-4 font-sans font-medium text-[0.85rem] tracking-[0.12em] uppercase hover:bg-gold-light transition-all"
        >
          Let&apos;s go →
        </button>
        <div className="text-muted text-[0.75rem] mt-4">Takes about 2 minutes · Saves as you go</div>
      </div>
    );
  }

  if (stage === "outro") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
        <div className="text-gold text-[0.7rem] tracking-[0.2em] uppercase mb-4">Ebun</div>
        <h1 className="font-serif font-light text-cream text-[2rem] mb-2">One more thing.</h1>
        <p className="text-muted mb-6">Scratch the card below.</p>
        <div ref={wrapRef} className="relative w-[280px] h-[180px] rounded-[14px] overflow-hidden bg-ink-2 border border-[rgba(201,168,76,0.2)]">
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-5">
            <div className="text-gold-champagne font-serif italic text-[1.3rem] mb-2">Thank you 🎁</div>
            <div className="text-muted-strong text-[0.78rem]">Your answers are shaping what we build next.</div>
          </div>
          {!revealed && <canvas ref={canvasRef} className="absolute inset-0 cursor-grab active:cursor-grabbing touch-none" />}
        </div>
        <div className="text-muted text-[0.75rem] mt-4">Drag your finger or cursor across the card</div>
      </div>
    );
  }

  const pct = Math.round((currentStep / visibleSteps.length) * 100);

  return (
    <div className="min-h-screen flex flex-col max-w-[560px] mx-auto px-5">
      <div className="flex items-center justify-between pt-6 pb-2">
        <div className="text-gold text-[0.7rem] tracking-[0.2em] uppercase">Ebun</div>
        <div className="text-muted text-[0.75rem]">{currentStep + 1} / {visibleSteps.length}</div>
      </div>
      <div className="h-1 bg-[rgba(255,255,255,0.08)] rounded-full overflow-hidden mb-6">
        <div className="h-full bg-gold transition-all duration-300" style={{ width: `${pct}%` }} />
      </div>

      <div className="flex-1 flex flex-col justify-center py-6">
        <div className="text-gold text-[0.72rem] tracking-[0.14em] uppercase mb-2">{step.eyebrow}</div>
        <div className={`font-serif text-[1.5rem] leading-snug mb-2 transition-colors ${shakeError ? "text-[#E0897A]" : "text-cream"}`}>
          {step.question}
        </div>
        {step.hint && <div className="text-muted text-[0.85rem] mb-5">{step.hint}</div>}

        {step.type === "chips-single" && (
          <div className="flex flex-wrap gap-2">
            {step.options!.map((opt) => (
              <button key={opt} onClick={() => setAnswer(step.key, opt)}
                className={`px-4 py-3 rounded-full border text-[0.85rem] transition-all ${responses[step.key] === opt ? "bg-gold text-ink border-gold font-medium" : "border-[rgba(201,168,76,0.3)] text-cream hover:border-gold"}`}>
                {opt}
              </button>
            ))}
          </div>
        )}

        {step.type === "chips-multi" && (
          <div className="flex flex-wrap gap-2">
            {step.options!.map((opt) => {
              const sel = asStringArray(responses[step.key]);
              const active = sel.includes(opt);
              return (
                <button key={opt} onClick={() => setAnswer(step.key, active ? sel.filter((v) => v !== opt) : [...sel, opt])}
                  className={`px-4 py-3 rounded-full border text-[0.85rem] transition-all ${active ? "bg-gold text-ink border-gold font-medium" : "border-[rgba(201,168,76,0.3)] text-cream hover:border-gold"}`}>
                  {opt}
                </button>
              );
            })}
          </div>
        )}

        {step.type === "yesno" && (
          <div className="flex gap-3">
            {["Yes", "No"].map((opt) => (
              <button key={opt} onClick={() => setAnswer(step.key, opt)}
                className={`flex-1 py-4 rounded-lg border text-[0.9rem] transition-all ${responses[step.key] === opt ? "bg-gold text-ink border-gold font-medium" : "border-[rgba(201,168,76,0.3)] text-cream hover:border-gold"}`}>
                {opt}
              </button>
            ))}
          </div>
        )}

        {step.type === "textarea" && (
          <textarea
            autoFocus
            value={getStringAnswer(step.key)}
            onChange={(e) => setAnswer(step.key, e.target.value)}
            placeholder="Type your answer..."
            className="w-full min-h-[110px] bg-ink-3 border border-[rgba(201,168,76,0.2)] rounded-lg p-4 text-cream text-[0.95rem] outline-none focus:border-gold resize-y"
          />
        )}

        {step.type === "text" && (
          <input
            autoFocus
            type="text"
            value={getStringAnswer(step.key)}
            onChange={(e) => setAnswer(step.key, e.target.value)}
            placeholder="e.g. 08012345678"
            onKeyDown={(e) => e.key === "Enter" && goNext()}
            className="w-full bg-ink-3 border border-[rgba(201,168,76,0.2)] rounded-lg px-4 h-[48px] text-cream text-[0.95rem] outline-none focus:border-gold"
          />
        )}

        {step.type === "number-pair" && (
          <div className="flex gap-3">
            {step.fields!.map((f) => {
              const pair = asNumberRecord(responses[step.key]);
              return (
                <div key={f.key} className="flex-1">
                  <label className="block text-muted text-[0.72rem] mb-1">{f.label}</label>
                  <input
                    type="number"
                    inputMode="numeric"
                    value={pair[f.key] ?? ""}
                    onChange={(e) => {
                      const nextPair = asNumberRecord(responses[step.key]);
                      setAnswer(step.key, { ...nextPair, [f.key]: e.target.value });
                    }}
                    placeholder="0"
                    className="w-full bg-ink-3 border border-[rgba(201,168,76,0.2)] rounded-lg px-3 h-[46px] text-cream text-[0.95rem] outline-none focus:border-gold"
                  />
                </div>
              );
            })}
          </div>
        )}

        {!step.required && (
          <button onClick={() => goNext(true)} className="mt-4 text-muted text-[0.78rem] underline underline-offset-4 hover:text-gold-light self-start">
            Skip this one
          </button>
        )}
      </div>

      <div className="flex items-center justify-between pb-6">
        <button onClick={goBack} className={`text-muted text-[0.85rem] hover:text-cream ${currentStep === 0 ? "invisible" : ""}`}>
          ← Back
        </button>
        <button onClick={() => goNext()} className="bg-gold text-ink rounded-lg px-7 py-3 font-medium text-[0.85rem] tracking-[0.1em] uppercase hover:bg-gold-light transition-all">
          {currentStep === visibleSteps.length - 1 ? "Finish" : "Next →"}
        </button>
      </div>
      <div className="text-muted text-[0.72rem] text-center pb-4">Your answers help shape Ebun directly — thank you.</div>
    </div>
  );
}