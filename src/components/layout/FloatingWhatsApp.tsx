import { useLocation } from "react-router";
import { buildMessage, buildWhatsAppUrl } from "../../lib/whatsapp";
import { WhatsAppIcon } from "../ui/WhatsAppIcon";
import styles from "./FloatingWhatsApp.module.css";

export function FloatingWhatsApp() {
  const { pathname } = useLocation();

  if (pathname === "/orcamento" || pathname.startsWith("/modelos/")) {
    return null;
  }

  const url = buildWhatsAppUrl(buildMessage({ source: "generic" }));

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.floating}
      aria-label="Conversar no WhatsApp (abre o WhatsApp)"
    >
      <WhatsAppIcon width={26} height={26} />
    </a>
  );
}
