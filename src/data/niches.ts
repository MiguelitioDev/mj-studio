export const niches = [
  { slug: "todos", label: "Todos" },
  { slug: "beleza", label: "Barbearia e salão", short: "Barbearia" },
  { slug: "saude", label: "Saúde e bem-estar", short: "Clínica" },
  { slug: "alimentacao", label: "Restaurante e delivery", short: "Restaurante" },
  { slug: "comercio", label: "Loja e catálogo", short: "Loja" },
  { slug: "servicos", label: "Serviços e reformas", short: "Serviços" },
  { slug: "escritorios", label: "Advocacia e contabilidade", short: "Escritório" },
  { slug: "autonomos", label: "Profissionais autônomos", short: "Autônomo" },
] as const;

export type NicheFilterSlug = (typeof niches)[number]["slug"];
export type NicheSlug = Exclude<NicheFilterSlug, "todos">;
export type NicheItem = (typeof niches)[number];
