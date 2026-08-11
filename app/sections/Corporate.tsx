"use client";

import RevealOnScroll from "../components/RevealOnScroll";
import SectionEyebrow from "../components/SectionEyebrow";
import GoldButton from "../components/GoldButton";
import { Check } from "lucide-react";

const stats = [
  { num: "3", unit: "min", label: "Average time to send any gift" },
  { num: "0", unit: "", label: "Addresses needed from sender" },
  { num: "₦0", unit: "", label: "Setup fee for corporate clients" },
  { num: "100", unit: "%", label: "Trackable redemptions" },
];

const benefits = [
  "No hamper coordination, no undelivered gifts, no December stress.",
  "Every recipient gets a personalised reveal — not a generic voucher code.",
  "Full redemption report within 24 hours for finance and HR.",
  "From 30 recipients to 5,000 — the same seamless process.",
];

export default function Corporate() {
  return (
    <section id="corporate" className="bg-ink-2 border-t border-b border-[rgba(201,168,76,0.07)]">
      <div className="max-w-[1080px] mx-auto py-[120px] px-6 md:px-[52px] grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        <RevealOnScroll>
          <SectionEyebrow text="For Companies" />
          <h2
            className="font-serif font-light text-cream mb-6"
            style={{ fontSize: "clamp(2.4rem, 5vw, 4.2rem)", lineHeight: 1.14 }}
          >
            Gift your team.
            <br />
            <em className="text-gold" style={{ fontStyle: "italic" }}>
              Without the chaos.
            </em>
          </h2>
          <p className="text-[0.95rem] text-[rgba(245,239,224,0.48)] leading-[1.85] mb-10">
            One CSV upload. One payment. Every employee receives a personalised WhatsApp reveal — with your CEO&apos;s video — and you receive a full redemption report.
          </p>
          <ul className="flex flex-col gap-[18px] mb-10">
            {benefits.map((b) => (
              <li key={b} className="flex items-start gap-[14px] text-[0.9rem] text-[rgba(245,239,224,0.48)] leading-[1.75]">
                <span className="w-[18px] h-[18px] min-w-[18px] border border-gold-dark rounded-full flex items-center justify-center text-[0.6rem] text-gold mt-[2px]">
                  <Check className="w-3 h-3" strokeWidth={2} />
                </span>
                {b}
              </li>
            ))}
          </ul>
          <GoldButton href="#early-access">Get a Corporate Quote</GoldButton>
        </RevealOnScroll>

        <RevealOnScroll delay={0.2}>
          <div className="grid grid-cols-2 gap-[2px] bg-[rgba(201,168,76,0.07)]">
            {stats.map((s) => (
              <div key={s.label} className="bg-ink p-8">
                <div className="font-serif text-[2.8rem] font-light text-gold leading-none mb-2">
                  {s.num}
                  {s.unit && <span className="text-[1.3rem]">{s.unit}</span>}
                </div>
                <div className="text-[0.78rem] text-[rgba(245,239,224,0.48)]">{s.label}</div>
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}