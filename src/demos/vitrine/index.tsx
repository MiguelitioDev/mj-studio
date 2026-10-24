import type { DemoProps } from "../types";

export default function VitrineDemo({ businessName }: DemoProps) {
  const name = businessName?.trim() || "Loja Vitrine";
  return (
    <section aria-label="Modelo Vitrine">
      <h1>{name}</h1>
      <p>Modelo Vitrine</p>
    </section>
  );
}
