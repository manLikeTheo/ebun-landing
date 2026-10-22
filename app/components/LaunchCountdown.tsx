"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useNow, useLaunched } from "../hooks/useLaunchClock";
import { LAUNCH_AT, launchLabel, timeLeft } from "@/lib/launch";
import { cn } from "@/lib/utils";

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

/**
 * One digit in a fixed-width slot. Only a digit whose value changed gets a
 * new key, so only that digit moves; the others sit still.
 */
function Digit({ char, still }: { char: string; still: boolean }) {
  return (
    <span className="relative inline-block h-[1.08em] w-[0.58em] overflow-hidden text-center align-top">
      {still ? (
        <span className="absolute inset-0">{char}</span>
      ) : (
        <AnimatePresence initial={false}>
          <motion.span
            key={char}
            className="absolute inset-0"
            initial={{ y: "-45%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "45%", opacity: 0 }}
            transition={{ duration: 0.38, ease: EASE }}
          >
            {char}
          </motion.span>
        </AnimatePresence>
      )}
    </span>
  );
}

function Unit({ value, label, still }: { value: string; label: string; still: boolean }) {
  return (
    <div className="flex min-w-0 flex-1 flex-col items-center px-2 sm:px-5">
      <span
        className="font-serif font-light leading-none text-cream [font-variant-numeric:lining-nums_tabular-nums]"
        style={{ fontSize: "clamp(2.3rem, 10.5vw, 4.4rem)" }}
      >
        {value.split("").map((char, i) => (
          <Digit key={i} char={char} still={still} />
        ))}
      </span>
      <span className="mt-2 text-[0.56rem] uppercase tracking-[0.2em] text-gold sm:text-[0.62rem] sm:tracking-[0.26em]">
        {label}
      </span>
    </div>
  );
}

const Rule = () => <span aria-hidden="true" className="w-px self-stretch bg-gradient-to-b from-transparent via-gold/45 to-transparent" />;

const pad = (n: number) => String(n).padStart(2, "0");

export default function LaunchCountdown({ className }: { className?: string }) {
  const now = useNow();
  const launched = useLaunched();
  const reduceMotion = useReducedMotion() ?? false;

  if (launched) {
    return (
      <motion.div
        // Same initial style on server and client (reduced-motion is only
        // known in the browser), so the switch can't cause a hydration
        // mismatch; reduced motion just makes the fade instant.
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: reduceMotion ? 0 : 0.7, ease: EASE }}
        className={cn("w-full", className)}
      >
        <p
          className="font-serif font-light italic text-gold"
          style={{ fontSize: "clamp(2rem, 4.5vw, 3rem)" }}
        >
          We&rsquo;re live.
        </p>
      </motion.div>
    );
  }

  // Launch postponed with no new date: no numbers, no promise of a time.
  if (LAUNCH_AT === null) {
    return (
      <div className={cn("w-full max-w-[520px] border-y border-gold/20 py-5", className)}>
        <p className="text-[0.68rem] uppercase tracking-[0.26em] text-gold">Opening soon</p>
        <p className="mt-2 text-[0.95rem] leading-[1.7] text-[rgba(var(--cream-rgb),0.78)]">
          We&rsquo;re putting the final touches on SendEbun. Join early access and you&rsquo;ll be the first to
          know when it opens.
        </p>
      </div>
    );
  }

  // Before hydration the time is unknown: render the same layout with
  // dashes, so nothing shifts and server/client HTML match.
  const t = now === null ? null : timeLeft(now);
  const units = [
    { label: "Days", value: t ? pad(t.days) : "––" },
    { label: "Hours", value: t ? pad(t.hours) : "––" },
    { label: "Minutes", value: t ? pad(t.minutes) : "––" },
    { label: "Seconds", value: t ? pad(t.seconds) : "––" },
  ];

  return (
    <div className={cn("w-full max-w-[520px]", className)}>
      <p className="mb-4 text-[0.68rem] uppercase tracking-[0.26em] text-[rgba(var(--cream-rgb),0.72)]">
        SendEbun opens in
      </p>

      {/* Screen readers get one calm sentence, not a ticking clock. */}
      {t && <p className="sr-only">{launchLabel(t)}</p>}

      <div
        aria-hidden="true"
        className={cn(
          "flex items-stretch border-y border-gold/20 py-4 transition-opacity duration-500",
          t ? "opacity-100" : "opacity-40"
        )}
      >
        {units.map((unit, i) => (
          <div key={unit.label} className="contents">
            {i > 0 && <Rule />}
            <Unit value={unit.value} label={unit.label} still={reduceMotion || !t} />
          </div>
        ))}
      </div>
    </div>
  );
}
