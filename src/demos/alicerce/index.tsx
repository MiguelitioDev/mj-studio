import { useState } from "react";
import { DemoImage } from "../../components/ui/DemoImage";
import { WhatsAppIcon } from "../../components/ui/WhatsAppIcon";
import { buildMessage, buildWhatsAppUrl } from "../../lib/whatsapp";
import type { DemoProps } from "../types";
import styles from "./alicerce.module.css";

interface ServiceCategory {
  id: string;
  title: string;
  summary: string;
  items: readonly string[];
  warranty: string;
}

interface CompletedWork {
  id: string;
  title: string;
  neighborhood: string;
  duration: string;
  caption: string;
  photoLabel: string;
}

const SERVICE_OPTIONS: readonly { id: string; label: string }[] = [
  { id: "eletrica", label: "Elétrica e quadro de disjuntores" },
  { id: "hidraulica", label: "Hidráulica e caça-vazamentos" },
  { id: "pintura", label: "Pintura e tratamento de umidade" },
  { id: "reparos", label: "Pequenos reparos e instalações" },
];

const URGENCY_OPTIONS: readonly { id: string; label: string }[] = [
  { id: "hoje", label: "Urgente (para hoje ou amanhã)" },
  { id: "semana", label: "Para esta semana" },
  { id: "planejado", label: "Só pesquisando orçamento" },
];

const SERVICES_LIST: readonly ServiceCategory[] = [
  {
    id: "eletrica",
    title: "Elétrica residencial e comercial",
    summary:
      "Instalações seguras dentro da norma NBR 5410, sem gambiarras nem fios soltos.",
    items: [
      "Troca de disjuntores, revisão de quadro e balanceamento de fases",
      "Instalação de chuveiro elétrico, tomadas 220V e luminárias LED",
      "Passagem de cabos para ar-condicionado split e tomadas dedicadas",
      "Substituição de fiação antiga com cheiro de queimado ou queda de energia",
    ],
    warranty: "Garantia de 90 dias na mão de obra",
  },
  {
    id: "hidraulica",
    title: "Hidráulica e infiltrações",
    summary:
      "Reparo limpo em encanamentos de água fria, esgoto, caixas d'água e registros.",
    items: [
      "Conserto de vazamentos em canos de PVC, registros de pressão e válvulas Hydra",
      "Desentupimento de pias, ralos de banheiro e caixas de gordura",
      "Instalação de torneiras gourmet, sifões, vasos sanitários e duchas higiênicas",
      "Limpeza e vedação de caixa d'água com troca de boia",
    ],
    warranty: "Garantia de 90 dias contra vazamentos no ponto reparado",
  },
  {
    id: "pintura",
    title: "Pintura e recuperação de paredes",
    summary:
      "Proteção completa do piso e dos móveis com lona antes de abrir a lata de tinta.",
    items: [
      "Pintura interna e externa com tinta acrílica lavável ou fosca",
      "Tratamento de parede descascando por umidade ou salitre de maresia",
      "Aplicação de massa corrida, lixamento com redução de pó e reparo de trincas",
      "Pintura de grades, portões metálicos e portas de madeira com esmalte",
    ],
    warranty: "Entrega com ambiente limpo e vistoriado",
  },
  {
    id: "reparos",
    title: "Pequenos reparos (Marido de Aluguel)",
    summary:
      "Aquelas pendências da casa ou do escritório resolvidas em uma única visita.",
    items: [
      "Instalação de suporte de TV na parede ou painel, cortinas e persianas",
      "Fixação de prateleiras, nichos, espelhos, quadros e varal de teto",
      "Troca de fechaduras, dobradiças de armário e regulagem de portas",
      "Assentamento de pisos soltos, rejunte de box de banheiro e vedação em silicone",
    ],
    warranty: "Atendimento por diária ou pacote de itens",
  },
];

