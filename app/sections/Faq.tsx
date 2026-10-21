"use client";

import { Plus } from "lucide-react";
import RevealOnScroll from "../components/RevealOnScroll";
import SectionEyebrow from "../components/SectionEyebrow";

/**
 * The questions people ask before paying. Every answer must be true today —
 * no foreign-card promise until Paystack international payments are on,
 * no scheduling until it's visible in the send flow.
 *
 * Plain <details>, so it works without JavaScript and is keyboard-accessible.
 */
const faqs = [
  {
    q: "How much does it cost?",
    a: "You pay the shop's own price for the gift, plus a small service fee — shown clearly before you pay. No subscriptions, nothing hidden.",
  },
  {
    q: "Do they need an app?",
    a: "No. They open your link in their phone's browser, scratch to reveal, and see your message and the gift. Nothing to download, no account to create.",
  },
  {
    q: "Do I need their address?",
    a: "No. They collect it with a one-time code — or, where delivery is available, add their own address after the reveal, so the surprise isn't spoiled.",
  },
  {
    q: "What if they never claim it?",
    a: "You get your money back. The same goes if a partner can't honour your gift: you're refunded in full.",
  },
  {
    q: "Can I send from abroad?",
    a: "Yes — send from wherever you are. Payment is in naira through Paystack, before anything is prepared.",
  },
  {
    q: "How do I pay?",
    a: "By card, bank transfer or USSD, through Paystack. We never see your card details.",
  },
  {
    q: "Where can gifts be received?",
    a: "We're starting in Akure with local partners and adding cities one at a time. The catalogue only shows gifts that can actually be received.",
  },
  {
    q: "Can my company send gifts to the whole team?",
    a: "Yes. Upload a list, record one message, let each person pick from up to three gifts, and pay only for the ones that are claimed. We're booking December campaigns now.",
  },
];

/** FAQ structured data, so search engines can show these answers directly. */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function Faq() {
  return (
    <section id="faq" className="py-[120px] px-6 md:px-[52px]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mx-auto grid max-w-[1080px] grid-cols-1 gap-12 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
        <RevealOnScroll>
          <SectionEyebrow text="Questions" />
          <h2
            className="font-serif font-light text-cream"
            style={{ fontSize: "clamp(2.4rem, 5vw, 3.6rem)", lineHeight: 1.12 }}
          >
            <span className="block">Good questions.</span>
            <em className="block text-gold">Straight answers.</em>
          </h2>
          <p className="mt-6 max-w-[340px] text-[0.9rem] leading-[1.85] text-[rgba(var(--cream-rgb),0.7)]">
            Something else on your mind?{" "}
            <a href="#business-contact" className="text-gold underline underline-offset-4 hover:text-gold-light">
              Ask us directly
            </a>
            .
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
          <div className="border-t border-gold/15">
            {faqs.map((f) => (
              <details key={f.q} className="group border-b border-gold/15">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left font-serif text-[1.25rem] text-cream transition-colors hover:text-gold-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-light [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <Plus
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0 text-gold transition-transform duration-300 group-open:rotate-45 motion-reduce:transition-none"
                    strokeWidth={1.5}
                  />
                </summary>
                <p className="pb-6 pr-10 text-[0.92rem] leading-[1.85] text-[rgba(var(--cream-rgb),0.72)]">{f.a}</p>
              </details>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
