"use client";

import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
}

export default function GoldButton({ children, href, onClick, className }: Props) {
  const base = "inline-block bg-gold text-ink px-12 py-5 rounded-lg font-sans text-[0.8rem] font-semibold tracking-[0.16em] uppercase transition-all hover:bg-gold-light hover:-translate-y-1 shadow-[0_4px_32px_rgba(201,168,76,0.25)] hover:shadow-[0_8px_48px_rgba(201,168,76,0.4)]";
  const shadow = "shadow-[0_0_48px_rgba(201,168,76,0.18)] hover:shadow-[0_10px_48px_rgba(201,168,76,0.28)]";

  if (href) {
    return (
      <a href={href} className={cn(base, shadow, className)}>
        {children}
      </a>
    );
  }
  return (
    <button onClick={onClick} className={cn(base, shadow, className)}>
      {children}
    </button>
  );
}