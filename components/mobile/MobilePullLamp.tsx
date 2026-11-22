"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import useMotionAllowed from "../../hooks/useMotionAllowed";
import styles from "./MobilePullLamp.module.css";

const STORAGE_KEY = "haikal-portfolio-theme";

// Multi-node Verlet rope + damped elastic tension so the cord genuinely bends,
// sags when slack, whips on release, and swings like a real weighted pull-cord.
const VIEWBOX_W = 140;
const VIEWBOX_H = 190;
const ANCHOR = { x: 70, y: 10 };
const REST_LEN = 82;
const KNOT = { x: 70, y: ANCHOR.y + REST_LEN };

const NODE_COUNT = 8;
const SEG_LEN = REST_LEN / (NODE_COUNT - 1);
const MIN_LEN = 20;
const MAX_LEN = 152;
const TRAVEL_THRESHOLD = 42;

const GRAVITY = 1550; // SVG units / s^2
const ROPE_DAMPING = 0.965; // Per-frame velocity damping for organic ~2-3 swings
const STRETCH_SPRING = 36; // Elastic snap-back when pulled past REST_LEN
const STRETCH_DAMPING = 3.2;
const CONSTRAINT_ITERS = 7;

interface RopeNode {
  x: number;
  y: number;
  px: number;
  py: number;
}

function createRestNodes(): RopeNode[] {
  return Array.from({ length: NODE_COUNT }, (_, i) => {
    const y = ANCHOR.y + i * SEG_LEN;
    return { x: ANCHOR.x, y, px: ANCHOR.x, py: y };
  });
}

function buildSmoothPath(nodes: RopeNode[]): string {
  if (nodes.length < 2) return "";
  let d = `M ${nodes[0].x.toFixed(2)} ${nodes[0].y.toFixed(2)}`;
  for (let i = 1; i < nodes.length - 1; i++) {
    const mx = (nodes[i].x + nodes[i + 1].x) * 0.5;
    const my = (nodes[i].y + nodes[i + 1].y) * 0.5;
    d += ` Q ${nodes[i].x.toFixed(2)} ${nodes[i].y.toFixed(2)} ${mx.toFixed(2)} ${my.toFixed(2)}`;
  }
  const last = nodes[nodes.length - 1];
  d += ` L ${last.x.toFixed(2)} ${last.y.toFixed(2)}`;
  return d;
}

function playSwitchClick() {
  if (typeof window === "undefined") return;
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(720, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(190, ctx.currentTime + 0.032);
    gain.gain.setValueAtTime(0.09, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.036);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.04);
    osc.onended = () => { ctx.close().catch(() => {}); };
  } catch {
    /* Ignore audio context restrictions. */
  }
}

