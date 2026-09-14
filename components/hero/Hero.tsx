"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react"; // Tambahkan ini
import HeroText from "./HeroText";
import styles from "./Hero.module.css";
import ParallaxText from "./ParallaxText";
import useDeviceType from "../../hooks/useDeviceType";

const GlobePulse = dynamic(() => import("../ui/wireframe-dotted-globe").then(m => m.GlobePulse), { ssr: false });
const Lanyard = dynamic(() => import("../ui/Lanyard"), { ssr: false });

export default function Hero() {
  const device = useDeviceType();
  const isMobile = device === 'mobile-small' || device === 'mobile-large';

  // Bikin config/settingan terpisah biar kode lu tetep bersih
    const getLanyardConfig = () => {
    switch (device) {
      case 'mobile-small': 
         return { position: [0, 8, 18], positionGroup: [0, 8, 0], fov: 45 };
      case 'mobile-large':
         return { position: [0, 8, 16], positionGroup: [0, 6.8, 0], fov: 40 };
      case 'tablet':
        // FOV & Z-Position dibikin SAMA kayak desktop (20 dan 20).
        // TAPI positionGroup (posisi jangkar gantungannya) kita ubah X-nya jadi minus (contoh: -2.5) biar dia geser ke kiri.
        return { position: [0, 0, 20], positionGroup: [3, 4, 0], fov: 20 };
      default: // desktop
        return { position: [0, 0, 20], positionGroup: [0, 4, 0], fov: 20 };
    }
  };


  const lanyardConfig = getLanyardConfig();

  return (
    <motion.section
      id="hero"
      className={styles.heroSection}
      initial="initial"
      animate="animate"
    >
      <div className={styles.lanyardPortalWrapper}>
        <Lanyard 
          position={lanyardConfig.position as any} 
          positionGroup={lanyardConfig.positionGroup as any}
          fov={lanyardConfig.fov}
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

      {isMobile && (
  <div className={styles.globeWrapper}>
    <GlobePulse className={styles.globe} />
  </div>
)}
    </motion.section>
  );
}
