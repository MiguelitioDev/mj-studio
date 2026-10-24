import { Link } from "react-router";
import { Container } from "../components/ui/Container";
import { site } from "../config/site";
import { buildMessage, buildWhatsAppUrl } from "../lib/whatsapp";
import styles from "./LegalPage.module.css";

function formatLegalDate(isoDate: string): string {
  const parts = isoDate.split("-");
  if (parts.length === 3) {
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }
  return isoDate;
}

export default function AccessibilityPage() {
  const whatsappUrl = buildWhatsAppUrl(buildMessage({ source: "generic" }));

  return (
    <article className={styles.article}>
      <Container>
        <title>{`Declaração de Acessibilidade | ${site.name}`}</title>
        <meta
          name="description"
          content="Compromisso e recursos de acessibilidade digital do site da MJ Studio conforme WCAG 2.2 AA e eMAG."
        />

        <div className={styles.content}>
          <header className={styles.header}>
            <h1 className={styles.title}>Declaração de Acessibilidade</h1>
            <p className={styles.updatedAt}>
              Última atualização em {formatLegalDate(site.lastLegalUpdate)}
            </p>
          </header>

          <p>
            A {site.name} acredita que a internet precisa funcionar bem para todas
            as pessoas, independentemente de condição visual, auditiva, motora,
            cognitiva ou do aparelho utilizado. Esta página descreve os recursos de
            acessibilidade implementados neste site, em atenção ao artigo 63 da Lei
            Brasileira de Inclusão da Pessoa com Deficiência (Lei nº 13.146/2015).
          </p>

          <nav
            className={styles.toc}
            aria-label="Sumário da Declaração de Acessibilidade"
          >
            <p className={styles.tocTitle}>Sumário</p>
            <ol className={styles.tocList}>
              <li>
                <a href="#padroes-conformidade">1. Meta de conformidade e padrões adotados</a>
              </li>
              <li>
                <a href="#recursos-implementados">2. O que foi feito neste site</a>
              </li>
              <li>
                <a href="#limitacoes-conhecidas">3. Limitações conhecidas e alternativas</a>
              </li>
              <li>
                <a href="#reportar-barreira">4. Como relatar problemas ou pedir ajuda</a>
              </li>
            </ol>
          </nav>

          <section id="padroes-conformidade" className={styles.section}>
            <h2>1. Meta de conformidade e padrões adotados</h2>
            <p>
              Este site foi projetado e desenvolvido tendo como referência as
              Diretrizes de Acessibilidade para Conteúdo Web (
              <strong>WCAG 2.2, nível AA</strong>), publicadas pelo W3C, e as
              recomendações do Modelo de Acessibilidade em Governo Eletrônico (
              <strong>eMAG</strong>).
            </p>
          </section>

          <section id="recursos-implementados" className={styles.section}>
            <h2>2. O que foi feito neste site</h2>
            <p>
              Adotamos as seguintes práticas em todas as páginas principais e nos
              modelos de demonstração da {site.name}:
            </p>
            <ul>
              <li>
                <strong>Navegação completa por teclado:</strong> todos os menus,
                abas, seletores de nicho, perguntas frequentes e etapas do{" "}
                <Link to="/orcamento">formulário de orçamento</Link> podem ser
                utilizados apenas com a tecla <code>Tab</code>, setas direcionais,{" "}
                <code>Enter</code>, <code>Espaço</code> e <code>Esc</code>, com anel
                de foco de alto contraste sempre visível.
              </li>
              <li>
                <strong>Link de salto rápido:</strong> logo no início de cada
                página, ao pressionar <code>Tab</code>, aparece o atalho{" "}
                <em>“Pular para o conteúdo”</em>, que leva o foco diretamente para o
                conteúdo principal sem precisar percorrer o cabeçalho inteiro.
              </li>
              <li>
                <strong>Contraste de cores reforçado:</strong> todas as combinações
                de texto e fundo respeitam ou superam a relação mínima de contraste
                do nível AA (4.5:1 para textos normais), usando tons escuros sobre
                fundos claros de leitura confortável.
              </li>
              <li>
                <strong>Fonte de alta legibilidade:</strong> utilizamos no corpo de
                texto, botões e formulários a fonte{" "}
                <em>Atkinson Hyperlegible Next</em>, desenvolvida pelo Braille
                Institute especificamente para pessoas com baixa visão, diferenciando
                claramente letras e números parecidos.
              </li>
              <li>
                <strong>Estrutura semântica e leitores de tela:</strong> usamos
                regiões bem definidas (<code>header</code>, <code>nav</code>,{" "}
                <code>main</code>, <code>footer</code>), apenas um título{" "}
                <code>h1</code> por página, títulos em ordem hierárquica, rótulos
                visíveis em todos os campos de formulário e avisos claros quando um
                link abre o WhatsApp ou uma nova aba.
              </li>
              <li>
                <strong>Respeito à preferência de movimento reduzido:</strong> se o
                seu sistema operacional ou navegador estiver configurado com a opção{" "}
                <em>reduzir movimento</em> (<code>prefers-reduced-motion</code>), as
                transições e animações visuais são desativadas automaticamente.
              </li>
              <li>
                <strong>Áreas de toque confortáveis e zoom:</strong> botões e
                controles interativos possuem altura mínima de 44 pixels para
                facilitar o toque no celular, e o layout suporta ampliação de zoom
                de até 200% sem perda de conteúdo.
              </li>
              {site.vlibras && (
                <li>
                  <strong>Tradução para Libras (VLibras):</strong> disponibilizamos
                  o widget oficial VLibras na lateral da tela para tradução dos
                  textos da página para a Língua Brasileira de Sinais.
                </li>
              )}
            </ul>
          </section>

          <section id="limitacoes-conhecidas" className={styles.section}>
            <h2>3. Limitações conhecidas e alternativas</h2>
            <p>
              Transparência também faz parte da acessibilidade. Abaixo explicamos uma
              escolha técnica importante do nosso catálogo:
            </p>
            <ul>
              <li>
                <strong>Miniaturas ilustrativas dos modelos:</strong> na página
                inicial e na listagem de <Link to="/modelos">modelos</Link>, as
                prévias em escala reduzida dentro da moldura do celular ou dos
                cartões são marcadas como inativas (<code>inert</code> e{" "}
                <code>aria-hidden=&quot;true&quot;</code>) para evitar que quem
                navega por teclado ou leitor de tela fique preso dentro de dezenas
                de botões em miniatura. Logo ao lado ou abaixo de cada miniatura, há
                sempre uma descrição em texto claro e um link direto para abrir a
                página completa e acessível daquele modelo.
              </li>
            </ul>
          </section>

          <section id="reportar-barreira" className={styles.section}>
            <h2>4. Como relatar problemas ou pedir ajuda</h2>
            <p>
              Se você encontrar qualquer barreira de acessibilidade neste site, tiver
              dificuldade para usar alguma etapa do orçamento ou preferir receber as
              informações dos nossos pacotes em outro formato, fale diretamente
              conosco:
            </p>
            <ul>
              {site.whatsapp.display && (
                <li>
                  WhatsApp:{" "}
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Conversar no WhatsApp ${site.whatsapp.display} (abre o WhatsApp)`}
                  >
                    {site.whatsapp.display}
                  </a>
                </li>
              )}
              {site.email && (
                <li>
                  E-mail: <a href={`mailto:${site.email}`}>{site.email}</a>
                </li>
              )}
            </ul>
            <p>
              Levamos todo relato a sério e buscamos corrigir qualquer falha de
              acessibilidade no menor prazo possível. Atualizado em{" "}
              <strong>{formatLegalDate(site.lastLegalUpdate)}</strong>.
            </p>
          </section>
        </div>
      </Container>
    </article>
  );
}
