import { DemoImage } from "../../components/ui/DemoImage";
import { WhatsAppIcon } from "../../components/ui/WhatsAppIcon";
import { buildMessage, buildWhatsAppUrl } from "../../lib/whatsapp";
import type { DemoProps } from "../types";
import styles from "./pilar.module.css";

interface PracticeArea {
  id: string;
  title: string;
  description: string;
  topics: readonly string[];
}

interface LawyerProfile {
  id: string;
  name: string;
  oab: string;
  role: string;
  education: string;
  bio: string;
  photoLabel: string;
}

interface LegalArticle {
  id: string;
  category: string;
  date: string;
  readingTime: string;
  title: string;
  excerpt: string;
  keyPoints: readonly string[];
}

const PRACTICE_AREAS: readonly PracticeArea[] = [
  {
    id: "civil-contratos",
    title: "Direito Civil e Contratos",
    description:
      "Elaboração, revisão preventiva e negociação de instrumentos contratuais civis e empresariais, além de atuação em responsabilidade civil e obrigações.",
    topics: [
      "Contratos de prestação de serviços, fornecimento e parceria comercial",
      "Notificações extrajudiciais e mediação de conflitos contratuais",
      "Ações indenizatórias e cumprimento de obrigações",
    ],
  },
  {
    id: "imobiliario",
    title: "Direito Imobiliário e Condominial",
    description:
      "Assessoria jurídica em transações imobiliárias urbanas em Fortaleza e Região Metropolitana, análise de risco documental (due diligence) e orientação a condomínios.",
    topics: [
      "Auditoria de certidões para compra e venda de imóveis",
      "Contratos de locação residencial, comercial e built to suit",
      "Regularização registral, usucapião extrajudicial e convenções de condomínio",
    ],
  },
  {
    id: "familia-sucessoes",
    title: "Direito de Família e Sucessões",
    description:
      "Condução técnica e reservada de demandas familiares e planejamento patrimonial sucessório, priorizando soluções consensuais em cartório quando cabíveis.",
    topics: [
      "Inventários judiciais e extrajudiciais e partilha de bens",
      "Planejamento sucessório, testamentos e doações com cláusulas de proteção",
      "Divórcio consensual ou litigioso, pacto antenupcial, guarda e alimentos",
    ],
  },
  {
    id: "trabalhista-empresarial",
    title: "Direito do Trabalho Consultivo e Contencioso",
    description:
      "Orientação preventiva para empregadores e representação técnica em reclamações trabalhistas, com foco na conformidade legal das rotinas de pessoal.",
    topics: [
      "Revisão de rotinas trabalhistas, banco de horas e cargos de confiança",
      "Defesa técnica em processos na Justiça do Trabalho (TRT da 7ª Região)",
      "Acompanhamento de rescisões, acordos extrajudiciais e auditoria interna",
    ],
  },
  {
    id: "empresarial-societario",
    title: "Direito Empresarial e Societário",
    description:
      "Estruturação jurídica de sociedades limitadas, empresas familiares e prestadores de serviços, prevenindo litígios entre sócios e perante órgãos públicos.",
    topics: [
      "Constituição de sociedades, alterações contratuais e acordos de sócios",
      " Dissolução parcial de sociedade e apuração de haveres",
      "Adequação de documentos internos à Lei Geral de Proteção de Dados (LGPD)",
    ],
  },
  {
    id: "consumidor-saude",
    title: "Relações de Consumo e Direito à Saúde",
    description:
      "Atuação consultiva para adequação de empresas ao Código de Defesa do Consumidor e representação em demandas envolvendo planos de saúde e serviços essenciais.",
    topics: [
      "Revisão de termos de uso, políticas comerciais e atendimento ao cliente",
      "Defesa administrativa perante órgãos de proteção ao consumidor (DECON/PROCON)",
      "Questões contratuais relativas a coberturas de assistência suplementar à saúde",
    ],
  },
];

