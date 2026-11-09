"use client";

import { useSyncExternalStore } from "react";

const query = "(min-width: 769px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";
let media: MediaQueryList | undefined;

function getMedia() {
  return media ??= window.matchMedia(query);
}

function subscribe(onChange: () => void) {
  const media = getMedia();
  if (typeof media.addEventListener === "function") {
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }

  media.addListener(onChange);
  return () => media.removeListener(onChange);
}

export default function useDesktopMotion() {
  return useSyncExternalStore(subscribe, () => getMedia().matches, () => false);
}
