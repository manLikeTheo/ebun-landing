"use client";

import RevealOnScroll from "../components/RevealOnScroll";
import SectionEyebrow from "../components/SectionEyebrow";
import GhostButton from "../components/GhostButton";
import GoldButton from "../components/GoldButton";
import { sendUrl } from "@/lib/links";
import { LAUNCH_CTA_LABEL } from "@/lib/launch";
import { useWaitlistModal } from "../context/WaitlistModalContext";
import { useLaunched } from "../hooks/useLaunchClock";

export default function EarlyAccess() {
  const { openModal, mounted, hasJoined, queueNumber } = useWaitlistModal();
  const launched = useLaunched();

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
        <p className="text-base text-[rgba(var(--cream-rgb),0.58)] mb-12">
          It takes minutes to send. It lasts much longer than that.{" "}
          <em className="text-gold" style={{ fontStyle: "italic" }}>
            {launched ? "We\u2019re live. Send the first one." : "Opening soon. Be first to send one."}
          </em>
        </p>
        <div className="flex flex-col items-center gap-6">
          {launched ? (
            <GoldButton href={sendUrl("final_cta")}>{LAUNCH_CTA_LABEL}</GoldButton>
          ) : (
          <GoldButton onClick={openModal}>
            {!mounted
            ? "Join Early Access"
            : hasJoined
              ? queueNumber === null
                ? "Loading your invite…"
                : `View your invite — No. ${queueNumber}`
              : "Join Early Access"}
          </GoldButton>
          )}
          <GhostButton href="#corporate">Corporate · Booking December</GhostButton>
        </div>
      </RevealOnScroll>
    </section>
  );
}