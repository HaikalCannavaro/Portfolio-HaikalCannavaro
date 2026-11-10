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
          <p className={styles.eyebrow}>PROJECT NOTES / 03</p>
          <h1 className={styles.titleText}>SIMASU, on the move.</h1>
          <p className={styles.intro}>
            A mobile companion for the Masjid Syamsul Ulum ecosystem.
          </p>
          <div className={styles.metadataRow}>
            <span className={styles.metaPill}>Flutter</span>
            <span className={styles.metaPill}>Dart</span>
            <span className={styles.metaPill}>REST API</span>
            <span className={styles.metaDate}>2024</span>
          </div>
        </div>
      </header>
      <article className={styles.articleContent}>
        <nav className={styles.chapterNav} aria-label="On this page">
          <span>IN THIS STORY</span>
          <a href="#chapter-1">1/ The project</a>
          <a href="#chapter-2">2/ The approach</a>
          <a href="#chapter-3">3/ A connected ecosystem</a>
        </nav>
        <div className={styles.heroImageWrapper}>
          <Image
            width={1400}
            height={900}
            sizes="(max-width:768px) 90vw, 65vw"
            src="/image/SIMASU-Mobile.png"
            alt="SIMASU, on the move."
            className={styles.heroImage}
          />
        </div>
        <section className={styles.contentBlock}>
          <h2 id="chapter-1" className={styles.sectionTitle}>
            1/ The project
          </h2>
          <p className={styles.paragraph}>
            Built the mobile counterpart for SIMASU, bringing mosque schedules
            and administrative tools into an experience designed for access on
            the go.
          </p>
        </section>
        <section className={styles.contentBlock}>
          <h2 id="chapter-2" className={styles.sectionTitle}>
            2/ The approach
          </h2>
          <p className={styles.paragraph}>
            The application uses Flutter and Dart for its mobile interface and
            connects to the SIMASU ecosystem through a REST API.
          </p>
        </section>
        <section className={styles.contentBlock}>
          <h2 id="chapter-3" className={styles.sectionTitle}>
            3/ A connected ecosystem
          </h2>
          <p className={styles.paragraph}>
            The web and mobile projects explore two ways of accessing the same
            community platform: a web-based management system and a mobile
            companion.
          </p>
        </section>
        <div className={styles.actionButtons}>
          <Link href="/blog/simasu-web" className={styles.primaryBtn}>
            Explore the web companion ↗
          </Link>
        </div>
        <Link href="/projects" className={styles.collectionLink}>
          Keep exploring the collection <span>↗</span>
        </Link>
      </article>
    </main>
  );
}
