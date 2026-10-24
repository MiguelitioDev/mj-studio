# MJ Studio — Plano de implementação do site

Este documento é a especificação completa do site da MJ Studio. Qualquer pessoa (ou agente) que for
implementar algo deve seguir este plano. As seções são numeradas porque são referenciadas pelas
tarefas de implementação.

---

## 1. Objetivo, público e trabalho principal da página

- **O que é:** site da MJ Studio, um estúdio que cria sites para pequenos negócios (R$ 800 a R$ 2.900).
- **Público:** donos de pequenos negócios de Fortaleza/CE e região (barbearias, clínicas, restaurantes,
  lojas, prestadores de serviço, escritórios, autônomos). Chegam majoritariamente **pelo celular**,
  vindos de Instagram, Google ou indicação. Pouca paciência para texto técnico.
- **Trabalho principal:** fazer a pessoa (1) se enxergar num modelo pronto do ramo dela e (2) abrir uma
  conversa no WhatsApp com uma mensagem já escrita dizendo o que ela quer.
- **Métrica de sucesso:** cliques nos botões de WhatsApp (todos montam mensagem contextual).

## 2. Stack e regras técnicas (já instalado — não adicionar outras dependências)

- Vite 8 + React 19 + TypeScript (scaffold oficial `react-ts`).
- `react-router` v7 em modo biblioteca (`BrowserRouter`, `Routes`, `Route`, `Link`, `NavLink`,
  `useParams`, `useSearchParams`, `useLocation`), importado de `"react-router"`.
- `lucide-react` para ícones. O ícone do WhatsApp é um SVG próprio em `src/components/ui/WhatsAppIcon.tsx`
  (marca não existe no lucide).
- Fontes auto-hospedadas via `@fontsource/familjen-grotesk` e `@fontsource/atkinson-hyperlegible-next`
  (importar em `src/main.tsx`; **não** usar Google Fonts por CDN — evita enviar IP do visitante a terceiros, LGPD).
- CSS: **CSS Modules** (`Componente.module.css`) + variáveis globais em `src/styles/tokens.css` e reset/base
  em `src/styles/global.css`. Sem Tailwind, sem styled-components, sem biblioteca de UI.
- Títulos/meta por página: usar o suporte nativo do React 19 (`<title>` e `<meta name="description">`
  renderizados dentro do componente da página — o React os move para o `<head>`).
- Testes: `vitest` (só para funções puras em `src/lib`).
- Código em inglês (nomes de variáveis/componentes), **textos visíveis em português do Brasil**.
- Componentes funcionais, sem `any`, `import type` para tipos (o tsconfig usa `verbatimModuleSyntax`).

## 3. Estrutura de pastas

```
src/
  main.tsx                     # monta <BrowserRouter><App/></BrowserRouter>, importa fontes e estilos
  App.tsx                      # todas as rotas (seção 6)
  config/
    site.ts                    # ÚNICO lugar com dados da empresa (seção 4)
  data/
    niches.ts                  # nichos/abas
    plans.ts                   # pacotes e preços
    extras.ts                  # serviços avulsos/recorrentes
    models.ts                  # catálogo de modelos (estilos de site à venda)
    projects.ts                # projetos reais entregues (começa vazio)
    faq.ts                     # perguntas frequentes
    process.ts                 # etapas do processo
  lib/
    whatsapp.ts                # monta mensagens e links wa.me (seção 8)
    whatsapp.test.ts
    format.ts                  # formatBRL, formatPhone
  styles/
    tokens.css
    global.css
  components/
    layout/  Layout.tsx, Header.tsx, Footer.tsx, SkipLink.tsx, FloatingWhatsApp.tsx, ScrollToTop.tsx
    ui/      Button.tsx, WhatsAppLink.tsx, WhatsAppIcon.tsx, Tabs.tsx, PhoneFrame.tsx,
             DemoImage.tsx, Container.tsx, PriceTag.tsx
  sections/home/  Hero.tsx, ModelsShowcase.tsx, Plans.tsx, Process.tsx, Commitments.tsx,
                  Faq.tsx, FinalCta.tsx
  pages/   HomePage.tsx, ModelsPage.tsx, ModelDemoPage.tsx, ProjectsPage.tsx, QuotePage.tsx,
           PrivacyPage.tsx, TermsPage.tsx, AccessibilityPage.tsx, NotFoundPage.tsx
  demos/
    registry.ts               # slug -> React.lazy(() => import(...))
    types.ts                  # DemoProps
    shared/ DemoNotice.tsx, useWhatsAppCart.ts
    navalha/ clareza/ brasa/ vitrine/ alicerce/ pilar/ cartao/   # um modelo por pasta (seção 10)
public/
  favicon.svg, robots.txt, sitemap.xml
vercel.json                    # rewrites SPA + cabeçalhos de segurança (seção 12)
README.md                      # guia em português de como editar (seção 14)
```

Cada componente tem seu `.module.css` ao lado quando precisar de estilo.

## 4. Configuração central — `src/config/site.ts`

Todos os dados da empresa ficam aqui. Nenhum componente pode ter número, e-mail, CNPJ ou cidade escritos
direto no JSX.

