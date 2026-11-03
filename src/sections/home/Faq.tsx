import { ChevronDown } from "lucide-react";
import { Container } from "../../components/ui/Container";
import { faq } from "../../data/faq";
import styles from "./Faq.module.css";

export function Faq() {
  return (
    <section id="perguntas" className={styles.section}>
      <Container>
        <div className={styles.header} data-reveal>
          <h2 className={styles.title}>Perguntas frequentes</h2>
          <p className={styles.subtitle}>
            Respostas diretas sobre prazos, domínio, hospedagem e pagamento.
          </p>
        </div>

        <div className={styles.list}>
          {faq.map((item, index) => (
            <details
              key={item.question}
              className={`${styles.details} glass`}
              data-reveal=""
              data-rv-i={index % 4}
            >
              <summary className={styles.summary}>
                <span>{item.question}</span>
                <ChevronDown
                  size={20}
                  className={styles.chevron}
                  aria-hidden="true"
                />
              </summary>
              <div className={styles.answer}>
                <p>{item.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
