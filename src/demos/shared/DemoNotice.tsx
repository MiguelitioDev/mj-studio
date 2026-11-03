import { useId, useState } from "react";
import { Link } from "react-router";
import { WhatsAppLink } from "../../components/ui/WhatsAppLink";
import styles from "./DemoNotice.module.css";

export interface DemoNoticeProps {
  modelName: string;
  nicheLabel?: string;
  businessName: string;
  onBusinessNameChange: (value: string) => void;
}

export function DemoNotice({
  modelName,
  nicheLabel,
  businessName,
  onBusinessNameChange,
}: DemoNoticeProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const inputId = useId();
  const mobileInputId = useId();
  const mobilePanelId = useId();

  return (
    <aside
      aria-label="Aviso de modelo de demonstração"
      className={styles.notice}
    >
      <div className={styles.inner}>
        <div className={styles.left}>
          <Link to="/modelos" className={styles.backLink}>
            Voltar aos modelos
          </Link>
          <span className={styles.badge}>
            Modelo de demonstração ({modelName}) — negócio fictício
          </span>
        </div>

        <div className={styles.desktopField}>
          <label htmlFor={inputId} className={styles.fieldLabel}>
            Testar com o nome do seu negócio
          </label>
          <input
            id={inputId}
            name="nome-do-negocio"
            autoComplete="organization"
            type="text"
            maxLength={40}
            value={businessName}
            onChange={(e) => onBusinessNameChange(e.target.value)}
            placeholder="Ex.: Meu Negócio…"
            className={styles.input}
          />
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.mobileToggle}
            aria-expanded={mobileOpen}
            aria-controls={mobilePanelId}
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            Testar com meu nome
          </button>

          <WhatsAppLink
            message={{
              source: "model",
              modelName,
              nicheLabel,
              businessName,
            }}
            label="Quero este modelo"
            className={styles.ctaButton}
          />
        </div>
      </div>

      {mobileOpen && (
        <div id={mobilePanelId} className={styles.mobileDrawer}>
          <p className={styles.mobileBadge}>
            Modelo de demonstração ({modelName}) — negócio fictício
          </p>
          <label htmlFor={mobileInputId} className={styles.fieldLabel}>
            Testar com o nome do seu negócio
          </label>
          <input
            id={mobileInputId}
            name="nome-do-negocio"
            autoComplete="organization"
            type="text"
            maxLength={40}
            value={businessName}
            onChange={(e) => onBusinessNameChange(e.target.value)}
            placeholder="Digite o nome do seu negócio…"
            className={styles.input}
          />
        </div>
      )}
    </aside>
  );
}
