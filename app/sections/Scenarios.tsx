"use client";

import RevealOnScroll from "../components/RevealOnScroll";
import SectionEyebrow from "../components/SectionEyebrow";
import Image from "next/image";

const stories = [
  {
    tag: "Consumer",
    who: "The birthday you almost forgot",
    quote: "It's 10AM. I remembered. I had four minutes to show I care.",
    body: "Segun picks a thoughful gift from a curated selection in his office, records a fifteen-second voice note, and enters her number. Two minutes later her phone lights up. She hears his voice before she sees the gift. He didn't just remember — he made it a moment.",
    image: "/scenarios/consumer.png",
    alt: "A woman smiling at her phone on a Lagos morning",
  },
  {
    tag: "Diaspora",
    who: "Miles away. Still part of it.",
    quote: "He graduated. I'm in Ontario. Cash felt lazy.",
    body: "Chidi pays in dollars. His younger brother in Enugu receives data and airtime within seconds, with a video message attached. The gift says I thought about what you actually need. His brother sends a voice note back — and no bank transfer has ever started that exchange.",
    image: "/scenarios/diaspora.png",
    alt: "A man recording a video message on his phone",
  },
  {
    tag: "Corporate",
    who: "A better December for HR",
    quote: "Four hundred staff. One upload. No hampers.",
    body: "She uploads a CSV. The CEO records a thirty-second message. On December 24th, four hundred phones light up at once — every employee seeing the same face, each one feeling personally recognised. Her redemption report lands on the 27th. Finance reconciles in an afternoon.",
    image: "/scenarios/corporate_png.png",
    alt: "An office team celebrating around a desk",
  },
];

export default function Scenarios() {
  return (
    <section id="stories" className="py-[120px] px-6 md:px-[52px]">
      <div className="max-w-[1080px] mx-auto">
        <RevealOnScroll>
          <SectionEyebrow text="Imagine the moment" />
          <h2
            className="font-serif font-light text-cream mb-6"
            style={{ fontSize: "clamp(2.4rem, 5vw, 4.2rem)", lineHeight: 1.14 }}
          >
            Gifts that{" "}
            <em className="text-gold" style={{ fontStyle: "italic" }}>
              arrive
            </em>
            <br />
            — not just gifts that are sent.
          </h2>
          <p className="text-[0.95rem] text-[rgba(245,239,224,0.68)] leading-[1.85] max-w-[560px] mb-14">
            Three people. Three distances. One thing in common — the moment
            landed.
          </p>
        </RevealOnScroll>

        <div className="flex flex-col gap-[2px] bg-[rgba(201,168,76,0.07)]">
          {stories.map((story, i) => {
            const flipped = i % 2 === 1;
            return (
              <RevealOnScroll key={story.who} delay={i * 0.08}>
                <div className="bg-ink-2 group transition-colors duration-500 hover:bg-[#191713] grid grid-cols-1 md:grid-cols-[300px_1fr] lg:grid-cols-[360px_1fr]">
                  {/* Image */}
                  <div
                    className={`relative h-[240px] md:h-auto md:min-h-[320px] overflow-hidden ${
                      flipped ? "md:order-2" : ""
                    }`}
                  >
                    <Image
                      src={story.image}
                      alt={story.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 360px"
                      className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-[rgba(14,13,11,0.4)] mix-blend-multiply" />
                    <div
                      className={`absolute inset-0 ${
                        flipped
                          ? "bg-gradient-to-l from-transparent to-[rgba(14,13,11,0.55)] md:bg-gradient-to-r"
                          : "bg-gradient-to-r from-transparent to-[rgba(14,13,11,0.55)]"
                      }`}
                    />
                    {/* Tag overlaid on image */}
                    <span className="absolute top-6 left-6 inline-block text-[0.6rem] tracking-[0.22em] uppercase text-gold border border-[rgba(201,168,76,0.35)] bg-[rgba(14,13,11,0.6)] backdrop-blur-sm px-3 py-[5px]">
                      {story.tag}
                    </span>
                  </div>

                  {/* Copy */}
                  <div
                    className={`px-8 py-12 md:px-14 md:py-14 flex flex-col justify-center ${
                      flipped ? "md:order-1" : ""
                    }`}
                  >
                    <h3 className="font-serif text-[1.5rem] md:text-[1.7rem] font-light text-cream leading-[1.25] mb-6 tracking-wide">
                      {story.who}
                    </h3>

                    {/* Pull quote */}
                    <blockquote className="relative pl-5 mb-6 border-l border-[rgba(201,168,76,0.45)]">
                      <p className="font-serif italic text-[1.2rem] md:text-[1.35rem] text-gold-light leading-[1.55]">
                        {story.quote}
                      </p>
                    </blockquote>

                    <p className="text-[0.87rem] text-[rgba(245,239,224,0.68)] leading-[1.9] max-w-[560px]">
                      {story.body}
                    </p>
                  </div>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}