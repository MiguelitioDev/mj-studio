import { Calendar, Camera, MapPin } from "lucide-react";
import { DemoImage } from "../../components/ui/DemoImage";
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

const PORTFOLIO_LABELS: readonly string[] = [
  "Ensaio ao pôr do sol — Beira-Mar",
  "Retrato corporativo em estúdio",
  "Aniversário infantil em casa",
  "Fotografia gastronômica autoral",
  "Ensaio gestante no Parque do Cocó",
  "Cobertura de batizado em família",
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
    label: "Estúdio no Cocó — Como chegar",
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
      return <Calendar size={20} aria-hidden="true" />;
    case "instagram":
      return <Camera size={20} aria-hidden="true" />;
    case "location":
      return <MapPin size={20} aria-hidden="true" />;
  }
}

export default function CartaoDemo({ businessName, compact = false }: DemoProps) {
  const name = businessName?.trim() || "Camila Rocha — Fotografia & Retratos";

  return (
    <div className={styles.cartao}>
      <div className={styles.cardShell}>
        <header className={styles.profileHeader}>
          <div className={styles.avatarWrap}>
            <DemoImage
              label="Foto de perfil profissional"
              round
              tone="accent"
            />
          </div>
          <h1 className={styles.profileName}>{name}</h1>
          <p className={styles.profileRole}>
            Fotógrafa de retratos femininos, famílias e marcas pessoais em
            Fortaleza/CE
          </p>
          <p className={styles.profileBio}>
            Luz natural ou estúdio no Cocó · Entrega da prévia em até 48h ·
            Tel.: (85) 90000-0000
          </p>
        </header>

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
                    aria-label={`${action.label} — ${action.sublabel} (abre o WhatsApp)`}
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
          <div className={styles.sectionTitleRow}>
            <h2 className={styles.sectionTitle}>Mini portfólio</h2>
            <span className={styles.sectionHint}>6 trabalhos em destaque</span>
          </div>
          <div className={styles.portfolioGrid}>
            {PORTFOLIO_LABELS.map((label, idx) => (
              <div key={label} className={styles.portfolioSquare}>
                <DemoImage
                  label={label}
                  ratio="1/1"
                  tone={idx % 2 === 0 ? "light" : "accent"}
                />
              </div>
            ))}
          </div>
        </section>

        {!compact && (
          <section className={styles.testimonialsSection}>
            <div className={styles.sectionTitleRow}>
              <h2 className={styles.sectionTitle}>O que dizem os clientes</h2>
            </div>
            <div className={styles.testimonialList}>
              {TESTIMONIALS.map((item) => (
                <article key={item.id} className={styles.testimonialCard}>
                  <span className={styles.exampleBadge}>
                    Depoimento de exemplo
                  </span>
                  <blockquote className={styles.quote}>
                    &ldquo;{item.quote}&rdquo;
                  </blockquote>
                  <p className={styles.author}>
                    <strong>{item.author}</strong> — {item.context}
                  </p>
                </article>
              ))}
            </div>
          </section>
        )}

        <footer className={styles.footer}>
          <p className={styles.footerText}>
            © 2026 {name} · Modelo de demonstração criado pela MJ Studio
          </p>
        </footer>
      </div>
    </div>
  );
}
