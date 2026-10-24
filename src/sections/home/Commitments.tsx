import { Container } from "../../components/ui/Container";
import { commitments } from "../../data/process";
import styles from "./Commitments.module.css";

export function Commitments() {
  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.layout}>
          <div className={styles.header}>
            <h2 className={styles.title}>Nossos compromissos com você</h2>
            <p className={styles.subtitle}>
              Combinados claros desde o início para você contratar com
              tranquilidade.
            </p>
          </div>

          <ul className={styles.list}>
            {commitments.map((item) => (
              <li key={item} className={styles.item}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
