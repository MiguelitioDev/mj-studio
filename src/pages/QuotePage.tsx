import { site } from "../config/site";
import { Container } from "../components/ui/Container";

export default function QuotePage() {
  return (
    <Container>
      <title>{`Pedir orçamento | ${site.name}`}</title>
      <meta
        name="description"
        content="Monte seu pedido em 4 passos rápidos e envie direto para o nosso WhatsApp."
      />
      <h1>Pedir orçamento</h1>
    </Container>
  );
}
