"use client";

import RevealOnScroll from "../components/RevealOnScroll";
import SectionEyebrow from "../components/SectionEyebrow";
import { UtensilsCrossed, Sparkles, Ribbon, Zap } from "lucide-react";

const categories = [
  {
    icon: UtensilsCrossed,
    title: "Food & Drinks",
    body: "Birthday cakes, breakfast hampers, restaurant vouchers, cocktail kits, meal deliveries from Lagos's best.",
  },
  {
    icon: Sparkles,
    title: "Experiences",
    body: "Cinema tickets, spa vouchers, photography sessions, cooking classes — memories, not things.",
  },
  {
    icon: Ribbon,
    title: "Keepsakes",
    body: "Custom photo frames, engraved pieces, personalised candles, memory boxes that last.",
  },
  {
    icon: Zap,
    title: "Utility Gifts",
    body: "Airtime, data bundles, electricity units, fuel credit. Practical love — delivered with the same emotional weight.",
  },
];

export default function Categories() {
  return (
    <section className="py-[120px] px-6 md:px-[52px]">
      <div className="max-w-[1080px] mx-auto">
        <RevealOnScroll>
          <SectionEyebrow text="The Catalogue" />
          <h2
            className="font-serif font-light text-cream mb-14"
            style={{ fontSize: "clamp(2.4rem, 5vw, 4.2rem)", lineHeight: 1.14 }}
          >
            Something meaningful for{" "}
            <em className="text-gold" style={{ fontStyle: "italic" }}>
              every
            </em>{" "}
            occasion.
          </h2>
        </RevealOnScroll>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-[2px] bg-[rgba(201,168,76,0.07)]">
          {categories.map((cat, i) => (
            <RevealOnScroll key={cat.title} delay={i * 0.1}>
              <div className="bg-ink-2 p-10 text-center transition-colors duration-300 hover:bg-[#1A1814]">
                <cat.icon className="w-8 h-8 text-gold mx-auto mb-4" strokeWidth={1.5} />
                <h3 className="font-serif text-[1.2rem] font-normal text-cream mb-[10px]">{cat.title}</h3>
                <p className="text-[0.8rem] text-[rgba(245,239,224,0.48)] leading-[1.7]">{cat.body}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}