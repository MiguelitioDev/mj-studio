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

export default function TermsPage() {
  const whatsappUrl = buildWhatsAppUrl(buildMessage({ source: "generic" }));
  const cityState = [site.city, site.state].filter(Boolean).join("/");

  return (
    <article className={styles.article}>
      <Container>
        <title>{`Termos de Uso | ${site.name}`}</title>
        <meta
          name="description"
          content="Termos de uso do site e condições gerais de contratação dos serviços da MJ Studio."
        />

        <div className={styles.content}>
          <header className={styles.header}>
            <h1 className={styles.title}>Termos de Uso e Condições de Contratação</h1>
            <p className={styles.updatedAt}>
              Última atualização em {formatLegalDate(site.lastLegalUpdate)}
            </p>
          </header>

          <p>
            Estes Termos de Uso explicam as regras de navegação neste site e as
            condições gerais aplicáveis à criação de sites pela {site.name}, em
            conformidade com o Código de Defesa do Consumidor (Lei nº 8.078/1990), o
            Decreto do Comércio Eletrônico (Decreto nº 7.962/2013), o Código Civil e
            a Lei de Direitos Autorais (Lei nº 9.610/1998).
          </p>

          <nav className={styles.toc} aria-label="Sumário dos Termos de Uso">
            <p className={styles.tocTitle}>Sumário</p>
            <ol className={styles.tocList}>
              <li>
                <a href="#sobre-o-site">1. Sobre o site e quem o mantém</a>
              </li>
              <li>
                <a href="#natureza-informativa">2. Natureza informativa de preços e prazos</a>
              </li>
              <li>
                <a href="#modelos-demonstracao">3. Modelos de demonstração e direitos autorais</a>
              </li>
              <li>
                <a href="#contratacao-ajustes">4. Proposta, pagamento e rodadas de ajuste</a>
              </li>
              <li>
                <a href="#propriedade-responsabilidades">5. Propriedade do site, domínio e materiais enviados</a>
              </li>
              <li>
                <a href="#direito-arrependimento">6. Direito de arrependimento e cancelamento</a>
              </li>
              <li>
                <a href="#legislacao-foro">7. Legislação aplicável e foro</a>
              </li>
              <li>
                <a href="#data-atualizacao">8. Data da última atualização</a>
              </li>
            </ol>
          </nav>

          <section id="sobre-o-site" className={styles.section}>
            <h2>1. Sobre o site e quem o mantém</h2>
            <p>
              Este site é mantido por{" "}
              <strong>{site.legal.companyName || site.name}</strong>
              {site.legal.cnpj ? `, inscrita no CNPJ sob o nº ${site.legal.cnpj}` : ""}
              {site.legal.address
                ? `, com endereço em ${site.legal.address}`
                : cityState
                  ? `, com atuação em ${cityState}`
                  : ""}
              .
            </p>
            <p>
              Nosso objetivo com este espaço é apresentar nosso catálogo de{" "}
              <Link to="/modelos">modelos de sites</Link> para pequenos negócios,
              detalhar nossos pacotes de criação e facilitar o pedido de orçamento
              pelo{" "}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`WhatsApp ${site.whatsapp.display} (abre o WhatsApp)`}
              >
                WhatsApp ({site.whatsapp.display})
              </a>
              {site.email ? (
                <>
                  {" "}
                  ou pelo e-mail <a href={`mailto:${site.email}`}>{site.email}</a>
                </>
              ) : (
                ""
              )}
              .
            </p>
          </section>

          <section id="natureza-informativa" className={styles.section}>
            <h2>2. Natureza informativa de preços e prazos</h2>
            <p>
              Os valores dos pacotes (Essencial, Profissional e Completo), os prazos
              estimados em dias úteis e os valores dos serviços extras exibidos neste
              site servem como referência clara e transparente para você conhecer a
              nossa tabela de trabalho.
            </p>
            <p>
              Cada negócio tem suas próprias necessidades. Por isso, o escopo exato,
              a lista de páginas e seções, o prazo de entrega e o valor final são
              sempre confirmados em uma <strong>proposta por escrito</strong> enviada
              antes de qualquer cobrança ou início de serviço. O prazo de construção
              passa a contar após a aprovação da proposta, o pagamento da entrada e o
              envio das informações básicas do negócio (textos, preços e fotos).
            </p>
          </section>

          <section id="modelos-demonstracao" className={styles.section}>
            <h2>3. Modelos de demonstração e direitos autorais</h2>
            <p>
              Os modelos exibidos no catálogo (Navalha, Clareza, Brasa, Vitrine,
              Alicerce, Pilar e Cartão) retratam{" "}
              <strong>negócios inteiramente fictícios</strong>, com nomes, endereços,
              registros profissionais e preços inventados apenas para ilustrar como o
              site funciona na prática.
            </p>
            <p>
              A estrutura visual, o código-fonte, a organização e os textos deste
              site e de seus modelos de demonstração são obras intelectuais de
              titularidade da {site.name}, protegidas pela Lei de Direitos Autorais
              (Lei nº 9.610/1998). Não é permitido copiar, reproduzir, revender ou
              redistribuir os modelos sem a contratação regular do serviço.
            </p>
          </section>

          <section id="contratacao-ajustes" className={styles.section}>
            <h2>4. Proposta, pagamento e rodadas de ajuste</h2>
            <p>
              O processo de trabalho da {site.name} segue regras simples para dar
              segurança às duas partes:
            </p>
            <ul>
              <li>
                <strong>Proposta por escrito:</strong> antes de começar, enviamos um
                resumo claro com o que será entregue, o prazo e o valor fechado.
              </li>
              <li>
                <strong>Forma de pagamento padrão:</strong>{" "}
                {site.payment ||
                  "50% na aprovação da proposta para iniciar a construção e 50% na entrega, antes da publicação definitiva"}
                .
              </li>
              <li>
                <strong>Prévia para acompanhamento:</strong> durante a criação, você
                recebe um link de prévia para ver o site funcionando no celular e no
                computador.
              </li>
              <li>
                <strong>Rodadas de ajuste incluídas:</strong> cada pacote inclui um
                número definido de rodadas de revisão (1 no Essencial, 2 no
                Profissional e 3 no Completo). Considera-se <em>ajuste</em> a
                correção ou refinamento de textos, cores, fotos, preços e pequenos
                detalhes dentro do escopo combinado na proposta.
              </li>
              <li>
                <strong>Mudança de escopo:</strong> pedidos de novas páginas, novas
                seções que não estavam na proposta inicial ou troca completa do
                modelo após a construção já ter sido realizada são orçados à parte,
                sempre com aviso e aprovação prévia.
              </li>
            </ul>
          </section>

          <section id="propriedade-responsabilidades" className={styles.section}>
            <h2>5. Propriedade do site, domínio e materiais enviados</h2>
            <ul>
              <li>
                <strong>Propriedade após a quitação:</strong> após o pagamento
                integral do valor acordado na proposta, o cliente passa a ter o
                direito pleno de uso do site finalizado para o seu negócio e recebe,
                quando solicitar, uma cópia dos arquivos do projeto.
              </li>
              <li>
                <strong>Domínio no seu nome:</strong> o registro do endereço do site
                (por exemplo, <code>seunegocio.com.br</code> no Registro.br) é feito
                sempre em nome e CPF/CNPJ do próprio cliente, garantindo que o
                endereço pertença exclusivamente a você.
              </li>
              <li>
                <strong>Materiais enviados pelo cliente:</strong> fotos, logotipos,
                textos, descrições de serviços, registros em conselhos de classe
                (como CRM, CRP, CRO, CRN, OAB, CRC) e preços fornecidos para colocar
                no site são de responsabilidade do cliente, que declara possuir os
                direitos de uso sobre essas imagens e informações.
              </li>
            </ul>
          </section>

          <section id="direito-arrependimento" className={styles.section}>
            <h2>6. Direito de arrependimento e cancelamento</h2>
            <p>
              Nos termos do artigo 49 do Código de Defesa do Consumidor (Lei nº
              8.078/1990), quando a contratação for realizada a distância (pelo
              WhatsApp ou por e-mail), o consumidor pode desistir do contrato no
              prazo de até <strong>7 (sete) dias corridos</strong> a contar da data
              da contratação, com a devolução integral e imediata dos valores
              eventualmente pagos.
            </p>
            <p>
              Após esse prazo, caso o cliente solicite o cancelamento antes da
              entrega final, será realizada a apuração proporcional do trabalho já
              executado e entregue em prévia até a data do pedido, devolvendo-se
              eventual saldo ou encerrando-se as etapas seguintes sem cobrança da
              parcela final, conforme o estágio do projeto.
            </p>
          </section>

          <section id="legislacao-foro" className={styles.section}>
            <h2>7. Legislação aplicável e foro</h2>
            <p>
              Estes Termos são regidos pelas leis da República Federativa do Brasil.
              Para resolver qualquer controvérsia decorrente deste site ou dos
              serviços prestados pela {site.name} que não possa ser solucionada de
              forma amigável, fica eleito o foro da Comarca de{" "}
              <strong>{cityState || "Fortaleza/CE"}</strong>, ficando sempre
              ressalvado o direito do consumidor de optar pelo foro do seu próprio
              domicílio, nos termos do art. 101, inciso I do Código de Defesa do
              Consumidor.
            </p>
          </section>

          <section id="data-atualizacao" className={styles.section}>
            <h2>8. Data da última atualização</h2>
            <p>
              Estes Termos de Uso e Condições de Contratação foram atualizados pela
              última vez em{" "}
              <strong>{formatLegalDate(site.lastLegalUpdate)}</strong>.
            </p>
          </section>
        </div>
      </Container>
    </article>
  );
}
