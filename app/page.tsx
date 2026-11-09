import MobilePortfolio from "../components/mobile/MobilePortfolio";
import About from "../components/about/About";
import Hero from "../components/hero/Hero";
import Nav from "../components/navbar/NavMenuButton";
import NavHome from "../components/navhome/NavHome";
import Work from "../components/work/Work";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <MobilePortfolio />
      <div className={styles.desktop}>
      <div className={styles.Nav}>
        <NavHome />
        <Nav />
      </div>

      <main>
        <Hero />
        <section id="about">
          <About />
        </section>
        <section id="contact">
          <Work />
        </section>
      </main>
      </div>
    </>
  );
}
