import { APP_OPEN } from "./links";

/**
 * THE launch moment. Everything pre-launch on the page — the countdown,
 * every "Join Early Access" button — flips by itself when the clock in
 * the visitor's browser passes this time.
 *
 * Treat it as a commitment: if launch slips, change this value and
 * redeploy BEFORE it passes, or the page will start sending people to
 * the live send flow on its own.
 *
 * Always include the +01:00 offset (Africa/Lagos). Without it, the
 * time is read in each visitor's own timezone.
 */
/**
 * null = launch postponed, date to be announced: no countdown, nothing
 * flips, every button stays "Join Early Access". Set a date string again
 * (e.g. "2026-11-05T11:59:00+01:00") to bring the countdown back.
 *
 * Postponed 22 Oct 2026 (Railway security incident; API deploys paused).
 */
export const LAUNCH_AT: string | null = null;

export const LAUNCH_AT_MS = LAUNCH_AT ? Date.parse(LAUNCH_AT) : Number.POSITIVE_INFINITY;

/** What every early-access button says once SendEbun is live. */
export const LAUNCH_CTA_LABEL = "Send your first gift";

/**
 * Launched if the env flag says so (lets you open early, and removes the
 * brief pre-launch flash on first paint once set on Vercel after launch)
 * or the clock has passed LAUNCH_AT.
 */
export function isLaunched(nowMs: number): boolean {
  return APP_OPEN || nowMs >= LAUNCH_AT_MS;
}

export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

/** Always computed from the absolute target, so it never drifts. */
export function timeLeft(nowMs: number): TimeLeft {
  const total = Math.max(0, Math.floor((LAUNCH_AT_MS - nowMs) / 1000));
  return {
    days: Math.floor(total / 86_400),
    hours: Math.floor((total % 86_400) / 3_600),
    minutes: Math.floor((total % 3_600) / 60),
    seconds: total % 60,
  };
}

/**
 * One calm sentence for screen readers. Deliberately coarse (days, then
 * hours, then minutes) so the text changes rarely instead of every second.
 */
export function launchLabel(t: TimeLeft): string {
  const plural = (n: number, unit: string) => `${n} ${unit}${n === 1 ? "" : "s"}`;
  if (t.days > 0) {
    return t.hours > 0
      ? `SendEbun launches in ${plural(t.days, "day")} and ${plural(t.hours, "hour")}`
      : `SendEbun launches in ${plural(t.days, "day")}`;
  }
  if (t.hours > 0) return `SendEbun launches in ${plural(t.hours, "hour")}`;
  if (t.minutes > 0) return `SendEbun launches in ${plural(t.minutes, "minute")}`;
  return "SendEbun launches in under a minute";
}
