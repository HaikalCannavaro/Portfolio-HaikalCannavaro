'use client';

import { motion, useAnimation, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface AnimateBodyProps {
  title: string;
  className?: string;
  delay?: number;
}

const AnimateBody: React.FC<AnimateBodyProps> = ({ title, className, delay = 0 }) => {
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
    <h3 className={className}>
      <motion.span
        ref={ref}
        aria-hidden="true"
        role="hidden"
        initial="hidden"
        animate={ctrls}
        variants={bodyAnimation}
      >
        {title}
      </motion.span>
    </h3>
  );
};

export default AnimateBody;