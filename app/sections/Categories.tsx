"use client";

import Image from "next/image";
import { Ribbon, Sparkles, UtensilsCrossed, Zap } from "lucide-react";
import RevealOnScroll from "../components/RevealOnScroll";
import SectionEyebrow from "../components/SectionEyebrow";

const categories = [
  {
    icon: UtensilsCrossed,
    number: "01",
    title: "Food & Drinks",
    body: "The birthday cake, the lunch delivered at work, the dinner you wish you could have taken them to yourself.",
    examples: ["Cakes", "Meals", "Restaurant moments"],
    image: "/categories/food.png",
    alt: "A celebratory meal and cake",
  },
  {
    icon: Sparkles,
    number: "02",
    title: "Experiences",
    body: "A spa day, cinema night, photo session or class — gifts that become part of the story they tell later.",
    examples: ["Spa", "Cinema", "Creative sessions"],
    image: "/categories/experienceA.png",
    alt: "A relaxing premium experience",
  },
  {
    icon: Zap,
    number: "03",
    title: "Everyday Essentials",
    body: "Fuel credit, groceries data and more. Practical support can still feel deeply personal.",
    examples: ["Fuel credit", "Data", "Groceries"],
    image: "/categories/utility.jpg",
    alt: "A useful digital gift delivered to a phone",
  },
   // {
  //   icon: Ribbon,
  //   number: "04",
  //   title: "Custom Pieces",
  //   body: "Personalised pieces for the moments that deserve more than a quick message and a transfer.",
  //   examples: ["Photo frames", "Engraved pieces", "Memory boxes"],
  //   image: "/categories/keepsakes.jpg",
  //   alt: "A personalised keepsake gift",
  // },
];

