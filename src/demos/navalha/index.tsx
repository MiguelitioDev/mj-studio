import { useId, useState } from "react";
import { DemoImage } from "../../components/ui/DemoImage";
import { WhatsAppIcon } from "../../components/ui/WhatsAppIcon";
import { formatBRL } from "../../lib/format";
import { buildMessage, buildWhatsAppUrl } from "../../lib/whatsapp";
import type { DemoProps } from "../types";
import styles from "./navalha.module.css";

interface ServiceItem {
  id: string;
  name: string;
  duration: string;
  price: number;
  description: string;
}

interface BarberProfile {
  name: string;
  role: string;
  specialty: string;
  photoLabel: string;
}

const SERVICES: readonly ServiceItem[] = [
  {
    id: "corte",
    name: "Corte Tradicional ou Degradê",
    duration: "45 min",
    price: 55,
    description: "Acabamento na navalha, lavagem e finalização com pomada.",
  },
  {
    id: "barba",
    name: "Barba na Toalha Quente",
    duration: "35 min",
    price: 45,
    description: "Alinhamento com navalha, óleo essencial e compressa morna.",
  },
  {
    id: "combo",
    name: "Combo Corte + Barba",
    duration: "1h 15min",
    price: 90,
    description: "Serviço completo com toalha quente e bebida de cortesia.",
  },
  {
    id: "acabamento",
    name: "Pezinho e Contorno",
    duration: "15 min",
    price: 25,
    description: "Manutenção rápida do contorno do corte e pescoço.",
  },
  {
    id: "sobrancelha",
    name: "Alinhamento de Sobrancelha",
    duration: "15 min",
    price: 20,
    description: "Limpeza discreta na navalha ou pinça, mantendo o formato natural.",
  },
  {
    id: "hidratacao",
    name: "Hidratação Capilar ou de Barba",
    duration: "25 min",
    price: 35,
    description: "Tratamento para fios ressecados pelo sol e mar de Fortaleza.",
  },
];

const TEAM: readonly BarberProfile[] = [
  {
    name: "Rafael Mendes",
    role: "Mestre Barbeiro",
    specialty: "Cortes clássicos à tesoura e barba na toalha quente",
    photoLabel: "Barbeiro Rafael em atendimento",
  },
  {
    name: "Diego Cavalcante",
    role: "Barbeiro Sênior",
    specialty: "Degradê navalhado, cortes curtos e visagismo",
    photoLabel: "Barbeiro Diego preparando bancada",
  },
  {
    name: "Lucas Queiroz",
    role: "Barbeiro",
    specialty: "Barbas longas, cuidados com a pele e corte infantil",
    photoLabel: "Barbeiro Lucas aparando barba",
  },
];

