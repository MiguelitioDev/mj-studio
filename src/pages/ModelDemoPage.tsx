import { Link, useParams } from "react-router";
import { site } from "../config/site";
import { models } from "../data/models";
import { Container } from "../components/ui/Container";

export default function ModelDemoPage() {
  const { slug } = useParams<{ slug: string }>();
  const model = models.find((item) => item.slug === slug);

  if (!model) {
    return (
      <main id="conteudo" tabIndex={-1}>
        <Container>
          <title>{`Modelo não encontrado | ${site.name}`}</title>
          <meta
            name="description"
            content="O modelo de demonstração solicitado não foi encontrado."
          />
          <h1>Modelo não encontrado</h1>
          <p>Não encontramos um modelo com esse endereço.</p>
          <p>
            <Link to="/modelos">Voltar para o catálogo de modelos</Link>
          </p>
        </Container>
      </main>
    );
  }

  return (
    <main id="conteudo" tabIndex={-1}>
      <Container>
        <title>{`Modelo ${model.name} (Demonstração) | ${site.name}`}</title>
        <meta name="description" content={model.summary} />
        <h1>Modelo {model.name}</h1>
        <p>{model.summary}</p>
        <p>
          <Link to="/modelos">Voltar aos modelos</Link>
        </p>
      </Container>
    </main>
  );
}
