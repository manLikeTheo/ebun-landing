"use client";

import RevealOnScroll from "../components/RevealOnScroll";
import SectionEyebrow from "../components/SectionEyebrow";

export default function Diaspora() {
  return (
    <section className="py-[120px] px-6 md:px-[52px]">
      <div className="max-w-[1080px] mx-auto">
        <RevealOnScroll>
          <SectionEyebrow text="Miles Apart" />
          <h2
            className="font-serif font-light text-cream mb-6"
            style={{ fontSize: "clamp(2.4rem, 5vw, 4.2rem)", lineHeight: 1.14 }}
          >
            Still part of the{" "}
            <em className="text-gold" style={{ fontStyle: "italic" }}>
              moment.
            </em>
          </h2>
        </RevealOnScroll>

        <RevealOnScroll delay={0.15}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              { from: "London", to: "Lagos" },
              { from: "Toronto", to: "Abuja" },
              { from: "Houston", to: "Ibadan" },
            ].map((route) => (
              <div
                key={route.from}
                className="bg-ink-2 border border-[rgba(201,168,76,0.07)] p-8 text-center"
              >
                <div className="font-serif text-[1.5rem] text-cream mb-2">
                  {route.from}
                </div>
                <div className="text-gold text-[0.75rem] tracking-[0.2em] uppercase mb-2">→</div>
                <div className="font-serif text-[1.5rem] text-cream">{route.to}</div>
              </div>
            ))}
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.25}>
          <div className="max-w-[640px]">
            <p className="text-[0.95rem] text-[rgba(245,239,224,0.48)] leading-[1.85] mb-4">
              You shouldn&apos;t have to know their address.
            </p>
            <p className="text-[0.95rem] text-[rgba(245,239,224,0.48)] leading-[1.85] mb-4">
              You shouldn&apos;t have to coordinate delivery yourself.
            </p>
            <p className="text-[0.95rem] text-[rgba(245,239,224,0.48)] leading-[1.85] mb-6">
              You shouldn&apos;t have to turn a celebration into a bank transaction.
            </p>
            <p className="text-[1.1rem] text-cream font-serif italic leading-[1.65]">
              You just need to know their number.
            </p>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}