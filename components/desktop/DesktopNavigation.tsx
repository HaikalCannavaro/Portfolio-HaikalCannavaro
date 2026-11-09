"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { HCMonogram } from "../brand/BrandMarks";
import ThemeToggle from "./ThemeToggle";
import styles from "./DesktopNavigation.module.css";

const links = [
  { href: "#d-home", label: "Back to top", number: "00" },
  { href: "#d-work", label: "Selected work", number: "01" },
  { href: "#d-about", label: "About me", number: "02" },
  { href: "#d-skills", label: "Toolbox", number: "03" },
  { href: "#d-contact", label: "Let’s talk", number: "04" },
];

export default function DesktopNavigation() {
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const expanded = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const home = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setCompact(previous => window.scrollY > (previous ? 24 : 96));
    };
    const scroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    const resize = () => { if (window.innerWidth <= 768) setOpen(false); scroll(); };
    update();
    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("resize", resize, { passive: true });
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", scroll); window.removeEventListener("resize", resize); };
  }, []);

  useEffect(() => {
    if (compact) {
      if (expanded.current?.contains(document.activeElement)) trigger.current?.focus({ preventScroll: true });
    } else {
      setOpen(false);
      if (root.current?.contains(document.activeElement)) home.current?.focus({ preventScroll: true });
    }
  }, [compact]);

  useEffect(() => {
    if (!open) return;
    const outside = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") { event.preventDefault(); setOpen(false); trigger.current?.focus({ preventScroll: true }); }
    };
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    return () => { document.removeEventListener("pointerdown", outside); document.removeEventListener("keydown", escape); };
  }, [open]);

  function navigate(href: string) {
    setOpen(false);
    requestAnimationFrame(() => {
      const target = document.querySelector<HTMLElement>(href);
      if (target) { target.tabIndex = -1; target.focus({ preventScroll: true }); }
    });
  }

  return <>
    <div className={styles.spacer} aria-hidden="true" />
    <div ref={root} className={styles.root} data-compact={compact} data-open={open} onBlur={event => {
      if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpen(false);
    }}>
      <header className={styles.shell}>
        <div ref={expanded} className={styles.expanded} inert={compact} aria-hidden={compact}>
          <a ref={home} className={styles.logo} href="#d-home" aria-label="Haikal Cannavaro, home"><HCMonogram /></a>
          <span className={styles.identity}>HAIKAL CANNAVARO<br /><span>SOFTWARE DEVELOPER</span></span>
          <nav className={styles.topLinks} aria-label="Desktop sections"><a href="#d-work">Work <sup>04</sup></a><a href="#d-about">About</a><a href="#d-skills">Toolbox</a></nav>
          <ThemeToggle />
          <a className={styles.hello} href="#d-contact">Let’s talk <ArrowUpRight size={16} aria-hidden="true" /></a>
        </div>
        <button ref={trigger} type="button" className={styles.trigger} tabIndex={compact ? 0 : -1} aria-hidden={!compact} aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} aria-controls="desktop-floating-navigation" onClick={() => setOpen(value => !value)}>
          <span className={styles.emblem}><HCMonogram /></span>
        </button>
      </header>
      <div id="desktop-floating-navigation" className={styles.panel} inert={!open || !compact} aria-hidden={!open || !compact}>
        <div className={styles.panelHeading}><span>EXPLORE THE PORTFOLIO</span><ArrowDownLeft size={14} aria-hidden="true" /></div>
        <nav aria-label="Floating desktop sections">{links.map(link => <a key={link.href} href={link.href} onClick={() => navigate(link.href)}><span className={styles.number}>{link.number}</span><span>{link.label}</span><ArrowUpRight className={styles.arrow} size={20} aria-hidden="true" /></a>)}</nav>
        <div className={styles.panelFooter}><span>MAKE YOURSELF AT HOME.</span><ThemeToggle /></div>
      </div>
    </div>
  </>;
}
