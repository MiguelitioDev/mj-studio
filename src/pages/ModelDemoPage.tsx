import { Suspense, useState } from "react";
import { Link, useParams } from "react-router";
import { SkipLink } from "../components/layout/SkipLink";
import { Container } from "../components/ui/Container";
import { site } from "../config/site";
import { models } from "../data/models";
import { niches } from "../data/niches";
import { getDemo } from "../demos/registry";
import { DemoNotice } from "../demos/shared/DemoNotice";

export default function ModelDemoPage() {
  const { slug } = useParams<{ slug: string }>();
  const [businessName, setBusinessName] = useState("");

  const model = models.find((item) => item.slug === slug);
  const DemoComponent = getDemo(slug);

  if (!model || !DemoComponent) {
    return (
      <>
        <SkipLink />
        <main id="conteudo" tabIndex={-1} style={{ padding: "var(--s-8) 0" }}>
          <Container>
            <title>{`Modelo não encontrado | ${site.name}`}</title>
            <meta
              name="description"
              content="O modelo de demonstração solicitado não foi encontrado."
            />
            <h1>Modelo não encontrado</h1>
            <p style={{ marginTop: "var(--s-3)" }}>
              Não encontramos um modelo de demonstração com esse endereço.
            </p>
            <p style={{ marginTop: "var(--s-4)" }}>
              <Link to="/modelos">Voltar para o catálogo de modelos</Link>
            </p>
          </Container>
        </main>
      </>
    );
  }

  const niche = niches.find((item) => item.slug === model.niche);

  return (
    <>
      <SkipLink />
      <title>{`Modelo ${model.name} | ${site.name}`}</title>
      <meta name="description" content={model.summary} />
      <DemoNotice
        modelName={model.name}
        nicheLabel={niche?.label}
        businessName={businessName}
        onBusinessNameChange={setBusinessName}
      />
      <main id="conteudo" tabIndex={-1} className="demo-container">
        <Suspense
          fallback={
            <Container>
              <p role="status" style={{ padding: "var(--s-6) 0" }}>
                Carregando modelo de demonstração…
              </p>
            </Container>
          }
        >
          <DemoComponent businessName={businessName} />
        </Suspense>
      </main>
    </>
  );
}
