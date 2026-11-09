import { useId } from "react";

/** Vector marks avoid platform-dependent emoji colors and stay sharp at every size. */
export function FacetMark() {
  return <svg viewBox="0 0 100 100" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="4" strokeLinejoin="miter" aria-hidden="true" focusable="false" style={{ display: "inline-block", verticalAlign: "middle" }}><path d="M50 8 92 50 50 92 8 50Z" /><path d="M50 27 73 50 50 73 27 50Z" /><path d="m8 50 19 0m46 0h19" /></svg>;
}

export function HCMonogram() {
  const cut = useId();
  // Original swept HC emblem: shared structure, tapered tips and a diagonal cut.
  return <svg viewBox="0 0 80 72" width="68" height="52" fill="currentColor" aria-hidden="true" focusable="false" style={{ display: "block" }}>
    <defs><mask id={cut}><rect width="80" height="72" fill="white" /><path d="M10 54 70 29 68 33 10 58Z" fill="black" /></mask></defs>
    <g mask={`url(#${cut})`}>
      <path d="M8 58 25 12Q28 6 34 9l2 1-13 28 22-13-7 14-22 22Q6 66 8 58Z" />
      <path d="M71 17C64 5 50 7 43 18L27 49C22 62 38 65 52 60L68 48 51 51C42 55 36 52 40 44L49 26C53 18 59 17 71 17Z" />
    </g>
  </svg>;
}
