"use client";

import RevealOnScroll from "../components/RevealOnScroll";
import SectionEyebrow from "../components/SectionEyebrow";
import { Gift, Video, Smartphone } from "lucide-react";

const steps = [
  {
    num: "01",
    icon: Gift,
    title: "Choose the occasion and gift",
    body: "When Ebun launches, senders will be able to choose from curated gifts across birthdays, weddings, anniversaries, new babies, and more. All curated. Nothing generic.",
  },
  {
    num: "02",
    icon: Video,
    title: "Add your message",
    body: "Add a short video, voice note, or written message to make the gift personal. This is what they will see the moment the gift is revealed — your face, your voice, your intention.",
  },
  {
    num: "03",
    icon: Smartphone,
    title: "Reveal",
    body: "The recipient will receive a WhatsApp link, open the digital gift, and discover your message as the gift is revealed.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="py-[120px] px-6 md:px-[52px]">
      <div className="max-w-[1080px] mx-auto">
        <RevealOnScroll>
          <SectionEyebrow text="The Experience" />
          <h2
            className="font-serif font-light text-cream mb-6"
            style={{ fontSize: "clamp(2.4rem, 5vw, 4.2rem)", lineHeight: 1.14 }}
          >
            From &ldquo;I&apos;m thinking of you&rdquo; to{" "}
            <em className="text-gold" style={{ fontStyle: "italic" }}>
              &ldquo;Look what I got.&rdquo;
            </em>
          </h2>
          <p className="text-[0.95rem] text-[rgba(245,239,224,0.48)] leading-[1.85] max-w-[580px] mb-16">
            No address required from you. No app download required from them. The reveal does the work that words rarely can.
          </p>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[2px] bg-[rgba(201,168,76,0.07)]">
          {steps.map((step, i) => (
            <RevealOnScroll key={step.num} delay={i * 0.1}>
              <div className="bg-ink-2 p-[52px_40px] relative overflow-hidden group transition-colors duration-400 hover:bg-[#1A1814]">
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                  style={{
                    background: "linear-gradient(90deg, transparent, var(--gold-dk), transparent)",
                  }}
                />
                <div className="font-serif text-[4rem] font-light text-[rgba(201,168,76,0.4)] leading-none mb-7">
                  {step.num}
                </div>
                <step.icon className="w-6 h-6 text-gold mb-[18px]" strokeWidth={1.5} />
                <h3 className="font-serif text-[1.45rem] font-normal text-cream mb-3">{step.title}</h3>
                <p className="text-[0.87rem] text-[rgba(245,239,224,0.55)] leading-[1.82]">{step.body}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}