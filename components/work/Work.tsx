import Link from "next/link";
import ProjectShowcase from "./ProjectShowcase";
import { projects } from "./projects";
import WorkRounded from "./WorkRounded";
import styles from "./Work.module.css";

const titleId = "work-title";

export default function Work() {
  return (
    <section id="work" aria-labelledby={titleId} className={styles.workSection}>
      <WorkRounded titleId={titleId} />
      <div className={styles.wrapper}>
        <div className={styles.workContent}>
          <h2 id={titleId} className={styles.title}>Experience &amp; Works</h2>
          <ProjectShowcase projects={projects.slice(0, 3)} />
          <div className={styles.viewMoreContainer}>
            <Link href="/projects" prefetch={false} className={styles.viewMoreBtn}>
              View More Projects <span className={styles.btnArrow} aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
