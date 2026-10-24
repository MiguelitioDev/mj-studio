import { DemoImage } from "../../components/ui/DemoImage";
import { WhatsAppIcon } from "../../components/ui/WhatsAppIcon";
import { buildMessage, buildWhatsAppUrl } from "../../lib/whatsapp";
import type { DemoProps } from "../types";
import styles from "./clareza.module.css";

interface ApproachItem {
  title: string;
  description: string;
}

interface FirstSessionStep {
  title: string;
  description: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

const APPROACHES: readonly ApproachItem[] = [
  {
    title: "Ansiedade e sobrecarga da rotina",
    description:
      "Espaço para compreender preocupações constantes, cansaço mental e dificuldades para desacelerar no dia a dia.",
  },
  {
    title: "Relações familiares e afetivas",
    description:
      "Reflexão sobre limites, comunicação, conflitos recorrentes e construção de vínculos mais saudáveis.",
  },
  {
    title: "Transições de carreira e vida adulta",
    description:
      "Acolhimento em momentos de mudança de trabalho, maternidade/paternidade, luto ou novas escolhas pessoais.",
  },
  {
    title: "Autoconhecimento e regulação emocional",
    description:
      "Reconhecimento de padrões emocionais e desenvolvimento de recursos próprios para lidar com imprevistos.",
  },
];

const STEPS: readonly FirstSessionStep[] = [
  {
    title: "Primeiro contato pelo WhatsApp",
    description:
      "Você envia uma mensagem informando sua preferência de turno (manhã, tarde ou noite) e se prefere atendimento presencial ou online.",
  },
  {
    title: "Sessão inicial de acolhimento",
    description:
      "Na primeira conversa (50 minutos), você conta o que motivou a busca pela terapia, no seu ritmo e sem roteiro engessado.",
  },
  {
    title: "Definição do plano terapêutico",
    description:
      "Combinamos frequência das sessões, horários fixos, valores, emissão de recibo e contrato terapêutico com total transparência.",
  },
];

const FAQS: readonly FaqItem[] = [
  {
    question: "Qual é a duração e a frequência das sessões?",
    answer:
      "Cada sessão dura cerca de 50 minutos. Em geral, os encontros começam uma vez por semana, no mesmo dia e horário combinados.",
  },
  {
    question: "Como funciona o atendimento por videochamada?",
    answer:
      "O atendimento online é autorizado pelo Conselho Federal de Psicologia (CFP) e acontece por sala segura de vídeo. Basta estar em um local reservado e com boa conexão.",
  },
  {
    question: "Você atende por plano de saúde?",
    answer:
      "Os atendimentos são particulares, com emissão de nota fiscal ou recibo em todas as sessões para você solicitar reembolso junto ao seu plano de saúde, conforme as regras da sua operadora.",
  },
  {
    question: "Qual é o valor da sessão?",
    answer:
      "Em respeito ao Código de Ética Profissional do Psicólogo (Art. 20), valores não são divulgados de forma promocional. Entre em contato pelo WhatsApp para receber as informações de honorários.",
  },
];

export default function ClarezaDemo({ businessName, compact = false }: DemoProps) {
  const name = businessName?.trim() || "Helena Vasconcelos — Psicologia Clínica";

  const heroWhatsAppUrl = buildWhatsAppUrl(
    buildMessage({
      source: "demo",
      modelName: "Clareza",
      businessName: name,
      notes: "gostei do agendamento de primeira conversa",
    }),
  );

  const feeWhatsAppUrl = buildWhatsAppUrl(
    buildMessage({
      source: "demo",
      modelName: "Clareza",
      businessName: name,
      notes: "gostei da seção de informações sobre consulta e reembolso",
    }),
  );

  return (
    <div className={styles.clareza}>
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.headerInner}>
            <div className={styles.brandBlock}>
              <span className={styles.brandName}>{name}</span>
              <span className={styles.crpBadge}>CRP 00/00000</span>
            </div>
            <nav aria-label="Navegação do consultório" className={styles.nav}>
              <a href="#sobre" className={styles.navLink}>
                Sobre
              </a>
              <a href="#primeira-consulta" className={styles.navLink}>
                Primeira consulta
              </a>
              {!compact && (
                <>
                  <a href="#modalidades" className={styles.navLink}>
                    Presencial e online
                  </a>
                  <a href="#duvidas" className={styles.navLink}>
                    Dúvidas
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
              <p className={styles.credentials}>
                Psicoterapia para jovens e adultos · CRP 00/00000
              </p>
              <h1 className={styles.heroTitle}>{name}</h1>
              <p className={styles.heroLead}>
                Um espaço de escuta ética, acolhedora e sem julgamentos para
                compreender suas questões no seu tempo. Atendimento presencial
                no bairro Fátima, em Fortaleza/CE, e online por videochamada.
              </p>
              <div className={styles.heroActions}>
                <a
                  href={heroWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Tirar dúvidas e agendar pelo WhatsApp (abre o WhatsApp)"
                  className={styles.primaryButton}
                >
                  <WhatsAppIcon />
                  <span>Tirar dúvidas e agendar</span>
                </a>
                <a href="#primeira-consulta" className={styles.secondaryButton}>
                  Como funciona a 1ª sessão
                </a>
              </div>
            </div>

            <div className={styles.heroVisual}>
              <DemoImage
                label="Consultório iluminado com poltronas confortáveis"
                ratio="4/3"
                tone="light"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="sobre" className={styles.section}>
        <div className={styles.container}>
          <div className={styles.aboutGrid}>
            <div className={styles.aboutPhoto}>
              <DemoImage
                label="Retrato profissional da psicóloga"
                ratio="4/3"
                tone="light"
              />
            </div>
            <div className={styles.aboutContent}>
              <h2 className={styles.sectionTitle}>Sobre a profissional</h2>
              <p>
                Sou psicóloga clínica graduada pela Universidade Federal do
                Ceará (UFC), com especialização em Terapia Cognitivo-Comportamental
                e formação em terapias contextuais (CRP 00/00000).
              </p>
              <p>
                Atuo na clínica acompanhando adultos que buscam lidar melhor com
                a ansiedade, transições profissionais, relações interpessoais e
                organização da própria rotina. Acredito em uma psicologia baseada
                no diálogo claro, no sigilo profissional e no respeito à
                singularidade de cada história.
              </p>
              <ul className={styles.credentialsList}>
                <li>Registro ativo no Conselho Regional de Psicologia (CRP 00/00000)</li>
                <li>Cadastro e-Psi para atendimento psicológico online</li>
                <li>Consultório reservado no bairro Fátima, Fortaleza/CE</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.sectionSoft}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Demandas acompanhadas e abordagem</h2>
            <p className={styles.sectionIntro}>
              O trabalho clínico utiliza a Terapia Cognitivo-Comportamental (TCC),
              integrando escuta ativa e ferramentas práticas para o cotidiano.
            </p>
          </div>

          <div className={styles.approachGrid}>
            {APPROACHES.map((item) => (
              <article key={item.title} className={styles.approachCard}>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardText}>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="primeira-consulta" className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Como é a primeira consulta</h2>
            <p className={styles.sectionIntro}>
              Começar terapia pode gerar dúvidas. Veja como organizamos os
              primeiros passos para que você se sinta à vontade.
            </p>
          </div>

          <ol className={styles.stepsList}>
            {STEPS.map((step, index) => (
              <li key={step.title} className={styles.stepCard}>
                <span className={styles.stepNumber} aria-hidden="true">
                  {index + 1}
                </span>
                <div className={styles.stepBody}>
                  <h3 className={styles.cardTitle}>{step.title}</h3>
                  <p className={styles.cardText}>{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {!compact && (
        <>
          <section id="modalidades" className={styles.sectionSoft}>
            <div className={styles.container}>
              <div className={styles.modalitiesGrid}>
                <article className={styles.modalityCard}>
                  <h2 className={styles.modalityTitle}>Atendimento presencial</h2>
                  <p className={styles.cardText}>
                    Realizado em sala climatizada, com isolamento acústico e
                    sala de espera individual para preservar sua privacidade.
                  </p>
                  <address className={styles.address}>
                    Rua Exemplo, 123 — Sala 405, Bairro Fátima
                    <br />
                    Fortaleza/CE (próximo à Av. 13 de Maio)
                  </address>
                </article>

                <article className={styles.modalityCard}>
                  <h2 className={styles.modalityTitle}>Atendimento online</h2>
                  <p className={styles.cardText}>
                    Sessões por videochamada para quem mora em outros bairros,
                    viaja com frequência ou prefere a comodidade de casa.
                  </p>
                  <p className={styles.modalityNote}>
                    Recomendamos usar fones de ouvido e escolher um ambiente onde
                    você possa falar com privacidade durante os 50 minutos.
                  </p>
                </article>

                <article className={styles.modalityCardHighlight}>
                  <h2 className={styles.modalityTitle}>
                    Valores, recibos e convênios
                  </h2>
                  <p className={styles.cardText}>
                    Os valores das sessões são informados diretamente pelo
                    WhatsApp (sob consulta). Emitimos recibo para reembolso em
                    planos de saúde e declaração de comparecimento quando
                    necessário.
                  </p>
                  <a
                    href={feeWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Consultar horários e valores pelo WhatsApp (abre o WhatsApp)"
                    className={styles.primaryButton}
                  >
                    <WhatsAppIcon />
                    <span>Consultar horários e valores</span>
                  </a>
                </article>
              </div>
            </div>
          </section>

          <section id="duvidas" className={styles.section}>
            <div className={styles.container}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Perguntas frequentes</h2>
                <p className={styles.sectionIntro}>
                  Respostas diretas para as dúvidas mais comuns antes de agendar.
                </p>
              </div>

              <div className={styles.faqList}>
                {FAQS.map((faq) => (
                  <details key={faq.question} className={styles.faqItem}>
                    <summary className={styles.faqQuestion}>
                      {faq.question}
                    </summary>
                    <p className={styles.faqAnswer}>{faq.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.cvvBox} role="note">
            <strong>Atenção:</strong> Este site não realiza atendimento de
            urgência ou emergência. Em sofrimento emocional? Ligue 188 (CVV), 24
            horas, ligação gratuita. Em caso de emergência médica, acione o SAMU
            (192).
          </div>
          <div className={styles.footerMeta}>
            <p>
              {name} · CRP 00/00000 · Rua Exemplo, 123, Fátima — Fortaleza/CE ·
              Tel.: (85) 90000-0000
            </p>
            <p className={styles.demoCredit}>
              © 2026 {name} · Modelo de demonstração criado pela MJ Studios
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
