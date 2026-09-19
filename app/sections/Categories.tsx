"use client";

import RevealOnScroll from "../components/RevealOnScroll";
import SectionEyebrow from "../components/SectionEyebrow";
import { UtensilsCrossed, Sparkles, Ribbon, Zap } from "lucide-react";
import Image from "next/image";

const categories = [
  {
    icon: UtensilsCrossed,
    title: "Food & Drinks",
    body: "Cakes, restaurant meals, work lunches and dining experiences worth showing up for.",
    image: "/categories/food.png",
    alt: "A celebration cake and meal spread",
  },
  {
    icon: Sparkles,
    title: "Experiences",
    body: "Cinema, spa days, photography sessions, classes. Memories, not things.",
    image: "/categories/experienceA.png",
    alt: "A spa treatment room",
  },
  {
    icon: Ribbon,
    title: "Keepsakes",
    body: "Personalised pieces made to outlast the moment they mark.",
    image: "/categories/utility.jpg",
    alt: "A personalised framed keepsake",
  },
  {
    icon: Zap,
    title: "Everyday Essentials",
    body: "Airtime, data, electricity and fuel credit. Practical gifts, given with meaning.",
    image: "/categories/utility.jpg",
    alt: "A phone showing a data top-up",
  },
];

export default function Categories() {
  return (
    <section className="py-[120px] px-6 md:px-[52px]">
      <div className="max-w-[1080px] mx-auto">
        <RevealOnScroll>
          <SectionEyebrow text="The Catalogue" />
          <h2
            className="font-serif font-light text-cream mb-6"
            style={{ fontSize: "clamp(2.4rem, 5vw, 4.2rem)", lineHeight: 1.14 }}
          >
            Gifts worth{" "}
            <em className="text-gold" style={{ fontStyle: "italic" }}>
              giving.
            </em>
          </h2>
          <p className="text-[0.95rem] text-[rgba(245,239,224,0.68)] leading-[1.85] max-w-[560px] mb-14">
            Every category curated with Nigerian vendors and brands people
            genuinely love — from a ₦2,000 gesture to a milestone celebration.
          </p>
        </RevealOnScroll>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[2px] bg-[rgba(201,168,76,0.1)]">
          {categories.map((cat, i) => (
            <RevealOnScroll key={cat.title} delay={i * 0.1}>
              <div className="bg-ink-2 group h-full overflow-hidden transition-colors duration-500 hover:bg-[#191713]">
                {/* Image */}
                <div className="relative h-[190px] w-full overflow-hidden">
                  <Image
                    src={cat.image}
                    alt={cat.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
                  />
                  {/* Warm tint + fade into card */}
                  <div className="absolute inset-0 bg-[rgba(14,13,11,0.35)] mix-blend-multiply" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-2 via-[rgba(14,13,11,0.35)] to-transparent" />

                  {/* Icon badge */}
                  <div className="absolute bottom-4 left-6 w-9 h-9 rounded-full border border-[rgba(201,168,76,0.4)] bg-[rgba(14,13,11,0.7)] backdrop-blur-sm flex items-center justify-center">
                    <cat.icon className="w-4 h-4 text-gold" strokeWidth={1.5} />
                  </div>
                </div>

                {/* Copy */}
                <div className="px-6 pt-5 pb-9">
                  <h3 className="font-serif text-[1.4rem] font-light text-cream mb-2.5 tracking-wide">
                    {cat.title}
                  </h3>
                  <p className="text-[0.82rem] text-[rgba(245,239,224,0.68)] leading-[1.8]">
                    {cat.body}
                  </p>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll delay={0.5}>
          <p className="text-center text-[0.85rem] tracking-[0.16em] uppercase text-[rgba(201,168,76,0.65)] mt-14">
            Onboarding founding vendor partners across Nigeria.
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
}