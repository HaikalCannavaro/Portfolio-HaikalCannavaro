import WorkRounded from "./WorkRounded";
import styles from "./Work.module.css";
import WorkTitle from "./WorkTitle";
import Link from "next/link";

// Kalo lu taro ProjectCard di folder yang sama
import { ProjectCard } from "./ProjectCard";

export default function Work() {
  return (
    <section
      id="work"
      className={styles.workSection}
    >
      <WorkRounded />
      <div className={styles.wrapper}>
        <div className={styles.workContent}>
          <WorkTitle title="Experience & Works" />

          {/* Ini bungkus Grid/Flex buat Card lu */}
          <div className={styles.projectGrid}>
            
            <ProjectCard
              title="IT Intern - AI Agent Optimization"
              dates="July 2026 - September 2026" /* Ganti sama periode lu magang */
              description="Interned at FoxLogger, specializing in prompt engineering and the refinement of the AI Agent's semantic layer. I applied a structured development lifecycle: gathering user requirements, designing prompt iterations, and refining structured outputs (SQL/JSON) to improve accuracy, reduce hallucinations, and ensure seamless intent translation."
              tags={["FoxLogger", "Prompt Engineering", "Semantic Routing", "SQL", "JSON"]}
              image="./image/foxlogger-intern.png"
              storyHref="/blog/foxlogger-internship" /* Opsional, hapus kalau gak perlu link */
            />
            <ProjectCard
              title="SIMASU Web (Sistem Informasi Masjid)"
              dates="2024"
              description="Developed a comprehensive web-based management system for Masjid Syamsul Ulum. It streamlines inventory, scheduling, and administrative tasks using modern backend architecture."
              tags={["Laravel", "PHP", "SQLite", "Tailwind CSS"]}
              image="./image/SIMASU-Web.png" /* Ganti sama path screenshot lu nanti */
              storyHref="/blog/simasu-web"
            />

            <ProjectCard
              title="Aplikasi Mobile SIMASU"
              dates="2024"
              description="Built the mobile counterpart for the SIMASU ecosystem. Designed to provide quick access to mosque schedules and administrative tools on the go."
              tags={["Flutter", "Dart", "REST API"]}
              image="./image/SIMASU-Mobile.png" /* Ganti sama path screenshot lu nanti */
              storyHref="../../app/blog/simasu-mobile"
            />
            

          </div>

          <div className={styles.viewMoreContainer}>
            {/* "/projects" ini rute tujuan lu nanti, lu bisa bikin folder app/projects/page.tsx */}
            <Link href="/projects" className={styles.viewMoreBtn}>
              View More Projects
              <span className={styles.btnArrow}>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
