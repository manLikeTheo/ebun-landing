"use client";

import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
}

export default function GhostButton({ children, href, onClick, className }: Props) {
  const base = "inline-block bg-transparent text-cream/70 px-10 py-5 rounded-lg border border-gold/30 font-sans text-[0.8rem] tracking-[0.14em] uppercase transition-all hover:border-gold hover:text-gold-light hover:bg-gold/5";

  if (href) {
    return (
      <a href={href} className={cn(base, className)}>
        {children}
      </a>
    );
  }
  return (
    <button onClick={onClick} className={cn(base, className)}>
      {children}
    </button>
  );
}