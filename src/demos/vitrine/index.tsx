import { useRef, useState } from "react";
import { DemoImage } from "../../components/ui/DemoImage";
import { WhatsAppIcon } from "../../components/ui/WhatsAppIcon";
import { formatBRL } from "../../lib/format";
import { buildMessage, buildWhatsAppUrl } from "../../lib/whatsapp";
import type { DemoProps } from "../types";
import styles from "./vitrine.module.css";

type CategoryId = "todas" | "roupas" | "calcados" | "acessorios";
type SizeCode = "P" | "M" | "G" | "GG" | "Único";

interface Product {
  id: string;
  name: string;
  category: Exclude<CategoryId, "todas">;
  categoryLabel: string;
  price: number;
  installments: string;
  sizes: readonly SizeCode[];
  material: string;
  description: string;
  photoLabel: string;
  badge?: string;
}

const CATEGORIES: readonly { id: CategoryId; label: string }[] = [
  { id: "todas", label: "Todas as peças (12)" },
  { id: "roupas", label: "Roupas em Linho e Algodão" },
  { id: "calcados", label: "Rasteiras e Sandálias" },
  { id: "acessorios", label: "Bolsas e Acessórios" },
];

const SIZE_FILTERS: readonly { id: "todos" | SizeCode; label: string }[] = [
  { id: "todos", label: "Todos" },
  { id: "P", label: "P" },
  { id: "M", label: "M" },
  { id: "G", label: "G" },
  { id: "GG", label: "GG" },
  { id: "Único", label: "Tamanho Único" },
];

