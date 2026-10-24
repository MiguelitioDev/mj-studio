import type { NicheSlug } from "./niches";
import type { PlanSlug } from "./plans";

export interface SiteModel {
  slug: string;
  name: string;
  niche: NicheSlug;
  idealFor: string;
  summary: string;
  highlights: string[];
  recommendedPlan: PlanSlug;
}

export const models: SiteModel[] = [
  {
    slug: "navalha",
    name: "Navalha",
    niche: "beleza",
    idealFor: "Barbearias, salões e estúdios de beleza",
    summary:
      "Site com tabela de serviços interativa para o cliente escolher cortes e agendar pelo WhatsApp.",
    highlights: [
      "Tabela de serviços com preço e duração para marcar e enviar no WhatsApp",
      "Apresentação da equipe com especialidades",
      "Horários de funcionamento e endereço claro",
      "Botão de agendamento rápido em destaque",
    ],
    recommendedPlan: "profissional",
  },
  {
    slug: "clareza",
    name: "Clareza",
    niche: "saude",
    idealFor: "Psicólogos, nutricionistas, fisioterapeutas e clínicas",
    summary:
      "Página acolhedora que explica como funciona o atendimento e tira dúvidas antes da primeira consulta.",
    highlights: [
      "Apresentação profissional com registro no conselho (CRP, CRM, CRN)",
      "Passo a passo de como funciona a primeira consulta",
      "Informações sobre atendimento presencial e online",
      "Perguntas frequentes e ética conforme normas dos conselhos",
    ],
    recommendedPlan: "profissional",
  },
  {
    slug: "brasa",
    name: "Brasa",
    niche: "alimentacao",
    idealFor: "Restaurantes, hamburguerias, pizzarias e delivery",
    summary:
      "Cardápio digital com categorias e sacola que soma o pedido e envia tudo pronto no WhatsApp.",
    highlights: [
      "Aviso automático de aberto agora ou fechado conforme o horário",
      "Cardápio separado por abas com adição de itens e cálculo de total",
      "Envio do pedido formatado direto para o WhatsApp da casa",
      "Lista de bairros atendidos e formas de pagamento aceitas",
    ],
    recommendedPlan: "completo",
  },
  {
    slug: "vitrine",
    name: "Vitrine",
    niche: "comercio",
    idealFor: "Lojas de roupas, calçados, acessórios e presentes",
    summary:
      "Catálogo de produtos com filtro por categoria e tamanho para o cliente pedir a peça certa no WhatsApp.",
    highlights: [
      "Grade de produtos com filtro rápido por categoria e tamanho",
      "Janela de detalhes da peça com escolha de variação",
      "Botão de pedido no WhatsApp já com nome e tamanho do produto",
      "Seção clara com regras de trocas, entregas e retirada",
    ],
    recommendedPlan: "completo",
  },
  {
    slug: "alicerce",
    name: "Alicerce",
    niche: "servicos",
    idealFor: "Eletricistas, encanadores, pintores, reformas e assistência técnica",
    summary:
      "Site direto ao ponto com questionário rápido de 3 perguntas que já adianta o orçamento no WhatsApp.",
    highlights: [
      "Orçamento rápido em 3 perguntas que monta a mensagem no WhatsApp",
      "Lista clara de serviços prestados e garantia",
      "Bairros atendidos em Fortaleza e região",
      "Galeria de serviços realizados",
    ],
    recommendedPlan: "essencial",
  },
  {
    slug: "pilar",
    name: "Pilar",
    niche: "escritorios",
    idealFor: "Escritórios de advocacia, contabilidade e consultoria",
    summary:
      "Site institucional sóbrio para apresentar áreas de atuação, sócios e artigos informativos.",
    highlights: [
      "Apresentação organizada das áreas de atuação",
      "Perfil dos profissionais com formação e registro (OAB, CRC)",
      "Espaço para artigos e orientações em linguagem acessível",
      "Visual sóbrio de acordo com as normas éticas da OAB e do CFC",
    ],
    recommendedPlan: "completo",
  },
  {
    slug: "cartao",
    name: "Cartão",
    niche: "autonomos",
    idealFor: "Profissionais autônomos, personal trainers, fotógrafos e professores",
    summary:
      "Página única para usar no link da bio do Instagram, reunindo seus botões de contato e mini portfólio.",
    highlights: [
      "Tudo em uma tela rápida para quem vem do Instagram",
      "Botões grandes para WhatsApp, agendamento, redes e localização",
      "Mini portfólio com 6 destaques do seu trabalho",
      "Espaço para informações rápidas e apresentação pessoal",
    ],
    recommendedPlan: "essencial",
  },
];
