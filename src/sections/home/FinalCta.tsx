import { Link } from "react-router";
import { Container } from "../../components/ui/Container";
import { WhatsAppLink } from "../../components/ui/WhatsAppLink";
import styles from "./FinalCta.module.css";

export function FinalCta() {
  return (
    <section className={styles.section}>
      <Container>
        <div className={`${styles.box} on-dark`}>
          <img
            src="/brand/marca-branca.png"
            alt=""
            aria-hidden="true"
            width={40}
            height={56}
            className={styles.mark}
          />
          <h2 className={styles.title}>Me conta sobre o seu negócio.</h2>
          <p className={styles.subtitle}>
            Mande uma mensagem no WhatsApp ou monte seu pedido em menos de 2
            minutos.
          </p>

          <div className={styles.actions}>
            <WhatsAppLink
              message={{ source: "generic" }}
              className={styles.whatsappButton}
            >
              Conversar no WhatsApp
            </WhatsAppLink>

            <Link to="/orcamento" className={styles.quoteLink}>
              Montar pedido passo a passo
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
