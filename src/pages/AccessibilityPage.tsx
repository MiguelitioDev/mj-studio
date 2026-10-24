import { site } from "../config/site";
import { Container } from "../components/ui/Container";

export default function AccessibilityPage() {
  return (
    <Container>
      <title>{`Declaração de Acessibilidade | ${site.name}`}</title>
      <meta
        name="description"
        content="Compromisso e recursos de acessibilidade digital do site da MJ Studio conforme WCAG 2.2 AA e eMAG."
      />
      <h1>Declaração de Acessibilidade</h1>
    </Container>
  );
}