const PRODUCTS: readonly Product[] = [
  // Roupas (5 itens)
  {
    id: "camisa-linho-maresia",
    name: "Camisa Linho Maresia",
    category: "roupas",
    categoryLabel: "Roupas",
    price: 149,
    installments: "3x de R$ 49,66 sem juros",
    sizes: ["P", "M", "G", "GG"],
    material: "55% linho, 45% viscose — fresca e pré-lavada",
    description:
      "Modelagem solta ideal para o calor de Fortaleza. Botões em madrepérola natural, gola tradicional e manga longa com presilha para dobrar na altura do cotovelo.",
    photoLabel: "Camisa de linho cru pendurada em cabide de madeira",
    badge: "Mais pedida",
  },
  {
    id: "vestido-midi-mucuripe",
    name: "Vestido Midi Mucuripe",
    category: "roupas",
    categoryLabel: "Roupas",
    price: 189,
    installments: "3x de R$ 63,00 sem juros",
    sizes: ["P", "M", "G"],
    material: "100% viscose sarjada com forro leve",
    description:
      "Vestido midi com alças reguláveis, decote reto e fenda lateral discreta. Não marca e acompanha faixa do próprio tecido para acinturar se preferir.",
    photoLabel: "Vestido midi terracota fluido em fundo claro",
    badge: "Nova coleção",
  },
  {
    id: "calca-pantalona-duna",
    name: "Calça Pantalona Duna",
    category: "roupas",
    categoryLabel: "Roupas",
    price: 169,
    installments: "3x de R$ 56,33 sem juros",
    sizes: ["P", "M", "G", "GG"],
    material: "Linho misto encorpado sem transparência",
    description:
      "Cintura alta com cós liso na frente e elástico embutido atrás para ajustar no corpo com conforto. Bolsos faca laterais profundos.",
    photoLabel: "Calça pantalona areia de cintura alta",
  },
  {
    id: "conjunto-cropped-saia-sol",
    name: "Conjunto Brisa de Verão (2 peças)",
    category: "roupas",
    categoryLabel: "Roupas",
    price: 219,
    installments: "3x de R$ 73,00 sem juros",
    sizes: ["P", "M", "G"],
    material: "Algodão maquinetado texturizado",
    description:
      "Conjunto versátil com blusa de manga curta estruturada e saia midi envelope. As duas peças também funcionam separadas no dia a dia.",
    photoLabel: "Conjunto feminino em algodão texturizado",
  },
  {
    id: "short-alfaiataria-aldeota",
    name: "Short Alfaiataria Aldeota",
    category: "roupas",
    categoryLabel: "Roupas",
    price: 129,
    installments: "3x de R$ 43,00 sem juros",
    sizes: ["P", "M", "G", "GG"],
    material: "Sarja leve 100% algodão com toque macio",
    description:
      "Corte de alfaiataria com pregas frontais, barra italiana dobrada e fechamento por botão forrado. Comprimento confortável que não sobe ao caminhar.",
    photoLabel: "Short de alfaiataria coral claro com cinto",
  },

  // Calçados (3 itens)
  {
    id: "rasteira-couro-iracema",
    name: "Rasteira em Couro Iracema",
    category: "calcados",
    categoryLabel: "Calçados",
    price: 119,
    installments: "3x de R$ 39,66 sem juros",
    sizes: ["P", "M", "G"],
    material: "Couro legítimo macio · P (34/35), M (36/37), G (38/39)",
    description:
      "Feita à mão por artesãos cearenses. Tiras largas trançadas que abraçam o pé sem apertar e palmilha acolchoada com solado antiderrapante.",
    photoLabel: "Sandália rasteira de couro caramelo trançado",
    badge: "Feito no CE",
  },
  {
    id: "sandalia-bloco-meireles",
    name: "Sandália Salto Bloco Meireles",
    category: "calcados",
    categoryLabel: "Calçados",
    price: 159,
    installments: "3x de R$ 53,00 sem juros",
    sizes: ["P", "M", "G"],
    material: "Pelica sintética premium · Salto 5 cm · P (34/35), M (36/37), G (38/39)",
    description:
      "Salto bloco de 5 cm estável para trabalhar ou sair à noite. Fecho com fivela lateral e tira fina no peito do pé.",
    photoLabel: "Sandália de salto bloco baixo em tom amêndoa",
  },
  {
    id: "mule-trancado-varjota",
    name: "Mule Trançado Natural",
    category: "calcados",
    categoryLabel: "Calçados",
    price: 135,
    installments: "3x de R$ 45,00 sem juros",
    sizes: ["M", "G"],
    material: "Corda de algodão e palmilha forrada · M (36/37), G (38/39)",
    description:
      "Prático de calçar, bico quadrado moderno e acabamento em trama de algodão cru. Combina com jeans, pantalonas e vestidos.",
    photoLabel: "Calçado estilo mule com trama natural",
  },

  // Acessórios (4 itens)
  {
    id: "bolsa-palha-carnauba",
    name: "Bolsa Tiracolo Carnaúba & Couro",
    category: "acessorios",
    categoryLabel: "Acessórios",
    price: 145,
    installments: "3x de R$ 48,33 sem juros",
    sizes: ["Único"],
    material: "Palha de carnaúba trançada e alça em couro (24 x 18 cm)",
    description:
      "Estrutura firme trançada à mão com forro interno em algodão, bolso com zíper para celular e fecho magnético sob a tampa de couro.",
    photoLabel: "Bolsa tiracolo de palha trançada com alça de couro",
    badge: "Artesanal",
  },
  {
    id: "lenço-acetinado-caju",
    name: "Lenço Estampa Caju (70x70cm)",
    category: "acessorios",
    categoryLabel: "Acessórios",
    price: 69,
    installments: "2x de R$ 34,50 sem juros",
    sizes: ["Único"],
    material: "Toque de seda acetinado (100% poliéster fino)",
    description:
      "Estampa autoral exclusiva inspirada nos cajueiros do litoral. Pode ser usado no pescoço, no cabelo, como faixa de cintura ou amarrado na bolsa.",
    photoLabel: "Lenço estampado em tons de coral e azul-marinho",
  },
  {
    id: "cinto-couro-fivela-dourada",
    name: "Cinto Couro Fivela Orgânica",
    category: "acessorios",
    categoryLabel: "Acessórios",
    price: 89,
    installments: "2x de R$ 44,50 sem juros",
    sizes: ["P", "M", "G"],
    material: "Tira em couro bovino 2,5 cm e fivela em metal com banho dourado",
    description:
      "Acabamento fosco elegante e fivela de desenho orgânico. Sete furos de ajuste para usar tanto na cintura alta quanto no quadril.",
    photoLabel: "Cinto de couro marrom com fivela dourada",
  },
  {
    id: "colar-resina-tartaruga",
    name: "Colar Elos de Resina Âmbar",
    category: "acessorios",
    categoryLabel: "Acessórios",
    price: 75,
    installments: "2x de R$ 37,50 sem juros",
    sizes: ["Único"],
    material: "Elos leves em resina polida e extensor hipoalergênico",
    description:
      "Peça de presença que não pesa no pescoço e não escurece com a maresia. Comprimento de 45 cm mais 7 cm de corrente extensora.",
    photoLabel: "Colar de elos em resina âmbar sobre tecido claro",
  },
];