```ts
export const site = {
  name: "MJ Studio",
  tagline: "Sites para pequenos negócios",
  url: "https://mjstudio.com.br",            // TODO: trocar pelo domínio real
  city: "Fortaleza",
  state: "CE",
  whatsapp: {
    number: "558591722145",                    // só dígitos, com 55 + DDD
    display: "(85) 9172-2145",
  },
  email: "",                                   // TODO: e-mail de contato
  instagram: "",                               // TODO: @ do Instagram (sem @), opcional
  legal: {
    companyName: "",                           // TODO: razão social (do CNPJ)
    cnpj: "",                                  // TODO: CNPJ (obrigatório para vender online)
    address: "",                               // TODO: endereço ou "Atendimento online — Fortaleza/CE"
    privacyContactEmail: "",                   // TODO: e-mail do encarregado de dados (pode ser o mesmo)
  },
  businessHours: "Segunda a sexta, 9h às 18h",
  payment: "50% para começar e 50% na entrega, via Pix ou cartão",   // revisar
  lastLegalUpdate: "2026-10-24",
  vlibras: true,                               // widget oficial de Libras do governo federal
} as const;
```

Regras:
- Campo vazio = **não renderizar** aquela linha (nunca mostrar "undefined" ou texto falso).
- `Footer` e páginas legais leem tudo daqui.
- Em `import.meta.env.DEV`, se `legal.cnpj` ou `email` estiverem vazios, `console.warn` uma vez avisando
  o que falta (ajuda o dono a lembrar).

## 5. Identidade visual da MJ Studio

### 5.1 Conceito
"Vitrine viva": a MJ Studio não descreve sites, ela **mostra** sites funcionando. O elemento memorável é o
celular do hero que exibe um modelo real do ramo do visitante, com **o nome do negócio dele** escrito
dentro, enquanto ele digita. Tudo em volta é calmo e disciplinado. Referência de lugar: Fortaleza — cal
branca, mar verde, sol forte — sem clichê de praia (nada de coqueiro, onda ou jangada desenhada).

### 5.2 Cores (`src/styles/tokens.css`)
| Token | Hex | Uso | Por quê (psicologia) |
|---|---|---|---|
| `--cal` | `#F6F7F3` | fundo da página | branco frio de parede caiada: limpo, sem cara de "papel creme" |
| `--tinta` | `#17302B` | texto principal | verde-mar muito escuro: mais humano que preto, contraste AAA |
| `--mar` | `#0F6B5C` | botões de ação, links | verde-azulado = confiança + "pode seguir"; conversa com o verde do WhatsApp sem copiá-lo |
| `--mar-escuro` | `#0A5045` | hover/pressed | |
| `--espuma` | `#DCEDE7` | superfícies de destaque leve, fundo do pacote recomendado | |
| `--sol` | `#F2B33D` | destaque raro: selo "Mais escolhido", anel de foco | amarelo = atenção e otimismo; usado no máximo 1 vez por tela |
| `--areia` | `#E8E2D6` | bordas, divisores, fundos secundários | |
| `--branco` | `#FFFFFF` | cartões sobre `--cal` | |

Regras de contraste: texto `--tinta` em `--cal`/`--branco`/`--espuma`; texto branco em `--mar`;
texto `--tinta` em `--sol` (nunca branco em amarelo). Todos ≥ 4.5:1.

### 5.3 Tipografia
- **Familjen Grotesk** (500, 600, 700) — títulos. Tracking levemente negativo (`-0.02em`) nos grandes.
- **Atkinson Hyperlegible Next** (400, 700) — texto corrido, botões, formulários. Fonte criada para
  baixa visão: reforça o compromisso de acessibilidade.
- Escala (rem, base 16px, razão ~1.25): `--fs-0: .875` · `--fs-1: 1` · `--fs-2: 1.25` · `--fs-3: 1.563` ·
  `--fs-4: 1.953` · `--fs-5: 2.441` · `--fs-6: clamp(2.441rem, 6vw, 3.815rem)` (só o H1 do hero).
- Linha: 1.55 no corpo, 1.1 nos títulos. Largura de texto máx. `68ch`.
- **Proibido:** rótulos em CAIXA ALTA com tracking; palavra solta colorida/itálica dentro de título;
  "eyebrow" acima de cada título; seta "→" no fim de botões; separadores "A · B · C".

### 5.4 Forma e espaço
- Raio: `--r-sm: 6px` (inputs, chips), `--r-md: 14px` (cartões), `--r-phone: 36px` (moldura do celular).
  Hierarquia de raio é intencional — não usar o mesmo raio em tudo.
- Sombras: só na moldura do celular e no pacote recomendado (`0 24px 48px -24px rgb(23 48 43 / .35)`).
  Cartões comuns usam borda `1px solid var(--areia)`, sem sombra.
- Espaço: `--s-1: .25rem` … `--s-8: 6rem` (escala 4/8/12/16/24/32/48/64/96px).
- Container: `max-width: 1160px`, padding lateral `16px` no celular, `32px` ≥ 768px.
- Alinhamento: texto alinhado à esquerda em todo o site (centralizado só no CTA final).

### 5.5 Movimento
- Um único momento orquestrado: ao trocar o nicho no hero, o conteúdo do celular faz crossfade (200ms).
- Abrir/fechar FAQ e trocar abas: transição curta (150ms) que mostra o que mudou.
- Nada de fade-in em cada seção ao rolar. Respeitar `prefers-reduced-motion: reduce` (desligar tudo).

## 6. Rotas

