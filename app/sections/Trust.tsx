"use client";

import RevealOnScroll from "../components/RevealOnScroll";
import SectionEyebrow from "../components/SectionEyebrow";
import { Lock, Package, RefreshCw } from "lucide-react";

const pillars = [
  {
    icon: Lock,
    title: "Secure by design",
    body: "Payments handled through established Nigerian payment infrastructure. Nothing held, nothing risked.",
  },
  {
    icon: Package,
    title: "Curated partners",
    body: "Every vendor vetted before a single gift goes out.",
  },
  {
    icon: RefreshCw,
    title: "Support when you need it",
    body: "If something fails, it gets resolved. Automatically where possible, or with a human touch when needed.",
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[2px] bg-[rgba(201,168,76,0.18)]">
          {pillars.map((p, i) => (
            <RevealOnScroll key={p.title} delay={i * 0.1}>
              <div className="bg-ink-2 p-10">
                <p.icon className="w-6 h-6 text-gold mb-4" strokeWidth={1.5} />
                <h3 className="font-serif text-[1.6rem] font-semibold tracking-wide text-cream mb-[12px]">{p.title}</h3>
                <p className="text-[0.9rem] text-[rgba(249,249,249,0.72)] leading-[1.9]">{p.body}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}