"use client";

import { Clock, CreditCard, MapPinOff, Gift } from "lucide-react";
import RevealOnScroll from "../components/RevealOnScroll";
import SectionEyebrow from "../components/SectionEyebrow";

/**
 * Built around what is actually different when you gift from abroad:
 * time zones, paying from outside Nigeria, and not having anyone on the
 * ground. No city names — this section speaks to the sender.
 *
 * Only claims that are true today:
 * - Scheduled sending is built but hidden in the send flow, so this section
 *   sells "the link waits for them", not "pick the day it arrives". Once
 *   scheduling is visible, point 1 can say so.
 * - International cards depend on Paystack's international payments being
 *   switched on. When they are, point 2 can say "Use your card from abroad".
 */
const points = [
  {
    icon: Clock,
    title: "Send on your time",
    body: "Send it before bed or on your lunch break. The link waits — they open it whenever they're ready.",
  },
  {
    icon: CreditCard,
    title: "Pay in naira, upfront",
    body: "Paid securely through Paystack before anything is prepared. Nothing to settle on the ground.",
  },
  {
    icon: MapPinOff,
    title: "No address, no middleman",
    body: "They collect it with a one-time code — or, where available, add their address after the reveal. Nobody back home has to run around for you.",
  },
];

function TimeZones() {
  return (
    <div
      aria-hidden="true"
      className="grid grid-cols-[auto_1fr_auto] items-center gap-3 border-y border-gold/15 py-8 sm:gap-8"
    >
      <div className="text-left">
        <p className="text-[0.58rem] uppercase tracking-[0.22em] text-[rgba(var(--cream-rgb),0.5)]">You · Toronto</p>
        <p
          className="mt-2 font-serif font-light leading-none text-[rgba(var(--cream-rgb),0.55)] [font-variant-numeric:lining-nums_tabular-nums]"
          style={{ fontSize: "clamp(2rem, 7vw, 3.6rem)" }}
        >
          11:40<span className="ml-1 text-[0.4em] tracking-[0.1em]">PM</span>
        </p>
        <p className="mt-2 text-[0.75rem] text-[rgba(var(--cream-rgb),0.5)]">Sending before bed</p>
      </div>

      {/* The link waiting overnight, from your evening to their morning */}
      <div className="flex items-center justify-center gap-3">
        <span className="hidden h-px flex-1 border-t border-dashed border-gold/30 sm:block" />
        <div className="flex flex-col items-center gap-2">
          <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/45 bg-gold/10">
            <Gift className="h-[18px] w-[18px] text-gold" strokeWidth={1.5} />
          </span>
          <span className="text-[0.55rem] uppercase tracking-[0.2em] text-gold">The link waits</span>
        </div>
        <span className="hidden h-px flex-1 bg-gradient-to-r from-gold/30 to-gold/70 sm:block" />
      </div>

      <div className="text-right">
        <p className="text-[0.58rem] uppercase tracking-[0.22em] text-gold">Them · Nigeria · next morning</p>
        <p
          className="mt-2 font-serif font-light leading-none text-cream [font-variant-numeric:lining-nums_tabular-nums]"
          style={{ fontSize: "clamp(2rem, 7vw, 3.6rem)" }}
        >
          7:00<span className="ml-1 text-[0.4em] tracking-[0.1em]">AM</span>
        </p>
        <p className="mt-2 text-[0.75rem] text-gold-light">Opening it at breakfast</p>
      </div>
    </div>
  );
}

export default function Diaspora() {
  return (
    <section className="py-[120px] px-6 md:px-[52px]">
      <div className="max-w-[1080px] mx-auto">
        <RevealOnScroll>
          <SectionEyebrow text="From abroad" />
          <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_auto] md:items-end">
            <h2
              className="font-serif font-light text-cream"
              style={{ fontSize: "clamp(2.4rem, 5vw, 4.2rem)", lineHeight: 1.12 }}
            >
              <span className="block">Different time zone.</span>
              <em className="block text-gold">Same birthday.</em>
            </h2>
            <p className="max-w-[380px] text-[0.95rem] leading-[1.85] text-[rgba(var(--cream-rgb),0.75)] md:pb-2">
              For Nigerians abroad who want to celebrate family at home — without flying in, staying up late,
              or asking anyone to run errands.
            </p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.15}>
          <div className="mt-14">
            <TimeZones />
          </div>
        </RevealOnScroll>

        <div className="mt-12 grid grid-cols-1 gap-[2px] bg-[rgba(var(--gold-rgb),0.08)] md:grid-cols-3">
          {points.map((p, i) => (
            <RevealOnScroll key={p.title} delay={0.2 + i * 0.08} className="h-full">
              <div className="h-full bg-ink-2 p-8">
                <p.icon className="mb-5 h-[22px] w-[22px] text-gold" strokeWidth={1.5} aria-hidden="true" />
                <h3 className="font-serif text-[1.4rem] leading-tight text-cream">{p.title}</h3>
                <p className="mt-3 text-[0.9rem] leading-[1.8] text-[rgba(var(--cream-rgb),0.7)]">{p.body}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