const TEAM_MEMBERS: readonly LawyerProfile[] = [
  {
    id: "helena-vasconcelos",
    name: "Dra. Helena Vasconcelos",
    oab: "OAB/CE 00.000",
    role: "Sócia Fundadora · Direito Civil, Imobiliário e Sucessões",
    education:
      "Graduada em Direito pela Universidade Federal do Ceará (UFC) e Especialista em Direito Processual Civil e Negócios Imobiliários.",
    bio: "Atua há 14 anos na consultoria preventiva de contratos imobiliários, regularização patrimonial e condução de inventários extrajudiciais e judiciais no Ceará.",
    photoLabel: "Retrato profissional da advogada Dra. Helena em escritório",
  },
  {
    id: "marcos-albuquerque",
    name: "Dr. Marcos Albuquerque",
    oab: "OAB/CE 00.000",
    role: "Sócio · Direito Empresarial, Societário e Trabalhista",
    education:
      "Graduado em Direito pela Universidade de Fortaleza (UNIFOR), Pós-graduado em Direito Empresarial e LL.M. em Direito Corporativo.",
    bio: "Dedica-se à assessoria jurídica continuada de pequenas e médias empresas, estruturação de acordos societários e prevenção de passivos trabalhistas.",
    photoLabel: "Retrato profissional do advogado Dr. Marcos em biblioteca jurídica",
  },
  {
    id: "beatriz-fontenele",
    name: "Dra. Beatriz Fontenele",
    oab: "OAB/CE 00.000",
    role: "Advogada Associada · Contencioso Cível, Consumidor e LGPD",
    education:
      "Graduada em Direito pela UNIFOR e Especialista em Direito Digital, Proteção de Dados e Relações de Consumo.",
    bio: "Responsável pelo acompanhamento processual perante o TJCE, elaboração de pareceres técnicos e adequação contratual à legislação de proteção de dados.",
    photoLabel: "Retrato profissional da advogada Dra. Beatriz em sala de reunião",
  },
];

const LEGAL_ARTICLES: readonly LegalArticle[] = [
  {
    id: "cuidados-compra-imovel",
    category: "Direito Imobiliário",
    date: "14 de outubro de 2026",
    readingTime: "Leitura de 4 min",
    title:
      "Quais certidões verificar antes de assinar um contrato de compra e venda de imóvel",
    excerpt:
      "A análise prévia da matrícula atualizada e das certidões pessoais dos vendedores evita que dívidas anteriores recaiam sobre o imóvel adquirido.",
    keyPoints: [
      "Matrícula atualizada expedida pelo Cartório de Registro de Imóveis há menos de 30 dias",
      "Certidões negativas de ações cíveis, trabalhistas e execuções fiscais dos vendedores",
      "Declaração de quitação de débitos condominiais e certidão negativa de IPTU na SEFIN",
    ],
  },
  {
    id: "inventario-extrajudicial",
    category: "Sucessões e Patrimônio",
    date: "28 de setembro de 2026",
    readingTime: "Leitura de 5 min",
    title:
      "Inventário em cartório: requisitos legais, documentos necessários e etapas do procedimento",
    excerpt:
      "Quando há consenso entre os herdeiros, a via extrajudicial por escritura pública permite concluir a partilha de bens de forma célere, sempre com assistência de advogado.",
    keyPoints: [
      "Consenso integral entre os herdeiros sobre a divisão do acervo patrimonial",
      "Recolhimento do imposto de transmissão (ITCD) junto à Secretaria da Fazenda Estadual",
      "Lavratura da escritura pública em Tabelionato de Notas de livre escolha das partes",
    ],
  },
  {
    id: "contrato-prestacao-servicos-pj",
    category: "Direito Empresarial",
    date: "09 de setembro de 2026",
    readingTime: "Leitura de 4 min",
    title:
      "Cláusulas essenciais em contratos de prestação de serviços entre empresas",
    excerpt:
      "Um instrumento contratual claro delimita responsabilidades, prazos de entrega, critérios de reajuste e procedimentos formais em caso de rescisão.",
    keyPoints: [
      "Descrição objetiva do escopo contratado e do que constitui serviço adicional",
      "Regras sobre confidencialidade, propriedade intelectual e proteção de dados pessoais",
      "Previsão de aviso prévio, multa proporcional e eleição de foro competente",
    ],
  },
];

