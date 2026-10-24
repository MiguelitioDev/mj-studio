import { Check } from "lucide-react";
import { Container } from "../../components/ui/Container";
import { PriceTag } from "../../components/ui/PriceTag";
import { WhatsAppLink } from "../../components/ui/WhatsAppLink";
import { site } from "../../config/site";
import { extras } from "../../data/extras";
import { plans } from "../../data/plans";
import styles from "./Plans.module.css";

export function Plans() {
  return (
    <section id="pacotes" className={styles.section}>
      <Container>
        <div className={styles.header}>
          <h2 className={styles.title}>Pacotes e preços claros</h2>
          <p className={styles.subtitle}>
            Você sabe quanto custa e o que está incluso antes de começar.
          </p>
        </div>

        <div className={styles.grid}>
          {plans.map((plan) => {
            const isRecommended = Boolean(plan.recommended);
            const cardClasses = [
              styles.card,
              isRecommended ? styles.cardRecommended : "",
            ]
              .filter(Boolean)
              .join(" ");

            return (
              <article key={plan.slug} className={cardClasses}>
                <div className={styles.cardTop}>
                  <div className={styles.titleRow}>
                    <h3 className={styles.planName}>{plan.name}</h3>
                    {plan.badge && (
                      <span className={styles.badge}>{plan.badge}</span>
                    )}
                  </div>
                  <p className={styles.forWho}>{plan.forWho}</p>
                </div>

                <div className={styles.priceBlock}>
                  <PriceTag value={plan.price} size="lg" />
                  {site.payment && (
                    <p className={styles.payment}>{site.payment}</p>
                  )}
                  <p className={styles.deadline}>
                    <strong>Prazo:</strong> {plan.deadline}
                  </p>
                </div>

                <ul className={styles.includesList}>
                  {plan.includes.map((item) => (
                    <li key={item} className={styles.includeItem}>
                      <Check
                        size={18}
                        className={styles.checkIcon}
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className={styles.cardFooter}>
                  <WhatsAppLink
                    fullWidth
                    variant={isRecommended ? "primary" : "secondary"}
                    message={{
                      source: "plan",
                      planName: plan.name,
                      planPrice: plan.price,
                    }}
                  >
                    {`Quero o pacote ${plan.name}`}
                  </WhatsAppLink>
                </div>
              </article>
            );
          })}
        </div>

        <div className={styles.extrasBlock}>
          <h3 className={styles.extrasTitle}>Extras e custos à parte</h3>
          <dl className={styles.extrasList}>
            {extras.map((extra) => (
              <div key={extra.name} className={styles.extraRow}>
                <dt className={styles.extraName}>{extra.name}</dt>
                <dd className={styles.extraPrice}>{extra.price}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
