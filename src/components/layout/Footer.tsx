import { Link } from "react-router";
import { site } from "../../config/site";
import { buildMessage, buildWhatsAppUrl } from "../../lib/whatsapp";
import { Container } from "../ui/Container";
import styles from "./Footer.module.css";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const whatsappUrl = buildWhatsAppUrl(buildMessage({ source: "generic" }));
  const cityState = [site.city, site.state].filter(Boolean).join("/");

  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.grid}>
          <div>
            <p className={styles.brandName}>{site.name}</p>
            {site.tagline && <p className={styles.tagline}>{site.tagline}</p>}

            <ul className={styles.metaList}>
              {site.legal.companyName && (
                <li>Razão social: {site.legal.companyName}</li>
              )}
              {site.legal.cnpj && <li>CNPJ: {site.legal.cnpj}</li>}
              {site.legal.address ? (
                <li>{site.legal.address}</li>
              ) : (
                cityState && <li>{cityState}</li>
              )}
              {site.businessHours && <li>Atendimento: {site.businessHours}</li>}
            </ul>
          </div>

          <div>
            <h2 className={styles.sectionTitle}>Contato</h2>
            <ul className={styles.linkList}>
              {site.whatsapp.display && (
                <li>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                    aria-label={`WhatsApp ${site.whatsapp.display} (abre o WhatsApp)`}
                  >
                    WhatsApp: {site.whatsapp.display}
                  </a>
                </li>
              )}
              {site.email && (
                <li>
                  <a href={`mailto:${site.email}`} className={styles.link}>
                    {site.email}
                  </a>
                </li>
              )}
              {site.instagram && (
                <li>
                  <a
                    href={`https://instagram.com/${site.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                    aria-label={`Instagram @${site.instagram} (abre em nova aba)`}
                  >
                    Instagram: @{site.instagram}
                  </a>
                </li>
              )}
            </ul>
          </div>

          <div>
            <h2 className={styles.sectionTitle}>Informações legais</h2>
            <ul className={styles.linkList}>
              <li>
                <Link to="/privacidade" className={styles.link}>
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link to="/termos" className={styles.link}>
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link to="/acessibilidade" className={styles.link}>
                  Declaração de Acessibilidade
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>
            © {currentYear} {site.name}. Todos os direitos reservados.
          </p>
        </div>
      </Container>
    </footer>
  );
}
