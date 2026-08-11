"use client";

import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
}

export default function GhostButton({ children, href, onClick, className }: Props) {
  const base =
    "inline-block bg-transparent text-[rgba(245,239,224,0.48)] px-8 py-4 rounded-sm border border-[rgba(201,168,76,0.16)] font-sans text-[0.76rem] tracking-[0.12em] uppercase transition-all duration-300 hover:border-gold-dark hover:text-gold-light";

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