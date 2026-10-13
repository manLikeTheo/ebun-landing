"use client";

import RevealOnScroll from "../components/RevealOnScroll";
import SectionEyebrow from "../components/SectionEyebrow";
import { Lock, Package, RefreshCw } from "lucide-react";

const pillars = [
  {
    icon: Lock,
    title: "Secure by design",
    body: "Payments processed by Paystack — we never see your card. Partners are paid for gifts actually handed over.",
  },
  {
    icon: Package,
    title: "Curated partners",
    body: "Every partner is visited and approved before a single gift goes out.",
  },
  {
    icon: RefreshCw,
    title: "Support when you need it",
    body: "If a gift can't be honoured, you get your money back in full. A real person answers when you need help.",
  },
];

export default function Trust() {
  return (
    <section className="py-[120px] px-6 md:px-[52px]">
      <div className="max-w-[1080px] mx-auto">
        <RevealOnScroll>
          <SectionEyebrow text="HOW WE'RE BUILDING IT" />
          <h2
            className="font-serif font-light text-cream mb-14"
            style={{ fontSize: "clamp(2.4rem, 5vw, 4.2rem)", lineHeight: 1.14 }}
          >
            Every gift,{" "}
            <em className="text-gold" style={{ fontStyle: "italic" }}>
              protected.
            </em>
          </h2>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[2px] bg-[rgba(var(--gold-rgb),0.18)]">
          {pillars.map((p, i) => (
            <RevealOnScroll key={p.title} delay={i * 0.1}>
              <div className="bg-ink-2 p-10">
                <p.icon className="w-6 h-6 text-gold mb-4" strokeWidth={1.5} />
                <h3 className="font-serif text-[1.6rem] font-semibold tracking-wide text-cream mb-[12px]">{p.title}</h3>
                <p className="text-[0.9rem] text-[rgba(var(--cream-rgb),0.72)] leading-[1.9]">{p.body}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}