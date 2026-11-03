export type PlanSlug = "essencial" | "profissional" | "completo";

export type Billing = "mensal" | "projeto";

export interface Plan {
  slug: PlanSlug;
  name: string;
  /** Valor da mensalidade (assinatura com hospedagem e alterações). */
  monthly: number;
  /** Valor único do projeto, para quem não quer mensalidade. */
  project: number;
  forWho: string;
  deadline: string;
  /** O que o site tem. Vale para os dois formatos de contratação. */
  includes: string[];
  /** O que a mensalidade acrescenta. */
  monthlyBenefits: string[];
  /** O que vem junto no projeto avulso. */
  projectBenefits: string[];
  recommended?: boolean;
  badge?: string;
}

/** Mínimo de meses da assinatura. Sem taxa de entrada. */
export const MONTHLY_MIN_MONTHS = 12;

export const plans: Plan[] = [
  {
    slug: "essencial",
    name: "Essencial",
    monthly: 97,
    project: 590,
    forWho: "Quem precisa estar no Google e no WhatsApp com uma página simples",
    deadline: "até 7 dias úteis",
    includes: [
      "1 página com até 5 seções",
      "Adaptado a celular",
      "Botão de WhatsApp com mensagem pronta",
      "Endereço e horários",
      "SEO básico (título, descrição, compartilhamento)",
    ],
    monthlyBenefits: [
      "Hospedagem e certificado de segurança (SSL)",
      "1 alteração de texto, foto ou preço por mês",
      "Suporte pelo WhatsApp em horário comercial",
    ],
    projectBenefits: [
      "Publicação em hospedagem gratuita",
      "1 rodada de ajustes",
    ],
  },
  {
    slug: "profissional",
    name: "Profissional",
    monthly: 147,
    project: 1190,
    forWho: "Negócios que querem apresentar serviços e preços com cara profissional",
    deadline: "até 12 dias úteis",
    recommended: true,
    badge: "Mais escolhido",
    includes: [
      "Tudo do Essencial",
      "Até 10 seções",
      "Modelo do seu ramo com suas cores e logo",
      "Lista de serviços/preços ou cardápio simples",
      "Galeria de fotos",
      "Orientação para o Perfil da Empresa no Google",
      "Política de Privacidade e aviso LGPD",
    ],
    monthlyBenefits: [
      "Hospedagem e certificado de segurança (SSL)",
      "3 alterações por mês",
      "Suporte pelo WhatsApp em horário comercial",
    ],
    projectBenefits: [
      "Publicação em hospedagem gratuita",
      "2 rodadas de ajustes",
    ],
  },
  {
    slug: "completo",
    name: "Completo",
    monthly: 247,
    project: 1990,
    forWho: "Quem vende produtos ou precisa de várias páginas",
    deadline: "até 20 dias úteis",
    includes: [
      "Tudo do Profissional",
      "Até 5 páginas",
      "Catálogo ou cardápio com até 40 itens e pedido pelo WhatsApp",
      "Configuração do domínio",
      "Métricas de visitas com aviso de cookies",
    ],
    monthlyBenefits: [
      "Hospedagem e certificado de segurança (SSL)",
      "6 alterações por mês",
      "Suporte prioritário pelo WhatsApp",
    ],
    projectBenefits: [
      "Publicação em hospedagem gratuita",
      "30 dias de suporte após publicar",
      "3 rodadas de ajustes",
    ],
  },
];
