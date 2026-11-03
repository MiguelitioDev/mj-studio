import { Calendar, Camera, MapPin } from "lucide-react";
import { WhatsAppIcon } from "../../components/ui/WhatsAppIcon";
import { buildMessage, buildWhatsAppUrl } from "../../lib/whatsapp";
import type { DemoProps } from "../types";
import styles from "./cartao.module.css";

interface QuickAction {
  id: string;
  label: string;
  sublabel: string;
  note: string;
  primary?: boolean;
  icon: "whatsapp" | "calendar" | "instagram" | "location";
}

interface TestimonialExample {
  id: string;
  quote: string;
  author: string;
  context: string;
}

interface PortfolioItem {
  src: string;
  title: string;
  alt: string;
}

const PORTFOLIO: readonly PortfolioItem[] = [
  {
    src: "/img/cartao/por-do-sol.jpg",
    title: "Ensaio ao pôr do sol, Beira-Mar",
    alt: "Mulher de blusa laranja posando de frente para o mar, com a mão atrás da cabeça",
  },
  {
    src: "/img/cartao/corporativo.jpg",
    title: "Retrato corporativo",
    alt: "Mulher de blazer azul-marinho e colar de pérolas, de braços cruzados e sorrindo",
  },
  {
    src: "/img/cartao/aniversario.jpg",
    title: "Aniversário infantil em casa",
    alt: "Três crianças assoprando as velas de um bolo de aniversário",
  },
  {
    src: "/img/cartao/gastronomia.jpg",
    title: "Fotografia gastronômica autoral",
    alt: "Panqueca em frigideira de ferro com laranja e mirtilos, sobre fundo azul-escuro",
  },
  {
    src: "/img/cartao/gestante.jpg",
    title: "Ensaio gestante à beira-mar",
    alt: "Mulher grávida de perfil na praia, com a mão sobre a barriga, ao amanhecer",
  },
  {
    src: "/img/cartao/batizado.jpg",
    title: "Cobertura de batizado em família",
    alt: "Bebê de roupa branca sendo batizado, com água escorrendo de uma concha",
  },
];

const ACTIONS: readonly QuickAction[] = [
  {
    id: "whatsapp",
    label: "Conversar no WhatsApp",
    sublabel: "Orçamentos para ensaios e eventos",
    note: "gostei do botão principal de WhatsApp do modelo Cartão",
    primary: true,
    icon: "whatsapp",
  },
  {
    id: "agendar",
    label: "Consultar datas na agenda",
    sublabel: "Manhã ou fim de tarde em Fortaleza",
    note: "gostei do botão de consultar datas na agenda",
    icon: "calendar",
  },
  {
    id: "instagram",
    label: "Ver bastidores no Instagram",
    sublabel: "@camila.retratos.exemplo",
    note: "gostei do atalho para o perfil do Instagram",
    icon: "instagram",
  },
  {
    id: "localizacao",
    label: "Estúdio no Cocó: como chegar",
    sublabel: "Rua Exemplo, 123 · Atendimento com hora marcada",
    note: "gostei do botão de localização do estúdio",
    icon: "location",
  },
];

const TESTIMONIALS: readonly TestimonialExample[] = [
  {
    id: "t1",
    quote:
      "Fiquei super à vontade durante todo o ensaio e recebi a galeria com as fotos dentro do prazo combinado.",
    author: "Mariana S.",
    context: "Ensaio profissional",
  },
  {
    id: "t2",
    quote:
      "Registrou o aniversário de 1 ano do nosso filho com muita sensibilidade e atenção aos detalhes.",
    author: "Pedro e Clara",
    context: "Cobertura de evento familiar",
  },
];

function ActionIcon({ type }: { type: QuickAction["icon"] }) {
  switch (type) {
    case "whatsapp":
      return <WhatsAppIcon />;
    case "calendar":
      return <Calendar size={22} aria-hidden="true" />;
    case "instagram":
      return <Camera size={22} aria-hidden="true" />;
    case "location":
      return <MapPin size={22} aria-hidden="true" />;
  }
}

export default function CartaoDemo({ businessName, compact = false }: DemoProps) {
  const name = businessName?.trim() || "Camila Rocha — Fotografia & Retratos";
  const [displayName, ...roleParts] = name.split(" — ");
  const role = roleParts.join(" — ") || "Fotografia";

  return (
    <div className={styles.cartao}>
      <div className={styles.layout}>
        <header className={styles.profile}>
          <figure className={styles.portrait}>
            <img
              src="/img/cartao/perfil.jpg"
              alt="Mulher de suéter amarelo segurando uma câmera diante do rosto, em um parque com árvores"
              width={900}
              height={1125}
            />
          </figure>
          <div className={styles.profileText}>
            <h1 className={styles.profileName}>{displayName}</h1>
            <p className={styles.profileRole}>{role}</p>
            <p className={styles.profileBio}>
              Retratos femininos, famílias e marcas pessoais em Fortaleza/CE.
              Luz natural ou estúdio no Cocó, prévia entregue em até 48h.
            </p>
            <p className={styles.profileContact}>Tel.: (85) 90000-0000</p>
          </div>
        </header>

        <div className={styles.content}>
          <nav aria-label="Links principais de contato" className={styles.linksSection}>
            <h2 className="sr-only">Botões de contato e agendamento</h2>
            <ul className={styles.linksList}>
              {ACTIONS.map((action) => {
                const url = buildWhatsAppUrl(
                  buildMessage({
                    source: "demo",
                    modelName: "Cartão",
                    businessName: name,
                    notes: action.note,
                  }),
                );
                return (
                  <li key={action.id}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${action.label}: ${action.sublabel} (abre o WhatsApp)`}
                      className={[
                        styles.actionButton,
                        action.primary ? styles.actionPrimary : styles.actionSecondary,
                      ].join(" ")}
                    >
                      <span className={styles.actionIcon}>
                        <ActionIcon type={action.icon} />
                      </span>
                      <span className={styles.actionText}>
                        <span className={styles.actionLabel}>{action.label}</span>
                        <span className={styles.actionSub}>{action.sublabel}</span>
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <section className={styles.portfolioSection}>
            <h2 className={styles.sectionTitle}>Mini portfólio</h2>
            <ul className={styles.portfolioGrid}>
              {PORTFOLIO.map((item) => (
                <li key={item.title} className={styles.portfolioItem}>
                  <img
                    src={item.src}
                    alt={item.alt}
                    loading="lazy"
                    width={900}
                    height={900}
                  />
                  <span className={styles.portfolioCaption}>{item.title}</span>
                </li>
              ))}
            </ul>
          </section>

          {!compact && (
            <section className={styles.testimonialsSection}>
              <h2 className={styles.sectionTitle}>O que dizem os clientes</h2>
              <div className={styles.testimonialList}>
                {TESTIMONIALS.map((item) => (
                  <article key={item.id} className={styles.testimonialCard}>
                    <blockquote className={styles.quote}>
                      &ldquo;{item.quote}&rdquo;
                    </blockquote>
                    <p className={styles.author}>
                      <strong>{item.author}</strong>, {item.context}
                    </p>
                    <p className={styles.exampleNote}>Depoimento de exemplo</p>
                  </article>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      <footer className={styles.footer}>
        <p className={styles.footerText}>
          © 2026 {displayName}. Modelo de demonstração criado pela MJ Studios.
          Fotos: Unsplash.
        </p>
      </footer>
    </div>
  );
}
