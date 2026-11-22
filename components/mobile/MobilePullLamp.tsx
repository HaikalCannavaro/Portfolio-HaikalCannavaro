"use client";

import { useEffect, useRef, useState } from "react";
import useMotionAllowed from "../../hooks/useMotionAllowed";
import styles from "./MobilePullLamp.module.css";

const storageKey = "haikal-portfolio-theme";
const PULL_THRESHOLD = 34;
const MAX_PULL = 66;
const TAP_THRESHOLD = 7;

export default function MobilePullLamp() {
  const animate = useMotionAllowed();
  const [dark, setDark] = useState(false);
  const [pullY, setPullY] = useState(0);
  const [pullX, setPullX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [armed, setArmed] = useState(false);
  const [tapBounce, setTapBounce] = useState(false);

  const startRef = useRef<{ x: number; y: number; pointerId: number } | null>(null);
  const armedRef = useRef(false);
  const draggedRef = useRef(false);
  const bounceTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const sync = () => setDark(document.documentElement.dataset.theme === "dark");
    sync();
    const onStorage = (event: StorageEvent) => {
      if (event.key !== storageKey && event.key !== null) return;
      document.documentElement.dataset.theme = event.newValue === "dark" ? "dark" : "light";
      sync();
    };
    window.addEventListener("storage", onStorage);
    window.addEventListener("portfolio-theme-change", sync);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("portfolio-theme-change", sync);
      if (bounceTimerRef.current !== null) window.clearTimeout(bounceTimerRef.current);
    };
  }, []);

  function applyTheme(nextDark: boolean) {
    document.documentElement.dataset.theme = nextDark ? "dark" : "light";
    setDark(nextDark);
    window.dispatchEvent(new Event("portfolio-theme-change"));
    try {
      localStorage.setItem(storageKey, nextDark ? "dark" : "light");
    } catch {
      /* Session-only preference when storage is blocked. */
    }
    if (typeof navigator !== "undefined" && typeof navigator.vibrate === "function") {
      try { navigator.vibrate(14); } catch { /* Ignore unsupported haptics. */ }
    }
  }

  function triggerTapToggle() {
    applyTheme(!dark);
    if (!animate) return;
    setTapBounce(true);
    setPullY(22);
    if (bounceTimerRef.current !== null) window.clearTimeout(bounceTimerRef.current);
    bounceTimerRef.current = window.setTimeout(() => {
      setPullY(0);
      setTapBounce(false);
    }, 150);
  }

  function resetPull() {
    startRef.current = null;
    armedRef.current = false;
    setDragging(false);
    setArmed(false);
    setPullY(0);
    setPullX(0);
  }

  function handlePointerDown(event: React.PointerEvent<HTMLButtonElement>) {
    if (event.button !== 0 && event.pointerType === "mouse") return;
    startRef.current = { x: event.clientX, y: event.clientY, pointerId: event.pointerId };
    armedRef.current = false;
    draggedRef.current = false;
    setDragging(true);
    setArmed(false);
    try { event.currentTarget.setPointerCapture(event.pointerId); } catch { /* Ignore capture errors. */ }
  }

  function handlePointerMove(event: React.PointerEvent<HTMLButtonElement>) {
    const start = startRef.current;
    if (!start || start.pointerId !== event.pointerId) return;
    const rawDy = event.clientY - start.y;
    const rawDx = event.clientX - start.x;

    if (Math.abs(rawDy) > TAP_THRESHOLD || Math.abs(rawDx) > TAP_THRESHOLD) {
      draggedRef.current = true;
    }

    const clampedDy = Math.max(0, rawDy);
    // Elastic resistance past the activation threshold feels like a real spring-loaded pull switch.
    const nextY = clampedDy <= PULL_THRESHOLD
      ? clampedDy
      : Math.min(MAX_PULL, PULL_THRESHOLD + (clampedDy - PULL_THRESHOLD) * 0.48);
    const nextX = Math.max(-14, Math.min(14, rawDx * 0.25));

    setPullY(animate ? nextY : Math.min(nextY, 16));
    setPullX(animate ? nextX : 0);

    const isNowArmed = nextY >= PULL_THRESHOLD;
    if (isNowArmed !== armedRef.current) {
      armedRef.current = isNowArmed;
      setArmed(isNowArmed);
      if (isNowArmed && typeof navigator !== "undefined" && typeof navigator.vibrate === "function") {
        try { navigator.vibrate(8); } catch { /* Ignore unsupported haptics. */ }
      }
    }
  }

  function handlePointerUp(event: React.PointerEvent<HTMLButtonElement>) {
    const start = startRef.current;
    if (!start || start.pointerId !== event.pointerId) return;
    const shouldToggle = armedRef.current;
    const wasDrag = draggedRef.current;
    resetPull();
    if (shouldToggle) {
      applyTheme(!dark);
    } else if (!wasDrag) {
      // Handled via pointer tap for touch devices without waiting for synthetic click delay.
      triggerTapToggle();
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLButtonElement>) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      triggerTapToggle();
    }
  }

  const baseCord = 34;
  const cordHeight = baseCord + pullY;
  const swayDeg = -(pullX * 0.65);

  return (
    <div
      className={styles.lampRail}
      data-dark={dark}
      data-dragging={dragging}
      data-armed={armed}
      data-bounce={tapBounce}
    >
      <div className={styles.canopy} aria-hidden="true">
        <span className={styles.canopyRing} />
      </div>
      <div
        className={styles.pendulum}
        style={{ transform: `rotate(${swayDeg.toFixed(2)}deg)` }}
      >
        <span
          className={styles.cord}
          style={{ height: `${cordHeight}px` }}
          aria-hidden="true"
        />
        <button
          type="button"
          className={styles.pullHandle}
          aria-label={dark ? "Pull lamp cord to switch to light mode" : "Pull lamp cord to switch to dark mode"}
          aria-pressed={dark}
          title={dark ? "Pull or tap for light mode" : "Pull or tap for dark mode"}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={resetPull}
          onLostPointerCapture={resetPull}
          onKeyDown={handleKeyDown}
        >
          <span className={styles.socket} aria-hidden="true" />
          <span className={styles.bulb} aria-hidden="true">
            <span className={styles.filament} />
          </span>
          <span className={styles.hint} aria-hidden="true">
            {armed ? "RELEASE" : dragging ? "PULL ↓" : dark ? "OFF" : "ON"}
          </span>
        </button>
      </div>
    </div>
  );
}
