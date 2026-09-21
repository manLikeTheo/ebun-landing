"use client";

import { useState, useRef, useEffect } from "react";
import { saveSurveyProgress } from "@/lib/survey-client";

type StepType =
  | "chips-single"
  | "chips-multi"
  | "yesno"
  | "textarea"
  | "textarea-pills"
  | "text"
  | "number-pair";
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
  pills?: string[];
  presets?: {
  label: string;
  values: Record<string, string>;
}[];
}

const STEPS: Step[] = [
  {
    key: "sender_type",
    eyebrow: "Quick context",
    question: "Where are you usually sending thoughtful gifts from?",
    hint: "There is no wrong answer — this just helps us build for your reality.",
    type: "chips-single",
    options: ["Outside Nigeria", "Within Nigeria", "A bit of both"],
    required: true,
  },
  {
    key: "last_gift_timing",
    eyebrow: "Question 1 of 10",
    question: "Think of the last time you wanted to celebrate someone. When was it?",
    hint: "Birthday, wedding, new job, new baby — whatever comes to mind first.",
    type: "chips-single",
    options: ["This week", "This month", "A few months ago", "I cannot remember"],
    required: true,
  },
  {
    key: "how_text",
    eyebrow: "Question 2 of 10",
    question: "How did you make it happen that time?",
    hint: "No essay needed — tap the closest answer, or make it your own.",
    type: "textarea-pills",
    pills: [
      "Sent a direct bank transfer",
      "Used LemFi, NALA, or another transfer app",
      "Messaged an Instagram vendor and hoped it worked out",
      "Asked someone at home to help sort it out",
      "Bought a voucher or gift card",
    ],
    required: true,
  },
  {
    key: "frustration_tags",
    eyebrow: "Question 3 of 10",
    question: "What made the experience harder than it should have been?",
    hint: "Pick every answer that feels true.",
    type: "chips-multi",
    options: [
      "I was not sure the vendor would deliver",
      "It felt too much like paying a bill",
      "Payment or FX fees",
      "Too much back-and-forth",
      "Delivery was a headache",
      "Something else",
    ],
    required: true,
  },
  {
    key: "frustration_other",
    eyebrow: "A little more context",
    question: "What happened?",
    hint: "A few words are enough.",
    type: "textarea",
    required: false,
    showIf: (responses) =>
      asStringArray(responses.frustration_tags).includes("Something else"),
  },
  {
    key: "defaulted_transfer",
    eyebrow: "Question 4 of 10",
    question: "Have you ever sent cash because arranging a proper gift felt like too much work?",
    type: "yesno",
    required: true,
  },
  {
    key: "feeling_text",
    eyebrow: "Question 4, continued",
    question: "How did that choice feel?",
    hint: "Tap the thought closest to yours — you can edit it.",
    type: "textarea-pills",
    pills: [
      "It felt like paying a bill when I wanted to celebrate someone",
      "Fast, yes — but boring",
      "I wished it felt more personal",
      "It was easier than dealing with vendors and delivery",
      "Honestly, cash was what they needed most",
    ],
    required: false,
    showIf: (responses) => responses.defaulted_transfer === "Yes",
  },
  {
    key: "reveal_usecase",
    eyebrow: "Question 5 of 10",
    question: "What is the first moment you would use an Ebun-style reveal for?",
    hint: "Pick the one that makes you think: “Yes, I would send that.”",
    type: "textarea-pills",
    pills: [
      "My brother or sister's birthday or milestone",
      "A surprise cake or platter for a close friend",
      "A Wednesday thank-you package for someone who deserves it",
      "A wedding gift when I cannot be there in person",
      "A thoughtful lunch for my partner, friend, or colleague",
    ],
    required: true,
  },
  {
    key: "group_coordination",
    eyebrow: "Question 6 of 10",
    question: "For a wedding or group surprise, how do people usually contribute?",
    type: "chips-single",
    options: [
      "A WhatsApp group that gets chaotic",
      "One person pays and chases refunds",
      "We usually do not bother coordinating",
      "Ajo — everyone contributes together",
    ],
    required: true,
  },
  {
    key: "blockers_tags",
    eyebrow: "Question 7 of 10",
    question: "What would make you hesitate before trying Ebun?",
    hint: "Be brutally honest — this is how we earn trust.",
    type: "chips-multi",
    options: [
      "Vendor quality",
      "Price markup",
      "Payment security",
      "Delivery speed",
      "Honestly, I would try it today",
    ],
    required: true,
  },
  {
    key: "spend",
    eyebrow: "Question 8 of 10",
    question: "What does a typical gift budget look like for you?",
    hint: "A rough range is perfect. Tap one, then edit if needed.",
    type: "number-pair",
    fields: [
      { key: "casual_spend", label: "Small gesture (₦)" },
      { key: "milestone_spend", label: "Big celebration (₦)" },
    ],
    presets: [
      {
        label: "Simple but thoughtful",
        values: { casual_spend: "5000", milestone_spend: "15000" },
      },
      {
        label: "A proper treat",
        values: { casual_spend: "10000", milestone_spend: "30000" },
      },
      {
        label: "A big moment",
        values: { casual_spend: "20000", milestone_spend: "50000" },
      },
    ],
    required: false,
  },
  {
    key: "fee_preference",
    eyebrow: "Question 9 of 10",
    question: "At checkout, what would feel fairest?",
    type: "chips-single",
    options: [
      "One clear service fee",
      "A small markup on the item",
      "Whichever keeps the total transparent",
    ],
    required: true,
  },
  {
    key: "wishlist_text",
    eyebrow: "Question 10 of 10",
    question: "What would you genuinely love to surprise someone with?",
    hint: "Tap an idea that makes you smile, or tell us your own.",
    type: "textarea-pills",
    pills: [
      "A surprise breakfast or cake platter",
      "A thoughtful lunch package on a Tuesday",
      "Cinema tickets, a spa session, or a weekend pamper package",
      "A perfume, fashion piece, or proper gift box",
      "Data, airtime, or electricity when someone really needs it",
    ],
    required: false,
  },
  {
    key: "contact_whatsapp",
    eyebrow: "Last thing",
    question: "Want first access to the prototype?",
    hint: "Leave your WhatsApp number if you are open to a five-minute voice-note chat later.",
    type: "text",
    required: false,
  },
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
  const videoRef = useRef<HTMLVideoElement>(null);
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

  // const getNumberPairAnswer = (key: string, field: string) => {
  //   const value = responses[key];
  //   const pair = asNumberRecord(value);
  //   const fieldValue = pair[field];
  //   return typeof fieldValue === "string" || typeof fieldValue === "number" ? fieldValue : "";
  // };

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
      if (cleared / total > 0.5) {
        setRevealed(true);
        if(videoRef.current) {
          videoRef.current.currentTime = 0;
                videoRef.current.play().catch(() => {}); 
        }
      }
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
        {/* <p className="text-muted-strong max-w-[420px] leading-[1.7] mb-8">
          We&apos;re building a better way to gift someone back home. A few honest answers shape what we build next — not a generic survey, a real conversation.
        </p> */}
        <p className="text-muted-strong max-w-[420px] leading-[1.7] mb-8">
          No essays. Tap the answer closest to yours, add a thought if you want, and keep moving. We are listening.
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
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-10">
      <div className="text-gold text-[0.7rem] tracking-[0.2em] uppercase mb-4">Ebun</div>
      <h1 className="font-serif font-light text-cream text-[2rem] mb-2">One more thing.</h1>
      <p className="text-muted mb-6">Scratch the card below.</p>

      {/* Container for Scratch Card */}
<div
  ref={wrapRef}
  className="relative w-[320px] h-[340px] rounded-[16px] overflow-hidden bg-ink-2 border border-[rgba(201,168,76,0.2)] shadow-2xl"
>
  {/* Underneath Layer: Video + Elegant Text Footer */}
  <div className="absolute inset-0 flex flex-col bg-ink-2 w-full h-full">
    {/* Top 65%: Video Player */}
    <div className="relative w-full h-[65%] overflow-hidden bg-black">
      <video
        ref={videoRef}
        preload="auto"
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
      >
        <source src="/gift_reveal_moment.mp4" type="video/mp4" />
      </video>
      {/* Subtle bottom gradient overlay for smooth visual transition */}
      <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-ink-2 to-transparent" />
    </div>

    {/* Bottom 35%: Thank-You Text */}
    <div className="flex-1 flex flex-col items-center justify-center text-center px-4 py-3 bg-ink-2">
      <div className="text-gold-champagne font-serif italic text-[1.2rem] font-bold">
        Thank you!
      </div>
      <div className="text-muted-strong text-[0.9rem] mt-1 leading-snug max-w-[240px]">
        Your answers are shaping what we build next.
      </div>
    </div>
  </div>

  {/* Scratchable Canvas Layer */}
  {!revealed && (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 cursor-grab active:cursor-grabbing touch-none z-10"
    />
  )}
</div>

      <div className="text-muted text-[0.9rem] mt-4">
        {revealed ? "You're all set! Thank you." : "Drag your finger or cursor across the card"}
      </div>
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

        {(step.type === "textarea" || step.type === "textarea-pills") && (
  <div>
    {step.pills && (
      <div className="mb-4">
        <p className="mb-2 text-[0.72rem] text-gold-light">
          Need a nudge? Tap a thought that feels close.
        </p>

        <div className="flex flex-wrap gap-2">
          {step.pills.map((pill) => {
            const active = getStringAnswer(step.key) === pill;

            return (
              <button
                key={pill}
                type="button"
                onClick={() => setAnswer(step.key, pill)}
                className={`rounded-lg border px-3 py-2.5 text-left text-[0.78rem] leading-[1.45] transition-all ${
                  active
                    ? "border-gold bg-gold text-ink font-medium"
                    : "border-[rgba(201,168,76,0.3)] bg-gold/5 text-gold-light hover:border-gold hover:bg-gold/10"
                }`}
              >
                {pill}
              </button>
            );
          })}
        </div>
      </div>
    )}

    <textarea
      value={getStringAnswer(step.key)}
      onChange={(event) => setAnswer(step.key, event.target.value)}
      placeholder={
        step.pills
          ? "Or make the answer your own..."
          : "A few words are enough..."
      }
      className="min-h-[110px] w-full resize-y rounded-lg border border-[rgba(201,168,76,0.2)] bg-ink-3 p-4 text-[0.95rem] text-cream outline-none focus:border-gold"
    />
  </div>
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
          <>
            {step.presets && (
              <div className="mb-4 flex flex-wrap gap-2">
                {step.presets.map((preset) => {
                  const pair = asNumberRecord(responses[step.key]);
                  const active = Object.entries(preset.values).every(
                    ([key, value]) => String(pair[key] ?? "") === value
                  );

                  return (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => setAnswer(step.key, preset.values)}
                      className={`rounded-full border px-3 py-2 text-[0.72rem] transition-all ${
                        active
                          ? "border-gold bg-gold text-ink font-medium"
                          : "border-[rgba(201,168,76,0.3)] text-cream hover:border-gold"
                      }`}
                    >
                      {preset.label}
                    </button>
                  );
                })}
              </div>
            )}
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
          </>
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