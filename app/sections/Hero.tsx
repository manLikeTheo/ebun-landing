"use client";

import { motion } from "framer-motion";
import GoldButton from "../components/GoldButton";
import GhostButton from "../components/GhostButton";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-[140px] pb-[100px] overflow-hidden">
      {/* Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(201,168,76,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Corner accents */}
      <div className="absolute top-[110px] left-[52px] w-14 h-14 border-t border-l border-gold opacity-25 hidden md:block" />
      <div className="absolute top-[110px] right-[52px] w-14 h-14 border-t border-r border-gold opacity-25 hidden md:block" />
      <div className="absolute bottom-20 left-[52px] w-14 h-14 border-b border-l border-gold opacity-25 hidden md:block" />
      <div className="absolute bottom-20 right-[52px] w-14 h-14 border-b border-r border-gold opacity-25 hidden md:block" />

      {/* Tag */}
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
        className="inline-flex items-center gap-[14px] text-[0.68rem] tracking-[0.26em] uppercase text-gold mb-9"
      >
        <span className="w-7 h-px bg-gold-dark" />
        Nigeria&apos;s Gifting Platform
        <span className="w-7 h-px bg-gold-dark" />
      </motion.div>

      {/* Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.25 }}
        className="font-serif font-light text-cream leading-[1.04]"
        style={{ fontSize: "clamp(3.4rem, 8.5vw, 8rem)" }}
      >
        Make someone feel
      </motion.h1>

      <motion.h1
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.4 }}
        className="font-serif font-light italic text-gold leading-[1.04] mb-11"
        style={{ fontSize: "clamp(3.4rem, 8.5vw, 8rem)" }}
      >
        remembered.
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.55 }}
        className="font-sans font-light text-[rgba(245,239,224,0.72)] max-w-[520px] leading-[1.85] mb-14"
        style={{ fontSize: "clamp(1rem, 2vw, 1.15rem)" }}
      >
        Send a real, meaningful gift to anyone in Nigeria — from Lagos or London — in under three minutes. No address. No app download. Just a phone number.
      </motion.p>

      {/* Visual anchor - decorative gift box */}
<motion.div
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 1, delay: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
  className="mt-8 mb-4 relative"
>
  <div className="w-[280px] h-[280px] md:w-[340px] md:h-[340px] rounded-2xl border border-[rgba(201,168,76,0.15)] bg-gradient-to-b from-[rgba(201,168,76,0.08)] to-transparent flex items-center justify-center relative overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(201,168,76,0.12),transparent_60%)]" />
    <div className="text-center z-10">
      <div className="text-5xl mb-3">🎁</div>
      <div className="font-serif text-gold text-lg italic">Tap to reveal</div>
      <div className="text-[0.7rem] text-[rgba(245,239,224,0.4)] tracking-[0.2em] uppercase mt-2">Your gift is waiting</div>
    </div>
    {/* Animated glow ring */}
    <div className="absolute inset-0 rounded-2xl border border-gold/20 animate-pulse" />
  </div>
</motion.div>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.7 }}
        className="flex items-center gap-[18px] flex-wrap justify-center"
      >
        <GoldButton href="#early-access">Send a Gift</GoldButton>
        <GhostButton href="#how">See How It Works →</GhostButton>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94], delay: 1.1 }}
        className="absolute bottom-11 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        {/* <span className="text-[0.62rem] tracking-[0.22em] uppercase text-gold-dark">Discover</span> */}
        <div
          className="w-px h-11 animate-pulse"
          style={{ background: "linear-gradient(to bottom, var(--gold-dk), transparent)" }}
        />
      </motion.div>
    </section>
  );
}