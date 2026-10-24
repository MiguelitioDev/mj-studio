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
      "planos gratuitos atendem a maioria dos sites deste porte; se precisar de um pago, informamos antes",
  },
  {
    name: "Manutenção mensal (alterações de texto, fotos e preços)",
    price: "a partir de R$ 90/mês (opcional)",
  },
  {
    name: "Página extra",
    price: "R$ 250 por página",
  },
  {
    name: "Logotipo simples",
    price: "R$ 300",
  },
];
