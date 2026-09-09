"use client";

import React from "react";
import styles from "../blog.module.css";
import AnimateHeading from "../../../components/about/Heading";
import { useRouter } from "next/navigation";

export default function FoxLoggerCaseStudy() {
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

                    <AnimateHeading title="AI Agent Optimization at FoxLogger" className={styles.titleText} delay={0.2} />

                    <div className={styles.metadataRow}>
                        <span className={styles.metaPill}>IT Intern</span>
                        <span className={styles.metaPill}>Prompt Engineering</span>
                        <span className={styles.metaPill}>Semantic Routing</span>
                        <span className={styles.metaPill}>LLM</span>
                        <span className={styles.metaDate}>July 2026 - September 2026</span>
                    </div>
                </div>
            </section>

            {/* CONTENT SECTION */}
            <article className={styles.articleContent}>

                {/* GAMBAR HERO */}
                <div className={styles.heroImageWrapper}>
                    {/* Siapin gambar ilustrasi AI, prompt, atau logo perusahaan di sini */}
                    <img
                        src="../../image/operon.png"
                        alt="FoxLogger AI Agent Workflow"
                        className={styles.heroImage}
                    />
                </div>

                {/* 1. ROLE OVERVIEW */}
                <div className={styles.contentBlock}>
                    <h2 className={styles.sectionTitle}>1. Role Overview</h2>
                    <p className={styles.paragraph}>
                        During my internship at <strong>FoxLogger</strong>, I was entrusted with the critical task of refining and expanding the capabilities of the company's internal AI Agent. Rather than focusing purely on application development, my primary responsibility revolved around <strong>Prompt Engineering</strong> and perfecting the semantic layers that bridge natural language with strict system commands.
                    </p>
                </div>

                {/* 2. THE PROBLEM */}
                <div className={styles.contentBlock}>
                    <h2 className={styles.sectionTitle}>2. The Challenge: Hallucinations & Intent Accuracy</h2>
                    <p className={styles.paragraph}>
                        When dealing with Enterprise AI Agents, one of the biggest hurdles is ensuring that the Large Language Model (LLM) understands complex user requests without hallucinating or generating invalid data structures.
                    </p>
                    <p className={styles.paragraph}>
                        The system needed to accurately translate natural language inputs from users into highly structured outputs—specifically <strong>JSON schemas and SQL queries</strong>—to perform automated tasks and database retrievals safely. A slight misunderstanding in the prompt could lead to broken automation workflows or incorrect data fetching.
                    </p>
                </div>

                {/* 3. APPROACH & METHODOLOGY */}
                <div className={styles.contentBlock}>
                    <h2 className={styles.sectionTitle}>3. Approach: Semantic Routing & SDLC</h2>
                    <p className={styles.paragraph}>
                        To solve this, I applied a systematic Software Development Life Cycle (SDLC) tailored specifically for AI model interactions. My daily workflow consisted of:
                    </p>
                    <ul className={styles.bulletList}>
                        <li>
                            <strong>Requirements Gathering:</strong> Collaborating with users and stakeholders to understand the exact data they needed the AI to fetch or the specific tasks they wanted automated.
                        </li>
                        <li>
                            <strong>Prompt Prototyping & Iteration:</strong> I heavily iterated on system prompts. This involved tweaking the context window, explicitly defining boundaries (guardrails), and writing few-shot examples to guide the LLM's reasoning process.
                        </li>
                        <li>
                            <strong>Fixing the Semantic Layer:</strong> I implemented semantic routing techniques to ensure the AI could reliably decide *when* to execute a specific tool or SQL query based on the user's intent. By strictly defining output schemas, I drastically reduced formatting errors.
                        </li>
                    </ul>
                </div>

                {/* 4. OUTCOMES */}
                <div className={styles.contentBlock}>
                    <h2 className={styles.sectionTitle}>4. Outcomes & Impact</h2>
                    <p className={styles.paragraph}>
                        Through rigorous "try, prompt, and fix" cycles, the AI Agent's reliability improved significantly. The semantic layer became robust enough to consistently output valid JSON structures and precise SQL queries, allowing the backend systems to parse the AI's intent without failing.
                    </p>
                    <p className={styles.paragraph}>
                        This internship gave me profound, hands-on experience in the rapidly growing field of AI-Assisted Development, proving that engineering effective prompts is just as critical as writing the underlying code itself.
                    </p>
                </div>

                {/* ACTION BUTTONS */}
                <div className={styles.actionButtons}>
                    <a href="https://foxlogger.com" target="_blank" rel="noopener noreferrer" className={styles.primaryBtn}>
                        Visit FoxLogger
                    </a>
                </div>

            </article>
        </main>
    );
}
