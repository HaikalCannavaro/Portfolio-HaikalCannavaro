import Link from "next/link";
import { ProjectCard } from "../../components/work/ProjectCard";
import { projects } from "../../components/work/projects";
import styles from "./Projects.module.css";

export default function ProjectsPage() {
  return (
    <main className={styles.mainContainer}>
      <header className={styles.headerSection}>
        <div className={styles.headerWrapper}>
          <Link href="/#work" prefetch={false} className={`${styles.backBtn} ${styles.desktopBack}`}>
            <span className={styles.backArrow} aria-hidden="true">←</span>
            Back to selected work
          </Link>
          <Link href="/#m-work" prefetch={false} className={`${styles.backBtn} ${styles.mobileBack}`}>
            <span className={styles.backArrow} aria-hidden="true">←</span>
            Back to selected work
          </Link>
          <h1 className={styles.titleText}>All Projects</h1>
          <p className={styles.subtitleText}>
            A complete collection of my web applications, tools, and professional work.
          </p>
        </div>
      </header>

      <section className={styles.gallerySection} aria-label="Projects">
        <div className={styles.projectGrid}>
          {projects.map((project) => <ProjectCard key={project.title} {...project} />)}
        </div>
      </section>
    </main>
  );
}
