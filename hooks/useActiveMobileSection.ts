"use client";

import { useEffect, useState } from "react";

export const mobileSections = ["m-home", "m-work", "m-about", "m-skills", "m-contact"] as const;

export default function useActiveMobileSection() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const media = matchMedia("(max-width: 768px)");
    const sections = mobileSections.map(id => document.getElementById(id));
    let tops: number[] = [];
    const update = () => {
      if (!media.matches || !tops.length) return;
      const bottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
      const marker = window.scrollY + Math.min(window.innerHeight * .35, 250);
      const next = tops.findIndex(top => top > marker);
      setActive(bottom || next === -1 ? tops.length - 1 : Math.max(0, next - 1));
    };
    const measure = () => {
      if (!media.matches) return;
      tops = sections.map(section => section ? section.getBoundingClientRect().top + window.scrollY : Infinity);
      update();
    };
    const observer = new ResizeObserver(measure);
    sections.forEach(section => { if (section) observer.observe(section); });
    measure();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", measure);
    media.addEventListener("change", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", measure);
      media.removeEventListener("change", measure);
    };
  }, []);
  return active;
}
