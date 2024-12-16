import About from "../components/about/About";
import Hero from "../components/hero/Hero";
import Nav from "../components/navbar/NavMenuButton";
import NavHome from "../components/navhome/NavHome";
import Contact from "../components/contact/Contact";
import FlickeringGrid from "../components/providers/FlickeringGrids"; // Tambahkan ini
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      {/* Grid Background */}
      {/*<FlickeringGrid
        squareSize={3}
        gridGap={15}
        color="rgb(107, 114, 128)"
        maxOpacity={0.4}
        flickerChance={0.005}
      />
      */}
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
