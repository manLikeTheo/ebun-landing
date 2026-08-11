"use client";

import RevealOnScroll from "../components/RevealOnScroll";
import SectionEyebrow from "../components/SectionEyebrow";

export default function Problem() {
  return (
    <section className="py-[120px] px-6 md:px-[52px]">
      <div className="max-w-[1080px] mx-auto">
        <RevealOnScroll>
          <SectionEyebrow text="The Gap" />
          <h2
            className="font-serif font-light text-cream mb-6"
            style={{ fontSize: "clamp(2.4rem, 5vw, 4.2rem)", lineHeight: 1.14 }}
          >
            Money gets there.<br />
            <em className="text-gold not-italic" style={{ fontStyle: "italic" }}>
              The feeling doesn&apos;t always.
            </em>
          </h2>
          <p className="text-[0.95rem] text-[rgba(245,239,224,0.48)] leading-[1.85] max-w-[580px]">
            A transfer can say &ldquo;Happy birthday.&rdquo; A voucher can say &ldquo;Enjoy.&rdquo; But sometimes, you want them to{" "}
            <strong className="text-cream font-normal">see you. Hear you. Feel remembered.</strong>
            <br />
            <br />
            That&apos;s the space Ebun is being built for.
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
}