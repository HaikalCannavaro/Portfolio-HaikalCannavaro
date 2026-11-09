"use client";

import dynamic from "next/dynamic";
import useDeviceType from "../../hooks/useDeviceType";
import HeroText from "./HeroText";
import ParallaxText from "./ParallaxText";
import styles from "./Hero.module.css";

const Lanyard = dynamic(() => import("../ui/Lanyard"), { ssr: false });

export default function HeroScene() {
  const device = useDeviceType();

  return (
    <div className={styles.heroSection}>
      <div className={styles.lanyardPortalWrapper}>
        <Lanyard
          position={[0, 0, 20]}
          positionGroup={[device === "tablet" ? 3 : 4, 4, 0]}
          fov={20}
          gravity={[0, -40, 0]}
          frontImage="/profileimage/ProfileEdited.jpg"
          backImage="/profileimage/ProfileEdited.jpg"
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
    </div>
  );
}
