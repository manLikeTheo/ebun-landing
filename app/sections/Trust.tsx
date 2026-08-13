"use client";

import RevealOnScroll from "../components/RevealOnScroll";
import SectionEyebrow from "../components/SectionEyebrow";
import { Lock, Package, RefreshCw } from "lucide-react";

const pillars = [
  {
    icon: Lock,
    title: "Secure payments",
    body: "Payments will be handled through trusted payment infrastructure, with security built into the transaction flow.",
  },
  {
    icon: Package,
    title: "Trusted partners",
    body: "We’re building a curated network of Nigerian gift and experience partners with quality and reliability at the centre.",
  },
  {
    icon: RefreshCw,
    title: "Support when you need it",
    body: "We’re designing Ebun to make cancellations, delivery issues, and redemption problems easier to resolve",
  },
];

export default function Trust() {
  return (
    <section className="py-[120px] px-6 md:px-[52px]">
      <div className="max-w-[1080px] mx-auto">
        <RevealOnScroll>
          <SectionEyebrow text="Built with trust in mind" />
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
                <h3 className="font-serif text-[1.5rem] font-normal tracking-wide text-cream mb-[10px]">{p.title}</h3>
                <p className="text-[0.85rem] text-[rgba(245,239,224,0.58)] leading-[1.8]">{p.body}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}