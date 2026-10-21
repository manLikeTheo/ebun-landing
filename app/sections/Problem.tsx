"use client";

import { Play } from "lucide-react";
import RevealOnScroll from "../components/RevealOnScroll";
import SectionEyebrow from "../components/SectionEyebrow";

/**
 * The problem SendEbun solves is the hassle of getting a real gift to
 * someone — not money. We never argue against transfers: people will keep
 * sending money, and that's fine.
 */

type Bubble = { from: "you" | "them"; text: string; time?: string };

// Generic chat styling in brand colours — deliberately not any real app.
const thread: (Bubble | { divider: string })[] = [
  { from: "you", text: "Pls can you help me get a cake for Mummy tomorrow?" },
  { from: "them", text: "Which bakery?" },
  { from: "you", text: "Any good one near her. I'll send the money" },
  { from: "them", text: "Add transport too" },
  { divider: "Next day" },
  { from: "them", text: "They said the red velvet is finished 😩" },
  { from: "you", text: "Did it get there??", time: "6:47 PM" },
];

function CoordinationThread() {
  return (
    <div aria-hidden="true" className="relative mx-auto w-full max-w-[380px] select-none">
      {/* The usual way: a relay of messages */}
      <div className="rounded-2xl border border-[rgba(var(--cream-rgb),0.1)] bg-[rgba(var(--cream-rgb),0.035)] px-4 pb-14 pt-4">
        <div className="mb-4 flex items-center gap-3 border-b border-[rgba(var(--cream-rgb),0.08)] pb-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[rgba(var(--cream-rgb),0.1)] text-[0.75rem] text-[rgba(var(--cream-rgb),0.7)]">
            T
          </span>
          <div className="leading-tight">
            <p className="text-[0.8rem] text-[rgba(var(--cream-rgb),0.8)]">Tobi (cousin)</p>
            <p className="text-[0.62rem] text-[rgba(var(--cream-rgb),0.45)]">typing…</p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          {thread.map((item, i) =>
            "divider" in item ? (
              <p
                key={i}
                className="my-1 self-center text-[0.58rem] uppercase tracking-[0.18em] text-[rgba(var(--cream-rgb),0.4)]"
              >
                {item.divider}
              </p>
            ) : (
              <p
                key={i}
                className={
                  item.from === "you"
                    ? "max-w-[82%] self-end rounded-2xl rounded-br-md bg-[rgba(var(--gold-rgb),0.16)] px-3 py-2 text-[0.8rem] leading-snug text-[rgba(var(--cream-rgb),0.85)]"
                    : "max-w-[82%] self-start rounded-2xl rounded-bl-md bg-[rgba(var(--cream-rgb),0.07)] px-3 py-2 text-[0.8rem] leading-snug text-[rgba(var(--cream-rgb),0.7)]"
                }
              >
                {item.text}
                {item.time && (
                  <span className="ml-2 text-[0.6rem] text-[rgba(var(--cream-rgb),0.45)]">{item.time}</span>
                )}
              </p>
            )
          )}
        </div>
      </div>

      {/* The SendEbun way: laid over the thread's bottom padding, never over a message */}
      <div className="relative -mt-9 ml-8 rounded-xl border border-gold/40 bg-ink-2 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.45)] md:ml-12">
        <p className="text-[0.62rem] uppercase tracking-[0.2em] text-gold">A gift for Mummy</p>
        <div className="mt-4 flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-gold/10">
            <Play className="h-4 w-4 text-gold" strokeWidth={1.5} />
          </span>
          <div>
            <p className="font-serif text-[1.15rem] italic text-cream">Happy birthday, Mummy.</p>
            <p className="text-[0.72rem] text-[rgba(var(--cream-rgb),0.55)]">Video message · then your cake</p>
          </div>
        </div>
        <div className="mt-4 rounded-lg border border-dashed border-gold/35 bg-gold/5 px-4 py-3 text-center text-[0.66rem] uppercase tracking-[0.18em] text-gold-light">
          Scratch to reveal your gift
        </div>
      </div>
    </div>
  );
}

export default function Problem() {
  return (
    <section className="py-[120px] px-6 md:px-[52px]">
      <div className="mx-auto grid max-w-[1080px] grid-cols-1 items-center gap-16 md:grid-cols-[1.1fr_0.9fr] md:gap-16 lg:gap-20">
        <RevealOnScroll>
          <SectionEyebrow text="Why gifts don't happen" />

          <h2
            className="mb-8 font-serif font-light text-cream text-balance"
            style={{ fontSize: "clamp(2.4rem, 5vw, 4.2rem)", lineHeight: 1.12 }}
          >
            You knew what to get her.
            <br />
            <em className="text-gold">Getting it to her was the hard&nbsp;part.</em>
          </h2>

          <div className="max-w-[540px] text-[1rem] leading-[1.85] text-[rgba(var(--cream-rgb),0.72)]">
            <p>
              Dinner at her favourite spot. A cake from the bakery she loves. A spa afternoon she&apos;d never
              book for herself. The idea took a second.
            </p>
            <p className="mt-5">
              Then came the rest. Finding a vendor you can trust. Asking for her address and spoiling the
              surprise. Paying in naira from abroad. Calling your cousin to pick it up — then calling again to
              check it arrived.
            </p>
            <p className="mt-5 text-cream">So the idea stays an idea.</p>
          </div>

          <p className="mt-8 font-serif text-[1.6rem] italic leading-snug text-gold text-balance">
            The thought is yours. The rest is ours.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.15}>
          <CoordinationThread />
        </RevealOnScroll>
      </div>
    </section>
  );
}
