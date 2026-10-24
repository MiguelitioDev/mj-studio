import { useState } from "react";
import { Link } from "react-router";
import { ModelCard } from "../../components/ModelCard";
import { Container } from "../../components/ui/Container";
import { Tabs, type TabOption } from "../../components/ui/Tabs";
import { models } from "../../data/models";
import { niches, type NicheFilterSlug } from "../../data/niches";
import styles from "./ModelsShowcase.module.css";

const tabOptions: readonly TabOption[] = niches.map((niche) => ({
  id: niche.slug,
  label: niche.label,
}));

export function ModelsShowcase() {
  const [activeTab, setActiveTab] = useState<NicheFilterSlug>("todos");

  const filteredModels =
    activeTab === "todos"
      ? models
      : models.filter((model) => model.niche === activeTab);

  const visibleModels = filteredModels.slice(0, 6);
  const catalogUrl =
    activeTab === "todos" ? "/modelos" : `/modelos?nicho=${activeTab}`;

  return (
    <section id="modelos" className={styles.section}>
      <Container>
        <div className={styles.header}>
          <h2 className={styles.title}>Modelos prontos para o seu ramo</h2>
          <p className={styles.subtitle}>
            Cada modelo é ajustado com as cores, fotos e textos do seu negócio
            antes de ir ao ar.
          </p>
        </div>

        <Tabs
          tabs={tabOptions}
          value={activeTab}
          onChange={(id) => setActiveTab(id as NicheFilterSlug)}
          idPrefix="home-modelos"
          ariaLabel="Filtrar modelos por ramo de negócio"
        >
          <div className={styles.grid}>
            {visibleModels.map((model) => (
              <ModelCard key={model.slug} model={model} />
            ))}
          </div>
        </Tabs>

        <div className={styles.footer}>
          <Link to={catalogUrl} className={styles.catalogLink}>
            Ver catálogo completo
          </Link>
        </div>
      </Container>
    </section>
  );
}
