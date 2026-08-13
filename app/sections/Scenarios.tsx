"use client";

import RevealOnScroll from "../components/RevealOnScroll";
import SectionEyebrow from "../components/SectionEyebrow";

const stories = [
  {
    tag: "Consumer",
    who: "The birthday you almost forgot",
    quote: "It’s 10am. You remember. Instead of sending another transfer, you choose something she'll actually enjoy, add your voice, and send it in minutes.",
    body: "Segun opens Ebun during his commute. Picks a Chicken Republic voucher. Records a 15-second voice note. Enters her number. Pays. Two minutes later, her phone lights up. She scratches. She hears his voice before she sees the gift. She posts it on her story. He didn't just remember — he made it a moment.",
  },
  {
    tag: "Diaspora",
    who: "Miles away. Still part of the celebration.",
    quote: "Your brother just graduated in Enugu. You're in Scotland. You want to send something that feels like a gift—not just cash.",
    body: `Chidi pays in pounds from Scotland. His younger brother in Enugu receives 5GB data and a ₦2,000 airtime top-up instantly. The gift says "I thought about what you actually need right now." His brother sends a voice note back. That exchange — back and forth, real and specific — is what no bank transfer ever creates.`,
  },
  {
    tag: "Corporate",
    who: "A better december for HR",
    quote: "One campaign. Personalised messages. Digital and physical gifts. Less coordination, fewer logistics headaches.",
    body: "She uploads a CSV. The CEO records a 30-second holiday message. On December 24th, every employee's phone lights up. They scratch their screen. They see the CEO's face. They feel remembered. She receives a full redemption report on the 27th. Finance is happy. HR is happy. Every employee felt it.",
  },
];

export default function Scenarios() {
  return (
    <section id="stories" className="py-[120px] px-6 md:px-[52px]">
      <div className="max-w-[1080px] mx-auto">
        <RevealOnScroll>
          <SectionEyebrow text="Imagine the moment." />
          <h2
            className="font-serif font-light text-cream mb-14"
            style={{ fontSize: "clamp(2.4rem, 5vw, 4.2rem)", lineHeight: 1.14 }}
          >
            Gifts that{" "}
            <em className="text-gold" style={{ fontStyle: "italic" }}>
              arrive,
            </em>
            <br />
            not just gifts that are sent.
          </h2>
        </RevealOnScroll>

        <div className="flex flex-col gap-[2px] bg-[rgba(201,168,76,0.07)]">
          {stories.map((story) => (
            <RevealOnScroll key={story.who}>
              <div className="bg-ink-2 p-12 md:p-[48px_52px] grid grid-cols-1 md:grid-cols-[220px_1fr] gap-12 items-start transition-colors duration-300 hover:bg-[#181613]">
                <div>
                  <span className="inline-block text-[0.63rem] tracking-[0.2em] uppercase text-gold border border-[rgba(201,168,76,0.16)] px-3 py-[5px] rounded-sm mb-4">
                    {story.tag}
                  </span>
                  <h3 className="font-serif text-[1.5rem] font-normal text-cream leading-[1.2]">
                    {story.who}
                  </h3>
                </div>
                <div>
                  <p className="font-serif text-[1.1rem] italic text-gold-light leading-[1.65] mb-[14px]">
                    {story.quote}
                  </p>
                  <p className="text-[0.87rem] text-[rgba(245,239,224,0.48)] leading-[1.82]">
                    {story.body}
                  </p>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}