| Rota | Página | Conteúdo |
|---|---|---|
| `/` | HomePage | seções da home (seção 7) |
| `/modelos` | ModelsPage | catálogo completo com abas por nicho; aba ativa em `?nicho=<slug>` |
| `/modelos/:slug` | ModelDemoPage | modelo em tela cheia + barra fixa "Modelo de demonstração" (seção 10.1) |
| `/projetos` | ProjectsPage | projetos reais de `projects.ts`; estado vazio honesto se lista vazia |
| `/orcamento` | QuotePage | montador de pedido em etapas que gera a mensagem do WhatsApp (seção 9) |
| `/privacidade` | PrivacyPage | Política de Privacidade (seção 11) |
| `/termos` | TermsPage | Termos de Uso e condições de contratação |
| `/acessibilidade` | AccessibilityPage | Declaração de acessibilidade |
| `*` | NotFoundPage | 404 com link para início e para modelos |

- `/modelos/:slug` **não** usa o Header/Footer do site (o modelo ocupa a tela), só a barra de demonstração.
  As outras rotas usam `<Layout>` (Header + main + Footer + FloatingWhatsApp).
- Links de navegação no Header: Modelos · Pacotes (`/#pacotes`) · Como funciona (`/#como-funciona`) ·
  Projetos (só aparece se `projects.length > 0`) · botão "Pedir orçamento" (→ `/orcamento`).
- Menu mobile: botão com `aria-expanded`, `aria-controls`, fecha com Esc e ao navegar.
- `ScrollToTop`: ao mudar de rota sem hash, rolar para o topo; com hash, rolar até o id.
- Lazy-loading: cada modelo em `src/demos/*` e cada página legal carregados com `React.lazy` + `Suspense`.

## 7. Home — seções em ordem

### 7.1 Hero (`sections/home/Hero.tsx`) — o elemento memorável
Layout desktop (≥ 960px): duas colunas. Celular: texto, depois celular.

```
┌──────────────────────────────────────────────────────────────┐
│ H1: Seu negócio com um site que     │   ┌───────────┐        │
│     chama no WhatsApp.              │   │  celular  │        │
│ P: Modelos prontos para o seu ramo, │   │  mostrando│        │
│    ajustados com a sua marca. A     │   │  o modelo │        │
│    partir de R$ 800.                │   │  do nicho │        │
│                                     │   │  com o    │        │
│ [Qual é o seu negócio?]  (chips)    │   │  nome     │        │
│ (Barbearia)(Clínica)(Restaurante)   │   │  digitado │        │
│ (Loja)(Serviços)(Escritório)(Autôn.)│   └───────────┘        │
│ [Nome do seu negócio: _________ ]   │   Modelo "Navalha"     │
│ [ Quero um site assim (WhatsApp) ]  │   Ver modelo completo  │
│  Ver todos os modelos               │                        │
└──────────────────────────────────────────────────────────────┘
```

- Chips = nichos de `niches.ts` (exceto "todos"), `role="radiogroup"` com `role="radio"` e
  `aria-checked`; setas ←/→ trocam a seleção. Padrão selecionado: primeiro nicho.
- Campo "Nome do seu negócio" (`<label>` visível, `maxLength=40`, opcional). O valor vai como prop
  `businessName` para o modelo dentro do celular, que troca o nome fictício pelo digitado.
- `PhoneFrame` renderiza o componente real do modelo do nicho escolhido, em escala:
  largura interna 390px, `transform: scale()` para caber (~300px de largura visível no desktop,
  ~260px no celular), altura visível fixa (≈ 620px internos). O conteúdo dentro do celular recebe o
  atributo `inert` (não focável, não clicável) e `aria-hidden="true"`; abaixo do celular um texto
  visível descreve o que é: "Modelo Navalha, para barbearias" + link "Ver modelo completo".
- Botão principal: `WhatsAppLink` com `buildMessage({ source: "hero", nicheLabel, modelName, businessName })`.
- Link secundário: "Ver todos os modelos" → `/modelos`.
- Psicologia: *efeito de dotação* (a pessoa vê o nome dela no site e passa a senti-lo como seu),
  *pé na porta* (primeiro passo é só tocar num chip), personalização imediata.

### 7.2 Modelos (`ModelsShowcase.tsx`, `id="modelos"`)
- Título: "Modelos prontos para o seu ramo". Subtítulo curto explicando que cada modelo é ajustado
  com cores, fotos e textos do cliente.
- `Tabs` acessível (`role="tablist"`, `role="tab"`, `aria-selected`, `aria-controls`, `role="tabpanel"`,
  setas ←/→, Home/End, roving tabindex). Abas: "Todos" + cada nicho.
- Grade de `ModelCard`: miniatura (o modelo real renderizado em escala dentro de uma moldura de navegador
  simples, `inert`, carregado só quando visível via `IntersectionObserver`), nome do modelo, nicho,
  "Ideal para: …", preço "a partir de R$ X" (do pacote indicado), dois links: "Ver modelo" (`/modelos/:slug`)
  e "Quero este" (WhatsApp com `source: "model"`).
- Na home mostrar no máximo 6 cartões; link "Ver catálogo completo" → `/modelos?nicho=<aba>`.

### 7.3 Pacotes (`Plans.tsx`, `id="pacotes"`)
- Três pacotes de `plans.ts`, lado a lado no desktop, empilhados no celular com o **recomendado primeiro**
  no celular e no **meio** no desktop.
- Pacote recomendado: fundo `--espuma`, sombra, selo "Mais escolhido" em `--sol`.
  (Se o dono preferir não afirmar "mais escolhido" antes de ter vendas, o texto do selo vem de
  `plans.ts` — usar "Recomendado" por padrão. **Não afirmar números de vendas que não existem.**)
- Cada cartão: nome, para quem é (1 linha), preço grande (`PriceTag`, formato "R$ 1.600"), forma de
  pagamento (de `site.payment`), prazo, lista do que inclui (ícone `Check` do lucide), botão
  "Quero o pacote X" (WhatsApp, `source: "plan"`).
