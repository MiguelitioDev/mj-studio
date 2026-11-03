import { useId, type CSSProperties } from "react";
import styles from "./GlassLens.module.css";

export interface GlassLensProps {
  size?: number;
  className?: string;
}

/**
 * Lente de vidro líquido com a marca da MJ Studios.
 * A distorção (feDisplacementMap via backdrop-filter) só aparece em Chromium;
 * nos outros navegadores a lente vira um vidro fosco simples.
 */
export function GlassLens({ size = 150, className }: GlassLensProps) {
  const filterId = `lente-${useId().replace(/:/g, "")}`;
  const lensStyle: CSSProperties = {
    width: size,
    height: size,
    backdropFilter: `url(#${filterId}) blur(1px) saturate(1.5)`,
    WebkitBackdropFilter: "blur(10px) saturate(1.5)",
  };

  return (
    <div className={[styles.wrap, className ?? ""].filter(Boolean).join(" ")} aria-hidden="true">
      <svg width="0" height="0" className={styles.defs}>
        <filter id={filterId} x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.012 0.02" numOctaves="2" seed="4" result="ruido" />
          <feGaussianBlur in="ruido" stdDeviation="3" result="suave" />
          <feDisplacementMap in="SourceGraphic" in2="suave" scale="34" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>
      <div className={styles.lens} style={lensStyle}>
        <img src="/brand/marca-branca.png" alt="" width={44} height={62} className={styles.mark} />
      </div>
    </div>
  );
}
