'use client';

import { motion, useAnimation, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface AnimateHeadingProps {
  title: string;
  className?: string;
  delay?: number;
}

const AnimateHeading: React.FC<AnimateHeadingProps> = ({ title, className, delay = 0 }) => {
  const ref = useRef<HTMLHeadingElement | null>(null);
  const ctrls = useAnimation();
  const inView = useInView(ref);

  useEffect(() => {
    if (inView) {
      ctrls.start('visible');
    }
  }, [ctrls, inView]);

  const headingAnimation = {
    hidden: {
      opacity: 0,
      y: '1em',
    },
    visible: (index: number) => ({
      opacity: 1,
      y: '0em',
      transition: {
        duration: 0.5,
        delay: delay + index * 0.4, // Delay bertahap untuk setiap kata
        ease: 'easeInOut',
      },
    }),
  };

  // Pisahkan teks menjadi array kata-kata
  const words = title.split(' ');

  return (
    <h3 ref={ref} className={className}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          aria-hidden="true"
          role="hidden"
          custom={index} // Parameter untuk menentukan delay
          initial="hidden"
          animate={ctrls}
          variants={headingAnimation}
        >
          {word}
          {index < words.length - 1 && '\u00A0' /* Tambahkan spasi antar kata */}
        </motion.span>
      ))}
    </h3>
  );
};

export default AnimateHeading;
