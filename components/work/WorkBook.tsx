"use client";
import { useEffect, useId, useRef, useState, type PointerEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { Asterisk, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import useMotionAllowed from "../../hooks/useMotionAllowed";
import { projects } from "./projects";
import s from "./WorkBook.module.css";

const editions = [
  { name: "FoxLogger", discipline: "AI & PROMPT ENGINEERING", title: <>Making machines<br /><em>understand.</em></>, note: "Exploring the space between human intent and machine intelligence. Prompt engineering, semantic routing, and a more reliable AI agent.", word: "INTELLIGENCE", color: "blue" },
  { name: "SIMASU Web", discipline: "WEB & SYSTEM DESIGN", title: <>A connected<br /><em>community.</em></>, note: "A digital home for a real community. Bringing schedules, inventory, and everyday mosque administration into one connected platform.", word: "COMMUNITY", color: "green" },
  { name: "SIMASU Mobile", discipline: "MOBILE DEVELOPMENT", title: <>Closer.<br /><em>Wherever you are.</em></>, note: "The SIMASU ecosystem, thoughtfully translated to the small screen. Community information and everyday tools, wherever they are needed.", word: "CONNECTION", color: "orange" },
  { name: "Gary’s Portfolio", discipline: "CREATIVE DEVELOPMENT", title: <>A first impression<br /><em>that stays.</em></>, note: "A personal world built with motion, 3D, and a little curiosity. Turning a creative identity into an expressive digital experience.", word: "EXPRESSION", color: "purple" },
];
const spreads = ["Introduction", ...editions.map(edition => edition.name), "Closing note"];
const lastSpread = spreads.length - 1;
const ease = [.22, 1, .36, 1] as const;
type CoverSide = "front" | "back";
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
    </div><div className={s.pageFooter}><span>{project.dates}</span><span>{String(index * 2 + 2).padStart(2, "0")}</span></div>
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
    </Link><div className={s.artFooter}><span>IDEAS INTO EXPERIENCES.</span><span>{String(index * 2 + 3).padStart(2, "0")}</span></div>
  </div>;
}
function CoverImprint() {
  return <div className={s.coverImprint} aria-hidden="true">
    <span className={s.imprintLabel}>THE PROJECT JOURNAL</span>
    <div className={s.imprintSeal}><span className={s.imprintOrbit} /><span className={s.imprintOrbit} /><Asterisk strokeWidth={.6} /><span className={s.imprintInitials}>HC</span></div>
    <span className={s.imprintSignature}>SELECTED WORKS<span>VOLUME 01</span></span>
  </div>;
}
function InsideCover() {
  return <div className={s.insideCover} aria-label="Inside cover"><CoverImprint /></div>;
}
function BookNote({ closing = false }: { closing?: boolean }) {
  return <div className={`${s.leftPage} ${s.bookNote}`}>
    <div className={s.pageHeader}><span>THE PROJECT JOURNAL</span><span>{closing ? "AFTERWORD" : "INTRODUCTION"}</span></div>
    <div className={s.noteBody}>
      <span className={s.discipline}>{closing ? "THE LAST PAGE" : "FOUR PROJECTS. DIFFERENT POSSIBILITIES."}</span>
      <h3>{closing ? <>Every ending.<br /><em>A new beginning.</em></> : <>A few ideas.<br /><em>Made real.</em></>}</h3>
      <p>{closing ? "Thank you for spending a little time with these projects. Each one is a different exploration of what digital experiences can be." : "A collection of selected work across web, mobile, and artificial intelligence. Each project brings together a different problem, a thoughtful approach, and something built to explore it."}</p>
      {!closing && <ol className={s.contentsList}>{editions.map((edition, i) => <li key={edition.name}><span>{edition.name}</span><span>{String(i * 2 + 2).padStart(2, "0")}—{String(i * 2 + 3).padStart(2, "0")}</span></li>)}</ol>}
      <p className={s.noteHint}>{closing ? "Close the cover, or turn back to explore again." : "Turn the page to begin. Open any project’s story for a closer look."}</p>
    </div>
    <div className={s.pageFooter}><span>SELECTED WORK</span><span>{closing ? "10" : "01"}</span></div>
  </div>;
}
function LeftContent({ index }: { index: number }) {
  return index === 0 ? <InsideCover /> : index === lastSpread ? <BookNote closing /> : <Editorial index={index - 1} />;
}
function RightContent({ index }: { index: number }) {
  return index === 0 ? <BookNote /> : index === lastSpread ? <InsideCover /> : <Artwork index={index - 1} />;
}
export default function WorkBook() {
  const id = useId(), motionAllowed = useMotionAllowed();
  const [active, setActive] = useState(0), [open, setOpen] = useState(false), [coverVisible, setCoverVisible] = useState(true);
  const [turn, setTurn] = useState<Turn | null>(null), [dragging, setDragging] = useState(false);
  const [coverMoving, setCoverMoving] = useState(false);
  const [coverSide, setCoverSide] = useState<CoverSide>("front");
  const coverRotation = useMotionValue(0);
  // During cover motion the moving board is the only inside-cover surface.
  // Introductory and closing paper remain fully opaque.
  const leftPaperReveal = coverSide === "front" ? 0 : 1;
  const rightPaperReveal = coverSide === "back" ? 0 : 1;
  const boardReveal = useTransform(coverRotation, angle => {
    const cosine = Math.cos(angle * Math.PI / 180);
    const hidden = 50 * (1 - Math.max(0, coverSide === "front" ? -cosine : cosine));
    return coverSide === "front" ? `inset(0 0 0 ${hidden}%)` : `inset(0 ${hidden}% 0 0)`;
  });
  const coverShade = useTransform(coverRotation, [-180, -90, 0], [0, .32, 0]);
  const coverAnimation = useRef<{ stop: () => void } | null>(null);
  const coverTarget = useRef(false);
  const rotation = useMotionValue(0);
  const shadow = useTransform(rotation, angle => Math.sin(Math.abs(angle) * Math.PI / 180) * .4);
  const highlight = useTransform(rotation, angle => Math.sin(Math.abs(angle) * Math.PI / 180) * .22);
  const animation = useRef<{ stop: () => void } | null>(null), busy = useRef(false), suppressClick = useRef(false);
  const gesture = useRef<{ x: number; y: number; width: number; pointer: number; turn: Turn; started: boolean; cover?: { side: CoverSide; target: boolean; originalOpen: boolean; start: number; end: number } } | null>(null);
  useEffect(() => () => { animation.current?.stop(); coverAnimation.current?.stop(); }, []);
  function settleCover(target: boolean) {
    setOpen(target); setCoverVisible(!target); setCoverMoving(false);
    requestAnimationFrame(() => {
      const focusTarget = target ? document.getElementById(`${id}-panel`)?.parentElement?.parentElement?.querySelector<HTMLButtonElement>('[role="tab"][aria-selected="true"]') : document.getElementById(`${id}-open`);
      focusTarget?.focus({ preventScroll: true });
    });
  }
  function coverAngle(target: boolean, side: CoverSide) {
    return side === "front" ? (target ? -180 : 0) : (target ? 0 : -180);
  }
  function animateCover(target: boolean, side: CoverSide) {
    coverTarget.current = target; setCoverMoving(true);
    const end = coverAngle(target, side);
    if (!motionAllowed) { coverRotation.set(end); settleCover(target); return; }
    coverAnimation.current = animate(coverRotation, end, {
      duration: Math.max(.3, Math.abs(end - coverRotation.get()) / 180 * 1.5),
      ease: [.42, 0, .24, 1], onComplete: () => settleCover(target),
    });
  }
  function prepareCover(target: boolean, side: CoverSide) {
    setCoverSide(side); setCoverVisible(true);
    coverRotation.set(coverAngle(!target, side));
    if (target) { setActive(side === "front" ? 0 : lastSpread); setOpen(true); }
  }
  function toggleCover(target: boolean, side: CoverSide = coverSide) {
    if (busy.current || coverMoving) return;
    suppressClick.current = false; prepareCover(target, side); animateCover(target, side);
  }
  useEffect(() => {
    if (!motionAllowed && coverMoving && !gesture.current?.started) {
      coverAnimation.current?.stop(); coverRotation.set(coverAngle(coverTarget.current, coverSide));
      setOpen(coverTarget.current); setCoverVisible(!coverTarget.current); setCoverMoving(false);
    }
  }, [motionAllowed, coverMoving, coverRotation, coverSide]);
  useEffect(() => { if (!motionAllowed) { if (gesture.current?.cover) return; animation.current?.stop(); setTurn(null); setDragging(false); gesture.current = null; busy.current = false; rotation.set(0); } }, [motionAllowed, rotation]);
  function finish(next: Turn, commit: boolean) {
    gesture.current = null; setDragging(false);
    if (!motionAllowed) { if (commit) setActive(next.to); setTurn(null); busy.current = false; rotation.set(0); return; }
    const target = commit ? next.direction * -180 : 0;
    animation.current = animate(rotation, target, { duration: Math.max(.28, Math.abs(target - rotation.get()) / 180 * 1.05), ease, onComplete: () => { if (commit) setActive(next.to); setTurn(null); busy.current = false; } });
  }
  function select(index: number) {
    if (!open || coverVisible || busy.current) return;
    if (index < 0 || index >= spreads.length) { toggleCover(false, index < 0 ? "front" : "back"); return; }
    const to = index;
    if (to === active) return;
    if (!motionAllowed) { setActive(to); return; }
    const next: Turn = { from: active, to, direction: index > active ? 1 : -1 };
    busy.current = true; rotation.set(0); setTurn(next); finish(next, true);
  }
  function startDrag(event: PointerEvent<HTMLDivElement>) {
    if (coverMoving || (open && coverVisible) || busy.current || event.button !== 0 || !event.isPrimary) return;
    const rect = event.currentTarget.getBoundingClientRect(), direction: 1 | -1 = !open ? (coverSide === "front" ? 1 : -1) : event.clientX >= rect.left + rect.width / 2 ? 1 : -1;
    if (open && direction === -1 && (event.target as HTMLElement).closest("a,button")) return;
    suppressClick.current = false;
    const boundary = !open || (active === 0 && direction === -1) || (active === lastSpread && direction === 1);
    const side: CoverSide = !open ? coverSide : direction === -1 ? "front" : "back";
    gesture.current = { x: event.clientX, y: event.clientY, width: rect.width / 2, pointer: event.pointerId, started: false, turn: { from: active, to: Math.max(0, Math.min(lastSpread, active + direction)), direction }, cover: boundary ? { side, target: !open, originalOpen: open, start: coverAngle(open, side), end: coverAngle(!open, side) } : undefined };
  }
  function moveDrag(event: PointerEvent<HTMLDivElement>) {
    const drag = gesture.current;
    if (!drag || drag.pointer !== event.pointerId) return;
    const dx = event.clientX - drag.x, dy = event.clientY - drag.y;
    if (!drag.started) {
      if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 8) { gesture.current = null; return; }
      if (-dx * drag.turn.direction < 7) return;
      drag.started = true; busy.current = true; suppressClick.current = true; event.currentTarget.setPointerCapture(event.pointerId); setDragging(true); rotation.set(0);
      if (drag.cover) { prepareCover(drag.cover.target, drag.cover.side); setCoverMoving(true); coverTarget.current = drag.cover.originalOpen; }
      else if (motionAllowed) setTurn(drag.turn);
    }
    event.preventDefault();
    const progress = Math.max(0, Math.min(.995, -dx * drag.turn.direction / (drag.width * 1.25)));
    rotation.set(-drag.turn.direction * progress * 180);
    if (drag.cover && motionAllowed) coverRotation.set(drag.cover.start + (drag.cover.end - drag.cover.start) * progress);
  }
  function endDrag(event: PointerEvent<HTMLDivElement>, cancel = false) {
    const drag = gesture.current;
    if (!drag || drag.pointer !== event.pointerId) return;
    if (!drag.started) { gesture.current = null; return; }
    const commit = !cancel && Math.abs(rotation.get()) >= 42;
    if (drag.cover) {
      gesture.current = null; busy.current = false; setDragging(false);
      animateCover(commit ? drag.cover.target : drag.cover.originalOpen, drag.cover.side);
    } else finish(drag.turn, commit);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  }
  const left = turn?.direction === -1 ? turn.to : active, right = turn?.direction === 1 ? turn.to : active;
  return <div className={s.library}>
    <div className={s.toolbar}><span>THE PROJECT JOURNAL</span><span>VOL. 01 / FOUR EXPLORATIONS</span>{open ? <button type="button" className={s.closeBook} disabled={coverMoving || !!turn || dragging} onClick={() => toggleCover(false)}>Close the book <ArrowDownLeft size={16} aria-hidden="true" /></button> : <span>OPEN TO CURIOSITY</span>}</div>
    <div role="tablist" aria-label="Project chapters" className={s.tabs} data-open={open} inert={!open}>
      {spreads.map((name, i) => <button type="button" key={name} role="tab" id={`${id}-tab-${i}`} aria-selected={active === i} aria-controls={`${id}-panel`} aria-disabled={!!turn || coverVisible} tabIndex={active === i ? 0 : -1} onClick={() => select(i)} onKeyDown={event => {
        if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return; event.preventDefault(); if (busy.current || coverVisible) return;
        const next = event.key === "Home" ? 0 : event.key === "End" ? lastSpread : i + (event.key === "ArrowRight" ? 1 : -1); select(next); document.getElementById(`${id}-tab-${next}`)?.focus();
      }}><span>{i === 0 || i === lastSpread ? "—" : `0${i}`}</span> {name}</button>)}
    </div>
    <div className={s.stage}><div className={s.book} id={`${id}-panel`} role={open ? "tabpanel" : "group"} aria-label={open ? undefined : "Project journal"} aria-labelledby={open ? `${id}-tab-${active}` : undefined} aria-describedby={`${id}-hint`} aria-busy={!!turn || coverMoving} tabIndex={open ? 0 : -1} data-open={open} data-cover-side={coverSide} data-dragging={dragging}
      onPointerDown={startDrag} onPointerMove={moveDrag} onPointerUp={event => endDrag(event)} onPointerCancel={event => endDrag(event, true)} onLostPointerCapture={event => { if (gesture.current?.started) endDrag(event, true); }} onDragStart={event => event.preventDefault()} onClickCapture={event => { if (suppressClick.current) { event.preventDefault(); event.stopPropagation(); suppressClick.current = false; } }}>
      <motion.div className={s.backBoard} style={{ clipPath: open && coverVisible ? boardReveal : "none" }} aria-hidden="true" />
      <div className={s.binding} aria-hidden="true"><span>SELECTED WORKS</span><span>H. CANNAVARO</span></div>
      <motion.div className={s.pageBlockLeft} style={{ opacity: coverVisible && open ? leftPaperReveal : 1 }} aria-hidden="true"><i /><b /><span /></motion.div>
      <motion.div className={s.pageBlockRight} style={{ opacity: coverVisible && open ? rightPaperReveal : 1 }} aria-hidden="true"><i /><b /><span /></motion.div>
      <div className={s.pageEdges} aria-hidden="true" />
      <div className={s.spread} data-open={open}>
        <motion.div className={s.baseLeft} style={{ opacity: coverVisible ? leftPaperReveal : 1 }} inert={!open || coverVisible || !!turn}><LeftContent index={left} /></motion.div><motion.div className={s.rightPage} style={{ opacity: coverVisible ? rightPaperReveal : 1 }} inert={!open || coverVisible || !!turn}><RightContent index={right} /></motion.div><div className={s.spine} style={{ visibility: coverVisible ? "hidden" : "visible" }} aria-hidden="true" />
        {turn && <><motion.div className={s.castShadow} style={{ opacity: shadow }} aria-hidden="true" /><motion.div className={s.turningSheet} data-direction={turn.direction} style={{ rotateY: rotation }} aria-hidden="true" inert>
          <div className={s.sheetFront}>{turn.direction === 1 ? <RightContent index={turn.from} /> : <LeftContent index={turn.from} />}<motion.div className={s.pageShade} style={{ opacity: shadow }} /></div>
          <div className={s.sheetBack}>{turn.direction === 1 ? <LeftContent index={turn.to} /> : <RightContent index={turn.to} />}<motion.div className={s.pageShine} style={{ opacity: highlight }} /></div><div className={s.paperEdge} />
        </motion.div></>}
      </div>
      <motion.div className={s.cover} data-side={coverSide} style={{ z: 8, rotateY: coverRotation, visibility: coverVisible ? "visible" : "hidden" }} inert={open || coverMoving} aria-hidden={open || coverMoving}>
        <div className={s.coverForeEdge} aria-hidden="true" /><div className={s.coverTailEdge} aria-hidden="true" /><div className={s.coverFront}><div className={s.coverTop}><span>HAIKAL CANNAVARO</span><span>VOL. 01</span></div><Asterisk className={s.coverMark} strokeWidth={.8} /><h3 className={s.coverTitle}>{coverSide === "front" ? <>Selected<br /><em>works.</em></> : <>Until the<br /><em>next idea.</em></>}</h3><p>A COLLECTION OF DIGITAL EXPERIENCES<br />WEB · MOBILE · ARTIFICIAL INTELLIGENCE</p><button id={`${id}-open`} className={s.openBook} disabled={open} onClick={event => { event.stopPropagation(); toggleCover(true); }}>{coverSide === "front" ? "Open the book" : "Open from the back"} <ArrowUpRight size={19} /></button><div className={s.coverBottom}><span>DESIGNED & DEVELOPED BY HAIKAL</span><span>2024—2026</span></div></div>
        <div className={s.coverBack} aria-hidden="true"><CoverImprint /></div>
        <motion.div className={s.coverLighting} style={{ opacity: coverShade }} aria-hidden="true" />
      </motion.div>
      {!turn && open && <><span className={s.leftCurl} aria-hidden="true" /><span className={s.rightCurl} aria-hidden="true" /></>}
    </div></div>
    <div className={s.controls} data-open={open} inert={!open}><button aria-disabled={!!turn || coverVisible} onClick={() => select(active - 1)}><span>←</span> {active === 0 ? "Close front cover" : "Previous spread"}</button><div><span aria-live="polite" aria-atomic="true">{active === 0 ? "01" : active === lastSpread ? "10" : `${String(active * 2).padStart(2, "0")}—${String(active * 2 + 1).padStart(2, "0")}`} / 10</span><p id={`${id}-hint`}>CLICK, HOLD & DRAG A PAGE · OR USE THE ARROWS</p></div><button aria-disabled={!!turn || coverVisible} onClick={() => select(active + 1)}>{active === lastSpread ? "Close back cover" : "Next spread"} <span>→</span></button></div>
    {!open && <p className={s.coverHint}>{coverSide === "front" ? "DRAG THE COVER TO THE LEFT TO OPEN" : "DRAG THE BACK COVER TO THE RIGHT TO REOPEN"}</p>}
    {open && <div className={s.closeRow}><button type="button" className={s.closeBook} disabled={coverMoving || !!turn || dragging} onClick={() => toggleCover(false)}>Close the book <ArrowDownLeft size={16} aria-hidden="true" /></button></div>}
  </div>;
}
