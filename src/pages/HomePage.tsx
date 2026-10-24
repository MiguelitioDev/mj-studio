import { site } from "../config/site";
import { Container } from "../components/ui/Container";

export default function HomePage() {
  return (
    <Container>
      <title>{`${site.name} — ${site.tagline}`}</title>
      <meta
        name="description"
        content="Sites prontos para pequenos negócios em Fortaleza e região, ajustados com a sua marca. A partir de R$ 800."
      />
      <h1>{site.name}</h1>
    </Container>
  );
}