export default function Categories() {
  return (
    <section className="py-[120px] px-6 md:px-[52px]">
      <div className="mx-auto max-w-[1080px]">
        <RevealOnScroll>
          <SectionEyebrow text="The Catalogue" />
          <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <h2
                className="font-serif font-light text-cream"
                style={{ fontSize: "clamp(2.4rem, 5vw, 4.2rem)", lineHeight: 1.12 }}
              >
                Not more stuff.
                <br />
                <em className="text-gold">Better ways to show up.</em>
              </h2>
            </div>

            <p className="max-w-[360px] text-[0.9rem] leading-[1.85] text-muted-strong md:pb-2">
              Ebun begins with the kinds of gifts people already reach for when
              they want someone to feel remembered.
            </p>
          </div>
        </RevealOnScroll>

        <div className="mt-14 grid grid-cols-1 gap-[2px] bg-[rgba(226,192,122,0.14)] sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => {
            const Icon = category.icon;

            return (
              <RevealOnScroll key={category.title} delay={index * 0.08}>
                <article className="group h-full overflow-hidden bg-ink-2 transition-colors duration-500 hover:bg-[#1B1813]">
                  <div className="relative h-[230px] overflow-hidden">
                    <Image
                      src={category.image}
                      alt={category.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-[1.06]"
                    />
                    <div className="absolute inset-0 bg-[rgba(14,13,11,0.28)] mix-blend-multiply" />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-2 via-[rgba(14,13,11,0.22)] to-transparent" />

                    <div className="absolute left-5 top-5 flex items-center gap-2">
                      <span className="text-[0.62rem] tracking-[0.2em] text-gold-champagne">
                        {category.number}
                      </span>
                      <span className="h-px w-7 bg-gold/50" />
                    </div>

                    <div className="absolute bottom-5 left-5 flex h-10 w-10 items-center justify-center rounded-full border border-gold/35 bg-[rgba(14,13,11,0.72)] backdrop-blur-sm">
                      <Icon className="h-[18px] w-[18px] text-gold" strokeWidth={1.5} />
                    </div>
                  </div>

                  <div className="px-6 py-7">
                    <h3 className="font-serif text-[1.6rem] font-semibold tracking-wide text-cream">
                      {category.title}
                    </h3>
                    <p className="mt-3 text-[0.92rem] leading-[1.8] text-muted-strong">
                      {category.body}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {category.examples.map((example) => (
                        <span
                          key={example}
                          className="border border-[rgba(226,192,122,0.2)] px-2.5 py-1 text-[0.6rem] uppercase tracking-[0.1em] text-[rgba(226,192,122,0.90)]"
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
            Starting with a focused collection of founding vendor partners soon
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
}

// "use client";

// import RevealOnScroll from "../components/RevealOnScroll";
// import SectionEyebrow from "../components/SectionEyebrow";
// import { UtensilsCrossed, Sparkles, Ribbon, Zap } from "lucide-react";
// import Image from "next/image";

// const categories = [
//   {
//     icon: UtensilsCrossed,
//     title: "Food & Drinks",
//     body: "Cakes, Work lunch packages, Dining experiences. Thoughtfulness that extends beyond the moment.",
//     image: "/categories/food.png",
//     alt: "A celebration cake and meal spread",
//   },
//   {
//     icon: Sparkles,
//     title: "Experiences",
//     body: "Cinema, spa days, photography sessions, pamper packages... Memories, not things.",
//     image: "/categories/experienceA.png",
//     alt: "A spa treatment room",
//   },
//   {
//     icon: Ribbon,
//     title: "Custom Gifts",
//     body: "Personalised, made to last beyond the moment.",
//     image: "/categories/utility.jpg",
//     alt: "A personalised framed keepsake",
//   },
//   {
//     icon: Zap,
//     title: "Everyday Essentials",
//     body: "Fuel credit, data and more. Practical gifts, given with meaning.",
//     image: "/categories/utility.jpg",
//     alt: "A phone showing a data top-up",
//   },
// ];

// export default function Categories() {
//   return (
//     <section className="py-[120px] px-6 md:px-[52px]">
//       <div className="max-w-[1080px] mx-auto">
//         <RevealOnScroll>
//           <SectionEyebrow text="The Catalogue" />
//           <h2
//             className="font-serif font-light text-cream mb-6"
//             style={{ fontSize: "clamp(2.4rem, 5vw, 4.2rem)", lineHeight: 1.14 }}
//           >
//             Gifts worth{" "}
//             <em className="text-gold" style={{ fontStyle: "italic" }}>
//               giving.
//             </em>
//           </h2>
//           <p className="text-[0.95rem] text-[rgba(245,239,224,0.68)] leading-[1.85] max-w-[560px] mb-14">
//             Every category curated with Nigerian vendors and brands people
//             genuinely love — from a ₦2,000 gesture to a milestone celebration.
//           </p>
//         </RevealOnScroll>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[2px] bg-[rgba(201,168,76,0.1)]">
//           {categories.map((cat, i) => (
//             <RevealOnScroll key={cat.title} delay={i * 0.1}>
//               <div className="bg-ink-2 group h-full overflow-hidden transition-colors duration-500 hover:bg-[#191713]">
//                 {/* Image */}
//                 <div className="relative h-[190px] w-full overflow-hidden">
//                   <Image
//                     src={cat.image}
//                     alt={cat.alt}
//                     fill
//                     sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
//                     className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
//                   />
//                   {/* Warm tint + fade into card */}
//                   <div className="absolute inset-0 bg-[rgba(14,13,11,0.35)] mix-blend-multiply" />
//                   <div className="absolute inset-0 bg-gradient-to-t from-ink-2 via-[rgba(14,13,11,0.35)] to-transparent" />

//                   {/* Icon badge */}
//                   <div className="absolute bottom-4 left-6 w-9 h-9 rounded-full border border-[rgba(201,168,76,0.4)] bg-[rgba(14,13,11,0.7)] backdrop-blur-sm flex items-center justify-center">
//                     <cat.icon className="w-4 h-4 text-gold" strokeWidth={1.5} />
//                   </div>
//                 </div>

//                 {/* Copy */}
//                 <div className="px-6 pt-5 pb-9">
//                   <h3 className="font-serif text-[1.4rem] font-light text-cream mb-2.5 tracking-wide">
//                     {cat.title}
//                   </h3>
//                   <p className="text-[0.82rem] text-[rgba(245,239,224,0.68)] leading-[1.8]">
//                     {cat.body}
//                   </p>
//                 </div>
//               </div>
//             </RevealOnScroll>
//           ))}
//         </div>

//         <RevealOnScroll delay={0.5}>
//           <p className="text-center text-[0.85rem] tracking-[0.16em] uppercase text-[rgba(201,168,76,0.65)] mt-14">
//             Onboarding founding vendor partners across Nigeria.
//           </p>
//         </RevealOnScroll>
//       </div>
//     </section>
//   );
// }