import type { DemoProps } from "../types";

export default function AlicerceDemo({ businessName }: DemoProps) {
  const name = businessName?.trim() || "Alicerce Reformas";
  return (
    <section aria-label="Modelo Alicerce">
      <h1>{name}</h1>
      <p>Modelo Alicerce</p>
    </section>
  );
}
