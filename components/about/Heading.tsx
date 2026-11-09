'use client';

import { motion, useAnimation, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';
import useDesktopMotion from "../../hooks/useDesktopMotion";

interface AnimateHeadingProps {
  title: string;
  className?: string;
  delay?: number;
}

export default function AnimateHeading(props: AnimateHeadingProps) {
  const animate = useDesktopMotion();
  return animate ? <AnimatedHeading {...props} /> : <h3 className={props.className}>{props.title}</h3>;
}

function AnimatedHeading({ title, className, delay = 0 }: AnimateHeadingProps) {
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
    <h3 ref={ref} className={className} aria-label={title}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          aria-hidden="true"
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
}
