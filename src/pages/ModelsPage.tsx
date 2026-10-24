import { site } from "../config/site";
import { Container } from "../components/ui/Container";

export default function ModelsPage() {
  return (
    <Container>
      <title>{`Modelos de sites | ${site.name}`}</title>
      <meta
        name="description"
        content="Catálogo de modelos de sites prontos para barbearias, clínicas, restaurantes, lojas, serviços, escritórios e profissionais autônomos."
      />
      <h1>Modelos prontos para o seu ramo</h1>
    </Container>
  );
}
