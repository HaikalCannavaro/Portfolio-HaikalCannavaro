import PortraitCard from "./PortraitCard";
import HeroMotion from "./HeroMotion";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section id="hero">
      <HeroMotion>
        <div className={styles.compactHero}>
          <div className={styles.heroIntro}>
            <p className={styles.eyebrow}>Software Developer</p>
            <h1>Haikal <span>Cannavaro</span></h1>
            <p className={styles.summary}>
              I build web applications and use AI-assisted development to turn ideas into working software.
            </p>
            <div className={styles.actions}>
              <a className={styles.primaryAction} href="#work">
                View projects <span aria-hidden="true">↓</span>
              </a>
              <a className={styles.secondaryAction} href="#about">About me</a>
            </div>
          </div>
          <PortraitCard />
        </div>
      </HeroMotion>
    </section>
  );
}
