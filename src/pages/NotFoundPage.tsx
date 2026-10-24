import { Link } from "react-router";
import { site } from "../config/site";
import { Container } from "../components/ui/Container";

export default function NotFoundPage() {
  return (
    <Container>
      <title>{`Página não encontrada | ${site.name}`}</title>
      <meta
        name="description"
        content="A página que você procura não foi encontrada."
      />
      <h1>Página não encontrada</h1>
      <p>O endereço acessado não existe ou foi movido.</p>
      <p>
        <Link to="/">Ir para o início</Link>
      </p>
    </Container>
  );
}
