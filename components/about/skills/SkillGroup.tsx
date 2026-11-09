"use client";

import { useId, useState } from "react";
import styles from "./SkillsSection.module.css";

export default function SkillGroup({ title, skills, index }: {
  title: string; skills: string[]; index: number;
}) {
  const [open, setOpen] = useState(index === 0);
  const id = useId();
  return (
    <div className={styles.group}>
      <h3>
        <button type="button" className={styles.toggle} aria-expanded={open}
          aria-controls={id} onClick={() => setOpen((value) => !value)}>
          <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
          {title}
          <span className={styles.toggleIcon} aria-hidden="true">{open ? "−" : "+"}</span>
        </button>
      </h3>
      <div id={id} className={styles.disclosure} data-open={open} inert={!open}>
        <div><ul>{skills.map((skill) => <li key={skill}>{skill}</li>)}</ul></div>
      </div>
    </div>
  );
}
