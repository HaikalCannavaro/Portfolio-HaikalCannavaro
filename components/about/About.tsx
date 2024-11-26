import style from '../about/About.module.css'
import Character from '../about/Character';
import AnimateHeading from "../about/Heading";
import AnimateBody from './Body';
const paragraph= "Hi! My name is Haikal Cannavaro, and I’m a beginner programmer just starting my journey in the world of software development.\nWith a strong passion for learning, I’m continuously honing my coding skills and exploring the latest technologies. I believe every line of code is a step toward creative solutions and innovation. Currently, I’m focusing on mastering the basics of programming, algorithm logic, and building simple projects to enhance my abilities. I’m committed to growing and learning in this exciting field."

export default function Home() {
    return (
        <main>
            <section className={style.aboutContainer}>
                <div className={style.aboutDesc}>
                    <AnimateHeading title="About Me" className={style.aboutText} delay={0.5} />
                    <Character value={paragraph}/>
                </div>

                <div className={style.aboutProfile}>
                    <div className={style.schoolContainer}>
                        <AnimateHeading title="School" className={style.schoolText} delay={0.5} />
                        <div className={style.schoolDescContainer} >
                            <AnimateBody title="Telkom University Bandung (2023 - Present)" className={style.schoolDesc} delay={1} />
                            <AnimateBody title="Pius Tegal Senior Highschool (2020 - 2023)" className={style.schoolDesc} delay={1.5} />
                            <AnimateBody title="Metta Maitreya Pekanbaru Junior Highschool (2018 - 2020)" className={style.schoolDesc} delay={2} />
                        </div>
                    </div>
                    <div className={style.skillsContainer}>
                        <AnimateHeading title="Skills" className={style.skillsText} delay={0.5} />
                        <div className={style.skillsDescContainer}>
                            <AnimateBody title="Go Language" className={style.skillsDesc} delay={1} />
                            <AnimateBody title="C++" className={style.skillsDesc} delay={1.5} />
                            <AnimateBody title="Java" className={style.skillsDesc} delay={2} />
                            <AnimateBody title="HTML" className={style.skillsDesc} delay={2.5} />
                            <AnimateBody title="CSS" className={style.skillsDesc} delay={3} />
                        </div>
                    </div>
                    <div className={style.schoolContainer}>
                        <AnimateHeading title="Title" className={style.schoolText} delay={0.5} />
                        <div className={style.schoolDescContainer} >
                            <AnimateBody title="Lorem ipsum dolor sit amet, consectetur adipiscing elit." className={style.schoolDesc} delay={1} />
                            <AnimateBody title="Lorem ipsum dolor sit amet, consectetur adipiscing elit." className={style.schoolDesc} delay={1.5} />
                            <AnimateBody title="Lorem ipsum dolor sit amet, consectetur adipiscing elit." className={style.schoolDesc} delay={2} />
                        </div>
                    </div>
                </div>    
            </section>
        </main>
    );
}
