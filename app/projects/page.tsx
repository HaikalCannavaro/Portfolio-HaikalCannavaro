"use client";
import React from "react";
import styles from "./Projects.module.css";
import { ProjectCard } from "../../components/work/ProjectCard";
import AnimateHeading from "../../components/about/Heading";

import Link from "next/link";
import { useRouter } from "next/navigation";
export default function ProjectsPage() {
    const router = useRouter();
    return (
        <main className={styles.mainContainer}>

            <section className={styles.headerSection}>
                <div className={styles.headerWrapper}>

                    <button onClick={() => router.back()} className={styles.backBtn}>
                        <span className={styles.backArrow}>←</span>
                        <span>Back to Home</span>
                    </button>


                    <AnimateHeading title="All Projects" className={styles.titleText} delay={0.2} />
                    <p className={styles.subtitleText}>
                        A complete collection of my web applications, tools, and professional work.
                    </p>
                </div>
            </section>

            {/* Bagian Grid Card (tetap sama) */}
            <section className={styles.gallerySection}>
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

                    <ProjectCard
                        title="Gary's Personal Portfolio"
                        dates="Aug 2026"
                        description="Developed a high-performance personal portfolio website focusing on seamless animations, modern UI/UX design, and optimized performance using React and CSS Modules."
                        tags={["Next.js", "Three.js", "GSAP", "Blender"]}
                        image="./image/Gary-Portfolio.png" /* Ganti sama screenshot portofolio si Gary */
                        storyHref="../../app/blog/gary-portfolio"
                    />
                </div>
            </section>

        </main>
    );
}
