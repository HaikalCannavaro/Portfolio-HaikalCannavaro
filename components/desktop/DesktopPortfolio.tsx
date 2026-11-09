"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import ToolCard from "../toolbox/ToolCard";
import { FacetMark } from "../brand/BrandMarks";
import Link from "next/link";
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from "framer-motion";
import useDesktopMotion from "../../hooks/useDesktopMotion";
import { projects } from "../work/projects";
import styles from "./DesktopPortfolio.module.css";
import SceneTransition from "./SceneTransition";
import DesktopNavigation from "./DesktopNavigation";

const AvatarScene = dynamic(() => import("./AvatarScene"), { ssr: false });

const ease = [.22, 1, .36, 1] as const;
const names = ["Intelligence, refined.", "A connected community.", "The mosque, on the move.", "A digital first impression."];
const categories = ["AI / PROMPT ENGINEERING", "WEB / MANAGEMENT SYSTEM", "MOBILE / FLUTTER", "WEB / CREATIVE DEVELOPMENT"];
const stories = ["/blog/foxlogger-internship", "/blog/simasu-web", "/blog/simasu-mobile", "/blog/gary-portfolio"];
const groups = [
  { title: "Interfaces", note: "The part you see. The details you feel.", tools: ["HTML", "CSS", "JavaScript", "Tailwind CSS", "Figma"] },
  { title: "Systems", note: "The logic that makes everything work.", tools: ["Node.js", "Laravel", "MySQL", "Prisma", "Go", "Java", "Postman"] },
  { title: "Experiments", note: "New mediums. New possibilities.", tools: ["Flutter", "Blender", "C++", "C#", "Git", "GitHub"] },
];

