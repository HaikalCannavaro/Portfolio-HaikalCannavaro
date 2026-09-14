import style from '../about/About.module.css'
import Character from '../about/Character';
import AnimateHeading from "../about/Heading";
import AnimateBody from './Body';
import Skills from "./skills/skills"

const para1 = "Hi! My name is Haikal Cannavaro, and I am an aspiring software developer with a strong curiosity for modern technologies. My journey into programming started with a simple fascination for how things work behind the screen, which quickly grew into a passion for building functional web applications. I constantly challenge myself to learn new tech stacks, from designing interactive user interfaces to understanding backend architectures. What makes my approach different is my proficiency in AI-Assisted Development. Instead of just writing code manually, I actively use Large Language Models (LLMs) and advanced AI tools to speed up my workflow, debug issues faster, and build smarter solutions. I integrate prompt engineering into my daily development process to automate tasks and collaborate with AI effectively. I am driven by innovation, always eager to learn emerging trends, and fully committed to turning creative ideas into real digital products.";

export default function Home() {
    return (
        <main>
            {/* SECTION 1: ABOUT ME */}
            <section className={style.aboutContainer}>
                <div className={style.aboutDesc}>
                    <div className={style.headerWrapper}>
                        <AnimateHeading title="About Me" className={style.aboutText} delay={0.5} />
                    </div>
                    <Character 
                        value={para1} 
                        offset={["start 0.6", "start 0.2"]} 
                    />
                </div>
            </section>

            {/* SECTION 2: EDUCATION */}
            <section className={style.educationContainer}>
                <div className={style.headerWrapper}>
                    <AnimateHeading title="Education" className={style.aboutText} delay={0.5} />
                </div>

                <div className={style.aboutProfile}>
                    {/* Card 1: Telkom University */}
                    <a href="https://telkomuniversity.ac.id" target="_blank" rel="noopener noreferrer" className={style.schoolContainer}>
                        <div className={style.schoolContentWrapper}>
                            <AnimateHeading title="Telkom University Bandung" className={style.schoolText} delay={0.5} />
                            <div className={style.schoolDescContainer}>
                                <AnimateBody title="Bachelor of Science in Software Engineering" className={style.schoolDesc} delay={1} />
                                <AnimateBody title="2023 - Present" className={style.schoolYear} delay={1.5} />
                            </div>
                            <div className={style.schoolLinkBtn}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </div>
                    </a>

                    {/* Card 2: SMA Pius */}
                    <a href="https://smapius-tegal.sch.id" target="_blank" rel="noopener noreferrer" className={style.schoolContainer}>
                        <div className={style.schoolContentWrapper}>
                            <AnimateHeading title="Pius Tegal Senior Highschool" className={style.schoolText} delay={0.5} />
                            <div className={style.schoolDescContainer}>
                                <AnimateBody title="Science Major" className={style.schoolDesc} delay={1} />
                                <AnimateBody title="2020 - 2023" className={style.schoolYear} delay={1.5} />
                            </div>
                            <div className={style.schoolLinkBtn}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </div>
                    </a>
                </div>
            </section>

            {/* SECTION 3: SKILLS (Terpisah dari struktur di atas karena punya file CSS dan animasi sendiri) */}
            <Skills />
        </main>
    );
}
