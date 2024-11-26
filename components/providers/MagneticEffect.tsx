import { useRef, useState, MouseEvent, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface FramerProps {
  children: ReactNode;
}

export default function Framer({ children }: FramerProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Faktor skala untuk mengurangi kekuatan magnetik
  const magneticStrength = 0.3; // Nilai antara 0 dan 1 (semakin kecil, semakin halus)

  const handleMouse = (e: MouseEvent<HTMLDivElement>) => {
    if (ref.current) {
      const { clientX, clientY } = e;
      const { height, width, left, top } = ref.current.getBoundingClientRect();
      const middleX = clientX - (left + width / 2);
      const middleY = clientY - (top + height / 2);

      // Terapkan faktor skala
      setPosition({
        x: middleX * magneticStrength,
        y: middleY * magneticStrength,
      });
    }
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;
  return (
    <motion.div
      style={{ position: 'relative' }}
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  );
}
