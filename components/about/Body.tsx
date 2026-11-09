'use client';

import { motion, useAnimation, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';
import useDesktopMotion from "../../hooks/useDesktopMotion";

interface AnimateBodyProps {
  title: string;
  className?: string;
  delay?: number;
}

export default function AnimateBody(props: AnimateBodyProps) {
  const animate = useDesktopMotion();
  return animate ? <AnimatedBody {...props} /> : <h3 className={props.className}>{props.title}</h3>;
}

function AnimatedBody({ title, className, delay = 0 }: AnimateBodyProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const ctrls = useAnimation();
  const inView = useInView(ref);

  useEffect(() => {
    if (inView) {
      ctrls.start('visible');
    }
  }, [ctrls, inView]);

  const bodyAnimation = {
    hidden: {
      opacity: 0,
      y: '1em',
    },
    visible: {
      opacity: 1,
      y: '0em',
      transition: {
        duration: 0.5,
        delay,
        ease: 'easeInOut',
      },
    },
  };


  return (
    <h3 className={className} aria-label={title}>
      <motion.span
        ref={ref}
        aria-hidden="true"
        initial="hidden"
        animate={ctrls}
        variants={bodyAnimation}
      >
        {title}
      </motion.span>
    </h3>
  );
}
