import styles from "./GlitchWord.module.css";

export default function GlitchWord({ children }: { children: string }) {
  return (
    <span className={styles.word}>
      {children}
      <span className={styles.echo} data-word={children} aria-hidden="true" />
    </span>
  );
}
