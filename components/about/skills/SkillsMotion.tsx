"use client";

import { lazy, Suspense, type ReactNode } from "react";
import useDesktopMotion from "../../../hooks/useDesktopMotion";

const SkillsOrbit = lazy(() => import("./skills"));

export default function SkillsMotion({ children }: { children: ReactNode }) {
  const animate = useDesktopMotion();

  return (
    <Suspense fallback={children}>
      {animate ? <SkillsOrbit /> : children}
    </Suspense>
  );
}
