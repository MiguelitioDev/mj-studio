import { Check } from "lucide-react";
import { useId, useState } from "react";
import { Container } from "../../components/ui/Container";
import { PriceTag } from "../../components/ui/PriceTag";
import { WhatsAppLink } from "../../components/ui/WhatsAppLink";
import { site } from "../../config/site";
import { extras } from "../../data/extras";
import { MONTHLY_MIN_MONTHS, plans, type Billing } from "../../data/plans";
import styles from "./Plans.module.css";

const BILLING_OPTIONS: ReadonlyArray<{ value: Billing; label: string }> = [
  { value: "mensal", label: "Mensalidade" },
  { value: "projeto", label: "Projeto avulso" },
];

export function Plans() {
  const [billing, setBilling] = useState<Billing>("mensal");
  const groupId = useId();
  const isMonthly = billing === "mensal";

  return (
    <section id="pacotes" className={styles.section}>
      <Container>
        <div className={styles.header} data-reveal>
          <h2 className={styles.title}>
            {isMonthly
              ? "Seu site no ar por uma mensalidade que cabe no caixa"
              : "Pague uma vez só e fique com o site"}
          </h2>
          <p className={styles.subtitle}>
            {isMonthly
              ? "Sem taxa de entrada. Criação, hospedagem, segurança e alterações do mês ficam por nossa conta."
              : "O mesmo site, em pagamento único e sem contrato de mensalidade."}
          </p>
        </div>

        <div
          role="radiogroup"
          aria-label="Forma de contratação"
          className={`${styles.toggle} glass`}
          data-reveal
        >
          {BILLING_OPTIONS.map((option) => {
            const checked = billing === option.value;
            return (
              <label
                key={option.value}
                className={[styles.toggleOption, checked ? styles.toggleOptionOn : ""]
                  .filter(Boolean)
                  .join(" ")}
              >
                <input
                  type="radio"
                  name={`${groupId}-forma`}
                  value={option.value}
                  checked={checked}
                  onChange={() => setBilling(option.value)}
                  className={styles.toggleInput}
                />
                <span>{option.label}</span>
              </label>
            );
          })}
        </div>

        <div className={styles.grid}>
          {plans.map((plan, index) => {
            const isRecommended = Boolean(plan.recommended);
            const price = isMonthly ? plan.monthly : plan.project;
            const benefits = isMonthly ? plan.monthlyBenefits : plan.projectBenefits;
            const cardClasses = [
              styles.card,
              isRecommended ? styles.cardRecommended : "",
            ]
              .filter(Boolean)
              .join(" ");

            return (
              <article
                key={plan.slug}
                className={`${cardClasses} glass glass-sheen`}
                data-reveal=""
                data-rv-i={index}
              >
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
                  <PriceTag
                    value={price}
                    suffix={isMonthly ? "/mês" : "pagamento único"}
                    size="lg"
                    className={styles.price}
                  />
                  <p className={styles.payment}>
                    {isMonthly
                      ? `Sem entrada · mínimo de ${MONTHLY_MIN_MONTHS} meses`
                      : "50% para começar e 50% na entrega"}
                  </p>
                  <p className={styles.deadline}>
                    <strong>Site pronto:</strong> {plan.deadline}
                  </p>
                </div>

                <ul className={styles.includesList}>
                  {[...plan.includes, ...benefits].map((item) => (
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
                      planPrice: price,
                      planBilling: billing,
                    }}
                  >
                    {isMonthly
                      ? `Quero o ${plan.name} mensal`
                      : `Quero o ${plan.name} avulso`}
                  </WhatsAppLink>
                </div>
              </article>
            );
          })}
        </div>

        <p className={styles.gridNote}>
          {isMonthly ? site.payment.mensal : site.payment.projeto}
        </p>

        <details className={`${styles.extras} glass`} data-reveal>
          <summary className={styles.extrasSummary}>Extras e custos à parte</summary>
          <dl className={styles.extrasList}>
            {extras.map((extra) => (
              <div key={extra.name} className={styles.extraRow}>
                <dt className={styles.extraName}>{extra.name}</dt>
                <dd className={styles.extraPrice}>{extra.price}</dd>
              </div>
            ))}
          </dl>
        </details>
      </Container>
    </section>
  );
}
