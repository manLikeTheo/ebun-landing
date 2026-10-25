"use client";

import RevealOnScroll from "../components/RevealOnScroll";
import SectionEyebrow from "../components/SectionEyebrow";
import GoldButton from "../components/GoldButton";
import { Check } from "lucide-react";
import { usePartnerModal } from "../context/PartnerModalContext";

/**
 * The partner pitch. Written for any business people would love to be
 * given — food, pampering, experiences, celebrations — not just
 * restaurants. Everything listed here is true of the product today.
 */
const benefits = [
  {
    title: "Customers you can't reach today",
    body: "People buying for someone else — across Nigeria, from abroad, and companies thanking their teams.",
  },
  {
    title: "Paid before they arrive",
    body: "Every gift is prepaid. You see it on your phone, marked paid, before you start preparing.",
  },
  {
    title: "Your prices, your brand",
    body: "Never sold above your counter price. Recipients meet your business — not a voucher code.",
  },
  {
    title: "Runs from your phone",
    body: "Bookings ahead of time, scan to hand over, and every payment to you listed with its reference.",
  },
];

const steps = [
  { num: "01", label: "Say hello on WhatsApp" },
  { num: "02", label: "Get your private partner link" },
  { num: "03", label: "Add what you offer, with photos" },
  { num: "04", label: "Get paid for every gift you hand over" },
];

export default function ForVendors() {
  const { openPartnerModal } = usePartnerModal();
  return (
    <section id="vendors" className="border-t border-b border-[rgba(var(--gold-rgb),0.07)]">
      <div className="max-w-[1080px] mx-auto py-[120px] px-6 md:px-[52px] grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        <RevealOnScroll>
          <SectionEyebrow text="For businesses people love to receive" />
          <h2
            className="font-serif font-light text-cream mb-6"
            style={{ fontSize: "clamp(2.4rem, 5vw, 4.2rem)", lineHeight: 1.14 }}
          >
            Be the gift <br />
            <em className="text-gold" style={{ fontStyle: "italic" }}>
              people send.
            </em>
          </h2>
          <p className="text-[1rem] text-[rgba(var(--cream-rgb),0.75)] leading-[1.85] mb-4">
            Every day, someone wants to treat a person they love — a birthday cake, a spa afternoon, dinner for two —
            but can&rsquo;t be there. SendEbun turns what you already offer into a gift they can send from anywhere,
            paid in full upfront.
          </p>
          <p className="text-[0.85rem] tracking-[0.04em] text-gold mb-10">
            Restaurants · Bakeries · Spas & salons · Experiences · Florists · Hotels & resorts
          </p>
          <ul className="flex flex-col gap-[18px] mb-10">
            {benefits.map((b) => (
              <li key={b.title} className="flex items-start gap-[14px] leading-[1.7]">
                <span className="w-[18px] h-[18px] min-w-[18px] border border-gold-dark rounded-full flex items-center justify-center text-[0.6rem] text-gold mt-[4px]">
                  <Check className="w-3 h-3" strokeWidth={2} />
                </span>
                <span>
                  <span className="block text-[0.95rem] text-cream">{b.title}</span>
                  <span className="block text-[0.88rem] text-[rgba(var(--cream-rgb),0.68)]">{b.body}</span>
                </span>
              </li>
            ))}
          </ul>
          <GoldButton onClick={openPartnerModal} className="text-center text-lg tracking-wide">
            Become a partner
          </GoldButton>
        </RevealOnScroll>

        <RevealOnScroll delay={0.2}>
          <ol className="grid grid-cols-1 gap-[2px] bg-[rgba(var(--gold-rgb),0.07)]">
            {steps.map((s) => (
              <li key={s.num} className="bg-ink p-8 flex items-baseline gap-6">
                <span className="font-serif text-[2.2rem] font-light text-gold leading-none">{s.num}</span>
                <span className="text-[0.95rem] text-[rgba(var(--cream-rgb),0.8)]">{s.label}</span>
              </li>
            ))}
          </ol>
        </RevealOnScroll>
      </div>
    </section>
  );
}
