"use client";

import { FacetMark } from "../brand/BrandMarks";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import useDesktopMotion from "../../hooks/useDesktopMotion";
import styles from "./SceneTransition.module.css";

type Props = { chapter: string; title: string; subtitle: string; tone: "blue" | "dark" | "paper" };

/** A native-scroll interlude: no wheel interception, snapping, timers or React frame updates. */
export default function SceneTransition({ chapter, title, subtitle, tone }: Props) {
  const track = useRef<HTMLDivElement>(null);
  const enabled = useDesktopMotion();
  const { scrollYProgress } = useScroll({ target: track, offset: ["start end", "end start"] });
  const aperture = useTransform(scrollYProgress, [0, .22, .65, 1], [0, 4, 100, 150]);
  const clipPath = useTransform(aperture, value => `circle(${value}% at 50% 50%)`);
  const x = useTransform(scrollYProgress, [0, 1], [90, -90]);
  const reverseX = useTransform(scrollYProgress, [0, 1], [-90, 90]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-65, 85]);
  const scale = useTransform(scrollYProgress, [0, .35, .75, 1], [.88, 1, 1, .94]);
  const opacity = useTransform(scrollYProgress, [0, .14, .85, 1], [0, 1, 1, 0]);

  // Decorative only: all chapter headings and destinations already exist in the page.
  return <div ref={track} className={styles.track} data-enabled={enabled} data-tone={tone} aria-hidden="true">
    <motion.div className={styles.frame} style={enabled ? { scale, opacity } : undefined}>
      <div className={styles.scene}>
        <span className={styles.label}>{chapter} / THE NEXT SCENE</span>
        <motion.div className={styles.title} style={enabled ? { x } : undefined}>{title}</motion.div>
        <motion.div className={styles.subtitle} style={enabled ? { x: reverseX } : undefined}>{subtitle}</motion.div>
        <span className={styles.foot}>KEEP EXPLORING <span>↓</span></span>
      </div>
      <motion.div className={`${styles.scene} ${styles.reveal}`} style={enabled ? { clipPath } : undefined}>
        <span className={styles.label}>{chapter} / THE NEXT SCENE</span>
        <motion.div className={styles.title} style={enabled ? { x } : undefined}>{title}</motion.div>
        <motion.div className={styles.subtitle} style={enabled ? { x: reverseX } : undefined}>{subtitle}</motion.div>
        <span className={styles.foot}>KEEP EXPLORING <span>↓</span></span>
      </motion.div>
      <motion.span className={styles.star} style={enabled ? { rotate } : undefined}><FacetMark /></motion.span>
    </motion.div>
  </div>;
}