export default function PilarDemo({ businessName, compact = false }: DemoProps) {
  const name = businessName?.trim() || "Vasconcelos & Albuquerque Advocacia";

  const generalConsultationUrl = buildWhatsAppUrl(
    buildMessage({
      source: "demo",
      modelName: "Pilar",
      businessName: name,
      notes: "gostei da apresentação institucional sóbria e do agendamento de atendimento",
    }),
  );

  return (
    <div id="pilar-inicio" className={styles.pilar}>
      <div className={styles.topInstitutionalBar}>
        <div className={styles.container}>
          <div className={styles.topBarInner}>
            <span>Sociedade de Advogados registrada na OAB/CE sob o nº 0.000 (fictício)</span>
            <span>Atendimento presencial na Aldeota e por videoconferência</span>
          </div>
        </div>
      </div>

      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.headerInner}>
            <div className={styles.brandGroup}>
              <span className={styles.monogram} aria-hidden="true">
                VA
              </span>
              <div className={styles.brandText}>
                <span className={styles.brandName}>{name}</span>
                <span className={styles.brandSubtitle}>
                  Consultoria e Contencioso Cível, Imobiliário e Empresarial
                </span>
              </div>
            </div>

            <nav aria-label="Navegação institucional" className={styles.nav}>
              <a href="#pilar-inicio" className={styles.navLink}>
                Início
              </a>
              <a href="#pilar-areas" className={styles.navLink}>
                Áreas de atuação
              </a>
              <a href="#pilar-equipe" className={styles.navLink}>
                Equipe
              </a>
              {!compact && (
                <a href="#pilar-artigos" className={styles.navLink}>
                  Artigos
                </a>
              )}
              <a href="#pilar-contato" className={styles.navLink}>
                Contato
              </a>
            </nav>
          </div>
        </div>
      </header>

      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroGrid}>
            <div className={styles.heroContent}>
              <p className={styles.heroKicker}>
                Fortaleza/CE · Atuação ética, técnica e preventiva
              </p>
              <h1 className={styles.heroTitle}>{name}</h1>
              <p className={styles.heroLead}>
                Escritório dedicado à assessoria jurídica de famílias,
                profissionais e empresas. Trabalhamos com análise minuciosa de
                documentos, redação contratual clara e acompanhamento próximo em
                todas as etapas administrativas ou judiciais.
              </p>

              <div className={styles.heroActions}>
                <a
                  href={generalConsultationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Solicitar agendamento de consulta pelo WhatsApp (abre o WhatsApp)"
                  className={styles.primaryBtn}
                >
                  <WhatsAppIcon />
                  <span>Solicitar agendamento de horário</span>
                </a>
                <a href="#pilar-areas" className={styles.secondaryBtn}>
                  Conhecer áreas de atuação
                </a>
              </div>

              <div className={styles.credentialsRow}>
                <div className={styles.credentialItem}>
                  <strong>Atendimento com hora marcada</strong>
                  <span>Presencial em Fortaleza ou online por vídeo</span>
                </div>
                <div className={styles.credentialItem}>
                  <strong>Comunicação direta</strong>
                  <span>Relatórios periódicos em linguagem compreensível</span>
                </div>
              </div>
            </div>

            <div className={styles.heroVisual}>
              <DemoImage
                label="Sala de reuniões do escritório com mesa de madeira e estante jurídica"
                ratio="4/3"
                tone="dark"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="pilar-areas" className={styles.areasSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Áreas de atuação</h2>
            <p className={styles.sectionIntro}>
              Atuamos de forma consultiva — prevenindo litígios por meio de
              contratos e pareceres — e no contencioso judicial e extrajudicial.
            </p>
          </div>

          <div className={styles.areasGrid}>
            {PRACTICE_AREAS.map((area) => {
              const areaUrl = buildWhatsAppUrl(
                buildMessage({
                  source: "demo",
                  modelName: "Pilar",
                  businessName: name,
                  notes: `gostei da seção de áreas de atuação (interesse em: ${area.title})`,
                }),
              );

              return (
                <article key={area.id} className={styles.areaCard}>
                  <h3 className={styles.areaTitle}>{area.title}</h3>
                  <p className={styles.areaDesc}>{area.description}</p>
                  <ul className={styles.areaTopics}>
                    {area.topics.map((topic) => (
                      <li key={topic}>{topic}</li>
                    ))}
                  </ul>
                  <div className={styles.areaFooter}>
                    <a
                      href={areaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Solicitar atendimento sobre ${area.title} no WhatsApp (abre o WhatsApp)`}
                      className={styles.areaLink}
                    >
                      Solicitar orientação nesta área
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="pilar-equipe" className={styles.teamSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Corpo jurídico</h2>
            <p className={styles.sectionIntro}>
              Profissionais com inscrição regular na Ordem dos Advogados do
              Brasil — Seccional Ceará e formação acadêmica continuada.
            </p>
          </div>

          <div className={styles.teamGrid}>
            {TEAM_MEMBERS.map((member) => (
              <article key={member.id} className={styles.memberCard}>
                <DemoImage
                  label={member.photoLabel}
                  ratio="4/3"
                  tone="light"
                />
                <div className={styles.memberBody}>
                  <div className={styles.memberHeader}>
                    <h3 className={styles.memberName}>{member.name}</h3>
                    <span className={styles.oabBadge}>{member.oab}</span>
                  </div>
                  <p className={styles.memberRole}>{member.role}</p>
                  <p className={styles.memberBio}>{member.bio}</p>
                  <p className={styles.memberEducation}>
                    <strong>Formação:</strong> {member.education}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {!compact && (
        <section id="pilar-artigos" className={styles.articlesSection}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>
                Artigos e orientações informativas
              </h2>
              <p className={styles.sectionIntro}>
                Publicações de caráter meramente informativo e educativo sobre
                temas recorrentes do Direito Civil, Imobiliário e Empresarial
                (em conformidade com o Provimento nº 205/2021 da OAB).
              </p>
            </div>

            <div className={styles.articlesGrid}>
              {LEGAL_ARTICLES.map((article) => {
                const articleWhatsAppUrl = buildWhatsAppUrl(
                  buildMessage({
                    source: "demo",
                    modelName: "Pilar",
                    businessName: name,
                    notes: `gostei da seção de artigos informativos (li: ${article.title})`,
                  }),
                );

                return (
                  <article key={article.id} className={styles.articleCard}>
                    <div className={styles.articleMeta}>
                      <span className={styles.articleCategory}>
                        {article.category}
                      </span>
                      <span>
                        {article.date} · {article.readingTime}
                      </span>
                    </div>

                    <h3 className={styles.articleTitle}>{article.title}</h3>
                    <p className={styles.articleExcerpt}>{article.excerpt}</p>

                    <div className={styles.articlePointsBox}>
                      <span className={styles.pointsHeading}>
                        Pontos de atenção abordados:
                      </span>
                      <ul className={styles.articlePoints}>
                        {article.keyPoints.map((pt) => (
                          <li key={pt}>{pt}</li>
                        ))}
                      </ul>
                    </div>

                    <a
                      href={articleWhatsAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Tirar dúvida institucional sobre o tema ${article.category} no WhatsApp (abre o WhatsApp)`}
                      className={styles.articleLink}
                    >
                      Conversar com a equipe sobre este tema
                    </a>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <section id="pilar-contato" className={styles.contactSection}>
        <div className={styles.container}>
          <div className={styles.contactGrid}>
            <div className={styles.contactInfo}>
              <h2 className={styles.contactTitle}>
                Atendimento e localização em Fortaleza
              </h2>
              <p className={styles.contactLead}>
                O atendimento é realizado mediante agendamento prévio para
                garantir sigilo, pontualidade e análise adequada da documentação
                do seu caso.
              </p>

              <dl className={styles.detailsList}>
                <div className={styles.detailRow}>
                  <dt>Endereço (fictício)</dt>
                  <dd>
                    Av. Exemplo, 1500, Sala 904 — Edifício Empresarial Aldeota,
                    Bairro Aldeota, Fortaleza/CE · CEP 60150-000 (estacionamento
                    rotativo no subsolo)
                  </dd>
                </div>
                <div className={styles.detailRow}>
                  <dt>Horário de expediente</dt>
                  <dd>Segunda a sexta-feira, das 8h30 às 18h00</dd>
                </div>
                <div className={styles.detailRow}>
                  <dt>Canais de contato</dt>
                  <dd>
                    Telefone / WhatsApp: (85) 90000-0000 · E-mail:
                    contato@exemplo.adv.br
                  </dd>
                </div>
              </dl>
            </div>

            <div className={styles.contactCard}>
              <h3 className={styles.cardHeading}>Agendar consulta inicial</h3>
              <p className={styles.cardText}>
                Entre em contato com a nossa secretaria pelo WhatsApp informando
                brevemente a natureza da sua demanda (Cível, Imobiliário,
                Sucessões, Trabalhista ou Empresarial) e sua preferência de
                turno.
              </p>

              <a
                href={generalConsultationUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Falar com a secretaria do escritório no WhatsApp (abre o WhatsApp)"
                className={styles.contactWhatsappBtn}
              >
                <WhatsAppIcon />
                <span>Falar com a secretaria no WhatsApp</span>
              </a>

              <p className={styles.ethicsNotice}>
                <strong>Nota ética (Provimento OAB nº 205/2021):</strong> Este
                site tem finalidade exclusivamente informativa e institucional.
                Nenhuma informação aqui publicada substitui consulta jurídica
                formal.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.container}>
          <p className={styles.footerText}>
            © 2026 {name} · Modelo de demonstração criado pela MJ Studio
          </p>
        </div>
      </footer>
    </div>
  );
}
