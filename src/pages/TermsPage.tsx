import { site } from "../config/site";
import { Container } from "../components/ui/Container";

export default function TermsPage() {
  return (
    <Container>
      <title>{`Termos de Uso | ${site.name}`}</title>
      <meta
        name="description"
        content="Termos de uso do site e condições gerais de contratação dos serviços da MJ Studio."
      />
      <h1>Termos de Uso</h1>
    </Container>
  );
}
