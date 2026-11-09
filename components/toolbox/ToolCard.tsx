"use client";

import { useState } from "react";
import localFont from "next/font/local";
import ParticleMorph from "./ParticleMorph";
import Image from "next/image";
import styles from "./ToolCard.module.css";
const toolboxDisplay = localFont({
  src: "../../app/fonts/SyneVariable.woff2",
  variable: "--toolbox-type",
  weight: "400 800",
  display: "swap",
});
const tools: Record<string, string> = {
  HTML: "html5",
  CSS: "css3",
  JavaScript: "javascript",
  "Tailwind CSS": "tailwindcss",
  Figma: "figma",
  "Node.js": "nodejs",
  Laravel: "laravel",
  MySQL: "mysql",
  Prisma: "prisma",
  Go: "go",
  Java: "java",
  Postman: "postman",
  Flutter: "flutter",
  Blender: "blender",
  "C++": "cplusplus",
  "C#": "csharp",
  Git: "git",
  GitHub: "github",
};
export default function ToolCard({
  name,
  interactive = false,
}: {
  name: string;
  interactive?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [ready, setReady] = useState(false);
  return (
    <div
      className={`${toolboxDisplay.variable} ${styles.card} ${interactive ? styles.interactive : ""}`}
      data-morph-ready={interactive && ready}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      tabIndex={interactive ? 0 : undefined}
      role="group"
      aria-label={name}
    >
      {interactive && (
        <ParticleMorph
          name={name}
          src={`/tool-icons/${tools[name]}.svg`}
          active={hovered || focused}
          onReady={setReady}
        />
      )}
      <div className={styles.icon} aria-hidden="true">
        <Image
          src={`/tool-icons/${tools[name]}.svg`}
          width={48}
          height={48}
          alt=""
        />
      </div>
      <div className={styles.label} aria-hidden="true">
        <h3>{name}</h3>
        <p>IN MY TOOLBOX</p>
      </div>
    </div>
  );
}
