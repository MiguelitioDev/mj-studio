import { niches } from "../../data/niches";
import styles from "./Marquee.module.css";

const labels = niches.filter((item) => item.slug !== "todos").map((item) => item.label);

/** Faixa de vidro com os ramos atendidos, deslizando devagar. */
export function Marquee() {
  return (
    <section className={styles.strip} aria-label="Ramos de negócio atendidos">
      <div className={`${styles.band} glass`}>
        <ul className={styles.track}>
          {[...labels, ...labels].map((label, index) => (
            <li
              key={`${label}-${index}`}
              className={styles.item}
              aria-hidden={index >= labels.length ? "true" : undefined}
            >
              {label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
