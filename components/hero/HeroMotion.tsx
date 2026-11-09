"use client";

import { lazy, Suspense, type ReactNode } from "react";
import useDesktopMotion from "../../hooks/useDesktopMotion";

const HeroScene = lazy(() => import("./HeroScene"));

export default function HeroMotion({ children }: { children: ReactNode }) {
  const animate = useDesktopMotion();

  return (
    <Suspense fallback={children}>
      {animate ? <HeroScene /> : children}
    </Suspense>
  );
}
