"use client";

interface Props {
  text: string;
  centered?: boolean;
}

export default function SectionEyebrow({ text, centered = false }: Props) {
  return (
    <div
      className={`inline-flex items-center gap-3 mb-6 ${centered ? "justify-center w-full" : ""}`}
    >
      <span className="w-[22px] h-px bg-gold-dark" />
      <span className="text-[0.66rem] tracking-[0.26em] uppercase text-gold font-sans">
        {text}
      </span>
    </div>
  );
}