import { useEffect } from "react";
import { site } from "../../config/site";

const VLIBRAS_SCRIPT_ID = "vlibras-plugin-script";
const VLIBRAS_SCRIPT_SRC = "https://vlibras.gov.br/app/vlibras-plugin.js";
const VLIBRAS_APP_URL = "https://vlibras.gov.br/app";

let isVLibrasInitialized = false;

export function VLibras() {
  useEffect(() => {
    if (!site.vlibras) {
      return;
    }

    const initWidget = () => {
      if (isVLibrasInitialized) {
        return;
      }
      if (window.VLibras?.Widget) {
        isVLibrasInitialized = true;
        new window.VLibras.Widget(VLIBRAS_APP_URL);
      }
    };

    const existingScript = document.getElementById(
      VLIBRAS_SCRIPT_ID,
    ) as HTMLScriptElement | null;

    if (existingScript) {
      initWidget();
      return;
    }

    const script = document.createElement("script");
    script.id = VLIBRAS_SCRIPT_ID;
    script.src = VLIBRAS_SCRIPT_SRC;
    script.async = true;
    script.onload = initWidget;
    document.body.appendChild(script);
  }, []);

  if (!site.vlibras) {
    return null;
  }

  return (
    <div vw="true" className="enabled">
      <div vw-access-button="true" className="active" />
      <div vw-plugin-wrapper="true">
        <div className="vw-plugin-top-wrapper" />
      </div>
    </div>
  );
}
