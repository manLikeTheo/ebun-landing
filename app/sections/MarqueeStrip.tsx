"use client";

const cities = [
  { label: "Starting in Nigeria", items: ["Lagos", "Abuja", "Ibadan", "Port Harcourt", "More cities to come"] },
  { label: "Designed for diaspora senders", items: ["London", "Houston", "Toronto", "Dubai", "New York"] },
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
              <span className="font-serif text-[0.95rem] text-[rgba(245,239,224,0.55)] whitespace-nowrap">
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
    <div className="py-7 border-t border-b border-[rgba(201,168,76,0.07)] overflow-hidden bg-[rgba(201, 168,76,0.1)] overflow-hidden bg-[rgba(201, 168, 76, 0.02)] backdrop-blur-[24px]">
      <div className="flex animate-marquee whitespace-nowrap">
        {content}
        {content}
      </div>
    </div>
  );
}