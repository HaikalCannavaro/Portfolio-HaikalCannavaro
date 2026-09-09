"use client"

import useIsomorphicLayoutEffect from "../../hooks/UseIsomorphicLayoutEffect";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import styles from "./WorkRounded.module.css";

export default function WorkRounded() {
  const el = useRef<HTMLDivElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        `.${styles.workRound}`,
        { scale: 1 },
        {
          scaleY: 0,
          ease: "none",
          scrollTrigger: {
            trigger: el.current,
            scrub: 1,
            start: "center bottom",
            end: "center top",
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={el}
      className={styles.container}
    >
      <div className={styles.workRound} />
    </div>
  );
}
