import { Button } from "../components/ui/Button";
import { Container } from "../components/ui/Container";
import { site } from "../config/site";
import styles from "./LegalPage.module.css";

export default function NotFoundPage() {
  return (
    <section className={styles.article}>
      <Container>
        <title>{`Página não encontrada | ${site.name}`}</title>
        <meta
          name="description"
          content="A página que você procura não foi encontrada."
        />

        <div className={styles.content}>
          <header className={styles.header}>
            <h1 className={styles.title}>Página não encontrada</h1>
          </header>

          <p>
            O endereço que você tentou acessar não existe ou mudou de lugar. Verifique
            se o link foi digitado corretamente ou escolha um dos caminhos abaixo para
            continuar navegando:
          </p>

          <div className={styles.actions}>
            <Button to="/">Voltar para o início</Button>
            <Button to="/modelos" variant="secondary">
              Ver modelos de sites
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
