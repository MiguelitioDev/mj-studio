import { site } from "../config/site";
import { Commitments } from "../sections/home/Commitments";
import { Faq } from "../sections/home/Faq";
import { FinalCta } from "../sections/home/FinalCta";
import { Hero } from "../sections/home/Hero";
import { Marquee } from "../sections/home/Marquee";
import { ModelsShowcase } from "../sections/home/ModelsShowcase";
import { Plans } from "../sections/home/Plans";
import { Process } from "../sections/home/Process";

export default function HomePage() {
  return (
    <>
      <title>{`${site.name} — Sites para pequenos negócios em ${site.city}`}</title>
      <meta
        name="description"
        content="Modelos prontos de sites para pequenos negócios em Fortaleza e região, ajustados com a sua marca e integrados ao WhatsApp. Hospedagem inclusa, a partir de R$ 97 por mês e sem taxa de entrada."
      />
      <Hero />
      <Marquee />
      <ModelsShowcase />
      <Plans />
      <Process />
      <Commitments />
      <Faq />
      <FinalCta />
    </>
  );
}
