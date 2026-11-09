"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./ToolCard.module.css";
import { toolPalettes } from "./toolPalettes";

const WIDTH = 280;
const HEIGHT = 140;
const STEP = 1.25;
const DURATION = 950;
type Pixel = { x: number; y: number; r: number; g: number; b: number };
type Pair = { from: Pixel; to: Pixel };

// Scan the actual painted pixels, rather than substituting a generic logo shape.
function pixels(context: CanvasRenderingContext2D): Pixel[] {
  const { data } = context.getImageData(0, 0, WIDTH, HEIGHT);
  const result: Pixel[] = [];
  for (let x = 0; x < WIDTH; x += STEP) {
    for (let y = 0; y < HEIGHT; y += STEP) {
      const i = (Math.floor(y) * WIDTH + Math.floor(x)) * 4;
      if (data[i + 3] > 100) {
        result.push({ x, y, r: data[i], g: data[i + 1], b: data[i + 2] });
      }
    }
  }
  return result;
}

// Ordered transport keeps nearby points together as the narrow logo widens
// into the word. Every particle has both an icon and a glyph destination.
function pairPixels(icon: Pixel[], word: Pixel[]): Pair[] {
  const count = Math.max(icon.length, word.length);
  return Array.from({ length: count }, (_, i) => ({
    from: icon[
      Math.min(icon.length - 1, Math.floor((i * icon.length) / count))
    ],
    to: word[Math.min(word.length - 1, Math.floor((i * word.length) / count))],
  }));
}