export default function NavalhaDemo({ businessName, compact = false }: DemoProps) {
  const name = businessName?.trim() || "Barbearia Dom Severino";
  const [selectedIds, setSelectedIds] = useState<string[]>(["combo"]);
  const formId = useId();

  const toggleService = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const selectedServices = SERVICES.filter((service) =>
    selectedIds.includes(service.id),
  );
  const totalSelected = selectedServices.reduce(
    (sum, item) => sum + item.price,
    0,
  );

  const selectedNames = selectedServices.map((item) => item.name).join(", ");
  const scheduleNotes =
    selectedServices.length > 0
      ? `gostei da tabela de serviços (marquei: ${selectedNames} — total ${formatBRL(totalSelected)})`
      : "gostei do agendamento pelo WhatsApp";

  const scheduleWhatsAppUrl = buildWhatsAppUrl(
    buildMessage({
      source: "demo",
      modelName: "Navalha",
      businessName: name,
      notes: scheduleNotes,
    }),
  );

  const heroWhatsAppUrl = buildWhatsAppUrl(
    buildMessage({
      source: "demo",
      modelName: "Navalha",
      businessName: name,
      notes: "gostei do botão de agendamento no topo",
    }),
  );

  return (
    <div className={styles.navalha}>
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.headerInner}>
            <span className={styles.brandMark}>{name}</span>
            <nav aria-label="Navegação da barbearia" className={styles.nav}>
              <a href="#servicos" className={styles.navLink}>
                Serviços
              </a>
              {!compact && (
                <>
                  <a href="#equipe" className={styles.navLink}>
                    Profissionais
                  </a>
                  <a href="#horarios" className={styles.navLink}>
                    Horários e local
                  </a>
                </>
              )}
            </nav>
          </div>
        </div>
      </header>

      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroGrid}>
            <div className={styles.heroContent}>
              <p className={styles.kicker}>Aldeota — Fortaleza, CE</p>
              <h1 className={styles.heroTitle}>{name}</h1>
              <p className={styles.heroSubtitle}>
                Corte bem feito, navalha afiada e toalha quente no tempo certo.
                Escolha seus serviços abaixo e agende seu horário direto pelo
                WhatsApp, sem fila de espera.
              </p>
              <div className={styles.heroActions}>
                <a
                  href={heroWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Agendar pelo WhatsApp (abre o WhatsApp)"
                  className={styles.primaryButton}
                >
                  <WhatsAppIcon />
                  <span>Agendar pelo WhatsApp</span>
                </a>
                <a href="#servicos" className={styles.secondaryButton}>
                  Ver tabela de preços
                </a>
              </div>
              <dl className={styles.quickMeta}>
                <div>
                  <dt>Atendimento</dt>
                  <dd>Terça a sábado, 9h às 20h</dd>
                </div>
                <div>
                  <dt>Endereço</dt>
                  <dd>Rua Exemplo, 123 — Aldeota</dd>
                </div>
              </dl>
            </div>

            <div className={styles.heroVisual}>
              <DemoImage
                label="Cadeira clássica e bancada da barbearia"
                ratio="4/3"
                tone="dark"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="servicos" className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              Tabela de serviços e agendamento
            </h2>
            <p className={styles.sectionDesc}>
              Marque os serviços que deseja fazer para somar o valor e enviar
              seu pedido de horário pronto no WhatsApp.
            </p>
          </div>

          <div
            role="group"
            aria-labelledby={`${formId}-heading`}
            className={styles.servicesBoard}
          >
            <h3 id={`${formId}-heading`} className={styles.boardTitle}>
              Selecione os serviços desejados
            </h3>

            <ul className={styles.serviceList}>
              {SERVICES.map((service) => {
                const isChecked = selectedIds.includes(service.id);
                const checkboxId = `${formId}-${service.id}`;
                return (
                  <li
                    key={service.id}
                    className={[
                      styles.serviceRow,
                      isChecked ? styles.serviceRowActive : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    <label htmlFor={checkboxId} className={styles.serviceLabel}>
                      <input
                        id={checkboxId}
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleService(service.id)}
                        className={styles.checkbox}
                      />
                      <span className={styles.serviceInfo}>
                        <span className={styles.serviceName}>
                          {service.name}
                        </span>
                        <span className={styles.serviceDetail}>
                          {service.description}
                        </span>
                      </span>
                      <span className={styles.serviceMeta}>
                        <span className={styles.duration}>
                          {service.duration}
                        </span>
                        <strong className={styles.price}>
                          {formatBRL(service.price)}
                        </strong>
                      </span>
                    </label>
                  </li>
                );
              })}
            </ul>

            <div className={styles.boardFooter}>
              <div className={styles.summaryBox} aria-live="polite">
                {selectedServices.length > 0 ? (
                  <>
                    <span className={styles.summaryCount}>
                      {selectedServices.length}{" "}
                      {selectedServices.length === 1
                        ? "serviço marcado"
                        : "serviços marcados"}
                    </span>
                    <strong className={styles.summaryTotal}>
                      Total estimado: {formatBRL(totalSelected)}
                    </strong>
                  </>
                ) : (
                  <span className={styles.summaryEmpty}>
                    Nenhum serviço marcado. Marque ao menos um item acima ou
                    chame direto no WhatsApp.
                  </span>
                )}
              </div>

              <a
                href={scheduleWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Agendar serviços marcados pelo WhatsApp (abre o WhatsApp)"
                className={styles.primaryButton}
              >
                <WhatsAppIcon />
                <span>
                  {selectedServices.length > 0
                    ? "Agendar serviços marcados"
                    : "Conversar no WhatsApp"}
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {!compact && (
        <>
          <section id="equipe" className={styles.sectionAlt}>
            <div className={styles.container}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Nossos profissionais</h2>
                <p className={styles.sectionDesc}>
                  Equipe com experiência em corte clássico, degradê e cuidado
                  com a barba. Você pode escolher com quem prefere agendar.
                </p>
              </div>

              <div className={styles.teamGrid}>
                {TEAM.map((member) => (
                  <article key={member.name} className={styles.teamCard}>
                    <DemoImage
                      label={member.photoLabel}
                      ratio="4/3"
                      tone="dark"
                    />
                    <div className={styles.teamCardBody}>
                      <h3 className={styles.teamName}>{member.name}</h3>
                      <p className={styles.teamRole}>{member.role}</p>
                      <p className={styles.teamSpecialty}>{member.specialty}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section id="horarios" className={styles.section}>
            <div className={styles.container}>
              <div className={styles.infoGrid}>
                <div className={styles.infoCard}>
                  <h2 className={styles.infoTitle}>Horários de atendimento</h2>
                  <p className={styles.infoLead}>
                    Trabalhamos com horário marcado e encaixe conforme
                    disponibilidade do dia.
                  </p>
                  <dl className={styles.hoursList}>
                    <div className={styles.hoursRow}>
                      <dt>Terça a sexta</dt>
                      <dd>09h às 20h</dd>
                    </div>
                    <div className={styles.hoursRow}>
                      <dt>Sábado</dt>
                      <dd>08h30 às 18h</dd>
                    </div>
                    <div className={styles.hoursRow}>
                      <dt>Domingo e segunda</dt>
                      <dd>Fechado</dd>
                    </div>
                  </dl>
                </div>

                <div className={styles.infoCard}>
                  <h2 className={styles.infoTitle}>Como chegar</h2>
                  <p className={styles.infoLead}>
                    Ambiente climatizado, café expresso, água gelada e 3 vagas
                    de estacionamento em frente.
                  </p>
                  <address className={styles.addressBlock}>
                    <strong>{name}</strong>
                    <span>Rua Exemplo, 123 — Loja 02, Aldeota</span>
                    <span>Fortaleza/CE — CEP 60000-000</span>
                    <span>Referência: a duas quadras da Av. Santos Dumont</span>
                    <span>Telefone fixo / WhatsApp: (85) 90000-0000</span>
                  </address>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      <footer className={styles.footer}>
        <div className={styles.container}>
          <p className={styles.footerText}>
            © 2026 {name} · Modelo de demonstração criado pela MJ Studios
          </p>
        </div>
      </footer>
    </div>
  );
}
