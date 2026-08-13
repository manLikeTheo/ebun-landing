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
  transition={{
    duration: 0.8,
    ease: [0.25, 0.46, 0.45, 0.94],
    delay: 0.1,
  }}
  className="inline-flex items-center gap-[14px] text-[0.68rem] tracking-[0.26em] uppercase text-gold mb-9"
>
  <span className="w-7 h-px bg-gold-dark" />
  Digital Gifting for Nigeria & the Diaspora
  <span className="w-7 h-px bg-gold-dark" />
</motion.div>

{/* Headline */}
<motion.h1
  initial={{ opacity: 0, y: 22 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{
    duration: 0.9,
    ease: [0.25, 0.46, 0.45, 0.94],
    delay: 0.25,
  }}
  className="font-serif font-light text-cream leading-[1.04]"
  style={{ fontSize: "clamp(3.4rem, 8.5vw, 8rem)" }}
>
  Make someone feel
</motion.h1>

<motion.h1
  initial={{ opacity: 0, y: 22 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{
    duration: 0.9,
    ease: [0.25, 0.46, 0.45, 0.94],
    delay: 0.4,
  }}
  className="font-serif font-light italic text-gold leading-[1.04] mb-11"
  style={{ fontSize: "clamp(3.4rem, 8.5vw, 8rem)" }}
>
  remembered.
</motion.h1>

{/* Subtitle */}
<motion.p
  initial={{ opacity: 0, y: 22 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{
    duration: 0.9,
    ease: [0.25, 0.46, 0.45, 0.94],
    delay: 0.55,
  }}
  className="font-sans font-light text-[rgba(245,239,224,0.86)] max-w-[560px] leading-[1.8] mb-14"
  style={{ fontSize: "clamp(1rem, 2vw, 1.15rem)" }}
>
  We&apos;re building a simpler way to send thoughtful gifts from anywhere in
  the world — with less logistics and more of the moment.
</motion.p>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.7 }}
        className="flex items-center gap-[18px] flex-wrap justify-center"
      >
        <GoldButton href="#early-access">Join Early Access</GoldButton>
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