import About from "../components/about/About";
import Hero from "../components/hero/Hero";
import Nav from "../components/navbar/NavMenuButton";
import NavHome from "../components/navhome/NavHome";
import Contact from "../components/work/Work";
import FlickeringGrid from "../components/providers/FlickeringGrids";
import ResetOnRefresh from "../components/providers/ResetOnRefresh"; // 1. Import komponen reset
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      {/* Panggil komponen reset-nya di mana aja (dia invisible) */}
      <ResetOnRefresh />

      {/* Navigation */}
      <div className={styles.Nav}>
        <NavHome />
        <Nav />
      </div>

      {/* Main Content */}
      <main>
        <section id="hero">
          <Hero />
        </section>
        <section id="about">
          <About />
        </section>
        <section id="contact">
          <Contact />
        </section>
      </main>
    </>
  );
}
