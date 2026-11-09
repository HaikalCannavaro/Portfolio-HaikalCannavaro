"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./Hero.module.css";

export default function PortraitCard() {
  const [flipped, setFlipped] = useState(false);
  return (
    <button type="button" className={styles.portraitButton}
      aria-label="Show a little more about Haikal" aria-pressed={flipped}
      onClick={() => setFlipped((value) => !value)}>
      <span className={`${styles.portraitFrame} ${flipped ? styles.flipped : ""}`}>
        <span className={styles.portrait} aria-hidden={flipped}>
          <Image src="/profileimage/ProfileEdited.jpg" alt="Haikal Cannavaro" fill
            loading="eager" sizes="(max-width: 680px) 160px, 200px" />
        </span>
        <span className={styles.portraitBack} aria-hidden={!flipped}>
          <span aria-hidden="true">✦</span>
          <strong>Curious mind.<br />Creative code.</strong>
          <span>Building ideas into real digital products.</span>
        </span>
      </span>
      <span className={styles.portraitHint}>{flipped ? "Tap to turn back ↻" : "Tap to meet me ↻"}</span>
    </button>
  );
}
