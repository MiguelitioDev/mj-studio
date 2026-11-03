export interface Extra {
  name: string;
  price: string;
  description?: string;
}

export const extras: Extra[] = [
  {
    name: "Domínio .com.br",
    price: "cerca de R$ 40 por ano, pago direto no Registro.br, no seu nome",
  },
  {
    name: "Hospedagem",
    price:
      "inclusa na mensalidade; no projeto avulso, publicamos em hospedagem gratuita e avisamos antes se algum caso exigir plano pago",
  },
  {
    name: "Alterações depois do projeto avulso",
    price: "plano de manutenção a partir de R$ 49/mês (opcional) ou R$ 60 por alteração avulsa",
  },
  {
    name: "Página extra",
    price: "R$ 150 por página",
  },
  {
    name: "Logotipo simples",
    price: "R$ 300",
  },
];
