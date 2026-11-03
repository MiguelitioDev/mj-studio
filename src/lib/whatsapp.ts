import { site } from "../config/site";
import { formatBRL } from "./format";

export type MessageSource =
  | "hero"
  | "model"
  | "plan"
  | "quote"
  | "demo"
  | "generic"
  | "cart";

export interface MessageInput {
  source: MessageSource;
  nicheLabel?: string;     // "Barbearia e salão"
  modelName?: string;      // "Navalha"
  planName?: string;       // "Profissional"
  planPrice?: number;      // 147 (mensal) ou 1190 (projeto)
  planBilling?: "mensal" | "projeto";
  businessName?: string;   // digitado pelo visitante
  hasDomain?: "sim" | "nao" | "nao-sei";
  deadline?: string;       // "Sem pressa" | "Até 15 dias" | "Urgente"
  notes?: string;
  cartLines?: string[];    // usado só pelos modelos de cardápio/catálogo
}

const DOMAIN_LABELS: Record<NonNullable<MessageInput["hasDomain"]>, string> = {
  sim: "Sim",
  nao: "Não",
  "nao-sei": "Não sei",
};

const BILLING_SUFFIX = {
  mensal: "/mês",
  projeto: ", pagamento único",
} as const;

function sanitizeText(value: string | undefined, maxLength: number): string {
  if (!value) return "";
  return value.trim().slice(0, maxLength);
}

function getOpeningLine(input: MessageInput): string {
  const studioName = site.name;
  switch (input.source) {
    case "hero":
    case "model":
      return `Olá, ${studioName}! Vim pelo site e quero ajuda para criar o site do meu negócio.`;
    case "plan": {
      const planText = input.planName?.trim();
      return planText
        ? `Olá, ${studioName}! Vim pelo site e tenho interesse no pacote ${planText}.`
        : `Olá, ${studioName}! Vim pelo site e tenho interesse em um pacote.`;
    }
    case "quote":
      return `Olá, ${studioName}! Vim pelo site e montei meu pedido no site.`;
    case "demo": {
      const modelText = input.modelName?.trim();
      const actionNote = sanitizeText(input.notes, 300);
      if (modelText && actionNote) {
        return `Olá, ${studioName}! Vim pelo site, estou testando o modelo ${modelText} e ${actionNote}.`;
      }
      if (modelText) {
        return `Olá, ${studioName}! Vim pelo site e estou testando o modelo ${modelText}.`;
      }
      return `Olá, ${studioName}! Vim pelo site e estou testando um modelo de demonstração.`;
    }
    case "generic":
      return `Olá, ${studioName}! Vim pelo site e preciso de ajuda com um site para o meu negócio.`;
    case "cart":
      return "Olá! Quero fazer um pedido:";
  }
}

export function buildMessage(input: MessageInput): string {
  if (input.source === "cart") {
    const lines = (input.cartLines ?? [])
      .map((line) => line.trim())
      .filter((line) => line.length > 0);
    const body = lines.length > 0 ? `\n\n${lines.join("\n")}` : "";
    return `Olá! Quero fazer um pedido:${body}\n\n(Mensagem de teste enviada pelo modelo de demonstração da ${site.name})`;
  }

  const opening = getOpeningLine(input);
  const details: string[] = [];

  const niche = input.nicheLabel?.trim();
  if (niche) {
    details.push(`Tipo de negócio: ${niche}`);
  }

  const model = input.modelName?.trim();
  if (model && input.source !== "demo") {
    details.push(`Modelo que gostei: ${model}`);
  }

  const plan = input.planName?.trim();
  if (plan) {
    const priceSuffix =
      typeof input.planPrice === "number"
        ? ` (${formatBRL(input.planPrice)}${input.planBilling ? BILLING_SUFFIX[input.planBilling] : ""})`
        : "";
    details.push(`Pacote: ${plan}${priceSuffix}`);
  }

  const business = sanitizeText(input.businessName, 40);
  if (business) {
    details.push(`Nome do negócio: ${business}`);
  }

  if (input.hasDomain) {
    details.push(`Já tem domínio: ${DOMAIN_LABELS[input.hasDomain]}`);
  }

  const deadline = input.deadline?.trim();
  if (deadline) {
    details.push(`Prazo desejado: ${deadline}`);
  }

  const notes = sanitizeText(input.notes, 300);
  if (notes && input.source !== "demo") {
    details.push(`Observações: ${notes}`);
  }

  const closing = "Pode me explicar os próximos passos?";

  if (details.length === 0) {
    return `${opening}\n\n${closing}`;
  }

  return `${opening}\n\n${details.join("\n")}\n\n${closing}`;
}

export function buildWhatsAppUrl(
  message: string,
  number: string = site.whatsapp.number,
): string {
  const cleanNumber = number.replace(/\D/g, "");
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}
