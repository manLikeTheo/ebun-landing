"use client";

import RevealOnScroll from "../components/RevealOnScroll";
import SectionEyebrow from "../components/SectionEyebrow";
import GoldButton from "../components/GoldButton";
import { Check } from "lucide-react";
import { vendorWhatsAppUrl } from "@/lib/links";

/**
 * The vendor pitch, in the vendor's terms. Kept to what is true today:
 * their own price, prepaid orders, pickups booked ahead, setup from a
 * phone. No promise about payout timing until payouts are built.
 */
const benefits = [
  "Every order is paid before the customer walks in. No cash-on-delivery, no wasted food.",
  "You keep your own prices. SendEbun never sells your items for more than your counter does.",
  "Customers book their pickup time, so you know who is coming and when — and it's ready on arrival.",
  "Set up from your phone in minutes: your shop, your items, your photos. Scan a code to hand over.",
];

const steps = [
  { num: "01", label: "Message us on WhatsApp" },
  { num: "02", label: "Get your private shop link" },
  { num: "03", label: "Add your items and photos" },
  { num: "04", label: "Start receiving gift orders" },
];

export default function ForVendors() {
  return (
    <section id="vendors" className="border-t border-b border-[rgba(var(--gold-rgb),0.07)]">
      <div className="max-w-[1080px] mx-auto py-[120px] px-6 md:px-[52px] grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        <RevealOnScroll>
          <SectionEyebrow text="For restaurants, bakeries and shops" />
          <h2
            className="font-serif font-light text-cream mb-6"
            style={{ fontSize: "clamp(2.4rem, 5vw, 4.2rem)", lineHeight: 1.14 }}
          >
            New customers, <br />
            <em className="text-gold" style={{ fontStyle: "italic" }}>
              already paid for.
            </em>
          </h2>
          <p className="text-[1rem] text-[rgba(var(--cream-rgb),0.75)] leading-[1.85] mb-10">
            People in Nigeria and abroad send your food and products as gifts. They pay upfront; the person they love
            collects from you.
          </p>
          <ul className="flex flex-col gap-[18px] mb-10">
            {benefits.map((b) => (
              <li key={b} className="flex items-start gap-[14px] text-[0.9rem] text-[rgba(var(--cream-rgb),0.68)] leading-[1.75]">
                <span className="w-[18px] h-[18px] min-w-[18px] border border-gold-dark rounded-full flex items-center justify-center text-[0.6rem] text-gold mt-[2px]">
                  <Check className="w-3 h-3" strokeWidth={2} />
                </span>
                {b}
              </li>
            ))}
          </ul>
          <GoldButton href={vendorWhatsAppUrl()} className="text-center text-lg tracking-wide">
            Become a vendor
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
