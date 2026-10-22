"use client";

import { useSyncExternalStore } from "react";
import { APP_OPEN } from "@/lib/links";
import { LAUNCH_AT_MS, isLaunched } from "@/lib/launch";

/**
 * One shared clock for the whole page, instead of a setInterval per
 * component. It ticks on each wall-clock second, stops while the tab is
 * hidden, and stops for good once launch has passed.
 *
 * useSyncExternalStore gives us a server snapshot (null = "time unknown"),
 * so the server and the first client render match exactly — no hydration
 * warnings — and real time only appears after hydration.
 */

let nowMs = 0;
let timer: ReturnType<typeof setTimeout> | undefined;
const listeners = new Set<() => void>();

function clear() {
  if (timer !== undefined) clearTimeout(timer);
  timer = undefined;
}

function schedule() {
  clear();
  // No date set (postponed) or already launched: nothing to tick for.
  if (document.hidden || !Number.isFinite(LAUNCH_AT_MS) || nowMs >= LAUNCH_AT_MS) return;
  // Align to the next second boundary so digits change on the real second.
  timer = setTimeout(tick, 1000 - (Date.now() % 1000) + 10);
}

function tick() {
  nowMs = Date.now();
  listeners.forEach((listener) => listener());
  schedule();
}

function onVisibilityChange() {
  if (document.hidden) clear();
  else tick(); // catch up immediately, e.g. if launch passed while hidden
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  if (listeners.size === 1) {
    nowMs = Date.now();
    document.addEventListener("visibilitychange", onVisibilityChange);
    schedule();
  }
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) {
      clear();
      document.removeEventListener("visibilitychange", onVisibilityChange);
    }
  };
}

function getNow() {
  if (nowMs === 0) nowMs = Date.now();
  return nowMs;
}

/** Current time in ms (second resolution), or null during SSR/hydration. */
export function useNow(): number | null {
  return useSyncExternalStore(subscribe, getNow, () => null);
}

/**
 * The single "are we live?" switch. Use this everywhere a button or line
 * changes at launch — never compare dates in components.
 */
export function useLaunched(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => isLaunched(getNow()),
    () => APP_OPEN
  );
}
