import { Container } from "../../components/ui/Container";
import { processSteps } from "../../data/process";
import styles from "./Process.module.css";

export function Process() {
  return (
    <section id="como-funciona" className={styles.section}>
      <Container>
        <div className={styles.header} data-reveal>
          <h2 className={styles.title}>Como funciona</h2>
          <p className={styles.subtitle}>
            Quatro etapas diretas, do primeiro contato até o site publicado no
            seu domínio.
          </p>
        </div>

        <ol className={styles.list}>
          {processSteps.map((step) => (
            <li
              key={step.number}
              className={`${styles.item} glass glass-sheen`}
              data-reveal=""
              data-rv-i={step.number - 1}
            >
              <span className={styles.number} aria-hidden="true">
                {step.number}
              </span>
              <div className={styles.content}>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDescription}>{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
