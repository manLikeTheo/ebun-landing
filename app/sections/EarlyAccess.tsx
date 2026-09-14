"use client";

import RevealOnScroll from "../components/RevealOnScroll";
import SectionEyebrow from "../components/SectionEyebrow";
import GhostButton from "../components/GhostButton";
import GoldButton from "../components/GoldButton";
import { useWaitlistModal } from "../context/WaitlistModalContext";

export default function EarlyAccess() {
  const { openModal, mounted, hasJoined, queueNumber } = useWaitlistModal();

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
            celebrated.
          </em>{" "}
        </h2>
        <p className="text-base text-[rgba(245,239,224,0.58)] mb-12">
          It should take only a few seconds. It should last much longer than that....
          {" "}
          <em className="text-gold" style={{ fontStyle: "italic" }}>
            And we are building a better way to make that happen.
          </em>{" "}
        </p>
        <div className="flex flex-col items-center gap-6">
          <GoldButton onClick={openModal}>
            {mounted && hasJoined ? `View your invite — No. ${queueNumber ?? "—"}` : "Join Early Access"}
          </GoldButton>
          <GhostButton href="#corporate">Corporate Gifting</GhostButton>
        </div>
      </RevealOnScroll>
    </section>
  );
}