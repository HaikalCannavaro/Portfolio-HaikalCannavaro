"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SmoothScroll from "../SmoothScroll";
import { FacetMark, HCMonogram } from "./BrandMarks";
import styles from "./SplashScreen.module.css";

const SESSION_KEY = "hc-portfolio-splash-seen";
const EASE = [0.22, 1, 0.36, 1] as const;
const DURATION_MS = 3100;

const STATUS_STEPS = [
  "Initializing workspace...",
  "Preparing 3D portrait & interactive book...",
  "Finalizing details...",
] as const;

type Phase = "checking" | "visible" | "leaving" | "idle";

export default function SplashScreen({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<Phase>("checking");
  const [percent, setPercent] = useState(0);
  const dialogRef = useRef<HTMLDivElement>(null);
  const enterButtonRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const locked = phase === "visible" || phase === "leaving";

  const dismiss = useCallback(() => setPhase("leaving"), []);

  const finishEntry = () => {
    delete document.documentElement.dataset.splash;
    const anchor = document.getElementById(window.location.hash.slice(1));
    if (anchor && anchor.getClientRects().length) anchor.scrollIntoView({ behavior: "instant" });
    else window.scrollTo({ top: 0, behavior: "instant" });
    try { window.sessionStorage.setItem(SESSION_KEY, "1"); } catch {}
    setPhase("idle");
    requestAnimationFrame(() => contentRef.current?.focus({ preventScroll: true }));
  };

  useEffect(() => {
    // The head script makes this decision before the browser paints or restores scroll.
    if (document.documentElement.dataset.splash !== "pending") {
      setPhase("idle");
      return;
    }
    setPhase("visible");

    const start = performance.now();
    let rafId = 0;

    const tick = (now: number) => {
      const linear = Math.min(1, (now - start) / DURATION_MS);
      const eased =
        linear < 0.5
          ? 4 * linear * linear * linear
          : 1 - Math.pow(-2 * linear + 2, 3) / 2;

      setPercent(linear === 1 ? 100 : Math.min(99, Math.round(eased * 100)));

      if (linear < 1) {
        rafId = window.requestAnimationFrame(tick);
      }
    };

    rafId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(rafId);
    };
  }, []);

  const isComplete = percent >= 100;

  useEffect(() => {
    if (phase === "visible") {
      document.documentElement.dataset.splash = "active";
      dialogRef.current?.focus({ preventScroll: true });
    }
  }, [phase]);

  useEffect(() => {
    if (!locked) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Tab") {
        event.preventDefault();
        (enterButtonRef.current ?? dialogRef.current)?.focus({ preventScroll: true });
      } else if (event.key === "Enter") {
        event.preventDefault();
        if (phase === "visible" && isComplete && !event.repeat) dismiss();
      }
    };
    window.addEventListener("keydown", onKeyDown, true);
    return () => window.removeEventListener("keydown", onKeyDown, true);
  }, [locked, phase, isComplete, dismiss]);

  const focusEnter = useCallback((button: HTMLButtonElement | null) => {
    enterButtonRef.current = button;
    button?.focus({ preventScroll: true });
  }, []);

  const statusIndex = percent < 36 ? 0 : percent < 80 ? 1 : 2;

  return (
    <>
    <AnimatePresence onExitComplete={finishEntry}>
      {phase === "visible" && (
        <motion.div
          ref={dialogRef}
          tabIndex={-1}
          className={styles.overlay}
          role="dialog"
          aria-modal="true"
          aria-label="Welcome to Haikal Cannavaro portfolio"
          initial={{ opacity: 1 }}
          exit={{ opacity: 1, transition: { duration: 0.95 } }}
        >
          {/* Split editorial curtains that open vertically on exit */}
          <motion.div
            className={styles.curtainTop}
            initial={{ y: "0%" }}
            exit={{ y: "-102%", transition: { duration: 0.85, delay: 0.1, ease: EASE } }}
            aria-hidden="true"
          />
          <motion.div
            className={styles.curtainBottom}
            initial={{ y: "0%" }}
            exit={{ y: "102%", transition: { duration: 0.85, delay: 0.1, ease: EASE } }}
            aria-hidden="true"
          />

          {/* Subtle drifting HC watermark */}
          <motion.div
            className={styles.watermark}
            aria-hidden="true"
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1.04, opacity: 0.035 }}
            exit={{ opacity: 0, scale: 1.12, transition: { duration: 0.4 } }}
            transition={{ duration: 3.2, ease: EASE }}
          >
            HC
          </motion.div>

          <motion.div
            className={styles.content}
            exit={{
              opacity: 0,
              scale: 0.96,
              transition: { duration: 0.35, ease: EASE },
            }}
          >
            <div className={styles.topWrap}>
              <div className={styles.topBar}>
                <motion.span
                  className={styles.eyebrow}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
                >
                  <i className={styles.dot} aria-hidden="true" />
                  HAIKAL CANNAVARO — EDITION 2026
                </motion.span>
                {isComplete && (
                  <motion.span initial={{ opacity: 0 }} animate={{ opacity: 0.6 }}>READY</motion.span>
                )}
              </div>
              <motion.div
                className={styles.rule}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.85, delay: 0.12, ease: EASE }}
                aria-hidden="true"
              />
            </div>

            <div className={styles.center}>
              <div className={styles.emblemStage}>
                <motion.div
                  className={styles.halo}
                  animate={{
                    scale: isComplete ? [1, 1.24, 1] : [0.9, 1.15, 0.9],
                    opacity: isComplete ? [0.7, 1, 0.7] : [0.55, 0.95, 0.55],
                  }}
                  transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  aria-hidden="true"
                />

                {/* Outer dashed ring rotating clockwise */}
                <motion.div
                  className={styles.orbitOuter}
                  initial={{ rotate: -60, scale: 0.72, opacity: 0 }}
                  animate={{ rotate: 300, scale: 1, opacity: 1 }}
                  transition={{
                    rotate: { duration: 9, repeat: Infinity, ease: "linear" },
                    scale: { duration: 0.9, ease: EASE },
                    opacity: { duration: 0.7, ease: EASE },
                  }}
                  aria-hidden="true"
                >
                  <span className={styles.orbitAccentTop}>
                    <FacetMark />
                  </span>
                </motion.div>

                {/* Inner solid ring counter-rotating */}
                <motion.div
                  className={styles.orbitInner}
                  initial={{ rotate: 60, scale: 0.8, opacity: 0 }}
                  animate={{ rotate: -300, scale: 1, opacity: 1 }}
                  transition={{
                    rotate: { duration: 6.5, repeat: Infinity, ease: "linear" },
                    scale: { duration: 0.85, delay: 0.1, ease: EASE },
                    opacity: { duration: 0.65, delay: 0.1, ease: EASE },
                  }}
                  aria-hidden="true"
                >
                  <span className={styles.orbitAccentBottom}>
                    <FacetMark />
                  </span>
                </motion.div>

                {/* HC Monogram with clip-path wipe + gentle levitation */}
                <motion.div
                  className={styles.emblem}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    y: 14,
                    clipPath: "inset(100% 0% 0% 0%)",
                  }}
                  animate={{
                    opacity: 1,
                    scale: isComplete ? 1.52 : 1.44,
                    y: [0, -5, 0],
                    clipPath: "inset(0% 0% 0% 0%)",
                  }}
                  transition={{
                    opacity: { duration: 0.5, delay: 0.2 },
                    clipPath: { duration: 0.85, delay: 0.2, ease: EASE },
                    scale: { duration: 0.45, ease: EASE },
                    y: { duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.9 },
                  }}
                >
                  <HCMonogram />
                </motion.div>
              </div>

              <div className={styles.titleGroup}>
                <div className={styles.nameRow}>
                  <span className={styles.maskLine}>
                    <motion.span
                      className={styles.nameAccent}
                      style={{ display: "inline-block" }}
                      initial={{ y: "110%" }}
                      animate={{ y: "0%" }}
                      transition={{ duration: 0.75, delay: 0.45, ease: EASE }}
                    >
                      HAIKAL
                    </motion.span>
                  </span>
                  <span className={styles.maskLine}>
                    <motion.span
                      style={{ display: "inline-block" }}
                      initial={{ y: "110%" }}
                      animate={{ y: "0%" }}
                      transition={{ duration: 0.75, delay: 0.58, ease: EASE }}
                    >
                      CANNAVARO
                    </motion.span>
                  </span>
                </div>

                <span className={styles.maskLine}>
                  <motion.p
                    className={styles.tagline}
                    initial={{ y: "110%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 0.85 }}
                    transition={{ duration: 0.7, delay: 0.78, ease: EASE }}
                  >
                    Curious by nature. Builder by design.
                  </motion.p>
                </span>

                <div className={styles.actionSlot}>
                  <AnimatePresence mode="wait">
                    {!isComplete ? (
                      <motion.span
                        key={`status-${statusIndex}`}
                        className={styles.statusText}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.28, ease: EASE }}
                      >
                        {STATUS_STEPS[statusIndex]}
                      </motion.span>
                    ) : (
                      <motion.button
                        ref={focusEnter}
                        key="enter-btn"
                        type="button"
                        className={styles.enterButton}
                        onClick={dismiss}
                        initial={{ opacity: 0, y: 14, scale: 0.92 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        whileTap={{ scale: 0.96 }}
                        transition={{ duration: 0.45, ease: EASE }}
                      >
                        <span>Enter Portfolio</span>
                        <span className={styles.enterArrow} aria-hidden="true">
                          ↗
                        </span>
                      </motion.button>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            <div className={styles.bottomWrap}>
              <div className={styles.progressTrack} aria-hidden="true">
                <motion.div
                  className={styles.progressFill}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: percent / 100 }}
                  transition={{ duration: 0.1, ease: "linear" }}
                />
              </div>
              <div className={styles.bottomBar}>
                <span>{isComplete ? "PRESS ENTER OR CLICK TO CONTINUE" : "PORTFOLIO — SELECTED WORK"}</span>
                <span className={styles.counter}>{String(percent).padStart(2, "0")}%</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    <div ref={contentRef} id="portfolio-content" tabIndex={-1} inert={locked}>
      <SmoothScroll enabled={phase === "idle"}>{children}</SmoothScroll>
    </div>
    </>
  );
}
