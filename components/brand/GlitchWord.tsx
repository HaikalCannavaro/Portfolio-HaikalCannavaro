import styles from "./GlitchWord.module.css";

type GlitchWordProps = {
  children: string;
  dataText?: string;
};

export default function GlitchWord({ children, dataText = children }: GlitchWordProps) {
  return (
    <span className={styles.word}>
      <span className={styles.text}>{children}</span>
      <span className={styles.echo} data-text={dataText} aria-hidden="true" />
    </span>
  );
}
