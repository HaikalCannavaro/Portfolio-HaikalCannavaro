import About from "../components/about/About"
import styles from "./page.module.css"
import Hero from "../components/hero/Hero"
export default function Home() {
  return (
    <>
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
