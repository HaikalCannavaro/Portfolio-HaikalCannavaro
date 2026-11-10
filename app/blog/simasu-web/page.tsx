"use client";

import React from "react";
import styles from "../blog.module.css";
import ProjectBackLink from "../../../components/projects/ProjectBackLink";
import ProjectNavigation from "../../../components/projects/ProjectNavigation";
import Link from "next/link";
import Image from "next/image";

export default function SimasuWebCaseStudy() {
  return (
    <main className={styles.mainContainer}>
      <ProjectNavigation />

      {/* HEADER SECTION */}
      <section className={styles.headerSection}>
        <div className={styles.headerWrapper}>
          <ProjectBackLink className={styles.backBtn} />

          <p className={styles.eyebrow}>PROJECT NOTES / 02</p>
          <h1 className={styles.titleText}>
            SIMASU: Modernizing Mosque Management
          </h1>

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
        <nav className={styles.chapterNav} aria-label="On this page">
          <span>IN THIS STORY</span>
          <a href="#chapter-1">1/ Project Overview</a>
          <a href="#chapter-2">2/ The Challenge</a>
          <a href="#chapter-3">3/ Approach & Architecture</a>
          <a href="#chapter-4">4/ Technical Execution & DevOps</a>
          <a href="#chapter-5">5/ Outcomes & Lessons Learned</a>
        </nav>

        {/* GAMBAR HERO */}
        <div className={styles.heroImageWrapper}>
          <Image
            width={1400}
            height={900}
            sizes="(max-width:768px) 90vw, 65vw"
            src="/image/SIMASU-Web.png"
            alt="SIMASU Web Dashboard"
            className={styles.heroImage}
          />
        </div>

        {/* 1. PROJECT OVERVIEW */}
        <div className={styles.contentBlock}>
          <h2 id="chapter-1" className={styles.sectionTitle}>
            1/ Project Overview
          </h2>
          <p className={styles.paragraph}>
            <strong>Sistem Informasi Masjid Syamsul Ulum (SIMASU)</strong> is a
            comprehensive ecosystem designed to transition manual, paper-based
            mosque administration into a fully digital and centralized platform.
          </p>
          <p className={styles.paragraph}>
            The system handles crucial workflows including inventory tracking,
            room bookings, event scheduling, announcements, and administrative
            file uploads. My goal was to create a solution that is robust enough
            for complex data management, yet accessible for the mosque
            administrators.
          </p>
        </div>

        {/* 2. THE PROBLEM */}
        <div className={styles.contentBlock}>
          <h2 id="chapter-2" className={styles.sectionTitle}>
            2/ The Challenge
          </h2>
          <p className={styles.paragraph}>
            Mosque administrators faced significant bottlenecks due to
            decentralized data storage. Scheduling overlaps for room usage,
            untracked inventory assets, and delayed information dissemination
            were common occurrences.
          </p>
          <p className={styles.paragraph}>
            Furthermore, the system needed to serve two different clients in the
            future: a web dashboard for administrators and a mobile application
            for congregations. This meant a traditional tightly-coupled monolith
            architecture would not scale effectively for our needs.
          </p>
        </div>

        {/* 3. APPROACH & ARCHITECTURE */}
        <div className={styles.contentBlock}>
          <h2 id="chapter-3" className={styles.sectionTitle}>
            3/ Approach & Architecture
          </h2>
          <p className={styles.paragraph}>
            To solve the cross-platform requirement, I decided to adopt a{" "}
            <strong>decoupled architecture</strong>.
          </p>
          <ul className={styles.bulletList}>
            <li>
              <strong>Headless Backend API (Node.js & Express):</strong> I
              developed a dedicated REST API handling authentication (JWT),
              routing, and logic via Sequelize ORM with a lightweight SQLite
              persistence layer. This API serves as the single source of truth
              for both the web and mobile apps.
            </li>
            <li>
              <strong>Web Client (Laravel):</strong> Instead of building a heavy
              SPA, I utilized Laravel for the frontend dashboard. It
              communicates directly with the Node.js API to render Blade views,
              keeping the presentation layer secure, fast, and easy to maintain.
            </li>
          </ul>
        </div>

        {/* 4. TECHNICAL EXECUTION & DEVOPS */}
        <div className={styles.contentBlock}>
          <h2 id="chapter-4" className={styles.sectionTitle}>
            4/ Technical Execution & DevOps
          </h2>
          <p className={styles.paragraph}>
            A major part of this project was ensuring smooth collaboration and
            safe deployments. I implemented a solid{" "}
            <strong>DevOps CI/CD pipeline</strong> using GitHub Actions.
          </p>
          <p className={styles.paragraph}>
            This pipeline automates code quality checks, ensures the Swagger UI
            documentation is correctly generated, and prevents breaking changes
            in the API from affecting the Laravel frontend. The use of `.env`
            configurations and `.gitignore` safety measures ensures that runtime
            artifacts and SQLite binaries are securely excluded from the
            repository.
          </p>
        </div>

        {/* 5. CONCLUSION */}
        <div className={styles.contentBlock}>
          <h2 id="chapter-5" className={styles.sectionTitle}>
            5/ Outcomes & Lessons Learned
          </h2>
          <p className={styles.paragraph}>
            SIMASU successfully modernized the administrative workflow of the
            mosque. The decoupled architecture proved to be highly advantageous
            when we began development on the Flutter mobile counterpart, as the
            API endpoints were already documented (via Swagger) and ready for
            integration.
          </p>
          <p className={styles.paragraph}>
            This project significantly enhanced my skills in API design,
            microservice-like architecture patterns, and automated deployment
            strategies.
          </p>
        </div>

        {/* ACTION BUTTONS */}
        <div className={styles.actionButtons}>
          <a
            href="https://github.com/HaikalCannavaro/SIMASU-Web-Devops"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.primaryBtn}
          >
            View Web Repo
          </a>
          <a
            href="https://github.com/IndraYuda13/APITubes2"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondaryBtn}
          >
            View API Repo
          </a>
        </div>

        <Link href="/projects" className={styles.collectionLink}>
          Keep exploring the collection <span>↗</span>
        </Link>
      </article>
    </main>
  );
}
