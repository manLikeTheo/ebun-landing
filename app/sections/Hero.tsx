"use client";
import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import GoldButton from "../components/GoldButton";
import GhostButton from "../components/GhostButton";
import LaunchCountdown from "../components/LaunchCountdown";
import { useWaitlistModal } from "../context/WaitlistModalContext";
import { useLaunched } from "../hooks/useLaunchClock";
import { sendUrl } from "@/lib/links";
import { LAUNCH_CTA_LABEL } from "@/lib/launch";

export default function Hero() {
  const { openModal } = useWaitlistModal();
  const launched = useLaunched();
  const reduceMotion = useReducedMotion();

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.playbackRate = 0.2;
    // Reduced motion: hold on the poster frame instead of looping video.
    if (reduceMotion) video.pause();
    else video.play().catch(() => {});
  }, [reduceMotion]);
  return (
    <section className="relative min-h-screen flex items-center px-6 md:px-[52px] pt-[140px] pb-[100px] overflow-hidden">
      <div
        className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(var(--sendebun-surfaceRaised-rgb),0.35) 0%, transparent 70%)",
        }}
      />

      <div className="relative w-full max-w-[1320px] mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-10">
        <div className="flex-1 text-center lg:text-left flex flex-col items-center lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
            className="inline-flex items-center gap-[14px] text-[0.68rem] tracking-[0.26em] uppercase text-gold mb-9 text-balance"
          >
            Real gifts · Your voice · Starting in Akure
          </motion.div>

          {/* One h1 (it used to be two), each line still animated on its own. */}
          <h1 className="font-serif font-light leading-[1.04] mb-8" style={{ fontSize: "clamp(2.8rem, 6.5vw, 6rem)" }}>
            <motion.span
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.25 }}
              className="block text-cream text-balance"
            >
              Send the gift.
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.4 }}
              className="block italic text-gold text-balance"
              style={{ fontSize: "clamp(2.8rem, 6.5vw, 5rem)" }}
            >
              Send yourself with it.
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.55 }}
            className="font-sans font-light text-[rgba(var(--cream-rgb),0.86)] max-w-[500px] leading-[1.8] mb-9"
            style={{ fontSize: "clamp(1rem, 1.6vw, 1.15rem)" }}
          >
            A meal, a cake, a pamper session — with a video or voice note from you. They scratch to reveal it, then collect it or have it delivered. Even if you&rsquo;re paying from abroad.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.62 }}
            className="w-full flex justify-center lg:justify-start mb-9"
          >
            <LaunchCountdown />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.7 }}
            className="flex items-center gap-[18px] flex-wrap justify-center lg:justify-start mb-6"
          >
            {launched ? (
              <GoldButton href={sendUrl("hero")}>{LAUNCH_CTA_LABEL}</GoldButton>
            ) : (
              <GoldButton onClick={openModal}>Join Early Access</GoldButton>
            )}
            <GhostButton href="#how">See How It Works →</GhostButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.85 }}
            className="text-[0.85rem] font-semibold tracking-[0.3em] uppercase text-gold"
          >
            CHOOSE  ·  PERSONALISE  ·  REVEAL  ·  RECEIVE
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.5 }}
          className="flex-1 w-full max-w-[480px] lg:max-w-none"
        >
          <div className="relative aspect-[4/5] lg:aspect-[3/4] w-full rounded-[20px] overflow-hidden border border-[rgba(var(--gold-rgb),0.18)] shadow-[0_20px_60px_rgba(0,0,0,0.5)] bg-gradient-to-br from-ink-2 via-ink to-ink-3">
        <video 
          ref={videoRef} 
          autoPlay 
          loop 
          muted 
          playsInline 
          poster="/hero-gift-poster.jpg" className="w-full h-full object-cover">
          <source src="/hero-gift.mp4" type="video/mp4" />
        </video>
      </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94], delay: 1.1 }}
        className="absolute bottom-11 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div
          className="w-px h-11 animate-pulse"
          style={{ background: "linear-gradient(to bottom, var(--gold-dk), transparent)" }}
        />
      </motion.div>
    </section>
  );
}