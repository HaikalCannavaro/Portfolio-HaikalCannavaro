"use client";

import { useEffect, useRef, type ReactNode } from "react";
import useMotionAllowed from "../../hooks/useMotionAllowed";

/** Progressive enhancement: content stays visible without JS or an observer. */
export default function Reveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const motionAllowed = useMotionAllowed();

  useEffect(() => {
    const element = ref.current;
    if (!element || !motionAllowed || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      element.animate([
        { transform: "translateY(22px)", opacity: 0.35 },
        { transform: "translateY(0)", opacity: 1 },
      ], { duration: 550, easing: "cubic-bezier(.2,.7,.3,1)" });
      observer.disconnect();
    }, { threshold: 0.12 });
    observer.observe(element);
    return () => {
      observer.disconnect();
      element.getAnimations().forEach((animation) => animation.cancel());
    };
  }, [motionAllowed]);

  return <div ref={ref}>{children}</div>;
}
