"use client";

import useIsomorphicLayoutEffect from "../../hooks/UseIsomorphicLayoutEffect";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import styles from "./ContactTitle.module.css";

interface ContactTitleProps {
  title: string;
}

export default function ContactTitle({ title }: ContactTitleProps) {
  const el = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        `.${styles.titleText}`,
        { opacity: 0, y: "1.5rem" },
        {
          opacity: 1,
          duration: 1.5,
          y: 0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el.current,
            start: "top 60%",
            end: "bottom 60%",
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={el} className={styles.container}>
      <p className={styles.titleText}>{title}</p>
    </div>
  );
}
