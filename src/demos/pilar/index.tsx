import type { DemoProps } from "../types";

export default function PilarDemo({ businessName }: DemoProps) {
  const name = businessName?.trim() || "Pilar Advocacia";
  return (
    <section aria-label="Modelo Pilar">
      <h1>{name}</h1>
      <p>Modelo Pilar</p>
    </section>
  );
}
