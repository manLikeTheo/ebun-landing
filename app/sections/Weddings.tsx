"use client";

import { ArrowUpRight, Video } from "lucide-react";
import RevealOnScroll from "../components/RevealOnScroll";
import SectionEyebrow from "../components/SectionEyebrow";
import GoldButton from "../components/GoldButton";
import { useWaitlistModal } from "../context/WaitlistModalContext";
import { useLaunched } from "../hooks/useLaunchClock";
import { sendUrl, weddingInterestUrl } from "@/lib/links";
import { LAUNCH_CTA_LABEL } from "@/lib/launch";

/**
 * Weddings as an occasion for gifts that are live today — not a registry
 * or a "digital spray". Pooling or holding guests' money is a different,
 * regulated product, and spraying is cash: the fight SendEbun isn't picking.
 * Registry demand is collected through WhatsApp with the date attached.
 */
function NewlywedsTicket() {
  return (
    <div aria-hidden="true" className="relative mx-auto w-full max-w-[380px]">
      <div className="rounded-xl border border-gold/40 bg-ink shadow-[0_20px_50px_rgba(0,0,0,0.45)]">
        <div className="px-6 pb-5 pt-6">
          <p className="text-[0.6rem] uppercase tracking-[0.22em] text-gold">A gift for the newlyweds</p>
          <p className="mt-2 font-serif text-[1.7rem] leading-tight text-cream">Dinner for two</p>
          <p className="mt-1 text-[0.75rem] text-[rgba(var(--cream-rgb),0.55)]">From Ada, in Houston</p>

          <div className="mt-5 flex items-center gap-3 rounded-lg border border-gold/20 bg-[rgba(var(--gold-rgb),0.06)] px-4 py-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-gold/10">
              <Video className="h-4 w-4 text-gold" strokeWidth={1.5} />
            </span>
            <div>
              <p className="font-serif text-[1.05rem] italic text-cream">Congratulations, you two.</p>
              <p className="text-[0.68rem] text-[rgba(var(--cream-rgb),0.5)]">Video toast · plays first</p>
            </div>
          </div>
        </div>

        <div className="relative border-t border-dashed border-gold/30">
          <span className="absolute -left-[7px] -top-[7px] h-[14px] w-[14px] rounded-full bg-ink-2" />
          <span className="absolute -right-[7px] -top-[7px] h-[14px] w-[14px] rounded-full bg-ink-2" />
        </div>

        <div className="flex items-center justify-between px-6 py-4">
          <span className="text-[0.58rem] uppercase tracking-[0.2em] text-[rgba(var(--cream-rgb),0.5)]">
            Whenever they&apos;re back
          </span>
          <span className="text-[0.8rem] tracking-[0.2em] text-gold-light [font-variant-numeric:tabular-nums]">
            9WD · 3HN
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Weddings() {
  const launched = useLaunched();
  const { openModal } = useWaitlistModal();

  return (
    <section id="weddings" className="bg-ink-2 border-t border-[rgba(var(--gold-rgb),0.07)]">
      <div className="mx-auto grid max-w-[1080px] grid-cols-1 items-center gap-16 px-6 py-[120px] md:grid-cols-[1.1fr_0.9fr] md:px-[52px] lg:gap-20">
        <RevealOnScroll>
          <SectionEyebrow text="Weddings & big days" />
          <h2
            className="mb-6 font-serif font-light text-cream"
            style={{ fontSize: "clamp(2.4rem, 5vw, 4.2rem)", lineHeight: 1.12 }}
          >
            <span className="block">Can&apos;t make the wedding?</span>
            <em className="block text-gold text-balance">Give them a night to remember anyway.</em>
          </h2>
          <p className="mb-10 max-w-[520px] text-[1rem] leading-[1.85] text-[rgba(var(--cream-rgb),0.75)]">
            Send the newlyweds their first dinner as a married couple, a spa day to recover, or a cinema night — with
            a video toast from you. For guests abroad, and the friends who couldn&apos;t get the day off.
          </p>

          {launched ? (
            <GoldButton href={sendUrl("weddings")}>{LAUNCH_CTA_LABEL}</GoldButton>
          ) : (
            <GoldButton onClick={openModal}>Join Early Access</GoldButton>
          )}

          <a
            href={weddingInterestUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 flex max-w-[520px] items-start gap-2 text-[0.85rem] leading-[1.7] text-[rgba(var(--cream-rgb),0.7)] transition-colors hover:text-gold-light"
          >
            <span>
              <span className="text-cream">Planning your own wedding?</span> We&apos;re exploring gift registries —
              tell us your date on WhatsApp.
            </span>
            <ArrowUpRight className="mt-1 h-3.5 w-3.5 shrink-0 text-gold" strokeWidth={1.5} />
          </a>
        </RevealOnScroll>

        <RevealOnScroll delay={0.15}>
          <NewlywedsTicket />
        </RevealOnScroll>
      </div>
    </section>
  );
}
