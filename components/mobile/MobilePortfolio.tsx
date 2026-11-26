"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import ToolCard from "../toolbox/ToolCard";
import { FacetMark, HCMonogram } from "../brand/BrandMarks";
import GlitchWord from "../brand/GlitchWord";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from "framer-motion";
import useMotionAllowed from "../../hooks/useMotionAllowed";
import { projects } from "../work/projects";
import ThemeToggle from "../desktop/ThemeToggle";
import useActiveMobileSection from "../../hooks/useActiveMobileSection";
import { isPlainClick, navigateWithCover, rememberCard, restoreCardPosition } from "./projectStoryNavigation";
import styles from "./MobilePortfolio.module.css";

const groups = [
  { name: "Build", summary: "From the interface to the infrastructure.", tools: ["HTML", "CSS", "JavaScript", "Tailwind CSS", "Node.js", "Laravel"] },
  { name: "Connect", summary: "Data, services, and everything in between.", tools: ["MySQL", "Prisma", "Postman", "Go", "Java"] },
  { name: "Create", summary: "Exploring new ways to bring ideas to life.", tools: ["Flutter", "Figma", "Blender", "Git", "GitHub", "C++", "C#"] },
];
const ease = [.22, 1, .36, 1] as const;

// SVG keeps the arrow monochrome and independent of platform emoji/font metrics.
function ArrowUpRight() {
  return <svg className={styles.arrowIcon} viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d="M6 18 18 6M6 6h12v12" /></svg>;
}

