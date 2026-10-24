import styles from "./SkipLink.module.css";

export function SkipLink() {
  return (
    <a href="#conteudo" className={styles.skipLink}>
      Pular para o conteúdo
    </a>
  );
}
