import SkillsMotion from "./SkillsMotion";
import styles from "./SkillsSection.module.css";

const skillGroups = [
  { title: "Web Development", skills: ["HTML", "CSS", "JavaScript", "Tailwind CSS", "Node.js", "Laravel"] },
  { title: "Languages & Mobile", skills: ["Go", "Java", "C++", "C#", "Flutter"] },
  { title: "Data & APIs", skills: ["MySQL", "Prisma", "Postman"] },
  { title: "Design & Tools", skills: ["Figma", "Blender", "Git", "GitHub"] },
];

export default function SkillsSection() {
  return (
    <section id="skills" aria-label="Skills">
      <SkillsMotion>
        <div className={styles.compactSkills}>
          <header className={styles.header}>
            <p className={styles.eyebrow}>Tech Stack</p>
            <h2>Skills</h2>
          </header>

          <div className={styles.grid}>
            {skillGroups.map(({ title, skills }, index) => (
              <div className={styles.group} key={title}>
                <h3>
                  <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  {title}
                </h3>
                <ul>
                  {skills.map((skill) => <li key={skill}>{skill}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </SkillsMotion>
    </section>
  );
}
