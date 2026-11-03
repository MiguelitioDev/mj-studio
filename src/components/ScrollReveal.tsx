import { useEffect } from "react";

const SELECTOR =
  "main.demo-container section:not(:first-of-type) :is(h2, figure, article, details, address, dl, section > img, ul > li:first-child)";

/**
 * Entrada das partes de cada seção ao rolar a página de um modelo.
 * Só esconde o que está abaixo da dobra, só com movimento permitido, e o conteúdo
 * nunca depende do script: sem ele (ou sem JS), tudo aparece parado e legível.
 */
export function ScrollReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (typeof IntersectionObserver === "undefined") return;

    const targets = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR));
    const fold = window.innerHeight;
    const hidden: HTMLElement[] = [];

    targets.forEach((el, index) => {
      if (el.getBoundingClientRect().top < fold) return;
      el.style.setProperty("--mj-delay", `${(index % 4) * 70}ms`);
      el.classList.add("mj-reveal");
      hidden.push(el);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("mj-in");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    hidden.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      hidden.forEach((el) => {
        el.classList.remove("mj-reveal", "mj-in");
        el.style.removeProperty("--mj-delay");
      });
    };
  }, []);

  return null;
}
