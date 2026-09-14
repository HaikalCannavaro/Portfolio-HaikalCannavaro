"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react"; // Tambahkan ini
import HeroText from "./HeroText";
import styles from "./Hero.module.css";
import ParallaxText from "./ParallaxText";

const Lanyard = dynamic(() => import("../ui/Lanyard"), { ssr: false });

export default function Hero() {
  // 1. Tambahkan deteksi isMobile
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <motion.section
      id="hero"
      className={styles.heroSection}
      initial="initial"
      animate="animate"
    >
      <div className={styles.lanyardPortalWrapper}>
        <Lanyard 
          // 2. Sesuaikan nilai ini persis dengan kode Shelina
          position={isMobile ? [0, 8, 20] : [0, 0, 25]} 
          positionGroup={isMobile ? [0, 10, 0] : [5, 5, 0]}
          fov={isMobile ? 50 : 15}
          gravity={[0, -40, 0]} 
          frontImage={"/profileimage/ProfileEdited.jpg"} 
          backImage={"/profileimage/ProfileEdited.jpg"} 
          imageFit="cover"
        />
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
