import styles from "./GlitchWord.module.css";

export default function GlitchWord({ children }: { children: string }) {
  return (
    <span className={styles.word}>
      <span className={styles.text}>{children}</span>
      <span className={styles.echo} data-word={children} aria-hidden="true">
        <span className={styles.middle} data-slice={children} />
      </span>
    </span>
  );
}
