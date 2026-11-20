import styles from "./GlitchWord.module.css";

type GlitchWordProps = {
  children: string;
  dataText?: string;
};

export default function GlitchWord({ children, dataText }: GlitchWordProps) {
  const hasAlternate = dataText !== undefined && dataText !== children;

  return (
    <span className={hasAlternate ? `${styles.word} ${styles.switching}` : styles.word}>
      <span className={styles.text}>{children}</span>
      {hasAlternate && (
        <span className={styles.alternate} aria-hidden="true">{dataText}</span>
      )}
      <span
        className={styles.echo}
        data-text={dataText ?? children}
        data-transition={hasAlternate ? "forward" : undefined}
        aria-hidden="true"
      />
      {hasAlternate && (
        <span className={styles.echo} data-text={children} data-transition="back" aria-hidden="true" />
      )}
    </span>
  );
}
