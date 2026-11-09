"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import ToolCard from "../toolbox/ToolCard";
import { FacetMark, HCMonogram } from "../brand/BrandMarks";
import Link from "next/link";
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from "framer-motion";
import useMotionAllowed from "../../hooks/useMotionAllowed";
import { projects } from "../work/projects";
import styles from "./MobilePortfolio.module.css";

const groups = [
  { name: "Build", summary: "From the interface to the infrastructure.", tools: ["HTML", "CSS", "JavaScript", "Tailwind CSS", "Node.js", "Laravel"] },
  { name: "Connect", summary: "Data, services, and everything in between.", tools: ["MySQL", "Prisma", "Postman", "Go", "Java"] },
  { name: "Create", summary: "Exploring new ways to bring ideas to life.", tools: ["Flutter", "Figma", "Blender", "Git", "GitHub", "C++", "C#"] },
];
const ease = [.22, 1, .36, 1] as const;

function SectionTitle({ number, children }: { number: string; children: React.ReactNode }) {
  return <div className={styles.sectionLabel}><span>{number}</span><span>{children}</span><span aria-hidden="true">↗</span></div>;
}

export default function MobilePortfolio() {
  const animate = useMotionAllowed();
  const hero = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const { scrollYProgress: heroProgress } = useScroll({ target: hero, offset: ["start start", "end start"] });
  const portraitY = useTransform(heroProgress, [0, 1], [0, 120]);
  const portraitRotate = useTransform(heroProgress, [0, 1], [-7, 8]);
  const tickerX = useTransform(scrollYProgress, [0, 1], [0, -600]);
  const titleX = useTransform(heroProgress, [0, 1], [0, -60]);
  const [project, setProject] = useState(0);
  const [direction, setDirection] = useState(1);
  const [skill, setSkill] = useState(0);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [portraitTurned, setPortraitTurned] = useState(false);
  const selected = projects[project];
  const reveal = animate ? { initial: false as const, animate: { opacity: .25, y: 36 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: .15 }, transition: { duration: .7, ease } } : { initial: false as const, animate: { opacity: 1, y: 0 } };

  function changeProject(next: number) {
    const index = (next + projects.length) % projects.length;
    setDirection(next > project ? 1 : -1);
    setProject(index);
  }

  return (
    <div className={styles.mobile}>
      <header className={styles.header}><a href="#m-home" aria-label="Haikal, home"><HCMonogram /></a><span>SOFTWARE DEVELOPER</span><a href="mailto:haikalcannavaro64@gmail.com" aria-label="Email Haikal">↗</a></header>
      <main>
        <section id="m-home" ref={hero} className={styles.hero}>
          <div className={styles.issue}><span>PORTFOLIO / SELECTED WORK</span><span>01—04</span></div>
          <motion.h1 style={animate ? { x: titleX } : undefined}>
            {["HAIKAL", "CANNAVARO"].map((word, i) => <span className={styles.titleMask} key={word}><motion.span initial={false} animate={{ y: 0 }} className={animate ? styles.titleEnter : undefined} style={{ animationDelay: `${i * 120}ms` }}>{word}</motion.span></span>)}
          </motion.h1>
          <div className={styles.portraitStage}>
            <span className={styles.orbit} aria-hidden="true" /><span className={styles.orbitSmall} aria-hidden="true" />
            <motion.span className={styles.star} aria-hidden="true" style={animate ? { rotate: portraitRotate } : undefined}><FacetMark /></motion.span>
            <span className={styles.sideNote}>CURIOUS BY NATURE.<br />DEVELOPER BY DESIGN.</span>
            <motion.button className={styles.portraitCard} type="button" aria-label="Turn Haikal's portrait" aria-pressed={portraitTurned} onClick={() => setPortraitTurned(v => !v)}
              style={animate ? { y: portraitY, rotate: portraitRotate } : { rotate: -7 }} whileTap={animate ? { scale: .96 } : undefined}>
              <motion.span className={styles.cardInner} animate={{ rotateY: portraitTurned ? 180 : 0 }} transition={{ duration: animate ? .75 : 0, ease }}>
                <span className={styles.front} aria-hidden={portraitTurned}><span className={styles.photo}><Image src="/profileimage/ProfileEdited.jpg" alt="Haikal Cannavaro" fill priority sizes="(max-width: 768px) 65vw, 1px" /></span><span className={styles.photoCaption}>HAIKAL CANNAVARO <span>↻</span></span></span>
                <span className={styles.back} aria-hidden={!portraitTurned}><span>HELLO, WORLD.</span><strong>Ideas in.<br />Impact out.</strong><span>Software engineering student.<br />Always building, always learning.</span></span>
              </motion.span>
            </motion.button>
            <span className={styles.tapNote}>TAP TO TURN ↻</span>
          </div>
          <div className={styles.heroBottom}><p>I turn curious ideas into<br /><strong>working digital experiences.</strong></p><a href="#m-work" aria-label="Explore selected work">↓</a></div>
        </section>
        <div className={styles.ticker} aria-hidden="true"><motion.div style={animate ? { x: tickerX } : undefined}>{Array.from({ length: 4 }, (_, i) => <span key={i}>CODE WITH CURIOSITY <b><FacetMark /></b> BUILD WITH INTENT <b><FacetMark /></b> </span>)}</motion.div></div>

        <section id="m-work" className={styles.work}>
          <SectionTitle number="01">SELECTED WORK</SectionTitle>
          <motion.div {...reveal}><h2>Small details.<br /><em>Real impact.</em></h2><p className={styles.intro}>Web, mobile, and AI. A few things I’ve been building.</p></motion.div>
          <div className={styles.projectNav}><span>DRAG TO DISCOVER ↔</span><span aria-live="polite" aria-atomic="true">0{project + 1} <i>/ 0{projects.length}</i></span></div>
          <motion.div layout={animate} transition={{ duration: animate ? .45 : 0, ease }} className={styles.deck}>
            <span className={styles.deckBack} aria-hidden="true" />
            <AnimatePresence initial={false} mode="wait" custom={direction}>
              <motion.article key={project} custom={direction} className={styles.project}
                variants={{ enter: (d: number) => ({ x: animate ? d * 70 : 0, rotate: animate ? d * 4 : 0, opacity: animate ? 0 : 1 }), center: { x: 0, rotate: 0, opacity: 1 }, exit: (d: number) => ({ x: animate ? d * -70 : 0, rotate: animate ? d * -4 : 0, opacity: animate ? 0 : 1 }) }}
                initial="enter" animate="center" exit="exit" transition={{ duration: animate ? .3 : 0, ease }}
                drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={.12} dragSnapToOrigin
                onDragEnd={(_, info) => { if (Math.abs(info.offset.x) > 45 || Math.abs(info.velocity.x) > 400) changeProject(project + (info.offset.x < 0 ? 1 : -1)); }}>
                <div className={styles.projectImage}>{selected.image && <Image src={selected.image} alt={selected.title} fill sizes="(max-width: 768px) 90vw, 1px" draggable={false} />}<span>0{project + 1}</span></div>
                <div className={styles.projectBody}><p className={styles.projectDate}>{selected.dates}</p><h3>{selected.title}</h3><p>{selected.description}</p><div className={styles.tags}>{selected.tags.map(tag => <span key={tag}>{tag}</span>)}</div>{selected.storyHref && <Link href={selected.storyHref} prefetch={false} draggable={false} className={styles.story}>Explore the story <span>↗</span></Link>}</div>
              </motion.article>
            </AnimatePresence>
          </motion.div>
          <div className={styles.deckControls}><button type="button" onClick={() => changeProject(project - 1)} aria-label="Previous project">←</button><Link href="/projects" prefetch={false}>ALL PROJECTS ↗</Link><button type="button" onClick={() => changeProject(project + 1)} aria-label="Next project">→</button></div>
        </section>

        <section id="m-about" className={styles.about}>
          <SectionTitle number="02">THE PERSON BEHIND THE CODE</SectionTitle>
          <motion.div {...reveal}><h2>A curious mind.<br />A builder’s<br /><em>instinct.</em><span aria-hidden="true"><FacetMark /></span></h2><p>I’m Haikal, an aspiring software developer exploring the space between thoughtful interfaces and the systems that power them.</p><p>I use AI-assisted development to experiment, solve problems, and turn creative ideas into real digital products.</p></motion.div>
          <button className={styles.aboutToggle} type="button" aria-expanded={aboutOpen} aria-controls="m-journey" onClick={() => setAboutOpen(v => !v)}>MY JOURNEY <motion.span animate={{ rotate: aboutOpen ? 45 : 0 }} transition={{ duration: animate ? .25 : 0 }}>+</motion.span></button>
          <motion.div id="m-journey" initial={false} animate={{ height: aboutOpen ? "auto" : 0, opacity: aboutOpen ? 1 : 0 }} transition={{ duration: animate ? .45 : 0, ease }} className={styles.journey} inert={!aboutOpen}>
            <div><span>2023 — PRESENT</span><h3>Telkom University Bandung</h3><p>Bachelor of Science in Software Engineering</p></div><div><span>2020 — 2023</span><h3>Pius Tegal Senior Highschool</h3><p>Science Major</p></div>
          </motion.div>
        </section>

        <section id="m-skills" className={styles.skills}>
          <SectionTitle number="03">THE TOOLBOX</SectionTitle>
          <motion.h2 {...reveal}>Different tools.<br /><em>One mindset.</em></motion.h2>
          <div role="tablist" aria-label="Skill categories" className={styles.tabs}>{groups.map((group, i) => <button id={`skill-tab-${i}`} type="button" role="tab" aria-selected={skill === i} aria-controls="m-skill-panel" tabIndex={skill === i ? 0 : -1} key={group.name}
            onClick={() => setSkill(i)} onKeyDown={event => { if (["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) { event.preventDefault(); const next = event.key === "Home" ? 0 : event.key === "End" ? groups.length - 1 : (i + (event.key === "ArrowRight" ? 1 : -1) + groups.length) % groups.length; setSkill(next); document.getElementById(`skill-tab-${next}`)?.focus(); } }}>
            {skill === i && <motion.span layoutId="skill-indicator" className={styles.tabIndicator} transition={{ type: "spring", stiffness: animate ? 380 : 10000, damping: animate ? 30 : 1000 }} />}<span>{group.name}</span></button>)}</div>
          <div role="tabpanel" id="m-skill-panel" aria-labelledby={`skill-tab-${skill}`} className={styles.skillPanel}><p>{groups[skill].summary}</p><AnimatePresence mode="wait" initial={false}><motion.div key={skill} className={styles.skillChips} initial={{ opacity: animate ? 0 : 1, y: animate ? 10 : 0 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: animate ? 0 : 1, y: animate ? -10 : 0 }} transition={{ duration: animate ? .2 : 0 }}>{groups[skill].tools.map(tool => <ToolCard key={tool} name={tool} />)}</motion.div></AnimatePresence></div>
        </section>
        <footer id="m-contact" className={styles.contact}><SectionTitle number="04">LET’S MAKE SOMETHING</SectionTitle><motion.a {...reveal} className={styles.contactTitle} href="mailto:haikalcannavaro64@gmail.com">Have an idea?<br /><em>Let’s talk.</em><span>↗</span></motion.a><div className={styles.socials}><a href="https://github.com/HaikalCannavaro" target="_blank" rel="noopener noreferrer">GITHUB ↗</a><a href="https://www.instagram.com/haikalcnnvr" target="_blank" rel="noopener noreferrer">INSTAGRAM ↗</a></div><p>HAIKAL CANNAVARO <span>BUILT WITH CURIOSITY.</span></p></footer>
      </main>
      <nav aria-label="Mobile sections" className={styles.dock}><motion.div className={styles.progress} style={{ scaleX: animate ? progress : scrollYProgress }} /><a href="#m-home" aria-label="Back to top"><HCMonogram /></a><a href="#m-work">Work</a><a href="#m-about">About</a><a href="#m-skills">Skills</a><a href="#m-contact" aria-label="Contact Haikal">↗</a></nav>
    </div>
  );
}
