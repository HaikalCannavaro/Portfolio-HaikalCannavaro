"use client"
import { useState } from 'react'
import styles from './style.module.css'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { menuSlide } from '../anim'
import Link from './link'
import Curve from './curve';
import MagneticEffect from "../../providers/MagneticEffect"
import useMotionAllowed from "../../../hooks/useMotionAllowed"
import useDesktopMotion from "../../../hooks/useDesktopMotion"
interface NavItem {
  title: string
  href: string
}

const navItems: NavItem[] = [
  {
    title: "Home",
    href: "#hero",
  },
  {
    title: "About",
    href: "#about",
  },
  {
    title: "Skills",
    href: "#skills",
  },
  {
    title: "Work",
    href: "#work",
  },
]

export default function Nav({ onNavigate }: { onNavigate: () => void }) {
  const animate = useDesktopMotion()
  const motionAllowed = useMotionAllowed()
  const pathname = usePathname()
  const [selectedIndicator, setSelectedIndicator] = useState<string>(pathname)

  return (
    <motion.nav
      id="portfolio-menu"
      aria-label="Main navigation"
      variants={animate ? menuSlide : { initial: { opacity: 0, y: -12 }, enter: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -12 } }}
      initial={motionAllowed ? "initial" : false}
      animate="enter"
      transition={{ duration: motionAllowed ? 0.22 : 0 }}
      exit={motionAllowed ? "exit" : undefined}
      className={styles.menu}
    >
      <div className={styles.body}>
        <div onMouseLeave={() => setSelectedIndicator(pathname)} className={styles.nav}>
          <div className={styles.header}>
            <p>Navigation</p> 
          </div>
          {navItems.map((data, index) =>
            animate ? (
              <MagneticEffect key={data.href}>
                <Link
                  data={{ ...data, index }}
                  isActive={selectedIndicator === data.href}
                  setSelectedIndicator={setSelectedIndicator}
                  onNavigate={onNavigate}
                />
              </MagneticEffect>
            ) : (
              <a key={data.href} href={data.href} className={styles.compactLink} onClick={onNavigate}>
                {data.title}
              </a>
            )
          )}
        </div>
        
        <div className={styles.footer}>
          <a href="https://github.com/HaikalCannavaro" target="_blank">Github</a>
          <a href="https://www.instagram.com/haikalcnnvr" target="_blank">Instagram</a>
          <a href="mailto:haikalcannavaro64@gmail.com" target="_blank">Email</a>
          <a href="https://wa.me/6285943486854?text=I'm%20Haikal%20Cannavaro" target="_blank">WhatsApp</a>
        </div>
      </div>
      {animate && <Curve />}
    </motion.nav>
  )
}
