import "@fontsource/barlow-condensed/500.css";
import "@fontsource/barlow-condensed/700.css";
import { useId, useState } from "react";
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
}

const SERVICES: readonly ServiceItem[] = [
  {
    id: "corte",
    name: "Corte tradicional ou degradê",
    duration: "45 min",
    price: 55,
    description: "Acabamento na navalha, lavagem e finalização com pomada.",
  },
  {
    id: "barba",
    name: "Barba na toalha quente",
    duration: "35 min",
    price: 45,
    description: "Alinhamento com navalha, óleo essencial e compressa morna.",
  },
  {
    id: "combo",
    name: "Combo corte + barba",
    duration: "1h 15min",
    price: 90,
    description: "Serviço completo com toalha quente e bebida de cortesia.",
  },
  {
    id: "acabamento",
    name: "Pezinho e contorno",
    duration: "15 min",
    price: 25,
    description: "Manutenção rápida do contorno do corte e pescoço.",
  },
  {
    id: "sobrancelha",
    name: "Alinhamento de sobrancelha",
    duration: "15 min",
    price: 20,
    description: "Limpeza discreta na navalha ou pinça, mantendo o formato natural.",
  },
  {
    id: "hidratacao",
    name: "Hidratação capilar ou de barba",
    duration: "25 min",
    price: 35,
    description: "Tratamento para fios ressecados pelo sol e mar de Fortaleza.",
  },
];

const TEAM: readonly BarberProfile[] = [
  {
    name: "Rafael Mendes",
    role: "Mestre barbeiro",
    specialty: "Cortes clássicos à tesoura e barba na toalha quente",
  },
  {
    name: "Diego Cavalcante",
    role: "Barbeiro sênior",
    specialty: "Degradê navalhado, cortes curtos e visagismo",
  },
  {
    name: "Lucas Queiroz",
    role: "Barbeiro",
    specialty: "Barbas longas, cuidados com a pele e corte infantil",
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
                    Equipe
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
        <img
          src="/img/navalha/hero.jpg"
          alt="Salão da barbearia com três cadeiras reclináveis de couro, paredes de tijolo e luminárias acesas"
          className={styles.heroPhoto}
          width={1100}
          height={730}
        />
        <div className={styles.heroShade} aria-hidden="true" />
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>{name}</h1>
            <p className={styles.heroSubtitle}>
              Corte bem feito, navalha afiada e toalha quente no tempo certo.
              Marque os serviços e agende direto pelo WhatsApp, sem fila.
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
                <dd>Terça a sexta, 9h às 20h · sábado até 18h</dd>
              </div>
              <div>
                <dt>Endereço</dt>
                <dd>Rua Exemplo, 123 — Aldeota, Fortaleza</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section id="servicos" className={styles.section}>
        <div className={styles.container}>
          <div className={styles.servicesLayout}>
            <figure className={styles.servicesPhoto}>
              <img
                src="/img/navalha/corte.jpg"
                alt="Barbeiro de avental jeans secando o cabelo de um cliente de barba, coberto por capa preta"
                loading="lazy"
                width={1100}
                height={1375}
              />
            </figure>

            <div
              role="group"
              aria-labelledby={`${formId}-heading`}
              className={styles.servicesBoard}
            >
              <h2 id={`${formId}-heading`} className={styles.sectionTitle}>
                Escolha o serviço, veja o total
              </h2>
              <p className={styles.sectionDesc}>
                Marque o que deseja fazer. A soma aparece na hora e o pedido
                de horário segue pronto para o WhatsApp.
              </p>

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
                          <strong className={styles.price}>
                            {formatBRL(service.price)}
                          </strong>
                          <span className={styles.duration}>
                            {service.duration}
                          </span>
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
                      <strong className={styles.summaryTotal}>
                        {formatBRL(totalSelected)}
                      </strong>
                      <span className={styles.summaryCount}>
                        {selectedServices.length}{" "}
                        {selectedServices.length === 1
                          ? "serviço marcado"
                          : "serviços marcados"}
                      </span>
                    </>
                  ) : (
                    <span className={styles.summaryEmpty}>
                      Marque ao menos um serviço ou chame direto no WhatsApp.
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
        </div>
      </section>

      {!compact && (
        <>
          <section id="equipe" className={styles.team}>
            <img
              src="/img/navalha/equipe.jpg"
              alt="Barbeiros atendendo clientes em um salão escuro com bancadas e espelhos"
              className={styles.teamPhoto}
              loading="lazy"
              width={1100}
              height={733}
            />
            <div className={styles.container}>
              <div className={styles.teamBody}>
                <div>
                  <h2 className={styles.sectionTitle}>Quem atende você</h2>
                  <p className={styles.sectionDesc}>
                    Corte clássico, degradê e cuidado com a barba. Você escolhe
                    com quem prefere agendar.
                  </p>
                </div>
                <ul className={styles.teamList}>
                  {TEAM.map((member) => (
                    <li key={member.name} className={styles.teamItem}>
                      <h3 className={styles.teamName}>{member.name}</h3>
                      <p className={styles.teamRole}>{member.role}</p>
                      <p className={styles.teamSpecialty}>{member.specialty}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section id="horarios" className={styles.section}>
            <div className={styles.container}>
              <div className={styles.infoLayout}>
                <div className={styles.infoMain}>
                  <h2 className={styles.sectionTitle}>Horários e como chegar</h2>
                  <p className={styles.sectionDesc}>
                    Trabalhamos com horário marcado e encaixe conforme a
                    disponibilidade do dia. Ambiente climatizado, café
                    expresso, água gelada e 3 vagas em frente.
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
                  <address className={styles.addressBlock}>
                    <strong>{name}</strong>
                    <span>Rua Exemplo, 123 — Loja 02, Aldeota</span>
                    <span>Fortaleza/CE — CEP 60000-000</span>
                    <span>A duas quadras da Av. Santos Dumont</span>
                    <span>WhatsApp: (85) 90000-0000</span>
                  </address>
                </div>
                <figure className={styles.infoPhoto}>
                  <img
                    src="/img/navalha/ferramentas.jpg"
                    alt="Tesouras, máquinas de corte, pente e pomadas sobre uma bancada de madeira"
                    loading="lazy"
                    width={1100}
                    height={733}
                  />
                </figure>
              </div>
            </div>
          </section>
        </>
      )}

      <footer className={styles.footer}>
        <div className={styles.container}>
          <p className={styles.footerName} aria-hidden="true">
            {name}
          </p>
          <p className={styles.footerText}>
            © 2026 {name}. Modelo de demonstração criado pela MJ Studios.
            Fotos: Unsplash.
          </p>
        </div>
      </footer>
    </div>
  );
}
