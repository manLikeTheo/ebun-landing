"use client";

import RevealOnScroll from "../components/RevealOnScroll";
import SectionEyebrow from "../components/SectionEyebrow";
import { Lock, Package, RefreshCw } from "lucide-react";

const pillars = [
  {
    icon: Lock,
    title: "Secure payments",
    body: "Every transaction is processed via Paystack — Nigeria's most trusted payment infrastructure. Local and international cards accepted.",
  },
  {
    icon: Package,
    title: "Vendor-verified fulfilment",
    body: "Every vendor partner is personally vetted before they fulfil a single Ebun order. Quality is a standard, not a hope.",
  },
  {
    icon: RefreshCw,
    title: "Automatic recovery",
    body: "If anything goes wrong — failed delivery, vendor issue, broken link — Ebun automatically resolves it. No chasing required.",
  },
];

export default function Trust() {
  return (
    <section className="py-[120px] px-6 md:px-[52px]">
      <div className="max-w-[1080px] mx-auto">
        <RevealOnScroll>
          <SectionEyebrow text="Built for Trust" />
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[2px] bg-[rgba(201,168,76,0.07)]">
          {pillars.map((p, i) => (
            <RevealOnScroll key={p.title} delay={i * 0.1}>
              <div className="bg-ink-2 p-10">
                <p.icon className="w-6 h-6 text-gold mb-4" strokeWidth={1.5} />
                <h3 className="font-serif text-[1.2rem] font-normal text-cream mb-[10px]">{p.title}</h3>
                <p className="text-[0.85rem] text-[rgba(245,239,224,0.48)] leading-[1.8]">{p.body}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}