- Abaixo: "Extras e custos à parte" lendo `extras.ts` (domínio, manutenção mensal, página extra, fotos),
  com valores claros — transparência exigida pelo CDC art. 6º III e 31.
- Psicologia: *ancoragem* (o pacote Completo faz o Profissional parecer razoável), *lei de Hick*
  (só 3 escolhas), *efeito padrão* (recomendado pré-selecionado no orçamento).

### 7.4 Como funciona (`Process.tsx`, `id="como-funciona"`)
Sequência real, então numeração é permitida (`<ol>`). Etapas de `process.ts`:
1. **Conversa no WhatsApp** — você conta sobre o negócio e escolhe modelo e pacote.
2. **Proposta por escrito** — escopo, prazo e preço fechados antes de começar.
3. **Construção com prévia** — você acompanha por um link de prévia.
4. **Ajustes e publicação** — rodadas de ajuste incluídas, depois o site vai ao ar no seu domínio.

### 7.5 Compromissos (`Commitments.tsx`)
Lista curta de garantias reais (texto em `data/process.ts` como `commitments`), editável pelo dono:
- "Preço fechado antes de começar — sem surpresa no fim."
- "O domínio fica no seu nome." 
- "Site adaptado a celular e com recursos de acessibilidade."
- "Política de privacidade e avisos da LGPD inclusos nos pacotes Profissional e Completo."
Sem ícones decorativos gigantes; lista com divisores.

### 7.6 Perguntas frequentes (`Faq.tsx`, `id="perguntas"`)
`<details>/<summary>` nativos (acessíveis por padrão). Perguntas de `faq.ts`:
quanto tempo leva; o que preciso enviar; o que é domínio e quanto custa; preciso pagar hospedagem;
posso mudar textos depois; vocês fazem loja virtual com pagamento online (resposta honesta: o pacote
Completo faz catálogo com pedido pelo WhatsApp; pagamento online integrado é orçado à parte);
como funciona o pagamento; meu site aparece no Google (resposta honesta: configuramos o básico de SEO e
o Perfil da Empresa no Google; posição no Google não é garantida).

### 7.7 CTA final (`FinalCta.tsx`)
Bloco centralizado em `--tinta` com texto `--cal`: "Me conta sobre o seu negócio." + botão WhatsApp
(`source: "generic"`) + link "Montar pedido passo a passo" → `/orcamento`.

### 7.8 Botão flutuante de WhatsApp (`FloatingWhatsApp.tsx`)
- Canto inferior direito, 56×56px, `--mar` com ícone branco, `aria-label="Conversar no WhatsApp"`.
- Não aparece em `/orcamento` nem em `/modelos/:slug` (lá a barra de demonstração já tem o botão).
- `bottom` respeita `env(safe-area-inset-bottom)`; não cobre o rodapé (adicionar `padding-bottom`
  no footer no celular).

## 8. WhatsApp — `src/lib/whatsapp.ts`

```ts
export type MessageSource = "hero" | "model" | "plan" | "quote" | "demo" | "generic" | "cart";

export interface MessageInput {
  source: MessageSource;
  nicheLabel?: string;     // "Barbearia e salão"
  modelName?: string;      // "Navalha"
  planName?: string;       // "Profissional"
  planPrice?: number;      // 1600
  businessName?: string;   // digitado pelo visitante
  hasDomain?: "sim" | "nao" | "nao-sei";
  deadline?: string;       // "Sem pressa" | "Até 15 dias" | "Urgente"
  notes?: string;
  cartLines?: string[];    // usado só pelos modelos de cardápio/catálogo
}

export function buildMessage(input: MessageInput): string;
export function buildWhatsAppUrl(message: string, number = site.whatsapp.number): string;
// -> `https://wa.me/${number}?text=${encodeURIComponent(message)}`
```

Formato da mensagem (exemplo `source: "model"`):
```
Olá, MJ Studio! Vim pelo site e quero ajuda para criar o site do meu negócio.

Tipo de negócio: Barbearia e salão
Modelo que gostei: Navalha
Pacote: Profissional (R$ 1.600)
Nome do negócio: Barbearia do Zé

