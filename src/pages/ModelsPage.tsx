import { useSearchParams } from "react-router";
import { ModelCard } from "../components/ModelCard";
import { Button } from "../components/ui/Button";
import { Container } from "../components/ui/Container";
import { Tabs, type TabOption } from "../components/ui/Tabs";
import { WhatsAppLink } from "../components/ui/WhatsAppLink";
import { site } from "../config/site";
import { models } from "../data/models";
import { niches, type NicheFilterSlug } from "../data/niches";
import styles from "./ModelsPage.module.css";

const tabOptions: readonly TabOption[] = niches.map((niche) => ({
  id: niche.slug,
  label: niche.label,
}));

function isValidNicheSlug(value: string | null): value is NicheFilterSlug {
  if (!value) return false;
  return niches.some((niche) => niche.slug === value);
}

export default function ModelsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const nicheParam = searchParams.get("nicho");
  const activeTab: NicheFilterSlug = isValidNicheSlug(nicheParam)
    ? nicheParam
    : "todos";

  const handleTabChange = (nextId: string) => {
    if (nextId === "todos") {
      setSearchParams({}, { replace: true });
    } else {
      setSearchParams({ nicho: nextId }, { replace: true });
    }
  };

  const filteredModels =
    activeTab === "todos"
      ? models
      : models.filter((model) => model.niche === activeTab);

  const quoteUrl =
    activeTab === "todos" ? "/orcamento" : `/orcamento?nicho=${activeTab}`;

  return (
    <div className={styles.page}>
      <title>{`Modelos de site | ${site.name}`}</title>
      <meta
        name="description"
        content="Catálogo de modelos de site prontos para barbearias, clínicas, restaurantes, lojas, serviços, escritórios e profissionais autônomos."
      />

      <Container>
        <div className={styles.header}>
          <h1 className={styles.title}>Modelos de site</h1>
          <p className={styles.subtitle}>
            Escolha um estilo pensado para o seu ramo. Nós ajustamos cores,
            fotos, textos e botões do WhatsApp com os dados do seu negócio.
          </p>
        </div>

        <Tabs
          tabs={tabOptions}
          value={activeTab}
          onChange={handleTabChange}
          idPrefix="catalogo-modelos"
          ariaLabel="Filtrar modelos por ramo de negócio"
        >
          <div className={styles.grid}>
            {filteredModels.map((model) => (
              <ModelCard key={model.slug} model={model} />
            ))}
          </div>
        </Tabs>

        <div className={styles.bottomCta}>
          <div className={styles.bottomText}>
            <h2 className={styles.bottomTitle}>
              Gostou de algum modelo ou ficou em dúvida?
            </h2>
            <p className={styles.bottomDescription}>
              Monte seu pedido passo a passo ou fale direto com a gente no
              WhatsApp para escolher o modelo ideal.
            </p>
          </div>
          <div className={styles.bottomActions}>
            <Button to={quoteUrl} variant="primary">
              Montar pedido passo a passo
            </Button>
            <WhatsAppLink variant="secondary" message={{ source: "generic" }}>
              Conversar no WhatsApp
            </WhatsAppLink>
          </div>
        </div>
      </Container>
    </div>
  );
}
