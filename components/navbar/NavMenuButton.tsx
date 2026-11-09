'use client'
import styles from './Nav.module.css'
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Nav from './nav'

export default function NavMenuButton() {
  const [isActive, setIsActive] = useState(false);
  const button = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isActive) return;

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsActive(false);
        button.current?.focus();
      }
    }

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isActive]);

  return (
    <>
      <button
        type="button"
        ref={button}
        onClick={() => setIsActive((open) => !open)}
        className={styles.button}
        aria-label={isActive ? "Close menu" : "Open menu"}
        aria-expanded={isActive}
        aria-controls={isActive ? "portfolio-menu" : undefined}
      >
        <span className={`${styles.burger} ${isActive ? styles.burgerActive : ""}`} aria-hidden="true" />
      </button>
      <AnimatePresence mode="wait">
        {isActive && <Nav onNavigate={() => setIsActive(false)} />}
      </AnimatePresence>
    </>
  )
}
