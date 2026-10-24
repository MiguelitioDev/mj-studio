export type PlanSlug = "essencial" | "profissional" | "completo";

export interface Plan {
  slug: PlanSlug;
  name: string;
  price: number;
  forWho: string;
  deadline: string;
  includes: string[];
  recommended?: boolean;
  badge?: string;
}

export const plans: Plan[] = [
  {
    slug: "essencial",
    name: "Essencial",
    price: 800,
    forWho: "Quem precisa estar no Google e no WhatsApp com uma página simples",
    deadline: "até 7 dias úteis",
    includes: [
      "1 página com até 5 seções",
      "Adaptado a celular",
      "Botão de WhatsApp com mensagem pronta",
      "Endereço e horários",
      "SEO básico (título, descrição, compartilhamento)",
      "1 rodada de ajustes",
    ],
  },
  {
    slug: "profissional",
    name: "Profissional",
    price: 1600,
    forWho: "Negócios que querem apresentar serviços e preços com cara profissional",
    deadline: "até 12 dias úteis",
    recommended: true,
    badge: "Recomendado",
    includes: [
      "Tudo do Essencial",
      "Até 10 seções",
      "Modelo do seu ramo com suas cores e logo",
      "Lista de serviços/preços ou cardápio simples",
      "Galeria de fotos",
      "Orientação para o Perfil da Empresa no Google",
      "Política de Privacidade e aviso LGPD",
      "2 rodadas de ajustes",
    ],
  },
  {
    slug: "completo",
    name: "Completo",
    price: 2900,
    forWho: "Quem vende produtos ou precisa de várias páginas",
    deadline: "até 20 dias úteis",
    includes: [
      "Tudo do Profissional",
      "Até 5 páginas",
      "Catálogo ou cardápio com até 40 itens e pedido pelo WhatsApp",
      "Configuração de domínio e hospedagem",
      "Métricas de visitas com aviso de cookies",
      "30 dias de suporte após publicar",
      "3 rodadas de ajustes",
    ],
  },
];
