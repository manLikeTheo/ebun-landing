"use client";

import RevealOnScroll from "../components/RevealOnScroll";
import SectionEyebrow from "../components/SectionEyebrow";
import { Gift, Video, Sparkles, PackageCheck } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Split into the sender's part and the recipient's part, because that's
 * the promise of the section above ("the thought is yours, the rest is
 * ours"): the sender does two quick things, then it's out of their hands.
 * Step titles match the hero strip (Choose · Personalise · Reveal · Receive).
 */
const steps = [
  {
    num: "01",
    who: "you",
    icon: Gift,
    title: "Choose",
    body: "Pick a treat from local favourites we partner with — dinner, a cake, a spa afternoon, a cinema night. Real places, at the price they'd pay at the counter.",
  },
  {
    num: "02",
    who: "you",
    icon: Video,
    title: "Personalise",
    body: "Record a video or voice note, or write a few words. Pay in naira by card, transfer or USSD, pick the day it arrives, and send them the link.",
  },
  {
    num: "03",
    who: "them",
    icon: Sparkles,
    title: "Reveal",
    body: "They open your link and scratch the card. They hear you first — then they see what you sent.",
  },
  {
    num: "04",
    who: "them",
    icon: PackageCheck,
    title: "Receive",
    body: "They collect it at the counter with a one-time code, or add their address for doorstep delivery — after the reveal, so the surprise survives.",
  },
] as const;

const groups = [
  { who: "you", label: "Your part", note: "A few minutes, from anywhere" },
  { who: "them", label: "Their part", note: "Whenever they're ready" },
] as const;

export default function HowItWorks() {
  return (
    <section id="how" className="py-[120px] px-6 md:px-[52px]">
      <div className="max-w-[1080px] mx-auto">
        <RevealOnScroll>
          <SectionEyebrow text="How it works" />
          <h2
            className="font-serif font-light text-cream mb-6 tracking-wide text-balance"
            style={{ fontSize: "clamp(2.4rem, 5vw, 4.2rem)", lineHeight: 1.14 }}
          >
            Your part is quick.{" "}
            <em className="text-gold" style={{ fontStyle: "italic" }}>
              Theirs is the good part.
            </em>
          </h2>
          <p className="text-[1rem] text-[rgba(var(--cream-rgb),0.8)] leading-[1.85] max-w-[560px] mb-16">
            No address to ask for. No app for them to install. No one to coordinate. You choose and record — we
            take it from there.
          </p>
        </RevealOnScroll>

        {/* Group rail — desktop only. On smaller screens each card carries its own tag. */}
        <RevealOnScroll>
          <div className="hidden lg:grid grid-cols-2 gap-x-8 mb-3">
            {groups.map((g) => (
              <div key={g.who} className="flex items-center gap-3">
                <span
                  className={cn(
                    "text-[0.62rem] uppercase tracking-[0.24em] shrink-0",
                    g.who === "you" ? "text-gold" : "text-gold-light"
                  )}
                >
                  {g.label}
                </span>
                <span
                  className="h-px flex-1"
                  style={{
                    background:
                      g.who === "you"
                        ? "linear-gradient(90deg, rgba(var(--gold-rgb),0.5), rgba(var(--gold-rgb),0.15))"
                        : "linear-gradient(90deg, rgba(var(--gold-rgb),0.15), rgba(var(--gold-rgb),0.5))",
                  }}
                />
                <span className="text-[0.62rem] uppercase tracking-[0.16em] text-[rgba(var(--cream-rgb),0.5)] shrink-0">
                  {g.note}
                </span>
              </div>
            ))}
          </div>
        </RevealOnScroll>

        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[2px] bg-[rgba(var(--gold-rgb),0.08)]">
          {steps.map((step, i) => (
            <li key={step.num} className="h-full">
              <RevealOnScroll delay={i * 0.1} className="h-full">
                <div
                  className={cn(
                    "relative overflow-hidden group h-full bg-ink-2 transition-colors duration-500 hover:bg-ink-3 px-8 py-12 lg:px-9 lg:py-14"
                  )}
                  // Their half sits a shade warmer — the payoff side. A tint
                  // layered on the solid card, so the grid lines don't show through.
                  style={
                    step.who === "them"
                      ? { backgroundImage: "linear-gradient(rgba(var(--gold-rgb),0.05), rgba(var(--gold-rgb),0.05))" }
                      : undefined
                  }
                >
                  {/* Hover top edge */}
                  <div
                    className="absolute top-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-700 ease-out"
                    style={{ background: "linear-gradient(90deg, var(--gold), rgba(var(--gold-rgb),0))" }}
                  />

                  {/* Ghost number */}
                  <div
                    aria-hidden="true"
                    className="absolute -top-2 right-5 font-serif font-light leading-none select-none pointer-events-none transition-all duration-500 group-hover:text-[rgba(var(--gold-rgb),0.12)]"
                    style={{ fontSize: "7rem", color: "rgba(var(--gold-rgb),0.06)" }}
                  >
                    {step.num}
                  </div>

                  <div className="relative">
                    <div className="flex items-center gap-3 mb-8">
                      <step.icon className="w-[22px] h-[22px] text-gold" strokeWidth={1.5} aria-hidden="true" />
                      <span className="text-[0.62rem] tracking-[0.22em] uppercase text-[rgba(var(--gold-rgb),0.75)]">
                        Step {step.num}
                        <span className="lg:hidden"> · {step.who === "you" ? "You" : "Them"}</span>
                      </span>
                    </div>

                    <h3 className="font-serif text-[1.75rem] font-light text-cream mb-4 tracking-wide">{step.title}</h3>

                    <p className="text-[0.9rem] text-[rgba(var(--cream-rgb),0.72)] leading-[1.85]">{step.body}</p>
                  </div>
                </div>
              </RevealOnScroll>
            </li>
          ))}
        </ol>

        <RevealOnScroll delay={0.5}>
          <p className="text-center text-[0.75rem] tracking-[0.18em] uppercase text-[rgba(var(--gold-rgb),0.7)] mt-14">
            Paid upfront through Paystack · Handed over only with their code
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
}
