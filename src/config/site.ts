export const site = {
  name: "MJ Studios",
  tagline: "Sites para pequenos negócios",
  url: "https://mj-studio-sandy.vercel.app",            // TODO: trocar pelo domínio real
  city: "Fortaleza",
  state: "CE",
  whatsapp: {
    number: "558591722145",                    // só dígitos, com 55 + DDD
    display: "(85) 9172-2145",
  },
  email: "",                                   // TODO: e-mail de contato
  instagram: "",                               // TODO: @ do Instagram (sem @), opcional
  legal: {
    companyName: "",                           // TODO: razão social (do CNPJ)
    cnpj: "",                                  // TODO: CNPJ (obrigatório para vender online)
    address: "",                               // TODO: endereço ou "Atendimento online — Fortaleza/CE"
    privacyContactEmail: "",                   // TODO: e-mail do encarregado de dados (pode ser o mesmo)
  },
  businessHours: "Segunda a sexta, 9h às 18h",
  payment: "50% para começar e 50% na entrega, via Pix ou cartão",   // revisar
  lastLegalUpdate: "2026-10-24",
  vlibras: true,                               // widget oficial de Libras do governo federal
} as const;

let didWarn = false;

export function warnMissingSiteInfo(): void {
  if (!import.meta.env.DEV || didWarn) {
    return;
  }
  didWarn = true;

  const missing: string[] = [];
  if (!site.legal.cnpj) {
    missing.push("site.legal.cnpj (CNPJ obrigatório para comércio eletrônico)");
  }
  if (!site.email) {
    missing.push("site.email (e-mail de contato)");
  }

  if (missing.length > 0) {
    console.warn(
      `[MJ Studios] Dados pendentes em src/config/site.ts antes de publicar: ${missing.join(", ")}.`,
    );
  }
}