export default function DesktopPortfolio() {
  const animate = useDesktopMotion();
  const hero = useRef<HTMLElement>(null);
  const [desktopReady, setDesktopReady] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(min-width: 769px)");
    const update = () => setDesktopReady(query.matches);
    update(); query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  const [skill, setSkill] = useState(0);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 110, damping: 30 });
  const { scrollYProgress: heroProgress } = useScroll({ target: hero, offset: ["start start", "end start"] });
  const portraitY = useTransform(heroProgress, [0, 1], [0, 110]);
  const titleX = useTransform(heroProgress, [0, 1], [0, -100]);
  const starRotate = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const reveal = { initial: false as const, animate: animate ? { opacity: .35, y: 28 } : { opacity: 1, y: 0 }, whileInView: { opacity: 1, y: 0 }, transition: { duration: animate ? .8 : 0, ease }, viewport: { once: true, amount: .12 } };

  return <div className={styles.desktop} data-motion={animate}>
    <motion.div className={styles.progress} style={{ scaleX: animate ? progress : scrollYProgress }} />
    <a className={styles.skip} href="#d-work">Skip to selected work</a>
    <DesktopNavigation />
    <main>
      <section id="d-home" ref={hero} className={styles.hero}>
        <div className={styles.eyebrow}><span><i /> CURIOUS BY NATURE. DEVELOPER BY DESIGN.</span><span>PORTFOLIO — SELECTED WORK</span></div>
        <motion.h1 style={animate ? { x: titleX } : undefined}><span>HAIKAL</span><span>CANNAVARO<span className={styles.titleDot} aria-hidden="true"><FacetMark /></span></span></motion.h1>
        <div className={styles.heroGrid}>
          <div className={styles.heroIntro}><span className={styles.micro}>IDEAS IN. IMPACT OUT.</span><p>I turn curious ideas into<br /><em>working digital experiences.</em></p><a className={styles.roundLink} href="#d-work"><span>Explore my work</span><b>↓</b></a></div>
          <div className={styles.heroCaption}><span>SOFTWARE ENGINEERING STUDENT</span><p>Thoughtful interfaces.<br />Purposeful systems.<br />Always something new to build.</p></div>
          <div className={styles.portraitStage}>
            <span className={styles.orbit} aria-hidden="true" />
            <motion.span className={styles.star} style={animate ? { rotate: starRotate } : undefined} aria-hidden="true"><FacetMark /></motion.span>
            <motion.div className={styles.avatarStage} style={animate ? { y: portraitY } : undefined}>
              {desktopReady && <AvatarScene />}
            </motion.div>
          </div>
        </div>
        <div className={styles.heroFoot}><span>WEB / MOBILE / AI</span><span>SCROLL TO EXPLORE ↓</span></div>
      </section>
      <div className={styles.ticker} aria-hidden="true"><div>{[0, 1].map(i => <span key={i}>CODE WITH CURIOSITY <b><FacetMark /></b> BUILD WITH INTENT <b><FacetMark /></b> MAKE IT MATTER <b><FacetMark /></b> </span>)}</div></div>
      <SceneTransition chapter="01" title="Selected work." subtitle="Ideas become experiences." tone="blue" />
      <section id="d-work" className={styles.work}>
        <div className={styles.sectionLabel}><span>01 / SELECTED WORK</span><span>A FEW THINGS I’VE BEEN BUILDING</span></div>
        <div className={styles.sectionHeading}><motion.h2 {...reveal}>Small details.<br /><em>Real impact.</em></motion.h2><p>From community platforms to AI agents.<br />Different challenges, the same curiosity.</p></div>
        <div className={styles.projects}>{projects.map((project, i) => <motion.article key={project.title} {...reveal} className={styles.project}>
          <Link prefetch={false} href={stories[i]} className={styles.projectVisual} aria-label={`Read about ${project.title}`}>
            <div className={styles.projectImage}>{project.image && <Image src={project.image} alt={project.title} fill sizes="(min-width: 769px) 45vw, 1px" />}</div><span className={styles.projectNumber}>0{i + 1}</span><span className={styles.projectArrow} aria-hidden="true">↗</span>
          </Link><div className={styles.projectMeta}><span>{categories[i]}</span><span>{project.dates}</span></div><h3><Link href={stories[i]} prefetch={false}>{names[i]}</Link></h3><p className={styles.projectName}>{project.title}</p><div className={styles.tags}>{project.tags.slice(0, 4).map(tag => <span key={tag}>{tag}</span>)}</div>
        </motion.article>)}</div>
        <Link className={styles.allProjects} href="/projects" prefetch={false}>View the full collection <span>↗</span></Link>
      </section>
      <SceneTransition chapter="02" title="Behind the code." subtitle="Meet the curious mind." tone="dark" />
      <section id="d-about" className={styles.about}>
        <div className={styles.sectionLabel}><span>02 / BEHIND THE CODE</span><span>A LITTLE ABOUT ME</span></div>
        <div className={styles.aboutGrid}><div><motion.span className={styles.aboutStar} style={animate ? { rotate: starRotate } : undefined} aria-hidden="true"><FacetMark /></motion.span><p className={styles.micro}>THINK. BUILD. LEARN. REPEAT.</p></div><div><motion.h2 {...reveal}>A curious mind.<br />A builder’s <em>instinct.</em></motion.h2><div className={styles.aboutCopy}><p>I’m Haikal, an aspiring software developer exploring the space between thoughtful interfaces and the systems that power them.</p><p>I use AI-assisted development to experiment, solve problems, and turn creative ideas into real digital products.</p></div><div className={styles.education}><span>2023 — PRESENT</span><div><h3>Telkom University Bandung</h3><p>B.Sc. in Software Engineering</p></div><span>↗</span></div><div className={styles.education}><span>2020 — 2023</span><div><h3>Pius Tegal Senior Highschool</h3><p>Science Major</p></div><span>↗</span></div></div></div>
      </section>
      <section id="d-skills" className={styles.skills}><div className={styles.sectionLabel}><span>03 / THE TOOLBOX</span><span>ALWAYS ADDING SOMETHING NEW</span></div><div className={styles.skillsGrid}><h2>Different tools.<br /><em>One mindset.</em></h2><div><div role="tablist" aria-label="Desktop skill categories" className={styles.tabs}>{groups.map((group, i) => <button type="button" role="tab" key={group.title} id={`d-skill-${i}`} aria-selected={skill === i} aria-controls="d-skill-panel" tabIndex={skill === i ? 0 : -1} onClick={() => setSkill(i)} onKeyDown={event => { if (["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) { event.preventDefault(); const next = event.key === "Home" ? 0 : event.key === "End" ? 2 : (i + (event.key === "ArrowRight" ? 1 : -1) + 3) % 3; setSkill(next); document.getElementById(`d-skill-${next}`)?.focus(); } }}>{group.title}<span>↗</span></button>)}</div><div role="tabpanel" id="d-skill-panel" aria-labelledby={`d-skill-${skill}`} className={styles.skillPanel}><p>{groups[skill].note}</p><AnimatePresence initial={false} mode="wait"><motion.div key={skill} className={styles.tools} initial={{ opacity: animate ? 0 : 1, y: animate ? 12 : 0 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: animate ? 0 : 1, y: animate ? -8 : 0 }} transition={{ duration: animate ? .2 : 0 }}>{groups[skill].tools.map(tool => <ToolCard key={tool} name={tool} interactive />)}</motion.div></AnimatePresence></div></div></div></section>
      <SceneTransition chapter="04" title="What’s next?" subtitle="Something we build together." tone="paper" />
      <footer id="d-contact" className={styles.contact}><div className={styles.sectionLabel}><span>04 / NEXT UP</span><span>YOUR IDEA, MAYBE?</span></div><a className={styles.contactTitle} href="mailto:haikalcannavaro64@gmail.com"><span>Have an idea?<br /><em>Let’s make it real.</em></span><span className={styles.contactArrow}>↗</span></a><div className={styles.contactBottom}><a href="mailto:haikalcannavaro64@gmail.com">haikalcannavaro64@gmail.com ↗</a><div><a href="https://github.com/HaikalCannavaro" target="_blank" rel="noopener noreferrer">GITHUB ↗</a><a href="https://www.instagram.com/haikalcnnvr" target="_blank" rel="noopener noreferrer">INSTAGRAM ↗</a></div><a href="#d-home">BACK TO TOP ↑</a></div><div className={styles.signoff}><span>HAIKAL CANNAVARO</span><span>BUILT WITH CURIOSITY.</span></div></footer>
    </main>
  </div>;
}
