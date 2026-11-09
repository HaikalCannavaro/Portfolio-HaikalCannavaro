"use client";

import { useRef, useState } from "react";
import { ProjectCard, type ProjectCardProps } from "./ProjectCard";
import useMotionAllowed from "../../hooks/useMotionAllowed";
import styles from "./Work.module.css";

export default function ProjectShowcase({ projects }: { projects: ProjectCardProps[] }) {
  const rail = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const motionAllowed = useMotionAllowed();

  function select(index: number) {
    const container = rail.current;
    const card = container?.children[index] as HTMLElement | undefined;
    if (!container || !card) return;
    container.scrollTo({ left: card.offsetLeft,
      behavior: motionAllowed ? "smooth" : "instant" });
  }

  return (
    <div className={styles.showcase}>
      <p className={styles.swipeHint}>Swipe to explore <span aria-hidden="true">↔</span></p>
      <div ref={rail} className={styles.projectGrid} id="featured-projects"
        onScroll={() => {
          const container = rail.current;
          if (!container) return;
          const distances = Array.from(container.children).map((card) =>
            Math.abs((card as HTMLElement).offsetLeft - container.scrollLeft));
          setActive(distances.indexOf(Math.min(...distances)));
        }}>
        {projects.map((project) => (
          <div className={styles.projectSlide} key={project.title}>
            <ProjectCard {...project} />
          </div>
        ))}
      </div>
      <div className={styles.projectControls} aria-label="Choose featured project">
        <span aria-live="polite" aria-atomic="true">{String(active + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</span>
        <div>{projects.map((project, index) => (
          <button key={project.title} type="button" onClick={() => select(index)}
            aria-label={`Show ${project.title}`} aria-current={active === index ? "true" : undefined}
            aria-controls="featured-projects"><span /></button>
        ))}</div>
      </div>
    </div>
  );
}
