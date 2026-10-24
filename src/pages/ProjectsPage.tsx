import { Button } from "../components/ui/Button";
import { Container } from "../components/ui/Container";
import { DemoImage } from "../components/ui/DemoImage";
import { WhatsAppLink } from "../components/ui/WhatsAppLink";
import { site } from "../config/site";
import { niches } from "../data/niches";
import { projects } from "../data/projects";
import styles from "./ProjectsPage.module.css";

export default function ProjectsPage() {
  return (
    <div className={styles.page}>
      <title>{`Projetos entregues | ${site.name}`}</title>
      <meta
        name="description"
        content="Conheça os projetos de sites criados pela MJ Studios para pequenos negócios."
      />

      <Container>
        <div className={styles.header}>
          <h1 className={styles.title}>Projetos entregues</h1>
          <p className={styles.subtitle}>
            Sites publicados para clientes reais da {site.name}.
          </p>
        </div>

        {projects.length === 0 ? (
          <div className={styles.emptyState}>
            <p className={styles.emptyText}>
              Os primeiros projetos entregues aparecem aqui. Enquanto isso, veja
              os modelos de demonstração.
            </p>
            <div className={styles.emptyActions}>
              <Button to="/modelos" variant="primary">
                Ver modelos de demonstração
              </Button>
              <WhatsAppLink variant="secondary" message={{ source: "generic" }}>
                Conversar no WhatsApp
              </WhatsAppLink>
            </div>
          </div>
        ) : (
          <div className={styles.grid}>
            {projects.map((project) => {
              const niche = niches.find((item) => item.slug === project.niche);
              return (
                <article key={project.name} className={styles.card}>
                  <DemoImage
                    label={project.imageAlt ?? `Site ${project.name}`}
                    src={project.image}
                    alt={project.imageAlt ?? `Captura do site ${project.name}`}
                    ratio="4/3"
                  />
                  <div className={styles.cardBody}>
                    <div className={styles.cardHeader}>
                      <h2 className={styles.projectName}>{project.name}</h2>
                      <span className={styles.metaBadge}>
                        {niche ? `${niche.label} (${project.year})` : project.year}
                      </span>
                    </div>
                    <p className={styles.summary}>{project.summary}</p>
                    {project.url && (
                      <div className={styles.cardFooter}>
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.externalLink}
                          aria-label={`Visitar site de ${project.name} (abre em nova aba)`}
                        >
                          Visitar site publicado
                        </a>
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </Container>
    </div>
  );
}
