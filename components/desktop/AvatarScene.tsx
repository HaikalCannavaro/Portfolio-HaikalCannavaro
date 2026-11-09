"use client";

import { Component, Suspense, useEffect, useRef, useState, type ReactNode, type RefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useInView } from "framer-motion";
import type { Group } from "three";
import useDesktopMotion from "../../hooks/useDesktopMotion";
import styles from "./DesktopPortfolio.module.css";

class SceneBoundary extends Component<{ children: ReactNode; onError: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onError(); }
  render() { return this.state.failed ? null : this.props.children; }
}

function Avatar({ animate, gaze, onReady }: { animate: boolean; gaze: RefObject<{ x: number; y: number }>; onReady: () => void }) {
  const { scene } = useGLTF("/models/haikal-avatar.glb");
  const group = useRef<Group>(null);
  useEffect(() => { onReady(); }, [onReady]);
  useFrame(({ clock }, delta) => {
    if (!group.current || !animate) return;
    const damp = 1 - Math.exp(-delta * 4);
    group.current.rotation.y += (gaze.current.x * .24 - group.current.rotation.y) * damp;
    group.current.rotation.x += (-gaze.current.y * .09 - group.current.rotation.x) * damp;
    group.current.position.y = Math.sin(clock.elapsedTime * 1.2) * .035;
  });
  return <group ref={group}><primitive object={scene} /></group>;
}

export default function AvatarScene() {
  const holder = useRef<HTMLDivElement>(null);
  const visible = useInView(holder, { margin: "100px" });
  const animate = useDesktopMotion();
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [reset, setReset] = useState(0);
  const [paused, setPaused] = useState(false);
  const moving = animate && visible && !paused;
  const gaze = useRef({ x: 0, y: 0 });
  const dragging = useRef(false);
  useEffect(() => {
    const neutral = () => { gaze.current = { x: 0, y: 0 }; };
    if (!moving) { neutral(); return; }
    // The GLB is a single textured mesh, not an eye rig. A restrained whole-portrait
    // turn gives it attention without distorting the face or painting fake eyes.
    const track = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || dragging.current || !holder.current) return;
      const bounds = holder.current.getBoundingClientRect();
      if (bounds.bottom < 0 || bounds.top > window.innerHeight) { neutral(); return; }
      gaze.current = {
        x: Math.max(-1, Math.min(1, (event.clientX - (bounds.left + bounds.width / 2)) / (window.innerWidth * .5))),
        y: Math.max(-1, Math.min(1, ((bounds.top + bounds.height * .35) - event.clientY) / (window.innerHeight * .5))),
      };
    };
    window.addEventListener("pointermove", track, { passive: true });
    window.addEventListener("blur", neutral);
    document.documentElement.addEventListener("pointerleave", neutral);
    return () => {
      window.removeEventListener("pointermove", track);
      window.removeEventListener("blur", neutral);
      document.documentElement.removeEventListener("pointerleave", neutral);
      neutral();
    };
  }, [moving]);
  const [readyCallback] = useState(() => () => setReady(true));
  return <div ref={holder} className={styles.avatarHolder}>
    {/* A real render of the same model remains available while loading or without WebGL. */}
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img className={styles.avatarPoster} src="/models/haikal-avatar-poster.png" alt="Haikal’s 3D self-portrait in a maroon hoodie" style={{ opacity: ready && !failed ? 0 : 1 }} />
    {!failed && visible && <SceneBoundary onError={() => setFailed(true)}><Canvas key={reset} className={styles.avatarCanvas} dpr={[1, 1.5]} camera={{ position: [0, .35, 5], fov: 36 }} frameloop={moving ? "always" : "demand"} gl={{ antialias: true, alpha: true }} onCreated={({ gl }) => { gl.setClearColor(0x000000, 0); }} fallback={<span className={styles.sceneFallback}>3D preview unavailable. Showing portrait.</span>}>
      <ambientLight intensity={1.5} /><directionalLight position={[-3, 4, 5]} intensity={2.1} /><directionalLight position={[3, 1, 2]} intensity={.7} />
      <Suspense fallback={null}><Avatar animate={moving} gaze={gaze} onReady={readyCallback} /></Suspense>
      <OrbitControls onStart={() => { dragging.current = true; gaze.current = { x: 0, y: 0 }; }} onEnd={() => { dragging.current = false; }} enableZoom={false} enablePan={false} enableDamping={moving} minPolarAngle={Math.PI / 2.8} maxPolarAngle={Math.PI / 1.7} target={[0, .05, 0]} rotateSpeed={.65} />
    </Canvas></SceneBoundary>}
    <div className={styles.avatarControls}><span>{failed ? "STATIC PORTRAIT" : !ready ? "PORTRAIT PREVIEW" : (moving ? "CURSOR FOLLOW · DRAG TO EXPLORE" : "DRAG TO EXPLORE")}</span><button type="button" onClick={() => { gaze.current = { x: 0, y: 0 }; dragging.current = false; setReady(false); setReset(v => v + 1); }} disabled={failed || !ready} aria-label="Reset 3D portrait view">↺</button><button type="button" disabled={failed || !ready} onClick={() => setPaused(v => !v)} aria-pressed={paused} aria-label={paused ? "Resume portrait motion" : "Pause portrait motion"}>{paused ? "Play" : "Pause"}</button></div>
  </div>;
}
