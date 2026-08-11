"use client";

import RevealOnScroll from "../components/RevealOnScroll";
import SectionEyebrow from "../components/SectionEyebrow";
import GoldButton from "../components/GoldButton";
import GhostButton from "../components/GhostButton";

export default function EarlyAccess() {
  return (
    <section id="early-access" className="py-[140px] px-6 text-center">
      <RevealOnScroll>
        <div className="flex justify-center mb-6">
          <SectionEyebrow text="Begin" centered />
        </div>
        <h2
          className="font-serif font-light text-cream mx-auto mb-7 max-w-[700px]"
          style={{ fontSize: "clamp(3rem, 6vw, 5.2rem)", lineHeight: 1.14 }}
        >
          Someone deserves to feel
          <br />
          <em className="text-gold" style={{ fontStyle: "italic" }}>
            celebrated
          </em>{" "}
          today.
        </h2>
        <p className="text-base text-[rgba(245,239,224,0.48)] mb-12">
          It takes three minutes. It lasts much longer than that.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <GoldButton href="#">Join Early Access</GoldButton>
          <GhostButton href="#corporate">Corporate Gifting</GhostButton>
        </div>
      </RevealOnScroll>
    </section>
  );
}