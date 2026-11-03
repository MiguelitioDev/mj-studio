import { Suspense } from "react";
import type { SiteModel } from "../data/models";
import { niches } from "../data/niches";
import { plans } from "../data/plans";
import { getDemo } from "../demos/registry";
import { BrowserFrame } from "./ui/BrowserFrame";
import { Button } from "./ui/Button";
import { PriceTag } from "./ui/PriceTag";
import { WhatsAppLink } from "./ui/WhatsAppLink";
import styles from "./ModelCard.module.css";

export interface ModelCardProps {
  model: SiteModel;
}

export function ModelCard({ model }: ModelCardProps) {
  const niche = niches.find((item) => item.slug === model.niche);
  const plan = plans.find((item) => item.slug === model.recommendedPlan);
  const DemoComponent = getDemo(model.slug);
  const price = plan ? plan.monthly : 97;

  return (
    <article className={styles.card}>
      <BrowserFrame urlLabel={`modelo-${model.slug}.com.br`}>
        {DemoComponent ? (
          <Suspense fallback={<div className={styles.demoFallback} />}>
            <DemoComponent compact />
          </Suspense>
        ) : (
          <div className={styles.demoFallback} />
        )}
      </BrowserFrame>

      <div className={styles.body}>
        <div className={styles.header}>
          <h3 className={styles.name}>{model.name}</h3>
          {niche && <span className={styles.nicheTag}>{niche.label}</span>}
        </div>

        <p className={styles.idealFor}>
          <strong>Ideal para:</strong> {model.idealFor}
        </p>

        <p className={styles.summary}>{model.summary}</p>

        <div className={styles.footer}>
          <div className={styles.priceRow}>
            <PriceTag value={price} prefix="a partir de" suffix="/mês" size="md" />
            {plan && <span className={styles.planHint}>no pacote {plan.name}</span>}
          </div>

          <div className={styles.actions}>
            <Button
              to={`/modelos/${model.slug}`}
              variant="secondary"
              aria-label={`Ver modelo ${model.name}`}
            >
              Ver modelo
            </Button>
            <WhatsAppLink
              variant="primary"
              message={{
                source: "model",
                nicheLabel: niche?.label,
                modelName: model.name,
                planName: plan?.name,
                planPrice: plan?.monthly,
                planBilling: "mensal",
              }}
              aria-label={`Quero o modelo ${model.name} (abre o WhatsApp)`}
            >
              Quero este
            </WhatsAppLink>
          </div>
        </div>
      </div>
    </article>
  );
}
