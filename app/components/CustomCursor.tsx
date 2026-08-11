"use client";

import { useEffect, useRef } from "react";
import { useMousePosition } from "../hooks/useMousePosition";
import { useMediaQuery } from "../hooks/useMediaQuery";


export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useMousePosition();
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    if (isMobile) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    dot.style.left = pos.x + "px";
    dot.style.top = pos.y + "px";

    const animate = () => {
      const rect = ring.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = pos.x - cx;
      const dy = pos.y - cy;
      ring.style.transform = `translate(${dx * 0.11}px, ${dy * 0.11}px)`;
      requestAnimationFrame(animate);
    };
    const id = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(id);
  }, [pos, isMobile]);

  useEffect(() => {
    if (isMobile) return;
    const handleEnter = () => {
      const d = dotRef.current;
      const r = ringRef.current;
      if (d) { d.style.width = "12px"; d.style.height = "12px"; }
      if (r) { r.style.width = "52px"; r.style.height = "52px"; r.style.opacity = "0.2"; }
    };
    const handleLeave = () => {
      const d = dotRef.current;
      const r = ringRef.current;
      if (d) { d.style.width = "7px"; d.style.height = "7px"; }
      if (r) { r.style.width = "34px"; r.style.height = "34px"; r.style.opacity = "0.4"; }
    };

    const els = document.querySelectorAll("a, button, [role='button']");
    els.forEach((el) => {
      el.addEventListener("mouseenter", handleEnter);
      el.addEventListener("mouseleave", handleLeave);
    });
    return () => {
      els.forEach((el) => {
        el.removeEventListener("mouseenter", handleEnter);
        el.removeEventListener("mouseleave", handleLeave);
      });
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="fixed pointer-events-none z-[9999] rounded-full -translate-x-1/2 -translate-y-1/2"
        style={{ width: 7, height: 7, background: "var(--gold)", transition: "width 0.3s, height 0.3s" }}
      />
      <div
        ref={ringRef}
        className="fixed pointer-events-none z-[9999] rounded-full -translate-x-1/2 -translate-y-1/2"
        style={{ width: 34, height: 34, border: "1px solid var(--gold)", opacity: 0.4, transition: "width 0.3s, height 0.3s, opacity 0.3s" }}
      />
    </>
  );
}