"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import RevealOnScroll from "../components/RevealOnScroll";
import SectionEyebrow from "../components/SectionEyebrow";

/**
 * These are scenarios, not testimonials: the pull-lines carry no quotation
 * marks and nobody is credited with saying them. Every feature named here
 * is live. Keep it that way — no real-sounding quotes until real customers
 * have said them (with permission).
 */
const stories = [
  {
    tag: "A birthday",
    number: "01",
    title: "The birthday you nearly missed",
    pullLine: "Remembered late. Still showed up.",
    body: "On his commute, Segun realises it is her birthday. He picks a treat from a spot she loves, records a quick voice note, and sends her the link before his stop. She hears his voice before she sees the gift. He did not just remember — he made the moment count.",
    detail: "For the moments that almost slipped by",
    image: "/scenarios/consumer.png",
    alt: "A woman smiling after receiving a thoughtful surprise on her phone",
  },
  {
    tag: "Across distance",
    number: "02",
    title: "You couldn’t be in Akure. You could still be there.",
    pullLine: "Money would have arrived. This arrived like him.",
    body: "Chidi is in Toronto when his sister lands her first job. He sends her dinner for two at the spot she loves, with a video only she would understand. She scratches it open, picks Saturday, and sends him a photo from the table. The distance didn’t disappear — it just stopped being the whole story.",
    detail: "For people you love from far away",
    image: "/scenarios/diaspora.png",
    alt: "A man in Toronto smiling at his phone while his sister, at home, smiles at hers",
  },
  {
    tag: "At scale",
    number: "03",
    title: "A better December for everyone in HR",
    pullLine: "One message. Every person. Pay only for what’s claimed.",
    body: "The team uploads a staff list and the CEO records one message. Everyone gets their own gift link, picks one of three gifts, and collects it or has it delivered. HR watches a live report of who opened, enjoyed and said thanks — and anything unclaimed is credited back.",
    detail: "For teams that deserve more than a generic voucher",
    image: "/scenarios/corporate_png.png",
    alt: "A warm, modern Nigerian office team celebrating together",
  },
];

