"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import styles from "./DesktopPortfolio.module.css";

const storageKey = "haikal-portfolio-theme";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const sync = () => setDark(document.documentElement.dataset.theme === "dark");
    sync();
    const onStorage = (event: StorageEvent) => {
      if (event.key !== storageKey && event.key !== null) return;
      document.documentElement.dataset.theme = event.newValue === "dark" ? "dark" : "light";
      sync();
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return <button className={styles.themeToggle} type="button" aria-label="Dark mode" aria-pressed={dark} title={dark ? "Switch to light mode" : "Switch to dark mode"} onClick={() => {
    const next = !dark;
    document.documentElement.dataset.theme = next ? "dark" : "light";
    setDark(next);
    // The control still works in private browsing when storage is unavailable.
    try { localStorage.setItem(storageKey, next ? "dark" : "light"); } catch { /* Session-only preference. */ }
  }}><Sun className={styles.sunIcon} size={17} aria-hidden="true" /><Moon className={styles.moonIcon} size={17} aria-hidden="true" /><span className={styles.themeLabel}>{dark ? "Light" : "Dark"}</span></button>;
}
