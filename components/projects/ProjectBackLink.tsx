"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { animateHistoryReturn, navigateWithCover, selectedWorkHref } from "../mobile/projectStoryNavigation";
export default function ProjectBackLink({ className }: { className?: string }) {
  const router = useRouter();
  const [collection, setCollection] = useState(false);
  const [href, setHref] = useState("/");
  useEffect(() => {
    const fromCollection = new URLSearchParams(window.location.search).get("from") === "all-projects";
    setCollection(fromCollection);
    const media = window.matchMedia("(max-width: 768px)");
    const storyPath = location.pathname;
    const sync = () => setHref(fromCollection ? "/projects" : media.matches ? selectedWorkHref(storyPath) : "/#d-work");
    const onBack = () => { if (!fromCollection) void animateHistoryReturn(storyPath); };
    sync();
    media.addEventListener("change", sync);
    window.addEventListener("popstate", onBack, true);
    return () => {
      media.removeEventListener("change", sync);
      window.removeEventListener("popstate", onBack, true);
    };
  }, []);
  const deck = href.startsWith("/?project=");
  return <Link href={href} scroll={deck ? false : undefined} className={className} onClick={event => {
    if (deck) navigateWithCover(event, location.pathname, "return", () => router.push(href, { scroll: false }));
  }}>← {collection ? "Back to all projects" : "Back to selected work"}</Link>;
}
