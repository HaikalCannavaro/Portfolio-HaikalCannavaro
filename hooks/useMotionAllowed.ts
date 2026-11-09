"use client";

import { useSyncExternalStore } from "react";

function subscribe(onChange: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: no-preference)");
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

// Start without motion during SSR; respond immediately to preference changes.
export default function useMotionAllowed() {
  return useSyncExternalStore(subscribe,
    () => window.matchMedia("(prefers-reduced-motion: no-preference)").matches,
    () => false);
}
