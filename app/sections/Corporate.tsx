"use client";

import RevealOnScroll from "../components/RevealOnScroll";
import SectionEyebrow from "../components/SectionEyebrow";
import GoldButton from "../components/GoldButton";
import { Check } from "lucide-react";
import { companyStartUrl, corporateEnquiryUrl } from "@/lib/links";

/**
 * Every line here is true of company campaigns as built today — no
 * invented averages or percentages. Keep it that way until there are
 * real numbers to show.
 */
const facts = [
  { num: "3", label: "Gift choices per person, so each gift lands" },
  { num: "1", label: "Message, recorded once, seen by everyone" },
  { num: "₦0", label: "For gifts nobody claims — credited back" },
  { num: "Live", label: "Report of who opened, enjoyed and said thanks" },
];

const benefits = [
  "Upload your list, record one message, pay once. No hampers, no couriers, no December chaos.",
  "Each person picks from up to three gifts you choose — collected locally, or delivered where available.",
  "You only pay for gifts that are claimed. Unclaimed value is credited back.",
  "A live report for HR and finance: who opened, who enjoyed it, who said thanks.",
  "Not just December: thank speakers, guests and clients after an event the same way.",
];

export default function Corporate() {
  return (
    <section id="corporate" className="bg-ink-2 border-t border-b border-[rgba(var(--gold-rgb),0.07)]">
      <div className="max-w-[1080px] mx-auto py-[120px] px-6 md:px-[52px] grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        <RevealOnScroll>
          <div className="mb-5">
            {/* Bookings, not "coming soon": campaigns are built, and December budgets are set now. */}
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/50 bg-gold/10 px-3 py-1 text-[0.62rem] uppercase tracking-[0.2em] text-gold-light">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden="true" />
              Now booking for December
            </span>
          </div>
          <SectionEyebrow text="For companies" />
          <h2
            className="font-serif font-light text-cream mb-6"
            style={{ fontSize: "clamp(2.4rem, 5vw, 4.2rem)", lineHeight: 1.14 }}
          >
            Thank your people. Skip the logistics. <br />
            <em className="text-gold" style={{ fontStyle: "italic" }}>
              In time for December.
            </em>
          </h2>
          <p className="text-[1rem] text-[rgba(var(--cream-rgb),0.75)] leading-[1.85] mb-10">
            One campaign, one payment. Every person gets a gift they chose, with a message from you — and you see
            exactly how it landed.
          </p>
          <ul className="flex flex-col gap-[18px] mb-10">
            {benefits.map((b) => (
              <li key={b} className="flex items-start gap-[14px] text-[0.9rem] text-[rgba(var(--cream-rgb),0.68)] leading-[1.75]">
                <span className="w-[18px] h-[18px] min-w-[18px] border border-gold-dark rounded-full flex items-center justify-center text-[0.6rem] text-gold mt-[2px]">
                  <Check className="w-3 h-3" strokeWidth={2} />
                </span>
                {b}
              </li>
            ))}
          </ul>
          <GoldButton href={companyStartUrl("corporate")} className="text-center text-lg tracking-wide">
            Start your company&rsquo;s gifts
          </GoldButton>
          <p className="mt-4 text-[0.78rem] text-[rgba(var(--cream-rgb),0.55)]">
            Takes about 10 minutes with your list to hand. Prefer to talk first?{" "}
            <a href={corporateEnquiryUrl()} className="underline underline-offset-4 hover:text-gold-light">
              Email us
            </a>{" "}
            and we&rsquo;ll set it up with you.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.2}>
          <div className="grid grid-cols-2 gap-[2px] bg-[rgba(var(--gold-rgb),0.07)]">
            {facts.map((f) => (
              <div key={f.label} className="bg-ink p-8">
                <div className="font-serif text-[2.8rem] font-light text-gold leading-none mb-2 [font-variant-numeric:lining-nums]">{f.num}</div>
                <div className="text-[0.78rem] text-[rgba(var(--cream-rgb),0.68)]">{f.label}</div>
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
