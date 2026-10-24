import type { NicheSlug } from "./niches";

export interface Project {
  name: string;
  niche: NicheSlug;
  url?: string;
  summary: string;
  year: number;
  image?: string;
  imageAlt?: string;
}

export const projects: Project[] = [];
