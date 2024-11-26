'use client'
import styles from './Nav.module.css'
import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'  // Pastikan sudah mengimpor AnimatePresence
import Nav from './nav' // Sesuaikan dengan lokasi file Nav.tsx Anda
import MagneticEffect from "../../components/providers/MagneticEffect"
export default function Home() {
  const [isActive, setIsActive] = useState<boolean>(false); // Tipe state sebagai boolean

  return (
    <>
      <div onClick={() => setIsActive(!isActive)} className={styles.button}>
        <div className={`${styles.burger} ${isActive ? styles.burgerActive : ""}`}></div>
      </div>
      <AnimatePresence mode="wait">
        {isActive && <Nav />} {/* Menampilkan komponen Nav saat isActive adalah true */}
      </AnimatePresence>
    </>
  )
}
