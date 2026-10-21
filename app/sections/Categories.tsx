"use client";

import Image from "next/image";
import { Cake, Popcorn, Sparkles, UtensilsCrossed, type LucideIcon } from "lucide-react";
import RevealOnScroll from "../components/RevealOnScroll";
import SectionEyebrow from "../components/SectionEyebrow";

/**
 * One card per live category — meals, cakes, spa and cinema — so each
 * name maps to something a sender can actually pick in the app.
 *
 * Location: the page names the launch city once, in the line under these
 * cards, framed as the first of many. Don't repeat it elsewhere.
 *
 * Photos must show what we actually sell. A category without an honest
 * photo yet can leave out `image` and set `ticket` instead: the card then
 * shows the gift ticket the recipient gets.
 */
type Category = {
  icon: LucideIcon;
  number: string;
  title: string;
  body: string;
  examples: string[];
  image?: string;
  alt?: string;
  /** Where to anchor the crop: the photos are portrait, the frame is landscape. */
  focus?: string;
  ticket?: { item: string; forWho: string; code: string };
};

const categories: Category[] = [
  {
    icon: UtensilsCrossed,
    number: "01",
    title: "Meals & Dining",
    body: "Lunch at their desk. Dinner for two at the spot they love. The meal you'd have taken them to, if you could.",
    examples: ["Lunch", "Dinner for two", "Favourite spots"],
    image: "/categories/food.png",
    alt: "Jollof rice and grilled chicken in a takeaway box, with a handwritten note",
    focus: "center 55%",
  },
  {
    icon: Cake,
    number: "02",
    title: "Cakes & Treats",
    body: "The birthday cake, on the day. The congratulations cake when the results come out. Something sweet that turns up exactly when it should.",
    examples: ["Birthdays", "Congrats", "Just because"],
    image: "/categories/cakes.webp",
    alt: "A two-tier cream cake topped with berries on a stand, beside a wrapped gift",
    focus: "center 58%",
  },
  {
    icon: Sparkles,
    number: "03",
    title: "Spa & Pampering",
    body: "A spa afternoon or a mani-pedi. The kind of treat people rarely book for themselves — and remember longest.",
    examples: ["Spa", "Mani-pedi", "Me-time"],
    image: "/categories/pampering.webp",
    alt: "A woman relaxing with her eyes closed while getting a manicure in a warmly lit salon",
    focus: "center 32%",
  },
  {
    icon: Popcorn,
    number: "04",
    title: "Cinema Nights",
    body: "A night at the movies for two, on whichever evening suits them. Easy to send, easy to say yes to.",
    examples: ["For two", "Date night", "Friends"],
    image: "/categories/cinema.webp",
    alt: "Two friends laughing and sharing popcorn in a cinema",
    focus: "center 30%",
  },
];

