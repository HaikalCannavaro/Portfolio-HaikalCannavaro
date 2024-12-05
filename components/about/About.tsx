import style from '../about/About.module.css'
import Character from '../about/Character';
import AnimateHeading from "../about/Heading";
import AnimateBody from './Body';
import Image from "next/image";
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
                    <div className={style.titleContainer}>
                        <AnimateHeading title="Title" className={style.titleText} delay={0.5} />
                        <div className={style.titleDescContainer} >
                            <AnimateBody title="Lorem ipsum dolor sit amet, consectetur adipiscing elit." className={style.titleDesc} delay={1} />
                            <AnimateBody title="Lorem ipsum dolor sit amet, consectetur adipiscing elit." className={style.titleDesc} delay={1.5} />
                            <AnimateBody title="Lorem ipsum dolor sit amet, consectetur adipiscing elit." className={style.titleDesc} delay={2} />
                        </div>
                    </div>
                </div>

                <div className={style.skillsProfile}>
                    <div className={style.imageLeftContainer}>
                        <div className={style.image1LeftContainer}>
                            <Image src={"/image/JAVA.png"} width={75} height={75} alt="Java"/>
                            <div className={style.loader1}/>
                        </div>
                        <div className={style.image2LeftContainer}>
                            <Image src={"/image/C++.png"} width={75} height={75} alt="C++"/>
                            <div className={style.loader2}/>
                        </div>
                    </div>
                    <div className={style.middleSkillContainer}>
                        <div className={style.skillsContainer}>
                            <AnimateHeading title="Skills" className={style.skillsText} delay={0.5} />
                        </div>
                        <div className={style.image5MiddleContainer}>
                            <div className={style.loader5}/>
                            <Image src={"/image/GO2.png"} width={75} height={75} alt="GoLang" className={style.imgGo}/>
                        </div>
                    </div>
                    <div className={style.imageRightContainer}>
                        <div className={style.image3RightContainer}>
                            <div className={style.loader3}/>
                            <Image src={"/image/HTML.png"} width={75} height={75} alt="HTML"/>
                        </div>
                        <div className={style.image4RightContainer}>
                            <div className={style.loader4}/>
                            <Image src={"/image/CSS.png"} width={75} height={75} alt="CSS"/>
                        </div>
                    </div>
                </div>    
            </section>
        </main>
    );
}