Pode me explicar os próximos passos?
```
Regras:
- Primeira linha sempre a saudação + "Vim pelo site" (o dono sabe a origem do contato).
- Linhas só aparecem se o campo existir; `businessName`/`notes` passam por `trim()` e limite de 40/300
  caracteres.
- Primeira frase varia por `source`: `hero`/`model` → "quero ajuda para criar o site do meu negócio";
  `plan` → "tenho interesse no pacote X"; `generic` → "preciso de ajuda com um site para o meu negócio";
  `quote` → "montei meu pedido no site".
- `source: "cart"` NÃO é usado pela MJ Studio — é para os modelos de demonstração simularem o pedido do
  cliente final; nesse caso a mensagem começa com "Olá! Quero fazer um pedido:" e o número usado é o da MJ
  Studio com uma linha final "(Mensagem de teste enviada pelo modelo de demonstração da MJ Studio)".
- Sem emojis (alguns aparelhos antigos quebram a codificação).
- `WhatsAppLink.tsx`: `<a href={url} target="_blank" rel="noopener noreferrer">` com ícone, texto
  visível e `aria-label` que termina com "(abre o WhatsApp)".

Testes (`whatsapp.test.ts`): monta URL com número e texto codificado; omite linhas vazias; aplica limite
de caracteres; formata preço "R$ 1.600"; cada `source` gera a frase correta.

## 9. Orçamento passo a passo — `/orcamento` (`QuotePage.tsx`)

Formulário em 4 etapas, **nada é enviado a servidor**: no fim, monta a mensagem e abre o WhatsApp.
1. **Seu ramo** — radios com os nichos (pode vir pré-preenchido por `?nicho=`).
2. **Modelo** — radios com os modelos daquele nicho + "Ainda não sei" (pré-preenche via `?modelo=`).
3. **Pacote** — radios com os 3 pacotes, **Profissional pré-selecionado** (pré-preenche via `?pacote=`).
4. **Detalhes** — nome do negócio (opcional), já tem domínio (Sim/Não/Não sei), prazo
   (Sem pressa / Até 15 dias / Urgente), observações (textarea opcional, 300 caracteres com contador).

- Barra de progresso "Etapa 2 de 4" (texto + `<progress>`) — *efeito gradiente de meta*.
- Botões "Voltar" e "Continuar"; foco vai para o título da etapa ao trocar (`tabIndex=-1` + `focus()`).
- Etapa final mostra **a prévia exata da mensagem** num balão estilo conversa (sem copiar a interface do
  WhatsApp) e o botão "Abrir no WhatsApp". Abaixo do botão, aviso LGPD:
  "Nada do que você preencheu é salvo neste site. A mensagem só é enviada se você tocar em enviar no
  WhatsApp. Veja a Política de Privacidade." (link)
- Estado só em `useState`, sem `localStorage`.

## 10. Modelos de demonstração (os "estilos de site" à venda)

Sete modelos, cada um com identidade própria (mostram a versatilidade do estúdio). **Negócios fictícios**,
com dados obviamente fictícios (telefone "(85) 90000-0000", CRP "00/00000", endereço "Rua Exemplo, 123").
Cada modelo é um componente `default export` em `src/demos/<slug>/index.tsx` com seu CSS Module,
recebendo `DemoProps`:

```ts
export interface DemoProps {
  businessName?: string;   // substitui o nome fictício quando preenchido
  compact?: boolean;       // true quando renderizado em miniatura/celular (pode ocultar seções pesadas)
}
```

Regras comuns a todos os modelos:
- Todo o CSS do modelo fica escopado no seu `.module.css` com as próprias variáveis (não usar tokens da
  MJ Studio dentro do modelo).
- Layout mobile-first, funcional de 320px a 1440px, sem rolagem horizontal.
- Imagens: usar `<DemoImage label="Foto do ambiente" ratio="4/3" tone="..." />` — um bloco com padrão
  geométrico em CSS nas cores do modelo e uma legenda discreta ("Sua foto aqui: ambiente"). **Não usar
  fotos de banco de imagens nem links externos de imagem** (direitos autorais + privacidade). O componente
  aceita `src` e `alt` opcionais para quando o dono adicionar fotos licenciadas.
- Botões de contato do negócio fictício chamam `buildWhatsAppUrl` com `source: "demo"` → mensagem para a
  MJ Studio: "Olá, MJ Studio! Estou testando o modelo X e gostei do botão de agendamento." (assim o clique
  nunca vai para um número inexistente e ainda gera contato).
- Rodapé de cada modelo: "© 2026 [nome] · Modelo de demonstração criado pela MJ Studio".
- Acessibilidade igual ao site principal (contraste AA, foco visível, headings em ordem, `lang` herdado).

### 10.1 Barra de demonstração (`demos/shared/DemoNotice.tsx`)
Usada em `/modelos/:slug`. Barra fixa no topo, fundo `--tinta`, texto `--cal`:
"Modelo de demonstração · negócio fictício" + link "Voltar aos modelos" + botão "Quero este modelo"
(WhatsApp `source: "model"`) + campo pequeno "Testar com o nome do seu negócio" (atualiza `businessName`).
No celular, a barra vira compacta (só "Voltar" e "Quero este modelo"; o campo de nome fica num botão
"Testar com meu nome" que expande).

### 10.2 Catálogo (`src/data/models.ts`)

```ts
export interface SiteModel {
  slug: string; name: string; niche: NicheSlug;
  idealFor: string;          // "Barbearias, salões e estúdios de beleza"
  summary: string;           // 1 frase
  highlights: string[];      // 3 a 5 recursos do modelo
  recommendedPlan: PlanSlug; // define o "a partir de"
}
```

| slug | Nome | Nicho | Pacote indicado | Identidade visual | Seções e recurso de destaque |
|---|---|---|---|---|---|
| `navalha` | Navalha | beleza (Barbearia e salão) | profissional | fundo carvão `#1E1B18`, latão `#C89B3C`, papel `#EFEAE2`; títulos condensados (usar `font-stretch`/peso 700 da Familjen + `letter-spacing` amplo só no logotipo) | hero com "Agendar pelo WhatsApp"; serviços com preço e duração; equipe (3 profissionais); horários; como chegar (bloco de endereço, sem iframe de mapa); **tabela de serviços que o cliente marca e manda no WhatsApp** |
| `clareza` | Clareza | saude (Saúde e bem-estar) | profissional | branco `#FBFBF8`, sálvia `#7F988C`, grafite `#2F3437`, lavanda `#D9D2E9`; layout arejado | sobre a profissional (psicóloga fictícia, "CRP 00/00000"); abordagens; como é a primeira consulta (passos); online e presencial; convênios/valores "sob consulta"; FAQ; aviso "Em crise? Ligue 188 (CVV)" no rodapé. **Sem promessa de resultado nem antes/depois** (regras dos conselhos profissionais) |
| `brasa` | Brasa | alimentacao (Restaurante e delivery) | completo | branco `#FFFFFF`, tomate `#B8322A`, mostarda `#E3A72F`, café `#2A1A12` | hero com horário "aberto agora/fechado" calculado no navegador; **cardápio com abas por categoria e carrinho** (`useWhatsAppCart`: + / − por item, total em R$, botão "Enviar pedido no WhatsApp" com `cartLines`); área de entrega por bairro; formas de pagamento |
| `vitrine` | Vitrine | comercio (Loja e catálogo) | completo | branco `#FFFFFF`, preto azulado `#1C2230`, coral `#E4572E`, cinza `#EEF0F3` | grade de produtos (12 itens fictícios) com filtro por categoria e tamanho; página de produto em modal (`<dialog>`); "Pedir no WhatsApp" com produto + tamanho; trocas e envio |
| `alicerce` | Alicerce | servicos (Serviços e reformas) | essencial | grafite `#2B2F33`, amarelo-obra `#F5C400`, concreto `#D9D9D6`, branco | serviços (elétrica, hidráulica, pintura, pequenos reparos); bairros atendidos em Fortaleza (lista); **orçamento rápido** (3 perguntas → WhatsApp); obras realizadas (galeria de `DemoImage`); garantia do serviço |
| `pilar` | Pilar | escritorios (Advocacia e contabilidade) | completo | azul-petróleo `#1D3B4A`, pedra `#E7E4DE`, bronze `#9C7A4B`; serifa só nos títulos (usar `Georgia, "Times New Roman", serif` do sistema — sem nova dependência) | institucional sóbrio com navegação interna (Início / Áreas de atuação / Equipe / Contato como âncoras); áreas de atuação; equipe; artigos (3 cards de texto). **Sem preços nem promessa de resultado** (Provimento OAB 205/2021) |
| `cartao` | Cartão | autonomos (Profissionais autônomos) | essencial | lilás `#5B3F8C`, rosa-chá `#F3D9DC`, branco; tudo em uma tela | "link na bio" turbinado: foto/avatar (DemoImage redondo), nome, profissão, botões grandes (WhatsApp, Instagram, Agendar, Localização), mini portfólio (6 quadrados), depoimentos **marcados como exemplo** |

