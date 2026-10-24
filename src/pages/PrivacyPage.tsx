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

export default function PrivacyPage() {
  const whatsappUrl = buildWhatsAppUrl(buildMessage({ source: "generic" }));
  const cityState = [site.city, site.state].filter(Boolean).join("/");
  const controllerEmail = site.legal.privacyContactEmail || site.email;

  return (
    <article className={styles.article}>
      <Container>
        <title>{`Política de Privacidade | ${site.name}`}</title>
        <meta
          name="description"
          content="Como a MJ Studios trata dados pessoais de acordo com a Lei Geral de Proteção de Dados (LGPD)."
        />

        <div className={styles.content}>
          <header className={styles.header}>
            <h1 className={styles.title}>Política de Privacidade</h1>
            <p className={styles.updatedAt}>
              Última atualização em {formatLegalDate(site.lastLegalUpdate)}
            </p>
          </header>

          <p>
            Esta Política de Privacidade explica, em linguagem direta, como a{" "}
            {site.name} lida com informações pessoais quando você navega neste site
            ou entra em contato conosco para pedir um orçamento, em conformidade com
            a Lei Geral de Proteção de Dados Pessoais (LGPD — Lei nº 13.709/2018) e
            com o Marco Civil da Internet (Lei nº 12.965/2014).
          </p>

          <nav className={styles.toc} aria-label="Sumário da Política de Privacidade">
            <p className={styles.tocTitle}>Sumário</p>
            <ol className={styles.tocList}>
              <li>
                <a href="#controlador">1. Quem é o responsável pelo tratamento (controlador)</a>
              </li>
              <li>
                <a href="#coleta-no-site">2. Que dados este site coleta</a>
              </li>
              <li>
                <a href="#atendimento-whatsapp">3. Dados tratados quando você conversa no WhatsApp</a>
              </li>
              <li>
                <a href="#servicos-terceiros">4. Serviços de terceiros carregados pelo site</a>
              </li>
              <li>
                <a href="#cookies">5. Cookies e métricas de navegação</a>
              </li>
              <li>
                <a href="#direitos-titular">6. Seus direitos como titular de dados</a>
              </li>
              <li>
                <a href="#seguranca">7. Segurança das informações</a>
              </li>
              <li>
                <a href="#atualizacoes">8. Atualizações desta política</a>
              </li>
            </ol>
          </nav>

          <section id="controlador" className={styles.section}>
            <h2>1. Quem é o responsável pelo tratamento (controlador)</h2>
            <p>
              O controlador responsável pelas decisões sobre o tratamento de dados
              pessoais referentes a este site e ao atendimento comercial é{" "}
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
              Para qualquer dúvida, solicitação ou exercício de direitos previstos na
              LGPD, você pode falar diretamente com o responsável pelo tratamento de
              dados pelos seguintes canais:
            </p>
            <ul>
              {controllerEmail && (
                <li>
                  E-mail do encarregado de dados:{" "}
                  <a href={`mailto:${controllerEmail}`}>{controllerEmail}</a>
                </li>
              )}
              {site.whatsapp.display && (
                <li>
                  WhatsApp:{" "}
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Conversar pelo WhatsApp ${site.whatsapp.display} (abre o WhatsApp)`}
                  >
                    {site.whatsapp.display}
                  </a>
                </li>
              )}
            </ul>
          </section>

          <section id="coleta-no-site" className={styles.section}>
            <h2>2. Que dados este site coleta</h2>
            <div className={styles.callout}>
              <p>
                <strong>Resumo direto:</strong> nenhum dado pessoal é coletado, salvo
                em banco de dados ou armazenado por este site.
              </p>
            </div>
            <p>
              Este site não possui cadastro de usuários, área de login, comentários
              nem banco de dados próprio. Quando você digita o nome do seu negócio na
              página inicial ou preenche as etapas da página de{" "}
              <Link to="/orcamento">orçamento</Link>, tudo acontece exclusivamente na
              memória temporária do seu próprio navegador.
            </p>
            <p>
              Ao final do passo a passo de orçamento, o site apenas monta um texto
              pronto e abre o aplicativo do WhatsApp no seu aparelho. A mensagem só é
              enviada para a {site.name} se você confirmar o envio dentro do seu
              WhatsApp. Se você fechar a aba do navegador antes de enviar a mensagem
              no WhatsApp, todas as respostas preenchidas desaparecem imediatamente.
            </p>
          </section>

          <section id="atendimento-whatsapp" className={styles.section}>
            <h2>3. Dados tratados quando você conversa no WhatsApp</h2>
            <p>
              Quando você decide iniciar uma conversa conosco pelo WhatsApp ou por
              e-mail, passamos a tratar apenas as informações necessárias para
              atender o seu pedido:
            </p>
            <ul>
              <li>
                <strong>Dados tratados:</strong> seu nome (conforme exibido no seu
                perfil ou informado na conversa), número de telefone/WhatsApp,
                endereço de e-mail (caso envie um e-mail) e as informações sobre o
                seu negócio que você decidir escrever na mensagem. Caso o serviço
                seja contratado, também solicitaremos os dados necessários para o
                contrato e emissão fiscal (nome completo ou razão social, CPF ou CNPJ
                e endereço).
              </li>
              <li>
                <strong>Finalidade:</strong> responder às suas dúvidas, elaborar e
                enviar a proposta comercial, prestar o serviço contratado e emitir os
                documentos fiscais correspondentes.
              </li>
              <li>
                <strong>Base legal (LGPD):</strong> procedimentos preliminares
                relacionados a contrato ou execução de contrato a pedido do titular
                (art. 7º, inciso V da LGPD), legítimo interesse para manter o
                histórico básico de atendimento comercial (art. 7º, inciso IX) e
                cumprimento de obrigação legal ou regulatória no caso de notas
                fiscais e registros contábeis (art. 7º, inciso II).
              </li>
              <li>
                <strong>Prazo de guarda:</strong> conversas de orçamento que não
                resultarem em contratação podem ser mantidas no histórico de
                atendimento por até 2 (dois) anos após o último contato, salvo se
                você solicitar a exclusão antes. Em caso de contratação, os dados
                contratuais e fiscais são guardados pelo prazo exigido pela
                legislação tributária e civil brasileira (em regra, 5 anos).
              </li>
              <li>
                <strong>Compartilhamento:</strong> não vendemos nem cedemos seus
                dados a terceiros. As mensagens trocadas pelo WhatsApp trafegam pela
                infraestrutura da Meta Platforms (operadora do aplicativo WhatsApp),
                que possui política de privacidade própria.
              </li>
            </ul>
          </section>

          <section id="servicos-terceiros" className={styles.section}>
            <h2>4. Serviços de terceiros carregados pelo site</h2>
            <p>
              Para reduzir ao mínimo o compartilhamento técnico do seu endereço IP
              com empresas externas, este site foi construído com as seguintes
              escolhas técnicas:
            </p>
            <ul>
              <li>
                <strong>Fontes tipográficas auto-hospedadas:</strong> as fontes de
                texto são servidas diretamente a partir dos arquivos deste próprio
                site, sem buscar arquivos no Google Fonts ou em redes de terceiros.
              </li>
              <li>
                <strong>Provedor de hospedagem:</strong> para que as páginas cheguem
                até o seu aparelho, o servidor de hospedagem recebe tecnicamente o
                endereço IP, a data, a hora e o navegador utilizado. Esses registros
                de acesso são mantidos sob sigilo pelo prazo legal de 6 (seis) meses,
                conforme determina o art. 15 do Marco Civil da Internet (Lei nº
                12.965/2014).
              </li>
              {site.vlibras && (
                <li>
                  <strong>Widget VLibras (Governo Federal):</strong> carregamos o
                  recurso oficial de tradução automática para a Língua Brasileira de
                  Sinais a partir do domínio governamental{" "}
                  <code>vlibras.gov.br</code> e da rede de distribuição{" "}
                  <code>cdn.jsdelivr.net</code> usada pelo próprio VLibras, para
                  cumprir o dever de acessibilidade digital previsto na Lei Brasileira
                  de Inclusão (Lei nº 13.146/2015). Esses servidores recebem
                  tecnicamente o seu endereço IP ao carregar o recurso.
                </li>
              )}
            </ul>
          </section>

          <section id="cookies" className={styles.section}>
            <h2>5. Cookies e métricas de navegação</h2>
            <p>
              Este site <strong>não utiliza cookies de rastreamento</strong>, pixels
              de redes sociais, identificadores de publicidade nem ferramentas que
              acompanhem a sua navegação em outros sites.
            </p>
            <p>
              Caso no futuro a {site.name} decida ativar ferramentas de estatísticas
              de visitação que dependam de cookies não essenciais, esta Política de
              Privacidade será atualizada previamente e um aviso de consentimento
              claro será apresentado antes de qualquer coleta.
            </p>
          </section>

          <section id="direitos-titular" className={styles.section}>
            <h2>6. Seus direitos como titular de dados</h2>
            <p>
              O artigo 18 da LGPD garante a você, a qualquer momento e de forma
              gratuita, o direito de solicitar:
            </p>
            <ul>
              <li>Confirmação da existência de tratamento de dados pessoais seus;</li>
              <li>Acesso aos dados pessoais que tratamos a seu respeito;</li>
              <li>
                Correção de dados incompletos, inexatos ou desatualizados;
              </li>
              <li>
                Anonimização, bloqueio ou eliminação de dados desnecessários,
                excessivos ou tratados em desconformidade com a lei;
              </li>
              <li>
                Portabilidade dos dados a outro fornecedor de serviço, quando
                aplicável;
              </li>
              <li>
                Eliminação dos dados pessoais tratados com base em consentimento;
              </li>
              <li>
                Informação sobre as entidades públicas e privadas com as quais
                houve uso compartilhado de dados;
              </li>
              <li>
                Informação sobre a possibilidade de não fornecer consentimento e
                sobre as consequências da negativa, além da revogação do
                consentimento a qualquer tempo.
              </li>
            </ul>
            <p>
              <strong>Como exercer seus direitos:</strong> basta enviar uma mensagem
              pelo nosso{" "}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp da MJ Studios (abre o WhatsApp)"
              >
                WhatsApp ({site.whatsapp.display})
              </a>
              {controllerEmail ? (
                <>
                  {" "}
                  ou pelo e-mail{" "}
                  <a href={`mailto:${controllerEmail}`}>{controllerEmail}</a>
                </>
              ) : (
                ""
              )}{" "}
              informando seu pedido. Responderemos às solicitações no prazo de até{" "}
              <strong>15 (quinze) dias</strong>, conforme previsto no art. 19, § 2º
              da LGPD.
            </p>
            <p>
              Você também tem o direito de apresentar petição ou reclamação perante a
              Autoridade Nacional de Proteção de Dados (ANPD), pelo portal oficial{" "}
              <a
                href="https://www.gov.br/anpd"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Portal da Autoridade Nacional de Proteção de Dados em gov.br/anpd (abre em nova aba)"
              >
                gov.br/anpd
              </a>
              .
            </p>
          </section>

          <section id="seguranca" className={styles.section}>
            <h2>7. Segurança das informações</h2>
            <p>
              Adotamos medidas técnicas e administrativas adequadas ao porte da nossa
              operação para proteger qualquer informação contra acessos não
              autorizados:
            </p>
            <ul>
              <li>
                Conexão integralmente criptografada via protocolo HTTPS (TLS) com
                cabeçalhos rígidos de segurança (HSTS e Política de Segurança de
                Conteúdo);
              </li>
              <li>
                Ausência de banco de dados exposto na internet neste site, evitando
                riscos de vazamento de cadastros;
              </li>
              <li>
                Acesso aos canais de atendimento restrito à equipe responsável pela{" "}
                {site.name}, protegido por autenticação em duas etapas.
              </li>
            </ul>
          </section>

          <section id="atualizacoes" className={styles.section}>
            <h2>8. Atualizações desta política</h2>
            <p>
              Esta Política de Privacidade pode ser revista para refletir melhorias
              no site ou alterações legais. Sempre que houver uma mudança relevante,
              a data no topo desta página será atualizada.
            </p>
            <p>
              Versão vigente atualizada em:{" "}
              <strong>{formatLegalDate(site.lastLegalUpdate)}</strong>.
            </p>
          </section>
        </div>
      </Container>
    </article>
  );
}
