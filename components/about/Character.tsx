'use client';
import React, { useRef } from 'react';
import styles from '../about/About.module.css';
import { useScroll, motion, useTransform, UseScrollOptions } from 'framer-motion';

interface ParagraphProps {
    value: string;
    // Menggunakan tipe bawaan framer-motion untuk offset
    offset?: UseScrollOptions["offset"];
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

const Paragraph: React.FC<ParagraphProps> = ({ 
    value, 
    offset = ["start 0.7", "start 0.25"] 
}) => {
    const element = useRef<HTMLParagraphElement | null>(null);
    const { scrollYProgress } = useScroll({
        target: element,
        offset: offset
    });

    const words = value.split(" ");

    return (
        <p className={styles.paragraph} ref={element}>
            {words.map((word, i) => {
                const start = i / words.length;
                const end = start + (1 / words.length);
                return (
                    <React.Fragment key={i}>
                        <Word
                            range={[start, end]}
                            progress={scrollYProgress}
                        >
                            {word}
                        </Word>
                        {/* INI KUNCINYA: Tambahkan spasi asli setelah komponen Word. 
                            Spasi ini yang bakal diregangkan oleh text-align: justify */}
                        {i < words.length - 1 && " "}
                    </React.Fragment>
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