### 10.3 `src/data/niches.ts`
```ts
export const niches = [
  { slug: "todos", label: "Todos" },
  { slug: "beleza", label: "Barbearia e salão", short: "Barbearia" },
  { slug: "saude", label: "Saúde e bem-estar", short: "Clínica" },
  { slug: "alimentacao", label: "Restaurante e delivery", short: "Restaurante" },
  { slug: "comercio", label: "Loja e catálogo", short: "Loja" },
  { slug: "servicos", label: "Serviços e reformas", short: "Serviços" },
  { slug: "escritorios", label: "Advocacia e contabilidade", short: "Escritório" },
  { slug: "autonomos", label: "Profissionais autônomos", short: "Autônomo" },
] as const;
```
`short` é usado nos chips do hero.

### 10.4 `src/data/plans.ts`
```ts
export interface Plan {
  slug: "essencial" | "profissional" | "completo";
  name: string; price: number; forWho: string; deadline: string;
  includes: string[]; recommended?: boolean; badge?: string;
}
```
| Pacote | Preço | Para quem | Prazo | Inclui |
|---|---|---|---|---|
| Essencial | 800 | Quem precisa estar no Google e no WhatsApp com uma página simples | até 7 dias úteis | 1 página com até 5 seções · adaptado a celular · botão de WhatsApp com mensagem pronta · endereço e horários · SEO básico (título, descrição, compartilhamento) · 1 rodada de ajustes |
| Profissional (`recommended: true`, `badge: "Recomendado"`) | 1600 | Negócios que querem apresentar serviços e preços com cara profissional | até 12 dias úteis | tudo do Essencial · até 10 seções · modelo do seu ramo com suas cores e logo · lista de serviços/preços ou cardápio simples · galeria de fotos · orientação para o Perfil da Empresa no Google · Política de Privacidade e aviso LGPD · 2 rodadas de ajustes |
| Completo | 2900 | Quem vende produtos ou precisa de várias páginas | até 20 dias úteis | tudo do Profissional · até 5 páginas · catálogo ou cardápio com até 40 itens e pedido pelo WhatsApp · configuração de domínio e hospedagem · métricas de visitas com aviso de cookies · 30 dias de suporte após publicar · 3 rodadas de ajustes |

### 10.5 `src/data/extras.ts`
- Domínio `.com.br` — "cerca de R$ 40 por ano, pago direto no Registro.br, no seu nome".
- Hospedagem — "planos gratuitos atendem a maioria dos sites deste porte; se precisar de um pago, informamos antes".
- Manutenção mensal (alterações de texto, fotos e preços) — "a partir de R$ 90/mês" (opcional).
- Página extra — "R$ 250 por página".
- Logotipo simples — "R$ 300".

### 10.6 `src/data/projects.ts`
```ts
export interface Project { name: string; niche: NicheSlug; url?: string; summary: string;
  year: number; image?: string; imageAlt?: string; }
export const projects: Project[] = [];
```
Página `/projetos` com lista vazia mostra: "Os primeiros projetos entregues aparecem aqui. Enquanto isso,
veja os modelos de demonstração." + link. **Nunca inventar clientes, depoimentos ou números.**

## 11. Conformidade legal (Brasil)

