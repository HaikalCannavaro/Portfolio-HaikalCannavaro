"use client"
import React, { useState } from 'react'
import styles from './style.module.css'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { menuSlide } from '../anim'
import Link from './link'
import Curve from './curve';
import MagneticEffect from "../../providers/MagneticEffect"
interface NavItem {
  title: string
  href: string
}

interface LinkProps {
  data: NavItem & { index: number }
  isActive: boolean
  setSelectedIndicator: React.Dispatch<React.SetStateAction<string>>
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
    title: "Work",
    href: "#work",
  },
  {
    title: "Contact",
    href: "#contact",
  },
]

const Index: React.FC = () => {
  const pathname = usePathname()
  const [selectedIndicator, setSelectedIndicator] = useState<string>(pathname)

  return (
    <motion.div
      variants={menuSlide}
      initial="initial"
      animate="enter"
      exit="exit"
      className={styles.menu}
    >
      <div className={styles.body}>
        <div onMouseLeave={() => setSelectedIndicator(pathname)} className={styles.nav}>
          <div className={styles.header}>
            <p>Navigation</p> 
          </div>
          {navItems.map((data, index) => (
            <MagneticEffect key={index}>
            <Link
              key={index}
              data={{ ...data, index }}
              isActive={selectedIndicator === data.href}
              setSelectedIndicator={setSelectedIndicator}
            />
            </MagneticEffect>
          ))}
        </div>
        
        <div className={styles.footer}>
          <a href="#">Github</a>
          <a href="https://www.instagram.com/haikalcnnvr/profilecard/?igsh=cXYyZmI0ZDR6M3U1" target="_blank">Instagram</a>
          <a href="#">Email</a>
          <a href="#">LinkedIn</a>
        </div>
      </div>
      <Curve/>
    </motion.div>
  )
}

export default Index
