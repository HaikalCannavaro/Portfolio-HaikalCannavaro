"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
export default function ProjectBackLink({ className }: { className?: string }) {
  const [collection, setCollection] = useState(false);
  const [href, setHref] = useState("/");
  useEffect(() => {
    const fromCollection = new URLSearchParams(window.location.search).get("from") === "all-projects";
    setCollection(fromCollection);
    setHref(fromCollection ? "/projects" : window.matchMedia("(max-width: 768px)").matches ? "/#m-work" : "/#d-work");
  }, []);
  return <Link href={href} className={className}>← {collection ? "Back to all projects" : "Back to selected work"}</Link>;
}