function SectionTitle({ number, children }: { number: string; children: React.ReactNode }) {
  return <div className={styles.sectionLabel}><span>{number}</span><span>{children}</span><span aria-hidden="true"><ArrowUpRight /></span></div>;
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
  const router = useRouter();
  const activeSection = useActiveMobileSection();
  const [restoredStory, setRestoredStory] = useState("");
  const coverRef = useRef<HTMLDivElement>(null);
  const ignoreClickUntil = useRef(0);
  const selected = projects[project];
  useLayoutEffect(() => {
    const readLocation = () => {
      if (!matchMedia("(max-width: 768px)").matches || (location.hash && location.hash !== "#m-work")) return;
      const slug = new URLSearchParams(location.search).get("project");
      const index = projects.findIndex(item => item.storyHref === `/blog/${slug}`);
      if (index < 0) return;
      setProject(index);
      setRestoredStory(projects[index].storyHref);
    };
    readLocation();
    window.addEventListener("popstate", readLocation);
    return () => window.removeEventListener("popstate", readLocation);
  }, []);

  useLayoutEffect(() => {
    if (!restoredStory) return;
    const restore = () => {
      if (coverRef.current?.dataset.deckCover === restoredStory) restoreCardPosition(restoredStory, coverRef.current);
    };
    if (!document.documentElement.hasAttribute("data-splash")) { restore(); return; }
    const observer = new MutationObserver(() => {
      if (!document.documentElement.hasAttribute("data-splash")) { observer.disconnect(); restore(); }
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-splash"] });
    return () => observer.disconnect();
  }, [restoredStory]);
  const reveal = animate ? { initial: false as const, animate: { opacity: .25, y: 36 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: .15 }, transition: { duration: .7, ease } } : { initial: false as const, animate: { opacity: 1, y: 0 } };

  function changeProject(next: number) {
    const index = (next + projects.length) % projects.length;
    setDirection(next > project ? 1 : -1);
    setProject(index);
    if (new URLSearchParams(location.search).has("project")) rememberCard(projects[index].storyHref);
  }

  return (
      <div className={styles.mobile}>
      <header className={styles.header}><a href="#m-home" aria-label="Haikal, home"><HCMonogram /></a><span>SOFTWARE DEVELOPER</span><ThemeToggle /><a href="mailto:haikalcannavaro64@gmail.com" aria-label="Email Haikal"><ArrowUpRight /></a></header>
      <main>
        <section id="m-home" ref={hero} className={styles.hero}>
          <div className={styles.issue}><span>PORTFOLIO / SELECTED WORK</span><span>01—04</span></div>
          <motion.h1 aria-label="Haikal Cannavaro" style={animate ? { x: titleX } : undefined}>
            <span className={styles.titleLine}><GlitchWord dataText="Hello!">HAIKAL</GlitchWord></span>
            <span className={styles.titleLine}><GlitchWord>CANNAVARO</GlitchWord></span>
          </motion.h1>
          <div className={styles.heroBottom}><p>I turn curious ideas into<br /><strong>working digital experiences.</strong></p><a href="#m-work" aria-label="Explore selected work">↓</a></div>
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
        </section>
        <div className={styles.ticker} aria-hidden="true"><motion.div style={animate ? { x: tickerX } : undefined}>{Array.from({ length: 4 }, (_, i) => <span key={i}>CODE WITH CURIOSITY <b><FacetMark /></b> BUILD WITH INTENT <b><FacetMark /></b> </span>)}</motion.div></div>

        <section id="m-work" className={styles.work}>
          <SectionTitle number="01">SELECTED WORK</SectionTitle>
          <motion.div {...reveal}><h2>Small details.<br /><em>Real impact.</em></h2><p className={styles.intro}>Web, mobile, and AI. A few things I’ve been building.</p></motion.div>
          <div className={styles.projectNav}><span>DRAG TO DISCOVER ↔</span><span aria-live="polite" aria-atomic="true">0{project + 1} <i>/ 0{projects.length}</i></span></div>
          <motion.div layout={animate} transition={{ duration: animate ? .45 : 0, ease }} className={styles.deck}>
            <span className={styles.deckBack} aria-hidden="true" />
            <AnimatePresence key={restoredStory} initial={false} mode="wait" custom={direction}>
              <motion.article key={project} custom={direction} className={styles.project}
                variants={{ enter: (d: number) => ({ x: animate ? d * 70 : 0, rotate: animate ? d * 4 : 0, opacity: animate ? 0 : 1 }), center: { x: 0, rotate: 0, opacity: 1 }, exit: (d: number) => ({ x: animate ? d * -70 : 0, rotate: animate ? d * -4 : 0, opacity: animate ? 0 : 1 }) }}
                initial="enter" animate="center" exit="exit" transition={{ duration: animate ? .3 : 0, ease }}
                drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={.12} dragSnapToOrigin
                onDragEnd={(_, info) => {
                  ignoreClickUntil.current = performance.now() + 250;
                  if (Math.abs(info.offset.x) > 45 || Math.abs(info.velocity.x) > 400) changeProject(project + (info.offset.x < 0 ? 1 : -1));
                }}>
                <div ref={coverRef} className={styles.projectImage} data-deck-cover={selected.storyHref} data-wordmark={selected.wordmark || undefined}>
                  {selected.image && <Image src={selected.image} alt={selected.title} fill sizes="(max-width: 768px) 90vw, 1px" draggable={false} />}
                  <span>0{project + 1}</span>
                </div>
                <div className={styles.projectBody}>
                  <p className={styles.projectDate}>{selected.dates}</p><h3>{selected.title}</h3>
                  <p>{selected.summary}</p>
                  <div className={styles.tags}>{selected.tags.slice(0, 3).map(tag => <span key={tag}>{tag}</span>)}</div>
                  <Link href={`${selected.storyHref}?from=selected-work`} draggable={false} className={styles.story}
                    aria-label={`Explore the story: ${selected.title}`} onClick={event => {
                      if (!isPlainClick(event)) return;
                      if (performance.now() < ignoreClickUntil.current) { event.preventDefault(); return; }
                      rememberCard(selected.storyHref);
                      const href = event.currentTarget.getAttribute("href")!;
                      navigateWithCover(event, selected.storyHref, "open", () => router.push(href, { scroll: false }));
                    }}>Explore the story <span><ArrowUpRight /></span></Link>
                </div>
              </motion.article>
            </AnimatePresence>
          </motion.div>
          <div className={styles.deckControls}><button type="button" onClick={() => changeProject(project - 1)} aria-label="Previous project">←</button><Link href="/projects" prefetch={false}>ALL PROJECTS <ArrowUpRight /></Link><button type="button" onClick={() => changeProject(project + 1)} aria-label="Next project">→</button></div>
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
        <footer id="m-contact" className={styles.contact}><SectionTitle number="04">LET’S MAKE SOMETHING</SectionTitle><motion.a {...reveal} className={styles.contactTitle} href="mailto:haikalcannavaro64@gmail.com">Have an idea?<br /><em>Let’s talk.</em><span><ArrowUpRight /></span></motion.a><div className={styles.socials}><a href="https://github.com/HaikalCannavaro" target="_blank" rel="noopener noreferrer">GITHUB <ArrowUpRight /></a><a href="https://www.instagram.com/haikalcnnvr" target="_blank" rel="noopener noreferrer">INSTAGRAM <ArrowUpRight /></a></div><p>HAIKAL CANNAVARO <span>BUILT WITH CURIOSITY.</span></p></footer>
      </main>
      <nav aria-label="Mobile sections" className={styles.dock}>
        <div className={styles.dockTrack} aria-hidden="true">
          <motion.span initial={false} animate={{ x: `${activeSection * 100}%` }} transition={animate ? { type: "spring", stiffness: 390, damping: 36 } : { duration: 0 }} />
        </div>
        <motion.div aria-hidden="true" className={styles.progress} style={{ scaleX: animate ? progress : scrollYProgress }} />
        <a href="#m-home" aria-current={activeSection === 0 ? "location" : undefined} aria-label="Back to top"><HCMonogram /></a>
        <a href="#m-work" aria-current={activeSection === 1 ? "location" : undefined}>Work</a>
        <a href="#m-about" aria-current={activeSection === 2 ? "location" : undefined}>About</a>
        <a href="#m-skills" aria-current={activeSection === 3 ? "location" : undefined}>Skills</a>
        <a href="#m-contact" aria-current={activeSection === 4 ? "location" : undefined} aria-label="Contact Haikal"><ArrowUpRight /></a>
      </nav>
      </div>
  );
}
