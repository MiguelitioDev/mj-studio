import { lazy, type ComponentType, type LazyExoticComponent } from "react";
import type { DemoProps } from "./types";

export type DemoComponent = LazyExoticComponent<ComponentType<DemoProps>>;

export const demoRegistry: Record<string, DemoComponent> = {
  navalha: lazy(() => import("./navalha")),
  clareza: lazy(() => import("./clareza")),
  brasa: lazy(() => import("./brasa")),
  vitrine: lazy(() => import("./vitrine")),
  alicerce: lazy(() => import("./alicerce")),
  pilar: lazy(() => import("./pilar")),
  cartao: lazy(() => import("./cartao")),
};

export function getDemo(slug: string | undefined): DemoComponent | undefined {
  if (!slug) return undefined;
  return demoRegistry[slug];
}