export default function MobilePullLamp() {
  const animate = useMotionAllowed();
  const [dark, setDark] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isArmed, setIsArmed] = useState(false);

  const svgRef = useRef<SVGSVGElement>(null);
  const cordPathRef = useRef<SVGPathElement>(null);
  const beadGroupRef = useRef<SVGGElement>(null);

  const nodesRef = useRef<RopeNode[]>(createRestNodes());
  const dragTargetRef = useRef<{ x: number; y: number } | null>(null);
  const pointerVelRef = useRef<{ vx: number; vy: number; lastX: number; lastY: number; lastT: number }>({
    vx: 0,
    vy: 0,
    lastX: KNOT.x,
    lastY: KNOT.y,
    lastT: 0,
  });
  const draggingRef = useRef(false);
  const armedRef = useRef(false);
  const svgOriginRef = useRef({ x: 0, y: 0 });
  const scaleRef = useRef({ scaleX: 1, scaleY: 1 });
  const startClientRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);
  const lastFrameRef = useRef<number | null>(null);
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

  const renderRope = useCallback(() => {
    const nodes = nodesRef.current;
    if (cordPathRef.current) {
      cordPathRef.current.setAttribute("d", buildSmoothPath(nodes));
    }
    if (beadGroupRef.current) {
      const tip = nodes[nodes.length - 1];
      const prev = nodes[nodes.length - 2];
      const angleDeg = (-Math.atan2(tip.x - prev.x, Math.max(4, tip.y - prev.y)) * 180) / Math.PI;
      beadGroupRef.current.setAttribute(
        "transform",
        `translate(${tip.x.toFixed(2)} ${tip.y.toFixed(2)}) rotate(${Math.max(-55, Math.min(55, angleDeg)).toFixed(2)})`
      );
    }
  }, []);

  const stopLoop = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    lastFrameRef.current = null;
  }, []);

  const startPhysicsLoop = useCallback(() => {
    if (!animate) {
      nodesRef.current = createRestNodes();
      renderRope();
      return;
    }
    if (rafRef.current !== null) return;
    lastFrameRef.current = null;

    const step = (now: number) => {
      if (lastFrameRef.current === null) lastFrameRef.current = now;
      const dt = Math.min((now - lastFrameRef.current) / 1000, 0.025);
      lastFrameRef.current = now;
      const dtSq = dt * dt;

      const nodes = nodesRef.current;
      const lastIdx = nodes.length - 1;
      const target = dragTargetRef.current;

      // 1. Verlet integration for all free nodes
      for (let i = 1; i <= lastIdx; i++) {
        if (target && i === lastIdx) continue;
        const n = nodes[i];
        const vx = (n.x - n.px) * ROPE_DAMPING;
        const vy = (n.y - n.py) * ROPE_DAMPING;
        n.px = n.x;
        n.py = n.y;
        // Bottom bead is heavier so it leads the swing naturally
        const gravityScale = i === lastIdx ? 1.25 : 1.0;
        n.x += vx;
        n.y += vy + GRAVITY * gravityScale * dtSq;
      }

      // 2. When released from an over-stretched pull, apply damped elastic recoil toward REST_LEN
      if (!target) {
        const tip = nodes[lastIdx];
        const dx = tip.x - ANCHOR.x;
        const dy = tip.y - ANCHOR.y;
        const dist = Math.hypot(dx, dy) || 1;
        if (dist > REST_LEN) {
          const excess = dist - REST_LEN;
          const nx = dx / dist;
          const ny = dy / dist;
          const vx = (tip.x - tip.px) / Math.max(dt, 0.008);
          const vy = (tip.y - tip.py) / Math.max(dt, 0.008);
          const radialVel = vx * nx + vy * ny;
          const recoil = (-STRETCH_SPRING * excess - STRETCH_DAMPING * radialVel) * dtSq;
          tip.x += nx * recoil;
          tip.y += ny * recoil;
        }
      }

      // 3. Pin ends and solve flexible rope distance constraints
      for (let iter = 0; iter < CONSTRAINT_ITERS; iter++) {
        nodes[0].x = ANCHOR.x;
        nodes[0].y = ANCHOR.y;

        if (target) {
          nodes[lastIdx].x = target.x;
          nodes[lastIdx].y = target.y;
        }

        // Dynamic segment length when user stretches cord past REST_LEN so it pulls taut smoothly
        const tipDist = Math.hypot(nodes[lastIdx].x - ANCHOR.x, nodes[lastIdx].y - ANCHOR.y);
        const activeSegLen = target && tipDist > REST_LEN ? tipDist / (NODE_COUNT - 1) : SEG_LEN;

        for (let i = 0; i < lastIdx; i++) {
          const a = nodes[i];
          const b = nodes[i + 1];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const dist = Math.hypot(dx, dy) || 0.0001;
          // Allow slight compression when slack so the cord visibly bows instead of acting like a rod
          if (dist > activeSegLen || iter === 0) {
            const diff = (dist - activeSegLen) / dist;
            const aPinned = i === 0;
            const bPinned = Boolean(target) && i + 1 === lastIdx;
            if (aPinned && !bPinned) {
              b.x -= dx * diff;
              b.y -= dy * diff;
            } else if (!aPinned && bPinned) {
              a.x += dx * diff;
              a.y += dy * diff;
            } else if (!aPinned && !bPinned) {
              // Heavier bottom node resists displacement more than lightweight string nodes
              const weightA = i + 1 === lastIdx ? 0.72 : 0.5;
              const weightB = 1 - weightA;
              a.x += dx * diff * weightA;
              a.y += dy * diff * weightA;
              b.x -= dx * diff * weightB;
              b.y -= dy * diff * weightB;
            }
          }
        }
      }

      renderRope();

      // 4. Stop rAF automatically once the cord has settled at rest
      if (!target) {
        // Gravity and the finite constraint iterations leave a small vertical stretch at equilibrium.
        const settled = nodes.every((node, index) => {
          const restY = ANCHOR.y + index * SEG_LEN;
          return Math.hypot(node.x - node.px, node.y - node.py) < 0.08 &&
            Math.abs(node.x - ANCHOR.x) < 0.75 &&
            Math.abs(node.y - restY) < 5;
        });
        if (settled) {
          nodesRef.current = createRestNodes();
          renderRope();
          stopLoop();
          return;
        }
      }

      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
  }, [animate, renderRope, stopLoop]);

  const toggleTheme = useCallback(() => {
    const nextDark = !darkRef.current;
    darkRef.current = nextDark;
    document.documentElement.dataset.theme = nextDark ? "dark" : "light";
    setDark(nextDark);
    window.dispatchEvent(new Event("portfolio-theme-change"));
    playSwitchClick();
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

      draggingRef.current = true;
      armedRef.current = false;
      setIsDragging(true);
      setIsArmed(false);

      const rect = svgEl.getBoundingClientRect();
      svgOriginRef.current = { x: rect.left, y: rect.top };
      scaleRef.current = {
        scaleX: rect.width / VIEWBOX_W,
        scaleY: rect.height / VIEWBOX_H,
      };
      startClientRef.current = { x: e.clientX, y: e.clientY };

      const tip = nodesRef.current[NODE_COUNT - 1];
      dragTargetRef.current = { x: tip.x, y: tip.y };
      pointerVelRef.current = { vx: 0, vy: 0, lastX: tip.x, lastY: tip.y, lastT: performance.now() };

      e.currentTarget.setPointerCapture?.(e.pointerId);
      e.preventDefault();
      startPhysicsLoop();
    },
    [startPhysicsLoop]
  );

  const handlePointerMove = useCallback((e: React.PointerEvent<SVGCircleElement>) => {
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

    const nextX = ANCHOR.x + dx;
    const nextY = Math.max(ANCHOR.y + 10, ANCHOR.y + dy);

    const now = performance.now();
    const pv = pointerVelRef.current;
    const dt = Math.max(0.008, (now - pv.lastT) / 1000);
    pv.vx = Math.max(-450, Math.min(450, (nextX - pv.lastX) / dt));
    pv.vy = Math.max(-450, Math.min(450, (nextY - pv.lastY) / dt));
    pv.lastX = nextX;
    pv.lastY = nextY;
    pv.lastT = now;

    dragTargetRef.current = { x: nextX, y: nextY };

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
  }, []);

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

      // Impart a gentle fraction of release velocity + elastic snap-up impulse to the tip
      const nodes = nodesRef.current;
      const tip = nodes[NODE_COUNT - 1];
      const pv = pointerVelRef.current;
      const dist = Math.hypot(tip.x - ANCHOR.x, tip.y - ANCHOR.y);
      const stretchKick = dist > REST_LEN ? (dist - REST_LEN) * 0.22 : 0;
      const nx = (tip.x - ANCHOR.x) / (dist || 1);
      const ny = (tip.y - ANCHOR.y) / (dist || 1);

      tip.px = tip.x - pv.vx * 0.008 + nx * stretchKick;
      tip.py = tip.y - pv.vy * 0.008 + ny * stretchKick;
      dragTargetRef.current = null;

      const traveled = Math.hypot(
        e.clientX - startClientRef.current.x,
        e.clientY - startClientRef.current.y
      );
      if (traveled > TRAVEL_THRESHOLD) {
        toggleTheme();
      }
      startPhysicsLoop();
    },
    [startPhysicsLoop, toggleTheme]
  );

  // Android WebView safety net so release & rope physics always fire even if pointer capture drops.
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
          const nodes = nodesRef.current;
          nodes[NODE_COUNT - 1].px -= side * 14;
          nodes[NODE_COUNT - 1].py -= 8;
          nodes[NODE_COUNT - 3].px -= side * 7;
          startPhysicsLoop();
        }
      }
    },
    [animate, startPhysicsLoop, toggleTheme]
  );

  const initialPath = buildSmoothPath(createRestNodes());

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
          <path d="M54 0h32v5c0 3.5-3 6-6.5 6h-19C57 11 54 8.5 54 5V0z" className={styles.canopyBody} />
          <circle cx={ANCHOR.x} cy={ANCHOR.y + 1} r="3" className={styles.canopyRing} />
        </g>

        {/* Flexible multi-node rope path + weighted pendant (60fps ref-driven) */}
        <g className={styles.cordGroup} aria-hidden="true">
          <path
            ref={cordPathRef}
            className={styles.cordLine}
            d={initialPath}
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <g ref={beadGroupRef} transform={`translate(${KNOT.x} ${KNOT.y})`}>
            <circle className={styles.bulbHalo} cx="0" cy="10" r="22" fill="url(#mobile-lamp-glow)" />
            <rect className={styles.socket} x="-5.5" y="-3" width="11" height="6.5" rx="2.5" />
            <path
              className={styles.bulbBody}
              d="M-8.5 4C-8.5 3 -5.5 2 0 2C5.5 2 8.5 3 8.5 4C10 8.8 10.4 13.5 8.5 18C6.8 22.2 3.8 24 0 24C-3.8 24 -6.8 22.2 -8.5 18C-10.4 13.5 -10 8.8 -8.5 4Z"
              fill={dark ? "url(#mobile-lamp-bulb-off)" : "url(#mobile-lamp-bulb-on)"}
            />
            <path className={styles.filament} d="M-3 8.8c0 3.6 1.4 5.4 3 5.4s3-1.8 3-5.4" strokeWidth="1.5" strokeLinecap="round" />
          </g>
        </g>

        {/* Generous touch/pointer hit target kept last in paint order */}
        <circle
          className={styles.hitArea}
          cx={KNOT.x}
          cy={KNOT.y + 10}
          r="36"
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
