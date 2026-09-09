"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import HeroText from "./HeroText";
import styles from "./Hero.module.css"; // Import file CSS Module
import ParallaxText from "./ParallaxText";

// ssr: false is required — Canvas/Rapier need WebGL + WASM, which don't
// exist during server render. Without this, Lanyard can fail to mount
// silently and just never appear.
const Lanyard = dynamic(() => import("../ui/Lanyard"), { ssr: false });

export default function Hero() {
  return (
    <motion.section
      id="hero"
      className={styles.heroSection} // Gunakan class dari CSS Module
      initial="initial"
      animate="animate"
    >
      {/* Portal 3D lanyard - pointer-events: none so it doesn't block the text below,
          the card itself re-enables pointer-events via Lanyard's own wrapper */}
      <div className={styles.lanyardPortalWrapper}>
        <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} frontImage={"/profileimage/ProfileEdited.jpg"} backImage={"/profileimage/ProfileEdited.jpg"} />
      </div>

      <div className={styles.heroContentWrapper}>
        <HeroText />
        <div className={styles.parallaxSection}>
          <ParallaxText direction={500} baseVelocity={-1}>
            Software Developer
          </ParallaxText>
        </div>
      </div>
    </motion.section>
  );
}