export default function ParticleMorph({
  name,
  src,
  active,
  onReady,
}: {
  name: string;
  src: string;
  active: boolean;
  onReady: (ready: boolean) => void;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  const aim = useRef(active);
  const wake = useRef<() => void>(() => {});
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const query = matchMedia(
      "(min-width: 769px) and (hover: hover) and (pointer: fine)",
    );
    const sync = () => setEnabled(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    aim.current = active;
    wake.current();
  }, [active]);

  useEffect(() => {
    onReady(false);
    if (!enabled || !ref.current) return;
    const canvas = ref.current;
    const context = canvas.getContext("2d");
    if (!context) return;
    const ratio = Math.min(devicePixelRatio || 1, 2);
    canvas.width = WIDTH * ratio;
    canvas.height = HEIGHT * ratio;
    context.scale(ratio, ratio);
    const sample = document.createElement("canvas");
    sample.width = WIDTH;
    sample.height = HEIGHT;
    const ctx = sample.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;
    const icon = new window.Image();
    const reduce = matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let disposed = false;
    let pairs: Pair[] = [];
    let progress = 0;
    let last = 0;
    let ink = "#22221e";
    let family = "Arial, sans-serif";
    let font = "800 30px Arial, sans-serif";
    let wordWidth = 200;
    let palette = [ink, ink];
    let loaded = false;
    const monochrome = /\/(github|prisma)\.svg$/.test(src);
    const drawIcon = (target: CanvasRenderingContext2D) => {
      target.drawImage(icon, (WIDTH - 76) / 2, (HEIGHT - 76) / 2, 76, 76);
      if (monochrome) {
        target.globalCompositeOperation = "source-in";
        target.fillStyle = ink;
        target.fillRect(0, 0, WIDTH, HEIGHT);
        target.globalCompositeOperation = "source-over";
      }
    };
    const drawWord = (target: CanvasRenderingContext2D) => {
      target.font = font;
      target.textAlign = "center";
      target.textBaseline = "middle";
      const gradient = target.createLinearGradient(
        (WIDTH - wordWidth) / 2,
        0,
        (WIDTH + wordWidth) / 2,
        0,
      );
      palette.forEach((color, index) =>
        gradient.addColorStop(index / (palette.length - 1), color),
      );
      target.fillStyle = gradient;
      target.fillText(name, WIDTH / 2, HEIGHT / 2 + 2);
    };
    const paint = () => {
      context.clearRect(0, 0, WIDTH, HEIGHT);
      // Render exact artwork at rest; the traveling particles occupy its same pixels.
      if (progress <= 0) drawIcon(context);
      else if (progress >= 1) drawWord(context);
      else {
        const eased =
          progress *
          progress *
          progress *
          (progress * (progress * 6 - 15) + 10);
        const wave = Math.sin(Math.PI * eased);
        for (const { from, to } of pairs) {
          const bend = Math.sin((from.x / WIDTH) * Math.PI * 2) * 5 * wave;
          const x = from.x + (to.x - from.x) * eased;
          const y = from.y + (to.y - from.y) * eased + bend;
          const r = Math.round(from.r + (to.r - from.r) * eased);
          const g = Math.round(from.g + (to.g - from.g) * eased);
          const b = Math.round(from.b + (to.b - from.b) * eased);
          context.fillStyle = `rgb(${r},${g},${b})`;
          context.fillRect(
            x - STEP / 2,
            y - STEP / 2,
            STEP + 0.45,
            STEP + 0.45,
          );
        }
      }
      canvas.dataset.morphProgress = progress.toFixed(3);
    };
    const tick = (time: number) => {
      frame = 0;
      if (!loaded || disposed) return;
      const target = aim.current ? 1 : 0;
      const delta = last ? Math.min(time - last, 40) / DURATION : 0;
      last = time;
      progress = reduce.matches
        ? target
        : Math.max(0, Math.min(1, progress + (target ? delta : -delta)));
      paint();
      if (progress !== target) frame = requestAnimationFrame(tick);
      else last = 0;
    };
    const start = () => {
      if (loaded && !frame && !disposed) frame = requestAnimationFrame(tick);
    };
    wake.current = start;
    const prepare = () => {
      if (disposed || !icon.complete || !icon.naturalWidth) return;
      ink = getComputedStyle(canvas).color;
      family = getComputedStyle(canvas).fontFamily;
      const dark = document.documentElement.dataset.theme === "dark";
      palette = toolPalettes[name]?.[dark ? "dark" : "light"] ?? [ink, ink];
      ctx.clearRect(0, 0, WIDTH, HEIGHT);
      drawIcon(ctx);
      const from = pixels(ctx);
      ctx.clearRect(0, 0, WIDTH, HEIGHT);
      ctx.font = `800 30px ${family}`;
      const size = Math.min(
        30,
        (30 * 244) / Math.max(1, ctx.measureText(name).width),
      );
      font = `800 ${size}px ${family}`;
      ctx.font = font;
      wordWidth = ctx.measureText(name).width;
      drawWord(ctx);
      const to = pixels(ctx);
      if (!from.length || !to.length) return;
      pairs = pairPixels(from, to);
      loaded = true;
      canvas.dataset.particles = String(pairs.length);
      paint();
      onReady(true);
      start();
    };
    icon.onload = () => {
      // Load the primary face only: an unavailable optional local fallback must
      // not reject the whole promise before the bundled face finishes loading.
      const fontFamily = getComputedStyle(canvas).fontFamily.split(",")[0].trim();
      const requestedFont = `800 30px ${fontFamily}`;
      document.fonts.load(requestedFont, name).then(
        (faces) => {
          canvas.dataset.fontReady = String(document.fonts.check(requestedFont, name));
          canvas.dataset.fontFaces = String(faces.length);
          canvas.dataset.fontFamily = fontFamily;
          prepare();
        },
        () => {
          canvas.dataset.fontReady = "false";
          prepare();
        },
      );
    };
    icon.onerror = () => onReady(false);
    icon.src = src;
    reduce.addEventListener("change", start);
    const theme = new MutationObserver(prepare);
    theme.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      theme.disconnect();
      reduce.removeEventListener("change", start);
      icon.onload = null;
      icon.onerror = null;
      wake.current = () => {};
    };
  }, [enabled, name, src, onReady]);

  return <canvas ref={ref} className={styles.canvas} aria-hidden="true" />;
}