const NEIGHBORHOODS: readonly string[] = [
  "Aldeota",
  "Meireles",
  "Messejana",
  "Parangaba",
  "Cocó",
  "Benfica",
  "Montese",
  "Papicu",
  "Fátima",
  "Maraponga",
  "Dionísio Torres",
  "Cidade dos Funcionários",
  "Joaquim Távora",
  "Passaré",
  "Parquelândia",
  "Cambeba",
];

const COMPLETED_WORKS: readonly CompletedWork[] = [
  {
    id: "quadro-aldeota",
    title: "Modernização de quadro elétrico bifásico",
    neighborhood: "Aldeota · Apartamento 110 m²",
    duration: "Concluído em 1 dia",
    caption:
      "Substituição de disjuntores antigos padrão NEMA por trilho DIN com DR de proteção contra choques e identificação de todos os circuitos.",
    photoLabel: "Quadro de distribuição elétrica organizado e identificado",
  },
  {
    id: "pintura-coco",
    title: "Recuperação de umidade e pintura de sala",
    neighborhood: "Cocó · Residência térrea",
    duration: "Concluído em 3 dias",
    caption:
      "Raspagem de reboco esfarelando próximo ao rodapé, aplicação de impermeabilizante bloqueador de umidade, emassamento e duas demãos de acrílico fosco.",
    photoLabel: "Sala recém-pintada em tom areia com rodapé branco protegido",
  },
  {
    id: "hidraulica-fatima",
    title: "Revisão hidráulica de banheiro e troca de louças",
    neighborhood: "Fátima · Consultório comercial",
    duration: "Concluído em 1 turno",
    caption:
      "Eliminação de vazamento no registro geral, instalação de vaso com caixa acoplada de duplo acionamento e cuba de apoio com torneira metálica.",
    photoLabel: "Bancada de banheiro com cuba e metais recém-instalados",
  },
  {
    id: "reparos-meireles",
    title: "Pacote de instalações em apartamento novo",
    neighborhood: "Meireles · Entrega de chaves",
    duration: "Concluído em 1 dia",
    caption:
      "Instalação de 6 luminárias de sobrepor, 2 suportes articulados de TV, varal de teto individual, olho mágico e barras de apoio no box.",
    photoLabel: "Luminárias de teto e suporte de TV alinhados na sala",
  },
];

