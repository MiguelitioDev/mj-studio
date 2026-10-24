import styles from "./DemoImage.module.css";

export type DemoImageTone = "light" | "dark" | "accent";

export interface DemoImageProps {
  label: string;
  ratio?: string;
  tone?: DemoImageTone;
  round?: boolean;
  src?: string;
  alt?: string;
  className?: string;
}

export function DemoImage({
  label,
  ratio = "4/3",
  tone = "light",
  round = false,
  src,
  alt,
  className,
}: DemoImageProps) {
  const effectiveRatio = round ? "1/1" : ratio;
  const classes = [
    styles.wrapper,
    styles[tone],
    round ? styles.round : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  if (src) {
    return (
      <div className={classes} style={{ aspectRatio: effectiveRatio }}>
        <img
          src={src}
          alt={alt ?? label}
          loading="lazy"
          decoding="async"
          className={styles.image}
        />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={label}
      className={classes}
      style={{ aspectRatio: effectiveRatio }}
    >
      <div className={styles.pattern} aria-hidden="true" />
      <span className={styles.caption} aria-hidden="true">
        {round ? label : `Sua foto aqui: ${label}`}
      </span>
    </div>
  );
}
