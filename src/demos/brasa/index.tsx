import { useState } from "react";
import "@fontsource-variable/bricolage-grotesque";
import { Tabs, type TabOption } from "../../components/ui/Tabs";
import { WhatsAppIcon } from "../../components/ui/WhatsAppIcon";
import { formatBRL } from "../../lib/format";
import { buildMessage, buildWhatsAppUrl } from "../../lib/whatsapp";
import { useWhatsAppCart } from "../shared/useWhatsAppCart";
import type { DemoProps } from "../types";
import styles from "./brasa.module.css";

interface MenuItem {
  id: string;
  category: string;
  name: string;
  description: string;
  price: number;
}

interface DeliveryZone {
  region: string;
  neighborhoods: string;
  fee: string;
  time: string;
}

const CATEGORIES: readonly TabOption[] = [
  { id: "burgers", label: "Hambúrgueres na Brasa" },
  { id: "porcoes", label: "Porções e Entradas" },
  { id: "combos", label: "Combos da Casa" },
  { id: "bebidas", label: "Bebidas e Sobremesas" },
];

interface CategoryBanner {
  src: string;
  alt: string;
}

const CATEGORY_BANNERS: Record<string, CategoryBanner | undefined> = {
  burgers: {
    src: "/img/brasa/duplo.jpg",
    alt: "Hambúrguer duplo com cheddar derretido e picles sobre uma superfície escura",
  },
  porcoes: {
    src: "/img/brasa/batata.jpg",
    alt: "Hambúrguer com batatas fritas em uma bandeja de madeira",
  },
  combos: {
    src: "/img/brasa/casa.jpg",
    alt: "Dois hambúrgueres espetados com palito em uma tábua, ao lado de garrafas de refrigerante",
  },
};

const MENU_ITEMS: readonly MenuItem[] = [
  // Hambúrgueres na Brasa (4 itens)
  {
    id: "brasa-classico",
    category: "burgers",
    name: "Brasa Clássico 180g",
    description:
      "Blend bovino na grelha, queijo prato derretido, alface crocante, tomate e maionese defumada no pão brioche.",
    price: 32,
  },
  {
    id: "sertao-burger",
    category: "burgers",
    name: "Sertão na Brasa",
    description:
      "Hambúrguer 180g, queijo coalho selado no melaço de cana, cebola roxa caramelizada e carne de sol desfiada.",
    price: 38,
  },
  {
    id: "duplo-cheddar",
    category: "burgers",
    name: "Duplo Brasa & Bacon",
    description:
      "Dois blends de 140g na brasa, dobro de cheddar cremoso, fatias de bacon crocante e picles da casa.",
    price: 44,
  },
  {
    id: "frango-crocante",
    category: "burgers",
    name: "Sobrecoxa Grelhada & Ervas",
    description:
      "Sobrecoxa marinada na brasa, queijo muçarela, salada de repolho cremosa e molho mostarda e mel.",
    price: 30,
  },

  // Porções e Entradas (4 itens)
  {
    id: "batata-rustica",
    category: "porcoes",
    name: "Batata Rústica com Alecrim",
    description:
      "Porção de 350g de batatas cortadas na casa, finalizadas com páprica, alecrim e maionese de alho assado.",
    price: 22,
  },
  {
    id: "macaxeira-coalho",
    category: "porcoes",
    name: "Dadinhos de Macaxeira & Coalho",
    description:
      "8 unidades crocantes por fora e macias por dentro, servidas com geleia de pimenta leve.",
    price: 26,
  },
  {
    id: "costelinha-bbq",
    category: "porcoes",
    name: "Costelinha Defumada (Meia Porção)",
    description:
      "Tiras de costelinha suína assadas lentamente e glaceadas no molho barbecue de rapadura.",
    price: 42,
  },
  {
    id: "aneis-cebola",
    category: "porcoes",
    name: "Anéis de Cebola Empanados",
    description:
      "Porção crocante acompanhada de molho barbecue defumado da casa.",
    price: 20,
  },

  // Combos da Casa (4 itens)
  {
    id: "combo-individual",
    category: "combos",
    name: "Combo Individual Brasa",
    description:
      "1 Brasa Clássico 180g + porção individual de batata rústica + 1 refrigerante lata ou suco 300ml.",
    price: 48,
  },
  {
    id: "combo-sertao",
    category: "combos",
    name: "Combo Sertão Completo",
    description:
      "1 Sertão na Brasa + 4 dadinhos de macaxeira + 1 bebida lata à escolha.",
    price: 54,
  },
  {
    id: "combo-casal",
    category: "combos",
    name: "Combo Casal na Brasa",
    description:
      "2 hambúrgueres (Clássico ou Sertão) + 1 porção grande de batata rústica + 2 bebidas lata.",
    price: 94,
  },
  {
    id: "combo-familia",
    category: "combos",
    name: "Combo Galera (4 Pessoas)",
    description:
      "4 hambúrgueres Clássicos + 2 porções de acompanhamento + 1 refrigerante de 2 litros.",
    price: 168,
  },

  // Bebidas e Sobremesas (4 itens)
  {
    id: "cajuina-300",
    category: "bebidas",
    name: "Cajuína São Geraldo (Lata 350ml)",
    description: "Bem gelada, perfeita para acompanhar carnes na brasa.",
    price: 8,
  },
  {
    id: "suco-cajua",
    category: "bebidas",
    name: "Suco Natural da Fruta (400ml)",
    description:
      "Sabores do dia: cajá, acerola, maracujá ou limão com hortelã. Feito na hora.",
    price: 11,
  },
  {
    id: "brownie-castanha",
    category: "bebidas",
    name: "Brownie de Chocolate com Castanha",
    description:
      "Fatia morna de brownie artesanal com castanha-de-caju tostada e calda de chocolate meio amargo.",
    price: 16,
  },
  {
    id: "pudim-leite",
    category: "bebidas",
    name: "Pudim de Leite Condensado",
    description:
      "Porção individual cremosa, sem furinhos, com calda de caramelo tradicional.",
    price: 14,
  },
];

