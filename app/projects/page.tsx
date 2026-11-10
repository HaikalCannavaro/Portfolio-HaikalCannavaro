"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { projects } from "../../components/work/projects";
import ProjectNavigation from "../../components/projects/ProjectNavigation";
import styles from "./Projects.module.css";
const categories = ["AI", "Web", "Mobile", "Web"];
const filters = ["All", "Web", "Mobile", "AI"];
export default function ProjectsPage() {
  const [filter, setFilter] = useState("All");
  const visible = projects
    .map((project, index) => ({ project, index }))
    .filter(({ index }) => filter === "All" || categories[index] === filter);
  return (
    <main className={styles.mainContainer}>
      <ProjectNavigation />
      <header className={styles.headerSection}>
        <div className={styles.eyebrow}>
          <span>THE COLLECTION / 01—04</span>
          <Link href="/">← Back to portfolio</Link>
        </div>
        <h1>
          Built with
          <br />
          <em>curiosity.</em>
          <span>({String(projects.length).padStart(2, "0")})</span>
        </h1>
        <div className={styles.headerBottom}>
          <p>
            Web experiences, community platforms, and AI experiments. Different
            challenges. The same drive to make things work.
          </p>
          <span>
            SELECTED PROJECTS
            <br />
            2024 — 2026
          </span>
        </div>
      </header>
      <section
        className={styles.gallerySection}
        aria-label="Project collection"
      >
        <div className={styles.filters}>
          <div role="group" aria-label="Filter projects">
            {filters.map((item) => (
              <button
                key={item}
                type="button"
                aria-pressed={filter === item}
                onClick={() => setFilter(item)}
              >
                {item}
                <span>
                  {item === "All"
                    ? projects.length
                    : categories.filter((category) => category === item).length}
                </span>
              </button>
            ))}
          </div>
          <p role="status">
            {visible.length} {visible.length === 1 ? "project" : "projects"}
          </p>
        </div>
        <div className={styles.projectGrid}>
          {visible.map(({ project, index }) => (
            <article key={project.title} className={styles.card}>
              <Link
                href={`${project.storyHref!}?from=all-projects`}
                className={styles.visual}
                aria-label={`Explore ${project.title}`}
              >
                <span className={styles.number}>
                  0{index + 1} / {categories[index]}
                </span>
                {project.image && (
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={1200}
                    height={750}
                    sizes="(max-width:768px) 90vw, 43vw"
                  />
                )}
                <span className={styles.arrow} aria-hidden="true">
                  ↗
                </span>
              </Link>
              <div className={styles.meta}>
                <span>{categories[index]} / CASE STUDY</span>
                <span>{project.dates}</span>
              </div>
              <h2>
                <Link href={`${project.storyHref!}?from=all-projects`}>{project.title}</Link>
              </h2>
              <p>{project.description}</p>
              <div className={styles.tags}>
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <Link className={styles.read} href={`${project.storyHref!}?from=all-projects`}>
                Explore the story <span aria-hidden="true">↗</span>
              </Link>
            </article>
          ))}
        </div>
      </section>
      <footer className={styles.footer}>
        <p>
          The next project
          <br />
          could be <em>ours.</em>
        </p>
        <a href="mailto:haikalcannavaro64@gmail.com">Let’s talk ↗</a>
        <Link href="/">Back to portfolio ↑</Link>
      </footer>
    </main>
  );
}
