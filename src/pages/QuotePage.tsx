import { useRef, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { Button } from "../components/ui/Button";
import { Container } from "../components/ui/Container";
import { WhatsAppLink } from "../components/ui/WhatsAppLink";
import { site } from "../config/site";
import { models } from "../data/models";
import { niches, type NicheSlug } from "../data/niches";
import { plans, type PlanSlug } from "../data/plans";
import { formatBRL } from "../lib/format";
import { buildMessage, type MessageInput } from "../lib/whatsapp";
import styles from "./QuotePage.module.css";

const selectableNiches = niches.filter(
  (n): n is Exclude<(typeof niches)[number], { slug: "todos" }> => n.slug !== "todos",
);

const UNKNOWN_MODEL_VALUE = "ainda-nao-sei";

const DOMAIN_OPTIONS: Array<{
  value: NonNullable<MessageInput["hasDomain"]>;
  label: string;
}> = [
  { value: "sim", label: "Sim" },
  { value: "nao", label: "Não" },
  { value: "nao-sei", label: "Não sei" },
];

const DEADLINE_OPTIONS = ["Sem pressa", "Até 15 dias", "Urgente"] as const;

function parseInitialNiche(param: string | null): NicheSlug | "" {
  if (!param) return "";
  const found = selectableNiches.find((n) => n.slug === param);
  return found ? found.slug : "";
}

function parseInitialPlan(param: string | null): PlanSlug {
  if (param) {
    const found = plans.find((p) => p.slug === param);
    if (found) return found.slug;
  }
  return "profissional";
}

export default function QuotePage() {
  const [searchParams] = useSearchParams();

  const initialModelParam = searchParams.get("modelo");
  const matchedInitialModel = initialModelParam
    ? models.find((m) => m.slug === initialModelParam)
    : undefined;

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedNiche, setSelectedNiche] = useState<NicheSlug | "">(() => {
    const fromNicheParam = parseInitialNiche(searchParams.get("nicho"));
    if (fromNicheParam) return fromNicheParam;
    if (matchedInitialModel) return matchedInitialModel.niche;
    return "";
  });

  const [selectedModel, setSelectedModel] = useState<string>(() => {
    if (matchedInitialModel) return matchedInitialModel.slug;
    if (initialModelParam === UNKNOWN_MODEL_VALUE) return UNKNOWN_MODEL_VALUE;
    return UNKNOWN_MODEL_VALUE;
  });

  const [selectedPlan, setSelectedPlan] = useState<PlanSlug>(() =>
    parseInitialPlan(searchParams.get("pacote")),
  );

  const [businessName, setBusinessName] = useState<string>("");
  const [hasDomain, setHasDomain] = useState<MessageInput["hasDomain"]>(undefined);
  const [deadline, setDeadline] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [error, setError] = useState<string>("");

  const stepHeadingRef = useRef<HTMLHeadingElement>(null);

  const focusStepHeading = () => {
    window.requestAnimationFrame(() => {
      stepHeadingRef.current?.focus();
    });
  };

  const nicheModels = selectedNiche
    ? models.filter((m) => m.niche === selectedNiche)
    : models;

  const handleNicheChange = (slug: NicheSlug) => {
    setSelectedNiche(slug);
    setError("");
    const belongsToNiche = models.some(
      (m) => m.slug === selectedModel && m.niche === slug,
    );
    if (!belongsToNiche && selectedModel !== UNKNOWN_MODEL_VALUE) {
      const firstOfNiche = models.find((m) => m.niche === slug);
      setSelectedModel(firstOfNiche ? firstOfNiche.slug : UNKNOWN_MODEL_VALUE);
    }
  };

  const handleNext = () => {
    if (step === 1) {
      if (!selectedNiche) {
        setError("Escolha o ramo do seu negócio para continuar.");
        return;
      }
      setError("");
      setStep(2);
      focusStepHeading();
      return;
    }

    if (step === 2) {
      setError("");
      setStep(3);
      focusStepHeading();
      return;
    }

    if (step === 3) {
      if (!selectedPlan) {
        setError("Escolha um pacote para continuar.");
        return;
      }
      setError("");
      setStep(4);
      focusStepHeading();
    }
  };

  const handleBack = () => {
    setError("");
    if (step === 2) {
      setStep(1);
      focusStepHeading();
    } else if (step === 3) {
      setStep(2);
      focusStepHeading();
    } else if (step === 4) {
      setStep(3);
      focusStepHeading();
    }
  };

  const currentNicheObj = selectableNiches.find((n) => n.slug === selectedNiche);
  const currentModelObj =
    selectedModel && selectedModel !== UNKNOWN_MODEL_VALUE
      ? models.find((m) => m.slug === selectedModel)
      : undefined;
  const currentPlanObj = plans.find((p) => p.slug === selectedPlan);

  const messageInput: MessageInput = {
    source: "quote",
    nicheLabel: currentNicheObj?.label,
    modelName:
      selectedModel === UNKNOWN_MODEL_VALUE
        ? "Ainda não sei"
        : currentModelObj?.name,
    planName: currentPlanObj?.name,
    planPrice: currentPlanObj?.price,
    businessName: businessName || undefined,
    hasDomain,
    deadline: deadline || undefined,
    notes: notes || undefined,
  };

  const previewText = buildMessage(messageInput);

  return (
    <section className={styles.section}>
      <Container>
        <title>{`Pedir orçamento | ${site.name}`}</title>
        <meta
          name="description"
          content="Monte seu pedido em 4 passos rápidos e envie direto para o nosso WhatsApp."
        />

        <div className={styles.wrapper}>
          <header className={styles.header}>
            <h1 className={styles.title}>Montar orçamento</h1>
            <p className={styles.subtitle}>
              Responda 4 passos rápidos para montar a mensagem do seu pedido e abrir a
              conversa no WhatsApp.
            </p>
          </header>

          <div className={styles.progressBlock}>
            <div className={styles.progressMeta}>
              <span className={styles.stepIndicator}>Etapa {step} de 4</span>
              <span className={styles.stepName}>
                {step === 1 && "Seu ramo"}
                {step === 2 && "Modelo"}
                {step === 3 && "Pacote"}
                {step === 4 && "Detalhes e envio"}
              </span>
            </div>
            <progress
              className={styles.progressBar}
              value={step}
              max={4}
              aria-label={`Etapa ${step} de 4`}
            />
          </div>

          <div className={styles.card}>
            {step === 1 && (
              <div>
                <h2
                  ref={stepHeadingRef}
                  tabIndex={-1}
                  className={styles.stepTitle}
                >
                  1. Qual é o ramo do seu negócio?
                </h2>

                <fieldset
                  className={styles.fieldset}
                  aria-describedby={error ? "step-1-error" : undefined}
                >
                  <legend className={styles.legend}>
                    Escolha a opção mais próxima da sua atividade
                  </legend>

                  <div className={styles.radioGrid}>
                    {selectableNiches.map((niche) => {
                      const checked = selectedNiche === niche.slug;
                      return (
                        <label
                          key={niche.slug}
                          className={`${styles.radioCard} ${
                            checked ? styles.radioCardSelected : ""
                          }`}
                        >
                          <input
                            type="radio"
                            name="nicho"
                            value={niche.slug}
                            checked={checked}
                            onChange={() => handleNicheChange(niche.slug)}
                            className={styles.radioInput}
                          />
                          <span className={styles.radioLabelPrimary}>
                            {niche.label}
                          </span>
                        </label>
                      );
                    })}
                  </div>

                  {error && (
                    <p id="step-1-error" role="alert" className={styles.errorText}>
                      {error}
                    </p>
                  )}
                </fieldset>

                <div className={styles.actions}>
                  <Button onClick={handleNext}>Continuar</Button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2
                  ref={stepHeadingRef}
                  tabIndex={-1}
                  className={styles.stepTitle}
                >
                  2. Qual modelo você prefere como ponto de partida?
                </h2>

                <fieldset className={styles.fieldset}>
                  <legend className={styles.legend}>
                    Escolha um modelo para o seu ramo ou marque que ainda não sabe
                  </legend>

                  <div className={styles.radioStack}>
                    {nicheModels.map((model) => {
                      const checked = selectedModel === model.slug;
                      return (
                        <label
                          key={model.slug}
                          className={`${styles.radioCard} ${
                            checked ? styles.radioCardSelected : ""
                          }`}
                        >
                          <input
                            type="radio"
                            name="modelo"
                            value={model.slug}
                            checked={checked}
                            onChange={() => setSelectedModel(model.slug)}
                            className={styles.radioInput}
                          />
                          <div className={styles.radioContent}>
                            <span className={styles.radioLabelPrimary}>
                              Modelo {model.name}
                            </span>
                            <span className={styles.radioDescription}>
                              {model.summary}
                            </span>
                            <span className={styles.radioMeta}>
                              Ideal para: {model.idealFor}
                            </span>
                          </div>
                        </label>
                      );
                    })}

                    <label
                      className={`${styles.radioCard} ${
                        selectedModel === UNKNOWN_MODEL_VALUE
                          ? styles.radioCardSelected
                          : ""
                      }`}
                    >
                      <input
                        type="radio"
                        name="modelo"
                        value={UNKNOWN_MODEL_VALUE}
                        checked={selectedModel === UNKNOWN_MODEL_VALUE}
                        onChange={() => setSelectedModel(UNKNOWN_MODEL_VALUE)}
                        className={styles.radioInput}
                      />
                      <div className={styles.radioContent}>
                        <span className={styles.radioLabelPrimary}>
                          Ainda não sei
                        </span>
                        <span className={styles.radioDescription}>
                          Quero uma recomendação da {site.name} na conversa pelo
                          WhatsApp.
                        </span>
                      </div>
                    </label>
                  </div>
                </fieldset>

                <div className={styles.actions}>
                  <Button variant="secondary" onClick={handleBack}>
                    Voltar
                  </Button>
                  <Button onClick={handleNext}>Continuar</Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h2
                  ref={stepHeadingRef}
                  tabIndex={-1}
                  className={styles.stepTitle}
                >
                  3. Qual pacote faz mais sentido para você?
                </h2>

                <fieldset
                  className={styles.fieldset}
                  aria-describedby={error ? "step-3-error" : undefined}
                >
                  <legend className={styles.legend}>
                    O valor final é sempre confirmado por escrito antes de começar
                  </legend>

                  <div className={styles.radioStack}>
                    {plans.map((plan) => {
                      const checked = selectedPlan === plan.slug;
                      return (
                        <label
                          key={plan.slug}
                          className={`${styles.radioCard} ${
                            checked ? styles.radioCardSelected : ""
                          }`}
                        >
                          <input
                            type="radio"
                            name="pacote"
                            value={plan.slug}
                            checked={checked}
                            onChange={() => {
                              setSelectedPlan(plan.slug);
                              setError("");
                            }}
                            className={styles.radioInput}
                          />
                          <div className={styles.radioContent}>
                            <div className={styles.planHeader}>
                              <span className={styles.radioLabelPrimary}>
                                {plan.name} — {formatBRL(plan.price)}
                              </span>
                              {plan.badge && (
                                <span className={styles.badge}>{plan.badge}</span>
                              )}
                            </div>
                            <span className={styles.radioDescription}>
                              {plan.forWho}
                            </span>
                            <span className={styles.radioMeta}>
                              Prazo estimado: {plan.deadline}
                            </span>
                          </div>
                        </label>
                      );
                    })}
                  </div>

                  {error && (
                    <p id="step-3-error" role="alert" className={styles.errorText}>
                      {error}
                    </p>
                  )}
                </fieldset>

                <div className={styles.actions}>
                  <Button variant="secondary" onClick={handleBack}>
                    Voltar
                  </Button>
                  <Button onClick={handleNext}>Continuar</Button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div>
                <h2
                  ref={stepHeadingRef}
                  tabIndex={-1}
                  className={styles.stepTitle}
                >
                  4. Detalhes opcionais e envio
                </h2>

                <div className={styles.detailsForm}>
                  <div className={styles.fieldGroup}>
                    <label htmlFor="quote-business-name" className={styles.fieldLabel}>
                      Nome do seu negócio (opcional)
                    </label>
                    <input
                      id="quote-business-name"
                      type="text"
                      maxLength={40}
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      placeholder="Ex.: Barbearia do Zé"
                      className={styles.textInput}
                    />
                  </div>

                  <fieldset className={styles.fieldset}>
                    <legend className={styles.fieldLabel}>
                      Você já tem domínio registrado (.com.br)? (opcional)
                    </legend>
                    <div className={styles.inlineRadios}>
                      {DOMAIN_OPTIONS.map((option) => {
                        const checked = hasDomain === option.value;
                        return (
                          <label
                            key={option.value}
                            className={`${styles.chipRadio} ${
                              checked ? styles.chipRadioSelected : ""
                            }`}
                          >
                            <input
                              type="radio"
                              name="hasDomain"
                              value={option.value}
                              checked={checked}
                              onChange={() => setHasDomain(option.value)}
                              className={styles.radioInput}
                            />
                            <span>{option.label}</span>
                          </label>
                        );
                      })}
                    </div>
                  </fieldset>

                  <fieldset className={styles.fieldset}>
                    <legend className={styles.fieldLabel}>
                      Qual é o seu prazo? (opcional)
                    </legend>
                    <div className={styles.inlineRadios}>
                      {DEADLINE_OPTIONS.map((option) => {
                        const checked = deadline === option;
                        return (
                          <label
                            key={option}
                            className={`${styles.chipRadio} ${
                              checked ? styles.chipRadioSelected : ""
                            }`}
                          >
                            <input
                              type="radio"
                              name="deadline"
                              value={option}
                              checked={checked}
                              onChange={() => setDeadline(option)}
                              className={styles.radioInput}
                            />
                            <span>{option}</span>
                          </label>
                        );
                      })}
                    </div>
                  </fieldset>

                  <div className={styles.fieldGroup}>
                    <div className={styles.labelRow}>
                      <label htmlFor="quote-notes" className={styles.fieldLabel}>
                        Observações (opcional)
                      </label>
                      <span
                        id="quote-notes-counter"
                        aria-live="polite"
                        className={styles.charCounter}
                      >
                        {notes.length}/300 caracteres
                      </span>
                    </div>
                    <textarea
                      id="quote-notes"
                      rows={3}
                      maxLength={300}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      aria-describedby="quote-notes-counter"
                      placeholder="Conte se já tem logotipo, fotos ou alguma dúvida específica."
                      className={styles.textarea}
                    />
                  </div>
                </div>

                <div className={styles.previewSection}>
                  <h3 className={styles.previewHeading}>
                    Prévia da mensagem que vai abrir no seu WhatsApp
                  </h3>
                  <div className={styles.messageBubble}>
                    <pre className={styles.messageText}>{previewText}</pre>
                  </div>
                </div>

                <div className={styles.actionsFinal}>
                  <Button variant="secondary" onClick={handleBack}>
                    Voltar
                  </Button>
                  <WhatsAppLink
                    message={previewText}
                    label="Abrir no WhatsApp"
                    className={styles.whatsappButton}
                  >
                    Abrir no WhatsApp
                  </WhatsAppLink>
                </div>

                <p className={styles.privacyNotice}>
                  Nada do que você preencheu é salvo neste site. A mensagem só é
                  enviada se você tocar em enviar no WhatsApp. Veja a{" "}
                  <Link to="/privacidade">Política de Privacidade</Link>.
                </p>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
