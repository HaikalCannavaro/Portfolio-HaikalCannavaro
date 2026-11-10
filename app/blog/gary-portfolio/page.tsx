import Link from "next/link";
import Image from "next/image";
import ProjectBackLink from "../../../components/projects/ProjectBackLink";
import ProjectNavigation from "../../../components/projects/ProjectNavigation";
import styles from "../blog.module.css";
export default function CaseStudy() {
  return (
    <main className={styles.mainContainer}>
      <ProjectNavigation />
      <header className={styles.headerSection}>
        <div className={styles.headerWrapper}>
          <ProjectBackLink className={styles.backBtn} />
          <p className={styles.eyebrow}>PROJECT NOTES / 04</p>
          <h1 className={styles.titleText}>A digital first impression.</h1>
          <p className={styles.intro}>
            A personal portfolio built for Gary, with motion and visual detail
            at its core.
          </p>
          <div className={styles.metadataRow}>
            <span className={styles.metaPill}>Next.js</span>
            <span className={styles.metaPill}>Three.js</span>
            <span className={styles.metaPill}>GSAP</span>
            <span className={styles.metaPill}>Blender</span>
            <span className={styles.metaDate}>August 2026</span>
          </div>
        </div>
      </header>
      <article className={styles.articleContent}>
        <nav className={styles.chapterNav} aria-label="On this page">
          <span>IN THIS STORY</span>
          <a href="#chapter-1">1/ The project</a>
          <a href="#chapter-2">2/ The toolkit</a>
          <a href="#chapter-3">3/ The experience</a>
        </nav>
        <div className={styles.heroImageWrapper}>
          <Image
            width={1400}
            height={900}
            sizes="(max-width:768px) 90vw, 65vw"
            src="/image/Gary-Portfolio.png"
            alt="A digital first impression."
            className={styles.heroImage}
          />
        </div>
        <section className={styles.contentBlock}>
          <h2 id="chapter-1" className={styles.sectionTitle}>
            1/ The project
          </h2>
          <p className={styles.paragraph}>
            Developed a personal portfolio website focused on modern UI/UX
            design, seamless animations, and performance.
          </p>
        </section>
        <section className={styles.contentBlock}>
          <h2 id="chapter-2" className={styles.sectionTitle}>
            2/ The toolkit
          </h2>
          <p className={styles.paragraph}>
            The project brings together Next.js, Three.js, GSAP, and Blender,
            with React and CSS Modules supporting the interface.
          </p>
        </section>
        <section className={styles.contentBlock}>
          <h2 id="chapter-3" className={styles.sectionTitle}>
            3/ The experience
          </h2>
          <p className={styles.paragraph}>
            The focus is a cohesive personal presentation: a clear interface,
            considered animation, and a distinctive visual identity.
          </p>
        </section>
        <Link href="/projects" className={styles.collectionLink}>
          Keep exploring the collection <span>↗</span>
        </Link>
      </article>
    </main>
  );
}
