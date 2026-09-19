"use client";

import RevealOnScroll from "../components/RevealOnScroll";
import SectionEyebrow from "../components/SectionEyebrow";
import { Gift, Video, Smartphone, PackageCheck } from "lucide-react";

// const steps = [
//   {
//     num: "01",
//     icon: Gift,
//     title: "Choose",
//     body: "Pick from curated gifts across food, experiences, utility, custom pieces and everyday essentials. Nothing generic.",
//   },
//   {
//     num: "02",
//     icon: Video,
//     title: "Personalise",
//     body: "Add a video, a voice note, or a few words. This is what plays the moment they open it.",
//   },
//   {
//     num: "03",
//     icon: Smartphone,
//     title: "Reveal",
//     body: "They get alerted on WhatsApp. They unwrap it on their phone. Your face. Your voice. Then the gift.",
//   },
//   {
//   num: "04",
//   icon: PackageCheck,
//   title: "They Receive",
//   body: "Delivered, redeemed in-store, or swapped for something they'd rather have. Their choice.",
// },
// ];

const steps = [
  {
    num: "01",
    icon: Gift,
    title: "Choose",
    body: "Pick from curated gifts across food, experiences, keepsakes and everyday essentials. Nothing generic, nothing forgettable.",
  },
  {
    num: "02",
    icon: Video,
    title: "Personalise",
    body: "Record a video, leave a voice note, or write a few words. It plays the moment they unwrap it.",
  },
  {
    num: "03",
    icon: Smartphone,
    title: "Reveal",
    body: "A WhatsApp message arrives. They unwrap it on their phone — and find you waiting on the other side.",
  },
  {
    num: "04",
    icon: PackageCheck,
    title: "Receive",
    body: "Delivered to their door, redeemed in-store, or swapped for something they'd rather have. Their choice.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="py-[120px] px-6 md:px-[52px]">
      <div className="max-w-[1080px] mx-auto">
        <RevealOnScroll>
          <SectionEyebrow text="The Experience" />
          <h2
            className="font-serif font-light text-cream mb-6 tracking-wide"
            style={{ fontSize: "clamp(2.4rem, 5vw, 4.2rem)", lineHeight: 1.14 }}
          >
            Four steps.{" "}
            <em className="text-gold" style={{ fontStyle: "italic" }}>
              One moment they&apos;ll remember.
            </em>
          </h2>
          <p className="text-[0.95rem] text-[rgba(245,239,224,0.68)] leading-[1.85] max-w-[560px] mb-16">
            No address needed from you. No app download needed from them.
            The reveal does the work that words rarely can.
          </p>
        </RevealOnScroll>

        {/* Progress rail — desktop only */}
        <RevealOnScroll>
          <div className="hidden lg:flex items-center gap-0 mb-[2px]">
            {steps.map((_, i) => (
              <div key={i} className="flex-1 flex items-center">
                <div className="w-[7px] h-[7px] rotate-45 bg-gold shrink-0" />
                {i < steps.length - 1 && (
                  <div
                    className="h-[1px] flex-1"
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(201,168,76,0.45), rgba(201,168,76,0.12))",
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[2px] bg-[rgba(201,168,76,0.08)]">
          {steps.map((step, i) => (
            <RevealOnScroll key={step.num} delay={i * 0.1}>
              <div className="bg-ink-2 relative overflow-hidden group h-full transition-colors duration-500 hover:bg-[#191713] px-9 py-14">
                {/* Hover top edge */}
                <div
                  className="absolute top-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-700 ease-out"
                  style={{
                    background:
                      "linear-gradient(90deg, var(--gold), rgba(201,168,76,0))",
                  }}
                />

                {/* Ghost number */}
                <div
                  className="absolute -top-2 right-5 font-serif font-light leading-none select-none pointer-events-none transition-all duration-500 group-hover:text-[rgba(201,168,76,0.12)]"
                  style={{
                    fontSize: "7rem",
                    color: "rgba(201,168,76,0.06)",
                  }}
                >
                  {step.num}
                </div>

                <div className="relative">
                  <div className="flex items-center gap-3 mb-8">
                    <step.icon
                      className="w-[22px] h-[22px] text-gold"
                      strokeWidth={1.5}
                    />
                    <span className="text-[0.62rem] tracking-[0.22em] uppercase text-[rgba(201,168,76,0.65)]">
                      Step {step.num}
                    </span>
                  </div>

                  <h3 className="font-serif text-[1.75rem] font-light text-cream mb-4 tracking-wide">
                    {step.title}
                  </h3>

                  <p className="text-[0.87rem] text-[rgba(245,239,224,0.7)] leading-[1.85]">
                    {step.body}
                  </p>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        {/* Closing line */}
        <RevealOnScroll delay={0.5}>
          <p className="text-center text-[0.8rem] tracking-[0.18em] uppercase text-[rgba(201,168,76,0.55)] mt-14">
            Under three minutes · From anywhere in the world
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
}