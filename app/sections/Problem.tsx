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
            Money moves.
            <br />
            <em
              className="text-gold"
              style={{ fontStyle: "italic" }}
            >
              Meaning doesn&apos;t.
            </em>
          </h2>

          <div className="text-[1rem] tracking-wider text-[rgba(245,239,224,0.68)] leading-[1.85] max-w-[580px]">
            <p>
              A transfer says: here&apos;s some money..
              <br />
              A voucher says: here&apos;s some value.
            </p>

            <p className="mt-5">
              <strong className="text-cream font-normal">
                Neither says: I was thinking about you.
              </strong>
            </p>

            <p className="mt-5">
              Ebun closes that gap.
            </p>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}