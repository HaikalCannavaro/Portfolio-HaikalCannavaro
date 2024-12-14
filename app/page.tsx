import About from "../components/about/About"
import Hero from "../components/hero/Hero"
import Nav from "../components/navbar/NavMenuButton"
import NavHome from "../components/navhome/NavHome"
import styles from "./page.module.css"
export default function Home() {
  return (
    <>
    <div className={styles.Nav}>
      <NavHome/>
      <Nav/>
    </div>
    <main>
      <section id="hero">
        <Hero/>
      </section>
      <section id="about">
        <About/>
      </section>
    </main>
    </>
  );
}
