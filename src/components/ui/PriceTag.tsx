import { formatBRL } from "../../lib/format";
import styles from "./PriceTag.module.css";

export interface PriceTagProps {
  value: number;
  prefix?: string;
  suffix?: string;
  size?: "md" | "lg";
  className?: string;
}

export function PriceTag({
  value,
  prefix,
  suffix,
  size = "lg",
  className,
}: PriceTagProps) {
  const classes = [styles.priceTag, styles[size], className ?? ""]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={classes}>
      {prefix && <span className={styles.prefix}>{prefix}</span>}
      <strong className={styles.amount}>{formatBRL(value)}</strong>
      {suffix && <span className={styles.suffix}>{suffix}</span>}
    </span>
  );
}