Referências: LGPD (Lei 13.709/2018), Marco Civil da Internet (Lei 12.965/2014), Código de Defesa do
Consumidor (Lei 8.078/1990, arts. 6º, 31, 37 e 49), Decreto 7.962/2013 (comércio eletrônico), Lei
Brasileira de Inclusão (Lei 13.146/2015, art. 63 — acessibilidade em sites), Lei de Direitos Autorais
(Lei 9.610/1998).

### 11.1 Identificação do fornecedor (Decreto 7.962/2013, art. 2º; CDC art. 31)
Rodapé de todas as páginas do Layout: nome empresarial + CNPJ + endereço/cidade + e-mail + WhatsApp,
lidos de `site.ts` (campos vazios não aparecem). Preços sempre em reais, com o que está e o que não está
incluso (`extras.ts`).

### 11.2 Publicidade honesta (CDC art. 37, Código do CONAR)
- Proibido: contadores regressivos, "últimas vagas", números de clientes, notas/estrelas, depoimentos ou
  logos de clientes que não existam. Modelos sempre rotulados como demonstração com negócio fictício.
- "Recomendado" é opinião do estúdio — permitido. "Mais vendido" só quando for verdade.

### 11.3 Política de Privacidade (`/privacidade`) — conteúdo mínimo
1. Quem é o controlador (dados de `site.legal`) e contato do encarregado (`privacyContactEmail`).
2. Que dados este site coleta: **nenhum dado pessoal é coletado ou armazenado pelo site**. O formulário de
   orçamento apenas monta um texto no navegador; o envio acontece no WhatsApp, por ação do visitante.
3. Dados tratados quando a pessoa conversa no WhatsApp: nome, telefone e o que ela escrever — finalidade
   (responder e fazer proposta), base legal (procedimentos preliminares de contrato, art. 7º V; legítimo
   interesse para histórico de atendimento, art. 7º IX), prazo de guarda (até 2 anos após o último contato,
   ou o exigido por lei/fiscal), compartilhamento (WhatsApp/Meta como operador da plataforma).
4. Terceiros carregados pelo site: hospedagem (registros de acesso guardados por 6 meses, Marco Civil art. 15),
   widget VLibras (governo federal) se `site.vlibras`. Fontes são auto-hospedadas.
5. Cookies: o site não usa cookies de rastreamento nem publicidade. Se métricas forem ativadas no futuro,
   esta política será atualizada e um aviso de consentimento será exibido antes de qualquer coleta.
6. Direitos do titular (art. 18): confirmação, acesso, correção, anonimização, eliminação, portabilidade,
   informação sobre compartilhamento, revogação do consentimento — como pedir (e-mail/WhatsApp) e prazo de
   resposta (15 dias). Direito de reclamar à ANPD (gov.br/anpd).
7. Segurança (HTTPS, cabeçalhos de segurança, nenhum banco de dados no site).
8. Data da última atualização (`site.lastLegalUpdate`).

### 11.4 Termos de Uso e Condições (`/termos`)
1. Sobre o site e quem o mantém. 2. Natureza informativa: preços e prazos são referências; o valor final é o
da **proposta por escrito** enviada antes de começar. 3. Modelos de demonstração: negócios fictícios; os
modelos são obra da MJ Studio — não podem ser copiados (Lei 9.610/1998). 4. Contratação: proposta, entrada,
rodadas de ajuste, o que conta como ajuste x novo escopo. 5. Propriedade: após quitação, o cliente recebe os
arquivos do site; domínio registrado no nome do cliente; fotos e textos enviados pelo cliente são de
responsabilidade dele (precisa ter direito de uso). 6. Direito de arrependimento: contratação feita a
distância pode ser cancelada em até 7 dias da contratação (CDC art. 49), com devolução do valor pago. 7. Foro:
comarca de Fortaleza/CE, ressalvado o direito do consumidor de escolher o foro do seu domicílio. 8. Data.

### 11.5 Declaração de Acessibilidade (`/acessibilidade`)
Meta: WCAG 2.2 nível AA e recomendações do eMAG. Lista o que foi feito (navegação por teclado, link "Pular
para o conteúdo", contraste, textos alternativos, fonte de alta legibilidade, respeito a movimento reduzido,
VLibras), limitações conhecidas (miniaturas dos modelos são ilustrativas e ocultas de leitores de tela, com
descrição em texto ao lado) e como reportar problemas (WhatsApp/e-mail).

### 11.6 Direitos autorais
Rodapé: "© {ano atual} MJ Studio. Todos os direitos reservados." Só conteúdo próprio: ícones do lucide
(licença ISC), fontes com licença SIL OFL (Familjen Grotesk e Atkinson Hyperlegible Next), nenhuma imagem
de terceiros. Nota no README sobre usar só fotos próprias, do cliente ou com licença (ex.: Unsplash/Pexels,
guardando o link da licença).

### 11.7 VLibras
Se `site.vlibras` for `true`, componente `VLibras.tsx` (em `components/layout`) injeta uma vez o script
oficial `https://vlibras.gov.br/app/vlibras-plugin.js` e o markup exigido
(`<div vw class="enabled"><div vw-access-button class="active"></div><div vw-plugin-wrapper><div class="vw-plugin-top-wrapper"></div></div></div>`),
inicializando com `new window.VLibras.Widget('https://vlibras.gov.br/app')` no `onload`. Tipar `window.VLibras`
com uma declaração global mínima. Posicionar para não colidir com o botão flutuante de WhatsApp
(VLibras à direita no meio da tela é o padrão dele — manter).

