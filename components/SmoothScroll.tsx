"use client";

import { useEffect } from "react";
import type Lenis from "lenis";
import useDesktopMotion from "../hooks/useDesktopMotion";

export default function SmoothScroll({ enabled, children }: { enabled: boolean; children: React.ReactNode }) {
  const animate = useDesktopMotion();

  useEffect(() => {
    if (!enabled || !animate) return;

    let disposed = false;
    let lenis: Lenis | undefined;

    import("lenis").then(({ default: Lenis }) => {
      if (!disposed) {
        lenis = new Lenis({ lerp: 0.1, duration: 1.5, smoothWheel: true, autoRaf: true });
      }
    });

    return () => {
      disposed = true;
      lenis?.destroy();
    };
  }, [enabled, animate]);

  return <>{children}</>;
}