/** The gift as the recipient receives it: what it is, who it's for, a one-time code. */
function GiftTicket({ icon: Icon, ticket }: { icon: LucideIcon; ticket: NonNullable<Category["ticket"]> }) {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 flex items-center justify-center"
      style={{
        background:
          "radial-gradient(ellipse at 50% 40%, rgba(var(--gold-rgb),0.16), transparent 65%)",
      }}
    >
      <div className="w-[76%] max-w-[280px] rounded-xl border border-gold/35 bg-ink shadow-[0_18px_40px_rgba(0,0,0,0.45)] transition-transform duration-700 ease-out motion-safe:group-hover:-rotate-[1.5deg] motion-safe:group-hover:scale-[1.03]">
        <div className="flex items-start justify-between gap-3 px-5 pb-4 pt-4">
          <div>
            <p className="text-[0.56rem] uppercase tracking-[0.22em] text-gold">A gift for you</p>
            <p className="mt-1.5 font-serif text-[1.35rem] leading-tight text-cream">{ticket.item}</p>
            <p className="mt-1 text-[0.68rem] text-[rgba(var(--cream-rgb),0.55)]">{ticket.forWho}</p>
          </div>
          <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold/35 bg-gold/10">
            <Icon className="h-[15px] w-[15px] text-gold" strokeWidth={1.5} />
          </span>
        </div>

        {/* Perforation */}
        <div className="relative border-t border-dashed border-gold/30">
          <span className="absolute -left-[7px] -top-[7px] h-[14px] w-[14px] rounded-full bg-ink-3" />
          <span className="absolute -right-[7px] -top-[7px] h-[14px] w-[14px] rounded-full bg-ink-3" />
        </div>

        <div className="flex items-center justify-between px-5 py-3">
          <span className="text-[0.56rem] uppercase tracking-[0.2em] text-[rgba(var(--cream-rgb),0.5)]">
            Collect with code
          </span>
          <span className="text-[0.8rem] tracking-[0.2em] text-gold-light [font-variant-numeric:tabular-nums]">
            {ticket.code}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Categories() {
  return (
    <section className="py-[120px] px-6 md:px-[52px]">
      <div className="mx-auto max-w-[1080px]">
        <RevealOnScroll>
          <SectionEyebrow text="What you can send" />
          <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <h2
                className="font-serif font-light text-cream text-balance"
                style={{ fontSize: "clamp(2.4rem, 5vw, 4.2rem)", lineHeight: 1.12 }}
              >
                <span className="block">Not more stuff.</span>
                <em className="block text-gold text-balance">Something they&apos;ll actually enjoy.</em>
              </h2>
            </div>

            <p className="max-w-[360px] text-[0.9rem] leading-[1.85] text-muted-strong md:pb-2">
              Real treats from trusted local spots, at the shop&apos;s own price. Collected with a code, or
              delivered where available.
            </p>
          </div>
        </RevealOnScroll>

        {/* People shop by occasion; this names the moments without new categories. */}
        <RevealOnScroll delay={0.1}>
          <p className="mt-10 text-[0.68rem] uppercase leading-[2] tracking-[0.2em] text-[rgba(var(--gold-lt-rgb),0.85)]">
            For birthdays · weddings · new babies · graduations · results day · thank-yous · just because
          </p>
        </RevealOnScroll>

        <div className="mt-8 grid grid-cols-1 gap-[2px] bg-[rgba(var(--gold-lt-rgb),0.14)] md:grid-cols-2">
          {categories.map((category, index) => {
            const Icon = category.icon;

            return (
              <RevealOnScroll key={category.title} delay={index * 0.08} className="h-full">
                <article className="group h-full overflow-hidden bg-ink-2 transition-colors duration-500 hover:bg-ink-3">
                  <div className="relative h-[240px] overflow-hidden bg-ink-3 sm:h-[280px] lg:h-[300px]">
                    {category.image ? (
                      <>
                        <Image
                          src={category.image}
                          alt={category.alt ?? ""}
                          fill
                          sizes="(max-width: 768px) 100vw, 540px"
                          style={{ objectPosition: category.focus ?? "center" }}
                          className="object-cover transition-transform duration-[1100ms] ease-out motion-safe:group-hover:scale-[1.06]"
                        />
                        <div className="absolute inset-0 bg-[rgba(var(--ink-rgb),0.28)] mix-blend-multiply" />
                      </>
                    ) : category.ticket ? (
                      <GiftTicket icon={category.icon} ticket={category.ticket} />
                    ) : null}
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink-2 to-transparent transition-colors duration-500 group-hover:from-ink-3" />

                    <div className="absolute left-5 top-5 flex items-center gap-2">
                      <span className="text-[0.62rem] tracking-[0.2em] text-gold-champagne">{category.number}</span>
                      <span className="h-px w-7 bg-gold/50" />
                    </div>

                    {category.image && (
                      <div className="absolute bottom-5 left-5 flex h-10 w-10 items-center justify-center rounded-full border border-gold/35 bg-[rgba(var(--ink-rgb),0.72)] backdrop-blur-sm">
                        <Icon className="h-[18px] w-[18px] text-gold" strokeWidth={1.5} />
                      </div>
                    )}
                  </div>

                  <div className="px-7 py-8 md:px-8">
                    <h3 className="font-serif text-[1.6rem] font-semibold tracking-wide text-cream">
                      {category.title}
                    </h3>
                    <p className="mt-3 text-[0.92rem] leading-[1.8] text-muted-strong">{category.body}</p>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {category.examples.map((example) => (
                        <span
                          key={example}
                          className="border border-[rgba(var(--gold-lt-rgb),0.2)] px-2.5 py-1 text-[0.6rem] uppercase tracking-[0.1em] text-[rgba(var(--gold-lt-rgb),0.90)]"
                        >
                          {example}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              </RevealOnScroll>
            );
          })}
        </div>

        <RevealOnScroll delay={0.35}>
          <p className="mt-12 text-center text-[0.7rem] uppercase tracking-[0.16em] text-gold">
            Growing city by city · Starting in Akure
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
}
