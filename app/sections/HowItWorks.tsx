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
          <p className="text-[1rem] text-[rgba(245,239,224,0.8)] leading-[1.85] max-w-[560px] mb-16">
            No address to chase. No app for them to install. Just a thoughtful gift, your voice, and a reveal that makes the distance disappear.
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
            Under two minutes · From anywhere in the world
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
}

// "use client";

// import RevealOnScroll from "../components/RevealOnScroll";
// import SectionEyebrow from "../components/SectionEyebrow";
// import {
//   Gift,
//   Video,
//   Smartphone,
//   PackageCheck,
//   ArrowRight,
//   MessageCircle,
//   Sparkles,
// } from "lucide-react";

// const steps = [
//   {
//     num: "01",
//     icon: Gift,
//     title: "Choose with them in mind",
//     body: "Pick a gift that feels specific: a meal, an experience, something useful, or something made to keep.",
//     detail: "Curated, not generic.",
//   },
//   {
//     num: "02",
//     icon: Video,
//     title: "Make it unmistakably yours",
//     body: "Add a short video, voice note, or message. It is the part they will remember after the gift is gone.",
//     detail: "Your face. Your voice. Your intention.",
//   },
//   {
//     num: "03",
//     icon: Smartphone,
//     title: "Let the surprise unfold",
//     body: "They receive one WhatsApp link, open it on their phone, and discover your message before the gift.",
//     detail: "No app download. No account creation.",
//   },
//   {
//     num: "04",
//     icon: PackageCheck,
//     title: "They choose what happens next",
//     body: "They can arrange delivery, redeem a digital gift, or swap for an equal-value option that suits them better.",
//     detail: "A thoughtful gift, on their terms.",
//   },
// ];

// function RevealPreview() {
//   return (
//     <div className="relative overflow-hidden border border-[rgba(226,192,122,0.2)] bg-[#11100D] p-5 sm:p-7">
//       <div
//         aria-hidden="true"
//         className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(201,168,76,0.16),transparent_68%)]"
//       />

//       <div className="relative flex items-center justify-between border-b border-[rgba(226,192,122,0.14)] pb-4">
//         <div>
//           <p className="text-[0.62rem] uppercase tracking-[0.2em] text-gold">
//             A gift is waiting
//           </p>
//           <p className="mt-1 font-serif text-[1.3rem] text-cream">
//             For Amara, from Tolu
//           </p>
//         </div>
//         <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/30 bg-gold/10">
//           <Gift className="h-4 w-4 text-gold" strokeWidth={1.5} />
//         </div>
//       </div>

//       <div className="relative mt-5 rounded-[18px] border border-[rgba(226,192,122,0.18)] bg-ink p-4 shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
//         <div className="flex items-center gap-3">
//           <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gold/15">
//             <MessageCircle className="h-4 w-4 text-gold-light" strokeWidth={1.5} />
//           </div>
//           <div>
//             <p className="text-[0.7rem] text-cream">You have a message</p>
//             <p className="text-[0.62rem] text-muted">Tap when you are ready</p>
//           </div>
//         </div>

//         <div className="mt-4 overflow-hidden rounded-xl border border-[rgba(226,192,122,0.14)] bg-ink-2">
//           <div className="flex aspect-[16/9] items-center justify-center bg-[radial-gradient(circle_at_50%_25%,rgba(201,168,76,0.18),transparent_42%),linear-gradient(135deg,#211C15,#0E0D0B)]">
//             <div className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 bg-[rgba(14,13,11,0.7)]">
//               <Video className="h-4 w-4 text-gold-champagne" strokeWidth={1.5} />
//             </div>
//           </div>

//           <div className="p-4">
//             <p className="font-serif text-[1.1rem] italic text-gold-champagne">
//               “I wish I could be there.”
//             </p>
//             <p className="mt-1 text-[0.7rem] text-muted">
//               A 0:18 video message from Tolu
//             </p>
//           </div>
//         </div>

//         <div className="mt-4 flex items-center justify-between rounded-xl border border-dashed border-gold/35 bg-gold/5 px-4 py-3">
//           <span className="text-[0.68rem] uppercase tracking-[0.15em] text-gold-light">
//             Scratch to reveal
//           </span>
//           <Sparkles className="h-4 w-4 text-gold" strokeWidth={1.5} />
//         </div>
//       </div>

//       <p className="relative mt-5 text-center text-[0.63rem] uppercase tracking-[0.18em] text-[rgba(226,192,122,0.65)]">
//         A simple gift, choreographed into a moment
//       </p>
//     </div>
//   );
// }

// export default function HowItWorks() {
//   return (
//     <section id="how" className="relative overflow-hidden py-[120px] px-6 md:px-[52px]">
//       <div
//         aria-hidden="true"
//         className="pointer-events-none absolute left-0 top-20 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(201,168,76,0.055),transparent_68%)]"
//       />

//       <div className="relative mx-auto max-w-[1080px]">
//         <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[1fr_0.84fr] lg:gap-20">
//           <RevealOnScroll>
//             <SectionEyebrow text="The Experience" />
//             <h2
//               className="mb-6 font-serif font-light text-cream"
//               style={{ fontSize: "clamp(2.4rem, 5vw, 4.2rem)", lineHeight: 1.12 }}
//             >
//               Four small steps.
//               <br />
//               <em className="text-gold">One feeling: you were there.</em>
//             </h2>
//             <p className="max-w-[540px] text-[0.98rem] leading-[1.9] text-muted-strong">
//               No address to chase. No app for them to install. Just a thoughtful
//               gift, your voice, and a reveal that makes the distance disappear.
//             </p>
//           </RevealOnScroll>

//           <RevealOnScroll delay={0.15}>
//             <RevealPreview />
//           </RevealOnScroll>
//         </div>

//         <div className="relative mt-20 grid grid-cols-1 gap-[2px] bg-[rgba(226,192,122,0.13)] md:grid-cols-2 lg:grid-cols-4">
//           {steps.map((step, index) => {
//             const Icon = step.icon;

//             return (
//               <RevealOnScroll key={step.num} delay={index * 0.08}>
//                 <article className="group relative h-full overflow-hidden bg-ink-2 p-8 transition-colors duration-500 hover:bg-[#1B1813] md:p-9">
//                   <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-dark to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

//                   <div className="mb-10 flex items-start justify-between">
//                     <span className="font-serif text-[2.6rem] font-light leading-none text-[rgba(201,168,76,0.65)] transition-colors duration-500 group-hover:text-gold">
//                       {step.num}
//                     </span>
//                     <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/25 bg-gold/5 transition-colors duration-300 group-hover:bg-gold/10">
//                       <Icon className="h-[20px] w-[20px] text-gold" strokeWidth={1.5} />
//                     </div>
//                   </div>

//                   <h3 className="font-serif text-[1.5rem] font-semibold leading-[1.18] text-cream">
//                     {step.title}
//                   </h3>
//                   <p className="mt-4 text-[0.95rem] leading-[1.8] text-muted-strong">
//                     {step.body}
//                   </p>

//                   <div className="mt-7 flex items-center gap-2 text-[0.66rem] uppercase tracking-[0.12em] text-gold">
//                     <span>{step.detail}</span>
//                     <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
//                   </div>
//                 </article>
//               </RevealOnScroll>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }