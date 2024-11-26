import { motion } from 'framer-motion';
import Link from 'next/link';
import styles from './style.module.css';
import { slide, scale } from '../../anim';

interface LinkData {
  title: string;
  href: string;
  index: number;
}

interface LinkProps {
  data: LinkData;
  isActive: boolean;
  setSelectedIndicator: (href: string) => void;
}

export default function Index({ data, isActive, setSelectedIndicator }: LinkProps) {
  const { title, href, index } = data;

  return (
    <motion.div
      className={styles.link}
      onMouseEnter={() => { setSelectedIndicator(href); }}
      custom={index}
      variants={slide}
      initial="initial"
      animate="enter"
      exit="exit"
    >
      <motion.div
        variants={scale}
        animate={isActive ? "open" : "closed"}
        className={styles.indicator}
      >
      </motion.div>
      <Link href={href}>{title}</Link>
    </motion.div>
  );
}
