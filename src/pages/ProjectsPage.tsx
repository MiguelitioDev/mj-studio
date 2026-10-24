import { site } from "../config/site";
import { Container } from "../components/ui/Container";

export default function ProjectsPage() {
  return (
    <Container>
      <title>{`Projetos entregues | ${site.name}`}</title>
      <meta
        name="description"
        content="Conheça os sites criados pela MJ Studio para pequenos negócios."
      />
      <h1>Projetos entregues</h1>
    </Container>
  );
}
