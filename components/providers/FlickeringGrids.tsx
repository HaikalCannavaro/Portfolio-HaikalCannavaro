"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styles from "./FlickeringGrids.module.css";

interface FlickeringGridProps {
  squareSize?: number;
  gridGap?: number;
  flickerChance?: number;
  color?: string;
  maxOpacity?: number;
}

const FlickeringGrid: React.FC<FlickeringGridProps> = ({
  squareSize = 4,
  gridGap = 6,
  flickerChance = 0.3,
  color = "rgb(0, 0, 0)",
  maxOpacity = 0.3,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isInView, setIsInView] = useState(false);

  // Memoized RGBA color
  const memoizedColor = useMemo(
    () => `rgba(${color.replace("rgb(", "").replace(")", "")},`,
    [color]
  );

  // Function to setup canvas
  const setupCanvas = useCallback((canvas: HTMLCanvasElement) => {
    const dpr = window.devicePixelRatio || 1;
    const width = window.innerWidth;
    const height = window.innerHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    const ctx = canvas.getContext("2d")!;
    ctx.scale(dpr, dpr);

    const cols = Math.floor(width / (squareSize + gridGap));
    const rows = Math.floor(height / (squareSize + gridGap));
    const squares = new Float32Array(cols * rows).fill(0);

    return { ctx, cols, rows, squares };
  }, [squareSize, gridGap]);

  // Animation logic
  const animate = useCallback(
    (ctx: CanvasRenderingContext2D, cols: number, rows: number, squares: Float32Array) => {
      for (let i = 0; i < squares.length; i++) {
        // Flicker logic
        squares[i] = Math.random() < flickerChance ? Math.random() * maxOpacity : squares[i];
      }

      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const opacity = squares[i * rows + j];
          ctx.fillStyle = `${memoizedColor}${opacity})`;
          ctx.fillRect(
            i * (squareSize + gridGap),
            j * (squareSize + gridGap),
            squareSize,
            squareSize
          );
        }
      }

      if (isInView) {
        requestAnimationFrame(() => animate(ctx, cols, rows, squares));
      }
    },
    [squareSize, gridGap, flickerChance, memoizedColor, maxOpacity, isInView]
  );

  // Intersection Observer to pause animation when not in view
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const { ctx, cols, rows, squares } = setupCanvas(canvas);
    animate(ctx, cols, rows, squares);

    const resizeHandler = () => {
      const { ctx, cols, rows, squares } = setupCanvas(canvas);
      animate(ctx, cols, rows, squares);
    };

    // Observe canvas visibility
    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
    });

    observer.observe(canvas);
    window.addEventListener("resize", resizeHandler);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", resizeHandler);
    };
  }, [setupCanvas, animate]);

  return (
    <div className={styles.container}>
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  );
};

export default FlickeringGrid;
