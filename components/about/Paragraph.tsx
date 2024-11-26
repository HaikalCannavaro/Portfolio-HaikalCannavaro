'use client';
import React, { useRef } from 'react';
import styles from '../about/About.module.css'
import { useScroll, motion } from 'framer-motion';

interface ParagraphProps {
    value: string;
}

const Paragraph: React.FC<ParagraphProps> = ({ value }) => {
    const element = useRef<HTMLParagraphElement | null>(null);
    const { scrollYProgress } = useScroll({
        target: element,
        offset: ["start 0.9", "start 0.5"]
    });

    return (
        <motion.p
            className={styles.paragraph}
            ref={element}
            style={{ opacity: scrollYProgress }}
        >
            {value}
        </motion.p>
    );
};

export default Paragraph;