export default function Scenarios() {
  return (
    <section id="stories" className="relative overflow-hidden py-[120px] px-6 md:px-[52px]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-160px] top-[30%] h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle,rgba(var(--gold-rgb),0.05),transparent_68%)]"
      />

      <div className="relative mx-auto max-w-[1080px]">
        <RevealOnScroll>
          <SectionEyebrow text="Imagine the moment" />
          <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <h2
                className="font-serif font-light text-cream"
                style={{ fontSize: "clamp(2.4rem, 5vw, 4.2rem)", lineHeight: 1.12 }}
              >
                Different distances.
                <br />
                <em className="text-gold">The same feeling: you showed up.</em>
              </h2>
            </div>

            <p className="max-w-[340px] text-[0.9rem] leading-[1.85] text-muted-strong md:pb-2">
              SendEbun is designed for the part of giving that a bank transfer
              cannot carry.
            </p>
          </div>
        </RevealOnScroll>

        <div className="mt-14 flex flex-col gap-[2px] bg-[rgba(var(--gold-lt-rgb),0.14)]">
          {stories.map((story, index) => {
            const reversed = index % 2 === 1;

            return (
              <RevealOnScroll key={story.title} delay={index * 0.08}>
                <article className="group grid grid-cols-1 overflow-hidden bg-ink-2 transition-colors duration-500 hover:bg-ink-3 md:grid-cols-[minmax(280px,0.8fr)_1.2fr]">
                  <div
                    className={`relative min-h-[290px] overflow-hidden md:min-h-[360px] ${
                      reversed ? "md:order-2" : ""
                    }`}
                  >
                    <Image
                      src={story.image}
                      alt={story.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 42vw"
                      className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.045]"
                    />
                    <div className="absolute inset-0 bg-[rgba(var(--ink-rgb),0.32)] mix-blend-multiply" />
                    <div
                      className={`absolute inset-0 ${
                        reversed
                          ? "bg-gradient-to-t from-ink-2 via-transparent to-transparent md:bg-gradient-to-l"
                          : "bg-gradient-to-t from-ink-2 via-transparent to-transparent md:bg-gradient-to-r"
                      }`}
                    />

                    <div className="absolute left-6 top-6 flex items-center gap-3">
                      <span className="font-serif text-[1.6rem] text-gold-champagne">
                        {story.number}
                      </span>
                      <span className="h-px w-8 bg-gold/60" />
                      <span className="text-[0.62rem] uppercase tracking-[0.18em] text-gold-light">
                        {story.tag}
                      </span>
                    </div>
                  </div>

                  <div
                    className={`flex flex-col justify-center px-8 py-12 md:px-14 md:py-16 ${
                      reversed ? "md:order-1" : ""
                    }`}
                  >
                    <h3 className="max-w-[560px] font-serif text-[1.7rem] font-light leading-[1.18] text-cream md:text-[2rem]">
                      {story.title}
                    </h3>

                    {/* A pull-line, not a quotation: no quote marks, no <blockquote>. */}
                    <p className="mt-7 border-l border-gold/50 pl-5 font-serif text-[1.2rem] italic leading-[1.55] text-gold-champagne md:text-[1.35rem]">
                      {story.pullLine}
                    </p>

                    <p className="mt-7 max-w-[560px] text-[0.87rem] leading-[1.9] text-muted-strong">
                      {story.body}
                    </p>

                    <div className="mt-8 flex items-center gap-2 text-[0.66rem] uppercase tracking-[0.13em] text-gold">
                      <span>{story.detail}</span>
                      <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                    </div>
                  </div>
                </article>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// "use client";

// import RevealOnScroll from "../components/RevealOnScroll";
// import SectionEyebrow from "../components/SectionEyebrow";
// import Image from "next/image";

// const stories = [
//   {
//     tag: "Consumer",
//     who: "The birthday you almost forgot",
//     quote: "It's 10AM. I remembered. I had four minutes to show I care.",
//     body: "Segun picks a thoughful gift from a curated selection in his office, records a fifteen-second voice note, and enters her number. Two minutes later her phone lights up. She hears his voice before she sees the gift. He didn't just remember — he made it a moment.",
//     image: "/scenarios/consumer.png",
//     alt: "A woman smiling at her phone on a Lagos morning",
//   },
//   {
//     tag: "Diaspora",
//     who: "Miles away. Still part of it.",
//     quote: "He graduated. I'm in Ontario. Cash felt lazy.",
//     body: "Chidi pays in dollars. His younger brother in Enugu receives data and airtime within seconds, with a video message attached. The gift says I thought about what you actually need. His brother sends a voice note back — and no bank transfer has ever started that exchange.",
//     image: "/scenarios/diaspora.png",
//     alt: "A man recording a video message on his phone",
//   },
//   {
//     tag: "Corporate",
//     who: "A better December for HR",
//     quote: "Four hundred staff. One upload. No hampers.",
//     body: "She uploads a CSV. The CEO records a thirty-second message. On December 24th, four hundred phones light up at once — every employee seeing the same face, each one feeling personally recognised. Her redemption report lands on the 27th. Finance reconciles in an afternoon.",
//     image: "/scenarios/corporate_png.png",
//     alt: "An office team celebrating around a desk",
//   },
// ];

// export default function Scenarios() {
//   return (
//     <section id="stories" className="py-[120px] px-6 md:px-[52px]">
//       <div className="max-w-[1080px] mx-auto">
//         <RevealOnScroll>
//           <SectionEyebrow text="Imagine the moment" />
//           <h2
//             className="font-serif font-light text-cream mb-6"
//             style={{ fontSize: "clamp(2.4rem, 5vw, 4.2rem)", lineHeight: 1.14 }}
//           >
//             Gifts that{" "}
//             <em className="text-gold" style={{ fontStyle: "italic" }}>
//               arrive
//             </em>
//             <br />
//             — not just gifts that are sent.
//           </h2>
//           <p className="text-[0.95rem] text-[rgba(var(--cream-rgb),0.68)] leading-[1.85] max-w-[560px] mb-14">
//             Three people. Three distances. One thing in common — the moment
//             landed.
//           </p>
//         </RevealOnScroll>

//         <div className="flex flex-col gap-[2px] bg-[rgba(var(--gold-rgb),0.07)]">
//           {stories.map((story, i) => {
//             const flipped = i % 2 === 1;
//             return (
//               <RevealOnScroll key={story.who} delay={i * 0.08}>
//                 <div className="bg-ink-2 group transition-colors duration-500 hover:bg-ink-3 grid grid-cols-1 md:grid-cols-[300px_1fr] lg:grid-cols-[360px_1fr]">
//                   {/* Image */}
//                   <div
//                     className={`relative h-[240px] md:h-auto md:min-h-[320px] overflow-hidden ${
//                       flipped ? "md:order-2" : ""
//                     }`}
//                   >
//                     <Image
//                       src={story.image}
//                       alt={story.alt}
//                       fill
//                       sizes="(max-width: 768px) 100vw, 360px"
//                       className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
//                     />
//                     <div className="absolute inset-0 bg-[rgba(var(--ink-rgb),0.4)] mix-blend-multiply" />
//                     <div
//                       className={`absolute inset-0 ${
//                         flipped
//                           ? "bg-gradient-to-l from-transparent to-[rgba(var(--ink-rgb),0.55)] md:bg-gradient-to-r"
//                           : "bg-gradient-to-r from-transparent to-[rgba(var(--ink-rgb),0.55)]"
//                       }`}
//                     />
//                     {/* Tag overlaid on image */}
//                     <span className="absolute top-6 left-6 inline-block text-[0.6rem] tracking-[0.22em] uppercase text-gold border border-[rgba(var(--gold-rgb),0.35)] bg-[rgba(var(--ink-rgb),0.6)] backdrop-blur-sm px-3 py-[5px]">
//                       {story.tag}
//                     </span>
//                   </div>

//                   {/* Copy */}
//                   <div
//                     className={`px-8 py-12 md:px-14 md:py-14 flex flex-col justify-center ${
//                       flipped ? "md:order-1" : ""
//                     }`}
//                   >
//                     <h3 className="font-serif text-[1.5rem] md:text-[1.7rem] font-light text-cream leading-[1.25] mb-6 tracking-wide">
//                       {story.who}
//                     </h3>

//                     {/* Pull quote */}
//                     <blockquote className="relative pl-5 mb-6 border-l border-[rgba(var(--gold-rgb),0.45)]">
//                       <p className="font-serif italic text-[1.2rem] md:text-[1.35rem] text-gold-light leading-[1.55]">
//                         {story.quote}
//                       </p>
//                     </blockquote>

//                     <p className="text-[0.87rem] text-[rgba(var(--cream-rgb),0.68)] leading-[1.9] max-w-[560px]">
//                       {story.body}
//                     </p>
//                   </div>
//                 </div>
//               </RevealOnScroll>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }