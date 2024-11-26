'use client';
import React, { useRef } from 'react';
import styles from '../about/About.module.css';
import { useScroll, motion, useTransform } from 'framer-motion';

interface ParagraphProps {
    value: string;
}

interface WordProps {
    children: string;
    progress: any;
    range: [number, number];
}

interface CharacterProps {
    children: string;
    progress: any;
    range: [number, number];
}

const Paragraph: React.FC<ParagraphProps> = ({ value }) => {
    const element = useRef<HTMLParagraphElement | null>(null);
    const { scrollYProgress } = useScroll({
        target: element,
        offset: ["start 0.8", "start 0.4"]
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
                    <Word
                        key={i}
                        range={[start, end]}
                        progress={scrollYProgress}
                    >
                        {word}
                    </Word>
                );
            })}
        </p>
    );
};

const Word: React.FC<WordProps> = ({ children, progress, range }) => {
    const characters = children.split("");
    const amount = range[1] - range[0];
    const step = amount / characters.length;

    return (
        <span className={styles.word}>
            {characters.map((char, i) => {
                const start = range[0] + (i * step);
                const end = range[0] + ((i + 1) * step);
                return (
                    <Character
                        key={i}
                        range={[start, end]}
                        progress={progress}
                    >
                        {char}
                    </Character>
                );
            })}
        </span>
    );
};

const Character: React.FC<CharacterProps> = ({ children, progress, range }) => {
    const opacity = useTransform(progress, range, [0, 1]);

    return (
        <span>
            <span className={styles.shadow}>{children}</span>
            <motion.span style={{ opacity }}>
                {children}
            </motion.span>
        </span>
    );
};

export default Paragraph;
