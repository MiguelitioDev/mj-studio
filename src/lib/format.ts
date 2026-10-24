const integerBRLFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const centsBRLFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatBRL(value: number): string {
  const isInteger = Number.isInteger(value);
  const formatted = isInteger
    ? integerBRLFormatter.format(value)
    : centsBRLFormatter.format(value);
  return formatted.replace(/\u00A0/g, " ");
}

export function formatPhone(digits: string): string {
  const clean = digits.replace(/\D/g, "");
  const local = clean.startsWith("55") && clean.length >= 12 ? clean.slice(2) : clean;
  if (local.length === 11) {
    return `(${local.slice(0, 2)}) ${local.slice(2, 7)}-${local.slice(7)}`;
  }
  if (local.length === 10) {
    return `(${local.slice(0, 2)}) ${local.slice(2, 6)}-${local.slice(6)}`;
  }
  return digits;
}
