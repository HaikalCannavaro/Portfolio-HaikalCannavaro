import React from "react";
import { AnimateWords } from "./AnimateWords";
import { motion } from "framer-motion";
import Image from "next/image";
import styles from "./HeroText.module.css"; // Import file CSS Module

export default function HeroText() {
  return (
    <div className={styles.heroContainer}>
      <div className={styles.textContainer}>
        <AnimateWords
          title="Haikal Cannavaro"
          style={styles.animateWords} // Gunakan class dari CSS Module
        />
        <motion.div
          initial={{ y: 50, opacity: 0, scale: 0.8 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: `0em`,
            transition: {
              delay: 2.5,
              duration: 1,
              ease: [0.2, 0.65, 0.3, 0.9],
            },
          }}
          className={styles.imageWrapper} // Tambahkan class
        >
          <Image
            src={"/profileimage/ProfileEdited.jpg"}
            width={150}
            height={150}
            priority
            alt="Haikal Cannavaro"
            className={styles.heroImage} // Gunakan class CSS untuk styling gambar
          />
        </motion.div>
      </div>
    </div>
  );
}
