"use client";

import { useEffect, useRef } from "react";
import useDesktopMotion from "../../hooks/useDesktopMotion";
import styles from "./WorkRounded.module.css";

export default function WorkRounded({ titleId }: { titleId: string }) {
  const animate = useDesktopMotion();
  const container = useRef<HTMLDivElement>(null);
  const curve = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!animate) return;

    const curveContainer = container.current;
    const curveShape = curve.current;
    const title = document.getElementById(titleId);
    if (!curveContainer || !curveShape || !title) return;

    let disposed = false;
    let revert: (() => void) | undefined;

    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([{ gsap }, { ScrollTrigger }]) => {
      if (disposed) return;

      gsap.registerPlugin(ScrollTrigger);
      curveContainer.hidden = false;
      const context = gsap.context(() => {
        gsap.fromTo(curveShape, { scaleY: 1 }, {
          scaleY: 0,
          ease: "none",
          scrollTrigger: {
            trigger: curveContainer,
            scrub: 1,
            start: "center bottom",
            end: "center top",
          },
        });
        gsap.fromTo(title, { opacity: 0, y: "1.5rem" }, {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: { trigger: title, start: "top 60%" },
        });
      });
      revert = () => context.revert();
    });

    return () => {
      disposed = true;
      revert?.();
      curveContainer.hidden = true;
    };
  }, [animate, titleId]);

  return animate && (
    <div ref={container} className={styles.container} aria-hidden="true" hidden>
      <div ref={curve} className={styles.workRound} />
    </div>
  );
}
