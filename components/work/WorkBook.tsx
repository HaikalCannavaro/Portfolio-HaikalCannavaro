"use client";
import { useEffect, useId, useRef, useState, type PointerEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { Asterisk, ArrowUpRight } from "lucide-react";
import useMotionAllowed from "../../hooks/useMotionAllowed";
import { projects } from "./projects";
import s from "./WorkBook.module.css";

const editions = [
  { name: "FoxLogger", discipline: "AI & PROMPT ENGINEERING", title: <>Making machines<br /><em>understand.</em></>, note: "Exploring the space between human intent and machine intelligence. Prompt engineering, semantic routing, and a more reliable AI agent.", word: "INTELLIGENCE", color: "blue" },
  { name: "SIMASU Web", discipline: "WEB & SYSTEM DESIGN", title: <>A connected<br /><em>community.</em></>, note: "A digital home for a real community. Bringing schedules, inventory, and everyday mosque administration into one connected platform.", word: "COMMUNITY", color: "green" },
  { name: "SIMASU Mobile", discipline: "MOBILE DEVELOPMENT", title: <>Closer.<br /><em>Wherever you are.</em></>, note: "The SIMASU ecosystem, thoughtfully translated to the small screen. Community information and everyday tools, wherever they are needed.", word: "CONNECTION", color: "orange" },
  { name: "Gary’s Portfolio", discipline: "CREATIVE DEVELOPMENT", title: <>A first impression<br /><em>that stays.</em></>, note: "A personal world built with motion, 3D, and a little curiosity. Turning a creative identity into an expressive digital experience.", word: "EXPRESSION", color: "purple" },
];
const ease = [.22, 1, .36, 1] as const;
type Turn = { from: number; to: number; direction: 1 | -1 };
const story = (index: number) => `${projects[index].storyHref}?from=selected-work`;
function Editorial({ index }: { index: number }) {
  const edition = editions[index], project = projects[index];
  return <div className={s.leftPage}>
    <div className={s.pageHeader}><span>HAIKAL CANNAVARO</span><span>SELECTED WORK</span></div>
    <div className={s.editorial}><div className={s.chapter}><span>CHAPTER</span><strong>0{index + 1}</strong><Asterisk strokeWidth={1.2} /></div>
      <span className={s.discipline}>{edition.discipline}</span><h3>{edition.title}</h3><p>{edition.note}</p>
      <div className={s.tags}>{project.tags.slice(0, 4).map(tag => <span key={tag}>{tag}</span>)}</div>
      <Link href={story(index)} className={s.story} prefetch={false}>Read the story <ArrowUpRight size={16} /></Link>
    </div><div className={s.pageFooter}><span>{project.dates}</span><span>{String(index * 2 + 1).padStart(2, "0")}</span></div>
  </div>;
}
function Artwork({ index }: { index: number }) {
  const edition = editions[index], project = projects[index];
  return <div className={s.artPage} data-color={edition.color}>
    <div className={s.artHeader}><span>EXPLORATION / 0{index + 1}</span><span>{edition.name.toUpperCase()}</span></div>
    <span className={s.artTitle} aria-hidden="true">{edition.word}</span><div className={s.orbits} aria-hidden="true"><span /><span /><span /></div><span className={s.largeNumber} aria-hidden="true">0{index + 1}</span>
    <Link className={s.photo} href={story(index)} prefetch={false} draggable={false} aria-label={`Explore ${project.title}`}>
      <div className={s.windowBar}><span>● ● ●</span><span>PROJECT PREVIEW</span><span>↗</span></div>
      <div className={s.image}>{project.image && <Image src={project.image} alt={`${edition.name} project preview`} fill draggable={false} sizes="(min-width: 769px) 40vw, 1px" />}</div>
      <div className={s.photoCaption}><span>{edition.name}</span><span>VIEW PROJECT ↗</span></div>
    </Link><div className={s.artFooter}><span>IDEAS INTO EXPERIENCES.</span><span>{String(index * 2 + 2).padStart(2, "0")}</span></div>
  </div>;
}
export default function WorkBook() {
  const id = useId(), motionAllowed = useMotionAllowed();
  const [active, setActive] = useState(0), [open, setOpen] = useState(false), [coverVisible, setCoverVisible] = useState(true);
  const [turn, setTurn] = useState<Turn | null>(null), [dragging, setDragging] = useState(false);
  const rotation = useMotionValue(0);
  const shadow = useTransform(rotation, angle => Math.sin(Math.abs(angle) * Math.PI / 180) * .4);
  const highlight = useTransform(rotation, angle => Math.sin(Math.abs(angle) * Math.PI / 180) * .22);
  const animation = useRef<{ stop: () => void } | null>(null), busy = useRef(false), suppressClick = useRef(false);
  const gesture = useRef<{ x: number; y: number; width: number; pointer: number; turn: Turn; started: boolean } | null>(null);
  useEffect(() => () => animation.current?.stop(), []);
  useEffect(() => { if (!motionAllowed) { animation.current?.stop(); setTurn(null); setDragging(false); gesture.current = null; busy.current = false; rotation.set(0); } }, [motionAllowed, rotation]);
  function finish(next: Turn, commit: boolean) {
    gesture.current = null; setDragging(false);
    if (!motionAllowed) { if (commit) setActive(next.to); setTurn(null); busy.current = false; rotation.set(0); return; }
    const target = commit ? next.direction * -180 : 0;
    animation.current = animate(rotation, target, { duration: Math.max(.28, Math.abs(target - rotation.get()) / 180 * 1.05), ease, onComplete: () => { if (commit) setActive(next.to); setTurn(null); busy.current = false; } });
  }
  function select(index: number) {
    if (!open || coverVisible || busy.current) return;
    const to = (index + projects.length) % projects.length;
    if (to === active) return;
    if (!motionAllowed) { setActive(to); return; }
    const next: Turn = { from: active, to, direction: index > active ? 1 : -1 };
    busy.current = true; rotation.set(0); setTurn(next); finish(next, true);
  }
  function startDrag(event: PointerEvent<HTMLDivElement>) {
    if (!open || coverVisible || busy.current || event.button !== 0 || !event.isPrimary) return;
    const rect = event.currentTarget.getBoundingClientRect(), direction = event.clientX >= rect.left + rect.width / 2 ? 1 : -1;
    if (direction === -1 && (event.target as HTMLElement).closest("a,button")) return;
    suppressClick.current = false;
    gesture.current = { x: event.clientX, y: event.clientY, width: rect.width / 2, pointer: event.pointerId, started: false, turn: { from: active, to: (active + direction + projects.length) % projects.length, direction } };
  }
  function moveDrag(event: PointerEvent<HTMLDivElement>) {
    const drag = gesture.current;
    if (!drag || drag.pointer !== event.pointerId) return;
    const dx = event.clientX - drag.x, dy = event.clientY - drag.y;
    if (!drag.started) {
      if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 8) { gesture.current = null; return; }
      if (-dx * drag.turn.direction < 7) return;
      drag.started = true; busy.current = true; suppressClick.current = true; event.currentTarget.setPointerCapture(event.pointerId); setDragging(true); rotation.set(0); if (motionAllowed) setTurn(drag.turn);
    }
    event.preventDefault();
    rotation.set(-drag.turn.direction * Math.max(0, Math.min(.995, -dx * drag.turn.direction / (drag.width * 1.25))) * 180);
  }
  function endDrag(event: PointerEvent<HTMLDivElement>, cancel = false) {
    const drag = gesture.current;
    if (!drag || drag.pointer !== event.pointerId) return;
    if (!drag.started) { gesture.current = null; return; }
    finish(drag.turn, !cancel && Math.abs(rotation.get()) >= 42);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  }
  const left = turn?.direction === -1 ? turn.to : active, right = turn?.direction === 1 ? turn.to : active;
  return <div className={s.library}>
    <div className={s.toolbar}><span>THE PROJECT JOURNAL</span><span>VOL. 01 / FOUR EXPLORATIONS</span>{open ? <button className={s.closeBook} onClick={() => { if (busy.current || coverVisible) return; setOpen(false); setCoverVisible(true); requestAnimationFrame(() => document.getElementById(`${id}-open`)?.focus({ preventScroll: true })); }}>Close the book ↙</button> : <span>OPEN TO CURIOSITY</span>}</div>
    <div role="tablist" aria-label="Project chapters" className={s.tabs} data-open={open} inert={!open}>
      {editions.map((edition, i) => <button type="button" key={edition.name} role="tab" id={`${id}-tab-${i}`} aria-selected={active === i} aria-controls={`${id}-panel`} aria-disabled={!!turn || coverVisible} tabIndex={active === i ? 0 : -1} onClick={() => select(i)} onKeyDown={event => {
        if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return; event.preventDefault(); if (busy.current || coverVisible) return;
        const next = event.key === "Home" ? 0 : event.key === "End" ? 3 : (i + (event.key === "ArrowRight" ? 1 : -1) + 4) % 4; select(next); document.getElementById(`${id}-tab-${next}`)?.focus();
      }}><span>0{i + 1}</span> {edition.name}</button>)}
    </div>
    <div className={s.stage}><div className={s.book} id={`${id}-panel`} role={open ? "tabpanel" : "group"} aria-label={open ? undefined : "Project journal"} aria-labelledby={open ? `${id}-tab-${active}` : undefined} aria-describedby={`${id}-hint`} aria-busy={!!turn} tabIndex={open ? 0 : -1} data-open={open} data-dragging={dragging}
      onPointerDown={startDrag} onPointerMove={moveDrag} onPointerUp={event => endDrag(event)} onPointerCancel={event => endDrag(event, true)} onLostPointerCapture={event => { if (gesture.current?.started) endDrag(event, true); }} onDragStart={event => event.preventDefault()} onClickCapture={event => { if (suppressClick.current) { event.preventDefault(); event.stopPropagation(); suppressClick.current = false; } }}>
      <div className={s.backBoard} aria-hidden="true" />
      <div className={s.binding} aria-hidden="true"><span>SELECTED WORKS</span><span>H. CANNAVARO</span></div>
      <div className={s.pageBlockLeft} aria-hidden="true"><i /><b /><span /></div>
      <div className={s.pageBlockRight} aria-hidden="true"><i /><b /><span /></div>
      <div className={s.ribbon} aria-hidden="true" />
      <div className={s.pageEdges} aria-hidden="true" />
      <div className={s.spread} data-open={open}>
        <div className={s.baseLeft} inert={!open || coverVisible || !!turn}><Editorial index={left} /></div><div className={s.rightPage} inert={!open || coverVisible || !!turn}><Artwork index={right} /></div><div className={s.spine} aria-hidden="true" />
        {turn && <><motion.div className={s.castShadow} style={{ opacity: shadow }} aria-hidden="true" /><motion.div className={s.turningSheet} data-direction={turn.direction} style={{ rotateY: rotation }} aria-hidden="true" inert>
          <div className={s.sheetFront}>{turn.direction === 1 ? <Artwork index={turn.from} /> : <Editorial index={turn.from} />}<motion.div className={s.pageShade} style={{ opacity: shadow }} /></div>
          <div className={s.sheetBack}>{turn.direction === 1 ? <Editorial index={turn.to} /> : <Artwork index={turn.to} />}<motion.div className={s.pageShine} style={{ opacity: highlight }} /></div><div className={s.paperEdge} />
        </motion.div></>}
      </div>
      {coverVisible && <motion.div className={s.cover} style={{ z: 8 }} initial={false} animate={{ rotateY: open ? -180 : 0 }} transition={{ duration: motionAllowed ? 1.25 : 0, ease }} onAnimationComplete={() => { if (open) { setCoverVisible(false); document.getElementById(`${id}-tab-${active}`)?.focus({ preventScroll: true }); } }}>
        <div className={s.coverForeEdge} aria-hidden="true" /><div className={s.coverTailEdge} aria-hidden="true" /><div className={s.coverFront}><div className={s.coverTop}><span>HAIKAL CANNAVARO</span><span>VOL. 01</span></div><Asterisk className={s.coverMark} strokeWidth={.8} /><h3 className={s.coverTitle}>Selected<br /><em>works.</em></h3><p>A COLLECTION OF DIGITAL EXPERIENCES<br />WEB · MOBILE · ARTIFICIAL INTELLIGENCE</p><button id={`${id}-open`} className={s.openBook} disabled={open} onClick={event => { event.stopPropagation(); setOpen(true); }}>Open the book <ArrowUpRight size={19} /></button><div className={s.coverBottom}><span>DESIGNED & DEVELOPED BY HAIKAL</span><span>2024—2026</span></div></div>
        <div className={s.coverBack} aria-hidden="true"><Asterisk strokeWidth={.7} /><span>EVERY IDEA STARTS SOMEWHERE.</span></div>
      </motion.div>}
      {!turn && open && <><span className={s.leftCurl} aria-hidden="true" /><span className={s.rightCurl} aria-hidden="true" /></>}
    </div></div>
    <div className={s.controls} data-open={open} inert={!open}><button aria-disabled={!!turn || coverVisible} onClick={() => select(active - 1)}><span>←</span> Previous chapter</button><div><span aria-live="polite" aria-atomic="true">0{active + 1} / 04</span><p id={`${id}-hint`}>CLICK, HOLD & DRAG A PAGE · OR USE THE ARROWS</p></div><button aria-disabled={!!turn || coverVisible} onClick={() => select(active + 1)}>Next chapter <span>→</span></button></div>
  </div>;
}
