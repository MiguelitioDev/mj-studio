import { useEffect } from "react";

/**
 * Faz cada elemento [data-reveal] entrar quando aparece na tela.
 * O estado escondido só existe com a classe html.rv-ativo (posta em main.tsx quando o
 * movimento está liberado); sem script ou com "reduzir movimento", tudo aparece normal.
 */
export function RevealObserver() {
  useEffect(() => {
    const html = document.documentElement;
    if (!html.classList.contains("rv-ativo") || typeof IntersectionObserver === "undefined") {
      html.classList.remove("rv-ativo");
      return;
    }

    const seen = new WeakSet<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.08 },
    );

    const scan = () => {
      document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
        if (seen.has(el)) return;
        seen.add(el);
        const order = el.getAttribute("data-rv-i");
        if (order) el.style.setProperty("--rv-delay", `${Number(order) * 80}ms`);
        observer.observe(el);
      });
    };

    scan();
    const mutations = new MutationObserver(scan);
    mutations.observe(document.getElementById("conteudo") ?? document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      mutations.disconnect();
      observer.disconnect();
    };
  }, []);

  return null;
}
