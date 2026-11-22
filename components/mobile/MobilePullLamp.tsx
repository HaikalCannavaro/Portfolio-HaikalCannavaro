"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import useMotionAllowed from "../../hooks/useMotionAllowed";
import styles from "./MobilePullLamp.module.css";

const STORAGE_KEY = "haikal-portfolio-theme";

// SVG geometry & spring physics tuned for a weighted, natural pull-cord
// (true 1:1 2D pointer tracking + damped harmonic spring settling with ~2 bounces).
const VIEWBOX_W = 120;
const VIEWBOX_H = 160;
const ANCHOR = { x: 60, y: 10 };
const KNOT = { x: 60, y: 74 };

const MIN_LEN = 26;
const MAX_LEN = 128;
const TRAVEL_THRESHOLD = 42;
const SPRING_STIFFNESS = 32;
const SPRING_DAMPING = 3.4;

export default function MobilePullLamp() {
  const animate = useMotionAllowed();
  const [dark, setDark] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isArmed, setIsArmed] = useState(false);

  const svgRef = useRef<SVGSVGElement>(null);
  const cordLineRef = useRef<SVGLineElement>(null);
  const beadGroupRef = useRef<SVGGElement>(null);

  const posRef = useRef({ x: KNOT.x, y: KNOT.y });
  const velRef = useRef({ vx: 0, vy: 0 });
  const draggingRef = useRef(false);
  const armedRef = useRef(false);
  const svgOriginRef = useRef({ x: 0, y: 0 });
  const scaleRef = useRef({ scaleX: 1, scaleY: 1 });
  const startClientRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);
  const darkRef = useRef(false);

  useEffect(() => {
    darkRef.current = dark;
  }, [dark]);

  useEffect(() => {
    const sync = () => {
      const nextDark = document.documentElement.dataset.theme === "dark";
      darkRef.current = nextDark;
      setDark(nextDark);
    };
    sync();

    const onStorage = (event: StorageEvent) => {
      if (event.key !== STORAGE_KEY && event.key !== null) return;
      document.documentElement.dataset.theme = event.newValue === "dark" ? "dark" : "light";
      sync();
    };

    window.addEventListener("storage", onStorage);
    window.addEventListener("portfolio-theme-change", sync);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("portfolio-theme-change", sync);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Block iOS Safari / WebKit scroll hijacking while actively dragging the cord.
  useEffect(() => {
    if (!isDragging) return undefined;
    const blockScroll = (e: TouchEvent) => e.preventDefault();
    document.addEventListener("touchmove", blockScroll, { passive: false });
    return () => document.removeEventListener("touchmove", blockScroll);
  }, [isDragging]);

  const applyPos = useCallback((x: number, y: number) => {
    posRef.current = { x, y };
    if (cordLineRef.current) {
      cordLineRef.current.setAttribute("x2", x.toFixed(2));
      cordLineRef.current.setAttribute("y2", y.toFixed(2));
    }
    if (beadGroupRef.current) {
      const angleDeg = (-Math.atan2(x - ANCHOR.x, Math.max(8, y - ANCHOR.y)) * 180) / Math.PI;
      beadGroupRef.current.setAttribute(
        "transform",
        `translate(${x.toFixed(2)} ${y.toFixed(2)}) rotate(${(angleDeg * 0.85).toFixed(2)})`
      );
    }
  }, []);

  const stopSpring = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  const springToRest = useCallback(() => {
    stopSpring();
    if (!animate) {
      applyPos(KNOT.x, KNOT.y);
      velRef.current = { vx: 0, vy: 0 };
      return;
    }

    let lastTime: number | null = null;

    const step = (now: number) => {
      if (lastTime === null) lastTime = now;
      const dt = Math.min((now - lastTime) / 1000, 0.032);
      lastTime = now;

      const dx = posRef.current.x - KNOT.x;
      const dy = posRef.current.y - KNOT.y;
      const { vx, vy } = velRef.current;

      const ax = -SPRING_STIFFNESS * dx - SPRING_DAMPING * vx;
      const ay = -SPRING_STIFFNESS * dy - SPRING_DAMPING * vy;
      const newVx = vx + ax * dt;
      const newVy = vy + ay * dt;
      const newX = posRef.current.x + newVx * dt;
      const newY = posRef.current.y + newVy * dt;

      velRef.current = { vx: newVx, vy: newVy };
      applyPos(newX, newY);

      if (
        Math.abs(newX - KNOT.x) < 0.35 &&
        Math.abs(newY - KNOT.y) < 0.35 &&
        Math.abs(newVx) < 2.5 &&
        Math.abs(newVy) < 2.5
      ) {
        applyPos(KNOT.x, KNOT.y);
        velRef.current = { vx: 0, vy: 0 };
        rafRef.current = null;
        return;
      }

      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
  }, [animate, applyPos, stopSpring]);

  const toggleTheme = useCallback(() => {
    const nextDark = !darkRef.current;
    darkRef.current = nextDark;
    document.documentElement.dataset.theme = nextDark ? "dark" : "light";
    setDark(nextDark);
    window.dispatchEvent(new Event("portfolio-theme-change"));
    try {
      localStorage.setItem(STORAGE_KEY, nextDark ? "dark" : "light");
    } catch {
      /* Session-only preference when storage is blocked. */
    }
    if (typeof navigator !== "undefined" && typeof navigator.vibrate === "function") {
      try {
        navigator.vibrate(14);
      } catch {
        /* Ignore unsupported haptics. */
      }
    }
  }, []);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<SVGCircleElement>) => {
      if (e.button !== 0 && e.pointerType === "mouse") return;
      const svgEl = svgRef.current;
      if (!svgEl) return;

      stopSpring();
      draggingRef.current = true;
      armedRef.current = false;
      setIsDragging(true);
      setIsArmed(false);
      velRef.current = { vx: 0, vy: 0 };

      const rect = svgEl.getBoundingClientRect();
      svgOriginRef.current = { x: rect.left, y: rect.top };
      scaleRef.current = {
        scaleX: rect.width / VIEWBOX_W,
        scaleY: rect.height / VIEWBOX_H,
      };
      startClientRef.current = { x: e.clientX, y: e.clientY };

      e.currentTarget.setPointerCapture?.(e.pointerId);
      e.preventDefault();
    },
    [stopSpring]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<SVGCircleElement>) => {
      if (!draggingRef.current) return;

      const { x: ox, y: oy } = svgOriginRef.current;
      const { scaleX, scaleY } = scaleRef.current;

      const svgX = (e.clientX - ox) / scaleX;
      const svgY = (e.clientY - oy) / scaleY;

      let dx = svgX - ANCHOR.x;
      let dy = svgY - ANCHOR.y;
      const dist = Math.hypot(dx, dy) || 1;
      const clampedLen = Math.min(MAX_LEN, Math.max(MIN_LEN, dist));
      const ratio = clampedLen / dist;
      dx *= ratio;
      dy *= ratio;

      // Keep the cord hanging below the ceiling mount.
      const nextX = ANCHOR.x + dx;
      const nextY = Math.max(ANCHOR.y + 12, ANCHOR.y + dy);
      applyPos(nextX, nextY);

      const traveled = Math.hypot(
        e.clientX - startClientRef.current.x,
        e.clientY - startClientRef.current.y
      );
      const nowArmed = traveled > TRAVEL_THRESHOLD;
      if (nowArmed !== armedRef.current) {
        armedRef.current = nowArmed;
        setIsArmed(nowArmed);
        if (nowArmed && typeof navigator !== "undefined" && typeof navigator.vibrate === "function") {
          try {
            navigator.vibrate(8);
          } catch {
            /* Ignore unsupported haptics. */
          }
        }
      }

      e.preventDefault();
    },
    [applyPos]
  );

  const handlePointerEnd = useCallback(
    (e: PointerEvent | React.PointerEvent<SVGCircleElement>) => {
      if (!draggingRef.current) return;
      draggingRef.current = false;
      armedRef.current = false;
      setIsDragging(false);
      setIsArmed(false);

      if ("currentTarget" in e && e.currentTarget && "releasePointerCapture" in e.currentTarget) {
        try {
          (e.currentTarget as SVGCircleElement).releasePointerCapture?.(e.pointerId);
        } catch {
          /* Ignore if already released. */
        }
      }

      const traveled = Math.hypot(
        e.clientX - startClientRef.current.x,
        e.clientY - startClientRef.current.y
      );
      if (traveled > TRAVEL_THRESHOLD) {
        toggleTheme();
      }
      springToRest();
    },
    [springToRest, toggleTheme]
  );

  // Android WebView safety net so release & spring-back always fire even if pointer capture drops.
  useEffect(() => {
    if (!isDragging) return undefined;
    window.addEventListener("pointerup", handlePointerEnd);
    window.addEventListener("pointercancel", handlePointerEnd);
    return () => {
      window.removeEventListener("pointerup", handlePointerEnd);
      window.removeEventListener("pointercancel", handlePointerEnd);
    };
  }, [isDragging, handlePointerEnd]);

  const handleKeyboardToggle = useCallback(
    (e: React.KeyboardEvent<SVGCircleElement>) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleTheme();
        if (animate) {
          const side = Math.random() > 0.5 ? 1 : -1;
          applyPos(KNOT.x + side * 24, KNOT.y + 18);
          springToRest();
        }
      }
    },
    [animate, applyPos, springToRest, toggleTheme]
  );

  return (
    <div
      className={styles.lampRail}
      data-dark={dark}
      data-dragging={isDragging}
      data-armed={isArmed}
    >
      <p className={styles.srOnly} aria-live="polite">
        {dark ? "Dark mode enabled" : "Light mode enabled"}
      </p>
      <svg
        ref={svgRef}
        className={styles.lampSvg}
        viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="mobile-lamp-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f8d477" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#f8d477" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="mobile-lamp-bulb-on" cx="38%" cy="32%" r="68%">
            <stop offset="0%" stopColor="#fffdf2" />
            <stop offset="55%" stopColor="#f8d477" />
            <stop offset="100%" stopColor="#dc9635" />
          </radialGradient>
          <radialGradient id="mobile-lamp-bulb-off" cx="38%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#464d64" />
            <stop offset="65%" stopColor="#252935" />
            <stop offset="100%" stopColor="#171916" />
          </radialGradient>
        </defs>

        {/* Ceiling bracket */}
        <g className={styles.canopy} aria-hidden="true">
          <path d="M44 0h32v5c0 3.5-3 6-6.5 6h-19C47 11 44 8.5 44 5V0z" className={styles.canopyBody} />
          <circle cx={ANCHOR.x} cy={ANCHOR.y + 1} r="3" className={styles.canopyRing} />
        </g>

        {/* Dynamic pull-cord + weighted pendant (updated directly via refs at 60fps) */}
        <g className={styles.cordGroup} aria-hidden="true">
          <line
            ref={cordLineRef}
            className={styles.cordLine}
            x1={ANCHOR.x}
            y1={ANCHOR.y}
            x2={KNOT.x}
            y2={KNOT.y}
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <g ref={beadGroupRef} transform={`translate(${KNOT.x} ${KNOT.y})`}>
            <circle className={styles.bulbHalo} cx="0" cy="11" r="22" fill="url(#mobile-lamp-glow)" />
            <rect className={styles.socket} x="-6" y="-3" width="12" height="7" rx="2.5" />
            <path
              className={styles.bulbBody}
              d="M-9.5 4.5C-9.5 3.5 -6 2.5 0 2.5C6 2.5 9.5 3.5 9.5 4.5C11 9.5 11.5 14.5 9.5 19.5C7.6 24 4.2 26 0 26C-4.2 26 -7.6 24 -9.5 19.5C-11.5 14.5 -11 9.5 -9.5 4.5Z"
              fill={dark ? "url(#mobile-lamp-bulb-off)" : "url(#mobile-lamp-bulb-on)"}
            />
            <path className={styles.filament} d="M-3.5 9.5c0 4 1.6 6 3.5 6s3.5-2 3.5-6" strokeWidth="1.6" strokeLinecap="round" />
          </g>
        </g>

        {/* Generous touch/pointer hit target kept last in paint order */}
        <circle
          className={styles.hitArea}
          cx={KNOT.x}
          cy={KNOT.y + 8}
          r="34"
          fill="#c4c4c4"
          fillOpacity="0.01"
          role="switch"
          tabIndex={0}
          aria-label={dark ? "Pull lamp cord to switch to light mode" : "Pull lamp cord to switch to dark mode"}
          aria-checked={dark}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerEnd}
          onPointerCancel={handlePointerEnd}
          onLostPointerCapture={handlePointerEnd}
          onKeyDown={handleKeyboardToggle}
        />
      </svg>
    </div>
  );
}
