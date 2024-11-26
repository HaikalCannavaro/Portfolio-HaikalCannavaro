'use client';
import React, { useRef } from 'react';
import styles from '../about/About.module.css';
import { useScroll, motion, useTransform } from 'framer-motion';

interface WordProps {
    value: string;
}

interface IndividualWordProps {
    children: string;
    range: [number, number];
    progress: any;
}

const Word: React.FC<WordProps> = ({ value }) => {
    const element = useRef<HTMLParagraphElement | null>(null);
    const { scrollYProgress } = useScroll({
        target: element,
        offset: ["start 0.9", "start 0.5"]
    });

    const words = value.split(" ");

    return (
        <p
            className={styles.paragraph}
            ref={element}
        >
            {words.map((word, i) => {
                const start = i / words.length;
                const end = start + (1 / words.length);
                return (
                    <IndividualWord
                        key={i}
                        range={[start, end]}
                        progress={scrollYProgress}
                    >
                        {word}
                    </IndividualWord>
                );
            })}
        </p>
    );
};

const IndividualWord: React.FC<IndividualWordProps> = ({ children, range, progress }) => {
    const opacity = useTransform(progress, range, [0, 1]);

    return (
        <span className={styles.word}>
            <span className={styles.shadow}>
                {children}
            </span>
            <motion.span style={{ opacity }}>
                {children}
            </motion.span>
        </span>
    );
};

export default Word;
