export interface ProcessStep {
  number: number;
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  {
    number: 1,
    title: "Conversa no WhatsApp",
    description: "Você conta sobre o negócio e escolhe modelo e pacote.",
  },
  {
    number: 2,
    title: "Proposta por escrito",
    description: "Escopo, prazo e valor da mensalidade (ou do projeto) fechados antes de começar.",
  },
  {
    number: 3,
    title: "Construção com prévia",
    description: "Você acompanha por um link de prévia.",
  },
  {
    number: 4,
    title: "Ajustes e publicação",
    description: "Rodadas de ajuste incluídas, depois o site vai ao ar no seu domínio.",
  },
];

export const commitments: string[] = [
  "Valor fechado por escrito antes de começar: sem taxa de entrada na mensalidade e sem surpresa no fim.",
  "O domínio fica no seu nome.",
  "Site adaptado a celular e com recursos de acessibilidade.",
  "Política de privacidade e avisos da LGPD inclusos nos pacotes Profissional e Completo.",
];
