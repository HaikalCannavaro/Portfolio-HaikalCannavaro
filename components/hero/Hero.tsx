"use client";

import { motion } from "framer-motion";
import HeroText from "./HeroText";
import styles from "./Hero.module.css"; // Import file CSS Module
import ParallaxText from "./ParallaxText";

export default function Hero() {
  return (
    <motion.section
      id="hero"
      className={styles.heroSection} // Gunakan class dari CSS Module
      initial="initial"
      animate="animate"
    >
      <HeroText />
      <div className={styles.parallaxSection}>
        <ParallaxText direction={500} baseVelocity={-1}>
          Newbie Developer
        </ParallaxText>
      </div>
    </motion.section>
    
  );
}
