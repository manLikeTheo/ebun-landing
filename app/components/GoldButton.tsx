"use client";

import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
}

export default function GoldButton({ children, href, onClick, className }: Props) {
  const base =
    "inline-block bg-gold text-ink px-10 py-4 rounded-sm font-sans text-[0.76rem] font-medium tracking-[0.18em] uppercase transition-all duration-300 hover:bg-gold-light hover:-translate-y-0.5";
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