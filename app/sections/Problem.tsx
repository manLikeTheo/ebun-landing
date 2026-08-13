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
            style={{
              fontSize: "clamp(2.4rem, 5vw, 4.2rem)",
              lineHeight: 1.14,
            }}
          >
            Money gets there.
            <br />
            <em
              className="text-gold"
              style={{ fontStyle: "italic" }}
            >
              The feeling doesn&apos;t always.
            </em>
          </h2>

          <div className="text-[0.95rem] text-[rgba(245,239,224,0.48)] leading-[1.85] max-w-[580px]">
            <p>
              A bank transfer can move money.
              <br />
              A voucher can move value.
            </p>

            <p className="mt-5">
              <strong className="text-cream font-normal">
                Neither carries the moment.
              </strong>
            </p>

            <p className="mt-5">
              That&apos;s the space Ebun is being built to close.
            </p>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}