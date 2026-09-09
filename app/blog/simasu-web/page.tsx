"use client";

import React from "react";
import styles from "../blog.module.css";
import AnimateHeading from "../../../components/about/Heading";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SimasuWebCaseStudy() {
    const router = useRouter();

    return (
        <main className={styles.mainContainer}>

            {/* HEADER SECTION */}
            <section className={styles.headerSection}>
                <div className={styles.headerWrapper}>
                    <button onClick={() => router.back()} className={styles.backBtn}>
                        <span className={styles.backArrow}>←</span>
                        <span>Back to Projects</span>
                    </button>

                    <AnimateHeading title="SIMASU: Modernizing Mosque Management" className={styles.titleText} delay={0.2} />

                    <div className={styles.metadataRow}>
                        <span className={styles.metaPill}>Laravel</span>
                        <span className={styles.metaPill}>Node.js API</span>
                        <span className={styles.metaPill}>SQLite</span>
                        <span className={styles.metaPill}>DevOps & CI/CD</span>
                        <span className={styles.metaDate}>Completed in 2024</span>
                    </div>
                </div>
            </section>

            {/* CONTENT SECTION */}
            <article className={styles.articleContent}>

                {/* GAMBAR HERO */}
                <div className={styles.heroImageWrapper}>
                    <img
                        src="../../image/SIMASU-Web.png"
                        alt="SIMASU Web Dashboard"
                        className={styles.heroImage}
                    />
                </div>

                {/* 1. PROJECT OVERVIEW */}
                <div className={styles.contentBlock}>
                    <h2 className={styles.sectionTitle}>1. Project Overview</h2>
                    <p className={styles.paragraph}>
                        <strong>Sistem Informasi Masjid Syamsul Ulum (SIMASU)</strong> is a comprehensive ecosystem designed to transition manual, paper-based mosque administration into a fully digital and centralized platform.
                    </p>
                    <p className={styles.paragraph}>
                        The system handles crucial workflows including inventory tracking, room bookings, event scheduling, announcements, and administrative file uploads. My goal was to create a solution that is robust enough for complex data management, yet accessible for the mosque administrators.
                    </p>
                </div>

                {/* 2. THE PROBLEM */}
                <div className={styles.contentBlock}>
                    <h2 className={styles.sectionTitle}>2. The Challenge</h2>
                    <p className={styles.paragraph}>
                        Mosque administrators faced significant bottlenecks due to decentralized data storage. Scheduling overlaps for room usage, untracked inventory assets, and delayed information dissemination were common occurrences.
                    </p>
                    <p className={styles.paragraph}>
                        Furthermore, the system needed to serve two different clients in the future: a web dashboard for administrators and a mobile application for congregations. This meant a traditional tightly-coupled monolith architecture would not scale effectively for our needs.
                    </p>
                </div>

                {/* 3. APPROACH & ARCHITECTURE */}
                <div className={styles.contentBlock}>
                    <h2 className={styles.sectionTitle}>3. Approach & Architecture</h2>
                    <p className={styles.paragraph}>
                        To solve the cross-platform requirement, I decided to adopt a <strong>decoupled architecture</strong>.
                    </p>
                    <ul className={styles.bulletList}>
                        <li>
                            <strong>Headless Backend API (Node.js & Express):</strong> I developed a dedicated REST API handling authentication (JWT), routing, and logic via Sequelize ORM with a lightweight SQLite persistence layer. This API serves as the single source of truth for both the web and mobile apps.
                        </li>
                        <li>
                            <strong>Web Client (Laravel):</strong> Instead of building a heavy SPA, I utilized Laravel for the frontend dashboard. It communicates directly with the Node.js API to render Blade views, keeping the presentation layer secure, fast, and easy to maintain.
                        </li>
                    </ul>
                </div>

                {/* 4. TECHNICAL EXECUTION & DEVOPS */}
                <div className={styles.contentBlock}>
                    <h2 className={styles.sectionTitle}>4. Technical Execution & DevOps</h2>
                    <p className={styles.paragraph}>
                        A major part of this project was ensuring smooth collaboration and safe deployments. I implemented a solid <strong>DevOps CI/CD pipeline</strong> using GitHub Actions.
                    </p>
                    <p className={styles.paragraph}>
                        This pipeline automates code quality checks, ensures the Swagger UI documentation is correctly generated, and prevents breaking changes in the API from affecting the Laravel frontend. The use of `.env` configurations and `.gitignore` safety measures ensures that runtime artifacts and SQLite binaries are securely excluded from the repository.
                    </p>
                </div>

                {/* 5. CONCLUSION */}
                <div className={styles.contentBlock}>
                    <h2 className={styles.sectionTitle}>5. Outcomes & Lessons Learned</h2>
                    <p className={styles.paragraph}>
                        SIMASU successfully modernized the administrative workflow of the mosque. The decoupled architecture proved to be highly advantageous when we began development on the Flutter mobile counterpart, as the API endpoints were already documented (via Swagger) and ready for integration.
                    </p>
                    <p className={styles.paragraph}>
                        This project significantly enhanced my skills in API design, microservice-like architecture patterns, and automated deployment strategies.
                    </p>
                </div>

                {/* ACTION BUTTONS */}
                <div className={styles.actionButtons}>
                    <a href="https://github.com/HaikalCannavaro/SIMASU-Web-Devops" target="_blank" rel="noopener noreferrer" className={styles.primaryBtn}>
                        View Web Repo
                    </a>
                    <a href="https://github.com/IndraYuda13/APITubes2" target="_blank" rel="noopener noreferrer" className={styles.secondaryBtn}>
                        View API Repo
                    </a>
                </div>

            </article>
        </main>
    );
}