export default function VitrineDemo({ businessName, compact = false }: DemoProps) {
  const name = businessName?.trim() || "Maresia — Moda & Acessórios";
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>("todas");
  const [selectedSizeFilter, setSelectedSizeFilter] = useState<"todos" | SizeCode>("todos");
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [modalSize, setModalSize] = useState<SizeCode>("M");

  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const triggerButtonsRef = useRef<Record<string, HTMLButtonElement | null>>({});
  const lastTriggerIdRef = useRef<string | null>(null);

  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesCategory =
      selectedCategory === "todas" || product.category === selectedCategory;
    const matchesSize =
      selectedSizeFilter === "todos" || product.sizes.includes(selectedSizeFilter);
    return matchesCategory && matchesSize;
  });

  function openProductModal(product: Product) {
    lastTriggerIdRef.current = product.id;
    const preferredSize =
      selectedSizeFilter !== "todos" && product.sizes.includes(selectedSizeFilter)
        ? selectedSizeFilter
        : product.sizes[0];
    setModalSize(preferredSize);
    setActiveProduct(product);

    const dialog = dialogRef.current;
    if (dialog && !dialog.open) {
      dialog.showModal();
    }
  }

  function closeProductModal() {
    const dialog = dialogRef.current;
    if (dialog && dialog.open) {
      dialog.close();
    }
  }

  function handleDialogClose() {
    const lastId = lastTriggerIdRef.current;
    setActiveProduct(null);
    if (lastId) {
      const btn = triggerButtonsRef.current[lastId];
      btn?.focus();
    }
  }

  const generalWhatsAppUrl = buildWhatsAppUrl(
    buildMessage({
      source: "demo",
      modelName: "Vitrine",
      businessName: name,
      notes: "gostei do catálogo com filtro de tamanhos e pedido no WhatsApp",
    }),
  );

  const productWhatsAppUrl = activeProduct
    ? buildWhatsAppUrl(
        buildMessage({
          source: "demo",
          modelName: "Vitrine",
          businessName: name,
          notes: `gostei do pedido pelo WhatsApp (${activeProduct.name}, tamanho ${modalSize}, ${formatBRL(activeProduct.price)})`,
        }),
      )
    : generalWhatsAppUrl;

  return (
    <div className={styles.vitrine}>
      <div className={styles.topBar}>
        <div className={styles.container}>
          <p className={styles.topBarText}>
            Entrega expressa por motoboy em Fortaleza no mesmo dia · Retirada
            grátis na loja da Aldeota
          </p>
        </div>
      </div>

      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.headerInner}>
            <span className={styles.brandName}>{name}</span>

            <nav aria-label="Navegação da loja" className={styles.nav}>
              <a href="#vitrine-catalogo" className={styles.navLink}>
                Catálogo
              </a>
              {!compact && (
                <a href="#vitrine-trocas" className={styles.navLink}>
                  Envio e trocas
                </a>
              )}
              <a
                href={generalWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Falar com vendedora no WhatsApp (abre o WhatsApp)"
                className={styles.headerCta}
              >
                <WhatsAppIcon />
                <span>Atendimento</span>
              </a>
            </nav>
          </div>
        </div>
      </header>

      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroGrid}>
            <div className={styles.heroContent}>
              <p className={styles.heroCollection}>
                Coleção Vento Leste · Linho, algodão e couro artesanal
              </p>
              <h1 className={styles.heroTitle}>{name}</h1>
              <p className={styles.heroLead}>
                Peças leves pensadas para o clima do Ceará. Filtre pelo seu
                tamanho no catálogo abaixo, veja os detalhes de caimento e peça
                direto no WhatsApp para receber em casa ou retirar na loja.
              </p>
              <div className={styles.heroActions}>
                <a href="#vitrine-catalogo" className={styles.primaryBtn}>
                  Explorar coleção (12 peças)
                </a>
                <a
                  href={generalWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Pedir ajuda de tamanho no WhatsApp (abre o WhatsApp)"
                  className={styles.secondaryBtn}
                >
                  <WhatsAppIcon />
                  <span>Tirar dúvida de medidas</span>
                </a>
              </div>
            </div>

            <div className={styles.heroVisual}>
              <DemoImage
                label="Editorial de moda em linho natural sob luz solar"
                ratio="4/3"
                tone="accent"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="vitrine-catalogo" className={styles.catalogSection}>
        <div className={styles.container}>
          <div className={styles.catalogHeader}>
            <div>
              <h2 className={styles.sectionTitle}>Catálogo disponível</h2>
              <p className={styles.sectionSubtitle}>
                Selecione a categoria e o tamanho para ver apenas o que temos a
                pronta-entrega hoje.
              </p>
            </div>
            <p className={styles.resultCount} aria-live="polite">
              Exibindo <strong>{filteredProducts.length}</strong> de{" "}
              {PRODUCTS.length} peças
            </p>
          </div>

          <div className={styles.filtersBar}>
            <div
              className={styles.filterGroup}
              role="group"
              aria-label="Filtrar por categoria"
            >
              <span className={styles.filterLabel}>Categoria:</span>
              <div className={styles.filterPills}>
                {CATEGORIES.map((cat) => {
                  const isActive = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={[
                        styles.filterBtn,
                        isActive ? styles.filterBtnActive : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      {cat.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div
              className={styles.filterGroup}
              role="group"
              aria-label="Filtrar por tamanho disponível"
            >
              <span className={styles.filterLabel}>Tamanho:</span>
              <div className={styles.filterPills}>
                {SIZE_FILTERS.map((size) => {
                  const isActive = selectedSizeFilter === size.id;
                  return (
                    <button
                      key={size.id}
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => setSelectedSizeFilter(size.id)}
                      className={[
                        styles.sizeFilterBtn,
                        isActive ? styles.filterBtnActive : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      {size.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className={styles.emptyState}>
              <p>
                Nenhuma peça encontrada nessa combinação de categoria e tamanho.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("todas");
                  setSelectedSizeFilter("todos");
                }}
                className={styles.resetBtn}
              >
                Limpar filtros e ver todas as 12 peças
              </button>
            </div>
          ) : (
            <div className={styles.productGrid}>
              {filteredProducts.map((product) => {
                const defaultSize =
                  selectedSizeFilter !== "todos" &&
                  product.sizes.includes(selectedSizeFilter)
                    ? selectedSizeFilter
                    : product.sizes[0];

                const quickOrderUrl = buildWhatsAppUrl(
                  buildMessage({
                    source: "demo",
                    modelName: "Vitrine",
                    businessName: name,
                    notes: `gostei do pedido pelo WhatsApp (${product.name}, tamanho ${defaultSize}, ${formatBRL(product.price)})`,
                  }),
                );

                return (
                  <article key={product.id} className={styles.productCard}>
                    <div className={styles.imageBox}>
                      {product.badge && (
                        <span className={styles.productBadge}>
                          {product.badge}
                        </span>
                      )}
                      <DemoImage
                        label={product.photoLabel}
                        ratio="4/3"
                        tone="light"
                      />
                    </div>

                    <div className={styles.cardBody}>
                      <span className={styles.productCategory}>
                        {product.categoryLabel}
                      </span>
                      <h3 className={styles.productName}>{product.name}</h3>
                      <p className={styles.productMaterial}>
                        {product.material}
                      </p>

                      <div className={styles.priceBlock}>
                        <strong className={styles.productPrice}>
                          {formatBRL(product.price)}
                        </strong>
                        <span className={styles.productInstallments}>
                          ou {product.installments}
                        </span>
                      </div>

                      <div
                        className={styles.sizesRow}
                        aria-label="Tamanhos disponíveis"
                      >
                        <span className={styles.sizesLabel}>Tamanhos:</span>
                        <div className={styles.sizeBadges}>
                          {product.sizes.map((sz) => (
                            <span key={sz} className={styles.sizeBadge}>
                              {sz}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className={styles.cardActions}>
                        <button
                          type="button"
                          ref={(el) => {
                            triggerButtonsRef.current[product.id] = el;
                          }}
                          onClick={() => openProductModal(product)}
                          className={styles.detailsBtn}
                        >
                          Escolher tamanho e detalhes
                        </button>
                        <a
                          href={quickOrderUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Pedir ${product.name} tamanho ${defaultSize} no WhatsApp (abre o WhatsApp)`}
                          className={styles.quickWhatsappLink}
                        >
                          <WhatsAppIcon />
                          <span>Pedir ({defaultSize})</span>
                        </a>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <dialog
        ref={dialogRef}
        onClose={handleDialogClose}
        aria-labelledby="vitrine-dialog-title"
        className={styles.dialog}
      >
        {activeProduct && (
          <div className={styles.dialogContent}>
            <div className={styles.dialogHeader}>
              <div>
                <span className={styles.productCategory}>
                  {activeProduct.categoryLabel}
                </span>
                <h2 id="vitrine-dialog-title" className={styles.dialogTitle}>
                  {activeProduct.name}
                </h2>
              </div>
              <button
                type="button"
                onClick={closeProductModal}
                className={styles.closeBtn}
              >
                Fechar
              </button>
            </div>

            <div className={styles.dialogGrid}>
              <div className={styles.dialogImage}>
                <DemoImage
                  label={activeProduct.photoLabel}
                  ratio="4/3"
                  tone="accent"
                />
              </div>

              <div className={styles.dialogDetails}>
                <div className={styles.dialogPriceBox}>
                  <strong className={styles.dialogPrice}>
                    {formatBRL(activeProduct.price)}
                  </strong>
                  <span className={styles.productInstallments}>
                    no Pix ou {activeProduct.installments} no cartão
                  </span>
                </div>

                <p className={styles.dialogDesc}>{activeProduct.description}</p>

                <p className={styles.dialogMaterial}>
                  <strong>Composição e medidas:</strong> {activeProduct.material}
                </p>

                <div
                  className={styles.modalSizeSelector}
                  role="group"
                  aria-label="Escolha o tamanho da peça"
                >
                  <span className={styles.modalSizeLabel}>
                    Escolha o tamanho para pedir:
                  </span>
                  <div className={styles.modalSizeButtons}>
                    {activeProduct.sizes.map((sz) => {
                      const isChosen = modalSize === sz;
                      return (
                        <button
                          key={sz}
                          type="button"
                          aria-pressed={isChosen}
                          onClick={() => setModalSize(sz)}
                          className={[
                            styles.modalSizeBtn,
                            isChosen ? styles.modalSizeBtnActive : "",
                          ]
                            .filter(Boolean)
                            .join(" ")}
                        >
                          {sz}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <a
                  href={productWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Pedir ${activeProduct.name} tamanho ${modalSize} no WhatsApp (abre o WhatsApp)`}
                  className={styles.modalOrderBtn}
                >
                  <WhatsAppIcon />
                  <span>
                    Pedir no WhatsApp ({modalSize} ·{" "}
                    {formatBRL(activeProduct.price)})
                  </span>
                </a>

                <p className={styles.modalNote}>
                  Ao clicar, a mensagem já vai preenchida com o nome da peça e o
                  tamanho <strong>{modalSize}</strong> para a vendedora separar
                  no estoque.
                </p>
              </div>
            </div>
          </div>
        )}
      </dialog>

      {!compact && (
        <section id="vitrine-trocas" className={styles.policySection}>
          <div className={styles.container}>
            <div className={styles.policyHeader}>
              <h2 className={styles.sectionTitle}>
                Envio em Fortaleza, retirada e trocas fáceis
              </h2>
              <p className={styles.sectionSubtitle}>
                Sem complicação para receber em casa ou trocar se o tamanho não
                ficar como você esperava.
              </p>
            </div>

            <div className={styles.policyGrid}>
              <div className={styles.policyCard}>
                <h3 className={styles.policyTitle}>
                  Entrega por motoboy ou Correios
                </h3>
                <ul className={styles.policyList}>
                  <li>
                    <strong>Fortaleza (motoboy):</strong> pedidos confirmados
                    até as 15h seguem no mesmo dia. Taxa fixa de R$ 12 para
                    Aldeota, Meireles, Cocó, Fátima, Benfica e Papicu; R$ 18
                    para os demais bairros.
                  </li>
                  <li>
                    <strong>Retirada gratuita:</strong> retire na nossa loja
                    física em até 2 horas após a confirmação do pagamento.
                  </li>
                  <li>
                    <strong>Interior do Ceará e outros estados:</strong> envio
                    via PAC ou Sedex com código de rastreio enviado no WhatsApp.
                  </li>
                </ul>
              </div>

              <div className={styles.policyCard}>
                <h3 className={styles.policyTitle}>
                  Política de trocas e devolução
                </h3>
                <ul className={styles.policyList}>
                  <li>
                    <strong>Até 30 dias para trocar tamanho ou modelo:</strong>{" "}
                    basta a peça estar com a etiqueta fixada e sem sinais de
                    uso. Você pode trocar na loja física ou solicitar coleta.
                  </li>
                  <li>
                    <strong>Primeira troca com taxa dividida:</strong> se for
                    por motoboy em Fortaleza, você paga apenas um trecho.
                  </li>
                  <li>
                    <strong>Compras por delivery/online:</strong> direito de
                    arrependimento garantido em até 7 dias corridos após o
                    recebimento (art. 49 do CDC), com reembolso integral.
                  </li>
                </ul>
              </div>

              <div className={styles.policyCard}>
                <h3 className={styles.policyTitle}>
                  Loja física e formas de pagamento
                </h3>
                <p className={styles.policyText}>
                  Aceitamos Pix com 5% de desconto em peças selecionadas, link
                  de pagamento em até 3x sem juros no cartão ou pagamento na
                  maquininha na retirada.
                </p>
                <address className={styles.storeAddress}>
                  <strong>Endereço da loja (fictício):</strong> Rua Exemplo, 410
                  — Loja 02, Aldeota, Fortaleza/CE · Segunda a sexta das 9h às
                  19h, sábado das 9h às 16h · WhatsApp: (85) 90000-0000
                </address>
              </div>
            </div>
          </div>
        </section>
      )}

      <footer className={styles.footer}>
        <div className={styles.container}>
          <p className={styles.footerText}>
            © 2026 {name} · Modelo de demonstração criado pela MJ Studio
          </p>
        </div>
      </footer>
    </div>
  );
}
