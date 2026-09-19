"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import GoldButton from "../components/GoldButton";
import GhostButton from "../components/GhostButton";
import { useWaitlistModal } from "../context/WaitlistModalContext";

export default function Hero() {
  const { openModal } = useWaitlistModal();
  
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.playbackRate = 0.2;
    }
  }, []);
  return (
    <section className="relative min-h-screen flex items-center px-6 md:px-[52px] pt-[140px] pb-[100px] overflow-hidden">
      <div
        className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(201,168,76,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative w-full max-w-[1320px] mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-10">
        <div className="flex-1 text-center lg:text-left flex flex-col items-center lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
            className="inline-flex items-center gap-[14px] text-[0.68rem] tracking-[0.26em] uppercase text-gold mb-9"
          >
            Digital Gifting for Nigeria & the Diaspora
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.25 }}
            className="font-serif font-light text-cream leading-[1.04]"
            style={{ fontSize: "clamp(2.8rem, 6.5vw, 6rem)" }}
          >
            Sending a gift should be
          </motion.h1>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.4 }}
            className="font-serif font-light italic text-gold leading-[1.04] mb-11"
            style={{ fontSize: "clamp(2.8rem, 6.5vw, 6rem)" }}
          >
            as easy as sending money.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.55 }}
            className="font-sans font-light text-[rgba(245,239,224,0.86)] max-w-[500px] leading-[1.8] mb-10"
            style={{ fontSize: "clamp(1rem, 1.6vw, 1.15rem)" }}
          >
            Choose something thoughtful, add your voice, and send it straight to their WhatsApp. They unwrap it on their phone  —  wherever they are, wherever you are.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.7 }}
            className="flex items-center gap-[18px] flex-wrap justify-center lg:justify-start mb-6"
          >
            <GoldButton onClick={openModal}>Join Early Access</GoldButton>
            <GhostButton href="#how">See How It Works →</GhostButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.85 }}
            className="text-[0.85rem] font-semibold tracking-[0.3em] uppercase text-gold-dark"
          >
            CHOOSE  ·  PERSONALISE  ·  REVEAL  ·  REDEEM
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.5 }}
          className="flex-1 w-full max-w-[480px] lg:max-w-none"
        >
          <div className="relative aspect-[4/5] lg:aspect-[3/4] w-full rounded-[20px] overflow-hidden border border-[rgba(201,168,76,0.18)] shadow-[0_20px_60px_rgba(0,0,0,0.5)] bg-gradient-to-br from-ink-2 via-ink to-ink-3">
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