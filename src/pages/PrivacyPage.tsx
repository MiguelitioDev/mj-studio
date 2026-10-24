import { site } from "../config/site";
import { Container } from "../components/ui/Container";

export default function PrivacyPage() {
  return (
    <Container>
      <title>{`Política de Privacidade | ${site.name}`}</title>
      <meta
        name="description"
        content="Como a MJ Studio trata dados pessoais de acordo com a Lei Geral de Proteção de Dados (LGPD)."
      />
      <h1>Política de Privacidade</h1>
    </Container>
  );
}