## 12. Acessibilidade, SEO, desempenho e segurança

**Acessibilidade (obrigatório em todo componente):**
- `<html lang="pt-BR">`; `SkipLink` "Pular para o conteúdo" → `#conteudo` (o `<main id="conteudo" tabIndex={-1}>`).
- Um `<h1>` por página, headings em ordem. Landmarks: `header`, `nav aria-label="Principal"`, `main`, `footer`.
- Foco visível: `outline: 3px solid var(--sol); outline-offset: 2px` em `:focus-visible` (sobre fundos claros
  adicionar `box-shadow: 0 0 0 5px var(--tinta)` para contraste do anel amarelo).
- Áreas de toque ≥ 44×44px. Nada de informação só por cor.
- Links que abrem nova aba avisam no `aria-label`.
- `@media (prefers-reduced-motion: reduce)` desliga transições/animações.

**SEO (`index.html` + por página):**
- `index.html`: `<meta name="description">`, Open Graph (`og:title`, `og:description`, `og:type=website`,
  `og:locale=pt_BR`, `og:url`), `<meta name="theme-color" content="#0F6B5C">`, favicon SVG com as iniciais
  "MJ" em `--mar` sobre `--cal`, JSON-LD `ProfessionalService` (nome, `areaServed: Fortaleza`, `priceRange:
  "R$ 800 - R$ 2.900"`, telefone, url).
- Cada página define `<title>` "… | MJ Studio" e `description` própria.
- `public/robots.txt` (permitir tudo + `Sitemap:`) e `public/sitemap.xml` com as rotas públicas
  (inclusive cada `/modelos/:slug`), usando a URL de `site.url`.

**Segurança — `vercel.json`:**
- `rewrites`: tudo → `/index.html` (SPA).
- `headers` para `/(.*)`: `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`,
  `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`,
  `X-Frame-Options: DENY`, `Permissions-Policy: camera=(), microphone=(), geolocation=()`,
  `Content-Security-Policy: default-src 'self'; script-src 'self' https://vlibras.gov.br; style-src 'self' 'unsafe-inline' https://vlibras.gov.br; img-src 'self' data: https://vlibras.gov.br; font-src 'self' data: https://vlibras.gov.br; connect-src 'self' https://vlibras.gov.br https://*.vlibras.gov.br; frame-src https://vlibras.gov.br; frame-ancestors 'none'; base-uri 'self'; form-action 'self'`.
- Nenhum segredo no código; nenhum `dangerouslySetInnerHTML`, exceto o JSON-LD estático no `index.html`.

**Desempenho:** modelos e páginas legais em `React.lazy`; miniaturas só renderizam quando visíveis;
importar apenas os pesos de fonte usados (`familjen-grotesk/500.css`, `600.css`, `700.css`;
`atkinson-hyperlegible-next/400.css`, `700.css`).

## 13. Texto (copy) — tom de voz
- Fala com o dono do negócio, de "você", frases curtas, verbos simples. Nada de jargão ("responsivo",
  "SEO on-page", "conversão") nos títulos — explicar pelo benefício ("abre bem no celular", "aparece no Google").
- Botões dizem exatamente o que acontece: "Conversar no WhatsApp", "Quero este modelo", "Ver modelo",
  "Abrir no WhatsApp", "Continuar", "Voltar".
- Sem superlativos vazios ("o melhor", "incrível", "revolucionário"), sem promessas de resultado
  ("dobre suas vendas").
- Estado vazio e erro dão direção: o que aconteceu e o que fazer.

## 14. README.md (português) — guia para o dono editar
Seções: o que é o projeto · como rodar (`npm install`, `npm run dev`, `npm run build`, `npm test`) ·
**onde mudar cada coisa** (tabela: número do WhatsApp/CNPJ/e-mail → `src/config/site.ts`; preços →
`src/data/plans.ts`; extras → `src/data/extras.ts`; perguntas → `src/data/faq.ts`; adicionar projeto real →
`src/data/projects.ts`; cores → `src/styles/tokens.css`) · como criar um novo modelo (passo a passo:
pasta em `src/demos`, registrar em `registry.ts`, cadastrar em `models.ts`, adicionar no `sitemap.xml`) ·
como publicar na Vercel · checklist legal antes de publicar (CNPJ, e-mail, domínio, revisar termos com
contador/advogado) · regras de imagens e direitos autorais.

## 15. Ordem de implementação (tarefas para o agente)
1. **Fundação:** tokens, global.css, main/App/rotas com páginas provisórias, `site.ts`, todos os `data/*`,
   `lib/whatsapp.ts` + testes, `lib/format.ts`, componentes `ui/*`, `layout/*` (sem VLibras ainda).
2. **Modelos (parte 1):** `demos/types.ts`, `registry.ts`, `shared/*`, `DemoImage`, modelos `navalha`,
   `clareza`, `brasa`, `cartao`; página `/modelos/:slug`.
3. **Modelos (parte 2):** `vitrine`, `alicerce`, `pilar`.
4. **Home e catálogo:** todas as seções da seção 7, `PhoneFrame`, `ModelsPage` com abas, `ProjectsPage`.
5. **Orçamento + legal + publicação:** `QuotePage`, páginas legais, `NotFoundPage`, VLibras, `index.html`
   (SEO/JSON-LD), `robots.txt`, `sitemap.xml`, `favicon.svg`, `vercel.json`, `README.md`.

Depois de cada tarefa: `npm run build`, `npm run lint`, `npm test` devem passar.
