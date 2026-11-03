import { Fragment, Suspense, useId, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { Link } from "react-router";
import { Container } from "../../components/ui/Container";
import { GlassLens } from "../../components/ui/GlassLens";
import { PhoneFrame } from "../../components/ui/PhoneFrame";
import { WhatsAppLink } from "../../components/ui/WhatsAppLink";
import { models } from "../../data/models";
import { niches, type NicheSlug } from "../../data/niches";
import { getDemo } from "../../demos/registry";
import styles from "./Hero.module.css";

const heroNiches = niches.filter(
  (item): item is Extract<(typeof niches)[number], { short: string }> =>
    item.slug !== "todos" && "short" in item,
);

export function Hero() {
  const defaultNiche = heroNiches[0]?.slug ?? "beleza";
  const [selectedNiche, setSelectedNiche] = useState<NicheSlug>(defaultNiche);
  const [businessName, setBusinessName] = useState("");
  const radioRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const inputId = useId();
  const groupLabelId = useId();

  const currentNiche =
    heroNiches.find((item) => item.slug === selectedNiche) ?? heroNiches[0];
  const currentModel =
    models.find((item) => item.niche === selectedNiche) ?? models[0];
  const DemoComponent = getDemo(currentModel?.slug);

  const handleRadioKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    const count = heroNiches.length;
    if (count === 0) return;

    let nextIndex: number | null = null;

    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      nextIndex = (index + 1) % count;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      nextIndex = (index - 1 + count) % count;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = count - 1;
    }

    if (nextIndex !== null) {
      event.preventDefault();
      const target = heroNiches[nextIndex];
      if (target) {
        setSelectedNiche(target.slug);
        radioRefs.current[nextIndex]?.focus();
      }
    }
  };

  return (
    <section className={`${styles.hero} on-dark`}>
      <Container>
        <div className={styles.headline}>
          <h1 className={styles.title}>
            {["Um", "site", "que", "chama", "no", "WhatsApp."].map((word, index) => (
              <Fragment key={word}>
                <span
                  className={`${styles.word} abre`}
                  style={{ "--i": index } as CSSProperties}
                >
                  {word}
                </span>{" "}
              </Fragment>
            ))}
          </h1>
          <p className={`${styles.subtitle} abre`} style={{ "--i": 6 } as CSSProperties}>
            Modelos prontos para o ramo do seu negócio, com a sua marca,
            hospedagem e suporte inclusos. A partir de R$ 97 por mês, sem taxa de entrada.
          </p>
        </div>

        <div className={styles.grid}>
          <div className={styles.content}>
            <div className={`${styles.controls} glass abre`} style={{ "--i": 7 } as CSSProperties}>
              <div className={styles.fieldGroup}>
                <span id={groupLabelId} className={styles.fieldLabel}>
                  Qual é o seu negócio?
                </span>
                <div
                  role="radiogroup"
                  aria-labelledby={groupLabelId}
                  className={styles.chipList}
                >
                  {heroNiches.map((niche, index) => {
                    const isChecked = niche.slug === selectedNiche;
                    return (
                      <button
                        key={niche.slug}
                        ref={(el) => {
                          radioRefs.current[index] = el;
                        }}
                        type="button"
                        role="radio"
                        aria-checked={isChecked}
                        tabIndex={isChecked ? 0 : -1}
                        className={[
                          styles.chip,
                          isChecked ? styles.chipActive : "",
                        ]
                          .filter(Boolean)
                          .join(" ")}
                        onClick={() => setSelectedNiche(niche.slug)}
                        onKeyDown={(e) => handleRadioKeyDown(e, index)}
                      >
                        {niche.short}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className={styles.fieldGroup}>
                <label htmlFor={inputId} className={styles.fieldLabel}>
                  Nome do seu negócio (opcional)
                </label>
                <input
                  id={inputId}
                  type="text"
                  maxLength={40}
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  name="nome-do-negocio"
                  placeholder="Ex.: Barbearia do Zé…"
                  className={styles.input}
                  autoComplete="organization"
                />
              </div>

              <div className={styles.ctaGroup}>
                <WhatsAppLink
                  message={{
                    source: "hero",
                    nicheLabel: currentNiche?.label,
                    modelName: currentModel?.name,
                    businessName,
                  }}
                >
                  Quero um site assim
                </WhatsAppLink>

                <Link to="/modelos" className={styles.secondaryLink}>
                  Ver todos os modelos
                </Link>
              </div>
            </div>
          </div>

          <div className={`${styles.previewCol} abre`} style={{ "--i": 8 } as CSSProperties}>
            <div className={styles.stage}>
              <GlassLens size={132} className={styles.lens} />
              <span className={`${styles.chipA} glass`}>Hospedagem inclusa</span>
              <span className={`${styles.chipB} glass`}>Pronto em até 7 dias úteis</span>
            <PhoneFrame
              innerHeight={620}
              className={styles.phoneFrame}
              label={
                currentModel && (
                  <div className={styles.phoneCaption}>
                    <span>
                      Modelo <strong>{currentModel.name}</strong>, para{" "}
                      {currentModel.idealFor.toLowerCase()}
                    </span>
                    <Link
                      to={`/modelos/${currentModel.slug}`}
                      className={styles.captionLink}
                    >
                      Ver modelo completo
                    </Link>
                  </div>
                )
              }
            >
              <div key={currentModel?.slug} className={styles.crossfade}>
                {DemoComponent ? (
                  <Suspense fallback={<div className={styles.demoFallback} />}>
                    <DemoComponent
                      businessName={businessName.trim() || undefined}
                      compact
                    />
                  </Suspense>
                ) : (
                  <div className={styles.demoFallback} />
                )}
              </div>
            </PhoneFrame>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
