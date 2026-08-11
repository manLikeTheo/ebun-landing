"use client";

const cities = [
  { label: "Delivering in", items: ["Victoria Island", "Lekki", "Ikoyi", "Yaba", "Ikeja"] },
  { label: "Sending from anywhere", items: ["London", "Houston", "Toronto", "Dubai", "New York"] },
];

export default function MarqueeStrip() {
  const content = (
    <div className="flex items-center gap-12 pr-12">
      {cities.map((group, gi) => (
        <div key={gi} className="flex items-center gap-12">
          <span className="text-[0.68rem] tracking-[0.2em] uppercase text-gold-dark whitespace-nowrap">
            {group.label}
          </span>
          {group.items.map((city, ci) => (
            <div key={ci} className="flex items-center gap-12">
              <span className="font-serif text-[0.95rem] text-[rgba(245,239,224,0.28)] whitespace-nowrap">
                {city}
              </span>
              <div className="w-[3px] h-[3px] rounded-full bg-gold-dark opacity-35" />
            </div>
          ))}
        </div>
      ))}
    </div>
  );

  return (
    <div className="py-7 border-t border-b border-[rgba(201,168,76,0.07)] overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {content}
        {content}
      </div>
    </div>
  );
}