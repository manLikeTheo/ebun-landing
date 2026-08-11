"use client";

export default function Divider() {
  return (
    <div className="flex items-center gap-4 px-[52px] opacity-25 my-0">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent to-gold-dark" />
      <div className="w-[5px] h-[5px] bg-gold-dark rotate-45" />
      <div className="flex-1 h-px bg-gradient-to-l from-transparent to-gold-dark" />
    </div>
  );
}