const DELIVERY_ZONES: readonly DeliveryZone[] = [
  {
    region: "Região 1 — Entorno",
    neighborhoods: "Varjota, Meireles, Aldeota, Mucuripe e Papicu",
    fee: "R$ 6",
    time: "30 a 45 min",
  },
  {
    region: "Região 2 — Intermediária",
    neighborhoods: "Cocó, Dionísio Torres, Joaquim Távora, Fátima e Praia de Iracema",
    fee: "R$ 10",
    time: "40 a 55 min",
  },
  {
    region: "Região 3 — Expandida",
    neighborhoods: "Cidade dos Funcionários, Cambeba, Parquelândia e Benfica",
    fee: "R$ 14",
    time: "50 a 65 min",
  },
];

function checkIsOpenNow(): { isOpen: boolean; currentHour: number } {
  const now = new Date();
  const hour = now.getHours();
  const isOpen = hour >= 18 && hour < 23;
  return { isOpen, currentHour: hour };
}

export default function BrasaDemo({ businessName, compact = false }: DemoProps) {
  const name = businessName?.trim() || "Brasa do Benfica — Burger & Grelha";
  const [displayName, ...tagParts] = name.split(" — ");
  const tagline = tagParts.join(" — ") || "Hambúrguer artesanal na brasa";
  const [activeCategory, setActiveCategory] = useState<string>("burgers");
  const banner = CATEGORY_BANNERS[activeCategory];
  const cart = useWhatsAppCart();
  const { isOpen } = checkIsOpenNow();

  const categoryItems = MENU_ITEMS.filter(
    (item) => item.category === activeCategory,
  );

  const cartLines = cart.toCartLines();
  const orderWhatsAppUrl = buildWhatsAppUrl(
    cart.items.length > 0
      ? buildMessage({
          source: "cart",
          cartLines,
        })
      : buildMessage({
          source: "demo",
          modelName: "Brasa",
          businessName: name,
          notes: "gostei do cardápio digital com pedido no WhatsApp",
        }),
  );

  return (
    <div className={styles.brasa}>
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.headerInner}>
            <div className={styles.brandGroup}>
              <span className={styles.brandName}>{displayName}</span>
              <span
                className={[
                  styles.statusBadge,
                  isOpen ? styles.statusOpen : styles.statusClosed,
                ].join(" ")}
              >
                <span className={styles.statusDot} aria-hidden="true" />
                {isOpen
                  ? "Aberto agora · até 23h"
                  : "Fechado agora · abre hoje às 18h"}
              </span>
            </div>

            <nav aria-label="Navegação do cardápio" className={styles.nav}>
              <a href="#cardapio" className={styles.navLink}>
                Cardápio
              </a>
              <a href="#sacola" className={styles.navLink}>
                Pedido ({cart.totalItems})
              </a>
              {!compact && (
                <a href="#entrega" className={styles.navLink}>
                  Entrega e pagamento
                </a>
              )}
            </nav>
          </div>
        </div>
      </header>

      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroGrid}>
            <div className={styles.heroContent}>
              <h1 className={styles.heroTitle}>
                {displayName}{" "}
                <span className={styles.heroTitleTag}>{tagline}</span>
              </h1>
              <p className={styles.heroDesc}>
                Carne fresca grelhada no fogo de verdade, pão brioche selado na
                manteiga da terra e molhos feitos na casa. Monte o pedido e
                envie direto para o nosso WhatsApp, sem taxa de aplicativo.
              </p>
              <div className={styles.heroActions}>
                <a href="#cardapio" className={styles.primaryButton}>
                  Ver cardápio e montar pedido
                </a>
                <a
                  href={orderWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Pedir direto no WhatsApp (abre o WhatsApp)"
                  className={styles.secondaryButton}
                >
                  <WhatsAppIcon />
                  <span>Falar com o atendimento</span>
                </a>
              </div>
              <p className={styles.heroHours}>
                Delivery próprio e retirada no balcão, todos os dias das 18h às 23h.
              </p>
            </div>

            <figure className={styles.heroImage}>
              <img
                src="/img/brasa/smash.jpg"
                alt="Hambúrguer artesanal com cheddar, picles e molho sobre uma tábua de madeira, em fundo escuro"
                width={1100}
                height={733}
              />
            </figure>
          </div>
        </div>
      </section>

      <section id="cardapio" className={styles.menuSection}>
        <div className={styles.container}>
          <div className={styles.menuLayout}>
            <div className={styles.menuCatalog}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Nosso cardápio</h2>
                <p className={styles.sectionSubtitle}>
                  Escolha a categoria e adicione os itens na sua sacola.
                </p>
              </div>

              <div className={styles.tabsTheme}>
                <Tabs
                  tabs={CATEGORIES}
                  value={activeCategory}
                  onChange={setActiveCategory}
                  idPrefix="brasa-menu"
                  ariaLabel="Categorias do cardápio"
                >
                  {banner && (
                    <img
                      src={banner.src}
                      alt={banner.alt}
                      className={styles.categoryBanner}
                      loading="lazy"
                      width={1100}
                      height={733}
                    />
                  )}
                  <ul className={styles.itemsGrid}>
                    {categoryItems.map((item) => {
                      const qty = cart.getItemQty(item.id);
                      return (
                        <li key={item.id} className={styles.itemCard}>
                          <div className={styles.itemBody}>
                            <div className={styles.itemHeader}>
                              <h3 className={styles.itemName}>{item.name}</h3>
                              <strong className={styles.itemPrice}>
                                {formatBRL(item.price)}
                              </strong>
                            </div>
                            <p className={styles.itemDesc}>{item.description}</p>

                            <div className={styles.itemControls}>
                              {qty === 0 ? (
                                <button
                                  type="button"
                                  onClick={() =>
                                    cart.add({
                                      id: item.id,
                                      name: item.name,
                                      price: item.price,
                                    })
                                  }
                                  className={styles.addButton}
                                  aria-label={`Adicionar ${item.name} ao pedido`}
                                >
                                  Adicionar ao pedido
                                </button>
                              ) : (
                                <div className={styles.stepper}>
                                  <button
                                    type="button"
                                    onClick={() => cart.remove(item.id)}
                                    className={styles.stepperBtn}
                                    aria-label={`Diminuir quantidade de ${item.name}`}
                                  >
                                    −
                                  </button>
                                  <span
                                    className={styles.stepperQty}
                                    aria-live="polite"
                                  >
                                    {qty} {qty === 1 ? "item" : "itens"}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      cart.add({
                                        id: item.id,
                                        name: item.name,
                                        price: item.price,
                                      })
                                    }
                                    className={styles.stepperBtn}
                                    aria-label={`Aumentar quantidade de ${item.name}`}
                                  >
                                    +
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </Tabs>
              </div>
            </div>

            <aside
              id="sacola"
              aria-label="Sacola do pedido"
              className={styles.cartSidebar}
            >
              <div className={styles.cartCard}>
                <div className={styles.cartHeader}>
                  <h2 className={styles.cartTitle}>Seu pedido</h2>
                  {cart.items.length > 0 && (
                    <button
                      type="button"
                      onClick={cart.clear}
                      className={styles.clearBtn}
                    >
                      Limpar sacola
                    </button>
                  )}
                </div>

                {cart.items.length === 0 ? (
                  <p className={styles.cartEmpty}>
                    Sua sacola está vazia. Toque em &ldquo;Adicionar ao
                    pedido&rdquo; nos itens do cardápio para montar sua entrega.
                  </p>
                ) : (
                  <>
                    <ul className={styles.cartList}>
                      {cart.items.map((item) => (
                        <li key={item.id} className={styles.cartRow}>
                          <div className={styles.cartItemInfo}>
                            <span className={styles.cartItemName}>
                              {item.qty}x {item.name}
                            </span>
                            <strong className={styles.cartItemSubtotal}>
                              {formatBRL(item.price * item.qty)}
                            </strong>
                          </div>
                          <div className={styles.cartRowControls}>
                            <button
                              type="button"
                              onClick={() => cart.remove(item.id)}
                              className={styles.miniStepBtn}
                              aria-label={`Remover uma unidade de ${item.name}`}
                            >
                              −
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                cart.add({
                                  id: item.id,
                                  name: item.name,
                                  price: item.price,
                                })
                              }
                              className={styles.miniStepBtn}
                              aria-label={`Adicionar mais uma unidade de ${item.name}`}
                            >
                              +
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>

                    <div className={styles.cartTotalRow}>
                      <span>Total dos itens</span>
                      <strong>{formatBRL(cart.total)}</strong>
                    </div>
                  </>
                )}

                <a
                  href={orderWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Enviar pedido no WhatsApp (abre o WhatsApp)"
                  className={styles.whatsappOrderBtn}
                >
                  <WhatsAppIcon />
                  <span>
                    {cart.items.length > 0
                      ? `Enviar pedido no WhatsApp (${formatBRL(cart.total)})`
                      : "Enviar pedido no WhatsApp"}
                  </span>
                </a>
                <p className={styles.cartNote}>
                  No WhatsApp você informa o endereço para calcular a taxa de
                  entrega e escolhe como pagar.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {!compact && (
        <section className={styles.kitchen}>
          <img
            src="/img/brasa/chapa.jpg"
            alt="Hambúrgueres com queijo derretido sobre a chapa, ao lado de uma garrafa de ketchup"
            className={styles.kitchenPhoto}
            loading="lazy"
            width={1100}
            height={733}
          />
          <div className={styles.container}>
            <div className={styles.kitchenText}>
              <h2 className={styles.kitchenTitle}>Feito na hora, na brasa</h2>
              <p>
                Nada de hambúrguer pronto esperando no balcão. A carne vai para
                a grelha quando o seu pedido chega, e sai direto para o motoboy
                ou para a sua mão.
              </p>
            </div>
            <div className={styles.kitchenRow}>
              <img
                src="/img/brasa/cozinha.jpg"
                alt="Cozinheiro com luvas pretas apertando molho sobre pães brioche tostados na chapa"
                loading="lazy"
                width={1100}
                height={733}
              />
              <img
                src="/img/brasa/classico.jpg"
                alt="Hambúrguer clássico com queijo, alface e tomate sobre tábua de madeira"
                loading="lazy"
                width={1100}
                height={733}
              />
              <img
                src="/img/brasa/casa.jpg"
                alt="Dois hambúrgueres espetados em palitos sobre tábua, ao lado de garrafas de refrigerante"
                loading="lazy"
                width={1100}
                height={733}
              />
            </div>
          </div>
        </section>
      )}

      {!compact && (
        <section id="entrega" className={styles.infoSection}>
          <div className={styles.container}>
            <div className={styles.infoGrid}>
              <div className={styles.infoBox}>
                <h2 className={styles.infoTitle}>
                  Área de entrega em Fortaleza
                </h2>
                <p className={styles.infoLead}>
                  Entregamos com motoboys próprios para o pedido chegar quente.
                  Você também pode retirar no balcão sem taxa.
                </p>
                <div className={styles.zonesList}>
                  {DELIVERY_ZONES.map((zone) => (
                    <div key={zone.region} className={styles.zoneCard}>
                      <div className={styles.zoneHeader}>
                        <strong>{zone.region}</strong>
                        <span className={styles.zoneFee}>
                          Taxa: {zone.fee} ({zone.time})
                        </span>
                      </div>
                      <p className={styles.zoneNeighborhoods}>
                        {zone.neighborhoods}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.infoBox}>
                <h2 className={styles.infoTitle}>
                  Formas de pagamento e retirada
                </h2>
                <p className={styles.infoLead}>
                  O pagamento é feito na entrega (com a maquininha do entregador)
                  ou via Pix após a confirmação no WhatsApp.
                </p>
                <ul className={styles.paymentList}>
                  <li>
                    <strong>Pix com chave CNPJ:</strong> enviamos o código copia
                    e cola na conversa
                  </li>
                  <li>
                    <strong>Cartão de crédito e débito:</strong> Visa,
                    Mastercard, Elo e Hipercard
                  </li>
                  <li>
                    <strong>Vale-refeição:</strong> Alelo, Sodexo/Pluxee e Ticket
                    Restaurante
                  </li>
                  <li>
                    <strong>Dinheiro:</strong> informe no WhatsApp se precisar
                    de troco
                  </li>
                </ul>
                <address className={styles.addressBox}>
                  <strong>Retirada no balcão:</strong> Rua Exemplo, 123 —
                  Varjota, Fortaleza/CE · Todos os dias das 18h às 23h · Tel.:
                  (85) 90000-0000
                </address>
              </div>
            </div>
          </div>
        </section>
      )}

      {!compact && cart.items.length > 0 && (
        <div className={styles.stickyBag}>
          <span className={styles.stickyBagInfo}>
            {cart.totalItems} {cart.totalItems === 1 ? "item" : "itens"} ·{" "}
            <strong>{formatBRL(cart.total)}</strong>
          </span>
          <a href="#sacola" className={styles.stickyBagLink}>
            Ver pedido
          </a>
        </div>
      )}

      <span className="sr-only" role="status" aria-live="polite">
        {cart.totalItems === 0
          ? "Pedido vazio"
          : `${cart.totalItems} itens no pedido, total ${formatBRL(cart.total)}`}
      </span>

      <footer className={styles.footer}>
        <div className={styles.container}>
          <p className={styles.footerName} aria-hidden="true">
            {displayName}
          </p>
          <p className={styles.footerText}>
            © 2026 {displayName}. Modelo de demonstração criado pela MJ Studios.
            Fotos: Unsplash.
          </p>
        </div>
      </footer>
    </div>
  );
}
