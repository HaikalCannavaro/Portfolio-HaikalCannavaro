import Link from "next/link";
import { HCMonogram } from "../brand/BrandMarks";
import ThemeToggle from "../desktop/ThemeToggle";
import styles from "./ProjectNavigation.module.css";
export default function ProjectNavigation() {
  return (
    <nav className={styles.nav} aria-label="Portfolio navigation">
      <Link href="/" aria-label="Haikal Cannavaro, home">
        <HCMonogram />
      </Link>
      <span>
        HAIKAL CANNAVARO
        <br />
        <small>PROJECT ARCHIVE</small>
      </span>
      <div>
        <Link href="/projects">All projects ↗</Link>
        <ThemeToggle />
      </div>
    </nav>
  );
}