export default function AlicerceDemo({ businessName, compact = false }: DemoProps) {
  const name = businessName?.trim() || "Alicerce — Reformas & Reparos";
  const [selectedService, setSelectedService] = useState<string>(SERVICE_OPTIONS[0].id);
  const [neighborhoodInput, setNeighborhoodInput] = useState<string>("");
  const [selectedUrgency, setSelectedUrgency] = useState<string>(URGENCY_OPTIONS[1].id);

  const serviceLabel =
    SERVICE_OPTIONS.find((opt) => opt.id === selectedService)?.label ??
    SERVICE_OPTIONS[0].label;
  const urgencyLabel =
    URGENCY_OPTIONS.find((opt) => opt.id === selectedUrgency)?.label ??
    URGENCY_OPTIONS[1].label;
  const cleanNeighborhood = neighborhoodInput.trim() || "Fortaleza (bairro a informar)";

  const quoteNotes = `gostei do orçamento rápido (serviço: ${serviceLabel}; bairro: ${cleanNeighborhood}; urgência: ${urgencyLabel})`;

  const quoteWhatsAppUrl = buildWhatsAppUrl(
    buildMessage({
      source: "demo",
      modelName: "Alicerce",
      businessName: name,
      notes: quoteNotes,
    }),
  );

  const directWhatsAppUrl = buildWhatsAppUrl(
    buildMessage({
      source: "demo",
      modelName: "Alicerce",
      businessName: name,
      notes: "gostei do botão de atendimento direto para serviços e reformas",
    }),
  );

  return (
    <div className={styles.alicerce}>
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.headerInner}>
            <div className={styles.brandBlock}>
              <span className={styles.brandBadge}>CREA/CFT Ativo</span>
              <span className={styles.brandName}>{name}</span>
            </div>

            <nav aria-label="Navegação da página" className={styles.nav}>
              <a href="#alicerce-orcamento" className={styles.navLink}>
                Orçamento rápido
              </a>
              <a href="#alicerce-servicos" className={styles.navLink}>
                Serviços
              </a>
              <a href="#alicerce-bairros" className={styles.navLink}>
                Bairros
              </a>
              {!compact && (
                <a href="#alicerce-obras" className={styles.navLink}>
                  Obras realizadas
                </a>
              )}
            </nav>
          </div>
        </div>
      </header>

      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroGrid}>
            <div className={styles.heroContent}>
              <p className={styles.heroTag}>
                Atendimento em Fortaleza · Hora marcada e orçamento sem taxa de visita
              </p>
              <h1 className={styles.heroTitle}>{name}</h1>
              <p className={styles.heroLead}>
                Elétrica, hidráulica, pintura e pequenos reparos para casas,
                apartamentos e pontos comerciais. Equipe uniformizada, preço
                combinado antes de começar o serviço e nota de garantia de 90
                dias por escrito.
              </p>

              <div className={styles.heroActions}>
                <a href="#alicerce-orcamento" className={styles.primaryCta}>
                  Responder 3 perguntas e pedir orçamento
                </a>
                <a
                  href={directWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Chamar técnico no WhatsApp agora (abre o WhatsApp)"
                  className={styles.secondaryCta}
                >
                  <WhatsAppIcon />
                  <span>Mandar foto do problema no WhatsApp</span>
                </a>
              </div>

              <ul className={styles.trustHighlights}>
                <li>Orçamento fechado por serviço (não cobramos por hora enrolada)</li>
                <li>Emitimos Nota Fiscal de Serviço (NFS-e) para condomínios e empresas</li>
                <li>Pagamento em Pix, dinheiro ou cartão em até 4x sem juros</li>
              </ul>
            </div>

            <div className={styles.heroImage}>
              <DemoImage
                label="Profissional uniformizado revisando instalação elétrica com multímetro"
                ratio="4/3"
                tone="dark"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="alicerce-orcamento" className={styles.quoteSection}>
        <div className={styles.container}>
          <div className={styles.quoteCard}>
            <div className={styles.quoteHeader}>
              <span className={styles.stepPill}>Orçamento rápido em 30 segundos</span>
              <h2 className={styles.sectionTitle}>
                Adiante seu atendimento em 3 perguntas
              </h2>
              <p className={styles.sectionSubtitle}>
                Marque o que você precisa abaixo. O site monta a mensagem pronta
                para você enviar no nosso WhatsApp e receber a estimativa de
                valor e horário disponível.
              </p>
            </div>

            <div className={styles.questionsGrid}>
              <fieldset className={styles.fieldset}>
                <legend className={styles.legend}>
                  1. Qual é o tipo de serviço?
                </legend>
                <div className={styles.radioList}>
                  {SERVICE_OPTIONS.map((option) => (
                    <label
                      key={option.id}
                      className={[
                        styles.radioLabel,
                        selectedService === option.id ? styles.radioLabelActive : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      <input
                        type="radio"
                        name="alicerce-servico"
                        value={option.id}
                        checked={selectedService === option.id}
                        onChange={() => setSelectedService(option.id)}
                        className={styles.radioInput}
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className={styles.middleColumn}>
                <div className={styles.fieldGroup}>
                  <label
                    htmlFor="alicerce-bairro-input"
                    className={styles.legend}
                  >
                    2. Qual é o seu bairro em Fortaleza?
                  </label>
                  <p className={styles.fieldHint}>
                    Ajuda a calcular o deslocamento e informar quem da equipe
                    está mais perto.
                  </p>
                  <input
                    id="alicerce-bairro-input"
                    type="text"
                    maxLength={50}
                    value={neighborhoodInput}
                    onChange={(e) => setNeighborhoodInput(e.target.value)}
                    placeholder="Ex.: Aldeota, Messejana, Parangaba..."
                    className={styles.textInput}
                  />
                  <div className={styles.quickNeighborhoods}>
                    <span className={styles.quickLabel}>Preencher rápido:</span>
                    {["Aldeota", "Meireles", "Messejana", "Parangaba", "Cocó"].map(
                      (b) => (
                        <button
                          key={b}
                          type="button"
                          onClick={() => setNeighborhoodInput(b)}
                          className={styles.quickChip}
                        >
                          {b}
                        </button>
                      ),
                    )}
                  </div>
                </div>

                <fieldset className={styles.fieldset}>
                  <legend className={styles.legend}>
                    3. Qual é a urgência do atendimento?
                  </legend>
                  <div className={styles.radioList}>
                    {URGENCY_OPTIONS.map((option) => (
                      <label
                        key={option.id}
                        className={[
                          styles.radioLabel,
                          selectedUrgency === option.id
                            ? styles.radioLabelActive
                            : "",
                        ]
                          .filter(Boolean)
                          .join(" ")}
                      >
                        <input
                          type="radio"
                          name="alicerce-urgencia"
                          value={option.id}
                          checked={selectedUrgency === option.id}
                          onChange={() => setSelectedUrgency(option.id)}
                          className={styles.radioInput}
                        />
                        <span>{option.label}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
              </div>
            </div>

            <div className={styles.quoteSummaryBar}>
              <div className={styles.summaryPreview}>
                <span className={styles.summaryTitle}>Resumo que vai no WhatsApp:</span>
                <p className={styles.summaryText}>
                  <strong>Serviço:</strong> {serviceLabel} ·{" "}
                  <strong>Bairro:</strong> {cleanNeighborhood} ·{" "}
                  <strong>Prazo:</strong> {urgencyLabel}
                </p>
              </div>

              <a
                href={quoteWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Enviar respostas e pedir orçamento no WhatsApp (abre o WhatsApp)"
                className={styles.quoteSubmitBtn}
              >
                <WhatsAppIcon />
                <span>Pedir orçamento no WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="alicerce-servicos" className={styles.servicesSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Serviços que executamos</h2>
            <p className={styles.sectionSubtitle}>
              Levamos todas as ferramentas, escada e aspirador portátil. Você só
              compra o material que realmente for usar — ou levamos com nota.
            </p>
          </div>

          <div className={styles.servicesGrid}>
            {SERVICES_LIST.map((service) => {
              const serviceUrl = buildWhatsAppUrl(
                buildMessage({
                  source: "demo",
                  modelName: "Alicerce",
                  businessName: name,
                  notes: `gostei da lista de serviços (interesse em: ${service.title})`,
                }),
              );

              return (
                <article key={service.id} className={styles.serviceCard}>
                  <div className={styles.serviceTop}>
                    <h3 className={styles.serviceTitle}>{service.title}</h3>
                    <p className={styles.serviceSummary}>{service.summary}</p>
                  </div>

                  <ul className={styles.serviceItems}>
                    {service.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>

                  <div className={styles.serviceFooter}>
                    <span className={styles.warrantyTag}>{service.warranty}</span>
                    <a
                      href={serviceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Orçar ${service.title} no WhatsApp (abre o WhatsApp)`}
                      className={styles.serviceLink}
                    >
                      Orçar este serviço
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="alicerce-bairros" className={styles.neighborhoodsSection}>
        <div className={styles.container}>
          <div className={styles.neighborhoodsBox}>
            <div className={styles.neighborhoodsHeader}>
              <h2 className={styles.sectionTitle}>
                Bairros atendidos em Fortaleza
              </h2>
              <p className={styles.sectionSubtitle}>
                Atendemos de segunda a sábado, das 7h30 às 18h, sem taxa de
                deslocamento nos bairros listados abaixo:
              </p>
            </div>

            <ul
              className={styles.neighborhoodsGrid}
              aria-label="Lista de bairros atendidos em Fortaleza"
            >
              {NEIGHBORHOODS.map((bairro) => (
                <li key={bairro} className={styles.neighborhoodItem}>
                  {bairro}
                </li>
              ))}
            </ul>

            <p className={styles.neighborhoodNote}>
              Seu bairro não está na lista ou você está no Eusébio / Caucaia /
              Maracanaú? Chame no WhatsApp informando o CEP para consultarmos a
              agenda da equipe.
            </p>
          </div>
        </div>
      </section>

      {!compact && (
        <>
          <section id="alicerce-obras" className={styles.worksSection}>
            <div className={styles.container}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Obras e serviços realizados</h2>
                <p className={styles.sectionSubtitle}>
                  Exemplos de atendimentos residenciais e comerciais entregues no
                  prazo combinado.
                </p>
              </div>

              <div className={styles.worksGrid}>
                {COMPLETED_WORKS.map((work) => (
                  <article key={work.id} className={styles.workCard}>
                    <DemoImage
                      label={work.photoLabel}
                      ratio="16/10"
                      tone="dark"
                    />
                    <div className={styles.workBody}>
                      <div className={styles.workMeta}>
                        <span>{work.neighborhood}</span>
                        <span className={styles.workDuration}>
                          {work.duration}
                        </span>
                      </div>
                      <h3 className={styles.workTitle}>{work.title}</h3>
                      <p className={styles.workCaption}>{work.caption}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section id="alicerce-garantia" className={styles.warrantySection}>
            <div className={styles.container}>
              <div className={styles.warrantyBanner}>
                <div className={styles.warrantyContent}>
                  <span className={styles.warrantyBadge}>
                    Compromisso por escrito
                  </span>
                  <h2 className={styles.warrantyTitle}>
                    Garantia de 90 dias e respeito à sua casa
                  </h2>
                  <p className={styles.warrantyDesc}>
                    Todo serviço finalizado recebe um recibo detalhado com 90
                    dias de garantia legal e contratual sobre a mão de obra. Se
                    algum ajuste for necessário no ponto reparado dentro desse
                    prazo, voltamos sem cobrar nova visita.
                  </p>
                  <ul className={styles.warrantyList}>
                    <li>
                      <strong>Proteção antes de começar:</strong> forramos
                      bancadas, pisos e móveis com lona plástica e fita crepe.
                    </li>
                    <li>
                      <strong>Lista de materiais honesta:</strong> indicamos as
                      marcas de melhor custo-benefício para você comprar onde
                      preferir.
                    </li>
                    <li>
                      <strong>Identificação prévia:</strong> enviamos no
                      WhatsApp o nome do técnico que vai tocar o interfone do
                      seu prédio.
                    </li>
                  </ul>
                </div>

                <div className={styles.warrantyContactBox}>
                  <h3 className={styles.contactBoxTitle}>
                    Fale direto com o técnico responsável
                  </h3>
                  <p className={styles.contactBoxText}>
                    Mande uma foto ou vídeo curto de onde está o defeito. Na
                    maioria dos casos já conseguimos passar a faixa de valor na
                    hora.
                  </p>
                  <a
                    href={directWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Solicitar visita ou orçamento no WhatsApp (abre o WhatsApp)"
                    className={styles.warrantyCta}
                  >
                    <WhatsAppIcon />
                    <span>Conversar no WhatsApp</span>
                  </a>
                  <address className={styles.contactAddress}>
                    Base operacional (fictícia): Rua Exemplo, 850 — Montese,
                    Fortaleza/CE · CNPJ 00.000.000/0001-00 · Tel.: (85)
                    90000-0000
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
            © 2026 {name} · Modelo de demonstração criado pela MJ Studio
          </p>
        </div>
      </footer>
    </div>
  );
}
